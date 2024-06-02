<template>
  <div>
    <RouterView />
    <ModalsContainer></ModalsContainer>
  </div>
</template>

<script setup>
import { useConfigureFirstLoad } from "@/utilities/configureFirstLoad";
import { ModalsContainer } from "vue-final-modal";
import { socket } from "./socket";
import { onMounted } from "vue";

onMounted(async () => {
  const configureFirstLoad = useConfigureFirstLoad();
  const listCache = ["category", "tag"];
  await configureFirstLoad.initCacheData(listCache);
});
</script>

<style lang="scss" scoped></style>
