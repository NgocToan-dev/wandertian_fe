<template>
  <div>
    <table class="table table-bordered">
      <thead>
        <tr>
          <!-- checkbox all -->
          <th v-if="multiple" class="col-checkbox">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="flexCheckDefault" :checked="checkedAll"
                @input="selectRowAll($event)" />
            </div>
          </th>
          <th v-for="(column, index) in columns" :key="index" :class="[setAlignColumn(column)]">
            {{ column.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row) in rows" :key="row._id">
          <td v-if="multiple" class="col-checkbox">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="flexCheckDefault" @input="selectRow(row)"
                :checked="row.selected" />
            </div>
          </td>
          <td v-for="(column, index) in columns" :key="index" :width="column.width" :class="[setAlignColumn(column)]">
            <div v-if="column.dataField == 'rowAction'" class="rowAction d-flex gap-1 justify-content-center">
              <button class="btn btn-primary btn-sm" @click="editRow(row)">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-danger btn-sm" @click="deleteRow(row)">
                <i class="fas fa-trash"></i>
              </button>
            </div>
            <div v-else-if="column.enum" class="d-flex align-items-center justify-content-center">
              <span class="py-1 px-3 rounded-5" :style="{
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
              }">
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

<script setup lang="ts">
import commonFn from "@/utilities/commonFn";
import ColumnType from "@/utilities/enum/ColumnType";
import { computed, PropType } from "vue";
import IColumnConfig from "@/interfaces/gridView/IColumnConfig";


const props = defineProps({
  rows: { type: Array as PropType<Array<any>>, required: true },
  columns: { type: Array as PropType<Array<IColumnConfig>>, required: true },
  multiple: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["editRow", "deleteRow"]);
const checkedAll = computed(() => {
  if (Array.isArray(props.rows)) {
    return props.rows.every((row) => row.selected);
  }
  return false;
});

const setAlignColumn = (column: IColumnConfig) => {
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
const setFormatType = (value: any, dataType: any, enumValue?: any) => {
  switch (dataType) {
    case ColumnType.Date:
      debugger
      if (!(typeof value == "string")) return "";
      // vietnamese date format
      return new Date(value).toLocaleDateString("vi-VN");
    case ColumnType.Enum:
      return commonFn.getEnumValue(enumValue, value);
    default:
      return value;
  }
};
const selectRow = (row: any) => {
  row.selected = !row.selected;
};
const selectRowAll = (event: Event) => {
  if (props.rows) {
    props.rows.forEach((row) => {
      const target = event.target as HTMLInputElement;
      row.selected = target.checked;
    });
  }
};

const editRow = (row: any) => {
  emit("editRow", row);
};

const deleteRow = (row: any) => {
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
