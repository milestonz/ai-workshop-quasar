<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-btn
        v-if="isAuthenticated || isGuestAuthenticated"
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer"
        :disable="!isAuthenticated && !(isGuestAuthenticated && isGuestInfoRegistered)"
      />

      <q-toolbar-title>
        <span v-if="isAuthenticated || isGuestAuthenticated">
          📖 목회 현장에서 만나는 12가지 AI 활용 시나리오
        </span>
        <span v-else> 🔐 AI Workshop - 로그인이 필요합니다 </span>
      </q-toolbar-title>

      <!-- 편집기 모드 버튼 (관리자 전용) -->
      <q-btn
        v-if="isAuthenticated && userRole === 'admin'"
        flat
        round
        dense
        icon="edit"
        :color="isPresentationMode ? 'white' : 'orange'"
        @click="togglePresentationMode"
        class="q-mr-xs"
      >
        <q-tooltip>{{ isPresentationMode ? '편집기 모드' : '프리젠테이션 모드' }}</q-tooltip>
      </q-btn>

      <!-- 게스트 모드 안내 -->
      <q-btn
        v-if="isGuestAuthenticated && isGuestInfoRegistered"
        flat
        round
        dense
        icon="info"
        color="orange"
        @click="showGuestModeInfo"
        class="q-mr-xs"
      >
        <q-tooltip>게스트 모드 안내</q-tooltip>
      </q-btn>

      <!-- 캐시 관리 버튼 -->
      <q-btn
        v-if="isAuthenticated || (isGuestAuthenticated && isGuestInfoRegistered)"
        flat
        round
        dense
        icon="storage"
        color="white"
        @click="showCacheManager"
        class="q-mr-xs"
      >
        <q-tooltip>캐시 관리</q-tooltip>
      </q-btn>

      <!-- 전체화면 버튼 -->
      <q-btn
        v-if="isAuthenticated || (isGuestAuthenticated && isGuestInfoRegistered)"
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

      <!-- 캡처 버튼 (관리자만 사용 가능) -->
      <q-btn
        v-if="isAuthenticated && userRole === 'admin'"
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

      <!-- 로그인/로그아웃 버튼 -->
      <q-btn
        v-if="!isAuthenticated && !isGuestAuthenticated"
        flat
        round
        dense
        icon="login"
        color="white"
        @click="handleLogin"
        class="q-mr-xs"
      >
        <q-tooltip>로그인</q-tooltip>
      </q-btn>

      <!-- 로그아웃 버튼 -->
      <q-btn
        v-if="isAuthenticated"
        flat
        round
        dense
        icon="logout"
        color="white"
        @click="handleLogout"
        class="q-mr-xs"
      >
        <q-tooltip>로그아웃</q-tooltip>
      </q-btn>

      <!-- 게스트 사용자 정보 설정 버튼 -->
      <q-btn
        v-if="isGuestAuthenticated && isGuestInfoRegistered"
        flat
        round
        dense
        icon="settings"
        color="white"
        @click="showGuestInfoDialog"
        class="q-mr-xs"
      >
        <q-tooltip>{{ guestUser?.name }} (게스트) - 사용자 정보 설정</q-tooltip>
      </q-btn>
    </q-toolbar>
  </q-header>

  <!-- 캐시 관리 다이얼로그 -->
  <CacheManager v-model="showCacheManagerDialog" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '../../composables/useAuth';
import { useGuestAuth } from '../../composables/useGuestAuth';
import CacheManager from '../ui/CacheManager.vue';

interface Props {
  leftDrawerOpen: boolean;
  isPresentationMode: boolean;
}

interface Emits {
  (e: 'update:leftDrawerOpen', value: boolean): void;
  (e: 'toggle-presentation-mode'): void;
  (e: 'show-guest-mode-info'): void;
  (e: 'toggle-fullscreen'): void;
  (e: 'capture-slide'): void;
  (e: 'login'): void;
  (e: 'logout'): void;
  (e: 'show-guest-info-dialog'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const { isAuthenticated, userRole } = useAuth();
const { isGuestAuthenticated, isGuestInfoRegistered, guestUser } = useGuestAuth();

const toggleLeftDrawer = () => {
  emit('update:leftDrawerOpen', !props.leftDrawerOpen);
};

const togglePresentationMode = () => {
  emit('toggle-presentation-mode');
};

const showGuestModeInfo = () => {
  emit('show-guest-mode-info');
};

const toggleFullscreen = () => {
  emit('toggle-fullscreen');
};

const handleCaptureSlide = () => {
  emit('capture-slide');
};

const handleLogin = () => {
  emit('login');
};

const handleLogout = () => {
  emit('logout');
};

const showGuestInfoDialog = () => {
  emit('show-guest-info-dialog');
};

// 캐시 관리 다이얼로그 상태
const showCacheManagerDialog = ref(false);

const showCacheManager = () => {
  showCacheManagerDialog.value = true;
};
</script>
