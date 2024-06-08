// TODO: ADD color for each tag
<template>
  <!-- Chip -->
  <!-- Small font-size -->
  <div class="cursor-pointer badge bg-primary p-2 rounded" @click="handleClick">
    <!-- hashtag -->
    <div v-if="type === 'tag'" class="d-flex gap-1">
      <i class="fas fa-hashtag"></i>
      {{ text }}
    </div>
    <div v-else>
      {{ text }}
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();
const props = defineProps({
  text: String,
  type: String,
});
const handleClick = () => {
  proxy.$router.push({
    name: "SearchResult",
    query: { search: props.text, type: props.type },
  });
};
</script>

<style lang="scss" scoped></style>
