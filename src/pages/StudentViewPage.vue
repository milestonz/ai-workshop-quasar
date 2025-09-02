<template>
  <q-layout view="hHh LpR fFf">
    <!-- 배경 이미지 (관리자 모드와 동일) -->
    <div class="student-background"></div>
    <!-- 사이드바 (전역 중복 렌더링 방지) -->
    <q-drawer
      v-if="isComponentMounted && (!requireStudentLogin || isAuthenticated || isGuestAuthenticated)"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-1"
      :width="320"
      :breakpoint="768"
      overlay
    >
      <q-scroll-area class="fit">
        <div class="q-pa-md">
          <div class="text-h6 text-weight-bold q-mb-md q-mt-lg">📚 AI Workshop 강의</div>

          <!-- 강의 정보 -->
          <div class="course-info q-mb-lg">
            <div class="text-subtitle2 text-weight-medium q-mb-sm">📖 강의 정보</div>
            <q-card flat bordered>
              <q-card-section>
                <div class="text-caption text-grey-7 q-mt-sm">
                  <q-icon name="person" size="xs" />
                  AI Workshop
                </div>
                <div class="text-caption text-grey-7">
                  <q-icon name="schedule" size="xs" />
                  {{ formatDate(new Date().toISOString()) }}
                </div>
              </q-card-section>
            </q-card>
          </div>

          <!-- 목차 -->
          <div class="text-subtitle2 text-weight-medium q-mb-sm">📖 강의 목차</div>

          <!-- Lock된 슬라이드 안내 제거 -->
          <q-list>
            <q-item
              v-for="(slide, index) in slideList"
              :key="index"
              clickable
              :active="index === currentSlideIndex"
              @click="goToSlide(index)"
              class="q-mb-sm"
            >
              <q-item-section avatar>
                <q-icon
                  :name="index === currentSlideIndex ? 'slideshow' : 'slideshow'"
                  :color="index === currentSlideIndex ? 'primary' : 'grey'"
                  size="sm"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  {{ slide.title }}
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon
                  v-if="completedSlides.includes(index)"
                  name="check_circle"
                  color="positive"
                  size="sm"
                />
              </q-item-section>
            </q-item>
          </q-list>

          <!-- 진행률 -->
          <div class="q-mt-lg">
            <div class="text-subtitle2 text-weight-medium q-mb-sm">📊 학습 진행률</div>
            <q-linear-progress :value="progressPercentage" color="primary" class="q-mb-sm" />
            <div class="text-caption text-grey-7">
              {{ completedSlides.length }} / {{ totalSlides }} 슬라이드 완료
            </div>
          </div>

          <!-- 학습 통계 -->
          <div class="q-mt-lg">
            <div class="text-subtitle2 text-weight-medium q-mb-sm">📈 학습 통계</div>
            <q-card flat bordered>
              <q-card-section>
                <div class="row q-col-gutter-sm">
                  <div class="col-6">
                    <div class="text-h6 text-primary">{{ totalSlides }}</div>
                    <div class="text-caption">전체 슬라이드</div>
                  </div>
                  <div class="col-6">
                    <div class="text-h6 text-positive">{{ isCurrentSlideCompleted ? 1 : 0 }}</div>
                    <div class="text-caption">학습 완료</div>
                  </div>
                </div>
                <div class="q-mt-sm">
                  <q-linear-progress
                    :value="isCurrentSlideCompleted ? 1 : 0"
                    color="positive"
                    class="q-mt-xs"
                  />
                  <div class="text-caption text-grey-7 q-mt-xs">
                    {{ isCurrentSlideCompleted ? '학습 완료!' : '마지막 슬라이드에서 완료 가능' }}
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-scroll-area>
    </q-drawer>

    <!-- 메인 콘텐츠 (전역 중복 렌더링 방지) -->
    <q-page-container v-if="isComponentMounted">
      <!-- 로그인이 필요한 경우 로그인 요구 -->
      <div
        v-if="requireStudentLogin && !isAuthenticated && !isGuestAuthenticated"
        class="login-required"
      >
        <div class="text-center q-pa-xl">
          <q-icon name="school" size="100px" color="primary" class="q-mb-lg" />
          <div class="text-h4 text-weight-bold q-mb-md">학습을 위해 로그인이 필요합니다</div>
          <div class="text-body1 text-grey-7 q-mb-lg">
            AI Workshop 강의를 수강하려면 Google 계정으로 로그인하거나 게스트 모드를 이용하세요.
          </div>
          <div class="row justify-center q-gutter-md">
            <q-btn
              color="primary"
              icon="login"
              label="Google로 로그인"
              size="lg"
              @click="handleDirectLogin"
            />
            <q-btn
              color="orange"
              icon="person"
              label="게스트 모드"
              size="lg"
              @click="handleGuestLogin"
            />
          </div>
        </div>
      </div>

      <!-- 로그인한 경우 또는 로그인이 필요하지 않은 경우 메인 콘텐츠 표시 -->
      <q-page v-else class="q-pa-sm q-pt-xl">
        <!-- 헤더 -->
        <div class="row items-center q-mb-sm">
          <div class="col">
            <div class="text-h5 text-weight-bold">
              {{ courseStore.lessons.length > 0 ? 'AI Workshop 강의' : '강의 로딩 중...' }}
            </div>
            <div class="text-subtitle1 text-grey-7">
              {{ currentSlideTitle }}
            </div>
          </div>
          <div class="col-auto">
            <div class="row items-center q-gutter-sm">
              <!-- 로그인된 사용자 정보 표시 -->
              <div v-if="isAuthenticated" class="col-auto">
                <q-chip color="secondary" text-color="white" icon="person" :label="displayName" />
              </div>

              <!-- 게스트 사용자 정보 표시 -->
              <div v-else-if="isGuestAuthenticated" class="col-auto">
                <q-chip
                  color="orange"
                  text-color="white"
                  icon="person"
                  :label="guestUser?.name || '게스트'"
                />
              </div>

              <!-- 로그아웃 버튼 (Student mode에서 항상 표시) -->
              <div v-if="isStudentMode()" class="col-auto">
                <q-btn flat round dense icon="logout" color="grey-7" @click="handleLogout">
                  <q-tooltip>학습 종료</q-tooltip>
                </q-btn>
              </div>

              <!-- 일반 로그아웃 버튼 (로그인이 필요한 경우에만 표시) -->
              <div
                v-else-if="requireStudentLogin && (isAuthenticated || isGuestAuthenticated)"
                class="col-auto"
              >
                <q-btn
                  flat
                  round
                  dense
                  :icon="photoURL ? undefined : 'logout'"
                  color="grey-7"
                  @click="handleLogout"
                >
                  <q-avatar v-if="photoURL" size="24px" class="q-mr-xs">
                    <img :src="photoURL" :alt="displayName" />
                  </q-avatar>
                  <q-tooltip>{{ displayName || guestUser?.name || '사용자' }} (로그아웃)</q-tooltip>
                </q-btn>
              </div>

              <!-- 학습 모드 칩 -->
              <div class="col-auto">
                <q-chip color="primary" text-color="white" icon="school" label="학습 모드" />
              </div>
            </div>
          </div>
        </div>

        <!-- 키보드 단축키 안내 -->
        <q-banner v-if="showKeyboardHelp" class="bg-info text-white q-mb-md" rounded>
          <template v-slot:avatar>
            <q-icon name="keyboard" />
          </template>
          <div class="text-body2">
            <strong>키보드 단축키:</strong><br />
            ← → : 이전/다음 슬라이드 | ↑ ↓ : 이전/다음 슬라이드<br />
            Home/End : 첫/마지막 슬라이드 | Space : 다음 슬라이드<br />
            ? : 이 도움말 토글
          </div>
        </q-banner>

        <!-- 슬라이드 뷰어 -->
        <div class="slide-container">
          <div
            v-if="currentSlideUrl"
            class="slide-viewer"
            v-html="currentSlideContent"
            @click="handleSlideClick"
          ></div>

          <!-- 퀴즈 오버레이 -->
          <div v-if="quizOverlay.visible" class="quiz-overlay" @click.stop>
            <div class="quiz-card">
              <div class="text-subtitle1 q-mb-sm">{{ quizOverlay.question }}</div>
              <div class="row q-col-gutter-md options-grid">
                <div class="col-12 col-sm-6" v-for="(op, i) in quizOverlay.options" :key="i">
                  <q-btn
                    outline
                    rounded
                    size="lg"
                    class="full-width text-left option-btn"
                    :label="i + 1 + '. ' + op"
                    @click.stop="handleQuizClick(i + 1)"
                  />
                </div>
              </div>
              <div
                v-if="quizOverlay.revealed && quizOverlay.answerText"
                class="q-mt-md q-pa-sm bg-grey-1 rounded-borders"
              >
                <div
                  class="text-positive text-weight-bold q-mb-xs"
                  v-if="quizOverlay.revealed && quizOverlay.correctIndex && quizOverlay.lastChoice"
                >
                  {{
                    quizOverlay.lastChoice === quizOverlay.correctIndex
                      ? '정답입니다! ✅'
                      : '오답입니다. ❌'
                  }}
                </div>
                <div class="text-body2">
                  <div v-if="!quizOverlay.isOX" class="q-mb-xs">
                    <b>정답:</b> {{ quizOverlay.correctIndex }}
                  </div>
                  <div v-html="quizOverlay.answerText.replace(/\n/g, '<br/>')"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- 투표 오버레이: 학생은 수동으로 열기(FAB), 관리자 결과는 자동 표시 -->
          <div v-if="activePoll && isStudent && showPollOverlay" class="poll-overlay" @click.stop>
            <PollVote :poll-id="activePoll.pollId" />
          </div>
          <div
            v-else-if="activePoll && isAdmin && activePoll.result === 'bar'"
            class="poll-overlay"
            @click.stop
          >
            <PollResultBar :poll-id="activePoll.pollId" />
          </div>
          <div
            v-else-if="activePoll && isAdmin && activePoll.result === 'word'"
            class="poll-overlay"
            @click.stop
          >
            <PollResultWord :poll-id="activePoll.pollId" />
          </div>

          <!-- 학생용 투표 FAB (오버레이가 닫혀 있을 때만 표시) -->
          <q-btn
            v-if="activePoll && isStudent && !showPollOverlay"
            class="poll-fab"
            round
            color="primary"
            icon="how_to_vote"
            @click="showPollOverlay = true"
          >
            <q-tooltip>투표하기</q-tooltip>
          </q-btn>

          <!-- 관리자: 결과 보기 버튼 (새 창) -->
          <q-btn
            v-if="activePoll && isAdmin"
            class="poll-fab q-mr-md"
            round
            color="secondary"
            icon="insights"
            @click="openPollResultWindow(activePoll.pollId)"
            style="right: 80px"
          >
            <q-tooltip>결과 보기</q-tooltip>
          </q-btn>

          <!-- 관리자: 결과 초기화 버튼 -->
          <q-btn
            v-if="activePoll && isAdmin"
            class="poll-fab q-mr-md"
            round
            color="negative"
            icon="delete"
            @click="clearPollData(activePoll.pollId)"
            style="right: 140px"
          >
            <q-tooltip>결과 초기화</q-tooltip>
          </q-btn>

          <div v-else-if="!currentSlideUrl" class="loading-state">
            <q-spinner-dots size="50px" color="primary" />
            <div class="text-h6 q-mt-md">슬라이드를 로딩하는 중...</div>
          </div>
        </div>
      </q-page>
    </q-page-container>

    <!-- 고정된 하단 네비게이션 바 (전역 중복 렌더링 방지) -->
    <q-page-sticky
      v-if="isComponentMounted && (!requireStudentLogin || isAuthenticated || isGuestAuthenticated)"
      position="bottom"
      :offset="[0, 0]"
      style="z-index: 10000 !important"
    >
      <div class="fixed-navigation-bar">
        <div class="row items-center justify-center q-pa-sm">
          <!-- 이전 버튼 -->
          <div class="col-auto q-mr-lg">
            <q-btn
              round
              size="lg"
              icon="chevron_left"
              color="blue"
              text-color="white"
              :disable="currentSlideIndex === 0"
              @click="goToSlide(currentSlideIndex - 1)"
              style="
                cursor: pointer !important;
                z-index: 10001 !important;
                position: relative !important;
                pointer-events: auto !important;
              "
            />
          </div>

          <!-- 슬라이드 정보 -->
          <div class="col-auto q-mx-lg">
            <div class="text-center">
              <div class="text-h6 text-weight-bold">
                {{ currentSlideIndex + 1 }}
              </div>
              <div class="text-caption text-grey-7">{{ currentSlideTitle }}</div>
              <!-- 하단 네비 잠금 안내 제거 -->
            </div>
          </div>

          <!-- 학습 완료 버튼 (마지막 슬라이드에서만 표시) -->
          <div class="col-auto q-mx-lg" v-if="currentSlideIndex === totalSlides - 1">
            <q-btn
              :color="isCurrentSlideCompleted ? 'positive' : 'primary'"
              :icon="isCurrentSlideCompleted ? 'check_circle' : 'done'"
              :label="isCurrentSlideCompleted ? '완료됨' : '학습 완료'"
              @click="toggleSlideCompletion"
              size="md"
              style="
                cursor: pointer !important;
                z-index: 10001 !important;
                position: relative !important;
                pointer-events: auto !important;
              "
            />
          </div>

          <!-- 다음 버튼 -->
          <div class="col-auto q-ml-lg">
            <q-btn
              round
              size="lg"
              icon="chevron_right"
              color="blue"
              text-color="white"
              :disable="currentSlideIndex === totalSlides - 1"
              @click="goToSlide(currentSlideIndex + 1)"
              style="
                cursor: pointer !important;
                z-index: 10001 !important;
                position: relative !important;
                pointer-events: auto !important;
              "
            />
          </div>
        </div>
      </div>
    </q-page-sticky>

    <!-- 모바일 메뉴 버튼 (전역 중복 렌더링 방지) -->
    <q-page-sticky
      v-if="isComponentMounted"
      position="bottom-right"
      :offset="[18, 80]"
      style="z-index: 10000 !important"
      class="mobile-menu-btn"
    >
      <q-btn
        fab
        icon="menu"
        color="primary"
        @click="leftDrawerOpen = !leftDrawerOpen"
        style="
          cursor: pointer !important;
          z-index: 10001 !important;
          position: relative !important;
          pointer-events: auto !important;
        "
      />
    </q-page-sticky>

    <!-- 종료 확인 Dialog -->
    <q-dialog v-model="showExitDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section class="row items-center">
          <q-avatar icon="exit_to_app" color="primary" text-color="white" />
          <span class="q-ml-sm text-h6">{{ exitDialogTitle }}</span>
        </q-card-section>

        <q-card-section>
          <p>화면을 종료하시겠습니까?</p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="아니오" color="grey" v-close-popup />
          <q-btn unelevated label="예" color="primary" @click="confirmExit" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- 로그인 다이얼로그 -->
    <LoginDialog v-model="showLoginDialog" />

    <!-- 게스트 로그인 다이얼로그 -->
    <GuestLoginDialog
      v-model="showGuestLoginDialog"
      @guest-login-success="handleGuestLoginSuccess"
      @google-login-request="handleGoogleLoginRequest"
    />

    <!-- 로그아웃 확인 Dialog -->
    <q-dialog v-model="showLogoutDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center">
          <q-avatar icon="logout" color="orange" text-color="white" />
          <span class="q-ml-sm text-h6">로그아웃 확인</span>
        </q-card-section>

        <q-card-section>
          <div class="text-body1 q-mb-md">
            <strong>{{ displayName || guestUser?.name || '사용자' }}</strong
            >님, 정말로 로그아웃하시겠습니까?
          </div>
          <div class="text-caption text-grey-7">로그아웃하면 현재 학습 진행 상황이 저장됩니다.</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="취소" color="grey" v-close-popup />
          <q-btn unelevated label="로그아웃" color="orange" @click="confirmLogout" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- 설문조사 다이얼로그 -->
    <SurveyDialog
      v-model="showSurveyDialog"
      @submit="handleSurveySubmit"
      @completed="handleSurveyCompleted"
    />
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
// @ts-ignore - lodash-es types issue
import { debounce } from 'lodash-es';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useCourseStore } from '../stores/course';
import { useAuth } from '../composables/useAuth';
import { useGuestAuth } from '../composables/useGuestAuth';
import { auth, googleProvider } from '../services/firebase/config';
import SimpleSlideViewer from 'src/components/slide/SimpleSlideViewer.vue';
import LoginDialog from 'src/components/auth/LoginDialog.vue';
import GuestLoginDialog from 'src/components/auth/GuestLoginDialog.vue';

