<template>
  <div class="admin-page d-flex">
    <Sidebar />
    <RouterView class="flex-grow-1" />
  </div>
</template>

<script setup>
import Sidebar from "./Sidebar.vue";
</script>

<style lang="scss" scoped>
.admin-page {
  height: 100vh;
}
</style>
