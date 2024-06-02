<template>
  <RouterView />
  <ModalsContainer></ModalsContainer>
</template>

<script setup>
import { useConfigureFirstLoad } from "@/utilities/configureFirstLoad";
import { ModalsContainer } from "vue-final-modal";
const configureFirstLoad = useConfigureFirstLoad();

configureFirstLoad.initCacheData();
</script>

<style lang="scss" scoped></style>
