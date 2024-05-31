import { defineStore } from "pinia";
import IndexedDB from "../../utilities/indexedDB";

export const cacheStore = defineStore("cache", {
  state: () => ({
    cache: null,
  }),

  actions: {
    async initCache() {
      return new Promise((resolve, reject) => {
        const request = new IndexedDB("di_cache", 1).open();
        request.then((db) => {
          this.cache = db;
          resolve();
        });
      });
    },
  },
});
