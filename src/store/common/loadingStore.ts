import IBaseStore from "@/interfaces/store/IBaseStore";
import { defineStore } from "pinia";
import { useLoading } from "vue-loading-overlay";

interface ILoadingStoreAction {
  show: (container: any) => void;
  hide: () => void;
}
interface ILoadingStoreState {
  loader: any;
}
export const useLoadingStore = defineStore('loadingStore',{
  state: (): ILoadingStoreState => ({
    loader: null,
  }),
  actions: {
    show(container: any) {
      const me: any = this;
      const state: ILoadingStoreState = me.$state;
      state.loader =
        state.loader || useLoading({ container: container || null });
      const loadHide = state.loader.show({
        // Optional parameters
        container: container || null,
        color: "#0D6EFD",
        loader: "spinner",
        zIndex: 999,
      });
      state.loader.hide = loadHide.hide;
    },
    hide() {
      const me: any = this;
      const state: ILoadingStoreState = me.$state;
      state.loader.hide();
    },
  } as ILoadingStoreAction,
} as IBaseStore);
