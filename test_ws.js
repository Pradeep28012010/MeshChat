const WebSocket = require('ws');

async function testMeshChat() {
  console.log('Testing Offline MeshChat WebSocket Engine...');

  const ws1 = new WebSocket('ws://127.0.0.1:3000');
  const ws2 = new WebSocket('ws://127.0.0.1:3000');

  let p2ReceivedMsg = false;

  await Promise.all([
    new Promise((resolve) => {
      ws1.on('open', () => {
        ws1.send(JSON.stringify({
          type: 'JOIN',
          peer: { id: 'peer_alice', name: 'Alice', avatar: '👤' }
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
          peer: { id: 'peer_bob', name: 'Bob', avatar: '👤' }
        }));
      });
      ws2.on('message', (raw) => {
        const d = JSON.parse(raw);
        if (d.type === 'WELCOME') resolve();
      });
    })
  ]);

  console.log('✔ Both peers joined and registered on local offline mesh');

  ws2.on('message', (raw) => {
    const data = JSON.parse(raw);
    if (data.type === 'CHAT_MESSAGE' && data.message.text === 'Hello Bob! This is 100% offline.') {
      console.log('✔ Bob received message:', data.message.text);
      p2ReceivedMsg = true;
    }
  });

  await new Promise((res) => setTimeout(res, 100));

  // Alice sends a text message
  ws1.send(JSON.stringify({
    type: 'CHAT_MESSAGE',
    message: {
      id: 'test_msg_1',
      senderId: 'peer_alice',
      senderName: 'Alice',
      targetId: 'broadcast',
      text: 'Hello Bob! This is 100% offline.',
      timestamp: Date.now()
    }
  }));

  await new Promise((res) => setTimeout(res, 500));

  ws1.close();
  ws2.close();

  if (p2ReceivedMsg) {
    console.log('🎉 OFFLINE MESSAGING TEST PASSED SUCCESSFULLY!');
    process.exit(0);
  } else {
    console.error('❌ Test failed: Message was not received.');
    process.exit(1);
  }
}

testMeshChat();
