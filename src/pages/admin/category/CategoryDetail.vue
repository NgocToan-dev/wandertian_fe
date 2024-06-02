<template>
  <DynamicModal
    title="Category"
    @before-open="beforeOpen"
    @before-close="beforeClose"
    width="500"
    height="300"
  >
    <template #modal__content>
      <div class="form-group">
        <label for="ID">ID</label>
        <input
          v-model="model.category_id"
          type="text"
          class="form-control"
          id="ID"
          placeholder="Enter ID"
        />
      </div>
      <div class="form-group mt-2">
        <label for="name">Name</label>
        <input
          v-model="model.category_name"
          type="text"
          class="form-control"
          id="name"
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
import { useCategoryStore } from "@/store/dictionary/categoryStore";
import baseModal from "../../base/baseModal";

export default defineComponent({
  name: "CategoryDetail",
  extends: baseModal,
  setup(props) {
    const store = useCategoryStore();
    return {
      store,
    };
  },
});
</script>

<style lang="scss" scoped></style>
