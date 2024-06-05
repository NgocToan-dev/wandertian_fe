<template>
  <!-- List category with table view -->
  <div class="py-3 px-4">
    <div class="grid-toolbar d-flex justify-content-between align-content-center mb-2">
      <h4>Post List</h4>
      <div class="btn btn-primary" @click="addPost">Add Post</div>
    </div>
    <GridViewer
      :rows="items"
      :columns="columns"
      @editRow="editRow"
      @deleteRow="deleteRow"
    />
  </div>
</template>

<script>
import GridViewer from "@/components/grid/GridViewer.vue";
import baseList from "@/pages/base/baseList";
import { useBlogStore } from "@/store/business/blogStore";
import commonFn from "@/utilities/commonFn";
import EditMode from "@/utilities/enum/EditMode";
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
    const formDetail = "PostEditor";
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
    const addPost = () => {
      proxy.$router.push({
        name: formDetail,
        params: { id: commonFn.emptyObjectId, editMode: EditMode.CREATE },
      });
    };
    return {
      store,
      columns,
      formDetail,
      addPost,
    };
  },
};
</script>

<style lang="scss" scoped></style>
