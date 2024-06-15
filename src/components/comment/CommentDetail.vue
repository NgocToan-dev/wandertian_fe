<template>
  <div class="card-body d-flex gap-3">
    <!-- avatar -->
    <img
      class="rounded-circle"
      src="https://via.placeholder.com/50"
      alt="avatar"
      width="50"
      height="50"
    />
    <div class="flex-grow-1">
      <div class="w-100 d-flex justify-content-between align-items-start">
        <p class="card-text">
          {{ comment.content }}
        </p>
        <!-- delete button -->
        <div
          v-if="comment.user_id === context?.user_id"
          class="cursor-pointer text-danger"
          @click="deleteComment(comment)"
        >
          <!-- icon delete -->
          <i class="fas fa-trash"></i>
        </div>
      </div>
      <div class="w-100 d-flex justify-content-between align-items-end">
        <p class="card-subtitle text-muted">
          {{ formatDate(comment.createdDate) }} - Posted by: {{ comment.username }}
        </p>
        <div
          class="btn-reply d-flex gap-1 align-items-center"
          @click="toggleReplyForm(comment._id)"
        >
          <span>Reply</span>
          <!-- dropdown icon up and down -->
          <i
            :class="{
              'fas fa-chevron-up': showReplyForm[comment._id],
              'fas fa-chevron-down': !showReplyForm[comment._id],
            }"
          />
        </div>
      </div>

      <slot name="replies"></slot>
      <form
        v-if="showReplyForm[comment._id]"
        @submit.prevent="postReply(comment._id)"
        class="mt-3 form-control d-flex align-items-center"
      >
        <textarea
          v-model="replyContent"
          class="comment-area flex-grow-1"
          placeholder="Reply here"
        ></textarea>
        <button class="btn-send" type="submit">
          <!-- loading gif -->
          <img v-if="sendingReply" src="@/assets/img/loading.gif" alt="loading" />
          <img
            v-if="!sendingReply"
            src="@/assets/img/paper-plane.png"
            alt="send-button"
          />
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref } from "vue";
import { useContextStore } from "@/store/common/contextStore";
import { showInfo } from "@/utilities/modalRegister/messageBox";
import CommentApi from "@/apis/business/commentApi";
const contextStore = useContextStore();
const { proxy } = getCurrentInstance();
const context = contextStore.getContext;

const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
});
const showReplyForm = defineModel("showReplyForm");
const sendingReply = ref(false);
const replyContent = ref("");
const emits = defineEmits(["reloadReplies"]);
const toggleReplyForm = async (commentId) => {
  // Example: Toggle reply form visibility
  for (const key in showReplyForm.value) {
    if (key !== commentId) {
      showReplyForm.value[key] = false;
    }
  }
  showReplyForm.value[commentId] = !showReplyForm.value[commentId];
  // get replies of this comment
  if (showReplyForm.value[commentId]) {
    // Example: Get replies by commentId
    proxy.$emit("reloadReplies", commentId);
  } else {
    // Example: Clear replies of this comment
    proxy.$emit("reloadReplies", commentId, true);
  }
};
const deleteComment = async (comment) => {
  // Example: Delete comment by commentId
  showInfo(
    "Are you sure you want to delete this comment?",
    "Delete Comment",
    async () => {
      const res = await CommentApi.delete(comment._id);
      if (res) {
        // reload comments
        proxy.$emit("reloadReplies", comment.parent_id);
      } else {
        proxy.$toast.error("Failed to delete comment");
      }
    }
  );
};
const postReply = async (commentId) => {
  // Example: Send new reply to backend
  const payload = {
    parent_id: commentId,
    user_id: context.user_id,
    username: context.username,
    content: replyContent.value,
    createdDate: new Date(),
  };
  try {
    sendingReply.value = true;
    const res = await CommentApi.saveComment(payload);
    if (res.data) {
      replyContent.value = "";
      // reload replies
      proxy.$emit("reloadReplies", commentId);
    } else {
      proxy.$toast.error("Failed to post reply");
    }
  } finally {
    sendingReply.value = false;
  }
};
const formatDate = (date) => {
  if (date === undefined) return;
  const options = { year: "numeric", month: "long", day: "numeric" };
  return `${new Date(date).toLocaleDateString("en-US", options)}
    - ${new Date(date).toLocaleTimeString("en-US")}`;
};
</script>

<style lang="scss" scoped>
.comment-area {
  border: none;
  outline: none;
  resize: none;
  max-height: 150px;
}
.error-comment {
  border: 1px solid red;
}
.btn-send {
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  width: 25px;
  height: 25px;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}
.btn-reply {
  cursor: pointer;
  color: #007bff;
  span {
    font-size: 12px;
    font-weight: 500;
  }
}
.card-body {
  padding-right: 0 !important;
}
.card-subtitle {
  font-size: 11px;
  color: #6c757d;
}
</style>
