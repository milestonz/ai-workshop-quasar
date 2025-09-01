<template>
  <q-layout view="hHh lpR fFf">
    <!-- 헤더 툴바 -->
    <HeaderToolbar
      v-model:leftDrawerOpen="leftDrawerOpen"
      :isPresentationMode="isPresentationMode"
      @share-with-students="shareWithStudents"
      @toggle-presentation-mode="togglePresentationMode"
      @show-guest-mode-info="showGuestModeInfo"
      @toggle-fullscreen="toggleFullscreen"
      @download-slide="handleDownloadSlide"
      @capture-slide="handleCaptureSlide"
      @logout="handleLogout"
      @show-guest-info-dialog="showGuestInfoDialog"
    />

    <!-- 사이드바 네비게이션 -->
    <SidebarNavigation
      v-model:leftDrawerOpen="leftDrawerOpen"
      :currentSlideId="currentSlideId"
      @navigate-to-slide="navigateToSlide"
    />

    <!-- 메인 콘텐츠 -->
    <SlideViewerContainer
      @show-login-dialog="showLoginDialog"
      @show-guest-login-dialog="showGuestLoginDialog"
      @show-guest-info-dialog="showGuestInfoDialog"
      @refresh-page="refreshPage"
    />

    <!-- 다이얼로그들 -->
    <LoginDialog v-model="showLogin" />
    <GuestLoginDialog v-model="showGuestLogin" />
    <GuestInfoDialog v-model="showGuestInfo" />
    <CourseImport v-model="showCourseImport" />
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter, useRoute } from 'vue-router';
import { useCourseStore } from 'src/stores/course';
import { useAuth } from '../composables/useAuth';
import { useGuestAuth } from '../composables/useGuestAuth';
import { useSlideActions } from '../composables/useSlideActions';

// 컴포넌트 imports
import HeaderToolbar from '../components/HeaderToolbar.vue';
import SidebarNavigation from '../components/SidebarNavigation.vue';
import SlideViewerContainer from '../components/SlideViewerContainer.vue';
import CourseImport from '../components/CourseImport.vue';
import LoginDialog from '../components/LoginDialog.vue';
import GuestLoginDialog from '../components/GuestLoginDialog.vue';
import GuestInfoDialog from '../components/GuestInfoDialog.vue';

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
  logout 
} = useAuth();

const { 
  guestUser, 
  isGuestAuthenticated, 
  isGuestInfoRegistered,
  logout: guestLogout 
} = useGuestAuth();

// Slide actions composable
const {
  isFullscreen,
  isPresentationMode,
  toggleFullscreen,
  togglePresentationMode,
  handleDownloadSlide,
  handleCaptureSlide,
  shareWithStudents,
  showGuestModeInfo,
} = useSlideActions();

// Reactive state
const leftDrawerOpen = ref(false);
const showLogin = ref(false);
const showGuestLogin = ref(false);
const showGuestInfo = ref(false);
const showCourseImport = ref(false);

// Computed
const currentSlideId = computed(() => {
  return route.params.id as string || '';
});

// Methods
const showLoginDialog = () => {
  showLogin.value = true;
};

const showGuestLoginDialog = () => {
  showGuestLogin.value = true;
};

const showGuestInfoDialog = () => {
  showGuestInfo.value = true;
};

const navigateToSlide = (slideId: string) => {
  router.push(`/slide/${slideId}`);
};

const handleLogout = async () => {
  try {
    if (isAuthenticated.value) {
      await logout();
    } else if (isGuestAuthenticated.value) {
      await guestLogout();
    }
    
    $q.notify({
      type: 'positive',
      message: '로그아웃되었습니다.',
      position: 'top',
    });
    
    router.push('/');
  } catch (error) {
    console.error('로그아웃 오류:', error);
    $q.notify({
      type: 'negative',
      message: '로그아웃 중 오류가 발생했습니다.',
      position: 'top',
    });
  }
};

const refreshPage = () => {
  window.location.reload();
};

// Lifecycle
onMounted(() => {
  // 초기 데이터 로드
  courseStore.loadCourseOutline();
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
  }
);
</script>

<style scoped>
/* 필요한 스타일이 있다면 여기에 추가 */
</style>
