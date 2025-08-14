<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuth } from './composables/useAuth';

const { initAuth, isAuthenticated, userRole, loading, debugUserInfo } = useAuth();

const router = useRouter();
const route = useRoute();

onMounted(() => {
  // 앱 시작 시 단 한번 인증 리스너 초기화
  initAuth();
});

// 인증 상태가 변경될 때마다 실행되는 watch
watch([isAuthenticated, userRole, loading], ([newAuth, newRole, newLoading]) => {
  // 로딩이 완료된 후에만 로직 실행
  if (newLoading) return;

  console.log(
    `인증 상태 감시: isAuthenticated=${newAuth}, userRole=${newRole}, loading=${newLoading}`,
  );
  console.log(`현재 경로: ${route.path}`);

  // 디버깅을 위해 현재 사용자 정보 출력
  debugUserInfo();

  if (newAuth) {
    // 인증된 사용자
    if (newRole === 'admin') {
      // 관리자는 어디든 접근 가능 (특별한 리디렉션 없음)
      console.log('관리자로 확인됨. 현재 경로 유지.');
      if (
        route.path === '/login' ||
        (route.path.startsWith('/study') && route.name !== 'StudentView')
      ) {
        router.push('/');
      }
    } else if (newRole === 'student') {
      // 학생은 /study 경로로 강제 이동
      if (!route.path.startsWith('/study')) {
        console.log('학생으로 확인됨. 학생 페이지로 이동합니다.');
        router.push('/study/default');
      }
    }
  } else {
    // 인증되지 않은 사용자
    // /study 경로 접근 시에만 로그인 페이지로 이동
    if (route.path.startsWith('/study')) {
      console.log('미인증 사용자가 학생 페이지 접근. 로그인 페이지로 이동합니다.');
      // 현재는 MainLayout에서 로그인 화면을 보여주므로 별도 이동 불필요
    } else {
      console.log('미인증 사용자. 현재 경로 유지.');
    }
  }
});
</script>

<style>
#app {
  min-height: 100vh;
  background: #f8f9fa;
}

/* 전역 배경 스타일 */
body {
  margin: 0;
  padding: 0;
  background: #f8f9fa;
}
</style>
