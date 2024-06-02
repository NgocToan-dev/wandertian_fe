<template>
  <!-- List category with table view -->
  <div class="py-3 px-4">
    <GridViewer :rows="data" :columns="columns" @editRow="editRow" />
  </div>
</template>

<script>
import GridViewer from "@/components/grid/GridViewer.vue";
import { useCacheCategoryCombo } from "@/utilities/cache/cacheCategoryCombo";
import baseDictionaryList from "../../base/baseDictionaryList";
import { useCategoryStore } from "../../../store/dictionary/categoryStore";
import { ref } from "vue";

export default {
  name: "CategoryList",
  extends: baseDictionaryList,
  components: {
    GridViewer,
  },
  setup() {
    const store = useCategoryStore();
    const { cacheCategoryCombo } = useCacheCategoryCombo();
    const data = ref(cacheCategoryCombo.data);
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
};
</script>

<style lang="scss" scoped></style>
