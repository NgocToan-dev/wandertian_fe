<template>
  <div class="py-3 px-4">
    <ul class="nav nav-tabs">
      <li class="nav-item" v-for="(tab, index) in tabs" :keys="index">
        <router-link
          :to="{ name: tab.name }"
          class="nav-link"
          :class="{ active: tabActive == tab.name }"
          >{{ tab.label }}
        </router-link>
      </li>
    </ul>
    <RouterView class="mt-3"/>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
const tabs = [
  {
    name: "TaskListView",
    label: "List",
  },
  {
    name: "TaskCalendarView",
    label: "Calendar",
  },
  {
    name: "TaskGanttChartView",
    label: "Gannt Chart",
  },
];
const tabActive = computed(() => {
  return proxy.$route.name;
});
</script>

<style lang="scss" scoped></style>
