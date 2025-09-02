<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuth } from './composables/useAuth';
import GlobalAppManager from './utils/GlobalAppManager';

const { initAuth, isAuthenticated, userRole, loading, debugUserInfo } = useAuth();

const router = useRouter();
const route = useRoute();

// 전역 앱 관리자 인스턴스
const appManager = GlobalAppManager.getInstance();

onMounted(() => {
  // 앱 시작 시 단 한번 인증 리스너 초기화
  initAuth();
});

// 중복 리디렉션 방지를 위한 플래그
let isRedirecting = false;
let lastRedirectPath = '';
let lastRedirectTime = 0;

// 인증 상태가 변경될 때마다 실행되는 watch
watch([isAuthenticated, userRole, loading], ([newAuth, newRole, newLoading]) => {
  // 로딩이 완료된 후에만 로직 실행
  if (newLoading) return;

  // 전역 앱 관리자를 통한 초기화 상태 확인
  if (!appManager.initializeApp()) {
    // 이미 초기화되었다면 여기서 종료
    return;
  }

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

      // Student mode에서 관리자로 전환된 경우를 감지
      const lastUserMode = localStorage.getItem('lastUserMode');
      if (lastUserMode === 'student' && route.path.startsWith('/study')) {
        console.log(
          '⚠️ Student mode에서 관리자로 전환됨. Student mode 유지를 위해 리디렉션하지 않음.',
        );
        // localStorage 정리
        localStorage.removeItem('lastUserMode');
        localStorage.removeItem('lastStudentPath');
        return;
      }

      if (
        route.path === '/login' ||
        (route.path.startsWith('/study') && route.name !== 'StudentView')
      ) {
        if (!isRedirecting) {
          isRedirecting = true;
          router.push('/').finally(() => {
            isRedirecting = false;
          });
        }
      }
    } else if (newRole === 'student') {
      // 학생은 /study 경로로 강제 이동 (단, 이미 /study 경로에 있다면 리디렉션하지 않음)
      if (!route.path.startsWith('/study')) {
        // localStorage에서 이전 Student mode 경로 확인
        const lastStudentPath = localStorage.getItem('lastStudentPath');
        const lastUserMode = localStorage.getItem('lastUserMode');

        // 이전에 Student mode였다면 해당 경로로, 아니면 기본 경로로
        const targetPath =
          lastUserMode === 'student' && lastStudentPath ? lastStudentPath : '/study/default';

        const currentTime = Date.now();

        // 중복 리디렉션 방지: 같은 경로로 1초 이내에 리디렉션하지 않음
        if (
          !isRedirecting &&
          (lastRedirectPath !== targetPath || currentTime - lastRedirectTime > 1000)
        ) {
          console.log('학생으로 확인됨. 학생 페이지로 이동합니다:', targetPath);
          isRedirecting = true;
          lastRedirectPath = targetPath;
          lastRedirectTime = currentTime;

          router.push(targetPath).finally(() => {
            isRedirecting = false;
            // 성공적으로 이동했다면 localStorage 정리
            if (lastUserMode === 'student') {
              localStorage.removeItem('lastUserMode');
              localStorage.removeItem('lastStudentPath');
            }
          });
        } else {
          console.log('🔄 중복 리디렉션 방지: 이미 리디렉션 중이거나 최근에 리디렉션됨');
        }
      } else {
        console.log('학생으로 확인됨. 이미 학생 페이지에 있으므로 현재 경로 유지:', route.path);
        // 이미 Student 페이지에 있다면 localStorage 정리
        localStorage.removeItem('lastUserMode');
        localStorage.removeItem('lastStudentPath');
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
