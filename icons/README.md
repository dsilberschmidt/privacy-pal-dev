# PrivacyPal 🛡️

**PrivacyPal** is a browser extension that helps users take control of their personal data by capturing and storing privacy policies and terms of service locally — fully offline, with no tracking.

## 🚀 Features (MVP)

- Detects when you're viewing a Privacy Policy or Terms of Service
- Extracts and saves the full visible text of the page locally
- Stores domain, timestamp, and URL
- Provides a popup UI to review saved policies

All data is stored locally using `indexedDB`, and no data ever leaves your machine.

## 🛠️ Technologies

- JavaScript (Vanilla)
- Manifest V3
- IndexedDB API
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

- Policy diffing on revisit
- Form data watcher
- Scheduled reminders for deletion
- Leak alert integration (local-only)

## 🕵️ Incognito Mode and Expected Behavior

PrivacyPal can be used in incognito mode if explicitly enabled:

1. Go to `chrome://extensions/`
2. Click “Details” on PrivacyPal
3. Enable **“Allow in Incognito”**

📌 In incognito, Brave does **not allow pinning** the extension to the toolbar.  
You can access it from the 🧩 Extensions menu.

### Example from a test session

![PrivacyPal popup example](demo/demo.png)  
*Two saved entries from mozilla.org displayed in the popup.*

🧠 Note: IndexedDB works in incognito but clears all data once the session is closed.

## 📄 License

MIT

## 🤝 Team

Built during [W3PN Hacks 2025](https://github.com/web3privacy/hackathon-2025-berlin)  
by Daniel (@Cactus Sediento) & ChatGPT

We need Privacy.  
Privacy needs us.
