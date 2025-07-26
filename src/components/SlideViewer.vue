<template>
  <div class="slide-viewer" :class="{ 'presentation-mode': isPresentationMode }">
    <!-- HTML 렌더링된 슬라이드 -->
    <div v-if="currentSlideContent" class="slide-content" :class="slideClass">
      <div class="markdown-slide" v-html="renderedContent"></div>
    </div>

    <!-- 슬라이드가 없을 때 -->
    <div v-else class="slide-placeholder">
      <q-icon name="slideshow" size="100px" color="grey-4" />
      <div class="text-h6 text-grey-6 q-mt-md">실시간 편집 모드</div>
      <div class="text-caption text-grey-5 q-mt-sm">파일: slide-{{ getSlideKey() }}.md</div>
      <div class="text-caption text-grey-5">
        현재 슬라이드: {{ lesson.title }} - {{ slideIndex + 1 }}
      </div>
      <div class="text-caption text-grey-5 q-mt-sm">
        편집기에서 내용을 입력하면 실시간으로 표시됩니다
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from 'vue';
import { marked } from 'marked';
import { useCourseStore } from '../stores/course';
import type { Lesson } from '../stores/course';

interface Props {
  lesson: Lesson;
  slideIndex: number;
  dynamicCSS?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{}>();

// SlideViewer 컴포넌트 로드 확인
console.log('🎯 SlideViewer 컴포넌트 로드됨:', {
  lessonTitle: props.lesson?.title,
  slideIndex: props.slideIndex,
  lessonData: props.lesson,
});

// 슬라이드 키 계산 함수
const getSlideKey = () => {
  if (!props.lesson?.title || props.lesson.title === '로딩 중...') return 'null';

  const titleParts = props.lesson.title.split('.');
  const lessonNumber = titleParts[0]?.trim() || '1';
  return `${lessonNumber}-${props.slideIndex}`;
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

// 컴포넌트 마운트 시 키보드 이벤트 리스너 추가
onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
});

// 컴포넌트 언마운트 시 키보드 이벤트 리스너 제거
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
});

// 슬라이드별 CSS 클래스 계산
const slideClass = computed(() => {
  const slideKey = getSlideKey();
  return slideKey !== 'null' ? `slide-${slideKey}` : '';
});

// 동적 CSS 적용 함수
const applyDynamicCSS = (css: string) => {
  console.log('🎨 동적 CSS 적용 시작:', css);

  if (!css.trim()) {
    console.log('🎨 CSS가 비어있음, 제거');
    removeDynamicCSS();
    return;
  }

  let styleElement = document.getElementById('slide-dynamic-css');
  if (!styleElement) {
    console.log('🎨 새로운 style 요소 생성');
    styleElement = document.createElement('style');
    styleElement.id = 'slide-dynamic-css';
    document.head.appendChild(styleElement);
  } else {
    console.log('🎨 기존 style 요소 사용');
  }

  styleElement.textContent = css;
  console.log('🎨 CSS 적용 완료');
};

// 동적 CSS 제거 함수
const removeDynamicCSS = () => {
  const styleElement = document.getElementById('slide-dynamic-css');
  if (styleElement) {
    styleElement.remove();
  }
};

// course store에서 현재 슬라이드의 lessonIndex 계산
const getLessonIndex = () => {
  const courseStore = useCourseStore();
  const lessonIndex = courseStore.lessons.findIndex(
    (lesson) => lesson.title === props.lesson.title,
  );

  console.log('🎯 getLessonIndex 결과:', {
    lessonTitle: props.lesson?.title,
    lessonIndex,
    availableLessons: courseStore.lessons.map((l) => l.title),
    found: lessonIndex !== -1,
  });

  return lessonIndex;
};

// 현재 슬라이드 내용 - course store에서 읽어오기
const currentSlideContent = ref('');

// Marp 스타일 파싱 함수
const parseMarpStyle = (content: string): { content: string; style: string } => {
  console.log('🎨 Marp 스타일 파싱 시작:', content.substring(0, 200));

  const styleMatch = content.match(/---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)/);
  if (styleMatch && styleMatch[1] && styleMatch[2]) {
    const frontMatter = styleMatch[1];
    const markdownContent = styleMatch[2];

    console.log('🎨 Front matter 발견:', frontMatter);

    // style: | 형식 파싱 (Marp 표준) - 더 정확한 정규식
    const styleMatch2 = frontMatter.match(/style:\s*\|\s*\n([\s\S]*?)(?=\n---|$)/);
    if (styleMatch2 && styleMatch2[1]) {
      const style = styleMatch2[1].trim();
      console.log('🎨 CSS 스타일 추출됨 (style: |):', style);
      return { content: markdownContent, style: style };
    }

    // style: 직접 형식 파싱
    const styleMatch3 = frontMatter.match(/style:\s*([\s\S]*?)(?=\n[a-zA-Z]+:|$)/);
    if (styleMatch3 && styleMatch3[1]) {
      const style = styleMatch3[1].trim();
      console.log('🎨 CSS 스타일 추출됨 (style: 직접):', style);
      return { content: markdownContent, style: style };
    }

    // 다른 방법으로 시도
    const styleMatch4 = frontMatter.match(/style:\s*([\s\S]*)/);
    if (styleMatch4 && styleMatch4[1]) {
      const style = styleMatch4[1].trim();
      console.log('🎨 CSS 스타일 추출됨 (방법3):', style);
      return { content: markdownContent, style: style };
    }
  }

  console.log('🎨 Marp 스타일 없음');
  return { content, style: '' };
};

