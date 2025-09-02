<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card style="min-width: 450px" class="guest-info-dialog">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-dark">
          <q-icon name="person_add" color="orange" class="q-mr-sm" />
          게스트 정보 등록
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle2 text-grey-7 q-mb-md">
          강의를 수강하기 위해 <strong>이름과 이메일을 모두 등록해주세요.</strong>
        </div>

        <!-- 게스트 정보 입력 폼 -->
        <q-form @submit="handleSubmit" class="q-gutter-md">
          <q-input
            v-model="guestName"
            outlined
            dense
            label="이름 *"
            placeholder="이름을 입력하세요 (필수)"
            :rules="[(val) => !!val.trim() || '이름을 입력해주세요']"
            class="q-mb-md"
            required
          >
            <template v-slot:prepend>
              <q-icon name="person" color="orange" />
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

          <!-- 필수 입력 안내 -->
          <q-banner class="bg-blue-1 text-blue-9 q-mb-md">
            <template v-slot:avatar>
              <q-icon name="warning" color="blue" />
            </template>
            <div class="text-caption">
              <strong>필수 입력 항목:</strong><br />
              • 이름과 이메일은 모두 필수 입력 항목입니다<br />
              • 이메일은 올바른 형식으로 입력해주세요
            </div>
          </q-banner>

          <!-- 제출 버튼 -->
          <div class="row q-gutter-sm">
            <q-btn
              type="submit"
              color="orange"
              icon="check"
              label="정보 등록 완료"
              :loading="isLoading"
              :disable="!guestName.trim() || !guestEmail.trim() || !isValidEmail(guestEmail)"
              class="col"
            />
            <q-btn
              flat
              color="grey"
              icon="close"
              label="취소"
              @click="handleCancel"
              class="col-auto"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useQuasar } from 'quasar';

interface Props {
  modelValue: boolean;
  currentGuestUser?: any;
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void;
  (e: 'guest-info-submitted', userInfo: { name: string; email: string }): void;
  (e: 'guest-info-cancelled'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const $q = useQuasar();

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
    if (newValue && props.currentGuestUser) {
      // 기존 게스트 정보가 있으면 폼에 채우기
      guestName.value = props.currentGuestUser.name || '';
      guestEmail.value = props.currentGuestUser.email || '';
    }
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

// 폼 제출 처리
const handleSubmit = async () => {
  // 이름 검증
  if (!guestName.value.trim()) {
    $q.notify({
      type: 'warning',
      message: '이름을 입력해주세요.',
      position: 'top',
    });
    return;
  }

  // 이메일 검증
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
    const userInfo = {
      name: guestName.value.trim(),
      email: guestEmail.value.trim(),
    };

    emit('guest-info-submitted', userInfo);
    showDialog.value = false;

    // 폼 초기화
    guestName.value = '';
    guestEmail.value = '';

    $q.notify({
      type: 'positive',
      message: '게스트 정보가 등록되었습니다!',
      position: 'top',
      timeout: 2000,
    });
  } catch (error) {
    console.error('게스트 정보 등록 실패:', error);
    $q.notify({
      type: 'negative',
      message: '게스트 정보 등록에 실패했습니다.',
      position: 'top',
    });
  } finally {
    isLoading.value = false;
  }
};

// 취소 처리
const handleCancel = () => {
  emit('guest-info-cancelled');
  showDialog.value = false;

  // 폼 초기화
  guestName.value = '';
  guestEmail.value = '';
};
</script>

<style scoped>
.guest-info-dialog {
  border-radius: 12px;
}

.guest-info-dialog .q-card__section {
  padding: 24px;
}
</style>
