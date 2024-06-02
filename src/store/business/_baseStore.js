// stores/counter.js

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
      async save(data) {
        return api.update(data._id, data);
      },
      // delete
      async delete(id) {
        return api.delete(id);
      },
    };
  }
}

export default BaseStore;
