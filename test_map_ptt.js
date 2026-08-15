const WebSocket = require('ws');

async function testMapAndPtt() {
  console.log('Testing Offline Tactical Map & Walkie-Talkie (PTT) Suite...');

  const ws1 = new WebSocket('ws://127.0.0.1:3000');
  const ws2 = new WebSocket('ws://127.0.0.1:3000');

  let pttReceived = false;
  let gpsReceived = false;
  let waypointReceived = false;

  await Promise.all([
    new Promise((resolve) => {
      ws1.on('open', () => {
        ws1.send(JSON.stringify({
          type: 'JOIN',
          peer: { id: 'peer_alice', name: 'Alice' }
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
          peer: { id: 'peer_bob', name: 'Bob' }
        }));
      });
      ws2.on('message', (raw) => {
        const d = JSON.parse(raw);
        if (d.type === 'WELCOME') resolve();
      });
    })
  ]);

  console.log('✔ Both peers connected on local mesh');

  ws2.on('message', (raw) => {
    const data = JSON.parse(raw);

    // 1. PTT Audio check
    if (data.type === 'PTT_AUDIO') {
      console.log('✔ Bob received Alice Push-to-Talk audio blast (data length:', data.audioData.length, ')');
      pttReceived = true;
    }

    // 2. GPS broadcast check
    if (data.type === 'GPS_BROADCAST' && data.coords) {
      console.log('✔ Bob received Alice live GPS position:', data.coords);
      gpsReceived = true;
    }

    // 3. Waypoint check
    if (data.type === 'WAYPOINT_ADD' && data.waypoint) {
      console.log('✔ Bob received custom waypoint:', data.waypoint.name, data.waypoint.icon);
      waypointReceived = true;
    }
  });

  await new Promise((res) => setTimeout(res, 100));

  // Alice sends PTT Voice Blast
  ws1.send(JSON.stringify({
    type: 'PTT_AUDIO',
    senderName: 'Alice',
    audioData: 'data:audio/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAA='
  }));

  // Alice broadcasts GPS Position
  ws1.send(JSON.stringify({
    type: 'GPS_BROADCAST',
    senderName: 'Alice',
    coords: { latitude: 37.7749, longitude: -122.4194, altitude: 45 }
  }));

  // Alice drops a Waypoint
  ws1.send(JSON.stringify({
    type: 'WAYPOINT_ADD',
    waypoint: {
      id: 'wp_test_1',
      name: 'Campsite Alpha',
      icon: '⛺',
      lat: 37.7750,
      lon: -122.4190,
      timestamp: Date.now()
    }
  }));

  await new Promise((res) => setTimeout(res, 800));

  ws1.close();
  ws2.close();

  if (pttReceived && gpsReceived && waypointReceived) {
    console.log('🎉 ALL OFFLINE MAP & PTT RADIO TESTS PASSED SUCCESSFULLY!');
    process.exit(0);
  } else {
    console.error('❌ Test failed:', { pttReceived, gpsReceived, waypointReceived });
    process.exit(1);
  }
}

testMapAndPtt();
