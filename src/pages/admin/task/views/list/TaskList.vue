<template>
  <GridViewer
    multiple
    :rows="rows"
    :columns="columns"
    @editRow="editRow"
    @deleteRow="deleteRow"
  />
</template>

<script setup>
import { ref } from "vue";
import GridViewer from "@/components/grid/GridViewer.vue";
import ColumnType from "@/utilities/enum/ColumnType";
import Enum from "@/utilities/enum/Enum";

// Task columns
const columns = ref([
  { dataField: "id", label: "ID", dataType: "number" },
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

// fake data
const rows = ref([
  { id: 1, name: "Task 1", description: "Description 1", status: Enum.TaskStatus.Todo },
  {
    id: 2,
    name: "Task 2",
    description: "Description 2",
    status: Enum.TaskStatus.InProgress,
  },
  { id: 3, name: "Task 3", description: "Description 3", status: Enum.TaskStatus.Done },
]);
</script>

<style lang="scss" scoped></style>
