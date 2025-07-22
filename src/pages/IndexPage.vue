<template>
  <q-page class="bg-grey-2">
    <div class="row full-height">
      <!-- 슬라이드 뷰어 -->
      <div class="col-12 col-md-8">
        <div class="q-pa-md">
          <q-card class="slide-viewer">
            <q-card-section class="text-center q-pa-xl">
              <!-- 현재 슬라이드 제목 -->
              <div
                v-if="currentLessonData?.slideTitles && currentLessonData.slideTitles[currentSlide]"
                class="q-mb-lg"
              >
                <q-chip color="primary" text-color="white" class="q-mb-md"> 현재 슬라이드 </q-chip>
                <div class="text-h5 text-primary q-mb-md">
                  {{ currentLessonData.slideTitles[currentSlide] }}
                </div>
              </div>

              <!-- 슬라이드 내용 -->
              <div class="text-body1 text-grey-8">
                <p>이 슬라이드의 내용을 준비 중입니다.</p>
                <p class="text-caption">다른 슬라이드를 선택하거나 나중에 다시 확인해주세요.</p>
              </div>
            </q-card-section>

            <!-- 슬라이드 컨트롤 -->
            <q-card-actions align="center" class="q-pa-md">
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
            <q-card-section class="q-pt-none">
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
                  <q-input
                    v-model="newComment"
                    filled
                    dense
                    placeholder="댓글을 입력하세요..."
                    @keyup.enter="addComment"
                  >
                    <template v-slot:append>
                      <q-btn round dense flat icon="send" @click="addComment" />
                    </template>
                  </q-input>
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
                filled
                rows="6"
                placeholder="강의 내용에 대한 메모를 작성하세요..."
                @update:model-value="updateNotes"
              />
              <div class="row items-center justify-between q-mt-sm">
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
import { computed } from 'vue';
import { useCourseStore } from 'src/stores/course';

const courseStore = useCourseStore();

// Computed properties
const currentLessonData = computed(() => courseStore.currentLessonData);
const currentSlide = computed(() => courseStore.currentSlide);
const isPlaying = computed(() => courseStore.isPlaying);
const showComments = computed(() => courseStore.showComments);
const comments = computed(() => courseStore.comments);
const newComment = computed({
  get: () => courseStore.newComment,
  set: (value) => (courseStore.newComment = value),
});
const notes = computed({
  get: () => courseStore.notes,
  set: (value) => (courseStore.notes = value),
});
const slideProgress = computed(() => courseStore.slideProgress);

// Methods
const prevSlide = () => courseStore.prevSlide();
const nextSlide = () => courseStore.nextSlide();
const togglePlaying = () => courseStore.togglePlaying();
const toggleComments = () => courseStore.toggleComments();
const addComment = () => courseStore.addComment();
const updateNotes = (value: string | number | null) => {
  if (typeof value === 'string') {
    courseStore.updateNotes(value);
  }
};
const saveNotes = () => courseStore.saveNotes();
const clearNotes = () => courseStore.clearNotes();
const toggleCommentLike = (commentId: number) => courseStore.toggleCommentLike(commentId);
</script>

<style scoped>
.slide-viewer {
  min-height: 600px;
  height: 70vh;
}
</style>
