<template>
  <q-dialog v-model="isOpen" persistent>
    <q-card class="login-card">
      <!-- 헤더 섹션 -->
      <q-card-section class="row items-center q-pb-none login-header">
        <div class="text-h6">
          <q-icon name="lock" class="q-mr-sm" />
          로그인
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup class="close-btn" />
      </q-card-section>

      <!-- 메인 콘텐츠 섹션 -->
      <q-card-section class="login-content">
        <div class="text-body2 q-mb-lg login-description">
          AI Workshop 강의를 수강하려면 로그인이 필요합니다.
        </div>

        <div v-if="error" class="text-negative q-mb-md error-message">
          <q-icon name="error" class="q-mr-sm" />
          {{ error }}
        </div>

        <q-btn
          :loading="loading"
          :disable="loading"
          color="primary"
          icon="login"
          label="Google로 로그인"
          @click="handleGoogleLogin"
          class="full-width login-btn"
          size="lg"
        />
      </q-card-section>

      <!-- 액션 섹션 -->
      <q-card-actions align="right" class="login-actions">
        <q-btn flat label="취소" color="primary" v-close-popup class="cancel-btn" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuth } from '../../composables/useAuth';

interface Props {
  modelValue: boolean;
  loading?: boolean;
  error?: string;
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void;
  (e: 'google-login'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const handleGoogleLogin = async () => {
  console.log('🔍 LoginDialog: handleGoogleLogin - 로그인 버튼 클릭');
  console.log('🔍 LoginDialog: 이벤트 발생 시도...');
  emit('google-login');
  console.log('🔍 LoginDialog: 이벤트 발생 완료');
};
</script>

<style scoped>
.login-card {
  position: relative;
  overflow: hidden;
  background: #ffffff !important;
  border: 4px solid #1976d2 !important;
  border-radius: 20px !important;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.8),
    0 0 0 8px rgba(255, 255, 255, 0.9),
    inset 0 0 0 1px rgba(255, 255, 255, 0.5) !important;
  min-width: 500px !important;
  max-width: 550px !important;
  backdrop-filter: blur(20px) !important;
}

/* 로그인 카드 내용이 배경 위에 잘 보이도록 */
.q-card__section {
  position: relative;
  z-index: 1;
  background: #ffffff !important;
  margin: 16px !important;
  border-radius: 12px !important;
  border: 2px solid #e0e0e0 !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
  padding: 20px !important;
}

.q-card__actions {
  position: relative;
  z-index: 1;
  background: #ffffff !important;
  margin: 16px !important;
  border-radius: 12px !important;
  border: 2px solid #e0e0e0 !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
  padding: 16px !important;
}

/* 텍스트 가독성 향상 */
.text-h6 {
  color: #000000 !important;
  font-weight: 800 !important;
  font-size: 2em !important;
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.8) !important;
  background: rgba(255, 255, 255, 0.9) !important;
  padding: 10px 20px !important;
  border-radius: 10px !important;
  border: 2px solid #1976d2 !important;
}

.text-body2 {
  color: #000000 !important;
  font-weight: 700 !important;
  font-size: 1.3em !important;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8) !important;
  background: rgba(255, 255, 255, 0.9) !important;
  padding: 8px 16px !important;
  border-radius: 8px !important;
  border: 1px solid #666 !important;
}

/* 로그인 버튼 강화 */
.q-btn {
  font-weight: 800 !important;
  font-size: 1.4em !important;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3) !important;
  box-shadow:
    0 8px 25px rgba(25, 118, 210, 0.6),
    0 0 0 3px rgba(255, 255, 255, 0.8) !important;
  border: 3px solid #1976d2 !important;
  background: linear-gradient(135deg, #1976d2, #1565c0) !important;
  color: #ffffff !important;
  height: 60px !important;
}

.q-btn:hover {
  transform: translateY(-3px);
  box-shadow:
    0 12px 35px rgba(25, 118, 210, 0.8),
    0 0 0 4px rgba(255, 255, 255, 0.9) !important;
  background: linear-gradient(135deg, #1565c0, #0d47a1) !important;
}

/* 오류 메시지 강화 */
.text-negative {
  background: rgba(244, 67, 54, 0.1);
  padding: 8px 12px;
  border-radius: 6px;
  border-left: 4px solid #f44336;
  font-weight: 500;
}

/* 추가 스타일링 */
.login-header {
  border-bottom: 3px solid #1976d2 !important;
  background: linear-gradient(135deg, #e3f2fd, #ffffff) !important;
  padding: 20px !important;
}

.login-content {
  padding: 30px !important;
  background: linear-gradient(135deg, #fafafa, #ffffff) !important;
}

.login-description {
  font-size: 1.3em;
  line-height: 1.6;
  font-weight: 600 !important;
}

.login-btn {
  margin-top: 24px;
  height: 60px;
  font-size: 1.4em;
}

.login-actions {
  border-top: 3px solid #e0e0e0 !important;
  background: linear-gradient(135deg, #f5f5f5, #ffffff) !important;
  padding: 20px !important;
}

.close-btn {
  color: #666 !important;
  background: rgba(0, 0, 0, 0.05) !important;
  border-radius: 50% !important;
  width: 32px !important;
  height: 32px !important;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.15) !important;
  color: #000 !important;
}

.cancel-btn {
  font-weight: 600 !important;
  font-size: 1.1em !important;
  padding: 8px 16px !important;
  border-radius: 8px !important;
}

.cancel-btn:hover {
  background: rgba(25, 118, 210, 0.15) !important;
  color: #1976d2 !important;
}

.error-message {
  display: flex;
  align-items: center;
  font-weight: 600 !important;
  font-size: 1.1em !important;
}
</style>
