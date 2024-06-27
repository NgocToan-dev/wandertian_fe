<template>
  <div class="post-card">
    <div
      v-if="post.imageTheme"
      class="card-image rounded-4 cursor-pointer"
      @click="readMore"
    >
      <img :src="post.imageTheme" alt="..." />
    </div>
    <div v-if="post.urlVideoTheme" class="card-image rounded-4 cursor-pointer">
      <iframe
        class="w-100 h-100"
        :src="post.urlVideoTheme"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
    <div class="card-body d-flex flex-column justify-content-between">
      <div class="card-body-content">
        <div class="d-flex justify-content-between align-items-center">
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
          <!-- category -->
          <Chip
            v-for="(category, index) in post.category"
            :key="index"
            :text="category.name"
            type="category"
            secondary
          >
          </Chip>
        </div>
        <h2 class="card-title cursor-pointer" @click="readMore">{{ post.title }}</h2>
        <div class="d-flex justify-content-start gap-2 align-items-center my-1">
          <!-- time -->
          <div class="time">{{ formatDate(post.createdDate) }}</div>
        </div>

        <p class="card-text">
          {{ post.description }}
        </p>
      </div>
      <div class="d-flex justify-content-between align-items-end">
        <!-- time to read -->
        <div class="time" v-if="post.timeToRead">
          <!-- icon opened book -->
          <span class="me-2">
            <i class="fas fa-book"></i>
          </span>
          <span>{{ post.timeToRead || 1 }} min read</span>
        </div>
        <div v-else></div>

        <button class="btn btn-primary btn-sm rounded-1" @click="readMore">
          READ MORE
        </button>
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
/**
 * Navigates to the post detail page.
 * @param {number} id - The ID of the post to navigate to.
 */
const readMore = () => {
  proxy.$router.push({ name: "PostDetail", params: { id: props.post._id } });
};
const formatDate = (date) => {
  // en-US format
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
};
</script>

<style lang="scss" scoped>
.post-card {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  gap: 15px;
  .card-image {
    width: 200px;
    height: 100%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;

      &:hover {
        transform: scale(1.2);
        transition: transform 0.3s ease-in-out;
      }
    }
  }
  .card-body {
    width: calc(100% - 200px);
    height: 100%;
    .card-title {
      &:hover {
        text-decoration: underline;
        color: rgb(82, 77, 77);
      }
    }
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
      font-family: "Helvetica-medium";
    }
  }
}
</style>
