<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> 📖 목회 현장에서 만나는 12가지 AI 활용 시나리오 </q-toolbar-title>

        <!-- 공유 버튼 -->
        <q-btn
          flat
          round
          dense
          icon="share"
          color="white"
          @click="shareWithStudents"
          class="q-mr-xs"
        >
          <q-tooltip>수강생과 공유</q-tooltip>
        </q-btn>

        <!-- 프리젠테이션 모드 버튼 -->
        <q-btn
          flat
          round
          dense
          icon="slideshow"
          :color="isPresentationMode ? 'orange' : 'white'"
          @click="togglePresentationMode"
          class="q-mr-xs"
        >
          <q-tooltip>{{
            isPresentationMode ? '프리젠테이션 모드 해제' : '프리젠테이션 모드'
          }}</q-tooltip>
        </q-btn>

        <!-- 전체화면 버튼 -->
        <q-btn
          flat
          round
          dense
          icon="fullscreen"
          color="white"
          @click="toggleFullscreen"
          class="q-mr-xs"
        >
          <q-tooltip>전체화면</q-tooltip>
        </q-btn>

        <!-- 다운로드 버튼 -->
        <q-btn
          flat
          round
          dense
          icon="download"
          color="white"
          @click="handleDownloadSlide"
          class="q-mr-xs"
        >
          <q-tooltip>슬라이드 다운로드</q-tooltip>
        </q-btn>

        <!-- 캡처 버튼 -->
        <q-btn
          flat
          round
          dense
          icon="camera_alt"
          color="white"
          @click="handleCaptureSlide"
          class="q-mr-xs"
        >
          <q-tooltip>화면 캡처</q-tooltip>
        </q-btn>

        <!-- 이메일 버튼 -->
        <q-btn
          flat
          round
          dense
          icon="email"
          color="white"
          @click="handleSendNotesByEmail"
          class="q-mr-xs"
        >
          <q-tooltip>이메일 전송</q-tooltip>
        </q-btn>

        <div class="text-caption q-mr-md">
          슬라이드 {{ currentSlide + 1 }} / {{ currentLessonData?.slides || 0 }}
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-1"
      :persistent="isPresentationMode"
    >
      <q-scroll-area class="fit">
        <div class="q-pa-md">
          <!-- 진도율 -->
          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">학습 진도</div>
            <q-linear-progress :value="progress / 100" color="primary" class="q-mb-xs" />
            <div class="text-caption text-grey-7">{{ progress }}%</div>
          </div>

          <!-- 강의 목록 -->
          <div class="q-mb-md">
            <div class="row items-center justify-between q-mb-sm">
              <div class="text-subtitle2">강의 목차</div>
              <div class="row items-center">
                <q-btn
                  flat
                  round
                  dense
                  size="sm"
                  icon="add"
                  color="primary"
                  class="q-mr-xs"
                  @click="createChapterFile"
                  title="Chapter 컴포넌트 파일 생성"
                />

                <q-btn
                  flat
                  dense
                  size="sm"
                  icon="refresh"
                  color="blue"
                  label="클리어"
                  @click="clearLocalStorage"
                  title="Local Storage 클리어"
                />
              </div>
            </div>
            <q-list padding>
              <q-expansion-item
                v-for="(lesson, index) in lessons"
                :key="index"
                :default-opened="index === currentLesson"
                :class="{
                  'bg-blue-1': index === currentLesson,
                  'locked-chapter': isChapterLocked(index),
                }"
                @click="setCurrentLesson(index)"
              >
                <template v-slot:header>
                  <div class="row items-center justify-between full-width">
                    <div class="row items-center">
                      <div>
                        <div class="text-weight-medium text-primary">
                          {{ getChapterTitle(index) }}
                        </div>
                        <div class="text-caption text-grey-6">{{ lesson.slides }}개 슬라이드</div>
                      </div>
                    </div>
                    <div class="row items-center">
                      <!-- Chapter 잠금 버튼 -->
                      <q-btn
                        flat
                        round
                        dense
                        size="xs"
                        :icon="isChapterLocked(index) ? 'lock' : 'lock_open'"
                        :color="isChapterLocked(index) ? 'red' : 'grey'"
                        class="q-mr-xs"
                        @click.stop="toggleChapterLock(index)"
                        :title="isChapterLocked(index) ? 'Chapter 잠금 해제' : 'Chapter 잠금'"
                      />
                      <q-btn
                        flat
                        round
                        dense
                        size="xs"
                        icon="add"
                        color="green"
                        class="q-mr-xs"
                        @click.stop="addSlideToChapter(index)"
                        title="슬라이드 추가"
                      />
                    </div>
                  </div>
                </template>
                <q-list padding>
                  <q-item
                    v-for="slideIndex in [...Array(lesson.slides).keys()]"
                    :key="`lesson-${index}-slide-${slideIndex}`"
                    v-show="slideIndex > 0"
                    clickable
                    v-ripple
                    :active="index === currentLesson && slideIndex === currentSlide"
                    :class="{
                      'q-pl-lg slide-item': true,
                      'locked-slide': isSlideLocked(index, slideIndex),
                    }"
                    @click="selectSlide(index, slideIndex)"
                  >
                    <q-item-section>
                      <q-item-label class="text-caption text-grey-8">
                        {{ getChapterNumber(index) }}-{{ slideIndex }}
                        {{ getSlideTitle(index, slideIndex) }}
                      </q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <!-- 슬라이드 잠금 버튼 -->
                      <q-btn
                        flat
                        round
                        dense
                        size="xs"
                        :icon="isSlideLocked(index, slideIndex) ? 'lock' : 'lock_open'"
                        :color="isSlideLocked(index, slideIndex) ? 'red' : 'grey'"
                        @click.stop="toggleSlideLock(index, slideIndex)"
                        :title="
                          isSlideLocked(index, slideIndex) ? '슬라이드 잠금 해제' : '슬라이드 잠금'
                        "
                      />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-expansion-item>
            </q-list>
          </div>

          <!-- 현재 강의 정보 -->
          <q-separator class="q-my-md" />
          <div class="text-caption text-grey-7 q-mb-xs">현재 강의</div>
          <div class="text-body2 q-mb-xs">
            {{ currentLessonData?.title || '강의를 선택해주세요' }}
          </div>
          <div class="text-caption text-grey-7">
            슬라이드 {{ currentSlide + 1 }} / {{ currentLessonData?.slides || 0 }}
          </div>

          <!-- 목차 UPDATE 버튼 -->
          <q-separator class="q-my-md" />
          <div class="text-center">
            <q-btn
              color="primary"
              icon="refresh"
              label="목차 UPDATE"
              @click="updateCourseOutline"
              class="full-width"
              :disable="isUpdating"
              :loading="isUpdating"
            >
              <q-tooltip>MD 파일을 기반으로 목차를 새롭게 생성합니다</q-tooltip>
            </q-btn>
          </div>
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- 공유 팝업 다이얼로그 -->
    <q-dialog v-model="showShareDialog" persistent>
      <q-card style="min-width: 500px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">🎓 수강생과 공유</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-body2 q-mb-md">아래 링크를 수강생들에게 공유하세요.</div>

          <!-- 공유 URL 표시 -->
          <div class="q-mb-md">
            <div class="text-caption text-grey-7 q-mb-xs">공유 링크:</div>
            <q-input
              v-model="shareUrl"
              readonly
              outlined
              dense
              class="share-url-input"
              @click="$event.target.select()"
            >
              <template v-slot:append>
                <q-btn
                  flat
                  round
                  dense
                  :icon="copySuccess ? 'check' : 'content_copy'"
                  :color="copySuccess ? 'positive' : 'primary'"
                  :class="{ 'copy-success': copySuccess }"
                  @click="copyShareLink"
                  :title="copySuccess ? '복사 완료!' : '링크 복사'"
                />
              </template>
            </q-input>
          </div>

          <!-- 잠긴 항목 정보 -->
          <div
            v-if="shareLockInfo.lockedChapters.length > 0 || shareLockInfo.lockedSlides.length > 0"
            class="q-mb-md"
          >
            <div class="text-caption text-grey-7 q-mb-xs">🔒 잠긴 항목:</div>
            <div class="text-body2">
              <div v-if="shareLockInfo.lockedChapters.length > 0" class="q-mb-xs">
                • Chapter: {{ shareLockInfo.lockedChapters.length }}개
              </div>
              <div v-if="shareLockInfo.lockedSlides.length > 0">
                • 슬라이드: {{ shareLockInfo.lockedSlides.length }}개
              </div>
            </div>
          </div>

          <!-- 복사 성공 메시지 -->
          <div v-if="copySuccess" class="text-positive text-caption q-mt-sm">
            ✅ 링크가 클립보드에 복사되었습니다!
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="닫기" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, ref, reactive, onMounted } from 'vue';
import { useCourseStore } from 'src/stores/course';
import html2canvas from 'html2canvas';

