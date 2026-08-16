/**
 * Automated Verification Suite for RPS 2-Player Duel, GPS Precision Calibration, and Profile Modal
 */

const WebSocket = require('ws');
const { spawn } = require('child_process');

const PORT = 3018;
const WS_URL = `ws://127.0.0.1:${PORT}`;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runRpsAndGpsSuite() {
  console.log('🚀 Starting MeshChat RPS Duel, GPS Accuracy & Profile Suite...\n');

  const serverProcess = spawn('node', ['server.js', String(PORT)], {
    cwd: __dirname,
    shell: false
  });

  await new Promise((resolve) => {
    serverProcess.stdout.on('data', d => {
      process.stdout.write('[Server] ' + d);
      if (d.toString().includes('MESHCAT SERVER STARTED')) resolve();
    });
    serverProcess.stderr.on('data', d => process.stderr.write('[Server ERR] ' + d));
    setTimeout(resolve, 3500);
  });

  await sleep(500);

  // Connect Alice
  const clientAlice = new WebSocket(WS_URL);
  const aliceMessages = [];
  await new Promise((resolve) => {
    clientAlice.on('open', () => {
      clientAlice.send(JSON.stringify({
        type: 'JOIN',
        peer: { id: 'peer_alice_rps', name: 'Alice_RPS', avatar: null }
      }));
      resolve();
    });
  });
  clientAlice.on('message', (raw) => aliceMessages.push(JSON.parse(raw)));

  // Connect Bob
  const clientBob = new WebSocket(WS_URL);
  const bobMessages = [];
  await new Promise((resolve) => {
    clientBob.on('open', () => {
      clientBob.send(JSON.stringify({
        type: 'JOIN',
        peer: { id: 'peer_bob_rps', name: 'Bob_RPS', avatar: null }
      }));
      resolve();
    });
  });
  clientBob.on('message', (raw) => bobMessages.push(JSON.parse(raw)));

  await sleep(1000);

  console.log('--- TEST 1: Two-Player Real-Time Rock Paper Scissors Challenge & Duel ---');
  const challengeId = 'rps_' + Date.now();

  // Alice challenges the room with secret move 'rock'
  clientAlice.send(JSON.stringify({
    type: 'RPS_CHALLENGE',
    challengeId: challengeId,
    challengerName: 'Alice_RPS',
    challengerMove: 'rock',
    channelId: 'general'
  }));

  await sleep(600);

  const bobSawChallenge = bobMessages.find(m => m.type === 'RPS_CHALLENGE' && m.challengeId === challengeId);
  if (bobSawChallenge) {
    console.log('✅ TEST 1A PASSED: Bob received real-time RPS challenge card from Alice!');
  } else {
    console.error('❌ TEST 1A FAILED: Bob did not receive RPS_CHALLENGE!');
    serverProcess.kill();
    process.exit(1);
  }

  // Bob accepts and chooses 'scissors'
  clientBob.send(JSON.stringify({
    type: 'RPS_ACCEPT',
    challengeId: challengeId,
    challengerId: 'peer_alice_rps',
    challengerName: 'Alice_RPS',
    challengerMove: 'rock',
    opponentName: 'Bob_RPS',
    opponentMove: 'scissors'
  }));

  await sleep(800);

  const aliceSawShowdown = aliceMessages.find(m => m.type === 'RPS_SHOWDOWN' && m.challengeId === challengeId);
  const bobSawShowdown = bobMessages.find(m => m.type === 'RPS_SHOWDOWN' && m.challengeId === challengeId);

  if (aliceSawShowdown && bobSawShowdown && aliceSawShowdown.outcome === 'challenger_win') {
    console.log('✅ TEST 1B PASSED: Both players received synchronized RPS_SHOWDOWN (Rock beats Scissors ➜ Alice Wins)!');
  } else {
    console.error('❌ TEST 1B FAILED: Showdown resolution mismatch!', aliceSawShowdown);
    serverProcess.kill();
    process.exit(1);
  }

  console.log('\n--- TEST 2: GPS Precision Calibration & Location Broadcasting ---');
  const homeCoords = {
    latitude: 17.44829,
    longitude: 78.39148,
    accuracy: 4,
    altitude: 540,
    heading: 0,
    speed: 0
  };

  clientAlice.send(JSON.stringify({
    type: 'GPS_BROADCAST',
    senderName: 'Alice_RPS',
    coords: homeCoords
  }));

  await sleep(600);

  const bobSawGps = bobMessages.find(m => m.type === 'GPS_BROADCAST' && m.coords && m.coords.latitude === homeCoords.latitude);
  if (bobSawGps && bobSawGps.coords.accuracy === 4) {
    console.log('✅ TEST 2 PASSED: High-precision home GPS broadcasted and received across mesh with 4m accuracy!');
  } else {
    console.error('❌ TEST 2 FAILED: GPS broadcast not received with precision!', bobSawGps);
    serverProcess.kill();
    process.exit(1);
  }

  console.log('\n--- TEST 3: Profile & Field Status Update ---');
  clientAlice.send(JSON.stringify({
    type: 'PROFILE_UPDATE',
    peer: {
      id: 'peer_alice_rps',
      name: 'Alice_Commander',
      status: '🏕️ In Field / Tactical',
      avatar: 'data:image/jpeg;base64,mock'
    }
  }));

  await sleep(600);

  const bobSawProfile = bobMessages.find(m => m.type === 'PROFILE_UPDATE' && m.peer && m.peer.name === 'Alice_Commander');
  if (bobSawProfile && bobSawProfile.peer.status === '🏕️ In Field / Tactical') {
    console.log('✅ TEST 3 PASSED: Profile and Field Status updated and synchronized to peers!');
  } else {
    console.error('❌ TEST 3 FAILED: Profile update mismatch!', bobSawProfile);
    serverProcess.kill();
    process.exit(1);
  }

  clientAlice.close();
  clientBob.close();
  serverProcess.kill();

  console.log('\n🎉 ALL RPS DUEL, GPS & PROFILE TESTS PASSED WITH 100% SUCCESS!');
  process.exit(0);
}

runRpsAndGpsSuite().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
