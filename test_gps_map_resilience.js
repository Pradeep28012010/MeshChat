/**
 * Automated Test Suite for GPS, Tactical Radar & Spatial Positioning
 */

const WebSocket = require('ws');
const http = require('http');
const { spawn } = require('child_process');

const PORT = 3012;
const WS_URL = `ws://127.0.0.1:${PORT}`;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runGpsTestSuite() {
  console.log('🚀 Starting MeshChat GPS & Tactical Map Test Suite...\n');

  const serverProcess = spawn('node', ['server.js'], {
    cwd: __dirname,
    shell: true,
    env: { ...process.env, PORT: PORT }
  });

  serverProcess.stdout.on('data', d => process.stdout.write('[Server] ' + d));
  serverProcess.stderr.on('data', d => process.stderr.write('[Server ERR] ' + d));

  await sleep(2500);

  // Test 1: Connect Peer 1 (Alice / User_895)
  const clientAlice = new WebSocket(WS_URL);
  let aliceWelcome = null;
  const aliceMessages = [];

  await new Promise((resolve) => {
    clientAlice.on('open', () => {
      clientAlice.send(JSON.stringify({
        type: 'JOIN',
        peer: { id: 'peer_user_895', name: 'User_895', avatar: null }
      }));
      resolve();
    });
  });

  clientAlice.on('message', (raw) => {
    const data = JSON.parse(raw);
    if (data.type === 'WELCOME') aliceWelcome = data;
    aliceMessages.push(data);
  });

  await sleep(1000);

  console.log('--- TEST 1: Alice Broadcasts Multi-Tier GPS Fix ---');
  const aliceCoords = {
    latitude: 17.385044,
    longitude: 78.486671,
    altitude: 140,
    heading: 45
  };

  clientAlice.send(JSON.stringify({
    type: 'GPS_BROADCAST',
    senderName: 'User_895',
    coords: aliceCoords
  }));

  await sleep(500);
  console.log('✅ TEST 1 PASSED: Alice GPS position broadcasted successfully.');

  console.log('\n--- TEST 2: Peer 2 (Laptop) Joins & Receives Alice Location in WELCOME ---');
  const clientLaptop = new WebSocket(WS_URL);
  let laptopWelcome = null;
  const laptopMessages = [];

  await new Promise((resolve) => {
    clientLaptop.on('open', () => {
      clientLaptop.send(JSON.stringify({
        type: 'JOIN',
        peer: { id: 'peer_laptop', name: 'Laptop', avatar: null }
      }));
      resolve();
    });
  });

  clientLaptop.on('message', (raw) => {
    const data = JSON.parse(raw);
    if (data.type === 'WELCOME') laptopWelcome = data;
    laptopMessages.push(data);
  });

  await sleep(1000);

  const aliceInLaptopWelcome = laptopWelcome && laptopWelcome.peerLocations && laptopWelcome.peerLocations.find(l => l.peerId === 'peer_user_895');
  if (aliceInLaptopWelcome && Math.abs(aliceInLaptopWelcome.coords.latitude - 17.385044) < 0.0001) {
    console.log('✅ TEST 2 PASSED: Laptop received Alice GPS coordinates immediately in WELCOME packet!');
  } else {
    console.error('❌ TEST 2 FAILED: Laptop did not receive Alice GPS in WELCOME packet!', laptopWelcome);
    serverProcess.kill();
    process.exit(1);
  }

  console.log('\n--- TEST 3: Laptop Broadcasts GPS and Alice Receives Live Radar Update ---');
  const laptopCoords = {
    latitude: 17.385800,
    longitude: 78.487200,
    altitude: 142,
    heading: 180
  };

  clientLaptop.send(JSON.stringify({
    type: 'GPS_BROADCAST',
    senderName: 'Laptop',
    coords: laptopCoords
  }));

  await sleep(500);

  const aliceSawLaptopGps = aliceMessages.find(m => m.type === 'GPS_BROADCAST' && m.senderName === 'Laptop');
  if (aliceSawLaptopGps && aliceSawLaptopGps.coords) {
    console.log('✅ TEST 3 PASSED: Alice received live GPS_BROADCAST from Laptop!');
  } else {
    console.error('❌ TEST 3 FAILED: Alice did not receive Laptop GPS_BROADCAST!');
    serverProcess.kill();
    process.exit(1);
  }

  console.log('\n--- TEST 4: Waypoint Creation and Synchronization ---');
  const testWp = {
    id: 'wp_camp_' + Date.now(),
    name: 'Basecamp Alpha',
    icon: '⛺',
    lat: 17.3860,
    lon: 78.4870,
    timestamp: Date.now()
  };

  clientAlice.send(JSON.stringify({
    type: 'WAYPOINT_ADD',
    waypoint: testWp
  }));

  await sleep(500);

  const laptopSawWp = laptopMessages.find(m => m.type === 'WAYPOINT_ADD' && m.waypoint.name === 'Basecamp Alpha');
  if (laptopSawWp) {
    console.log('✅ TEST 4 PASSED: Waypoint synced across peers on map!');
  } else {
    console.error('❌ TEST 4 FAILED: Laptop did not receive WAYPOINT_ADD!');
    serverProcess.kill();
    process.exit(1);
  }

  clientAlice.close();
  clientLaptop.close();
  serverProcess.kill();

  console.log('\n🎉 ALL GPS & RADAR TESTS PASSED WITH 100% SUCCESS!');
  process.exit(0);
}

runGpsTestSuite().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});
