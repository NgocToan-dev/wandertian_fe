<template>
  <div>
    <!-- button add task -->
    <button class="btn btn-primary" @click="addTask">Add Task</button>
    <GridViewer
      class="mt-2"
      multiple
      :rows="items"
      :columns="columns"
      @editRow="editRow"
      @deleteRow="deleteRow"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import GridViewer from "@/components/grid/GridViewer.vue";
import ColumnType from "@/utilities/enum/ColumnType";
import Enum from "@/utilities/enum/Enum";
import baseList from "@/pages/base/baseList";
import { useTaskStore } from "@/store/business/taskStore";
import modalRegister from "@/utilities/modalRegister";

export default {
  components: {
    GridViewer,
  },
  extends: baseList,
  setup(props) {
    const store = useTaskStore();
    // Task columns
    const columns = ref([
      { dataField: "name", label: "Name" },
      { dataField: "description", label: "Description" },
      {
        dataField: "status",
        label: "Status",
        dataType: ColumnType.Enum,
        enum: "TaskStatus",
        width: 200,
      },
      { dataField: "rowAction", width: 120 },
    ]);

    const addTask = () => {
      modalRegister.openModal("EventDetail", {
        data: null,
        store: store,
      });
    };
    return {
      store,
      columns,
      addTask,
    };
  },
};
</script>

<style lang="scss" scoped></style>
