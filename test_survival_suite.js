const WebSocket = require('ws');

async function testSurvivalSuite() {
  console.log('Testing Wilderness Survival & Emergency Suite (SOS, Roll Call, Battery)...');

  const ws1 = new WebSocket('ws://127.0.0.1:3000');
  const ws2 = new WebSocket('ws://127.0.0.1:3000');

  let sosReceived = false;
  let rollCallStartReceived = false;
  let rollCallResponseReceived = false;
  let batteryReceived = false;

  await Promise.all([
    new Promise((resolve) => {
      ws1.on('open', () => {
        ws1.send(JSON.stringify({
          type: 'JOIN',
          peer: { id: 'peer_leader', name: 'Leader' }
        }));
      });
      ws1.on('message', (raw) => {
        const d = JSON.parse(raw);
        if (d.type === 'WELCOME') resolve();
      });
    }),
    new Promise((resolve) => {
      ws2.on('open', () => {
        ws2.send(JSON.stringify({
          type: 'JOIN',
          peer: { id: 'peer_scout', name: 'Scout' }
        }));
      });
      ws2.on('message', (raw) => {
        const d = JSON.parse(raw);
        if (d.type === 'WELCOME') resolve();
      });
    })
  ]);

  console.log('✔ Both Leader and Scout joined mesh');

  // Scout listener
  ws2.on('message', (raw) => {
    const data = JSON.parse(raw);

    // 1. SOS Emergency Check
    if (data.type === 'EMERGENCY_SOS' && data.active) {
      console.log('✔ Scout received EMERGENCY SOS from Leader at coordinates:', data.coords);
      sosReceived = true;
    }

    // 2. Roll Call Start Check
    if (data.type === 'ROLL_CALL_START') {
      console.log('✔ Scout received Roll Call request from Leader');
      rollCallStartReceived = true;

      // Scout sends OK response
      ws2.send(JSON.stringify({
        type: 'ROLL_CALL_RESPONSE',
        senderName: 'Scout',
        status: 'ok',
        coords: { latitude: 37.7752, longitude: -122.4188 }
      }));
    }

    // 3. Battery Telemetry Check
    if (data.type === 'BATTERY_STATUS' && data.battery) {
      console.log('✔ Scout received Leader Battery Telemetry:', data.battery.level, '%');
      batteryReceived = true;
    }
  });

  // Leader listener
  ws1.on('message', (raw) => {
    const data = JSON.parse(raw);

    // 4. Roll Call Response Check
    if (data.type === 'ROLL_CALL_RESPONSE' && data.senderName === 'Scout') {
      console.log('✔ Leader received Scout Roll Call Response:', data.status);
      rollCallResponseReceived = true;
    }
  });

  await new Promise((res) => setTimeout(res, 100));

  // Leader broadcasts Battery status
  ws1.send(JSON.stringify({
    type: 'BATTERY_STATUS',
    battery: { level: 92, charging: false }
  }));

  // Leader broadcasts Emergency SOS
  ws1.send(JSON.stringify({
    type: 'EMERGENCY_SOS',
    senderName: 'Leader',
    coords: { latitude: 37.7749, longitude: -122.4194 },
    active: true
  }));

  // Leader initiates Team Roll Call
  ws1.send(JSON.stringify({
    type: 'ROLL_CALL_START',
    senderName: 'Leader'
  }));

  await new Promise((res) => setTimeout(res, 800));

  ws1.close();
  ws2.close();

  if (sosReceived && rollCallStartReceived && rollCallResponseReceived && batteryReceived) {
    console.log('🎉 ALL SURVIVAL & EMERGENCY TESTS PASSED SUCCESSFULLY!');
    process.exit(0);
  } else {
    console.error('❌ Test failed. State:', {
      sosReceived,
      rollCallStartReceived,
      rollCallResponseReceived,
      batteryReceived
    });
    process.exit(1);
  }
}

testSurvivalSuite();
