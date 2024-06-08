import commonFn from "@/utilities/commonFn";
import EditMode from "@/utilities/enum/EditMode";
import { showInfo } from "@/utilities/modalRegister/messageBox";

export default {
  data() {
    return {
      items: [],
      formDetail: "",
    };
  },
  async mounted() {
    await this.initData();
  },
  methods: {
    async initData() {
      try {
        let loader = commonFn.showMask();
        const data = await this.store.load();
        if (data) {
          this.items = data;
        }
      } finally {
        commonFn.hideMask(loader);
      }
    },
    async refresh() {
      try {
        commonFn.showMask();
        this.items = await this.store.load();
      } finally {
        commonFn.hideMask();
      }
    },
    editRow(record) {
      this.$router.push({
        name: this.formDetail,
        params: { id: record._id, editMode: EditMode.EDIT },
      });
    },
    deleteRow(record) {
      showInfo(
        `Are you sure you want to delete <b>${record.title}</b> record?`,
        "Warning",
        () => {
          this.store.delete(record._id);
          this.$toast.success("Record deleted successfully.");
          this.refresh();
        }
      );
    },
  },
};