// course store에서 슬라이드 내용을 로드하는 함수
const loadSlideContentFromMD = async () => {
  try {
    // 로딩 중이거나 lesson이 없으면 건너뛰기
    if (!props.lesson?.title || props.lesson.title === '로딩 중...') {
      console.log('🎯 로딩 중이거나 lesson이 없음, 건너뛰기');
      return;
    }

    const lessonIndex = getLessonIndex();
    const courseStore = useCourseStore();

    console.log('🎯 SlideViewer 로드 시작:', {
      lessonTitle: props.lesson?.title,
      lessonIndex,
      slideIndex: props.slideIndex,
      availableLessons: courseStore.lessons.map((l) => l.title),
    });

    // lessonIndex가 유효하지 않으면 건너뛰기
    if (lessonIndex === -1) {
      console.log('❌ lessonIndex를 찾을 수 없음');
      return;
    }

    // course store를 통해 MD 파일 내용 가져오기
    const content = await courseStore.loadSlideContentForEditing(lessonIndex, props.slideIndex);

    if (content) {
      // Marp 스타일 파싱
      const { content: markdownContent, style } = parseMarpStyle(content);

      currentSlideContent.value = markdownContent;

      // 전역 CSS 클래스를 사용하므로 동적 CSS 제거
      removeDynamicCSS();
      console.log('🎨 전역 CSS 클래스 사용:', slideClass.value);

      console.log('🎯 MD 파일 내용 로드 완료:', {
        lessonIndex,
        slideIndex: props.slideIndex,
        contentLength: markdownContent.length,
        contentPreview: markdownContent.substring(0, 100),
        currentSlideContentValue: currentSlideContent.value,
        hasStyle: !!style,
        slideKey: getSlideKey(),
      });
    } else {
      console.log('❌ 슬라이드 내용을 가져올 수 없음');
      currentSlideContent.value = '';
      removeDynamicCSS();
    }
  } catch (error) {
    console.error('❌ MD 파일 읽기 실패:', error);
    currentSlideContent.value = '';
    removeDynamicCSS();
  }
};

// Markdown을 HTML로 변환하는 함수 (프레젠테이션 최적화)
const convertMarkdownToHTML = (markdown: string): string => {
  let html = markdown;

  console.log('🔍 Markdown 변환 시작:', markdown.substring(0, 300));

  // 이미지 변환 (가장 중요!) - 먼저 처리
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  let imageMatch;
  let imageCount = 0;

  while ((imageMatch = imageRegex.exec(markdown)) !== null) {
    imageCount++;
    const altText = imageMatch[1] || '';
    const imageSrc = imageMatch[2];
    const imgTag = `<img src="${imageSrc}" alt="${altText}" loading="lazy">`;

    console.log(`🖼️ 이미지 ${imageCount} 변환:`, { altText, imageSrc, imgTag });
    html = html.replace(imageMatch[0], imgTag);
  }

  // 헤딩 변환 (프레젠테이션 최적화)
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
  html = html.replace(/^##### (.*$)/gim, '<h5>$1</h5>');
  html = html.replace(/^###### (.*$)/gim, '<h6>$1</h6>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // 링크 변환
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener">$1</a>',
  );

  // 굵은 텍스트 변환
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // 기울임 텍스트 변환
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // 인라인 코드 변환
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // 코드 블록 변환
  html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

  // 인용구 변환
  html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');

  // 순서 있는 리스트 변환
  html = html.replace(/^(\d+)\. (.*$)/gim, '<li>$2</li>');

  // 순서 없는 리스트 변환
  html = html.replace(/^- (.*$)/gim, '<li>$1</li>');

  // 리스트 그룹화 (간단한 방식)
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

  // iframe 처리 (안전한 렌더링)
  const iframeRegex = /<iframe\s+([^>]+)>/gi;
  html = html.replace(iframeRegex, (match, attributes) => {
    // iframe 속성을 안전하게 처리
    const safeAttributes = attributes
      .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '') // 이벤트 핸들러 제거
      .replace(/javascript:/gi, '') // javascript: 제거
      .replace(/data:/gi, ''); // data: 제거

    return `<iframe ${safeAttributes} sandbox="allow-scripts allow-same-origin allow-forms allow-popups"></iframe>`;
  });

  // 줄바꿈 처리 (마지막에)
  html = html.replace(/\n/g, '<br>');

  // HTML 정리 (중복된 <br> 제거)
  html = html.replace(/<br><br>/g, '<br>');

  console.log('🔍 Markdown 변환 완료:', html.substring(0, 300));
  console.log(`🖼️ 총 ${imageCount}개 이미지 변환됨`);

  return html;
};