import SurveyDialog from 'src/components/survey/SurveyDialog.vue';
import { emailApiService } from '../services/api/emailApiService';
import type { SurveyData } from '../types/survey';
import { isStudentMode } from '../utils/logger';
// 신규 추가: Poll 컴포넌트들
import PollVote from 'src/components/survey/PollVote.vue';
import PollResultBar from 'src/components/survey/PollResultBar.vue';
import PollResultWord from 'src/components/survey/PollResultWord.vue';
import {
  getDatabase,
  ref as dbRef,
  set as rtdbSet,
  get as rtdbGet,
  remove as rtdbRemove,
  runTransaction,
} from 'firebase/database';
import { firebaseApp } from '../services/firebase/config';

const $q = useQuasar();
const route = useRoute();
const router = useRouter();
const courseStore = useCourseStore();
const { user, isAuthenticated, displayName, photoURL, logout, initAuth, signInWithGoogle } =
  useAuth();
// 역할 분기를 위해 userRole 추가
const { userRole } = useAuth();
const { guestUser, isGuestAuthenticated, signInAsGuest } = useGuestAuth();

// State
const leftDrawerOpen = ref(true);
const currentSlideIndex = ref(0);
const completedSlides = ref<number[]>([]);
// 임시 팝업(투표 오버레이) 표시 여부 - 기본 숨김
const showPollOverlay = ref(false);

const showSurveyDialog = ref(false);
const showExitDialog = ref(false); // 종료 확인 Dialog 상태
const exitDialogTitle = ref('학습 종료'); // 종료 확인 Dialog 제목
const showLoginDialog = ref(false);
const showGuestLoginDialog = ref(false);
const showLogoutDialog = ref(false); // 로그아웃 확인 Dialog 상태

// 학생 로그인 요구 설정 (기본: 로그인 필수)
const requireStudentLogin = ref(localStorage.getItem('requireStudentLogin') !== 'false');

// Computed
const courseId = computed(() => route.params.courseId as string);
const totalSlides = computed(() => {
  return slideList.value.length;
});

