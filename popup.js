
document.addEventListener("DOMContentLoaded", () => {
  chrome.runtime.sendMessage({ action: "getAllPolicies" }, (policies) => {
    const list = document.getElementById("policyList");
    list.innerHTML = "";

    if (!policies || policies.length === 0) {
      list.innerHTML = "<li>No policies saved yet.</li>";
      return;
    }

    policies.sort((a, b) => b.timestamp - a.timestamp);

    policies.forEach((p) => {
      const li = document.createElement("li");
      const date = new Date(p.timestamp).toLocaleString();
      const summary = p.analysis ? `<div class='summary'><strong>AI Summary:</strong><br>${p.analysis}</div>` : "";
      li.innerHTML = `<strong>${p.site}</strong> - ${date}<br><a href="${p.url}" target="_blank">${p.url}</a>${summary}`;
      list.appendChild(li);
    });
  });

  document.getElementById("resetBtn").addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all saved policies?")) {
      chrome.runtime.sendMessage({ action: "resetDB" }, (res) => {
        if (res.success) location.reload();
      });
    }
  });
});
