<template>
  <q-card class="sidebar-card q-mt-md">
    <q-card-section>
      <h6 class="q-my-none">
        {{ currentSlideType === 'chapter' ? 'Chapter 파일 내보내기' : '슬라이드 파일 내보내기' }}
      </h6>
      <div class="text-caption text-grey-6 q-mt-xs">
        {{
          currentSlideType === 'chapter'
            ? 'Chapter MD, CSS, HTML 파일을 다운로드하세요'
            : '슬라이드 MD, CSS, HTML 파일을 다운로드하세요'
        }}
      </div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <FileExporter
        :markdown-content="markdownContent"
        :css-content="cssContent || ''"
        :html-content="htmlContent"
        :current-lesson="currentLesson"
        :current-slide="currentSlide"
        :lesson-title="lessonTitle"
        :slide-type="currentSlideType"
        @export-success="handleExportSuccess"
        @export-error="handleExportError"
        ref="fileExporter"
      />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FileExporter from './FileExporter.vue';

interface Props {
  currentSlideType: string;
  markdownContent: string;
  cssContent?: string;
  htmlContent: string;
  currentLesson: number;
  currentSlide: number;
  lessonTitle: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  exportSuccess: [message: string];
  exportError: [error: string];
}>();

const fileExporter = ref();

// 내보내기 성공
const handleExportSuccess = (message: string) => {
  emit('exportSuccess', message);
};

// 내보내기 오류
const handleExportError = (error: string) => {
  emit('exportError', error);
};

// 파일 내보내기 ref 노출
defineExpose({
  fileExporter,
});
</script>
