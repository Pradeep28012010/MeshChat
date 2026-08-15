/**
 * MeshChat — Zero-Internet Messaging, Calling, GPS Map, Walkie-Talkie & Survival Suite
 * Advanced Modules: Compass HUD, Offline AI Survival, Geofencing, VOX Hands-Free & Elevation Tracker
 */

(function () {
  'use strict';

  // --- 1. Sound Synthesizer (Web Audio API - Cues, Ringtone, Squelch, SOS & Geofence Alarm) ---
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  
  function playSound(type) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const now = audioCtx.currentTime;

    if (type === 'message') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(659.25, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === 'call_end') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.25);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'radio_start') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.08);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'radio_end') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.12);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'geofence_alarm') {
      [580, 870, 580, 870].forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + i * 0.15);
        gain.gain.setValueAtTime(0.2, now + i * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.15 + 0.12);
        osc.start(now + i * 0.15);
        osc.stop(now + i * 0.15 + 0.12);
      });
    }
  }

  // SOS Morse Code Siren Loop (... --- ...)
  let sosAudioInterval = null;
  function startSosAudio() {
    stopSosAudio();
    const playMorseSos = () => {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const now = audioCtx.currentTime;
      const pattern = [
        { d: 0.1, p: 0.1 }, { d: 0.1, p: 0.1 }, { d: 0.1, p: 0.25 },
        { d: 0.3, p: 0.1 }, { d: 0.3, p: 0.1 }, { d: 0.3, p: 0.25 },
        { d: 0.1, p: 0.1 }, { d: 0.1, p: 0.1 }, { d: 0.1, p: 0.6 }
      ];
      let offset = 0;
      pattern.forEach(step => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'square';
        osc.frequency.setValueAtTime(950, now + offset);
        gain.gain.setValueAtTime(0.25, now + offset);
        gain.gain.setValueAtTime(0, now + offset + step.d);
        osc.start(now + offset);
        osc.stop(now + offset + step.d);
        offset += step.d + step.p;
      });
    };

    playMorseSos();
    sosAudioInterval = setInterval(playMorseSos, 3200);
  }

  function stopSosAudio() {
    if (sosAudioInterval) {
      clearInterval(sosAudioInterval);
      sosAudioInterval = null;
    }
  }

  let ringtoneTimer = null;
  function startRingtone() {
    stopRingtone();
    const playRingCycle = () => {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const now = audioCtx.currentTime;

      [523.25, 659.25].forEach((freq) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      });
    };

    playRingCycle();
    ringtoneTimer = setInterval(playRingCycle, 2000);
  }

  function stopRingtone() {
    if (ringtoneTimer) {
      clearInterval(ringtoneTimer);
      ringtoneTimer = null;
    }
  }

  // --- 2. End-to-End Encryption (AES-GCM 256-bit) ---
  let cryptoKey = null;
  const SALT = new Uint8Array([77, 101, 115, 104, 67, 104, 97, 116, 79, 102, 102, 108, 105, 110, 101, 49]);

  async function initCryptoKey(passphrase) {
    try {
      const enc = new TextEncoder();
      const keyMaterial = await crypto.subtle.importKey(
        'raw',
        enc.encode(passphrase),
        'PBKDF2',
        false,
        ['deriveBits', 'deriveKey']
      );
      cryptoKey = await crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt: SALT,
          iterations: 100000,
          hash: 'SHA-256'
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
      );
    } catch (e) {
      console.error('[Crypto] Key derivation error:', e);
    }
  }

  async function encryptPayload(dataObj) {
    if (!cryptoKey) return dataObj;
    try {
      const enc = new TextEncoder();
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const plaintext = enc.encode(JSON.stringify(dataObj));
      const ciphertext = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv: iv },
        cryptoKey,
        plaintext
      );
      return {
        _e2ee: true,
        iv: Array.from(iv),
        cipher: btoa(String.fromCharCode(...new Uint8Array(ciphertext)))
      };
    } catch (e) {
      return dataObj;
    }
  }

  async function decryptPayload(encryptedObj) {
    if (!encryptedObj || !encryptedObj._e2ee || !cryptoKey) return encryptedObj;
    try {
      const iv = new Uint8Array(encryptedObj.iv);
      const rawCipher = Uint8Array.from(atob(encryptedObj.cipher), c => c.charCodeAt(0));
      const decrypted = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: iv },
        cryptoKey,
        rawCipher
      );
      const dec = new TextDecoder();
      return JSON.parse(dec.decode(decrypted));
    } catch (e) {
      return {
        id: encryptedObj.id || 'err_' + Date.now(),
        senderId: encryptedObj.senderId,
        senderName: encryptedObj.senderName || 'Peer',
        text: '🔒 [Encrypted Message - Key mismatch]',
        timestamp: Date.now()
      };
    }
  }

  // --- 3. IndexedDB Local Storage ---
  const DB_NAME = 'MeshChatLocalDB';
  const DB_VERSION = 3;
  let db = null;

  function initDatabase() {
    return new Promise((resolve) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = (e) => {
        const database = e.target.result;
        if (!database.objectStoreNames.contains('messages')) {
          database.createStore = database.createObjectStore('messages', { keyPath: 'id' });
        }
      };
      request.onsuccess = (e) => {
        db = e.target.result;
        resolve(db);
      };
      request.onerror = () => resolve(null);
    });
  }

  async function saveMessageToStorage(msg) {
    if (!db) return;
    try {
      const tx = db.transaction('messages', 'readwrite');
      const store = tx.objectStore('messages');
      store.put(msg);
    } catch (e) {
      console.error('[Storage] Save error:', e);
    }
  }

  async function loadStoredMessages() {
    if (!db) return [];
    return new Promise((resolve) => {
      try {
        const tx = db.transaction('messages', 'readonly');
        const store = tx.objectStore('messages');
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => resolve([]);
      } catch (e) {
        resolve([]);
      }
    });
  }

  // --- 4. App State ---
  const sessionPeerId = sessionStorage.getItem('mesh_tab_id') || ('peer_' + Math.random().toString(36).substr(2, 7));
  sessionStorage.setItem('mesh_tab_id', sessionPeerId);

  const state = {
    self: {
      id: sessionPeerId,
      name: localStorage.getItem('mesh_peer_name') || 'User_' + Math.floor(100 + Math.random() * 900)
    },
    theme: localStorage.getItem('mesh_theme') || 'light',
    activeView: 'chat',
    passphrase: localStorage.getItem('mesh_passphrase') || 'mesh-default-key',
    activeTargetId: 'broadcast',
    peers: new Map(),
    peerLocations: new Map(),
    peerBatteries: new Map(),
    waypoints: JSON.parse(localStorage.getItem('mesh_waypoints') || '[]'),
    myTrail: JSON.parse(localStorage.getItem('mesh_my_trail') || '[]'),
    elevationHistory: JSON.parse(localStorage.getItem('mesh_elevation_history') || '[]'),
    messages: [],
    searchQuery: '',
    replyingTo: null,
    myCoords: null,
    myHeading: 0,
    batteryPercent: 100,
    ws: null,
    connected: false,
    isRecording: false,
    mediaRecorder: null,
    audioChunks: [],
    
    // Geofence Perimeter
    geofence: {
      enabled: localStorage.getItem('mesh_geofence_enabled') === 'true',
      radiusMeters: parseInt(localStorage.getItem('mesh_geofence_radius') || '250', 10),
      originCoords: null,
      lastAlertTime: 0
    },

    // VOX Hands-Free Radio
    vox: {
      enabled: false,
      threshold: 0.18,
      analyser: null,
      micStream: null,
      silenceTimer: null,
      animFrame: null
    },

    // SOS Beacon
    sos: {
      active: false,
      strobeTimer: null,
      torchTrack: null
    },

    // Walkie Talkie (PTT)
    ptt: {
      isTransmitting: false,
      isLocked: false,
      recorder: null,
      chunks: [],
      stream: null
    },

    // WebRTC Calling
    call: {
      status: 'idle',
      targetPeerId: null,
      targetPeerName: null,
      isVideo: false,
      isCaller: false,
      pc: null,
      localStream: null,
      remoteStream: null,
      isAudioMuted: false,
      isVideoMuted: false,
      timerInterval: null,
      startTime: null,
      incomingData: null
    },

    // Sketch Canvas
    sketch: {
      isDrawing: false,
      color: '#000000',
      size: 3,
      lastX: 0,
      lastY: 0
    }
  };

  localStorage.setItem('mesh_peer_name', state.self.name);
  if (state.theme === 'dark') document.body.classList.add('dark-theme');

  // --- 5. DOM Elements Cache ---
  const elements = {
    connectionStatusDot: document.getElementById('connection-status-dot'),
    connectionStatusText: document.getElementById('connection-status-text'),
    networkModeBadge: document.getElementById('network-mode-badge'),
    e2eeStatusBadge: document.getElementById('e2ee-status-badge'),
    btnToggleTheme: document.getElementById('btn-toggle-theme'),
    btnOpenEncryption: document.getElementById('btn-open-encryption'),
    encryptionModalOverlay: document.getElementById('encryption-modal-overlay'),
    encryptionModalCloseBtn: document.getElementById('encryption-modal-close-btn'),
    roomPassphraseInput: document.getElementById('room-passphrase-input'),
    btnSaveEncryption: document.getElementById('btn-save-encryption'),
    
    // View Tabs
    tabBtnChat: document.getElementById('tab-btn-chat'),
    tabBtnMap: document.getElementById('tab-btn-map'),
    tabBtnPtt: document.getElementById('tab-btn-ptt'),
    
    mobTabChat: document.getElementById('mob-tab-chat'),
    mobTabMap: document.getElementById('mob-tab-map'),
    mobTabPtt: document.getElementById('mob-tab-ptt'),
    mobTabMenu: document.getElementById('mob-tab-menu'),
    sidebarBackdrop: document.getElementById('sidebar-backdrop'),
    btnCloseSidebar: document.getElementById('btn-close-sidebar'),

    viewPaneChat: document.getElementById('view-pane-chat'),
    viewPaneMap: document.getElementById('view-pane-map'),
    viewPanePtt: document.getElementById('view-pane-ptt'),

    // AI Survival Assistant
    btnOpenAi: document.getElementById('btn-open-ai'),
    aiModalOverlay: document.getElementById('ai-modal-overlay'),
    aiModalCloseBtn: document.getElementById('ai-modal-close-btn'),
    aiChatHistory: document.getElementById('ai-chat-history'),
    aiInputForm: document.getElementById('ai-input-form'),
    aiUserQuery: document.getElementById('ai-user-query'),

    // Geofence
    btnOpenGeofence: document.getElementById('btn-open-geofence'),
    geofenceModalOverlay: document.getElementById('geofence-modal-overlay'),
    geofenceModalCloseBtn: document.getElementById('geofence-modal-close-btn'),
    geofenceSlider: document.getElementById('geofence-slider'),
    geofenceRadiusLabel: document.getElementById('geofence-radius-label'),
    geofenceActiveToggle: document.getElementById('geofence-active-toggle'),
    btnSaveGeofence: document.getElementById('btn-save-geofence'),

    // SOS & Survival
    btnSosBeacon: document.getElementById('btn-sos-beacon'),
    sosModalOverlay: document.getElementById('sos-modal-overlay'),
    sosCoordsBox: document.getElementById('sos-coords-box'),
    btnToggleTorch: document.getElementById('btn-toggle-torch'),
    btnStopSos: document.getElementById('btn-stop-sos'),

    btnOpenGuide: document.getElementById('btn-open-guide'),
    guideModalOverlay: document.getElementById('guide-modal-overlay'),
    guideModalCloseBtn: document.getElementById('guide-modal-close-btn'),
    guideSearchInput: document.getElementById('guide-search-input'),
    guideContentArea: document.getElementById('guide-content-area'),

    btnStartRollcall: document.getElementById('btn-start-rollcall'),
    rollcallModalOverlay: document.getElementById('rollcall-modal-overlay'),
    rollcallModalCloseBtn: document.getElementById('rollcall-modal-close-btn'),
    rollcallPromptSubtitle: document.getElementById('rollcall-prompt-subtitle'),
    btnRollcallOk: document.getElementById('btn-rollcall-ok'),
    btnRollcallHelp: document.getElementById('btn-rollcall-help'),
    rollcallStatusList: document.getElementById('rollcall-status-list'),

    // Sidebar & Battery
    sidebar: document.getElementById('sidebar'),
    searchInput: document.getElementById('search-input'),
    btnClearSearch: document.getElementById('btn-clear-search'),
    peerList: document.getElementById('peer-list'),
    peerCountBadge: document.getElementById('peer-count-badge'),
    btnExportChat: document.getElementById('btn-export-chat'),
    profileNameInput: document.getElementById('profile-name-input'),
    selfIdTag: document.getElementById('self-id-tag'),
    selfAvatar: document.getElementById('self-avatar'),
    selfBatteryPill: document.getElementById('self-battery-pill'),
    selfBatFill: document.getElementById('self-bat-fill'),
    selfBatText: document.getElementById('self-bat-text'),
    
    // Chat Header & Messages
    activeChatTitle: document.getElementById('active-chat-title'),
    activeChatStatus: document.getElementById('active-chat-status'),
    activeChatAvatar: document.getElementById('active-chat-avatar'),
    chatHeaderActions: document.getElementById('chat-header-actions'),
    btnAudioCall: document.getElementById('btn-audio-call'),
    btnVideoCall: document.getElementById('btn-video-call'),
    messagesContainer: document.getElementById('messages-container'),
    typingIndicator: document.getElementById('typing-indicator'),
    
    // Reply Bar
    replyBar: document.getElementById('reply-bar'),
    replyAuthor: document.getElementById('reply-author'),
    replySnippet: document.getElementById('reply-snippet'),
    btnCancelReply: document.getElementById('btn-cancel-reply'),
    
    // Input Toolbar
    chatForm: document.getElementById('chat-form'),
    chatMessageInput: document.getElementById('chat-message-input'),
    voiceRecordBtn: document.getElementById('voice-record-btn'),
    attachFileBtn: document.getElementById('attach-file-btn'),
    fileInput: document.getElementById('file-input'),
    btnOpenSketch: document.getElementById('btn-open-sketch'),
    btnShareLocation: document.getElementById('btn-share-location'),
    sendMessageBtn: document.getElementById('send-message-btn'),
    
    // Map View & Compass HUD
    offlineMapCanvas: document.getElementById('offline-map-canvas'),
    mapGpsStatus: document.getElementById('map-gps-status'),
    mapCompassHeading: document.getElementById('map-compass-heading'),
    mapElevationStat: document.getElementById('map-elevation-stat'),
    mapTrailPoints: document.getElementById('map-trail-points'),
    btnDropWaypoint: document.getElementById('btn-drop-waypoint'),
    btnRecenterMap: document.getElementById('btn-recenter-map'),
    btnToggleElevationPanel: document.getElementById('btn-toggle-elevation-panel'),
    elevationPanel: document.getElementById('elevation-panel'),
    elevationCanvas: document.getElementById('elevation-canvas'),
    btnCloseElev: document.getElementById('btn-close-elev'),
    elevGainStat: document.getElementById('elev-gain-stat'),
    stormProbStat: document.getElementById('storm-prob-stat'),
    weatherRiskPill: document.getElementById('weather-risk-pill'),
    peerGuideRadar: document.getElementById('peer-guide-radar'),
    guideArrow: document.getElementById('guide-arrow'),
    guideText: document.getElementById('guide-text'),
    waypointModalOverlay: document.getElementById('waypoint-modal-overlay'),
    waypointModalCloseBtn: document.getElementById('waypoint-modal-close-btn'),
    waypointNameInput: document.getElementById('waypoint-name-input'),
    btnConfirmWaypoint: document.getElementById('btn-confirm-waypoint'),
    waypointIconPalette: document.getElementById('waypoint-icon-palette'),

    // PTT & VOX View
    btnPttGiant: document.getElementById('btn-ptt-giant'),
    pttBtnLabel: document.getElementById('ptt-btn-label'),
    pttRingPulse: document.getElementById('ptt-ring-pulse'),
    btnToggleMicLock: document.getElementById('btn-toggle-mic-lock'),
    btnToggleVox: document.getElementById('btn-toggle-vox'),
    voxMeterContainer: document.getElementById('vox-meter-container'),
    voxMeterFill: document.getElementById('vox-meter-fill'),
    voxStateLabel: document.getElementById('vox-state-label'),
    pttLogList: document.getElementById('ptt-log-list'),

    // Sketch Modal
    sketchModalOverlay: document.getElementById('sketch-modal-overlay'),
    sketchModalCloseBtn: document.getElementById('sketch-modal-close-btn'),
    sketchCanvas: document.getElementById('sketch-canvas'),
    btnClearSketch: document.getElementById('btn-clear-sketch'),
    btnSendSketch: document.getElementById('btn-send-sketch'),
    
    // QR Modal
    qrShareBtn: document.getElementById('qr-share-btn'),
    qrModalOverlay: document.getElementById('qr-modal-overlay'),
    qrModalCloseBtn: document.getElementById('qr-modal-close-btn'),
    qrModalDoneBtn: document.getElementById('qr-modal-done-btn'),
    qrImageWrapper: document.getElementById('qr-image-wrapper'),
    ipAddressList: document.getElementById('ip-address-list'),
    menuToggleBtn: document.getElementById('menu-toggle-btn'),
    
    // Calling Modals
    incomingCallOverlay: document.getElementById('incoming-call-overlay'),
    incomingCallAvatar: document.getElementById('incoming-call-avatar'),
    incomingCallerName: document.getElementById('incoming-caller-name'),
    incomingCallType: document.getElementById('incoming-call-type'),
    btnIncomingAccept: document.getElementById('btn-incoming-accept'),
    btnIncomingDecline: document.getElementById('btn-incoming-decline'),
    
    activeCallOverlay: document.getElementById('active-call-overlay'),
    callVideoContainer: document.getElementById('call-video-container'),
    remoteVideo: document.getElementById('remote-video'),
    localVideo: document.getElementById('local-video'),
    callAudioContainer: document.getElementById('call-audio-container'),
    callActiveAvatar: document.getElementById('call-active-avatar'),
    callActiveName: document.getElementById('call-active-name'),
    callStatusLabel: document.getElementById('call-status-label'),
    callTimer: document.getElementById('call-timer'),
    btnCallMute: document.getElementById('btn-call-mute'),
    btnCallVideoToggle: document.getElementById('btn-call-video-toggle'),
    btnCallEnd: document.getElementById('btn-call-end')
  };

  // --- 6. View Switching & Appearance ---
  function switchView(viewName) {
    state.activeView = viewName;
    
    if (elements.tabBtnChat) elements.tabBtnChat.classList.toggle('active', viewName === 'chat');
    if (elements.tabBtnMap) elements.tabBtnMap.classList.toggle('active', viewName === 'map');
    if (elements.tabBtnPtt) elements.tabBtnPtt.classList.toggle('active', viewName === 'ptt');

    if (elements.mobTabChat) elements.mobTabChat.classList.toggle('active', viewName === 'chat');
    if (elements.mobTabMap) elements.mobTabMap.classList.toggle('active', viewName === 'map');
    if (elements.mobTabPtt) elements.mobTabPtt.classList.toggle('active', viewName === 'ptt');

    elements.viewPaneChat.style.display = viewName === 'chat' ? 'flex' : 'none';
    elements.viewPaneMap.style.display = viewName === 'map' ? 'flex' : 'none';
    elements.viewPanePtt.style.display = viewName === 'ptt' ? 'flex' : 'none';

    closeSidebarDrawer();
    if (viewName === 'map') {
      resizeAndDrawMap();
      renderElevationProfile();
    }
  }

  function toggleAppearance() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('mesh_theme', state.theme);
    document.body.classList.toggle('dark-theme', state.theme === 'dark');
    if (state.activeView === 'map') resizeAndDrawMap();
  }

  function openSidebarDrawer() {
    elements.sidebar.classList.add('open');
    elements.sidebarBackdrop.classList.add('active');
  }

  function closeSidebarDrawer() {
    elements.sidebar.classList.remove('open');
    elements.sidebarBackdrop.classList.remove('active');
  }

  // --- 7. Apple-Style Battery Capsule Widget ---
  async function initBatteryMonitor() {
    if ('getBattery' in navigator) {
      try {
        const battery = await navigator.getBattery();
        const updateBattery = () => {
          const level = Math.round(battery.level * 100);
          state.batteryPercent = level;

          if (elements.selfBatFill) elements.selfBatFill.style.width = `${level}%`;
          if (elements.selfBatText) elements.selfBatText.textContent = `${level}%`;
          if (elements.selfBatteryPill) {
            elements.selfBatteryPill.classList.toggle('low', level <= 20);
          }

          if (state.ws && state.ws.readyState === WebSocket.OPEN) {
            state.ws.send(JSON.stringify({
              type: 'BATTERY_STATUS',
              battery: { level, charging: battery.charging }
            }));
          }
        };

        battery.addEventListener('levelchange', updateBattery);
        battery.addEventListener('chargingchange', updateBattery);
        updateBattery();
      } catch (e) {
        console.warn('[Battery] API error:', e);
      }
    }
  }

  // --- 8. 🧭 360° Digital Compass & Peer Direction Guidance ---
  function initCompassSensor() {
    if ('DeviceOrientationEvent' in window) {
      const handleOrientation = (e) => {
        let heading = 0;
        if (e.webkitCompassHeading) {
          heading = e.webkitCompassHeading;
        } else if (e.alpha) {
          heading = 360 - e.alpha;
        }
        state.myHeading = Math.round(heading);
        updateCompassDisplay();
      };

      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        window.addEventListener('click', () => {
          DeviceOrientationEvent.requestPermission()
            .then(res => {
              if (res === 'granted') window.addEventListener('deviceorientation', handleOrientation);
            })
            .catch(() => {});
        }, { once: true });
      } else {
        window.addEventListener('deviceorientation', handleOrientation);
      }
    }
  }

  function updateCompassDisplay() {
    const deg = state.myHeading;
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const idx = Math.round(deg / 22.5) % 16;
    const cardinal = directions[idx];

    elements.mapCompassHeading.textContent = `${String(deg).padStart(3, '0')}° ${cardinal}`;

    // Target Peer Guidance Radar
    if (state.activeTargetId && state.activeTargetId !== 'broadcast' && state.myCoords) {
      const targetLoc = state.peerLocations.get(state.activeTargetId);
      if (targetLoc && targetLoc.coords) {
        const rawBearing = calculateRawBearing(state.myCoords.latitude, state.myCoords.longitude, targetLoc.coords.latitude, targetLoc.coords.longitude);
        const relativeBearing = (rawBearing - state.myHeading + 360) % 360;
        const distStr = calculateDistance(state.myCoords.latitude, state.myCoords.longitude, targetLoc.coords.latitude, targetLoc.coords.longitude);

        elements.peerGuideRadar.style.display = 'flex';
        elements.guideArrow.style.transform = `rotate(${relativeBearing}deg)`;
        elements.guideText.textContent = `${targetLoc.name || 'Peer'}: ${distStr} (${Math.round(rawBearing)}°)`;
      } else {
        elements.peerGuideRadar.style.display = 'none';
      }
    } else {
      elements.peerGuideRadar.style.display = 'none';
    }
  }

  function calculateRawBearing(lat1, lon1, lat2, lon2) {
    const y = Math.sin((lon2 - lon1) * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180);
    const x = Math.cos(lat1 * Math.PI / 180) * Math.sin(lat2 * Math.PI / 180) -
              Math.sin(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.cos((lon2 - lon1) * Math.PI / 180);
    const θ = Math.atan2(y, x);
    return (θ * 180 / Math.PI + 360) % 360;
  }

  // --- 9. 🤖 100% Offline AI Survival Assistant (Neural Pattern Reasoner) ---
  const OFFLINE_AI_KNOWLEDGE = [
    {
      keywords: ['snake', 'bite', 'viper', 'rattlesnake', 'cobra', 'venom'],
      title: 'Snake / Venomous Bite Protocol',
      response: '1. **Keep Victim Calm**: Minimize movement to slow venom circulation in the bloodstream.\n2. **Position Limb**: Keep the bite site **below heart level**.\n3. **DO NOT**: Cut the wound, suck venom, apply ice, or use a tight tourniquet.\n4. **Mark Swelling**: Use a pen to outline the swelling border and write the exact time.\n5. **Immobilize**: Splint the limb gently and prepare for immediate evacuation.'
    },
    {
      keywords: ['water', 'purify', 'boil', 'filter', 'muddy', 'drink', 'hydration'],
      title: 'Wilderness Water Purification',
      response: '1. **Rolling Boil**: Boil vigorously for **at least 1 full minute** (3 minutes if above 2,000m elevation).\n2. **Solar SODIS**: Fill clear PET plastic bottles and expose to direct sunlight on a reflective surface for 6 hours.\n3. **DIY Sand/Charcoal Filter**: Layer cotton cloth -> crushed wood charcoal -> fine sand -> coarse gravel to remove sediment before boiling.'
    },
    {
      keywords: ['hypothermia', 'cold', 'freeze', 'shivering', 'frostbite'],
      title: 'Hypothermia & Cold Exposure',
      response: '1. **Insulate Ground**: Cold ground drains 50x more heat than air. Put backpacks/pine branches beneath the patient.\n2. **Replace Wet Clothes**: Strip wet gear immediately and wrap in dry sleeping bags/space blankets.\n3. **Core Heat**: Apply warm bottles or body heat to **chest, neck, and armpits** (never directly to cold extremities).\n4. **Warm Sips**: Offer warm, sugary liquids if conscious. Never give alcohol or caffeine.'
    },
    {
      keywords: ['fire', 'wet', 'rain', 'tinder', 'spark', 'flint', 'kindling'],
      title: 'Building Fire in Wet Conditions',
      response: '1. **Dry Core Wood**: Shave the outer wet bark off dead tree branches; the center wood is bone-dry.\n2. **Pine Resin / Fatwood**: Look for dead pine stumps dripping sticky pitch—it catches fire even underwater.\n3. **Platform**: Build a wooden base so your tinder does not touch damp ground.\n4. **Feather Sticks**: Shave thin curls along a dry branch to maximize surface area for sparks.'
    },
    {
      keywords: ['bear', 'grizzly', 'wildlife', 'animal', 'wolf', 'cougar', 'lion'],
      title: 'Dangerous Wildlife Encounters',
      response: '1. **Black Bear**: Make yourself look huge, yell aggressively, make loud metal clangs. Do not run or climb trees.\n2. **Grizzly / Brown Bear**: Speak in a calm low voice, do NOT make direct eye contact. Back away slowly. If charged, drop flat on your stomach, interlace fingers behind neck, and spread legs.\n3. **Cougar / Mountain Lion**: Never turn your back or crouch. Maintain intense eye contact, raise your arms, and throw rocks.'
    },
    {
      keywords: ['plant', 'edible', 'food', 'eat', 'berry', 'berries', 'mushroom'],
      title: 'Wild Foraging & Universal Edibility Test',
      response: '1. **Golden Rule**: Never eat wild mushrooms or white/yellow berries in survival scenarios.\n2. **Safe Plants**: Pine needles (steep in hot water for Vitamin C), young Dandelion leaves, Cattail roots (boil or roast), inner pine bark (cambium layer).\n3. **Edibility Test**: Rub plant on inner wrist -> wait 8 hrs -> touch to outer lip -> wait 8 hrs -> chew small bite without swallowing. If no burning/nausea, it is safer.'
    },
    {
      keywords: ['shelter', 'debris', 'snow', 'bivouac', 'wind', 'tarp'],
      title: 'Emergency Survival Shelters',
      response: '1. **Debris Hut**: Lean a 3-meter ridgepole against a sturdy tree stump at 45°. Layer ribs across sides, then pile 2–3 feet of dry leaves and pine needles for insulation.\n2. **Snow Trench**: Dig a trench 1 meter deep in snow, lay branches and tarp across the top, and shovel snow over it.\n3. **Orientation**: Always face the entrance 90° away from prevailing winds.'
    }
  ];

  function queryOfflineAiAssistant(userPrompt) {
    const p = userPrompt.toLowerCase().trim();
    if (!p) return;

    appendAiBubble('user', userPrompt);
    elements.aiUserQuery.value = '';

    // Search intelligent corpus
    let bestMatch = null;
    let maxHits = 0;

    OFFLINE_AI_KNOWLEDGE.forEach(k => {
      let hits = 0;
      k.keywords.forEach(kw => {
        if (p.includes(kw)) hits++;
      });
      if (hits > maxHits) {
        maxHits = hits;
        bestMatch = k;
      }
    });

    setTimeout(() => {
      if (bestMatch && maxHits > 0) {
        const html = `<strong>${escapeHtml(bestMatch.title)}</strong><br><br>${formatAiText(bestMatch.response)}`;
        appendAiBubble('assistant', html);
      } else {
        const fallback = `<strong>Survival Guidance</strong><br><br>I evaluated your question: <em>"${escapeHtml(userPrompt)}"</em>.<br><br>• <strong>Primary Priorities</strong>: Security -> Warmth/Shelter -> Water -> Rescue Signaling -> Food.<br>• For detailed medical, water, or shelter instructions, check the <strong>Wilderness Survival Handbook (Book Icon)</strong> in the top header!`;
        appendAiBubble('assistant', fallback);
      }
      elements.aiChatHistory.scrollTop = elements.aiChatHistory.scrollHeight;
    }, 280);
  }

  function appendAiBubble(role, content) {
    const div = document.createElement('div');
    div.className = `ai-bubble ${role}`;
    div.innerHTML = `
      <div class="ai-name-tag">${role === 'user' ? 'You' : '🤖 Survival AI'}</div>
      <div>${content}</div>
    `;
    elements.aiChatHistory.appendChild(div);
    elements.aiChatHistory.scrollTop = elements.aiChatHistory.scrollHeight;
  }

  function formatAiText(txt) {
    return txt
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }

  // --- 10. 🚨 Geofencing & Lost Hiker Proximity Alarm ---
  function checkGeofenceProximity(myLat, myLon) {
    if (!state.geofence.enabled) return;

    let centerLat = state.geofence.originCoords ? state.geofence.originCoords.latitude : null;
    let centerLon = state.geofence.originCoords ? state.geofence.originCoords.longitude : null;

    // Default center is the first recorded point
    if (!centerLat && state.myTrail.length > 0) {
      centerLat = state.myTrail[0].lat;
      centerLon = state.myTrail[0].lon;
      state.geofence.originCoords = { latitude: centerLat, longitude: centerLon };
    }

    if (!centerLat) return;

    const R = 6371e3;
    const φ1 = centerLat * Math.PI / 180;
    const φ2 = myLat * Math.PI / 180;
    const Δφ = (myLat - centerLat) * Math.PI / 180;
    const Δλ = (myLon - centerLon) * Math.PI / 180;
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const d = R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));

    const maxR = state.geofence.radiusMeters;
    const now = Date.now();

    if (d > maxR && (now - state.geofence.lastAlertTime > 20000)) {
      state.geofence.lastAlertTime = now;
      playSound('geofence_alarm');
      
      const alertMsg = `⚠️ GEOFENCE PERIMETER BREACH: You are ${Math.round(d)}m away from group base (limit: ${maxR}m)!`;
      alert(alertMsg);

      if (state.ws && state.ws.readyState === WebSocket.OPEN) {
        state.ws.send(JSON.stringify({
          type: 'GEOFENCE_ALERT',
          senderName: state.self.name,
          distance: Math.round(d),
          maxRadius: maxR,
          coords: state.myCoords
        }));
      }
    }
  }

  function handleIncomingGeofenceAlert(data) {
    playSound('geofence_alarm');
    alert(`🚨 LOST HIKER ALERT: ${data.senderName} has wandered ${data.distance}m away (exceeding ${data.maxRadius}m perimeter)!`);
  }

  function saveGeofenceSettings() {
    state.geofence.radiusMeters = parseInt(elements.geofenceSlider.value, 10);
    state.geofence.enabled = elements.geofenceActiveToggle.checked;
    
    if (state.myCoords) {
      state.geofence.originCoords = state.myCoords;
    }

    localStorage.setItem('mesh_geofence_radius', state.geofence.radiusMeters);
    localStorage.setItem('mesh_geofence_enabled', state.geofence.enabled);

    elements.geofenceModalOverlay.classList.remove('active');
    alert(`Geofence perimeter set to ${state.geofence.radiusMeters}m (${state.geofence.enabled ? 'ACTIVE' : 'DISABLED'}).`);
    if (state.activeView === 'map') drawMap();
  }

  // --- 11. 🎙️ VOX Hands-Free Voice-Activated Walkie-Talkie ---
  async function toggleVoxMode() {
    state.vox.enabled = !state.vox.enabled;
    elements.btnToggleVox.classList.toggle('active', state.vox.enabled);
    elements.btnToggleVox.querySelector('span').textContent = state.vox.enabled ? '🎙️ VOX Hands-Free: ON' : '🎙️ VOX Hands-Free: OFF';
    elements.voxMeterContainer.style.display = state.vox.enabled ? 'flex' : 'none';

    if (state.vox.enabled) {
      await startVoxAudioAnalysis();
    } else {
      stopVoxAudioAnalysis();
    }
  }

  async function startVoxAudioAnalysis() {
    try {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      state.vox.micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const src = audioCtx.createMediaStreamSource(state.vox.micStream);
      state.vox.analyser = audioCtx.createAnalyser();
      state.vox.analyser.fftSize = 256;
      src.connect(state.vox.analyser);

      const buffer = new Uint8Array(state.vox.analyser.frequencyBinCount);

      const checkVolume = () => {
        if (!state.vox.enabled) return;
        state.vox.analyser.getByteFrequencyData(buffer);
        
        let sum = 0;
        for (let i = 0; i < buffer.length; i++) sum += buffer[i];
        const avg = sum / buffer.length;
        const normalized = Math.min(1, avg / 80);

        elements.voxMeterFill.style.width = `${normalized * 100}%`;

        // VOX Voice Activation
        if (normalized > state.vox.threshold) {
          if (!state.ptt.isTransmitting) {
            elements.voxStateLabel.textContent = 'Voice Detected! Transmitting...';
            startPttTransmission();
          }
          if (state.vox.silenceTimer) {
            clearTimeout(state.vox.silenceTimer);
            state.vox.silenceTimer = null;
          }
        } else if (state.ptt.isTransmitting && !state.vox.silenceTimer) {
          elements.voxStateLabel.textContent = 'Silence hang-time...';
          state.vox.silenceTimer = setTimeout(() => {
            if (state.ptt.isTransmitting && !state.ptt.isLocked) {
              stopPttTransmission();
              elements.voxStateLabel.textContent = 'Listening...';
            }
            state.vox.silenceTimer = null;
          }, 1100);
        }

        state.vox.animFrame = requestAnimationFrame(checkVolume);
      };

      checkVolume();
    } catch (e) {
      alert('Microphone access is required for VOX Hands-Free.');
      state.vox.enabled = false;
      elements.btnToggleVox.classList.remove('active');
      elements.btnToggleVox.querySelector('span').textContent = '🎙️ VOX Hands-Free: OFF';
      elements.voxMeterContainer.style.display = 'none';
    }
  }

  function stopVoxAudioAnalysis() {
    if (state.vox.animFrame) cancelAnimationFrame(state.vox.animFrame);
    if (state.vox.micStream) state.vox.micStream.getTracks().forEach(t => t.stop());
    if (state.ptt.isTransmitting && !state.ptt.isLocked) stopPttTransmission();
  }

  // --- 12. ⛰️ Elevation Profile & Storm Risk Predictor ---
  function recordElevation(alt) {
    if (typeof alt !== 'number' || isNaN(alt)) return;
    const rounded = Math.round(alt);
    elements.mapElevationStat.textContent = `${rounded} m`;

    const last = state.elevationHistory[state.elevationHistory.length - 1];
    if (!last || Math.abs(last.alt - rounded) >= 2 || (Date.now() - last.time > 15000)) {
      state.elevationHistory.push({ alt: rounded, time: Date.now() });
      if (state.elevationHistory.length > 80) state.elevationHistory.shift();
      localStorage.setItem('mesh_elevation_history', JSON.stringify(state.elevationHistory));
      renderElevationProfile();
    }
  }

  function renderElevationProfile() {
    if (!elements.elevationCanvas) return;
    const ctx = elements.elevationCanvas.getContext('2d');
    const w = elements.elevationCanvas.width;
    const h = elements.elevationCanvas.height;

    ctx.clearRect(0, 0, w, h);

    if (state.elevationHistory.length < 2) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = '11px sans-serif';
      ctx.fillText('Walking elevation trail graph logging...', 20, h / 2);
      return;
    }

    const alts = state.elevationHistory.map(e => e.alt);
    const minAlt = Math.min(...alts);
    const maxAlt = Math.max(...alts);
    const range = Math.max(10, maxAlt - minAlt);

    ctx.beginPath();
    ctx.moveTo(0, h);

    state.elevationHistory.forEach((pt, i) => {
      const x = (i / (state.elevationHistory.length - 1)) * w;
      const y = h - ((pt.alt - minAlt) / range) * (h - 20) - 10;
      ctx.lineTo(x, y);
    });

    ctx.lineTo(w, h);
    ctx.closePath();

    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, 'rgba(0, 122, 255, 0.6)');
    grad.addColorStop(1, 'rgba(0, 122, 255, 0.05)');
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.strokeStyle = '#007aff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Ascent stats
    const ascent = Math.max(0, maxAlt - minAlt);
    elements.elevGainStat.textContent = `Ascent: +${ascent}m (Max: ${maxAlt}m)`;

    // Mountain Storm Risk Predictor
    const stormRisk = ascent > 400 ? 'Moderate (Altitude Front)' : 'Low';
    elements.stormProbStat.textContent = `Storm Risk: ${stormRisk}`;
    elements.weatherRiskPill.textContent = stormRisk === 'Low' ? '⛅ Fair Weather' : '⛈️ Barometric Front';
    elements.weatherRiskPill.classList.toggle('warning', stormRisk !== 'Low');
  }

  // --- 13. Emergency SOS Beacon & Strobe Engine ---
  async function activateSosBeacon() {
    state.sos.active = true;
    elements.sosModalOverlay.classList.add('active');
    startSosAudio();

    let flash = false;
    state.sos.strobeTimer = setInterval(() => {
      flash = !flash;
      elements.sosModalOverlay.classList.toggle('strobe-flash', flash);
    }, 220);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      const track = stream.getVideoTracks()[0];
      const capabilities = await track.getCapabilities();
      if (capabilities.torch) {
        state.sos.torchTrack = track;
        track.applyConstraints({ advanced: [{ torch: true }] });
      }
    } catch (e) {
      console.warn('[SOS] Torch not accessible:', e);
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        state.myCoords = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          altitude: pos.coords.altitude
        };
        elements.sosCoordsBox.textContent = `📍 EMERGENCY FIX: ${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`;
        broadcastSosAlert(true);
      });
    } else {
      broadcastSosAlert(true);
    }
  }

  function deactivateSosBeacon() {
    state.sos.active = false;
    elements.sosModalOverlay.classList.remove('active');
    elements.sosModalOverlay.classList.remove('strobe-flash');
    stopSosAudio();

    if (state.sos.strobeTimer) {
      clearInterval(state.sos.strobeTimer);
      state.sos.strobeTimer = null;
    }

    if (state.sos.torchTrack) {
      state.sos.torchTrack.stop();
      state.sos.torchTrack = null;
    }

    broadcastSosAlert(false);
  }

  function broadcastSosAlert(active) {
    if (state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(JSON.stringify({
        type: 'EMERGENCY_SOS',
        senderName: state.self.name,
        coords: state.myCoords,
        active: active
      }));
    }
  }

  function handleIncomingSosAlert(data) {
    if (data.active) {
      playSound('message');
      startSosAudio();
      alert(`🚨 EMERGENCY SOS DISTRESS SIGNAL FROM ${data.senderName}!\nCoordinates: ${data.coords ? `${data.coords.latitude.toFixed(5)}, ${data.coords.longitude.toFixed(5)}` : 'Position unknown'}`);
    } else {
      stopSosAudio();
    }
  }

  // --- 14. Offline Wilderness First-Aid & Survival Handbook ---
  const SURVIVAL_GUIDES = [
    {
      cat: 'firstaid',
      title: 'Fractures & Sprains Immobilization',
      body: 'Do not attempt to push bone back in. Splint the joint above and below the fracture using straight branches padded with clothing. Wrap firmly with tape, ensuring blood circulation is not cut off.'
    },
    {
      cat: 'firstaid',
      title: 'Snake & Venomous Insect Bites',
      body: 'Keep victim calm and still. Keep bitten limb below heart level. Wash area gently. DO NOT cut, suck venom, apply ice, or use a tourniquet. Mark swelling border with a pen and note the time.'
    },
    {
      cat: 'firstaid',
      title: 'Hypothermia & Cold Shock Treatment',
      body: 'Move out of wind/wet. Replace wet clothes with dry layers. Insulate patient from cold ground with pack/branches. Apply core heat to chest and armpits. Give warm sweet drinks if conscious.'
    },
    {
      cat: 'firstaid',
      title: 'Heat Exhaustion vs Heat Stroke',
      body: 'Heat Stroke is life-threatening (hot dry skin, confusion, no sweat). Immediately move to shade, douse with water, and fan aggressively. Apply wet cold cloths to neck and armpits.'
    },
    {
      cat: 'water',
      title: 'Wilderness Water Purification',
      body: '1. Rolling Boil: Boil vigorously for at least 1 full minute (3 mins at altitude).\n2. Solar Disinfection (SODIS): Clear PET bottle in direct sunlight for 6 hours.\n3. DIY Sand/Charcoal Filter: Layer cloth, crushed charcoal, fine sand, and gravel.'
    },
    {
      cat: 'shelter',
      title: 'Debris Hut & Bivouac Shelter',
      body: 'Prop a 2.5m ridgepole branch against a sturdy tree fork. Lean ribs along both sides at 45°. Pile 2-3 feet of dry leaves/pine needles on top for waterproof thermal insulation.'
    },
    {
      cat: 'signals',
      title: 'Ground-to-Air Emergency Signals',
      body: 'Make large symbols on ground with stones, logs, or stomped snow (min 3m long):\n• "V" = Require Assistance\n• "X" = Require Medical Assistance\n• "SOS" = International Distress Signal\n• 3 fires in a triangle = Universal Distress.'
    },
    {
      cat: 'morse',
      title: 'International Morse Code Reference',
      body: 'SOS = · · · — — — · · ·\nA = · — | B = — · · · | C = — · — · | D = — · · | E = ·\nH = · · · · | K = — · — | M = — — | N = — · | O = — — —\nS = · · · | T = — | W = · — — | 1 = · — — — — | 9 = — — — — ·'
    }
  ];

  let selectedGuideCat = 'firstaid';

  function renderSurvivalGuide() {
    const q = elements.guideSearchInput.value.trim().toLowerCase();
    elements.guideContentArea.innerHTML = '';

    const filtered = SURVIVAL_GUIDES.filter(g => {
      const matchCat = q ? true : g.cat === selectedGuideCat;
      const matchSearch = q ? (g.title.toLowerCase().includes(q) || g.body.toLowerCase().includes(q)) : true;
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      elements.guideContentArea.innerHTML = '<div class="ptt-log-item empty">No matching guides found.</div>';
      return;
    }

    filtered.forEach(g => {
      const card = document.createElement('div');
      card.className = 'guide-card';
      card.innerHTML = `
        <h4>${escapeHtml(g.title)}</h4>
        <p>${escapeHtml(g.body).replace(/\n/g, '<br>')}</p>
      `;
      elements.guideContentArea.appendChild(card);
    });
  }

  // --- 15. Safety Roll Call Check-In Engine ---
  function startRollCall() {
    elements.rollcallModalOverlay.classList.add('active');
    elements.rollcallPromptSubtitle.textContent = 'You started a safety roll call';
    elements.rollcallStatusList.innerHTML = '<div class="ptt-log-item"><span>Check-in broadcast sent to mesh...</span></div>';

    if (state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(JSON.stringify({
        type: 'ROLL_CALL_START',
        senderName: state.self.name
      }));
    }
  }

  function handleIncomingRollCallStart(data) {
    playSound('message');
    elements.rollcallModalOverlay.classList.add('active');
    elements.rollcallPromptSubtitle.textContent = `Roll call requested by ${data.senderName}`;
  }

  function submitRollCallResponse(status) {
    if (state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(JSON.stringify({
        type: 'ROLL_CALL_RESPONSE',
        senderName: state.self.name,
        status: status,
        coords: state.myCoords
      }));
    } else {
      handleIncomingRollCallResponse({
        senderId: state.self.id,
        senderName: state.self.name,
        status: status,
        coords: state.myCoords
      });
    }
  }

  function handleIncomingRollCallResponse(data) {
    const emptyNotice = elements.rollcallStatusList.querySelector('.empty');
    if (emptyNotice) emptyNotice.remove();

    const peerKey = (data.senderId || data.senderName || 'user').replace(/[^a-zA-Z0-9_-]/g, '_');
    let item = document.getElementById(`rollcall-item-${peerKey}`);

    const isOk = data.status === 'ok';
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (!item) {
      item = document.createElement('div');
      item.className = 'ptt-log-item';
      item.id = `rollcall-item-${peerKey}`;
      elements.rollcallStatusList.prepend(item);
    }

    item.innerHTML = `
      <span style="font-weight: 600; color: ${isOk ? '#34c759' : '#ff3b30'};">
        ${isOk ? '✅' : '⚠️'} ${escapeHtml(data.senderName)}: ${isOk ? 'Safe & OK' : 'NEEDS ASSISTANCE'}
      </span>
      <span style="font-family: var(--font-mono); font-size: 11px; opacity: 0.7;">${timeStr}</span>
    `;
  }

  // --- 16. WebSocket Resilient Mesh Hub Client ---
  let reconnectTimer = null;
  let clientHeartbeatInterval = null;

  function connectWebSocket() {
    if (reconnectTimer) clearTimeout(reconnectTimer);
    if (state.ws && (state.ws.readyState === WebSocket.OPEN || state.ws.readyState === WebSocket.CONNECTING)) {
      return;
    }

    const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${location.host}`;

    try {
      state.ws = new WebSocket(wsUrl);
    } catch (e) {
      scheduleReconnect();
      return;
    }

    state.ws.onopen = () => {
      state.connected = true;
      updateConnectionStatus(true, 'Connected');
      
      state.ws.send(JSON.stringify({
        type: 'JOIN',
        peer: state.self
      }));

      if (clientHeartbeatInterval) clearInterval(clientHeartbeatInterval);
      clientHeartbeatInterval = setInterval(() => {
        if (state.ws && state.ws.readyState === WebSocket.OPEN) {
          state.ws.send(JSON.stringify({ type: 'HEARTBEAT', peer: state.self }));
        } else {
          scheduleReconnect();
        }
      }, 5000);
    };

    state.ws.onmessage = async (event) => {
      try {
        const raw = JSON.parse(event.data);
        await handleIncomingServerMessage(raw);
      } catch (err) {
        console.error('[Network] Parse error:', err);
      }
    };

    state.ws.onclose = () => {
      state.connected = false;
      updateConnectionStatus(false, 'Reconnecting...');
      scheduleReconnect();
    };

    state.ws.onerror = () => {
      state.connected = false;
      updateConnectionStatus(false, 'Waiting for mesh...');
      scheduleReconnect();
    };
  }

  function scheduleReconnect() {
    if (clientHeartbeatInterval) {
      clearInterval(clientHeartbeatInterval);
      clientHeartbeatInterval = null;
    }
    if (reconnectTimer) clearTimeout(reconnectTimer);
    reconnectTimer = setTimeout(() => {
      connectWebSocket();
    }, 1500);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      if (!state.ws || state.ws.readyState !== WebSocket.OPEN) {
        connectWebSocket();
      } else {
        state.ws.send(JSON.stringify({ type: 'GET_PEERS' }));
      }
    }
  });

  window.addEventListener('focus', () => {
    if (!state.ws || state.ws.readyState !== WebSocket.OPEN) {
      connectWebSocket();
    } else {
      state.ws.send(JSON.stringify({ type: 'GET_PEERS' }));
    }
  });

  window.addEventListener('online', () => {
    connectWebSocket();
  });

  function updateConnectionStatus(isOnline, statusText) {
    if (isOnline) {
      elements.connectionStatusDot.classList.remove('offline');
      elements.connectionStatusText.textContent = statusText;
    } else {
      elements.connectionStatusDot.classList.add('offline');
      elements.connectionStatusText.textContent = statusText;
    }
  }

  async function handleIncomingServerMessage(data) {
    switch (data.type) {
      case 'WELCOME':
      case 'PEER_LIST_UPDATE':
        renderPeerList(data.peers);
        if (data.type === 'WELCOME' && data.recentMessages && data.recentMessages.length > 0) {
          for (const rawMsg of data.recentMessages) {
            const msg = await decryptPayload(rawMsg);
            if (!state.messages.find(m => m.id === msg.id)) {
              appendMessage(msg, false);
            }
          }
        }
        break;

      case 'PEER_JOINED':
      case 'PEER_LEFT':
        renderPeerList(data.peers);
        if (data.type === 'PEER_LEFT') {
          state.peerLocations.delete(data.peerId);
          state.peerBatteries.delete(data.peerId);
          updateMapStats();
          updateCompassDisplay();
          if (state.call.targetPeerId === data.peerId) endCall(false);
        }
        break;

      case 'CHAT_MESSAGE': {
        const msg = await decryptPayload(data.message);
        appendMessage(msg, data.isSelf || msg.senderId === state.self.id);
        if (!data.isSelf && msg.senderId !== state.self.id) playSound('message');
        break;
      }

      case 'MESSAGE_REACTION':
        handleIncomingReaction(data);
        break;

      case 'PTT_AUDIO':
        handleIncomingPttAudio(data);
        break;

      case 'EMERGENCY_SOS':
        handleIncomingSosAlert(data);
        break;

      case 'GEOFENCE_ALERT':
        handleIncomingGeofenceAlert(data);
        break;

      case 'ROLL_CALL_START':
        handleIncomingRollCallStart(data);
        break;

      case 'ROLL_CALL_RESPONSE':
        handleIncomingRollCallResponse(data);
        break;

      case 'BATTERY_STATUS':
        state.peerBatteries.set(data.senderId, data.battery);
        renderPeerList(Array.from(state.peers.values()));
        break;

      case 'GPS_BROADCAST':
        state.peerLocations.set(data.senderId, {
          name: data.senderName,
          coords: data.coords,
          timestamp: data.timestamp
        });
        updateMapStats();
        updateCompassDisplay();
        if (state.activeView === 'map') drawMap();
        break;

      case 'WAYPOINT_ADD':
        if (!state.waypoints.find(w => w.id === data.waypoint.id)) {
          state.waypoints.push(data.waypoint);
          localStorage.setItem('mesh_waypoints', JSON.stringify(state.waypoints));
          if (state.activeView === 'map') drawMap();
        }
        break;

      case 'TYPING':
        if (data.peerId !== state.self.id) {
          const peer = state.peers.get(data.peerId);
          elements.typingIndicator.textContent = data.isTyping && peer ? `${peer.name} is typing...` : '';
        }
        break;

      case 'CALL_INVITE':
        handleIncomingCallInvite(data);
        break;
      case 'CALL_ACCEPT':
        handleCallAccepted(data);
        break;
      case 'CALL_REJECT':
        handleCallRejected(data);
        break;
      case 'CALL_OFFER':
        handleCallOffer(data);
        break;
      case 'CALL_ANSWER':
        handleCallAnswer(data);
        break;
      case 'CALL_ICE':
        handleCallIce(data);
        break;
      case 'CALL_END':
        handleRemoteCallEnd(data);
        break;
    }
  }

  // --- 17. Walkie-Talkie Push-to-Talk (PTT) Touch & Compressed Audio ---
  let pttSelectedIcon = '⛺';

  async function startPttTransmission() {
    if (state.ptt.isTransmitting) return;

    try {
      if ('vibrate' in navigator) navigator.vibrate(40);
      playSound('radio_start');
      state.ptt.isTransmitting = true;
      elements.btnPttGiant.classList.add('transmitting');
      elements.pttBtnLabel.textContent = 'TRANSMITTING...';

      state.ptt.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      state.ptt.chunks = [];
      try {
        state.ptt.recorder = new MediaRecorder(state.ptt.stream, { audioBitsPerSecond: 24000 });
      } catch (e) {
        state.ptt.recorder = new MediaRecorder(state.ptt.stream);
      }

      state.ptt.recorder.ondataavailable = (e) => {
        if (e.data.size > 0) state.ptt.chunks.push(e.data);
      };

      state.ptt.recorder.start();
    } catch (e) {
      state.ptt.isTransmitting = false;
      elements.btnPttGiant.classList.remove('transmitting');
      elements.pttBtnLabel.textContent = 'HOLD TO TALK';
    }
  }

  function stopPttTransmission() {
    if (!state.ptt.isTransmitting || !state.ptt.recorder) return;

    if ('vibrate' in navigator) navigator.vibrate(25);
    playSound('radio_end');
    state.ptt.isTransmitting = false;
    elements.btnPttGiant.classList.remove('transmitting');
    elements.pttBtnLabel.textContent = 'HOLD TO TALK';

    state.ptt.recorder.onstop = async () => {
      const audioBlob = new Blob(state.ptt.chunks, { type: 'audio/webm' });
      const reader = new FileReader();
      reader.onloadend = () => {
        const audioBase64 = reader.result;
        if (state.ws && state.ws.readyState === WebSocket.OPEN) {
          state.ws.send(JSON.stringify({
            type: 'PTT_AUDIO',
            senderName: state.self.name,
            audioData: audioBase64
          }));
        }

        addPttLogItem(`You transmitted voice blast`, true);
      };
      reader.readAsDataURL(audioBlob);

      if (state.ptt.stream) state.ptt.stream.getTracks().forEach(t => t.stop());
    };

    state.ptt.recorder.stop();
  }

  function toggleMicLock() {
    state.ptt.isLocked = !state.ptt.isLocked;
    elements.btnToggleMicLock.classList.toggle('locked', state.ptt.isLocked);

    if (state.ptt.isLocked) {
      elements.btnToggleMicLock.querySelector('span').textContent = '🔴 Mic Locked (Tap to Stop)';
      startPttTransmission();
    } else {
      elements.btnToggleMicLock.querySelector('span').textContent = '🔒 Tap to Lock Mic';
      stopPttTransmission();
    }
  }

  function handleIncomingPttAudio(data) {
    playSound('radio_start');
    const audio = new Audio(data.audioData);
    audio.play();
    audio.onended = () => playSound('radio_end');

    addPttLogItem(`${data.senderName} broadcasted voice blast`, false);
  }

  function addPttLogItem(text, isSelf) {
    const emptyNotice = elements.pttLogList.querySelector('.empty');
    if (emptyNotice) emptyNotice.remove();

    const item = document.createElement('div');
    item.className = 'ptt-log-item';
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    item.innerHTML = `
      <span style="font-weight: 500; color: ${isSelf ? 'var(--accent-blue)' : 'var(--text-primary)'};">${escapeHtml(text)}</span>
      <span style="font-family: var(--font-mono); font-size: 11px; opacity: 0.6;">${time}</span>
    `;

    elements.pttLogList.prepend(item);
  }

  // --- 18. GPS Map Engine, Breadcrumbs & Geofence Boundary ---
  let mapCanvasCtx = null;

  function initMapEngine() {
    mapCanvasCtx = elements.offlineMapCanvas.getContext('2d');
    startContinuousGpsTracking();
  }

  function startContinuousGpsTracking() {
    if (!navigator.geolocation) return;

    navigator.geolocation.watchPosition(
      (pos) => {
        state.myCoords = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          altitude: pos.coords.altitude || 0,
          heading: pos.coords.heading || 0
        };

        if (pos.coords.altitude) {
          recordElevation(pos.coords.altitude);
        }

        const last = state.myTrail[state.myTrail.length - 1];
        if (!last || Math.abs(last.lat - state.myCoords.latitude) > 0.0001 || Math.abs(last.lon - state.myCoords.longitude) > 0.0001) {
          state.myTrail.push({
            lat: state.myCoords.latitude,
            lon: state.myCoords.longitude,
            time: Date.now()
          });
          if (state.myTrail.length > 500) state.myTrail.shift();
          localStorage.setItem('mesh_my_trail', JSON.stringify(state.myTrail));
        }

        // Check Geofence
        checkGeofenceProximity(state.myCoords.latitude, state.myCoords.longitude);

        // Throttled GPS Broadcast (once per 3.5s)
        const now = Date.now();
        if (!state._lastGpsBroadcast || now - state._lastGpsBroadcast > 3500) {
          state._lastGpsBroadcast = now;
          if (state.ws && state.ws.readyState === WebSocket.OPEN) {
            state.ws.send(JSON.stringify({
              type: 'GPS_BROADCAST',
              senderName: state.self.name,
              coords: state.myCoords
            }));
          }
        }

        updateMapStats();
        updateCompassDisplay();
        if (state.activeView === 'map') drawMap();
      },
      (err) => {
        elements.mapGpsStatus.textContent = 'Searching...';
        elements.mapGpsStatus.classList.remove('active');
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );
  }

  function updateMapStats() {
    elements.mapTrailPoints.textContent = `${state.myTrail.length} pts`;
    if (state.myCoords) {
      elements.mapGpsStatus.textContent = `Fix (${state.myCoords.latitude.toFixed(4)}, ${state.myCoords.longitude.toFixed(4)})`;
      elements.mapGpsStatus.classList.add('active');
    }
  }

  function resizeAndDrawMap() {
    const rect = elements.offlineMapCanvas.parentElement.getBoundingClientRect();
    elements.offlineMapCanvas.width = rect.width;
    elements.offlineMapCanvas.height = rect.height;
    drawMap();
  }

  function drawMap() {
    if (!mapCanvasCtx) return;
    const w = elements.offlineMapCanvas.width;
    const h = elements.offlineMapCanvas.height;

    const isDark = document.body.classList.contains('dark-theme');
    mapCanvasCtx.fillStyle = isDark ? '#0f121a' : '#1b202c';
    mapCanvasCtx.fillRect(0, 0, w, h);

    const centerX = w / 2;
    const centerY = h / 2;

    mapCanvasCtx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    mapCanvasCtx.lineWidth = 1;

    const gridSize = 50;
    for (let x = 0; x < w; x += gridSize) {
      mapCanvasCtx.beginPath();
      mapCanvasCtx.moveTo(x, 0);
      mapCanvasCtx.lineTo(x, h);
      mapCanvasCtx.stroke();
    }
    for (let y = 0; y < h; y += gridSize) {
      mapCanvasCtx.beginPath();
      mapCanvasCtx.moveTo(0, y);
      mapCanvasCtx.lineTo(w, y);
      mapCanvasCtx.stroke();
    }

    [80, 160, 260].forEach((r, idx) => {
      mapCanvasCtx.beginPath();
      mapCanvasCtx.arc(centerX, centerY, r, 0, Math.PI * 2);
      mapCanvasCtx.strokeStyle = 'rgba(0, 122, 255, 0.15)';
      mapCanvasCtx.stroke();

      mapCanvasCtx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      mapCanvasCtx.font = '10px monospace';
      mapCanvasCtx.fillText(`${(idx + 1) * 100}m`, centerX + r - 26, centerY - 4);
    });

    const refLat = state.myCoords ? state.myCoords.latitude : 37.7749;
    const refLon = state.myCoords ? state.myCoords.longitude : -122.4194;
    const scale = 50000;

    const toCanvasX = (lon) => centerX + (lon - refLon) * scale;
    const toCanvasY = (lat) => centerY - (lat - refLat) * scale;

    // Render Geofence Boundary Ring
    if (state.geofence.enabled && state.geofence.originCoords) {
      const gcx = toCanvasX(state.geofence.originCoords.longitude);
      const gcy = toCanvasY(state.geofence.originCoords.latitude);
      const pixelRadius = (state.geofence.radiusMeters / 100) * 80;

      mapCanvasCtx.beginPath();
      mapCanvasCtx.arc(gcx, gcy, pixelRadius, 0, Math.PI * 2);
      mapCanvasCtx.fillStyle = 'rgba(255, 59, 48, 0.08)';
      mapCanvasCtx.fill();
      mapCanvasCtx.strokeStyle = 'rgba(255, 59, 48, 0.6)';
      mapCanvasCtx.lineWidth = 2;
      mapCanvasCtx.setLineDash([6, 6]);
      mapCanvasCtx.stroke();
      mapCanvasCtx.setLineDash([]);

      mapCanvasCtx.font = '10px sans-serif';
      mapCanvasCtx.fillStyle = '#ff3b30';
      mapCanvasCtx.fillText(`Perimeter (${state.geofence.radiusMeters}m)`, gcx - 30, gcy - pixelRadius - 6);
    }

    // Breadcrumbs
    if (state.myTrail.length > 1) {
      mapCanvasCtx.beginPath();
      mapCanvasCtx.strokeStyle = '#34c759';
      mapCanvasCtx.lineWidth = 3;
      mapCanvasCtx.setLineDash([4, 4]);

      state.myTrail.forEach((pt, i) => {
        const cx = toCanvasX(pt.lon);
        const cy = toCanvasY(pt.lat);
        if (i === 0) mapCanvasCtx.moveTo(cx, cy);
        else mapCanvasCtx.lineTo(cx, cy);
      });
      mapCanvasCtx.stroke();
      mapCanvasCtx.setLineDash([]);
    }

    // Waypoints
    state.waypoints.forEach(wp => {
      const cx = toCanvasX(wp.lon);
      const cy = toCanvasY(wp.lat);

      mapCanvasCtx.font = '18px sans-serif';
      mapCanvasCtx.fillText(wp.icon || '📍', cx - 9, cy + 6);

      mapCanvasCtx.font = '11px -apple-system, sans-serif';
      mapCanvasCtx.fillStyle = '#ffffff';
      mapCanvasCtx.fillText(wp.name, cx - 18, cy + 22);
    });

    // Remote Peers
    state.peerLocations.forEach((peer, peerId) => {
      if (peerId === state.self.id || !peer.coords) return;
      const px = toCanvasX(peer.coords.longitude);
      const py = toCanvasY(peer.coords.latitude);

      mapCanvasCtx.beginPath();
      mapCanvasCtx.arc(px, py, 14, 0, Math.PI * 2);
      mapCanvasCtx.fillStyle = 'rgba(255, 149, 0, 0.25)';
      mapCanvasCtx.fill();

      mapCanvasCtx.beginPath();
      mapCanvasCtx.arc(px, py, 6, 0, Math.PI * 2);
      mapCanvasCtx.fillStyle = '#ff9500';
      mapCanvasCtx.fill();
      mapCanvasCtx.strokeStyle = '#ffffff';
      mapCanvasCtx.lineWidth = 2;
      mapCanvasCtx.stroke();

      mapCanvasCtx.font = 'bold 11px -apple-system, sans-serif';
      mapCanvasCtx.fillStyle = '#ff9500';
      mapCanvasCtx.fillText(peer.name || 'Peer', px + 10, py + 4);
    });

    // Self Position with Compass Direction Cone
    mapCanvasCtx.save();
    mapCanvasCtx.translate(centerX, centerY);
    mapCanvasCtx.rotate(state.myHeading * Math.PI / 180);

    mapCanvasCtx.beginPath();
    mapCanvasCtx.moveTo(0, -22);
    mapCanvasCtx.lineTo(14, 10);
    mapCanvasCtx.lineTo(0, 4);
    mapCanvasCtx.lineTo(-14, 10);
    mapCanvasCtx.closePath();
    mapCanvasCtx.fillStyle = 'rgba(0, 122, 255, 0.4)';
    mapCanvasCtx.fill();

    mapCanvasCtx.restore();

    mapCanvasCtx.beginPath();
    mapCanvasCtx.arc(centerX, centerY, 8, 0, Math.PI * 2);
    mapCanvasCtx.fillStyle = '#007aff';
    mapCanvasCtx.fill();
    mapCanvasCtx.strokeStyle = '#ffffff';
    mapCanvasCtx.lineWidth = 2.5;
    mapCanvasCtx.stroke();

    mapCanvasCtx.font = 'bold 12px -apple-system, sans-serif';
    mapCanvasCtx.fillStyle = '#ffffff';
    mapCanvasCtx.fillText(`You (${state.self.name})`, centerX + 12, centerY + 4);
  }

  function openWaypointModal() {
    elements.waypointNameInput.value = '';
    elements.waypointModalOverlay.classList.add('active');
  }

  function closeWaypointModal() {
    elements.waypointModalOverlay.classList.remove('active');
  }

  function saveWaypoint() {
    const name = elements.waypointNameInput.value.trim() || 'Waypoint';
    const lat = state.myCoords ? state.myCoords.latitude : 37.7749;
    const lon = state.myCoords ? state.myCoords.longitude : -122.4194;

    const wp = {
      id: 'wp_' + Date.now(),
      name: name,
      icon: pttSelectedIcon,
      lat: lat,
      lon: lon,
      timestamp: Date.now()
    };

    state.waypoints.push(wp);
    localStorage.setItem('mesh_waypoints', JSON.stringify(state.waypoints));

    if (state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(JSON.stringify({
        type: 'WAYPOINT_ADD',
        waypoint: wp
      }));
    }

    closeWaypointModal();
    if (state.activeView === 'map') drawMap();
  }

  // --- 19. Peer List Rendering & Battery Badges ---
  function getInitials(name) {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  }

  function renderPeerList(peerArray = []) {
    state.peers.clear();
    const activeCount = peerArray.length;
    elements.peerCountBadge.textContent = `${activeCount} Online`;

    const items = elements.peerList.querySelectorAll('.peer-item:not(#peer-target-broadcast)');
    items.forEach(el => el.remove());

    peerArray.forEach((peer) => {
      state.peers.set(peer.id, peer);
      if (peer.id === state.self.id) return;

      const bat = state.peerBatteries.get(peer.id);
      const batHtml = bat ? `<span class="peer-battery-badge ${bat.level <= 20 ? 'low' : ''}">🔋 ${bat.level}%</span>` : '';

      const div = document.createElement('div');
      div.className = `peer-item ${state.activeTargetId === peer.id ? 'active' : ''}`;
      div.dataset.peerId = peer.id;
      div.innerHTML = `
        <div class="peer-avatar user">${getInitials(peer.name)} <span class="peer-dot"></span></div>
        <div class="peer-meta">
          <div class="peer-name-row">
            <span class="peer-name">${escapeHtml(peer.name)}</span>
            ${batHtml}
          </div>
          <div class="peer-sub">Direct Channel</div>
        </div>
      `;

      div.addEventListener('click', () => selectChatTarget(peer.id));
      elements.peerList.appendChild(div);
    });

    updateCompassDisplay();
  }

  function selectChatTarget(targetId) {
    state.activeTargetId = targetId;

    const allItems = elements.peerList.querySelectorAll('.peer-item');
    allItems.forEach((el) => {
      el.classList.toggle('active', el.dataset.peerId === targetId);
    });

    if (targetId === 'broadcast') {
      elements.activeChatTitle.textContent = 'All Group';
      elements.activeChatStatus.textContent = 'Encrypted Local Mesh • No Internet Required';
      elements.activeChatAvatar.className = 'peer-avatar group';
      elements.activeChatAvatar.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      `;
      elements.chatHeaderActions.style.display = 'none';
    } else {
      const peer = state.peers.get(targetId);
      const peerName = peer ? peer.name : 'Direct Peer';
      elements.activeChatTitle.textContent = peerName;
      elements.activeChatStatus.textContent = 'Direct Peer Link • Private';
      elements.activeChatAvatar.className = 'peer-avatar user';
      elements.activeChatAvatar.textContent = getInitials(peerName);
      elements.chatHeaderActions.style.display = 'flex';
    }

    renderMessagesForActiveTarget();
    updateCompassDisplay();
    closeSidebarDrawer();
  }

  // --- 20. Distance & Bearing ---
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3;
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c;
    return d < 1000 ? `${Math.round(d)}m away` : `${(d / 1000).toFixed(2)}km away`;
  }

  function calculateBearing(lat1, lon1, lat2, lon2) {
    const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) -
              Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
    const θ = Math.atan2(y, x);
    const brng = (θ * 180 / Math.PI + 360) % 360;
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const idx = Math.round(brng / 45) % 8;
    return directions[idx];
  }

  // --- 21. Message Rendering & History ---
  function appendMessage(msg, isSelf = false) {
    if (!msg.reactions) msg.reactions = {};
    
    const idx = state.messages.findIndex(m => m.id === msg.id);
    if (idx !== -1) {
      state.messages[idx] = msg;
    } else {
      state.messages.push(msg);
    }

    saveMessageToStorage(msg);

    if (shouldDisplayMessage(msg)) {
      renderSingleMessageBubble(msg, isSelf);
      scrollToBottom();
    }
  }

  function shouldDisplayMessage(msg) {
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      const matchText = msg.text && msg.text.toLowerCase().includes(q);
      const matchSender = msg.senderName && msg.senderName.toLowerCase().includes(q);
      const matchFile = msg.fileName && msg.fileName.toLowerCase().includes(q);
      if (!matchText && !matchSender && !matchFile) return false;
    }

    if (state.activeTargetId === 'broadcast') {
      return !msg.targetId || msg.targetId === 'broadcast';
    } else {
      return (msg.senderId === state.self.id && msg.targetId === state.activeTargetId) ||
             (msg.senderId === state.activeTargetId && msg.targetId === state.self.id);
    }
  }

  function renderMessagesForActiveTarget() {
    elements.messagesContainer.innerHTML = '';
    
    const notice = document.createElement('div');
    notice.className = 'system-notice-card';
    notice.innerHTML = `
      <div class="notice-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      </div>
      <div class="notice-body">
        <strong>${state.activeTargetId === 'broadcast' ? 'Zero-Internet Local Group' : 'Direct Encrypted Link'}</strong>
        <p>Protected with 256-bit AES-GCM on-device encryption. All communication stays 100% on your local Wi-Fi / Hotspot.</p>
      </div>
    `;
    elements.messagesContainer.appendChild(notice);

    state.messages.forEach((msg) => {
      if (shouldDisplayMessage(msg)) {
        renderSingleMessageBubble(msg, msg.senderId === state.self.id);
      }
    });

    scrollToBottom();
  }

  function renderSingleMessageBubble(msg, isSelf) {
    let existingRow = document.getElementById(`msg-row-${msg.id}`);
    if (existingRow) existingRow.remove();

    const row = document.createElement('div');
    row.className = `msg-row ${isSelf ? 'self' : 'peer'}`;
    row.id = `msg-row-${msg.id}`;

    const timeStr = formatTime(msg.timestamp);
    let contentHtml = '';

    if (msg.quotedMsg) {
      contentHtml += `
        <div class="msg-quoted-block">
          <span class="quoted-sender">${escapeHtml(msg.quotedMsg.senderName || 'User')}</span>
          <span>${escapeHtml(msg.quotedMsg.text || 'Attachment/Media')}</span>
        </div>
      `;
    }

    if (msg.text) {
      contentHtml += `<div class="msg-text">${escapeHtml(msg.text)}</div>`;
    }

    if (msg.location) {
      let distStr = '';
      if (state.myCoords) {
        const d = calculateDistance(state.myCoords.latitude, state.myCoords.longitude, msg.location.latitude, msg.location.longitude);
        const b = calculateBearing(state.myCoords.latitude, state.myCoords.longitude, msg.location.latitude, msg.location.longitude);
        distStr = `📍 ${d} (${b})`;
      } else {
        distStr = `📍 Shared GPS Coordinate`;
      }

      contentHtml += `
        <div class="location-card">
          <div class="location-header-row">
            <span class="location-badge">GPS Waypoint</span>
            <span class="location-coords">${msg.location.latitude.toFixed(5)}, ${msg.location.longitude.toFixed(5)}</span>
          </div>
          <div class="location-distance-radar">${distStr}</div>
        </div>
      `;
    }

    if (msg.audioData) {
      contentHtml += `
        <div class="audio-msg-player" data-audio="${msg.audioData}">
          <button class="audio-play-btn" type="button" aria-label="Play Voice Memo">▶</button>
          <div class="audio-track-info">
            <div class="audio-waveform-bar"><div class="audio-progress-fill"></div></div>
            <div class="audio-duration">Voice Memo (${msg.audioDuration || '0:03'})</div>
          </div>
        </div>
      `;
    }

    if (msg.fileData) {
      if (msg.fileType && msg.fileType.startsWith('image/')) {
        contentHtml += `<img src="${msg.fileData}" class="chat-image-preview" alt="Shared media" onclick="window.open('${msg.fileData}')">`;
      } else {
        contentHtml += `
          <div class="file-attachment-card">
            <div class="file-icon-box">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <div class="file-details">
              <div class="file-name">${escapeHtml(msg.fileName || 'Attachment')}</div>
              <div class="file-size">${formatFileSize(msg.fileSize || 0)}</div>
            </div>
            <a href="${msg.fileData}" download="${escapeHtml(msg.fileName || 'file')}" class="file-download-btn">Save</a>
          </div>
        `;
      }
    }

    let reactionsHtml = '';
    if (msg.reactions && Object.keys(msg.reactions).length > 0) {
      reactionsHtml += '<div class="reaction-chips-row">';
      for (const [emoji, users] of Object.entries(msg.reactions)) {
        if (users && users.length > 0) {
          const selfReacted = users.includes(state.self.id);
          reactionsHtml += `
            <div class="reaction-chip ${selfReacted ? 'self-reacted' : ''}" data-msg-id="${msg.id}" data-emoji="${emoji}">
              <span>${emoji}</span> <span>${users.length}</span>
            </div>
          `;
        }
      }
      reactionsHtml += '</div>';
    }

    row.innerHTML = `
      ${!isSelf ? `<div class="msg-sender">${escapeHtml(msg.senderName || 'Peer')}</div>` : ''}
      
      <div class="msg-actions-hover">
        <button class="hover-action-btn" data-action="react" data-msg-id="${msg.id}" data-emoji="👍">👍</button>
        <button class="hover-action-btn" data-action="react" data-msg-id="${msg.id}" data-emoji="❤️">❤️</button>
        <button class="hover-action-btn" data-action="react" data-msg-id="${msg.id}" data-emoji="📍">📍</button>
        <button class="hover-action-btn" data-action="react" data-msg-id="${msg.id}" data-emoji="⚠️">⚠️</button>
        <button class="hover-action-btn" data-action="reply" data-msg-id="${msg.id}">↩</button>
      </div>

      <div class="msg-bubble">
        ${contentHtml}
        ${reactionsHtml}
        <div class="msg-footer">
          <span>${timeStr}</span>
          ${isSelf ? `
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          ` : ''}
        </div>
      </div>
    `;

    const playBtn = row.querySelector('.audio-play-btn');
    if (playBtn) {
      playBtn.addEventListener('click', () => playVoiceNote(row.querySelector('.audio-msg-player'), playBtn));
    }

    row.querySelectorAll('.hover-action-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.dataset.action;
        const msgId = btn.dataset.msgId;
        if (action === 'react') sendReaction(msgId, btn.dataset.emoji);
        else if (action === 'reply') startReply(msg);
      });
    });

    row.querySelectorAll('.reaction-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        sendReaction(chip.dataset.msgId, chip.dataset.emoji);
      });
    });

    elements.messagesContainer.appendChild(row);
  }

  function sendReaction(messageId, emoji) {
    if (state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(JSON.stringify({
        type: 'MESSAGE_REACTION',
        messageId: messageId,
        emoji: emoji,
        senderId: state.self.id
      }));
    } else {
      handleIncomingReaction({
        messageId: messageId,
        emoji: emoji,
        peerId: state.self.id
      });
    }
  }

  function handleIncomingReaction(data) {
    const msg = state.messages.find(m => m.id === data.messageId);
    if (!msg) return;

    if (!msg.reactions) msg.reactions = {};
    if (!msg.reactions[data.emoji]) msg.reactions[data.emoji] = [];

    const userList = msg.reactions[data.emoji];
    const idx = userList.indexOf(data.peerId);
    if (idx > -1) {
      userList.splice(idx, 1);
      if (userList.length === 0) delete msg.reactions[data.emoji];
    } else {
      userList.push(data.peerId);
    }

    saveMessageToStorage(msg);
    if (shouldDisplayMessage(msg)) {
      renderSingleMessageBubble(msg, msg.senderId === state.self.id);
    }
  }

  function startReply(msg) {
    state.replyingTo = {
      id: msg.id,
      senderName: msg.senderName,
      text: msg.text || (msg.location ? '📍 GPS Location' : (msg.audioData ? '🎙️ Voice Memo' : '📎 Attachment'))
    };

    elements.replyAuthor.textContent = `Replying to ${msg.senderName}:`;
    elements.replySnippet.textContent = state.replyingTo.text;
    elements.replyBar.style.display = 'flex';
    elements.chatMessageInput.focus();
  }

  function cancelReply() {
    state.replyingTo = null;
    elements.replyBar.style.display = 'none';
  }

  function shareLocation() {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        state.myCoords = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          altitude: pos.coords.altitude
        };

        const msg = {
          id: 'loc_' + Date.now(),
          senderId: state.self.id,
          senderName: state.self.name,
          targetId: state.activeTargetId,
          location: state.myCoords,
          timestamp: Date.now()
        };

        await dispatchMessage(msg);
      },
      (err) => alert('Could not acquire GPS position.'),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }

  // --- 22. Freeform Sketch Pad ---
  let canvasCtx = null;

  function initSketchCanvas() {
    canvasCtx = elements.sketchCanvas.getContext('2d');
    canvasCtx.lineCap = 'round';
    canvasCtx.lineJoin = 'round';
    clearSketchCanvas();

    const getPos = (e) => {
      const rect = elements.sketchCanvas.getBoundingClientRect();
      const scaleX = elements.sketchCanvas.width / rect.width;
      const scaleY = elements.sketchCanvas.height / rect.height;
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      };
    };

    const startDraw = (e) => {
      state.sketch.isDrawing = true;
      const pos = getPos(e);
      state.sketch.lastX = pos.x;
      state.sketch.lastY = pos.y;
    };

    const draw = (e) => {
      if (!state.sketch.isDrawing) return;
      const pos = getPos(e);
      canvasCtx.beginPath();
      canvasCtx.moveTo(state.sketch.lastX, state.sketch.lastY);
      canvasCtx.lineTo(pos.x, pos.y);
      canvasCtx.strokeStyle = state.sketch.color;
      canvasCtx.lineWidth = state.sketch.size;
      canvasCtx.stroke();
      state.sketch.lastX = pos.x;
      state.sketch.lastY = pos.y;
    };

    const stopDraw = () => {
      state.sketch.isDrawing = false;
    };

    elements.sketchCanvas.addEventListener('pointerdown', startDraw);
    elements.sketchCanvas.addEventListener('pointermove', draw);
    elements.sketchCanvas.addEventListener('pointerup', stopDraw);
    elements.sketchCanvas.addEventListener('pointercancel', stopDraw);

    document.querySelectorAll('.color-dot').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.color-dot').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.sketch.color = btn.dataset.color;
      });
    });

    document.querySelectorAll('.stroke-sizes .stroke-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.stroke-sizes .stroke-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.sketch.size = parseInt(btn.dataset.size, 10);
      });
    });
  }

  function clearSketchCanvas() {
    if (!canvasCtx) return;
    canvasCtx.fillStyle = '#ffffff';
    canvasCtx.fillRect(0, 0, elements.sketchCanvas.width, elements.sketchCanvas.height);
  }

  function openSketchModal() {
    elements.sketchModalOverlay.classList.add('active');
    if (!canvasCtx) initSketchCanvas();
  }

  function closeSketchModal() {
    elements.sketchModalOverlay.classList.remove('active');
  }

  async function sendSketch() {
    const dataUrl = elements.sketchCanvas.toDataURL('image/png');
    closeSketchModal();

    const msg = {
      id: 'sketch_' + Date.now(),
      senderId: state.self.id,
      senderName: state.self.name,
      targetId: state.activeTargetId,
      fileName: 'sketch_map.png',
      fileType: 'image/png',
      fileData: dataUrl,
      timestamp: Date.now()
    };

    await dispatchMessage(msg);
  }

  // --- 23. Export Transcript ---
  async function exportChatTranscript() {
    const allMsgs = await loadStoredMessages();
    if (allMsgs.length === 0) {
      alert('No messages to export.');
      return;
    }

    let transcript = `======================================================\n`;
    transcript += `MESHCHAT OFFLINE TRANSCRIPT EXPORT\n`;
    transcript += `Exported: ${new Date().toLocaleString()}\n`;
    transcript += `Total Messages: ${allMsgs.length}\n`;
    transcript += `======================================================\n\n`;

    allMsgs.forEach(m => {
      const time = new Date(m.timestamp).toLocaleTimeString();
      let content = m.text || '';
      if (m.location) content = `[GPS Location: ${m.location.latitude}, ${m.location.longitude}]`;
      if (m.audioData) content = `[Voice Memo: ${m.audioDuration || 'audio'}]`;
      if (m.fileData) content = `[Attachment: ${m.fileName}]`;
      transcript += `[${time}] ${m.senderName}: ${content}\n`;
    });

    const blob = new Blob([transcript], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meshchat_transcript_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // --- 24. Message Dispatch Helper ---
  async function dispatchMessage(msgObj) {
    if (state.replyingTo) {
      msgObj.quotedMsg = state.replyingTo;
      cancelReply();
    }

    appendMessage(msgObj, true);

    if (state.ws && state.ws.readyState === WebSocket.OPEN) {
      const encryptedMsg = await encryptPayload(msgObj);
      state.ws.send(JSON.stringify({
        type: 'CHAT_MESSAGE',
        message: encryptedMsg
      }));
    }
  }

  // --- 25. Voice Memo Recording ---
  async function toggleVoiceRecording() {
    if (!state.isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        state.audioChunks = [];
        try {
          state.mediaRecorder = new MediaRecorder(stream, { audioBitsPerSecond: 28000 });
        } catch (e) {
          state.mediaRecorder = new MediaRecorder(stream);
        }

        state.mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) state.audioChunks.push(e.data);
        };

        state.mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(state.audioChunks, { type: 'audio/webm' });
          const reader = new FileReader();
          reader.onloadend = async () => {
            const msg = {
              id: 'audio_' + Date.now(),
              senderId: state.self.id,
              senderName: state.self.name,
              targetId: state.activeTargetId,
              audioData: reader.result,
              audioDuration: '0:04',
              timestamp: Date.now()
            };
            await dispatchMessage(msg);
          };
          reader.readAsDataURL(audioBlob);

          stream.getTracks().forEach(track => track.stop());
        };

        state.mediaRecorder.start();
        state.isRecording = true;
        elements.voiceRecordBtn.classList.add('recording');
      } catch (err) {
        alert('Microphone access is required.');
      }
    } else {
      state.mediaRecorder.stop();
      state.isRecording = false;
      elements.voiceRecordBtn.classList.remove('recording');
    }
  }

  function playVoiceNote(playerContainer, button) {
    const dataUrl = playerContainer.dataset.audio;
    if (!dataUrl) return;

    const audio = new Audio(dataUrl);
    const progressFill = playerContainer.querySelector('.audio-progress-fill');
    
    button.textContent = '⏸';
    audio.play();

    audio.ontimeupdate = () => {
      if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = `${percent}%`;
      }
    };

    audio.onended = () => {
      button.textContent = '▶';
      progressFill.style.width = '0%';
    };
  }

  // --- 26. File & Photo Sharing ---
  function handleFileSelect(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 30 * 1024 * 1024) {
      alert('File exceeds 30MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const msg = {
        id: 'file_' + Date.now(),
        senderId: state.self.id,
        senderName: state.self.name,
        targetId: state.activeTargetId,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        fileData: reader.result,
        timestamp: Date.now()
      };

      await dispatchMessage(msg);
    };

    reader.readAsDataURL(file);
    e.target.value = '';
  }

  async function handleSendMessage(e) {
    e.preventDefault();
    const text = elements.chatMessageInput.value.trim();
    if (!text) return;

    const msg = {
      id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      senderId: state.self.id,
      senderName: state.self.name,
      targetId: state.activeTargetId,
      text: text,
      timestamp: Date.now()
    };

    await dispatchMessage(msg);
    elements.chatMessageInput.value = '';
  }

  // --- 27. WebRTC Audio & Video Calling Engine ---
  async function initiateCall(isVideo) {
    if (state.activeTargetId === 'broadcast') {
      alert('Please select a specific peer from the sidebar to start a call.');
      return;
    }

    const targetPeer = state.peers.get(state.activeTargetId);
    if (!targetPeer) {
      alert('Selected peer is not online.');
      return;
    }

    try {
      const constraints = {
        audio: true,
        video: isVideo ? { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' } : false
      };
      
      state.call.localStream = await navigator.mediaDevices.getUserMedia(constraints);
      state.call.isVideo = isVideo;
      state.call.targetPeerId = targetPeer.id;
      state.call.targetPeerName = targetPeer.name;
      state.call.isCaller = true;
      state.call.status = 'calling';

      elements.callActiveName.textContent = targetPeer.name;
      elements.callActiveAvatar.textContent = getInitials(targetPeer.name);
      elements.callStatusLabel.textContent = isVideo ? 'Calling Video on mesh...' : 'Calling Audio on mesh...';
      elements.callTimer.textContent = 'Ringing...';

      if (isVideo) {
        elements.callVideoContainer.classList.add('active');
        elements.localVideo.srcObject = state.call.localStream;
        elements.localVideo.style.display = 'block';
      } else {
        elements.callVideoContainer.classList.remove('active');
        elements.localVideo.style.display = 'none';
      }

      elements.activeCallOverlay.classList.add('active');
      startRingtone();

      state.ws.send(JSON.stringify({
        type: 'CALL_INVITE',
        targetId: targetPeer.id,
        isVideo: isVideo,
        senderName: state.self.name
      }));

    } catch (err) {
      alert('Unable to access camera or microphone.');
    }
  }

  function handleIncomingCallInvite(data) {
    if (state.call.status !== 'idle') {
      state.ws.send(JSON.stringify({
        type: 'CALL_REJECT',
        targetId: data.senderId,
        reason: 'busy'
      }));
      return;
    }

    state.call.status = 'incoming';
    state.call.incomingData = data;
    state.call.targetPeerId = data.senderId;
    state.call.targetPeerName = data.senderName;
    state.call.isVideo = !!data.isVideo;
    state.call.isCaller = false;

    elements.incomingCallerName.textContent = data.senderName || 'Nearby Hiker';
    elements.incomingCallAvatar.textContent = getInitials(data.senderName);
    elements.incomingCallType.textContent = data.isVideo ? 'Incoming Video Call' : 'Incoming Audio Call';
    elements.incomingCallOverlay.classList.add('active');

    startRingtone();
  }

  async function acceptIncomingCall() {
    stopRingtone();
    elements.incomingCallOverlay.classList.remove('active');

    try {
      const constraints = {
        audio: true,
        video: state.call.isVideo ? { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' } : false
      };

      state.call.localStream = await navigator.mediaDevices.getUserMedia(constraints);
      state.call.status = 'connected';

      elements.callActiveName.textContent = state.call.targetPeerName;
      elements.callActiveAvatar.textContent = getInitials(state.call.targetPeerName);
      elements.callStatusLabel.textContent = 'Connecting P2P stream...';

      if (state.call.isVideo) {
        elements.callVideoContainer.classList.add('active');
        elements.localVideo.srcObject = state.call.localStream;
        elements.localVideo.style.display = 'block';
      } else {
        elements.callVideoContainer.classList.remove('active');
        elements.localVideo.style.display = 'none';
      }

      elements.activeCallOverlay.classList.add('active');

      state.ws.send(JSON.stringify({
        type: 'CALL_ACCEPT',
        targetId: state.call.targetPeerId
      }));

    } catch (err) {
      rejectIncomingCall();
    }
  }

  function rejectIncomingCall() {
    stopRingtone();
    elements.incomingCallOverlay.classList.remove('active');

    if (state.call.targetPeerId) {
      state.ws.send(JSON.stringify({
        type: 'CALL_REJECT',
        targetId: state.call.targetPeerId,
        reason: 'declined'
      }));
    }

    resetCallState();
  }

  async function handleCallAccepted(data) {
    stopRingtone();
    state.call.status = 'connected';
    elements.callStatusLabel.textContent = 'P2P Link Established';

    createPeerConnection();

    const offer = await state.call.pc.createOffer();
    await state.call.pc.setLocalDescription(offer);

    state.ws.send(JSON.stringify({
      type: 'CALL_OFFER',
      targetId: state.call.targetPeerId,
      sdp: offer
    }));

    startCallTimer();
  }

  function handleCallRejected(data) {
    stopRingtone();
    playSound('call_end');
    elements.callStatusLabel.textContent = data.reason === 'busy' ? 'User is busy' : 'Call declined';
    setTimeout(() => endCall(false), 1500);
  }

  async function handleCallOffer(data) {
    createPeerConnection();

    await state.call.pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
    const answer = await state.call.pc.createAnswer();
    await state.call.pc.setLocalDescription(answer);

    state.ws.send(JSON.stringify({
      type: 'CALL_ANSWER',
      targetId: data.senderId,
      sdp: answer
    }));

    elements.callStatusLabel.textContent = 'P2P Stream Active';
    startCallTimer();
  }

  async function handleCallAnswer(data) {
    if (state.call.pc) {
      await state.call.pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
      elements.callStatusLabel.textContent = 'P2P Stream Active';
    }
  }

  async function handleCallIce(data) {
    if (state.call.pc && data.candidate) {
      try {
        await state.call.pc.addIceCandidate(new RTCIceCandidate(data.candidate));
      } catch (e) {
        console.warn('[Call] ICE error:', e);
      }
    }
  }

  function handleRemoteCallEnd(data) {
    playSound('call_end');
    elements.callStatusLabel.textContent = 'Call Ended';
    setTimeout(() => endCall(false), 800);
  }

  function createPeerConnection() {
    state.call.pc = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' }
      ]
    });

    if (state.call.localStream) {
      state.call.localStream.getTracks().forEach((track) => {
        state.call.pc.addTrack(track, state.call.localStream);
      });
    }

    state.call.pc.ontrack = (event) => {
      state.call.remoteStream = event.streams[0];
      elements.remoteVideo.srcObject = event.streams[0];
    };

    state.call.pc.onicecandidate = (event) => {
      if (event.candidate) {
        state.ws.send(JSON.stringify({
          type: 'CALL_ICE',
          targetId: state.call.targetPeerId,
          candidate: event.candidate
        }));
      }
    };
  }

  function toggleCallMute() {
    if (state.call.localStream) {
      const audioTrack = state.call.localStream.getAudioTracks()[0];
      if (audioTrack) {
        state.call.isAudioMuted = !state.call.isAudioMuted;
        audioTrack.enabled = !state.call.isAudioMuted;
        elements.btnCallMute.classList.toggle('muted', state.call.isAudioMuted);
      }
    }
  }

  function toggleCallVideo() {
    if (state.call.localStream) {
      const videoTrack = state.call.localStream.getVideoTracks()[0];
      if (videoTrack) {
        state.call.isVideoMuted = !state.call.isVideoMuted;
        videoTrack.enabled = !state.call.isVideoMuted;
        elements.btnCallVideoToggle.classList.toggle('muted', state.call.isVideoMuted);
      }
    }
  }

  function startCallTimer() {
    state.call.startTime = Date.now();
    if (state.call.timerInterval) clearInterval(state.call.timerInterval);

    state.call.timerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - state.call.startTime) / 1000);
      const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
      const secs = String(elapsed % 60).padStart(2, '0');
      elements.callTimer.textContent = `${mins}:${secs}`;
    }, 1000);
  }

  function endCall(notifyPeer = true) {
    stopRingtone();
    if (notifyPeer && state.call.targetPeerId && state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(JSON.stringify({
        type: 'CALL_END',
        targetId: state.call.targetPeerId
      }));
    }

    playSound('call_end');
    resetCallState();
  }

  function resetCallState() {
    stopRingtone();

    if (state.call.timerInterval) {
      clearInterval(state.call.timerInterval);
      state.call.timerInterval = null;
    }

    if (state.call.localStream) {
      state.call.localStream.getTracks().forEach(track => track.stop());
      state.call.localStream = null;
    }

    if (state.call.pc) {
      state.call.pc.close();
      state.call.pc = null;
    }

    elements.remoteVideo.srcObject = null;
    elements.localVideo.srcObject = null;

    elements.incomingCallOverlay.classList.remove('active');
    elements.activeCallOverlay.classList.remove('active');
    elements.callVideoContainer.classList.remove('active');

    state.call.status = 'idle';
    state.call.targetPeerId = null;
    state.call.targetPeerName = null;
    state.call.isAudioMuted = false;
    state.call.isVideoMuted = false;
    elements.btnCallMute.classList.remove('muted');
    elements.btnCallVideoToggle.classList.remove('muted');
  }

  // --- 28. Encryption & QR Modals ---
  function openEncryptionModal() {
    elements.roomPassphraseInput.value = state.passphrase;
    elements.encryptionModalOverlay.classList.add('active');
  }

  function closeEncryptionModal() {
    elements.encryptionModalOverlay.classList.remove('active');
  }

  async function saveEncryptionPassphrase() {
    const pass = elements.roomPassphraseInput.value.trim() || 'mesh-default-key';
    state.passphrase = pass;
    localStorage.setItem('mesh_passphrase', pass);
    await initCryptoKey(pass);
    closeEncryptionModal();
    alert('Encryption passphrase updated.');
  }

  async function openQRModal() {
    elements.qrModalOverlay.classList.add('active');
    elements.qrImageWrapper.innerHTML = '<p class="qr-placeholder-text">Generating QR code...</p>';
    
    try {
      const res = await fetch('/api/info');
      const data = await res.json();

      let ipHtml = '';
      data.ipAddresses.forEach(ip => {
        ipHtml += `
          <div style="margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between; gap: 8px;">
            <span><strong style="color: var(--text-primary); font-weight: 500;">${escapeHtml(ip.interface)}:</strong> <span style="font-family: var(--font-mono); font-size: 12px; color: var(--text-secondary);">${escapeHtml(ip.url)}</span></span>
            <button class="btn btn-secondary" style="padding: 3px 10px; font-size: 11.5px;" onclick="navigator.clipboard.writeText('${escapeHtml(ip.url)}'); this.textContent='Copied!'; setTimeout(()=>this.textContent='Copy', 1500);">Copy</button>
          </div>
        `;
      });
      elements.ipAddressList.innerHTML = ipHtml || '<div>http://localhost:3000</div>';

      const targetUrl = data.primaryUrl || `http://${location.hostname}:${location.port || 3000}`;
      const qrRes = await fetch(`/api/qr?text=${encodeURIComponent(targetUrl)}&format=dataurl`);
      const qrData = await qrRes.json();

      if (qrData && qrData.dataUrl) {
        elements.qrImageWrapper.innerHTML = `<img src="${qrData.dataUrl}" alt="Hotspot Join QR">`;
      } else {
        elements.qrImageWrapper.innerHTML = `<p class="qr-instructions">Open <strong>${escapeHtml(targetUrl)}</strong></p>`;
      }
    } catch (e) {
      elements.qrImageWrapper.innerHTML = `<p class="qr-instructions">Connect to local Wi-Fi and open <strong>http://${location.host}</strong></p>`;
    }
  }

  function closeQRModal() {
    elements.qrModalOverlay.classList.remove('active');
  }

  function scrollToBottom() {
    elements.messagesContainer.scrollTop = elements.messagesContainer.scrollHeight;
  }

  function formatTime(timestamp) {
    const d = new Date(timestamp || Date.now());
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>"']/g, (m) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[m]));
  }

  function handleSearchInput(e) {
    state.searchQuery = e.target.value.trim();
    elements.btnClearSearch.style.display = state.searchQuery ? 'block' : 'none';
    renderMessagesForActiveTarget();
  }

  function clearSearch() {
    elements.searchInput.value = '';
    state.searchQuery = '';
    elements.btnClearSearch.style.display = 'none';
    renderMessagesForActiveTarget();
  }

  // --- 29. Event Listeners Initialization ---
  function initEventListeners() {
    // Desktop View Tabs
    if (elements.tabBtnChat) elements.tabBtnChat.addEventListener('click', () => switchView('chat'));
    if (elements.tabBtnMap) elements.tabBtnMap.addEventListener('click', () => switchView('map'));
    if (elements.tabBtnPtt) elements.tabBtnPtt.addEventListener('click', () => switchView('ptt'));

    // Mobile Bottom Tabs
    if (elements.mobTabChat) elements.mobTabChat.addEventListener('click', () => switchView('chat'));
    if (elements.mobTabMap) elements.mobTabMap.addEventListener('click', () => switchView('map'));
    if (elements.mobTabPtt) elements.mobTabPtt.addEventListener('click', () => switchView('ptt'));
    if (elements.mobTabMenu) elements.mobTabMenu.addEventListener('click', openSidebarDrawer);

    // Sidebar Backdrop & Drawer Controls
    if (elements.sidebarBackdrop) elements.sidebarBackdrop.addEventListener('click', closeSidebarDrawer);
    if (elements.btnCloseSidebar) elements.btnCloseSidebar.addEventListener('click', closeSidebarDrawer);

    // AI Survival Assistant
    elements.btnOpenAi.addEventListener('click', () => {
      elements.aiModalOverlay.classList.add('active');
    });
    elements.aiModalCloseBtn.addEventListener('click', () => {
      elements.aiModalOverlay.classList.remove('active');
    });
    elements.aiInputForm.addEventListener('submit', (e) => {
      e.preventDefault();
      queryOfflineAiAssistant(elements.aiUserQuery.value);
    });
    document.querySelectorAll('.ai-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        queryOfflineAiAssistant(chip.dataset.prompt);
      });
    });

    // Geofence Modal
    elements.btnOpenGeofence.addEventListener('click', () => {
      elements.geofenceSlider.value = state.geofence.radiusMeters;
      elements.geofenceRadiusLabel.textContent = `${state.geofence.radiusMeters} meters`;
      elements.geofenceActiveToggle.checked = state.geofence.enabled;
      elements.geofenceModalOverlay.classList.add('active');
    });
    elements.geofenceModalCloseBtn.addEventListener('click', () => elements.geofenceModalOverlay.classList.remove('active'));
    elements.geofenceSlider.addEventListener('input', (e) => {
      elements.geofenceRadiusLabel.textContent = `${e.target.value} meters`;
    });
    elements.btnSaveGeofence.addEventListener('click', saveGeofenceSettings);

    // Elevation & Weather Panel
    elements.btnToggleElevationPanel.addEventListener('click', () => {
      const isVisible = elements.elevationPanel.style.display === 'block';
      elements.elevationPanel.style.display = isVisible ? 'none' : 'block';
      if (!isVisible) renderElevationProfile();
    });
    elements.btnCloseElev.addEventListener('click', () => {
      elements.elevationPanel.style.display = 'none';
    });

    // Appearance Toggle
    elements.btnToggleTheme.addEventListener('click', toggleAppearance);

    // SOS Beacon
    elements.btnSosBeacon.addEventListener('click', activateSosBeacon);
    elements.btnStopSos.addEventListener('click', deactivateSosBeacon);

    // Survival Guide
    elements.btnOpenGuide.addEventListener('click', () => {
      elements.guideModalOverlay.classList.add('active');
      renderSurvivalGuide();
    });
    elements.guideModalCloseBtn.addEventListener('click', () => {
      elements.guideModalOverlay.classList.remove('active');
    });
    elements.guideSearchInput.addEventListener('input', renderSurvivalGuide);
    document.querySelectorAll('.guide-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.guide-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedGuideCat = btn.dataset.cat;
        renderSurvivalGuide();
      });
    });

    // Roll Call
    elements.btnStartRollcall.addEventListener('click', startRollCall);
    elements.rollcallModalCloseBtn.addEventListener('click', () => elements.rollcallModalOverlay.classList.remove('active'));
    elements.btnRollcallOk.addEventListener('click', () => submitRollCallResponse('ok'));
    elements.btnRollcallHelp.addEventListener('click', () => submitRollCallResponse('help'));

    // Chat Form & Attachments
    elements.chatForm.addEventListener('submit', handleSendMessage);
    elements.voiceRecordBtn.addEventListener('click', toggleVoiceRecording);
    elements.attachFileBtn.addEventListener('click', () => elements.fileInput.click());
    elements.fileInput.addEventListener('change', handleFileSelect);

    // Sketch Canvas
    elements.btnOpenSketch.addEventListener('click', openSketchModal);
    elements.sketchModalCloseBtn.addEventListener('click', closeSketchModal);
    elements.btnClearSketch.addEventListener('click', clearSketchCanvas);
    elements.btnSendSketch.addEventListener('click', sendSketch);

    // Location Sharing
    elements.btnShareLocation.addEventListener('click', shareLocation);

    // Map Controls & Waypoints
    elements.btnDropWaypoint.addEventListener('click', openWaypointModal);
    elements.waypointModalCloseBtn.addEventListener('click', closeWaypointModal);
    elements.btnConfirmWaypoint.addEventListener('click', saveWaypoint);
    elements.btnRecenterMap.addEventListener('click', () => drawMap());

    elements.waypointIconPalette.querySelectorAll('.stroke-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        elements.waypointIconPalette.querySelectorAll('.stroke-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        pttSelectedIcon = btn.dataset.icon;
      });
    });

    // Walkie-Talkie Touch / Mouse Handlers
    const pttBtn = elements.btnPttGiant;
    pttBtn.addEventListener('contextmenu', (e) => e.preventDefault());

    pttBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      if (!state.ptt.isLocked && !state.vox.enabled) startPttTransmission();
    }, { passive: false });

    pttBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      if (!state.ptt.isLocked && !state.vox.enabled) stopPttTransmission();
    }, { passive: false });

    pttBtn.addEventListener('touchcancel', (e) => {
      e.preventDefault();
      if (!state.ptt.isLocked && !state.vox.enabled) stopPttTransmission();
    }, { passive: false });

    pttBtn.addEventListener('mousedown', (e) => {
      e.preventDefault();
      if (!state.ptt.isLocked && !state.vox.enabled) startPttTransmission();
    });

    window.addEventListener('mouseup', () => {
      if (!state.ptt.isLocked && !state.vox.enabled && state.ptt.isTransmitting) stopPttTransmission();
    });

    if (elements.btnToggleMicLock) {
      elements.btnToggleMicLock.addEventListener('click', toggleMicLock);
    }
    if (elements.btnToggleVox) {
      elements.btnToggleVox.addEventListener('click', toggleVoxMode);
    }

    // Encryption Settings
    elements.btnOpenEncryption.addEventListener('click', openEncryptionModal);
    elements.encryptionModalCloseBtn.addEventListener('click', closeEncryptionModal);
    elements.btnSaveEncryption.addEventListener('click', saveEncryptionPassphrase);

    // Search & Export
    elements.searchInput.addEventListener('input', handleSearchInput);
    elements.btnClearSearch.addEventListener('click', clearSearch);
    elements.btnExportChat.addEventListener('click', exportChatTranscript);

    elements.btnCancelReply.addEventListener('click', cancelReply);

    const broadcastBtn = document.getElementById('peer-target-broadcast');
    if (broadcastBtn) {
      broadcastBtn.addEventListener('click', () => selectChatTarget('broadcast'));
    }

    // Call Buttons
    elements.btnAudioCall.addEventListener('click', () => initiateCall(false));
    elements.btnVideoCall.addEventListener('click', () => initiateCall(true));

    elements.btnIncomingAccept.addEventListener('click', acceptIncomingCall);
    elements.btnIncomingDecline.addEventListener('click', rejectIncomingCall);

    elements.btnCallMute.addEventListener('click', toggleCallMute);
    elements.btnCallVideoToggle.addEventListener('click', toggleCallVideo);
    elements.btnCallEnd.addEventListener('click', () => endCall(true));

    elements.profileNameInput.addEventListener('change', (e) => {
      state.self.name = e.target.value.trim() || 'User';
      localStorage.setItem('mesh_peer_name', state.self.name);
      if (state.ws && state.ws.readyState === WebSocket.OPEN) {
        state.ws.send(JSON.stringify({ type: 'JOIN', peer: state.self }));
      }
    });

    elements.qrShareBtn.addEventListener('click', openQRModal);
    elements.qrModalCloseBtn.addEventListener('click', closeQRModal);
    elements.qrModalDoneBtn.addEventListener('click', closeQRModal);
    elements.qrModalOverlay.addEventListener('click', (e) => {
      if (e.target === elements.qrModalOverlay) closeQRModal();
    });

    elements.menuToggleBtn.addEventListener('click', openSidebarDrawer);

    let typingTimeout = null;
    elements.chatMessageInput.addEventListener('input', () => {
      if (!state.ws || state.ws.readyState !== WebSocket.OPEN) return;
      state.ws.send(JSON.stringify({ type: 'TYPING', isTyping: true }));
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => {
        if (state.ws && state.ws.readyState === WebSocket.OPEN) {
          state.ws.send(JSON.stringify({ type: 'TYPING', isTyping: false }));
        }
      }, 1500);
    });

    window.addEventListener('resize', () => {
      if (state.activeView === 'map') resizeAndDrawMap();
    });
  }

  // --- 30. Bootstrap ---
  async function init() {
    elements.profileNameInput.value = state.self.name;
    elements.selfIdTag.textContent = `ID: ${state.self.id}`;

    await initCryptoKey(state.passphrase);
    await initDatabase();

    const stored = await loadStoredMessages();
    if (stored.length > 0) {
      state.messages = stored;
      renderMessagesForActiveTarget();
    }

    initEventListeners();
    initMapEngine();
    initCompassSensor();
    initBatteryMonitor();
    connectWebSocket();

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').catch((err) => {
        console.log('[SW] Registration failed:', err);
      });
    }
  }

  init();
})();
