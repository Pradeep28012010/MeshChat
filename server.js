const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const os = require('os');
const fs = require('fs');
const QRCode = require('qrcode');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || process.argv[2] || 3000;

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

// Serve static frontend files with fresh cache-control headers
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: 0,
  etag: false,
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html') || filePath.endsWith('.js') || filePath.endsWith('.css') || filePath.endsWith('sw.js')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    }
  }
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

// Data Persistence Directory
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  try { fs.mkdirSync(DATA_DIR, { recursive: true }); } catch (e) {}
}
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');
const CHANNELS_FILE = path.join(DATA_DIR, 'channels.json');
const NOTES_FILE = path.join(DATA_DIR, 'notes.json');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');

// Store connected clients: peerId -> { ws, info: { id, name, avatar, joinedAt, role } }
const connectedPeers = new Map();

// Message history in memory + persistent disk storage
let sessionMessages = [];
try {
  if (fs.existsSync(MESSAGES_FILE)) {
    sessionMessages = JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf-8')) || [];
  }
} catch (e) {
  sessionMessages = [];
}

let serverChannels = [];
try {
  if (fs.existsSync(CHANNELS_FILE)) {
    serverChannels = JSON.parse(fs.readFileSync(CHANNELS_FILE, 'utf-8')) || [];
  }
} catch (e) {
  serverChannels = [];
}

// Per-Room & Per-DM isolated shared notes
let activeSharedNotes = {
  'room_general': {
    contextId: 'room_general',
    content: "# 📋 #general Notes & Checklist\n\n- [x] Welcome to MeshChat!\n- [ ] Plan meetup\n- [ ] Share route",
    updatedBy: "System",
    updatedAt: Date.now()
  }
};
try {
  if (fs.existsSync(NOTES_FILE)) {
    activeSharedNotes = JSON.parse(fs.readFileSync(NOTES_FILE, 'utf-8')) || activeSharedNotes;
  }
} catch (e) {
  activeSharedNotes = {};
}

// Instagram-style approved contact pairs (e.g. "peerA:::peerB")
let acceptedContactPairs = new Set();
try {
  if (fs.existsSync(CONTACTS_FILE)) {
    const list = JSON.parse(fs.readFileSync(CONTACTS_FILE, 'utf-8')) || [];
    list.forEach(k => acceptedContactPairs.add(k));
  }
} catch (e) {
  acceptedContactPairs = new Set();
}

function getPairKey(a, b) {
  return [a, b].sort().join(':::');
}

let saveMsgTimeout = null;
function saveMessagesToDisk() {
  clearTimeout(saveMsgTimeout);
  saveMsgTimeout = setTimeout(() => {
    try {
      fs.writeFileSync(MESSAGES_FILE, JSON.stringify(sessionMessages.slice(-500)), 'utf-8');
    } catch (e) {
      console.warn('[Storage] Error saving messages to disk:', e);
    }
  }, 400);
}

let saveChanTimeout = null;
function saveChannelsToDisk() {
  clearTimeout(saveChanTimeout);
  saveChanTimeout = setTimeout(() => {
    try {
      fs.writeFileSync(CHANNELS_FILE, JSON.stringify(serverChannels), 'utf-8');
    } catch (e) {
      console.warn('[Storage] Error saving channels to disk:', e);
    }
  }, 400);
}

let saveNotesTimeout = null;
function saveNotesToDisk() {
  clearTimeout(saveNotesTimeout);
  saveNotesTimeout = setTimeout(() => {
    try {
      fs.writeFileSync(NOTES_FILE, JSON.stringify(activeSharedNotes), 'utf-8');
    } catch (e) {
      console.warn('[Storage] Error saving notes to disk:', e);
    }
  }, 400);
}

function saveContactsToDisk() {
  try {
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify(Array.from(acceptedContactPairs)), 'utf-8');
  } catch (e) {
    console.warn('[Storage] Error saving contacts to disk:', e);
  }
}

// Synchronized Group Timer / Rendezvous Countdown
let activeSharedTimer = {
  title: "Group Countdown",
  durationSec: 300,
  startedAt: null,
  isRunning: false,
  senderName: "System"
};

// Shared Group Expense Tally Splitter
let activeSharedExpenses = [];

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

function getChannelsForPeer(peerId) {
  return serverChannels.filter(ch => {
    if (!ch.isPrivate) return true;
    if (ch.creatorId === peerId) return true;
    if (ch.members && Array.isArray(ch.members) && ch.members.includes(peerId)) return true;
    return false;
  });
}

const activePeerLocations = new Map();

