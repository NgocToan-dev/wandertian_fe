<template>
  <div class="container h-100 flex-column d-flex">
    <div
      class="mb-2 d-flex flex-row justify-content-between align-items-center"
    >
      <div>
        <button
          v-if="!isPreview"
          @click="saveDraft"
          class="btn btn-primary me-2"
        >
          Save
        </button>
      </div>
      <div
        v-if="isPreview"
        @click="openEdit"
        class="d-flex align-items-center h-100"
      >
        <!-- icon edit -->
        <i class="fas fa-edit fa-xl"></i>
      </div>
    </div>
    <!-- Title and description -->
    <div class="mb-2">
      <!-- div contenteditable  -->
      <h2
        :contenteditable="!isPreview"
        @input="({ target }) => (post.title = target.textContent)"
      >
        {{ post.title }}
      </h2>

      <div
        class="mt-2"
        :contenteditable="!isPreview"
        @input="({ target }) => (post.description = target.textContent)"
      >
        {{ post.description }}
      </div>
    </div>
    <div v-if="!isPreview">
      <QuillEditor
        toolbar="full"
        v-model:content="post.contents"
        content-type="html"
      />
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
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
import blogApi from "@/apis/businessApi/blogApi";
import commonFn from "@/utilities/commonFn";

const { proxy } = getCurrentInstance();
const isPreview = ref(false);
const post = reactive({});
onMounted(async () => {
  const res = await blogApi.getById(proxy.$route.params.id);
  Object.assign(post, res);
});

const saveDraft = async () => {
  let mask = commonFn.showMask();
  blogApi
    .update(post.blog_id, {
      title: post.title,
      description: post.description,
      contents: post.contents,
    })
    .then(() => {
      isPreview.value = true;
      commonFn.hideMask(mask);
    });
};
const openEdit = () => {
  isPreview.value = false;
};
</script>

<style lang="scss" scoped></style>
