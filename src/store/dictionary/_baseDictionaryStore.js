// stores/counter.js

import BaseStore from "../business/_baseStore";

class BaseDictionaryStore extends BaseStore {
  // init with api
  constructor(api) {
    super(api);
    this.state = {
      ...this.state,
      isDictionary: true,
    };
    this.getters = {
      ...this.getters,
    };
    this.actions = {
      ...this.actions,
      // Get full data from api and push to di_cache in indexedDB
      async loadFullCache(isLoadApi = false) {
        const name = "di_cache";
        const cacheName = `di_cache_${this.$state.module}`;
        let data = [];
        data = await this.$state.indexedDB.read(name, cacheName);
        if (!data || isLoadApi) {
          this.$state.indexedDB.delete(name, cacheName);
          data = await api.getAll();
          const cache = {
            name: cacheName,
            data: data,
          };
          this.$state.indexedDB.create(name, cache);
        }

        this.$state.data = data;
      },
    };
  }
}

export default BaseDictionaryStore;
