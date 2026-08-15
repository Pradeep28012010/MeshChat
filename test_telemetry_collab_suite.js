/**
 * Automated Verification Suite for Collaborative Notes & Telemetry
 */

const WebSocket = require('ws');

const WS_URL = 'ws://localhost:3000';

async function runTelemetryCollabTest() {
  console.log('Testing Collaborative Notes & Telemetry Ping Suite...');

  const clientA = new WebSocket(WS_URL);
  const clientB = new WebSocket(WS_URL);

  let noteUpdateReceived = false;
  let pongReceived = false;

  await Promise.all([
    new Promise((resolve) => clientA.on('open', resolve)),
    new Promise((resolve) => clientB.on('open', resolve))
  ]);

  clientA.send(JSON.stringify({
    type: 'JOIN',
    peer: { id: 'peer_collab_a', name: 'Author_A' }
  }));

  clientB.send(JSON.stringify({
    type: 'JOIN',
    peer: { id: 'peer_collab_b', name: 'Author_B' }
  }));

  await new Promise(r => setTimeout(r, 200));

  clientB.on('message', (raw) => {
    const data = JSON.parse(raw);
    if (data.type === 'NOTE_UPDATE') {
      noteUpdateReceived = true;
      console.log(`✔ Author_B received NOTE_UPDATE: "${data.note.content.substring(0, 30)}..." from ${data.note.updatedBy}`);
    }
  });

  clientA.on('message', (raw) => {
    const data = JSON.parse(raw);
    if (data.type === 'PONG') {
      pongReceived = true;
      const rtt = Date.now() - data.clientTime;
      console.log(`✔ Author_A received PONG: ${rtt}ms round-trip`);
    }
  });

  // 1. Test Collaborative Note Update
  clientA.send(JSON.stringify({
    type: 'NOTE_UPDATE',
    noteContent: '# 🏕️ Expedition Checklist\n- [x] GPS Beacon\n- [x] Water Filter',
    updatedBy: 'Author_A'
  }));

  // 2. Test Ping / Pong Telemetry
  clientA.send(JSON.stringify({
    type: 'PING',
    clientTime: Date.now()
  }));

  await new Promise(r => setTimeout(r, 600));

  if (!noteUpdateReceived) throw new Error('Collaborative note update was not received!');
  if (!pongReceived) throw new Error('Ping/Pong telemetry was not received!');

  clientA.close();
  clientB.close();

  console.log('🎉 ALL COLLABORATIVE NOTES & TELEMETRY TESTS PASSED 100% SUCCESSFULLY!');
  process.exit(0);
}

runTelemetryCollabTest().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
