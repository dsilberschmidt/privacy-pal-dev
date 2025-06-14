
import { savePolicy, findPolicyByHash, findLastPolicyBySite, getAllPolicies, clearPolicies } from './db.js';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('[PrivacyPal] Received message:', message);

  if (message.action === 'checkAndSavePolicy') {
    const { site, url, text, timestamp, hash } = message.data;

    findPolicyByHash(hash).then(existing => {
      if (existing) {
        console.log('[PrivacyPal] Duplicate policy. Not saving.');
        sendResponse({ duplicate: true });
      } else {
        findLastPolicyBySite(site).then(previous => {
          const previousHash = previous?.hash || null;
          const policy = { site, url, text, timestamp, hash, previousHash };

          savePolicy(policy).then(() => {
            console.log(`[PrivacyPal] Saved new version for ${site}`);
            sendResponse({ saved: true });
          }).catch(err => {
            console.error('[PrivacyPal] Failed to save policy:', err);
            sendResponse({ saved: false, error: err });
          });
        });
      }
    });

    return true; // keep sendResponse alive
  }

  if (message.action === 'getAllPolicies') {
    getAllPolicies().then(policies => {
      console.log('[PrivacyPal] Sending policies to popup:', policies);
      sendResponse(policies);
    });
    return true;
  }

  if (message.action === 'resetDB') {
    clearPolicies().then(() => {
      console.log('[PrivacyPal] DB cleared');
      sendResponse({ success: true });
    }).catch(() => {
      sendResponse({ success: false });
    });
    return true;
  }
});
