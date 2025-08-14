<template>
  <q-layout view="hHh LpR fFf">
    <q-page-container>
      <q-page class="logout-page">
        <div class="logout-container">
          <div class="logout-card">
            <div class="text-center">
              <!-- 로그아웃 아이콘 -->
              <q-icon name="logout" size="120px" color="primary" class="q-mb-lg logout-icon" />

              <!-- 로그아웃 완료 메시지 -->
              <h1 class="text-h3 text-weight-bold text-primary q-mb-md">로그아웃 완료</h1>

              <p class="text-h6 text-grey-7 q-mb-lg">안전하게 로그아웃되었습니다.</p>

              <!-- 사용자 정보 표시 -->
              <div v-if="userInfo" class="user-info q-mb-xl">
                <q-chip
                  :color="userInfo.isGuest ? 'orange' : 'primary'"
                  text-color="white"
                  icon="person"
                  :label="userInfo.name"
                  size="lg"
                />
                <div class="text-caption text-grey-6 q-mt-sm">
                  {{ userInfo.email }}
                </div>
              </div>

              <!-- 안내 메시지 -->
              <div class="info-message q-mb-xl">
                <q-banner class="bg-blue-1 text-blue-9">
                  <template v-slot:avatar>
                    <q-icon name="info" color="blue" />
                  </template>
                  <div class="text-body1">
                    <strong>로그아웃 안내:</strong><br />
                    • 학습 진행 상황이 저장되었습니다<br />
                    • 언제든지 다시 로그인하여 학습을 이어갈 수 있습니다<br />
                    • 브라우저를 닫으셔도 됩니다
                  </div>
                </q-banner>
              </div>

              <!-- 버튼들 -->
              <div class="button-group">
                <q-btn
                  color="primary"
                  icon="home"
                  label="홈으로 돌아가기"
                  size="lg"
                  @click="goHome"
                  class="q-mr-md"
                />

                <q-btn
                  outline
                  color="primary"
                  icon="login"
                  label="다시 로그인"
                  size="lg"
                  @click="goToLogin"
                />
              </div>

              <!-- 추가 정보 -->
              <div class="additional-info q-mt-xl">
                <p class="text-caption text-grey-6">AI Workshop 학습 관리 시스템</p>
                <p class="text-caption text-grey-6">로그아웃 시간: {{ logoutTime }}</p>
              </div>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useQuasar } from 'quasar';

const router = useRouter();
const route = useRoute();
const $q = useQuasar();

// 사용자 정보 (URL 파라미터에서 받아옴)
const userInfo = ref<{
  name: string;
  email: string;
  isGuest: boolean;
} | null>(null);

// 로그아웃 시간
const logoutTime = ref('');

onMounted(() => {
  // URL 파라미터에서 사용자 정보 가져오기
  const name = route.query.name as string;
  const email = route.query.email as string;
  const isGuest = route.query.isGuest === 'true';

  if (name && email) {
    userInfo.value = {
      name,
      email,
      isGuest,
    };
  }

  // 로그아웃 시간 설정
  logoutTime.value = new Date().toLocaleString('ko-KR');

  // 페이지 제목 설정
  document.title = '로그아웃 완료 - AI Workshop';
});

// 홈으로 이동
const goHome = () => {
  router.push('/');
};

// 로그인 페이지로 이동
const goToLogin = () => {
  router.push('/');
};
</script>

<style scoped>
.logout-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.logout-container {
  width: 100%;
  max-width: 500px;
}

.logout-card {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.logout-icon {
  animation: fadeInDown 0.8s ease-out;
}

.user-info {
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.info-message {
  animation: fadeInUp 0.8s ease-out 0.4s both;
}

.button-group {
  animation: fadeInUp 0.8s ease-out 0.6s both;
}

.additional-info {
  animation: fadeInUp 0.8s ease-out 0.8s both;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 반응형 디자인 */
@media (max-width: 600px) {
  .logout-card {
    padding: 30px 20px;
  }

  .button-group {
    flex-direction: column;
    gap: 10px;
  }

  .button-group .q-btn {
    width: 100%;
  }
}
</style>
