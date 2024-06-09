<template>
  <div class="post-card border rounded">
    <div class="card-image">
      <img :src="post.imageTheme" class="card-img-top" alt="..." />
    </div>
    <div class="card-body d-flex flex-column justify-content-between">
      <div class="card-body-content">
        <!-- time -->
        <div class="time">{{ formatDate(post.createdDate) }}</div>
        <!-- tag -->
        <div class="d-flex gap-2 mb-1">
          <Chip
            v-for="(tag, index) in post.tag"
            :key="index"
            :text="tag.name"
            type="tag"
            customChip
          >
          </Chip>
        </div>
        <h5 class="card-title">{{ post.title }}</h5>
        <p class="card-text">
          {{ post.description }}
        </p>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex justify-content-start">
          <Chip
            v-for="(category, index) in post.category"
            :key="index"
            :text="category.name"
            type="category"
            secondary
          >
          </Chip>
        </div>
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
const formatDate = (date) => {
  // en-US format
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
};
</script>

<style lang="scss" scoped>
.post-card {
  width: 300px;
  height: 400px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  .card-image {
    width: 100%;
    height: 200px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .card-body {
    padding: 10px;
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }
    .time {
      font-size: 12px;
      color: #6c757d;
    }
  }
}
</style>