const slideList = computed(() => {
  // 강의 데이터나 잠금 상태가 로드되지 않았으면 빈 배열 반환
  if (courseStore.lessons.length === 0) {
    return [];
  }

  const slides: Array<{
    index: number;
    title: string;
    fileName: string;
    lessonIndex: number;
    slideIndex: number;
  }> = [];

  courseStore.lessons.forEach((lesson, lessonIndex) => {
    // Chapter가 잠겨있으면 모든 슬라이드 건너뛰기
    if (courseStore.isChapterLocked(lessonIndex)) {
      console.log(`🔒 Chapter ${lessonIndex}가 잠겨있어서 건너뜀`);
      return;
    }

    for (let slideIndex = 0; slideIndex < lesson.slides; slideIndex++) {
      const slideKey = `${lessonIndex}-${slideIndex}`;
      const isPollSlide = !!pollMap[slideKey];

      // 개별 슬라이드가 잠겨있으면 건너뛰기 (단, poll 슬라이드는 학생/관리자 모두 예외)
      if (courseStore.isSlideLocked(lessonIndex, slideIndex)) {
        if (isPollSlide) {
          console.log(`🔓 Poll 슬라이드(${slideKey})는 잠금 무시하고 표시`);
        } else {
          console.log(`🔒 Slide ${slideKey}가 잠겨있어서 건너뜀`);
          continue;
        }
      }

      const slideTitle = lesson.slideTitles?.[slideIndex] || `슬라이드 ${slides.length + 1}`;
      slides.push({
        index: slides.length,
        title: slideTitle,
        fileName: `slide-${lessonIndex}-${slideIndex}.md`,
        lessonIndex,
        slideIndex,
      });
    }
  });

  return slides;
});

const currentSlideTitle = computed(() => {
  if (courseStore.lessons.length === 0 || currentSlideIndex.value >= totalSlides.value) {
    return '슬라이드 로딩 중...';
  }

  const slide = slideList.value[currentSlideIndex.value];
  return slide?.title || `슬라이드 ${currentSlideIndex.value + 1}`;
});

const currentSlideUrl = computed(() => {
  if (courseStore.lessons.length === 0 || currentSlideIndex.value >= totalSlides.value) {
    console.log('🚫 슬라이드 URL 생성 실패:', {
      hasLessons: courseStore.lessons.length > 0,
      currentIndex: currentSlideIndex.value,
      totalSlides: totalSlides.value,
    });
    return null;
  }

  // 실제 HTML 파일 경로 생성
  const slide = slideList.value[currentSlideIndex.value];
  if (!slide) {
    console.warn('🚫 슬라이드 정보를 찾을 수 없음:', currentSlideIndex.value);
    return null;
  }

  // 파일명에서 슬라이드 번호 추출 (예: slide-0-0.md -> slide-0-0.html)
  const slideFileName = slide.fileName.replace('.md', '.html');
  const slideUrl = `/html/${slideFileName}`;

  console.log('🔗 슬라이드 URL 생성:', {
    index: currentSlideIndex.value,
    fileName: slide.fileName,
    slideFileName,
    url: slideUrl,
  });

  return slideUrl;
});

const onSlideLoad = () => {
  console.log('✅ 슬라이드 로드 완료:', {
    index: currentSlideIndex.value,
    title: currentSlideTitle.value,
    url: currentSlideUrl.value,
  });

  // 슬라이드 콘텐츠는 watcher에서 자동으로 로드됨

  // 메타 질문 보강: 관리자일 때만 수행
  if (isAdmin.value) {
    ensurePollQuestionIfMissing().catch(() => {});
  }

  // 퀴즈 탐지 및 오버레이 구성은 currentSlideContent watcher에서 처리

  // 학생용: poll 슬라이드는 오버레이를 기본으로 열어 iFrame 클릭 문제 방지
  try {
    if (activePoll.value && isStudent.value) {
      showPollOverlay.value = true;
    } else {
      showPollOverlay.value = false;
    }
  } catch (_) {}
};

// 코드 복사 함수
const copyCodeToClipboard = async (text: string, button: HTMLElement) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      // Fallback for non-secure contexts
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.width = '2em';
      textArea.style.height = '2em';
      textArea.style.padding = '0';
      textArea.style.border = 'none';
      textArea.style.outline = 'none';
      textArea.style.boxShadow = 'none';
      textArea.style.background = 'transparent';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }

    // Visual feedback
    const originalText = button.textContent;
    const originalBg = button.style.backgroundColor;
    button.textContent = '복사됨!';
    button.style.backgroundColor = '#10b981';

    setTimeout(() => {
      button.textContent = originalText;
      button.style.backgroundColor = originalBg;
    }, 1000);

    $q.notify({
      type: 'positive',
      message: '코드가 클립보드에 복사되었습니다.',
      position: 'top',
      timeout: 1000,
    });
  } catch (err) {
    console.error('클립보드 복사 실패:', err);
    $q.notify({
      type: 'negative',
      message: '코드 복사에 실패했습니다.',
      position: 'top',
      timeout: 2000,
    });
  }
};

const progressPercentage = computed(() => {
  if (totalSlides.value === 0) return 0;
  return completedSlides.value.length / totalSlides.value;
});

const isCurrentSlideCompleted = computed(() => {
  // 마지막 슬라이드에서만 완료 상태 확인
  if (currentSlideIndex.value !== totalSlides.value - 1) {
    return false;
  }
  return completedSlides.value.includes(currentSlideIndex.value);
});

// Lock된 콘텐츠가 있는지 확인
const hasLockedContent = computed(() => {
  return courseStore.lessons.some((lesson, lessonIndex) => {
    // Chapter가 잠겨있으면 true
    if (courseStore.isChapterLocked(lessonIndex)) {
      return true;
    }

    // 개별 슬라이드가 잠겨있으면 true
    for (let slideIndex = 0; slideIndex < lesson.slides; slideIndex++) {
      if (courseStore.isSlideLocked(lessonIndex, slideIndex)) {
        return true;
      }
    }

    return false;
  });
});

// 슬라이드별 poll 매핑 (고정 매핑 + 동적 감지 결과를 함께 사용)
const pollMap: Record<string, { pollId: string; result: 'bar' | 'word' }> = {
  '1-2': { pollId: 'poll-1-2', result: 'bar' },
  '1-3': { pollId: 'poll-1-3', result: 'bar' },
  '1-4': { pollId: 'poll-1-4', result: 'bar' },
  '1-5': { pollId: 'poll-1-5', result: 'bar' },
  '1-6': { pollId: 'poll-1-6', result: 'bar' },
};

// 동적으로 현재 슬라이드의 @poll 여부 탐지
const detectedPoll = ref<{ pollId: string; result: 'bar' | 'word' } | null>(null);

const isStudent = computed(() => userRole.value === 'student');
const isAdmin = computed(() => userRole.value === 'admin');

// 현재 슬라이드의 원래 lesson/slide 키 계산
const currentSlideKeyRaw = computed(() => {
  const slide = slideList.value[currentSlideIndex.value];
  if (!slide) return '';
  return `${slide.lessonIndex}-${slide.slideIndex}`;
});

const activePoll = computed(() => detectedPoll.value || pollMap[currentSlideKeyRaw.value]);

// 현재 슬라이드 변경 시 MD 읽어서 @poll 감지
watch(
  [currentSlideIndex, slideList],
  async () => {
    try {
      const slide = slideList.value[currentSlideIndex.value];
      if (!slide) {
        detectedPoll.value = null;
        return;
      }
      const url = `/slides/slide-${slide.lessonIndex}-${slide.slideIndex}.md`;
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) {
        detectedPoll.value = null;
        return;
      }
      const text = (await res.text()).toLowerCase();
      if (text.trim().startsWith('@poll')) {
        // 간단 규칙: 내용에 'word' 단어가 있으면 워드클라우드, 아니면 막대
        const isWord = /@word|word\s*cloud|워드/.test(text);
        detectedPoll.value = {
          pollId: `poll-${slide.lessonIndex}-${slide.slideIndex}`,
          result: isWord ? 'word' : 'bar',
        };
      } else {
        detectedPoll.value = null;
      }
    } catch (_) {
      detectedPoll.value = null;
    }
  },
  { immediate: true },
);

// Methods

// 직접 로그인 처리 (팝업 없이 바로 로그인)
const handleDirectLogin = async () => {
  try {
    console.log('🔐 학생 모드 - 직접 로그인 시작...');
    console.log('🔐 signInWithGoogle 함수 호출 전 상태 확인:', {
      auth: !!auth,
      googleProvider: !!googleProvider,
      isAuthenticated: isAuthenticated.value,
      user: !!user.value,
    });

    await signInWithGoogle();
    console.log('✅ 학생 모드 - 직접 로그인 완료');
  } catch (error) {
    console.error('❌ 학생 모드 - 직접 로그인 실패:', error);
    const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
    $q.notify({
      type: 'negative',
      message: `로그인에 실패했습니다: ${errorMessage}`,
      position: 'top',
      timeout: 5000,
    });
  }
};

// 게스트 로그인 처리
const handleGuestLogin = () => {
  showGuestLoginDialog.value = true;
};

// 게스트 로그인 성공 처리
const handleGuestLoginSuccess = (guestUser: any) => {
  console.log('🎭 게스트 로그인 성공:', guestUser);
  showGuestLoginDialog.value = false;

  $q.notify({
    type: 'positive',
    message: '게스트 모드로 로그인되었습니다!',
    position: 'top',
    timeout: 2000,
  });
};

// Google 로그인 요청 처리
const handleGoogleLoginRequest = () => {
  showGuestLoginDialog.value = false;
  showLoginDialog.value = true;
};

