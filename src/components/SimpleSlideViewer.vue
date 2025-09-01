<template>
  <div class="simple-slide-viewer">
    <div v-if="error" class="error">
      <q-icon name="error" size="50px" color="negative" />
      <p>{{ error }}</p>
    </div>
    <div v-else-if="slideType === 'html' && slideContent" class="html-slide-container">
      <iframe
        :src="htmlSlideUrl"
        class="html-slide-iframe"
        @load="onHtmlLoad"
        @error="onIframeError"
      ></iframe>
    </div>
    <div v-else-if="slideUrl" class="slide-iframe-container">
      <iframe
        :src="slideUrl"
        class="slide-iframe"
        @load="onIframeLoad"
        @error="onIframeError"
      ></iframe>
      <!-- 로딩 인디케이터 (선택적) -->
      <div v-if="isLoading" class="loading-overlay">
        <q-spinner-dots size="50px" color="primary" />
        <p>슬라이드 로딩 중...</p>
      </div>
    </div>
    <div v-else class="no-content">
      <q-icon name="slideshow" size="50px" color="grey" />
      <p>표시할 슬라이드가 없습니다.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { slideLog } from 'src/utils/logger';

interface Props {
  slideNumber: string; // e.g., '0-0', '1-2'
  slideType?: string; // 슬라이드 타입 (e.g., 'html', 'cover', 'lecture')
}

const props = defineProps<Props>();

const error = ref('');
const isLoading = ref(false);
const slideContent = ref('');

const slideUrl = computed(() => {
  if (!props.slideNumber) return '';
  // e.g., /src/html/slide-0-0.html
  return `/src/html/slide-${props.slideNumber}.html`;
});

const htmlSlideUrl = computed(() => {
  if (!props.slideNumber) return '';
  // HTML 슬라이드용 URL
  return `/src/html/slide-${props.slideNumber}.html`;
});

// HTML 타입 슬라이드의 경우 iframe으로 직접 로드
const loadHtmlSlideContent = async () => {
  if (props.slideType === 'html') {
    try {
      isLoading.value = true;
      slideLog.log(`🔄 HTML 슬라이드 iframe 로드 시작: ${props.slideNumber}`);

      // iframe이 로드되면 onHtmlLoad에서 로딩 상태 해제
      // 3초 후에도 로딩이 안 되면 로딩 상태 해제
      setTimeout(() => {
        if (isLoading.value) {
          isLoading.value = false;
          slideLog.log('⚠️ HTML 슬라이드 로딩 시간 초과');
        }
      }, 3000);
    } catch (err) {
      error.value = `HTML 슬라이드 ${props.slideNumber} 로딩 중 오류가 발생했습니다.`;
      slideLog.error(`HTML 슬라이드 ${props.slideNumber} 로딩 오류:`, err);
      isLoading.value = false;
    }
  }
};

const onIframeLoad = () => {
  isLoading.value = false;
  slideLog.log(`✅ iframe 로드 완료: ${slideUrl.value}`);
};

const onIframeError = (event: Event) => {
  error.value = `슬라이드 ${props.slideNumber} 로딩 중 오류가 발생했습니다.`;
  slideLog.error(`슬라이드 ${props.slideNumber} 로딩 중 오류 발생:`, event);
  isLoading.value = false;
};

const onHtmlLoad = () => {
  isLoading.value = false;
  slideLog.log(`✅ HTML 슬라이드 iframe 로드 완료: ${props.slideNumber}`);
};

watch(
  () => props.slideNumber,
  (newSlideNumber, oldSlideNumber) => {
    if (newSlideNumber) {
      isLoading.value = true;
      error.value = '';

      if (props.slideType === 'html') {
        // HTML 타입인 경우 iframe으로 직접 로드
        slideLog.log(`🔄 HTML 슬라이드 변경: ${oldSlideNumber} -> ${newSlideNumber}`);
        loadHtmlSlideContent();
      } else {
        // iframe 슬라이드인 경우
        slideLog.log(`🔄 iframe URL 변경: ${slideUrl.value}`);

        // 3초 후에도 로딩이 안 되면 로딩 상태 해제
        setTimeout(() => {
          if (isLoading.value) {
            isLoading.value = false;
            slideLog.log('⚠️ 슬라이드 로딩 시간 초과');
          }
        }, 3000);
      }
    }
  },
  { immediate: true },
);

// slideType 변경도 감지
watch(
  () => props.slideType,
  (newSlideType, oldSlideType) => {
    if (newSlideType !== oldSlideType && props.slideNumber) {
      slideLog.log(`🔄 슬라이드 타입 변경: ${oldSlideType} -> ${newSlideType}`);
      isLoading.value = true;
      error.value = '';

      if (newSlideType === 'html') {
        loadHtmlSlideContent();
      }
    }
  },
);
</script>

<style scoped>
.simple-slide-viewer {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: #fff;
}

.slide-iframe-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.slide-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.html-slide-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: white;
}

.html-slide-iframe {
  width: 100%;
  height: 100%;
  border: none;
  background: white;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.loading-overlay p {
  margin-top: 10px;
  color: #666;
  font-size: 14px;
}

.error,
.no-content {
  text-align: center;
  padding: 20px;
}

/* Quiz 옵션 스타일 */
:deep(.quiz-option) {
  cursor: pointer;
  padding: 12px 16px;
  margin: 8px 0;
  border: 2px solid transparent;
  border-radius: 8px;
  transition: all 0.2s ease;
  background-color: #f8f9fa;
}

:deep(.quiz-option:hover) {
  background-color: rgba(59, 130, 246, 0.1);
  border-color: #3b82f6;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
}

:deep(.quiz-option.selected) {
  background-color: rgba(59, 130, 246, 0.15);
  border-color: #3b82f6;
  color: #1e40af;
  font-weight: 600;
}

:deep(.quiz-answer) {
  margin-top: 20px;
  padding: 16px;
  background-color: #f0f9ff;
  border: 1px solid #0ea5e9;
  border-radius: 8px;
  color: #0c4a6e;
}
</style>
