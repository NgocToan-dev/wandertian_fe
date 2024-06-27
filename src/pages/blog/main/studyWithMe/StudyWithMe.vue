<template>
  <div class="study-with-me">
    <div class="container video-list">
      <CardList :store="blogStore" />
    </div>
  </div>
</template>

<script setup>
import CardList from "@/components/card/CardList.vue";
import { useBlogStore } from "@/store/business/blogStore";
import { useLoadingStore } from "@/store/common/loadingStore";
import { onMounted, ref } from "vue";

const blogStore = useBlogStore();

</script>

<style scoped>
.study-with-me {
  padding: 20px;
  background-color: #f5f5f5;
}

.video-list {
  display: flex;
  flex-direction: column;
}

.video-item {
  margin-bottom: 20px;
}

iframe {
  width: 100%;
  height: 315px; /* Adjust the height as per your requirements */
}
</style>
