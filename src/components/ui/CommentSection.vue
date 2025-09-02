<template>
  <q-card class="sidebar-card">
    <q-card-section class="q-pb-none">
      <div class="row items-center justify-between">
        <h6 class="q-my-none">댓글</h6>
        <q-btn
          flat
          round
          dense
          :icon="showComments ? 'expand_less' : 'expand_more'"
          @click="toggleComments"
        />
      </div>
    </q-card-section>

    <q-slide-transition>
      <div v-show="showComments">
        <q-card-section class="q-pt-none">
          <div class="comments-section">
            <div v-for="comment in comments" :key="comment.id" class="comment-item">
              <div class="comment-header">
                <span class="comment-author">{{ comment.user }}</span>
                <span class="comment-time">{{ comment.time }}</span>
              </div>
              <div class="comment-content">{{ comment.text }}</div>
              <div class="comment-actions">
                <q-btn
                  flat
                  dense
                  size="sm"
                  :icon="comment.liked ? 'favorite' : 'favorite_border'"
                  :color="comment.liked ? 'red' : 'grey'"
                  @click="handleToggleCommentLike(comment.id)"
                />
                <span class="text-caption text-grey-6 q-ml-xs">{{ comment.likes }}</span>
              </div>
            </div>
          </div>

          <q-input
            v-model="newComment"
            type="textarea"
            placeholder="댓글을 작성하세요..."
            rows="3"
            outlined
            dense
            class="q-mt-md"
          />
          <div class="row justify-end q-mt-sm">
            <q-btn
              color="primary"
              label="댓글 작성"
              size="sm"
              @click="handleAddComment"
              :disable="!newComment.trim()"
            />
          </div>
        </q-card-section>
      </div>
    </q-slide-transition>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Comment } from '../../types/slide';

interface Props {
  comments: Comment[];
  showComments: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  toggleComments: [];
  addComment: [comment: string];
  toggleCommentLike: [commentId: number];
}>();

const newComment = ref('');

// 댓글 표시 토글
const toggleComments = () => {
  emit('toggleComments');
};

// 댓글 추가
const handleAddComment = () => {
  if (newComment.value.trim()) {
    emit('addComment', newComment.value);
    newComment.value = '';
  }
};

// 댓글 좋아요 토글
const handleToggleCommentLike = (commentId: number) => {
  emit('toggleCommentLike', commentId);
};
</script>

<style scoped>
.comments-section {
  max-height: 300px;
  overflow-y: auto;
}

.comment-item {
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.comment-item:last-child {
  border-bottom: none;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
}

.comment-author {
  font-weight: 600;
  font-size: 0.875rem;
}

.comment-time {
  font-size: 0.75rem;
  color: #666;
}

.comment-content {
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.comment-actions {
  display: flex;
  align-items: center;
}
</style>
