<template>
  <div class="login-required-slide">
    <div class="login-required-container">
      <!-- 로그인 필요 아이콘 -->
      <div class="login-icon-container">
        <q-icon name="lock" size="120px" color="primary" class="login-icon" />
      </div>

      <!-- 메인 메시지 -->
      <div class="main-message">
        <h1 class="text-h3 text-weight-bold text-primary q-mb-md">코칭웨어 슬라이드 뷰어</h1>
        <p class="text-h6 text-grey-7 q-mb-lg">
          AI Workshop 강의를 수강하려면 로그인이 필요합니다.
        </p>
      </div>

      <!-- 로그인 옵션들 -->
      <div class="login-options q-mb-xl">
        <div class="row q-gutter-md justify-center">
          <!-- Google 로그인 버튼 -->
          <q-btn
            color="primary"
            icon="login"
            label="Google로 로그인"
            size="lg"
            @click="handleGoogleLogin"
            class="login-btn"
          />

          <!-- 게스트 로그인 버튼 -->
          <q-btn
            outline
            color="orange"
            icon="person"
            label="게스트로 체험"
            size="lg"
            @click="handleGuestLogin"
            class="guest-btn"
          />
        </div>
      </div>

      <!-- 안내 메시지 -->
      <!-- <div class="info-section">
        <q-banner class="bg-blue-1 text-blue-9">
          <template v-slot:avatar>
            <q-icon name="info" color="blue" />
          </template>
          <div class="text-body1">
            <strong>로그인 혜택:</strong><br />
            • 학습 진행 상황 자동 저장<br />
            • 투표 결과 실시간 확인<br />
            • 관리자 기능 사용 가능<br />
            • 개인화된 학습 경험
          </div>
        </q-banner>
      </div>

      <!-- 게스트 모드 안내 -->
      <!-- <div class="guest-info q-mt-lg">
        <q-banner class="bg-orange-1 text-orange-9">
          <template v-slot:avatar>
            <q-icon name="person" color="orange" />
          </template>
          <div class="text-body1">
            <strong>게스트 모드:</strong><br />
            • 로그인 없이 콘텐츠 체험 가능<br />
            • 제한된 기능만 사용 가능<br />
            • 학습 진행 상황 저장 불가
          </div>
        </q-banner>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
interface Emits {
  (e: 'google-login'): void;
  (e: 'guest-login'): void;
}

const emit = defineEmits<Emits>();

const handleGoogleLogin = () => {
  console.log('🔍 LoginRequiredSlide: Google 로그인 버튼 클릭');
  emit('google-login');
};

const handleGuestLogin = () => {
  console.log('🔍 LoginRequiredSlide: 게스트 로그인 버튼 클릭');
  emit('guest-login');
};
</script>

<style scoped>
.login-required-slide {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-required-container {
  background: white;
  border-radius: 20px;
  padding: 60px 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 600px;
  width: 100%;
}

.login-icon-container {
  margin-bottom: 30px;
}

.login-icon {
  animation: pulse 2s infinite;
}

.main-message {
  margin-bottom: 40px;
}

.login-options {
  margin-bottom: 40px;
}

.login-btn {
  min-width: 200px;
  height: 50px;
  font-size: 1.1em;
  font-weight: 600;
}

.guest-btn {
  min-width: 200px;
  height: 50px;
  font-size: 1.1em;
  font-weight: 600;
}

.info-section {
  margin-bottom: 20px;
}

.guest-info {
  margin-top: 20px;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

/* 반응형 디자인 */
@media (max-width: 600px) {
  .login-required-container {
    padding: 40px 20px;
  }

  .login-options .row {
    flex-direction: column;
  }

  .login-btn,
  .guest-btn {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
