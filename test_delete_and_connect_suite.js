const WebSocket = require('ws');
const PORT = 3014;
process.env.PORT = PORT;
const server = require('./server.js');

async function runDeleteAndConnectSuite() {
  console.log('Testing Deletions & Modernized Connect Suite...');
  await new Promise(r => setTimeout(r, 400));

  const wsA = new WebSocket(`ws://localhost:${PORT}`);
  const wsB = new WebSocket(`ws://localhost:${PORT}`);

  await Promise.all([
    new Promise(res => wsA.on('open', res)),
    new Promise(res => wsB.on('open', res))
  ]);

  let passCount = 0;

  // 1. Join network
  wsA.send(JSON.stringify({
    type: 'JOIN',
    peer: { id: 'peer_del_A', name: 'Alice_Del' }
  }));
  wsB.send(JSON.stringify({
    type: 'JOIN',
    peer: { id: 'peer_del_B', name: 'Bob_Del' }
  }));

  await new Promise(r => setTimeout(r, 400));

  // 2. Test Channel Create & Delete
  let channelDeletedReceived = false;
  wsB.on('message', (raw) => {
    const d = JSON.parse(raw);
    if (d.type === 'CHANNEL_DELETE' && d.channelId === 'chan_gaming_99') {
      channelDeletedReceived = true;
      console.log('✔ Bob received CHANNEL_DELETE for channel: #chan_gaming_99');
      passCount++;
    }
    if (d.type === 'CLEAR_ROOM_HISTORY' && d.channelId === 'chan_gaming_99') {
      console.log('✔ Bob received CLEAR_ROOM_HISTORY for channel: #chan_gaming_99');
      passCount++;
    }
    if (d.type === 'EXPENSE_DELETE' && d.expenseId === 'exp_pizza_01') {
      console.log('✔ Bob received EXPENSE_DELETE for item: exp_pizza_01');
      passCount++;
    }
    if (d.type === 'MESSAGE_DELETE' && d.messageId === 'msg_to_delete_001') {
      console.log('✔ Bob received MESSAGE_DELETE for message: msg_to_delete_001');
      passCount++;
    }
  });

  // A creates channel then deletes it
  wsA.send(JSON.stringify({
    type: 'CHANNEL_CREATE',
    channel: { id: 'chan_gaming_99', name: 'gaming-zone' }
  }));
  await new Promise(r => setTimeout(r, 200));

  wsA.send(JSON.stringify({
    type: 'CHANNEL_DELETE',
    channelId: 'chan_gaming_99'
  }));
  await new Promise(r => setTimeout(r, 200));

  // A sends Clear Room History
  wsA.send(JSON.stringify({
    type: 'CLEAR_ROOM_HISTORY',
    channelId: 'chan_gaming_99',
    senderName: 'Alice_Del'
  }));
  await new Promise(r => setTimeout(r, 200));

  // A adds expense then deletes it
  wsA.send(JSON.stringify({
    type: 'EXPENSE_ADD',
    expense: { id: 'exp_pizza_01', desc: 'Pizza', amount: 30, paidBy: 'Alice_Del', timestamp: Date.now() }
  }));
  await new Promise(r => setTimeout(r, 200));

  wsA.send(JSON.stringify({
    type: 'EXPENSE_DELETE',
    expenseId: 'exp_pizza_01'
  }));
  await new Promise(r => setTimeout(r, 200));

  // A sends message delete
  wsA.send(JSON.stringify({
    type: 'MESSAGE_DELETE',
    messageId: 'msg_to_delete_001'
  }));
  await new Promise(r => setTimeout(r, 400));

  wsA.close();
  wsB.close();

  if (passCount === 4) {
    console.log('🎉 ALL 4 DELETION & CONNECT MODULE TESTS PASSED 100% SUCCESSFULLY!');
  } else {
    throw new Error(`Deletion test suite failed: expected 4 passes, got ${passCount}`);
  }
}

runDeleteAndConnectSuite().catch(err => {
  console.error('❌ Deletion test failed:', err);
  process.exit(1);
});
