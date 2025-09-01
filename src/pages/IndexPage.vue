<template>
  <q-page class="index-page">
    <!-- 배경 이미지 -->
    <div class="login-background"></div>
    <!-- 메인 콘텐츠 -->
    <div class="main-content">
      <!-- 슬라이드 뷰어 영역 -->
      <div
        class="slide-viewer-container"
        :class="{ 'with-editor': !isPresentationMode }"
        :style="slideViewerStyle"
      >
        <SimpleSlideViewer
          :key="slideViewerKey"
          :slide-number="currentSlideNumber"
          :slide-type="currentSlideType"
        />

        <!-- 관리자: poll 슬라이드 결과 초기화 버튼 -->
        <q-btn
          v-if="isAdmin && currentSlideType === 'poll'"
          class="poll-admin-fab"
          round
          color="negative"
          icon="delete"
          :disable="!currentPollId"
          @click="clearPollData(currentPollId)"
        >
          <q-tooltip>결과 초기화</q-tooltip>
        </q-btn>
      </div>

      <!-- 리사이저 바 (편집기 모드에서만 표시) -->
      <div v-if="!isPresentationMode" class="resizer-bar" @mousedown="startResizing"></div>

      <!-- 편집기 영역 (편집기 모드에서만 표시) -->
      <div v-if="!isPresentationMode" class="editor-container" :style="editorStyle">
        <SlideEditorSection
          :current-slide-type="currentSlideType"
          :current-slide-info="currentSlideInfo"
          :current-lesson="currentLesson"
          :current-slide="currentSlide"
          :current-slide-content="currentSlideContent"
          :is-applying="isApplying"
          @slide-content-save="handleSlideContentSave"
          @slide-content-change="handleSlideContentChange"
          @slide-preview="handleSlidePreview"
          @create-markdown-file="handleCreateMarkdownFile"
          @auto-update="handleAutoUpdate"
          @update-toc="handleUpdateTOC"
          @add-new-slide="handleAddNewSlide"
          @apply-slide="handleApplySlide"
          ref="slideEditorSection"
        />
      </div>

      <!-- 네비게이션 컨트롤 (프레젠테이션 모드에서만 표시) -->
      <div v-if="isPresentationMode" class="navigation-controls">
        <q-btn
          :disable="isFirstSlide"
          @click="goToPreviousSlide"
          color="blue"
          text-color="white"
          icon="chevron_left"
          round
          size="lg"
          class="nav-btn"
        />

        <div class="slide-info">
          <span class="slide-counter"
            >{{ courseStore.currentLesson }}-{{ courseStore.currentSlide + 1 }}</span
          >
        </div>

        <q-btn
          :disable="isLastSlide"
          @click="goToNextSlide"
          color="blue"
          text-color="white"
          icon="chevron_right"
          round
          size="lg"
          class="nav-btn"
        />
      </div>

      <!-- 편집기 모드 안내 메시지 -->
      <div v-if="!isPresentationMode" class="editor-mode-notice">
        <q-banner class="bg-orange text-white" rounded>
          <template v-slot:avatar>
            <q-icon name="edit" />
          </template>
          <div class="text-body2">
            <strong>편집기 모드</strong><br />
            현재 편집기 모드입니다. 프레젠테이션 모드로 전환하려면 상단의 편집 버튼을 클릭하세요.
          </div>
        </q-banner>
      </div>

      <!-- HTML 변환 버튼은 MainLayout 헤더로 이동됨 -->
    </div>

    <!-- 키보드 단축키 안내 (프레젠테이션 모드에서만 표시) -->
    <q-banner
      v-if="showKeyboardHelp && isPresentationMode"
      class="bg-info text-white keyboard-help"
      rounded
    >
      <template v-slot:avatar>
        <q-icon name="keyboard" />
      </template>
      <div class="text-body2">
        <strong>키보드 단축키:</strong><br />
        ← → : 이전/다음 슬라이드 | Space : 다음 슬라이드<br />
        Home/End : 처음/마지막 슬라이드 | F11 : 전체화면<br />
        ESC : 편집기 모드 | ? : 도움말 토글
      </div>
      <template v-slot:action>
        <q-btn flat color="white" label="닫기" @click="showKeyboardHelp = false" />
      </template>
    </q-banner>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useQuasar } from 'quasar';
