
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('policies');
  const resetBtn = document.getElementById('resetBtn');

  chrome.runtime.getBackgroundPage((bg) => {
    if (bg && bg.getAllPolicies) {
      bg.getAllPolicies((err, policies) => {
        if (err) {
          container.innerText = 'Failed to load policies.';
          return;
        }
        if (policies.length === 0) {
          container.innerText = 'No policies stored yet.';
        } else {
          policies.forEach(p => {
            const el = document.createElement('div');
            el.className = 'policy';
            el.innerHTML = `<strong>${p.site}</strong><br><small>${p.url}</small><br><em>${p.timestamp}</em>`;
            container.appendChild(el);
          });
        }
      });
    }
  });

  resetBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to delete all stored policies?")) {
      chrome.runtime.getBackgroundPage((bg) => {
        if (bg && bg.resetDB) {
          bg.resetDB((err) => {
            if (err) {
              alert("❌ Failed to reset DB");
            } else {
              alert("✅ PrivacyPal DB cleared!");
              location.reload();
            }
          });
        } else {
          alert("⚠️ Cannot access background page");
        }
      });
    }
  });
});
