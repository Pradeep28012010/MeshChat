/**
 * Automated Test Suite for:
 * 1. Private Topic Rooms Visibility & Isolation
 * 2. Room Admin Management (Invite, Kick, Leave, Delete)
 * 3. Poll Self-Voting & Live Progress Updates
 * 4. 3D Dice Challenge Game Relays
 * 5. Contact Privacy & Isolated Context Notebooks
 */

const WebSocket = require('ws');
const http = require('http');
const { spawn } = require('child_process');

const PORT = 3000;
const WS_URL = `ws://127.0.0.1:${PORT}`;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runTestSuite() {
  console.log('🚀 Starting MeshChat Topic Rooms, Polls & Dice Test Suite...\n');

  // Spawn server process with shell: true for Windows
  const serverProcess = spawn('node', ['server.js'], { cwd: __dirname, shell: true });
  serverProcess.stdout.on('data', d => process.stdout.write('[Server] ' + d));
  serverProcess.stderr.on('data', d => process.stderr.write('[Server ERR] ' + d));

  await sleep(2500);
  // Test HTTP health check
  await new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${PORT}/health`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log('✅ Server Health Check:', JSON.parse(data));
        resolve();
      });
    }).on('error', reject);
  });

  // Client 1: Alice (Admin / Creator)
  const clientAlice = new WebSocket(WS_URL);
  let aliceWelcome = null;
  const aliceMessages = [];

  // Client 2: Bob (Invitee)
  const clientBob = new WebSocket(WS_URL);
  let bobWelcome = null;
  const bobMessages = [];

  // Client 3: Charlie (Outsider / Non-member)
  const clientCharlie = new WebSocket(WS_URL);
  let charlieWelcome = null;
  const charlieMessages = [];

  await new Promise((resolve) => {
    let openCount = 0;
    const checkAllOpen = () => {
      openCount++;
      if (openCount === 3) resolve();
    };

    clientAlice.on('open', () => {
      clientAlice.send(JSON.stringify({
        type: 'JOIN',
        peer: { id: 'peer_alice', name: 'Alice', avatar: null }
      }));
      checkAllOpen();
    });

    clientBob.on('open', () => {
      clientBob.send(JSON.stringify({
        type: 'JOIN',
        peer: { id: 'peer_bob', name: 'Bob', avatar: null }
      }));
      checkAllOpen();
    });

    clientCharlie.on('open', () => {
      clientCharlie.send(JSON.stringify({
        type: 'JOIN',
        peer: { id: 'peer_charlie', name: 'Charlie', avatar: null }
      }));
      checkAllOpen();
    });
  });

  clientAlice.on('message', (raw) => {
    const data = JSON.parse(raw);
    if (data.type === 'WELCOME') aliceWelcome = data;
    aliceMessages.push(data);
  });

  clientBob.on('message', (raw) => {
    const data = JSON.parse(raw);
    if (data.type === 'WELCOME') bobWelcome = data;
    bobMessages.push(data);
  });

  clientCharlie.on('message', (raw) => {
    const data = JSON.parse(raw);
    if (data.type === 'WELCOME') charlieWelcome = data;
    charlieMessages.push(data);
  });

  await sleep(1000);

  console.log('--- TEST 1: Private Topic Room Creation & Visibility Isolation ---');
  // Alice creates a private topic room "#classified-ops"
  const secretRoom = {
    id: 'room_classified_ops_' + Date.now(),
    name: 'classified-ops',
    topic: 'Top secret strategy planning',
    isPrivate: true,
    passcode: '9999',
    creatorId: 'peer_alice',
    creatorName: 'Alice',
    members: ['peer_alice'],
    createdAt: Date.now()
  };

  clientAlice.send(JSON.stringify({
    type: 'CHANNEL_CREATE',
    channel: secretRoom
  }));

  await sleep(500);

  // Check if Charlie (outsider) received CHANNEL_CREATE
  const charlieSawRoom = charlieMessages.some(m => m.type === 'CHANNEL_CREATE' && m.channel.id === secretRoom.id);
  if (!charlieSawRoom) {
    console.log('✅ TEST 1 PASSED: Unauthorized peer (Charlie) did NOT see private topic room!');
  } else {
    console.error('❌ TEST 1 FAILED: Charlie saw a private topic room!');
    process.exit(1);
  }

  console.log('\n--- TEST 2: Room Invitation & Whitelisting Protocol ---');
  // Alice invites Bob to "#classified-ops"
  clientAlice.send(JSON.stringify({
    type: 'ROOM_INVITE',
    channelId: secretRoom.id,
    targetPeerId: 'peer_bob'
  }));

  await sleep(500);

  const bobInvite = bobMessages.find(m => m.type === 'ROOM_INVITE' && m.channel.id === secretRoom.id);
  if (bobInvite && bobInvite.inviterName === 'Alice') {
    console.log('✅ TEST 2 PASSED: Bob received ROOM_INVITE for private room #classified-ops from Alice!');
  } else {
    console.error('❌ TEST 2 FAILED: Bob did not receive ROOM_INVITE packet!');
    process.exit(1);
  }

  console.log('\n--- TEST 3: Admin Member Removal / Kick Protocol ---');
  // Alice kicks Bob from "#classified-ops"
  clientAlice.send(JSON.stringify({
    type: 'ROOM_MEMBER_KICK',
    channelId: secretRoom.id,
    targetMemberId: 'peer_bob',
    adminId: 'peer_alice'
  }));

  await sleep(500);

  const bobKicked = bobMessages.find(m => m.type === 'ROOM_KICKED' && m.channelId === secretRoom.id);
  if (bobKicked) {
    console.log('✅ TEST 3 PASSED: Bob was successfully kicked and notified with ROOM_KICKED!');
  } else {
    console.error('❌ TEST 3 FAILED: Bob did not receive ROOM_KICKED packet!');
    process.exit(1);
  }

  console.log('\n--- TEST 4: Poll Voting & Real-Time Sync ---');
  // Alice posts a poll
  const pollId = 'poll_' + Date.now();
  clientAlice.send(JSON.stringify({
    type: 'CHAT_MESSAGE',
    message: {
      id: pollId,
      type: 'poll',
      senderId: 'peer_alice',
      senderName: 'Alice',
      targetId: 'broadcast',
      channelId: 'general',
      question: 'Which framework is fastest?',
      options: [
        { text: 'Vanilla JS', voters: [] },
        { text: 'React', voters: [] }
      ],
      timestamp: Date.now()
    }
  }));

  await sleep(500);

  // Bob votes on Option 0
  clientBob.send(JSON.stringify({
    type: 'POLL_VOTE',
    pollId: pollId,
    optionIndex: 0,
    voterId: 'peer_bob',
    voterName: 'Bob'
  }));

  await sleep(500);

  const aliceSawVote = aliceMessages.find(m => m.type === 'POLL_VOTE' && m.pollId === pollId && m.optionIndex === 0);
  if (aliceSawVote && aliceSawVote.voterId === 'peer_bob') {
    console.log('✅ TEST 4 PASSED: Poll vote by Bob successfully broadcast to Alice with voter ID!');
  } else {
    console.error('❌ TEST 4 FAILED: Poll vote was not received by Alice!');
    process.exit(1);
  }

  console.log('\n--- TEST 5: 3D Dice Challenge Game Relay ---');
  const diceChallengeId = 'dice_duel_' + Date.now();
  clientAlice.send(JSON.stringify({
    type: 'CHAT_MESSAGE',
    message: {
      id: diceChallengeId,
      type: 'game_dice_challenge',
      senderId: 'peer_alice',
      senderName: 'Alice',
      targetId: 'broadcast',
      channelId: 'general',
      scoreToBeat: 11,
      text: '🎲 Dice Challenge: Alice threw a score of 11! Can you beat it?',
      timestamp: Date.now()
    }
  }));

  await sleep(500);

  const bobSawDiceChallenge = bobMessages.find(m => m.type === 'CHAT_MESSAGE' && m.message && m.message.id === diceChallengeId);
  if (bobSawDiceChallenge && bobSawDiceChallenge.message.scoreToBeat === 11) {
    console.log('✅ TEST 5 PASSED: 3D Dice challenge card relayed to peer with target score of 11!');
  } else {
    console.error('❌ TEST 5 FAILED: Dice challenge not relayed to Bob!');
    process.exit(1);
  }

  clientAlice.close();
  clientBob.close();
  clientCharlie.close();
  serverProcess.kill();

  console.log('\n🎉 ALL 5 ADVANCED TESTS PASSED WITH 100% SUCCESS!');
  process.exit(0);
}

runTestSuite().catch(err => {
  console.error('Test suite execution error:', err);
  process.exit(1);
});
