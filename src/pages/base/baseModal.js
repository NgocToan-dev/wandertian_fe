import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      model: {},
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
        case "save":
          await save();
          break;
      }
    },
    /**
     * Save data
     */
    async save() {
      try {
        await this.store.save(this.model);
        this.$emit("confirm");
        this.$toast.success("Save success");
        this.$attrs.params.callbackLoad();
      } catch (e) {
        this.$toast.error("Save failed");
      }
    },
  },
});
