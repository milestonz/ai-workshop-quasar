<template>
  <div
    class="slide-viewer-container"
    :style="{ width: isPresentationMode ? '100%' : slideViewerWidth + '%' }"
  >
    <div class="slide-container">
      <q-card class="slide-viewer">
        <!-- SlideViewer 컴포넌트 사용 -->
        <SlideViewer :lesson="lesson" :slide-index="slideIndex" ref="slideViewerRef" />

        <!-- 좌측 화살표 버튼 -->
        <q-btn
          round
          color="red"
          icon="chevron_left"
          size="lg"
          class="slide-nav-btn slide-nav-left"
          :disable="isPrevButtonDisabled"
          @click.stop="handlePrevSlide"
        >
          <q-tooltip>이전 슬라이드</q-tooltip>
        </q-btn>

        <!-- 우측 화살표 버튼 -->
        <q-btn
          round
          color="red"
          icon="chevron_right"
          size="lg"
          class="slide-nav-btn slide-nav-right"
          :disable="isNextButtonDisabled"
          @click.stop="handleNextSlide"
        >
          <q-tooltip>다음 슬라이드</q-tooltip>
        </q-btn>

        <!-- 추가 설명 창 -->
        <q-card-section class="q-pt-none slide-notes">
          <div class="notes-header">
            <q-icon name="info" size="sm" class="q-mr-xs" />
            <span class="text-caption text-weight-medium">추가 정보</span>
          </div>
          <div class="notes-content">
            <!-- 추가 정보 내용이 여기에 표시됩니다 -->
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SlideViewer from './SlideViewer.vue';
import type { Lesson } from '../types/slide';

interface Props {
  lesson: Lesson;
  slideIndex: number;
  isPresentationMode: boolean;
  slideViewerWidth: number;
  isPrevButtonDisabled: boolean;
  isNextButtonDisabled: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  prevSlide: [];
  nextSlide: [];
  slideNavigation: [direction: 'prev' | 'next'];
}>();

const slideViewerRef = ref();

// 이전 슬라이드로 이동
const handlePrevSlide = (event?: Event) => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  // 전체화면 상태 확인
  const wasFullscreen = !!document.fullscreenElement;
  const fullscreenElement = document.fullscreenElement;

  emit('slideNavigation', 'prev');
  emit('prevSlide');

  // 전체화면 상태 복원 (더 안정적인 방법)
  if (wasFullscreen && !document.fullscreenElement) {
    setTimeout(() => {
      // 전체화면 요소를 다시 찾아서 복원
      const targetElement =
        fullscreenElement ||
        document.querySelector('.slide-viewer-container') ||
        document.querySelector('.slide-viewer');
      if (targetElement) {
        targetElement.requestFullscreen().catch((err) => {
          console.log('전체화면 복원 실패:', err);
        });
      }
    }, 50);
  }
};

// 다음 슬라이드로 이동
const handleNextSlide = (event?: Event) => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  // 전체화면 상태 확인
  const wasFullscreen = !!document.fullscreenElement;
  const fullscreenElement = document.fullscreenElement;

  emit('slideNavigation', 'next');
  emit('nextSlide');

  // 전체화면 상태 복원 (더 안정적인 방법)
  if (wasFullscreen && !document.fullscreenElement) {
    setTimeout(() => {
      // 전체화면 요소를 다시 찾아서 복원
      const targetElement =
        fullscreenElement ||
        document.querySelector('.slide-viewer-container') ||
        document.querySelector('.slide-viewer');
      if (targetElement) {
        targetElement.requestFullscreen().catch((err) => {
          console.log('전체화면 복원 실패:', err);
        });
      }
    }, 50);
  }
};

// 슬라이드 뷰어 ref 노출
defineExpose({
  slideViewerRef,
});
</script>

<style scoped>
/* 슬라이드 뷰어 컨테이너 */
.slide-viewer-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.slide-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.slide-viewer {
  position: relative;
  width: 100%;
  height: 100%;
}

/* 화살표 버튼 고정 위치 */
.slide-nav-btn {
  position: fixed !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  z-index: 1000 !important;
  background-color: rgba(255, 0, 0, 0.8) !important;
  color: white !important;
  border: 2px solid rgba(255, 255, 255, 0.3) !important;
  backdrop-filter: blur(5px) !important;
  transition: all 0.3s ease !important;
}

.slide-nav-btn:hover {
  background-color: rgba(255, 0, 0, 1) !important;
  transform: translateY(-50%) scale(1.1) !important;
  border-color: rgba(255, 255, 255, 0.6) !important;
}

/* 좌측 화살표 */
.slide-nav-left {
  left: 20px !important;
}

/* 우측 화살표 */
.slide-nav-right {
  right: 20px !important;
}

/* 비활성화된 버튼 */
.slide-nav-btn:disabled {
  opacity: 0.3 !important;
  cursor: not-allowed !important;
}

/* 전체화면 모드에서 화살표 버튼이 전체화면을 해제하지 않도록 */
.slide-nav-btn {
  pointer-events: auto;
}

/* 전체화면 모드에서 버튼 클릭 시 전체화면 유지 */
.slide-viewer-container:fullscreen .slide-nav-btn {
  position: fixed !important;
  z-index: 9999 !important;
  pointer-events: auto !important;
}

/* 전체화면 모드에서 버튼 호버 효과 */
.slide-viewer-container:fullscreen .slide-nav-btn:hover {
  transform: translateY(-50%) scale(1.1) !important;
  transition: transform 0.2s ease !important;
}

/* 전체화면 모드에서 버튼 클릭 시 이벤트 전파 방지 */
.slide-viewer-container:fullscreen .slide-nav-btn:active {
  pointer-events: auto !important;
}

/* 전체화면 모드에서 버튼 포커스 방지 */
.slide-viewer-container:fullscreen .slide-nav-btn:focus {
  outline: none !important;
}
</style>
