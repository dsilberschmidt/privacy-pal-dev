
import { savePolicy, findPolicyByHash, findLastPolicyBySite } from './db.js';

function getHash(str) {
  return crypto.subtle.digest('SHA-256', new TextEncoder().encode(str)).then(buf =>
    Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
  );
}

(async () => {
  const content = document.body?.innerText || '';
  const site = location.hostname;
  const url = location.href;
  const timestamp = new Date().toISOString();
  const hash = await getHash(content);

  const existing = await findPolicyByHash(hash);
  if (existing) {
    console.log('[PrivacyPal] Duplicate policy skipped');
    return;
  }

  const previous = await findLastPolicyBySite(site);
  const previousHash = previous?.hash || null;

  await savePolicy({ site, url, content, timestamp, hash, previousHash });
  console.log('[PrivacyPal] Saved new policy version for', site);
})();
