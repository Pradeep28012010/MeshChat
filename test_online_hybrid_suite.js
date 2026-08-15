const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3013;
process.env.PORT = PORT;
const server = require('./server.js');

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function runOnlineHybridSuite() {
  console.log('[Test Suite] Starting Online Cloud Hybrid & Intelligent AI tests on port', PORT);
  await sleep(600);

  const wsUrl = `ws://localhost:${PORT}`;

  // 1. Connect Client A
  const clientA = new WebSocket(wsUrl);
  const receivedA = [];
  clientA.on('message', (m) => receivedA.push(JSON.parse(m)));

  await new Promise(res => clientA.on('open', res));
  clientA.send(JSON.stringify({
    type: 'JOIN',
    peer: { id: 'peer_alice', name: 'Alice', avatar: null }
  }));
  await sleep(200);

  // 2. Connect Client B
  const clientB = new WebSocket(wsUrl);
  const receivedB = [];
  clientB.on('message', (m) => receivedB.push(JSON.parse(m)));

  await new Promise(res => clientB.on('open', res));
  clientB.send(JSON.stringify({
    type: 'JOIN',
    peer: { id: 'peer_bob', name: 'Bob', avatar: null }
  }));
  await sleep(200);

  console.log('✓ Both peers joined server successfully');

  // Test 1: Profile Picture Avatar Update Broadcast
  console.log('-> Testing Profile Avatar Sync...');
  const fakeAvatarDataUrl = 'data:image/jpeg;base64,fakeAvatarData12345';
  clientA.send(JSON.stringify({
    type: 'PROFILE_UPDATE',
    peer: { id: 'peer_alice', name: 'Alice', avatar: fakeAvatarDataUrl }
  }));
  await sleep(300);

  const profileUpdateOnB = receivedB.find(m => m.type === 'PROFILE_UPDATE' && m.peer && m.peer.id === 'peer_alice');
  if (!profileUpdateOnB || profileUpdateOnB.peer.avatar !== fakeAvatarDataUrl) {
    throw new Error('FAIL: Client B did not receive Client A avatar update!');
  }
  console.log('✓ Profile avatar updated and broadcasted to peer B');

  // Test 2: Channel Creation Disk Persistence
  console.log('-> Testing Custom Channel Creation & Persistence...');
  const testChannel = { id: 'science-club', name: 'science-club' };
  clientA.send(JSON.stringify({
    type: 'CHANNEL_CREATE',
    channel: testChannel
  }));
  await sleep(500);

  const chanFile = path.join(__dirname, 'data', 'channels.json');
  if (!fs.existsSync(chanFile)) {
    throw new Error('FAIL: data/channels.json was not created on disk!');
  }
  const savedChannels = JSON.parse(fs.readFileSync(chanFile, 'utf-8'));
  const foundChan = savedChannels.find(c => c.id === 'science-club');
  if (!foundChan) {
    throw new Error('FAIL: science-club channel was not persisted to disk!');
  }
  console.log('✓ Channel created and verified persisted to disk');

  // Test 3: Chat Message Disk Persistence
  console.log('-> Testing Message Disk Persistence...');
  const msg1 = {
    id: 'msg_test_persist_1',
    senderId: 'peer_alice',
    senderName: 'Alice',
    channelId: 'general',
    text: 'Hello from persistent cloud mesh!',
    timestamp: Date.now()
  };
  clientA.send(JSON.stringify({
    type: 'CHAT_MESSAGE',
    message: msg1
  }));
  await sleep(500);

  const msgFile = path.join(__dirname, 'data', 'messages.json');
  if (!fs.existsSync(msgFile)) {
    throw new Error('FAIL: data/messages.json was not created on disk!');
  }
  const savedMsgs = JSON.parse(fs.readFileSync(msgFile, 'utf-8'));
  const foundMsg = savedMsgs.find(m => m.id === 'msg_test_persist_1');
  if (!foundMsg) {
    throw new Error('FAIL: msg_test_persist_1 was not saved in data/messages.json!');
  }
  console.log('✓ Message verified persisted to disk');

  // Test 4: Offline Reconnection Catch-up Sync (SYNC_REQUEST / SYNC_RESPONSE)
  console.log('-> Testing Offline Catch-up Sync (SYNC_REQUEST)...');
  const clientC = new WebSocket(wsUrl);
  const receivedC = [];
  clientC.on('message', (m) => receivedC.push(JSON.parse(m)));

  await new Promise(res => clientC.on('open', res));
  clientC.send(JSON.stringify({
    type: 'JOIN',
    peer: { id: 'peer_charlie', name: 'Charlie', avatar: null }
  }));
  await sleep(100);

  // Charlie requests sync for messages since 0
  clientC.send(JSON.stringify({
    type: 'SYNC_REQUEST',
    since: 0
  }));
  await sleep(300);

  const syncResp = receivedC.find(m => m.type === 'SYNC_RESPONSE');
  if (!syncResp || !syncResp.messages || !syncResp.messages.find(m => m.id === 'msg_test_persist_1')) {
    throw new Error('FAIL: Charlie did not receive missed messages via SYNC_RESPONSE!');
  }
  console.log('✓ Offline client Charlie successfully caught up with missed messages');

  // Test 5: Message Delivery Receipt
  console.log('-> Testing Message Delivery Receipt (MESSAGE_DELIVERED)...');
  clientB.send(JSON.stringify({
    type: 'MESSAGE_DELIVERED',
    messageId: 'msg_test_persist_1',
    senderId: 'peer_alice'
  }));
  await sleep(300);

  const deliveredReceiptOnA = receivedA.find(m => m.type === 'MESSAGE_DELIVERED' && m.messageId === 'msg_test_persist_1');
  if (!deliveredReceiptOnA) {
    throw new Error('FAIL: Alice did not receive MESSAGE_DELIVERED receipt!');
  }
  console.log('✓ Message delivered receipt received by sender');

  clientA.close();
  clientB.close();
  clientC.close();
  console.log('\n=========================================');
  console.log('🎉 ALL ONLINE HYBRID & AI TESTS PASSED! 🎉');
  console.log('=========================================\n');
  process.exit(0);
}

runOnlineHybridSuite().catch(err => {
  console.error('Test Suite Failed:', err);
  process.exit(1);
});
