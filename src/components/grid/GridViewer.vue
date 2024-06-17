<template>
  <div>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th
            v-for="(column, index) in columns"
            :key="index"
            :class="[setAlignColumn(column)]"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="row._id">
          <td
            v-for="(column, index) in columns"
            :key="index"
            :width="column.width"
            :class="[setAlignColumn(column)]"
          >
            <div
              v-if="column.dataField == 'rowAction'"
              class="rowAction d-flex gap-1 justify-content-center"
            >
              <button class="btn btn-primary btn-sm" @click="editRow(row)">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-danger btn-sm" @click="deleteRow(row)">
                <i class="fas fa-trash"></i>
              </button>
            </div>
            <div v-else>
              {{ setFormatType(row[column.dataField], column.dataType) }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();
const props = defineProps({
  rows: Array,
  columns: Array,
});
const emit = defineEmits(["editRow", "deleteRow"]);

const setAlignColumn = (column) => {
  let align = column.align;
  // check dataType of column
  // number is align right
  // date is align center
  // the other is align left
  if (!align) {
    switch (column.dataType) {
      case "number":
        align = "end";
        break;
      case "date":
        align = "center";
        break;
    }
  }
  if (!align && column.dataField === "rowAction") {
    align = "center";
  }

  // If align is not set, default is start
  if (!align) {
    align = "start";
  }
  return align ? `text-${align}` : "";
};
const setFormatType = (value, dataType) => {
  switch (dataType) {
    case "date":
      if (!(typeof value == "string")) return "";
      // vietnamese date format
      return new Date(value).toLocaleDateString("vi-VN");
    default:
      return value;
  }
};

const editRow = (row) => {
  emit("editRow", row);
};

const deleteRow = (row) => {
  emit("deleteRow", row);
};
</script>

<style lang="scss" scoped>
th {
  white-space: nowrap;
}
</style>
