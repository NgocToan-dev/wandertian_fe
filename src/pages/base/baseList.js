import { useLoadingStore } from "@/store/common/loadingStore";
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
      const mask = useLoadingStore();
      try {
        mask.show();
        const data = await this.store.load();
        if (data) {
          this.items = data;
        }
      } finally {
        mask.hide();
      }
    },
    async refresh() {
      const mask = useLoadingStore();
      try {
        mask.show();
        this.items = await this.store.load();
      } finally {
        mask.hide();
      }
    },
    editRow(record) {
      this.$router.push({
        name: this.formDetail,
        params: { id: record._id },
        query: { mode: EditMode.EDIT },
      });
    },
    deleteRow(record) {
      showInfo(
        `Are you sure you want to delete <b>${record.title}</b> record?`,
        "Warning",
        async () => {
          await this.store.delete(record._id);
          this.$toast.success("Record deleted successfully.");
          await this.refresh();
        }
      );
    },
  },
};