import { useRoute, useRouter } from 'vue-router';
import { useCourseStore } from '../stores/course';
import { useAuth } from '../composables/useAuth';
import { useGuestAuth } from '../composables/useGuestAuth';
import { slideLog } from 'src/utils/logger';
import SimpleSlideViewer from '../components/SimpleSlideViewer.vue';
import SlideEditorSection from '../components/SlideEditorSection.vue';
import {
  getDatabase,
  ref as dbRef,
  get as rtdbGet,
  set as rtdbSet,
  remove as rtdbRemove,
} from 'firebase/database';
import { firebaseApp } from 'src/firebase/config';
// 관리자 인지 확인 위해 userRole 사용
const { userRole } = useAuth();
const isAdmin = computed(() => userRole.value === 'admin');

// Quasar 인스턴스
const $q = useQuasar();

// Router 인스턴스
const route = useRoute();
const router = useRouter();

// Course 스토어
const courseStore = useCourseStore();

// 인증 상태
const { isAuthenticated } = useAuth();
const { isGuestAuthenticated } = useGuestAuth();

// 반응형 데이터
const showKeyboardHelp = ref(false);

// Course store에서 필요한 변수들
const currentLesson = computed(() => courseStore.currentLesson);
const currentSlide = computed(() => courseStore.currentSlide);

// 라우트 파라미터 처리
watch(
  () => route.params.id,
  (slideId) => {
    if (slideId && typeof slideId === 'string') {
      console.log('🔗 라우트 파라미터 감지:', slideId);
      // slideId 형식: "0-1", "1-2" 등
      const parts = slideId.split('-');
      if (parts.length === 2) {
        const lesson = Number(parts[0]);
        const slide = Number(parts[1]);
        if (!isNaN(lesson) && !isNaN(slide)) {
          console.log(`📖 슬라이드 이동: ${lesson}-${slide}`);
          courseStore.setCurrentSlideByLessonAndSlide(lesson, slide);
        }
      }
    }
  },
  { immediate: true },
);

// 편집기 모드 상태
const isPresentationMode = computed(() => courseStore.isPresentationMode);

// 편집기 모드 변경 감지
watch(
  () => isPresentationMode.value,
  async (newMode) => {
    console.log(`🎭 편집기 모드 변경: ${newMode ? '프레젠테이션' : '편집기'}`);

    // 편집기 모드로 변경될 때 현재 슬라이드 내용 로드
    if (!newMode) {
      try {
        const lesson = courseStore.currentLesson;
        const slide = courseStore.currentSlide;
        console.log(`📂 편집기 모드 전환 - MD 파일 내용 로드: ${lesson}-${slide}`);
        const content = await courseStore.loadSlideContentForEditing(lesson, slide);
        console.log(`✅ 편집기 모드 전환 - MD 파일 내용 로드 완료:`, {
          contentLength: content.length,
          contentPreview: content.substring(0, 100),
        });
        currentSlideContent.value = content;
      } catch (error) {
        console.error(`❌ 편집기 모드 전환 - MD 파일 내용 로드 실패:`, error);
        const lesson = courseStore.currentLesson;
        const slide = courseStore.currentSlide;
        currentSlideContent.value = `# 슬라이드 ${lesson}-${slide}\n\n새로운 슬라이드 내용을 작성하세요.`;
      }
    }
  },
);

// 슬라이드 변경 감지 및 quiz 이벤트 주입
watch([() => courseStore.currentLesson, () => courseStore.currentSlide], async () => {
  // 슬라이드 타입 감지
  await detectSlideType(courseStore.currentLesson, courseStore.currentSlide);

  if (isQuizSlide.value) {
    // quiz 슬라이드일 때 약간의 지연 후 이벤트 주입
    setTimeout(() => {
      injectQuizEvents();
    }, 500);
  }
});

// 편집기 관련 변수들
const slideEditorSection = ref();
const currentSlideContent = ref('');
const currentSlideInfo = computed(() => ({
  lessonTitle: `강의 ${courseStore.currentLesson + 1}`,
  slideTitle: `슬라이드 ${courseStore.currentSlide + 1}`,
  slideIndex: courseStore.currentSlide + 1,
  totalSlides: courseStore.currentLessonData?.slides || 0,
  lessonNumber: courseStore.currentLesson + 1,
  totalLessons: courseStore.lessons.length,
}));

// HTML 변환 관련 변수들은 MainLayout으로 이동됨

