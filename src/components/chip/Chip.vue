<template>
  <!-- Chip -->
  <!-- Small font-size -->
  <div class="chip bg-primary text-white px-2 py-1 rounded me-2 mb-2" >
    {{ text }}
  </div>
</template>

<script setup>
const props = defineProps({
  text: String,
});
</script>

<style lang="scss" scoped>
.chip {
  cursor: pointer;
}
</style>
