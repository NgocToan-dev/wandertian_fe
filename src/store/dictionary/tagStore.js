import { defineStore } from "pinia";
import BaseDictionaryStore from "./_baseDictionaryStore";
import tagApi from "@/apis/business/tagApi";

const tagStore = new BaseDictionaryStore(tagApi);

export const useTagStore = defineStore("tagStore", {
  state: () => ({ ...tagStore.state, module: "tag"}),
  getters: {
    ...tagStore.getters,
  },
  actions: {
    ...tagStore.actions,
  },
});
