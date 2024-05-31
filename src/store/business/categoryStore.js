import { defineStore } from "pinia";
import BaseStore from "./_baseStore";
import categoryApi from "../../apis/business/categoryApi";

const categoryStore = new BaseStore(categoryApi);

export const useCategoryStore = defineStore("categoryStore", {
  state: () => ({ ...categoryStore.state }),
  getters: {
    ...categoryStore.getters,
  },
  actions: {
    ...categoryStore.actions,
  },
});
