<template>
  <q-page class="simple-slide-page">
    <!-- 메인 콘텐츠 -->
    <div class="main-content">
      <!-- 슬라이드 뷰어 영역 -->
      <div class="slide-viewer-container">
        <SimpleSlideViewer :slide-number="currentSlideNumber" :slide-type="currentSlideType" />
      </div>

      <!-- 네비게이션 컨트롤 -->
      <div class="navigation-controls">
        <q-btn
          :disable="currentSlideIndex === 0"
          @click="goToPreviousSlide"
          color="primary"
          icon="chevron_left"
          round
          size="lg"
          class="nav-btn"
        />

        <div class="slide-info">
          <span class="slide-counter">{{ currentSlideIndex + 1 }} / {{ totalSlides }}</span>
        </div>

        <q-btn
          :disable="currentSlideIndex === totalSlides - 1"
          @click="goToNextSlide"
          color="primary"
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
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SimpleSlideViewer from '../components/SimpleSlideViewer.vue';

// Router 인스턴스
const route = useRoute();
const router = useRouter();

// 반응형 데이터
const currentSlideIndex = ref(0);

// 사전 변환된 HTML 파일 목록 (정적)
const slideFiles = ref([
  'slide-0-0.html',
  'slide-0-1.html',
  'slide-0-2.html',
  'slide-0-3.html',
  'slide-0-4.html',
  'slide-0-5.html',
  'slide-0-6.html',
  'slide-1-0.html',
  'slide-1-1.html',
  'slide-1-2.html',
  'slide-1-3.html',
  'slide-1-4.html',
  'slide-1-5.html',
  'slide-1-6.html',
  'slide-1-7.html',
  'slide-1-8.html',
  'slide-1-9.html',
  'slide-1-10.html',
  'slide-1-11.html',
  'slide-1-12.html',
  'slide-1-13.html',
  'slide-1-14.html',
  'slide-2-0.html',
  'slide-2-1.html',
  'slide-2-2.html',
  'slide-2-3.html',
  'slide-2-4.html',
  'slide-2-5.html',
  'slide-2-6.html',
  'slide-2-7.html',
  'slide-2-8.html',
  'slide-2-9.html',
  'slide-2-10.html',
  'slide-2-11.html',
  'slide-2-12.html',
  'slide-2-13.html',
  'slide-3-0.html',
  'slide-3-1.html',
  'slide-3-2.html',
  'slide-3-3.html',
  'slide-3-4.html',
  'slide-3-5.html',
  'slide-3-6.html',
  'slide-3-7.html',
  'slide-3-8.html',
  'slide-4-0.html',
  'slide-4-1.html',
  'slide-4-2.html',
  'slide-4-3.html',
  'slide-5-0.html',
  'slide-5-1.html',
  'slide-6-0.html',
  'slide-6-1.html',
  'slide-6-2.html',
  'slide-6-3.html',
  'slide-6-4.html',
  'slide-6-5.html',
  'slide-6-6.html',
  'slide-6-7.html',
  'slide-7-0.html',
  'slide-7-1.html',
  'slide-7-2.html',
  'slide-7-3.html',
  'slide-7-4.html',
  'slide-7-5.html',
  'slide-7-6.html',
  'slide-7-7.html',
  'slide-7-8.html',
  'slide-7-9.html',
  'slide-7-10.html',
  'slide-7-11.html',
  'slide-7-12.html',
  'slide-7-13.html',
  'slide-7-14.html',
  'slide-7-15.html',
  'slide-8-0.html',
  'slide-8-1.html',
  'slide-8-2.html',
  'slide-8-3.html',
  'slide-8-4.html',
  'slide-8-5.html',
  'slide-8-6.html',
  'slide-8-7.html',
]);

// 계산된 속성들
const totalSlides = computed(() => slideFiles.value.length);

const currentSlideNumber = computed(() => {
  const fileName = slideFiles.value[currentSlideIndex.value];
  // slide-0-0.html -> 0-0
  return fileName ? fileName.replace('slide-', '').replace('.html', '') : '0-0';
});

const currentSlideType = computed(() => {
  // 슬라이드 번호를 기반으로 타입 추정
  const slideNum = currentSlideNumber.value;
  if (slideNum === '0-0') return 'cover';
  if (slideNum === '0-1') return 'index';
  if (slideNum === '0-2') return 'profile';
  if (slideNum.endsWith('-0')) return 'chapter';
  if (slideNum.startsWith('2-') && slideNum !== '2-0') return 'example';
  if (slideNum.startsWith('3-') && slideNum !== '3-0') return 'challenge';
  return 'lecture';
});

// 메서드들
const goToSlide = (index: number) => {
  if (index >= 0 && index < totalSlides.value) {
    currentSlideIndex.value = index;
    updateRoute();
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
onMounted(() => {
  // URL 파라미터에서 초기 슬라이드 인덱스 설정
  const slideParam = route.query.slide;
  if (slideParam) {
    const slideIndex = parseInt(slideParam as string);
    if (slideIndex >= 0 && slideIndex < totalSlides.value) {
      currentSlideIndex.value = slideIndex;
    }
  }

  document.addEventListener('keydown', handleKeydown);
  console.log('🚀 SimpleSlidePage 마운트됨');
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
  min-width: 80px;
}

.slide-counter {
  font-size: 1.1em;
  font-weight: bold;
  color: #333;
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

  .slide-counter {
    font-size: 0.9em;
  }
}
</style>
