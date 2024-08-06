<template>
  <div>
    <table class="table table-bordered">
      <thead>
        <tr>
          <!-- checkbox all -->
          <th v-if="multiple" class="col-checkbox">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
                :checked="checkedAll"
                @input="selectRowAll($event)"
              />
            </div>
          </th>
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
          <td v-if="multiple" class="col-checkbox">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
                @input="selectRow(row)"
                :checked="row.selected"
              />
            </div>
          </td>
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
            <div
              v-else-if="column.enum"
              class="d-flex align-items-center justify-content-center"
            >
              <span
                class="py-1 px-3 rounded-5"
                :style="{
                  backgroundColor: setFormatType(
                    row[column.dataField],
                    column.dataType,
                    column.enum
                  ).bg,
                  color: setFormatType(
                    row[column.dataField],
                    column.dataType,
                    column.enum
                  ).color,
                }"
              >
                {{
                  setFormatType(row[column.dataField], column.dataType, column.enum).value
                }}
              </span>
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
import commonFn from "@/utilities/commonFn";
import ColumnType from "@/utilities/enum/ColumnType";
import { computed } from "vue";

const props = defineProps({
  rows: Array,
  columns: Array,
  multiple: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["editRow", "deleteRow"]);
const checkedAll = computed(() => {
  return props.rows.every((row) => row.selected);
});

const setAlignColumn = (column) => {
  let align = column.align;
  // check dataType of column
  // number is align right
  // date is align center
  // the other is align left
  if (!align) {
    switch (column.dataType) {
      case ColumnType.Number:
        align = "end";
        break;
      case ColumnType.Date:
      case ColumnType.Enum:
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
const setFormatType = (value, dataType, enumValue) => {
  switch (dataType) {
    case ColumnType.Date:
      if (!(typeof value == "string")) return "";
      // vietnamese date format
      return new Date(value).toLocaleDateString("vi-VN");
    case ColumnType.Enum:
      return commonFn.getEnumValue(enumValue, value);
    default:
      return value;
  }
};
const selectRow = (row) => {
  row.selected = !row.selected;
};
const selectRowAll = (event) => {
  props.rows.forEach((row) => {
    row.selected = event.target.checked;
  });
};

const editRow = (row) => {
  emit("editRow", row);
};

const deleteRow = (row) => {
  emit("deleteRow", row);
};
</script>

<style lang="scss" scoped>
.col-checkbox {
  width: 20px;
}
th {
  white-space: nowrap;
}
</style>
