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
      const data = await this.store.load();
      if (data) {
        this.items = data;
      }
    },
    async refresh() {
      this.items = await this.store.load();
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
