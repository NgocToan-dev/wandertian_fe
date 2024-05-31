import { useCategoryStore } from "../store/dictionary/categoryStore";
import { useTagStore } from "../store/dictionary/tagStore";
import IndexedDB from "./indexedDB";

export const useConfigureFirstLoad = () => {
  const indexedDB = new IndexedDB();
  const initCacheData = async () => {
    await indexedDB.open("dictionary", 1, "di_cache");
    const listCache = ["category", "tag"];
    for (let i = 0; i < listCache.length; i++) {
      switch (listCache[i]) {
        case "category":
          const categoryStore = useCategoryStore();
          categoryStore.loadFullCache(categoryStore.module, indexedDB);
          break;
        case "tag":
          const tagStore = useTagStore();
          tagStore.loadFullCache(tagStore.module, indexedDB);
          break;
      }
    }
  };
  return {
    initCacheData,
  };
};
