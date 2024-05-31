import { defineStore } from "pinia";

export const cacheStore = defineStore("cache", {
  state: () => ({
    cache: null,
  }),

  actions: {
    async initCache() {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open("myCache", 1);

        request.onerror = (event) => {
          console.error("Error opening database:", event.target.error);
          reject(event.target.error);
        };

        request.onsuccess = (event) => {
          this.cache = event.target.result;
          resolve();
        };

        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          const objectStore = db.createObjectStore("data", { keyPath: "id" });
          // Add any additional indexes or configurations here
        };
      });
    },

    async fetchDataFromServer() {
      // Fetch data from the server and store it in the cache
      // You can use any HTTP library of your choice, such as axios or fetch
      const response = await fetch("https://api.example.com/data");
      const data = await response.json();

      const transaction = this.cache.transaction("data", "readwrite");
      const objectStore = transaction.objectStore("data");

      data.forEach((item) => {
        objectStore.put(item);
      });

      await transaction.complete;
    },

    async getDataFromCache() {
      return new Promise((resolve, reject) => {
        const transaction = this.cache.transaction("data", "readonly");
        const objectStore = transaction.objectStore("data");
        const request = objectStore.getAll();

        request.onerror = (event) => {
          console.error(
            "Error retrieving data from cache:",
            event.target.error
          );
          reject(event.target.error);
        };

        request.onsuccess = (event) => {
          resolve(event.target.result);
        };
      });
    },
  },
});
