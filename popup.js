
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

  document.getElementById('resetBtn').addEventListener("click", function () {
    if (confirm("Are you sure you want to delete all saved policies?")) {
      chrome.runtime.sendMessage({ action: 'resetDB' }, () => location.reload());
    }
  });

  document.getElementById('pingWorker').addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: 'getAllPolicies' }, (res) => {
      console.log('[PrivacyPal] Pinged background, got:', res);
    });
  });
});
