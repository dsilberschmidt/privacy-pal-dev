function isPolicyPage(url) {
  const policyKeywords = ['privacy', 'terms', 'policy'];
  return policyKeywords.some(kw => url.toLowerCase().includes(kw));
}

function extractVisibleText() {
  return document.body.innerText;
}

if (isPolicyPage(window.location.href)) {
  const text = extractVisibleText();
  const site = window.location.hostname;
  const timestamp = new Date().toISOString();

  chrome.storage.local.get({ policies: [] }, (result) => {
    const policies = result.policies;
    policies.push({
      site,
      url: window.location.href,
      timestamp,
      text
    });

    chrome.storage.local.set({ policies }, () => {
      console.log(`[PrivacyPal] Saved policy from ${site}`);
    });
  });
}
