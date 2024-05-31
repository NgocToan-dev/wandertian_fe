// stores/counter.js

class BaseStore {
  state = {
    data: [],
    loading: false,
  };
  // init with api
  constructor(api) {
    this.api = api;
  }
  getters = {};
  actions = {
    // get all by api
    async getAll() {
      return this.api.getAll();
    },
    // get by id
    async getById(id) {
      return this.api.getById(id);
    },
    // create
    async create(data) {
      return this.api.create(data);
    },
    // update
    async update(id, data) {
      return this.api.update(id, data);
    },
    // delete
    async delete(id) {
      return this.api.delete(id);
    },
  };
}

export default BaseStore;
