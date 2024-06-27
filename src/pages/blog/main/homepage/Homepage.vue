<template>
  <div class="bg-light py-4">
    <div class="container">
      <!-- Post Section -->
      <div class="row">
        <div class="col-12 col-md-8">
          <CardList :store="blogStore"/>
        </div>
        <!-- Category Section -->
        <div class="col-12 col-md-4 d-flex flex-column gap-3">
          <!-- Search post -->
          <div class="border rounded p-3">
            <h3>Search Post</h3>
            <div class="input-group mt-4">
              <input
                type="text"
                class="form-control"
                v-model="searchValue"
                placeholder="Search post..."
              />
              <button class="btn btn-primary" @click="searchPost">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
          <!-- Favorite Posts -->
          <div class="border rounded p-3">
            <h3>Favorite Posts</h3>
            <div class="mt-4 d-flex flex-column gap-3">
              <div
                v-for="(news, index) in listFavNews"
                :key="index"
                class="fav-post d-flex gap-3 cursor-pointer p-2 rounded"
                @click="readMore(news._id)"
              >
                <div class="fav-post-image">
                  <img v-if="news.imageTheme" :src="news.imageTheme" alt="post" />
                </div>
                <div
                  class="fav-post-body d-flex h-100 flex-column justify-content-between"
                >
                  <h5>{{ news.title }}</h5>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="time">{{ formatDate(news.createdDate) }}</div>
                    <!-- time to read -->
                    <div class="time">
                      <!-- icon opened book -->
                      <span class="me-2">
                        <i class="fas fa-book"></i>
                      </span>
                      <span>{{ news.timeToRead || 1 }} min read</span>
                    </div>
                  </div>
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
import CardList from "@/components/card/CardList.vue";
import { useBlogStore } from "@/store/business/blogStore";
import { computed, getCurrentInstance, onMounted, ref } from "vue";

const { proxy } = getCurrentInstance();
const blogStore = useBlogStore();

//#region news
const listFavNews = ref([]);
//#endregion
const searchValue = ref("");

/**
 * Searches for posts based on the search value and loads the results.
 */
const searchPost = async () => {
  proxy.$router.push({ name: "SearchResult", query: { search: searchValue.value } });
};

/**
 * Navigates to the post detail page.
 * @param {number} id - The ID of the post to navigate to.
 */
const readMore = (id) => {
  proxy.$router.push({ name: "PostDetail", params: { id } });
};

const formatDate = (date) => {
  // en-US format
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
};
</script>

<style lang="scss" scoped>
// description show dot dot dot when overflow
p {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.fav-post {
  height: 100px;
  .fav-post-image {
    img {
      width: 100%;
      height: 100%;
    }
    width: 100px;
  }
  .fav-post-body {
    width: calc(100% - 100px);
  }
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .time {
    font-size: 12px;
    color: #6c757d;
    font-family: "Helvetica-medium";
  }
}
</style>
