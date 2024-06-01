<template>
  <div class="bg-light py-4">
    <div class="container">
      <!-- Post Section -->
      <div class="row">
        <div class="col-12 col-md-8">
          <div class="d-flex flex-column">
            <div v-for="(news, index) in listNews" :key="news.title" class="mb-4">
              <Card :post="news" @readMore="readMore" />
            </div>
          </div>
          <!-- Card Pagination -->
          <div
            class="d-flex justify-content-start mt-3 flex-row gap-2"
            v-if="totalPages > 1"
          >
            <button
              class="btn btn-primary"
              :class="{ disabled: isFirstPage }"
              @click="changePage(activePage - 1)"
            >
              <!-- Icon back -->
              <i class="fas fa-arrow-left"></i>
            </button>
            <!-- Page section v-for -->
            <div class="d-flex flex-row gap-1">
              <button
                v-for="(page, index) in totalPages"
                :key="index"
                class="btn btn-outline-primary"
                :class="{ 'bg-primary text-white': index == activePage }"
                @click="changePage(page - 1)"
              >
                {{ page }}
              </button>
            </div>
            <button
              class="btn btn-primary"
              :class="{ disabled: isLastPage }"
              @click="changePage(activePage + 1)"
            >
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
          <div class="border rounded p-3">
            <h3>Category</h3>
            <!-- list category chip -->
            <div class="d-flex flex-wrap mt-3 gap-2">
              <Chip
                v-for="(category, index) in cacheCategoryCombo.data"
                :key="index"
                :text="category[cacheCategoryCombo.displayField]"
              />
            </div>
          </div>
          <!-- List Tag -->
          <div class="border rounded p-3">
            <h3>Tag</h3>
            <!-- list tag chip -->
            <div class="d-flex flex-wrap mt-3 gap-2">
              <Chip
                v-for="(category, index) in cacheTagCombo.data"
                :key="index"
                :text="category[cacheTagCombo.displayField]"
              />
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
import { computed, getCurrentInstance, onMounted, ref } from "vue";
import blogApi from "@/apis/business/blogApi";
import { useCacheCategoryCombo } from "../../../utilities/cache/cacheCategoryCombo";
import { useCacheTagCombo } from "../../../utilities/cache/cacheTagCombo";

const { proxy } = getCurrentInstance();
//#region category
const { cacheCategoryCombo } = useCacheCategoryCombo();
//#endregion
//#region tag
const { cacheTagCombo } = useCacheTagCombo();
//#region news
const listNews = ref([]);
const listFavNews = computed(() => listNews.value.slice(0, 3));
//#endregion
//#region pagination
const activePage = ref(0);
const isFirstPage = computed(() => activePage.value === 0);
const isLastPage = computed(() => activePage.value === totalPages.value - 1);
const totalPages = ref(1);
const limit = ref(10);
//#endregion
const searchValue = ref("");
onMounted(async () => {
  await searchPost("");
});
/**
 * Changes the active page and loads the corresponding posts.
 * @param {number} page - The page number to navigate to.
 */
const changePage = async (page) => {
  if (page < 0 || page >= totalPages.value || page === activePage.value) return;
  activePage.value = page;
  await loadPost();
  // scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
};

/**
 * Searches for posts based on the search value and loads the results.
 */
const searchPost = async () => {
  await loadPost();
  await loadSummary();
};

/**
 * Loads the posts based on the active page and search value.
 */
const loadPost = async () => {
  const res = await blogApi.load({
    page: activePage.value,
    limit: limit.value,
    filter: searchValue.value,
  });
  if (res) {
    listNews.value = res;
  }
};

/**
 * Loads the summary of posts based on the search value.
 */
const loadSummary = async () => {
  const res = await blogApi.loadSummary({ filter: searchValue.value });
  if (res) {
    totalPages.value = Math.ceil(res.total / limit.value);
  }
};

/**
 * Navigates to the post detail page.
 * @param {number} id - The ID of the post to navigate to.
 */
const readMore = (id) => {
  proxy.$router.push({ name: "PostDetail", params: { id } });
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
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
}
</style>
