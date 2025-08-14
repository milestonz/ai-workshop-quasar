<template>
  <q-layout view="hHh LpR fFf">
    <!-- 사이드바 -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-1"
      :width="300"
      v-if="!requireStudentLogin || isAuthenticated || isGuestAuthenticated"
    >
      <q-scroll-area class="fit">
        <div class="q-pa-md">
          <div class="text-h6 text-weight-bold q-mb-md">📚 AI Workshop 강의</div>

          <!-- 강의 정보 -->
          <div class="course-info q-mb-lg">
            <div class="text-subtitle2 text-weight-medium q-mb-sm">📖 강의 정보</div>
            <q-card flat bordered>
              <q-card-section>
                <div class="text-body2">
                  AI Workshop 강의입니다. 마크다운 슬라이드를 HTML로 변환하여 학습할 수 있습니다.
                </div>
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

          <!-- Lock된 슬라이드 안내 -->
          <q-banner v-if="hasLockedContent" class="bg-orange-1 text-orange-9 q-mb-md">
            <template v-slot:avatar>
              <q-icon name="lock" color="orange" />
            </template>
            <div class="text-caption">
              <strong>잠금된 콘텐츠:</strong><br />
              일부 Chapter나 슬라이드가 관리자에 의해 잠겨있습니다.
            </div>
          </q-banner>
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

    <!-- 메인 콘텐츠 -->
    <q-page-container>
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
      <q-page v-else class="q-pa-sm">
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
          <div v-if="currentSlideUrl" class="slide-viewer-container">
            <iframe :src="currentSlideUrl" class="slide-viewer" @load="onSlideLoad" />
          </div>

          <div v-else class="loading-state">
            <q-spinner-dots size="50px" color="primary" />
            <div class="text-h6 q-mt-md">슬라이드를 로딩하는 중...</div>
          </div>
        </div>
      </q-page>
    </q-page-container>

    <!-- 고정된 하단 네비게이션 바 -->
    <q-page-sticky
      position="bottom"
      :offset="[0, 0]"
      v-if="!requireStudentLogin || isAuthenticated || isGuestAuthenticated"
    >
      <div class="fixed-navigation-bar">
        <div class="row items-center justify-center q-pa-md">
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
            />
          </div>

          <!-- 슬라이드 정보 -->
          <div class="col-auto q-mx-lg">
            <div class="text-center">
              <div class="text-h6 text-weight-bold">
                {{ currentSlideIndex + 1 }} / {{ totalSlides }}
              </div>
              <div class="text-caption text-grey-7">{{ currentSlideTitle }}</div>
              <div v-if="hasLockedContent" class="text-caption text-orange-7 q-mt-xs">
                🔒 일부 콘텐츠가 잠겨있습니다
              </div>
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
            />
          </div>
        </div>
      </div>
    </q-page-sticky>

    <!-- 모바일 메뉴 버튼 -->
    <q-page-sticky position="bottom-right" :offset="[18, 80]">
      <q-btn fab icon="menu" color="primary" @click="leftDrawerOpen = !leftDrawerOpen" />
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

    <!-- 로그인 다이얼로그 -->
    <LoginDialog v-model="showLoginDialog" />

    <!-- 게스트 로그인 다이얼로그 -->
    <GuestLoginDialog
      v-model="showGuestLoginDialog"
      @guest-login-success="handleGuestLoginSuccess"
      @google-login-request="handleGoogleLoginRequest"
    />

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
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useCourseStore } from '../stores/course';
import { useAuth } from '../composables/useAuth';
import { useGuestAuth } from '../composables/useGuestAuth';
import SimpleSlideViewer from '../components/SimpleSlideViewer.vue';
import LoginDialog from '../components/LoginDialog.vue';
import GuestLoginDialog from '../components/GuestLoginDialog.vue';
import SurveyDialog from '../components/SurveyDialog.vue';
import { emailApiService } from '../services/emailApiService';
import { surveyApiService } from '../services/surveyApiService';
import type { SurveyData } from '../types/survey';
import { isStudentMode } from 'src/utils/logger';

const $q = useQuasar();
const route = useRoute();
const router = useRouter();
const courseStore = useCourseStore();
const { user, isAuthenticated, displayName, photoURL, logout, initAuth, signInWithGoogle } =
  useAuth();
const { guestUser, isGuestAuthenticated, signInAsGuest } = useGuestAuth();

// State
const leftDrawerOpen = ref(true);
const currentSlideIndex = ref(0);
const completedSlides = ref<number[]>([]);
const showLoginDialog = ref(false);
const showGuestLoginDialog = ref(false);
const showSurveyDialog = ref(false);
const showExitDialog = ref(false); // 종료 확인 Dialog 상태
const exitDialogTitle = ref('학습 종료'); // 종료 확인 Dialog 제목
const showLogoutDialog = ref(false); // 로그아웃 확인 Dialog 상태

