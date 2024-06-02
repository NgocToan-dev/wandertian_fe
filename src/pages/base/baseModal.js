import { ref } from "vue";

export default {
  setup(proxy, props) {
    const beforeOpen = () => {};
    const beforeClose = () => {};
    const model = ref([]);
    if (proxy.$attrs.data) {
      model.value = { ...proxy.$attrs.data };
    }
    const commandClick = async (command) => {
      switch (command) {
        case "save":
          await save();
          break;
      }
    };
    /**
     * Save data
     */
    const save = async () => {
      try {
        await proxy.store.save(model.value);
        proxy.$emit("confirm");
        proxy.$toast.success("Save success");
      } catch (e) {
        proxy.$toast.error("Save failed");
      }
    };
    return {
      model,
      beforeOpen,
      beforeClose,
      commandClick,
    };
  },
};
