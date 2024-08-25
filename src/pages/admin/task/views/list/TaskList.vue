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
      :defaultSort="defaultSort"
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
import IEventEntity from "@/interfaces/entity/IEventEntity";
import ISort from "@/interfaces/gridView/ISort";

export default {
  components: {
    GridViewer,
  },
  extends: baseList,
  setup(props) {
    const formDetail = "EventDetail";
    const store = useTaskStore();
    const defaultSort: Array<ISort> = [
      { dataField: "startDate", order: "desc" },
      { dataField: "priority", order: "asc" },
      { dataField: "status", order: "desc" },
    ];
    // Task columns
    const columns: Array<IColumnConfig> = [
      { dataField: "title", title: "Title" },
      { dataField: "note", title: "Note" },
      {
        dataField: "startDate",
        title: "Start Date",
        dataType: ColumnType.DateTime,
        sortable: true,
      },
      { dataField: "endDate", title: "End Date", dataType: ColumnType.DateTime },
      {
        dataField: "priority",
        title: "Priority",
        dataType: ColumnType.Enum,
        enum: "TaskPriority",
        sortable: true,
        width: 200,
      },
      {
        dataField: "status",
        title: "Status",
        dataType: ColumnType.Enum,
        enum: "TaskStatus",
        sortable: true,
        width: 200,
      },
      { dataField: "rowAction" },
    ];

    const addTask = () => {
      modalRegister.openModal("EventDetail", {
        data: {} as IEventEntity,
        mode: EditMode.CREATE,
      });
    };
    return {
      store,
      formDetail,
      columns,
      addTask,
      defaultSort,
    };
  },
};
</script>

<style lang="scss" scoped></style>
