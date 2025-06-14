
importScripts("db.js");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'checkAndSavePolicy') {
    const { site, url, timestamp, text, hash } = message.data;

    findPolicyByHash(hash, (err, existing) => {
      if (existing) {
        console.log('[PrivacyPal] Policy already saved (hash match)');
      } else {
        savePolicy({ site, url, timestamp, text, hash }, () => {
          console.log(`[PrivacyPal] Saved new policy from ${site}`);
        });
      }
    });
  }
});
