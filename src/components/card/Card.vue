<template>
  <div class="card">
    <img src="https://placehold.co/100" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">
        {{ description }}
      </p>
      <a href="#" class="btn btn-primary">READ MORE</a>
    </div>
  </div>
</template>

<script setup>
// init props
const props = defineProps({
  title: String,
  description: String,
  image: String,
  link: String,
});
</script>

<style lang="scss" scoped></style>
