<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card style="min-width: 400px" class="guest-login-dialog">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-dark">
          <q-icon name="person" color="primary" class="q-mr-sm" />
          게스트 모드 로그인
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle2 text-grey-7 q-mb-md">
          구글 계정이 없어도 강의를 수강할 수 있습니다.
        </div>

        <!-- 게스트 정보 입력 폼 -->
        <q-form @submit="handleGuestLogin" class="q-gutter-md">
          <q-input
            v-model="guestName"
            outlined
            dense
            label="이름"
            placeholder="이름을 입력하세요"
            :rules="[(val) => !!val || '이름을 입력해주세요']"
            class="q-mb-md"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>

          <q-input
            v-model="guestEmail"
            outlined
            dense
            label="이메일 *"
            placeholder="이메일을 입력하세요 (필수)"
            type="email"
            :rules="[
              (val) => !!val.trim() || '이메일을 입력해주세요',
              (val) => isValidEmail(val) || '올바른 이메일 형식을 입력해주세요',
            ]"
            class="q-mb-md"
            required
          >
            <template v-slot:prepend>
              <q-icon name="email" color="orange" />
            </template>
          </q-input>

          <!-- 게스트 모드 안내 -->
          <q-banner class="bg-blue-1 text-blue-9 q-mb-md">
            <template v-slot:avatar>
              <q-icon name="info" color="blue" />
            </template>
            <div class="text-caption">
              <strong>게스트 모드 안내:</strong><br />
              • 이름과 이메일은 필수 입력 항목입니다
            </div>
          </q-banner>

          <!-- 로그인 버튼 -->
          <div class="row q-gutter-sm">
            <q-btn
              type="submit"
              color="primary"
              icon="login"
              label="게스트로 로그인"
              :loading="isLoading"
              :disable="!guestName.trim() || !guestEmail.trim() || !isValidEmail(guestEmail)"
              class="col"
            />
            <q-btn flat color="grey" icon="close" label="취소" v-close-popup class="col-auto" />
          </div>
        </q-form>

        <!-- 구글 로그인 옵션 -->
        <q-separator class="q-my-md" />
        <div class="text-center">
          <div class="text-caption text-grey-7 q-mb-sm">또는</div>
          <q-btn
            outline
            color="primary"
            icon="google"
            label="Google로 로그인"
            @click="handleGoogleLogin"
            class="full-width"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useQuasar } from 'quasar';
import { useGuestAuth } from '../composables/useGuestAuth';

interface Props {
  modelValue: boolean;
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void;
  (e: 'guest-login-success', user: any): void;
  (e: 'google-login-request'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const $q = useQuasar();
const { signInAsGuest } = useGuestAuth();

// 반응형 데이터
const guestName = ref('');
const guestEmail = ref('');
const isLoading = ref(false);

// 다이얼로그 표시 상태
const showDialog = ref(props.modelValue);

// props 변경 감지
watch(
  () => props.modelValue,
  (newValue) => {
    showDialog.value = newValue;
  },
);

// 다이얼로그 상태 변경 감지
watch(showDialog, (newValue) => {
  emit('update:modelValue', newValue);
});

// 이메일 유효성 검사
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 게스트 로그인 처리
const handleGuestLogin = async () => {
  if (!guestName.value.trim()) {
    $q.notify({
      type: 'warning',
      message: '이름을 입력해주세요.',
      position: 'top',
    });
    return;
  }

  if (!guestEmail.value.trim()) {
    $q.notify({
      type: 'warning',
      message: '이메일을 입력해주세요.',
      position: 'top',
    });
    return;
  }

  if (!isValidEmail(guestEmail.value)) {
    $q.notify({
      type: 'warning',
      message: '올바른 이메일 형식을 입력해주세요.',
      position: 'top',
    });
    return;
  }

  isLoading.value = true;

  try {
    const guestUser = await signInAsGuest(guestName.value.trim(), guestEmail.value.trim());

    emit('guest-login-success', guestUser);
    showDialog.value = false;

    // 폼 초기화
    guestName.value = '';
    guestEmail.value = '';
  } catch (error) {
    console.error('게스트 로그인 실패:', error);
    $q.notify({
      type: 'negative',
      message: '게스트 로그인에 실패했습니다.',
      position: 'top',
    });
  } finally {
    isLoading.value = false;
  }
};

// Google 로그인 요청
const handleGoogleLogin = () => {
  showDialog.value = false;
  emit('google-login-request');
};
</script>

<style scoped>
.guest-login-dialog {
  border-radius: 12px;
}

.guest-login-dialog .q-card__section {
  padding: 24px;
}
</style>
