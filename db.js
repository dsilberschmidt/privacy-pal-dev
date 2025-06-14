const DB_NAME = 'PrivacyPalDB';
const DB_VERSION = 1;
const STORE_NAME = 'policies';

function openDB(callback) {
  const request = indexedDB.open(DB_NAME, DB_VERSION);

  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
    }
  };

  request.onsuccess = () => callback(null, request.result);
  request.onerror = () => callback(request.error, null);
}

function savePolicy(policy, callback) {
  openDB((err, db) => {
    if (err) return console.error(err);
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).add(policy);
    tx.oncomplete = () => callback && callback(null);
    tx.onerror = (e) => callback && callback(e);
  });
}

function getAllPolicies(callback) {
  openDB((err, db) => {
    if (err) return console.error(err);
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => callback(null, request.result);
    request.onerror = () => callback(request.error, null);
  });
}

function findPolicyByHash(hash, callback) {
  openDB((err, db) => {
    if (err) return callback(err);
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      const existing = request.result.find(p => p.hash === hash);
      callback(null, existing);
    };
    request.onerror = () => callback(request.error);
  });
}
