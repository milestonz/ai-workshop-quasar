<template>
  <q-page class="bg-grey-2 full-height">
    <div class="main-layout" :class="{ 'presentation-mode': isPresentationMode }">
      <!-- 슬라이드 뷰어 -->
      <div
        class="slide-viewer-container"
        :style="{ width: isPresentationMode ? '100%' : slideViewerWidth + '%' }"
      >
        <div class="slide-container">
          <q-card class="slide-viewer">
            <!-- SlideViewer 컴포넌트 사용 -->
            <SlideViewer
              :lesson="
                currentLessonData || {
                  title: '로딩 중...',
                  slides: 0,
                  completed: false,
                  videoUrl: null,
                }
              "
              :slide-index="currentSlide"
              :dynamic-css="dynamicCSS"
              ref="slideViewerRef"
            />

            <!-- 좌측 화살표 버튼 -->
            <q-btn
              round
              color="red"
              icon="chevron_left"
              size="lg"
              class="slide-nav-btn slide-nav-left"
              :disable="isPrevButtonDisabled"
              @click="
                () => {
                  handleSlideNavigation('prev');
                  prevSlide();
                }
              "
            >
              <q-tooltip>이전 슬라이드</q-tooltip>
            </q-btn>

            <!-- 우측 화살표 버튼 -->
            <q-btn
              round
              color="red"
              icon="chevron_right"
              size="lg"
              class="slide-nav-btn slide-nav-right"
              :disable="isNextButtonDisabled"
              @click="
                () => {
                  handleSlideNavigation('next');
                  nextSlide();
                }
              "
            >
              <q-tooltip>다음 슬라이드</q-tooltip>
            </q-btn>

            <!-- 추가 설명 창 -->
            <q-card-section class="q-pt-none slide-notes">
              <div class="notes-header">
                <q-icon name="info" size="sm" class="q-mr-xs" />
                <span class="text-caption text-weight-medium">추가 정보</span>
              </div>
              <div class="notes-content">
                <!-- 추가 정보 내용이 여기에 표시됩니다 -->
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- 구분선 (프리젠테이션 모드에서 숨김) -->
      <div v-if="!isPresentationMode" class="resize-handle" @mousedown="startResize"></div>

      <!-- 사이드바 (프리젠테이션 모드에서 숨김) -->
      <div
        v-if="!isPresentationMode"
        class="sidebar-container"
        :style="{ width: 100 - slideViewerWidth + '%' }"
      >
        <!-- 댓글 섹션 -->
        <q-card class="sidebar-card">
          <q-card-section class="q-pb-none">
            <div class="row items-center justify-between">
              <h6 class="q-my-none">댓글</h6>
              <q-btn
                flat
                round
                dense
                :icon="showComments ? 'expand_less' : 'expand_more'"
                @click="toggleComments"
              />
            </div>
          </q-card-section>

          <q-slide-transition>
            <div v-show="showComments">
              <q-card-section class="q-pt-none">
                <div class="comments-section">
                  <div v-for="comment in comments" :key="comment.id" class="comment-item">
                    <div class="comment-header">
                      <span class="comment-author">{{ comment.user }}</span>
                      <span class="comment-time">{{ comment.time }}</span>
                    </div>
                    <div class="comment-content">{{ comment.text }}</div>
                    <div class="comment-actions">
                      <q-btn
                        flat
                        dense
                        size="sm"
                        :icon="comment.liked ? 'favorite' : 'favorite_border'"
                        :color="comment.liked ? 'red' : 'grey'"
                        @click="toggleCommentLike(comment.id)"
                      />
                      <span class="text-caption text-grey-6 q-ml-xs">{{ comment.likes }}</span>
                    </div>
                  </div>
                </div>

                <q-input
                  v-model="newComment"
                  type="textarea"
                  placeholder="댓글을 작성하세요..."
                  rows="3"
                  outlined
                  dense
                  class="q-mt-md"
                />
                <div class="row justify-end q-mt-sm">
                  <q-btn
                    color="primary"
                    label="댓글 작성"
                    size="sm"
                    @click="addComment"
                    :disable="!newComment.trim()"
                  />
                </div>
              </q-card-section>
            </div>
          </q-slide-transition>
        </q-card>

        <!-- 슬라이드 편집기 -->
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

        <!-- CSS 편집기 -->
        <q-card class="sidebar-card q-mt-md">
          <q-card-section>
            <h6 class="q-my-none">전역 CSS 편집기</h6>
            <div class="text-caption text-grey-6 q-mt-xs">
              {{
                currentSlideType === 'chapter'
                  ? 'Chapter 디자인을 커스터마이즈하세요'
                  : 'Obsidian처럼 전역 CSS 파일로 슬라이드 스타일을 관리하세요'
              }}
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <CSSEditor
              :key="`css-${currentLesson}-${currentSlide}`"
              :initial-css="currentSlideCSS"
              :slide-id="`${currentLesson}-${currentSlide}`"
              @css-change="handleCSSChange"
              @css-save="handleCSSSave"
              @css-reset="handleCSSReset"
              ref="cssEditor"
            />
          </q-card-section>
        </q-card>

        <!-- 파일 내보내기 -->
        <q-card class="sidebar-card q-mt-md">
          <q-card-section>
            <h6 class="q-my-none">
              {{
                currentSlideType === 'chapter' ? 'Chapter 파일 내보내기' : '슬라이드 파일 내보내기'
              }}
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
              :markdown-content="currentSlideContent"
              :css-content="currentSlideCSS"
              :html-content="currentSlideHTML"
              :current-lesson="currentLesson"
              :current-slide="currentSlide"
              :lesson-title="currentLessonData?.title || ''"
              :slide-type="currentSlideType"
              @export-success="handleExportSuccess"
              @export-error="handleExportError"
              ref="fileExporter"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from 'vue';
