
document.addEventListener("DOMContentLoaded", () => {
  const policyList = document.getElementById("policyList");
  const resetBtn = document.getElementById("resetBtn");

  // Mostrar las políticas almacenadas
  async function renderPolicies() {
    const db = await openDB();
    const tx = db.transaction("policies", "readonly");
    const store = tx.objectStore("policies");

    const request = store.getAll();
    request.onsuccess = (event) => {
      const policies = event.target.result;
      policyList.innerHTML = "";
      if (policies.length === 0) {
        policyList.innerHTML = "<li>No policies saved.</li>";
        return;
      }

      for (const policy of policies) {
        const li = document.createElement("li");
        li.textContent = `${policy.domain} - ${new Date(policy.timestamp).toLocaleString()}`;
        policyList.appendChild(li);
      }
    };
  }

  resetBtn.addEventListener("click", async () => {
    const db = await openDB();
    const tx = db.transaction("policies", "readwrite");
    tx.objectStore("policies").clear();
    tx.oncomplete = () => {
      renderPolicies(); // Refrescar vista tras limpiar
    };
  });

  renderPolicies();
});

// Necesario para abrir IndexedDB
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("PrivacyPalDB", 1);
    request.onerror = () => reject("DB failed to open");
    request.onsuccess = () => resolve(request.result);
  });
}
