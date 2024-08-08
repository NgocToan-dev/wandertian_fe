import EditMode from "@/utilities/enum/EditMode";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      model: {} as any,
      mode: "" as string,
      title: "",
    };
  },
  mounted() {
    const me: any = this;
    me.model = { ...me.$attrs.params.data };
    me.mode = me.$attrs.params.mode;
    me.getTitleForm(me.mode);
  },
  methods: {
    beforeOpen() {},
    beforeClose() {},

    getTitleForm(mode: string) {
      const me: any = this;

      switch (mode) {
        case EditMode.CREATE:
          me.title = "New";
          break;
        case EditMode.EDIT:
          me.title = "Edit";
          break;
        default:
          return "";
      }
      me.title = [me.title,me.module].join(' ');
    },
    async commandClick(command: string) {
      const me: any = this;
      switch (command) {
        case me.$global.Command.SAVE:
          await this.save();
          break;
      }
    },
    /**
     * Save data
     */
    async save() {
      const me: any = this;
      try {
        await me.store.save({ ...this.model, mode: this.mode });
        this.$emit("confirm");
        this.$toast.success("Save success");
        await me.$attrs.params.callbackLoad();
      } catch (e) {
        me.$toast.error("Save failed");
      }
    },
  },
});
