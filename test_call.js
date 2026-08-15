const WebSocket = require('ws');

async function testCallingSignaling() {
  console.log('Testing Offline WebRTC Calling Signaling Pipeline...');

  const ws1 = new WebSocket('ws://127.0.0.1:3000');
  const ws2 = new WebSocket('ws://127.0.0.1:3000');

  let callInviteReceived = false;
  let callAcceptedReceived = false;
  let callOfferReceived = false;
  let callAnswerReceived = false;
  let callEndReceived = false;

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

  console.log('✔ Both peers connected and registered on local mesh');

  // Bob's message listener
  ws2.on('message', (raw) => {
    const data = JSON.parse(raw);
    
    if (data.type === 'CALL_INVITE' && data.senderId === 'peer_alice') {
      console.log('✔ Bob received CALL_INVITE from Alice (isVideo:', data.isVideo, ')');
      callInviteReceived = true;
      // Bob accepts call
      ws2.send(JSON.stringify({
        type: 'CALL_ACCEPT',
        targetId: 'peer_alice'
      }));
    }

    if (data.type === 'CALL_OFFER' && data.senderId === 'peer_alice') {
      console.log('✔ Bob received CALL_OFFER SDP from Alice');
      callOfferReceived = true;
      // Bob replies with answer
      ws2.send(JSON.stringify({
        type: 'CALL_ANSWER',
        targetId: 'peer_alice',
        sdp: { type: 'answer', sdp: 'v=0\r\no=bob 123 456 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n' }
      }));
    }
  });

  // Alice's message listener
  ws1.on('message', (raw) => {
    const data = JSON.parse(raw);

    if (data.type === 'CALL_ACCEPT' && data.senderId === 'peer_bob') {
      console.log('✔ Alice received CALL_ACCEPT from Bob');
      callAcceptedReceived = true;
      // Alice sends SDP offer
      ws1.send(JSON.stringify({
        type: 'CALL_OFFER',
        targetId: 'peer_bob',
        sdp: { type: 'offer', sdp: 'v=0\r\no=alice 123 456 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n' }
      }));
    }

    if (data.type === 'CALL_ANSWER' && data.senderId === 'peer_bob') {
      console.log('✔ Alice received CALL_ANSWER from Bob - P2P stream established!');
      callAnswerReceived = true;
      // Alice ends call after a brief moment
      setTimeout(() => {
        ws1.send(JSON.stringify({
          type: 'CALL_END',
          targetId: 'peer_bob'
        }));
      }, 200);
    }

    if (data.type === 'CALL_END') {
      callEndReceived = true;
    }
  });

  // Bob listens for call end
  ws2.on('message', (raw) => {
    const data = JSON.parse(raw);
    if (data.type === 'CALL_END' && data.senderId === 'peer_alice') {
      console.log('✔ Bob received CALL_END from Alice');
      callEndReceived = true;
    }
  });

  await new Promise((res) => setTimeout(res, 100));

  // Alice initiates call to Bob
  ws1.send(JSON.stringify({
    type: 'CALL_INVITE',
    targetId: 'peer_bob',
    isVideo: true,
    senderName: 'Alice'
  }));

  await new Promise((res) => setTimeout(res, 800));

  ws1.close();
  ws2.close();

  if (callInviteReceived && callAcceptedReceived && callOfferReceived && callAnswerReceived && callEndReceived) {
    console.log('🎉 ALL OFFLINE CALLING TESTS PASSED SUCCESSFULLY!');
    process.exit(0);
  } else {
    console.error('❌ Test failed. State:', {
      callInviteReceived,
      callAcceptedReceived,
      callOfferReceived,
      callAnswerReceived,
      callEndReceived
    });
    process.exit(1);
  }
}

testCallingSignaling();