// Quiz 슬라이드 감지 및 이벤트 주입
const isQuizSlide = computed(() => {
  const slideNum = `${courseStore.currentLesson}-${courseStore.currentSlide}`;
  return slideNum.startsWith('1-1') && courseStore.currentSlide >= 13;
});

// Quiz 옵션 클릭 이벤트 주입 함수
const injectQuizEvents = () => {
  if (!isQuizSlide.value) return;

  setTimeout(() => {
    try {
      const iframe = document.querySelector('.slide-iframe') as HTMLIFrameElement;
      if (iframe && iframe.contentDocument) {
        const quizOptions = iframe.contentDocument.querySelectorAll('.quiz-option');
        quizOptions.forEach((option) => {
          // 기존 이벤트 리스너 제거 (중복 방지)
          option.removeEventListener('click', handleQuizOptionClick);
          option.addEventListener('click', handleQuizOptionClick);

          // 스타일 적용
          (option as HTMLElement).style.cursor = 'pointer';
          (option as HTMLElement).style.transition = 'all 0.2s ease';
        });

        slideLog.log(`✅ Quiz 이벤트 주입 완료: ${quizOptions.length}개 옵션`);
      }
    } catch (error) {
      slideLog.warn('⚠️ Quiz 이벤트 주입 실패:', error);
    }
  }, 200);
};

// Quiz 옵션 클릭 핸들러
const handleQuizOptionClick = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();

  const target = e.target as HTMLElement;
  const idx = target.getAttribute('data-idx');
  const iframe = document.querySelector('.slide-iframe') as HTMLIFrameElement;

  if (iframe && iframe.contentDocument) {
    const answerData = iframe.contentDocument.getElementById('quiz-answer-data');
    const quizOptions = iframe.contentDocument.querySelectorAll('.quiz-option');

    // 정답 표시
    if (answerData) {
      answerData.style.display = 'block';
    }

    // 선택된 옵션 스타일 변경
    quizOptions.forEach((opt) => opt.classList.remove('selected'));
    target.classList.add('selected');

    slideLog.log(`🎯 Quiz 옵션 클릭: ${idx}번 선택, 정답 표시`);
  }
};

// 편집기 이벤트 핸들러들
const handleSlideContentSave = (content: string) => {
  slideLog.log('슬라이드 내용 저장:', content);
  currentSlideContent.value = content;
};

const handleSlideContentChange = (content: string) => {
  slideLog.log('슬라이드 내용 변경:', content);
  currentSlideContent.value = content;
};

const handleSlidePreview = () => {
  slideLog.log('슬라이드 미리보기');
};

const handleCreateMarkdownFile = () => {
  console.log('마크다운 파일 생성');
};

const handleAutoUpdate = () => {
  console.log('자동 업데이트');
};

const handleUpdateTOC = () => {
  console.log('목차 업데이트');
};

const handleAddNewSlide = () => {
  slideLog.log('새 슬라이드 추가');
};

const isApplying = ref(false);

