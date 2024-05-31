import { defineStore } from "pinia";
import categoryApi from "../../apis/business/categoryApi";
import BaseDictionaryStore from "./_baseDictionaryStore";

const categoryStore = new BaseDictionaryStore(categoryApi);

export const useCategoryStore = defineStore("categoryStore", {
  state: () => ({ ...categoryStore.state, module: "category" }),
  getters: {
    ...categoryStore.getters,
  },
  actions: {
    ...categoryStore.actions,
  },
});
