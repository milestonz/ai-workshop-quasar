<template>
  <div class="slide-wrapper">
    <!-- 로딩 상태 -->
    <div v-if="loading" class="loading-container">
      <q-spinner-dots size="40px" color="primary" />
      <div class="loading-text">슬라이드 로딩 중...</div>
    </div>

    <!-- 슬라이드 프레임 -->
    <div v-else class="slide-container">
      <iframe
        :src="currentSlideUrl"
        @load="onSlideLoad"
        @error="onSlideError"
        class="slide-frame"
        :class="{ loading: iframeLoading }"
        frameborder="0"
        allowfullscreen
      ></iframe>

      <!-- 슬라이드 정보 오버레이 -->
      <div class="slide-info">
        <div class="slide-title">{{ currentSlide?.title }}</div>
        <div class="slide-progress">{{ currentIndex + 1 }} / {{ totalSlides }}</div>
      </div>
    </div>

    <!-- 네비게이션 -->
    <nav class="slide-nav">
      <q-btn
        @click="prevSlide"
        :disable="currentIndex === 0"
        icon="chevron_left"
        flat
        round
        color="primary"
        size="lg"
      />

      <div class="nav-info">
        <div class="chapter-info">Chapter {{ currentSlide?.chapter || 0 }}</div>
        <div class="slide-counter">{{ currentIndex + 1 }} / {{ totalSlides }}</div>
      </div>

      <q-btn
        @click="nextSlide"
        :disable="currentIndex >= totalSlides - 1"
        icon="chevron_right"
        flat
        round
        color="primary"
        size="lg"
      />
    </nav>

    <!-- 키보드 단축키 안내 -->
    <div class="keyboard-hint">
      <q-icon name="keyboard" size="sm" />
      <span>← → 키로 슬라이드 이동</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { serviceWorkerManager, preloadImportantSlides } from 'src/utils/serviceWorker';

// Props
interface Props {
  initialSlideId?: string;
  autoPlay?: boolean;
  showNavigation?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  initialSlideId: '',
  autoPlay: false,
  showNavigation: true,
});

// Emits
const emit = defineEmits<{
  slideChange: [slideId: string, index: number];
  slideLoad: [slideId: string];
  slideError: [error: Error];
}>();

// Reactive state
const currentIndex = ref(0);
const loading = ref(false);
const iframeLoading = ref(false);
const slideIndex = ref<any>(null);

// Router
const route = useRoute();
const router = useRouter();

// Computed
const currentSlide = computed(() => {
  if (!slideIndex.value?.slides) return null;
  return slideIndex.value.slides[currentIndex.value];
});

const currentSlideUrl = computed(() => {
  if (!currentSlide.value) return '';
  return currentSlide.value.htmlPath;
});

const totalSlides = computed(() => {
  return slideIndex.value?.slides?.length || 0;
});

// Methods
const loadSlideIndex = async () => {
  try {
    loading.value = true;
    const response = await fetch('/data/slideIndex.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    slideIndex.value = await response.json();

    // 프리로딩 전략 로드 및 적용
    await loadPreloadStrategy();

    // 초기 슬라이드 설정
    if (props.initialSlideId) {
      const foundIndex = slideIndex.value.slides.findIndex(
        (slide: any) => slide.id === props.initialSlideId,
      );
      if (foundIndex !== -1) {
        currentIndex.value = foundIndex;
      }
    } else if (route.params.id) {
      // URL 파라미터에서 슬라이드 ID 추출
      const slideId = `slide-${route.params.id}`;
      const foundIndex = slideIndex.value.slides.findIndex((slide: any) => slide.id === slideId);
      if (foundIndex !== -1) {
        currentIndex.value = foundIndex;
      }
    }
  } catch (error) {
    console.error('슬라이드 인덱스 로드 실패:', error);
    emit('slideError', error as Error);
  } finally {
    loading.value = false;
  }
};

// 프리로딩 전략 로드
const loadPreloadStrategy = async () => {
  try {
    // Service Worker를 통한 프리로딩
    if (serviceWorkerManager.isServiceWorkerSupported()) {
      await preloadImportantSlides();
    } else {
      // Service Worker 미지원 시 기존 방식 사용
      const response = await fetch('/data/slidePreload.json');
      if (response.ok) {
        const preloadData = await response.json();
        preloadSlidesFallback(preloadData);
      }
    }
  } catch (error) {
    console.warn('프리로딩 전략 로드 실패:', error);
  }
};

// Service Worker 미지원 시 폴백 프리로딩
const preloadSlidesFallback = (preloadData: any) => {
  const importantSlides: any[] = [];

  preloadData.chapters.forEach((chapter: any) => {
    chapter.slides.forEach((slide: any) => {
      if (slide.preload && slide.priority === 'high') {
        importantSlides.push(slide);
      }
    });
  });

  // 기존 link prefetch 방식
  importantSlides.forEach((slide: any) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = slide.htmlPath;
    document.head.appendChild(link);
  });

  console.log(`🚀 ${importantSlides.length}개 중요 슬라이드 프리로딩 시작 (폴백)`);
};

