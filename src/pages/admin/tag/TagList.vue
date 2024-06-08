<template>
  <!-- List category with table view -->
  <div class="py-3 px-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4>Tag List</h4>
      <button class="btn btn-primary btn-sm" @click="add">
        <!-- icon add -->
        <i class="fas fa-plus"></i>
      </button>
    </div>
    <GridViewer
      :rows="data"
      :columns="columns"
      @editRow="editRow"
      @deleteRow="deleteRow"
    />
  </div>
</template>

<script>
import GridViewer from "@/components/grid/GridViewer.vue";
import { useCacheTagCombo } from "@/utilities/cache/cacheTagCombo";
import baseDictionaryList from "@/pages/base/baseDictionaryList";
import { ref } from "vue";
import { useTagStore } from "@/store/dictionary/tagStore";

export default {
  name: "CategoryList",
  extends: baseDictionaryList,
  components: {
    GridViewer,
  },
  setup() {
    const store = useTagStore();
    const { cacheTagCombo } = useCacheTagCombo();
    const data = ref(cacheTagCombo.data);
    const formDetail = "TagDetail";
    const columns = [
      ...cacheTagCombo.columns,
      {
        dataField: "rowAction",
        width: 120,
      },
    ];
    return {
      data,
      store,
      cacheTagCombo,
      columns,
      formDetail,
    };
  },
};
</script>

<style lang="scss" scoped></style>
