
import { savePolicy, findPolicyByHash } from "./db.js";

chrome.runtime.onInstalled.addListener(() => {
  console.log("[PrivacyPal] Extension installed.");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("[PrivacyPal] Received message:", message);

  if (message.action === "checkAndSavePolicy") {
    const { site, url, text, timestamp } = message.data;

    console.log("[PrivacyPal] TEXT BEING HASHED:", text.slice(0, 500));

    crypto.subtle.digest("SHA-256", new TextEncoder().encode(text))
      .then(buf => {
        const hash = Array.from(new Uint8Array(buf))
          .map(b => b.toString(16).padStart(2, "0"))
          .join("");

        console.log(`[PrivacyPal] HASH: ${hash}`);

        findPolicyByHash(hash).then(existing => {
          if (existing) {
            console.log("[PrivacyPal] Already saved:", existing);
            return;
          }

          const policy = { site, url, text, timestamp, hash };
          console.log("[PrivacyPal] Saving new version:", policy);
          savePolicy(policy).then(() => {
            console.log(`[PrivacyPal] Saved new version for ${site}`);
          });
        });
      });

    return true;
  }
});
