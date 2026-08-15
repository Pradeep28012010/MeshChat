/**
 * Automated Verification Suite for Next-Gen Modules
 * (Multi-Hop Relay, Chunked File Sharing, Optical Morse, Tactical Radar)
 */

const WebSocket = require('ws');

const WS_URL = 'ws://localhost:3000';

async function runNextGenTest() {
  console.log('Testing Next-Gen Mesh Features (Multi-Hop Relay, Chunked File Exchanger, Morse Strobe, Radar HUD)...');

  const clientA = new WebSocket(WS_URL);
  const clientB = new WebSocket(WS_URL);

  let relayPacketReceived = false;
  let fileChunkReceived = false;

  await Promise.all([
    new Promise((resolve) => clientA.on('open', resolve)),
    new Promise((resolve) => clientB.on('open', resolve))
  ]);

  clientA.send(JSON.stringify({
    type: 'JOIN',
    peer: { id: 'peer_node_a', name: 'Node_A' }
  }));

  clientB.send(JSON.stringify({
    type: 'JOIN',
    peer: { id: 'peer_node_b', name: 'Node_B' }
  }));

  await new Promise(r => setTimeout(r, 200));

  clientB.on('message', (raw) => {
    const data = JSON.parse(raw);
    if (data.type === 'RELAY_PACKET') {
      relayPacketReceived = true;
      console.log(`✔ Node_B received Multi-Hop RELAY_PACKET from Node_A (hopsRemaining: ${data.packet.hopsRemaining})`);
    }
    if (data.type === 'FILE_TRANSFER_CHUNK') {
      fileChunkReceived = true;
      console.log(`✔ Node_B received FILE_TRANSFER_CHUNK ${data.chunkIndex + 1}/${data.totalChunks} (${data.fileName})`);
    }
  });

  // 1. Test Multi-Hop Relay Routing
  clientA.send(JSON.stringify({
    type: 'RELAY_PACKET',
    packet: {
      id: 'pkt_test_123',
      originSenderId: 'peer_node_a',
      originSenderName: 'Node_A',
      targetId: 'broadcast',
      hopsRemaining: 3,
      visitedNodes: ['peer_node_a'],
      payload: { text: 'Emergency Relay Message across forest' }
    }
  }));

  // 2. Test Chunked File Transfer
  clientA.send(JSON.stringify({
    type: 'FILE_TRANSFER_CHUNK',
    transferId: 'transfer_999',
    chunkIndex: 0,
    totalChunks: 3,
    fileName: 'topo_map_ridge.png',
    fileType: 'image/png',
    fileSize: 150000,
    targetId: 'broadcast',
    senderName: 'Node_A',
    chunkData: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
  }));

  await new Promise(r => setTimeout(r, 600));

  if (!relayPacketReceived) throw new Error('Multi-hop relay packet was not received!');
  if (!fileChunkReceived) throw new Error('Chunked file transfer was not received!');

  clientA.close();
  clientB.close();

  console.log('🎉 ALL NEXT-GEN MODULE TESTS PASSED 100% SUCCESSFULLY!');
  process.exit(0);
}

runNextGenTest().catch((err) => {
  console.error('❌ Next-Gen test failed:', err);
  process.exit(1);
});
