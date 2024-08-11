<template>
  <div class="d-flex flex-column">
    <div class="title">{{ model.title }}</div>
    <div class="note">{{ model.note }}</div>
    <div class="time">
      {{ formatDate(model.startDate) }} - {{ formatDate(model.endDate) }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TaskItem",
  props: {
    model: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    const formatDate = (date: string) => {
      return new Date(date).toLocaleDateString();
    };
    return { formatDate };
  },
});
</script>

<style lang="scss" scoped>
.title {
  font-size: 1rem;
  font-weight: bold;
}
.note {
  font-size: 0.8rem;
  color: #6c757d;
}
.time {
  font-size: 0.8rem;
  color: #6c757d;
}
</style>