// 로그아웃 처리
const handleLogout = async () => {
  // Student mode에서도 로그아웃 확인 다이얼로그 표시
  if (isStudentMode()) {
    showLogoutDialog.value = true; // 로그아웃 확인 Dialog 표시
  } else {
    // 일반 모드에서는 기존 로그아웃 동작
    try {
      await logout();
      $q.notify({
        type: 'positive',
        message: '로그아웃되었습니다.',
        position: 'top',
      });
    } catch (error) {
      console.error('로그아웃 오류:', error);
      $q.notify({
        type: 'negative',
        message: '로그아웃 중 오류가 발생했습니다.',
        position: 'top',
      });
    }
  }
};

// 로그아웃 확인 처리
const confirmLogout = async () => {
  try {
    // 다이얼로그 닫기
    showLogoutDialog.value = false;

    // 사용자 정보 저장 (로그아웃 페이지로 전달하기 위해)
    const userName = displayName.value || guestUser.value?.name || '사용자';
    const userEmail = user.value?.email || guestUser.value?.email || '';
    const isGuest = isGuestAuthenticated.value;

    // Student mode임을 명시적으로 표시 (재로그인 시 Student mode 유지)
    localStorage.setItem('lastUserMode', 'student');
    localStorage.setItem('lastStudentPath', route.path);

    // 로그아웃 실행
    await logout();

    // 로그아웃 페이지로 이동 (사용자 정보와 함께)
    router.push({
      path: '/logout',
      query: {
        name: userName,
        email: userEmail,
        isGuest: isGuest.toString(),
        returnToStudent: 'true', // Student mode로 돌아가야 함을 표시
      },
    });
  } catch (error) {
    console.error('로그아웃 오류:', error);
    $q.notify({
      type: 'negative',
      message: '로그아웃 중 오류가 발생했습니다.',
      position: 'top',
    });
  }
};

// StudentView 초기화 관리자
class InitializationManager {
  private static instance: InitializationManager | null = null;
  private isInitialized = false;
  private isInitializing = false;
  private initPromise: Promise<void> | null = null;

  static getInstance(): InitializationManager {
    if (!this.instance) {
      this.instance = new InitializationManager();
    }
    return this.instance;
  }

  async initialize(initFn: () => Promise<void>): Promise<void> {
    // If already initialized, return immediately
    if (this.isInitialized) {
      console.log('🔄 StudentView가 이미 초기화되었습니다. 중복 초기화 방지.');
      return;
    }

    // If currently initializing, wait for existing initialization
    if (this.isInitializing && this.initPromise) {
      console.log('🔄 StudentView 초기화가 이미 진행 중입니다. 대기 중...');
      return this.initPromise;
    }

    // Start initialization
    this.isInitializing = true;
    this.initPromise = this.performInitialization(initFn);

    try {
      await this.initPromise;
      this.isInitialized = true;
    } catch (error) {
      this.isInitializing = false;
      this.initPromise = null;
      throw error;
    } finally {
      this.isInitializing = false;
    }
  }

  private async performInitialization(initFn: () => Promise<void>): Promise<void> {
    // 중복 초기화 방지를 위한 추가 체크
    if (this.isInitialized) {
      console.log('🔄 StudentView가 이미 초기화되었습니다. 중복 초기화 방지');
      return;
    }

    console.log('🎯 StudentView 초기화 시작');
    await initFn();
    console.log('✅ StudentView 초기화 완료');
  }

  reset(): void {
    this.isInitialized = false;
    this.isInitializing = false;
    this.initPromise = null;
  }
}

// 강의 로드 상태 관리
const courseLoadState = {
  isLoading: false,
  isLoaded: false,
  lastCourseId: '',
  loadPromise: null as Promise<void> | null,
};

// 초기화 관리자 인스턴스
const initManager = InitializationManager.getInstance();

// 컴포넌트 마운트 상태 관리
const isComponentMounted = ref(false);

// 슬라이드 콘텐츠 관리
// 슬라이드 콘텐츠 로드 함수
const loadSlideContent = async () => {
  if (!currentSlideUrl.value) {
    console.log('🚫 currentSlideUrl이 없어서 슬라이드 콘텐츠 로드 건너뜀');
    return;
  }

  console.log('🔄 슬라이드 콘텐츠 로드 시작:', currentSlideUrl.value);
  try {
    const response = await fetch(currentSlideUrl.value);
    if (response.ok) {
      const html = await response.text();

      // HTML에서 head 태그의 스타일 추출
      const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
      const headContent = headMatch?.[1] || '';

      // HTML에서 body 태그 내부의 내용 추출
      const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      const bodyContent = bodyMatch?.[1] || html;

      // onclick 이벤트를 data 속성으로 변환 (더 안전한 방법)
      const processedBodyContent = bodyContent.replace(
        /onclick="([^"]*)"/g,
        (match, onclickContent) => {
          // copyCode 함수 호출을 data 속성으로 변경
          if (onclickContent.includes('copyCode')) {
            return `data-copy-action="true"`;
          }
          return match;
        },
      );

      // head의 스타일과 body 내용을 결합
      const combinedContent = `
        <div class="slide-content-wrapper">
          <style>${headContent}</style>
          ${processedBodyContent}
        </div>
      `;

      currentSlideContent.value = combinedContent;
      console.log('✅ 슬라이드 콘텐츠 로드 완료');
      console.log('📄 원본 HTML 길이:', html.length);
      console.log('📄 head 콘텐츠 길이:', headContent.length);
      console.log('📄 body 콘텐츠 길이:', bodyContent.length);
      console.log('📄 결합된 콘텐츠 길이:', combinedContent.length);
    } else {
      console.error('❌ 슬라이드 콘텐츠 로드 실패:', response.status);
      currentSlideContent.value = `<div class="error-message">슬라이드를 로드할 수 없습니다. (${response.status})</div>`;
    }
  } catch (error) {
    console.error('❌ 슬라이드 콘텐츠 로드 오류:', error);
    currentSlideContent.value = `<div class="error-message">슬라이드 로드 중 오류가 발생했습니다.</div>`;
  }
};

const currentSlideContent = ref('');

// currentSlideUrl 변경 시 슬라이드 콘텐츠 자동 로드
watch(
  currentSlideUrl,
  (newUrl) => {
    if (newUrl) {
      console.log('🔄 currentSlideUrl 변경 감지, 슬라이드 콘텐츠 로드:', newUrl);
      loadSlideContent();
    }
  },
  { immediate: true },
);

// currentSlideContent 변경 감지
watch(
  currentSlideContent,
  async (newContent) => {
    console.log('📄 currentSlideContent 변경됨, 길이:', newContent.length);
    if (newContent) {
      console.log('📄 콘텐츠 미리보기:', newContent.substring(0, 100) + '...');

      // 슬라이드 콘텐츠가 로드된 후 quiz 오버레이 설정
      await nextTick();
      setupQuizOverlay().catch(() => {});

      // Cover type 슬라이드인 경우 추가 스타일 적용
      if (currentSlideUrl.value && currentSlideUrl.value.includes('-0.html')) {
        await nextTick();
        applyCoverSlideStyles();
      }
    }
  },
  { immediate: true },
);

// Cover type 슬라이드 스타일 적용 함수
const applyCoverSlideStyles = () => {
  // slide-content-wrapper 내의 요소들에 스타일 적용
  const slideWrapper = document.querySelector('.slide-content-wrapper');
  if (!slideWrapper) {
    console.log('⚠️ slide-content-wrapper를 찾을 수 없습니다.');
    return;
  }

  // 모든 텍스트 요소에 흰색 적용
  const allElements = slideWrapper.querySelectorAll('*');
  allElements.forEach((element) => {
    const el = element as HTMLElement;
    if (el.style) {
      el.style.setProperty('color', '#ffffff', 'important');
    }
  });

  // h1, h2, h3 요소들에 관리자 모드와 동일한 스타일 적용
  const headings = slideWrapper.querySelectorAll('h1, h2, h3, h4, h5, h6');
  headings.forEach((heading) => {
    const element = heading as HTMLElement;
    element.style.setProperty('color', '#ffffff', 'important');
    element.style.setProperty(
      'text-shadow',
      '3px 3px 12px rgba(0, 0, 0, 0.5), 1px 1px 4px rgba(0, 0, 0, 0.3)',
      'important',
    );
    element.style.setProperty('font-weight', '800', 'important');
  });

  // slide-container에 스타일 적용
  const slideContainer = slideWrapper.querySelector('.slide-container');
  if (slideContainer) {
    const container = slideContainer as HTMLElement;
    container.style.setProperty('background', 'rgba(255, 255, 255, 0.1)', 'important');
    container.style.setProperty('backdrop-filter', 'blur(10px)', 'important');
  }

  console.log('✅ Cover type 슬라이드 스타일 적용 완료');
};

// copyCode 함수 정의 (전역 함수로 등록)
const copyCode = (button: HTMLElement) => {
  // 다양한 코드 블록 구조 지원
  const codeBlock =
    button.closest('.code-block')?.querySelector('pre code') ||
    button.closest('.highlight')?.querySelector('pre code') ||
    button.closest('.code')?.querySelector('code') ||
    button.previousElementSibling?.querySelector('code') ||
    button.parentElement?.querySelector('code') ||
    button.closest('div')?.querySelector('code');

  if (codeBlock) {
    const textToCopy = codeBlock.textContent || '';
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        // 버튼 텍스트를 임시로 변경
        const originalText = button.textContent;
        button.textContent = '복사됨!';
        button.style.backgroundColor = '#4CAF50';
        button.style.color = 'white';

        setTimeout(() => {
          button.textContent = originalText;
          button.style.backgroundColor = '';
          button.style.color = '';
        }, 2000);
      })
      .catch((err) => {
        console.error('복사 실패:', err);
        $q.notify({
          type: 'negative',
          message: '코드 복사에 실패했습니다.',
          position: 'top',
        });
      });
  } else {
    console.warn('코드 블록을 찾을 수 없습니다.');
    $q.notify({
      type: 'warning',
      message: '복사할 코드를 찾을 수 없습니다.',
      position: 'top',
    });
  }
};

