// TODO: ADD color for each tag
<template>
  <!-- Chip -->
  <!-- Small font-size -->
  <div class="chip">
    <div
      v-if="!customChip"
      class="cursor-pointer badge bg-primary py-2 px-2 rounded-5"
      @click="handleClick"
      :class="!secondary ? 'bg-primary' : 'bg-secondary'"
    >
      <!-- hashtag -->
      <i v-if="type === 'tag'" class="fas fa-hashtag"></i>
      <span class="text">{{ text }}</span>
      <i v-if="removeIcon" @click="remove" class="fas fa-times"></i>
    </div>
    <!-- Another chip version of only text and link to search   -->
    <div v-else @click="handleClick" class="custom-chip d-flex gap-1 align-items-center">
      <span class="text-link"><span v-if="type === 'tag'">#</span>{{ text }}</span>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();
const props = defineProps({
  text: String,
  type: String,
  removeIcon: Boolean,
  customChip: Boolean,
  secondary: Boolean,
});
const handleClick = () => {
  if (!props.type) return;
  proxy.$router.push({
    name: "SearchResult",
    query: { search: props.text, type: props.type },
  });
};
const remove = (e) => {
  e.stopPropagation();
  proxy.$emit("remove");
};
</script>

<style lang="scss" scoped>
.badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  .text {
    font-size: 11px;
  }
}
.custom-chip {
  cursor: pointer;
  color: blue;
  .text-link {
    font-size: 11px;
  }
}
.chip {
  font-family: "Helvetica-light", sans-serif;
}
</style>
