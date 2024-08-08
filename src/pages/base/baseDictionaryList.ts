import EditMode from "@/utilities/enum/EditMode";
import modalRegister from "@/utilities/modalRegister";
import { showInfo } from "@/utilities/modalRegister/messageBox";
export default {
  data() {
    return {
      formDetail: "" as string,
    };
  },
  methods: {
    add() {
      const me: any = this;
      if (me.formDetail) {
        const params = {
          data: {},
          callbackLoad: this.refresh,
          mode: EditMode.CREATE,
        };
        modalRegister.openModal(me.formDetail, params);
      }
    },
    async editRow(row: any) {
      const me: any = this;
      if (me.formDetail) {
        const params = {
          data: row,
          callbackLoad: this.refresh,
          mode: EditMode.EDIT,
        };
        modalRegister.openModal(me.formDetail, params);
      }
    },
    deleteRow(row: any) {
      const me: any = this;
      showInfo(
        `Are you sure to delete <b>${row.name}</b>?`,
        "Delete",
        async () => {
          await me.store.delete(row._id);
          me.$toast.success("Delete success");
          await this.refresh();
        },
      );
    },
    async refresh() {
      const me: any = this;
      me.data = await me.store.getAll();
    },
  },
};
