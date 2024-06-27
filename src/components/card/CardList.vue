<template>
  <div>
    <div class="d-flex flex-column gap-4">
      <div v-for="(news, index) in listNews" :key="news.title" class="mb-4">
        <Card :post="news" />
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
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, ref } from "vue";
import { useLoadingStore } from "@/store/common/loadingStore";
const props = defineProps({
  limit: {
    type: Number,
    default: 10,
  },
  store: Object,
});

const { proxy } = getCurrentInstance();

const store = props.store;
const activePage = ref(0);
const totalPages = ref(1);
const isFirstPage = computed(() => activePage.value === 0);
const isLastPage = computed(() => activePage.value === totalPages.value - 1);
const listNews = ref([]);

onMounted(async () => {
  await loadPost();
  await loadSummary();
  // Fake data for listNews
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
  const mask = useLoadingStore();
  try {
    mask.show();
    const res = await store.load({
      page: activePage.value,
      limit: props.limit,
      filterStatus: proxy.$global.PostStatus.PUBLISHED,
    });
    if (res) {
      listNews.value = res;
    }
  } finally {
    mask.hide();
  }
};

/**
 * Loads the summary of posts based on the search value.
 */
const loadSummary = async () => {
  const res = await store.loadSummary({
    filterStatus: proxy.$global.PostStatus.PUBLISHED,
  });
  if (res) {
    totalPages.value = Math.ceil(res.total / props.limit);
  }
};
</script>

<style lang="scss" scoped></style>
