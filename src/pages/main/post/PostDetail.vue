<template>
  <div class="container h-100 flex-column d-flex">
    <div class="mb-2">
      <button @click="saveDraft" class="btn btn-primary me-2">Save</button>
      <button @click="preview" class="btn btn-light">Preview</button>
    </div>
    <div v-show="!isPreview">
      <QuillEditor ref="quillEditor" toolbar="essential" />
    </div>
    <div v-show="isPreview">
      <QuillEditor
        ref="quillEditorPreview"
        toolbar="essential"
        :theme="'bubble'"
        readOnly
      />
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from "vue";
import blogApi from "@/apis/businessApi/blogApi";

const { proxy } = getCurrentInstance();
const isPreview = ref(false);
const post = ref({});
onMounted(async () => {
  blogApi.getById(proxy.$route.params.id).then((res) => {
    post.value = res;
    setContentEditor(JSON.parse(post.value.contents));
  });
});
const setContentEditor = (content) => {
  proxy.$refs.quillEditor.setContents(content);
  proxy.$refs.quillEditorPreview.setContents(content);
};
const saveDraft = () => {
  const contents = proxy.$refs.quillEditor.getContents();
  blogApi.update(post.value.blog_id, { contents: JSON.stringify(contents) });
};
const preview = () => {
  setContentEditor(proxy.$refs.quillEditor.getContents());
  isPreview.value = !isPreview.value;
};
</script>

<style lang="scss" scoped>
:deep(.ql-container) {
  flex-grow: 1;
}
</style>