const handleApplySlide = async (slideNumber: string) => {
  isApplying.value = true;
  try {
    slideLog.log('🔄 슬라이드 반영 시작:', slideNumber);

    // 1. 현재 편집 중인 md 파일을 Firebase Storage에 저장
    const [lesson = '0', slide = '0'] = (slideNumber || '0-0').split('-');
    const componentKey = `${lesson}-${slide}`;

    // Firebase Storage에 저장
    const saveSuccess = await courseStore.saveSlideToFirebaseStorage(
      componentKey,
      currentSlideContent.value,
    );

    if (saveSuccess) {
      console.log('✅ Firebase Storage에 MD 파일 저장 완료:', componentKey);

      // 2. 슬라이드 뷰어 리프레시 (key 변경으로 강제 리렌더링)
      slideViewerKey.value++;

      // 3. 성공 메시지 표시
      $q.notify({
        type: 'positive',
        message: '슬라이드가 Firebase Storage에 성공적으로 저장되었습니다!',
        position: 'top',
        timeout: 3000,
        icon: 'cloud_done',
        actions: [{ label: '확인', color: 'white' }],
      });

      // 4. 로컬 다운로드도 제공 (백업용)
      const blob = new Blob([currentSlideContent.value], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `slide-${componentKey}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      console.log('📁 로컬 백업 파일도 다운로드되었습니다.');
    } else {
      throw new Error('Firebase Storage 저장에 실패했습니다.');
    }

    slideLog.log('🎉 슬라이드 반영 완료');
  } catch (error) {
    slideLog.error('❌ Firebase Storage 저장 실패:', error);

    $q.notify({
      type: 'negative',
      message: 'Firebase Storage에 저장 중 오류가 발생했습니다. 인터넷 연결을 확인해주세요.',
      position: 'top',
      timeout: 5000,
      icon: 'cloud_off',
      actions: [{ label: '확인', color: 'white' }],
    });
  } finally {
    isApplying.value = false;
  }
};

// HTML 변환 함수는 MainLayout으로 이동됨

const slideViewerKey = ref(0);

// 계산된 속성들
const totalSlides = computed(() => {
  // course store의 lessons 데이터를 기반으로 총 슬라이드 수 계산
  return courseStore.lessons.reduce((total, lesson) => total + lesson.slides, 0);
});

const currentSlideNumber = computed(() => {
  // course store의 currentLesson과 currentSlide를 기반으로 슬라이드 번호 생성
  return `${courseStore.currentLesson}-${courseStore.currentSlide}`;
});

const currentSlideType = ref('lecture'); // 기본값

// 슬라이드 타입을 동적으로 감지하는 함수
const detectSlideType = async (lesson: number, slide: number) => {
  try {
    const response = await fetch(`/slides/slide-${lesson}-${slide}.md`);
    if (response.ok) {
      const content = await response.text();
      if (content.trim().startsWith('@html')) {
        currentSlideType.value = 'html';
      } else if (content.includes('@cover') || content.includes('커버')) {
        currentSlideType.value = 'cover';
      } else if (content.includes('@toc') || content.includes('목차')) {
        currentSlideType.value = 'toc';
      } else if (content.includes('@poll') || content.includes('투표')) {
        currentSlideType.value = 'poll';
      } else if (content.includes('@stats') || content.includes('통계')) {
        currentSlideType.value = 'stats';
      } else if (content.includes('@interactive') || content.includes('인터랙티브')) {
        currentSlideType.value = 'interactive';
      } else if (content.includes('@example') || content.includes('예시')) {
        currentSlideType.value = 'example';
      } else if (content.includes('@challenge') || content.includes('도전')) {
        currentSlideType.value = 'challenge';
      } else if (content.includes('@timeline') || content.includes('타임라인')) {
        currentSlideType.value = 'timeline';
      } else if (content.includes('@profile') || content.includes('프로필')) {
        currentSlideType.value = 'profile';
      } else if (content.includes('@lecture') || content.includes('강의')) {
        currentSlideType.value = 'lecture';
      } else if (content.includes('@chapter') || content.includes('챕터')) {
        currentSlideType.value = 'chapter';
      } else {
        // 기본 규칙에 따른 타입 결정
        const slideNum = `${lesson}-${slide}`;
        if (slideNum === '0-0') currentSlideType.value = 'cover';
        else if (slideNum === '0-1') currentSlideType.value = 'index';
        else if (slideNum === '0-2') currentSlideType.value = 'profile';
        else if (slideNum.endsWith('-0')) currentSlideType.value = 'chapter';
        else if (slideNum.startsWith('2-') && slideNum !== '2-0')
          currentSlideType.value = 'example';
        else if (slideNum.startsWith('3-') && slideNum !== '3-0')
          currentSlideType.value = 'challenge';
        else currentSlideType.value = 'lecture';
      }
    }
  } catch (error) {
    console.error(`슬라이드 타입 감지 실패: ${lesson}-${slide}`, error);
    // 기본 규칙에 따른 타입 결정
    const slideNum = `${lesson}-${slide}`;
    if (slideNum === '0-0') currentSlideType.value = 'cover';
    else if (slideNum === '0-1') currentSlideType.value = 'index';
    else if (slideNum === '0-2') currentSlideType.value = 'profile';
    else if (slideNum.endsWith('-0')) currentSlideType.value = 'chapter';
    else if (slideNum.startsWith('2-') && slideNum !== '2-0') currentSlideType.value = 'example';
    else if (slideNum.startsWith('3-') && slideNum !== '3-0') currentSlideType.value = 'challenge';
    else currentSlideType.value = 'lecture';
  }
};

// 현재 슬라이드가 poll일 때 pollId 계산
const currentPollId = computed(() => {
  if (currentSlideType.value !== 'poll') return '';
  return `poll-${courseStore.currentLesson}-${courseStore.currentSlide}`;
});

// 관리자: 현재 Poll 결과 초기화 (LocalStorage + RTDB 개인 표기)
const clearPollData = async (pollId: string) => {
  try {
    if (!isAdmin.value || !pollId) return;
    const confirmed = await $q
      .dialog({
        title: '결과 초기화',
        message:
          '해당 투표의 나의 선택(LocalStorage)과 RTDB의 표기를 삭제할까요?\n이 작업은 되돌릴 수 없습니다.',
        cancel: true,
        ok: { label: '초기화', color: 'negative' },
      })
      .onOk(() => true)
      .onCancel(() => false);
    if (!confirmed) return;

    // LocalStorage 정리: poll 관련 키 삭제
    try {
      Object.keys(localStorage)
        .filter((k) => k.toLowerCase().includes('poll'))
        .forEach((k) => localStorage.removeItem(k));
    } catch (_) {}

    // RTDB 정리: 관리자 개인 userVotes 제거
    const db = firebaseApp ? getDatabase(firebaseApp) : null;
    if (db) {
      const { getAuth } = await import('firebase/auth');
      const uid = getAuth(firebaseApp!).currentUser?.uid;
      if (uid) {
        await rtdbRemove(dbRef(db, `polls/${pollId}/userVotes/${uid}`)).catch(() => {});
      }
    }

    // iFrame 동기화: 선택 해제 시グ널 전송
    try {
      const iframe = document.querySelector('.slide-iframe') as HTMLIFrameElement;
      iframe?.contentWindow?.postMessage({ type: 'poll-state', pollId, optionId: '' }, '*');
    } catch (_) {}

    $q.notify({ type: 'positive', message: '투표 결과가 초기화되었습니다.', position: 'top' });
  } catch (e) {
    $q.notify({ type: 'negative', message: '초기화 중 오류가 발생했습니다.', position: 'top' });
  }
};

// 첫 번째 슬라이드인지 확인 (첫 번째 Chapter의 첫 번째 슬라이드)
const isFirstSlide = computed(() => {
  return courseStore.currentLesson === 0 && courseStore.currentSlide === 0;
});

// 마지막 슬라이드인지 확인 (마지막 Chapter의 마지막 슬라이드)
const isLastSlide = computed(() => {
  const lastLessonIndex = courseStore.lessons.length - 1;
  const lastLesson = courseStore.lessons[lastLessonIndex];
  return (
    courseStore.currentLesson === lastLessonIndex &&
    courseStore.currentSlide === (lastLesson?.slides || 0) - 1
  );
});

const slideViewerWidth = ref(60); // %
const editorWidth = ref(40); // %
const resizing = ref(false);
const minWidth = 20; // 최소 20%
const maxWidth = 80; // 최대 80%

const slideViewerStyle = computed(() =>
  !isPresentationMode.value ? { flex: `0 0 ${slideViewerWidth.value}%` } : {},
);
const editorStyle = computed(() =>
  !isPresentationMode.value ? { flex: `0 0 ${editorWidth.value}%` } : {},
);

const startResizing = (e: MouseEvent) => {
  resizing.value = true;
  document.body.style.cursor = 'col-resize';
};
const stopResizing = () => {
  resizing.value = false;
  document.body.style.cursor = '';
};
const handleResizing = (e: MouseEvent) => {
  if (!resizing.value) return;
  const mainContent = document.querySelector('.main-content') as HTMLElement;
  if (!mainContent) return;
  const rect = mainContent.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const percent = (x / rect.width) * 100;
  if (percent > minWidth && percent < maxWidth) {
    slideViewerWidth.value = percent;
    editorWidth.value = 100 - percent;
  }
};

// 메서드들
const goToPreviousSlide = () => {
  courseStore.prevSlide();
};

const goToNextSlide = () => {
  courseStore.nextSlide();
};

const goToFirstSlide = () => {
  // 첫 번째 Chapter의 첫 번째 슬라이드로 이동
  courseStore.setCurrentLesson(0);
  courseStore.setCurrentSlide(0);
};

const goToLastSlide = () => {
  // 마지막 Chapter의 마지막 슬라이드로 이동
  const lastLessonIndex = courseStore.lessons.length - 1;
  const lastLesson = courseStore.lessons[lastLessonIndex];
  if (lastLesson) {
    courseStore.setCurrentLesson(lastLessonIndex);
    courseStore.setCurrentSlide(lastLesson.slides - 1);
  }
};

const updateRoute = () => {
  router.push({
    query: {
      ...route.query,
      lesson: courseStore.currentLesson.toString(),
      slide: courseStore.currentSlide.toString(),
    },
  });
};

// 키보드 이벤트 처리 (프레젠테이션 모드에서만 작동)
const handleKeydown = (event: KeyboardEvent) => {
  // 편집기 모드에서는 키보드 단축키 비활성화
  if (!isPresentationMode.value) {
    return;
  }

  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault();
      goToPreviousSlide();
      break;
    case 'ArrowRight':
    case ' ':
      event.preventDefault();
      goToNextSlide();
      break;
    case 'Home':
      event.preventDefault();
      goToFirstSlide();
      break;
    case 'End':
      event.preventDefault();
      goToLastSlide();
      break;
    case '?':
      event.preventDefault();
      showKeyboardHelp.value = !showKeyboardHelp.value;
      break;
  }
};

// 라이프사이클 훅
onMounted(async () => {
  // 초기 슬라이드 타입 감지
  await detectSlideType(courseStore.currentLesson, courseStore.currentSlide);

  document.addEventListener('keydown', handleKeydown);
  window.addEventListener('mousemove', handleResizing);
  window.addEventListener('mouseup', stopResizing);

  // 관리자 모드: poll iFrame과 통신하여 개인 선택 상태 저장/복원
  const onMessage = async (event: MessageEvent) => {
    try {
      if (userRole.value !== 'admin') return; // 관리자 전용
      const data: any = event.data || {};
      // 투표 수신 → 개인 선택(userVotes)에 저장 (집계는 하지 않음)
      if (data && data.type === 'poll-vote') {
        const db = firebaseApp ? getDatabase(firebaseApp) : null;
        if (!db) return;
        const { pollId, optionId, text } = data;
        if (!pollId) return;
        const { getAuth } = await import('firebase/auth');
        const uid = getAuth(firebaseApp!).currentUser?.uid;
        if (!uid) return;
        const valueToSave = text || String(optionId || '');
        await rtdbSet(dbRef(db, `polls/${pollId}/userVotes/${uid}`), valueToSave);
        slideLog.log('🗳️ admin saved(userVotes):', { pollId, valueToSave });
      }

      // 슬라이드 준비 신호 → 기존 선택 동기화
      if (data && data.type === 'poll-ready') {
        const db = firebaseApp ? getDatabase(firebaseApp) : null;
        if (!db) return;
        const { pollId } = data;
        if (!pollId) return;
        const { getAuth } = await import('firebase/auth');
        const uid = getAuth(firebaseApp!).currentUser?.uid;
        if (!uid) return;
        const snap = await rtdbGet(dbRef(db, `polls/${pollId}/userVotes/${uid}`));
        const iframe = document.querySelector('.slide-iframe') as HTMLIFrameElement;
        if (!iframe || !iframe.contentWindow) return;
        if (snap.exists()) {
          const val = snap.val();
          if (typeof val === 'string' && /^\d+$/.test(val)) {
            iframe.contentWindow.postMessage(
              { type: 'poll-state', pollId, optionId: String(val) },
              '*',
            );
          } else if (val) {
            iframe.contentWindow.postMessage(
              { type: 'poll-state', pollId, text: String(val) },
              '*',
            );
          }
        }
      }
    } catch (e) {
      slideLog.error('🗳️ admin poll sync error:', e);
    }
  };

  window.addEventListener('message', onMessage);

  // 배경 이미지 로딩 확인
  const bgImage = new Image();
  bgImage.onload = () => {
    console.log('✅ 배경 이미지 로딩 성공:', bgImage.src);
  };
  bgImage.onerror = () => {
    console.error('❌ 배경 이미지 로딩 실패:', bgImage.src);
  };
  bgImage.src = '/images/20250806_1231_churchtech.png';
});

// Course 스토어 변경사항 감지
watch(
  () => [courseStore.currentLesson, courseStore.currentSlide],
  async ([newLesson, newSlide]) => {
    if (newLesson !== undefined && newSlide !== undefined) {
      console.log(`🔄 IndexPage - 스토어 변경 감지: lesson=${newLesson}, slide=${newSlide}`);

      // 편집기 모드일 때 MD 파일 내용 로드
      if (!isPresentationMode.value) {
        try {
          console.log(`📂 편집기 모드 - MD 파일 내용 로드 시작: ${newLesson}-${newSlide}`);
          const content = await courseStore.loadSlideContentForEditing(newLesson, newSlide);
          console.log(`✅ 편집기 모드 - MD 파일 내용 로드 완료:`, {
            contentLength: content.length,
            contentPreview: content.substring(0, 100),
          });
          currentSlideContent.value = content;
        } catch (error) {
          console.error(`❌ 편집기 모드 - MD 파일 내용 로드 실패:`, error);
          currentSlideContent.value = `# 슬라이드 ${newLesson}-${newSlide}\n\n새로운 슬라이드 내용을 작성하세요.`;
        }
      }
    }
  },
  { immediate: true },
);

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
  window.removeEventListener('mousemove', handleResizing);
  window.removeEventListener('mouseup', stopResizing);
  // message 이벤트 리스너는 onMounted 내부에서 정의되므로 여기서 제거할 수 없음
  // 브라우저가 자동으로 정리함
});
</script>