const nextSlide = () => {
  if (currentIndex.value < totalSlides.value - 1) {
    iframeLoading.value = true;
    currentIndex.value++;
    updateUrl();
    emit('slideChange', currentSlide.value?.id || '', currentIndex.value);
  }
};

const prevSlide = () => {
  if (currentIndex.value > 0) {
    iframeLoading.value = true;
    currentIndex.value--;
    updateUrl();
    emit('slideChange', currentSlide.value?.id || '', currentIndex.value);
  }
};

const goToSlide = (index: number) => {
  if (index >= 0 && index < totalSlides.value) {
    iframeLoading.value = true;
    currentIndex.value = index;
    updateUrl();
    emit('slideChange', currentSlide.value?.id || '', currentIndex.value);
  }
};

const updateUrl = () => {
  if (currentSlide.value) {
    const slideId = currentSlide.value.id.replace('slide-', '');
    router.replace({ params: { id: slideId } });
  }
};

const onSlideLoad = () => {
  iframeLoading.value = false;
  if (currentSlide.value) {
    emit('slideLoad', currentSlide.value.id);
  }
};

const onSlideError = (error: Event) => {
  iframeLoading.value = false;
  console.error('슬라이드 로드 오류:', error);
  emit('slideError', new Error('슬라이드 로드 실패'));
};

// 키보드 이벤트 핸들러
const handleKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault();
      prevSlide();
      break;
    case 'ArrowRight':
      event.preventDefault();
      nextSlide();
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

// Lifecycle
onMounted(() => {
  loadSlideIndex();
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
});

// Watch for route changes
watch(
  () => route.params.id,
  (newId) => {
    if (newId && slideIndex.value) {
      const slideId = `slide-${newId}`;
      const foundIndex = slideIndex.value.slides.findIndex((slide: any) => slide.id === slideId);
      if (foundIndex !== -1 && foundIndex !== currentIndex.value) {
        iframeLoading.value = true;
        currentIndex.value = foundIndex;
      }
    }
  },
);

// Expose methods for parent components
defineExpose({
  nextSlide,
  prevSlide,
  goToSlide,
  currentIndex: computed(() => currentIndex.value),
  totalSlides,
  currentSlide,
});
</script>

<style scoped>
.slide-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f5f5f5;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 16px;
}

.loading-text {
  font-size: 16px;
  color: #666;
}

.slide-container {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
}

.slide-frame {
  flex: 1;
  width: 100%;
  border: none;
  background: white;
  transition: opacity 0.3s ease;
}

.slide-frame.loading {
  opacity: 0.7;
}

.slide-info {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.slide-title {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
}

.slide-progress {
  font-size: 12px;
  opacity: 0.8;
}

.slide-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: white;
  border-top: 1px solid #e0e0e0;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
}

.nav-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.chapter-info {
  font-size: 12px;
  color: #666;
  font-weight: 500;
}

.slide-counter {
  font-size: 16px;
  font-weight: 600;
  color: #1976d2;
}

.keyboard-hint {
  position: absolute;
  bottom: 80px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 12px;
  backdrop-filter: blur(10px);
  opacity: 0.8;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .slide-info {
    top: 10px;
    left: 10px;
    padding: 6px 12px;
  }

  .slide-title {
    font-size: 12px;
  }

  .slide-progress {
    font-size: 10px;
  }

  .slide-nav {
    padding: 12px 16px;
  }

  .keyboard-hint {
    bottom: 70px;
    right: 10px;
    padding: 6px 10px;
    font-size: 11px;
  }
}

/* 다크 모드 지원 */
@media (prefers-color-scheme: dark) {
  .slide-wrapper {
    background: #121212;
  }

  .slide-frame {
    background: #1e1e1e;
  }

  .slide-nav {
    background: #1e1e1e;
    border-top-color: #333;
  }
}
</style>
