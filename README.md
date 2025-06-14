# PrivacyPal 🛡️

**PrivacyPal** is a browser extension that helps users take control of their personal data by capturing and storing privacy policies and terms of service locally — fully offline, with no tracking.

## 🚀 Features (MVP)

- Detects when you're viewing a Privacy Policy or Terms of Service
- Extracts and saves the full visible text of the page locally
- Stores domain, timestamp, and URL
- Provides a popup UI to review saved policies

All data is stored locally using `chrome.storage.local`, and no data ever leaves your machine.

## 🛠️ Technologies

- JavaScript (Vanilla)
- Manifest V3
- chrome.storage API
- Popup UI (HTML/CSS/JS)

## 📦 Install & Test

1. Clone this repository
2. In your browser (Chrome/Brave):
   - Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click “Load unpacked”
   - Select the folder with this project
3. Visit a URL like `https://example.com/privacy` or `https://example.com/terms`
4. Click the extension icon to see stored policies

## 🔮 Roadmap

- IndexedDB with full-text search
- Policy diffing on revisit
- Form data watcher
- Scheduled reminders for deletion
- Leak alert integration (local-only)

## 📄 License

MIT

## 🤝 Team

Built during [W3PN Hacks 2025](https://github.com/web3privacy/hackathon-2025-berlin)  
by Daniel (@Cactus Sediento) & ChatGPT

We need Privacy.  
Privacy needs us.

---

## 🧠 AIML API Integration (optional)

To enable local analysis of privacy policies using [AIMLAPI](https://aimlapi.com):

1. Copy `config.template.js` to `config.js`
2. Paste your AIML API key into `config.js`
3. When viewing a policy, the extension will generate an AI summary and store it locally

> ⚠️ `config.js` is excluded from Git to protect your private key.
