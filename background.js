importScripts("db.js", "config.js");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'checkAndSavePolicy') {
    const { site, url, timestamp, text, hash } = message.data;

    findPolicyByHash(hash, (err, existing) => {
      if (existing) {
        console.log('[PrivacyPal] Policy already saved (hash match)');
      } else {
        const policy = { site, url, timestamp, text, hash };
        if (typeof AIML_API_KEY === "string" && AIML_API_KEY.trim() !== "") {
          fetch("https://api.aimlapi.com/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${AIML_API_KEY}`
            },
            body: JSON.stringify({
              model: "gpt-3.5-turbo",
              messages: [
                { role: "system", content: "You are a privacy assistant. Summarize key risks and user rights in this privacy policy." },
                { role: "user", content: text.slice(0, 8000) } // truncar si es necesario
              ]
            })
          })
          .then(res => res.json())
          .then(data => {
            policy.analysis = data.choices?.[0]?.message?.content || "";
            savePolicy(policy, () => {
              console.log(`[PrivacyPal] Saved + analyzed policy from ${site}`);
            });
          })
          .catch(err => {
            console.error("AIML fetch error:", err);
            savePolicy(policy, () => {
              console.log(`[PrivacyPal] Saved policy without analysis`);
            });
          });
        } else {
          savePolicy(policy, () => {
            console.log(`[PrivacyPal] Saved policy (no analysis) from ${site}`);
          });
        }
      }
    });
  }

  if (message.action === 'resetDB') {
    resetDB((err) => {
      sendResponse({ success: !err });
    });
    return true;
  }

  if (message.action === 'getAllPolicies') {
    getAllPolicies((err, policies) => {
      sendResponse(policies || []);
    });
    return true;
  }
});