const courseStore = useCourseStore();

// Computed properties
const leftDrawerOpen = computed({
  get: () => (isPresentationMode.value ? true : courseStore.sidebarOpen),
  set: () => courseStore.toggleSidebar(),
});

const currentLesson = computed(() => courseStore.currentLesson);
const currentSlide = computed(() => courseStore.currentSlide);
const currentLessonData = computed(() => courseStore.currentLessonData);
const lessons = computed(() => courseStore.lessons);
const progress = computed(() => courseStore.progress);
const isPresentationMode = computed(() => courseStore.isPresentationMode);

// 슬라이드 제목을 저장할 반응형 데이터
const slideTitles = reactive<{ [key: string]: string }>({});

// Chapter 제목을 저장할 반응형 데이터
const chapterTitles = reactive<{ [key: number]: string }>({});

// 목차 업데이트 상태
const isUpdating = ref(false);

// 공유 팝업 상태
const showShareDialog = ref(false);
const shareUrl = ref('');
const shareLockInfo = ref({
  lockedChapters: [] as number[],
  lockedSlides: [] as string[],
});
const copySuccess = ref(false);

// Methods
const toggleLeftDrawer = () => {
  courseStore.toggleSidebar();
};

const setCurrentLesson = (index: number) => {
  console.log('🎯 Chapter 선택:', {
    강의인덱스: index,
    강의제목: lessons.value[index]?.title,
  });

  // 잠긴 Chapter인지 확인
  if (courseStore.isChapterLocked(index)) {
    console.log('🔒 잠긴 Chapter로 이동 시도:', index);
    alert('🔒 이 Chapter는 잠겨있어서 학생들에게 공유되지 않습니다.');
    return;
  }

  courseStore.setCurrentLesson(index);
  // Chapter를 클릭하면 첫 번째 슬라이드(슬라이드 0)를 자동으로 선택
  courseStore.setCurrentSlide(0);
};

