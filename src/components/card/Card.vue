<template>
  <div class="card">
    <div class="card-image">
      <img src="https://placehold.co/100" class="card-img-top" alt="..." />
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ post.title }}</h5>
      <p class="card-text">
        {{ post.description }}
      </p>
      <div class="d-flex justify-content-end align-items-center">
        <a class="btn btn-outline-primary btn-sm" @click="readMore">READ MORE</a>
      </div>
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

<style lang="scss" scoped>
.card {
  min-width: 300px;
  .card-image {
    width: 100%;
    height: 300px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
}
</style>