// 학생 로그인 요구 설정 (기본: 로그인 필수)
// localStorage에 'false'로 명시된 경우에만 비활성화
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
      // 개별 슬라이드가 잠겨있으면 건너뛰기
      if (courseStore.isSlideLocked(lessonIndex, slideIndex)) {
        console.log(`🔒 Slide ${lessonIndex}-${slideIndex}가 잠겨있어서 건너뜀`);
        continue;
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
  const slideUrl = `/generated/slides/${slideFileName}`;

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

  // iframe 내부에 복사 기능 및 네비게이션 기능 주입
  setTimeout(() => {
    try {
      const iframe = document.querySelector('.slide-viewer') as HTMLIFrameElement;
      if (iframe && iframe.contentWindow && iframe.contentDocument) {
        // 복사 버튼 클릭 이벤트 추가
        iframe.contentDocument.addEventListener('click', async (event) => {
          const target = event.target as HTMLElement;

          // 코드 블록 복사 버튼 클릭 처리
          if (target.classList.contains('copy-button')) {
            const codeBlockWrapper = target.closest('.code-block-wrapper');
            if (codeBlockWrapper) {
              const codeElement = codeBlockWrapper.querySelector('pre code') as HTMLElement;
              if (codeElement) {
                copyCodeToClipboard(codeElement.textContent || '', target);
              }
            }
            return; // 복사 버튼 클릭 시 네비게이션 방지
          }

          // 코드 블록 영역 클릭 시 네비게이션 방지
          if (
            target.closest('.code-block-wrapper') ||
            target.closest('pre') ||
            target.closest('code')
          ) {
            return;
          }

          // 슬라이드 전체 영역 클릭 시 다음 슬라이드로 이동
          if (
            target.tagName === 'BODY' ||
            target.classList.contains('slide-content') ||
            target.classList.contains('slide-viewer')
          ) {
            event.preventDefault();
            event.stopPropagation();

            // 다음 슬라이드로 이동
            const nextIndex = currentSlideIndex.value + 1;
            console.log('🔄 슬라이드 클릭 감지:', {
              currentIndex: currentSlideIndex.value,
              nextIndex,
              totalSlides: totalSlides.value,
              canMove: nextIndex < totalSlides.value,
            });

            if (nextIndex < totalSlides.value) {
              console.log('🔄 슬라이드 클릭으로 다음 슬라이드 이동:', nextIndex);
              currentSlideIndex.value = nextIndex;
              await nextTick(); // Vue 업데이트 보장
              updateRoute();
            } else {
              // 마지막 슬라이드인 경우 안내 메시지
              $q.notify({
                type: 'info',
                message: '마지막 슬라이드입니다.',
                position: 'top',
                timeout: 2000,
              });
            }
          }
        });

        console.log('✅ iframe 내부 복사 기능 및 네비게이션 기능 주입 완료');
      }
    } catch (error) {
      console.log('⚠️ iframe 내부 기능 주입 실패 (CORS 정책):', error);
    }
  }, 100);
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

// Methods
// 직접 로그인 처리 (팝업 없이 바로 로그인)
const handleDirectLogin = async () => {
  try {
    console.log('🔐 학생 모드 - 직접 로그인 시작...');
    await signInWithGoogle();
    console.log('✅ 학생 모드 - 직접 로그인 완료');
  } catch (error) {
    console.error('❌ 학생 모드 - 직접 로그인 실패:', error);
    $q.notify({
      type: 'negative',
      message: '로그인에 실패했습니다. 다시 시도해주세요.',
      position: 'top',
      timeout: 3000,
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

const loadCourse = async () => {
  console.log('🎓 학생 모드 - 강의 로드 시작:', courseId.value);

  if (!courseId.value) {
    console.warn('🚫 강의 ID가 없습니다.');
    $q.notify({
      type: 'negative',
      message: '강의 ID가 없습니다.',
      position: 'top',
    });
    return;
  }

  try {
    // course 스토어 초기화
    await courseStore.initializeCourseOutline();

    // 코스ID 설정 및 Firestore에서 잠금 상태도 로드
    const cid = (courseId.value || 'ai-workshop') as string;
    courseStore.setCurrentCourseId(cid);

    // Firestore에서 잠금 상태를 먼저 로드하고, 그 다음에 UI를 업데이트
    const ok = await courseStore.loadLockStatusFromFirestore(cid);
    console.log('🔄 Firestore 잠금 로드 결과:', ok);

    // 실시간 잠금 상태 구독
    courseStore.subscribeLockStatus(cid);

    console.log('📚 강의 데이터 로드 완료:', {
      lessonsCount: courseStore.lessons.length,
      lessons: courseStore.lessons.slice(0, 3), // 처음 3개 챕터만 로그
    });

    // URL에서 슬라이드 인덱스 복원 (Lock된 슬라이드 고려)
    const slideIndex = parseInt(route.query.slide as string) || 0;

    // Lock된 슬라이드를 고려하여 유효한 슬라이드 인덱스 찾기
    if (slideList.value.length > 0) {
      // URL의 슬라이드 인덱스가 유효한지 확인
      if (slideIndex >= 0 && slideIndex < slideList.value.length) {
        currentSlideIndex.value = slideIndex;
      } else {
        // 유효하지 않으면 첫 번째 잠금 해제된 슬라이드로 이동
        currentSlideIndex.value = 0;
        console.log('🔒 URL의 슬라이드 인덱스가 유효하지 않아 첫 번째 슬라이드로 이동');
      }
    } else {
      currentSlideIndex.value = 0;
      console.log('🔒 잠금 해제된 슬라이드가 없음');
    }
    console.log('📄 현재 슬라이드 인덱스:', currentSlideIndex.value);

    // 완료된 슬라이드 로드
    loadCompletedSlides();
  } catch (error) {
    console.error('❌ 강의 로드 실패:', error);
    $q.notify({
      type: 'negative',
      message: '강의 로드에 실패했습니다.',
      position: 'top',
    });
  }
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

// 로그아웃 확인 처리
const confirmLogout = async () => {
  try {
    // 다이얼로그 닫기
    showLogoutDialog.value = false;

    // 사용자 정보 저장 (로그아웃 페이지로 전달하기 위해)
    const userName = displayName.value || guestUser.value?.name || '사용자';
    const userEmail = user.value?.email || guestUser.value?.email || '';
    const isGuest = isGuestAuthenticated.value;

    // 로그아웃 실행
    await logout();

    // 로그아웃 페이지로 이동 (사용자 정보와 함께)
    router.push({
      path: '/logout',
      query: {
        name: userName,
        email: userEmail,
        isGuest: isGuest.toString(),
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
    // 서버에 설문조사 제출
    const apiResult = await surveyApiService.submitSurvey(surveyData);

    if (!apiResult.success) {
      throw new Error(apiResult.message);
    }

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

// Lifecycle
onMounted(async () => {
  // Firebase 인증 초기화
  initAuth();

  await loadCourse();
  // 키보드 네비게이션 활성화
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
});

// Watch for route changes
watch(
  () => route.params.courseId,
  (newCourseId) => {
    if (newCourseId) {
      loadCourse();
    }
  },
  { immediate: true },
);

watch(
  () => route.query.slide,
  (newSlide) => {
    if (newSlide && courseStore.lessons.length > 0) {
      const slideIndex = parseInt(newSlide as string) || 0;
      currentSlideIndex.value = Math.min(slideIndex, totalSlides.value - 1);
    }
  },
);
</script>

<style scoped>
.slide-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  min-height: 600px;
  height: calc(100vh - 200px); /* 고정된 하단 네비게이션 바 공간 확보 */
  max-height: 900px; /* 최대 높이 제한 */
}

.slide-viewer-container {
  width: 100%;
  height: 100%;
  min-height: 600px;
}

.slide-viewer {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 8px;
}

.slide-viewer-container {
  position: relative;
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

/* 반응형 디자인 */
@media (max-width: 768px) {
  .leftDrawerOpen {
    width: 100%;
  }

  .slide-container {
    height: calc(100vh - 160px); /* 모바일에서 고정 네비게이션 바 공간 확보 */
    min-height: 400px;
  }

  .slide-viewer-container {
    min-height: 400px;
  }

  .loading-state {
    min-height: 400px;
  }
}

/* 태블릿 디자인 */
@media (min-width: 769px) and (max-width: 1024px) {
  .slide-container {
    height: calc(100vh - 180px);
    min-height: 500px;
  }
}

/* 대형 화면 디자인 */
@media (min-width: 1025px) {
  .slide-container {
    height: calc(100vh - 200px);
    min-height: 700px;
  }
}

/* 고정된 하단 네비게이션 바 스타일 */
.fixed-navigation-bar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  z-index: 1000;
}

/* 반응형 네비게이션 바 */
@media (max-width: 768px) {
  .fixed-navigation-bar {
    padding: 8px 0;
  }

  .fixed-navigation-bar .q-btn {
    font-size: 0.9em;
  }

  .fixed-navigation-bar .text-h6 {
    font-size: 1.1em;
  }
}
</style>
