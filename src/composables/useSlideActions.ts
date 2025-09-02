import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useAuth } from './useAuth';
import { useGuestAuth } from './useGuestAuth';
import { useCourseStore } from 'src/stores/course';

export function useSlideActions() {
  const $q = useQuasar();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { isGuestAuthenticated, isGuestInfoRegistered } = useGuestAuth();
  const courseStore = useCourseStore();

  const isFullscreen = ref(false);
  // courseStore의 isPresentationMode를 사용하도록 변경
  const isPresentationMode = courseStore.isPresentationMode;

  // 전체화면 토글
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      isFullscreen.value = true;
    } else {
      document.exitFullscreen();
      isFullscreen.value = false;
    }
  };

  // 프리젠테이션 모드 토글
  const togglePresentationMode = () => {
    courseStore.togglePresentationMode();
    $q.notify({
      type: 'info',
      message: isPresentationMode ? '프리젠테이션 모드로 전환' : '편집기 모드로 전환',
      position: 'top',
      timeout: 2000,
    });
  };

  // 화면 캡처
  const handleCaptureSlide = () => {
    $q.notify({
      type: 'info',
      message: '화면 캡처 기능은 준비 중입니다.',
      position: 'top',
    });
  };

  // 게스트 모드 안내
  const showGuestModeInfo = () => {
    $q.dialog({
      title: '게스트 모드 안내',
      message: `
        <div class="q-pa-md">
          <p><strong>게스트 모드란?</strong></p>
          <p>로그인 없이 AI 워크샵 콘텐츠를 체험할 수 있는 모드입니다.</p>
          <br>
          <p><strong>제한사항:</strong></p>
          <ul>
            <li>투표 결과 저장 불가</li>
            <li>진도 저장 불가</li>
            <li>슬라이드 캡쳐 불가</li>
          </ul>
          <br>
          <p>전체 기능을 사용하려면 로그인하세요.</p>
        </div>
      `,
      html: true,
      ok: {
        label: '확인',
        color: 'primary',
      },
    });
  };

  return {
    isFullscreen,
    isPresentationMode,
    toggleFullscreen,
    togglePresentationMode,
    handleCaptureSlide,
    showGuestModeInfo,
  };
}
