import { defineStore } from "pinia";

export const useContextStore = defineStore({
  id: "contextStore",
  state: () => ({
    context: null,
  }),
  getters: {
    getContext: (state) => {
      // Get cookie from state, if not found, get from localStorage
      return state.context || localStorage.getItem("context")
        ? JSON.parse(localStorage.getItem("context"))
        : null;
    },
  },
  actions: {
    async loadContextStore(context) {
      this.$state.context = context;
      localStorage.setItem("context", JSON.stringify(context));
    },
  },
});
