<template>
  <!-- Chip -->
  <!-- Small font-size -->
  <div class="cursor-pointer btn btn-outline-primary btn-sm px-2 py-1 rounded me-2 mb-2" >
    {{ text }}
  </div>
</template>

<script setup>
const props = defineProps({
  text: String,
});
</script>

<style lang="scss" scoped>
</style>
