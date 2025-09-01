import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useAuth } from './useAuth';
import { useGuestAuth } from './useGuestAuth';

export function useSlideActions() {
  const $q = useQuasar();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { isGuestAuthenticated, isGuestInfoRegistered } = useGuestAuth();

  const isFullscreen = ref(false);
  const isPresentationMode = ref(false);

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
    isPresentationMode.value = !isPresentationMode.value;
    $q.notify({
      type: 'info',
      message: isPresentationMode.value ? '프리젠테이션 모드로 전환' : '편집기 모드로 전환',
      position: 'top',
      timeout: 2000,
    });
  };

  // 슬라이드 다운로드
  const handleDownloadSlide = () => {
    const currentRoute = router.currentRoute.value;
    const slideId = currentRoute.params.id as string;
    
    if (!slideId) {
      $q.notify({
        type: 'negative',
        message: '다운로드할 슬라이드를 찾을 수 없습니다.',
        position: 'top',
      });
      return;
    }

    // 슬라이드 다운로드 로직
    $q.notify({
      type: 'info',
      message: `슬라이드 ${slideId} 다운로드 시작`,
      position: 'top',
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

  // 수강생과 공유
  const shareWithStudents = () => {
    const currentUrl = window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: 'AI 워크샵',
        text: 'AI 워크샵 콘텐츠를 확인해보세요!',
        url: currentUrl,
      });
    } else {
      navigator.clipboard.writeText(currentUrl).then(() => {
        $q.notify({
          type: 'positive',
          message: '링크가 클립보드에 복사되었습니다.',
          position: 'top',
        });
      });
    }
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
            <li>일부 관리자 기능 제한</li>
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
    handleDownloadSlide,
    handleCaptureSlide,
    shareWithStudents,
    showGuestModeInfo,
  };
}
