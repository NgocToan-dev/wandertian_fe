/** * @file PostDetail.vue * @description A Vue component for displaying and editing a
post detail. * @module components/PostDetail */ /** * Vue component for displaying and
editing a post detail. * * @template * @component */
<template>
  <div class="container d-flex flex-row-reverse gap-3">
    <!-- Properties section -->
    <div class="w-25 d-flex flex-column gap-3 border rounded pt-2">
      <!-- Input category for post -->
      <div class="px-3">
        <h3>Category</h3>
        <Combobox
          v-model="post.category"
          :data="categories"
          :columns="categoryColumns"
          key="category_id"
          displayField="category_name"
        />
      </div>
      <!-- List Tag -->
      <div class="px-3">
        <h3>Tag</h3>
        <!-- list tag chip -->
        <Combobox
          v-model="post.tag"
          :data="categories"
          :columns="categoryColumns"
          key="category_id"
          displayField="category_name"
        />
      </div>
    </div>
    <div class="h-100 flex-column d-flex flex-grow-1">
      <!-- Save button and edit icon -->
      <div
        class="post-section mb-2 d-flex flex-row justify-content-between align-items-center"
      >
        <div>
          <button v-if="!isPreview" @click="saveDraft" class="btn btn-primary me-2">
            Save
          </button>
          <!-- Cancel button -->
          <button
            v-if="!isPreview"
            @click="isPreview = true"
            class="btn btn-outline-primary"
          >
            Cancel
          </button>
        </div>
        <div
          v-if="isPreview"
          @click="openEdit"
          class="cursor-pointer d-flex align-items-center h-100"
        >
          <!-- Edit icon -->
          <i class="fas fa-edit fa-xl text-primary"></i>
        </div>
      </div>

      <!-- Title and description -->
      <div class="mb-2">
        <!-- Editable title -->
        <h2
          :contenteditable="!isPreview"
          @input="({ target }) => (post.title = target.textContent)"
        >
          {{ post.title }}
        </h2>

        <!-- Editable description -->
        <div
          class="mt-2"
          :contenteditable="!isPreview"
          @input="({ target }) => (post.description = target.textContent)"
        >
          {{ post.description }}
        </div>
      </div>

      <!-- Quill editor for content -->
      <div v-if="!isPreview">
        <QuillEditor toolbar="full" v-model:content="post.contents" content-type="html" />
      </div>
      <div v-else>
        <QuillEditor
          theme="bubble"
          readOnly
          v-model:content="post.contents"
          content-type="html"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
import blogApi from "@/apis/business/blogApi";
import commonFn from "@/utilities/commonFn";
import categoryApi from "../../../apis/business/categoryApi";

const { proxy } = getCurrentInstance();
const isPreview = ref(true);
const post = reactive({});
const categories = ref([]);
const categoryColumns = ref([
  { dataField: "category_id", label: "ID" },
  { dataField: "category_name", label: "Name" },
  // Add more columns here
]);

/**
 * Lifecycle hook that fetches the post data when the component is mounted.
 */
onMounted(async () => {
  const res = await blogApi.getById(proxy.$route.params.id);
  Object.assign(post, res);
  const category = await categoryApi.get();
  categories.value = category;
});

/**
 * Saves the draft of the post.
 * @async
 */
const saveDraft = async () => {
  let mask = commonFn.showMask();
  blogApi
    .update(post._id, {
      title: post.title,
      description: post.description,
      contents: post.contents,
      category: post.category,
      tag: post.tag,
    })
    .then(() => {
      isPreview.value = true;
      commonFn.hideMask(mask);
    });
};

/**
 * Opens the post for editing.
 */
const openEdit = () => {
  isPreview.value = false;
  console.log(post);
};
</script>

<style lang="scss" scoped>
.post-section {
  height: 40px;
}
</style>
