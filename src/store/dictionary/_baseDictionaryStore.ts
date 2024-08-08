// stores/counter.js

import IBaseStore from "@/interfaces/store/IBaseStore";
import BaseStore from "../business/_baseStore";

class BaseDictionaryStore extends BaseStore {
  // init with api
  constructor(api: any) {
    super(api);
    const me: any = this;
    me.state = {
      ...me.state,
      isDictionary: true,
    };
    me.getters = {
      ...me.getters,
    };
    me.actions = {
      ...me.actions,
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
