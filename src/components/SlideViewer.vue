<template>
  <div class="slide-viewer">
    <div v-if="isLoading && previousSlideContent" class="slide-content previous-content">
      <div class="markdown-slide" v-html="convertMarkdownToHTML(previousSlideContent)"></div>
    </div>
    <div v-else class="slide-content">
      <div class="markdown-slide" v-html="renderedContent"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useCourseStore } from '../stores/course';
import { convertCustomMarkdownToHTML } from '../utils/markdown';
import type { Lesson } from '../types/slide';

interface Props {
  lesson: Lesson;
  slideIndex: number;
}

const props = defineProps<Props>();

const emit = defineEmits<{}>();

// course store에서 현재 슬라이드의 lessonIndex 계산
const getLessonIndex = () => {
  const courseStore = useCourseStore();
  const lessonIndex = courseStore.lessons.findIndex(
    (lesson) => lesson.title === props.lesson.title,
  );
  return lessonIndex;
};

// 슬라이드 키 생성
const getSlideKey = () => {
  const lessonIndex = getLessonIndex();
  return lessonIndex !== -1 ? `${lessonIndex}-${props.slideIndex}` : 'null';
};

// course store에서 프레젠테이션 모드 상태 가져오기
const courseStore = useCourseStore();
const isPresentationMode = computed(() => courseStore.isPresentationMode);

// 프레젠테이션 모드 토글 함수
const togglePresentationMode = () => {
  courseStore.togglePresentationMode();
};

// 키보드 단축키 처리
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'F11') {
    event.preventDefault();
    togglePresentationMode();
  }
};

// 현재 슬라이드 내용 - course store에서 읽어오기
const currentSlideContent = ref('');
const isLoading = ref(false);
const previousSlideContent = ref(''); // 이전 슬라이드 내용 저장

// Marp 스타일 파싱 함수
const parseMarpStyle = (content: string): { content: string; style: string } => {
  const styleMatch = content.match(/---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)/);
  if (styleMatch && styleMatch[1] && styleMatch[2]) {
    const frontMatter = styleMatch[1];
    const markdownContent = styleMatch[2];
    // style: | 형식 파싱 (Marp 표준) - 더 정확한 정규식
    const styleMatch2 = frontMatter.match(/style:\s*\|\s*\n([\s\S]*?)(?=\n---|$)/);
    if (styleMatch2 && styleMatch2[1]) {
      const style = styleMatch2[1].trim();
      return { content: markdownContent, style: style };
    }
    // style: 직접 형식 파싱
    const styleMatch3 = frontMatter.match(/style:\s*([\s\S]*?)(?=\n[a-zA-Z]+:|$)/);
    if (styleMatch3 && styleMatch3[1]) {
      const style = styleMatch3[1].trim();
      return { content: markdownContent, style: style };
    }
    // 다른 방법으로 시도
    const styleMatch4 = frontMatter.match(/style:\s*([\s\S]*)/);
    if (styleMatch4 && styleMatch4[1]) {
      const style = styleMatch4[1].trim();
      return { content: markdownContent, style: style };
    }
  }
  return { content, style: '' };
};

// course store에서 슬라이드 내용을 로드하는 함수
const loadSlideContentFromMD = async () => {
  try {
    if (!props.lesson?.title || props.lesson.title === '로딩 중...') {
      return;
    }
    const lessonIndex = getLessonIndex();
    const courseStore = useCourseStore();
    if (lessonIndex === -1) {
      return;
    }

    // 이전 내용을 저장
    if (currentSlideContent.value) {
      previousSlideContent.value = currentSlideContent.value;
      isLoading.value = true;
    }

    const content = await courseStore.loadSlideContentForEditing(lessonIndex, props.slideIndex);
    if (content) {
      // Marp 스타일 파싱
      const { content: markdownContent } = parseMarpStyle(content);
      currentSlideContent.value = markdownContent;
    } else {
      currentSlideContent.value = '';
    }

    // 로딩 완료
    isLoading.value = false;
  } catch (error) {
    currentSlideContent.value = '';
    isLoading.value = false;
  }
};

// 마크다운을 HTML로 변환하는 함수
const convertMarkdownToHTML = (markdown: string): string => {
  return convertCustomMarkdownToHTML(markdown);
};

// 렌더링된 내용
const renderedContent = computed(() => {
  try {
    const html = convertMarkdownToHTML(currentSlideContent.value);

    // HTML이 변경된 후 제목 마진 제거
    nextTick(() => {
      removeHeadingMargins();
    });

    return html;
  } catch (error) {
    return currentSlideContent.value;
  }
});