// 전역 함수로 등록 (컴포넌트 마운트 시)
onMounted(() => {
  if (typeof window !== 'undefined') {
    (window as any).copyCode = copyCode;
  }
});

// 컴포넌트 언마운트 시 전역 함수 정리
onUnmounted(() => {
  if (typeof window !== 'undefined') {
    delete (window as any).copyCode;
  }
});

// 슬라이드 클릭 이벤트 처리 (copy 버튼 등)
const handleSlideClick = (event: Event) => {
  const target = event.target as HTMLElement;

  // copy 버튼 클릭 처리
  if (
    target.getAttribute('data-copy-action') === 'true' ||
    target.closest('[data-copy-action="true"]')
  ) {
    event.preventDefault();
    event.stopPropagation();

    const button =
      target.getAttribute('data-copy-action') === 'true'
        ? target
        : (target.closest('[data-copy-action="true"]') as HTMLElement);
    if (button) {
      copyCode(button);
    }
  }
};

const loadCourse = async () => {
  const currentCourseId = courseId.value || 'ai-workshop';

  // Skip if same course is already loaded
  if (courseLoadState.isLoaded && courseLoadState.lastCourseId === currentCourseId) {
    console.log('🔄 강의가 이미 로드되었습니다. 중복 로드 방지.');
    return;
  }

  // If currently loading the same course, wait for it
  if (courseLoadState.isLoading && courseLoadState.loadPromise) {
    console.log('🔄 강의 로드가 이미 진행 중입니다. 기존 로드 대기...');
    return courseLoadState.loadPromise;
  }

  console.log('🎓 학생 모드 - 강의 로드 시작:', currentCourseId);

  if (!currentCourseId) {
    console.warn('🚫 강의 ID가 없습니다.');
    $q.notify({
      type: 'negative',
      message: '강의 ID가 없습니다.',
      position: 'top',
    });
    return;
  }

  courseLoadState.isLoading = true;
  courseLoadState.loadPromise = performCourseLoad(currentCourseId);

  try {
    await courseLoadState.loadPromise;
    courseLoadState.isLoaded = true;
    courseLoadState.lastCourseId = currentCourseId;
    console.log('✅ 강의 로드 완료');
  } catch (error) {
    console.error('❌ 강의 로드 실패:', error);
    courseLoadState.isLoaded = false;
    throw error;
  } finally {
    courseLoadState.isLoading = false;
    courseLoadState.loadPromise = null;
  }
};

const performCourseLoad = async (courseId: string) => {
  // Course store initialization
  await courseStore.initializeCourseOutline();

  // Set course ID and load lock status
  courseStore.setCurrentCourseId(courseId);

  // Load lock status from Firestore
  const lockLoaded = await courseStore.loadLockStatusFromFirestore(courseId);
  console.log('🔄 Firestore 잠금 로드 결과:', lockLoaded);

  // Subscribe to real-time lock status updates
  courseStore.subscribeLockStatus(courseId);

  console.log('📚 강의 데이터 로드 완료:', {
    lessonsCount: courseStore.lessons.length,
    lessons: courseStore.lessons.slice(0, 3),
  });

  // Restore slide index from URL
  const slideIndex = parseInt(route.query.slide as string) || 0;

  if (slideList.value.length > 0) {
    if (slideIndex >= 0 && slideIndex < slideList.value.length) {
      currentSlideIndex.value = slideIndex;
    } else {
      currentSlideIndex.value = 0;
    }
  } else {
    currentSlideIndex.value = 0;
  }

  // Load completed slides
  loadCompletedSlides();
};

// Debounce route changes to prevent rapid re-loading
const debouncedLoadCourse = debounce(loadCourse, 300);

// Reset course state when needed
const resetCourseState = () => {
  courseLoadState.isLoading = false;
  courseLoadState.isLoaded = false;
  courseLoadState.lastCourseId = '';
  courseLoadState.loadPromise = null;
};

const goToSlide = (index: number) => {
  if (index >= 0 && index < totalSlides.value) {
    currentSlideIndex.value = index;
    updateRoute();
  } else {
    console.warn(`🚫 슬라이드 인덱스 ${index}가 범위를 벗어남 (0-${totalSlides.value - 1})`);
  }
};

const updateRoute = () => {
  console.log('🔄 라우트 업데이트:', {
    courseId: courseId.value,
    slideIndex: currentSlideIndex.value,
    path: `/study/${courseId.value}`,
    query: { slide: currentSlideIndex.value.toString() },
  });

  router.push({
    path: `/study/${courseId.value}`,
    query: {
      slide: currentSlideIndex.value.toString(),
    },
  });
};

const confirmExit = () => {
  // 브라우저 종료 시도
  try {
    // window.close()는 사용자가 직접 열지 않은 창에서만 작동
    window.close();

    // window.close()가 작동하지 않으면 사용자에게 안내
    setTimeout(() => {
      $q.notify({
        type: 'info',
        message: '브라우저 탭을 직접 닫아주세요.',
        position: 'top',
        timeout: 5000,
      });
    }, 1000);
  } catch (error) {
    console.error('브라우저 종료 실패:', error);
    $q.notify({
      type: 'info',
      message: '브라우저 탭을 직접 닫아주세요.',
      position: 'top',
      timeout: 5000,
    });
  }
};

const toggleSlideCompletion = async () => {
  // 마지막 슬라이드에서만 작동
  if (currentSlideIndex.value !== totalSlides.value - 1) {
    $q.notify({
      type: 'warning',
      message: '마지막 슬라이드에서만 학습 완료를 표시할 수 있습니다.',
      position: 'top',
    });
    return;
  }

  const index = currentSlideIndex.value;

  if (isCurrentSlideCompleted.value) {
    // 완료 취소
    const newCompleted = completedSlides.value.filter((i) => i !== index);
    completedSlides.value = newCompleted;
  } else {
    // 완료 표시
    completedSlides.value.push(index);

    // 설문조사 표시
    showSurveyDialog.value = true;
  }

  // LocalStorage에 저장
  saveCompletedSlides();

  $q.notify({
    type: isCurrentSlideCompleted.value ? 'positive' : 'info',
    message: isCurrentSlideCompleted.value ? '학습 완료!' : '학습 완료 취소',
    position: 'top',
  });
};

// 설문조사 제출 처리
const handleSurveySubmit = async (surveyData: SurveyData) => {
  console.log('설문조사 데이터:', surveyData);

  try {
    // 설문조사 데이터를 LocalStorage에 저장
    const key = `survey-data-${courseId.value}`;
    const surveyWithTimestamp = {
      ...surveyData,
      submittedAt: new Date().toISOString(),
      courseId: courseId.value,
      userId: user.value?.uid,
      userEmail: user.value?.email,
    };
    localStorage.setItem(key, JSON.stringify(surveyWithTimestamp));

    // 학습 완료 이메일 전송 (설문조사 완료 후)
    const targetEmail = user.value?.email || guestUser.value?.email;
    const targetName = user.value?.displayName || guestUser.value?.name || '학습자';

    if (targetEmail) {
      try {
        const result = await emailApiService.sendLearningCompletionEmail(
          targetEmail,
          targetName,
          'AI Workshop 강의',
        );

        if (result.success) {
          $q.notify({
            type: 'positive',
            message: '학습 완료! 축하 이메일이 전송되었습니다.',
            position: 'top',
          });
        } else {
          console.warn('이메일 전송 실패:', result.message);
          $q.notify({
            type: 'warning',
            message: '이메일 전송에 실패했습니다: ' + result.message,
            position: 'top',
          });
        }
      } catch (error) {
        console.error('이메일 전송 오류:', error);
        $q.notify({
          type: 'negative',
          message: '이메일 전송 중 오류가 발생했습니다.',
          position: 'top',
        });
      }
    } else {
      console.warn('이메일 주소가 없어서 이메일을 전송할 수 없습니다.');
    }

    $q.notify({
      type: 'positive',
      message: '설문조사가 성공적으로 제출되었습니다!',
      position: 'top',
    });
  } catch (error) {
    console.error('설문조사 제출 실패:', error);
    $q.notify({
      type: 'negative',
      message: '설문조사 제출에 실패했습니다.',
      position: 'top',
    });
  }
};

const handleSurveyCompleted = () => {
  console.log('설문조사가 완료되었습니다.');

  // Student mode에서만 로그아웃 확인 팝업 표시
  if (isStudentMode()) {
    showLogoutDialog.value = true; // 로그아웃 확인 Dialog 표시
  }
};