import { useCourseStore } from '../stores/course';
import SlideViewer from '../components/SlideViewer.vue';
import MarkdownEditor from '../components/MarkdownEditor.vue';
import CSSEditor from '../components/CSSEditor.vue';
import FileExporter from '../components/FileExporter.vue';
import { marked } from 'marked';

const courseStore = useCourseStore();

// 프리젠테이션 모드 상태
const isPresentationMode = computed(() => courseStore.isPresentationMode);

// 구분선 조절을 위한 상태
const slideViewerWidth = ref(70);
const isResizing = ref(false);

// 슬라이드 뷰어 ref
const slideViewerRef = ref();

// 마크다운 편집기 ref
const markdownEditorRef = ref();

// CSS 편집을 위한 상태
const currentSlideCSS = ref('');
const dynamicCSS = ref('');

// Chapter 번호 추출 함수
const getChapterNumber = (lessonIndex: number): string => {
  const lesson = courseStore.lessons[lessonIndex];
  if (lesson && lesson.title) {
    // "0. INTRO", "1. WHY" 등에서 숫자 부분만 추출
    const match = lesson.title.match(/^(\d+)\./);
    if (match && match[1]) {
      return match[1];
    }
  }
  // 매칭되지 않으면 인덱스 + 1 반환
  return String(lessonIndex + 1);
};

// Marp 스타일 파싱 함수 (IndexPage용)
const parseMarpStyleFromContent = (content: string): string => {
  const styleMatch = content.match(/---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)/);
  if (styleMatch && styleMatch[1]) {
    const frontMatter = styleMatch[1];

    // style: | 형식 파싱 (Marp 표준)
    const styleMatch2 = frontMatter.match(/style:\s*\|\s*\n([\s\S]*?)(?=\n[a-zA-Z]+:|$)/);
    if (styleMatch2 && styleMatch2[1]) {
      return styleMatch2[1].trim();
    }

    // style: 직접 형식 파싱
    const styleMatch3 = frontMatter.match(/style:\s*([\s\S]*?)(?=\n[a-zA-Z]+:|$)/);
    if (styleMatch3 && styleMatch3[1]) {
      return styleMatch3[1].trim();
    }

    // 다른 방법으로 시도
    const styleMatch4 = frontMatter.match(/style:\s*([\s\S]*)/);
    if (styleMatch4 && styleMatch4[1]) {
      return styleMatch4[1].trim();
    }
  }
  return '';
};

