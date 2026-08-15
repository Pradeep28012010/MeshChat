/**
 * Automated Verification Suite for Social & Power Features
 * (Shared Events RSVP, In-Chat Multiplayer Games, Custom Topic Channels)
 */

const WebSocket = require('ws');

const WS_URL = 'ws://localhost:3000';

async function runSocialPowerTest() {
  console.log('Testing Social & Power Features (Events RSVP, Games, Custom Channels)...');

  const clientA = new WebSocket(WS_URL);
  const clientB = new WebSocket(WS_URL);

  let eventRsvpReceived = false;
  let gameMoveReceived = false;
  let channelCreateReceived = false;

  await Promise.all([
    new Promise((resolve) => clientA.on('open', resolve)),
    new Promise((resolve) => clientB.on('open', resolve))
  ]);

  clientA.send(JSON.stringify({
    type: 'JOIN',
    peer: { id: 'peer_gamer_a', name: 'Gamer_A' }
  }));

  clientB.send(JSON.stringify({
    type: 'JOIN',
    peer: { id: 'peer_gamer_b', name: 'Gamer_B' }
  }));

  await new Promise(r => setTimeout(r, 200));

  clientB.on('message', (raw) => {
    const data = JSON.parse(raw);
    if (data.type === 'EVENT_RSVP') {
      eventRsvpReceived = true;
      console.log(`✔ Gamer_B received EVENT_RSVP for "${data.eventId}" -> status: ${data.status} from ${data.voterName}`);
    }
    if (data.type === 'GAME_MOVE') {
      gameMoveReceived = true;
      console.log(`✔ Gamer_B received GAME_MOVE on game "${data.gameId}" (cell: ${data.moveData.cellIndex}, turn: ${data.moveData.turn})`);
    }
    if (data.type === 'CHANNEL_CREATE') {
      channelCreateReceived = true;
      console.log(`✔ Gamer_B received CHANNEL_CREATE for channel #${data.channel.name}`);
    }
  });

  // 1. Test Event RSVP
  clientA.send(JSON.stringify({
    type: 'EVENT_RSVP',
    eventId: 'event_game_night_01',
    status: 'going',
    voterName: 'Gamer_A'
  }));

  // 2. Test Multiplayer Game Move
  clientA.send(JSON.stringify({
    type: 'GAME_MOVE',
    gameId: 'game_ttt_101',
    moveData: {
      cellIndex: 4,
      board: [null, null, null, null, 'X', null, null, null, null],
      turn: 'O',
      winner: null,
      playerO: 'Gamer_B'
    },
    senderName: 'Gamer_A'
  }));

  // 3. Test Custom Channel Creation
  clientA.send(JSON.stringify({
    type: 'CHANNEL_CREATE',
    channel: { id: 'esports-talk', name: 'esports-talk' }
  }));

  await new Promise(r => setTimeout(r, 600));

  if (!eventRsvpReceived) throw new Error('Event RSVP was not received!');
  if (!gameMoveReceived) throw new Error('Game move was not received!');
  if (!channelCreateReceived) throw new Error('Channel create was not received!');

  clientA.close();
  clientB.close();

  console.log('🎉 ALL SOCIAL POWER MODULE TESTS PASSED 100% SUCCESSFULLY!');
  process.exit(0);
}

runSocialPowerTest().catch((err) => {
  console.error('❌ Social power test failed:', err);
  process.exit(1);
});
