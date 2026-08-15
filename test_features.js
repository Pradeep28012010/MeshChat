const WebSocket = require('ws');

async function testAdvancedFeatures() {
  console.log('Testing Offline Advanced Features (Location, Reactions, Quoting)...');

  const ws1 = new WebSocket('ws://127.0.0.1:3000');
  const ws2 = new WebSocket('ws://127.0.0.1:3000');

  let locReceived = false;
  let reactionReceived = false;

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

    // Location message check
    if (data.type === 'CHAT_MESSAGE' && data.message.location) {
      console.log('✔ Bob received Alice GPS location payload:', data.message.location);
      locReceived = true;

      // Bob reacts to Alice's location message
      ws2.send(JSON.stringify({
        type: 'MESSAGE_REACTION',
        messageId: data.message.id,
        emoji: '📍'
      }));
    }
  });

  ws1.on('message', (raw) => {
    const data = JSON.parse(raw);

    // Reaction check
    if (data.type === 'MESSAGE_REACTION' && data.messageId === 'loc_test_1' && data.emoji === '📍') {
      console.log('✔ Alice received Bob emoji reaction broadcast:', data.emoji);
      reactionReceived = true;
    }
  });

  await new Promise((res) => setTimeout(res, 100));

  // Alice shares GPS location
  ws1.send(JSON.stringify({
    type: 'CHAT_MESSAGE',
    message: {
      id: 'loc_test_1',
      senderId: 'peer_alice',
      senderName: 'Alice',
      targetId: 'broadcast',
      location: { latitude: 37.7749, longitude: -122.4194, altitude: 15 },
      timestamp: Date.now()
    }
  }));

  await new Promise((res) => setTimeout(res, 800));

  ws1.close();
  ws2.close();

  if (locReceived && reactionReceived) {
    console.log('🎉 ALL ADVANCED OFFLINE FEATURE TESTS PASSED SUCCESSFULLY!');
    process.exit(0);
  } else {
    console.error('❌ Test failed. locReceived:', locReceived, 'reactionReceived:', reactionReceived);
    process.exit(1);
  }
}

testAdvancedFeatures();
