import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      model: {},
      mode: this.$attrs.params.mode,
    };
  },
  mounted() {
    this.model = { ...this.$attrs.params.data };
  },
  methods: {
    beforeOpen() {},
    beforeClose() {},

    async commandClick(command) {
      switch (command) {
        case this.$global.Command.SAVE:
          await this.save();
          break;
      }
    },
    /**
     * Save data
     */
    async save() {
      try {
        await this.store.save({ ...this.model, mode: this.mode });
        this.$emit("confirm");
        this.$toast.success("Save success");
        await this.$attrs.params.callbackLoad();
      } catch (e) {
        this.$toast.error("Save failed");
      }
    },
  },
});
