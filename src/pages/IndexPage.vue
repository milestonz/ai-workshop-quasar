<template>
  <q-page class="bg-grey-2 full-height">
    <div class="main-layout" :class="{ 'presentation-mode': isPresentationMode }">
      <!-- 슬라이드 뷰어 컨테이너 -->
      <SlideViewerContainer
        :key="
          isPresentationMode
            ? 'presentation'
            : `${courseStore.currentLesson}-${courseStore.currentSlide}`
        "
        :lesson="
          courseStore.lessons[courseStore.currentLesson] || {
            title: '로딩 중...',
            slides: 0,
            completed: false,
            videoUrl: null,
          }
        "
        :slide-index="courseStore.currentSlide"
        :is-presentation-mode="isPresentationMode"
        :slide-viewer-width="slideViewerWidth"
        :is-prev-button-disabled="isPrevButtonDisabled"
        :is-next-button-disabled="isNextButtonDisabled"
        @prev-slide="prevSlide"
        @next-slide="nextSlide"
        @slide-navigation="handleSlideNavigation"
        ref="slideViewerContainerRef"
      />

      <!-- 구분선 (프리젠테이션 모드에서 숨김) -->
      <div v-if="!isPresentationMode" class="resize-handle" @mousedown="startResize"></div>

      <!-- 프리젠테이션 모드 단축키 안내 -->
      <div v-if="isPresentationMode" class="presentation-shortcuts">
        <div class="shortcuts-tooltip">
          <q-icon name="keyboard" size="sm" />
          <span class="shortcuts-text">ESC: 편집기 모드, 화살표 키: 슬라이드 이동</span>
        </div>
      </div>

      <!-- 편집기 사이드바 컨테이너 (편집기 모드에서만 표시) -->
      <SidebarContainer
        v-if="!isPresentationMode"
        :slide-viewer-width="slideViewerWidth"
        :comments="comments"
        :show-comments="showComments"
        :current-slide-type="currentSlideType"
        :current-slide-info="safeCurrentSlideInfo"
        :current-lesson="currentLesson"
        :current-slide="currentSlide"
        :current-slide-content="currentSlideContent"
        :current-slide-html="currentSlideHtml"
        :lesson-title="currentLessonData?.title || ''"
        @toggle-comments="toggleComments"
        @add-comment="addComment"
        @toggle-comment-like="toggleCommentLike"
        @slide-content-save="handleSlideContentSave"
        @slide-content-change="handleSlideContentChange"
        @slide-preview="handleSlidePreview"
        @create-markdown-file="handleCreateMarkdownFile"
        @auto-update="handleAutoUpdate"
        @export-success="handleExportSuccess"
        @export-error="handleExportError"
        ref="sidebarContainerRef"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from 'vue';
import { useCourseStore } from '../stores/course';
import SlideViewerContainer from '../components/SlideViewerContainer.vue';
import SidebarContainer from '../components/SidebarContainer.vue';
import { convertMarkdownToHTML } from '../utils/markdown';

const courseStore = useCourseStore();

// 프리젠테이션 모드 상태
const isPresentationMode = computed(() => courseStore.isPresentationMode);

// 키보드 이벤트 핸들러
const handleKeydown = (event: KeyboardEvent) => {
  // 프레젠테이션 모드에서만 키보드 이벤트 처리
  if (!isPresentationMode.value) return;

  // ESC 키로 프레젠테이션 모드 종료
  if (event.key === 'Escape') {
    courseStore.togglePresentationMode();
    return;
  }

  // 슬라이드 네비게이션 키들
  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowDown':
    case 'PageDown':
    case ' ': // 스페이스바
      event.preventDefault();
      if (!isNextButtonDisabled.value) {
        nextSlide();
      }
      break;
    case 'ArrowLeft':
    case 'ArrowUp':
    case 'PageUp':
      event.preventDefault();
      if (!isPrevButtonDisabled.value) {
        prevSlide();
      }
      break;
    case 'Home':
      event.preventDefault();
      // 첫 번째 슬라이드로 이동
      courseStore.setCurrentSlide(0);
      break;
    case 'End':
      event.preventDefault();
      // 마지막 슬라이드로 이동
      const lastSlide = (courseStore.currentLessonData?.slides || 0) - 1;
      courseStore.setCurrentSlide(lastSlide);
      break;
  }
};

// 구분선 조절을 위한 상태
const slideViewerWidth = ref(70);
const isResizing = ref(false);

// 슬라이드 뷰어 컨테이너 ref
const slideViewerContainerRef = ref();

// 사이드바 컨테이너 ref
const sidebarContainerRef = ref();

// Store에서 필요한 상태와 액션들을 구조분해할당
const {
  currentSlide,
  isPlaying,
  showComments,
  newComment,
  notes,
  comments,
  currentLessonData,
  slideProgress,
  nextSlide,
  prevSlide,
  togglePlaying,
  toggleComments,
  addComment,
  updateNotes,
  saveNotes,
  clearNotes,
  toggleCommentLike,
  hasVideo,
  currentLesson,
  getCurrentSlideContent,
  saveSlideContent,
  getCurrentSlideType,
  getSlideContentFromMD,
  saveSlideContentToMD,
  overwriteSlideContentToMD,
} = courseStore;

