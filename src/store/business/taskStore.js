import { defineStore } from "pinia";
import BaseStore from "./_baseStore";
import taskApi from "@/apis/business/taskApi";

const taskStore = new BaseStore(taskApi);

export const useTaskStore = defineStore("taskStore", {
  state: () => ({ ...taskStore.state, module: "task" }),
  getters: {
    ...taskStore.getters,
  },
  actions: {
    ...taskStore.actions,
  },
});
