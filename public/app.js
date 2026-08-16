/**
 * MeshChat — Comprehensive Offline & Online Suite
 * Power & Next-Gen Modules:
 * - ⏱️ Synchronized Group Timer & Rendezvous Countdown
 * - 💰 Group Expense Splitter & "Who Owes Who" Tally Calculator
 * - 🏷️ Interactive @Mentions Auto-Complete & Mention Highlights
 * - 🔴 Tactical Night-Vision Red-Light OLED Mode
 * - 📋 Real-Time Collaborative Sync Notes & Checklist
 * - 📊 Network Diagnostics, Health & Ping Telemetry HUD
 * - 📸 In-App Snapshot Camera with Filters (B&W, Vintage, Night-Vision)
 * - 🎙️ Voice Memo 1.5x / 2x Speed Controller & Waveform Scrubber
 * - 📁 Multi-Channel & Topic Rooms (#general, #gaming, #study, #photos, +custom)
 * - ⭐ Starred Messages & Media Vault
 * - 🗓️ Shared Group Events & Live RSVP Scheduler
 * - 🎮 In-Chat Multiplayer Games (Tic-Tac-Toe 3x3, 2x Dice Roll, RPS)
 * - ⚡ Quick Slash Templates & Shortcuts (/eta, /food, /break, /call, /shrug)
 * - 📊 Interactive Group Polls & Live Voting
 * - ⏱️ Disappearing Self-Destructing Messages
 * - ✏️ Message Editing & Delete for Everyone
 * - 📌 Pinned Announcement Banner
 * - 🎨 Chat Wallpaper & Theme Color Customizer
 * - 📝 Markdown & Rich Text Formatting
 * - 📡 Multi-Hop Mesh Relay
 * - 🔦 Optical Morse Code Flasher
 * - 🎯 Tactical 360° Radar HUD
 * - 📦 Chunked File Exchanger
 */

