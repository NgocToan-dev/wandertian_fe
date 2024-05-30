<template>
  <div class="w-100">
    <input
      class="w-100 form-control"
      type="text"
      v-model="searchText"
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
          <div class="col" v-for="column in columns" :key="column.key">
            <strong>{{ column.label }}</strong>
          </div>
        </div>
        <div
          class="row"
          v-for="item in filteredData"
          :key="item[key]"
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
import { computed, ref } from "vue";

const searchText = defineModel();
const props = defineProps({
  data: Array,
  columns: Array,
  key: String,
  displayField: String,
});
const filteredData = computed(() => {
  if (props.data) {
    return props.data.filter((option) => {
      let filterValue = searchText.value;
      if(!filterValue){
        filterValue = '';
      }
      return option.name.toLowerCase().includes(filterValue.toLowerCase());
    });
  }
  return [];
});
const filterOptions = () => {
  // Implement your filtering logic here
};
const chooseValue = (item) => {
  searchText.value = item[props.displayField];
};
</script>

<style lang="scss">
/* Add your custom styles here */
</style>
