<template>
  <div class="sidebar-container" :style="{ width: 100 - slideViewerWidth + '%' }">
    <!-- 댓글 섹션 -->
    <CommentSection
      :comments="comments"
      :show-comments="showComments"
      @toggle-comments="handleToggleComments"
      @add-comment="handleAddComment"
      @toggle-comment-like="handleToggleCommentLike"
    />

    <!-- 슬라이드 편집기 -->
    <SlideEditorSection
      :current-slide-type="currentSlideType"
      :current-slide-info="currentSlideInfo"
      :current-lesson="currentLesson"
      :current-slide="currentSlide"
      :current-slide-content="currentSlideContent"
      @slide-content-save="handleSlideContentSave"
      @slide-content-change="handleSlideContentChange"
      @slide-preview="handleSlidePreview"
      @create-markdown-file="handleCreateMarkdownFile"
      @auto-update="handleAutoUpdate"
      ref="slideEditorSection"
    />

    <!-- 파일 내보내기 -->
    <FileExportSection
      :current-slide-type="currentSlideType"
      :markdown-content="currentSlideContent"
      :css-content="currentSlideCss || ''"
      :html-content="currentSlideHtml"
      :current-lesson="currentLesson"
      :current-slide="currentSlide"
      :lesson-title="lessonTitle"
      @export-success="handleExportSuccess"
      @export-error="handleExportError"
      ref="fileExportSection"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, isRef, computed } from 'vue';
import CommentSection from './CommentSection.vue';
import SlideEditorSection from './SlideEditorSection.vue';
import CSSEditorSection from './CSSEditorSection.vue';
import FileExportSection from './FileExportSection.vue';
import type { Comment } from '../types/slide';

interface CurrentSlideInfo {
  lessonTitle: string;
  slideTitle: string;
  slideIndex: number;
  totalSlides: number;
  lessonNumber: number;
  totalLessons: number;
}

interface Props {
  slideViewerWidth: number;
  comments: Comment[];
  showComments: boolean;
  currentSlideType: string;
  currentSlideInfo: CurrentSlideInfo;
  currentLesson: number;
  currentSlide: number;
  currentSlideContent: string;
  currentSlideCss?: string;
  currentSlideHtml: string;
  lessonTitle: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  toggleComments: [];
  addComment: [comment: string];
  toggleCommentLike: [commentId: number];
  slideContentSave: [content: string, slideId: string];
  slideContentChange: [content: string];
  slidePreview: [content: string];
  createMarkdownFile: [content: string, slideId: string];
  autoUpdate: [content: string, slideId: string];

  exportSuccess: [message: string];
  exportError: [error: string];
}>();

const slideEditorSection = ref();
const fileExportSection = ref();

const resolvedCurrentSlideInfo = computed(() =>
  isRef(props.currentSlideInfo) ? props.currentSlideInfo.value : props.currentSlideInfo,
);
const resolvedCurrentSlideCss = computed(() =>
  isRef(props.currentSlideCss) ? props.currentSlideCss.value : props.currentSlideCss,
);
// resolvedCurrentSlideHTML 등은 필요 없음, 바로 props.currentSlideHtml 사용

// 댓글 관련 이벤트
const handleToggleComments = () => {
  emit('toggleComments');
};

const handleAddComment = (comment: string) => {
  emit('addComment', comment);
};

const handleToggleCommentLike = (commentId: number) => {
  emit('toggleCommentLike', commentId);
};

// 슬라이드 편집 관련 이벤트
const handleSlideContentSave = (content: string, slideId: string) => {
  emit('slideContentSave', content, slideId);
};

const handleSlideContentChange = (content: string) => {
  emit('slideContentChange', content);
};

const handleSlidePreview = (content: string) => {
  emit('slidePreview', content);
};

const handleCreateMarkdownFile = (content: string, slideId: string) => {
  emit('createMarkdownFile', content, slideId);
};

const handleAutoUpdate = (content: string, slideId: string) => {
  emit('autoUpdate', content, slideId);
};

// 파일 내보내기 관련 이벤트
const handleExportSuccess = (message: string) => {
  emit('exportSuccess', message);
};

const handleExportError = (error: string) => {
  emit('exportError', error);
};

// 하위 컴포넌트 ref 노출
defineExpose({
  slideEditorSection,
  fileExportSection,
});
</script>
