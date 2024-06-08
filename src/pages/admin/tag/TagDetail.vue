<template>
  <DynamicModal
    title="Tag"
    @before-open="beforeOpen"
    @before-close="beforeClose"
    width="500"
  >
    <template #modal__content>
      <div class="form-group">
        <BaseInput
          label="Name"
          v-model="model.name"
          type="text"
          placeholder="Enter description"
        />
      </div>
    </template>
    <template #modal__footer="{ close }">
      <button @click="save" class="btn btn-primary btn-sm">Save</button>
      <button @click="close" class="btn btn-outline-danger btn-sm">Cancel</button>
    </template>
  </DynamicModal>
</template>

<script>
import { defineComponent, getCurrentInstance } from "vue";
import { useTagStore } from "@/store/dictionary/tagStore";
import baseModal from "@/pages/base/baseModal";

export default defineComponent({
  name: "TagDetail",
  extends: baseModal,
  setup(props) {
    const store = useTagStore();
    return {
      store,
    };
  },
});
</script>

<style lang="scss" scoped></style>
