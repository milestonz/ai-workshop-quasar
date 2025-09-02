<template>
  <div class="sidebar-container" :style="{ width: 100 - slideViewerWidth + '%' }">
    <!-- 탭 네비게이션 -->
    <q-tabs
      v-model="activeTab"
      class="sidebar-tabs"
      dense
      align="justify"
      indicator-color="primary"
    >
      <q-tab name="toc" icon="list" label="목차" />
      <q-tab name="edit" icon="edit" label="편집" />
      <q-tab name="export" icon="download" label="내보내기" />
      <q-tab name="comments" icon="comment" label="댓글" />
    </q-tabs>

    <q-separator />

    <!-- 탭 컨텐츠 -->
    <q-tab-panels v-model="activeTab" animated class="sidebar-content">
      <!-- 스마트 목차 탭 -->
      <q-tab-panel name="toc" class="q-pa-none">
        <SmartTOC
          :current-section="currentLesson"
          :current-slide="currentSlide"
          @navigate-to-slide="handleNavigateToSlide"
        />
        <!-- 디버깅용 현재 상태 표시 -->
        <div
          style="
            position: fixed;
            top: 10px;
            right: 10px;
            background: yellow;
            padding: 5px;
            z-index: 9999;
            font-size: 12px;
          "
        >
          현재: {{ currentLesson }}-{{ currentSlide }}
        </div>
      </q-tab-panel>

      <!-- 편집 탭 -->
      <q-tab-panel name="edit" class="q-pa-none">
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
          @update-toc="handleUpdateTOC"
          @add-new-slide="handleAddNewSlide"
          ref="slideEditorSection"
        />
      </q-tab-panel>

      <!-- 내보내기 탭 -->
      <q-tab-panel name="export" class="q-pa-none">
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
      </q-tab-panel>

      <!-- 댓글 탭 -->
      <q-tab-panel name="comments" class="q-pa-none">
        <CommentSection
          :comments="comments"
          :show-comments="showComments"
          @toggle-comments="handleToggleComments"
          @add-comment="handleAddComment"
          @toggle-comment-like="handleToggleCommentLike"
        />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, isRef, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useCourseStore } from '../../stores/course';
import CommentSection from '../ui/CommentSection.vue';
import SlideEditorSection from '../editor/SlideEditorSection.vue';
import FileExportSection from '../ui/FileExportSection.vue';
import SmartTOC from '../slide/SmartTOC.vue';
import type { Comment } from '../../types/slide';

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
  updateTOC: [];
  addNewSlide: [];
  exportSuccess: [message: string];
  exportError: [error: string];
}>();

// 코스 스토어
const courseStore = useCourseStore();

// 활성 탭
const activeTab = ref('toc'); // 기본적으로 목차 탭 활성화

// 디버깅용 - 탭 변경 감지
watch(activeTab, (newTab, oldTab) => {
  console.log('🔄 탭 변경됨:', { oldTab, newTab });
  if (newTab === 'toc') {
    console.log('📋 목차 탭 활성화됨 - SmartTOC가 마운트되어야 함');
  }
});

// 컴포넌트 refs
const slideEditorSection = ref();
const fileExportSection = ref();

const resolvedCurrentSlideInfo = computed(() =>
  isRef(props.currentSlideInfo) ? props.currentSlideInfo.value : props.currentSlideInfo,
);
const resolvedCurrentSlideCss = computed(() =>
  isRef(props.currentSlideCss) ? props.currentSlideCss.value : props.currentSlideCss,
);

// 스마트 목차 네비게이션 처리
const handleNavigateToSlide = (section: number, slide: number) => {
  console.log('🔄 SidebarContainer handleNavigateToSlide:', { section, slide });

  // CourseStore 업데이트
  courseStore.setCurrentLesson(section);
  courseStore.setCurrentSlide(slide);

  // 새로운 구조에서는 URL 파라미터를 통해 슬라이드 변경
  const router = useRouter();
  const route = useRoute();

  // 슬라이드 인덱스 계산 (간단한 매핑)
  const slideIndex = section * 10 + slide; // 예: 1-2 -> 12

  router.push({
    query: {
      ...route.query,
      slide: slideIndex.toString(),
    },
  });

  console.log('✅ URL 파라미터를 통한 슬라이드 변경 완료');
};

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

// 목차 업데이트
const handleUpdateTOC = () => {
  emit('updateTOC');
};

// 새 슬라이드 추가
const handleAddNewSlide = () => {
  emit('addNewSlide');
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

<style scoped>
.sidebar-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f5f5f5;
  border-left: 1px solid #e0e0e0;
}

.sidebar-tabs {
  background: white;
  border-bottom: 1px solid #e0e0e0;
}

.sidebar-content {
  flex: 1;
  overflow: hidden;
}

.sidebar-content .q-tab-panel {
  height: 100%;
  overflow-y: auto;
}

/* 탭 버튼 스타일 */
:deep(.q-tab) {
  min-height: 48px;
  font-size: 0.875rem;
}

:deep(.q-tab .q-tab__content) {
  min-width: auto;
}

/* 반응형 조정 */
@media (max-width: 768px) {
  .sidebar-tabs :deep(.q-tab__label) {
    font-size: 0.75rem;
  }

  .sidebar-tabs :deep(.q-tab) {
    min-height: 40px;
  }
}
</style>
