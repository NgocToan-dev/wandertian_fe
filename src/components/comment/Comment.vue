<template>
  <div class="w-100">
    <div v-for="comment in post.comments" :key="comment._id">
      <p>{{ comment.content }}</p>
      <p>Posted by: {{ comment.userId }}</p>
      <button @click="toggleReplyForm(comment._id)">Reply</button>
      
      <!-- Reply Form -->
      <form v-if="showReplyForm[comment._id]" @submit.prevent="postReply(comment._id)">
        <textarea v-model="replyContent"></textarea>
        <button type="submit" class="btn btn-primary btn-sm">Submit Reply</button>
      </form>
      
      <!-- Replies -->
      <div v-if="comment.replies.length > 0">
        <div v-for="reply in comment.replies" :key="reply._id">
          <p>{{ reply.content }}</p>
          <p>Posted by: {{ reply.userId }}</p>
        </div>
      </div>
    </div>
    
    <!-- New Comment Form -->
    <form @submit.prevent="postComment" class="mt-3 form-control d-flex align-items-center">
      <textarea v-model="commentContent" class="comment-area flex-grow-1"></textarea>
      <button class="btn-send" type="submit"><img src="@/assets/img/paper-plane.png" alt="send-button"></button>
    </form>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref } from 'vue';
import CommentApi from '@/apis/business/commentApi';
import {useContextStore} from '@/store/common/contextStore';

const {proxy} = getCurrentInstance();
const contextStore = useContextStore();

const props = defineProps({
  post: {
    type: Object,
    required: true,
  }
});
const commentContent = ref('');
const replyContent = ref('');
const showReplyForm = {}; // Object to track reply form visibility
const toggleReplyForm = (commentId) => {
  proxy.$set(showReplyForm, commentId, !showReplyForm[commentId]);
}
const postComment = async () => {
  // Example: Send new comment to backend
  const payload = {
    post_id: props.post._id,
    user_id: contextStore.$state.context?.user_id,
    commentContent: commentContent.value,
  }
  const res = await CommentApi.saveComment(payload);
  if(!res.data){
    proxy.$toast.error("Failed to post comment");  
  }
}
</script>

<style lang="scss" scoped>
/* Add necessary styles */
.comment-area{
  border: none;
  outline: none;
  resize: none;
  max-height: 150px;
}
.btn-send{
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  width: 25px;
  height: 25px;
  img{
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}
</style>
