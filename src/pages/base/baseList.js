export default {
  data() {
    return {};
  },
  methods: {
    async refresh() {
      this.data = await this.store.load();
    },
  },
};
