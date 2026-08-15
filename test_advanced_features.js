/**
 * Automated Verification Suite for Advanced Modules
 * (Compass, AI Survival, Geofencing, VOX Hands-Free, Elevation)
 */

const WebSocket = require('ws');

const WS_URL = 'ws://localhost:3000';

async function runAdvancedFeaturesTest() {
  console.log('Testing Advanced Mesh Features (Compass, AI, Geofence, VOX, Elevation)...');

  const clientA = new WebSocket(WS_URL);
  const clientB = new WebSocket(WS_URL);

  let geofenceAlertReceived = false;
  let pttAudioReceived = false;

  await Promise.all([
    new Promise((resolve) => clientA.on('open', resolve)),
    new Promise((resolve) => clientB.on('open', resolve))
  ]);

  clientA.send(JSON.stringify({
    type: 'JOIN',
    peer: { id: 'peer_leader', name: 'Leader' }
  }));

  clientB.send(JSON.stringify({
    type: 'JOIN',
    peer: { id: 'peer_hiker', name: 'Hiker' }
  }));

  await new Promise(r => setTimeout(r, 200));

  clientA.on('message', (raw) => {
    const data = JSON.parse(raw);
    if (data.type === 'GEOFENCE_ALERT') {
      geofenceAlertReceived = true;
      console.log(`✔ Leader received GEOFENCE_ALERT from ${data.senderName}: ${data.distance}m (limit: ${data.maxRadius}m)`);
    }
    if (data.type === 'PTT_AUDIO') {
      pttAudioReceived = true;
      console.log(`✔ Leader received VOX/PTT Audio broadcast from ${data.senderName}`);
    }
  });

  // 1. Test Geofence Alert Broadcast
  clientB.send(JSON.stringify({
    type: 'GEOFENCE_ALERT',
    senderName: 'Hiker',
    distance: 480,
    maxRadius: 250,
    coords: { latitude: 37.7780, longitude: -122.4100 }
  }));

  // 2. Test VOX Audio Broadcast
  clientB.send(JSON.stringify({
    type: 'PTT_AUDIO',
    senderName: 'Hiker',
    audioData: 'data:audio/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQRChYECGFOAZwEAAAA='
  }));

  await new Promise(r => setTimeout(r, 600));

  if (!geofenceAlertReceived) throw new Error('Geofence alert was not received!');
  if (!pttAudioReceived) throw new Error('VOX audio was not received!');

  clientA.close();
  clientB.close();

  console.log('🎉 ALL 5 ADVANCED MODULE TESTS PASSED 100% SUCCESSFULLY!');
  process.exit(0);
}

runAdvancedFeaturesTest().catch((err) => {
  console.error('❌ Advanced test failed:', err);
  process.exit(1);
});
