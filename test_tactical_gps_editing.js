/**
 * Automated Verification Suite for Real Message Editing & Upgraded Tactical GPS / Flares
 */

const WebSocket = require('ws');
const http = require('http');
const { spawn } = require('child_process');

const PORT = 3014;
const WS_URL = `ws://127.0.0.1:${PORT}`;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runTacticalSuite() {
  console.log('🚀 Starting MeshChat Tactical GPS & Message Editing Test Suite...\n');

  const serverProcess = spawn('node', ['server.js', String(PORT)], {
    cwd: __dirname,
    shell: false
  });

  serverProcess.stdout.on('data', d => process.stdout.write('[Server] ' + d));
  serverProcess.stderr.on('data', d => process.stderr.write('[Server ERR] ' + d));

  await sleep(2500);

  // Connect Peer 1 (Alice)
  const clientAlice = new WebSocket(WS_URL);
  let aliceWelcome = null;
  const aliceMessages = [];

  await new Promise((resolve) => {
    clientAlice.on('open', () => {
      clientAlice.send(JSON.stringify({
        type: 'JOIN',
        peer: { id: 'peer_alice_tac', name: 'Alice_Tac', avatar: null }
      }));
      resolve();
    });
  });

  clientAlice.on('message', (raw) => {
    const data = JSON.parse(raw);
    if (data.type === 'WELCOME') aliceWelcome = data;
    aliceMessages.push(data);
  });

  // Connect Peer 2 (Bob)
  const clientBob = new WebSocket(WS_URL);
  let bobWelcome = null;
  const bobMessages = [];

  await new Promise((resolve) => {
    clientBob.on('open', () => {
      clientBob.send(JSON.stringify({
        type: 'JOIN',
        peer: { id: 'peer_bob_tac', name: 'Bob_Tac', avatar: null }
      }));
      resolve();
    });
  });

  clientBob.on('message', (raw) => {
    const data = JSON.parse(raw);
    if (data.type === 'WELCOME') bobWelcome = data;
    bobMessages.push(data);
  });

  await sleep(1000);

  console.log('--- TEST 1: Real-Time Message Editing ---');
  const msgId = 'msg_test_' + Date.now();
  
  // Alice sends original message
  clientAlice.send(JSON.stringify({
    type: 'MESSAGE',
    message: {
      id: msgId,
      senderId: 'peer_alice_tac',
      senderName: 'Alice_Tac',
      targetId: 'broadcast',
      text: 'Original message with a typo',
      timestamp: Date.now()
    }
  }));

  await sleep(500);

  // Alice edits the message
  clientAlice.send(JSON.stringify({
    type: 'MESSAGE_EDIT',
    messageId: msgId,
    newText: 'Perfect edited message without typos!'
  }));

  await sleep(500);

  const bobSawEdit = bobMessages.find(m => m.type === 'MESSAGE_EDIT' && m.messageId === msgId);
  if (bobSawEdit && bobSawEdit.newText === 'Perfect edited message without typos!') {
    console.log('✅ TEST 1 PASSED: Message edit successfully relayed across WebSocket with updated text!');
  } else {
    console.error('❌ TEST 1 FAILED: Bob did not receive MESSAGE_EDIT!', bobMessages);
    serverProcess.kill();
    process.exit(1);
  }

  console.log('\n--- TEST 2: Waypoint Sync & Real-Time Deletion ---');
  const wpId = 'wp_tactical_' + Date.now();
  clientAlice.send(JSON.stringify({
    type: 'WAYPOINT_ADD',
    waypoint: {
      id: wpId,
      name: 'Rally Point Bravo',
      icon: '🚩',
      lat: 17.3870,
      lon: 78.4890,
      timestamp: Date.now()
    }
  }));

  await sleep(500);

  const bobSawWpAdd = bobMessages.find(m => m.type === 'WAYPOINT_ADD' && m.waypoint && m.waypoint.id === wpId);
  if (bobSawWpAdd) {
    console.log('✅ TEST 2A PASSED: Waypoint addition synced to Bob.');
  } else {
    console.error('❌ TEST 2A FAILED: Bob did not receive WAYPOINT_ADD!');
    serverProcess.kill();
    process.exit(1);
  }

  // Alice deletes the waypoint
  clientAlice.send(JSON.stringify({
    type: 'WAYPOINT_DELETE',
    waypointId: wpId
  }));

  await sleep(500);

  const bobSawWpDel = bobMessages.find(m => m.type === 'WAYPOINT_DELETE' && m.waypointId === wpId);
  if (bobSawWpDel) {
    console.log('✅ TEST 2B PASSED: Waypoint deletion synced across mesh in real time!');
  } else {
    console.error('❌ TEST 2B FAILED: Bob did not receive WAYPOINT_DELETE!');
    serverProcess.kill();
    process.exit(1);
  }

  console.log('\n--- TEST 3: Emergency Distress Flare Beacon Broadcast ---');
  clientAlice.send(JSON.stringify({
    type: 'MAP_FLARE',
    flare: {
      id: 'flare_' + Date.now(),
      lat: 17.3855,
      lon: 78.4875,
      senderName: 'Alice_Tac',
      timestamp: Date.now()
    },
    senderName: 'Alice_Tac'
  }));

  await sleep(500);

  const bobSawFlare = bobMessages.find(m => m.type === 'MAP_FLARE' && m.senderName === 'Alice_Tac');
  if (bobSawFlare && bobSawFlare.flare) {
    console.log('✅ TEST 3 PASSED: Emergency flare broadcasted and received with live coordinates!');
  } else {
    console.error('❌ TEST 3 FAILED: Bob did not receive MAP_FLARE!');
    serverProcess.kill();
    process.exit(1);
  }

  clientAlice.close();
  clientBob.close();
  serverProcess.kill();

  console.log('\n🎉 ALL TACTICAL GPS & MESSAGE EDITING TESTS PASSED WITH 100% SUCCESS!');
  process.exit(0);
}

runTacticalSuite().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
