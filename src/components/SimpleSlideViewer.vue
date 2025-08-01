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
    // 마크다운 파일 직접 로드
    const mdPath = `/slides/slide-${slideNumber}.md`;
    console.log(`📂 SimpleSlideViewer - 마크다운 파일 로드: ${mdPath}`);

    const response = await fetch(mdPath);
    
    if (!response.ok) {
      throw new Error(`슬라이드 파일을 찾을 수 없습니다: slide-${slideNumber}.md`);
    }

    const markdown = await response.text();
    console.log(`📄 SimpleSlideViewer - 마크다운 파일 크기: ${markdown.length} bytes`);

    // 마크다운을 HTML로 변환
    const html = convertMarkdownToHTML(markdown);
    htmlContent.value = html;

    await nextTick();
    if (slideContentRef.value) {
      slideContentRef.value.innerHTML = html;
    }

    console.log(`✅ SimpleSlideViewer - 마크다운 변환 완료: ${slideNumber}`);
  } catch (err) {
    console.error(`❌ SimpleSlideViewer - 슬라이드 로드 실패: ${slideNumber}`, err);
    error.value = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
  }
};

// 마크다운을 HTML로 변환하는 함수
const convertMarkdownToHTML = (markdown: string): string => {
  // 간단한 마크다운 변환
  let html = markdown
    // 제목
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
    
    // 굵은 글씨
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.+?)__/g, '<strong>$1</strong>')
    
    // 기울임꼴
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/_(.+?)_/g, '<em>$1</em>')
    
    // 코드
    .replace(/`(.+?)`/g, '<code>$1</code>')
    
    // 링크
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
    
    // 줄바꿈
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');

  // 단락 태그 추가
  html = `<p>${html}</p>`;
  
  return html;
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