// 현재 슬라이드 타입
const currentSlideType = computed(() => getCurrentSlideType());

// 화살표 버튼 비활성화 조건
const isPrevButtonDisabled = computed(() => {
  // 첫 번째 Chapter의 첫 번째 슬라이드인 경우에만 비활성화
  return courseStore.currentSlide === 0 && courseStore.currentLesson === 0;
});

const isNextButtonDisabled = computed(() => {
  // 마지막 Chapter의 마지막 슬라이드인 경우에만 비활성화
  const isLastSlide = courseStore.currentSlide === (courseStore.currentLessonData?.slides || 0) - 1;
  const isLastChapter = courseStore.currentLesson === courseStore.lessons.length - 1;
  return isLastSlide && isLastChapter;
});

// 현재 슬라이드 내용 (MD 파일에서 읽어옴)
const currentSlideContent = ref('');

// MD 파일에서 슬라이드 내용을 로드하는 함수
const loadSlideContentFromMD = async () => {
  try {
    const lesson = courseStore.lessons[courseStore.currentLesson];
    if (!lesson) {
      currentSlideContent.value = '';
      return;
    }

    // 실제 lessonIndex와 slideIndex를 사용하여 componentKey 생성
    const componentKey = `${courseStore.currentLesson}-${courseStore.currentSlide}`;
    const content = await getSlideContentFromMD(componentKey);
    currentSlideContent.value = content;

    // 뷰어도 즉시 업데이트
    if (slideViewerContainerRef.value?.slideViewerRef?.value) {
      slideViewerContainerRef.value.slideViewerRef.value.updateContent(content);
    }
  } catch (error) {
    console.error('❌ MD 파일 내용 로드 실패:', error);
    currentSlideContent.value = '';
  }
};

// 현재 슬라이드 제목
const currentSlideTitle = computed(() => {
  if (!currentLessonData) return '';

  const lesson = currentLessonData;
  const slideTitles = lesson.slideTitles;

  if (slideTitles && slideTitles[currentSlide]) {
    return slideTitles[currentSlide];
  }

  // 슬라이드 제목이 없으면 기본 형식으로 생성
  const lessonNumber = lesson.title.split('.')[0]?.trim() || '1';
  return `${lessonNumber}-${currentSlide + 1}`;
});

// 현재 슬라이드 정보
const currentSlideInfo = computed(() => {
  const lesson = courseStore.lessons[courseStore.currentLesson];
  const slideIndex = courseStore.currentSlide;

  if (!lesson) return null;

  return {
    lessonTitle: lesson.title,
    slideTitle: lesson.slideTitles?.[slideIndex] || `슬라이드 ${slideIndex + 1}`,
    slideIndex: slideIndex + 1,
    totalSlides: lesson.slides,
    lessonNumber: courseStore.currentLesson + 1,
    totalLessons: courseStore.lessons.length,
  };
});

// 현재 슬라이드 HTML 내용
const currentSlideHTML = computed(() => {
  if (!currentSlideContent.value) return '';

  try {
    return convertMarkdownToHTML(currentSlideContent.value);
  } catch (error) {
    console.error('HTML 변환 오류:', error);
    return currentSlideContent.value;
  }
});

// SidebarContainer용 변수들
const currentSlideHtml = computed(() => currentSlideHTML.value);
const safeCurrentSlideInfo = computed(
  () =>
    currentSlideInfo.value || {
      lessonTitle: '',
      slideTitle: '',
      slideIndex: 1,
      totalSlides: 1,
      lessonNumber: 1,
      totalLessons: 1,
    },
);

// 슬라이드 내용 저장
const handleSlideContentSave = async (content: string, slideId: string) => {
  console.log('🔍 [IndexPage] 저장 시작');
  console.log('🔍 [IndexPage] 원본 내용 길이:', content.length);
  console.log(
    '🔍 [IndexPage] 원본 내용 끝부분:',
    JSON.stringify(content.substring(content.length - 20)),
  );

  // 끝부분의 불필요한 줄바꿈 제거
  const cleanedContent = content.trimEnd();

  console.log('🔍 [IndexPage] 정리된 내용 길이:', cleanedContent.length);
  console.log(
    '🔍 [IndexPage] 정리된 내용 끝부분:',
    JSON.stringify(cleanedContent.substring(cleanedContent.length - 20)),
  );
  console.log('🔍 [IndexPage] 제거된 빈줄 수:', content.length - cleanedContent.length);

  // 추가로 연속된 빈줄을 하나로 정리
  const finalContent = cleanedContent.replace(/\n{3,}/g, '\n\n');

  console.log('🔍 [IndexPage] 최종 내용 길이:', finalContent.length);
  console.log(
    '🔍 [IndexPage] 최종 내용 끝부분:',
    JSON.stringify(finalContent.substring(finalContent.length - 20)),
  );

  saveSlideContent(finalContent);

  // MD 파일 덮어쓰기
  try {
    const lesson = courseStore.lessons[courseStore.currentLesson];
    const componentKey = `${courseStore.currentLesson}-${courseStore.currentSlide}`;

    const success = await overwriteSlideContentToMD(componentKey, finalContent);

    if (!success) {
      console.error('MD 파일 덮어쓰기 실패:', slideId);
      alert('❌ 저장 실패! 파일 생성에 실패했습니다.');
    }
  } catch (error) {
    console.error('MD 파일 저장 실패:', error);
    alert('❌ 저장 실패! 오류가 발생했습니다.');
  }
};

