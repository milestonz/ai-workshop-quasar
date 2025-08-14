<template>
  <q-page class="simple-slide-page">
    <!-- 메인 콘텐츠 -->
    <div class="main-content">
      <!-- 슬라이드 뷰어 영역 -->
      <div class="slide-viewer-container">
        <SimpleSlideViewer :slide-number="currentSlideNumber" />
      </div>

      <!-- 네비게이션 컨트롤 -->
      <div class="navigation-controls">
        <q-btn
          :disable="currentSlideIndex === 0"
          @click="goToPreviousSlide"
          color="blue"
          text-color="white"
          icon="chevron_left"
          round
          size="lg"
          class="nav-btn"
        />

        <div class="slide-info">
          <span class="slide-counter"
            >{{ currentSlideNumber }} ({{ currentSlideIndex + 1 }}/{{ totalSlides }})</span
          >
        </div>

        <q-btn
          :disable="currentSlideIndex === totalSlides - 1"
          @click="goToNextSlide"
          color="blue"
          text-color="white"
          icon="chevron_right"
          round
          size="lg"
          class="nav-btn"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SimpleSlideViewer from '../components/SimpleSlideViewer.vue';

// Router 인스턴스
const route = useRoute();
const router = useRouter();

// 반응형 데이터
const currentSlideIndex = ref(0);
const slideFiles = ref<string[]>([]);

// 계산된 속성들
const totalSlides = computed(() => slideFiles.value.length);

const currentSlideNumber = computed(() => {
  const fileName = slideFiles.value[currentSlideIndex.value];
  // slide-0-0.md -> 0-0
  return fileName ? fileName.replace('slide-', '').replace('.md', '') : '0-0';
});

// 메서드들
const goToSlide = (index: number) => {
  if (index >= 0 && index < totalSlides.value) {
    const oldIndex = currentSlideIndex.value;
    currentSlideIndex.value = index;
    updateRoute();

    console.log(`🔄 슬라이드 변경: ${oldIndex} -> ${index} (${currentSlideNumber.value})`);
  }
};

const goToPreviousSlide = () => {
  if (currentSlideIndex.value > 0) {
    goToSlide(currentSlideIndex.value - 1);
  }
};

const goToNextSlide = () => {
  if (currentSlideIndex.value < totalSlides.value - 1) {
    goToSlide(currentSlideIndex.value + 1);
  }
};

// 슬라이드 번호로 직접 이동하는 함수 (새로 추가)
const goToSlideByNumber = (slideNumber: string) => {
  const targetIndex = slideFiles.value.findIndex((file) => {
    const fileNumber = file.replace('slide-', '').replace('.md', '');
    return fileNumber === slideNumber;
  });

  if (targetIndex !== -1) {
    goToSlide(targetIndex);
  } else {
    console.warn(`슬라이드 번호 ${slideNumber}를 찾을 수 없습니다.`);
  }
};

// 현재 슬라이드 번호 가져오기
const getCurrentSlideNumber = () => {
  const fileName = slideFiles.value[currentSlideIndex.value];
  return fileName ? fileName.replace('slide-', '').replace('.md', '') : '0-0';
};

// 다음 슬라이드 번호 가져오기 (연속되지 않아도)
const getNextSlideNumber = () => {
  if (currentSlideIndex.value < totalSlides.value - 1) {
    const nextFileName = slideFiles.value[currentSlideIndex.value + 1];
    return nextFileName ? nextFileName.replace('slide-', '').replace('.md', '') : null;
  }
  return null;
};

// 이전 슬라이드 번호 가져오기 (연속되지 않아도)
const getPreviousSlideNumber = () => {
  if (currentSlideIndex.value > 0) {
    const prevFileName = slideFiles.value[currentSlideIndex.value - 1];
    return prevFileName ? prevFileName.replace('slide-', '').replace('.md', '') : null;
  }
  return null;
};

const updateRoute = () => {
  router.push({
    query: {
      ...route.query,
      slide: currentSlideIndex.value.toString(),
    },
  });
};

// 키보드 이벤트 처리
const handleKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault();
      goToPreviousSlide();
      break;
    case 'ArrowRight':
    case ' ':
      event.preventDefault();
      goToNextSlide();
      break;
    case 'Home':
      event.preventDefault();
      goToSlide(0);
      break;
    case 'End':
      event.preventDefault();
      goToSlide(totalSlides.value - 1);
      break;
  }
};

// 라이프사이클 훅
onMounted(async () => {
  try {
    const response = await fetch('/slides/files.json');
    if (!response.ok) {
      throw new Error('Failed to load slide list.');
    }
    const data = await response.json();
    slideFiles.value = data.files
      .filter((file: string) => /^slide-\d+-\d+\.md$/.test(file)) // 정규식으로 정확한 파일 형식 필터링
      .sort((a: string, b: string) => {
        const [aChapter, aSlide] = a
          .replace('slide-', '')
          .replace('.md', '')
          .split('-')
          .map(Number);
        const [bChapter, bSlide] = b
          .replace('slide-', '')
          .replace('.md', '')
          .split('-')
          .map(Number);
        if (aChapter !== bChapter) {
          return (aChapter || 0) - (bChapter || 0);
        }
        return (aSlide || 0) - (bSlide || 0);
      });

    const slideParam = route.query.slide;
    if (slideParam) {
      const slideIndex = parseInt(slideParam as string);
      if (slideIndex >= 0 && slideIndex < totalSlides.value) {
        currentSlideIndex.value = slideIndex;
      }
    }

    document.addEventListener('keydown', handleKeydown);
    console.log('🚀 SimpleSlidePage 마운트됨, 슬라이드 목록 로드 완료:', slideFiles.value.length);
    console.log('📋 슬라이드 목록:', slideFiles.value.slice(0, 10), '...'); // 처음 10개만 로그
  } catch (error) {
    console.error('슬라이드 목록 로드 실패:', error);
  }
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
.simple-slide-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f7fa;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
}

.slide-viewer-container {
  flex: 1;
  position: relative;
}

.navigation-controls {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 1000;
}

.nav-btn {
  width: 40px;
  height: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.slide-info {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px; /* min-width 대신 고정 width 사용 */
  height: 40px; /* 고정 높이 추가 */
  flex-shrink: 0; /* 크기 고정 */
}

.slide-counter {
  font-size: 1.1em;
  font-weight: bold;
  color: #333;
  text-align: center; /* 텍스트 중앙 정렬 */
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  overflow: hidden; /* 넘치는 텍스트 숨김 */
  text-overflow: ellipsis; /* 넘치는 텍스트에 ... 표시 */
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .navigation-controls {
    bottom: 15px;
    gap: 8px;
  }

  .nav-btn {
    width: 35px;
    height: 35px;
  }

  .slide-info {
    width: 60px; /* 모바일에서 고정 너비 */
    height: 35px; /* 모바일에서 고정 높이 */
  }

  .slide-counter {
    font-size: 0.9em;
  }
}
</style>
