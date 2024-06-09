<template>
  <div class="bg-light py-4">
    <div class="container">
      <!-- Search Result -->
      <div class="d-flex flex-column gap-3">
        <h3>Search Result: {{ $route.query.search }}</h3>
        <p>Found {{ listNews.length }} results</p>
      </div>

      <!-- Post Section -->
      <div class="d-flex flex-column gap-3 rounded mt-3" v-if="listNews.length > 0">
        <div
          v-for="(news, index) in listNews"
          :key="index"
          class="w-100 d-flex gap-3 p-2 border rounded"
        >
          <img class="w-25" :src="news.imageTheme" alt="post" height="200"/>
          <div class="d-flex flex-column justify-content-between flex-grow-1">
            <div>
              <h5>{{ news.title }}</h5>
              <p>{{ news.description }}</p>
            </div>
            <div class="d-flex justify-content-end">
              <button class="btn btn-outline-primary btn-sm" @click="readMore(news._id)">
                READ MORE
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Card Pagination -->
      <div class="d-flex justify-content-start mt-3 flex-row gap-2" v-if="totalPages > 1">
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
  </div>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, ref } from "vue";
import { useBlogStore } from "@/store/business/blogStore";
import { useLoadingStore } from "@/store/common/loadingStore";

const { proxy } = getCurrentInstance();
const blogStore = useBlogStore();
const searchType = ref("post");
//#region news
const listNews = ref([]);
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
  searchValue.value = proxy.$route.query.search;
  searchType.value = proxy.$route.query.type;
  if (searchValue.value) {
    const mask = useLoadingStore();
    try {
      mask.show();
      switch (searchType.value) {
        case "tag":
          await searchPostByTag(searchValue.value);
          break;
        case "category":
          await searchPostByCategory(searchValue.value);
          break;
        default:
          await loadPost();
          await loadSummary();
          break;
      }
    } finally {
      mask.hide();
    }
  }
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
 * Loads the posts based on the active page and search value.
 */
const loadPost = async () => {
  const res = await blogStore.load({
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
  const res = await blogStore.loadSummary({ filter: searchValue.value });
  if (res) {
    totalPages.value = Math.ceil(res.total / limit.value);
  }
};

const searchPostByTag = async (tag) => {
  const res = await blogStore.searchPostByTag(tag);
  if (res) {
    listNews.value = res;
  }
};

const searchPostByCategory = async (category) => {
  const res = await blogStore.searchPostByCategory(category);
  if (res) {
    listNews.value = res;
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
</style>
