<template>
  <q-layout view="hHh LpR fFf">
    <!-- 사이드바 -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-1" :width="300">
      <q-scroll-area class="fit">
        <div class="q-pa-md">
          <div class="text-h6 text-weight-bold q-mb-md">📚 AI 워크샵 강의</div>

          <!-- 목차 -->
          <div class="text-subtitle2 text-weight-medium q-mb-sm">📖 강의 목차</div>
          <q-list>
            <q-expansion-item
              v-for="(lesson, index) in courseStore.lessons"
              :key="index"
              :label="lesson.title"
              :icon="getChapterIcon(index)"
              :default-opened="index === courseStore.currentLesson"
              class="q-mb-sm"
            >
              <q-list>
                <q-item
                  v-for="slideIndex in [...Array(lesson.slides).keys()]"
                  :key="`lesson-${index}-slide-${slideIndex}`"
                  v-show="slideIndex > 0"
                  clickable
                  :active="
                    index === courseStore.currentLesson && slideIndex === courseStore.currentSlide
                  "
                  @click="navigateToSlide(index, slideIndex)"
                  class="q-pl-lg"
                >
                  <q-item-section avatar>
                    <q-icon name="slideshow" size="sm" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-caption">
                      {{ getChapterNumber(index) }}-{{ slideIndex }}
                      {{ getSlideTitle(index, slideIndex) }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-expansion-item>
          </q-list>

          <!-- 진행률 -->
          <div class="q-mt-lg">
            <div class="text-subtitle2 text-weight-medium q-mb-sm">📊 학습 진행률</div>
            <q-linear-progress :value="progressPercentage" color="primary" class="q-mb-sm" />
            <div class="text-caption text-grey-7">
              {{ completedSlides }} / {{ totalSlides }} 슬라이드 완료
            </div>
          </div>
        </div>
      </q-scroll-area>
    </q-drawer>

    <!-- 메인 콘텐츠 -->
    <q-page-container>
      <q-page class="q-pa-md">
        <!-- 헤더 -->
        <div class="row items-center q-mb-md">
          <div class="col">
            <div class="text-h5 text-weight-bold">
              {{ currentLessonTitle }}
            </div>
            <div class="text-subtitle1 text-grey-7">
              {{ currentSlideTitle }}
            </div>
          </div>
          <div class="col-auto">
            <q-chip
              :color="isLive ? 'red' : 'grey'"
              text-color="white"
              :icon="isLive ? 'fiber_manual_record' : 'schedule'"
              :label="isLive ? '실시간 강의 중' : '강의 준비 중'"
            />
          </div>
        </div>

        <!-- 슬라이드 뷰어 -->
        <div class="slide-container">
          <SlideViewer
            v-if="currentLessonData"
            :lesson="currentLessonData"
            :slide-index="courseStore.currentSlide"
            class="student-slide-viewer"
          />
        </div>

        <!-- 네비게이션 -->
        <div class="row items-center justify-center q-mt-lg">
          <!-- 이전 버튼 -->
          <div class="col-auto q-mr-md">
            <q-btn
              flat
              round
              icon="chevron_left"
              :disable="courseStore.currentSlide === 0"
              @click="prevSlide"
              class="navigation-btn"
            >
              <q-tooltip>이전 슬라이드</q-tooltip>
            </q-btn>
          </div>

          <!-- 페이지 표시 -->
          <div class="col-auto text-center">
            <div class="text-caption text-grey-7">
              {{ getChapterNumber(courseStore.currentLesson) }}-{{ courseStore.currentSlide + 1 }}
            </div>
            <div class="text-caption">
              슬라이드 {{ courseStore.currentSlide + 1 }} / {{ currentLessonData?.slides || 0 }}
            </div>
          </div>

          <!-- 다음 버튼 -->
          <div class="col-auto q-ml-md">
            <q-btn
              flat
              round
              icon="chevron_right"
              :disable="courseStore.currentSlide === (currentLessonData?.slides || 0) - 1"
              @click="nextSlide"
              class="navigation-btn"
            >
              <q-tooltip>다음 슬라이드</q-tooltip>
            </q-btn>
          </div>
        </div>

        <!-- 추가 기능 버튼들 -->
        <div class="row items-center justify-center q-mt-md">
          <div class="col-auto">
            <q-btn flat round icon="fullscreen" @click="toggleFullscreen" class="q-mr-sm">
              <q-tooltip>전체화면</q-tooltip>
            </q-btn>
            <q-btn flat round icon="refresh" @click="refreshContent">
              <q-tooltip>새로고침</q-tooltip>
            </q-btn>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useCourseStore } from 'src/stores/course';
import SlideViewer from 'src/components/SlideViewer.vue';

// 스토어
const courseStore = useCourseStore();

