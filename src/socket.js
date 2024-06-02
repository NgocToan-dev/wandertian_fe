import { reactive } from "vue";
import { io } from "socket.io-client";
import { useConfigureFirstLoad } from "./utilities/configureFirstLoad";

export const state = reactive({
  connected: false,
  messages: [],
});

const URL = "http://localhost:1111";

export const socket = io(URL, {
  withCredentials: true,
});

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});

socket.on("message", async (message) => {
  // Update record in indexedDB cache when receive message from server
  const { initCacheData } = useConfigureFirstLoad();
  await initCacheData(["category"], true);
  state.messages.push(message);
});