<style scoped>
.index-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  background: #f8f9fa;
}

/* 로그인 페이지 배경 이미지 */
.login-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('/images/20250806_1231_churchtech.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  z-index: -1;
  opacity: 1;
  pointer-events: none;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: row;
  position: relative;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(5px);
  border-radius: 8px;
  margin: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.slide-viewer-container {
  flex: 1;
  position: relative;
}

.slide-viewer-container.with-editor {
  flex: 0 0 60%;
}

.editor-container {
  flex: 0 0 40%;
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(245, 245, 245, 0.95);
  overflow-y: auto;
  max-height: 100vh;
  backdrop-filter: blur(10px);
  border-radius: 0 8px 8px 0;
}

.navigation-controls {
  position: fixed;
  bottom: 50px; /* 기존 20px에서 +30px */
  right: 20px; /* 우측 끝으로 이동 */
  display: flex;
  align-items: center;
  gap: 8px; /* 간격 줄임 */
  z-index: 1000;
}

.nav-btn {
  width: 32px; /* 버튼 크기 줄임 */
  height: 32px; /* 버튼 크기 줄임 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  border-radius: 50%;
  backdrop-filter: blur(10px);
}

.nav-btn:hover {
  transform: scale(1.1); /* 호버 시 살짝 확대 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.slide-info {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px; /* min-width 대신 고정 width 사용 */
  height: 32px; /* 고정 높이 추가 */
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 4px 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  flex-shrink: 0; /* 크기 고정 */
  backdrop-filter: blur(10px);
}

.slide-counter {
  font-size: 0.9em; /* 폰트 크기 줄임 */
  font-weight: bold;
  color: #333; /* 색상 변경 */
  text-align: center; /* 텍스트 중앙 정렬 */
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  overflow: hidden; /* 넘치는 텍스트 숨김 */
  text-overflow: ellipsis; /* 넘치는 텍스트에 ... 표시 */
}

.keyboard-help {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1001;
  max-width: 400px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95) !important;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.editor-mode-notice {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1001;
  max-width: 400px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95) !important;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* HTML 변환 버튼 스타일은 MainLayout으로 이동됨 */

.resizer-bar {
  width: 6px;
  cursor: col-resize;
  background: rgba(255, 255, 255, 0.8);
  transition: background 0.2s;
  z-index: 10;
  backdrop-filter: blur(5px);
  border-radius: 3px;
}
.resizer-bar:hover {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .navigation-controls {
    bottom: 45px; /* 기존 15px에서 +30px */
    right: 15px; /* 모바일에서도 우측 끝 */
    gap: 6px; /* 간격 더 줄임 */
  }

  .nav-btn {
    width: 28px; /* 모바일에서 더 작게 */
    height: 28px; /* 모바일에서 더 작게 */
  }

  .slide-info {
    width: 60px; /* 모바일에서 고정 너비 */
    height: 28px; /* 모바일에서 고정 높이 */
    padding: 3px 6px;
  }

  .slide-counter {
    font-size: 0.8em; /* 모바일에서 더 작게 */
  }

  .keyboard-help {
    top: 10px;
    right: 10px;
    max-width: 300px;
  }

  .editor-mode-notice {
    top: 10px;
    left: 10px;
    max-width: 300px;
  }

  /* HTML 변환 버튼 반응형 스타일은 MainLayout으로 이동됨 */
}
</style>
