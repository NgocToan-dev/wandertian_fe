import EditMode from "@/utilities/enum/EditMode";
import modalRegister from "@/utilities/modalRegister";
import { showInfo } from "@/utilities/modalRegister/messageBox";
export default {
  data() {
    return {
      formDetail: null,
    };
  },
  methods: {
    add() {
      if (this.formDetail) {
        const params = {
          data: {},
          callbackLoad: this.refresh,
          mode: EditMode.CREATE,
        };
        modalRegister.openModal(this.formDetail, params);
      }
    },
    async editRow(row) {
      if (this.formDetail) {
        const params = {
          data: row,
          callbackLoad: this.refresh,
          mode: EditMode.EDIT,
        };
        modalRegister.openModal(this.formDetail, params);
      }
    },
    deleteRow(row) {
      showInfo(
        `Are you sure to delete <b>${row.name}</b>?`,
        "Delete",
        async () => {
          await this.store.delete(row._id);
          this.$toast.success("Delete success");
          await this.refresh();
        }
      );
    },
    async refresh() {
      this.data = await this.store.getAll();
    },
  },
};
