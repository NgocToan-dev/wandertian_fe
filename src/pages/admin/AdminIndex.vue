<template>
  <div class="admin-page d-flex">
    <Sidebar />
    <div class="main-content d-flex flex-column">
      <Topbar />
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "./Sidebar.vue";
import Topbar from "./Topbar.vue";
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
