<template>
  <div class="w-100">
    <!-- TODO: Find the way to backtrack tree for CommentDetail -->
    <div class="card pe-3" v-if="post.comments?.length > 0">
      <CommentDetail
        v-for="comment in post.comments"
        :key="comment._id"
        class="mb-2"
        :comment="comment"
        v-model:showReplyForm="showReplyForm"
        @postComment="postComment"
        @reloadReplies="reloadReplies"
      >
        <template #replies>
          <CommentDetail
            v-for="reply in comment.replies"
            :key="reply._id"
            :comment="reply"
            v-model:showReplyForm="showReplyForm"
            @reloadReplies="reloadReplies"
          >
            <template #replies>
              <CommentDetail
                v-for="subReply in reply.replies"
                :key="subReply._id"
                :comment="subReply"
                v-model:showReplyForm="showReplyForm"
                @reloadReplies="reloadReplies"
              >
                <template #replies>
                  <CommentDetail
                    v-for="subSubReply in subReply.replies"
                    :key="subSubReply._id"
                    :comment="subSubReply"
                    v-model:showReplyForm="showReplyForm"
                    @reloadReplies="reloadReplies"
                  >
                  </CommentDetail>
                </template>
              </CommentDetail>
            </template>
          </CommentDetail>
        </template>
      </CommentDetail>
    </div>

    <!-- New Comment Form -->
    <form
      @submit.prevent="postComment"
      class="mt-3 form-control d-flex align-items-center"
      :class="{ 'error-comment': errorComment }"
    >
      <textarea
        v-model="commentContent"
        class="comment-area flex-grow-1"
        placeholder="Leave a comment here"
        @blur="errorComment = false"
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
import CommentDetail from "./CommentDetail.vue";

const { proxy } = getCurrentInstance();
const contextStore = useContextStore();
const context = contextStore.getContext;
const showReplyForm = ref({});
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});
const commentContent = ref("");
const sendingComment = ref(false);

const errorComment = ref(false);

const postComment = async (event) => {
  // check if logged in or not before posting comment
  if (!context || !context.user_id) {
    showInfo(
      "Please login to post comment. Do you want to login?",
      "Login Required",
      () => {
        proxy.$router.push("/login");
      }
    );
    return;
  }
  if (!commentContent.value) {
    errorComment.value = true;
    // find the first textarea and focus on it
    const textarea = event.target.querySelector("textarea");
    proxy.$nextTick(() => {
      textarea.focus();
    });
    return;
  }
  // Example: Send new comment to backend
  const payload = {
    post_id: props.post._id,
    user_id: context.user_id,
    username: context.username,
    content: commentContent.value,
    createdDate: new Date(),
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
const reloadReplies = async (commentId, isClear) => {
  // Example: Get replies by commentId
  const replies = await CommentApi.getRepliesByCommentId(commentId);
  // find parent of replies in comment or replies of comment
  const parentComment = props.post.comments.find((comment) => comment._id === commentId);
  if (parentComment) {
    parentComment.replies = isClear ? [] : replies;
  } else {
    const parentReplies = findParentComment(props.post.comments, commentId);
    if (parentReplies) {
      parentReplies.replies = isClear ? [] : replies;
    }
  }
};

// use backtracking to find the parent comment of list replies
const findParentComment = (comments, commentId) => {
  for (const comment of comments) {
    if (comment._id === commentId) {
      return comment;
    }
    if (comment.replies) {
      const parentComment = findParentComment(comment.replies, commentId);
      if (parentComment) {
        return parentComment;
      }
    }
  }
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
</style>
