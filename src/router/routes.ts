import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'survey-results', component: () => import('pages/SurveyResults.vue') },
    ],
  },

  // 로그아웃 페이지
  {
    path: '/logout',
    component: () => import('pages/LogoutPage.vue'),
  },

  // 수강생용 페이지 (보안 강화)
  {
    path: '/study/:courseId',
    component: () => import('pages/StudentView.vue'),
    beforeEnter: (to, from, next) => {
      // 게스트 모드 확인
      const isGuestMode = localStorage.getItem('isGuestMode') === 'true';
      const guestUserId = localStorage.getItem('guestUserId');
      const isGuestAuthenticated = isGuestMode && guestUserId;

      // 환경변수와 localStorage로 학생 모드 활성화 여부 확인
      const envStudentMode = import.meta.env.VITE_ENABLE_STUDENT_MODE === 'true';
      const localStudentMode = localStorage.getItem('enableStudentMode') === 'true';
      const isStudentModeEnabled = envStudentMode || localStudentMode;

      // 디버깅을 위한 상세 로그
      console.log('🔍 라우터 가드 디버깅:', {
        isGuestMode,
        guestUserId,
        isGuestAuthenticated,
        envStudentMode,
        localStudentMode,
        isStudentModeEnabled,
        courseId: to.params.courseId,
        localStorage: {
          isGuestMode: localStorage.getItem('isGuestMode'),
          guestUserId: localStorage.getItem('guestUserId'),
          enableStudentMode: localStorage.getItem('enableStudentMode'),
        },
      });

      // 게스트 모드이거나 학생 모드가 활성화된 경우 접근 허용
      if (isGuestAuthenticated || isStudentModeEnabled) {
        console.log('✅ 학생 페이지 접근 허용:', {
          isGuestAuthenticated,
          isStudentModeEnabled,
          courseId: to.params.courseId,
        });
        next();
        return;
      }

      console.warn('🚫 학생 모드가 비활성화되어 있습니다.');
      next('/');
    },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
