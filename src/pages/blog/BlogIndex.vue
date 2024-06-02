<template>
  <main class="d-flex flex-column justify-content-between">
    <Header />
    <RouterView class="flex-grow-1 mt-5" />
    <Footer />
  </main>
</template>

<script setup>
import Header from "@/pages/blog/header/Header.vue";
import Footer from "@/pages/blog/footer/Footer.vue";
</script>

<style lang="scss" scoped></style>
