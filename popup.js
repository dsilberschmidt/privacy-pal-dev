document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('policies');
  const resetBtn = document.getElementById('resetBtn');

  chrome.runtime.sendMessage({ action: 'getAllPolicies' }, (policies) => {
    if (!policies || policies.length === 0) {
      container.textContent = 'No policies saved yet.';
      return;
    }

    const list = document.createElement('ul');
    policies.forEach(policy => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = policy.url;
      link.textContent = `${policy.site} (${new Date(policy.timestamp).toLocaleDateString()})`;
      link.target = '_blank';
      item.appendChild(link);
      list.appendChild(item);
    });

    container.innerHTML = '';
    container.appendChild(list);
  });

  resetBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to delete all stored policies?")) {
      chrome.runtime.sendMessage({ action: 'resetDB' }, (res) => {
        alert("✅ DB cleared!");
        location.reload();
      });
    }
  });
});