const loadCompletedSlides = () => {
  try {
    const key = `completed-slides-${courseId.value}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      completedSlides.value = JSON.parse(stored);
    }
  } catch (error) {
    console.error('완료된 슬라이드 로드 실패:', error);
    completedSlides.value = [];
  }
};

const saveCompletedSlides = () => {
  try {
    const key = `completed-slides-${courseId.value}`;
    localStorage.setItem(key, JSON.stringify(completedSlides.value));
  } catch (error) {
    console.error('완료된 슬라이드 저장 실패:', error);
  }
};

// 슬라이드 클릭 시 네비게이션 안내 메시지 표시
const showNavigationHint = () => {
  $q.notify({
    type: 'info',
    message: '하단의 네비게이션 버튼을 사용하여 슬라이드를 이동하세요.',
    position: 'top',
    timeout: 3000,
    icon: 'info',
    actions: [{ label: '확인', color: 'white' }],
  });
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// 키보드 도움말 토글
const showKeyboardHelp = ref(false);

// Keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
  if (courseStore.lessons.length === 0) return;

  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowDown':
    case 'PageDown':
    case ' ':
      event.preventDefault();
      goToSlide(currentSlideIndex.value + 1);
      break;
    case 'ArrowLeft':
    case 'ArrowUp':
    case 'PageUp':
      event.preventDefault();
      goToSlide(currentSlideIndex.value - 1);
      break;
    case 'Home':
      event.preventDefault();
      goToSlide(0);
      break;
    case 'End':
      event.preventDefault();
      goToSlide(totalSlides.value - 1);
      break;
    case '?':
      event.preventDefault();
      showKeyboardHelp.value = !showKeyboardHelp.value;
      break;
  }
};

// 내 투표 상태를 슬라이드에 반영
const syncMyPollStateToSlide = async () => {
  try {
    const poll = activePoll.value;
    if (!poll) return;

    const db = firebaseApp ? getDatabase(firebaseApp) : null;
    if (!db) return;

    const { getAuth } = await import('firebase/auth');
    const uid = getAuth(firebaseApp!).currentUser?.uid;
    if (!uid) return;

    // 학생은 공식 votes, 관리자는 개인 userVotes 경로 사용
    const votePath = isStudent.value
      ? `polls/${poll.pollId}/votes/${uid}`
      : `polls/${poll.pollId}/userVotes/${uid}`;

    const snap = await rtdbGet(dbRef(db, votePath));
    if (!snap.exists()) return;
    const val = snap.val();

    // 슬라이드 콘텐츠에 투표 상태 반영
    console.log('✅ 투표 상태 동기화 완료:', { pollId: poll.pollId, vote: val });
  } catch (e) {
    console.warn('⚠️ poll 상태 동기화 실패:', e);
  }
};

// meta.question이 없으면 현재 슬라이드 제목으로 저장
const ensurePollQuestionIfMissing = async () => {
  try {
    if (!isAdmin.value) return;
    const poll = activePoll.value;
    if (!poll) return;
    const db = firebaseApp ? getDatabase(firebaseApp) : null;
    if (!db) return;
    const metaRef = dbRef(db, `polls/${poll.pollId}/meta`);
    const snap = await rtdbGet(metaRef);
    const metaVal = (snap.val() as any) || {};
    if (!metaVal.question || String(metaVal.question).trim() === '') {
      await rtdbSet(metaRef, { ...metaVal, question: currentSlideTitle.value });
      console.log('📝 meta.question 보강:', poll.pollId, currentSlideTitle.value);
    }
  } catch (e) {
    console.warn('⚠️ meta.question 보강 실패:', e);
  }
};

// iFrame 내부 투표 이벤트 수신 → RTDB 기록
const onMessage = async (event: MessageEvent) => {
  try {
    const data: any = event.data || {};

    // 슬라이드 네비게이션 위임 처리
    if (data && typeof data.type === 'string') {
      if (data.type === 'slide-next') {
        goToSlide(currentSlideIndex.value + 1);
        return;
      } else if (data.type === 'slide-prev') {
        goToSlide(currentSlideIndex.value - 1);
        return;
      } else if (data.type === 'slide-first') {
        goToSlide(0);
        return;
      } else if (data.type === 'slide-last') {
        goToSlide(totalSlides.value - 1);
        return;
      }
    }

    if (!data || data.type !== 'poll-vote') return;
    const db = firebaseApp ? getDatabase(firebaseApp) : null;
    if (!db) return;
    // 학생만 기록
    if (!(userRole.value === 'student')) return;
    const { pollId, optionId, text } = data;
    const uid = (await import('firebase/auth')).getAuth(firebaseApp!).currentUser?.uid;
    if (!uid || !pollId) return;

    const voteRef = dbRef(db, `polls/${pollId}/votes/${uid}`);
    const existsSnap = await rtdbGet(voteRef);
    if (existsSnap.exists()) {
      // 중복 투표 방지
      return;
    }

    // 표기 저장 (votes만)
    const valueToSave = text || String(optionId);
    await rtdbSet(voteRef, valueToSave);

    console.log('🗳️ parent saved:', { pollId, value: valueToSave });
  } catch (e) {
    console.warn('🗳️ parent save failed:', e);
  }
};

// Lifecycle
onMounted(async () => {
  // 가장 간단한 중복 방지: 이미 마운트되었다면 리턴
  if (isComponentMounted.value) {
    console.log('🔄 StudentView가 이미 마운트되었습니다. 중복 마운트 방지');
    return;
  }

  // 컴포넌트 마운트 상태 설정
  isComponentMounted.value = true;

  // Body 높이 강제 조정
  const adjustBodyHeight = () => {
    const body = document.body;
    if (body) {
      body.style.height = '100vh';
      body.style.minHeight = '100vh';
      body.style.maxHeight = '100vh';
      body.style.overflow = 'hidden';
      console.log('📏 Body 높이 조정 완료: 100vh');
    }
  };

  // 즉시 적용
  adjustBodyHeight();

  // DOM이 완전히 로드된 후 다시 적용
  setTimeout(adjustBodyHeight, 100);
  setTimeout(adjustBodyHeight, 500);

  try {
    await initManager.initialize(async () => {
      // Firebase 인증 초기화
      initAuth();

      // 강의 로드
      await loadCourse();

      // 키보드 네비게이션 활성화
      document.addEventListener('keydown', handleKeydown);

      // message 이벤트 리스너 등록
      window.addEventListener('message', onMessage);

      // 컴포넌트 초기화 완료
      console.log('✅ StudentView 초기화 완료');
    });
  } catch (error) {
    console.error('❌ StudentView 초기화 실패:', error);
    isComponentMounted.value = false;
  }
});

onUnmounted(() => {
  console.log('🔄 StudentView 언마운트');

  // 컴포넌트 마운트 상태 리셋
  isComponentMounted.value = false;

  document.removeEventListener('keydown', handleKeydown);
  window.removeEventListener('message', onMessage);

  // Stop all watchers
  stopWatchers.forEach((stop) => stop());
  stopWatchers.length = 0;

  // Reset course state on unmount
  resetCourseState();

  // Don't reset initialization on unmount to prevent re-initialization
  // initManager.reset(); // Only reset when truly needed
});

// Optimized watch functions to prevent excessive re-mounting

// 1. More specific route watching
let lastLessonsSignature = '';
const stopWatchers: Array<() => void> = [];

// Course ID watcher
const courseIdWatcher = watch(
  () => route.params.courseId,
  (newCourseId, oldCourseId) => {
    // Only reload if courseId actually changed
    if (newCourseId && newCourseId !== oldCourseId) {
      console.log('📖 Course ID 변경됨:', oldCourseId, '->', newCourseId);
      resetCourseState(); // Reset state before loading new course
      debouncedLoadCourse();
    }
  },
  { immediate: false }, // Don't trigger immediately on mount
);

// Slide index watcher
const slideWatcher = watch(
  () => route.query.slide,
  (newSlide, oldSlide) => {
    // Only update if slide actually changed and lessons are loaded
    if (newSlide !== oldSlide && courseStore.lessons.length > 0) {
      const slideIndex = parseInt(newSlide as string) || 0;
      const maxIndex = totalSlides.value - 1;
      const targetIndex = Math.min(Math.max(slideIndex, 0), maxIndex);

      if (currentSlideIndex.value !== targetIndex) {
        console.log('📄 슬라이드 인덱스 변경:', currentSlideIndex.value, '->', targetIndex);
        currentSlideIndex.value = targetIndex;
      }
    }
  },
  { immediate: false },
);

// Lessons watcher with better comparison
const lessonsWatcher = watch(
  () => courseStore.lessons.map((l) => `${l?.title}-${l?.slides}`).join('|'),
  async (newSignature) => {
    // Only react if lessons structure actually changed
    if (newSignature !== lastLessonsSignature && newSignature !== '') {
      console.log('📚 강의 구조 변경 감지');
      lastLessonsSignature = newSignature;

      try {
        const cid = (courseId.value || 'ai-workshop') as string;
        await courseStore.loadLockStatusFromFirestore(cid);
        console.log('🔒 StudentView: lessons 갱신 → Firestore 잠금 재적용 완료');
      } catch (e) {
        console.warn('⚠️ StudentView: Firestore 잠금 재적용 실패(무시 가능):', e);
      }
    }
  },
  { immediate: false },
);

// Store watcher stop functions
stopWatchers.push(courseIdWatcher, slideWatcher, lessonsWatcher);

const openPollResultWindow = (pollId: string) => {
  const url = `/#/poll-result?pollId=${encodeURIComponent(pollId)}`;
  window.open(url, '_blank', 'noopener,noreferrer,width=520,height=420');
};

// 관리자: 현재 Poll 결과 초기화 (LocalStorage + RTDB)
const clearPollData = async (pollId: string) => {
  try {
    if (!isAdmin.value) return;
    const confirm = await $q
      .dialog({
        title: '결과 초기화',
        message:
          '해당 투표의 나의 선택(LocalStorage)과 RTDB의 표기를 삭제할까요?\n이 작업은 되돌릴 수 없습니다.',
        cancel: true,
        ok: { label: '초기화', color: 'negative' },
      })
      .onOk(() => true)
      .onCancel(() => false);
    if (!confirm) return;

    // LocalStorage 정리 (학생/관리자 공통 키 가정 없으므로 폴리시: 이 탭의 로컬 poll 관련 키 전체 제거)
    try {
      Object.keys(localStorage)
        .filter((k) => k.toLowerCase().includes('poll'))
        .forEach((k) => localStorage.removeItem(k));
    } catch (_) {}

    const db = firebaseApp ? getDatabase(firebaseApp) : null;
    if (db) {
      const { getAuth } = await import('firebase/auth');
      const uid = getAuth(firebaseApp!).currentUser?.uid;
      if (uid) {
        // 관리자 개인 userVotes 제거
        await rtdbRemove(dbRef(db, `polls/${pollId}/userVotes/${uid}`)).catch(() => {});
        // 학생 표기 전체를 지우려면 아래 주석 해제 (주의: 전체 데이터 삭제)
        // await rtdbRemove(dbRef(db, `polls/${pollId}/votes`)).catch(() => {});
      }
    }

    $q.notify({ type: 'positive', message: '투표 결과가 초기화되었습니다.', position: 'top' });
    // 슬라이드 상태 초기화
    console.log('✅ 슬라이드 상태 초기화 완료');
  } catch (e) {
    $q.notify({ type: 'negative', message: '초기화 중 오류가 발생했습니다.', position: 'top' });
  }
};

// 퀴즈 오버레이 상태
const quizOverlay = ref<{
  visible: boolean;
  question: string;
  options: string[];
  correctIndex: number | null;
  answerText: string;
  lastChoice: number | null;
  isOX: boolean;
  revealed: boolean;
}>({
  visible: false,
  question: '',
  options: [],
  correctIndex: null,
  answerText: '',
  lastChoice: null,
  isOX: false,
  revealed: false,
});

const parseQuizFromSlide = (): {
  question: string;
  options: string[];
  correctIndex: number | null;
  answerText: string;
  isOX: boolean;
} | null => {
  try {
    // 직접 렌더링된 슬라이드 콘텐츠에서 퀴즈 파싱
    const slideContainer = document.querySelector('.slide-viewer');
    if (!slideContainer) return null;
    const isQuiz = slideContainer.classList.contains('quiz-slide');
    if (!isQuiz) return null;
    const qEl = slideContainer.querySelector('.quiz-question');
    const question = (qEl?.textContent || '').trim();
    const options = Array.from(slideContainer.querySelectorAll('.quiz-option')).map((el) =>
      (el.textContent || '').replace(/^\d+\.\s*/, '').trim(),
    );
    const answerRaw = (slideContainer.querySelector('#quiz-answer-data')?.textContent || '').trim();
    // OX 퀴즈 여부 판별: 옵션에 '맞다/아니다'가 포함되거나, 정답 텍스트에 O/X 표기가 있으면 OX
    const normalizedOptions = options.map((s) => s.replace(/\s+/g, ''));
    const opt0 = normalizedOptions[0] ?? '';
    const opt1 = normalizedOptions[1] ?? '';
    const looksOX =
      (normalizedOptions.length === 2 &&
        (/^(맞다|그렇다|O)$/i.test(opt0) || /^(아니다|아니오|그렇지않다|X)$/i.test(opt1))) ||
      /정답\s*[:\-–]?\s*[OX]/i.test(answerRaw);

    let correctIndex: number | null = null;
    if (looksOX) {
      const hasO = /정답\s*[:\-–]?\s*O/i.test(answerRaw);
      const hasX = /정답\s*[:\-–]?\s*X/i.test(answerRaw);
      if (hasO) correctIndex = 1;
      else if (hasX) correctIndex = 2;
    } else {
      // 일반 숫자형 정답
      const m = answerRaw.match(/(^|\D)(\d+)(?=\D|$)/);
      correctIndex = m ? Number(m[2]) : null;
    }
    return { question, options, correctIndex, answerText: answerRaw, isOX: !!looksOX };
  } catch (e) {
    return null;
  }
};

const setupQuizOverlay = async () => {
  const data = parseQuizFromSlide();
  if (!data || !data.question || data.options.length === 0) {
    quizOverlay.value = {
      visible: false,
      question: '',
      options: [],
      correctIndex: null,
      answerText: '',
      lastChoice: null,
      isOX: false,
      revealed: false,
    };
    return;
  }
  quizOverlay.value = {
    visible: true,
    question: data.question,
    options: data.options,
    correctIndex: data.correctIndex,
    answerText: data.answerText,
    lastChoice: null,
    isOX: data.isOX,
    revealed: false,
  };
};

const handleQuizClick = (idx: number) => {
  if (!quizOverlay.value.visible) return;
  quizOverlay.value.lastChoice = idx;
  quizOverlay.value.revealed = true;
};
</script>

<style scoped>
.slide-container {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  overflow: auto;
  width: 100%;
  max-width: 1200px;
  height: auto;
  min-height: 700px;
  max-height: 80vh;
  margin: 0 auto;
  position: relative;
  z-index: 1 !important;
  pointer-events: auto !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
}

.slide-viewer-container {
  flex: 1;
  position: relative;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  overflow: auto;
}

.slide-viewer {
  width: 100%;
  height: auto;
  min-height: 100%;
  border: none;
  border-radius: 8px;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.slide-viewer-container {
  position: relative;
}

.quiz-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001; /* 네비게이션보다 높게 설정 */
  pointer-events: auto; /* 전체 오버레이 클릭 허용 */
  background: rgba(0, 0, 0, 0.3); /* 배경 어둡게 */
}
.quiz-overlay .quiz-card {
  pointer-events: auto;
  width: 96%;
  max-width: 980px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  padding: 22px 24px;
  min-height: 60vh; /* 기존 대비 약 2배 높이 확보 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1002;
}

.options-grid {
  margin-top: 8px;
}

.option-btn {
  text-align: left;
  border-width: 2px;
  padding: 12px 16px;
  cursor: pointer !important;
  pointer-events: auto !important;
  position: relative;
  z-index: 1003;
}
.option-btn:hover {
  border-color: #3b82f6;
  background-color: rgba(59, 130, 246, 0.1) !important;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 600px;
  color: #666;
}

.course-info {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
}

.poll-overlay {
  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 1000; /* 오버레이를 최상단으로 */
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
  padding: 12px;
  max-width: 380px;
  pointer-events: auto;
}

/* 학생용 투표 FAB */
.poll-fab {
  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 1001;
}

/* iFrame 클릭 차단 레이어 (폴 활성화 시에만, 오버레이 열렸을 때) */
/* 슬라이드 뷰어 스타일 */
.slide-viewer {
  width: 100%;
  height: 100%;
  border: none;
  background: white;
  overflow: auto;
}

.slide-content-wrapper {
  width: 100%;
  height: auto;
  min-height: 100%;
  overflow: auto;
  position: relative;
  z-index: 0 !important;
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Quasar 버튼 커서 명시 */
:deep(.poll-overlay .q-btn) {
  cursor: pointer;
}

/* 모든 네비게이션 버튼에 대한 전역 스타일 */
:deep(.fixed-navigation-bar .q-btn) {
  cursor: pointer !important;
  pointer-events: auto !important;
  z-index: 10001 !important;
  position: relative !important;
}

:deep(.fixed-navigation-bar .q-btn__wrapper) {
  cursor: pointer !important;
  pointer-events: auto !important;
  z-index: 10001 !important;
  position: relative !important;
}

:deep(.q-page-sticky .q-btn) {
  cursor: pointer !important;
  pointer-events: auto !important;
  z-index: 10001 !important;
  position: relative !important;
}

/* 하단 네비게이션 바 버튼들 스타일 */
.fixed-navigation-bar .q-btn {
  width: 32px;
  height: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  border-radius: 50%;
  backdrop-filter: blur(10px);
  cursor: pointer !important;
  pointer-events: auto !important;
  z-index: 1001 !important;
  position: relative !important;
}

.fixed-navigation-bar .q-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  cursor: pointer !important;
}

.fixed-navigation-bar .q-btn__wrapper {
  cursor: pointer !important;
  pointer-events: auto !important;
  z-index: 1001 !important;
  position: relative !important;
}

/* 슬라이드 정보 표시 스타일 (관리자 모드와 동일) */
.slide-info {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 32px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 4px 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.slide-counter {
  font-size: 0.9em;
  font-weight: bold;
  color: #333;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* q-page z-index 조정 (관리자 모드와 동일한 배경) */
.q-page {
  z-index: 1 !important;
  position: relative !important;
  padding-top: 32px !important; /* 상단 패딩 강제 적용 */
  background: rgba(255, 255, 255, 0.3) !important;
  backdrop-filter: blur(5px) !important;
  border-radius: 8px !important;
  margin: 10px !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
}

/* body 높이 조정 */
body {
  height: 100vh !important;
  min-height: 100vh !important;
  max-height: 100vh !important;
  overflow: hidden !important;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
}

/* 더 강력한 body 높이 조정 */
body.desktop.no-touch.body--light {
  height: 100vh !important;
  min-height: 100vh !important;
  max-height: 100vh !important;
  overflow: hidden !important;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
}

/* Student View에서만 body 스타일 적용 */
:global(body) {
  height: 100vh !important;
  min-height: 100vh !important;
  max-height: 100vh !important;
  overflow: hidden !important;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
}

/* Student mode 배경 이미지 (관리자 모드와 동일) */
.student-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  /* background-image: url('/images/20250806_1231_churchtech.png'); */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  z-index: 0;
  opacity: 1;
  pointer-events: none;
}

/* 반응형 디자인 */

/* 모바일 (320px - 768px) */
@media (max-width: 768px) {
  .slide-container {
    width: 100% !important;
    max-width: 100% !important;
    height: auto !important;
    min-height: calc(100vh - 150px) !important;
    max-height: calc(100vh - 100px) !important;
    margin: 10px !important;
    border-radius: 4px !important;
    overflow: auto !important;
  }

  .slide-viewer {
    height: 100% !important;
    border-radius: 4px !important;
  }

  .fixed-navigation-bar {
    position: fixed !important;
    bottom: 20px !important;
    right: 10px !important;
    left: 10px !important;
    width: auto !important;
    padding: 12px 16px !important;
    border-radius: 16px !important;
    gap: 8px !important;
    z-index: 10000 !important;
    background: rgba(255, 255, 255, 0.95) !important;
    backdrop-filter: blur(10px) !important;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
  }

  .fixed-navigation-bar .q-btn {
    width: 44px !important;
    height: 44px !important;
    min-width: 44px !important;
    min-height: 44px !important;
    border-radius: 50% !important;
    flex-shrink: 0 !important;
  }

  .fixed-navigation-bar .q-btn__wrapper {
    width: 100% !important;
    height: 100% !important;
    border-radius: 50% !important;
  }

  .fixed-navigation-bar .text-h6 {
    font-size: 1rem !important;
  }

  .fixed-navigation-bar .text-caption {
    font-size: 0.7rem !important;
  }

  .slide-info {
    width: auto !important;
    min-width: 60px !important;
    height: 28px !important;
    padding: 3px 6px !important;
  }

  .slide-counter {
    font-size: 0.8em !important;
  }

  .slide-viewer-container {
    min-height: 300px !important;
  }

  .loading-state {
    min-height: 300px !important;
  }

  /* 헤더 영역 모바일 최적화 */
  .text-h5 {
    font-size: 1.2rem !important;
  }

  .text-subtitle1 {
    font-size: 0.9rem !important;
  }

  /* 사이드바 모바일 최적화 */
  .q-drawer {
    width: 320px !important;
  }

  .q-drawer .q-pa-md {
    padding: 16px !important;
  }

  .text-h6 {
    font-size: 1.2rem !important;
  }

  .text-subtitle2 {
    font-size: 1rem !important;
  }

  .q-item {
    padding: 8px 12px !important;
    border-radius: 8px !important;
    margin-bottom: 4px !important;
    color: #333 !important;
    font-weight: 500 !important;
  }

  .q-item:hover {
    background-color: rgba(0, 0, 0, 0.05) !important;
    color: #1976d2 !important;
  }

  .q-item--active {
    background-color: rgba(25, 118, 210, 0.1) !important;
    border-left: 3px solid #1976d2 !important;
    color: #1976d2 !important;
    font-weight: 600 !important;
  }

  .q-item .q-item__label {
    color: inherit !important;
    font-weight: inherit !important;
  }

  /* 모바일에서 상단 패딩 조정 */
  .q-page {
    padding-top: 24px !important;
  }
}

/* 태블릿 (769px - 1024px) */
@media (min-width: 769px) and (max-width: 1024px) {
  .slide-container {
    width: 100% !important;
    max-width: 1100px !important;
    height: auto !important;
    min-height: calc(100vh - 120px) !important;
    max-height: calc(100vh - 80px) !important;
    margin: 20px auto !important;
    overflow: auto !important;
  }

  .fixed-navigation-bar {
    bottom: 30px !important;
    right: 20px !important;
    left: auto !important;
    width: auto !important;
    padding: 12px 20px !important;
    border-radius: 20px !important;
    background: rgba(255, 255, 255, 0.95) !important;
    backdrop-filter: blur(10px) !important;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15) !important;
  }

  .fixed-navigation-bar .q-btn {
    width: 48px !important;
    height: 48px !important;
    min-width: 48px !important;
    min-height: 48px !important;
    border-radius: 50% !important;
    flex-shrink: 0 !important;
  }

  .text-h5 {
    font-size: 1.4rem !important;
  }

  .text-subtitle1 {
    font-size: 1rem !important;
  }

  /* 태블릿 사이드바 개선 */
  .q-drawer {
    width: 340px !important;
  }

  .q-drawer .q-pa-md {
    padding: 20px !important;
  }

  .q-item {
    padding: 10px 16px !important;
    border-radius: 8px !important;
    margin-bottom: 6px !important;
    color: #333 !important;
    font-weight: 500 !important;
  }

  .q-item:hover {
    background-color: rgba(0, 0, 0, 0.05) !important;
    color: #1976d2 !important;
  }

  .q-item--active {
    background-color: rgba(25, 118, 210, 0.1) !important;
    border-left: 3px solid #1976d2 !important;
    color: #1976d2 !important;
    font-weight: 600 !important;
  }

  .q-item .q-item__label {
    color: inherit !important;
    font-weight: inherit !important;
  }

  /* 태블릿에서 상단 패딩 조정 */
  .q-page {
    padding-top: 28px !important;
  }
}

/* 대형 화면 (1025px 이상) */
@media (min-width: 1025px) {
  .slide-container {
    width: 1200px !important;
    max-width: 1200px !important;
    height: auto !important;
    min-height: 700px !important;
    max-height: 80vh !important;
    margin: 0 auto !important;
    overflow: auto !important;
  }

  .fixed-navigation-bar {
    bottom: 50px !important;
    right: 20px !important;
    left: auto !important;
    width: auto !important;
    padding: 8px !important;
  }

  .fixed-navigation-bar .q-btn {
    width: 32px !important;
    height: 32px !important;
  }

  .text-h5 {
    font-size: 1.5rem !important;
  }

  .text-subtitle1 {
    font-size: 1.1rem !important;
  }

  /* 데스크톱 사이드바 개선 */
  .q-drawer {
    width: 360px !important;
  }

  .q-drawer .q-pa-md {
    padding: 24px !important;
  }

  .q-item {
    padding: 12px 20px !important;
    border-radius: 10px !important;
    margin-bottom: 8px !important;
    color: #333 !important;
    font-weight: 500 !important;
  }

  .q-item:hover {
    background-color: rgba(0, 0, 0, 0.05) !important;
    color: #1976d2 !important;
  }

  .q-item--active {
    background-color: rgba(25, 118, 210, 0.1) !important;
    border-left: 4px solid #1976d2 !important;
    color: #1976d2 !important;
    font-weight: 600 !important;
  }

  .q-item .q-item__label {
    color: inherit !important;
    font-weight: inherit !important;
  }

  /* 데스크톱에서 상단 패딩 조정 */
  .q-page {
    padding-top: 32px !important;
  }
}

/* 초소형 모바일 (320px 이하) */
@media (max-width: 320px) {
  .slide-container {
    margin: 5px !important;
    height: auto !important;
    min-height: calc(100vh - 150px) !important;
    max-height: calc(100vh - 80px) !important;
    overflow: auto !important;
  }

  .fixed-navigation-bar {
    bottom: 15px !important;
    right: 5px !important;
    left: 5px !important;
    padding: 6px 8px !important;
  }

  .fixed-navigation-bar .q-btn {
    width: 32px !important;
    height: 32px !important;
  }

  .text-h5 {
    font-size: 1rem !important;
  }

  .text-subtitle1 {
    font-size: 0.8rem !important;
  }

  .q-drawer {
    width: 280px !important;
  }

  .q-drawer .q-pa-md {
    padding: 12px !important;
  }

  .mobile-menu-btn {
    bottom: 80px !important;
    right: 10px !important;
  }

  /* 초소형 모바일에서 상단 패딩 조정 */
  .q-page {
    padding-top: 20px !important;
  }
}

/* 모바일 메뉴 버튼 반응형 */
@media (max-width: 768px) {
  .mobile-menu-btn {
    bottom: 90px !important;
    right: 15px !important;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .mobile-menu-btn {
    bottom: 80px !important;
    right: 20px !important;
  }
}

@media (min-width: 1025px) {
  .mobile-menu-btn {
    bottom: 80px !important;
    right: 18px !important;
  }
}

/* Cover Type 슬라이드 스타일 - 관리자 모드와 동일하게 설정 (최고 우선순위) */
.slide-content-wrapper h1,
.slide-content-wrapper h2,
.slide-content-wrapper h3 {
  color: #ffffff !important;
  text-shadow:
    3px 3px 12px rgba(0, 0, 0, 0.5),
    1px 1px 4px rgba(0, 0, 0, 0.3) !important;
  font-weight: 800 !important;
}

.slide-content-wrapper .slide-container {
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(10px) !important;
}

/* 추가 강화: 모든 cover type 슬라이드 요소에 대한 최고 우선순위 스타일 */
.slide-content-wrapper * {
  color: #ffffff !important;
}

.slide-content-wrapper h1,
.slide-content-wrapper h2,
.slide-content-wrapper h3,
.slide-content-wrapper h4,
.slide-content-wrapper h5,
.slide-content-wrapper h6 {
  color: #ffffff !important;
  text-shadow:
    3px 3px 12px rgba(0, 0, 0, 0.5),
    1px 1px 4px rgba(0, 0, 0, 0.3) !important;
}
</style>