// 슬라이드별 특별한 CSS
const getSlideSpecificCSS = (lessonIndex: number, slideIndex: number) => {
  const slideKey = `${lessonIndex}-${slideIndex}`;

  switch (slideKey) {
    case '1-1':
      return `/* slide-1-1 특별 스타일 - 줄간격 50% 축소 */
.markdown-slide {
  line-height: 0.8 !important;
}

.markdown-slide h3 {
  line-height: 0.8 !important;
  margin-bottom: 0.25rem !important;
}

.markdown-slide h4 {
  line-height: 0.8 !important;
  margin-bottom: 0.25rem !important;
}

.markdown-slide p {
  line-height: 0.8 !important;
  margin-bottom: 0.5rem !important;
}`;

    default:
      return '';
  }
};

// 슬라이드 타입에 따른 기본 CSS
const getDefaultCSS = (slideType: string) => {
  switch (slideType) {
    case 'chapter':
      return `/* Chapter 스타일 */
.chapter-content {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
}

.chapter-title {
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.chapter-description {
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}`;

    default:
      return `/* 슬라이드 스타일 */
.slide-content {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
}

.slide-title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1976d2;
}

.slide-body {
  font-size: 1.1rem;
  color: #333;
}`;
  }
};

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

    // 편집기에 내용 설정
    if (markdownEditorRef.value) {
      markdownEditorRef.value.setContent(content);
    }

    // 뷰어도 즉시 업데이트
    if (slideViewerRef.value) {
      slideViewerRef.value.updateContent(content);
    }
  } catch (error) {
    console.error('MD 파일 내용 로드 실패:', error);
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
    const result = marked(currentSlideContent.value);
    return typeof result === 'string' ? result : currentSlideContent.value;
  } catch (error) {
    console.error('HTML 변환 오류:', error);
    return currentSlideContent.value;
  }
});

// 슬라이드 내용 저장
const handleSlideContentSave = async (content: string, slideId: string) => {
  saveSlideContent(content);

  // MD 파일 덮어쓰기
  try {
    const lesson = courseStore.lessons[courseStore.currentLesson];
    const componentKey = `${courseStore.currentLesson}-${courseStore.currentSlide}`;

    const success = await overwriteSlideContentToMD(componentKey, content);

    if (success) {
      // 성공 시에는 콘솔 로그만 남기고 팝업은 표시하지 않음
    } else {
      console.error('MD 파일 덮어쓰기 실패:', slideId);
      alert('❌ 저장 실패! 파일 생성에 실패했습니다.');
    }
  } catch (error) {
    console.error('MD 파일 저장 실패:', error);
    alert('❌ 저장 실패! 오류가 발생했습니다.');
  }

  console.log('슬라이드 내용 저장됨:', slideId, content);
};

// 슬라이드 내용 변경 (실시간 뷰어 업데이트만)
const handleSlideContentChange = async (content: string) => {
  // 슬라이드 내용 업데이트 (메모리만)
  saveSlideContent(content);

  // 슬라이드 뷰어 실시간 업데이트
  if (slideViewerRef.value) {
    slideViewerRef.value.updateContent(content);
  }

  console.log('슬라이드 내용 변경됨:', content);
};

// 슬라이드 미리보기
const handleSlidePreview = (content: string) => {
  // 미리보기 시 메인 슬라이드에 반영
  saveSlideContent(content);

  // 슬라이드 뷰어 업데이트
  if (slideViewerRef.value) {
    slideViewerRef.value.updateContent(content);
  }

  console.log('슬라이드 미리보기 반영됨:', content);
};

