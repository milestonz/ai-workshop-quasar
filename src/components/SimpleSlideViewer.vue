<template>
  <div class="simple-slide-viewer" @click="handleViewerClick">
    <div v-if="error" class="error">
      <q-icon name="error" size="50px" color="negative" />
      <p>{{ error }}</p>
    </div>

    <div v-else-if="htmlContent" ref="slideContentRef" class="slide-content"></div>

    <div v-else class="no-content">
      <q-icon name="slideshow" size="50px" color="grey" />
      <p>표시할 슬라이드가 없습니다.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue';
import { useQuasar } from 'quasar';

interface Props {
  slideNumber: string;
  slideType?: string;
}

const props = defineProps<Props>();
const $q = useQuasar();

const error = ref('');
const htmlContent = ref('');
const slideContentRef = ref<HTMLElement>();

const loadSlideHTML = async (slideNumber: string) => {
  console.log(`🔄 SimpleSlideViewer - 슬라이드 로드 시작: ${slideNumber}`);
  error.value = '';
  htmlContent.value = '';

  try {
    const htmlPath = `/generated/slides/slide-${slideNumber}.html`;
    console.log(`📂 SimpleSlideViewer - 요청 경로: ${htmlPath}`);

    const response = await fetch(htmlPath);

    if (!response.ok) {
      throw new Error(`슬라이드 파일을 찾을 수 없습니다: slide-${slideNumber}.html`);
    }

    const html = await response.text();
    console.log(`📄 SimpleSlideViewer - HTML 파일 크기: ${html.length} bytes`);

    const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
    const styleContent = styleMatch?.[1] || '';

    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    const bodyContent = bodyMatch?.[1] || html;

    const fullContent = `<style>${styleContent}</style>${bodyContent}`;

    htmlContent.value = fullContent;

    await nextTick();

    if (slideContentRef.value) {
      slideContentRef.value.innerHTML = fullContent;
    }

    console.log(`✅ SimpleSlideViewer - 슬라이드 로드 완료: ${slideNumber}`);
  } catch (err) {
    console.error(`❌ SimpleSlideViewer - 슬라이드 로드 실패: ${slideNumber}`, err);
    error.value = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
  }
};

const handleViewerClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (target.classList.contains('copy-button')) {
    const codeBlockWrapper = target.closest('.code-block-wrapper');
    if (codeBlockWrapper) {
      const codeElement = codeBlockWrapper.querySelector('code');
      if (codeElement) {
        copyToClipboard(codeElement.innerText, target);
      }
    }
  }
};

const copyToClipboard = async (text: string, button: HTMLElement) => {
  try {
    await navigator.clipboard.writeText(text);
    const originalText = button.innerText;
    button.innerText = '복사됨!';
    button.classList.add('copied');
    $q.notify({
      message: '코드가 클립보드에 복사되었습니다.',
      color: 'positive',
      position: 'top',
      timeout: 2000,
    });
    setTimeout(() => {
      button.innerText = originalText;
      button.classList.remove('copied');
    }, 2000);
  } catch (err) {
    console.error('클립보드 복사 실패:', err);
    $q.notify({
      message: '코드 복사에 실패했습니다.',
      color: 'negative',
      position: 'top',
      timeout: 2000,
    });
  }
};

watch(
  () => props.slideNumber,
  (newSlideNumber) => {
    if (newSlideNumber) {
      loadSlideHTML(newSlideNumber);
    }
  },
  { immediate: true },
);

onMounted(() => {
  if (props.slideNumber) {
    loadSlideHTML(props.slideNumber);
  }
});
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
}

.error,
.no-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 40px;
  text-align: center;
}

.error p,
.no-content p {
  font-size: 1.2em;
  color: #666;
  margin: 0;
}

.error p {
  color: #d32f2f;
}

.slide-content {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slide-content :deep(body) {
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  height: 100% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  overflow: hidden !important;
}

.slide-content :deep(.slide-container) {
  max-width: 90% !important;
  max-height: 90% !important;
  width: auto !important;
  height: auto !important;
  margin: 0 !important;
}

.slide-content :deep(.cover-slide) {
  width: 100% !important;
  height: 100% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  margin: 0 !important;
  padding: 0 !important;
}

@media (max-width: 768px) {
  .slide-content :deep(.slide-container) {
    max-width: 95% !important;
    max-height: 95% !important;
    padding: 20px !important;
  }
}

@media (max-width: 480px) {
  .slide-content :deep(.slide-container) {
    max-width: 98% !important;
    max-height: 98% !important;
    padding: 15px !important;
  }
}
</style>
