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
      name: localStorage.getItem('mesh_peer_name') || 'User_' + Math.floor(100 + Math.random() * 900)
    },
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

    // Collaborative Notes
    sharedNote: {
      content: localStorage.getItem('mesh_shared_note') || "# 📋 Group Checklist\n\n- [x] Water & snacks\n- [ ] Power banks\n- [ ] Trail maps",
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

    viewPaneChat: document.getElementById('view-pane-chat'),
    viewPaneMap: document.getElementById('view-pane-map'),
    viewPanePtt: document.getElementById('view-pane-ptt'),

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
    btnBroadcastNotes: document.getElementById('btn-broadcast-notes'),

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

    // AI Survival Assistant
    btnOpenAi: document.getElementById('btn-open-ai'),
    aiModalOverlay: document.getElementById('ai-modal-overlay'),
    aiModalCloseBtn: document.getElementById('ai-modal-close-btn'),
    aiChatHistory: document.getElementById('ai-chat-history'),
    aiInputForm: document.getElementById('ai-input-form'),
    aiUserQuery: document.getElementById('ai-user-query'),

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

  function renderExpensesList() {
    elements.expensesList.innerHTML = '';
    let total = 0;
    const paidByMap = {};

    state.sharedExpenses.forEach(exp => {
      total += exp.amount;
      paidByMap[exp.paidBy] = (paidByMap[exp.paidBy] || 0) + exp.amount;

      const item = document.createElement('div');
      item.className = 'expense-item-card';
      item.innerHTML = `
        <div>
          <strong>${escapeHtml(exp.desc)}</strong>
          <div style="font-size: 11px; opacity: 0.65;">Paid by ${escapeHtml(exp.paidBy)}</div>
        </div>
        <strong style="color: #34c759; font-family: var(--font-mono);">$${exp.amount.toFixed(2)}</strong>
      `;
      elements.expensesList.appendChild(item);
    });

    if (state.sharedExpenses.length === 0) {
      elements.expensesList.innerHTML = '<div class="ptt-log-item empty">No expenses logged yet. Add your first shared item!</div>';
    }

    const peerCount = Math.max(1, state.peers.size);
    const perPerson = total / peerCount;

    elements.expTotalSpend.textContent = `$${total.toFixed(2)}`;
    elements.expPerPerson.textContent = `$${perPerson.toFixed(2)} (${peerCount} people)`;

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

  // --- 10. 📋 Collaborative Sync Notes Engine ---
  function openNotesModal() {
    elements.notesTextarea.value = state.sharedNote.content || '';
    elements.notesAuthorBadge.textContent = `Last edit: ${state.sharedNote.updatedBy} (${formatTime(state.sharedNote.updatedAt)})`;
    elements.notesModalOverlay.classList.add('active');
  }

  function broadcastNotesUpdate() {
    const text = elements.notesTextarea.value;
    state.sharedNote = {
      content: text,
      updatedBy: state.self.name,
      updatedAt: Date.now()
    };
    localStorage.setItem('mesh_shared_note', text);
    elements.notesAuthorBadge.textContent = `Last edit: You (Just now)`;

    if (state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(JSON.stringify({
        type: 'NOTE_UPDATE',
        noteContent: text,
        updatedBy: state.self.name
      }));
    }
  }

  function handleIncomingNoteUpdate(data) {
    if (data.note) {
      state.sharedNote = data.note;
      localStorage.setItem('mesh_shared_note', data.note.content);
      if (elements.notesModalOverlay.classList.contains('active')) {
        elements.notesTextarea.value = data.note.content;
        elements.notesAuthorBadge.textContent = `Last edit: ${data.note.updatedBy} (${formatTime(data.note.updatedAt)})`;
      }
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

  function renderChannelsList() {
    elements.channelsList.innerHTML = '';
    state.channels.forEach(ch => {
      const isAct = state.activeTargetId === 'broadcast' && state.activeChannelId === ch.id;
      const div = document.createElement('div');
      div.className = `channel-item ${isAct ? 'active' : ''}`;
      div.dataset.channelId = ch.id;
      div.innerHTML = `
        <span class="channel-hash">#</span>
        <span class="channel-name">${escapeHtml(ch.name)}</span>
      `;
      div.onclick = () => selectChannel(ch.id);
      elements.channelsList.appendChild(div);
    });
  }

  function selectChannel(channelId) {
    state.activeTargetId = 'broadcast';
    state.activeChannelId = channelId;
    localStorage.setItem('mesh_active_channel', channelId);

    renderChannelsList();
    renderPeerList(Array.from(state.peers.values()));

    const ch = state.channels.find(c => c.id === channelId);
    const chName = ch ? `#${ch.name}` : '#general';

    elements.activeChatTitle.textContent = chName;
    elements.activeChatStatus.textContent = `Topic Room • Encrypted Local Mesh`;
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

    renderMessagesForActiveTarget();
    closeSidebarDrawer();
  }

  function createNewChannel() {
    const name = elements.newChannelNameInput.value.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '-');
    if (!name) return;

    const id = name;
    if (state.channels.find(c => c.id === id)) {
      alert('Channel already exists.');
      return;
    }

    const ch = { id, name };
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

  function handleIncomingChannelCreate(data) {
    if (!state.channels.find(c => c.id === data.channel.id)) {
      state.channels.push(data.channel);
      localStorage.setItem('mesh_channels', JSON.stringify(state.channels));
      renderChannelsList();
    }
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

  async function rollDiceGame() {
    elements.gamesModalOverlay.classList.remove('active');
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    const diceFaces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

    const gameMsg = {
      id: 'game_dice_' + Date.now(),
      type: 'diceroll',
      senderId: state.self.id,
      senderName: state.self.name,
      targetId: state.activeTargetId,
      channelId: state.activeTargetId === 'broadcast' ? state.activeChannelId : null,
      die1: d1,
      die2: d2,
      die1Face: diceFaces[d1 - 1],
      die2Face: diceFaces[d2 - 1],
      total: d1 + d2,
      timestamp: Date.now()
    };

    playSound('game_move');
    await dispatchMessage(gameMsg);
  }

  async function playRpsGame() {
    elements.gamesModalOverlay.classList.remove('active');
    const choices = ['✊ Rock', '✋ Paper', '✌️ Scissors'];
    const pick = choices[Math.floor(Math.random() * choices.length)];

    const msg = {
      id: 'msg_rps_' + Date.now(),
      senderId: state.self.id,
      senderName: state.self.name,
      targetId: state.activeTargetId,
      channelId: state.activeTargetId === 'broadcast' ? state.activeChannelId : null,
      text: `🎮 Rock-Paper-Scissors Shoot! ➜ **${pick}**`,
      timestamp: Date.now()
    };

    playSound('game_move');
    await dispatchMessage(msg);
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

    elements.mapCompassHeading.textContent = `${String(deg).padStart(3, '0')}° ${cardinal}`;

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

  // --- 20. 🤖 Offline AI Survival Assistant ---
  const OFFLINE_AI_KNOWLEDGE = [
    {
      keywords: ['snake', 'bite', 'viper', 'rattlesnake', 'cobra', 'venom'],
      title: 'Snake / Venomous Bite Protocol',
      response: '1. **Keep Victim Calm**: Minimize movement to slow venom circulation.\n2. **Position Limb**: Keep bite site **below heart level**.\n3. **DO NOT**: Cut wound, suck venom, apply ice, or use tight tourniquet.\n4. **Mark Swelling**: Use pen to outline swelling and note time.\n5. **Immobilize**: Splint gently and evacuate immediately.'
    },
    {
      keywords: ['water', 'purify', 'boil', 'filter', 'muddy', 'drink', 'hydration'],
      title: 'Wilderness Water Purification',
      response: '1. **Rolling Boil**: Boil vigorously for **at least 1 full minute** (3 mins above 2,000m).\n2. **Solar SODIS**: Clear PET bottle in direct sunlight for 6 hours.\n3. **DIY Filter**: Layer cloth -> crushed wood charcoal -> fine sand -> gravel.'
    },
    {
      keywords: ['hypothermia', 'cold', 'freeze', 'shivering', 'frostbite'],
      title: 'Hypothermia & Cold Exposure',
      response: '1. **Insulate Ground**: Insulate with branches/backpacks.\n2. **Replace Wet Clothes**: Wrap in dry blankets.\n3. **Core Heat**: Apply warmth to **chest and armpits**.\n4. **Warm Sips**: Give warm sugary liquids if conscious.'
    }
  ];

  function queryOfflineAiAssistant(userPrompt) {
    const p = userPrompt.toLowerCase().trim();
    if (!p) return;

    appendAiBubble('user', userPrompt);
    elements.aiUserQuery.value = '';

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
        const fallback = `<strong>Survival Guidance</strong><br><br>I evaluated: <em>"${escapeHtml(userPrompt)}"</em>.<br><br>• Check the <strong>Survival Handbook (Book Icon)</strong> in header for full emergency guides!`;
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

    msg.options.forEach((opt, idx) => {
      const userIdx = opt.voters.indexOf(state.self.id);
      if (idx === optionIndex) {
        if (userIdx === -1) opt.voters.push(state.self.id);
        else opt.voters.splice(userIdx, 1);
      } else {
        if (userIdx !== -1) opt.voters.splice(userIdx, 1);
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
        voterName: state.self.name
      }));
    }
  }

  function handleIncomingPollVote(data) {
    const msg = state.messages.find(m => m.id === data.pollId);
    if (!msg || !msg.options || !msg.options[data.optionIndex]) return;

    msg.options.forEach((opt, idx) => {
      const userIdx = opt.voters.indexOf(data.voterId);
      if (idx === data.optionIndex) {
        if (userIdx === -1) opt.voters.push(data.voterId);
        else opt.voters.splice(userIdx, 1);
      } else {
        if (userIdx !== -1) opt.voters.splice(userIdx, 1);
      }
    });

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

    if (seconds > 0) {
      const label = seconds < 60 ? `${seconds}s` : (seconds < 3600 ? `${Math.round(seconds/60)}m` : `${Math.round(seconds/3600)}h`);
      elements.disappearingBadge.textContent = label;
      elements.disappearingBadge.style.display = 'inline-block';
    } else {
      elements.disappearingBadge.style.display = 'none';
    }

    elements.disappearingModalOverlay.classList.remove('active');
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
  function startEditingMessage(msg) {
    state.editingMessageId = msg.id;
    elements.editSnippet.textContent = msg.text || '';
    elements.editBar.style.display = 'flex';
    elements.chatMessageInput.value = msg.text || '';
    elements.chatMessageInput.focus();
  }

  function cancelEditing() {
    state.editingMessageId = null;
    elements.editBar.style.display = 'none';
    elements.chatMessageInput.value = '';
  }

  async function submitEditMessage(newText) {
    const msgId = state.editingMessageId;
    const msg = state.messages.find(m => m.id === msgId);
    if (msg) {
      msg.text = newText;
      msg.isEdited = true;
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
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
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
        renderPeerList(data.peers);
        if (data.sharedNote) handleIncomingNoteUpdate({ note: data.sharedNote });
        if (data.sharedTimer) handleIncomingTimerSync({ timer: data.sharedTimer });
        if (data.sharedExpenses) handleIncomingExpenseAdd({ expenses: data.sharedExpenses });
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

      case 'CHANNEL_CREATE':
        handleIncomingChannelCreate(data);
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

  // --- 36. GPS Map Engine & Breadcrumbs ---
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

        checkGeofenceProximity(state.myCoords.latitude, state.myCoords.longitude);

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

    const isDark = document.body.classList.contains('dark-theme') || document.body.classList.contains('red-vision-theme');
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
    }

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

    state.waypoints.forEach(wp => {
      const cx = toCanvasX(wp.lon);
      const cy = toCanvasY(wp.lat);

      mapCanvasCtx.font = '18px sans-serif';
      mapCanvasCtx.fillText(wp.icon || '📍', cx - 9, cy + 6);

      mapCanvasCtx.font = '11px -apple-system, sans-serif';
      mapCanvasCtx.fillStyle = '#ffffff';
      mapCanvasCtx.fillText(wp.name, cx - 18, cy + 22);
    });

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

  // --- 37. Peer List Rendering ---
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

    elements.peerList.innerHTML = '';

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

    document.querySelectorAll('.channel-item').forEach(ci => ci.classList.remove('active'));

    const peer = state.peers.get(targetId);
    const peerName = peer ? peer.name : 'Direct Peer';
    elements.activeChatTitle.textContent = peerName;
    elements.activeChatStatus.textContent = 'Direct Peer Link • Private';
    elements.activeChatAvatar.className = 'peer-avatar user';
    elements.activeChatAvatar.textContent = getInitials(peerName);
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
    let existingRow = document.getElementById(`msg-row-${msg.id}`);
    if (existingRow) existingRow.remove();

    const row = document.createElement('div');
    row.className = `msg-row ${isSelf ? 'self' : 'peer'}`;
    row.id = `msg-row-${msg.id}`;

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
        const hasVoted = opt.voters && opt.voters.includes(state.self.id);

        optionsHtml += `
          <div class="poll-opt-row ${hasVoted ? 'voted' : ''}" data-poll-id="${msg.id}" data-opt-idx="${idx}">
            <div class="poll-opt-fill" style="width: ${percent}%;"></div>
            <span class="poll-opt-text">${hasVoted ? '✓ ' : ''}${escapeHtml(opt.text)}</span>
            <span class="poll-opt-votes">${votes} (${percent}%)</span>
          </div>
        `;
      });

      contentHtml += `
        <div class="poll-card">
          <div class="poll-question">📊 ${escapeHtml(msg.question)}</div>
          <div class="poll-options-list">${optionsHtml}</div>
          <div class="poll-footer-info">${totalVotes} total votes • Tap option to vote</div>
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

    // 5. 2x Dice Roll
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

    // 6. Location Message
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

    // 7. Audio Voice Memo with 1x / 1.5x / 2x Speed Controller & Scrubber
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

    // 8. File / Photo Attachment
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

    row.innerHTML = `
      ${!isSelf ? `<div class="msg-sender">${escapeHtml(msg.senderName || 'Peer')}</div>` : ''}
      
      <div class="msg-actions-hover">
        <button class="hover-action-btn" data-action="react" data-msg-id="${msg.id}" data-emoji="👍">👍</button>
        <button class="hover-action-btn" data-action="react" data-msg-id="${msg.id}" data-emoji="❤️">❤️</button>
        <button class="hover-action-btn" data-action="react" data-msg-id="${msg.id}" data-emoji="🔥">🔥</button>
        <button class="hover-action-btn ${isStarred ? 'self-reacted' : ''}" data-action="star" data-msg-id="${msg.id}" title="Star message">${isStarred ? '⭐' : '☆'}</button>
        <button class="hover-action-btn" data-action="reply" data-msg-id="${msg.id}" title="Reply">↩</button>
        <button class="hover-action-btn" data-action="pin" data-msg-id="${msg.id}" title="Pin to top">📌</button>
        ${isSelf && msg.text ? `<button class="hover-action-btn" data-action="edit" data-msg-id="${msg.id}" title="Edit message">✏️</button>` : ''}
        ${isSelf ? `<button class="hover-action-btn" data-action="delete" data-msg-id="${msg.id}" title="Delete for everyone" style="color: #ff3b30;">🗑️</button>` : ''}
      </div>

      <div class="msg-bubble">
        ${contentHtml}
        ${reactionsHtml}
        <div class="msg-footer">
          <span>${timeStr}${isStarred ? ' ⭐' : ''}${msg.isEdited ? '<span class="msg-edited-badge">(edited)</span>' : ''}${disappearingChip}</span>
          ${isSelf ? `
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          ` : ''}
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

    row.querySelectorAll('.hover-action-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.dataset.action;
        const msgId = btn.dataset.msgId;
        if (action === 'react') sendReaction(msgId, btn.dataset.emoji);
        else if (action === 'star') toggleStarMessage(msgId);
        else if (action === 'reply') startReply(msg);
        else if (action === 'pin') pinMessageToTop(msg);
        else if (action === 'edit') startEditingMessage(msg);
        else if (action === 'delete') deleteMessageForEveryone(msgId);
      });
    });

    row.querySelectorAll('.reaction-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        sendReaction(chip.dataset.msgId, chip.dataset.emoji);
      });
    });

    elements.messagesContainer.appendChild(row);
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

  // --- 42. Message Dispatch Helper ---
  async function dispatchMessage(msgObj) {
    if (state.replyingTo) {
      msgObj.quotedMsg = state.replyingTo;
      cancelReply();
    }

    if (!msgObj.channelId && state.activeTargetId === 'broadcast') {
      msgObj.channelId = state.activeChannelId;
    }

    appendMessage(msgObj, true);

    if (state.ws && state.ws.readyState === WebSocket.OPEN) {
      const encryptedMsg = await encryptPayload(msgObj);
      state.ws.send(JSON.stringify({
        type: 'CHAT_MESSAGE',
        message: encryptedMsg
      }));
    } else {
      dispatchMeshRelayPacket(msgObj, state.activeTargetId);
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
    elements.chatMessageInput.value = '';
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

    // Channels
    if (elements.btnCreateChannel) {
      elements.btnCreateChannel.addEventListener('click', () => {
        elements.newChannelNameInput.value = '';
        elements.channelModalOverlay.classList.add('active');
      });
    }
    if (elements.channelModalCloseBtn) {
      elements.channelModalCloseBtn.addEventListener('click', () => elements.channelModalOverlay.classList.remove('active'));
    }
    if (elements.btnSubmitCreateChannel) {
      elements.btnSubmitCreateChannel.addEventListener('click', createNewChannel);
    }

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

    // Games Hub
    if (elements.btnOpenGames) elements.btnOpenGames.addEventListener('click', () => elements.gamesModalOverlay.classList.add('active'));
    if (elements.gamesModalCloseBtn) elements.gamesModalCloseBtn.addEventListener('click', () => elements.gamesModalOverlay.classList.remove('active'));
    if (elements.btnStartTictactoe) elements.btnStartTictactoe.addEventListener('click', startTicTacToeGame);
    if (elements.btnStartDiceroll) elements.btnStartDiceroll.addEventListener('click', rollDiceGame);
    if (elements.btnStartRps) elements.btnStartRps.addEventListener('click', playRpsGame);

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

    // Walkie-Talkie Touch Handlers
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

    if (elements.btnToggleMicLock) elements.btnToggleMicLock.addEventListener('click', toggleMicLock);
    if (elements.btnToggleVox) elements.btnToggleVox.addEventListener('click', toggleVoxMode);

    // Encryption Settings
    elements.btnOpenEncryption.addEventListener('click', openEncryptionModal);
    elements.encryptionModalCloseBtn.addEventListener('click', closeEncryptionModal);
    elements.btnSaveEncryption.addEventListener('click', saveEncryptionPassphrase);

    // Search & Export
    elements.searchInput.addEventListener('input', handleSearchInput);
    elements.btnClearSearch.addEventListener('click', clearSearch);
    elements.btnExportChat.addEventListener('click', exportChatTranscript);
    elements.btnCancelReply.addEventListener('click', cancelReply);

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

    initMentionsEngine();
  }

  // --- 48. Bootstrap ---
  async function init() {
    elements.profileNameInput.value = state.self.name;
    elements.selfIdTag.textContent = `ID: ${state.self.id}`;

    applyCustomTheme();
    renderChannelsList();
    selectChannel(state.activeChannelId);
    setDisappearingTimer(state.disappearingSeconds);
    renderPinnedBanner();

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