// 상태
const leftDrawerOpen = ref(true);
const isLive = ref(true); // 실시간 강의 상태

// 계산된 속성
const currentLessonData = computed(() => {
  return courseStore.lessons[courseStore.currentLesson];
});

const currentLessonTitle = computed(() => {
  return currentLessonData.value?.title || '강의 제목';
});

const currentSlideTitle = computed(() => {
  const lesson = courseStore.lessons[courseStore.currentLesson];
  if (lesson && lesson.slideTitles && lesson.slideTitles[courseStore.currentSlide]) {
    return lesson.slideTitles[courseStore.currentSlide];
  }
  return `슬라이드 ${courseStore.currentSlide + 1}`;
});

const totalSlides = computed(() => {
  return courseStore.lessons.reduce((total, lesson) => total + lesson.slides, 0);
});

const completedSlides = computed(() => {
  let completed = 0;
  for (let i = 0; i < courseStore.currentLesson; i++) {
    const lesson = courseStore.lessons[i];
    if (lesson) {
      completed += lesson.slides;
    }
  }
  completed += courseStore.currentSlide + 1;
  return completed;
});

const progressPercentage = computed(() => {
  return totalSlides.value > 0 ? completedSlides.value / totalSlides.value : 0;
});

// 메서드
const getChapterIcon = (index: number): string => {
  const icons = ['school', 'psychology', 'lightbulb', 'trending_up', 'group', 'celebration'];
  return icons[index % icons.length] || 'school';
};

const getSlideTitle = (lessonIndex: number, slideIndex: number): string => {
  const lesson = courseStore.lessons[lessonIndex];
  if (lesson?.slideTitles?.[slideIndex]) {
    return lesson.slideTitles[slideIndex];
  }
  return `슬라이드 ${slideIndex + 1}`;
};

const getChapterNumber = (lessonIndex: number): string => {
  const lesson = courseStore.lessons[lessonIndex];
  if (lesson?.title) {
    const match = lesson.title.match(/^(\d+)\./);
    if (match?.[1]) {
      return match[1];
    }
  }
  return String(lessonIndex + 1);
};

const navigateToSlide = async (lessonIndex: number, slideIndex: number) => {
  try {
    await courseStore.setCurrentLesson(lessonIndex);
    await courseStore.setCurrentSlide(slideIndex);
  } catch (error) {
    console.error('슬라이드 이동 오류:', error);
  }
};

const prevSlide = async () => {
  if (courseStore.currentSlide > 0) {
    await courseStore.prevSlide();
  }
};

const nextSlide = async () => {
  const lesson = courseStore.lessons[courseStore.currentLesson];
  if (lesson && courseStore.currentSlide < lesson.slides - 1) {
    await courseStore.nextSlide();
  }
};

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

const refreshContent = async () => {
  // 강사가 슬라이드를 변경했을 때를 대비한 새로고침
  console.log('🔄 수강생용 콘텐츠 새로고침');
};

// 실시간 업데이트 (강사가 슬라이드를 변경할 때)
const startRealtimeUpdates = () => {
  const interval = setInterval(() => {
    // 강사가 현재 슬라이드를 변경했는지 확인
    // 실제 구현에서는 WebSocket이나 Server-Sent Events를 사용
    console.log('📡 실시간 업데이트 확인 중...');
  }, 5000); // 5초마다 확인

  return interval;
};

// 라이프사이클
onMounted(async () => {
  console.log('🎓 수강생용 뷰어 시작');

  // 실시간 업데이트 시작
  const updateInterval = startRealtimeUpdates();

  // 컴포넌트 언마운트 시 인터벌 정리
  onUnmounted(() => {
    clearInterval(updateInterval);
  });
});
</script>

<style scoped>
.student-slide-viewer {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.slide-container {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 수강생용 특별 스타일 */
.q-drawer {
  border-right: 2px solid #e0e0e0;
}

.q-expansion-item {
  border-radius: 8px;
  margin-bottom: 4px;
}

.q-item {
  border-radius: 6px;
  margin: 2px 0;
}

.q-item--active {
  background-color: #e3f2fd;
  color: #1976d2;
}

/* 진행률 표시 */
.q-linear-progress {
  height: 8px;
  border-radius: 4px;
}

/* 실시간 상태 표시 */
.q-chip {
  font-weight: 600;
}

/* 네비게이션 버튼 스타일 */
.navigation-btn {
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.navigation-btn:hover:not(:disabled) {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.navigation-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .q-drawer {
    width: 280px !important;
  }

  .slide-container {
    min-height: 60vh;
  }

  /* 모바일에서 네비게이션 버튼 크기 조정 */
  .navigation-btn {
    width: 40px;
    height: 40px;
  }
}
</style>
