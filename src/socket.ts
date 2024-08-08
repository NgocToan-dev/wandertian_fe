import { reactive } from "vue";
import { io } from "socket.io-client";
import { useConfigureFirstLoad } from "./utilities/configureFirstLoad";
import httpConfig from "./apis/httpConfig";

class SocketIO {
  state: any = reactive({
    connected: false,
    messages: [],
  });
  socket: any = null;
  URL = httpConfig.socket;
  constructor() {
    this.socket = io(this.URL, {
      withCredentials: true,
    });

    this.socket.on("connect", () => {
      this.state.connected = true;
    });

    this.socket.on("disconnect", () => {
      this.state.connected = false;
    });

    this.socket.on("update_di_cache", async (socket_param: any) => {
      // Update record in indexedDB cache when receive message from server
      const { initCacheData } = useConfigureFirstLoad();
      await initCacheData([socket_param.table], true);
    });
  }
}
export default SocketIO;
