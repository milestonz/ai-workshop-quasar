<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from './composables/useAuth';

const { handleRedirectResult, initAuth } = useAuth();
const router = useRouter();

onMounted(async () => {
  // 앱 시작 시 Firebase 인증 상태 리스너 초기화
  initAuth();

  // 리디렉션 후 돌아온 경우 로그인 결과 처리
  const user = await handleRedirectResult();
  
  if (user) {
    // 로그인 성공 후 역할에 따라 페이지 이동
    if (user.role === 'admin') {
      // 현재 경로가 학생 뷰가 아니라면 관리자 홈으로 이동
      if (!router.currentRoute.value.path.startsWith('/study')) {
        router.push('/');
      }
    } else if (user.role === 'student') {
      // 현재 경로가 학생 뷰가 아니라면 학생 홈으로 이동
       if (!router.currentRoute.value.path.startsWith('/study')) {
        router.push('/study/default');
      }
    }
  }
});
</script>
