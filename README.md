# 📡 MeshChat — Zero-Internet Offline Communication & Survival Suite

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen.svg)](https://nodejs.org/)
[![WebRTC](https://img.shields.io/badge/WebRTC-P2P%20Media-orange.svg)](https://webrtc.org/)
[![Encryption](https://img.shields.io/badge/Encryption-AES--256--GCM-success.svg)](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto)

> An Apple-inspired, **zero-internet, zero-cloud offline & online hybrid web suite** for encrypted messaging, P2P video/voice calling, tactical GPS breadcrumbs, and live walkie-talkie radio. Runs directly in any modern mobile or desktop browser with **zero external hardware or app installations required**.

---

## 🌟 Key Features

### 💬 1. Zero-Internet Encrypted Messaging
* **Client-Side E2EE**: 256-bit AES-GCM encryption powered by browser-native `SubtleCrypto`. Plaintext never leaves your device.
* **Offline Voice Memos**: In-browser microphone recorder with interactive waveform playback.
* **File & Photo Transfers**: Local high-speed LAN file sharing with inline image previews and download actions.
* **Emoji Reactions & Replies**: Thread quote quoting (`↩`) and quick emoji reactions (`👍`, `❤️`, `📍`, `⚠️`, `🚩`).
* **Offline Search & Export**: Instant full-text search across local `IndexedDB` history and one-click `.txt` transcript downloads.

### 📞 2. Offline & Online WebRTC Audio / Video Calling
* **Zero-Internet Local Media**: Direct browser-to-browser P2P media streams (`iceServers: []`) over local Wi-Fi/Hotspot.
* **Online STUN Support**: Automatic NAT traversal using Google STUN relays when connected to the internet.
* **Apple-Inspired In-Call UX**: Incoming call sheet with synthesized dual-tone ringtones, full-bleed video with picture-in-picture local camera preview, and floating control dock (Mute, Camera Toggle, End Call).

### 🗺️ 3. Tactical GPS Map & Trail Breadcrumb Tracker
* **Offline 2D Canvas Radar**: Grid coordinate overlay, range rings (`100m`, `250m`, `500m`), and compass rose orientation.
* **GPS Breadcrumbs**: Automatically logs and renders your group's walking path so separated hikers can backtrack.
* **Live Peer Radar**: Real-time position markers and distance calculations for all mesh members.
* **Custom Waypoints**: Drop interactive map pins (`⛺ Campsite`, `💧 Water Source`, `🚗 Vehicle`, `🚩 Meeting Point`).

### 📻 4. Offline Walkie-Talkie / Push-to-Talk (PTT)
* **Hold to Talk, Release to Broadcast**: Large tactile button for instant voice blasts to the entire mesh.
* **Authentic Radio Squelch**: Web Audio synthesized radio chirp and squelch sound effects.
* **Live Radio Activity Feed**: Chronological log of recent transmissions with sender name and timestamps.

### 🚨 5. Emergency SOS Beacon & Camera Torch Strobe
* **Audible Morse Code Siren**: Synthesizes the international SOS alarm (`... --- ...`) through device speakers.
* **Screen Flash Strobe**: High-contrast flashing emergency strobe light for visual nighttime signaling.
* **Physical Camera Flashlight Pulse**: Uses browser `ImageCapture` & `torch` APIs to pulse the phone's physical LED.
* **Mesh Emergency Alert**: Broadcasts high-priority distress alerts with live GPS coordinates to all nearby devices.

### 📖 6. Offline Wilderness First-Aid & Survival Handbook
* Searchable, 100% offline knowledge base accessible directly in-app:
  * **🩹 First Aid**: Fractures, venomous bites, hypothermia, heat stroke, and CPR.
  * **💧 Water & Food**: Rolling boil rules, SODIS solar disinfection, and DIY sand/charcoal filtration.
  * **⛺ Shelter & Fire**: Debris hut, emergency bivouac, and storm insulation.
  * **🚩 Rescue Signals**: Ground-to-air symbols (`V`, `X`, `SOS`, 3 triangle fires).
  * **📡 Morse Code**: International Morse Code audio & character chart.

### 👥 7. Team Safety Roll Call & Battery Telemetry
* **One-Tap Roll Call**: Group leader triggers an instant team check-in prompt: `[ ✅ I'm OK ]` or `[ ⚠️ Need Assistance ]`.
* **Live Battery Telemetry**: Reads device battery percentage via `navigator.getBattery()` and shares status pills across the team.

### 🌗 8. Apple Dark & Light Mode
* Seamless, fluid toggle between Apple Light Mode (`#f5f5f7`) and Obsidian Dark Mode (`#0b0d14`).

---

## 🚀 Quick Start (Local & Hotspot)

### 1. Prerequisites
* [Node.js](https://nodejs.org/) (v16 or higher)

### 2. Installation
```bash
git clone https://github.com/your-username/meshchat.git
cd meshchat
npm install
```

### 3. Start the Local Offline Hub
```bash
npm start
```

### 4. Connect Devices Over Hotspot (Zero Internet)
1. Turn on **Mobile Hotspot** on one phone or laptop (**Mobile Data can be OFF**).
2. Connect your other phones/laptops to that Wi-Fi hotspot.
3. Open the browser and go to:
   ```text
   http://localhost:3000          (On the host computer)
   http://192.168.x.x:3000        (On other phones/laptops)
   ```
4. Or tap **"Connect Peers"** in the top header to scan the on-screen **QR Code** with your phone's camera!

---

## 🌐 Online Cloud Deployment

### Deploy on Render (Recommended for Free WebSockets):
1. Fork or push this repository to your GitHub.
2. Go to **[Render.com](https://render.com)** → **New +** → **Web Service**.
3. Connect your repo and set:
   * **Runtime**: `Node`
   * **Build Command**: `npm install`
   * **Start Command**: `node server.js`
4. Click **Create Web Service**. Your app is live with global HTTPS!

### Deploy on Vercel:
The repository includes a pre-configured [`vercel.json`](./vercel.json) for static asset routing. Link your GitHub repo to Vercel to host the frontend.

---

## 🧪 Automated Test Suite

MeshChat comes with 5 comprehensive automated test suites:

```bash
# Run all verification tests
node test_ws.js             # Core WebSocket messaging & storage
node test_call.js           # WebRTC Calling signaling pipeline
node test_features.js       # E2EE, GPS payload, reactions, and quoting
node test_map_ptt.js        # Tactical GPS map, breadcrumbs, and PTT radio
node test_survival_suite.js  # SOS emergency alert, Roll Call, and Battery telemetry
```

---

## 🔒 Security & Privacy

* **Zero Cloud Dependence**: Data flows directly across your local network and is never stored on external third-party servers.
* **On-Device Cryptography**: Messages are encrypted in the browser with **AES-256 GCM** before hitting the local network.
* **Zero Tracking**: No analytics, tracking pixels, or external CDNs required.

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute for personal, outdoor, or commercial projects.
