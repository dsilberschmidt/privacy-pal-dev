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

  if (message.action === 'resetDB') {
    resetDB((err) => {
      if (err) {
        console.error("❌ Failed to reset DB");
        sendResponse({ success: false });
      } else {
        console.log("✅ DB cleared by popup");
        sendResponse({ success: true });
      }
    });
    return true; // Needed to use async sendResponse
  }

  if (message.action === 'getAllPolicies') {
    getAllPolicies((err, policies) => {
      sendResponse(policies || []);
    });
    return true; // Needed to use async sendResponse
  }
});
