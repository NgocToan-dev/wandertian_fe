import { defineStore } from "pinia";
import BaseStore from "./_baseStore";
import blogApi from "@/apis/business/blogApi";

const blogStore = new BaseStore(blogApi);

export const useBlogStore = defineStore("blogStore", {
  state: () => ({ ...blogStore.state, module: "blog" }),
  getters: {
    ...blogStore.getters,
  },
  actions: {
    ...blogStore.actions,
    async searchPostByTag(tag) {
      return await blogApi.searchPostByTag(tag);
    },
    async searchPostByCategory(category) {
      return await blogApi.searchPostByCategory(category);
    },
  },
});
