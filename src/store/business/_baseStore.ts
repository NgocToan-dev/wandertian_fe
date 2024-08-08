// stores/counter.js

import EditMode from "@/utilities/enum/EditMode";
import SocketIO from "../../socket";
import IBaseEntity from "@/interfaces/entity/IBaseEntity";

class BaseStore {
  state: any;
  getters: any;
  actions: any;
  // init with api
  constructor(api: any) {
    const me: any = this;
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
      async getById(id: string) {
        return api.getById(id);
      },
      async load(payload: any) {
        return api.load(payload);
      },
      async loadSummary(payload: any) {
        return api.loadSummary(payload);
      },
      async save(data: IBaseEntity) {
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
      async delete(id: string) {
        return api.delete(id);
      },
      async invalidCache() {
        new SocketIO().socket.emit("message", {
          cacheName: me.state.module,
        });
      },
    };
  }
}

export default BaseStore;
