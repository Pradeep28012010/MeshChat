/**
 * Automated Verification Suite for Timer Sync & Group Expenses
 */

const WebSocket = require('ws');

const WS_URL = 'ws://localhost:3000';

async function runTimerExpenseTest() {
  console.log('Testing Synchronized Timer & Group Expense Splitter...');

  const clientA = new WebSocket(WS_URL);
  const clientB = new WebSocket(WS_URL);

  let timerSyncReceived = false;
  let expenseAddReceived = false;
  let expenseResetReceived = false;

  await Promise.all([
    new Promise((resolve) => clientA.on('open', resolve)),
    new Promise((resolve) => clientB.on('open', resolve))
  ]);

  clientA.send(JSON.stringify({
    type: 'JOIN',
    peer: { id: 'peer_timer_a', name: 'Alice_Timer' }
  }));

  clientB.send(JSON.stringify({
    type: 'JOIN',
    peer: { id: 'peer_timer_b', name: 'Bob_Timer' }
  }));

  await new Promise(r => setTimeout(r, 200));

  clientB.on('message', (raw) => {
    const data = JSON.parse(raw);
    if (data.type === 'TIMER_SYNC') {
      timerSyncReceived = true;
      console.log(`✔ Bob received TIMER_SYNC: "${data.timer.title}" (${data.timer.durationSec}s)`);
    }
    if (data.type === 'EXPENSE_ADD') {
      expenseAddReceived = true;
      console.log(`✔ Bob received EXPENSE_ADD: "${data.expense.desc}" ($${data.expense.amount}) paid by ${data.expense.paidBy}`);
    }
    if (data.type === 'EXPENSE_RESET') {
      expenseResetReceived = true;
      console.log(`✔ Bob received EXPENSE_RESET`);
    }
  });

  // 1. Test Timer Sync
  clientA.send(JSON.stringify({
    type: 'TIMER_SYNC',
    title: 'Camp Stove Boiling',
    durationSec: 180,
    startedAt: Date.now(),
    isRunning: true,
    senderName: 'Alice_Timer'
  }));

  // 2. Test Expense Add
  clientA.send(JSON.stringify({
    type: 'EXPENSE_ADD',
    expense: {
      id: 'exp_test_01',
      desc: 'Campsite Entry & Firewood',
      amount: 45.00,
      paidBy: 'Alice_Timer',
      timestamp: Date.now()
    }
  }));

  await new Promise(r => setTimeout(r, 200));

  // 3. Test Expense Reset
  clientA.send(JSON.stringify({
    type: 'EXPENSE_RESET'
  }));

  await new Promise(r => setTimeout(r, 600));

  if (!timerSyncReceived) throw new Error('TIMER_SYNC was not received!');
  if (!expenseAddReceived) throw new Error('EXPENSE_ADD was not received!');
  if (!expenseResetReceived) throw new Error('EXPENSE_RESET was not received!');

  clientA.close();
  clientB.close();

  console.log('🎉 ALL TIMER & EXPENSE SPLITTER TESTS PASSED 100% SUCCESSFULLY!');
  process.exit(0);
}

runTimerExpenseTest().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
