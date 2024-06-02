import { ref } from "vue";
import { useCategoryStore } from "../store/dictionary/categoryStore";
import { useTagStore } from "../store/dictionary/tagStore";
import IndexedDB from "./indexedDB";

export const useConfigureFirstLoad = () => {
  const indexedDB = new IndexedDB();
  const _isLoadApi = ref(false);
  const initCacheData = async (listCache, isLoadApi) => {
    await indexedDB.open("dictionary", 1, "di_cache");
    _isLoadApi.value = isLoadApi;
    for (let i = 0; i < listCache.length; i++) {
      switch (listCache[i]) {
        case "category":
          const categoryStore = useCategoryStore();
          await loadCache(categoryStore, listCache[i]);
          break;
        case "tag":
          const tagStore = useTagStore();
          await loadCache(tagStore, listCache[i]);
          break;
      }
    }
  };
  const loadCache = async (store, module) => {
    store.$state.indexedDB = indexedDB;
    store.$state.module = module;
    await store.loadFullCache(_isLoadApi.value);
  };
  return {
    initCacheData,
  };
};
