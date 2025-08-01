<template>
  <q-dialog v-model="isOpen" persistent>
    <q-card style="min-width: 350px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">로그인</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-body2 q-mb-md">AI Workshop 강의를 수강하려면 로그인이 필요합니다.</div>

        <div v-if="error" class="text-negative q-mb-md">
          {{ error }}
        </div>

        <q-btn
          :loading="loading"
          :disable="loading"
          color="primary"
          icon="login"
          label="Google로 로그인"
          @click="handleGoogleLogin"
          class="full-width"
          size="lg"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="취소" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';

interface Props {
  modelValue: boolean;
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const router = useRouter();

const { signInWithGoogle, loading, error } = useAuth();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const handleGoogleLogin = async () => {
  const role = await signInWithGoogle();
  if (!error.value) {
    isOpen.value = false;
    // 역할에 따라 리디렉션
    if (role === 'admin') {
      router.push('/');
    } else if (role === 'student') {
      router.push('/study/default');
    }
  }
};
</script>
