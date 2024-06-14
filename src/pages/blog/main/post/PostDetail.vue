<template>
  <div class="container py-4">
    <div class="row">
      <div class="post-detail col-12 col-md-8">
        <!-- time -->
        <div class="time">{{ formatDate(post.createdDate) }}</div>
        <h2>{{ post.title }}</h2>
        <p>{{ post.description }}</p>
        <RichEditor v-model:content="post.contents" :readOnly="true" />
        <!-- list of categories -->
        <div class="category-section" v-if="post.category?.length > 0">
          <hr />
          <h5>Category</h5>
          <div class="d-flex gap-2 mt-1 mb-3">
            <Chip v-for="(category, index) in post.category" :key="index" :text="category.name" type="category">
            </Chip>
          </div>
        </div>
        <!-- Tag -->
        <div class="tag-section" v-if="post.tag?.length > 0">
          <hr />
          <h5>Tag</h5>
          <div class="d-flex gap-2 mt-3">
            <Chip v-for="(tag, index) in post.tag" :key="index" :text="tag.name" type="tag">
            </Chip>
          </div>
        </div>
        <!-- Tag -->
        <div class="tag-section" v-if="post.tag?.length > 0">
          <hr />
          <h5>Leave comments</h5>
          <div class="d-flex gap-2 mt-3">
            <Comment :post="post"/>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4 d-flex flex-column gap-3">
        <h5>Relevant Posts</h5>
        <div v-for="(news, index) in relevantNews" :key="index" class="relevant-post d-flex gap-3 cursor-pointer p-2 rounded"
          @click="readMore(news._id)">
          <div class="relevant-post-image">
            <img v-if="news.imageTheme" :src="news.imageTheme" alt="post" />
          </div>
          <div class="relevant-post-body d-flex h-100 flex-column justify-content-between">
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
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive } from "vue";
import Comment from "@/components/comment/Comment.vue";
import blogApi from "@/apis/business/blogApi";
import { useLoadingStore } from "@/store/common/loadingStore";
const { proxy } = getCurrentInstance();

const post = reactive({});
const relevantNews = reactive([]);

/**
 * Lifecycle hook that fetches the post data when the component is mounted.
 */
onMounted(async () => {
  const mask = useLoadingStore();
  try {
    mask.show();
    const res = await blogApi.getById(proxy.$route.params.id);
    Object.assign(post, res);
    const payload = {
      category: post.category[0].name,
      except: [post._id],
      limit: 5
    };
    const news = await blogApi.searchPostByCategory(payload);
    Object.assign(relevantNews, news);
  } finally {
    mask.hide();
  }
});
// format date by text
const formatDate = (date) => {
  if (date === undefined) return;
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
};
</script>

<style lang="scss" scoped>

.time {
  color: #6c757d;
  font-size: 12px;
  font-family: "Helvetica-medium";
}
.relevant-post {
  height: 100px;
  .relevant-post-image {
    img {
      width: 100%;
      height: 100%;
    }
    width: 100px;
  }
  .relevant-post-body {
    width: calc(100% - 100px);
  }
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
}
</style>
