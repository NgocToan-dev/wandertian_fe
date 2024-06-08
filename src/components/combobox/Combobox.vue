<template>
  <div class="w-100 form-control">
    <div class="choice d-flex flex-wrap gap-1">
      <span
        class="d-flex gap-2 align-items-center badge rounded-pill text-bg-primary"
        v-for="item in internalValue"
        :key="item[props.valueField]"
      >
        <span>{{ item[props.displayField] }}</span>
        <span @click="removeChoice(item)" class="cursor-pointer">
          <i class="fas fa-times"></i>
        </span>
      </span>
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
            <strong>{{ column.label }}</strong>
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

<script setup>
import { computed, ref, watch } from "vue";

const internalText = ref("");
const internalValue = defineModel();
internalValue.value = [];
const props = defineProps({
  data: Array,
  columns: Array,
  valueField: String,
  displayField: String,
});
const filterData = computed(() => {
  if (internalValue.value) {
    return props.data.filter((item) => {
      return !internalValue.value.some(
        (value) => value[props.valueField] === item[props.valueField]
      );
    });
  }
  return props.data;
});
const chooseValue = (item) => {
  //check if the item is already selected, if not, push to the model
  if (internalValue.value && !internalValue.value.includes(item[props.valueField])) {
    internalValue.value.push({
      [props.valueField]: item[props.valueField],
      [props.displayField]: item[props.displayField],
    });
    internalText.value = "";
  }
};
const removeChoice = (item) => {
  internalValue.value = internalValue.value.filter(
    (value) => value[props.valueField] !== item[props.valueField]
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
