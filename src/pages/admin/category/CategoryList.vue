<template>
  <!-- List category with table view -->
  <div class="py-3 px-4">
    <GridViewer
      :rows="cacheCategoryCombo.data"
      :columns="columns"
      :formDetail="formDetail"
    />
  </div>
</template>

<script setup>
import baseList from "../../base/baseList";
import GridViewer from "@/components/grid/GridViewer.vue";
import { useCacheCategoryCombo } from "@/utilities/cache/cacheCategoryCombo";
import { withCtx } from "vue";

const props = defineProps();
baseList.setup(props, withCtx);

const { cacheCategoryCombo } = useCacheCategoryCombo();
const formDetail = "CategoryDetail";
const columns = [
  ...cacheCategoryCombo.columns,
  {
    dataField: "rowAction",
    width: 120,
  },
];
</script>

<style lang="scss" scoped></style>
