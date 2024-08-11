<template>
  <div class="w-100 form-control">
    <div class="choice d-flex flex-wrap gap-1">
      <Chip
        v-for="item in internalValue"
        :key="item[props.valueField]"
        :text="item[props.displayField]"
        removeIcon
        @remove="removeChoice(item)"
      />
    </div>
    <input
      class="w-100 mt-1"
      type="text"
      :value="internalText"
      @input="filterOptions"
      placeholder="Search..."
      data-bs-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    />
    <div class="dropdown w-100">
      <div class="dropdown-menu w-100" aria-labelledby="dropdownMenuButton">
        <div class="grid">
          <div class="col item-header" v-for="column in columns" :key="column.valueField">
            <strong>{{ column.title }}</strong>
          </div>
        </div>
        <div
          class="grid item-body cursor-pointer py-1"
          v-for="item in filterData"
          :key="item[valueField]"
          @click="chooseValue(item)"
        >
          <div class="col" v-for="(column, index) in columns" :key="index">
            {{ item[column.dataField] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IColumnConfig from "@/interfaces/gridView/IColumnConfig";
import { computed, PropType, ref, watch } from "vue";

const internalText = ref("");
const internalValue: any = defineModel();
internalValue.value = [];
const props = defineProps({
  data: Array as PropType<any[]>,
  columns: Array as PropType<Array<IColumnConfig>>,
  valueField: { type: String, default: "" },
  displayField: { type: String, default: "" },
  multiple: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["selected"]);
const filterData = computed(() => {
  if (Array.isArray(internalValue.value) && props.data) {
    return props.data.filter((item) => {
      return !internalValue.value.some(
        (value: any) =>
          value[props.valueField as keyof typeof value] ===
          item[props.valueField as keyof typeof value]
      );
    });
  }
  return props.data;
});
const chooseValue = (item: any) => {
  //check if the item is already selected, if not, push to the model
  if (
    internalValue.value &&
    !internalValue.value.includes(item[props.valueField as keyof typeof item])
  ) {
    if (props.multiple) {
      internalValue.value.push({
        [props.valueField]: item[props.valueField],
        [props.displayField]: item[props.displayField],
      });
    } else {
      internalValue.value = [
        {
          [props.valueField]: item[props.valueField],
          [props.displayField]: item[props.displayField],
        },
      ];
    }
    internalText.value = "";
    emit("selected", item);
  }
};
const removeChoice = (item: any) => {
  internalValue.value = internalValue.value.filter(
    (value: any) => value[props.valueField] !== item[props.valueField]
  );
};
</script>

<style lang="scss" scoped>
:deep(.dropdown-menu) {
  max-height: 200px;
  padding: 0 !important;
  .item-header {
    padding: 10px;
  }
  .item-body {
    padding: 0 10px;
    &:hover {
      background-color: #f0f0f0;
    }
  }
}
input {
  border: 0;
  outline: 0;
}
/* Add your custom styles here */
</style>
