/**
 * Automated Verification Suite for Poll Voting Persistence and Double-Echo Prevention
 */

const WebSocket = require('ws');
const { spawn } = require('child_process');

const PORT = 3016;
const WS_URL = `ws://127.0.0.1:${PORT}`;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runPollTestSuite() {
  console.log('🚀 Starting MeshChat Poll Voting Resilience Test Suite...\n');

  const serverProcess = spawn('node', ['server.js', String(PORT)], {
    cwd: __dirname,
    shell: false
  });

  await new Promise((resolve) => {
    serverProcess.stdout.on('data', d => {
      process.stdout.write('[Server] ' + d);
      if (d.toString().includes('MESHCAT SERVER STARTED')) resolve();
    });
    serverProcess.stderr.on('data', d => process.stderr.write('[Server ERR] ' + d));
    setTimeout(resolve, 3500);
  });

  await sleep(500);

  // Connect Alice
  const clientAlice = new WebSocket(WS_URL);
  let aliceWelcome = null;
  const aliceMessages = [];

  await new Promise((resolve) => {
    clientAlice.on('open', () => {
      clientAlice.send(JSON.stringify({
        type: 'JOIN',
        peer: { id: 'peer_alice_poll', name: 'Alice_Poll', avatar: null }
      }));
      resolve();
    });
  });

  clientAlice.on('message', (raw) => {
    const data = JSON.parse(raw);
    if (data.type === 'WELCOME') aliceWelcome = data;
    aliceMessages.push(data);
  });

  // Connect Bob
  const clientBob = new WebSocket(WS_URL);
  let bobWelcome = null;
  const bobMessages = [];

  await new Promise((resolve) => {
    clientBob.on('open', () => {
      clientBob.send(JSON.stringify({
        type: 'JOIN',
        peer: { id: 'peer_bob_poll', name: 'Bob_Poll', avatar: null }
      }));
      resolve();
    });
  });

  clientBob.on('message', (raw) => {
    const data = JSON.parse(raw);
    if (data.type === 'WELCOME') bobWelcome = data;
    bobMessages.push(data);
  });

  await sleep(1000);

  console.log('--- TEST 1: Alice Creates a Poll ---');
  const pollId = 'poll_test_' + Date.now();
  const pollMsg = {
    id: pollId,
    type: 'poll',
    senderId: 'peer_alice_poll',
    senderName: 'Alice_Poll',
    targetId: 'broadcast',
    question: 'Where should we set up Basecamp?',
    options: [
      { text: 'North Ridge', voters: [] },
      { text: 'South Valley', voters: [] },
      { text: 'East Lake', voters: [] }
    ],
    timestamp: Date.now()
  };

  clientAlice.send(JSON.stringify({
    type: 'CHAT_MESSAGE',
    message: pollMsg
  }));

  await sleep(600);

  console.log('\n--- TEST 2: Alice Votes on Option 0 ("North Ridge") ---');
  clientAlice.send(JSON.stringify({
    type: 'POLL_VOTE',
    pollId: pollId,
    optionIndex: 0,
    action: 'vote',
    voterId: 'peer_alice_poll',
    voterName: 'Alice_Poll'
  }));

  await sleep(600);

  // Check Alice's received POLL_VOTE echo from server
  const aliceSawVoteEcho = aliceMessages.filter(m => m.type === 'POLL_VOTE' && m.pollId === pollId);
  const lastAliceVote = aliceSawVoteEcho[aliceSawVoteEcho.length - 1];

  if (lastAliceVote && lastAliceVote.options && lastAliceVote.options[0].voters.includes('peer_alice_poll')) {
    console.log('✅ TEST 2 PASSED: Alice self-vote is retained in options without double-toggle reversion!');
  } else {
    console.error('❌ TEST 2 FAILED: Alice vote was not retained in options!', lastAliceVote);
    serverProcess.kill();
    process.exit(1);
  }

  console.log('\n--- TEST 3: Bob Votes on Option 1 ("South Valley") ---');
  clientBob.send(JSON.stringify({
    type: 'POLL_VOTE',
    pollId: pollId,
    optionIndex: 1,
    action: 'vote',
    voterId: 'peer_bob_poll',
    voterName: 'Bob_Poll'
  }));

  await sleep(600);

  const bobSawVoteEcho = bobMessages.filter(m => m.type === 'POLL_VOTE' && m.pollId === pollId);
  const lastBobVote = bobSawVoteEcho[bobSawVoteEcho.length - 1];

  const opt0HasAlice = lastBobVote && lastBobVote.options && lastBobVote.options[0].voters.includes('peer_alice_poll');
  const opt1HasBob = lastBobVote && lastBobVote.options && lastBobVote.options[1].voters.includes('peer_bob_poll');

  if (opt0HasAlice && opt1HasBob) {
    console.log('✅ TEST 3 PASSED: Multi-voter tally accurately maintains all peer votes across the mesh!');
  } else {
    console.error('❌ TEST 3 FAILED: Options mismatch in multi-voter poll!', lastBobVote);
    serverProcess.kill();
    process.exit(1);
  }

  clientAlice.close();
  clientBob.close();
  serverProcess.kill();

  console.log('\n🎉 ALL POLL VOTING TESTS PASSED WITH 100% SUCCESS!');
  process.exit(0);
}

runPollTestSuite().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
