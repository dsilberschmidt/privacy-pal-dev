
document.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(tc => tc.classList.remove('active'));

      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.tab);
      if (target) target.classList.add('active');
    });
  });

  const policyList = document.getElementById('policyList');
  const resetBtn = document.getElementById('resetBtn');

  chrome.storage.local.get(null, function (items) {
    const keys = Object.keys(items).filter(key => key.startsWith("policy:"));
    if (keys.length === 0) {
      policyList.innerHTML = "<li>No policies saved.</li>";
      return;
    }
    policyList.innerHTML = "";
    keys.forEach(key => {
      const entry = items[key];
      const li = document.createElement("li");
      li.textContent = `[${entry.timestamp}] ${entry.domain}`;
      policyList.appendChild(li);
    });
  });

  resetBtn.addEventListener("click", function () {
    if (confirm("Are you sure you want to delete all saved policies?")) {
      chrome.storage.local.clear(() => location.reload());
    }
  });
});
