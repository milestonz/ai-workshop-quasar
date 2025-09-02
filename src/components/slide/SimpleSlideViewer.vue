<template>
  <div class="simple-slide-viewer">
    <!-- 로딩 상태 -->
    <div v-if="loading" class="loading-container">
      <q-spinner-dots size="40px" color="primary" />
      <div class="loading-text">슬라이드 로딩 중...</div>
    </div>

    <!-- 에러 상태 -->
    <div v-else-if="error" class="error">
      <q-icon name="error" size="50px" color="negative" />
      <p>{{ error }}</p>
      <q-btn @click="retryLoad" color="primary" outline> 다시 시도 </q-btn>
    </div>

    <!-- 슬라이드 컨테이너 -->
    <div v-else-if="currentSlide" class="slide-container">
      <iframe
        :src="currentSlide.htmlPath"
        class="slide-iframe"
        @load="onSlideLoad"
        @error="onSlideError"
        frameborder="0"
        allowfullscreen
      ></iframe>

      <!-- 슬라이드 정보 -->
      <div class="slide-info">
        <div class="slide-title">{{ currentSlide.title }}</div>
        <div class="slide-meta">
          Chapter {{ currentSlide.chapter }} - Section {{ currentSlide.section }}
        </div>
      </div>
    </div>

    <!-- 슬라이드 없음 -->
    <div v-else class="no-content">
      <q-icon name="slideshow" size="50px" color="grey" />
      <p>표시할 슬라이드가 없습니다.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
import { slideLog } from 'src/utils/logger';

interface Props {
  slideId?: string; // e.g., 'slide-0-0', 'slide-1-2'
  slideNumber?: string; // e.g., '0-0', '1-2' (하위 호환성)
  slideType?: string; // 슬라이드 타입 (하위 호환성)
}

const props = defineProps<Props>();

// Emits
const emit = defineEmits<{
  slideLoad: [slideId: string];
  slideError: [error: Error];
}>();

// Reactive state
const error = ref('');
const loading = ref(false);
const slideIndex = ref<any>(null);
const currentSlide = ref<any>(null);

// Methods
const loadSlideIndex = async () => {
  try {
    loading.value = true;
    error.value = '';

    const response = await fetch('/data/slideIndex.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    slideIndex.value = await response.json();
    slideLog.log('슬라이드 인덱스 로드 완료:', slideIndex.value.totalSlides, '개 슬라이드');

    // 현재 슬라이드 찾기
    findCurrentSlide();
  } catch (err) {
    const errorMessage = `슬라이드 인덱스 로드 실패: ${err}`;
    error.value = errorMessage;
    slideLog.error(errorMessage);
    emit('slideError', err as Error);
  } finally {
    loading.value = false;
  }
};

const findCurrentSlide = () => {
  if (!slideIndex.value?.slides) return;

  let targetSlide = null;

  // slideId가 있으면 그것을 사용
  if (props.slideId) {
    targetSlide = slideIndex.value.slides.find((slide: any) => slide.id === props.slideId);
  }
  // slideNumber가 있으면 그것을 사용 (하위 호환성)
  else if (props.slideNumber) {
    const slideId = `slide-${props.slideNumber}`;
    targetSlide = slideIndex.value.slides.find((slide: any) => slide.id === slideId);
  }

  if (targetSlide) {
    currentSlide.value = targetSlide;
    slideLog.log('현재 슬라이드 설정:', targetSlide.id, targetSlide.title);
  } else {
    error.value = '슬라이드를 찾을 수 없습니다.';
    slideLog.warn('슬라이드를 찾을 수 없음:', props.slideId || props.slideNumber);
  }
};

const retryLoad = () => {
  loadSlideIndex();
};

const onSlideLoad = () => {
  if (currentSlide.value) {
    slideLog.log('슬라이드 로드 완료:', currentSlide.value.id);
    emit('slideLoad', currentSlide.value.id);
  }
};

const onSlideError = (event: Event) => {
  const errorMessage = `슬라이드 로드 실패: ${currentSlide.value?.id || 'unknown'}`;
  error.value = errorMessage;
  slideLog.error(errorMessage, event);
  emit('slideError', new Error(errorMessage));
};

// Lifecycle
onMounted(() => {
  loadSlideIndex();
});

// Watchers
watch(
  () => props.slideId,
  () => {
    if (slideIndex.value) {
      findCurrentSlide();
    }
  },
);

watch(
  () => props.slideNumber,
  () => {
    if (slideIndex.value) {
      findCurrentSlide();
    }
  },
);

// Expose for parent components
defineExpose({
  currentSlide: computed(() => currentSlide.value),
  retryLoad,
});
</script>

<style scoped>
.simple-slide-viewer {
  display: flex;
  flex-direction: column;
  height: 100%;
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

.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 16px;
  text-align: center;
  padding: 20px;
}

.error p {
  margin: 0;
  color: #d32f2f;
  font-size: 16px;
}

.slide-container {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
}

.slide-iframe {
  flex: 1;
  width: 100%;
  border: none;
  background: white;
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
  max-width: 300px;
}

.slide-title {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
  line-height: 1.3;
}

.slide-meta {
  font-size: 12px;
  opacity: 0.8;
}

.no-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 16px;
  text-align: center;
  padding: 20px;
}

.no-content p {
  margin: 0;
  color: #666;
  font-size: 16px;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .slide-info {
    top: 10px;
    left: 10px;
    padding: 6px 12px;
    max-width: 250px;
  }

  .slide-title {
    font-size: 12px;
  }

  .slide-meta {
    font-size: 10px;
  }
}

/* 다크 모드 지원 */
@media (prefers-color-scheme: dark) {
  .simple-slide-viewer {
    background: #121212;
  }

  .slide-iframe {
    background: #1e1e1e;
  }
}
</style>
