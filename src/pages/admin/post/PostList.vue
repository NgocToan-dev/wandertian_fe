<template>
  <!-- List category with table view -->
  <div class="py-3 px-4">
    <div class="grid-toolbar d-flex justify-content-between align-content-center mb-2">
      <h4>Post List</h4>
      <div class="d-flex gap-2">
        <div class="btn btn-outline-primary" @click="refresh">
          <!-- refresh -->
          <i class="fas fa-sync-alt"></i>
        </div>
        <div class="btn btn-primary" @click="addPost">Add Post</div>
      </div>
    </div>
    <GridViewer :rows="items" :columns="columns" @editRow="editRow" @deleteRow="deleteRow" />
  </div>
</template>

<script lang="ts">
import GridViewer from "@/components/grid/GridViewer.vue";
import IColumnConfig from "@/interfaces/gridView/IColumnConfig";
import baseList from "@/pages/base/baseList";
import { useBlogStore } from "@/store/business/blogStore";
import commonFn from "@/utilities/commonFn";
import ColumnType from "@/utilities/enum/ColumnType";
import EditMode from "@/utilities/enum/EditMode";
import { defineComponent, getCurrentInstance } from "vue";

export default defineComponent({
  name: "CategoryList",
  extends: baseList,
  components: {
    GridViewer,
  },
  setup() {
    const { proxy } = getCurrentInstance() as any;
    const store = useBlogStore();
    const formDetail = "PostEditor";
    const formInline = true;
    const columns: Array<IColumnConfig> = [
      {
        dataField: "title",
        title: "Title",
        sortable: true,
        width: 200,
      },
      {
        dataField: "description",
        title: "Description",
        sortable: true,
      },
      {
        dataField: "createdDate",
        title: "Created Date",
        sortable: true,
        dataType: ColumnType.Date,
        width: 120,
      },
      {
        dataField: "updatedDate",
        title: "Updated Date",
        sortable: true,
        dataType: ColumnType.Date,
        width: 120,
      },
      {
        dataField: "rowAction",
        width: 120,
      },
    ];
    const addPost = () => {
      proxy.$router.push({
        name: formDetail,
        params: { id: commonFn.emptyObjectId },
        query: { mode: EditMode.CREATE },
      });
    };
    return {
      store,
      columns,
      formDetail,
      formInline,
      addPost,
    };
  },
});
</script>

<style lang="scss" scoped></style>
