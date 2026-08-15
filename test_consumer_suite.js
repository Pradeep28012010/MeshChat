/**
 * Automated Verification Suite for Everyday Consumer Chat Features
 * (Live Polls, Message Edit, Delete For Everyone, Pin Announcements)
 */

const WebSocket = require('ws');

const WS_URL = 'ws://localhost:3000';

async function runConsumerTest() {
  console.log('Testing Consumer Chat Features (Polls, Edit, Delete, Pinning)...');

  const clientA = new WebSocket(WS_URL);
  const clientB = new WebSocket(WS_URL);

  let pollVoteReceived = false;
  let messageEditReceived = false;
  let messageDeleteReceived = false;
  let pinMessageReceived = false;

  await Promise.all([
    new Promise((resolve) => clientA.on('open', resolve)),
    new Promise((resolve) => clientB.on('open', resolve))
  ]);

  clientA.send(JSON.stringify({
    type: 'JOIN',
    peer: { id: 'peer_user_a', name: 'User_A' }
  }));

  clientB.send(JSON.stringify({
    type: 'JOIN',
    peer: { id: 'peer_user_b', name: 'User_B' }
  }));

  await new Promise(r => setTimeout(r, 200));

  clientB.on('message', (raw) => {
    const data = JSON.parse(raw);
    if (data.type === 'POLL_VOTE') {
      pollVoteReceived = true;
      console.log(`✔ User_B received POLL_VOTE on poll "${data.pollId}" for option index ${data.optionIndex}`);
    }
    if (data.type === 'MESSAGE_EDIT') {
      messageEditReceived = true;
      console.log(`✔ User_B received MESSAGE_EDIT for "${data.messageId}" -> "${data.newText}"`);
    }
    if (data.type === 'MESSAGE_DELETE') {
      messageDeleteReceived = true;
      console.log(`✔ User_B received MESSAGE_DELETE for message "${data.messageId}"`);
    }
    if (data.type === 'PIN_MESSAGE') {
      pinMessageReceived = true;
      console.log(`✔ User_B received PIN_MESSAGE (unpin: ${data.unpin})`);
    }
  });

  // 1. Test Poll Voting
  clientA.send(JSON.stringify({
    type: 'POLL_VOTE',
    pollId: 'poll_dinner_123',
    optionIndex: 1,
    voterName: 'User_A'
  }));

  // 2. Test Message Editing
  clientA.send(JSON.stringify({
    type: 'MESSAGE_EDIT',
    messageId: 'msg_test_001',
    newText: 'Hey everyone, meeting moved to 6 PM!'
  }));

  // 3. Test Delete for Everyone
  clientA.send(JSON.stringify({
    type: 'MESSAGE_DELETE',
    messageId: 'msg_test_002'
  }));

  // 4. Test Pin Message
  clientA.send(JSON.stringify({
    type: 'PIN_MESSAGE',
    messageId: 'msg_test_003',
    message: { id: 'msg_test_003', text: 'Important: Wi-Fi password is meshpass', senderName: 'User_A' },
    unpin: false
  }));

  await new Promise(r => setTimeout(r, 600));

  if (!pollVoteReceived) throw new Error('Poll vote was not received!');
  if (!messageEditReceived) throw new Error('Message edit was not received!');
  if (!messageDeleteReceived) throw new Error('Message delete was not received!');
  if (!pinMessageReceived) throw new Error('Pin message was not received!');

  clientA.close();
  clientB.close();

  console.log('🎉 ALL CONSUMER CHAT MODULE TESTS PASSED 100% SUCCESSFULLY!');
  process.exit(0);
}

runConsumerTest().catch((err) => {
  console.error('❌ Consumer test failed:', err);
  process.exit(1);
});
