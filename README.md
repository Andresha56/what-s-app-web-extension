# ChatShield

A privacy-focused Chrome extension for WhatsApp Web that helps protect chats from shoulder surfing by blurring sensitive content with configurable privacy controls.

---

<img width="970" height="856" alt="Screenshot 2026-05-14 125544" src="https://github.com/user-attachments/assets/d0007aec-b44b-44a0-aedd-421d3ba259f7" />

---

## Features

* Blur chat messages
* Blur left panel message previews
* Blur contact names
* Blur avatars
* Real-time privacy updates
* Persistent user preferences
* Lightweight and fast
* Works directly on WhatsApp Web

---

## Tech Stack

* React
* TypeScript
* Plasmo
* Tailwind CSS
* Chrome Extension APIs

---

## Installation

### Clone Repository

```bash
git clone https://github.com/Andresha56/what-s-app-web-extension.git
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

---

## Load Extension in Chrome

1. Open `chrome://extensions`
2. Enable Developer Mode
3. Click `Load unpacked`
4. Select:

```txt
build/chrome-mv3-dev
```

---

## Folder Structure

```txt
src/
├── contents/
├── popup/
├── shared/
├── storage/
└── styles/
```

---

## Architecture Highlights

* MutationObserver-based DOM updates
* Settings-driven privacy engine
* Persistent Chrome extension storage
* Modular content script architecture
* Centralized selector management
* No polling-based DOM scanning

---

## Planned Features

* Hover reveal
* Smart privacy presets
* Keyboard shortcuts
* Auto blur on inactivity
* Except active conversation mode

---

## License

MIT
