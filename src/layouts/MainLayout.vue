<template>
  <q-layout view="hHh lpR fFf">
    <!-- 헤더 툴바 -->
    <HeaderToolbar
      v-model:leftDrawerOpen="leftDrawerOpen"
      :isPresentationMode="isPresentationMode"
      @toggle-presentation-mode="togglePresentationMode"
      @show-guest-mode-info="showGuestModeInfo"
      @toggle-fullscreen="toggleFullscreen"
      @capture-slide="handleCaptureSlide"
      @login="handleLogin"
      @logout="handleLogout"
      @show-guest-info-dialog="showGuestInfoDialog"
    />

    <!-- 사이드바 네비게이션 -->
    <SidebarNavigation
      v-if="isAuthenticated || isGuestAuthenticated"
      v-model:leftDrawerOpen="leftDrawerOpen"
      :currentSlideId="currentSlideId"
      @navigate-to-slide="navigateToSlide"
    />

    <!-- 로딩 화면 -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-content">
        <q-spinner-dots size="80px" color="primary" />
        <div class="loading-text q-mt-md">
          <h3 class="text-h5 text-weight-medium text-primary">AI Workshop 로딩 중...</h3>
          <p class="text-body1 text-grey-7">잠시만 기다려주세요</p>
        </div>
      </div>
    </div>

    <!-- 메인 콘텐츠 -->
    <SlideViewerContainer
      v-else-if="isAuthenticated || isGuestAuthenticated"
      @show-login-dialog="showLoginDialog"
      @show-guest-login-dialog="showGuestLoginDialog"
      @show-guest-info-dialog="showGuestInfoDialog"
      @refresh-page="refreshPage"
    />

    <!-- 로그인 필요 슬라이드 -->
    <LoginRequiredSlide
      v-else
      @google-login="showLoginDialog"
      @guest-login="showGuestLoginDialog"
    />

    <!-- 다이얼로그들 -->
    <LoginDialog
      v-model="showLogin"
      :loading="authLoading"
      :error="authError || ''"
      @google-login="handleGoogleLoginFromDialog"
    />
    <GuestLoginDialog
      v-model="showGuestLogin"
      @guest-login-success="handleGuestLoginSuccess"
      @google-login-request="handleGoogleLoginRequest"
    />
    <GuestInfoDialog v-model="showGuestInfo" />
    <CourseImport
      v-if="showCourseImport"
      @cancel="showCourseImport = false"
      @success="handleCourseImportSuccess"
    />
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter, useRoute } from 'vue-router';
import { useCourseStore } from 'src/stores/course';
import { useAuth } from 'src/composables/useAuth';
import { useGuestAuth } from 'src/composables/useGuestAuth';
import { useSlideActions } from 'src/composables/useSlideActions';

// 컴포넌트 imports
import HeaderToolbar from 'src/components/layout/HeaderToolbar.vue';
import SidebarNavigation from 'src/components/layout/SidebarNavigation.vue';
import SlideViewerContainer from 'src/components/slide/SlideViewerContainer.vue';
import LoginRequiredSlide from 'src/components/auth/LoginRequiredSlide.vue';
import CourseImport from 'src/components/ui/CourseImport.vue';
import LoginDialog from 'src/components/auth/LoginDialog.vue';
import GuestLoginDialog from 'src/components/auth/GuestLoginDialog.vue';
import GuestInfoDialog from 'src/components/ui/GuestInfoDialog.vue';

const $q = useQuasar();
const router = useRouter();
const route = useRoute();
const courseStore = useCourseStore();

// Auth composables
const {
  user,
  isAuthenticated,
  userRole,
  isFirebaseConfigured,
  logout,
  isAuthInitialized,
  signInWithGoogle,
  loading: authLoading,
  error: authError,
} = useAuth();

const { guestUser, isGuestAuthenticated, isGuestInfoRegistered, signOutGuest } = useGuestAuth();

