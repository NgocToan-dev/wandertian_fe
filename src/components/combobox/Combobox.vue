<template>
  <div class="w-100">
    <input
      class="w-100 form-control"
      type="text"
      :value="internalText"
      @input="filterOptions"
      placeholder="Search..."
      data-bs-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    />
    <div class="dropdown w-100">
      <div
        class="dropdown-menu w-100 px-2 overflow-hidden"
        aria-labelledby="dropdownMenuButton"
      >
        <div class="row border-bottom">
          <div class="col" v-for="column in columns" :key="column.valueField">
            <strong>{{ column.label }}</strong>
          </div>
        </div>
        <div
          class="row"
          v-for="item in data"
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

const internalText = computed(() => {
  if (Array.isArray(internalValue.value)) {
    return internalValue.value
      .filter((item) => item)
      .map((item) => item[props.displayField])
      .join(";");
  }
  return "";
});
const internalValue = defineModel();
const props = defineProps({
  data: Array,
  columns: Array,
  valueField: String,
  displayField: String,
});
const chooseValue = (item) => {
  //check if the item is already selected, if not, push to the model
  if (!internalValue.value.includes(item[props.valueField])) {
    internalValue.value.push({
      [props.valueField]: item[props.valueField],
      [props.displayField]: item[props.displayField],
    });
  }
};
</script>

<style lang="scss">
/* Add your custom styles here */
</style>
