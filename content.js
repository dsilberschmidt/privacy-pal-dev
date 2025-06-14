function isPolicyPage(url) {
  const policyKeywords = ['privacy', 'terms', 'policy'];
  return policyKeywords.some(kw => url.toLowerCase().includes(kw));
}

function extractVisibleText() {
  return document.body.innerText;
}

function hashText(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  return crypto.subtle.digest('SHA-256', data).then(hashBuffer => {
    return Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  });
}

if (isPolicyPage(window.location.href)) {
  const text = extractVisibleText();
  const site = window.location.hostname;
  const url = window.location.href;
  const timestamp = new Date().toISOString();

  hashText(text).then(hash => {
    findPolicyByHash(hash, (err, existing) => {
      if (existing) {
        console.log('[PrivacyPal] Policy already saved (hash match)');
        return;
      }

      savePolicy({ site, url, timestamp, text, hash }, () => {
        console.log(`[PrivacyPal] Saved new policy from ${site}`);
      });
    });
  });
}
