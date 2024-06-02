import modalRegister from "@/utilities/modalRegister";
export default {
  data() {
    return {
      formDetail: null,
    };
  },
  methods: {
    async editRow(row) {
      if (this.formDetail) {
        const params = {
          data: row,
          callbackLoad: this.refresh,
        };
        modalRegister.openModal(this.formDetail, params);
      }
    },
    async refresh() {
      this.data = await this.store.getAll();
    },
  },
};