function getPeerLocationsList() {
  const list = [];
  for (const [id, loc] of activePeerLocations.entries()) {
    list.push({ peerId: id, ...loc });
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

          // Send welcome acknowledgment + current peer list + recent session messages + allowed channels + allNotes + contacts + peerLocations
          ws.send(JSON.stringify({
            type: 'WELCOME',
            peerId: currentPeerId,
            peers: getPeerList(),
            channels: getChannelsForPeer(currentPeerId),
            peerLocations: getPeerLocationsList(),
            recentMessages: sessionMessages.slice(-100),
            serverAddresses: getLocalIPAddresses(),
            allNotes: activeSharedNotes,
            acceptedContacts: Array.from(acceptedContactPairs),
            sharedTimer: activeSharedTimer,
            sharedExpenses: activeSharedExpenses
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

        case 'PROFILE_UPDATE': {
          if (currentPeerId && connectedPeers.has(currentPeerId)) {
            const p = connectedPeers.get(currentPeerId);
            p.info = { ...p.info, ...data.peer };
            broadcast({
              type: 'PROFILE_UPDATE',
              peer: p.info,
              peers: getPeerList()
            });
          }
          break;
        }

        case 'SYNC_REQUEST': {
          const since = data.since || 0;
          const missed = sessionMessages.filter(m => (m.timestamp || 0) > since);
          ws.send(JSON.stringify({
            type: 'SYNC_RESPONSE',
            messages: missed,
            channels: getChannelsForPeer(currentPeerId),
            peerLocations: getPeerLocationsList(),
            allNotes: activeSharedNotes,
            acceptedContacts: Array.from(acceptedContactPairs),
            sharedTimer: activeSharedTimer,
            sharedExpenses: activeSharedExpenses
          }));
          break;
        }

        case 'MESSAGE_DELIVERED': {
          if (data.senderId) {
            sendToPeer(data.senderId, {
              type: 'MESSAGE_DELIVERED',
              messageId: data.messageId,
              deliveredTo: currentPeerId
            });
          }
          break;
        }

        case 'CHAT_MESSAGE': {
          const msg = {
            ...data.message,
            timestamp: data.message.timestamp || Date.now(),
            id: data.message.id || 'msg_' + Math.random().toString(36).substr(2, 9)
          };

          // Save to persistent storage & memory cache
          sessionMessages.push(msg);
          if (sessionMessages.length > 500) sessionMessages.shift();
          saveMessagesToDisk();

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

        // Live Polls & Group Voting
        case 'POLL_VOTE': {
          const pollMsg = sessionMessages.find(m => m.id === data.pollId);
          if (pollMsg && pollMsg.options) {
            pollMsg.options.forEach((opt, idx) => {
              if (!opt.voters) opt.voters = [];
              const uIdx = opt.voters.indexOf(currentPeerId);
              if (idx === data.optionIndex) {
                if (uIdx === -1) opt.voters.push(currentPeerId);
              } else {
                if (uIdx !== -1) opt.voters.splice(uIdx, 1);
              }
            });
            saveMessagesToDisk();
          }

          broadcast({
            type: 'POLL_VOTE',
            pollId: data.pollId,
            optionIndex: data.optionIndex,
            voterId: currentPeerId,
            voterName: data.voterName || 'User'
          });
          break;
        }

        // Instagram-style Privacy: Contact Request, Accept, Decline
        case 'CONTACT_REQUEST': {
          if (data.targetId) {
            sendToPeer(data.targetId, {
              type: 'CONTACT_REQUEST',
              fromPeer: connectedPeers.get(currentPeerId)?.info || { id: currentPeerId, name: 'Peer' }
            });
          }
          break;
        }

        case 'CONTACT_ACCEPT': {
          if (data.targetId) {
            const pairKey = getPairKey(currentPeerId, data.targetId);
            acceptedContactPairs.add(pairKey);
            saveContactsToDisk();

            const myInfo = connectedPeers.get(currentPeerId)?.info;
            const targetInfo = connectedPeers.get(data.targetId)?.info;

            sendToPeer(data.targetId, {
              type: 'CONTACT_ACCEPTED',
              peer: myInfo
            });
            ws.send(JSON.stringify({
              type: 'CONTACT_ACCEPTED',
              peer: targetInfo
            }));
          }
          break;
        }

        case 'CONTACT_DECLINE': {
          if (data.targetId) {
            sendToPeer(data.targetId, {
              type: 'CONTACT_DECLINED',
              fromPeerId: currentPeerId
            });
          }
          break;
        }

        // Message Editing
        case 'MESSAGE_EDIT': {
          // Update memory session if present
          const sessionMsg = sessionMessages.find(m => m.id === data.messageId);
          if (sessionMsg) {
            sessionMsg.text = data.newText;
            sessionMsg.isEdited = true;
            saveMessagesToDisk();
          }

          broadcast({
            type: 'MESSAGE_EDIT',
            messageId: data.messageId,
            newText: data.newText,
            senderId: currentPeerId
          });
          break;
        }

        // Delete for Everyone
        case 'MESSAGE_DELETE': {
          const idx = sessionMessages.findIndex(m => m.id === data.messageId);
          if (idx !== -1) {
            sessionMessages.splice(idx, 1);
            saveMessagesToDisk();
          }

          broadcast({
            type: 'MESSAGE_DELETE',
            messageId: data.messageId,
            senderId: currentPeerId
          });
          break;
        }

        // Pinned Announcements
        case 'PIN_MESSAGE': {
          broadcast({
            type: 'PIN_MESSAGE',
            messageId: data.messageId,
            message: data.message,
            unpin: !!data.unpin,
            pinnedBy: currentPeerId
          });
          break;
        }

        // Shared Group Events & RSVPs
        case 'EVENT_RSVP': {
          broadcast({
            type: 'EVENT_RSVP',
            eventId: data.eventId,
            status: data.status, // 'going', 'maybe', 'decline'
            voterId: currentPeerId,
            voterName: data.voterName || 'User'
          });
          break;
        }

        // Multiplayer In-Chat Mini Games (3D Dice Duel & RPS Showdown)
        case 'GAME_MOVE': {
          broadcast({
            type: 'GAME_MOVE',
            gameId: data.gameId,
            moveData: data.moveData,
            senderId: currentPeerId,
            senderName: data.senderName || 'Player'
          });
          break;
        }

        // Custom Sub-Channels Creation, Privacy & Member Management
        case 'CHANNEL_CREATE': {
          if (data.channel && !serverChannels.find(c => c.id === data.channel.id)) {
            const ch = {
              ...data.channel,
              creatorId: currentPeerId,
              creatorName: connectedPeers.get(currentPeerId)?.info?.name || 'Admin',
              members: data.channel.members || [currentPeerId],
              createdAt: Date.now()
            };
            serverChannels.push(ch);
            saveChannelsToDisk();

            if (ch.isPrivate) {
              // Send only to creator and initial invited members
              ch.members.forEach(memId => {
                sendToPeer(memId, {
                  type: 'CHANNEL_CREATE',
                  channel: ch
                });
              });
            } else {
              broadcast({
                type: 'CHANNEL_CREATE',
                channel: ch
              });
            }
          }
          break;
        }

        case 'ROOM_INVITE': {
          const ch = serverChannels.find(c => c.id === data.channelId);
          if (ch && data.targetPeerId) {
            if (!ch.members) ch.members = [ch.creatorId];
            if (!ch.members.includes(data.targetPeerId)) {
              ch.members.push(data.targetPeerId);
              saveChannelsToDisk();
            }

            // Notify target peer with invite packet
            sendToPeer(data.targetPeerId, {
              type: 'ROOM_INVITE',
              channel: ch,
              inviterName: connectedPeers.get(currentPeerId)?.info?.name || 'Admin'
            });

            // Update room members for all current members
            ch.members.forEach(memId => {
              sendToPeer(memId, {
                type: 'CHANNEL_UPDATE',
                channel: ch
              });
            });
          }
          break;
        }

        case 'ROOM_MEMBER_KICK': {
          const ch = serverChannels.find(c => c.id === data.channelId);
          if (ch && (ch.creatorId === currentPeerId || ch.creatorId === data.adminId)) {
            if (ch.members) {
              ch.members = ch.members.filter(m => m !== data.targetMemberId);
              saveChannelsToDisk();
            }

            // Notify kicked member
            sendToPeer(data.targetMemberId, {
              type: 'ROOM_KICKED',
              channelId: ch.id,
              channelName: ch.name
            });

            // Update channel for remaining members
            ch.members.forEach(memId => {
              sendToPeer(memId, {
                type: 'CHANNEL_UPDATE',
                channel: ch
              });
            });
          }
          break;
        }

        case 'ROOM_LEAVE': {
          const ch = serverChannels.find(c => c.id === data.channelId);
          if (ch && ch.members) {
            ch.members = ch.members.filter(m => m !== currentPeerId);
            saveChannelsToDisk();

            ch.members.forEach(memId => {
              sendToPeer(memId, {
                type: 'CHANNEL_UPDATE',
                channel: ch
              });
            });
          }
          break;
        }

        case 'CHANNEL_DELETE': {
          serverChannels = serverChannels.filter(c => c.id !== data.channelId);
          saveChannelsToDisk();
          broadcast({
            type: 'CHANNEL_DELETE',
            channelId: data.channelId
          });
          break;
        }

        case 'CLEAR_ROOM_HISTORY': {
          if (data.channelId) {
            sessionMessages = sessionMessages.filter(m => m.channelId !== data.channelId);
            saveMessagesToDisk();
          }
          broadcast({
            type: 'CLEAR_ROOM_HISTORY',
            channelId: data.channelId,
            senderName: data.senderName
          });
          break;
        }

        // Context-Specific Collaborative Notebook Sync (Per-Room / Per-DM)
        case 'NOTE_UPDATE': {
          const contextId = data.contextId || 'room_general';
          const noteObj = {
            contextId: contextId,
            content: data.noteContent,
            updatedBy: data.updatedBy || 'User',
            updatedAt: Date.now()
          };
          activeSharedNotes[contextId] = noteObj;
          saveNotesToDisk();

          broadcast({
            type: 'NOTE_UPDATE',
            contextId: contextId,
            note: noteObj,
            senderId: currentPeerId
          }, ws);
          break;
        }

        // Live Round-Trip Ping Latency Telemetry
        case 'PING': {
          ws.send(JSON.stringify({
            type: 'PONG',
            clientTime: data.clientTime,
            serverTime: Date.now()
          }));
          break;
        }

        // Synchronized Group Countdown & Rendezvous Timer
        case 'TIMER_SYNC': {
          activeSharedTimer = {
            title: data.title || 'Group Timer',
            durationSec: data.durationSec || 300,
            startedAt: data.startedAt,
            isRunning: !!data.isRunning,
            senderName: data.senderName || 'Peer'
          };

          broadcast({
            type: 'TIMER_SYNC',
            timer: activeSharedTimer,
            senderId: currentPeerId
          }, ws);
          break;
        }

        // Shared Group Expense Splitter
        case 'EXPENSE_ADD': {
          activeSharedExpenses.push(data.expense);
          broadcast({
            type: 'EXPENSE_ADD',
            expense: data.expense,
            expenses: activeSharedExpenses,
            senderId: currentPeerId
          }, ws);
          break;
        }

        case 'EXPENSE_DELETE': {
          activeSharedExpenses = activeSharedExpenses.filter(e => e.id !== data.expenseId);
          broadcast({
            type: 'EXPENSE_DELETE',
            expenseId: data.expenseId,
            expenses: activeSharedExpenses,
            senderId: currentPeerId
          });
          break;
        }

        case 'EXPENSE_RESET': {
          activeSharedExpenses = [];
          broadcast({
            type: 'EXPENSE_RESET',
            senderId: currentPeerId
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
          if (data.coords) {
            activePeerLocations.set(currentPeerId, {
              name: data.senderName || 'Peer',
              coords: data.coords,
              timestamp: Date.now()
            });
          }
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

        case 'WAYPOINT_DELETE': {
          broadcast({
            type: 'WAYPOINT_DELETE',
            waypointId: data.waypointId,
            senderId: currentPeerId
          });
          break;
        }

        case 'MAP_FLARE': {
          broadcast({
            type: 'MAP_FLARE',
            flare: data.flare,
            senderId: currentPeerId,
            senderName: data.senderName
          });
          break;
        }

        // Geofence & Lost Hiker Perimeter Alert
        case 'GEOFENCE_ALERT': {
          broadcast({
            type: 'GEOFENCE_ALERT',
            senderId: currentPeerId,
            senderName: data.senderName,
            distance: data.distance,
            maxRadius: data.maxRadius,
            coords: data.coords,
            timestamp: Date.now()
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

        // Multi-Hop Mesh Packet Relay Engine
        case 'RELAY_PACKET': {
          const packet = data.packet;
          if (!packet || packet.hopsRemaining <= 0) break;
          packet.hopsRemaining -= 1;
          packet.visitedNodes = packet.visitedNodes || [];
          if (!packet.visitedNodes.includes(currentPeerId)) {
            packet.visitedNodes.push(currentPeerId);
          }

          if (packet.targetId && packet.targetId !== 'broadcast') {
            sendToPeer(packet.targetId, {
              type: 'RELAY_PACKET',
              packet: packet
            });
          } else {
            broadcast({
              type: 'RELAY_PACKET',
              packet: packet
            }, ws);
          }
          break;
        }

        // Chunked P2P File Transfer Signaling
        case 'FILE_TRANSFER_OFFER':
        case 'FILE_TRANSFER_CHUNK':
        case 'FILE_TRANSFER_ACK':
        case 'FILE_TRANSFER_COMPLETE': {
          if (data.targetId && data.targetId !== 'broadcast') {
            sendToPeer(data.targetId, {
              ...data,
              senderId: currentPeerId
            });
          } else {
            broadcast({
              ...data,
              senderId: currentPeerId
            }, ws);
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
        activePeerLocations.delete(currentPeerId);
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

server.listen(PORT, '0.0.0.0', () => {
  console.log('\n======================================================');
  console.log(`🚀 MESHCAT SERVER STARTED ON PORT ${PORT}`);
  console.log('======================================================');
  const ips = getLocalIPAddresses();
  console.log('📱 Accessible addresses:');
  ips.forEach(ip => {
    console.log(`   ➜  ${ip.interface.padEnd(18)} : ${ip.url}`);
  });
  console.log('======================================================\n');
});
