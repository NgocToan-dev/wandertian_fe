<template>
  <!-- List category with table view -->
  <div class="py-3 px-4 d-flex flex-column">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4>Category List</h4>
      <button class="btn btn-primary btn-sm" @click="add">
        <!-- icon add -->
        <i class="fas fa-plus"></i>
      </button>
    </div>

    <GridViewer :rows="data" :columns="columns" @editRow="editRow" @deleteRow="deleteRow" />
  </div>
</template>

<script lang="ts">
import GridViewer from "@/components/grid/GridViewer.vue";
import { useCacheCategoryCombo } from "@/utilities/cache/cacheCategoryCombo";
import baseDictionaryList from "../../base/baseDictionaryList";
import { useCategoryStore } from "../../../store/dictionary/categoryStore";
import { defineComponent } from "vue";

export default defineComponent({
  name: "CategoryList",
  extends: baseDictionaryList,
  components: {
    GridViewer,
  },
  setup() {
    const store = useCategoryStore();
    const { cacheCategoryCombo } = useCacheCategoryCombo();
    const data: Array<any> = cacheCategoryCombo.data;
    const formDetail = "CategoryDetail";
    const columns = [
      ...cacheCategoryCombo.columns,
      {
        dataField: "rowAction",
        width: 120,
      },
    ];
    return {
      data,
      store,
      cacheCategoryCombo,
      columns,
      formDetail,
    };
  },
});
</script>

<style lang="scss" scoped></style>
