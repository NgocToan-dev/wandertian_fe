import { reactive } from "vue";
import { io } from "socket.io-client";
import { useConfigureFirstLoad } from "./utilities/configureFirstLoad";
import httpConfig from "./apis/httpConfig";

export const state = reactive({
  connected: false,
  messages: [],
});

const URL = httpConfig.socket;

export const socket = io(URL, {
  withCredentials: true,
});

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});

socket.on("update_di_cache", async (socket_param) => {
  // Update record in indexedDB cache when receive message from server
  const { initCacheData } = useConfigureFirstLoad();
  await initCacheData([socket_param.table], true);
  state.messages.push(message);
});
