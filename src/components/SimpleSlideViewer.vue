<template>
  <div class="simple-slide-viewer">
    <div v-if="error" class="error">
      <q-icon name="error" size="50px" color="negative" />
      <p>{{ error }}</p>
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
}

const props = defineProps<Props>();

const error = ref('');
const isLoading = ref(false);

const slideUrl = computed(() => {
  if (!props.slideNumber) return '';
  // e.g., /generated/slides/slide-0-0.html
  return `/generated/slides/slide-${props.slideNumber}.html`;
});

const onIframeLoad = () => {
  isLoading.value = false;
  slideLog.log(`✅ iframe 로드 완료: ${slideUrl.value}`);
};

const onIframeError = (event: Event) => {
  error.value = '슬라이드 로딩 중 오류가 발생했습니다.';
  slideLog.error('슬라이드 로딩 중 오류 발생:', event);
  isLoading.value = false;
};

watch(() => props.slideNumber, (newSlideNumber) => {
  if (newSlideNumber) {
    isLoading.value = true;
    error.value = '';
    slideLog.log(`🔄 iframe URL 변경: ${slideUrl.value}`);
    
    // 3초 후에도 로딩이 안 되면 로딩 상태 해제
    setTimeout(() => {
      if (isLoading.value) {
        isLoading.value = false;
        slideLog.log('⚠️ 슬라이드 로딩 시간 초과');
      }
    }, 3000);
  }
}, { immediate: true });

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
</style>
