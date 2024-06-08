import { defineStore } from "pinia";
import { useLoading } from "vue-loading-overlay";

export const useLoadingStore = defineStore({
  id: "loadingStore",
  state: () => ({
    loader: null,
  }),
  actions: {
    showMask(container) {
      this.$state.loader =
        this.$state.loader || useLoading({ container: container || null });
      const loadHide = this.$state.loader.show({
        // Optional parameters
        container: container || null,
        color: "#0D6EFD",
        loader: "spinner",
        zIndex: 999,
      });
      this.$state.loader.hide = loadHide.hide;
    },
    hideMask() {
      this.$state.loader.hide();
    },
  },
});