// 자동 업데이트 처리 (실시간 뷰어 업데이트만)
const handleAutoUpdate = (content: string, slideId: string) => {
  console.log('🎯 실시간 뷰어 업데이트 요청:', slideId);

  try {
    // 슬라이드 내용 업데이트 (메모리만)
    saveSlideContent(content);

    // 슬라이드 뷰어 실시간 업데이트
    if (slideViewerRef.value) {
      slideViewerRef.value.updateContent(content);
      console.log('🎯 슬라이드 뷰어 업데이트 완료');
    } else {
      console.log('❌ slideViewerRef가 없음');
    }

    console.log('🎯 실시간 뷰어 업데이트 완료');
  } catch (error) {
    console.error('❌ 실시간 뷰어 업데이트 오류:', error);
  }
};

// 마크다운 파일 생성
const handleCreateMarkdownFile = (content: string, slideId: string) => {
  console.log('🎯 마크다운 파일 생성 요청:', slideId);

  // 현재 슬라이드 정보로 컴포넌트 키 생성
  const lesson = courseStore.lessons[courseStore.currentLesson];
  const titleParts = lesson?.title.split('.');
  const lessonNumber = titleParts?.[0]?.trim() || '1';
  const componentKey = `${lessonNumber}-${courseStore.currentSlide}`;

  courseStore.createMarkdownFile(componentKey, content);
};

// CSS 변경 처리
const handleCSSChange = (css: string) => {
  dynamicCSS.value = css;
  applyDynamicCSS(css);
  console.log('CSS 변경됨:', css);
};

// 전역 CSS 파일 읽기
const loadGlobalCSS = async () => {
  try {
    // 개발 서버에서는 /src/css/slides.scss로 직접 접근할 수 없으므로
    // 하드코딩된 CSS 내용을 사용
    const globalCSS = `// 슬라이드별 전역 CSS 스타일 관리
// Obsidian처럼 CSS 파일로 관리하는 구조

// 기본 슬라이드 스타일
.slide-content {
  .markdown-slide {
    line-height: 1.2;
    margin-bottom: 0.5rem;

    h1, h2, h3, h4, h5, h6 {
      line-height: 1.2;
      margin-bottom: 0.5rem;
    }

    p {
      line-height: 1.2;
      margin-bottom: 0.5rem;
    }

    ul, ol {
      line-height: 1.2;
      margin-bottom: 0.5rem;

      li {
        line-height: 1.2;
        margin-bottom: 0.3rem;
      }
    }
  }
}

// slide-0-1 (목차) 전용 스타일
.slide-0-1 {
  .slide-content .markdown-slide {
    line-height: 0.7 !important;
    margin-bottom: 0.2rem !important;

    h3 {
      line-height: 0.7 !important;
      margin-bottom: 0.2rem !important;
    }

    h5 {
      line-height: 0.7 !important;
      margin-bottom: 0.15rem !important;
    }

    p {
      line-height: 0.7 !important;
      margin-bottom: 0.3rem !important;
    }

    ul, ol {
      line-height: 0.7 !important;
      margin-bottom: 0.3rem !important;

      li {
        line-height: 0.7 !important;
        margin-bottom: 0.15rem !important;
      }
    }
  }
}

// slide-1-1 전용 스타일
.slide-1-1 {
  .slide-content .markdown-slide {
    line-height: 0.8 !important;
    margin-bottom: 0.25rem !important;

    h3 {
      line-height: 0.8 !important;
      margin-bottom: 0.25rem !important;
    }

    h4 {
      line-height: 0.8 !important;
      margin-bottom: 0.25rem !important;
    }

    p {
      line-height: 0.8 !important;
      margin-bottom: 0.5rem !important;
    }

    ul, ol {
      line-height: 0.8 !important;
      margin-bottom: 0.5rem !important;

      li {
        line-height: 0.8 !important;
        margin-bottom: 0.25rem !important;
      }
    }
  }
}

// 추가 슬라이드별 스타일을 여기에 정의
// .slide-{chapter}-{slide} 형식으로 클래스명 사용`;

    currentSlideCSS.value = globalCSS;
    console.log('전역 CSS 파일 로드됨');
  } catch (error) {
    console.error('전역 CSS 파일 로드 실패:', error);
    currentSlideCSS.value = '// 전역 CSS 파일 로드 실패';
  }
};

