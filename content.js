
function extractVisibleText() {
  return Array.from(document.body.querySelectorAll('*'))
    .filter(el => el.offsetParent !== null)
    .map(el => el.innerText || '')
    .join('\n')
    .trim();
}

function isPolicyPage(url) {
  return /privacy|terms|policy|legal/i.test(url);
}

function hashText(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  return crypto.subtle.digest('SHA-256', data).then(hashBuffer =>
    Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
  );
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
    console.log('[PrivacyPal] Policy sent to background:', { site, url, hash });
  });
}
