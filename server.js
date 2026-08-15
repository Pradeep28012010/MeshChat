const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const os = require('os');
const QRCode = require('qrcode');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 3000;

// Helper to get local network IP addresses
function getLocalIPAddresses() {
  const interfaces = os.networkInterfaces();
  const addresses = [];

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Filter out internal (127.0.0.1) and non-IPv4 addresses
      if (iface.family === 'IPv4' && !iface.internal) {
        addresses.push({
          interface: name,
          address: iface.address,
          url: `http://${iface.address}:${PORT}`
        });
      }
    }
  }

  // Fallback to localhost if no external interface found
  if (addresses.length === 0) {
    addresses.push({
      interface: 'Local Loopback',
      address: '127.0.0.1',
      url: `http://localhost:${PORT}`
    });
  }

  return addresses;
}

// Serve static frontend files with caching
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1h',
  etag: true
}));
app.use(express.json({ limit: '50mb' }));

// Lightweight instant health / ping endpoint for keep-alive bots
app.get('/ping', (req, res) => res.status(200).send('pong'));
app.get('/health', (req, res) => res.status(200).json({ status: 'ok', uptime: process.uptime() }));

// API Endpoint to get connection details for other offline devices
app.get('/api/info', (req, res) => {
  const ipAddresses = getLocalIPAddresses();
  res.json({
    appName: 'MeshOffline',
    version: '1.0.0',
    port: PORT,
    ipAddresses,
    primaryUrl: ipAddresses[0] ? ipAddresses[0].url : `http://localhost:${PORT}`,
    connectedPeersCount: connectedPeers.size
  });
});