// 로딩 상태 계산 - 인증 초기화가 완료된 후에만 로딩 해제
const isLoading = computed(() => {
  // Firebase 인증 초기화가 완료되지 않았을 때만 로딩 상태
  const authInitialized = isAuthInitialized?.value ?? false;

  console.log('🔍 MainLayout: isLoading 계산:', {
    authInitialized,
    isAuthInitialized: isAuthInitialized?.value,
    isLoading: !authInitialized,
  });

  // 인증 초기화가 완료되었으면 로딩 상태 해제
  if (authInitialized) {
    return false;
  }

  // 인증 초기화가 아직 진행 중일 때만 로딩 상태
  // 하지만 인증 상태가 이미 결정되었다면 로딩 상태 해제
  if (isAuthenticated.value !== undefined || isGuestAuthenticated.value !== undefined) {
    console.log('🔍 MainLayout: 인증 상태가 결정됨, 로딩 상태 해제');
    return false;
  }

  return true;
});

// Slide actions composable
const {
  isFullscreen,
  isPresentationMode,
  toggleFullscreen,
  togglePresentationMode,
  handleCaptureSlide,
  showGuestModeInfo,
} = useSlideActions();

// Reactive state
const leftDrawerOpen = ref(false);
const showLogin = ref(false);
const showGuestLogin = ref(false);
const showGuestInfo = ref(false);
const showCourseImport = ref(false);

// 강의 가져오기 성공 핸들러
const handleCourseImportSuccess = (courseId: string) => {
  showCourseImport.value = false;
  console.log('✅ 강의 가져오기 성공:', courseId);
  // 필요시 강의 목차 새로고침
  courseStore.loadCourseOutline();
};

// Computed
const currentSlideId = computed(() => {
  return (route.params.id as string) || '';
});

// Methods
const showLoginDialog = () => {
  showLogin.value = true;
};

const showGuestLoginDialog = () => {
  showGuestLogin.value = true;
};

const showGuestInfoDialog = () => {
  // 게스트 사용자가 이미 정보 등록이 완료된 경우 다이얼로그를 표시하지 않음
  if (isGuestAuthenticated.value && isGuestInfoRegistered.value) {
    console.log('🎭 게스트 정보가 이미 등록되어 있습니다.');
    return;
  }
  showGuestInfo.value = true;
};

// 게스트 로그인 성공 처리
const handleGuestLoginSuccess = (guestUser: any) => {
  console.log('🎭 게스트 로그인 성공:', guestUser);
  showGuestLogin.value = false;

  // 게스트 로그인 성공 후 첫 번째 슬라이드로 이동
  router.push('/slide/0-0');
};

// Google 로그인 요청 처리
const handleGoogleLoginRequest = () => {
  console.log('🔐 Google 로그인 요청');
  showGuestLogin.value = false;
  showLogin.value = true;
};

const navigateToSlide = (slideId: string) => {
  router.push(`/slide/${slideId}`);
};

const handleLogin = () => {
  console.log('🔍 MainLayout: 로그인 버튼 클릭');
  showLoginDialog();
};

const handleGoogleLoginFromDialog = async () => {
  console.log('🔍 MainLayout: LoginDialog에서 Google 로그인 이벤트 수신');
  try {
    await signInWithGoogle();
    console.log('✅ MainLayout: Google 로그인 완료');
    showLogin.value = false; // 다이얼로그 닫기
  } catch (error) {
    console.error('❌ MainLayout: Google 로그인 실패:', error);
  }
};