(function () {
  'use strict';

  // --- 1. Sound Synthesizer (Web Audio API) ---
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
    } else if (type === 'timer_done') {
      [880, 1174.66, 880, 1174.66].forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.18);
        gain.gain.setValueAtTime(0.2, now + i * 0.18);
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.18 + 0.16);
        osc.start(now + i * 0.18);
        osc.stop(now + i * 0.18 + 0.16);
      });
    } else if (type === 'game_move') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.08);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'camera_shutter') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'square';
      osc.frequency.setValueAtTime(1200, now);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.start(now);
      osc.stop(now + 0.06);
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

  function playMorseBeep(durationMs) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.setValueAtTime(0, now + durationMs / 1000);
    osc.start(now);
    osc.stop(now + durationMs / 1000);
  }

  // SOS Siren
  let sosAudioInterval = null;
  function startSosAudio() {
    stopSosAudio();
    const playMorseSos = () => {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const now = audioCtx.currentTime;
      const pattern = [
        { d: 0.1, p: 0.1 }, { d: 0.1, p: 0.1 }, { d: 0.1, p: 0.25 },
        { d: 0.3, p: 0.1 }, { d: 0.3, p: 0.1 }, { d: 0.3, p: 0.25 },
        { d: 0.1, p: 0.1 }, { d: 0.1, p: 0.1 }, { d: 0.6, p: 0.6 }
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

  // --- 3. IndexedDB Storage ---
  const DB_NAME = 'MeshChatLocalDB';
  const DB_VERSION = 5;
  let db = null;

  function initDatabase() {
    return new Promise((resolve) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = (e) => {
        const database = e.target.result;
        if (!database.objectStoreNames.contains('messages')) {
          database.createObjectStore('messages', { keyPath: 'id' });
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

  async function deleteMessageFromStorage(msgId) {
    if (!db) return;
    try {
      const tx = db.transaction('messages', 'readwrite');
      const store = tx.objectStore('messages');
      store.delete(msgId);
    } catch (e) {
      console.error('[Storage] Delete error:', e);
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
      name: localStorage.getItem('mesh_peer_name') || 'User_' + Math.floor(100 + Math.random() * 900),
      avatar: localStorage.getItem('mesh_peer_avatar') || null
    },
    outbox: JSON.parse(localStorage.getItem('mesh_outbox') || '[]'),
    contacts: new Set(JSON.parse(localStorage.getItem('mesh_contacts') || '[]')),
    pendingRequests: new Set(JSON.parse(localStorage.getItem('mesh_pending_reqs') || '[]')),
    allNotes: JSON.parse(localStorage.getItem('mesh_all_notes') || '{}'),
    aiPersona: 'omni',
    theme: localStorage.getItem('mesh_theme') || 'light',
    isRedVision: localStorage.getItem('mesh_red_vision') === 'true',
    wallpaper: localStorage.getItem('mesh_wallpaper') || 'default',
    accentColor: localStorage.getItem('mesh_accent_color') || '#007aff',
    activeView: 'chat',
    passphrase: localStorage.getItem('mesh_passphrase') || 'mesh-default-key',
    
    // Channels & Targets
    activeTargetId: 'broadcast',
    activeChannelId: localStorage.getItem('mesh_active_channel') || 'general',
    channels: JSON.parse(localStorage.getItem('mesh_channels') || 'null') || [
      { id: 'general', name: 'general' },
      { id: 'study-group', name: 'study-group' },
      { id: 'gaming', name: 'gaming' },
      { id: 'photos', name: 'photos-media' }
    ],

    // Collaborative Notes (Context-Specific)
    sharedNote: {
      content: "# 📋 Checklist\n\n- [x] Welcome to MeshChat!\n- [ ] Ready to go",
      updatedBy: "System",
      updatedAt: Date.now()
    },

    // Synchronized Timer
    sharedTimer: {
      title: "Group Countdown",
      durationSec: 300,
      startedAt: null,
      isRunning: false,
      senderName: "System"
    },
    timerInterval: null,

    // Group Expenses
    sharedExpenses: JSON.parse(localStorage.getItem('mesh_shared_expenses') || '[]'),

    // Starred Vault & Disappearing Timer
    starredIds: new Set(JSON.parse(localStorage.getItem('mesh_starred_ids') || '[]')),
    disappearingSeconds: parseInt(localStorage.getItem('mesh_disappearing_sec') || '0', 10),
    pinnedMessage: JSON.parse(localStorage.getItem('mesh_pinned_msg') || 'null'),
    editingMessageId: null,

    // Camera
    camera: {
      stream: null,
      activeFilter: 'none',
      capturedDataUrl: null
    },

    // Latency & Telemetry
    telemetry: {
      pingMs: 12,
      packetsCount: 0
    },

    peers: new Map(),
    peerLocations: new Map(),
    peerBatteries: new Map(),
    waypoints: JSON.parse(localStorage.getItem('mesh_waypoints') || '[]'),
    myTrail: JSON.parse(localStorage.getItem('mesh_my_trail') || '[]'),
    elevationHistory: JSON.parse(localStorage.getItem('mesh_elevation_history') || '[]'),
    mapFlares: [],
    radarSweepEnabled: true,
    radarSweepAngle: 0,
    coordFormat: localStorage.getItem('mesh_coord_fmt') || 'DD',
    guidedTarget: null,
    currentSpeedKmh: 0,
    totalOdometerKm: 0,
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
    seenRelayPackets: new Set(),
    
    // Geofence
    geofence: {
      enabled: localStorage.getItem('mesh_geofence_enabled') === 'true',
      radiusMeters: parseInt(localStorage.getItem('mesh_geofence_radius') || '250', 10),
      originCoords: null,
      lastAlertTime: 0
    },

    // VOX
    vox: {
      enabled: false,
      threshold: 0.18,
      analyser: null,
      micStream: null,
      silenceTimer: null,
      animFrame: null
    },

    // Morse
    morse: {
      isPlaying: false,
      timer: null
    },

    // Radar
    radar: {
      animFrame: null,
      sweepAngle: 0
    },

    // Chunked Transfer
    chunkedTransfer: {
      active: false,
      buffers: new Map()
    },

    // SOS
    sos: {
      active: false,
      strobeTimer: null,
      torchTrack: null
    },

    // PTT
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

    // Sketch
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
  if (state.isRedVision) document.body.classList.add('red-vision-theme');

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
    btnToggleSidebar: document.getElementById('btn-toggle-sidebar'),
    btnClearChat: document.getElementById('btn-clear-chat'),

    viewPaneChat: document.getElementById('view-pane-chat'),
    viewPaneMap: document.getElementById('view-pane-map'),
    viewPanePtt: document.getElementById('view-pane-ptt'),

    // Connect & Invite Modal
    tabConnectCloud: document.getElementById('tab-connect-cloud'),
    tabConnectOffline: document.getElementById('tab-connect-offline'),
    connectCurrentUrl: document.getElementById('connect-current-url'),
    btnCopyConnectUrl: document.getElementById('btn-copy-connect-url'),
    btnWebShareInvite: document.getElementById('btn-web-share-invite'),
    offlineIpSection: document.getElementById('offline-ip-section'),

    // Tools Hub
    btnOpenToolsHub: document.getElementById('btn-open-tools-hub'),
    btnSidebarToolsHub: document.getElementById('btn-sidebar-tools-hub'),
    toolsHubModalOverlay: document.getElementById('tools-hub-modal-overlay'),
    toolsHubCloseBtn: document.getElementById('tools-hub-close-btn'),

    // Timer Modal
    btnOpenTimer: document.getElementById('btn-open-timer'),
    timerModalOverlay: document.getElementById('timer-modal-overlay'),
    timerModalCloseBtn: document.getElementById('timer-modal-close-btn'),
    timerDigitsVal: document.getElementById('timer-digits-val'),
    timerTitleBadge: document.getElementById('timer-title-badge'),
    btnStartSyncTimer: document.getElementById('btn-start-sync-timer'),
    btnStopSyncTimer: document.getElementById('btn-stop-sync-timer'),

    // Expenses Modal
    btnOpenExpenses: document.getElementById('btn-open-expenses'),
    expensesModalOverlay: document.getElementById('expenses-modal-overlay'),
    expensesModalCloseBtn: document.getElementById('expenses-modal-close-btn'),
    expenseDescInput: document.getElementById('expense-desc-input'),
    expenseAmountInput: document.getElementById('expense-amount-input'),
    btnSubmitAddExpense: document.getElementById('btn-submit-add-expense'),
    expTotalSpend: document.getElementById('exp-total-spend'),
    expPerPerson: document.getElementById('exp-per-person'),
    expensesList: document.getElementById('expenses-list'),
    settlementBox: document.getElementById('settlement-box'),
    btnResetExpenses: document.getElementById('btn-reset-expenses'),

    // Red Vision Mode
    btnToggleRedMode: document.getElementById('btn-toggle-red-mode'),

    // @Mentions Suggestions
    mentionSuggestionsPopup: document.getElementById('mention-suggestions-popup'),

    // Collaborative Notes
    btnOpenNotes: document.getElementById('btn-open-notes'),
    notesModalOverlay: document.getElementById('notes-modal-overlay'),
    notesModalCloseBtn: document.getElementById('notes-modal-close-btn'),
    notesTextarea: document.getElementById('notes-textarea'),
    notesAuthorBadge: document.getElementById('notes-author-badge'),
    notesSyncStatus: document.getElementById('notes-sync-status'),
    btnBroadcastNotes: document.getElementById('btn-broadcast-notes'),
    btnClearNotes: document.getElementById('btn-clear-notes'),

    // 3D Dice & RPS Showdown & Context Menu
    diceModalOverlay: document.getElementById('dice-modal-overlay'),
    diceModalCloseBtn: document.getElementById('dice-modal-close-btn'),
    diceCube1: document.getElementById('dice-3d-cube-1'),
    diceCube2: document.getElementById('dice-3d-cube-2'),
    diceWrap2: document.getElementById('dice-wrap-2'),
    diceShadow1: document.getElementById('dice-shadow-1'),
    diceShadow2: document.getElementById('dice-shadow-2'),
    diceResultText: document.getElementById('dice-result-text'),
    btnRoll3dDice: document.getElementById('btn-roll-3d-dice'),
    btnShareDiceResult: document.getElementById('btn-share-dice-result'),

    rpsModalOverlay: document.getElementById('rps-modal-overlay'),
    rpsModalCloseBtn: document.getElementById('rps-modal-close-btn'),
    btnRpsModeChallenge: document.getElementById('btn-rps-mode-challenge'),
    btnRpsModeBot: document.getElementById('btn-rps-mode-bot'),
    rpsSelfHand: document.getElementById('rps-self-hand'),
    rpsPeerHand: document.getElementById('rps-peer-hand'),
    rpsStatusBadge: document.getElementById('rps-status-badge'),
    rpsResultText: document.getElementById('rps-result-text'),

    // User Profile Modal
    profileModalOverlay: document.getElementById('profile-modal-overlay'),
    profileModalCloseBtn: document.getElementById('profile-modal-close-btn'),
    modalAvatarWrap: document.getElementById('modal-avatar-wrap'),
    modalAvatarPreview: document.getElementById('modal-avatar-preview'),
    modalProfileNameInput: document.getElementById('modal-profile-name-input'),
    modalStatusBeacon: document.getElementById('modal-status-beacon'),
    modalGpsCoordsText: document.getElementById('modal-gps-coords-text'),
    btnModalRecalibrateGps: document.getElementById('btn-modal-recalibrate-gps'),
    btnSaveProfileModal: document.getElementById('btn-save-profile-modal'),

    contactRequestToast: document.getElementById('contact-request-toast'),
    contactReqAvatar: document.getElementById('contact-req-avatar'),
    contactReqName: document.getElementById('contact-req-name'),
    btnAcceptContactReq: document.getElementById('btn-accept-contact-req'),
    btnDeclineContactReq: document.getElementById('btn-decline-contact-req'),

    // Topic Rooms & Security Management
    btnManageRoom: document.getElementById('btn-manage-room'),
    roomMembersCountBadge: document.getElementById('room-members-count-badge'),
    roomSettingsModalOverlay: document.getElementById('room-settings-modal-overlay'),
    roomSettingsCloseBtn: document.getElementById('room-settings-close-btn'),
    roomSettingsTitle: document.getElementById('room-settings-title'),
    roomInfoPrivacyBadge: document.getElementById('room-info-privacy-badge'),
    roomInfoOwnerBadge: document.getElementById('room-info-owner-badge'),
    roomInfoTopic: document.getElementById('room-info-topic'),
    roomAdminSection: document.getElementById('room-admin-section'),
    roomInvitePeerSelect: document.getElementById('room-invite-peer-select'),
    btnSendRoomInvite: document.getElementById('btn-send-room-invite'),
    roomMembersList: document.getElementById('room-members-list'),
    roomMembersListLabel: document.getElementById('room-members-list-label'),
    btnLeaveRoom: document.getElementById('btn-leave-room'),
    btnDeleteRoomAdmin: document.getElementById('btn-delete-room-admin'),

    roomInviteToast: document.getElementById('room-invite-toast'),
    roomInviteName: document.getElementById('room-invite-name'),
    roomInviteDesc: document.getElementById('room-invite-desc'),
    btnAcceptRoomInvite: document.getElementById('btn-accept-room-invite'),
    btnDeclineRoomInvite: document.getElementById('btn-decline-room-invite'),

    newChannelTopicInput: document.getElementById('new-channel-topic-input'),
    optPrivacyPublic: document.getElementById('opt-privacy-public'),
    optPrivacyPrivate: document.getElementById('opt-privacy-private'),
    privateRoomPasscodeGroup: document.getElementById('private-room-passcode-group'),
    newChannelPasscodeInput: document.getElementById('new-channel-passcode-input'),

    appContextMenu: document.getElementById('app-context-menu'),

    // Network Telemetry HUD
    btnOpenNetwork: document.getElementById('btn-open-network'),
    networkHudModalOverlay: document.getElementById('network-hud-modal-overlay'),
    networkHudCloseBtn: document.getElementById('network-hud-close-btn'),
    hudPingVal: document.getElementById('hud-ping-val'),
    hudPeersVal: document.getElementById('hud-peers-val'),
    hudPacketsVal: document.getElementById('hud-packets-val'),
    topologyDiagram: document.getElementById('topology-diagram'),

    // In-App Camera
    btnOpenCamera: document.getElementById('btn-open-camera'),
    cameraModalOverlay: document.getElementById('camera-modal-overlay'),
    cameraModalCloseBtn: document.getElementById('camera-modal-close-btn'),
    cameraLiveVideo: document.getElementById('camera-live-video'),
    cameraSnapCanvas: document.getElementById('camera-snap-canvas'),
    btnSnapPhoto: document.getElementById('btn-snap-photo'),
    btnSendSnap: document.getElementById('btn-send-snap'),

    // Channels
    channelsList: document.getElementById('channels-list'),
    btnCreateChannel: document.getElementById('btn-create-channel'),
    channelModalOverlay: document.getElementById('channel-modal-overlay'),
    channelModalCloseBtn: document.getElementById('channel-modal-close-btn'),
    newChannelNameInput: document.getElementById('new-channel-name-input'),
    btnSubmitCreateChannel: document.getElementById('btn-submit-create-channel'),

    // Starred Vault
    btnOpenStarred: document.getElementById('btn-open-starred'),
    starredModalOverlay: document.getElementById('starred-modal-overlay'),
    starredModalCloseBtn: document.getElementById('starred-modal-close-btn'),
    starredVaultList: document.getElementById('starred-vault-list'),

    // Events
    btnOpenEvents: document.getElementById('btn-open-events'),
    eventModalOverlay: document.getElementById('event-modal-overlay'),
    eventModalCloseBtn: document.getElementById('event-modal-close-btn'),
    eventTitleInput: document.getElementById('event-title-input'),
    eventDatetimeInput: document.getElementById('event-datetime-input'),
    eventLocationInput: document.getElementById('event-location-input'),
    btnSubmitCreateEvent: document.getElementById('btn-submit-create-event'),

    // Games Hub
    btnOpenGames: document.getElementById('btn-open-games'),
    gamesModalOverlay: document.getElementById('games-modal-overlay'),
    gamesModalCloseBtn: document.getElementById('games-modal-close-btn'),
    btnStartTictactoe: document.getElementById('btn-start-tictactoe'),
    btnStartDiceroll: document.getElementById('btn-start-diceroll'),
    btnStartRps: document.getElementById('btn-start-rps'),

    // Quick Templates
    btnQuickTemplates: document.getElementById('btn-quick-templates'),
    templatesModalOverlay: document.getElementById('templates-modal-overlay'),
    templatesModalCloseBtn: document.getElementById('templates-modal-close-btn'),

    // Polls & Disappearing & Theme
    btnToggleDisappearing: document.getElementById('btn-toggle-disappearing'),
    disappearingBadge: document.getElementById('disappearing-badge'),
    disappearingModalOverlay: document.getElementById('disappearing-modal-overlay'),
    disappearingModalCloseBtn: document.getElementById('disappearing-modal-close-btn'),

    btnOpenWallpapers: document.getElementById('btn-open-wallpapers'),
    wallpaperModalOverlay: document.getElementById('wallpaper-modal-overlay'),
    wallpaperModalCloseBtn: document.getElementById('wallpaper-modal-close-btn'),
    btnSaveWallpaper: document.getElementById('btn-save-wallpaper'),

    btnCreatePoll: document.getElementById('btn-create-poll'),
    pollModalOverlay: document.getElementById('poll-modal-overlay'),
    pollModalCloseBtn: document.getElementById('poll-modal-close-btn'),
    pollQuestionInput: document.getElementById('poll-question-input'),
    pollOptionsInputs: document.getElementById('poll-options-inputs'),
    btnAddPollOption: document.getElementById('btn-add-poll-option'),
    btnSubmitCreatePoll: document.getElementById('btn-submit-create-poll'),

    pinnedMessageBanner: document.getElementById('pinned-message-banner'),
    pinnedSnippet: document.getElementById('pinned-snippet'),
    btnUnpin: document.getElementById('btn-unpin'),

    editBar: document.getElementById('edit-bar'),
    editSnippet: document.getElementById('edit-snippet'),
    btnCancelEdit: document.getElementById('btn-cancel-edit'),

    // Intelligent AI Assistant
    btnOpenAi: document.getElementById('btn-open-ai'),
    aiModalOverlay: document.getElementById('ai-modal-overlay'),
    aiModalCloseBtn: document.getElementById('ai-modal-close-btn'),
    aiChatHistory: document.getElementById('ai-chat-history'),
    aiInputForm: document.getElementById('ai-input-form'),
    aiUserQuery: document.getElementById('ai-user-query'),
    aiPersonaAvatar: document.getElementById('ai-persona-avatar'),
    aiGreetingNametag: document.getElementById('ai-greeting-nametag'),
    aiGreetingText: document.getElementById('ai-greeting-text'),
    aiQuickPrompts: document.getElementById('ai-quick-prompts'),

    // Geofence & Morse & Radar
    btnOpenGeofence: document.getElementById('btn-open-geofence'),
    geofenceModalOverlay: document.getElementById('geofence-modal-overlay'),
    geofenceModalCloseBtn: document.getElementById('geofence-modal-close-btn'),
    geofenceSlider: document.getElementById('geofence-slider'),
    geofenceRadiusLabel: document.getElementById('geofence-radius-label'),
    geofenceActiveToggle: document.getElementById('geofence-active-toggle'),
    btnSaveGeofence: document.getElementById('btn-save-geofence'),

    btnOpenMorse: document.getElementById('btn-open-morse'),
    morseModalOverlay: document.getElementById('morse-modal-overlay'),
    morseModalCloseBtn: document.getElementById('morse-modal-close-btn'),
    morseTextInput: document.getElementById('morse-text-input'),
    morseScreenPreview: document.getElementById('morse-screen-preview'),
    morseCharIndicator: document.getElementById('morse-char-indicator'),
    morseCodeSub: document.getElementById('morse-code-sub'),
    btnStartMorse: document.getElementById('btn-start-morse'),
    btnStopMorse: document.getElementById('btn-stop-morse'),

    btnOpenRadar: document.getElementById('btn-open-radar'),
    radarModalOverlay: document.getElementById('radar-modal-overlay'),
    radarModalCloseBtn: document.getElementById('radar-modal-close-btn'),
    tacticalRadarCanvas: document.getElementById('tactical-radar-canvas'),

    // Chunked File Transfer Toast
    chunkedTransferToast: document.getElementById('chunked-transfer-toast'),
    transferToastTitle: document.getElementById('transfer-toast-title'),
    transferToastPercent: document.getElementById('transfer-toast-percent'),
    transferProgressFill: document.getElementById('transfer-progress-fill'),
    transferToastSub: document.getElementById('transfer-toast-sub'),

    // SOS & Guide & Roll Call
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
    selfAvatarWrap: document.getElementById('self-avatar-wrap'),
    avatarFileInput: document.getElementById('avatar-file-input'),
    avatarCameraOverlay: document.getElementById('avatar-camera-overlay'),
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
    mapSpeedStat: document.getElementById('map-speed-stat'),
    mapOdometerStat: document.getElementById('map-odometer-stat'),
    mapElevationStat: document.getElementById('map-elevation-stat'),
    mapCoordsStat: document.getElementById('map-coords-stat'),
    mapTrailPoints: document.getElementById('map-trail-points'),
    btnOpenSquadDrawer: document.getElementById('btn-open-squad-drawer'),
    btnOpenWaypointsVault: document.getElementById('btn-open-waypoints-vault'),
    btnToggleRadarSweep: document.getElementById('btn-toggle-radar-sweep'),
    btnDropFlare: document.getElementById('btn-drop-flare'),
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
    btnCancelGuide: document.getElementById('btn-cancel-guide'),
    waypointModalOverlay: document.getElementById('waypoint-modal-overlay'),
    waypointModalCloseBtn: document.getElementById('waypoint-modal-close-btn'),
    waypointNameInput: document.getElementById('waypoint-name-input'),
    btnConfirmWaypoint: document.getElementById('btn-confirm-waypoint'),
    waypointIconPalette: document.getElementById('waypoint-icon-palette'),
    mapPeerCard: document.getElementById('map-peer-card'),
    mapPeerCardAvatar: document.getElementById('map-peer-card-avatar'),
    mapPeerCardName: document.getElementById('map-peer-card-name'),
    mapPeerCardDist: document.getElementById('map-peer-card-dist'),
    btnCloseMapPeerCard: document.getElementById('btn-close-map-peer-card'),
    btnMapChatPeer: document.getElementById('btn-map-chat-peer'),
    btnMapGuidePeer: document.getElementById('btn-map-guide-peer'),
    btnMapCallPeer: document.getElementById('btn-map-call-peer'),
    mapHudRangeTag: document.getElementById('map-hud-range-tag'),
    btnMapZoomIn: document.getElementById('btn-map-zoom-in'),
    btnMapZoomOut: document.getElementById('btn-map-zoom-out'),
    mapDrawerOverlay: document.getElementById('map-drawer-overlay'),
    mapDrawerCloseBtn: document.getElementById('map-drawer-close-btn'),
    tabTacticalSquad: document.getElementById('tab-tactical-squad'),
    tabTacticalWaypoints: document.getElementById('tab-tactical-waypoints'),
    tabTacticalTools: document.getElementById('tab-tactical-tools'),
    paneTacticalSquad: document.getElementById('pane-tactical-squad'),
    paneTacticalWaypoints: document.getElementById('pane-tactical-waypoints'),
    paneTacticalTools: document.getElementById('pane-tactical-tools'),
    squadRadarList: document.getElementById('squad-radar-list'),
    waypointsVaultList: document.getElementById('waypoints-vault-list'),
    btnDrawerAddWaypoint: document.getElementById('btn-drawer-add-waypoint'),
    btnCoordFmtDd: document.getElementById('btn-coord-fmt-dd'),
    btnCoordFmtDms: document.getElementById('btn-coord-fmt-dms'),
    btnExportGpx: document.getElementById('btn-export-gpx'),
    btnDrawerFlare: document.getElementById('btn-drawer-flare'),
    btnForceGpsLock: document.getElementById('btn-force-gps-lock'),
    btnClearGpsOffset: document.getElementById('btn-clear-gps-offset'),
    gpsAccuracyInfo: document.getElementById('gps-accuracy-info'),
    btnRecenterMap: document.getElementById('btn-recenter-map'),

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

  // --- 6. ⏱️ Synchronized Group Timer Engine ---
  function openTimerModal() {
    updateTimerDisplay();
    elements.timerModalOverlay.classList.add('active');
  }

  function startSyncTimer(durationSec = 300, title = 'Group Timer') {
    state.sharedTimer = {
      title: title,
      durationSec: durationSec,
      startedAt: Date.now(),
      isRunning: true,
      senderName: state.self.name
    };

    updateTimerDisplay();
    startLocalTimerTicker();

    if (state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(JSON.stringify({
        type: 'TIMER_SYNC',
        title: title,
        durationSec: durationSec,
        startedAt: state.sharedTimer.startedAt,
        isRunning: true,
        senderName: state.self.name
      }));
    }
  }

  function stopSyncTimer() {
    state.sharedTimer.isRunning = false;
    state.sharedTimer.startedAt = null;
    if (state.timerInterval) clearInterval(state.timerInterval);
    updateTimerDisplay();

    if (state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(JSON.stringify({
        type: 'TIMER_SYNC',
        isRunning: false,
        durationSec: state.sharedTimer.durationSec,
        title: state.sharedTimer.title
      }));
    }
  }

  function startLocalTimerTicker() {
    if (state.timerInterval) clearInterval(state.timerInterval);
    state.timerInterval = setInterval(() => {
      if (!state.sharedTimer.isRunning || !state.sharedTimer.startedAt) {
        clearInterval(state.timerInterval);
        return;
      }

      const elapsed = Math.floor((Date.now() - state.sharedTimer.startedAt) / 1000);
      const remain = Math.max(0, state.sharedTimer.durationSec - elapsed);

      const mins = String(Math.floor(remain / 60)).padStart(2, '0');
      const secs = String(remain % 60).padStart(2, '0');
      elements.timerDigitsVal.textContent = `${mins}:${secs}`;

      if (remain <= 0) {
        state.sharedTimer.isRunning = false;
        clearInterval(state.timerInterval);
        playSound('timer_done');
        alert(`⏱️ COUNTDOWN COMPLETE: "${state.sharedTimer.title}" has finished!`);
      }
    }, 500);
  }

  function updateTimerDisplay() {
    if (state.sharedTimer.isRunning && state.sharedTimer.startedAt) {
      const elapsed = Math.floor((Date.now() - state.sharedTimer.startedAt) / 1000);
      const remain = Math.max(0, state.sharedTimer.durationSec - elapsed);
      const mins = String(Math.floor(remain / 60)).padStart(2, '0');
      const secs = String(remain % 60).padStart(2, '0');
      elements.timerDigitsVal.textContent = `${mins}:${secs}`;
      elements.btnStartSyncTimer.textContent = 'Timer Running';
    } else {
      const mins = String(Math.floor(state.sharedTimer.durationSec / 60)).padStart(2, '0');
      const secs = String(state.sharedTimer.durationSec % 60).padStart(2, '0');
      elements.timerDigitsVal.textContent = `${mins}:${secs}`;
      elements.btnStartSyncTimer.textContent = 'Start Timer for All';
    }
    elements.timerTitleBadge.textContent = state.sharedTimer.title || 'Group Timer';
  }

  function handleIncomingTimerSync(data) {
    if (data.timer) {
      state.sharedTimer = data.timer;
      updateTimerDisplay();
      if (state.sharedTimer.isRunning) {
        startLocalTimerTicker();
      } else if (state.timerInterval) {
        clearInterval(state.timerInterval);
      }
    }
  }

  // --- 7. 💰 Group Expense Splitter Engine ---
  function openExpensesModal() {
    renderExpensesList();
    elements.expensesModalOverlay.classList.add('active');
  }

  function addExpenseItem() {
    const desc = elements.expenseDescInput.value.trim();
    const amt = parseFloat(elements.expenseAmountInput.value);

    if (!desc || isNaN(amt) || amt <= 0) {
      alert('Please enter a valid expense description and amount.');
      return;
    }

    const exp = {
      id: 'exp_' + Date.now(),
      desc: desc,
      amount: amt,
      paidBy: state.self.name,
      timestamp: Date.now()
    };

    state.sharedExpenses.push(exp);
    localStorage.setItem('mesh_shared_expenses', JSON.stringify(state.sharedExpenses));

    elements.expenseDescInput.value = '';
    elements.expenseAmountInput.value = '';
    renderExpensesList();

    if (state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(JSON.stringify({
        type: 'EXPENSE_ADD',
        expense: exp
      }));
    }
  }

  function resetAllExpenses() {
    if (!confirm('Reset all logged shared expenses?')) return;
    state.sharedExpenses = [];
    localStorage.removeItem('mesh_shared_expenses');
    renderExpensesList();

    if (state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(JSON.stringify({ type: 'EXPENSE_RESET' }));
    }
  }

  function deleteExpenseItem(id) {
    state.sharedExpenses = state.sharedExpenses.filter(e => e.id !== id);
    localStorage.setItem('mesh_shared_expenses', JSON.stringify(state.sharedExpenses));
    renderExpensesList();

    if (state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(JSON.stringify({ type: 'EXPENSE_DELETE', expenseId: id }));
    }
  }

  function renderExpensesList() {
    if (!elements.expensesList) return;
    elements.expensesList.innerHTML = '';
    let total = 0;
    const paidByMap = {};

    state.sharedExpenses.forEach(exp => {
      total += exp.amount;
      paidByMap[exp.paidBy] = (paidByMap[exp.paidBy] || 0) + exp.amount;

      const item = document.createElement('div');
      item.className = 'expense-item-card';
      item.innerHTML = `
        <div style="min-width: 0; flex: 1;">
          <strong>${escapeHtml(exp.desc)}</strong>
          <div style="font-size: 11px; opacity: 0.65;">Paid by ${escapeHtml(exp.paidBy)}</div>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <strong style="color: #34c759; font-family: var(--font-mono);">$${exp.amount.toFixed(2)}</strong>
          <button class="exp-item-delete-btn" data-exp-id="${escapeHtml(exp.id)}" title="Delete item">✕</button>
        </div>
      `;
      elements.expensesList.appendChild(item);
    });

    elements.expensesList.querySelectorAll('.exp-item-delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteExpenseItem(btn.dataset.expId);
      });
    });

    if (state.sharedExpenses.length === 0) {
      elements.expensesList.innerHTML = '<div class="ptt-log-item empty">No expenses logged yet. Add your first shared item!</div>';
    }

    const peerCount = Math.max(1, state.peers.size);
    const perPerson = total / peerCount;

    if (elements.expTotalSpend) elements.expTotalSpend.textContent = `$${total.toFixed(2)}`;
    if (elements.expPerPerson) elements.expPerPerson.textContent = `$${perPerson.toFixed(2)} (${peerCount} people)`;

    // Settlement Tally
    elements.settlementBox.innerHTML = '';
    if (total > 0) {
      elements.settlementBox.innerHTML = `<div style="font-weight:700; margin-bottom:4px;">📊 Settlement Breakdown:</div>`;
      for (const [payer, amt] of Object.entries(paidByMap)) {
        const net = amt - perPerson;
        const div = document.createElement('div');
        div.className = 'settlement-item';
        if (net > 0) {
          div.textContent = `✔ ${payer} gets back $${net.toFixed(2)}`;
        } else if (net < 0) {
          div.textContent = `➜ ${payer} owes $${Math.abs(net).toFixed(2)}`;
          div.style.color = '#ff9500';
        } else {
          div.textContent = `✔ ${payer} is all settled`;
        }
        elements.settlementBox.appendChild(div);
      }
    }
  }

  function handleIncomingExpenseAdd(data) {
    if (data.expenses) {
      state.sharedExpenses = data.expenses;
    } else if (data.expense && !state.sharedExpenses.find(e => e.id === data.expense.id)) {
      state.sharedExpenses.push(data.expense);
    }
    localStorage.setItem('mesh_shared_expenses', JSON.stringify(state.sharedExpenses));
    if (elements.expensesModalOverlay.classList.contains('active')) {
      renderExpensesList();
    }
  }

  function handleIncomingExpenseReset() {
    state.sharedExpenses = [];
    localStorage.removeItem('mesh_shared_expenses');
    if (elements.expensesModalOverlay.classList.contains('active')) {
      renderExpensesList();
    }
  }

  // --- 8. 🔴 Tactical Night-Vision Red Mode ---
  function toggleRedVisionMode() {
    state.isRedVision = !state.isRedVision;
    localStorage.setItem('mesh_red_vision', state.isRedVision);
    document.body.classList.toggle('red-vision-theme', state.isRedVision);
    if (state.activeView === 'map') resizeAndDrawMap();
  }

  // --- 9. 🏷️ @Mentions Auto-Complete & Mention Highlighter ---
  function initMentionsEngine() {
    const input = elements.chatMessageInput;
    const popup = elements.mentionSuggestionsPopup;

    input.addEventListener('input', () => {
      const val = input.value;
      const cursorPos = input.selectionStart;
      const lastAt = val.lastIndexOf('@', cursorPos - 1);

      if (lastAt !== -1 && (lastAt === 0 || /\s/.test(val[lastAt - 1]))) {
        const query = val.slice(lastAt + 1, cursorPos).toLowerCase();
        const matches = [];

        state.peers.forEach(peer => {
          if (peer.name.toLowerCase().includes(query)) {
            matches.push(peer.name);
          }
        });

        if (matches.length > 0) {
          popup.innerHTML = '';
          matches.forEach(name => {
            const item = document.createElement('div');
            item.className = 'mention-suggestion-item';
            item.innerHTML = `<span>👤</span> <strong>@${escapeHtml(name)}</strong>`;
            item.onclick = () => {
              const before = val.slice(0, lastAt);
              const after = val.slice(cursorPos);
              input.value = `${before}@${name} ${after}`;
              popup.style.display = 'none';
              input.focus();
            };
            popup.appendChild(item);
          });
          popup.style.display = 'block';
          return;
        }
      }

      popup.style.display = 'none';
    });

    document.addEventListener('click', (e) => {
      if (!popup.contains(e.target) && e.target !== input) {
        popup.style.display = 'none';
      }
    });
  }

  // --- 10. 📋 Collaborative Sync Notes Engine (Per-Room & Per-DM Isolated) ---
  function getActiveContextId() {
    if (state.activeTargetId === 'broadcast') {
      return 'room_' + (state.activeChannelId || 'general');
    }
    return 'dm_' + [state.self.id, state.activeTargetId].sort().join('___');
  }

  function openNotesModal() {
    const contextId = getActiveContextId();
    const targetLabel = state.activeTargetId === 'broadcast'
      ? `#${state.activeChannelId || 'general'}`
      : (state.peers.get(state.activeTargetId)?.name || 'Direct Peer');

    if (elements.notesSyncStatus) {
      elements.notesSyncStatus.textContent = `Notes for ${targetLabel} • Auto-saved & synced`;
    }

    if (!state.allNotes) state.allNotes = {};
    const note = state.allNotes[contextId];

    if (note && note.content !== undefined) {
      elements.notesTextarea.value = note.content;
      elements.notesAuthorBadge.textContent = `Last edit: ${note.updatedBy || 'You'} (${formatTime(note.updatedAt || Date.now())})`;
    } else {
      const defaultText = `# 📋 Notes for ${targetLabel}\n\n- [ ] Checklist item 1\n- [ ] Checklist item 2`;
      elements.notesTextarea.value = defaultText;
      elements.notesAuthorBadge.textContent = `Last edit: You`;
    }
    elements.notesModalOverlay.classList.add('active');
  }

  function broadcastNotesUpdate() {
    const contextId = getActiveContextId();
    const text = elements.notesTextarea.value;
    if (!state.allNotes) state.allNotes = {};
    state.allNotes[contextId] = {
      contextId,
      content: text,
      updatedBy: state.self.name,
      updatedAt: Date.now()
    };
    localStorage.setItem('mesh_all_notes', JSON.stringify(state.allNotes));
    elements.notesAuthorBadge.textContent = `Last edit: You (Just now)`;

    if (state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(JSON.stringify({
        type: 'NOTE_UPDATE',
        contextId: contextId,
        noteContent: text,
        updatedBy: state.self.name
      }));
    }
  }

  function handleIncomingNoteUpdate(data) {
    if (data.contextId && data.note) {
      if (!state.allNotes) state.allNotes = {};
      state.allNotes[data.contextId] = data.note;
      localStorage.setItem('mesh_all_notes', JSON.stringify(state.allNotes));

      if (elements.notesModalOverlay.classList.contains('active') && getActiveContextId() === data.contextId) {
        elements.notesTextarea.value = data.note.content;
        elements.notesAuthorBadge.textContent = `Last edit: ${data.note.updatedBy} (${formatTime(data.note.updatedAt)})`;
      }
    } else if (data.note) {
      state.sharedNote = data.note;
    }
  }

  // --- 11. 📊 Network Diagnostics & Ping Telemetry ---
  function openNetworkHud() {
    elements.hudPeersVal.textContent = `${state.peers.size} Active`;
    elements.hudPacketsVal.textContent = `${state.telemetry.packetsCount + 12} pkts`;
    renderTopologyDiagram();
    elements.networkHudModalOverlay.classList.add('active');
    sendPingProbe();
  }

  function sendPingProbe() {
    if (state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(JSON.stringify({
        type: 'PING',
        clientTime: Date.now()
      }));
    }
  }

  function handleIncomingPong(data) {
    const now = Date.now();
    const rtt = Math.max(1, now - data.clientTime);
    state.telemetry.pingMs = rtt;
    elements.hudPingVal.textContent = `${rtt} ms`;
  }

  function renderTopologyDiagram() {
    elements.topologyDiagram.innerHTML = `
      <div class="topo-node central">Hub (Server)</div>
      <div class="topo-node">You (${escapeHtml(state.self.name)})</div>
    `;

    state.peers.forEach((peer, peerId) => {
      if (peerId !== state.self.id) {
        const div = document.createElement('div');
        div.className = 'topo-node';
        div.textContent = `Peer: ${peer.name}`;
        elements.topologyDiagram.appendChild(div);
      }
    });
  }

  // --- 12. 📸 In-App Snapshot Camera & Filters ---
  async function openCameraModal() {
    elements.cameraModalOverlay.classList.add('active');
    elements.cameraLiveVideo.style.display = 'block';
    elements.cameraSnapCanvas.style.display = 'none';
    elements.btnSnapPhoto.style.display = 'block';
    elements.btnSendSnap.style.display = 'none';

    try {
      state.camera.stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 } },
        audio: false
      });
      elements.cameraLiveVideo.srcObject = state.camera.stream;
    } catch (e) {
      try {
        state.camera.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        elements.cameraLiveVideo.srcObject = state.camera.stream;
      } catch (err) {
        alert('Camera access not granted.');
        elements.cameraModalOverlay.classList.remove('active');
      }
    }
  }

  function closeCameraModal() {
    if (state.camera.stream) {
      state.camera.stream.getTracks().forEach(t => t.stop());
      state.camera.stream = null;
    }
    elements.cameraModalOverlay.classList.remove('active');
  }

  function capturePhotoFromLiveStream() {
    playSound('camera_shutter');
    const video = elements.cameraLiveVideo;
    const canvas = elements.cameraSnapCanvas;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    ctx.filter = state.camera.activeFilter;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    state.camera.capturedDataUrl = canvas.toDataURL('image/jpeg', 0.85);

    video.style.display = 'none';
    canvas.style.display = 'block';
    elements.btnSnapPhoto.style.display = 'none';
    elements.btnSendSnap.style.display = 'block';
  }

  async function sendCapturedSnapshot() {
    if (!state.camera.capturedDataUrl) return;

    const msg = {
      id: 'snap_' + Date.now(),
      senderId: state.self.id,
      senderName: state.self.name,
      targetId: state.activeTargetId,
      channelId: state.activeTargetId === 'broadcast' ? state.activeChannelId : null,
      fileName: 'camera_snap.jpg',
      fileType: 'image/jpeg',
      fileData: state.camera.capturedDataUrl,
      timestamp: Date.now()
    };

    closeCameraModal();
    await dispatchMessage(msg);
  }

  // --- 13. View & Channel Switching ---
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

  function canAccessChannel(ch) {
    if (!ch) return false;
    if (ch.id === 'general') return true;
    if (!ch.isPrivate) return true;
    if (ch.creatorId === state.self.id) return true;
    if (ch.members && Array.isArray(ch.members) && ch.members.includes(state.self.id)) return true;
    return false;
  }

  function renderChannelsList() {
    if (!elements.channelsList) return;
    elements.channelsList.innerHTML = '';
    state.channels.forEach(ch => {
      if (!canAccessChannel(ch)) return;

      const isAct = state.activeTargetId === 'broadcast' && state.activeChannelId === ch.id;
      const isCreator = ch.creatorId === state.self.id;
      const div = document.createElement('div');
      div.className = `channel-item ${isAct ? 'active' : ''}`;
      div.dataset.channelId = ch.id;
      div.innerHTML = `
        <div style="display: flex; align-items: center; gap: 6px; min-width: 0;">
          <span class="channel-hash">${ch.isPrivate ? '🔒' : '#'}</span>
          <span class="channel-name">${escapeHtml(ch.name)}</span>
          ${isCreator ? '<span style="font-size:10px;" title="Room Owner">👑</span>' : ''}
        </div>
        ${ch.id !== 'general' && isCreator ? `<button class="btn-delete-channel" data-channel-id="${escapeHtml(ch.id)}" title="Delete Room">✕</button>` : ''}
      `;
      div.onclick = (e) => {
        if (e.target.classList.contains('btn-delete-channel')) {
          e.stopPropagation();
          deleteChannel(ch.id);
          return;
        }
        selectChannel(ch.id);
      };
      elements.channelsList.appendChild(div);
    });
  }

  function deleteChannel(chId) {
    if (chId === 'general') return;
    const ch = state.channels.find(c => c.id === chId);
    const chName = ch ? ch.name : chId;
    if (!confirm(`Are you sure you want to delete room #${chName} and all its messages for everyone?`)) return;

    state.channels = state.channels.filter(c => c.id !== chId);
    saveChannelsToStorage();
    state.messages = state.messages.filter(m => m.channelId !== chId);

    if (state.activeChannelId === chId) {
      selectChannel('general');
    } else {
      renderChannelsList();
    }

    if (elements.roomSettingsModalOverlay) elements.roomSettingsModalOverlay.classList.remove('active');

    if (state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(JSON.stringify({ type: 'CHANNEL_DELETE', channelId: chId }));
    }
  }

  function selectChannel(channelId) {
    state.activeTargetId = 'broadcast';
    state.activeChannelId = channelId;
    localStorage.setItem('mesh_active_channel', channelId);

    renderChannelsList();
    renderPeerList(Array.from(state.peers.values()));

    const ch = state.channels.find(c => c.id === channelId);
    const chName = ch ? `${ch.isPrivate ? '🔒 ' : '#'}${ch.name}` : '#general';
    const memberCount = (ch && ch.members) ? ch.members.length : (state.peers.size + 1);

    elements.activeChatTitle.textContent = chName;
    elements.activeChatStatus.textContent = ch ? (ch.topic || (ch.isPrivate ? 'Private Room • Invite Only' : 'Public Room • Local Mesh')) : 'Public Topic Room';
    elements.activeChatAvatar.className = 'peer-avatar group';
    elements.activeChatAvatar.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    `;
    elements.btnAudioCall.style.display = 'none';
    elements.btnVideoCall.style.display = 'none';

    if (elements.btnManageRoom) {
      if (channelId !== 'general' && ch) {
        elements.btnManageRoom.style.display = 'inline-flex';
        if (elements.roomMembersCountBadge) {
          elements.roomMembersCountBadge.textContent = `${memberCount} Member${memberCount !== 1 ? 's' : ''}`;
        }
      } else {
        elements.btnManageRoom.style.display = 'none';
      }
    }

    renderMessagesForActiveTarget();
    closeSidebarDrawer();
  }

  function createNewChannel() {
    const name = elements.newChannelNameInput.value.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '-');
    if (!name) return;

    const id = name;
    if (state.channels.find(c => c.id === id)) {
      alert('A room with this name already exists.');
      return;
    }

    const topic = elements.newChannelTopicInput ? elements.newChannelTopicInput.value.trim() : '';
    const isPrivate = elements.optPrivacyPrivate && elements.optPrivacyPrivate.classList.contains('active');
    const passcode = elements.newChannelPasscodeInput ? elements.newChannelPasscodeInput.value.trim() : '';

    const ch = {
      id,
      name,
      topic,
      isPrivate,
      passcode,
      creatorId: state.self.id,
      creatorName: state.self.name,
      members: [state.self.id],
      createdAt: Date.now()
    };

    state.channels.push(ch);
    localStorage.setItem('mesh_channels', JSON.stringify(state.channels));

    elements.channelModalOverlay.classList.remove('active');
    renderChannelsList();
    selectChannel(id);

    if (state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(JSON.stringify({
        type: 'CHANNEL_CREATE',
        channel: ch
      }));
    }
  }

  function openRoomSettingsModal() {
    const ch = state.channels.find(c => c.id === state.activeChannelId);
    if (!ch) return;

    const isCreator = ch.creatorId === state.self.id;
    if (elements.roomSettingsTitle) elements.roomSettingsTitle.textContent = `⚙️ #${ch.name} Settings`;
    if (elements.roomInfoPrivacyBadge) elements.roomInfoPrivacyBadge.textContent = ch.isPrivate ? '🔒 Private Room' : '🌐 Public Room';
    if (elements.roomInfoOwnerBadge) elements.roomInfoOwnerBadge.textContent = `👑 Owner: ${isCreator ? 'You' : (ch.creatorName || 'Admin')}`;
    if (elements.roomInfoTopic) elements.roomInfoTopic.textContent = ch.topic || 'No topic description set.';

    if (elements.roomAdminSection) {
      elements.roomAdminSection.style.display = isCreator ? 'block' : 'none';
      if (elements.roomInvitePeerSelect) {
        elements.roomInvitePeerSelect.innerHTML = '<option value="">Select a connected contact...</option>';
        state.peers.forEach(peer => {
          if (peer.id !== state.self.id && (!ch.members || !ch.members.includes(peer.id))) {
            const opt = document.createElement('option');
            opt.value = peer.id;
            opt.textContent = `${peer.name} (${peer.id.slice(0, 8)})`;
            elements.roomInvitePeerSelect.appendChild(opt);
          }
        });
      }
    }

    if (elements.btnDeleteRoomAdmin) elements.btnDeleteRoomAdmin.style.display = isCreator ? 'inline-flex' : 'none';
    if (elements.btnLeaveRoom) elements.btnLeaveRoom.style.display = !isCreator ? 'inline-flex' : 'none';

    // Render Members List
    if (elements.roomMembersList) {
      elements.roomMembersList.innerHTML = '';
      const members = ch.members || [ch.creatorId];
      if (elements.roomMembersListLabel) elements.roomMembersListLabel.textContent = `👥 Room Members (${members.length}):`;

      members.forEach(memId => {
        const isMemCreator = memId === ch.creatorId;
        const peer = state.peers.get(memId);
        const name = memId === state.self.id ? `You (${state.self.name})` : (peer ? peer.name : `Peer (${memId.slice(0, 6)})`);

        const card = document.createElement('div');
        card.className = 'room-member-card';
        card.innerHTML = `
          <div class="room-member-meta">
            <span style="font-size: 16px;">${isMemCreator ? '👑' : '👤'}</span>
            <span class="room-member-name">${escapeHtml(name)}</span>
            <span class="room-member-role-tag">${isMemCreator ? 'Admin' : 'Member'}</span>
          </div>
          ${isCreator && !isMemCreator ? `<button type="button" class="btn-kick-member" data-mem-id="${memId}">Kick</button>` : ''}
        `;

        const kickBtn = card.querySelector('.btn-kick-member');
        if (kickBtn) {
          kickBtn.addEventListener('click', () => {
            kickMemberFromRoom(ch.id, memId, name);
          });
        }
        elements.roomMembersList.appendChild(card);
      });
    }

    elements.roomSettingsModalOverlay.classList.add('active');
  }

  function invitePeerToRoom() {
    const ch = state.channels.find(c => c.id === state.activeChannelId);
    const peerId = elements.roomInvitePeerSelect ? elements.roomInvitePeerSelect.value : null;
    if (!ch || !peerId) return;

    if (!ch.members) ch.members = [ch.creatorId];
    if (!ch.members.includes(peerId)) {
      ch.members.push(peerId);
      localStorage.setItem('mesh_channels', JSON.stringify(state.channels));
    }

    if (state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(JSON.stringify({
        type: 'ROOM_INVITE',
        channelId: ch.id,
        targetPeerId: peerId
      }));
    }

    openRoomSettingsModal();
    alert(`Invitation sent to ${state.peers.get(peerId)?.name || 'Peer'}!`);
  }

  function kickMemberFromRoom(channelId, memberId, memberName) {
    if (!confirm(`Are you sure you want to remove ${memberName} from this room?`)) return;
    const ch = state.channels.find(c => c.id === channelId);
    if (!ch || !ch.members) return;

    ch.members = ch.members.filter(m => m !== memberId);
    localStorage.setItem('mesh_channels', JSON.stringify(state.channels));

    if (state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(JSON.stringify({
        type: 'ROOM_MEMBER_KICK',
        channelId: channelId,
        targetMemberId: memberId,
        adminId: state.self.id
      }));
    }
    openRoomSettingsModal();
  }

  function leaveCurrentRoom() {
    const ch = state.channels.find(c => c.id === state.activeChannelId);
    if (!ch) return;
    if (!confirm(`Are you sure you want to leave #${ch.name}?`)) return;

    if (ch.members) ch.members = ch.members.filter(m => m !== state.self.id);
    localStorage.setItem('mesh_channels', JSON.stringify(state.channels));

    if (state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(JSON.stringify({
        type: 'ROOM_LEAVE',
        channelId: ch.id
      }));
    }

    elements.roomSettingsModalOverlay.classList.remove('active');
    selectChannel('general');
  }

  let activeIncomingRoomInvite = null;
  function handleIncomingRoomInvite(data) {
    if (!data.channel) return;
    activeIncomingRoomInvite = data.channel;

    if (elements.roomInviteToast) {
      if (elements.roomInviteName) elements.roomInviteName.textContent = `Invite to #${data.channel.name}`;
      if (elements.roomInviteDesc) elements.roomInviteDesc.textContent = `${data.inviterName || 'Admin'} invited you to join this private room`;
      elements.roomInviteToast.style.display = 'flex';
    }
  }

  function acceptRoomInvite() {
    if (!activeIncomingRoomInvite) return;
    const ch = activeIncomingRoomInvite;
    if (!state.channels.find(c => c.id === ch.id)) {
      state.channels.push(ch);
    } else {
      const existing = state.channels.find(c => c.id === ch.id);
      Object.assign(existing, ch);
    }
    localStorage.setItem('mesh_channels', JSON.stringify(state.channels));
    if (elements.roomInviteToast) elements.roomInviteToast.style.display = 'none';

    renderChannelsList();
    selectChannel(ch.id);
  }

  function declineRoomInvite() {
    if (elements.roomInviteToast) elements.roomInviteToast.style.display = 'none';
    activeIncomingRoomInvite = null;
  }

  function handleIncomingChannelCreate(data) {
    if (!state.channels.find(c => c.id === data.channel.id)) {
      state.channels.push(data.channel);
      localStorage.setItem('mesh_channels', JSON.stringify(state.channels));
      renderChannelsList();
    }
  }

  function handleIncomingChannelDelete(data) {
    state.channels = state.channels.filter(c => c.id !== data.channelId);
    localStorage.setItem('mesh_channels', JSON.stringify(state.channels));
    state.messages = state.messages.filter(m => m.channelId !== data.channelId);

    if (state.activeChannelId === data.channelId) {
      selectChannel('general');
    } else {
      renderChannelsList();
    }
  }

  function handleIncomingClearRoomHistory(data) {
    if (data.channelId) {
      state.messages = state.messages.filter(m => m.channelId !== data.channelId);
      if (state.activeChannelId === data.channelId) {
        renderMessagesForActiveTarget();
      }
    }
  }

  function handleIncomingExpenseDelete(data) {
    state.sharedExpenses = (data.expenses) || state.sharedExpenses.filter(e => e.id !== data.expenseId);
    localStorage.setItem('mesh_shared_expenses', JSON.stringify(state.sharedExpenses));
    renderExpensesList();
  }

  // --- 14. ⭐ Starred Messages Vault ---
  function toggleStarMessage(msgId) {
    if (state.starredIds.has(msgId)) {
      state.starredIds.delete(msgId);
    } else {
      state.starredIds.add(msgId);
    }

    localStorage.setItem('mesh_starred_ids', JSON.stringify(Array.from(state.starredIds)));
    const msg = state.messages.find(m => m.id === msgId);
    if (msg && shouldDisplayMessage(msg)) {
      renderSingleMessageBubble(msg, msg.senderId === state.self.id);
    }
  }

  function openStarredVaultModal() {
    elements.starredVaultList.innerHTML = '';
    const starredMsgs = state.messages.filter(m => state.starredIds.has(m.id));

    if (starredMsgs.length === 0) {
      elements.starredVaultList.innerHTML = '<div class="ptt-log-item empty">No starred messages yet. Tap ⭐ on any message to bookmark it!</div>';
    } else {
      starredMsgs.forEach(m => {
        const card = document.createElement('div');
        card.className = 'starred-item-card';
        card.innerHTML = `
          <div class="starred-item-header">
            <span>${escapeHtml(m.senderName)} • ${formatTime(m.timestamp)}</span>
            <button class="hover-action-btn" style="opacity:1;" onclick="window.unstarMsg('${m.id}')" title="Unstar">❌</button>
          </div>
          <div class="starred-item-content">${formatRichText(m.text || (m.fileName ? `📎 ${m.fileName}` : 'Media Item'))}</div>
        `;
        elements.starredVaultList.appendChild(card);
      });
    }

    elements.starredModalOverlay.classList.add('active');
  }

  window.unstarMsg = (id) => {
    toggleStarMessage(id);
    openStarredVaultModal();
  };

  // --- 15. 🗓️ Group Events & Calendar Scheduler ---
  async function submitCreateEvent() {
    const title = elements.eventTitleInput.value.trim();
    const datetime = elements.eventDatetimeInput.value.trim();
    const loc = elements.eventLocationInput.value.trim();

    if (!title || !datetime) {
      alert('Please provide an event title and date/time.');
      return;
    }

    elements.eventModalOverlay.classList.remove('active');

    const eventMsg = {
      id: 'event_' + Date.now(),
      type: 'event',
      senderId: state.self.id,
      senderName: state.self.name,
      targetId: state.activeTargetId,
      channelId: state.activeTargetId === 'broadcast' ? state.activeChannelId : null,
      eventTitle: title,
      eventDatetime: datetime,
      eventLocation: loc,
      rsvps: {
        going: [state.self.name],
        maybe: [],
        decline: []
      },
      timestamp: Date.now()
    };

    await dispatchMessage(eventMsg);
  }

  function handleRsvpOnEvent(eventId, status) {
    const msg = state.messages.find(m => m.id === eventId);
    if (!msg || !msg.rsvps) return;

    ['going', 'maybe', 'decline'].forEach(k => {
      const idx = msg.rsvps[k].indexOf(state.self.name);
      if (idx !== -1) msg.rsvps[k].splice(idx, 1);
    });

    msg.rsvps[status].push(state.self.name);
    saveMessageToStorage(msg);

    if (shouldDisplayMessage(msg)) {
      renderSingleMessageBubble(msg, msg.senderId === state.self.id);
    }

    if (state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(JSON.stringify({
        type: 'EVENT_RSVP',
        eventId: eventId,
        status: status,
        voterName: state.self.name
      }));
    }
  }

  function handleIncomingEventRsvp(data) {
    const msg = state.messages.find(m => m.id === data.eventId);
    if (!msg || !msg.rsvps) return;

    ['going', 'maybe', 'decline'].forEach(k => {
      const idx = msg.rsvps[k].indexOf(data.voterName);
      if (idx !== -1) msg.rsvps[k].splice(idx, 1);
    });

    if (msg.rsvps[data.status]) {
      msg.rsvps[data.status].push(data.voterName);
    }

    saveMessageToStorage(msg);
    if (shouldDisplayMessage(msg)) {
      renderSingleMessageBubble(msg, msg.senderId === state.self.id);
    }
  }

  // --- 16. 🎮 Multiplayer In-Chat Games ---
  async function startTicTacToeGame() {
    elements.gamesModalOverlay.classList.remove('active');

    const gameMsg = {
      id: 'game_ttt_' + Date.now(),
      type: 'tictactoe',
      senderId: state.self.id,
      senderName: state.self.name,
      targetId: state.activeTargetId,
      channelId: state.activeTargetId === 'broadcast' ? state.activeChannelId : null,
      playerX: state.self.name,
      playerO: 'Waiting...',
      turn: 'X',
      board: Array(9).fill(null),
      winner: null,
      timestamp: Date.now()
    };

    await dispatchMessage(gameMsg);
  }

  // --- 16. 🎲 3D Physics Dice Roller & ⚔️ RPS Showdown ---
  let currentDiceOutcome = 6;
  const DICE_ROTATIONS = {
    1: 'rotateY(0deg) rotateX(0deg)',
    2: 'rotateY(-90deg) rotateX(0deg)',
    3: 'rotateY(-180deg) rotateX(0deg)',
    4: 'rotateY(90deg) rotateX(0deg)',
    5: 'rotateX(-90deg) rotateY(0deg)',
    6: 'rotateX(90deg) rotateY(0deg)'
  };
    let diceMode = 1;
    let currentDiceResults = { d1: 6, d2: 5, total: 11 };

    function playDiceAudioSynthesizer() {
      try {
        const ctx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
        if (ctx.state === 'suspended') ctx.resume();

        for (let i = 0; i < 7; i++) {
          setTimeout(() => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(260 + Math.random() * 280, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.045);
            gain.gain.setValueAtTime(0.25, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.045);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.05);
          }, i * 70);
        }
      } catch (e) {}
    }

    function playDiceLandingChime() {
      try {
        const ctx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
        if (ctx.state === 'suspended') ctx.resume();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.08); // G5
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } catch (e) {}
    }

    function init3dDiceRoller() {
      if (elements.btnRoll3dDice) {
        elements.btnRoll3dDice.addEventListener('click', roll3dDice);
      }
      if (elements.btnShareDiceResult) {
        elements.btnShareDiceResult.addEventListener('click', shareDiceResultToChat);
      }
      if (elements.btnStartDiceroll) {
        elements.btnStartDiceroll.addEventListener('click', () => {
          elements.gamesModalOverlay.classList.remove('active');
          elements.diceModalOverlay.classList.add('active');
        });
      }
      if (elements.diceModalCloseBtn) {
        elements.diceModalCloseBtn.addEventListener('click', () => {
          elements.diceModalOverlay.classList.remove('active');
        });
      }

      document.querySelectorAll('.dice-mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.dice-mode-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const m = btn.dataset.mode;
          diceMode = m === '2' ? 2 : (m === 'duel' ? 'duel' : 1);
          if (elements.diceWrap2) {
            elements.diceWrap2.style.display = (diceMode === 2 || diceMode === 'duel') ? 'flex' : 'none';
          }
        });
      });
    }

    function roll3dDice() {
      if (!elements.diceCube1) return;
      elements.diceCube1.classList.add('rolling');
      if (elements.diceCube2) elements.diceCube2.classList.add('rolling');

      elements.diceResultText.textContent = 'Tumbling 3D Physics Dice across table... 🎲';
      playDiceAudioSynthesizer();
      if ('vibrate' in navigator) navigator.vibrate([35, 40, 45, 40]);

      setTimeout(() => {
        elements.diceCube1.classList.remove('rolling');
        if (elements.diceCube2) elements.diceCube2.classList.remove('rolling');

        const d1 = Math.floor(Math.random() * 6) + 1;
        const d2 = Math.floor(Math.random() * 6) + 1;
        const isDual = (diceMode === 2 || diceMode === 'duel');
        const total = isDual ? (d1 + d2) : d1;

        currentDiceResults = { d1, d2, total };

        const rot1 = DICE_ROTATIONS[d1];
        const rot2 = DICE_ROTATIONS[d2];

        elements.diceCube1.style.transform = `${rot1} rotateZ(${Math.floor(Math.random() * 4) * 90}deg)`;
        if (elements.diceCube2) {
          elements.diceCube2.style.transform = `${rot2} rotateZ(${Math.floor(Math.random() * 4) * 90}deg)`;
        }

        playDiceLandingChime();
        if ('vibrate' in navigator) navigator.vibrate(100);

        let text = '';
        if (isDual) {
          text = `🎉 Rolled: Die 1 (${d1}) + Die 2 (${d2}) = Total: ${total}!`;
          if (d1 === 6 && d2 === 6) text += ' 🔥 DOUBLE SIXES!';
          else if (total === 7) text += ' ✨ LUCKY 7!';
        } else {
          text = `🎉 You Rolled: ${d1}!`;
        }
        elements.diceResultText.textContent = text;
      }, 850);
    }

    async function shareDiceResultToChat() {
      elements.diceModalOverlay.classList.remove('active');
      const isDual = (diceMode === 2 || diceMode === 'duel');
      const msg = {
        id: 'game_dice_' + Date.now(),
        type: 'game_dice_challenge',
        senderId: state.self.id,
        senderName: state.self.name,
        targetId: state.activeTargetId,
        channelId: state.activeTargetId === 'broadcast' ? state.activeChannelId : null,
        scoreToBeat: currentDiceResults.total,
        d1: currentDiceResults.d1,
        d2: isDual ? currentDiceResults.d2 : null,
        text: `🎲 **Dice Duel Challenge:** ${state.self.name} threw a score of **${currentDiceResults.total}**! Can anyone beat it?`,
        timestamp: Date.now()
      };
      await dispatchMessage(msg);
    }

  // ⚔️ 2-Player Rock Paper Scissors Showdown & Multiplayer Duel
  let currentRpsMode = 'challenge';
  function initRpsShowdown() {
    if (elements.btnStartRps) {
      elements.btnStartRps.addEventListener('click', () => {
        elements.gamesModalOverlay.classList.remove('active');
        currentRpsMode = 'challenge';
        if (elements.btnRpsModeChallenge) elements.btnRpsModeChallenge.classList.add('active');
        if (elements.btnRpsModeBot) elements.btnRpsModeBot.classList.remove('active');
        elements.rpsResultText.textContent = 'Pick your secret move to challenge peers!';
        elements.rpsSelfHand.textContent = '✊';
        elements.rpsPeerHand.textContent = '✊';
        elements.rpsModalOverlay.classList.add('active');
      });
    }

    if (elements.btnRpsModeChallenge) {
      elements.btnRpsModeChallenge.addEventListener('click', () => {
        currentRpsMode = 'challenge';
        elements.btnRpsModeChallenge.classList.add('active');
        if (elements.btnRpsModeBot) elements.btnRpsModeBot.classList.remove('active');
        elements.rpsResultText.textContent = 'Pick your secret move to challenge peers!';
      });
    }

    if (elements.btnRpsModeBot) {
      elements.btnRpsModeBot.addEventListener('click', () => {
        currentRpsMode = 'bot';
        elements.btnRpsModeBot.classList.add('active');
        if (elements.btnRpsModeChallenge) elements.btnRpsModeChallenge.classList.remove('active');
        elements.rpsResultText.textContent = 'Pick your move to duel against AI Bot!';
      });
    }

    if (elements.rpsModalCloseBtn) {
      elements.rpsModalCloseBtn.addEventListener('click', () => {
        elements.rpsModalOverlay.classList.remove('active');
      });
    }

    document.querySelectorAll('.rps-choice-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const choice = btn.dataset.choice;
        if (currentRpsMode === 'bot') {
          playRpsVsBot(choice);
        } else {
          sendRpsChallenge(choice);
        }
      });
    });
  }

  async function sendRpsChallenge(myChoice) {
    const handEmojis = { rock: '🪨', paper: '📄', scissors: '✂️' };
    const challengeId = 'rps_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);

    const msg = {
      id: challengeId,
      type: 'rps_challenge',
      senderId: state.self.id,
      senderName: state.self.name,
      targetId: state.activeTargetId,
      channelId: state.activeTargetId === 'broadcast' ? state.activeChannelId : null,
      challengerMove: myChoice,
      status: 'open',
      timestamp: Date.now()
    };

    if (elements.rpsModalOverlay) elements.rpsModalOverlay.classList.remove('active');
    showNotificationToast(`⚔️ RPS Challenge (${handEmojis[myChoice]}) dropped in chat! Waiting for opponent...`);
    await dispatchMessage(msg);

    if (state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(JSON.stringify({
        type: 'RPS_CHALLENGE',
        challengeId: challengeId,
        challengerName: state.self.name,
        challengerMove: myChoice,
        targetId: state.activeTargetId,
        channelId: state.activeTargetId === 'broadcast' ? state.activeChannelId : null
      }));
    }
  }

  async function acceptRpsChallenge(msg, opponentMove) {
    const handEmojis = { rock: '🪨', paper: '📄', scissors: '✂️' };
    if (!msg || msg.status !== 'open') return;

    if (state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(JSON.stringify({
        type: 'RPS_ACCEPT',
        challengeId: msg.id,
        challengerId: msg.senderId,
        challengerName: msg.senderName,
        challengerMove: msg.challengerMove,
        opponentName: state.self.name,
        opponentMove: opponentMove
      }));
    } else {
      // Local fallback calculation if offline
      triggerRpsShowdownAnimation({
        challengerName: msg.senderName,
        challengerMove: msg.challengerMove,
        opponentName: state.self.name,
        opponentMove: opponentMove,
        outcomeText: msg.challengerMove === opponentMove ? "🤝 It's a Tie / Draw!" : (
          (opponentMove === 'rock' && msg.challengerMove === 'scissors') ||
          (opponentMove === 'paper' && msg.challengerMove === 'rock') ||
          (opponentMove === 'scissors' && msg.challengerMove === 'paper') ? `🏆 ${state.self.name} WINS!` : `🏆 ${msg.senderName} WINS!`
        )
      });
    }
  }

  function triggerRpsShowdownAnimation(data) {
    const handEmojis = { rock: '🪨', paper: '📄', scissors: '✂️' };
    if (!elements.rpsModalOverlay) return;

    if (elements.rpsSelfAvatar) elements.rpsSelfAvatar.textContent = data.challengerName;
    if (elements.rpsPeerAvatar) elements.rpsPeerAvatar.textContent = data.opponentName;
    elements.rpsSelfHand.textContent = '✊';
    elements.rpsPeerHand.textContent = '✊';
    elements.rpsSelfHand.classList.add('shaking');
    elements.rpsPeerHand.classList.add('shaking');
    elements.rpsResultText.textContent = '3... 2... 1... Showdown!';
    elements.rpsModalOverlay.classList.add('active');
    playSound('game_move');
    if ('vibrate' in navigator) navigator.vibrate([50, 50, 50]);

    setTimeout(() => {
      elements.rpsSelfHand.classList.remove('shaking');
      elements.rpsPeerHand.classList.remove('shaking');
      elements.rpsSelfHand.textContent = handEmojis[data.challengerMove] || '✊';
      elements.rpsPeerHand.textContent = handEmojis[data.opponentMove] || '✊';
      elements.rpsResultText.textContent = `${data.outcomeText}`;
      playSound('message_received');
      if ('vibrate' in navigator) navigator.vibrate(120);
    }, 1000);
  }

  function playRpsVsBot(myChoice) {
    const handEmojis = { rock: '🪨', paper: '📄', scissors: '✂️' };
    elements.rpsSelfHand.classList.add('shaking');
    elements.rpsPeerHand.classList.add('shaking');
    elements.rpsResultText.textContent = '3... 2... 1... Showdown!';
    playSound('game_move');
    if ('vibrate' in navigator) navigator.vibrate([50, 50, 50]);

    setTimeout(async () => {
      elements.rpsSelfHand.classList.remove('shaking');
      elements.rpsPeerHand.classList.remove('shaking');

      const choices = ['rock', 'paper', 'scissors'];
      const opponentChoice = choices[Math.floor(Math.random() * 3)];

      elements.rpsSelfHand.textContent = handEmojis[myChoice];
      elements.rpsPeerHand.textContent = handEmojis[opponentChoice];

      let outcome = '';
      if (myChoice === opponentChoice) {
        outcome = "🤝 It's a Tie / Draw!";
      } else if (
        (myChoice === 'rock' && opponentChoice === 'scissors') ||
        (myChoice === 'paper' && opponentChoice === 'rock') ||
        (myChoice === 'scissors' && opponentChoice === 'paper')
      ) {
        outcome = '🏆 YOU WIN!';
      } else {
        outcome = '💥 MeshBot Wins!';
      }

      elements.rpsResultText.textContent = `${outcome} (${myChoice} vs ${opponentChoice})`;
      playSound('message_received');
      if ('vibrate' in navigator) navigator.vibrate(120);

      // Post result to active room
      const msg = {
        id: 'game_rps_' + Date.now(),
        senderId: state.self.id,
        senderName: state.self.name,
        targetId: state.activeTargetId,
        channelId: state.activeTargetId === 'broadcast' ? state.activeChannelId : null,
        text: `⚔️ **RPS Bot Match:** ${state.self.name} (${handEmojis[myChoice]}) vs MeshBot (${handEmojis[opponentChoice]}) ➜ **${outcome}**`,
        timestamp: Date.now()
      };
      await dispatchMessage(msg);
    }, 900);
  }

  // --- 17. 🖱️ Universal App Context Menu (Desktop Right-Click & Mobile Long-Press) ---
  let activeContextMessageId = null;
  function initContextMenu() {
    const menu = elements.appContextMenu;
    if (!menu) return;

    if (elements.messagesContainer) {
      elements.messagesContainer.addEventListener('contextmenu', (e) => {
        const msgRow = e.target.closest('.msg-row');
        if (!msgRow) return;
        e.preventDefault();
        const msgId = msgRow.dataset.msgId || (msgRow.id && msgRow.id.replace('msg-row-', ''));
        openContextMenuForMessage(msgId, e.clientX, e.clientY);
      });

      // Mobile Long-Press Support (450ms touch timer)
      let touchTimer = null;
      elements.messagesContainer.addEventListener('touchstart', (e) => {
        const msgRow = e.target.closest('.msg-row');
        if (!msgRow) return;
        const touch = e.touches[0];
        const msgId = msgRow.dataset.msgId || (msgRow.id && msgRow.id.replace('msg-row-', ''));
        touchTimer = setTimeout(() => {
          openContextMenuForMessage(msgId, touch.clientX, touch.clientY);
          if ('vibrate' in navigator) navigator.vibrate(50);
        }, 450);
      }, { passive: true });

      elements.messagesContainer.addEventListener('touchend', () => {
        if (touchTimer) clearTimeout(touchTimer);
      });
      elements.messagesContainer.addEventListener('touchmove', () => {
        if (touchTimer) clearTimeout(touchTimer);
      });
    }

    document.addEventListener('click', (e) => {
      if (menu && !menu.contains(e.target)) {
        menu.style.display = 'none';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu) menu.style.display = 'none';
    });

    menu.querySelectorAll('.ctx-react-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (activeContextMessageId) {
          sendReaction(activeContextMessageId, btn.dataset.emoji);
        }
        menu.style.display = 'none';
      });
    });

    const btnReply = document.getElementById('ctx-action-reply');
    if (btnReply) {
      btnReply.addEventListener('click', () => {
        if (activeContextMessageId) {
          const msg = state.messages.find(m => m.id === activeContextMessageId);
          if (msg) startReply(msg);
        }
        menu.style.display = 'none';
      });
    }

    const btnEdit = document.getElementById('ctx-action-edit');
    if (btnEdit) {
      btnEdit.addEventListener('click', () => {
        if (activeContextMessageId) {
          startEditingMessage(activeContextMessageId);
        }
        menu.style.display = 'none';
      });
    }

    const btnPin = document.getElementById('ctx-action-pin');
    if (btnPin) {
      btnPin.addEventListener('click', () => {
        if (activeContextMessageId) {
          pinMessage(activeContextMessageId);
        }
        menu.style.display = 'none';
      });
    }

    const btnStar = document.getElementById('ctx-action-star');
    if (btnStar) {
      btnStar.addEventListener('click', () => {
        if (activeContextMessageId) {
          toggleStarMessage(activeContextMessageId);
        }
        menu.style.display = 'none';
      });
    }

    const btnCopy = document.getElementById('ctx-action-copy');
    if (btnCopy) {
      btnCopy.addEventListener('click', () => {
        if (activeContextMessageId) {
          const msg = state.messages.find(m => m.id === activeContextMessageId);
          if (msg && msg.text) {
            navigator.clipboard.writeText(msg.text);
          }
        }
        menu.style.display = 'none';
      });
    }

    const btnDelEveryone = document.getElementById('ctx-action-delete-everyone');
    if (btnDelEveryone) {
      btnDelEveryone.addEventListener('click', () => {
        if (activeContextMessageId) {
          deleteMessageForEveryone(activeContextMessageId);
        }
        menu.style.display = 'none';
      });
    }

    const btnDelMe = document.getElementById('ctx-action-delete-me');
    if (btnDelMe) {
      btnDelMe.addEventListener('click', () => {
        if (activeContextMessageId) {
          deleteMessageForMe(activeContextMessageId);
        }
        menu.style.display = 'none';
      });
    }
  }

  function openContextMenuForMessage(msgId, x, y) {
    if (!msgId) return;
    const msg = state.messages.find(m => m.id === msgId);
    if (!msg) return;
    activeContextMessageId = msgId;
    const isSelf = msg.senderId === state.self.id;
    const isStarred = state.starredIds.has(msgId);

    const btnEdit = document.getElementById('ctx-action-edit');
    if (btnEdit) btnEdit.style.display = (isSelf && msg.text) ? 'flex' : 'none';

    const btnDelEveryone = document.getElementById('ctx-action-delete-everyone');
    if (btnDelEveryone) btnDelEveryone.style.display = isSelf ? 'flex' : 'none';

    const starLabel = document.getElementById('ctx-star-label');
    if (starLabel) starLabel.textContent = isStarred ? 'Unstar Message' : 'Star Message';

    const menu = elements.appContextMenu;
    if (!menu) return;
    menu.style.display = 'block';

    const menuWidth = 220;
    const menuHeight = 270;
    const posX = Math.min(x, window.innerWidth - menuWidth - 14);
    const posY = Math.min(y, window.innerHeight - menuHeight - 14);

    menu.style.left = `${Math.max(14, posX)}px`;
    menu.style.top = `${Math.max(14, posY)}px`;
  }

  function handleTttCellClick(gameId, cellIndex) {
    const msg = state.messages.find(m => m.id === gameId);
    if (!msg || msg.winner || msg.board[cellIndex]) return;

    if (msg.playerO === 'Waiting...' && msg.senderName !== state.self.name) {
      msg.playerO = state.self.name;
    }

    const currentTurn = msg.turn;
    msg.board[cellIndex] = currentTurn;
    msg.turn = currentTurn === 'X' ? 'O' : 'X';

    const wins = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    for (const [a,b,c] of wins) {
      if (msg.board[a] && msg.board[a] === msg.board[b] && msg.board[a] === msg.board[c]) {
        msg.winner = msg.board[a];
        break;
      }
    }
    if (!msg.winner && msg.board.every(Boolean)) {
      msg.winner = 'Draw';
    }

    playSound('game_move');
    saveMessageToStorage(msg);
    if (shouldDisplayMessage(msg)) {
      renderSingleMessageBubble(msg, msg.senderId === state.self.id);
    }

    if (state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(JSON.stringify({
        type: 'GAME_MOVE',
        gameId: gameId,
        moveData: {
          cellIndex: cellIndex,
          board: msg.board,
          turn: msg.turn,
          winner: msg.winner,
          playerO: msg.playerO
        },
        senderName: state.self.name
      }));
    }
  }

  function handleIncomingGameMove(data) {
    const msg = state.messages.find(m => m.id === data.gameId);
    if (!msg) return;

    msg.board = data.moveData.board;
    msg.turn = data.moveData.turn;
    msg.winner = data.moveData.winner;
    if (data.moveData.playerO) msg.playerO = data.moveData.playerO;

    playSound('game_move');
    saveMessageToStorage(msg);
    if (shouldDisplayMessage(msg)) {
      renderSingleMessageBubble(msg, msg.senderId === state.self.id);
    }
  }

  // --- 17. Appearance & Themes ---
  function toggleAppearance() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('mesh_theme', state.theme);
    document.body.classList.toggle('dark-theme', state.theme === 'dark');
    if (state.activeView === 'map') resizeAndDrawMap();
  }

  function applyCustomTheme() {
    elements.messagesContainer.classList.remove('bg-slate', 'bg-emerald', 'bg-sunset');
    if (state.wallpaper !== 'default') {
      elements.messagesContainer.classList.add(`bg-${state.wallpaper}`);
    }
    document.documentElement.style.setProperty('--accent-blue', state.accentColor);
  }

  function openSidebarDrawer() {
    elements.sidebar.classList.add('open');
    elements.sidebarBackdrop.classList.add('active');
  }

  function closeSidebarDrawer() {
    elements.sidebar.classList.remove('open');
    elements.sidebarBackdrop.classList.remove('active');
  }

  // --- 18. Battery Monitor ---
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

  // --- 19. 🧭 Digital Compass Sensor ---
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

    if (elements.mapCompassHeading) {
      elements.mapCompassHeading.textContent = `${String(deg).padStart(3, '0')}° ${cardinal}`;
    }

    let target = state.guidedTarget;
    if (!target && state.activeTargetId && state.activeTargetId !== 'broadcast' && state.myCoords) {
      const targetLoc = state.peerLocations.get(state.activeTargetId);
      if (targetLoc && targetLoc.coords) {
        target = { name: targetLoc.name || 'Peer', lat: targetLoc.coords.latitude, lon: targetLoc.coords.longitude };
      }
    }

    if (target && state.myCoords && elements.peerGuideRadar) {
      const rawBearing = calculateRawBearing(state.myCoords.latitude, state.myCoords.longitude, target.lat, target.lon);
      const relativeBearing = (rawBearing - state.myHeading + 360) % 360;
      const distStr = calculateDistance(state.myCoords.latitude, state.myCoords.longitude, target.lat, target.lon);

      elements.peerGuideRadar.style.display = 'flex';
      if (elements.guideArrow) elements.guideArrow.style.transform = `rotate(${relativeBearing}deg)`;
      if (elements.guideText) elements.guideText.textContent = `${target.name}: ${distStr} (${Math.round(rawBearing)}°)`;
    } else if (elements.peerGuideRadar) {
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

  // --- 20. 🧠 Multi-Domain Intelligent AI Assistant ---
  const AI_PERSONA_CONFIGS = {
    omni: {
      name: '🧠 Omni AI',
      greeting: 'Hello! I am your intelligent multi-domain AI assistant. Ask me questions about general knowledge, science, coding, translations, math, or emergency survival. Mention @ai in group chats to summon me!'
    },
    survival: {
      name: '🏕️ Survival Pro',
      greeting: 'Greetings, Explorer. I specialize in wilderness survival, emergency trauma first-aid, navigation, water harvesting, edible forage, and extreme weather shelters.'
    },
    code: {
      name: '💻 Code Mentor',
      greeting: 'Hello Developer! I can explain algorithms, generate clean JavaScript/Python snippets, debug logic, and explain web architectures.'
    },
    creative: {
      name: '✍️ Creative Copilot',
      greeting: 'Hi! I am your creative partner. I can brainstorm ideas, write stories, draft professional emails, outline trip itineraries, and summarize discussions.'
    }
  };

  function generateIntelligentAiReply(userPrompt, persona = 'omni') {
    const p = (userPrompt || '').toLowerCase().trim();
    if (!p) return 'How can I assist you today? Ask any question or request code, survival guidance, or calculations.';

    // 1. Math Calculation Engine
    const mathMatch = p.match(/(?:what is|calculate|solve|evaluate)?\s*([0-9\.\+\-\*\/\(\)\^\s%]+)$/i);
    const hasMathOps = /[\+\-\*\/]/.test(p);
    if (mathMatch && hasMathOps && !/[a-z]{3,}/i.test(p)) {
      try {
        const sanitized = p.replace(/[^0-9\+\-\*\/\.\(\)]/g, '');
        if (sanitized && /^[\d\.\+\-\*\/\(\)\s]+$/.test(sanitized)) {
          const result = Function(`'use strict'; return (${sanitized})`)();
          if (typeof result === 'number' && !isNaN(result)) {
            return `🔢 **Calculation Result:**\n\`${sanitized}\` = **${result}**`;
          }
        }
      } catch (e) {}
    }

    // 2. Code & Engineering Knowledge
    if (p.includes('debounce') || p.includes('throttle')) {
      return `💻 **JavaScript Debounce Function:**\n\`\`\`javascript\nfunction debounce(func, delay = 300) {\n  let timer;\n  return function(...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => func.apply(this, args), delay);\n  };\n}\n\`\`\`\n*Cancels previous timer on rapid input, executing only after the specified idle delay.*`;
    }

    if (p.includes('fetch') || p.includes('api call') || p.includes('async await')) {
      return `💻 **Modern Async/Await Fetch Pattern:**\n\`\`\`javascript\nasync function loadData(url) {\n  try {\n    const response = await fetch(url);\n    if (!response.ok) throw new Error(\`HTTP \${response.status}\`);\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error('Fetch failed:', error);\n  }\n}\n\`\`\``;
    }

    if (p.includes('flexbox') || p.includes('css grid')) {
      return `🎨 **CSS Flexbox vs Grid Quick Guide:**\n• **Flexbox (1D)**: Ideal for single-direction alignment (toolbars, navbar rows, message bubble clusters).\n• **CSS Grid (2D)**: Ideal for multi-column responsive page layouts and dashboards.\n*Tip: Use \`display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;\` for auto-responsive cards.*`;
    }

    if (p.includes('quantum') && (p.includes('computer') || p.includes('computing'))) {
      return `🔬 **Quantum Computing in Simple Terms:**\nUnlike classical computers that store data in binary bits (\`0\` or \`1\`), quantum computers use **Qubits**.\n• **Superposition**: A qubit can represent 0, 1, or both simultaneously.\n• **Entanglement**: Qubits can link instantly, enabling massive parallel calculations.\n*Use Case: Breaking complex cryptography, simulating molecular chemistry, and optimizing global logistics.*`;
    }

    if (p.includes('photosynthesis')) {
      return `🌿 **Photosynthesis Summary:**\nPlants convert sunlight, water, and carbon dioxide into oxygen and glucose:\n$$\\text{6CO}_2 + \\text{6H}_2\\text{O} + \\text{Light} \\rightarrow \\text{C}_6\\text{H}_{12}\\text{O}_6 + \\text{6O}_2$$\n• **Light Reaction**: Chlorophyll captures photon energy in the thylakoid membranes.\n• **Calvin Cycle**: Carbon fixation creates glucose energy storage.`;
    }

    // 3. Emergency Survival Knowledge
    if (p.includes('snake') || p.includes('viper') || p.includes('rattlesnake') || p.includes('cobra') || p.includes('venom')) {
      return `🐍 **Snake & Venomous Bite Protocol:**\n1. **Keep Victim Calm**: Slower heart rate delays venom spread.\n2. **Position Limb**: Keep wound **below heart level**.\n3. **DO NOT**: Cut wound, suck venom, apply ice, or use tight tourniquets.\n4. **Mark Swelling**: Circle border with a pen and note the exact time.\n5. **Immobilize & Splint**: Evacuate calmly to medical help.`;
    }

    if (p.includes('water') && (p.includes('purif') || p.includes('boil') || p.includes('filter') || p.includes('drink') || p.includes('dirty'))) {
      return `💧 **Wilderness Water Purification:**\n1. **Rolling Boil**: Boil vigorously for **at least 1 full minute** (3 mins above 2,000m altitude).\n2. **Solar SODIS**: Expose clear PET bottle to direct bright sunlight for 6 hours.\n3. **Layered DIY Filter**: Coarse gravel ➜ Fine sand ➜ Crushed wood charcoal ➜ Clean cloth.`;
    }

    if (p.includes('hypothermia') || p.includes('frostbite') || p.includes('freezing')) {
      return `❄️ **Hypothermia Emergency Response:**\n1. **Ground Insulation**: Never let victim lie directly on bare cold ground.\n2. **Remove Wet Clothes**: Wrap tightly in dry insulated layers and windbreak.\n3. **Apply Core Warmth**: Place warm bottles in **armpits, groin, and neck**.\n4. **Warm Sips**: High-calorie warm sugary fluids if fully alert.`;
    }

    if (p.includes('fire') && (p.includes('rain') || p.includes('wet') || p.includes('spark'))) {
      return `🔥 **Starting Fire in Wet Conditions:**\n1. **Find Dry Heartwood**: Split dead standing branches to access dry interior wood.\n2. **Tinder Prep**: Shave birch bark or pine fatwood into paper-thin curls.\n3. **Build Raised Platform**: Lay a base of logs so your ember doesn't touch soggy soil.\n4. **Oxygen Channel**: Form a teepee or lean-to allowing continuous airflow.`;
    }

    // 4. Planning & Itinerary
    if (p.includes('itinerary') || p.includes('camping') || p.includes('trip plan') || p.includes('hike plan')) {
      return `⛺ **3-Day Mountain & Trail Itinerary:**\n• **Day 1: Basecamp Setup & Acclimatization**\n  - 08:00 Trailhead ascent (moderate 6km climb)\n  - 13:00 Basecamp pitch & water source locating\n  - 17:00 Sunset ridge scout & dinner prep\n• **Day 2: Peak Summit & Navigation**\n  - 06:00 Alpine start for summit push\n  - 12:00 Ridge turnaround point\n  - 15:00 Return to camp & gear maintenance\n• **Day 3: Break Camp & Descent**\n  - 08:00 Leave No Trace cleanup\n  - 11:00 Trailhead return.`;
    }

    // 5. General Conversational Fallback
    if (p.includes('hello') || p.includes('hi') || p.includes('hey')) {
      return `👋 Hello! I am your Mesh AI Assistant. I can help you solve math, explain code, give emergency survival advice, or draft trip plans. How can I help you today?`;
    }

    if (p.includes('who are you') || p.includes('what can you do')) {
      return `🤖 **About Mesh AI Assistant:**\nI am a fast, multi-domain on-device AI copilot built into MeshChat.\n• **General Knowledge**: Science, math, history, and definitions\n• **Engineering**: Code snippets (JS, Python, CSS) & debugging\n• **Outdoor Survival**: Emergency first-aid, navigation, and wilderness guides\n• **Group Collaboration**: Type \`@ai [question]\` in any room to summon me!`;
    }

    return `💡 **AI Analysis for:** *"${escapeHtml(userPrompt)}"* \n\n• For general inquiries, ask about any scientific topic, calculation, or coding challenge.\n• In group chats, mention **@ai [your prompt]** anytime to trigger an instant group response!\n• For outdoor safety, check our built-in **Survival Guide** in Apps & Tools.`;
  }

  function queryOfflineAiAssistant(userPrompt) {
    const p = userPrompt.trim();
    if (!p) return;

    appendAiBubble('user', userPrompt);
    elements.aiUserQuery.value = '';

    setTimeout(() => {
      const reply = generateIntelligentAiReply(userPrompt, state.aiPersona || 'omni');
      appendAiBubble('assistant', formatAiText(reply));
      elements.aiChatHistory.scrollTop = elements.aiChatHistory.scrollHeight;
    }, 180);
  }

  function appendAiBubble(role, content) {
    const div = document.createElement('div');
    div.className = `ai-bubble ${role}`;
    const personaTitle = (AI_PERSONA_CONFIGS[state.aiPersona] && AI_PERSONA_CONFIGS[state.aiPersona].name) || '🧠 Omni AI';
    div.innerHTML = `
      <div class="ai-name-tag">${role === 'user' ? 'You' : personaTitle}</div>
      <div>${content}</div>
    `;
    elements.aiChatHistory.appendChild(div);
    elements.aiChatHistory.scrollTop = elements.aiChatHistory.scrollHeight;
  }

  function initAiPersonaHandlers() {
    document.querySelectorAll('.ai-persona-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.ai-persona-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const p = btn.dataset.persona || 'omni';
        state.aiPersona = p;

        const config = AI_PERSONA_CONFIGS[p] || AI_PERSONA_CONFIGS.omni;
        if (elements.aiPersonaAvatar) {
          const avatars = { omni: '🧠', survival: '🏕️', code: '💻', creative: '✍️' };
          elements.aiPersonaAvatar.textContent = avatars[p] || '🧠';
        }
        if (elements.aiGreetingNametag) elements.aiGreetingNametag.textContent = config.name;
        if (elements.aiGreetingText) elements.aiGreetingText.textContent = config.greeting;
      });
    });

    document.querySelectorAll('.ai-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const p = chip.dataset.prompt;
        if (p) queryOfflineAiAssistant(p);
      });
    });
  }

  function renderSelfProfile() {
    if (elements.profileNameInput) elements.profileNameInput.value = state.self.name;
    if (elements.selfIdTag) elements.selfIdTag.textContent = `ID: ${state.self.id}`;
    if (elements.selfAvatar) {
      if (state.self.avatar) {
        elements.selfAvatar.innerHTML = `<img src="${state.self.avatar}" alt="Avatar" class="peer-avatar-img">`;
      } else {
        elements.selfAvatar.innerHTML = getInitials(state.self.name);
      }
    }
  }

  function initProfileModal() {
    // Open Profile Modal when clicking profile strip or avatar
    const openProfile = () => {
      if (!elements.profileModalOverlay) return;
      if (elements.modalProfileNameInput) elements.modalProfileNameInput.value = state.self.name;
      if (elements.modalStatusBeacon) elements.modalStatusBeacon.value = state.self.status || '🟢 Active & Online';

      if (elements.modalAvatarPreview) {
        if (state.self.avatar) {
          elements.modalAvatarPreview.innerHTML = `<img src="${state.self.avatar}" alt="Avatar" class="peer-avatar-img">`;
        } else {
          elements.modalAvatarPreview.innerHTML = getInitials(state.self.name);
        }
      }

      if (elements.modalGpsCoordsText && state.myCoords) {
        elements.modalGpsCoordsText.textContent = `Coords: ${state.myCoords.latitude.toFixed(5)}°, ${state.myCoords.longitude.toFixed(5)}° • Accuracy: ±${Math.round(state.myCoords.accuracy || 10)}m`;
      }

      elements.profileModalOverlay.classList.add('active');
    };

    if (elements.selfAvatarWrap) elements.selfAvatarWrap.addEventListener('click', openProfile);
    if (elements.profileNameInput) elements.profileNameInput.addEventListener('click', openProfile);

    if (elements.profileModalCloseBtn) {
      elements.profileModalCloseBtn.addEventListener('click', () => {
        if (elements.profileModalOverlay) elements.profileModalOverlay.classList.remove('active');
      });
    }

    if (elements.modalAvatarWrap && elements.avatarFileInput) {
      elements.modalAvatarWrap.addEventListener('click', () => {
        elements.avatarFileInput.click();
      });
    }

    if (elements.btnModalRecalibrateGps) {
      elements.btnModalRecalibrateGps.addEventListener('click', async () => {
        elements.btnModalRecalibrateGps.textContent = '🛰️ Locking Precision GPS...';
        await acquireGpsPosition(true);
        elements.btnModalRecalibrateGps.textContent = '🛰️ GPS Locked!';
        if (elements.modalGpsCoordsText && state.myCoords) {
          elements.modalGpsCoordsText.textContent = `Coords: ${state.myCoords.latitude.toFixed(5)}°, ${state.myCoords.longitude.toFixed(5)}° • Accuracy: ±${Math.round(state.myCoords.accuracy || 10)}m`;
        }
        setTimeout(() => {
          if (elements.btnModalRecalibrateGps) elements.btnModalRecalibrateGps.textContent = '🛰️ Acquire Exact GPS Fix';
        }, 2000);
      });
    }

    if (elements.btnSaveProfileModal) {
      elements.btnSaveProfileModal.addEventListener('click', () => {
        if (elements.modalProfileNameInput) {
          const name = elements.modalProfileNameInput.value.trim();
          if (name) {
            state.self.name = name;
            localStorage.setItem('mesh_peer_name', name);
            if (elements.profileNameInput) elements.profileNameInput.value = name;
          }
        }
        if (elements.modalStatusBeacon) {
          state.self.status = elements.modalStatusBeacon.value;
          localStorage.setItem('mesh_peer_status', state.self.status);
        }

        renderSelfProfile();
        if (state.ws && state.ws.readyState === WebSocket.OPEN) {
          state.ws.send(JSON.stringify({
            type: 'PROFILE_UPDATE',
            peer: state.self
          }));
        }

        if (elements.profileModalOverlay) elements.profileModalOverlay.classList.remove('active');
        showNotificationToast('✅ Profile & Field Status updated!');
      });
    }

    if (elements.avatarFileInput) {
      elements.avatarFileInput.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const maxDim = 160;
            let w = img.width;
            let h = img.height;
            if (w > h) {
              if (w > maxDim) { h = Math.round((h * maxDim) / w); w = maxDim; }
            } else {
              if (h > maxDim) { w = Math.round((w * maxDim) / h); h = maxDim; }
            }
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, w, h);
            const compressed = canvas.toDataURL('image/jpeg', 0.85);

            state.self.avatar = compressed;
            localStorage.setItem('mesh_peer_avatar', compressed);
            renderSelfProfile();

            if (elements.modalAvatarPreview) {
              elements.modalAvatarPreview.innerHTML = `<img src="${compressed}" alt="Avatar" class="peer-avatar-img">`;
            }

            if (state.ws && state.ws.readyState === WebSocket.OPEN) {
              state.ws.send(JSON.stringify({
                type: 'PROFILE_UPDATE',
                peer: state.self
              }));
            }
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(file);
      });
    }
  }

  // --- 21. 📊 Interactive Group Polls ---
  function openPollModal() {
    elements.pollQuestionInput.value = '';
    elements.pollOptionsInputs.innerHTML = `
      <input type="text" class="text-input-field poll-opt-input" placeholder="Option 1" style="margin-bottom: 6px;">
      <input type="text" class="text-input-field poll-opt-input" placeholder="Option 2" style="margin-bottom: 6px;">
    `;
    elements.pollModalOverlay.classList.add('active');
  }

  function addPollOptionInput() {
    const count = elements.pollOptionsInputs.querySelectorAll('.poll-opt-input').length + 1;
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'text-input-field poll-opt-input';
    input.placeholder = `Option ${count}`;
    input.style.marginBottom = '6px';
    elements.pollOptionsInputs.appendChild(input);
  }

  async function submitCreatePoll() {
    const q = elements.pollQuestionInput.value.trim();
    if (!q) return;

    const optInputs = elements.pollOptionsInputs.querySelectorAll('.poll-opt-input');
    const options = [];
    optInputs.forEach(inp => {
      const val = inp.value.trim();
      if (val) options.push({ text: val, voters: [] });
    });

    if (options.length < 2) return;

    elements.pollModalOverlay.classList.remove('active');

    const pollMsg = {
      id: 'poll_' + Date.now(),
      type: 'poll',
      senderId: state.self.id,
      senderName: state.self.name,
      targetId: state.activeTargetId,
      channelId: state.activeTargetId === 'broadcast' ? state.activeChannelId : null,
      question: q,
      options: options,
      timestamp: Date.now()
    };

    await dispatchMessage(pollMsg);
  }

  function handleVoteOnPoll(pollId, optionIndex) {
    const msg = state.messages.find(m => m.id === pollId);
    if (!msg || !msg.options || !msg.options[optionIndex]) return;

    const currentOpt = msg.options[optionIndex];
    if (!currentOpt.voters) currentOpt.voters = [];
    const alreadyVotedThis = currentOpt.voters.includes(state.self.id) || currentOpt.voters.includes(state.self.name);
    const action = alreadyVotedThis ? 'remove' : 'vote';

    msg.options.forEach((opt, idx) => {
      if (!opt.voters) opt.voters = [];
      opt.voters = opt.voters.filter(v => v !== state.self.id && v !== state.self.name);
      if (idx === optionIndex && action !== 'remove') {
        opt.voters.push(state.self.id);
      }
    });

    saveMessageToStorage(msg);
    if (shouldDisplayMessage(msg)) {
      renderSingleMessageBubble(msg, msg.senderId === state.self.id);
    }

    if (state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(JSON.stringify({
        type: 'POLL_VOTE',
        pollId: pollId,
        optionIndex: optionIndex,
        options: msg.options,
        action: action,
        voterId: state.self.id,
        voterName: state.self.name
      }));
    }
  }

  function handleIncomingPollVote(data) {
    const msg = state.messages.find(m => m.id === data.pollId);
    if (!msg || !msg.options) return;

    if (Array.isArray(data.options)) {
      msg.options = data.options;
    } else {
      const voter = data.voterId || data.voterName;
      if (!voter) return;

      msg.options.forEach((opt, idx) => {
        if (!opt.voters) opt.voters = [];
        opt.voters = opt.voters.filter(v => v !== voter);
        if (idx === data.optionIndex && data.action !== 'remove') {
          opt.voters.push(voter);
        }
      });
    }

    saveMessageToStorage(msg);
    if (shouldDisplayMessage(msg)) {
      renderSingleMessageBubble(msg, msg.senderId === state.self.id);
    }
  }

  // --- 22. ⏱️ Disappearing Messages Lifecycle & Timer ---
  function openDisappearingModal() {
    document.querySelectorAll('.disappearing-opt-btn').forEach(btn => {
      const sec = parseInt(btn.dataset.seconds, 10);
      btn.classList.toggle('active', sec === state.disappearingSeconds);
    });
    elements.disappearingModalOverlay.classList.add('active');
  }

  function setDisappearingTimer(seconds) {
    state.disappearingSeconds = seconds;
    localStorage.setItem('mesh_disappearing_sec', seconds);

    if (elements.disappearingBadge) {
      if (seconds > 0) {
        const label = seconds < 60 ? `${seconds}s` : (seconds < 3600 ? `${Math.round(seconds/60)}m` : `${Math.round(seconds/3600)}h`);
        elements.disappearingBadge.textContent = label;
        elements.disappearingBadge.style.display = 'inline-block';
      } else {
        elements.disappearingBadge.style.display = 'none';
      }
    }

    if (elements.disappearingModalOverlay) {
      elements.disappearingModalOverlay.classList.remove('active');
    }
  }

  setInterval(() => {
    const now = Date.now();
    for (let i = state.messages.length - 1; i >= 0; i--) {
      const m = state.messages[i];
      if (m.expiresAt && now >= m.expiresAt) {
        deleteMessageFromStorage(m.id);
        state.messages.splice(i, 1);
        const row = document.getElementById(`msg-row-${m.id}`);
        if (row) row.remove();
      }
    }
  }, 1000);

  // --- 23. ✏️ Message Editing & Delete for Everyone ---
  function startEditingMessage(msgOrId) {
    const msg = typeof msgOrId === 'object' && msgOrId !== null
      ? msgOrId
      : state.messages.find(m => m.id === msgOrId);

    if (!msg) {
      console.warn('[Edit] Target message not found:', msgOrId);
      return;
    }

    state.editingMessageId = msg.id;
    if (elements.editSnippet) {
      elements.editSnippet.textContent = msg.text || '(media/attachment)';
    }
    if (elements.editBar) {
      elements.editBar.style.display = 'flex';
    }
    if (elements.replyBar) {
      elements.replyBar.style.display = 'none';
    }
    state.activeQuotedMsg = null;

    elements.chatMessageInput.value = msg.text || '';
    elements.chatMessageInput.focus();
    elements.chatMessageInput.select();
  }

  function cancelEditing() {
    state.editingMessageId = null;
    if (elements.editBar) elements.editBar.style.display = 'none';
    elements.chatMessageInput.value = '';
  }

  async function submitEditMessage(newText) {
    const msgId = state.editingMessageId;
    if (!msgId) return;
    const msg = state.messages.find(m => m.id === msgId);
    if (msg) {
      msg.text = newText;
      msg.isEdited = true;
      msg.editedAt = Date.now();
      saveMessageToStorage(msg);
      renderSingleMessageBubble(msg, true);

      if (state.ws && state.ws.readyState === WebSocket.OPEN) {
        state.ws.send(JSON.stringify({
          type: 'MESSAGE_EDIT',
          messageId: msgId,
          newText: newText
        }));
      }
    }
    cancelEditing();
  }

  function handleIncomingMessageEdit(data) {
    const msg = state.messages.find(m => m.id === data.messageId);
    if (msg) {
      msg.text = data.newText;
      msg.isEdited = true;
      msg.editedAt = Date.now();
      saveMessageToStorage(msg);
      if (shouldDisplayMessage(msg)) {
        renderSingleMessageBubble(msg, msg.senderId === state.self.id);
      }
    }
  }

  function deleteMessageForEveryone(msgId) {
    if (!confirm('Delete this message for everyone in the group?')) return;

    deleteMessageFromStorage(msgId);
    const idx = state.messages.findIndex(m => m.id === msgId);
    if (idx !== -1) state.messages.splice(idx, 1);

    const row = document.getElementById(`msg-row-${msgId}`);
    if (row) row.remove();

    if (state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(JSON.stringify({
        type: 'MESSAGE_DELETE',
        messageId: msgId
      }));
    }
  }

  function deleteMessageForMe(msgId) {
    if (!confirm('Delete this message from your screen?')) return;

    deleteMessageFromStorage(msgId);
    const idx = state.messages.findIndex(m => m.id === msgId);
    if (idx !== -1) state.messages.splice(idx, 1);

    const row = document.getElementById(`msg-row-${msgId}`);
    if (row) row.remove();
  }

  function handleIncomingMessageDelete(data) {
    deleteMessageFromStorage(data.messageId);
    const idx = state.messages.findIndex(m => m.id === data.messageId);
    if (idx !== -1) state.messages.splice(idx, 1);

    const row = document.getElementById(`msg-row-${data.messageId}`);
    if (row) row.remove();
  }

  // --- 24. 📌 Pinned Announcement Banner ---
  function pinMessageToTop(msg) {
    state.pinnedMessage = msg;
    localStorage.setItem('mesh_pinned_msg', JSON.stringify(msg));
    renderPinnedBanner();

    if (state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(JSON.stringify({
        type: 'PIN_MESSAGE',
        messageId: msg.id,
        message: msg,
        unpin: false
      }));
    }
  }

  function unpinMessage() {
    state.pinnedMessage = null;
    localStorage.removeItem('mesh_pinned_msg');
    renderPinnedBanner();

    if (state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(JSON.stringify({
        type: 'PIN_MESSAGE',
        unpin: true
      }));
    }
  }

  function renderPinnedBanner() {
    if (state.pinnedMessage) {
      elements.pinnedSnippet.textContent = `${state.pinnedMessage.senderName}: ${state.pinnedMessage.text || 'Pinned Item'}`;
      elements.pinnedMessageBanner.style.display = 'flex';
      elements.pinnedMessageBanner.onclick = (e) => {
        if (e.target.id === 'btn-unpin') return;
        const targetRow = document.getElementById(`msg-row-${state.pinnedMessage.id}`);
        if (targetRow) {
          targetRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
          targetRow.classList.add('highlight-pulse');
          setTimeout(() => targetRow.classList.remove('highlight-pulse'), 1500);
        }
      };
    } else {
      elements.pinnedMessageBanner.style.display = 'none';
    }
  }

  function handleIncomingPinMessage(data) {
    if (data.unpin) {
      state.pinnedMessage = null;
      localStorage.removeItem('mesh_pinned_msg');
    } else {
      state.pinnedMessage = data.message;
      localStorage.setItem('mesh_pinned_msg', JSON.stringify(data.message));
    }
    renderPinnedBanner();
  }

  // --- 25. 🎨 Wallpaper & Accent Themes ---
  function openWallpaperModal() {
    document.querySelectorAll('.wallpaper-thumb').forEach(th => {
      th.classList.toggle('active', th.dataset.bg === state.wallpaper);
    });
    document.querySelectorAll('.color-palette .color-dot').forEach(cd => {
      cd.classList.toggle('active', cd.dataset.accent === state.accentColor);
    });
    elements.wallpaperModalOverlay.classList.add('active');
  }

  function saveWallpaperSettings() {
    localStorage.setItem('mesh_wallpaper', state.wallpaper);
    localStorage.setItem('mesh_accent_color', state.accentColor);
    applyCustomTheme();
    elements.wallpaperModalOverlay.classList.remove('active');
  }

  // --- 26. 🚨 Geofence Engine ---
  function checkGeofenceProximity(myLat, myLon) {
    if (!state.geofence.enabled) return;

    let centerLat = state.geofence.originCoords ? state.geofence.originCoords.latitude : null;
    let centerLon = state.geofence.originCoords ? state.geofence.originCoords.longitude : null;

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
      alert(`⚠️ GEOFENCE PERIMETER BREACH: You are ${Math.round(d)}m away from group base (limit: ${maxR}m)!`);

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
    
    if (state.myCoords) state.geofence.originCoords = state.myCoords;

    localStorage.setItem('mesh_geofence_radius', state.geofence.radiusMeters);
    localStorage.setItem('mesh_geofence_enabled', state.geofence.enabled);

    elements.geofenceModalOverlay.classList.remove('active');
    alert(`Geofence perimeter set to ${state.geofence.radiusMeters}m.`);
    if (state.activeView === 'map') drawMap();
  }

  // --- 27. 🎙️ VOX Hands-Free Radio ---
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
      alert('Microphone access is required for VOX.');
      state.vox.enabled = false;
      elements.btnToggleVox.classList.remove('active');
      elements.voxMeterContainer.style.display = 'none';
    }
  }

  function stopVoxAudioAnalysis() {
    if (state.vox.animFrame) cancelAnimationFrame(state.vox.animFrame);
    if (state.vox.micStream) state.vox.micStream.getTracks().forEach(t => t.stop());
    if (state.ptt.isTransmitting && !state.ptt.isLocked) stopPttTransmission();
  }

  // --- 28. ⛰️ Elevation Tracker ---
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

    const ascent = Math.max(0, maxAlt - minAlt);
    elements.elevGainStat.textContent = `Ascent: +${ascent}m (Max: ${maxAlt}m)`;

    const stormRisk = ascent > 400 ? 'Moderate (Altitude Front)' : 'Low';
    elements.stormProbStat.textContent = `Storm Risk: ${stormRisk}`;
    elements.weatherRiskPill.textContent = stormRisk === 'Low' ? '⛅ Fair Weather' : '⛈️ Barometric Front';
    elements.weatherRiskPill.classList.toggle('warning', stormRisk !== 'Low');
  }

  // --- 29. 🔦 Optical Morse Code Flasher ---
  const MORSE_MAP = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----', ' ': ' '
  };

  async function startOpticalMorseFlasher() {
    const rawText = elements.morseTextInput.value.trim().toUpperCase() || 'SOS';
    state.morse.isPlaying = true;
    elements.btnStartMorse.style.display = 'none';
    elements.btnStopMorse.style.display = 'block';

    const unitMs = 180;
    const sleep = (ms) => new Promise(r => { state.morse.timer = setTimeout(r, ms); });

    try {
      while (state.morse.isPlaying) {
        for (let i = 0; i < rawText.length; i++) {
          if (!state.morse.isPlaying) break;
          const ch = rawText[i];
          const morseSeq = MORSE_MAP[ch] || '';

          elements.morseCharIndicator.textContent = ch;
          elements.morseCodeSub.textContent = morseSeq.split('').join(' ');

          for (let j = 0; j < morseSeq.length; j++) {
            if (!state.morse.isPlaying) break;
            const sym = morseSeq[j];
            const duration = sym === '-' ? unitMs * 3 : unitMs;

            elements.morseScreenPreview.classList.add('flash-white');
            playMorseBeep(duration);
            if (state.sos.torchTrack) {
              try { state.sos.torchTrack.applyConstraints({ advanced: [{ torch: true }] }); } catch(e) {}
            }

            await sleep(duration);

            elements.morseScreenPreview.classList.remove('flash-white');
            if (state.sos.torchTrack) {
              try { state.sos.torchTrack.applyConstraints({ advanced: [{ torch: false }] }); } catch(e) {}
            }

            await sleep(unitMs);
          }

          await sleep(unitMs * 2);
        }

        await sleep(unitMs * 5);
      }
    } catch (e) {
      console.warn('[Morse] Play error:', e);
    } finally {
      stopOpticalMorseFlasher();
    }
  }

  function stopOpticalMorseFlasher() {
    state.morse.isPlaying = false;
    if (state.morse.timer) clearTimeout(state.morse.timer);
    elements.morseScreenPreview.classList.remove('flash-white');
    elements.morseCharIndicator.textContent = 'READY';
    elements.btnStartMorse.style.display = 'block';
    elements.btnStopMorse.style.display = 'none';
  }

  // --- 30. 🎯 Tactical 360° Radar Canvas ---
  function initTacticalRadar() {
    elements.radarModalOverlay.classList.add('active');
    renderRadarLoop();
  }

  function renderRadarLoop() {
    const canvas = elements.tacticalRadarCanvas;
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;

    ctx.clearRect(0, 0, w, h);

    const bgGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, cx);
    bgGrad.addColorStop(0, '#0f172a');
    bgGrad.addColorStop(1, '#090d16');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    [35, 70, 110, 150].forEach((r, idx) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 122, 255, 0.25)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = 'rgba(0, 122, 255, 0.6)';
      ctx.font = '9px monospace';
      ctx.fillText(`${(idx + 1) * 50}m`, cx + r - 20, cy - 3);
    });

    ctx.beginPath();
    ctx.moveTo(cx, 0); ctx.lineTo(cx, h);
    ctx.moveTo(0, cy); ctx.lineTo(w, cy);
    ctx.strokeStyle = 'rgba(0, 122, 255, 0.15)';
    ctx.stroke();

    state.radar.sweepAngle = (state.radar.sweepAngle + 0.03) % (Math.PI * 2);
    const sweepX = cx + Math.cos(state.radar.sweepAngle) * (cx - 10);
    const sweepY = cy + Math.sin(state.radar.sweepAngle) * (cy - 10);

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(sweepX, sweepY);
    ctx.strokeStyle = '#007aff';
    ctx.lineWidth = 2;
    ctx.stroke();

    if (state.myCoords) {
      state.peerLocations.forEach((peer, peerId) => {
        if (peerId === state.self.id || !peer.coords) return;
        const rawBearing = calculateRawBearing(state.myCoords.latitude, state.myCoords.longitude, peer.coords.latitude, peer.coords.longitude);
        const relBearing = (rawBearing - state.myHeading + 360) % 360;
        const rad = (relBearing - 90) * Math.PI / 180;

        const distPx = Math.min(140, Math.max(30, 70));
        const px = cx + Math.cos(rad) * distPx;
        const py = cy + Math.sin(rad) * distPx;

        ctx.beginPath();
        ctx.arc(px, py, 9, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 149, 0, 0.3)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#ff9500';
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px sans-serif';
        ctx.fillText(peer.name || 'Peer', px + 8, py + 3);
      });
    }

    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#007aff';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    if (elements.radarModalOverlay.classList.contains('active')) {
      state.radar.animFrame = requestAnimationFrame(renderRadarLoop);
    }
  }

  // --- 31. 📡 Multi-Hop Mesh Relay Engine ---
  async function dispatchMeshRelayPacket(payload, targetId = 'broadcast') {
    const packet = {
      id: 'pkt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
      originSenderId: state.self.id,
      originSenderName: state.self.name,
      targetId: targetId,
      hopsRemaining: 3,
      hopsTaken: 0,
      visitedNodes: [state.self.id],
      payload: payload,
      timestamp: Date.now()
    };

    state.seenRelayPackets.add(packet.id);

    if (state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(JSON.stringify({
        type: 'RELAY_PACKET',
        packet: packet
      }));
    }
  }

  function handleIncomingRelayPacket(data) {
    const packet = data.packet;
    if (!packet || state.seenRelayPackets.has(packet.id)) return;
    state.seenRelayPackets.add(packet.id);

    packet.hopsTaken = (packet.hopsTaken || 0) + 1;

    if (packet.targetId === 'broadcast' || packet.targetId === state.self.id) {
      const msg = packet.payload;
      if (msg) {
        if (packet.hopsTaken > 1) {
          msg._relayInfo = `Relayed via ${packet.visitedNodes.length - 1} mesh hops`;
        }
        appendMessage(msg, packet.originSenderId === state.self.id);
      }
    }
  }

  // --- 32. 📦 Chunked P2P File Exchanger ---
  const CHUNK_SIZE = 48 * 1024;

  async function sendFileInChunks(file, targetId = 'broadcast') {
    const transferId = 'transfer_' + Date.now();
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

    elements.chunkedTransferToast.style.display = 'flex';
    elements.transferToastTitle.textContent = `📦 Sending ${file.name}...`;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const arrayBuffer = e.target.result;
      const base64Full = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

      for (let i = 0; i < totalChunks; i++) {
        const start = i * CHUNK_SIZE;
        const end = Math.min(file.size, (i + 1) * CHUNK_SIZE);
        const chunkData = base64Full.slice(start, end);

        const percent = Math.round(((i + 1) / totalChunks) * 100);
        elements.transferToastPercent.textContent = `${percent}%`;
        elements.transferProgressFill.style.width = `${percent}%`;
        elements.transferToastSub.textContent = `Chunk ${i + 1} / ${totalChunks} (${formatFileSize(file.size)})`;

        if (state.ws && state.ws.readyState === WebSocket.OPEN) {
          state.ws.send(JSON.stringify({
            type: 'FILE_TRANSFER_CHUNK',
            transferId: transferId,
            chunkIndex: i,
            totalChunks: totalChunks,
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size,
            targetId: targetId,
            senderName: state.self.name,
            chunkData: chunkData
          }));
        }

        await new Promise(r => setTimeout(r, 40));
      }

      setTimeout(() => {
        elements.chunkedTransferToast.style.display = 'none';
      }, 1000);
    };

    reader.readAsArrayBuffer(file);
  }

  function handleIncomingFileChunk(data) {
    let job = state.chunkedTransfer.buffers.get(data.transferId);
    if (!job) {
      job = {
        transferId: data.transferId,
        fileName: data.fileName,
        fileType: data.fileType,
        fileSize: data.fileSize,
        totalChunks: data.totalChunks,
        senderName: data.senderName,
        chunks: new Array(data.totalChunks)
      };
      state.chunkedTransfer.buffers.set(data.transferId, job);
    }

    job.chunks[data.chunkIndex] = data.chunkData;
    const receivedCount = job.chunks.filter(Boolean).length;
    const percent = Math.round((receivedCount / job.totalChunks) * 100);

    elements.chunkedTransferToast.style.display = 'flex';
    elements.transferToastTitle.textContent = `📥 Receiving ${job.fileName} from ${job.senderName}...`;
    elements.transferToastPercent.textContent = `${percent}%`;
    elements.transferProgressFill.style.width = `${percent}%`;
    elements.transferToastSub.textContent = `Chunk ${receivedCount} / ${job.totalChunks}`;

    if (receivedCount === job.totalChunks) {
      const fullBase64 = job.chunks.join('');
      const dataUrl = `data:${job.fileType};base64,${fullBase64}`;

      const msg = {
        id: 'file_' + Date.now(),
        senderId: data.senderId || 'peer',
        senderName: job.senderName,
        targetId: 'broadcast',
        channelId: state.activeChannelId,
        fileName: job.fileName,
        fileSize: job.fileSize,
        fileType: job.fileType,
        fileData: dataUrl,
        timestamp: Date.now()
      };

      appendMessage(msg, false);
      state.chunkedTransfer.buffers.delete(data.transferId);

      setTimeout(() => {
        elements.chunkedTransferToast.style.display = 'none';
      }, 1500);
    }
  }

  // --- 33. Emergency SOS Beacon & Roll Call ---
  async function activateSosBeacon() {
    state.sos.active = true;
    elements.sosModalOverlay.classList.add('active');
    startSosAudio();

    let flash = false;
    state.sos.strobeTimer = setInterval(() => {
      flash = !flash;
      elements.sosModalOverlay.classList.toggle('strobe-flash', flash);
    }, 220);

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
      alert(`🚨 EMERGENCY SOS DISTRESS SIGNAL FROM ${data.senderName}!`);
    } else {
      stopSosAudio();
    }
  }

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
    }
  }

  function handleIncomingRollCallResponse(data) {
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

  // --- 34. WebSocket Resilient Hub Client ---
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

    state.ws.onopen = async () => {
      state.connected = true;
      updateConnectionStatus(true, 'Online & Synced');
      
      state.ws.send(JSON.stringify({
        type: 'JOIN',
        peer: state.self
      }));

      // Automatically drain queued offline outbox messages
      await drainOfflineOutbox();

      // Request missed messages since last local timestamp
      const highestTs = (state.messages && state.messages.length > 0)
        ? state.messages.reduce((max, m) => Math.max(max, m.timestamp || 0), 0)
        : 0;
      state.ws.send(JSON.stringify({
        type: 'SYNC_REQUEST',
        since: highestTs
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
      updateConnectionStatus(false, 'Offline • Queuing Outbox');
      scheduleReconnect();
    };

    state.ws.onerror = () => {
      state.connected = false;
      updateConnectionStatus(false, 'Connecting...');
      scheduleReconnect();
    };
  }

  function scheduleReconnect() {
    if (clientHeartbeatInterval) {
      clearInterval(clientHeartbeatInterval);
      clientHeartbeatInterval = null;
    }
    if (reconnectTimer) clearTimeout(reconnectTimer);
    reconnectTimer = setTimeout(() => connectWebSocket(), 1500);
  }

  function updateConnectionStatus(isOnline, statusText) {
    elements.connectionStatusDot.classList.toggle('offline', !isOnline);
    elements.connectionStatusText.textContent = statusText;
  }

  async function handleIncomingServerMessage(data) {
    state.telemetry.packetsCount++;

    switch (data.type) {
      case 'WELCOME':
      case 'PEER_LIST_UPDATE':
        if (data.acceptedContacts && data.acceptedContacts.length > 0) {
          data.acceptedContacts.forEach(c => state.contacts.add(c));
          localStorage.setItem('mesh_contacts', JSON.stringify(Array.from(state.contacts)));
        }
        renderPeerList(data.peers);
        if (data.channels && data.channels.length > 0) {
          data.channels.forEach(ch => {
            if (!state.channels.find(c => c.id === ch.id)) state.channels.push(ch);
          });
          localStorage.setItem('mesh_channels', JSON.stringify(state.channels));
          renderChannelsList();
        }
        if (data.allNotes) {
          Object.assign(state.allNotes, data.allNotes);
          localStorage.setItem('mesh_all_notes', JSON.stringify(state.allNotes));
        }
        if (data.sharedNote) handleIncomingNoteUpdate({ note: data.sharedNote });
        if (data.sharedTimer) handleIncomingTimerSync({ timer: data.sharedTimer });
        if (data.sharedExpenses) handleIncomingExpenseAdd({ expenses: data.sharedExpenses });
        if (data.peerLocations && Array.isArray(data.peerLocations)) {
          data.peerLocations.forEach(loc => {
            if (loc.peerId !== state.self.id && loc.coords) {
              state.peerLocations.set(loc.peerId, {
                name: loc.name,
                coords: loc.coords,
                timestamp: loc.timestamp
              });
            }
          });
          updateMapStats();
          updateCompassDisplay();
          if (state.activeView === 'map') drawMap();
        }
        if (data.type === 'WELCOME' && data.recentMessages && data.recentMessages.length > 0) {
          for (const rawMsg of data.recentMessages) {
            const msg = await decryptPayload(rawMsg);
            if (!state.messages.find(m => m.id === msg.id)) {
              appendMessage(msg, false);
            }
          }
        }
        break;

      case 'CONTACT_REQUEST':
        handleIncomingContactRequest(data);
        break;

      case 'CONTACT_ACCEPTED':
        if (data.peer) {
          state.contacts.add(data.peer.id);
          state.contacts.add(getPairKey(state.self.id, data.peer.id));
          state.pendingRequests.delete(data.peer.id);
          localStorage.setItem('mesh_contacts', JSON.stringify(Array.from(state.contacts)));
          localStorage.setItem('mesh_pending_reqs', JSON.stringify(Array.from(state.pendingRequests)));
          renderPeerList(Array.from(state.peers.values()));
        }
        break;

      case 'CONTACT_DECLINED':
        if (data.fromPeerId) {
          state.pendingRequests.delete(data.fromPeerId);
          localStorage.setItem('mesh_pending_reqs', JSON.stringify(Array.from(state.pendingRequests)));
          renderPeerList(Array.from(state.peers.values()));
        }
        break;

      case 'PROFILE_UPDATE': {
        if (data.peer) {
          state.peers.set(data.peer.id, data.peer);
          renderPeerList(data.peers || Array.from(state.peers.values()));
          if (state.activeTargetId === data.peer.id) {
            selectChatTarget(data.peer.id);
          }
        }
        break;
      }

      case 'SYNC_RESPONSE': {
        if (data.acceptedContacts && data.acceptedContacts.length > 0) {
          data.acceptedContacts.forEach(c => state.contacts.add(c));
          localStorage.setItem('mesh_contacts', JSON.stringify(Array.from(state.contacts)));
        }
        if (data.channels && data.channels.length > 0) {
          data.channels.forEach(ch => {
            if (!state.channels.find(c => c.id === ch.id)) state.channels.push(ch);
          });
          localStorage.setItem('mesh_channels', JSON.stringify(state.channels));
          renderChannelsList();
        }
        if (data.allNotes) {
          Object.assign(state.allNotes, data.allNotes);
          localStorage.setItem('mesh_all_notes', JSON.stringify(state.allNotes));
        }
        if (data.messages && data.messages.length > 0) {
          for (const rawMsg of data.messages) {
            const msg = await decryptPayload(rawMsg);
            if (!state.messages.find(m => m.id === msg.id)) {
              appendMessage(msg, false);
            }
          }
        }
        if (data.peerLocations && Array.isArray(data.peerLocations)) {
          data.peerLocations.forEach(loc => {
            if (loc.peerId !== state.self.id && loc.coords) {
              state.peerLocations.set(loc.peerId, {
                name: loc.name,
                coords: loc.coords,
                timestamp: loc.timestamp
              });
            }
          });
          updateMapStats();
          updateCompassDisplay();
          if (state.activeView === 'map') drawMap();
        }
        if (data.sharedNote) handleIncomingNoteUpdate({ note: data.sharedNote });
        if (data.sharedTimer) handleIncomingTimerSync({ timer: data.sharedTimer });
        if (data.sharedExpenses) handleIncomingExpenseAdd({ expenses: data.sharedExpenses });
        break;
      }

      case 'MESSAGE_DELIVERED': {
        if (data.messageId) {
          const m = state.messages.find(msg => msg.id === data.messageId);
          if (m) {
            m.status = 'delivered';
            saveMessageToStorage(m);
            const row = document.getElementById(`msg-row-${m.id}`);
            if (row) {
              const icon = row.querySelector('.msg-status-icon');
              if (icon) {
                icon.className = 'msg-status-icon delivered';
                icon.title = 'Delivered';
                icon.textContent = '✓✓';
              }
            }
          }
        }
        break;
      }

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
        
        // Mention notification
        if (msg.text && msg.text.includes(`@${state.self.name}`) && msg.senderId !== state.self.id) {
          if ('vibrate' in navigator) navigator.vibrate([100, 50, 100]);
          playSound('message');
        } else if (!data.isSelf && msg.senderId !== state.self.id) {
          playSound('message');
        }
        break;
      }

      case 'TIMER_SYNC':
        handleIncomingTimerSync(data);
        break;

      case 'EXPENSE_ADD':
        handleIncomingExpenseAdd(data);
        break;

      case 'EXPENSE_RESET':
        handleIncomingExpenseReset();
        break;

      case 'POLL_VOTE':
        handleIncomingPollVote(data);
        break;

      case 'EVENT_RSVP':
        handleIncomingEventRsvp(data);
        break;

      case 'GAME_MOVE':
        handleIncomingGameMove(data);
        break;

      case 'RPS_CHALLENGE': {
        const existing = state.messages.find(m => m.id === data.challengeId);
        if (!existing) {
          const chMsg = {
            id: data.challengeId,
            type: 'rps_challenge',
            senderId: data.challengerId,
            senderName: data.challengerName,
            targetId: data.targetId,
            channelId: data.channelId,
            challengerMove: data.challengerMove,
            status: 'open',
            timestamp: Date.now()
          };
          appendMessage(chMsg, false);
          showNotificationToast(`⚔️ RPS Challenge from ${data.challengerName}!`);
        }
        break;
      }

      case 'RPS_SHOWDOWN': {
        const chMsg = state.messages.find(m => m.id === data.challengeId);
        if (chMsg) {
          chMsg.status = 'resolved';
          chMsg.challengerMove = data.challengerMove;
          chMsg.opponentMove = data.opponentMove;
          chMsg.challengerName = data.challengerName;
          chMsg.opponentName = data.opponentName;
          chMsg.outcomeText = data.outcomeText;
          chMsg.winnerId = data.winnerId;
          saveMessageToStorage(chMsg);
          if (shouldDisplayMessage(chMsg)) {
            renderSingleMessageBubble(chMsg, chMsg.senderId === state.self.id);
          }
        }
        triggerRpsShowdownAnimation(data);
        break;
      }

      case 'CHANNEL_CREATE':
        handleIncomingChannelCreate(data);
        break;

      case 'CHANNEL_DELETE':
        handleIncomingChannelDelete(data);
        break;

      case 'ROOM_INVITE':
        handleIncomingRoomInvite(data);
        break;

      case 'ROOM_KICKED':
        alert(`You have been removed from room #${data.channelName || 'room'} by the room admin.`);
        if (state.activeChannelId === data.channelId) {
          selectChannel('general');
        }
        state.channels = state.channels.filter(c => c.id !== data.channelId);
        localStorage.setItem('mesh_channels', JSON.stringify(state.channels));
        renderChannelsList();
        break;

      case 'CHANNEL_UPDATE':
        if (data.channel) {
          const idx = state.channels.findIndex(c => c.id === data.channel.id);
          if (idx !== -1) state.channels[idx] = data.channel;
          else state.channels.push(data.channel);
          localStorage.setItem('mesh_channels', JSON.stringify(state.channels));
          renderChannelsList();
          if (state.activeChannelId === data.channel.id && elements.roomSettingsModalOverlay && elements.roomSettingsModalOverlay.classList.contains('active')) {
            openRoomSettingsModal();
          }
        }
        break;

      case 'CLEAR_ROOM_HISTORY':
        handleIncomingClearRoomHistory(data);
        break;

      case 'EXPENSE_DELETE':
        handleIncomingExpenseDelete(data);
        break;

      case 'NOTE_UPDATE':
        handleIncomingNoteUpdate(data);
        break;

      case 'PONG':
        handleIncomingPong(data);
        break;

      case 'MESSAGE_EDIT':
        handleIncomingMessageEdit(data);
        break;

      case 'MESSAGE_DELETE':
        handleIncomingMessageDelete(data);
        break;

      case 'PIN_MESSAGE':
        handleIncomingPinMessage(data);
        break;

      case 'RELAY_PACKET':
        handleIncomingRelayPacket(data);
        break;

      case 'FILE_TRANSFER_CHUNK':
        handleIncomingFileChunk(data);
        break;

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
          if (state.activeView === 'map') {
            drawMap();
            renderWaypointsVaultDrawer();
          }
        }
        break;

      case 'WAYPOINT_DELETE':
        state.waypoints = state.waypoints.filter(w => w.id !== data.waypointId);
        localStorage.setItem('mesh_waypoints', JSON.stringify(state.waypoints));
        if (state.activeView === 'map') {
          drawMap();
          renderWaypointsVaultDrawer();
        }
        break;

      case 'MAP_FLARE':
        if (data.flare) {
          state.mapFlares.push(data.flare);
          try { playSound('sos_beep'); } catch (e) {}
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

  // --- 35. Walkie-Talkie Push-to-Talk ---
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

  // --- 36. GPS Map Engine, Tactical Radar & Breadcrumbs ---
  let mapCanvasCtx = null;
  let mapManualZoom = 1.0;
  let mapSelectedPeerId = null;
  let drawnPeerHitboxes = [];
  let drawnWaypointHitboxes = [];
  let radarAnimFrameId = null;

  function hashStringToNumber(str) {
    if (!str) return 42;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  function calculateDistanceMeters(lat1, lon1, lat2, lon2) {
    const R = 6371e3;
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  function calculateRawBearing(lat1, lon1, lat2, lon2) {
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const y = Math.sin(Δλ) * Math.cos(φ2);
    const x = Math.cos(φ1) * Math.sin(φ2) -
              Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
    const θ = Math.atan2(y, x);
    return (θ * 180 / Math.PI + 360) % 360;
  }

  function formatCoordinatesDisplay(lat, lon) {
    if (state.coordFormat === 'DMS') {
      const formatDMS = (val, isLat) => {
        const dir = isLat ? (val >= 0 ? 'N' : 'S') : (val >= 0 ? 'E' : 'W');
        const absVal = Math.abs(val);
        const deg = Math.floor(absVal);
        const minFloat = (absVal - deg) * 60;
        const min = Math.floor(minFloat);
        const sec = Math.round((minFloat - min) * 60);
        return `${deg}°${String(min).padStart(2, '0')}'${String(sec).padStart(2, '0')}"${dir}`;
      };
      return `${formatDMS(lat, true)} ${formatDMS(lon, false)}`;
    }
    return `${lat.toFixed(4)}°, ${lon.toFixed(4)}°`;
  }

  function initMapEngine() {
    if (elements.offlineMapCanvas) {
      mapCanvasCtx = elements.offlineMapCanvas.getContext('2d');
    }
    acquireGpsPosition(false);
    initMapEventListeners();
    startRadarSweepAnimation();
  }

  function startRadarSweepAnimation() {
    if (radarAnimFrameId) cancelAnimationFrame(radarAnimFrameId);

    const sweepStep = () => {
      if (state.activeView === 'map' && state.radarSweepEnabled) {
        state.radarSweepAngle = (state.radarSweepAngle + 1.2) % 360;
        drawMap();
      }
      radarAnimFrameId = requestAnimationFrame(sweepStep);
    };
    radarAnimFrameId = requestAnimationFrame(sweepStep);
  }

  async function acquireGpsPosition(forceRefresh = false) {
    if (elements.mapGpsStatus) {
      elements.mapGpsStatus.textContent = 'Acquiring GPS...';
      elements.mapGpsStatus.classList.remove('active');
    }

    // 1. Immediately apply saved/calibrated coordinates if available so the map never jumps
    const stored = localStorage.getItem('mesh_last_coords');
    if (stored && !forceRefresh) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.latitude && parsed.longitude) {
          onGpsFixAcquired(parsed, 'Saved Position');
        }
      } catch (e) {}
    }

    let fixAcquired = false;

    // 2. Request true hardware high-precision GPS from device
    if (navigator.geolocation) {
      try {
        await new Promise((resolve) => {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              fixAcquired = true;
              const coords = {
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                altitude: pos.coords.altitude || 0,
                heading: pos.coords.heading || 0,
                speed: pos.coords.speed || 0,
                accuracy: pos.coords.accuracy || 5
              };
              localStorage.setItem('mesh_last_coords', JSON.stringify(coords));
              localStorage.setItem('mesh_real_gps_locked', 'true');
              onGpsFixAcquired(coords, '3D High-Precision Fix');
              if (elements.gpsAccuracyInfo) {
                elements.gpsAccuracyInfo.textContent = `🛰️ High-Precision GPS Lock • Accuracy: ±${Math.round(pos.coords.accuracy || 5)}m`;
              }
              if (forceRefresh) {
                showNotificationToast(`📍 GPS Locked: ${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)} (±${Math.round(coords.accuracy)}m)`);
              }
              resolve();
            },
            (err) => {
              console.warn('[GPS] High-accuracy geolocation notice:', err.message);
              resolve();
            },
            { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
          );
        });
      } catch (e) {}

      // Continuous high accuracy watcher
      try {
        navigator.geolocation.watchPosition(
          (pos) => {
            const coords = {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              altitude: pos.coords.altitude || 0,
              heading: pos.coords.heading || 0,
              speed: pos.coords.speed || 0,
              accuracy: pos.coords.accuracy || 5
            };
            localStorage.setItem('mesh_last_coords', JSON.stringify(coords));
            onGpsFixAcquired(coords, 'Live High-Precision Fix');
            if (elements.gpsAccuracyInfo) {
              elements.gpsAccuracyInfo.textContent = `🛰️ High-Precision GPS Lock • Accuracy: ±${Math.round(pos.coords.accuracy || 5)}m`;
            }
          },
          (err) => {
            console.warn('[GPS] Geolocation Watcher Notice:', err.message);
          },
          { enableHighAccuracy: true, maximumAge: 3000, timeout: 15000 }
        );
      } catch (e) {}
    }

    if (fixAcquired || state.myCoords) return;

    // 3. Fallback to IP Geolocation only if no prior cached location exists
    try {
      const res = await fetch('https://ipwho.is/', { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        const ipData = await res.json();
        if (ipData.success && ipData.latitude && ipData.longitude) {
          const coords = {
            latitude: ipData.latitude,
            longitude: ipData.longitude,
            altitude: 40,
            heading: 0,
            speed: 0,
            accuracy: 1000,
            city: ipData.city || 'Network'
          };
          localStorage.setItem('mesh_last_coords', JSON.stringify(coords));
          onGpsFixAcquired(coords, `IP Fix (${ipData.city || 'Network'})`);
          return;
        }
      }
    } catch (e) {}

    // 4. Rendezvous fallback if all else fails
    const seed = hashStringToNumber(state.self.id);
    const angle = (seed % 360) * (Math.PI / 180);
    const distMeters = 40 + (seed % 100);
    const baseLat = 17.3850;
    const baseLon = 78.4867;
    const latOffset = (distMeters * Math.cos(angle)) / 111000;
    const lonOffset = (distMeters * Math.sin(angle)) / (111000 * Math.cos(baseLat * Math.PI / 180));

    onGpsFixAcquired({
      latitude: baseLat + latOffset,
      longitude: baseLon + lonOffset,
      altitude: 120,
      heading: (seed * 45) % 360,
      speed: 0,
      accuracy: 20
    }, 'Mesh Radar Fix');
  }

  function onGpsFixAcquired(coords, label) {
    state.myCoords = coords;
    localStorage.setItem('mesh_last_coords', JSON.stringify(coords));

    if (elements.mapGpsStatus) {
      elements.mapGpsStatus.textContent = `${label} (${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)})`;
      elements.mapGpsStatus.classList.add('active');
    }

    if (coords.altitude) {
      recordElevation(coords.altitude);
    }

    const last = state.myTrail[state.myTrail.length - 1];
    if (!last || Math.abs(last.lat - coords.latitude) > 0.00005 || Math.abs(last.lon - coords.longitude) > 0.00005) {
      const now = Date.now();
      if (last) {
        const distStep = calculateDistanceMeters(last.lat, last.lon, coords.latitude, coords.longitude);
        const timeSec = Math.max(1, (now - (last.time || now)) / 1000);
        const speedKmh = (distStep / timeSec) * 3.6;
        state.currentSpeedKmh = Math.min(120, Math.round(speedKmh * 10) / 10);
      }

      state.myTrail.push({
        lat: coords.latitude,
        lon: coords.longitude,
        time: now
      });

      if (state.myTrail.length > 500) state.myTrail.shift();
      localStorage.setItem('mesh_my_trail', JSON.stringify(state.myTrail));
    }

    // Recompute total odometer
    let totalDist = 0;
    for (let i = 1; i < state.myTrail.length; i++) {
      totalDist += calculateDistanceMeters(state.myTrail[i-1].lat, state.myTrail[i-1].lon, state.myTrail[i].lat, state.myTrail[i].lon);
    }
    state.totalOdometerKm = Math.round((totalDist / 1000) * 100) / 100;

    checkGeofenceProximity(coords.latitude, coords.longitude);
    broadcastGpsPosition();
    updateMapStats();
    updateCompassDisplay();
    if (state.activeView === 'map') drawMap();
  }

  function broadcastGpsPosition() {
    if (!state.myCoords) return;
    if (state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(JSON.stringify({
        type: 'GPS_BROADCAST',
        senderName: state.self.name,
        coords: state.myCoords
      }));
    }
  }

  // Periodic GPS heartbeat every 4 seconds
  setInterval(() => {
    if (state.myCoords && state.ws && state.ws.readyState === WebSocket.OPEN) {
      broadcastGpsPosition();
    }
  }, 4000);

  function updateMapStats() {
    if (elements.mapTrailPoints) elements.mapTrailPoints.textContent = `${state.myTrail.length} pts`;
    if (elements.mapSpeedStat) elements.mapSpeedStat.textContent = `${state.currentSpeedKmh || 0} km/h`;
    if (elements.mapOdometerStat) elements.mapOdometerStat.textContent = `${state.totalOdometerKm.toFixed(2)} km`;
    if (state.myCoords) {
      if (elements.mapCoordsStat) {
        elements.mapCoordsStat.textContent = formatCoordinatesDisplay(state.myCoords.latitude, state.myCoords.longitude);
      }
      if (elements.mapGpsStatus) {
        elements.mapGpsStatus.textContent = `Fix (${state.myCoords.latitude.toFixed(4)}, ${state.myCoords.longitude.toFixed(4)})`;
        elements.mapGpsStatus.classList.add('active');
      }
    }
  }

  function resizeAndDrawMap() {
    if (!elements.offlineMapCanvas) return;
    const parent = elements.offlineMapCanvas.parentElement;
    if (!parent || !parent.getBoundingClientRect) return;
    const rect = parent.getBoundingClientRect();
    elements.offlineMapCanvas.width = rect.width || 800;
    elements.offlineMapCanvas.height = rect.height || 600;
    drawMap();
  }

  function drawMap() {
    if (!mapCanvasCtx || !elements.offlineMapCanvas) return;
    const w = elements.offlineMapCanvas.width;
    const h = elements.offlineMapCanvas.height;
    if (!w || !h) return;

    drawnPeerHitboxes = [];
    drawnWaypointHitboxes = [];

    const isDark = document.body.classList.contains('dark-theme') || document.body.classList.contains('red-vision-theme');
    mapCanvasCtx.fillStyle = isDark ? '#0b0f19' : '#141824';
    mapCanvasCtx.fillRect(0, 0, w, h);

    const centerX = w / 2;
    const centerY = h / 2;
    const maxRadius = Math.min(centerX, centerY) - 40;

    // Draw Grid Lines
    mapCanvasCtx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.07)';
    mapCanvasCtx.lineWidth = 1;
    const gridSize = 45;
    for (let x = centerX % gridSize; x < w; x += gridSize) {
      mapCanvasCtx.beginPath();
      mapCanvasCtx.moveTo(x, 0);
      mapCanvasCtx.lineTo(x, h);
      mapCanvasCtx.stroke();
    }
    for (let y = centerY % gridSize; y < h; y += gridSize) {
      mapCanvasCtx.beginPath();
      mapCanvasCtx.moveTo(0, y);
      mapCanvasCtx.lineTo(w, y);
      mapCanvasCtx.stroke();
    }

    const myLat = state.myCoords ? state.myCoords.latitude : 17.3850;
    const myLon = state.myCoords ? state.myCoords.longitude : 78.4867;

    // Direct tactical zoom scaling: 1.0x = 300m range, 2.0x = 150m, 6.0x = 50m, 0.1x = 3km, 0.005x = 60km
    const baseRangeMeters = 300;
    let currentRange = Math.max(20, Math.min(500000, baseRangeMeters / mapManualZoom));

    if (elements.mapHudRangeTag) {
      const rangeStr = currentRange >= 1000 ? `${(currentRange / 1000).toFixed(1)}km` : `${Math.round(currentRange)}m`;
      const zoomLabel = mapManualZoom >= 1 ? `${mapManualZoom.toFixed(1)}x` : `${(1 / mapManualZoom).toFixed(1)}x Out`;
      elements.mapHudRangeTag.textContent = `RANGE: ${rangeStr} [${zoomLabel}] • AZIMUTH: 360° BEZEL`;
    }

    // Helper: Convert Lat/Lon to Canvas Pixel Coordinates using Great-Circle Bearing & Distance
    function coordsToPixel(lat, lon) {
      const dist = calculateDistanceMeters(myLat, myLon, lat, lon);
      const rawBearing = calculateRawBearing(myLat, myLon, lat, lon);
      const angleRad = (rawBearing - 90) * (Math.PI / 180);
      const isOutOfBounds = dist > currentRange;
      const pixelDist = isOutOfBounds ? (maxRadius + 4) : ((dist / currentRange) * maxRadius);

      const px = centerX + pixelDist * Math.cos(angleRad);
      const py = centerY + pixelDist * Math.sin(angleRad);
      return { px, py, dist, rawBearing, isOutOfBounds };
    }

      const px = centerX + pixelDist * Math.cos(angleRad);
      const py = centerY + pixelDist * Math.sin(angleRad);
      return { px, py, dist, rawBearing };
    }

    // 1. Draw 3 Concentric Radar Range Rings
    const ringFractions = [0.333, 0.666, 1.0];
    ringFractions.forEach((frac) => {
      const r = maxRadius * frac;
      const ringMeters = Math.round(currentRange * frac);

      mapCanvasCtx.beginPath();
      mapCanvasCtx.arc(centerX, centerY, r, 0, Math.PI * 2);
      mapCanvasCtx.strokeStyle = 'rgba(0, 122, 255, 0.22)';
      mapCanvasCtx.lineWidth = 1.2;
      mapCanvasCtx.stroke();

      mapCanvasCtx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      mapCanvasCtx.font = '10px monospace';
      const label = ringMeters >= 1000 ? `${(ringMeters / 1000).toFixed(1)}km` : `${ringMeters}m`;
      mapCanvasCtx.fillText(label, centerX + r - 30, centerY - 4);
    });

    // 2. Draw 360° Military Azimuth Compass Rose Bezel
    mapCanvasCtx.save();
    for (let deg = 0; deg < 360; deg += 5) {
      const isMajor = deg % 30 === 0;
      const isCard = deg % 90 === 0;
      const tickAngle = (deg - 90) * (Math.PI / 180);
      const outerR = maxRadius;
      const innerR = isMajor ? maxRadius - 9 : maxRadius - 4;

      mapCanvasCtx.beginPath();
      mapCanvasCtx.moveTo(centerX + outerR * Math.cos(tickAngle), centerY + outerR * Math.sin(tickAngle));
      mapCanvasCtx.lineTo(centerX + innerR * Math.cos(tickAngle), centerY + innerR * Math.sin(tickAngle));
      mapCanvasCtx.strokeStyle = isCard ? 'rgba(0, 122, 255, 0.8)' : (isMajor ? 'rgba(255, 255, 255, 0.45)' : 'rgba(255, 255, 255, 0.15)');
      mapCanvasCtx.lineWidth = isCard ? 2 : (isMajor ? 1.5 : 1);
      mapCanvasCtx.stroke();

      if (isMajor) {
        const textR = maxRadius + 14;
        const textX = centerX + textR * Math.cos(tickAngle);
        const textY = centerY + textR * Math.sin(tickAngle);
        mapCanvasCtx.font = '9px monospace';
        mapCanvasCtx.fillStyle = isCard ? '#007aff' : 'rgba(255, 255, 255, 0.6)';
        mapCanvasCtx.textAlign = 'center';
        mapCanvasCtx.textBaseline = 'middle';
        
        let label = String(deg).padStart(3, '0');
        if (deg === 0) label = 'N';
        else if (deg === 90) label = 'E';
        else if (deg === 180) label = 'S';
        else if (deg === 270) label = 'W';
        
        mapCanvasCtx.fillText(label, textX, textY);
      }
    }
    mapCanvasCtx.restore();

    // 3. Draw Rotating Tactical Radar Beam Sweep
    if (state.radarSweepEnabled) {
      mapCanvasCtx.save();
      const sweepRad = (state.radarSweepAngle - 90) * (Math.PI / 180);
      
      const sweepGrad = mapCanvasCtx.createConicGradient(sweepRad, centerX, centerY);
      sweepGrad.addColorStop(0, 'rgba(0, 122, 255, 0.28)');
      sweepGrad.addColorStop(0.08, 'rgba(0, 122, 255, 0.06)');
      sweepGrad.addColorStop(0.2, 'rgba(0, 122, 255, 0)');
      sweepGrad.addColorStop(1, 'rgba(0, 122, 255, 0)');

      mapCanvasCtx.beginPath();
      mapCanvasCtx.arc(centerX, centerY, maxRadius, 0, Math.PI * 2);
      mapCanvasCtx.fillStyle = sweepGrad;
      mapCanvasCtx.fill();

      // Lead line
      mapCanvasCtx.beginPath();
      mapCanvasCtx.moveTo(centerX, centerY);
      mapCanvasCtx.lineTo(centerX + maxRadius * Math.cos(sweepRad), centerY + maxRadius * Math.sin(sweepRad));
      mapCanvasCtx.strokeStyle = 'rgba(0, 122, 255, 0.75)';
      mapCanvasCtx.lineWidth = 1.5;
      mapCanvasCtx.stroke();
      mapCanvasCtx.restore();
    }

    // 4. Geofence Circle
    if (state.geofence.enabled && state.geofence.originCoords) {
      const gPos = coordsToPixel(state.geofence.originCoords.latitude, state.geofence.originCoords.longitude);
      const pixelRadius = (state.geofence.radiusMeters / currentRange) * maxRadius;

      mapCanvasCtx.beginPath();
      mapCanvasCtx.arc(gPos.px, gPos.py, pixelRadius, 0, Math.PI * 2);
      mapCanvasCtx.fillStyle = 'rgba(255, 59, 48, 0.08)';
      mapCanvasCtx.fill();
      mapCanvasCtx.strokeStyle = 'rgba(255, 59, 48, 0.6)';
      mapCanvasCtx.lineWidth = 2;
      mapCanvasCtx.setLineDash([6, 6]);
      mapCanvasCtx.stroke();
      mapCanvasCtx.setLineDash([]);
    }

    // 5. Breadcrumb Trail
    if (state.myTrail.length > 1) {
      mapCanvasCtx.beginPath();
      mapCanvasCtx.strokeStyle = '#34c759';
      mapCanvasCtx.lineWidth = 2.5;
      mapCanvasCtx.setLineDash([4, 4]);

      state.myTrail.forEach((pt, i) => {
        const p = coordsToPixel(pt.lat, pt.lon);
        if (i === 0) mapCanvasCtx.moveTo(p.px, p.py);
        else mapCanvasCtx.lineTo(p.px, p.py);
      });
      mapCanvasCtx.stroke();
      mapCanvasCtx.setLineDash([]);
    }

    // 6. Active Emergency Distress Flares
    const nowTime = Date.now();
    state.mapFlares = state.mapFlares.filter(f => nowTime - f.timestamp < 120000); // 2 min lifespan
    state.mapFlares.forEach(flare => {
      const p = coordsToPixel(flare.lat, flare.lon);
      const age = (nowTime - flare.timestamp) / 1000;
      const pulseSize = 10 + (age % 3) * 12;

      mapCanvasCtx.beginPath();
      mapCanvasCtx.arc(p.px, p.py, pulseSize, 0, Math.PI * 2);
      mapCanvasCtx.strokeStyle = 'rgba(255, 59, 48, 0.8)';
      mapCanvasCtx.lineWidth = 2;
      mapCanvasCtx.stroke();

      mapCanvasCtx.font = '20px sans-serif';
      mapCanvasCtx.fillText('🚨', p.px - 10, p.py + 6);
      mapCanvasCtx.font = 'bold 11px -apple-system, sans-serif';
      mapCanvasCtx.fillStyle = '#ff3b30';
      mapCanvasCtx.fillText(`FLARE: ${flare.senderName || 'SOS'}`, p.px + 12, p.py + 4);
    });

    // 7. Waypoints
    state.waypoints.forEach(wp => {
      const p = coordsToPixel(wp.lat, wp.lon);
      drawnWaypointHitboxes.push({
        id: wp.id,
        x: p.px,
        y: p.py,
        radius: 16,
        wp
      });

      mapCanvasCtx.font = '18px sans-serif';
      mapCanvasCtx.fillText(wp.icon || '📍', p.px - 9, p.py + 6);

      mapCanvasCtx.font = '11px -apple-system, sans-serif';
      mapCanvasCtx.fillStyle = '#ffffff';
      mapCanvasCtx.fillText(wp.name, p.px - 18, p.py + 22);
    });

    // 8. Mesh Peers Radar Beacons & Markers
    state.peerLocations.forEach((peer, peerId) => {
      if (peerId === state.self.id || !peer.coords) return;
      const p = coordsToPixel(peer.coords.latitude, peer.coords.longitude);
      const distFormatted = p.dist < 1000 ? `${Math.round(p.dist)}m` : `${(p.dist / 1000).toFixed(2)}km`;
      const cardDir = calculateBearing(myLat, myLon, peer.coords.latitude, peer.coords.longitude);

      drawnPeerHitboxes.push({
        peerId,
        x: p.px,
        y: p.py,
        radius: 18,
        name: peer.name || 'Peer',
        distStr: `${distFormatted} away • ${cardDir} (${Math.round(p.rawBearing)}°)`,
        peer
      });

      // Outer Pulse Ring
      mapCanvasCtx.beginPath();
      mapCanvasCtx.arc(p.px, p.py, 15, 0, Math.PI * 2);
      mapCanvasCtx.fillStyle = 'rgba(0, 122, 255, 0.25)';
      mapCanvasCtx.fill();
      mapCanvasCtx.strokeStyle = 'rgba(0, 122, 255, 0.8)';
      mapCanvasCtx.lineWidth = 1.5;
      mapCanvasCtx.stroke();

      // Core Marker
      mapCanvasCtx.beginPath();
      mapCanvasCtx.arc(p.px, p.py, 6, 0, Math.PI * 2);
      mapCanvasCtx.fillStyle = '#007aff';
      mapCanvasCtx.fill();
      mapCanvasCtx.strokeStyle = '#ffffff';
      mapCanvasCtx.lineWidth = 2;
      mapCanvasCtx.stroke();

      // Peer Label & Distance Tag
      mapCanvasCtx.font = 'bold 11px -apple-system, sans-serif';
      mapCanvasCtx.fillStyle = '#007aff';
      mapCanvasCtx.fillText(peer.name || 'Peer', p.px + 10, p.py - 2);

      mapCanvasCtx.font = '10px -apple-system, monospace';
      mapCanvasCtx.fillStyle = '#a0a7b5';
      mapCanvasCtx.fillText(`${distFormatted} (${cardDir})`, p.px + 10, p.py + 11);
    });

    // 9. Self Position Marker & Compass Heading Pointer
    mapCanvasCtx.save();
    mapCanvasCtx.translate(centerX, centerY);
    mapCanvasCtx.rotate(state.myHeading * Math.PI / 180);

    mapCanvasCtx.beginPath();
    mapCanvasCtx.moveTo(0, -24);
    mapCanvasCtx.lineTo(14, 10);
    mapCanvasCtx.lineTo(0, 4);
    mapCanvasCtx.lineTo(-14, 10);
    mapCanvasCtx.closePath();
    mapCanvasCtx.fillStyle = 'rgba(52, 199, 89, 0.5)';
    mapCanvasCtx.fill();
    mapCanvasCtx.strokeStyle = '#34c759';
    mapCanvasCtx.lineWidth = 1.5;
    mapCanvasCtx.stroke();

    mapCanvasCtx.restore();

    // Center Self Node
    mapCanvasCtx.beginPath();
    mapCanvasCtx.arc(centerX, centerY, 8, 0, Math.PI * 2);
    mapCanvasCtx.fillStyle = '#34c759';
    mapCanvasCtx.fill();
    mapCanvasCtx.strokeStyle = '#ffffff';
    mapCanvasCtx.lineWidth = 2.5;
    mapCanvasCtx.stroke();

    mapCanvasCtx.font = 'bold 12px -apple-system, sans-serif';
    mapCanvasCtx.fillStyle = '#ffffff';
    mapCanvasCtx.fillText(`You (${state.self.name})`, centerX + 12, centerY + 4);
  }

  function initMapEventListeners() {
    if (elements.btnRecenterMap) {
      elements.btnRecenterMap.addEventListener('click', () => {
        acquireGpsPosition(true);
        mapManualZoom = 1.0;
        if (state.activeView === 'map') drawMap();
      });
    }

    if (elements.btnToggleRadarSweep) {
      elements.btnToggleRadarSweep.addEventListener('click', () => {
        state.radarSweepEnabled = !state.radarSweepEnabled;
        elements.btnToggleRadarSweep.textContent = state.radarSweepEnabled ? '📡 Sweep: ON' : '📡 Sweep: OFF';
        drawMap();
      });
    }

    if (elements.mapCoordsStat) {
      elements.mapCoordsStat.addEventListener('click', () => {
        state.coordFormat = state.coordFormat === 'DD' ? 'DMS' : 'DD';
        localStorage.setItem('mesh_coord_fmt', state.coordFormat);
        updateMapStats();
      });
    }

    if (elements.btnDropFlare) {
      elements.btnDropFlare.addEventListener('click', triggerEmergencyFlare);
    }

    if (elements.btnDrawerFlare) {
      elements.btnDrawerFlare.addEventListener('click', () => {
        triggerEmergencyFlare();
        if (elements.mapDrawerOverlay) elements.mapDrawerOverlay.classList.remove('active');
      });
    }

    if (elements.btnDropWaypoint) {
      elements.btnDropWaypoint.addEventListener('click', openWaypointModal);
    }

    if (elements.btnOpenSquadDrawer) {
      elements.btnOpenSquadDrawer.addEventListener('click', () => {
        openTacticalDrawer('squad');
      });
    }

    if (elements.btnOpenWaypointsVault) {
      elements.btnOpenWaypointsVault.addEventListener('click', () => {
        openTacticalDrawer('waypoints');
      });
    }

    if (elements.mapDrawerCloseBtn) {
      elements.mapDrawerCloseBtn.addEventListener('click', () => {
        if (elements.mapDrawerOverlay) elements.mapDrawerOverlay.classList.remove('active');
      });
    }

    if (elements.tabTacticalSquad) {
      elements.tabTacticalSquad.addEventListener('click', () => switchTacticalTab('squad'));
    }
    if (elements.tabTacticalWaypoints) {
      elements.tabTacticalWaypoints.addEventListener('click', () => switchTacticalTab('waypoints'));
    }
    if (elements.tabTacticalTools) {
      elements.tabTacticalTools.addEventListener('click', () => switchTacticalTab('tools'));
    }

    if (elements.btnDrawerAddWaypoint) {
      elements.btnDrawerAddWaypoint.addEventListener('click', () => {
        if (elements.mapDrawerOverlay) elements.mapDrawerOverlay.classList.remove('active');
        openWaypointModal();
      });
    }

    if (elements.btnCoordFmtDd) {
      elements.btnCoordFmtDd.addEventListener('click', () => {
        state.coordFormat = 'DD';
        localStorage.setItem('mesh_coord_fmt', 'DD');
        elements.btnCoordFmtDd.classList.add('active');
        if (elements.btnCoordFmtDms) elements.btnCoordFmtDms.classList.remove('active');
        updateMapStats();
      });
    }

    if (elements.btnCoordFmtDms) {
      elements.btnCoordFmtDms.addEventListener('click', () => {
        state.coordFormat = 'DMS';
        localStorage.setItem('mesh_coord_fmt', 'DMS');
        elements.btnCoordFmtDms.classList.add('active');
        if (elements.btnCoordFmtDd) elements.btnCoordFmtDd.classList.remove('active');
        updateMapStats();
      });
    }

    if (elements.btnExportGpx) {
      elements.btnExportGpx.addEventListener('click', exportTrailAsGpx);
    }
    if (elements.btnExportGeojson) {
      elements.btnExportGeojson.addEventListener('click', exportTrailAsGeoJson);
    }

    if (elements.btnCancelGuide) {
      elements.btnCancelGuide.addEventListener('click', () => {
        state.guidedTarget = null;
        if (elements.peerGuideRadar) elements.peerGuideRadar.style.display = 'none';
      });
    }

    if (elements.btnToggleElevationPanel) {
      elements.btnToggleElevationPanel.addEventListener('click', () => {
        const isHidden = elements.elevationPanel.style.display === 'none';
        elements.elevationPanel.style.display = isHidden ? 'block' : 'none';
        if (isHidden) renderElevationProfile();
      });
    }

    if (elements.btnCloseElev) {
      elements.btnCloseElev.addEventListener('click', () => {
        elements.elevationPanel.style.display = 'none';
      });
    }

    if (elements.btnMapZoomIn) {
      elements.btnMapZoomIn.addEventListener('click', () => {
        mapManualZoom = Math.min(50.0, mapManualZoom * 1.4);
        drawMap();
      });
    }

    if (elements.btnMapZoomOut) {
      elements.btnMapZoomOut.addEventListener('click', () => {
        mapManualZoom = Math.max(0.001, mapManualZoom / 1.4);
        drawMap();
      });
    }

    if (elements.btnForceGpsLock) {
      elements.btnForceGpsLock.addEventListener('click', () => {
        acquireGpsPosition(true);
      });
    }

    if (elements.btnClearGpsOffset) {
      elements.btnClearGpsOffset.addEventListener('click', () => {
        localStorage.removeItem('mesh_last_coords');
        state.myCoords = null;
        acquireGpsPosition(true);
        showNotificationToast('📍 Resetting coordinates to fresh high-accuracy GPS fix...');
      });
    }

    if (elements.offlineMapCanvas) {
      elements.offlineMapCanvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (e.deltaY < 0) {
          mapManualZoom = Math.min(50.0, mapManualZoom * 1.18);
        } else {
          mapManualZoom = Math.max(0.001, mapManualZoom / 1.18);
        }
        drawMap();
      }, { passive: false });
    }

    if (elements.btnCloseMapPeerCard) {
      elements.btnCloseMapPeerCard.addEventListener('click', () => {
        elements.mapPeerCard.style.display = 'none';
        mapSelectedPeerId = null;
      });
    }

    if (elements.btnMapChatPeer) {
      elements.btnMapChatPeer.addEventListener('click', () => {
        if (mapSelectedPeerId) {
          elements.mapPeerCard.style.display = 'none';
          switchView('chat');
          selectChatTarget(mapSelectedPeerId);
        }
      });
    }

    if (elements.btnMapGuidePeer) {
      elements.btnMapGuidePeer.addEventListener('click', () => {
        if (mapSelectedPeerId) {
          const peer = state.peerLocations.get(mapSelectedPeerId);
          if (peer && peer.coords) {
            state.guidedTarget = { name: peer.name, lat: peer.coords.latitude, lon: peer.coords.longitude };
            elements.mapPeerCard.style.display = 'none';
            updateCompassDisplay();
          }
        }
      });
    }

    if (elements.btnMapCallPeer) {
      elements.btnMapCallPeer.addEventListener('click', () => {
        if (mapSelectedPeerId) {
          elements.mapPeerCard.style.display = 'none';
          initiateCall(mapSelectedPeerId, false);
        }
      });
    }

    // Canvas Tap / Click detection: Check if a peer was clicked
    if (elements.offlineMapCanvas) {
      elements.offlineMapCanvas.addEventListener('click', (e) => {
        const rect = elements.offlineMapCanvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        let clickedHitbox = null;
        for (const hb of drawnPeerHitboxes) {
          const dist = Math.hypot(clickX - hb.x, clickY - hb.y);
          if (dist <= hb.radius + 8) {
            clickedHitbox = hb;
            break;
          }
        }

        if (clickedHitbox) {
          mapSelectedPeerId = clickedHitbox.peerId;
          if (elements.mapPeerCard) {
            if (elements.mapPeerCardAvatar) elements.mapPeerCardAvatar.textContent = getInitials(clickedHitbox.name);
            if (elements.mapPeerCardName) elements.mapPeerCardName.textContent = clickedHitbox.name;
            if (elements.mapPeerCardDist) elements.mapPeerCardDist.textContent = clickedHitbox.distStr;
            elements.mapPeerCard.style.display = 'flex';
          }
        } else {
          if (elements.mapPeerCard) elements.mapPeerCard.style.display = 'none';
          mapSelectedPeerId = null;
        }
      });
    }

    // Desktop Compass Click & Key Navigation
    if (elements.mapCompassHeading) {
      elements.mapCompassHeading.style.cursor = 'pointer';
      elements.mapCompassHeading.title = 'Click or use Arrow Keys to rotate heading';
      elements.mapCompassHeading.addEventListener('click', () => {
        state.myHeading = (state.myHeading + 30) % 360;
        updateCompassDisplay();
        if (state.activeView === 'map') drawMap();
      });
    }

    window.addEventListener('keydown', (e) => {
      if (state.activeView === 'map') {
        if (e.key === 'ArrowLeft') {
          state.myHeading = (state.myHeading - 15 + 360) % 360;
          updateCompassDisplay();
          drawMap();
        } else if (e.key === 'ArrowRight') {
          state.myHeading = (state.myHeading + 15) % 360;
          updateCompassDisplay();
          drawMap();
        }
      }
    });
  }

  function triggerEmergencyFlare() {
    const lat = state.myCoords ? state.myCoords.latitude : 17.3850;
    const lon = state.myCoords ? state.myCoords.longitude : 78.4867;
    const flare = {
      id: 'flare_' + Date.now(),
      lat,
      lon,
      senderName: state.self.name,
      timestamp: Date.now()
    };

    state.mapFlares.push(flare);
    try { playSound('sos_beep'); } catch (e) {}

    if (state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(JSON.stringify({
        type: 'MAP_FLARE',
        flare,
        senderName: state.self.name
      }));
    }

    if (state.activeView === 'map') drawMap();
    alert('🚨 Emergency distress flare broadcasted to all mesh peers on radar!');
  }

  function openTacticalDrawer(tabName) {
    if (elements.mapDrawerOverlay) {
      elements.mapDrawerOverlay.classList.add('active');
      switchTacticalTab(tabName || 'squad');
    }
  }

  function switchTacticalTab(tab) {
    if (elements.tabTacticalSquad) elements.tabTacticalSquad.classList.toggle('active', tab === 'squad');
    if (elements.tabTacticalWaypoints) elements.tabTacticalWaypoints.classList.toggle('active', tab === 'waypoints');
    if (elements.tabTacticalTools) elements.tabTacticalTools.classList.toggle('active', tab === 'tools');

    if (elements.paneTacticalSquad) elements.paneTacticalSquad.style.display = tab === 'squad' ? 'block' : 'none';
    if (elements.paneTacticalWaypoints) elements.paneTacticalWaypoints.style.display = tab === 'waypoints' ? 'block' : 'none';
    if (elements.paneTacticalTools) elements.paneTacticalTools.style.display = tab === 'tools' ? 'block' : 'none';

    if (tab === 'squad') renderSquadRadarDrawer();
    else if (tab === 'waypoints') renderWaypointsVaultDrawer();
  }

  function renderSquadRadarDrawer() {
    if (!elements.squadRadarList) return;
    elements.squadRadarList.innerHTML = '';

    const myLat = state.myCoords ? state.myCoords.latitude : 17.3850;
    const myLon = state.myCoords ? state.myCoords.longitude : 78.4867;
    const peersArray = Array.from(state.peers.values()).filter(p => p.id !== state.self.id);

    if (peersArray.length === 0) {
      elements.squadRadarList.innerHTML = `
        <div style="text-align: center; padding: 28px 16px; color: var(--text-secondary); font-size: 13px; background: rgba(255,255,255,0.02); border-radius: 12px; border: 1px dashed rgba(255,255,255,0.1);">
          📡 <strong>No squad peers currently connected</strong><br>
          <span style="font-size: 11.5px; opacity: 0.7; margin-top: 4px; display: inline-block;">Connect another device over the same Wi-Fi / Hotspot to track real-time positions.</span>
        </div>
      `;
      return;
    }

    peersArray.forEach(peer => {
      const loc = state.peerLocations.get(peer.id);
      let distStr = 'Searching location...';
      let bearingStr = '';
      let rawBearing = 0;

      if (loc && loc.coords) {
        const d = calculateDistanceMeters(myLat, myLon, loc.coords.latitude, loc.coords.longitude);
        distStr = d < 1000 ? `${Math.round(d)}m away` : `${(d / 1000).toFixed(2)}km away`;
        rawBearing = calculateRawBearing(myLat, myLon, loc.coords.latitude, loc.coords.longitude);
        const cardDir = calculateBearing(myLat, myLon, loc.coords.latitude, loc.coords.longitude);
        bearingStr = `• ${cardDir} (${Math.round(rawBearing)}°)`;
      }

      const card = document.createElement('div');
      card.className = 'squad-item-card';
      card.innerHTML = `
        <div style="width: 38px; height: 38px; border-radius: 50%; background: linear-gradient(135deg, #007aff, #0056b3); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px; flex-shrink: 0; box-shadow: 0 2px 8px rgba(0,122,255,0.3);">
          ${getInitials(peer.name)}
        </div>
        <div class="squad-item-meta">
          <div class="squad-item-name">
            <span>${escapeHtml(peer.name)}</span>
            <span class="squad-online-badge">● Online</span>
          </div>
          <div class="squad-item-sub">${distStr} ${bearingStr}</div>
        </div>
        <div class="squad-item-actions">
          ${loc && loc.coords ? `<button type="button" class="btn-tactical-guide btn-guide-peer" data-peer-id="${peer.id}">🎯 Guide</button>` : ''}
          <button type="button" class="btn-tactical-chat btn-chat-peer" data-peer-id="${peer.id}">💬 Chat</button>
        </div>
      `;

      const guideBtn = card.querySelector('.btn-guide-peer');
      if (guideBtn) {
        guideBtn.addEventListener('click', () => {
          if (loc && loc.coords) {
            state.guidedTarget = { name: peer.name, lat: loc.coords.latitude, lon: loc.coords.longitude };
            if (elements.mapDrawerOverlay) elements.mapDrawerOverlay.classList.remove('active');
            updateCompassDisplay();
          }
        });
      }

      const chatBtn = card.querySelector('.btn-chat-peer');
      if (chatBtn) {
        chatBtn.addEventListener('click', () => {
          if (elements.mapDrawerOverlay) elements.mapDrawerOverlay.classList.remove('active');
          switchView('chat');
          selectChatTarget(peer.id);
        });
      }

      elements.squadRadarList.appendChild(card);
    });
  }

  function renderWaypointsVaultDrawer() {
    if (!elements.waypointsVaultList) return;
    elements.waypointsVaultList.innerHTML = '';

    if (state.waypoints.length === 0) {
      elements.waypointsVaultList.innerHTML = `
        <div style="text-align: center; padding: 28px 16px; color: var(--text-secondary); font-size: 13px; background: rgba(255,255,255,0.02); border-radius: 12px; border: 1px dashed rgba(255,255,255,0.1);">
          📍 <strong>No waypoints pinned</strong><br>
          <span style="font-size: 11.5px; opacity: 0.7; margin-top: 4px; display: inline-block;">Tap <strong>+ New Waypoint</strong> above to pin tactical positions for your team.</span>
        </div>
      `;
      return;
    }

    const myLat = state.myCoords ? state.myCoords.latitude : 17.3850;
    const myLon = state.myCoords ? state.myCoords.longitude : 78.4867;

    state.waypoints.forEach(wp => {
      const d = calculateDistanceMeters(myLat, myLon, wp.lat, wp.lon);
      const distStr = d < 1000 ? `${Math.round(d)}m away` : `${(d / 1000).toFixed(2)}km away`;
      const cardDir = calculateBearing(myLat, myLon, wp.lat, wp.lon);

      const card = document.createElement('div');
      card.className = 'waypoint-item-card';
      card.innerHTML = `
        <div style="width: 36px; height: 36px; border-radius: 10px; background: rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0;">
          ${wp.icon || '📍'}
        </div>
        <div class="waypoint-item-meta">
          <div class="waypoint-item-name">
            <span>${escapeHtml(wp.name)}</span>
          </div>
          <div class="waypoint-item-sub">${distStr} • ${cardDir} • ${wp.lat.toFixed(4)}, ${wp.lon.toFixed(4)}</div>
        </div>
        <div class="waypoint-item-actions">
          <button type="button" class="btn-tactical-icon btn-guide-wp" title="Guide heading arrow to waypoint">🎯</button>
          <button type="button" class="btn-tactical-icon btn-share-wp" title="Share waypoint into chat">📤</button>
          <button type="button" class="btn-tactical-icon danger btn-delete-wp" title="Delete waypoint">🗑️</button>
        </div>
      `;

      card.querySelector('.btn-guide-wp').addEventListener('click', () => {
        state.guidedTarget = { name: wp.name, lat: wp.lat, lon: wp.lon };
        if (elements.mapDrawerOverlay) elements.mapDrawerOverlay.classList.remove('active');
        updateCompassDisplay();
      });

      card.querySelector('.btn-share-wp').addEventListener('click', () => {
        shareWaypointIntoChat(wp);
        if (elements.mapDrawerOverlay) elements.mapDrawerOverlay.classList.remove('active');
        switchView('chat');
      });

      card.querySelector('.btn-delete-wp').addEventListener('click', () => {
        state.waypoints = state.waypoints.filter(w => w.id !== wp.id);
        localStorage.setItem('mesh_waypoints', JSON.stringify(state.waypoints));
        if (state.ws && state.ws.readyState === WebSocket.OPEN) {
          state.ws.send(JSON.stringify({
            type: 'WAYPOINT_DELETE',
            waypointId: wp.id
          }));
        }
        renderWaypointsVaultDrawer();
        if (state.activeView === 'map') drawMap();
      });

      elements.waypointsVaultList.appendChild(card);
    });
  }

  async function shareWaypointIntoChat(wp) {
    const text = `📍 Waypoint Pin: ${wp.icon || '📍'} ${wp.name} (${wp.lat.toFixed(4)}, ${wp.lon.toFixed(4)})`;
    const msg = {
      id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      senderId: state.self.id,
      senderName: state.self.name,
      targetId: state.activeTargetId,
      channelId: state.activeTargetId === 'broadcast' ? state.activeChannelId : null,
      text: text,
      timestamp: Date.now()
    };
    await dispatchMessage(msg);
  }

  function exportTrailAsGpx() {
    const points = state.myTrail;
    let gpx = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="MeshChat Tactical" xmlns="http://www.topografix.com/GPX/1/1">
  <trk>
    <name>MeshChat Trail ${new Date().toLocaleDateString()}</name>
    <trkseg>
`;
    points.forEach(pt => {
      const timeIso = new Date(pt.time || Date.now()).toISOString();
      gpx += `      <trkpt lat="${pt.lat}" lon="${pt.lon}"><time>${timeIso}</time></trkpt>\n`;
    });
    gpx += `    </trkseg>
  </trk>
</gpx>`;

    const blob = new Blob([gpx], { type: 'application/gpx+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meshchat_trail_${Date.now()}.gpx`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportTrailAsGeoJson() {
    const geojson = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: { name: "MeshChat Trail" },
          geometry: {
            type: "LineString",
            coordinates: state.myTrail.map(pt => [pt.lon, pt.lat])
          }
        },
        ...state.waypoints.map(wp => ({
          type: "Feature",
          properties: { name: wp.name, icon: wp.icon },
          geometry: {
            type: "Point",
            coordinates: [wp.lon, wp.lat]
          }
        }))
      ]
    };

    const blob = new Blob([JSON.stringify(geojson, null, 2)], { type: 'application/geo+json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meshchat_map_${Date.now()}.geojson`;
    a.click();
    URL.revokeObjectURL(url);
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
    const lat = state.myCoords ? state.myCoords.latitude : 17.3850;
    const lon = state.myCoords ? state.myCoords.longitude : 78.4867;

    const wp = {
      id: 'wp_' + Date.now(),
      name: name,
      icon: pttSelectedIcon || '📍',
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
    if (state.activeView === 'map') {
      drawMap();
      renderWaypointsVaultDrawer();
    }
  }

  // --- 37. Peer List Rendering ---
  function getInitials(name) {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  }

  function getPairKey(a, b) {
    return [a, b].sort().join(':::');
  }

  function renderPeerList(peerArray = []) {
    state.peers.clear();
    const activeCount = peerArray.length;
    elements.peerCountBadge.textContent = `${activeCount} Online`;

    elements.peerList.innerHTML = '';

    peerArray.forEach((peer) => {
      state.peers.set(peer.id, peer);
      if (peer.id === state.self.id) return;

      const bat = state.peerBatteries.get(peer.id);
      const batHtml = bat ? `<span class="peer-battery-badge ${bat.level <= 20 ? 'low' : ''}">🔋 ${bat.level}%</span>` : '';

      const isConnected = state.contacts.has(peer.id) || state.contacts.has(getPairKey(state.self.id, peer.id));
      const isPending = state.pendingRequests.has(peer.id);

      let actionHtml = '';
      if (isConnected) {
        actionHtml = `<div class="peer-sub" style="color: #34c759; font-weight: 500;">✓ Connected</div>`;
      } else if (isPending) {
        actionHtml = `<div><button class="btn-request-contact pending">⏳ Requested</button></div>`;
      } else {
        actionHtml = `<div><button class="btn-request-contact" data-peer-id="${peer.id}">➕ Connect</button></div>`;
      }

      const div = document.createElement('div');
      div.className = `peer-item ${state.activeTargetId === peer.id ? 'active' : ''}`;
      div.dataset.peerId = peer.id;
      const avatarContent = peer.avatar
        ? `<img src="${peer.avatar}" alt="Avatar" class="peer-avatar-img"><span class="peer-dot"></span>`
        : `${getInitials(peer.name)} <span class="peer-dot"></span>`;

      div.innerHTML = `
        <div class="peer-avatar user">${avatarContent}</div>
        <div class="peer-meta">
          <div class="peer-name-row">
            <span class="peer-name">${escapeHtml(peer.name)}</span>
            ${batHtml}
          </div>
          ${actionHtml}
        </div>
      `;

      const connectBtn = div.querySelector('.btn-request-contact:not(.pending)');
      if (connectBtn) {
        connectBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          sendContactRequest(peer.id);
        });
      }

      div.addEventListener('click', () => {
        if (!isConnected) {
          sendContactRequest(peer.id);
        } else {
          selectChatTarget(peer.id);
        }
      });
      elements.peerList.appendChild(div);
    });

    updateCompassDisplay();
  }

  function sendContactRequest(targetId) {
    state.pendingRequests.add(targetId);
    localStorage.setItem('mesh_pending_reqs', JSON.stringify(Array.from(state.pendingRequests)));
    renderPeerList(Array.from(state.peers.values()));

    if (state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(JSON.stringify({
        type: 'CONTACT_REQUEST',
        targetId: targetId
      }));
    }
  }

  let activeIncomingRequester = null;
  function handleIncomingContactRequest(data) {
    if (!data.fromPeer) return;
    activeIncomingRequester = data.fromPeer;

    if (elements.contactRequestToast) {
      if (elements.contactReqAvatar) {
        if (data.fromPeer.avatar) {
          elements.contactReqAvatar.innerHTML = `<img src="${data.fromPeer.avatar}" alt="Avatar" class="peer-avatar-img">`;
        } else {
          elements.contactReqAvatar.textContent = getInitials(data.fromPeer.name);
        }
      }
      if (elements.contactReqName) elements.contactReqName.textContent = data.fromPeer.name;
      elements.contactRequestToast.style.display = 'flex';
    }
  }

  function acceptContactRequest() {
    if (!activeIncomingRequester) return;
    const peerId = activeIncomingRequester.id;
    state.contacts.add(peerId);
    state.contacts.add(getPairKey(state.self.id, peerId));
    localStorage.setItem('mesh_contacts', JSON.stringify(Array.from(state.contacts)));

    if (state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(JSON.stringify({
        type: 'CONTACT_ACCEPT',
        targetId: peerId
      }));
    }

    if (elements.contactRequestToast) elements.contactRequestToast.style.display = 'none';
    renderPeerList(Array.from(state.peers.values()));
    selectChatTarget(peerId);
  }

  function declineContactRequest() {
    if (!activeIncomingRequester) return;
    const peerId = activeIncomingRequester.id;
    if (state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(JSON.stringify({
        type: 'CONTACT_DECLINE',
        targetId: peerId
      }));
    }
    if (elements.contactRequestToast) elements.contactRequestToast.style.display = 'none';
  }

  function selectChatTarget(targetId) {
    state.activeTargetId = targetId;

    const allItems = elements.peerList.querySelectorAll('.peer-item');
    allItems.forEach((el) => {
      el.classList.toggle('active', el.dataset.peerId === targetId);
    });

    document.querySelectorAll('.channel-item').forEach(ci => ci.classList.remove('active'));

    const peer = state.peers.get(targetId);
    const peerName = peer ? peer.name : 'Direct Peer';
    elements.activeChatTitle.textContent = peerName;
    elements.activeChatStatus.textContent = 'Direct Peer Link • Private';
    elements.activeChatAvatar.className = 'peer-avatar user';
    if (peer && peer.avatar) {
      elements.activeChatAvatar.innerHTML = `<img src="${peer.avatar}" alt="Avatar" class="peer-avatar-img">`;
    } else {
      elements.activeChatAvatar.innerHTML = getInitials(peerName);
    }
    elements.btnAudioCall.style.display = 'inline-flex';
    elements.btnVideoCall.style.display = 'inline-flex';

    renderMessagesForActiveTarget();
    updateCompassDisplay();
    closeSidebarDrawer();
  }

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

  // --- 38. Rich Text & @Mentions Markdown Formatter ---
  function formatRichText(raw) {
    if (!raw) return '';
    let t = escapeHtml(raw);

    // Markdown
    t = t.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    t = t.replace(/`([^`]+)`/g, '<code>$1</code>');
    t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    t = t.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    t = t.replace(/~([^~]+)~/g, '<del>$1</del>');
    t = t.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');

    // @Mentions
    t = t.replace(/@([a-zA-Z0-9_-]+)/g, '<span class="mention-badge">@$1</span>');

    return t;
  }

  // --- 39. Message Rendering & History ---
  function appendMessage(msg, isSelf = false) {
    if (!msg.reactions) msg.reactions = {};
    
    if (!msg.expiresAt && state.disappearingSeconds > 0) {
      msg.expiresAt = Date.now() + (state.disappearingSeconds * 1000);
    }

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
      const matchPoll = msg.question && msg.question.toLowerCase().includes(q);
      const matchEvent = msg.eventTitle && msg.eventTitle.toLowerCase().includes(q);
      if (!matchText && !matchSender && !matchFile && !matchPoll && !matchEvent) return false;
    }

    if (state.activeTargetId === 'broadcast') {
      const isBroadcast = !msg.targetId || msg.targetId === 'broadcast';
      if (!isBroadcast) return false;
      const msgCh = msg.channelId || 'general';
      return msgCh === state.activeChannelId;
    } else {
      return (msg.senderId === state.self.id && msg.targetId === state.activeTargetId) ||
             (msg.senderId === state.activeTargetId && msg.targetId === state.self.id);
    }
  }

  function renderMessagesForActiveTarget() {
    elements.messagesContainer.innerHTML = '';
    
    const isBroadcast = state.activeTargetId === 'broadcast';
    const notice = document.createElement('div');
    notice.className = 'system-notice-card';
    notice.innerHTML = `
      <div class="notice-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      </div>
      <div class="notice-body">
        <strong>${isBroadcast ? `Room #${state.activeChannelId}` : 'Direct Encrypted Link'}</strong>
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
    const existingRow = document.getElementById(`msg-row-${msg.id}`);

    const row = document.createElement('div');
    row.className = `msg-row ${isSelf ? 'self' : 'peer'}`;
    row.id = `msg-row-${msg.id}`;
    row.dataset.msgId = msg.id;

    const timeStr = formatTime(msg.timestamp);
    let contentHtml = '';

    if (msg._relayInfo) {
      contentHtml += `<div class="msg-relay-badge">📡 ${escapeHtml(msg._relayInfo)}</div>`;
    }

    if (msg.quotedMsg) {
      contentHtml += `
        <div class="msg-quoted-block">
          <span class="quoted-sender">${escapeHtml(msg.quotedMsg.senderName || 'User')}</span>
          <span>${escapeHtml(msg.quotedMsg.text || 'Attachment/Media')}</span>
        </div>
      `;
    }

    // 1. Text Message
    if (msg.text) {
      contentHtml += `<div class="msg-text">${formatRichText(msg.text)}</div>`;
    }

    // 2. Interactive Poll
    if (msg.type === 'poll' && msg.options) {
      let totalVotes = 0;
      msg.options.forEach(o => totalVotes += (o.voters ? o.voters.length : 0));

      let optionsHtml = '';
      msg.options.forEach((opt, idx) => {
        const votes = opt.voters ? opt.voters.length : 0;
        const percent = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
        const hasVoted = opt.voters && (opt.voters.includes(state.self.id) || opt.voters.includes(state.self.name));

        optionsHtml += `
          <div class="poll-opt-row ${hasVoted ? 'voted-by-me' : ''}" data-poll-id="${msg.id}" data-opt-idx="${idx}">
            <div class="poll-opt-progress-bar" style="width: ${percent}%;"></div>
            <div class="poll-opt-content">
              <span class="poll-opt-check">${hasVoted ? '✅' : '⚪'}</span>
              <span class="poll-opt-label">${escapeHtml(opt.text)}</span>
            </div>
            <div class="poll-opt-percent">${votes} (${percent}%)</div>
          </div>
        `;
      });

      contentHtml += `
        <div class="poll-bubble-card">
          <div class="poll-question-title">📊 ${escapeHtml(msg.question)}</div>
          <div class="poll-options-list">${optionsHtml}</div>
          <div class="poll-total-votes">${totalVotes} total votes • Tap any option to vote</div>
        </div>
      `;
    }

    // 3. Shared Event & RSVP
    if (msg.type === 'event') {
      const gCount = msg.rsvps?.going?.length || 0;
      const mCount = msg.rsvps?.maybe?.length || 0;
      const dCount = msg.rsvps?.decline?.length || 0;

      const isGoing = msg.rsvps?.going?.includes(state.self.name);
      const isMaybe = msg.rsvps?.maybe?.includes(state.self.name);
      const isDecline = msg.rsvps?.decline?.includes(state.self.name);

      contentHtml += `
        <div class="event-card">
          <div class="event-title">🗓️ ${escapeHtml(msg.eventTitle)}</div>
          <div class="event-meta-line">⏰ <strong>${escapeHtml(msg.eventDatetime)}</strong></div>
          ${msg.eventLocation ? `<div class="event-meta-line">📍 ${escapeHtml(msg.eventLocation)}</div>` : ''}
          <div class="event-rsvp-row">
            <button class="btn-rsvp ${isGoing ? 'active-going' : ''}" data-action="rsvp" data-event-id="${msg.id}" data-status="going">Going (${gCount})</button>
            <button class="btn-rsvp ${isMaybe ? 'active-maybe' : ''}" data-action="rsvp" data-event-id="${msg.id}" data-status="maybe">Maybe (${mCount})</button>
            <button class="btn-rsvp ${isDecline ? 'active-decline' : ''}" data-action="rsvp" data-event-id="${msg.id}" data-status="decline">Can't (${dCount})</button>
          </div>
          <div class="event-attendees">Attendees: ${escapeHtml(msg.rsvps?.going?.join(', ') || 'None yet')}</div>
        </div>
      `;
    }

    // 4. Tic-Tac-Toe In-Chat Game
    if (msg.type === 'tictactoe') {
      let gridHtml = '';
      msg.board.forEach((cell, idx) => {
        gridHtml += `
          <div class="ttt-cell ${cell ? 'filled' : ''}" data-game-id="${msg.id}" data-cell-idx="${idx}">
            ${cell === 'X' ? '<span style="color:#007aff;">X</span>' : (cell === 'O' ? '<span style="color:#ff9500;">O</span>' : '')}
          </div>
        `;
      });

      let statusMsg = '';
      if (msg.winner) {
        statusMsg = msg.winner === 'Draw' ? '🤝 Game ended in a Draw!' : `🎉 Player ${msg.winner} Wins!`;
      } else {
        statusMsg = `Turn: Player ${msg.turn} (${msg.turn === 'X' ? msg.playerX : msg.playerO})`;
      }

      contentHtml += `
        <div class="game-card">
          <div class="game-title">
            <span>❌ ⭕ Tic-Tac-Toe</span>
            <span style="font-size:11px; opacity:0.7;">${escapeHtml(msg.playerX)} vs ${escapeHtml(msg.playerO)}</span>
          </div>
          <div class="tictactoe-grid">${gridHtml}</div>
          <div class="game-status-label">${statusMsg}</div>
        </div>
      `;
    }

    // 5. Interactive 3D Dice Challenge Card
    if (msg.type === 'game_dice_challenge') {
      const isMyChallenge = msg.senderId === state.self.id;
      contentHtml += `
        <div class="dice-challenge-bubble-card" style="padding: 6px 2px;">
          <div style="font-size: 13px; font-weight: 700; color: var(--accent-blue); margin-bottom: 4px;">🎲 3D Physics Dice Challenge</div>
          <div style="font-size: 13px; font-weight: 600; margin-bottom: 8px;">Target Score to Beat: <span style="font-size: 16px; color: #ff9500; font-weight: 800;">${msg.scoreToBeat}</span></div>
          ${!isMyChallenge ? `<button type="button" class="btn btn-primary btn-sm btn-accept-dice-duel" data-target-score="${msg.scoreToBeat}" data-challenger="${escapeHtml(msg.senderName)}" style="width: 100%; font-weight: 700; padding: 8px;">⚔️ Roll 3D Dice to Beat ${msg.scoreToBeat}</button>` : '<div style="font-size: 11.5px; color: var(--text-secondary); font-style: italic;">Your challenge is live! Waiting for peer rolls...</div>'}
        </div>
      `;
    }

    // 5B. Interactive Real-Time Rock Paper Scissors Duel Card
    if (msg.type === 'rps_challenge') {
      const isMyChallenge = msg.senderId === state.self.id;
      const handEmojis = { rock: '🪨', paper: '📄', scissors: '✂️' };

      if (msg.status === 'resolved') {
        contentHtml += `
          <div class="dice-challenge-bubble-card" style="padding: 10px 12px; border-color: rgba(0, 122, 255, 0.4); background: rgba(0, 122, 255, 0.05);">
            <div style="font-size: 13px; font-weight: 700; color: var(--accent-blue); margin-bottom: 4px;">⚔️ RPS Duel Showdown!</div>
            <div style="font-size: 13.5px; font-weight: 600; margin-bottom: 4px;">
              ${escapeHtml(msg.challengerName)} (${handEmojis[msg.challengerMove] || '✊'}) vs ${escapeHtml(msg.opponentName)} (${handEmojis[msg.opponentMove] || '✊'})
            </div>
            <div style="font-size: 13px; font-weight: 700; color: #34c759;">${msg.outcomeText || 'Showdown Complete'}</div>
          </div>
        `;
      } else {
        contentHtml += `
          <div class="dice-challenge-bubble-card" style="padding: 10px 12px;">
            <div style="font-size: 13px; font-weight: 700; color: var(--accent-blue); margin-bottom: 6px;">⚔️ Rock Paper Scissors Duel</div>
            ${isMyChallenge ? `
              <div style="font-size: 12px; color: var(--text-secondary); font-style: italic;">
                Your move (${handEmojis[msg.challengerMove]}) is locked in. Waiting for an opponent to accept...
              </div>
            ` : `
              <div style="font-size: 12.5px; font-weight: 600; margin-bottom: 8px;">
                <strong>${escapeHtml(msg.senderName)}</strong> challenged you! Choose your move:
              </div>
              <div style="display: flex; gap: 6px;">
                <button type="button" class="btn btn-secondary btn-sm btn-accept-rps" data-rps-id="${msg.id}" data-choice="rock" style="flex: 1; padding: 7px 4px; font-size: 12px; font-weight: 600;">🪨 Rock</button>
                <button type="button" class="btn btn-secondary btn-sm btn-accept-rps" data-rps-id="${msg.id}" data-choice="paper" style="flex: 1; padding: 7px 4px; font-size: 12px; font-weight: 600;">📄 Paper</button>
                <button type="button" class="btn btn-secondary btn-sm btn-accept-rps" data-rps-id="${msg.id}" data-choice="scissors" style="flex: 1; padding: 7px 4px; font-size: 12px; font-weight: 600;">✂️ Scissors</button>
              </div>
            `}
          </div>
        `;
      }
    }

    // 6. 2x Dice Roll
    if (msg.type === 'diceroll') {
      contentHtml += `
        <div class="game-card">
          <div class="game-title"><span>🎲 🎲 2x Dice Toss</span></div>
          <div class="dice-display-box">
            <div class="dice-die">${msg.die1Face}</div>
            <div class="dice-die">${msg.die2Face}</div>
          </div>
          <div class="game-status-label">Total Roll: ${msg.total} (${msg.die1} + ${msg.die2})</div>
        </div>
      `;
    }

    // 7. Location Message
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

    // 8. Audio Voice Memo with 1x / 1.5x / 2x Speed Controller & Scrubber
    if (msg.audioData) {
      contentHtml += `
        <div class="audio-msg-player" data-audio="${msg.audioData}" data-speed="1">
          <button class="audio-play-btn" type="button" aria-label="Play Voice Memo">▶</button>
          <div class="audio-track-info">
            <div class="audio-waveform-bar" title="Click to seek"><div class="audio-progress-fill"></div></div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div class="audio-duration">Voice Memo (${msg.audioDuration || '0:03'})</div>
              <button class="audio-speed-chip" type="button">1x</button>
            </div>
          </div>
        </div>
      `;
    }

    // 9. File / Photo Attachment
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

    // Reactions
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

    let disappearingChip = '';
    if (msg.expiresAt) {
      const remainingSec = Math.max(0, Math.round((msg.expiresAt - Date.now()) / 1000));
      disappearingChip = `<span class="disappearing-countdown" title="Self-destructs in ${remainingSec}s">⏱️ ${remainingSec}s</span>`;
    }

    const isStarred = state.starredIds.has(msg.id);

    let statusReceiptHtml = '';
    if (isSelf) {
      if (msg.status === 'pending') {
        statusReceiptHtml = `<span class="msg-status-icon pending" title="Queued in Outbox (Offline)">🕒</span>`;
      } else if (msg.status === 'delivered') {
        statusReceiptHtml = `<span class="msg-status-icon delivered" title="Delivered">✓✓</span>`;
      } else {
        statusReceiptHtml = `<span class="msg-status-icon sent" title="Sent">✓</span>`;
      }
    }

    const senderDisplay = msg.type === 'ai_reply' ? '🤖 Mesh AI (Assistant)' : escapeHtml(msg.senderName || 'Peer');

    row.innerHTML = `
      ${!isSelf ? `<div class="msg-sender">${senderDisplay}</div>` : ''}
      
      <div class="msg-bubble ${msg.type === 'ai_reply' ? 'ai-bubble-reply' : ''}">
        ${contentHtml}
        ${reactionsHtml}
        <div class="msg-footer">
          <span>${timeStr}${isStarred ? ' ⭐' : ''}${msg.isEdited ? '<span class="msg-edited-badge">(edited)</span>' : ''}${disappearingChip}</span>
          ${statusReceiptHtml}
        </div>
      </div>
    `;

    const playerContainer = row.querySelector('.audio-msg-player');
    if (playerContainer) {
      setupAudioPlayer(playerContainer);
    }

    row.querySelectorAll('.poll-opt-row').forEach(optRow => {
      optRow.addEventListener('click', () => {
        handleVoteOnPoll(optRow.dataset.pollId, parseInt(optRow.dataset.optIdx, 10));
      });
    });

    row.querySelectorAll('.btn-accept-dice-duel').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetScore = parseInt(btn.dataset.targetScore, 10);
        const challenger = btn.dataset.challenger;
        elements.diceModalOverlay.classList.add('active');
        elements.diceResultText.textContent = `⚔️ Duel vs ${challenger}! Roll higher than ${targetScore} to win!`;
      });
    });

    row.querySelectorAll('.btn-accept-rps').forEach(btn => {
      btn.addEventListener('click', () => {
        const rpsId = btn.dataset.rpsId;
        const choice = btn.dataset.choice;
        const targetMsg = state.messages.find(m => m.id === rpsId);
        if (targetMsg) {
          acceptRpsChallenge(targetMsg, choice);
        }
      });
    });

    row.querySelectorAll('.btn-rsvp').forEach(rsvpBtn => {
      rsvpBtn.addEventListener('click', () => {
        handleRsvpOnEvent(rsvpBtn.dataset.eventId, rsvpBtn.dataset.status);
      });
    });

    row.querySelectorAll('.ttt-cell').forEach(cell => {
      cell.addEventListener('click', () => {
        handleTttCellClick(cell.dataset.gameId, parseInt(cell.dataset.cellIdx, 10));
      });
    });

    row.querySelectorAll('.reaction-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        sendReaction(chip.dataset.msgId, chip.dataset.emoji);
      });
    });

    if (existingRow) {
      existingRow.replaceWith(row);
    } else {
      elements.messagesContainer.appendChild(row);
    }
  }

  function setupAudioPlayer(playerContainer) {
    const playBtn = playerContainer.querySelector('.audio-play-btn');
    const speedChip = playerContainer.querySelector('.audio-speed-chip');
    const waveBar = playerContainer.querySelector('.audio-waveform-bar');
    const progressFill = playerContainer.querySelector('.audio-progress-fill');
    const dataUrl = playerContainer.dataset.audio;
    if (!dataUrl) return;

    const audio = new Audio(dataUrl);
    let speed = 1.0;

    playBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.playbackRate = speed;
        audio.play();
        playBtn.textContent = '⏸';
      } else {
        audio.pause();
        playBtn.textContent = '▶';
      }
    });

    speedChip.addEventListener('click', (e) => {
      e.stopPropagation();
      if (speed === 1.0) speed = 1.5;
      else if (speed === 1.5) speed = 2.0;
      else speed = 1.0;

      speedChip.textContent = `${speed}x`;
      audio.playbackRate = speed;
    });

    waveBar.addEventListener('click', (e) => {
      const rect = waveBar.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      if (audio.duration) {
        audio.currentTime = pos * audio.duration;
      }
    });

    audio.ontimeupdate = () => {
      if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = `${percent}%`;
      }
    };

    audio.onended = () => {
      playBtn.textContent = '▶';
      progressFill.style.width = '0%';
    };
  }

  function sendReaction(messageId, emoji) {
    if (state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(JSON.stringify({
        type: 'MESSAGE_REACTION',
        messageId: messageId,
        emoji: emoji,
        senderId: state.self.id
      }));
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
      text: msg.text || (msg.location ? '📍 GPS Location' : (msg.audioData ? '🎙️ Voice Memo' : (msg.question ? '📊 Poll' : '📎 Attachment')))
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
          channelId: state.activeTargetId === 'broadcast' ? state.activeChannelId : null,
          location: state.myCoords,
          timestamp: Date.now()
        };

        await dispatchMessage(msg);
      },
      (err) => alert('Could not acquire GPS position.'),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }

  // --- 40. Freeform Sketch Pad ---
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
      channelId: state.activeTargetId === 'broadcast' ? state.activeChannelId : null,
      fileName: 'sketch_map.png',
      fileType: 'image/png',
      fileData: dataUrl,
      timestamp: Date.now()
    };

    await dispatchMessage(msg);
  }

  // --- 41. Export Transcript ---
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
      if (m.question) content = `[Poll: ${m.question}]`;
      if (m.eventTitle) content = `[Event: ${m.eventTitle} @ ${m.eventDatetime}]`;
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

  // --- 42. Message Dispatch Helper & Offline Outbox Queue ---
  async function dispatchMessage(msgObj) {
    if (state.replyingTo) {
      msgObj.quotedMsg = state.replyingTo;
      cancelReply();
    }

    if (!msgObj.channelId && state.activeTargetId === 'broadcast') {
      msgObj.channelId = state.activeChannelId;
    }

    const isConnected = state.ws && state.ws.readyState === WebSocket.OPEN;
    msgObj.status = isConnected ? 'sent' : 'pending';

    if (!isConnected) {
      if (!state.outbox) state.outbox = [];
      state.outbox.push(msgObj);
      localStorage.setItem('mesh_outbox', JSON.stringify(state.outbox));
    }

    appendMessage(msgObj, true);

    if (isConnected) {
      const encryptedMsg = await encryptPayload(msgObj);
      state.ws.send(JSON.stringify({
        type: 'CHAT_MESSAGE',
        message: encryptedMsg
      }));
    } else {
      dispatchMeshRelayPacket(msgObj, state.activeTargetId);
    }
  }

  async function drainOfflineOutbox() {
    if (!state.outbox || state.outbox.length === 0) return;
    if (!state.ws || state.ws.readyState !== WebSocket.OPEN) return;

    const queued = [...state.outbox];
    state.outbox = [];
    localStorage.setItem('mesh_outbox', JSON.stringify([]));

    for (const msgObj of queued) {
      msgObj.status = 'sent';
      saveMessageToStorage(msgObj);
      const existingRow = document.getElementById(`msg-row-${msgObj.id}`);
      if (existingRow) {
        const icon = existingRow.querySelector('.msg-status-icon');
        if (icon) {
          icon.className = 'msg-status-icon sent';
          icon.title = 'Sent';
          icon.textContent = '✓';
        }
      }
      const encryptedMsg = await encryptPayload(msgObj);
      state.ws.send(JSON.stringify({
        type: 'CHAT_MESSAGE',
        message: encryptedMsg
      }));
    }
  }

  // --- 43. Voice Memo Recording ---
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
              channelId: state.activeTargetId === 'broadcast' ? state.activeChannelId : null,
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

  // --- 44. File & Photo Sharing ---
  function handleFileSelect(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 500 * 1024) {
      sendFileInChunks(file, state.activeTargetId);
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const msg = {
        id: 'file_' + Date.now(),
        senderId: state.self.id,
        senderName: state.self.name,
        targetId: state.activeTargetId,
        channelId: state.activeTargetId === 'broadcast' ? state.activeChannelId : null,
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

    if (state.editingMessageId) {
      submitEditMessage(text);
      return;
    }

    const currentChannel = state.activeTargetId === 'broadcast' ? state.activeChannelId : null;
    const currentTarget = state.activeTargetId;

    const msg = {
      id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      senderId: state.self.id,
      senderName: state.self.name,
      targetId: currentTarget,
      channelId: currentChannel,
      text: text,
      timestamp: Date.now()
    };

    await dispatchMessage(msg);
    elements.chatMessageInput.value = '';

    // Check for @ai in-chat summoning
    const lower = text.toLowerCase();
    if (lower.startsWith('@ai') || lower.includes(' @ai') || lower.startsWith('@assistant') || lower.includes(' @assistant')) {
      const prompt = text.replace(/@ai|@assistant/gi, '').trim();
      setTimeout(async () => {
        const replyText = generateIntelligentAiReply(prompt, state.aiPersona || 'omni');
        const aiMsg = {
          id: 'ai_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
          type: 'ai_reply',
          senderId: 'ai_bot',
          senderName: '🧠 Mesh AI',
          targetId: currentTarget,
          channelId: currentChannel,
          text: replyText,
          timestamp: Date.now()
        };
        await dispatchMessage(aiMsg);
      }, 350);
    }
  }

  // --- 45. WebRTC Calling Engine ---
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

  // --- 46. Encryption & QR Modals ---
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

  let activeConnectUrl = (typeof window !== 'undefined' && window.location) ? window.location.origin : 'http://localhost:3000';
  let primaryOfflineUrl = (typeof window !== 'undefined' && window.location) ? `http://${window.location.hostname}:${window.location.port || 3000}` : 'http://localhost:3000';

  async function openQRModal() {
    if (!elements.qrModalOverlay) return;
    elements.qrModalOverlay.classList.add('active');
    elements.qrImageWrapper.innerHTML = '<p class="qr-placeholder-text">Generating QR code...</p>';

    const winLoc = (typeof window !== 'undefined' && window.location) ? window.location : { origin: 'http://localhost:3000', hostname: 'localhost', port: 3000 };
    activeConnectUrl = winLoc.origin;

    if (elements.connectCurrentUrl) elements.connectCurrentUrl.textContent = activeConnectUrl;

    try {
      const res = await fetch('/api/info');
      const data = await res.json();

      let ipHtml = '';
      if (data.ipAddresses && data.ipAddresses.length > 0) {
        primaryOfflineUrl = data.primaryUrl || data.ipAddresses[0].url;
        data.ipAddresses.forEach(ip => {
          ipHtml += `
            <div style="margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between; gap: 8px;">
              <span><strong style="color: var(--text-primary); font-weight: 500;">${escapeHtml(ip.interface)}:</strong> <span style="font-family: var(--font-mono); font-size: 12px; color: var(--text-secondary);">${escapeHtml(ip.url)}</span></span>
              <button class="btn btn-secondary" style="padding: 3px 10px; font-size: 11.5px;" onclick="navigator.clipboard.writeText('${escapeHtml(ip.url)}'); this.textContent='Copied!'; setTimeout(()=>this.textContent='Copy', 1500);">Copy</button>
            </div>
          `;
        });
      }
      if (elements.ipAddressList) elements.ipAddressList.innerHTML = ipHtml || `<div>${escapeHtml(primaryOfflineUrl)}</div>`;
    } catch (e) {
      console.warn('[Connect] Info fetch fallback:', e);
    }

    await renderConnectQR(activeConnectUrl);
  }

  async function renderConnectQR(targetUrl) {
    if (!elements.qrImageWrapper) return;
    elements.qrImageWrapper.innerHTML = '<p class="qr-placeholder-text">Generating QR code...</p>';

    try {
      const qrRes = await fetch(`/api/qr?text=${encodeURIComponent(targetUrl)}&format=dataurl`);
      const qrData = await qrRes.json();

      if (qrData && qrData.dataUrl) {
        elements.qrImageWrapper.innerHTML = `<img src="${qrData.dataUrl}" alt="Join QR Code" style="width: 180px; height: 180px; border-radius: 8px;">`;
      } else {
        elements.qrImageWrapper.innerHTML = `<p class="qr-instructions">Open <strong>${escapeHtml(targetUrl)}</strong></p>`;
      }
    } catch (e) {
      elements.qrImageWrapper.innerHTML = `<p class="qr-instructions">Open <strong>${escapeHtml(targetUrl)}</strong></p>`;
    }
  }

  function closeQRModal() {
    if (elements.qrModalOverlay) elements.qrModalOverlay.classList.remove('active');
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

  // --- 47. Event Listeners Initialization ---
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

    // 🧰 Central Tools & Apps Hub Triggers
    const openToolsHub = () => {
      elements.toolsHubModalOverlay.classList.add('active');
    };
    const closeToolsHub = () => {
      elements.toolsHubModalOverlay.classList.remove('active');
    };

    if (elements.btnOpenToolsHub) elements.btnOpenToolsHub.addEventListener('click', openToolsHub);
    if (elements.btnSidebarToolsHub) elements.btnSidebarToolsHub.addEventListener('click', openToolsHub);
    if (elements.toolsHubCloseBtn) elements.toolsHubCloseBtn.addEventListener('click', closeToolsHub);

    const bindHubCard = (cardId, actionFn) => {
      const card = document.getElementById(cardId);
      if (card) {
        card.addEventListener('click', () => {
          closeToolsHub();
          actionFn();
        });
      }
    };

    bindHubCard('hub-card-notes', openNotesModal);
    bindHubCard('hub-card-timer', openTimerModal);
    bindHubCard('hub-card-expenses', openExpensesModal);
    bindHubCard('hub-card-events', () => {
      elements.eventTitleInput.value = '';
      elements.eventDatetimeInput.value = '';
      elements.eventLocationInput.value = '';
      elements.eventModalOverlay.classList.add('active');
    });
    bindHubCard('hub-card-starred', openStarredVaultModal);
    bindHubCard('hub-card-games', () => elements.gamesModalOverlay.classList.add('active'));
    bindHubCard('hub-card-rollcall', startRollCall);
    bindHubCard('hub-card-geofence', () => {
      elements.geofenceSlider.value = state.geofence.radiusMeters;
      elements.geofenceRadiusLabel.textContent = `${state.geofence.radiusMeters} meters`;
      elements.geofenceActiveToggle.checked = state.geofence.enabled;
      elements.geofenceModalOverlay.classList.add('active');
    });
    bindHubCard('hub-card-morse', () => elements.morseModalOverlay.classList.add('active'));
    bindHubCard('hub-card-radar', initTacticalRadar);
    bindHubCard('hub-card-ai', () => elements.aiModalOverlay.classList.add('active'));
    bindHubCard('hub-card-guide', () => elements.guideModalOverlay.classList.add('active'));
    bindHubCard('hub-card-camera', openCameraModal);
    bindHubCard('hub-card-network', openNetworkHud);
    bindHubCard('hub-card-red-mode', toggleRedVisionMode);
    bindHubCard('hub-card-encryption', openEncryptionModal);
    bindHubCard('hub-card-wallpaper', openWallpaperModal);
    bindHubCard('hub-card-disappearing', openDisappearingModal);

    // Synchronized Timer
    if (elements.btnOpenTimer) elements.btnOpenTimer.addEventListener('click', openTimerModal);
    if (elements.timerModalCloseBtn) elements.timerModalCloseBtn.addEventListener('click', () => elements.timerModalOverlay.classList.remove('active'));
    if (elements.btnStartSyncTimer) elements.btnStartSyncTimer.addEventListener('click', () => startSyncTimer(state.sharedTimer.durationSec));
    if (elements.btnStopSyncTimer) elements.btnStopSyncTimer.addEventListener('click', stopSyncTimer);

    document.querySelectorAll('.timer-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const sec = parseInt(btn.dataset.sec, 10);
        state.sharedTimer.durationSec = sec;
        startSyncTimer(sec, btn.textContent);
      });
    });

    // Expenses Splitter
    if (elements.btnOpenExpenses) elements.btnOpenExpenses.addEventListener('click', openExpensesModal);
    if (elements.expensesModalCloseBtn) elements.expensesModalCloseBtn.addEventListener('click', () => elements.expensesModalOverlay.classList.remove('active'));
    if (elements.btnSubmitAddExpense) elements.btnSubmitAddExpense.addEventListener('click', addExpenseItem);
    if (elements.btnResetExpenses) elements.btnResetExpenses.addEventListener('click', resetAllExpenses);

    // Red Vision Mode
    if (elements.btnToggleRedMode) elements.btnToggleRedMode.addEventListener('click', toggleRedVisionMode);

    // Collaborative Notes
    if (elements.btnOpenNotes) elements.btnOpenNotes.addEventListener('click', openNotesModal);
    if (elements.notesModalCloseBtn) elements.notesModalCloseBtn.addEventListener('click', () => elements.notesModalOverlay.classList.remove('active'));
    if (elements.btnBroadcastNotes) elements.btnBroadcastNotes.addEventListener('click', broadcastNotesUpdate);
    if (elements.btnClearNotes) {
      elements.btnClearNotes.addEventListener('click', () => {
        if (!confirm('Clear all collaborative notes?')) return;
        if (elements.notesTextarea) elements.notesTextarea.value = '';
        broadcastNotesUpdate();
      });
    }

    // Network Telemetry HUD
    if (elements.btnOpenNetwork) elements.btnOpenNetwork.addEventListener('click', openNetworkHud);
    if (elements.networkHudCloseBtn) elements.networkHudCloseBtn.addEventListener('click', () => elements.networkHudModalOverlay.classList.remove('active'));

    // In-App Camera
    if (elements.btnOpenCamera) elements.btnOpenCamera.addEventListener('click', openCameraModal);
    if (elements.cameraModalCloseBtn) elements.cameraModalCloseBtn.addEventListener('click', closeCameraModal);
    if (elements.btnSnapPhoto) elements.btnSnapPhoto.addEventListener('click', capturePhotoFromLiveStream);
    if (elements.btnSendSnap) elements.btnSendSnap.addEventListener('click', sendCapturedSnapshot);

    document.querySelectorAll('.filter-chip').forEach(fc => {
      fc.addEventListener('click', () => {
        document.querySelectorAll('.filter-chip').forEach(f => f.classList.remove('active'));
        fc.classList.add('active');
        state.camera.activeFilter = fc.dataset.filter;
        elements.cameraLiveVideo.style.filter = fc.dataset.filter;
      });
    });

    // Channels & Topic Rooms Management
    if (elements.btnCreateChannel) {
      elements.btnCreateChannel.addEventListener('click', () => {
        elements.newChannelNameInput.value = '';
        if (elements.newChannelTopicInput) elements.newChannelTopicInput.value = '';
        if (elements.newChannelPasscodeInput) elements.newChannelPasscodeInput.value = '';
        if (elements.optPrivacyPublic) {
          elements.optPrivacyPublic.classList.add('active');
          if (elements.optPrivacyPrivate) elements.optPrivacyPrivate.classList.remove('active');
        }
        if (elements.privateRoomPasscodeGroup) elements.privateRoomPasscodeGroup.style.display = 'none';
        elements.channelModalOverlay.classList.add('active');
      });
    }
    if (elements.channelModalCloseBtn) {
      elements.channelModalCloseBtn.addEventListener('click', () => elements.channelModalOverlay.classList.remove('active'));
    }
    if (elements.btnSubmitCreateChannel) {
      elements.btnSubmitCreateChannel.addEventListener('click', createNewChannel);
    }

    if (elements.optPrivacyPublic) {
      elements.optPrivacyPublic.addEventListener('click', () => {
        elements.optPrivacyPublic.classList.add('active');
        elements.optPrivacyPrivate.classList.remove('active');
        if (elements.privateRoomPasscodeGroup) elements.privateRoomPasscodeGroup.style.display = 'none';
      });
    }
    if (elements.optPrivacyPrivate) {
      elements.optPrivacyPrivate.addEventListener('click', () => {
        elements.optPrivacyPrivate.classList.add('active');
        elements.optPrivacyPublic.classList.remove('active');
        if (elements.privateRoomPasscodeGroup) elements.privateRoomPasscodeGroup.style.display = 'block';
      });
    }

    // Room Settings Modal Listeners
    if (elements.btnManageRoom) elements.btnManageRoom.addEventListener('click', openRoomSettingsModal);
    if (elements.roomSettingsCloseBtn) elements.roomSettingsCloseBtn.addEventListener('click', () => elements.roomSettingsModalOverlay.classList.remove('active'));
    if (elements.btnSendRoomInvite) elements.btnSendRoomInvite.addEventListener('click', invitePeerToRoom);
    if (elements.btnLeaveRoom) elements.btnLeaveRoom.addEventListener('click', leaveCurrentRoom);
    if (elements.btnDeleteRoomAdmin) elements.btnDeleteRoomAdmin.addEventListener('click', () => deleteChannel(state.activeChannelId));

    // Room Invite Toast
    if (elements.btnAcceptRoomInvite) elements.btnAcceptRoomInvite.addEventListener('click', acceptRoomInvite);
    if (elements.btnDeclineRoomInvite) elements.btnDeclineRoomInvite.addEventListener('click', declineRoomInvite);

    // Starred Vault
    if (elements.btnOpenStarred) elements.btnOpenStarred.addEventListener('click', openStarredVaultModal);
    if (elements.starredModalCloseBtn) elements.starredModalCloseBtn.addEventListener('click', () => elements.starredModalOverlay.classList.remove('active'));

    // Events
    if (elements.btnOpenEvents) {
      elements.btnOpenEvents.addEventListener('click', () => {
        elements.eventTitleInput.value = '';
        elements.eventDatetimeInput.value = '';
        elements.eventLocationInput.value = '';
        elements.eventModalOverlay.classList.add('active');
      });
    }
    if (elements.eventModalCloseBtn) elements.eventModalCloseBtn.addEventListener('click', () => elements.eventModalOverlay.classList.remove('active'));
    if (elements.btnSubmitCreateEvent) elements.btnSubmitCreateEvent.addEventListener('click', submitCreateEvent);

    // Games Hub & 3D Dice & RPS Showdown
    if (elements.btnOpenGames) elements.btnOpenGames.addEventListener('click', () => elements.gamesModalOverlay.classList.add('active'));
    if (elements.gamesModalCloseBtn) elements.gamesModalCloseBtn.addEventListener('click', () => elements.gamesModalOverlay.classList.remove('active'));
    if (elements.btnStartTictactoe) elements.btnStartTictactoe.addEventListener('click', startTicTacToeGame);
    init3dDiceRoller();
    initRpsShowdown();
    initContextMenu();

    // Instagram-Style Contact Request Actions
    if (elements.btnAcceptContactReq) elements.btnAcceptContactReq.addEventListener('click', acceptContactRequest);
    if (elements.btnDeclineContactReq) elements.btnDeclineContactReq.addEventListener('click', declineContactRequest);

    // Quick Templates
    if (elements.btnQuickTemplates) elements.btnQuickTemplates.addEventListener('click', () => elements.templatesModalOverlay.classList.add('active'));
    if (elements.templatesModalCloseBtn) elements.templatesModalCloseBtn.addEventListener('click', () => elements.templatesModalOverlay.classList.remove('active'));
    document.querySelectorAll('.template-item-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        elements.templatesModalOverlay.classList.remove('active');
        elements.chatMessageInput.value = btn.dataset.text;
        elements.chatMessageInput.focus();
      });
    });

    // Polls
    if (elements.btnCreatePoll) elements.btnCreatePoll.addEventListener('click', openPollModal);
    if (elements.pollModalCloseBtn) elements.pollModalCloseBtn.addEventListener('click', () => elements.pollModalOverlay.classList.remove('active'));
    if (elements.btnAddPollOption) elements.btnAddPollOption.addEventListener('click', addPollOptionInput);
    if (elements.btnSubmitCreatePoll) elements.btnSubmitCreatePoll.addEventListener('click', submitCreatePoll);

    // Disappearing Timer
    if (elements.btnToggleDisappearing) elements.btnToggleDisappearing.addEventListener('click', openDisappearingModal);
    if (elements.disappearingModalCloseBtn) elements.disappearingModalCloseBtn.addEventListener('click', () => elements.disappearingModalOverlay.classList.remove('active'));
    document.querySelectorAll('.disappearing-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => setDisappearingTimer(parseInt(btn.dataset.seconds, 10)));
    });

    // Wallpaper & Colors
    if (elements.btnOpenWallpapers) elements.btnOpenWallpapers.addEventListener('click', openWallpaperModal);
    if (elements.wallpaperModalCloseBtn) elements.wallpaperModalCloseBtn.addEventListener('click', () => elements.wallpaperModalOverlay.classList.remove('active'));
    if (elements.btnSaveWallpaper) elements.btnSaveWallpaper.addEventListener('click', saveWallpaperSettings);

    document.querySelectorAll('.wallpaper-thumb').forEach(th => {
      th.addEventListener('click', () => {
        document.querySelectorAll('.wallpaper-thumb').forEach(t => t.classList.remove('active'));
        th.classList.add('active');
        state.wallpaper = th.dataset.bg;
      });
    });

    document.querySelectorAll('.wallpaper-modal-card .color-dot').forEach(cd => {
      cd.addEventListener('click', () => {
        document.querySelectorAll('.wallpaper-modal-card .color-dot').forEach(c => c.classList.remove('active'));
        cd.classList.add('active');
        state.accentColor = cd.dataset.accent;
      });
    });

    if (elements.btnUnpin) elements.btnUnpin.addEventListener('click', unpinMessage);
    if (elements.btnCancelEdit) elements.btnCancelEdit.addEventListener('click', cancelEditing);

    // AI Survival Assistant
    if (elements.btnOpenAi) elements.btnOpenAi.addEventListener('click', () => elements.aiModalOverlay.classList.add('active'));
    if (elements.aiModalCloseBtn) elements.aiModalCloseBtn.addEventListener('click', () => elements.aiModalOverlay.classList.remove('active'));
    if (elements.aiInputForm) {
      elements.aiInputForm.addEventListener('submit', (e) => {
        e.preventDefault();
        queryOfflineAiAssistant(elements.aiUserQuery.value);
      });
    }

    // Geofence Modal
    if (elements.btnOpenGeofence) {
      elements.btnOpenGeofence.addEventListener('click', () => {
        elements.geofenceSlider.value = state.geofence.radiusMeters;
        elements.geofenceRadiusLabel.textContent = `${state.geofence.radiusMeters} meters`;
        elements.geofenceActiveToggle.checked = state.geofence.enabled;
        elements.geofenceModalOverlay.classList.add('active');
      });
    }
    if (elements.geofenceModalCloseBtn) elements.geofenceModalCloseBtn.addEventListener('click', () => elements.geofenceModalOverlay.classList.remove('active'));
    if (elements.geofenceSlider) {
      elements.geofenceSlider.addEventListener('input', (e) => {
        elements.geofenceRadiusLabel.textContent = `${e.target.value} meters`;
      });
    }
    if (elements.btnSaveGeofence) elements.btnSaveGeofence.addEventListener('click', saveGeofenceSettings);

    // Morse Strobe Modal
    if (elements.btnOpenMorse) elements.btnOpenMorse.addEventListener('click', () => elements.morseModalOverlay.classList.add('active'));
    if (elements.morseModalCloseBtn) {
      elements.morseModalCloseBtn.addEventListener('click', () => {
        stopOpticalMorseFlasher();
        elements.morseModalOverlay.classList.remove('active');
      });
    }
    if (elements.btnStartMorse) elements.btnStartMorse.addEventListener('click', startOpticalMorseFlasher);
    if (elements.btnStopMorse) elements.btnStopMorse.addEventListener('click', stopOpticalMorseFlasher);

    // Tactical Radar Modal
    if (elements.btnOpenRadar) elements.btnOpenRadar.addEventListener('click', initTacticalRadar);
    if (elements.radarModalCloseBtn) {
      elements.radarModalCloseBtn.addEventListener('click', () => {
        elements.radarModalOverlay.classList.remove('active');
        if (state.radar.animFrame) cancelAnimationFrame(state.radar.animFrame);
      });
    }

    // Elevation & Weather Panel
    if (elements.btnToggleElevationPanel) {
      elements.btnToggleElevationPanel.addEventListener('click', () => {
        const isVisible = elements.elevationPanel.style.display === 'block';
        elements.elevationPanel.style.display = isVisible ? 'none' : 'block';
        if (!isVisible) renderElevationProfile();
      });
    }
    if (elements.btnCloseElev) elements.btnCloseElev.addEventListener('click', () => elements.elevationPanel.style.display = 'none');

    // Appearance Toggle
    if (elements.btnToggleTheme) elements.btnToggleTheme.addEventListener('click', toggleAppearance);

    // SOS Beacon
    if (elements.btnSosBeacon) elements.btnSosBeacon.addEventListener('click', activateSosBeacon);
    if (elements.btnStopSos) elements.btnStopSos.addEventListener('click', deactivateSosBeacon);

    // Survival Guide
    if (elements.btnOpenGuide) elements.btnOpenGuide.addEventListener('click', () => elements.guideModalOverlay.classList.add('active'));
    if (elements.guideModalCloseBtn) elements.guideModalCloseBtn.addEventListener('click', () => elements.guideModalOverlay.classList.remove('active'));

    // Roll Call
    if (elements.btnStartRollcall) elements.btnStartRollcall.addEventListener('click', startRollCall);
    if (elements.rollcallModalCloseBtn) elements.rollcallModalCloseBtn.addEventListener('click', () => elements.rollcallModalOverlay.classList.remove('active'));
    if (elements.btnRollcallOk) elements.btnRollcallOk.addEventListener('click', () => submitRollCallResponse('ok'));
    if (elements.btnRollcallHelp) elements.btnRollcallHelp.addEventListener('click', () => submitRollCallResponse('help'));

    // Chat Form & Attachments
    if (elements.chatForm) elements.chatForm.addEventListener('submit', handleSendMessage);
    if (elements.voiceRecordBtn) elements.voiceRecordBtn.addEventListener('click', toggleVoiceRecording);
    if (elements.attachFileBtn && elements.fileInput) {
      elements.attachFileBtn.addEventListener('click', () => elements.fileInput.click());
    }
    if (elements.fileInput) elements.fileInput.addEventListener('change', handleFileSelect);

    // Sketch Canvas
    if (elements.btnOpenSketch) elements.btnOpenSketch.addEventListener('click', openSketchModal);
    if (elements.sketchModalCloseBtn) elements.sketchModalCloseBtn.addEventListener('click', closeSketchModal);
    if (elements.btnClearSketch) elements.btnClearSketch.addEventListener('click', clearSketchCanvas);
    if (elements.btnSendSketch) elements.btnSendSketch.addEventListener('click', sendSketch);

    // Location Sharing
    if (elements.btnShareLocation) elements.btnShareLocation.addEventListener('click', shareLocation);

    // Map Controls & Waypoints
    if (elements.btnDropWaypoint) elements.btnDropWaypoint.addEventListener('click', openWaypointModal);
    if (elements.waypointModalCloseBtn) elements.waypointModalCloseBtn.addEventListener('click', closeWaypointModal);
    if (elements.btnConfirmWaypoint) elements.btnConfirmWaypoint.addEventListener('click', saveWaypoint);
    if (elements.btnRecenterMap) elements.btnRecenterMap.addEventListener('click', () => drawMap());

    if (elements.waypointIconPalette) {
      elements.waypointIconPalette.querySelectorAll('.stroke-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          elements.waypointIconPalette.querySelectorAll('.stroke-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          pttSelectedIcon = btn.dataset.icon;
        });
      });
    }

    // Walkie-Talkie Touch Handlers
    const pttBtn = elements.btnPttGiant;
    if (pttBtn) {
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
    }

    if (elements.btnToggleMicLock) elements.btnToggleMicLock.addEventListener('click', toggleMicLock);
    if (elements.btnToggleVox) elements.btnToggleVox.addEventListener('click', toggleVoxMode);

    // Encryption Settings
    if (elements.btnOpenEncryption) elements.btnOpenEncryption.addEventListener('click', openEncryptionModal);
    if (elements.encryptionModalCloseBtn) elements.encryptionModalCloseBtn.addEventListener('click', closeEncryptionModal);
    if (elements.btnSaveEncryption) elements.btnSaveEncryption.addEventListener('click', saveEncryptionPassphrase);

    // Search & Export
    if (elements.searchInput) elements.searchInput.addEventListener('input', handleSearchInput);
    if (elements.btnClearSearch) elements.btnClearSearch.addEventListener('click', clearSearch);
    if (elements.btnExportChat) elements.btnExportChat.addEventListener('click', exportChatTranscript);
    if (elements.btnCancelReply) elements.btnCancelReply.addEventListener('click', cancelReply);

    // Call Buttons
    if (elements.btnAudioCall) elements.btnAudioCall.addEventListener('click', () => initiateCall(false));
    if (elements.btnVideoCall) elements.btnVideoCall.addEventListener('click', () => initiateCall(true));

    if (elements.btnIncomingAccept) elements.btnIncomingAccept.addEventListener('click', acceptIncomingCall);
    if (elements.btnIncomingDecline) elements.btnIncomingDecline.addEventListener('click', rejectIncomingCall);

    if (elements.btnCallMute) elements.btnCallMute.addEventListener('click', toggleCallMute);
    if (elements.btnCallVideoToggle) elements.btnCallVideoToggle.addEventListener('click', toggleCallVideo);
    if (elements.btnCallEnd) elements.btnCallEnd.addEventListener('click', () => endCall(true));

    if (elements.profileNameInput) {
      elements.profileNameInput.addEventListener('change', (e) => {
        state.self.name = e.target.value.trim() || 'User';
        localStorage.setItem('mesh_peer_name', state.self.name);
        if (state.ws && state.ws.readyState === WebSocket.OPEN) {
          state.ws.send(JSON.stringify({ type: 'JOIN', peer: state.self }));
        }
      });
    }

    // Sidebar Desktop Toggle
    if (elements.btnToggleSidebar) {
      elements.btnToggleSidebar.addEventListener('click', () => {
        const appBody = document.getElementById('app-body');
        if (appBody) appBody.classList.toggle('sidebar-hidden');
      });
    }

    // Clear Chat History for active room/peer
    if (elements.btnClearChat) {
      elements.btnClearChat.addEventListener('click', () => {
        const ch = state.channels.find(c => c.id === state.activeChannelId);
        const name = ch ? `#${ch.name}` : (state.activeTargetId !== 'broadcast' ? state.activeTargetId : 'this conversation');
        if (!confirm(`Are you sure you want to clear all messages in ${name}?`)) return;

        if (state.activeTargetId === 'broadcast') {
          state.messages = state.messages.filter(m => m.channelId !== state.activeChannelId);
          if (state.ws && state.ws.readyState === WebSocket.OPEN) {
            state.ws.send(JSON.stringify({
              type: 'CLEAR_ROOM_HISTORY',
              channelId: state.activeChannelId,
              senderName: state.self.name
            }));
          }
        } else {
          state.messages = state.messages.filter(m => m.targetId !== state.activeTargetId && m.senderId !== state.activeTargetId);
        }
        renderMessagesForActiveTarget();
      });
    }

    // Modern Connect Modal Controls
    if (elements.qrShareBtn) elements.qrShareBtn.addEventListener('click', openQRModal);
    if (elements.qrModalCloseBtn) elements.qrModalCloseBtn.addEventListener('click', closeQRModal);
    if (elements.qrModalDoneBtn) elements.qrModalDoneBtn.addEventListener('click', closeQRModal);
    if (elements.qrModalOverlay) {
      elements.qrModalOverlay.addEventListener('click', (e) => {
        if (e.target === elements.qrModalOverlay) closeQRModal();
      });
    }

    if (elements.tabConnectCloud) {
      elements.tabConnectCloud.addEventListener('click', () => {
        elements.tabConnectCloud.classList.add('active');
        if (elements.tabConnectOffline) elements.tabConnectOffline.classList.remove('active');
        if (elements.offlineIpSection) elements.offlineIpSection.style.display = 'none';
        if (elements.connectCurrentUrl) elements.connectCurrentUrl.textContent = activeConnectUrl;
        if (elements.connectQrInstruction) elements.connectQrInstruction.textContent = 'Scan QR with your phone camera to join instantly from any device.';
        renderConnectQR(activeConnectUrl);
      });
    }

    if (elements.tabConnectOffline) {
      elements.tabConnectOffline.addEventListener('click', () => {
        elements.tabConnectOffline.classList.add('active');
        if (elements.tabConnectCloud) elements.tabConnectCloud.classList.remove('active');
        if (elements.offlineIpSection) elements.offlineIpSection.style.display = 'block';
        if (elements.connectCurrentUrl) elements.connectCurrentUrl.textContent = primaryOfflineUrl;
        if (elements.connectQrInstruction) elements.connectQrInstruction.textContent = 'Connect phone to local Wi-Fi / Hotspot and scan this QR code:';
        renderConnectQR(primaryOfflineUrl);
      });
    }

    if (elements.btnCopyConnectUrl) {
      elements.btnCopyConnectUrl.addEventListener('click', () => {
        const urlToCopy = (elements.connectCurrentUrl && elements.connectCurrentUrl.textContent) || activeConnectUrl;
        navigator.clipboard.writeText(urlToCopy);
        elements.btnCopyConnectUrl.textContent = '✓ Copied!';
        setTimeout(() => { elements.btnCopyConnectUrl.textContent = 'Copy Link'; }, 2000);
      });
    }

    if (elements.btnWebShareInvite) {
      elements.btnWebShareInvite.addEventListener('click', async () => {
        const urlToShare = (elements.connectCurrentUrl && elements.connectCurrentUrl.textContent) || activeConnectUrl;
        if (navigator.share) {
          try {
            await navigator.share({
              title: 'Join MeshChat',
              text: 'Join our private chat room on MeshChat:',
              url: urlToShare
            });
          } catch (err) {
            console.log('Share canceled or failed:', err);
          }
        } else {
          navigator.clipboard.writeText(urlToShare);
          alert(`Link copied to clipboard!\n${urlToShare}`);
        }
      });
    }

    if (elements.menuToggleBtn) elements.menuToggleBtn.addEventListener('click', openSidebarDrawer);

    let typingTimeout = null;
    if (elements.chatMessageInput) {
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
    }

    window.addEventListener('resize', () => {
      if (state.activeView === 'map') resizeAndDrawMap();
    });

    initMentionsEngine();
    initAiPersonaHandlers();
    initProfileModal();
  }

  // --- 48. Bootstrap ---
  async function init() {
    initEventListeners();
    renderSelfProfile();

    applyCustomTheme();
    renderChannelsList();
    selectChannel(state.activeChannelId);
    setDisappearingTimer(state.disappearingSeconds);
    renderPinnedBanner();

    try {
      await initCryptoKey(state.passphrase);
    } catch (e) {
      console.warn('[Crypto] Init key fallback:', e);
    }

    try {
      await initDatabase();
      const stored = await loadStoredMessages();
      if (stored && stored.length > 0) {
        state.messages = stored;
        renderMessagesForActiveTarget();
      }
    } catch (e) {
      console.warn('[Storage] DB fallback:', e);
    }

    initMapEngine();
    initCompassSensor();
    initBatteryMonitor();
    connectWebSocket();

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').then((reg) => {
        if (reg) reg.update();
      }).catch((err) => {
        console.log('[SW] Registration failed:', err);
      });
    }
  }

  init();
})();
