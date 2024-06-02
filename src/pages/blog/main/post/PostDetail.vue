<template>
  <div class="container py-4">
    <h2>{{ post.title }}</h2>
    <p>{{ post.description }}</p>
    <QuillEditor theme="bubble" readOnly :content="post.contents" content-type="html" />
    <!-- Tag -->
    <div class="d-flex gap-2 mt-3">
      <div v-for="(tag, index) in post.tag" :key="index" class="badge bg-primary">
        {{ tag.tag_name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive } from "vue";
import blogApi from "@/apis/business/blogApi";
const { proxy } = getCurrentInstance();

const post = reactive({});

/**
 * Lifecycle hook that fetches the post data when the component is mounted.
 */
onMounted(async () => {
  const res = await blogApi.getById(proxy.$route.params.id);
  Object.assign(post, res);
});
</script>

<style lang="scss" scoped></style>
