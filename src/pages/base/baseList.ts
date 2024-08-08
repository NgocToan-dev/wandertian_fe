import { useLoadingStore } from "@/store/common/loadingStore";
import EditMode from "@/utilities/enum/EditMode";
import modalRegister from "@/utilities/modalRegister";
import { showInfo } from "@/utilities/modalRegister/messageBox";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      items: [] as Array<any>,
      formDetail: "",
      formInline: false, // FormDetail is inline or Popup
    };
  },
  async mounted() {
    const me: any = this;
    await me.initData();
  },
  methods: {
    async initData() {
      const me: any = this;
      const mask = useLoadingStore();
      try {
        mask.show();
        const data = await me.store.load();
        if (data) {
          me.items = data;
        }
      } finally {
        mask.hide();
      }
    },
    async refresh() {
      const me: any = this;
      const mask = useLoadingStore();
      try {
        mask.show();
        me.items = await me.store.load();
      } finally {
        mask.hide();
      }
    },
    /**
     * NOTE: formInline is used for show form detail in popup or inline by router
     */
    editRow(record: any) {
      const me: any = this;
      if (me.formInline) {
        me.$router.push({
          name: me.formDetail,
          params: { id: record._id },
          query: { mode: EditMode.EDIT },
        });
      } else {
        modalRegister.openModal(me.formDetail, {
          model: record,
          mode: EditMode.EDIT,
        });
      }
    },
    /**
     * Xóa bản ghi record
     */
    deleteRow(record: any) {
      const me: any = this;
      showInfo(
        `Are you sure you want to delete <b>${record.title}</b> record?`,
        "Warning",
        async () => {
          await me.store.delete(record._id);
          me.$toast.success("Record deleted successfully.");
          await this.refresh();
        },
      );
    },
  },
});
