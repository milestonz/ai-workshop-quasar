<template>
  <q-page-container>
    <!-- Firebase 설정이 없는 경우 -->
    <div v-if="!isFirebaseConfigured" class="login-required">
      <div class="text-center q-pa-xl">
        <q-icon name="warning" size="4rem" color="orange" class="q-mb-md" />
        <div class="text-h5 q-mb-md">Firebase 설정이 필요합니다</div>
        <div class="text-body1 q-mb-lg">
          이 앱을 사용하려면 Firebase 설정이 필요합니다.<br />
          관리자에게 문의하세요.
        </div>
        <q-btn color="primary" label="새로고침" @click="refreshPage" icon="refresh" />
      </div>
    </div>

    <!-- 로그인이 필요한 경우 -->
    <div v-else-if="!isAuthenticated && !isGuestAuthenticated" class="login-required">
      <div class="text-center q-pa-xl">
        <q-icon name="login" size="4rem" color="primary" class="q-mb-md" />
        <div class="text-h5 q-mb-md">로그인이 필요합니다</div>
        <div class="text-body1 q-mb-lg">
          AI 워크샵 콘텐츠에 접근하려면 로그인하거나 게스트 모드로 입장하세요.
        </div>
        <div class="q-gutter-md">
          <q-btn color="primary" label="로그인" @click="showLoginDialog" icon="login" size="lg" />
          <q-btn
            color="secondary"
            label="게스트 모드"
            @click="showGuestLoginDialog"
            icon="person"
            size="lg"
            outline
          />
        </div>
      </div>
    </div>

    <!-- 게스트 정보 등록이 필요한 경우 -->
    <div v-else-if="isGuestAuthenticated && !isGuestInfoRegistered" class="login-required">
      <div class="text-center q-pa-xl">
        <q-icon name="person_add" size="4rem" color="orange" class="q-mb-md" />
        <div class="text-h5 q-mb-md">게스트 정보 등록</div>
        <div class="text-body1 q-mb-lg">
          게스트 모드로 입장하셨습니다.<br />
          사용자 정보를 입력해주세요.
        </div>
        <q-btn
          color="primary"
          label="정보 입력"
          @click="showGuestInfoDialog"
          icon="edit"
          size="lg"
        />
      </div>
    </div>

    <!-- 메인 콘텐츠 -->
    <div v-else class="main-content">
      <router-view />
    </div>
  </q-page-container>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuth } from '../../composables/useAuth';
import { useGuestAuth } from '../../composables/useGuestAuth';

interface Emits {
  (e: 'show-login-dialog'): void;
  (e: 'show-guest-login-dialog'): void;
  (e: 'show-guest-info-dialog'): void;
  (e: 'refresh-page'): void;
}

const emit = defineEmits<Emits>();

const { isAuthenticated, isFirebaseConfigured } = useAuth();
const { isGuestAuthenticated, isGuestInfoRegistered } = useGuestAuth();

const showLoginDialog = () => {
  emit('show-login-dialog');
};

const showGuestLoginDialog = () => {
  emit('show-guest-login-dialog');
};

const showGuestInfoDialog = () => {
  emit('show-guest-info-dialog');
};

const refreshPage = () => {
  emit('refresh-page');
  window.location.reload();
};
</script>

<style scoped>
.login-required {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.main-content {
  min-height: calc(100vh - 64px);
}
</style>
