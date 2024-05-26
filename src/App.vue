<template>
  <main class="d-flex flex-column justify-content-between">
    <Header class="mb-4"/>
    <RouterView class="flex-grow-1"/>
    <Footer class="mt-4"/>
  </main>
</template>

<script setup>
import Header from "@/pages/header/Header.vue";
import Footer from "@/pages/footer/Footer.vue";
</script>

<style lang="scss" scoped></style>
