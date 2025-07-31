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

  // 수강생용 페이지 (보안 강화)
  {
    path: '/study/:courseId',
    component: () => import('pages/StudentView.vue'),
    beforeEnter: (to, from, next) => {
      // 환경변수와 localStorage로 학생 모드 활성화 여부 확인
      const envStudentMode = import.meta.env.VITE_ENABLE_STUDENT_MODE === 'true';
      const localStudentMode = localStorage.getItem('enableStudentMode') === 'true';
      const isStudentModeEnabled = envStudentMode || localStudentMode;

      if (!isStudentModeEnabled) {
        console.warn('🚫 학생 모드가 비활성화되어 있습니다.');
        next('/');
        return;
      }

      // 추가 보안 검증 (선택사항)
      const courseId = to.params.courseId;
      if (!courseId || courseId === 'undefined') {
        console.warn('🚫 유효하지 않은 강의 ID입니다.');
        next('/');
        return;
      }

      next();
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
