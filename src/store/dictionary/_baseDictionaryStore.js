// stores/counter.js

import BaseStore from "../business/_baseStore";

class BaseDictionaryStore extends BaseStore {
  // init with api
  constructor(api) {
    super(api);
    this.state = {
      data: [],
    };
    this.getters = {};
    this.actions = {
      // Get full data from api and push to di_cache in indexedDB
      async loadFullCache(moduleName, indexedDB) {
        const name = "di_cache";
        const cacheName = `di_cache_${moduleName}`;
        let data = [];
        data = await indexedDB.read(name, cacheName);
        if (!data) {
          data = await api.getAll();
          const cache = {
            name: cacheName,
            data: data,
          };
          indexedDB.create(name, cache);
        }

        this.$state.data = data;
      },
    };
  }
}

export default BaseDictionaryStore;