// 제목 마진 제거 함수
const removeHeadingMargins = () => {
  const headings = document.querySelectorAll(
    '.markdown-slide h1, .markdown-slide h2, .markdown-slide h3, .markdown-slide h4, .markdown-slide h5, .markdown-slide h6',
  );
  headings.forEach((heading) => {
    const element = heading as HTMLElement;
    element.style.setProperty('margin', '0', 'important');
    element.style.setProperty('margin-top', '0', 'important');
    element.style.setProperty('margin-bottom', '0', 'important');
    element.style.setProperty('margin-left', '0', 'important');
    element.style.setProperty('margin-right', '0', 'important');
    element.style.setProperty('padding', '0', 'important');
    element.style.setProperty('padding-top', '0', 'important');
    element.style.setProperty('padding-bottom', '0', 'important');
    element.style.setProperty('padding-left', '0', 'important');
    element.style.setProperty('padding-right', '0', 'important');
  });
};

// props 변경 시 MD 파일 다시 로드
watch(
  [() => props.lesson?.title, () => props.slideIndex, () => props.lesson],
  () => {
    loadSlideContentFromMD();
  },
  { deep: true, immediate: true },
);

// 컴포넌트 마운트 시 키보드 이벤트 리스너 추가
onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
  loadSlideContentFromMD();

  // 제목 요소들의 마진을 JavaScript로 직접 제거
  nextTick(() => {
    const headings = document.querySelectorAll(
      '.markdown-slide h1, .markdown-slide h2, .markdown-slide h3, .markdown-slide h4, .markdown-slide h5, .markdown-slide h6',
    );
    headings.forEach((heading) => {
      (heading as HTMLElement).style.margin = '0';
      (heading as HTMLElement).style.marginTop = '0';
      (heading as HTMLElement).style.marginBottom = '0';
      (heading as HTMLElement).style.marginLeft = '0';
      (heading as HTMLElement).style.marginRight = '0';
      (heading as HTMLElement).style.padding = '0';
      (heading as HTMLElement).style.paddingTop = '0';
      (heading as HTMLElement).style.paddingBottom = '0';
      (heading as HTMLElement).style.paddingLeft = '0';
      (heading as HTMLElement).style.paddingRight = '0';
    });
  });
});

// 컴포넌트 언마운트 시 키보드 이벤트 리스너 제거
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
});

// 외부에서 접근 가능하도록 expose
defineExpose({
  loadSlideContentFromMD,
});
</script>

<style scoped>
/* 슬라이드 뷰어 컨테이너 */
.slide-viewer {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
  position: relative;
  background-color: #000 !important;
}

/* 슬라이드 콘텐츠 */
.slide-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent !important;
  color: #fff !important;
  padding: clamp(1rem, 3vw, 2rem) !important;
  font-size: clamp(0.875rem, 2.5vw, 1.5rem) !important;
  line-height: 1.6 !important;
}

