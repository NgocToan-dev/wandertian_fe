export default {
  data() {
    return {
      items: [],
    };
  },
  async mounted() {
    await this.initData();
  },
  methods: {
    async initData() {
      const data = await this.store.load();
      if(data){
        this.items = data;
      }
    },
    async refresh() {
      this.items = await this.store.load();
    },
  },
};