// 슬라이드 번호를 ➀, ➁, ➂ 형태로 변환
const getSlideNumber = (index: number) => {
  const numbers = ['➀', '➁', '➂', '➃', '➄', '➅', '➆', '➇', '➈', '➉'];
  return numbers[index] || (index + 1).toString();
};

// 슬라이드 번호를 1-1, 1-2 형태로 생성
const getSlideNumberWithLesson = (lessonIndex: number, slideIndex: number) => {
  return `${lessonIndex}-${slideIndex + 1}`;
};

// 챕터 번호 추출
const getChapterNumber = (lessonIndex: number): string => {
  const lesson = lessons.value[lessonIndex];
  if (lesson?.title) {
    const match = lesson.title.match(/^(\d+)\./);
    if (match?.[1]) {
      return match[1];
    }
  }
  return String(lessonIndex);
};

const selectSlide = async (lessonIndex: number, slideIndex: number) => {
  const lesson = lessons.value[lessonIndex];
  const lessonTitle = lesson?.title;

  console.log('🎯 슬라이드 선택:', {
    강의인덱스: lessonIndex,
    슬라이드인덱스: slideIndex,
    강의제목: lessonTitle,
    슬라이드제목: lesson?.slideTitles?.[slideIndex],
  });

  // 잠긴 슬라이드인지 확인
  if (courseStore.isSlideLocked(lessonIndex, slideIndex)) {
    console.log('🔒 잠긴 슬라이드로 이동 시도:', `${lessonIndex}-${slideIndex}`);
    alert('🔒 이 슬라이드는 잠겨있어서 학생들에게 공유되지 않습니다.');
    return;
  }

  // 현재 슬라이드 설정
  console.log('🔄 Store 업데이트 시작...');
  courseStore.setCurrentLesson(lessonIndex);
  courseStore.setCurrentSlide(slideIndex);
  console.log('✅ Store 업데이트 완료:', {
    currentLesson: courseStore.currentLesson,
    currentSlide: courseStore.currentSlide,
  });

  // MD 파일 내용 로드 (store에만 저장, 편집기는 watch에서 처리)
  try {
    const content = await courseStore.loadSlideContentForEditing(lessonIndex, slideIndex);
    console.log('✅ Store에 MD 파일 내용 저장 완료:', {
      contentLength: content.length,
      contentPreview: content.substring(0, 100),
    });
  } catch (error) {
    console.error('❌ MD 파일 로드 실패:', error);
  }
};

