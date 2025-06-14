
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
    chrome.runtime.sendMessage({
      action: 'checkAndSavePolicy',
      data: { site, url, timestamp, text, hash }
    });
  });
}