const handleLogout = async () => {
  // 로그아웃 확인 다이얼로그 표시
  $q.dialog({
    title: '로그아웃 확인',
    message: `
      <div class="q-pa-md">
        <p><strong>정말 로그아웃하시겠습니까?</strong></p>
        <p>로그아웃하면 현재 학습 진행 상황이 저장됩니다.</p>
        <br>
        <p><strong>현재 사용자:</strong></p>
        <div class="q-mt-sm">
          ${
            isAuthenticated.value
              ? `<q-chip color="primary" text-color="white" icon="person" label="${user.value?.displayName || user.value?.email || '사용자'}" />`
              : isGuestAuthenticated.value
                ? `<q-chip color="orange" text-color="white" icon="person" label="${guestUser.value?.name || '게스트 사용자'}" />`
                : '로그인된 사용자가 없습니다'
          }
        </div>
      </div>
    `,
    html: true,
    ok: {
      label: '로그아웃',
      color: 'negative',
      icon: 'logout',
    },
    cancel: {
      label: '취소',
      color: 'primary',
      icon: 'cancel',
    },
    persistent: true,
  }).onOk(async () => {
    try {
      console.log('🔍 MainLayout: 로그아웃 시작');
      console.log('🔍 MainLayout: 인증 상태 확인:', {
        isAuthenticated: isAuthenticated.value,
        isGuestAuthenticated: isGuestAuthenticated.value,
        userRole: userRole.value,
      });

      if (isAuthenticated.value) {
        console.log('🔍 MainLayout: Firebase 사용자 로그아웃 실행');
        await logout();
        console.log('✅ MainLayout: Firebase 로그아웃 완료');
      } else if (isGuestAuthenticated.value) {
        console.log('🔍 MainLayout: 게스트 사용자 로그아웃 실행');
        await signOutGuest();
        console.log('✅ MainLayout: 게스트 로그아웃 완료');
      } else {
        console.log('⚠️ MainLayout: 로그인된 사용자가 없음');
      }

      $q.notify({
        type: 'positive',
        message: '로그아웃되었습니다.',
        position: 'top',
        timeout: 3000,
      });

      console.log('🔍 MainLayout: 로그아웃 완료 - 페이지 새로고침으로 상태 리셋');

      // 로그아웃 후 상태 확인을 위해 잠시 대기
      await new Promise((resolve) => setTimeout(resolve, 100));

      console.log('🔍 MainLayout: 로그아웃 후 상태 확인:', {
        isAuthenticated: isAuthenticated.value,
        isGuestAuthenticated: isGuestAuthenticated.value,
        userRole: userRole.value,
      });

      // 로그아웃 후 페이지 새로고침으로 모든 상태 리셋
      // router.push('/'); // 이 줄을 주석 처리하여 리다이렉트 방지
    } catch (error) {
      console.error('❌ MainLayout: 로그아웃 오류:', error);
      $q.notify({
        type: 'negative',
        message: '로그아웃 중 오류가 발생했습니다.',
        position: 'top',
        timeout: 5000,
      });
    }
  });
};

const refreshPage = () => {
  window.location.reload();
};

// Lifecycle
onMounted(async () => {
  // 초기 데이터 로드
  console.log('🔍 MainLayout: 강의 목차 로드 시작');
  try {
    await courseStore.loadCourseOutline();
    console.log('✅ MainLayout: 강의 목차 로드 완료');
  } catch (error) {
    console.error('❌ MainLayout: 강의 목차 로드 실패:', error);
    // 강제로 기본 데이터 설정
    courseStore.lessons = [
      {
        title: '0. INTRO',
        slides: 7,
        completed: false,
        videoUrl: null,
        slideTitles: [
          '목회자를 위한 AI 활용 시나리오',
          '강사 소개',
          '목차',
          '워크샵 소개',
          '오늘의 여정',
          '실시간 투표',
          '실시간 투표',
        ],
        slideData: [
          { title: '목회자를 위한 AI 활용 시나리오', hasVideo: false },
          { title: '강사 소개', hasVideo: false },
          { title: '목차', hasVideo: false },
          { title: '워크샵 소개', hasVideo: false },
          { title: '오늘의 여정', hasVideo: false },
          { title: '실시간 투표', hasVideo: false },
          { title: '실시간 투표', hasVideo: false },
        ],
      },
      {
        title: '1. WHY',
        slides: 7,
        completed: false,
        videoUrl: null,
        slideTitles: [
          'Why?',
          'AI와 함께하는 슬기로운 목회 생활',
          '실시간 투표',
          '실시간 투표',
          '실시간 투표',
          '실시간 투표',
          '실시간 투표',
        ],
        slideData: [
          { title: 'Why?', hasVideo: false },
          { title: 'AI와 함께하는 슬기로운 목회 생활', hasVideo: false },
          { title: '실시간 투표', hasVideo: false },
          { title: '실시간 투표', hasVideo: false },
          { title: '실시간 투표', hasVideo: false },
          { title: '실시간 투표', hasVideo: false },
          { title: '실시간 투표', hasVideo: false },
        ],
      },
    ];
    console.log('✅ MainLayout: 기본 강의 목차 설정 완료');
  }
});

onBeforeUnmount(() => {
  // 정리 작업
});

// Watchers
watch(
  () => route.path,
  (newPath) => {
    // 경로 변경 시 사이드바 닫기
    if (leftDrawerOpen.value) {
      leftDrawerOpen.value = false;
    }
  },
);
</script>

<style scoped>
.loading-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.loading-content {
  text-align: center;
  color: white;
}

.loading-text h3 {
  margin-bottom: 8px;
}
</style>
