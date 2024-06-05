<template>
  <!-- List category with table view -->
  <div class="py-3 px-4">
    <GridViewer :rows="items" :columns="columns" @editRow="editRow" />
  </div>
</template>

<script>
import GridViewer from "@/components/grid/GridViewer.vue";
import baseList from "@/pages/base/baseList";
import { useBlogStore } from "@/store/business/blogStore";
import { getCurrentInstance } from "vue";

export default {
  name: "CategoryList",
  extends: baseList,
  components: {
    GridViewer,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const store = useBlogStore();
    const formDetail = "CategoryDetail";
    const columns = [
      {
        dataField: "title",
        label: "Title",
        sort: true,
      },
      {
        dataField: "description",
        label: "Description",
        sort: true,
      },
      {
        dataField: "rowAction",
        width: 120,
      },
    ];
    const editRow = (record) => {
      proxy.$router.push({ name: "PostEditor", params: { id: record._id } });
    };
    return {
      store,
      columns,
      formDetail,
      editRow,
    };
  },
};
</script>

<style lang="scss" scoped></style>
