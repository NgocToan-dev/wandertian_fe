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
            {{ column.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in _data" :key="row._id">
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
              class="rowAction d-flex gap-2 justify-content-center"
            >
              <div class="text-primary" @click="editRow(row)">
                <i class="fas fa-edit"></i>
              </div>
              <div class="text-danger" @click="deleteRow(row)">
                <i class="fas fa-trash"></i>
              </div>
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

<script setup lang="ts">
import commonFn from "@/utilities/commonFn";
import ColumnType from "@/utilities/enum/ColumnType";
import { computed, onMounted, PropType, ref } from "vue";
import IColumnConfig from "@/interfaces/gridView/IColumnConfig";
import ISort from "@/interfaces/gridView/ISort";

const props = defineProps({
  rows: { type: Array as PropType<Array<any>>, required: true },
  columns: { type: Array as PropType<Array<IColumnConfig>>, required: true },
  multiple: {
    type: Boolean,
    default: false,
  },
  defaultSort: {
    type: Array as PropType<Array<ISort>>,
    default: [{ dataField: "", order: "" }],
  },
});
/**
 * Sorts the rows of the grid based on the default sort rules.
 *
 * @returns {Array} The sorted rows.
 */
const _data = computed(() => {
  // multiple sortable columns, so I need to sort by each column at the same time
  // If the first column is equal, then sort by the second column, and so on
  // Else keep the first order that is matched
  props.rows.sort((a, b) => {
    for (let rule of props.defaultSort) {
      const { dataField, order } = rule;
      const direction = order === "asc" ? 1 : -1;
      const a_jsonValue = JSON.stringify(a[dataField]) || "";
      const b_jsonValue = JSON.stringify(b[dataField]) || "";
      if (a_jsonValue > b_jsonValue) return direction;
      if (a_jsonValue < b_jsonValue) return -direction;
    }
    return 0; // If all values are equal, keep the original order
  });
  return props.rows;
});
onMounted(() => {
  props.columns.forEach((column) => {
    if (column.sortable) {
      setSort(column);
      sortIcon(column);
    }
  });
});
const setSort = (column: IColumnConfig) => {
  column.sort = props.defaultSort.find((sort) => sort.dataField === column.dataField);
};
const sortIcon = (column: IColumnConfig) => {
  if (column.sort) {
    if (column.sort.order === "asc") {
      column.sortIcon = "fas fa-sort-up";
    } else {
      column.sortIcon = "fas fa-sort-down";
    }
  }
};
const emit = defineEmits(["editRow", "deleteRow"]);
const checkedAll = computed(() => {
  if (Array.isArray(_data.value)) {
    return _data.value.every((row) => row.selected);
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
      if (!(typeof value == "string")) return "";
      // vietnamese date format
      return new Date(value).toLocaleDateString("vi-VN");
    case ColumnType.DateTime:
      if (!(typeof value == "string")) return "";
      // vietnamese date time format
      return new Date(value).toLocaleString("vi-VN");
    case ColumnType.Enum:
      const res = commonFn.getEnumValue(enumValue, value);
      if (!res) {
        return {
          bg: "",
          color: "",
        };
      }
      return res;
    default:
      return value;
  }
};
const selectRow = (row: any) => {
  row.selected = !row.selected;
};
const selectRowAll = (event: Event) => {
  if (_data.value) {
    _data.value.forEach((row) => {
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

.rowAction div {
  cursor: pointer;
}
th {
  white-space: nowrap;
}
</style>
