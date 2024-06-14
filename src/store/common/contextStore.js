import { defineStore } from "pinia";

export const useContextStore = defineStore({
  id: "contextStore",
  state: () => ({
    context: null
  }),
  getters:{
    getContext: (state) => state.context || localStorage.getItem('context')
  },
  actions: {
    async loadContextStore(context){
      this.$state.context = context;
      localStorage.setItem('context', context);
    }
  },
});
