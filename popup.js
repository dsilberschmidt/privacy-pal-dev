document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('policy-list');

  chrome.storage.local.get({ policies: [] }, (result) => {
    const policies = result.policies;
    if (policies.length === 0) {
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
});
