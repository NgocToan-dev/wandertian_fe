<template>
  <!-- Sidebar -->
  <div class="sidebar bg-dark h-100 py-2">
    <h4 @click="backToHome" class="text-center mb-4">Wandertian</h4>
    <ul class="list-unstyled">
      <li
        v-for="(item, index) in items"
        class="item py-1 ps-3"
        :class="{ active: item.path === activePath }"
      >
        <router-link :to="{ path: item.path }" class="text-white">{{
          item.name
        }}</router-link>
      </li>
    </ul>
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
  },
  {
    name: "Tag",
    path: "/admin/tag",
  },
  {
    name: "Category",
    path: "/admin/category",
  },
];
</script>

<style lang="scss" scoped>
.sidebar {
  width: 200px;
  color: white;
  .item {
    cursor: pointer;
    &:hover {
      background-color: #333;
    }
    &.active {
      background-color: #333;
    }
  }
}
</style>