// 목차 UPDATE 함수
const updateCourseOutline = async () => {
  try {
    isUpdating.value = true;
    console.log('🔄 목차 UPDATE 시작...');

    await courseStore.initializeCourseOutline();

    console.log('✅ 목차 UPDATE 완료');

    // 목차 리프레시 - 캐시된 제목들 초기화
    console.log('🔄 목차 리프레시 시작...');
    Object.keys(slideTitles).forEach((key: string) => delete slideTitles[key]);
    Object.keys(chapterTitles).forEach((key: string) => {
      const numKey = parseInt(key);
      if (!isNaN(numKey)) {
        delete chapterTitles[numKey];
      }
    });

    console.log('✅ 목차 리프레시 완료');
  } catch (error) {
    console.error('❌ 목차 UPDATE 실패:', error);
  } finally {
    isUpdating.value = false;
  }
};

// 잠금 관련 함수들
const toggleChapterLock = (lessonIndex: number) => {
  courseStore.toggleChapterLock(lessonIndex);
};

const toggleSlideLock = (lessonIndex: number, slideIndex: number) => {
  courseStore.toggleSlideLock(lessonIndex, slideIndex);
};

const isChapterLocked = (lessonIndex: number): boolean => {
  return courseStore.isChapterLocked(lessonIndex);
};

const isSlideLocked = (lessonIndex: number, slideIndex: number): boolean => {
  return courseStore.isSlideLocked(lessonIndex, slideIndex);
};

// 화면캡처 기능
const handleCaptureSlide = async () => {
  try {
    console.log('📸 화면캡처 시작...');

    // 슬라이드 뷰어 요소 찾기
    const slideViewer = document.querySelector('.slide-viewer');
    if (!slideViewer) {
      alert('❌ 슬라이드 뷰어를 찾을 수 없습니다.');
      return;
    }

    // 캡처 옵션 설정
    const options = {
      backgroundColor: '#000000', // 블랙 배경
      scale: 2, // 고해상도
      useCORS: true, // 외부 이미지 허용
      allowTaint: true, // 외부 리소스 허용
      logging: false, // 로그 비활성화
      width: slideViewer.scrollWidth,
      height: slideViewer.scrollHeight,
    };

    console.log('📸 캡처 옵션:', options);

    // 화면 캡처 실행
    const canvas = await html2canvas(slideViewer as HTMLElement, options);

    // 캔버스를 이미지로 변환
    const imageData = canvas.toDataURL('image/png', 1.0);

    // 파일명 생성
    const lessonTitle = currentLessonData.value?.title || 'slide';
    const slideNumber = currentSlide.value + 1;
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const filename = `${lessonTitle}_slide-${slideNumber}_${timestamp}.png`;

    console.log('📸 파일명:', filename);

    // 다운로드 링크 생성
    const link = document.createElement('a');
    link.download = filename;
    link.href = imageData;

    // 다운로드 실행
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log('✅ 화면캡처 완료:', filename);
    alert(`📸 화면캡처가 완료되었습니다!\n\n파일명: ${filename}`);
  } catch (error) {
    console.error('❌ 화면캡처 실패:', error);
    alert('❌ 화면캡처에 실패했습니다.\n\n오류: ' + error);
  }
};

const handleSendNotesByEmail = () => {
  courseStore.handleSendNotesByEmail();
};