// Generate QR Code on demand (as SVG or PNG data URL)
app.get('/api/qr', async (req, res) => {
  try {
    const text = req.query.text || `http://${getLocalIPAddresses()[0]?.address || 'localhost'}:${PORT}`;
    const format = req.query.format || 'svg';

    if (format === 'png' || format === 'dataurl') {
      const dataUrl = await QRCode.toDataURL(text, { width: 240, margin: 2 });
      res.json({ dataUrl });
    } else {
      const svg = await QRCode.toString(text, { 
        type: 'svg', 
        width: 240, 
        margin: 2, 
        color: { dark: '#000000', light: '#ffffff' } 
      });
      res.type('image/svg+xml').send(svg);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Store connected clients: peerId -> { ws, info: { id, name, avatar, joinedAt, role } }
const connectedPeers = new Map();
// Message history in memory for current offline session (persisted on clients via IndexedDB)
const sessionMessages = [];

// Broadcast helper
function broadcast(message, excludeWs = null) {
  const payload = JSON.stringify(message);
  for (const [peerId, peer] of connectedPeers.entries()) {
    if (peer.ws !== excludeWs && peer.ws.readyState === WebSocket.OPEN) {
      peer.ws.send(payload);
    }
  }
}

// Send to specific peer
function sendToPeer(targetPeerId, message) {
  const peer = connectedPeers.get(targetPeerId);
  if (peer && peer.ws.readyState === WebSocket.OPEN) {
    peer.ws.send(JSON.stringify(message));
    return true;
  }
  return false;
}

// Get peer list
function getPeerList() {
  const list = [];
  for (const [id, peer] of connectedPeers.entries()) {
    list.push(peer.info);
  }
  return list;
}

wss.on('connection', (ws, req) => {
  let currentPeerId = null;
  ws.isAlive = true;
  ws.on('pong', () => { ws.isAlive = true; });

  ws.on('message', (raw) => {
    try {
      const data = JSON.parse(raw);

      switch (data.type) {
        case 'JOIN': {
          currentPeerId = data.peer.id;
          connectedPeers.set(currentPeerId, {
            ws,
            info: {
              ...data.peer,
              joinedAt: Date.now(),
              lastSeen: Date.now()
            }
          });

          // Send welcome acknowledgment + current peer list + recent session messages
          ws.send(JSON.stringify({
            type: 'WELCOME',
            peerId: currentPeerId,
            peers: getPeerList(),
            recentMessages: sessionMessages.slice(-50),
            serverAddresses: getLocalIPAddresses()
          }));

          // Notify all other peers
          broadcast({
            type: 'PEER_JOINED',
            peer: connectedPeers.get(currentPeerId).info,
            peers: getPeerList()
          }, ws);

          console.log(`[MeshHub] Peer joined: ${data.peer.name} (${currentPeerId})`);
          break;
        }

        case 'CHAT_MESSAGE': {
          const msg = {
            ...data.message,
            timestamp: data.message.timestamp || Date.now(),
            id: data.message.id || 'msg_' + Math.random().toString(36).substr(2, 9)
          };

          // Save to memory cache
          sessionMessages.push(msg);
          if (sessionMessages.length > 200) sessionMessages.shift();

          if (msg.targetId && msg.targetId !== 'broadcast') {
            // Direct message: send to target and sender
            sendToPeer(msg.targetId, {
              type: 'CHAT_MESSAGE',
              message: msg
            });
            ws.send(JSON.stringify({
              type: 'CHAT_MESSAGE',
              message: msg,
              isSelf: true
            }));
          } else {
            // Broadcast message to everyone
            broadcast({
              type: 'CHAT_MESSAGE',
              message: msg
            });
          }
          break;
        }

        case 'TACTICAL_ALERT': {
          // High priority outdoor / emergency alert ping
          const alert = {
            id: 'alert_' + Date.now(),
            senderId: data.senderId,
            senderName: data.senderName,
            alertType: data.alertType, // 'SOS', 'RESTING', 'TRAIL_MARKER', 'WATER', 'CUSTOM'
            text: data.text,
            timestamp: Date.now()
          };

          sessionMessages.push({
            id: alert.id,
            type: 'alert',
            ...alert
          });

          broadcast({
            type: 'TACTICAL_ALERT',
            alert
          });
          break;
        }

        case 'TYPING': {
          broadcast({
            type: 'TYPING',
            peerId: currentPeerId,
            isTyping: data.isTyping
          }, ws);
          break;
        }

        case 'MESSAGE_RECEIPT': {
          // Acknowledge delivered / read
          if (data.senderId) {
            sendToPeer(data.senderId, {
              type: 'MESSAGE_RECEIPT',
              messageId: data.messageId,
              status: data.status, // 'delivered' or 'read'
              byPeerId: currentPeerId
            });
          }
          break;
        }

        case 'MESSAGE_REACTION': {
          // Broadcast emoji reaction to all peers (or target peer)
          broadcast({
            type: 'MESSAGE_REACTION',
            messageId: data.messageId,
            emoji: data.emoji,
            peerId: currentPeerId,
            peerName: connectedPeers.get(currentPeerId)?.info?.name || 'User'
          });
          break;
        }

        // Live Push-To-Talk (PTT) Audio Blast
        case 'PTT_AUDIO': {
          broadcast({
            type: 'PTT_AUDIO',
            senderId: currentPeerId,
            senderName: data.senderName || 'Hiker',
            audioData: data.audioData,
            timestamp: Date.now()
          }, ws);
          break;
        }

        // Emergency SOS Broadcast
        case 'EMERGENCY_SOS': {
          broadcast({
            type: 'EMERGENCY_SOS',
            senderId: currentPeerId,
            senderName: data.senderName,
            coords: data.coords,
            active: data.active,
            timestamp: Date.now()
          });
          break;
        }

        // Team Safety Roll Call
        case 'ROLL_CALL_START': {
          broadcast({
            type: 'ROLL_CALL_START',
            senderId: currentPeerId,
            senderName: data.senderName,
            timestamp: Date.now()
          });
          break;
        }

        case 'ROLL_CALL_RESPONSE': {
          broadcast({
            type: 'ROLL_CALL_RESPONSE',
            senderId: currentPeerId,
            senderName: data.senderName,
            status: data.status, // 'ok' or 'help'
            coords: data.coords,
            timestamp: Date.now()
          });
          break;
        }

        // Battery Telemetry
        case 'BATTERY_STATUS': {
          broadcast({
            type: 'BATTERY_STATUS',
            senderId: currentPeerId,
            battery: data.battery
          }, ws);
          break;
        }

        // Live GPS Position Broadcast & Waypoints
        case 'GPS_BROADCAST': {
          broadcast({
            type: 'GPS_BROADCAST',
            senderId: currentPeerId,
            senderName: data.senderName,
            coords: data.coords,
            timestamp: Date.now()
          }, ws);
          break;
        }

        case 'WAYPOINT_ADD': {
          broadcast({
            type: 'WAYPOINT_ADD',
            waypoint: data.waypoint,
            senderId: currentPeerId
          });
          break;
        }

        // WebRTC Calling Signaling
        case 'CALL_INVITE':
        case 'CALL_ACCEPT':
        case 'CALL_REJECT':
        case 'CALL_OFFER':
        case 'CALL_ANSWER':
        case 'CALL_ICE':
        case 'CALL_END': {
          if (data.targetId) {
            sendToPeer(data.targetId, {
              ...data,
              senderId: currentPeerId
            });
          }
          break;
        }

        // General WebRTC Data Signaling Relay for local peers
        case 'WEBRTC_SIGNAL': {
          if (data.targetId) {
            sendToPeer(data.targetId, {
              type: 'WEBRTC_SIGNAL',
              senderId: currentPeerId,
              signal: data.signal
            });
          }
          break;
        }

        case 'HEARTBEAT': {
          if (currentPeerId && connectedPeers.has(currentPeerId)) {
            connectedPeers.get(currentPeerId).info.lastSeen = Date.now();
          } else if (data.peer && data.peer.id) {
            // Auto re-register peer if somehow missing
            currentPeerId = data.peer.id;
            connectedPeers.set(currentPeerId, {
              ws,
              info: {
                ...data.peer,
                joinedAt: Date.now(),
                lastSeen: Date.now()
              }
            });
            broadcast({
              type: 'PEER_JOINED',
              peer: data.peer,
              peers: getPeerList()
            }, ws);
          }
          ws.send(JSON.stringify({
            type: 'PEER_LIST_UPDATE',
            peers: getPeerList()
          }));
          break;
        }

        case 'GET_PEERS': {
          ws.send(JSON.stringify({
            type: 'PEER_LIST_UPDATE',
            peers: getPeerList()
          }));
          break;
        }

        default:
          console.warn('[MeshHub] Unknown message type:', data.type);
      }
    } catch (err) {
      console.error('[MeshHub] Error processing message:', err);
    }
  });

  ws.on('close', () => {
    if (currentPeerId && connectedPeers.has(currentPeerId)) {
      const existing = connectedPeers.get(currentPeerId);
      // ONLY delete if this socket is still the active socket for currentPeerId
      if (existing && existing.ws === ws) {
        connectedPeers.delete(currentPeerId);
        broadcast({
          type: 'PEER_LEFT',
          peerId: currentPeerId,
          peerName: existing.info.name,
          peers: getPeerList()
        });
        console.log(`[MeshHub] Peer left: ${existing.info.name} (${currentPeerId})`);
      }
    }
  });

  ws.on('error', (err) => {
    console.error('[MeshHub] WebSocket error:', err);
  });
});

// Periodic safe cleanup for closed sockets
const safeCleanupInterval = setInterval(() => {
  let changed = false;
  for (const [peerId, peer] of connectedPeers.entries()) {
    if (peer.ws.readyState !== WebSocket.OPEN) {
      connectedPeers.delete(peerId);
      changed = true;
      console.log(`[MeshHub] Cleaned up closed socket for peer: ${peer.info.name} (${peerId})`);
    }
  }
  if (changed) {
    broadcast({
      type: 'PEER_LIST_UPDATE',
      peers: getPeerList()
    });
  }
}, 15000);

wss.on('close', () => clearInterval(safeCleanupInterval));

server.listen(PORT, () => {
  console.log('\n======================================================');
  console.log('🚀 OFFLINE ZERO-INTERNET MESSAGING HUB STARTED');
  console.log('======================================================');
  const ips = getLocalIPAddresses();
  console.log('📱 Devices on this Wi-Fi/Hotspot can open in browser:');
  ips.forEach(ip => {
    console.log(`   ➜  ${ip.interface.padEnd(18)} : ${ip.url}`);
  });
  console.log('======================================================\n');
});
