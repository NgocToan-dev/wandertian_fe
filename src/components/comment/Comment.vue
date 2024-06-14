<template>
  <div class="w-100">
    <div class="card">
      <div v-for="comment in post.comments" :key="comment._id" class="mb-2">
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
              <p class="card-text">{{ comment.content }}</p>
              <!-- delete button -->
              <div
                v-if="comment.user_id === context?.user_id"
                class="cursor-pointer text-danger"
                @click="deleteComment(comment._id)"
              >
                <!-- icon delete -->
                <i class="fas fa-trash"></i>
              </div>
            </div>
            <div class="w-100 d-flex justify-content-between align-items-end">
              <p class="card-subtitle text-muted">Posted by: {{ comment.user_id }}</p>
              <div
                class="btn-reply d-flex gap-2 align-items-center"
                @click="toggleReplyForm(comment._id)"
              >
                <!-- icon reply -->
                <i class="fas fa-reply"></i>
                <span>Reply</span>
              </div>
            </div>

            <form
              v-if="showReplyForm[comment._id]"
              @submit.prevent="postReply(comment._id)"
              class="mt-3 form-control d-flex align-items-center"
            >
              <textarea
                v-model="commentContent"
                class="comment-area flex-grow-1"
                placeholder="Reply here"
              ></textarea>
              <button class="btn-send" type="submit">
                <!-- loading gif -->
                <img v-if="sendingComment" src="@/assets/img/loading.gif" alt="loading" />
                <img
                  v-if="!sendingComment"
                  src="@/assets/img/paper-plane.png"
                  alt="send-button"
                />
              </button>
            </form>

            <!-- Replies -->
            <div v-if="comment.replies?.length > 0" class="mt-3">
              <div v-for="reply in comment.replies" :key="reply._id" class="card mt-2">
                <div class="card-body">
                  <p class="card-text">{{ reply.content }}</p>
                  <p class="card-subtitle mb-2 text-muted">
                    Posted by: {{ reply.userId }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- New Comment Form -->
    <form
      @submit.prevent="postComment"
      class="mt-3 form-control d-flex align-items-center"
    >
      <textarea
        v-model="commentContent"
        class="comment-area flex-grow-1"
        placeholder="Leave a comment here"
      ></textarea>
      <button class="btn-send" type="submit">
        <!-- loading gif -->
        <img v-if="sendingComment" src="@/assets/img/loading.gif" alt="loading" />
        <img
          v-if="!sendingComment"
          src="@/assets/img/paper-plane.png"
          alt="send-button"
        />
      </button>
    </form>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from "vue";
import CommentApi from "@/apis/business/commentApi";
import { useContextStore } from "@/store/common/contextStore";
import { showInfo } from "@/utilities/modalRegister/messageBox";

const { proxy } = getCurrentInstance();
const contextStore = useContextStore();
const context = contextStore.getContext;
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});
const commentContent = ref("");
const sendingComment = ref(false);
const replyContent = ref("");
const showReplyForm = ref({}); // Object to track reply form visibility

const toggleReplyForm = (commentId) => {
  // Example: Toggle reply form visibility
  showReplyForm.value[commentId] = !showReplyForm.value[commentId];
};

const postComment = async () => {
  // Example: Send new comment to backend
  const payload = {
    post_id: props.post._id,
    user_id: context.user_id,
    content: commentContent.value,
    replies: [],
  };
  try {
    sendingComment.value = true;
    const res = await CommentApi.saveComment(payload);
    if (res.data) {
      commentContent.value = "";
      // reload comments
      props.post.comments = await CommentApi.getCommentsByPostId(props.post._id);
    } else {
      proxy.$toast.error("Failed to post comment");
    }
  } finally {
    sendingComment.value = false;
  }
};
const deleteComment = async (commentId) => {
  // Example: Delete comment by commentId
  showInfo(
    "Are you sure you want to delete this comment?",
    "Delete Comment",
    async () => {
      const res = await CommentApi.delete(commentId);
      if (res) {
        // reload comments
        props.post.comments = await CommentApi.getCommentsByPostId(props.post._id);
      } else {
        proxy.$toast.error("Failed to delete comment");
      }
    }
  );
};
</script>

<style lang="scss" scoped>
/* Add necessary styles */
.comment-area {
  border: none;
  outline: none;
  resize: none;
  max-height: 150px;
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
.card-subtitle {
  font-size: 11px;
  color: #6c757d;
}
</style>
