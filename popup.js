
import { getAllPolicies, clearPolicies } from './db.js';

function render(policies) {
  const container = document.getElementById('policy-list');
  container.innerHTML = '';
  const grouped = {};

  policies.forEach(p => {
    if (!grouped[p.site]) grouped[p.site] = [];
    grouped[p.site].push(p);
  });

  Object.entries(grouped).forEach(([site, versions]) => {
    versions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    const group = document.createElement('div');
    group.className = 'policy';
    group.innerHTML = `<div class="site">${site}</div>`;
    versions.forEach(v => {
      const block = document.createElement('div');
      block.innerHTML = `
        <div class="timestamp">${v.timestamp}</div>
        <div class="content">${v.content.slice(0, 300)}...</div>
      `;
      group.appendChild(block);
    });
    container.appendChild(group);
  });

  if (policies.length === 0) {
    container.innerText = 'No saved policies yet.';
  }
}

document.getElementById('reset').onclick = async () => {
  await clearPolicies();
  render([]);
};

getAllPolicies().then(render);