// CSS 저장 (전역 CSS 파일에 저장)
const handleCSSSave = async (css: string) => {
  currentSlideCSS.value = css;

  try {
    // 전역 CSS 파일에 저장 (실제로는 서버 API가 필요하지만, 여기서는 다운로드로 대체)
    const blob = new Blob([css], { type: 'text/scss' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'slides.scss';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log('전역 CSS 파일이 다운로드되었습니다.');
    alert(
      '전역 CSS 파일이 다운로드되었습니다!\n\n파일명: slides.scss\n저장 위치: src/css/slides.scss\n\n다운로드된 파일을 src/css/slides.scss에 교체한 후 개발 서버를 재시작하세요.',
    );
  } catch (error) {
    console.error('전역 CSS 파일 저장 실패:', error);
    alert('전역 CSS 파일 저장에 실패했습니다.');
  }
};

// CSS 초기화 (전역 CSS 로드)
const handleCSSReset = async () => {
  await loadGlobalCSS();
  console.log('전역 CSS 로드됨');
};

// 동적 CSS 적용
const applyDynamicCSS = (css: string) => {
  if (!css.trim()) {
    removeDynamicCSS();
    return;
  }

  let styleElement = document.getElementById('dynamic-slide-css');
  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = 'dynamic-slide-css';
    document.head.appendChild(styleElement);
  }
  styleElement.textContent = css;
};

// 동적 CSS 제거
const removeDynamicCSS = () => {
  const styleElement = document.getElementById('dynamic-slide-css');
  if (styleElement) {
    styleElement.remove();
  }
};

// 파일 내보내기 성공 처리
const handleExportSuccess = (type: string, filename: string) => {
  console.log(`${type} 파일 내보내기 성공:`, filename);
  // 여기에 성공 알림을 추가할 수 있습니다
};

// 파일 내보내기 오류 처리
const handleExportError = (type: string, error: string) => {
  console.error(`${type} 파일 내보내기 오류:`, error);
  // 여기에 오류 알림을 추가할 수 있습니다
};

// 구분선 조절 메서드들
const startResize = (event: MouseEvent) => {
  isResizing.value = true;
  document.addEventListener('mousemove', handleResize);
  document.addEventListener('mouseup', stopResize);
  event.preventDefault();
};

const handleResize = (event: MouseEvent) => {
  if (!isResizing.value) return;

  const container = document.querySelector('.main-layout') as HTMLElement;
  if (!container) return;

  const containerRect = container.getBoundingClientRect();
  const newWidth = ((event.clientX - containerRect.left) / containerRect.width) * 100;

  // 최소 30%, 최대 80%로 제한
  slideViewerWidth.value = Math.max(30, Math.min(80, newWidth));
};

const stopResize = () => {
  isResizing.value = false;
  document.removeEventListener('mousemove', handleResize);
  document.removeEventListener('mouseup', stopResize);
};

// 슬라이드 타입 변경 시 기본 CSS 로드
watch(currentSlideType, (newType) => {
  if (newType) {
    currentSlideCSS.value = getDefaultCSS(newType);
  }
});

// 슬라이드 변경 시 CSS 업데이트
watch([() => courseStore.currentLesson, () => courseStore.currentSlide], async () => {
  const newType = getCurrentSlideType();

  // 현재 슬라이드 내용에서 Marp 스타일 추출
  const slideContent = await courseStore.loadSlideContentForEditing(
    courseStore.currentLesson,
    courseStore.currentSlide,
  );

  if (slideContent) {
    const marpStyle = parseMarpStyleFromContent(slideContent);

    if (marpStyle) {
      // Marp 스타일이 있으면 적용
      currentSlideCSS.value = marpStyle;
      dynamicCSS.value = marpStyle;
    } else {
      // Marp 스타일이 없으면 슬라이드별 특별한 CSS 확인
      const slideSpecificCSS = getSlideSpecificCSS(
        courseStore.currentLesson,
        courseStore.currentSlide,
      );

      if (slideSpecificCSS) {
        // 슬라이드별 특별한 CSS가 있으면 적용
        currentSlideCSS.value = slideSpecificCSS;
        dynamicCSS.value = slideSpecificCSS;
      } else {
        // 기본 CSS 적용
        currentSlideCSS.value = getDefaultCSS(newType);
        dynamicCSS.value = '';
      }
    }
  } else {
    // 기본 CSS 적용
    currentSlideCSS.value = getDefaultCSS(newType);
    dynamicCSS.value = '';
  }
});

// 컴포넌트 마운트/언마운트 시 이벤트 리스너 정리
onMounted(async () => {
  // 개발 모드에서 Local Storage 클리어 (필요시)
  if (import.meta.env.DEV) {
    // courseStore.clearLocalStorage();
  }

  // Local Storage에서 데이터 불러오기
  courseStore.loadFromLocalStorage();

  // 강의 목차 로드
  await courseStore.loadCourseOutline();

  // 초기 슬라이드 내용 로드
  await loadSlideContentFromMD();

  // 전역 CSS 로드
  await loadGlobalCSS();
});

// 슬라이드 변경 시 MD 파일에서 내용 로드
watch(
  [() => courseStore.currentLesson, () => courseStore.currentSlide],
  async (newValues, oldValues) => {
    // 슬라이드 변경 시 편집기와 뷰어 업데이트
    await loadSlideContentFromMD();
  },
);

// 슬라이드 네비게이션 알림 처리
const handleSlideNavigation = (direction: 'next' | 'prev') => {
  const lessonData = courseStore.currentLessonData;
  if (!lessonData) return;

  const currentSlide = courseStore.currentSlide;
  const currentLesson = courseStore.currentLesson;
  const totalSlides = lessonData.slides;
  const totalLessons = courseStore.lessons.length;

  if (direction === 'next') {
    if (currentSlide >= totalSlides - 1) {
      // 현재 Chapter의 마지막 슬라이드에서 다음 버튼 클릭
      if (currentLesson >= totalLessons - 1) {
        // 마지막 Chapter의 마지막 슬라이드
        alert('🎯 마지막 슬라이드입니다!\n\n모든 강의의 마지막 슬라이드입니다.');
      } else {
        // 다음 Chapter로 이동 가능
        console.log('🔄 다음 Chapter로 이동 예정');
      }
    }
  } else if (direction === 'prev') {
    if (currentSlide <= 0) {
      // 현재 Chapter의 첫 번째 슬라이드에서 이전 버튼 클릭
      if (currentLesson <= 0) {
        // 첫 번째 Chapter의 첫 번째 슬라이드
        alert('🎯 첫 번째 슬라이드입니다!\n\n강의의 시작 부분입니다.');
      } else {
        // 이전 Chapter로 이동 가능
        console.log('🔄 이전 Chapter로 이동 예정');
      }
    }
  }
};

onUnmounted(() => {
  document.removeEventListener('mousemove', handleResize);
  document.removeEventListener('mouseup', stopResize);
  removeDynamicCSS();
});
</script>

<style scoped>
.main-layout {
  display: flex;
  height: 100vh;
  position: relative;
}

.slide-viewer-container {
  min-height: 100vh;
  min-width: 30%;
  max-width: 80%;
  background: #f5f5f5; /* bg-grey-2에 해당하는 색상 */
}

.slide-container {
  min-height: 100vh;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  background: #f5f5f5; /* bg-grey-2에 해당하는 색상 */
}

.resize-handle {
  width: 6px;
  background-color: #e0e0e0;
  cursor: col-resize;
  position: relative;
  transition: background-color 0.2s;
}

.resize-handle:hover {
  background-color: #1976d2;
}

.resize-handle::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2px;
  height: 20px;
  background-color: #999;
  border-radius: 1px;
}

