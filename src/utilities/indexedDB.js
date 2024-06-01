/**
 * Represents an IndexedDB utility class for performing CRUD operations.
 */
class IndexedDB {
  _db = null;
  _request = null;
  _table = null;

  /**
   * Opens a connection to an IndexedDB database.
   * @param {string} name - The name of the database.
   * @param {number} version - The version of the database.
   * @returns {Promise<IDBDatabase>} A promise that resolves with the opened database.
   */
  open(name, version, storeName) {
    const me = this;
    me._request = window.indexedDB.open(name, version);

    me._request.onupgradeneeded = function(event) {
      me._db = event.target.result;
      if (!me._db.objectStoreNames.contains(storeName)) {
        me._db.createObjectStore(storeName);
      }
    };
    return new Promise((resolve, reject) => {
      me._request.onsuccess = (event) => {
        me._db = event.target.result;
        resolve(me._db);
      };

      me._request.onerror = (event) => {
        reject(event);
      };
    });
  }
  /**
   * Creates a new record in the specified object store.
   * @param {string} storeName - The name of the object store.
   * @param {any} data - The data to be added as a new record.
   */
  async create(storeName, data) {
    if (!this._db) return;
    const transaction = this._db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    store.add(data.data, data.name);
  }

  /**
   * Reads a record from the specified object store based on the given key.
   * @param {string} storeName - The name of the object store.
   * @param {any} key - The key of the record to be read.
   * @returns {Promise<any>} A promise that resolves with the retrieved record.
   */
  async read(storeName, key) {
    if (!this._db) return;
    const transaction = this._db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    return new Promise((resolve, reject) => {
      const request = store.get(key);
      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        reject(event);
      };
    });
  }

  /**
   * Updates a record in the specified object store based on the given key.
   * @param {string} storeName - The name of the object store.
   * @param {any} key - The key of the record to be updated.
   * @param {any} data - The updated data for the record.
   */
  async update(storeName, key, data) {
    if (!this._db) return;
    const transaction = this._db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    store.put(data, key);
  }

  /**
   * Deletes a record from the specified object store based on the given key.
   * @param {string} storeName - The name of the object store.
   * @param {any} key - The key of the record to be deleted.
   */
  async delete(storeName, key) {
    if (!this._db) return;
    const transaction = this._db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    store.delete(key);
  }

  /**
   * Clears all records from the specified object store.
   * @param {string} storeName - The name of the object store.
   */
  async clear(storeName) {
    if (!this._db) return;
    const transaction = this._db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    store.clear();
  }

  /**
   * Closes the connection to the IndexedDB database.
   */
  close() {
    if (!this._db) return;
    this._db.close();
  }
}

export default IndexedDB;
