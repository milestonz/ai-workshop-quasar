<template>
  <q-page class="bg-grey-2">
    <div class="row full-height">
      <!-- 슬라이드 뷰어 -->
      <div class="col-12 col-md-8">
        <div class="q-pa-md">
          <q-card class="slide-viewer">
            <!-- SlideViewer 컴포넌트 사용 -->
            <SlideViewer
              v-if="currentLessonData"
              :lesson="currentLessonData"
              :slide-index="currentSlide"
            />

            <!-- 슬라이드 컨트롤 -->
            <q-card-actions align="center" class="q-pa-md slide-controls">
              <q-btn
                round
                color="primary"
                icon="skip_previous"
                :disable="currentSlide === 0"
                @click="prevSlide"
              />
              <q-btn
                round
                color="primary"
                :icon="isPlaying ? 'pause' : 'play_arrow'"
                size="lg"
                @click="togglePlaying"
              />
              <q-btn
                round
                color="primary"
                icon="skip_next"
                :disable="currentSlide === (currentLessonData?.slides || 0) - 1"
                @click="nextSlide"
              />
            </q-card-actions>

            <!-- 진행률 -->
            <q-card-section class="q-pt-none slide-progress">
              <div class="row items-center justify-between q-mb-sm">
                <span class="text-caption"
                  >슬라이드 {{ currentSlide + 1 }} / {{ currentLessonData?.slides || 0 }}</span
                >
                <span class="text-caption">{{ slideProgress }}%</span>
              </div>
              <q-linear-progress :value="slideProgress / 100" color="primary" size="md" />
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- 사이드 패널 -->
      <div class="col-12 col-md-4">
        <div class="q-pa-md">
          <!-- 댓글 섹션 -->
          <q-card class="q-mb-md">
            <q-card-section>
              <div class="row items-center justify-between">
                <div class="text-h6">댓글</div>
                <q-btn
                  flat
                  round
                  :icon="showComments ? 'expand_less' : 'expand_more'"
                  @click="toggleComments"
                />
              </div>
            </q-card-section>

            <q-slide-transition>
              <div v-show="showComments">
                <q-card-section class="q-pt-none">
                  <!-- 댓글 목록 -->
                  <div v-for="comment in comments" :key="comment.id" class="q-mb-md">
                    <div class="row items-center q-mb-xs">
                      <div class="text-subtitle2">{{ comment.user }}</div>
                      <div class="text-caption text-grey-6 q-ml-sm">{{ comment.time }}</div>
                    </div>
                    <div class="text-body2 q-mb-xs">{{ comment.text }}</div>
                    <div class="row items-center">
                      <q-btn
                        flat
                        round
                        dense
                        :icon="comment.liked ? 'favorite' : 'favorite_border'"
                        :color="comment.liked ? 'red' : 'grey'"
                        @click="toggleCommentLike(comment.id)"
                      />
                      <span class="text-caption q-ml-xs">{{ comment.likes }}</span>
                    </div>
                  </div>

                  <!-- 새 댓글 입력 -->
                  <div class="q-mt-md">
                    <q-input
                      v-model="newComment"
                      outlined
                      dense
                      placeholder="댓글을 입력하세요..."
                      @keyup.enter="addComment"
                    >
                      <template v-slot:append>
                        <q-btn flat round dense icon="send" @click="addComment" />
                      </template>
                    </q-input>
                  </div>
                </q-card-section>
              </div>
            </q-slide-transition>
          </q-card>

          <!-- 메모 섹션 -->
          <q-card>
            <q-card-section>
              <div class="text-h6">나의 메모</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <q-input
                v-model="notes"
                type="textarea"
                outlined
                rows="8"
                placeholder="강의 내용에 대한 메모를 작성하세요..."
                @update:model-value="(value) => updateNotes(value as string)"
              />
              <div class="row justify-between items-center q-mt-sm">
                <span class="text-caption">{{ notes.length }}자 / 1000자</span>
                <div>
                  <q-btn flat color="primary" label="저장" @click="saveNotes" />
                  <q-btn flat color="grey" label="지우기" @click="clearNotes" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useCourseStore } from '../stores/course';
import SlideViewer from '../components/SlideViewer.vue';

const courseStore = useCourseStore();

// Store에서 필요한 상태와 액션들을 구조분해할당
const {
  currentSlide,
  isPlaying,
  showComments,
  newComment,
  notes,
  comments,
  currentLessonData,
  slideProgress,
  nextSlide,
  prevSlide,
  togglePlaying,
  toggleComments,
  addComment,
  updateNotes,
  saveNotes,
  clearNotes,
  toggleCommentLike,
} = courseStore;
</script>

<style scoped>
.slide-viewer {
  min-height: 600px;
  height: 70vh;
  display: flex;
  flex-direction: column;
}

.slide-controls {
  flex-shrink: 0;
  border-top: 1px solid #e0e0e0;
}

.slide-progress {
  flex-shrink: 0;
  border-top: 1px solid #e0e0e0;
}
</style>
