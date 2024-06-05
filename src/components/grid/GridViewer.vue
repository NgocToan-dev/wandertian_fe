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
              <button class="btn btn-primary" @click="editRow(row)">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-danger" @click="deleteRow(row)">
                <i class="fas fa-trash"></i>
              </button>
            </div>
            <div v-else>
              {{ row[column.dataField] }}
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
const emit = defineEmits(["editRow"]);

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

const editRow = (row) => {
  emit("editRow", row);
};

const deleteRow = () => {
  console.log("Delete row");
};
</script>

<style lang="scss" scoped></style>
