<template>
  <div>
    <RouterView />
    <ModalsContainer></ModalsContainer>
  </div>
</template>

<script setup lang="ts">
import { useConfigureFirstLoad } from "@/utilities/configureFirstLoad";
import { ModalsContainer } from "vue-final-modal";
import { onMounted } from "vue";
import { Tooltip } from 'bootstrap';

onMounted(async () => {
  const configureFirstLoad = useConfigureFirstLoad();
  const listCache = ["category", "tag"];
  await configureFirstLoad.initCacheData(listCache, false);

  new Tooltip(document.body, {
    selector: "[data-bs-toggle='tooltip']",
  })
});
</script>

<style lang="scss" scoped></style>
