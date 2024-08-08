import { defineStore } from "pinia";
import categoryApi from "../../apis/business/categoryApi";
import BaseDictionaryStore from "./_baseDictionaryStore";
import IBaseStore from "@/interfaces/store/IBaseStore";

const categoryStore: IBaseStore = new BaseDictionaryStore(categoryApi);

export const useCategoryStore = defineStore("categoryStore", {
  state: () => ({ ...categoryStore.state, module: "category" }),
  getters: {
    ...categoryStore.getters,
  },
  actions: {
    ...categoryStore.actions,
  },
});
