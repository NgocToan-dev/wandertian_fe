<template>
  <div class="bg-light">
    <div class="container">
      <!-- Post Section -->
      <div class="row">
        <div class="col-12 col-md-8">
          <div v-for="(news, index) in listNews" :key="news.title" class="mb-4">
            <Card :post="news" @readMore="readMore" />
          </div>
          <!-- Card Pagination -->
          <div class="d-flex justify-content-start mt-3 flex-row gap-2">
            <button class="btn btn-primary">
              <!-- Icon back -->
              <i class="fas fa-arrow-left"></i>
            </button>
            <!-- Page section v-for -->
            <div class="d-flex flex-row gap-1">
              <button
                v-for="(page, index) in 5"
                :key="page"
                class="btn btn-outline-primary"
                :class="{ 'bg-primary text-white': index == 0 }"
              >
                {{ page }}
              </button>
            </div>
            <button class="btn btn-primary">
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
        <!-- Category Section -->
        <div class="col-12 col-md-4 d-flex flex-column gap-3">
          <!-- Search post -->
          <div class="border rounded p-3">
            <h3>Search Post</h3>
            <div class="input-group mt-4">
              <input type="text" class="form-control" placeholder="Search post..." />
              <button class="btn btn-primary">Search</button>
            </div>
          </div>
          <div class="border rounded p-3">
            <h3>Category</h3>
            <!-- list category chip -->
            <div class="d-flex flex-wrap">
              <Chip
                v-for="(category, index) in listCategory"
                :key="category"
                :text="category"
                @click="searchPost(category)"
              />
            </div>
          </div>
          <!-- List Tag -->
          <div class="border rounded p-3">
            <h3>Tag</h3>
            <!-- list tag chip -->
            <div class="d-flex flex-wrap mt-4">
              <Chip
                v-for="category in listCategory"
                :key="category"
                :text="category"
                @click="searchPost(category)"
              />
            </div>
          </div>
          <!-- Recent posts -->
          <div class="border rounded p-3">
            <h3>Recent Posts</h3>
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
          <!-- Favorite Posts -->
          <div class="border rounded p-3">
            <h3>Favorite Posts</h3>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from "vue";
import blogApi from "@/apis/business/blogApi";

const { proxy } = getCurrentInstance();
const listNews = ref([]);
// fake data news for card
onMounted(async () => {
  const res = await blogApi.getAll();
  if (res) {
    listNews.value = res;
  }
});
// fake category
const listCategory = [
  "Travel",
  "Food",
  "Lifestyle",
  "Technology",
  "Fashion",
  "Health",
  "Sport",
  "Entertainment",
];

const searchPost = (category) => {
  proxy.$router.push({ name: "Search", params: { search: category } });
};
const readMore = (id) => {
  proxy.$router.push({ name: "PostDetail", params: { id } });
};
</script>

<style lang="scss" scoped></style>
