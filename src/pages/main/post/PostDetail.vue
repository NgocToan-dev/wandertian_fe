<template>
  <div class="container h-100 flex-column d-flex">
    <div>
      <button @click="saveDraft" class="btn btn-primary mb-2">Save</button>
    </div>
    <QuillEditor ref="quillEditor" toolbar="essential" />
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from "vue";
import blogApi from "@/apis/businessApi/blogApi";

const { proxy } = getCurrentInstance();

const post = ref({});
onMounted(async () => {
  blogApi.getById(proxy.$route.params.id).then((res) => {
    post.value = res;
    proxy.$refs.quillEditor.setContents(JSON.parse(post.value.description));
  });
});

const saveDraft = () => {
  const description = proxy.$refs.quillEditor.getContents();
  blogApi.update(post.value.blog_id, { description: JSON.stringify(description) });
};
</script>

<style lang="scss" scoped>
:deep(.ql-container) {
  flex-grow: 1;
}
</style>
