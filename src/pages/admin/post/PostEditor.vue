<template>
  <div class="row py-4 px-5 h-100">
    <div class="h-100 flex-column d-flex col-md-9">
      <!-- Save button and edit icon -->
      <div
        class="post-section mb-2 d-flex flex-row justify-content-between align-items-center"
      >
        <div>
          <!-- Published button -->
          <button
            class="btn btn-primary me-2"
            @click="save($global.PostStatus.PUBLISHED)"
          >
            <i class="fas fa-check"></i> Publish
          </button>
          <!-- Save draft button -->
          <button
            @click="save($global.PostStatus.DRAFT)"
            class="btn btn-outline-primary me-2"
          >
            Save Draft
          </button>
          <!-- Cancel button -->
          <button class="btn btn-outline-secondary" @click="cancelEditPost">
            Cancel
          </button>
        </div>
      </div>

      <!-- Title and description -->
      <div class="mb-3">
        <!-- Editable title -->
        <div
          class="fs-2"
          contenteditable="true"
          placeholder="Title"
          @input="({ target }) => (post.title = target.textContent)"
        >
          {{ post.title }}
        </div>

        <!-- Editable description -->
        <div
          class="mt-2"
          contenteditable="true"
          placeholder="Description"
          @input="({ target }) => (post.description = target.textContent)"
        >
          {{ post.description }}
        </div>
      </div>

      <!-- Quill editor for content -->
      <RichEditor v-model:content="post.contents"/>
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
      <!-- Image theme -->
      <div class="image-theme px-3">
        <h3>Image</h3>
        <input type="file" class="form-control" @change="chooseImageTheme" />
        <div class="w-100 mt-2 p-1 border rounded">
          <img :src="post.imageTheme" alt="image-theme" />
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
import EditMode from "@/utilities/enum/EditMode";
import { useLoadingStore } from "@/store/common/loadingStore";
import PostStatus from "@/utilities/enum/PostStatus";

const { proxy } = getCurrentInstance();
const mask = useLoadingStore();
const post = reactive({});
const { cacheCategoryCombo } = useCacheCategoryCombo();
const { cacheTagCombo } = useCacheTagCombo();

const editMode = ref(EditMode.EDIT);

/**
 * Lifecycle hook that fetches the post data when the component is mounted.
 */
onMounted(async () => {
  if (proxy.$route.query.mode === EditMode.CREATE) {
    editMode.value = EditMode.CREATE;
    return;
  }

  try {
    mask.show();
    const res = await blogApi.getById(proxy.$route.params.id);
    Object.assign(post, res);
  } finally {
    mask.hide();
  }
});

/**
 * Saves the draft of the post.
 * @async
 */
const save = async (mode) => {
  if (mode === PostStatus.PUBLISHED) {
    post.postStatus = PostStatus.PUBLISHED;
  } else {
    post.postStatus = PostStatus.DRAFT;
  }
  try{
    mask.show();
  if (editMode.value === EditMode.CREATE) {
    await createPost();
  } else {
    await updatePost();
  }
  }finally{
    mask.hide();
  }
};
/**
 * Creates a new post.
 * @async
 * @returns {Promise<void>}
 * @created 8/6/2024
 */
const createPost = async () => {
  post.createdDate = new Date();
  await blogApi.create(post);
  proxy.$router.push({ path: "/admin/post" });
};
/**
 * Updates the post.
 * @async
 * @returns {Promise<void>}
 * @created 8/6/2024
 */
const updatePost = async () => {
  post.updatedDate = new Date();
  await blogApi.update(post);
  proxy.$router.push({ path: "/admin/post" });
};
const cancelEditPost = () => {
  proxy.$router.push({ path: "/admin/post" });
};

/**
 * Function to handle image selection and display it in the post editor.
 *
 * @param {Event} event - The event object triggered by the image selection.
 */
const chooseImageTheme = (event) => {
  const file = event.target.files[0];

  // Check if the file type is supported
  if (!checkFileType(file)) {
    proxy.$toast.error("File type is not supported");
    return;
  }

  // Read the selected image file and set it as the post image
  const reader = new FileReader();
  reader.onload = (e) => {
    post.imageTheme = e.target.result;
  };
  reader.readAsDataURL(file);
};

/**
 * Checks if the file type is accepted.
 * @param {File} file - The file to check.
 * @returns {boolean} - Returns true if the file type is accepted, otherwise false.
 */
const checkFileType = (file) => {
  const fileTypeAccepted = ["png", "jpeg", "jpg"];
  const fileType = file.name.split(".").pop();
  return fileTypeAccepted.includes(fileType);
};
</script>

<style lang="scss" scoped>
.post-section {
  height: 40px;
}
.image-theme {
  img {
    width: 100%;
    height: auto;
  }
}
</style>
