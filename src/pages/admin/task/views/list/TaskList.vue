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

<script lang="ts">
import GridViewer from "@/components/grid/GridViewer.vue";
import ColumnType from "@/utilities/enum/ColumnType";
import baseList from "@/pages/base/baseList";
import { useTaskStore } from "@/store/business/taskStore";
import modalRegister from "@/utilities/modalRegister";
import IColumnConfig from "@/interfaces/gridView/IColumnConfig";
import EditMode from "@/utilities/enum/EditMode";

export default {
  components: {
    GridViewer,
  },
  extends: baseList,
  setup(props) {
    const formDetail = "EventDetail";
    const store = useTaskStore();
    // Task columns
    const columns: Array<IColumnConfig> = [
      { dataField: "title", title: "Title" },
      { dataField: "note", title: "Note" },
      { dataField: "startDate", title: "Start Date", dataType: ColumnType.DateTime },
      { dataField: "endDate", title: "End Date", dataType: ColumnType.DateTime },
      {
        dataField: "status",
        title: "Status",
        dataType: ColumnType.Enum,
        enum: "TaskStatus",
        width: 200,
      },
      { dataField: "rowAction", width: 120 },
    ];

    const addTask = () => {
      modalRegister.openModal("EventDetail", {
        data: null,
        mode: EditMode.CREATE,
      });
    };
    return {
      store,
      formDetail,
      columns,
      addTask,
    };
  },
};
</script>

<style lang="scss" scoped></style>
