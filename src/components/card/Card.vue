<template>
  <div class="card">
    <img src="https://placehold.co/100" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">
        {{ description }}
      </p>
      <a href="#" class="btn btn-primary" @click="readMore">READ MORE</a>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();
// init props
const props = defineProps({
  id: String,
  title: String,
  description: String,
  image: String,
  link: String,
});
// read more function
const readMore = () => {
  proxy.$emit("readMore", props.link);
};
</script>

<style lang="scss" scoped></style>
