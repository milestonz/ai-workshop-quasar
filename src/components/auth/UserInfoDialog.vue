<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card style="min-width: 450px" class="user-info-dialog">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-dark">
          <q-icon name="settings" color="primary" class="q-mr-sm" />
          사용자 정보 설정
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle2 text-grey-7 q-mb-md">
          현재 사용자 정보를 확인하고 수정할 수 있습니다.
        </div>

        <!-- 사용자 정보 표시 -->
        <div class="q-mb-lg">
          <div class="row items-center q-mb-sm">
            <q-icon name="person" color="primary" class="q-mr-sm" />
            <div class="text-subtitle1 text-weight-medium">사용자 정보</div>
          </div>

          <div class="q-ml-md">
            <div class="row items-center q-mb-xs">
              <div class="text-caption text-grey-6 q-mr-sm" style="min-width: 60px">이름:</div>
              <div class="text-body1 text-weight-medium">{{ userInfo.name }}</div>
            </div>
            <div class="row items-center q-mb-xs">
              <div class="text-caption text-grey-6 q-mr-sm" style="min-width: 60px">이메일:</div>
              <div class="text-body1">{{ userInfo.email || '이메일 없음' }}</div>
            </div>
            <div class="row items-center q-mb-xs">
              <div class="text-caption text-grey-6 q-mr-sm" style="min-width: 60px">역할:</div>
              <div class="text-body1">
                <q-chip
                  :color="
                    userInfo.role === 'admin'
                      ? 'red'
                      : userInfo.role === 'student'
                        ? 'blue'
                        : 'orange'
                  "
                  text-color="white"
                  size="sm"
                >
                  {{ getRoleDisplayName(userInfo.role) }}
                </q-chip>
              </div>
            </div>
            <div class="row items-center q-mb-xs">
              <div class="text-caption text-grey-6 q-mr-sm" style="min-width: 60px">로그인:</div>
              <div class="text-body1">{{ userInfo.loginType }}</div>
            </div>
          </div>
        </div>

        <!-- 게스트 사용자인 경우 정보 수정 폼 -->
        <div v-if="userInfo.isGuest" class="q-mb-lg">
          <q-separator class="q-my-md" />

          <div class="row items-center q-mb-sm">
            <q-icon name="edit" color="orange" class="q-mr-sm" />
            <div class="text-subtitle1 text-weight-medium">정보 수정</div>
          </div>

          <q-form @submit="handleUpdateInfo" class="q-gutter-md">
            <q-input
              v-model="editName"
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
              v-model="editEmail"
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

            <!-- 수정 버튼 -->
            <div class="row q-gutter-sm">
              <q-btn
                type="submit"
                color="orange"
                icon="save"
                label="정보 수정"
                :loading="isUpdating"
                :disable="!editName.trim() || !editEmail.trim() || !isValidEmail(editEmail)"
                class="col"
              />
            </div>
          </q-form>
        </div>

        <!-- 일반 사용자인 경우 안내 -->
        <div v-else class="q-mb-lg">
          <q-banner class="bg-blue-1 text-blue-9">
            <template v-slot:avatar>
              <q-icon name="info" color="blue" />
            </template>
            <div class="text-caption">
              Google 계정으로 로그인한 사용자는 Google 계정 설정에서 정보를 수정할 수 있습니다.
            </div>
          </q-banner>
        </div>

        <!-- 계정 관리 -->
        <q-separator class="q-my-md" />

        <div class="row items-center q-mb-sm">
          <q-icon name="security" color="red" class="q-mr-sm" />
          <div class="text-subtitle1 text-weight-medium">계정 관리</div>
        </div>

        <div class="row q-gutter-sm">
          <q-btn
            flat
            color="red"
            icon="logout"
            label="로그아웃"
            @click="handleLogout"
            class="col"
          />
          <q-btn flat color="grey" icon="close" label="닫기" v-close-popup class="col" />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <!-- 로그아웃 확인 다이얼로그 -->
  <q-dialog v-model="showLogoutConfirm" persistent>
    <q-card style="min-width: 300px">
      <q-card-section class="row items-center">
        <q-avatar icon="logout" color="red" text-color="white" />
        <span class="q-ml-sm text-h6">로그아웃 확인</span>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <p class="text-body1">정말 로그아웃하시겠습니까?</p>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="취소" color="grey" v-close-popup />
        <q-btn flat label="로그아웃" color="red" @click="confirmLogout" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useQuasar } from 'quasar';

interface UserInfo {
  name: string;
  email: string;
  role: 'admin' | 'student' | 'guest';
  isGuest?: boolean;
  loginType: string;
}

interface Props {
  modelValue: boolean;
  userInfo: UserInfo;
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void;
  (e: 'update-user-info', userInfo: { name: string; email: string }): void;
  (e: 'logout'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const $q = useQuasar();

// 반응형 데이터
const editName = ref('');
const editEmail = ref('');
const isUpdating = ref(false);

// 다이얼로그 표시 상태
const showDialog = ref(props.modelValue);
const showLogoutConfirm = ref(false);

// props 변경 감지
watch(
  () => props.modelValue,
  (newValue) => {
    showDialog.value = newValue;
    if (newValue && props.userInfo) {
      // 수정 폼에 현재 정보 채우기
      editName.value = props.userInfo.name || '';
      editEmail.value = props.userInfo.email || '';
    }
  },
);

// 다이얼로그 상태 변경 감지
watch(showDialog, (newValue) => {
  emit('update:modelValue', newValue);
});

// 역할 표시 이름 반환
const getRoleDisplayName = (role: string): string => {
  const roleNames = {
    admin: '관리자',
    student: '수강생',
    guest: '게스트',
  };
  return roleNames[role as keyof typeof roleNames] || role;
};

// 이메일 유효성 검사
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 정보 수정 처리
const handleUpdateInfo = async () => {
  if (!editName.value.trim() || !editEmail.value.trim()) {
    $q.notify({
      type: 'warning',
      message: '이름과 이메일을 모두 입력해주세요.',
      position: 'top',
    });
    return;
  }

  if (!isValidEmail(editEmail.value)) {
    $q.notify({
      type: 'warning',
      message: '올바른 이메일 형식을 입력해주세요.',
      position: 'top',
    });
    return;
  }

  isUpdating.value = true;

  try {
    const updatedInfo = {
      name: editName.value.trim(),
      email: editEmail.value.trim(),
    };

    emit('update-user-info', updatedInfo);

    $q.notify({
      type: 'positive',
      message: '사용자 정보가 수정되었습니다!',
      position: 'top',
      timeout: 2000,
    });
  } catch (error) {
    console.error('사용자 정보 수정 실패:', error);
    $q.notify({
      type: 'negative',
      message: '사용자 정보 수정에 실패했습니다.',
      position: 'top',
    });
  } finally {
    isUpdating.value = false;
  }
};

// 로그아웃 처리
const handleLogout = () => {
  console.log('🔍 UserInfoDialog: 로그아웃 버튼 클릭됨');
  showLogoutConfirm.value = true;
};

// 로그아웃 확인 처리
const confirmLogout = () => {
  console.log('🔍 UserInfoDialog: 로그아웃 확인됨, logout 이벤트 발생');
  emit('logout');
  showDialog.value = false;
  showLogoutConfirm.value = false;
};
</script>

<style scoped>
.user-info-dialog {
  border-radius: 12px;
}

.user-info-dialog .q-card__section {
  padding: 24px;
}
</style>
