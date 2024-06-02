<template>
  <div class="search-post container">
    <div class="result">
      <p>Result: {{ $route.params?.search }}</p>
    </div>
    <div class="mt-4 d-flex flex-column gap-3">
      <div v-for="(news, index) in listNews" :key="index" class="d-flex gap-3">
        <img src="https://via.placeholder.com/100" alt="post" />
        <div>
          <h5>{{ news.title }}</h5>
          <p>{{ news.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const listNews = [
  {
    title: "News 1",
    description: "Description 1",
    image: "https://via.placeholder.com/300",
    link: "#",
  },
  {
    title: "News 2",
    description: "Description 2",
    image: "https://via.placeholder.com/300",
    link: "#",
  },
  {
    title: "News 3",
    description: "Description 3",
    image: "https://via.placeholder.com/300",
    link: "#",
  },
];
</script>

<style lang="scss" scoped></style>
