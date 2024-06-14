<template>
  <div class="container py-4">
    <!-- time -->
    <div class="time">{{ formatDate(post.createdDate) }}</div>
    <h2>{{ post.title }}</h2>
    <p>{{ post.description }}</p>
    <RichEditor v-model:content="post.contents" :readOnly="true"/>
    <!-- list of categories -->
    <div class="category-section" v-if="post.category?.length > 0">
      <hr />
      <h5>Category</h5>
      <div class="d-flex gap-2 mt-1 mb-3">
        <Chip
          v-for="(category, index) in post.category"
          :key="index"
          :text="category.name"
          type="category"
        >
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
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive } from "vue";
import blogApi from "@/apis/business/blogApi";
import { useLoadingStore } from "@/store/common/loadingStore";
const { proxy } = getCurrentInstance();

const post = reactive({});

/**
 * Lifecycle hook that fetches the post data when the component is mounted.
 */
onMounted(async () => {
  const mask = useLoadingStore();
  try {
    mask.show();
    const res = await blogApi.getById(proxy.$route.params.id);
    Object.assign(post, res);
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
:deep(.ql-editor) {
  padding: 0;
}
.time {
  color: #6c757d;
  font-size: 0.9rem;
}
</style>