// 공유 기능
const shareWithStudents = () => {
  const studentUrl = `${window.location.origin}/study`;

  // 잠긴 슬라이드 정보 수집
  const lockedInfo = {
    lockedChapters: [] as number[],
    lockedSlides: [] as string[],
  };

  lessons.value.forEach((lesson, lessonIndex) => {
    if (courseStore.isChapterLocked(lessonIndex)) {
      lockedInfo.lockedChapters.push(lessonIndex);
    } else {
      // Chapter가 잠기지 않은 경우에만 개별 슬라이드 잠금 확인
      for (let slideIndex = 0; slideIndex < lesson.slides; slideIndex++) {
        if (courseStore.isSlideLocked(lessonIndex, slideIndex)) {
          lockedInfo.lockedSlides.push(`${lessonIndex}-${slideIndex}`);
        }
      }
    }
  });

  // 잠금 정보를 URL 파라미터로 추가
  const params = new URLSearchParams();
  if (lockedInfo.lockedChapters.length > 0) {
    params.set('lockedChapters', lockedInfo.lockedChapters.join(','));
  }
  if (lockedInfo.lockedSlides.length > 0) {
    params.set('lockedSlides', lockedInfo.lockedSlides.join(','));
  }

  const finalUrl = params.toString() ? `${studentUrl}?${params.toString()}` : studentUrl;

  // 팝업 다이얼로그에 정보 설정
  shareUrl.value = finalUrl;
  shareLockInfo.value = lockedInfo;
  copySuccess.value = false;
  showShareDialog.value = true;
};

// 링크 복사 함수
const copyShareLink = async () => {
  try {
    await navigator.clipboard.writeText(shareUrl.value);
    copySuccess.value = true;

    // 3초 후 성공 상태 초기화
    setTimeout(() => {
      copySuccess.value = false;
    }, 3000);

    console.log('✅ 링크 복사 성공:', shareUrl.value);
  } catch (error) {
    console.error('❌ 링크 복사 실패:', error);
    alert('❌ 링크 복사에 실패했습니다. 수동으로 복사해주세요.');
  }
};

// 프리젠테이션 모드 토글
const togglePresentationMode = () => {
  courseStore.togglePresentationMode();
};

// 전체화면 토글
const toggleFullscreen = () => {
  const slideViewer = document.querySelector('.slide-viewer');
  if (slideViewer) {
    if (!document.fullscreenElement) {
      slideViewer.requestFullscreen().catch((err) => {
        console.log('전체화면 전환 실패:', err);
      });
    } else {
      document.exitFullscreen();
    }
  }
};

// 슬라이드 다운로드
const handleDownloadSlide = () => {
  courseStore.handleCaptureSlide();
};

const createChapterFile = () => {
  courseStore.createChapterFile(currentLesson.value);
};

const clearLocalStorage = async () => {
  await courseStore.clearLocalStorage();
  await courseStore.clearLockStatus();
  window.location.reload();
};

// MD 파일에서 슬라이드 제목을 읽어오는 함수
const getSlideTitleFromMD = async (lessonIndex: number, slideIndex: number): Promise<string> => {
  try {
    const lesson = lessons.value[lessonIndex];
    if (!lesson) return '[제목없음]';

    // 실제 lessonIndex와 slideIndex를 사용하여 componentKey 생성
    const componentKey = `${lessonIndex}-${slideIndex}`;

    // 이미 캐시된 제목이 있으면 반환
    const cacheKey = `${lessonIndex}-${slideIndex}`;
    if (slideTitles[cacheKey]) {
      return slideTitles[cacheKey];
    }

    const title = await courseStore.getSlideTitleFromMD(componentKey);
    slideTitles[cacheKey] = title;
    return title;
  } catch (error) {
    console.error('슬라이드 제목 읽기 실패:', error);
    return '[제목없음]';
  }
};

// 슬라이드 제목을 가져오는 함수 (동기 버전)
const getSlideTitle = (lessonIndex: number, slideIndex: number): string => {
  const cacheKey = `${lessonIndex}-${slideIndex}`;
  const lesson = lessons.value[lessonIndex];

  // 캐시된 제목이 있으면 사용
  if (slideTitles[cacheKey]) {
    return slideTitles[cacheKey];
  }

  // lesson의 slideTitles에서 가져오기
  if (lesson?.slideTitles?.[slideIndex]) {
    return lesson.slideTitles[slideIndex];
  }

  // fallback: 슬라이드 번호 (1-based)
  return `슬라이드 ${slideIndex + 1}`;
};

// Chapter 제목을 MD 파일에서 읽어오는 함수
const getChapterTitleFromMD = async (lessonIndex: number): Promise<string> => {
  try {
    // 이미 캐시된 제목이 있으면 반환
    if (chapterTitles[lessonIndex]) {
      return chapterTitles[lessonIndex];
    }

    const title = await courseStore.getChapterTitleFromMD(lessonIndex);
    chapterTitles[lessonIndex] = title;
    return title;
  } catch (error) {
    console.error('Chapter 제목 읽기 실패:', error);
    return '[제목없음]';
  }
};

