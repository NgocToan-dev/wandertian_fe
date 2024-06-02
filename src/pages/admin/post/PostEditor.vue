<template>
  <div class="container py-4">
    <div class="row">
      <div class="h-100 flex-column d-flex col-md-9">
        <!-- Save button and edit icon -->
        <div
          class="post-section mb-2 d-flex flex-row justify-content-between align-items-center"
        >
          <div>
            <button @click="saveDraft" class="btn btn-primary me-2">Save</button>
            <!-- Cancel button -->
            <button class="btn btn-outline-primary" @click="cancelEditPost">
              Cancel
            </button>
          </div>
        </div>

        <!-- Title and description -->
        <div class="mb-3">
          <!-- Editable title -->
          <div
            class="fs-2"
            contenteditable
            @input="({ target }) => (post.title = target.textContent)"
          >
            {{ post.title }}
          </div>

          <!-- Editable description -->
          <div
            class="mt-2"
            contenteditable
            @input="({ target }) => (post.description = target.textContent)"
          >
            {{ post.description }}
          </div>
        </div>

        <!-- Quill editor for content -->
        <QuillEditor toolbar="full" v-model:content="post.contents" content-type="html" />
      </div>
      <!-- Properties section -->
      <div class="d-flex flex-column gap-3 border rounded pt-2 col-md-3">
        <!-- Input category for post -->
        <div class="px-3">
          <h3>Category</h3>
          <Combobox
            v-model="post.category"
            :data="cacheCategoryCombo.data"
            :columns="cacheCategoryCombo.columns"
            :valueField="cacheCategoryCombo.key"
            :displayField="cacheCategoryCombo.displayField"
          />
        </div>
        <!-- List Tag -->
        <div class="px-3">
          <h3>Tag</h3>
          <!-- list tag chip -->
          <Combobox
            v-model="post.tag"
            :data="cacheTagCombo.data"
            :columns="cacheTagCombo.columns"
            :valueField="cacheTagCombo.key"
            :displayField="cacheTagCombo.displayField"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
import blogApi from "@/apis/business/blogApi";
import { useCacheCategoryCombo } from "../../../utilities/cache/cacheCategoryCombo";
import { useCacheTagCombo } from "../../../utilities/cache/cacheTagCombo";

const { proxy } = getCurrentInstance();
const post = reactive({});
const { cacheCategoryCombo } = useCacheCategoryCombo();
const { cacheTagCombo } = useCacheTagCombo();

/**
 * Lifecycle hook that fetches the post data when the component is mounted.
 */
onMounted(async () => {
  const res = await blogApi.getById(proxy.$route.params.id);
  Object.assign(post, res);
});

/**
 * Saves the draft of the post.
 * @async
 */
const saveDraft = async () => {
  blogApi
    .update(post._id, {
      title: post.title,
      description: post.description,
      contents: post.contents,
      category: post.category,
      tag: post.tag,
    })
    .then(() => {
      proxy.$router.push({ path: `/post/${post._id}/edit` });
    });
};
const cancelEditPost = () => {
  proxy.$router.push({ path: `/post/${post._id}` });
};
</script>

<style lang="scss" scoped>
.post-section {
  height: 40px;
}
</style>
