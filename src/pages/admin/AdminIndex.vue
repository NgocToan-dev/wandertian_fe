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
  min-height: 100vh;
  .main-content {
    width: calc(100% - 200px);
    min-height: inherit;
  }
}
</style>