// Chapter에 슬라이드 추가하는 함수
const addSlideToChapter = async (lessonIndex: number) => {
  try {
    console.log(`📝 Chapter ${lessonIndex}에 슬라이드 추가 중...`);

    // courseStore의 addSlideToLesson 함수 호출
    await courseStore.addSlideToLesson(lessonIndex);

    console.log(`✅ Chapter ${lessonIndex}에 슬라이드 추가 완료`);

    // 새로운 슬라이드의 제목 로드
    const lesson = lessons.value[lessonIndex];
    if (lesson) {
      await getSlideTitleFromMD(lessonIndex, lesson.slides - 1);
    }
  } catch (error) {
    console.error(`❌ Chapter ${lessonIndex}에 슬라이드 추가 실패:`, error);
  }
};

// Chapter 제목을 가져오는 함수 (동기 버전)
const getChapterTitle = (lessonIndex: number): string => {
  const lesson = lessons.value[lessonIndex];
  return chapterTitles[lessonIndex] || lesson?.title || '[제목없음]';
};

// 모든 슬라이드의 제목을 미리 로드
const loadAllSlideTitles = async () => {
  for (let lessonIndex = 0; lessonIndex < lessons.value.length; lessonIndex++) {
    const lesson = lessons.value[lessonIndex];
    if (lesson) {
      // Chapter 제목도 함께 로드
      await getChapterTitleFromMD(lessonIndex);

      for (let slideIndex = 0; slideIndex < lesson.slides; slideIndex++) {
        await getSlideTitleFromMD(lessonIndex, slideIndex);
      }
    }
  }
};

// 컴포넌트 마운트 시 제목 로드
onMounted(() => {
  loadAllSlideTitles();
});
</script>

<style scoped>
/* 선택된 강의 스타일 */
.bg-blue-1 {
  background-color: #e3f2fd !important;
  border-left: 4px solid #1976d2;
}

/* 잠긴 Chapter 스타일 */
.locked-chapter {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none; /* 클릭 이벤트 방지 */
}

/* 강의 제목 스타일 */
.q-expansion-item__header .q-expansion-item__header-content .q-item__section--main .q-item__label {
  font-size: 1.1rem !important;
  font-weight: 600 !important;
  line-height: 1.4 !important;
}

/* 슬라이드 항목 스타일 */
.slide-item {
  border-left: 2px solid #e0e0e0;
  margin-left: 8px;
}

.slide-item:hover {
  background-color: #f5f5f5;
}

/* 강의 제목과 슬라이드 제목 구분 */
.text-primary {
  color: #1976d2 !important;
}

.text-grey-8 {
  color: #666 !important;
}

/* 줄간격 줄이기 */
.q-expansion-item {
  margin-bottom: 2px !important;
}

.q-expansion-item__header {
  min-height: 40px !important;
  padding: 4px 8px !important;
}

.q-item {
  min-height: 32px !important;
  padding: 4px 8px !important;
}

.slide-item {
  min-height: 28px !important;
  padding: 2px 8px !important;
}

/* 강의 제목과 슬라이드 개수 텍스트 줄간격 */
.q-expansion-item__header .q-item__section--main .q-item__label {
  line-height: 1.2 !important;
}

.q-expansion-item__header .q-item__section--main .q-item__label + .text-caption {
  line-height: 1.1 !important;
  margin-top: 2px !important;
}

/* 슬라이드 제목 줄간격 */
.slide-item .q-item__label {
  line-height: 1.2 !important;
  padding: 2px 0 !important;
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

/* q-toolbar 버튼 스타일 */
.q-toolbar .q-btn {
  opacity: 1 !important;
  color: white !important;
}

.q-toolbar .q-btn:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  transform: scale(1.1);
  transition: all 0.2s ease;
}

.q-toolbar .q-btn:disabled {
  opacity: 0.5 !important;
}

/* 슬라이드 좌우 화살표 버튼 스타일 */
.slide-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border: 2px solid #f44336;
}

.slide-nav-btn:hover {
  background: rgba(255, 255, 255, 1);
  transform: translateY(-50%) scale(1.1);
  transition: all 0.2s ease;
}

.slide-nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.slide-nav-left {
  left: 20px;
}

.slide-nav-right {
  right: 20px;
}

/* 중앙 슬라이드 정보 스타일 */
.current-slide-info-center {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  z-index: 1000;
}
</style>
