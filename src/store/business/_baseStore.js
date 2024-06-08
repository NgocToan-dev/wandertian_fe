// stores/counter.js

import EditMode from "@/utilities/enum/EditMode";
import { socket } from "../../socket";

class BaseStore {
  // init with api
  constructor(api) {
    const me = this;
    me.state = {
      data: [],
    };
    me.getters = {};
    me.actions = {
      // get all by api
      async getAll() {
        return api.getAll();
      },
      // get by id
      async getById(id) {
        return api.getById(id);
      },
      async load(payload) {
        return api.load(payload);
      },
      async loadSummary(payload) {
        return api.loadSummary(payload);
      },
      async save(data) {
        let res = null;
        if (data.mode === EditMode.CREATE) {
          res = api.create(data);
        } else {
          res = api.update(data);
        }
        if (me.state.isDictionary) {
          this.invalidCache();
        }
        return res;
      },
      // delete
      async delete(id) {
        return api.delete(id);
      },
      async invalidCache() {
        socket.emit("message", {
          cacheName: me.state.module,
        });
      },
    };
  }
}

export default BaseStore;