.sidebar-container {
  min-height: 100vh;
  padding: 0.5rem;
  overflow-y: auto;
  min-width: 20%;
}

.sidebar-card {
  margin-bottom: 1rem;
}

.slide-viewer {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: flex-start;
  min-height: 0;
  background: #f5f5f5; /* bg-grey-2에 해당하는 색상 */
}

.slide-controls {
  flex-shrink: 0;
  border-top: 1px solid #e0e0e0;
  padding: 0.25rem 1rem;
  background: #f5f5f5; /* bg-grey-2에 해당하는 색상 */
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
}

.slide-notes {
  flex-shrink: 0;
  border-top: 1px solid #e0e0e0;
  padding: 1rem;
  background: #f5f5f5; /* bg-grey-2에 해당하는 색상 */
  min-height: 120px;
  max-height: 200px;
  overflow-y: auto;
}

.notes-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: #666;
  font-size: 0.9rem;
  position: sticky;
  top: 0;
  background: #f8f9fa;
  z-index: 10;
  padding-bottom: 0.5rem;
}

.notes-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  padding-bottom: 0.5rem;
}

.notes-section {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.section-content {
  font-size: 0.8rem;
  color: #666;
  line-height: 1.4;
}

.source-list,
.resource-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.source-list li,
.resource-list li {
  padding: 0.25rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.source-list li:last-child,
.resource-list li:last-child {
  border-bottom: none;
}

.resource-link {
  color: #1976d2;
  text-decoration: none;
}

.resource-link:hover {
  text-decoration: underline;
}

.comments-section {
  max-height: 300px;
  overflow-y: auto;
}

.comment-item {
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.comment-item:last-child {
  border-bottom: none;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
}

.comment-author {
  font-weight: 600;
  font-size: 0.9rem;
  color: #333;
}

.comment-time {
  font-size: 0.8rem;
  color: #666;
}

.comment-content {
  font-size: 0.9rem;
  color: #333;
  line-height: 1.4;
  margin-bottom: 0.5rem;
}

.comment-actions {
  display: flex;
  align-items: center;
}

.video-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.video-disabled:hover {
  opacity: 0.5;
}

/* 현재 슬라이드 정보 섹션 스타일 */
.current-slide-info-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-bottom: 1px solid #dee2e6;
  margin-bottom: 0.5rem;
}

.current-slide-info-section .text-subtitle2 {
  color: #1976d2;
  font-weight: 600;
}

.current-slide-info-section .text-caption {
  color: #6c757d;
}

.current-slide-info-section .q-chip {
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(25, 118, 210, 0.2);
}

/* 슬라이드 좌우 화살표 버튼 스타일 */
.slide-nav-btn {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  border: none;
  width: 60px;
  height: 60px;
}

.slide-nav-btn .q-icon {
  font-size: 2rem;
  font-weight: bold;
  color: #e91e63;
  text-shadow: 0 0 10px rgba(233, 30, 99, 0.5);
}

.slide-nav-btn:hover {
  background: rgba(0, 0, 0, 0.9);
  transform: translateY(-50%) scale(1.1);
  transition: all 0.2s ease;
}

.slide-nav-btn:hover .q-icon {
  color: #f06292;
  text-shadow: 0 0 15px rgba(240, 98, 146, 0.7);
}

.slide-nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.slide-nav-btn:disabled .q-icon {
  color: #666;
  text-shadow: none;
}

.slide-nav-left {
  left: 20px;
}

.slide-nav-right {
  right: 20px;
}
</style>
