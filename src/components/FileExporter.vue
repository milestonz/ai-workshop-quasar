<template>
  <div class="file-exporter">
    <div class="exporter-header">
      <h6 class="q-my-none">파일 내보내기</h6>
      <div class="exporter-controls">
        <q-btn
          flat
          dense
          size="sm"
          icon="download"
          label="모두 내보내기"
          @click="exportAllFiles"
          :loading="isExporting"
        />
      </div>
    </div>

    <div class="exporter-content">
      <div class="export-options">
        <div class="option-item">
          <q-checkbox v-model="exportOptions.markdown" label="Markdown 파일" />
          <span class="text-caption text-grey-6">슬라이드 내용을 .md 파일로 저장</span>
        </div>

        <div class="option-item">
          <q-checkbox v-model="exportOptions.css" label="CSS 파일" />
          <span class="text-caption text-grey-6">스타일을 .css 파일로 저장</span>
        </div>

        <div class="option-item">
          <q-checkbox v-model="exportOptions.html" label="HTML 파일" />
          <span class="text-caption text-grey-6">렌더링된 슬라이드를 .html 파일로 저장</span>
        </div>
      </div>

      <div class="file-info">
        <div class="info-item">
          <span class="text-caption">현재 슬라이드:</span>
          <span class="text-weight-medium">{{ currentSlideInfo }}</span>
        </div>
        <div class="info-item">
          <span class="text-caption">파일명:</span>
          <span class="text-weight-medium">{{ fileName }}</span>
        </div>
      </div>

      <div class="export-buttons">
        <q-btn
          flat
          dense
          size="sm"
          icon="description"
          label="MD 저장"
          @click="exportMarkdown"
          :disable="!exportOptions.markdown"
        />
        <q-btn
          flat
          dense
          size="sm"
          icon="style"
          label="CSS 저장"
          @click="exportCSS"
          :disable="!exportOptions.css"
        />
        <q-btn
          flat
          dense
          size="sm"
          icon="code"
          label="HTML 저장"
          @click="exportHTML"
          :disable="!exportOptions.html"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Props {
  markdownContent: string;
  cssContent: string;
  htmlContent: string;
  currentLesson: number;
  currentSlide: number;
  lessonTitle: string;
  slideType?: string;
}

interface Emits {
  (e: 'export-success', type: string, filename: string): void;
  (e: 'export-error', type: string, error: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const isExporting = ref(false);
const exportOptions = ref({
  markdown: true,
  css: true,
  html: true,
});

// 현재 슬라이드 정보
const currentSlideInfo = computed(() => {
  if (props.slideType === 'chapter') {
    return `${props.lessonTitle} - Chapter`;
  } else {
    return `${props.lessonTitle} - 슬라이드 ${props.currentSlide + 1}`;
  }
});

// 파일명 생성
const fileName = computed(() => {
  if (props.slideType === 'chapter') {
    const lessonNum = props.currentLesson;
    return `chapter-${lessonNum}`;
  } else {
    const lessonNum = props.currentLesson + 1;
    const slideNum = props.currentSlide + 1;
    return `lesson-${lessonNum}-slide-${slideNum}`;
  }
});

// 파일 다운로드 함수
const downloadFile = (content: string, filename: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Markdown 파일 내보내기
const exportMarkdown = async () => {
  if (!props.markdownContent.trim()) {
    emit('export-error', 'markdown', '내용이 없습니다.');
    return;
  }

  try {
    isExporting.value = true;
    const filename = `${fileName.value}.md`;
    downloadFile(props.markdownContent, filename, 'text/markdown');
    emit('export-success', 'markdown', filename);
  } catch (error) {
    emit('export-error', 'markdown', error as string);
  } finally {
    isExporting.value = false;
  }
};

// CSS 파일 내보내기
const exportCSS = async () => {
  if (!props.cssContent.trim()) {
    emit('export-error', 'css', 'CSS 내용이 없습니다.');
    return;
  }

  try {
    isExporting.value = true;
    const filename = `${fileName.value}.css`;
    downloadFile(props.cssContent, filename, 'text/css');
    emit('export-success', 'css', filename);
  } catch (error) {
    emit('export-error', 'css', error as string);
  } finally {
    isExporting.value = false;
  }
};

// HTML 파일 내보내기
const exportHTML = async () => {
  if (!props.htmlContent.trim()) {
    emit('export-error', 'html', 'HTML 내용이 없습니다.');
    return;
  }

  try {
    isExporting.value = true;
    const filename = `${fileName.value}.html`;

    // 완전한 HTML 문서 생성
    const fullHTML = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${currentSlideInfo.value}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 2rem;
            background: #f8f9fa;
        }
        .slide-content {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        ${props.cssContent}
    </style>
</head>
<body>
    <div class="slide-content">
        ${props.htmlContent}
    </div>
</body>
</html>`;

    downloadFile(fullHTML, filename, 'text/html');
    emit('export-success', 'html', filename);
  } catch (error) {
    emit('export-error', 'html', error as string);
  } finally {
    isExporting.value = false;
  }
};

// 모든 파일 내보내기
const exportAllFiles = async () => {
  isExporting.value = true;

  try {
    const promises = [];

    if (exportOptions.value.markdown && props.markdownContent.trim()) {
      promises.push(exportMarkdown());
    }

    if (exportOptions.value.css && props.cssContent.trim()) {
      promises.push(exportCSS());
    }

    if (exportOptions.value.html && props.htmlContent.trim()) {
      promises.push(exportHTML());
    }

    await Promise.all(promises);
    emit('export-success', 'all', '모든 파일이 내보내기되었습니다.');
  } catch (error) {
    emit('export-error', 'all', error as string);
  } finally {
    isExporting.value = false;
  }
};
</script>

<style scoped>
.file-exporter {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.exporter-header {
  background: #f5f5f5;
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.exporter-controls {
  display: flex;
  gap: 8px;
}

.exporter-content {
  background: white;
  padding: 16px;
}

.export-options {
  margin-bottom: 16px;
}

.option-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
}

.option-item .text-caption {
  margin-left: 28px;
  margin-top: 2px;
}

.file-info {
  background: #f8f9fa;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 16px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.info-item:last-child {
  margin-bottom: 0;
}

.export-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
</style>
