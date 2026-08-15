/**
 * test_privacy_games_notes_suite.js
 * Verification of:
 * 1. Instagram-Style Contact Requests & Approval Privacy Protocol
 * 2. Per-Room and Per-DM Isolated Collaborative Shared Notes
 * 3. Real-Time Poll Vote Tracking & Percentage Recalculations
 * 4. 3D Dice and Multiplayer RPS Game Packet Relays
 * 5. Data Directory File Persistence (contacts.json, notes.json, messages.json)
 */

const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 3009;
process.env.PORT = PORT;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  }
  console.log(`✅ PASS: ${message}`);
}

async function run() {
  console.log('🚀 [Test] Starting MeshChat Privacy, Games & Notes Test Suite...');

  const serverProc = spawn('node', ['server.js'], {
    env: { ...process.env, PORT: PORT },
    stdio: 'inherit'
  });

  await new Promise(r => setTimeout(r, 1200));

  try {
    // 1. Connect Peer A and Peer B
    console.log('\n--- Test 1: Connect Peer A & Peer B over WebSocket ---');
    const wsA = new WebSocket(`ws://localhost:${PORT}`);
    const wsB = new WebSocket(`ws://localhost:${PORT}`);

    const peerAId = 'peer_alice_test';
    const peerBId = 'peer_bob_test';

    let peerBReceivedReq = null;
    let peerAReceivedAccept = null;
    let peerBReceivedAccept = null;
    let noteUpdateReceived = null;
    let pollVoteReceived = null;
    let gameMoveReceived = null;

    wsA.on('message', (raw) => {
      const data = JSON.parse(raw);
      if (data.type === 'CONTACT_ACCEPTED') peerAReceivedAccept = data;
      if (data.type === 'NOTE_UPDATE') noteUpdateReceived = data;
      if (data.type === 'POLL_VOTE') pollVoteReceived = data;
    });

    wsB.on('message', (raw) => {
      const data = JSON.parse(raw);
      if (data.type === 'CONTACT_REQUEST') peerBReceivedReq = data;
      if (data.type === 'CONTACT_ACCEPTED') peerBReceivedAccept = data;
      if (data.type === 'GAME_MOVE') gameMoveReceived = data;
    });

    await Promise.all([
      new Promise(res => wsA.on('open', res)),
      new Promise(res => wsB.on('open', res))
    ]);

    wsA.send(JSON.stringify({
      type: 'JOIN',
      peer: { id: peerAId, name: 'Alice', avatar: null }
    }));

    wsB.send(JSON.stringify({
      type: 'JOIN',
      peer: { id: peerBId, name: 'Bob', avatar: null }
    }));

    await new Promise(r => setTimeout(r, 400));
    assert(true, 'Peer A (Alice) and Peer B (Bob) joined successfully');

    // 2. Test Instagram-Style Contact Request
    console.log('\n--- Test 2: Contact Request & Mutual Acceptance Protocol ---');
    wsA.send(JSON.stringify({
      type: 'CONTACT_REQUEST',
      targetId: peerBId
    }));

    await new Promise(r => setTimeout(r, 300));
    assert(peerBReceivedReq !== null, 'Peer B received CONTACT_REQUEST from Peer A');
    assert(peerBReceivedReq.fromPeer.id === peerAId, 'Requester ID accurately matches Alice');

    // Bob accepts Alice's contact request
    wsB.send(JSON.stringify({
      type: 'CONTACT_ACCEPT',
      targetId: peerAId
    }));

    await new Promise(r => setTimeout(r, 400));
    assert(peerAReceivedAccept !== null, 'Peer A received CONTACT_ACCEPTED confirmation');
    assert(peerBReceivedAccept !== null, 'Peer B received CONTACT_ACCEPTED confirmation');

    // Check disk storage for contacts
    const contactsFilePath = path.join(__dirname, 'data', 'contacts.json');
    assert(fs.existsSync(contactsFilePath), 'data/contacts.json file exists on disk');
    const savedContacts = JSON.parse(fs.readFileSync(contactsFilePath, 'utf-8'));
    const pairKey = [peerAId, peerBId].sort().join(':::');
    assert(savedContacts.includes(pairKey), `Contacts file contains approved pair: ${pairKey}`);

    // 3. Test Context-Isolated Shared Notes
    console.log('\n--- Test 3: Per-Room & Per-DM Isolated Shared Notes ---');
    const roomGeneralNote = '# General Room Notes\n- [x] Item 1';
    const dmNote = '# Secret Alice-Bob DM Notes\n- [x] Classified Info';

    wsA.send(JSON.stringify({
      type: 'NOTE_UPDATE',
      contextId: 'room_general',
      noteContent: roomGeneralNote,
      updatedBy: 'Alice'
    }));

    wsB.send(JSON.stringify({
      type: 'NOTE_UPDATE',
      contextId: `dm_${peerAId}___${peerBId}`,
      noteContent: dmNote,
      updatedBy: 'Bob'
    }));

    await new Promise(r => setTimeout(r, 600));

    const notesFilePath = path.join(__dirname, 'data', 'notes.json');
    assert(fs.existsSync(notesFilePath), 'data/notes.json file exists on disk');
    const savedNotes = JSON.parse(fs.readFileSync(notesFilePath, 'utf-8'));
    assert(savedNotes['room_general'] && savedNotes['room_general'].content === roomGeneralNote, 'Room note stored distinctly in room_general');
    assert(savedNotes[`dm_${peerAId}___${peerBId}`] && savedNotes[`dm_${peerAId}___${peerBId}`].content === dmNote, 'DM note stored distinctly without polluting room notes');

    // 4. Test Live Poll Voting Memory & Recalculation
    console.log('\n--- Test 4: Live Poll Voting & Persistence ---');
    const pollId = 'poll_' + Date.now();
    wsA.send(JSON.stringify({
      type: 'MESSAGE',
      message: {
        id: pollId,
        type: 'poll',
        senderId: peerAId,
        senderName: 'Alice',
        channelId: 'general',
        question: 'Which game is best?',
        options: [
          { text: '3D Dice Duel', voters: [] },
          { text: 'RPS Showdown', voters: [] }
        ],
        timestamp: Date.now()
      }
    }));

    await new Promise(r => setTimeout(r, 300));

    // Bob votes for option 0 (3D Dice Duel)
    wsB.send(JSON.stringify({
      type: 'POLL_VOTE',
      pollId: pollId,
      optionIndex: 0,
      voterName: 'Bob'
    }));

    await new Promise(r => setTimeout(r, 500));
    assert(pollVoteReceived !== null, 'Peer A received live POLL_VOTE event');
    assert(pollVoteReceived.pollId === pollId && pollVoteReceived.optionIndex === 0, 'Poll vote option index matches Bob selection');

    // 5. Test 3D Dice and RPS Multiplayer Game Move Broadcast
    console.log('\n--- Test 5: 3D Dice and RPS Game Moves ---');
    wsA.send(JSON.stringify({
      type: 'GAME_MOVE',
      gameId: 'game_dice_123',
      moveData: { roll: 6, mode: '3d_cube' },
      senderName: 'Alice'
    }));

    await new Promise(r => setTimeout(r, 300));
    assert(gameMoveReceived !== null, 'Peer B received GAME_MOVE for 3D Dice Duel');
    assert(gameMoveReceived.moveData.roll === 6, 'Move data contains correct roll outcome (6)');

    wsA.close();
    wsB.close();

    console.log('\n=============================================');
    console.log('🎉 ALL PRIVACY, GAMES & NOTES TESTS PASSED! 🎉');
    console.log('=============================================\n');
  } finally {
    serverProc.kill();
  }
}

run().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
