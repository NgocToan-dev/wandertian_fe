<template>
  <DynamicModal
    :title="title"
    @before-open="beforeOpen"
    @before-close="beforeClose"
    width="500"
  >
    <template #modal__content>
      <div class="form-group mt-2">
        <BaseInput
          label="Name"
          v-model="model.name"
          type="text"
          placeholder="Enter description"
        />
      </div>
    </template>
    <template #modal__footer="{ close }">
      <button @click="commandClick($global.Command.SAVE)" class="btn btn-primary btn-sm">
        Save
      </button>
      <button @click="close" class="btn btn-outline-danger btn-sm">Cancel</button>
    </template>
  </DynamicModal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useCategoryStore } from "@/store/dictionary/categoryStore";
import baseModal from "../../base/baseModal";

export default defineComponent({
  name: "CategoryDetail",
  extends: baseModal,
  setup(props) {
    const store = useCategoryStore();
    const module = 'category';
    return {
      store,
      module
    };
  },
});
</script>

<style lang="scss" scoped></style>