// 렌더링된 내용
const renderedContent = computed(() => {
  try {
    const html = convertMarkdownToHTML(currentSlideContent.value);
    console.log('🎨 Markdown 렌더링 결과:', {
      original: currentSlideContent.value.substring(0, 200),
      rendered: html.substring(0, 200),
    });
    return html;
  } catch (error) {
    console.error('Markdown 렌더링 오류:', error);
    return currentSlideContent.value;
  }
});

// 컴포넌트 마운트 시 MD 파일 로드
onMounted(() => {
  loadSlideContentFromMD();
});

// props 변경 시 MD 파일 다시 로드
watch([() => props.lesson.title, () => props.slideIndex], () => {
  console.log('🎯 props 변경 감지:', {
    lessonTitle: props.lesson?.title,
    slideIndex: props.slideIndex,
  });
  loadSlideContentFromMD();
});

// 외부에서 내용을 업데이트할 수 있는 함수
const updateContent = (newContent: string) => {
  currentSlideContent.value = newContent;
  console.log('🎯 슬라이드 뷰어 내용 업데이트:', {
    contentLength: newContent.length,
    contentPreview: newContent.substring(0, 100),
  });
};

// dynamicCSS prop이 변경될 때 CSS 적용
watch(
  () => props.dynamicCSS,
  (newCSS) => {
    if (newCSS) {
      applyDynamicCSS(newCSS);
    } else {
      removeDynamicCSS();
    }
  },
  { immediate: true },
);

// 컴포넌트 언마운트 시 동적 CSS 정리
onUnmounted(() => {
  removeDynamicCSS();
});

// 외부에서 접근 가능하도록 expose
defineExpose({
  updateContent,
  loadSlideContentFromMD,
});
</script>

<style scoped>
.slide-viewer {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
}

.slide-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100%;
  padding: 2rem;
  flex: 1;
}

.slide-content {
  min-height: 100%;
  padding: 2rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.markdown-slide {
  max-width: 100%;
  margin: 0 auto;
  line-height: 0.8;
  padding: 1rem;
}

.markdown-slide h1,
.markdown-slide h2,
.markdown-slide h3,
.markdown-slide h4,
.markdown-slide h5,
.markdown-slide h6 {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #1976d2;
}

.markdown-slide h1 {
  font-size: 2.5rem;
  text-align: center;
  color: #1976d2;
  margin-bottom: 1rem;
  font-weight: 700;
}

.markdown-slide h2 {
  font-size: 2rem;
  color: #1976d2;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.markdown-slide h3 {
  font-size: 1.5rem;
  color: #1976d2;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

.markdown-slide p {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  line-height: 0.8;
}

.markdown-slide ul,
.markdown-slide ol {
  margin-bottom: 1rem;
  padding-left: 2rem;
}

.markdown-slide li {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  line-height: 1.6;
}

.markdown-slide strong {
  font-weight: 600;
  color: #1976d2;
}

.markdown-slide em {
  font-style: italic;
  color: #666;
}

.markdown-slide blockquote {
  border-left: 4px solid #1976d2;
  padding-left: 1rem;
  margin: 1rem 0;
  font-style: italic;
  color: #666;
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
}

.markdown-slide code {
  background-color: #f5f5f5;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
}

.markdown-slide pre {
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  margin-bottom: 1rem;
}

/* 이미지 스타일 - 슬라이드 전면 배치 */
.markdown-slide img {
  display: block;
  margin: 2rem auto;
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.markdown-slide img:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

/* 이미지가 포함된 슬라이드의 텍스트 스타일 조정 */
.markdown-slide:has(img) {
  text-align: center;
}

.markdown-slide:has(img) h1,
.markdown-slide:has(img) h2,
.markdown-slide:has(img) h3 {
  margin-bottom: 2rem;
}

.markdown-slide:has(img) p {
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
}

/* YouTube 전체화면 스타일 */
.youtube-fullscreen {
  position: relative;
  width: 100%;
  height: 80vh;
  margin: 2rem auto;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.youtube-fullscreen iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

/* YouTube가 포함된 슬라이드의 텍스트 스타일 조정 */
.markdown-slide:has(.youtube-fullscreen) {
  text-align: center;
}

.markdown-slide:has(.youtube-fullscreen) h1,
.markdown-slide:has(.youtube-fullscreen) h2,
.markdown-slide:has(.youtube-fullscreen) h3 {
  margin-bottom: 2rem;
}

.markdown-slide:has(.youtube-fullscreen) p {
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
}

/* 일반 YouTube iframe 스타일 */
.markdown-slide iframe {
  display: block;
  margin: 2rem auto;
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
