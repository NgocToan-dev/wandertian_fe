<template>
  <!-- Sidebar -->
  <div class="sidebar bg-dark py-2">
    <h4 @click="backToHome" class="cursor-pointer text-center mb-4">Wandertian</h4>
    <div class="d-flex flex-column">
      <router-link :to="{ path: item.path }" class="text-white item py-2 ps-3 d-flex align-items-center"
        v-for="(item, index) in items" :class="{ active: item.path === activePath }">
        <!-- icon -->
        <i :class="[item.icon, 'me-2']"></i>
        {{ item.name }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import commonFn from "@/utilities/commonFn";
import { computed, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
const activePath = computed(() => proxy.$route.path);

const backToHome = () => {
  commonFn.backToHome(proxy.$router);
};

// List item
const items = [
  {
    name: "Post",
    path: "/admin/post",
    icon: "fas fa-newspaper",
  },
  {
    name: "Tag",
    path: "/admin/tag",
    icon: "fas fa-tags",
  },
  {
    name: "Category",
    path: "/admin/category",
    icon: "fas fa-list",
  },
  {
    name: "Statistics",
    path: "/admin/statistics",
    icon: "fa-solid fa-chart-column",
  },
];
</script>

<style lang="scss" scoped>
.sidebar {
  width: 200px;
  color: white;

  .item {
    cursor: pointer;
    position: relative;

    &:hover {
      background-color: #333;
    }

    &.active {
      background-color: #555353;

      &::before {
        content: ' ';
        position: absolute;
        width: 4px;
        height: 100%;
        left: 0;
        top: 0;
        background-color: #0D6EFD;
      }
    }
  }
}
</style>