// 슬라이드 내용 변경 (실시간 뷰어 업데이트만)
const handleSlideContentChange = async (content: string) => {
  // 끝부분의 불필요한 줄바꿈 제거
  const cleanedContent = content.trimEnd();

  // 슬라이드 내용 업데이트 (메모리만)
  saveSlideContent(cleanedContent);
};

// 슬라이드 미리보기
const handleSlidePreview = (content: string) => {
  // 미리보기 시 메인 슬라이드에 반영
  saveSlideContent(content);

  // 슬라이드 뷰어 업데이트
  if (slideViewerContainerRef.value?.slideViewerRef?.value) {
    slideViewerContainerRef.value.slideViewerRef.value.updateContent(content);
  }
};

// 자동 업데이트 처리 (실시간 뷰어 업데이트만)
const handleAutoUpdate = (content: string, slideId: string) => {
  try {
    // 끝부분의 불필요한 줄바꿈 제거
    const cleanedContent = content.trimEnd();

    saveSlideContent(cleanedContent);
    if (slideViewerContainerRef.value?.slideViewerRef?.value) {
      slideViewerContainerRef.value.slideViewerRef.value.updateContent(cleanedContent);
    }
  } catch (error) {
    console.error('실시간 뷰어 업데이트 실패:', error);
  }
};

// 마크다운 파일 생성
const handleCreateMarkdownFile = async (content: string, slideId: string) => {
  try {
    const componentKey = slideId;
    const success = await saveSlideContentToMD(componentKey, content);

    if (success) {
      console.log('✅ 마크다운 파일 생성 완료:', slideId);
    } else {
      console.error('❌ 마크다운 파일 생성 실패:', slideId);
      alert('❌ 파일 생성에 실패했습니다.');
    }
  } catch (error) {
    console.error('❌ 마크다운 파일 생성 오류:', error);
    alert('❌ 파일 생성 중 오류가 발생했습니다.');
  }
};

// 슬라이드 네비게이션 처리
const handleSlideNavigation = (direction: 'prev' | 'next') => {
  if (direction === 'prev') {
    prevSlide();
  } else {
    nextSlide();
  }
};

// 구분선 조절 시작
const startResize = (event: MouseEvent) => {
  isResizing.value = true;
  document.addEventListener('mousemove', handleResize);
  document.addEventListener('mouseup', stopResize);
  event.preventDefault();
};

// 구분선 조절 중
const handleResize = (event: MouseEvent) => {
  if (!isResizing.value) return;

  const container = document.querySelector('.main-layout') as HTMLElement;
  if (!container) return;

  const containerRect = container.getBoundingClientRect();
  const newWidth = ((event.clientX - containerRect.left) / containerRect.width) * 100;

  // 최소 30%, 최대 90%로 제한
  slideViewerWidth.value = Math.max(30, Math.min(90, newWidth));
};

// 구분선 조절 종료
const stopResize = () => {
  isResizing.value = false;
  document.removeEventListener('mousemove', handleResize);
  document.removeEventListener('mouseup', stopResize);
};

// 내보내기 성공 처리
const handleExportSuccess = (message: string) => {
  console.log('✅ 내보내기 성공:', message);
};

// 내보내기 오류 처리
const handleExportError = (error: string) => {
  console.error('❌ 내보내기 오류:', error);
  alert(`❌ 내보내기 실패: ${error}`);
};

// Watch 함수들
watch(
  () => courseStore.currentLesson,
  async () => {
    await loadSlideContentFromMD();
  },
  { immediate: true },
);

watch(
  () => courseStore.currentSlide,
  async () => {
    await loadSlideContentFromMD();
  },
);

// 컴포넌트 마운트/언마운트
onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
.main-layout {
  display: flex;
  height: 100%;
  position: relative;
}

.presentation-mode {
  background: #000000;
}

.resize-handle {
  width: 4px;
  background: #ddd;
  cursor: col-resize;
  transition: background-color 0.2s;
}

.resize-handle:hover {
  background: #999;
}

.presentation-shortcuts {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.shortcuts-tooltip {
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 6px;
}

.shortcuts-text {
  white-space: nowrap;
}
</style>
