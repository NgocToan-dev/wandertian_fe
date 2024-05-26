<template>
  <div class="post-detail">
    <div class="post-detail-header">
      <h1>{{ post.title }}</h1>
      <p>{{ post.createdAt }}</p>
    </div>
    <div class="post-detail-body" v-html="post.body" />
  </div>
</template>

<script setup>
const props = defineProps({
  post: Object,
});
</script>

<style lang="scss" scoped></style>
