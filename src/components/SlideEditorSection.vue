<template>
  <q-card class="sidebar-card q-mt-md">
    <q-card-section>
      <h6 class="q-my-none">
        {{ currentSlideType === 'chapter' ? 'Chapter 편집기' : '슬라이드 편집기' }}
      </h6>
      <div class="text-caption text-grey-6 q-mt-xs">
        {{
          currentSlideType === 'chapter'
            ? 'Chapter 내용을 편집하세요'
            : '슬라이드 내용을 편집하세요'
        }}
      </div>
    </q-card-section>

    <!-- 현재 슬라이드 정보 -->
    <q-card-section class="q-pt-none current-slide-info-section">
      <div class="row items-center justify-between q-mb-sm">
        <div class="col">
          <div class="text-subtitle2 text-weight-medium">
            {{ currentSlideInfo?.lessonTitle }}
          </div>
          <div class="text-caption text-grey-6">
            {{ currentSlideInfo?.slideTitle }}
          </div>
        </div>
        <div class="col-auto">
          <q-chip
            size="sm"
            color="primary"
            text-color="white"
            :label="`${currentSlideInfo?.slideIndex}/${currentSlideInfo?.totalSlides}`"
          />
        </div>
      </div>
      <div class="text-caption text-grey-6">
        강의 {{ currentSlideInfo?.lessonNumber }}/{{ currentSlideInfo?.totalLessons }}
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <MarkdownEditor
        :key="`${currentLesson}-${currentSlide}`"
        :initial-content="currentSlideContent"
        :slide-id="`${currentLesson}-${currentSlide}`"
        @save="handleSlideContentSave"
        @content-change="handleSlideContentChange"
        @preview="handleSlidePreview"
        @create-markdown="handleCreateMarkdownFile"
        @auto-update="handleAutoUpdate"
        ref="markdownEditor"
      />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MarkdownEditor from './MarkdownEditor.vue';

interface CurrentSlideInfo {
  lessonTitle: string;
  slideTitle: string;
  slideIndex: number;
  totalSlides: number;
  lessonNumber: number;
  totalLessons: number;
}

interface Props {
  currentSlideType: string;
  currentSlideInfo: CurrentSlideInfo;
  currentLesson: number;
  currentSlide: number;
  currentSlideContent: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  slideContentSave: [content: string, slideId: string];
  slideContentChange: [content: string];
  slidePreview: [content: string];
  createMarkdownFile: [content: string, slideId: string];
  autoUpdate: [content: string, slideId: string];
}>();

const markdownEditor = ref();

// 슬라이드 내용 저장
const handleSlideContentSave = (content: string, slideId: string) => {
  emit('slideContentSave', content, slideId);
};

// 슬라이드 내용 변경
const handleSlideContentChange = (content: string) => {
  emit('slideContentChange', content);
};

// 슬라이드 미리보기
const handleSlidePreview = (content: string) => {
  emit('slidePreview', content);
};

// 마크다운 파일 생성
const handleCreateMarkdownFile = (content: string, slideId: string) => {
  emit('createMarkdownFile', content, slideId);
};

// 자동 업데이트
const handleAutoUpdate = (content: string, slideId: string) => {
  emit('autoUpdate', content, slideId);
};

// 마크다운 에디터 ref 노출
defineExpose({
  markdownEditor,
});
</script>
