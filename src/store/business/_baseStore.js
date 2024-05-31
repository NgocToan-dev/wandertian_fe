// stores/counter.js

class BaseStore {
    // init with api
  constructor(api) {
    const me = this;
    me.state = {
      data: [],
      loading: false,
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
      // create
      async create(data) {
        return api.create(data);
      },
      // update
      async update(id, data) {
        return api.update(id, data);
      },
      // delete
      async delete(id) {
        return api.delete(id);
      },
    };
  }
  
}

export default BaseStore;
