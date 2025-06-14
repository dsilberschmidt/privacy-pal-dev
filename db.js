
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("PrivacyPalDB", 1);
    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("policies")) {
        db.createObjectStore("policies", { keyPath: "hash" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export function savePolicy(policy) {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction("policies", "readwrite");
      const store = tx.objectStore("policies");
      const request = store.put(policy);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  });
}

export function findPolicyByHash(hash) {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction("policies", "readonly");
      const store = tx.objectStore("policies");
      const request = store.get(hash);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  });
}

export function findLastPolicyBySite(site) {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction("policies", "readonly");
      const store = tx.objectStore("policies");
      const request = store.getAll();
      request.onsuccess = () => {
        const all = request.result;
        const filtered = all.filter(p => p.site === site);
        const latest = filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
        resolve(latest || null);
      };
      request.onerror = () => reject(request.error);
    });
  });
}

export function getAllPolicies() {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction("policies", "readonly");
      const store = tx.objectStore("policies");
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  });
}

export function clearPolicies() {
  return openDB().then(db => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction("policies", "readwrite");
      const store = tx.objectStore("policies");
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  });
}
