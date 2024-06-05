<template>
  <div class="admin-page d-flex">
    <Sidebar />
    <RouterView class="main-content" />
  </div>
</template>

<script setup>
import Sidebar from "./Sidebar.vue";
</script>

<style lang="scss" scoped>
.admin-page {
  height: 100vh;
}
.main-content {
  width: calc(100% - 200px);
}
</style>
