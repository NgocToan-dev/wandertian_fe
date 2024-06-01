<template>
  <main class="d-flex flex-column justify-content-between">
    <Header />
    <RouterView class="flex-grow-1 mt-5" />
    <Footer />
  </main>
</template>

<script setup>
import Header from "@/pages/header/Header.vue";
import Footer from "@/pages/footer/Footer.vue";
import { useConfigureFirstLoad } from "./utilities/configureFirstLoad";
const configureFirstLoad = useConfigureFirstLoad();

configureFirstLoad.initCacheData();
</script>

<style lang="scss" scoped></style>
