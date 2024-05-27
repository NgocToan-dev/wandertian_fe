<template>
  <div class="post-detail">
    <div class="post-detail-header">
      <h1>{{ post.title }}</h1>
      <p>{{ post.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from "vue";
import blogApi from "@/apis/businessApi/blogApi";

const { proxy } = getCurrentInstance();

const post = ref({});
onMounted(async () => {
  blogApi.getById(proxy.$route.params.id).then((res) => {
    post.value = res;
  });
});
</script>

<style lang="scss" scoped></style>
