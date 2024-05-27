<template>
  <div class="card">
    <img src="https://placehold.co/100" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">{{ post.title }}</h5>
      <p class="card-text">
        {{ post.description }}
      </p>
      <a class="btn btn-primary" @click="readMore">READ MORE</a>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();
// init props
const props = defineProps({
  post: Object,
});
// read more function
const readMore = (e) => {
  e.preventDefault();
  proxy.$emit("readMore", props.post._id);
};
</script>

<style lang="scss" scoped></style>
