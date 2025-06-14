
import { savePolicy, findPolicyByHash, findLastPolicyBySite } from './db.js';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'checkAndSavePolicy') {
    const { site, url, text, timestamp, hash } = message.data;

    findPolicyByHash(hash).then(existing => {
      if (existing) {
        console.log('[PrivacyPal] Duplicate policy. Not saving.');
        return sendResponse({ duplicate: true });
      }

      findLastPolicyBySite(site).then(previous => {
        const previousHash = previous?.hash || null;
        const policy = { site, url, text, timestamp, hash, previousHash };
        savePolicy(policy).then(() => {
          console.log(`[PrivacyPal] Saved new version for ${site}`);
          sendResponse({ saved: true });
        }).catch(err => {
          console.error('[PrivacyPal] Failed to save policy', err);
          sendResponse({ saved: false });
        });
      });
    });

    return true; // Keep sendResponse alive async
  }

  if (message.action === 'getAllPolicies') {
    import('./db.js').then(({ getAllPolicies }) => {
      getAllPolicies().then(sendResponse);
    });
    return true;
  }

  if (message.action === 'resetDB') {
    import('./db.js').then(({ clearPolicies }) => {
      clearPolicies().then(() => sendResponse({ success: true }))
        .catch(() => sendResponse({ success: false }));
    });
    return true;
  }
});
