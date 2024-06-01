// TODO: ADD color for each tag
<template>
  <!-- Chip -->
  <!-- Small font-size -->
  <div class="cursor-pointer badge bg-primary p-2 rounded">
    {{ text }}
  </div>
</template>

<script setup>
const props = defineProps({
  text: String,
});
</script>

<style lang="scss" scoped></style>