/* 이전 콘텐츠 (로딩 중) */
.previous-content {
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

/* 마크다운 슬라이드 */
.markdown-slide {
  width: 100% !important;
  max-width: none !important;
  text-align: left;
  background-color: transparent !important;
  color: #fff !important;
  padding: 0 clamp(1rem, 3vw, 2rem) !important;
  font-size: clamp(0.875rem, 2.5vw, 1.5rem) !important;
  line-height: 1.6 !important;
  margin: 0 !important;
}

/* 마크다운 슬라이드 내 모든 요소의 기본 마진 제거 */
.markdown-slide * {
  margin-top: 0 !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
}

/* 모든 제목 요소의 기본 마진 완전 리셋 - 최고 우선순위 */
.markdown-slide h1,
.markdown-slide h2,
.markdown-slide h3,
.markdown-slide h4,
.markdown-slide h5,
.markdown-slide h6 {
  margin: 0 !important;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
  margin-block-start: 0 !important;
  margin-block-end: 0 !important;
  margin-inline-start: 0 !important;
  margin-inline-end: 0 !important;
  padding: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
}

/* 브라우저 기본 스타일 완전 덮어쓰기 - 최고 우선순위 */
.markdown-slide h1,
.markdown-slide h2,
.markdown-slide h3,
.markdown-slide h4,
.markdown-slide h5,
.markdown-slide h6 {
  all: unset !important;
  display: block !important;
  color: #fff !important;
  font-weight: bold !important;
  margin: 0 !important;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
  margin-block-start: 0 !important;
  margin-block-end: 0 !important;
  margin-inline-start: 0 !important;
  margin-inline-end: 0 !important;
  padding: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
  line-height: 1 !important;
  box-sizing: border-box !important;
}

/* 제목 스타일 */
.markdown-slide h1 {
  font-size: clamp(1.5rem, 4vw, 3rem) !important;
  margin: 0 !important;
  color: #fff !important;
}

.markdown-slide h2 {
  font-size: clamp(1.25rem, 3.5vw, 2.5rem) !important;
  margin: 0 !important;
  color: #fff !important;
}

.markdown-slide h3 {
  font-size: clamp(1.125rem, 3vw, 2rem) !important;
  margin: 0 !important;
  color: #fff !important;
}

.markdown-slide h4 {
  font-size: clamp(1rem, 2.5vw, 1.5rem) !important;
  margin: 0 !important;
  color: #fff !important;
}

/* 가로줄 스타일 */
.markdown-slide hr {
  border: none !important;
  height: 2px !important;
  background: linear-gradient(90deg, transparent, #fff, transparent) !important;
  margin: clamp(1rem, 3vw, 2rem) 0 !important;
  border-radius: 1px !important;
}

/* 테이블 스타일 */
.markdown-slide table {
  width: auto !important;
  margin: 0 !important;
  border-collapse: collapse !important;
  border-spacing: 0 !important;
  background-color: transparent !important;
  color: #fff !important;
  font-size: 0.9em !important;
  table-layout: auto !important;
  max-width: none !important;
}

.markdown-slide th {
  background-color: rgba(255, 255, 255, 0.9) !important;
  color: #000 !important;
  font-weight: bold !important;
  padding: 0.5rem 1rem !important;
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  text-align: left !important;
  white-space: normal !important;
  word-wrap: break-word !important;
  overflow-wrap: break-word !important;
  width: auto !important;
  max-width: none !important;
}

.markdown-slide td {
  padding: 0.5rem 1rem !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  text-align: left !important;
  color: #fff !important;
  white-space: normal !important;
  word-wrap: break-word !important;
  overflow-wrap: break-word !important;
  width: auto !important;
  max-width: none !important;
}

.markdown-slide tr:nth-child(even) {
  background-color: rgba(255, 255, 255, 0.05) !important;
}

.markdown-slide tr:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

/* 스크롤바 스타일링 */
.markdown-slide {
  overflow-y: auto !important;
  overflow-x: hidden !important;
}

.markdown-slide::-webkit-scrollbar {
  width: 8px !important;
}

.markdown-slide::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1) !important;
  border-radius: 4px !important;
}

.markdown-slide::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3) !important;
  border-radius: 4px !important;
}

.markdown-slide::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5) !important;
}

/* Firefox 스크롤바 */
.markdown-slide {
  scrollbar-width: thin !important;
  scrollbar-color: rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1) !important;
}

/* 줄바꿈 간격 조정 */
.markdown-slide br {
  display: block !important;
  content: '' !important;
  margin-top: 0.5rem !important;
  line-height: 1.5 !important;
}

/* 연속된 줄바꿈 간격 조정 */
.markdown-slide br + br {
  margin-top: 1rem !important;
}

/* 모바일 반응형 */
@media (max-width: 768px) {
  .markdown-slide {
    padding: 0 1rem !important;
    font-size: 0.875rem !important;
  }

  .markdown-slide h1 {
    font-size: 1.5rem !important;
  }

  .markdown-slide h2 {
    font-size: 1.25rem !important;
  }

  .markdown-slide h3 {
    font-size: 1.125rem !important;
  }

  .markdown-slide table {
    font-size: 0.75rem !important;
    margin: 0.5rem auto !important;
  }

  .markdown-slide th,
  .markdown-slide td {
    padding: 0.25rem 0.5rem !important;
  }
}

/* 태블릿 반응형 */
@media (min-width: 769px) and (max-width: 1024px) {
  .markdown-slide {
    padding: 0 1.5rem !important;
    font-size: 1rem !important;
  }

  .markdown-slide h1 {
    font-size: 2rem !important;
  }

  .markdown-slide h2 {
    font-size: 1.75rem !important;
  }

  .markdown-slide h3 {
    font-size: 1.5rem !important;
  }

  .markdown-slide table {
    font-size: 0.875rem !important;
  }
}

/* 대형 화면 최적화 */
@media (min-width: 1200px) {
  .markdown-slide {
    padding: 0 3rem !important;
    font-size: 1.25rem !important;
  }

  .markdown-slide h1 {
    font-size: 3rem !important;
  }

  .markdown-slide h2 {
    font-size: 2.5rem !important;
  }

  .markdown-slide h3 {
    font-size: 2rem !important;
  }

  .markdown-slide table {
    font-size: 1rem !important;
  }
}
</style>
