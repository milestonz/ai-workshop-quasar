/**
 * Service Worker 관리 유틸리티
 * 캐싱, 프리로딩, 캐시 관리 기능 제공
 */

interface CacheStatus {
  [cacheName: string]: number;
}

interface SlideMetadata {
  id: string;
  title: string;
  htmlPath: string;
  chapter: number;
  section: number;
  priority?: string;
  preload?: boolean;
}

class ServiceWorkerManager {
  private registration: ServiceWorkerRegistration | null = null;
  private isSupported = 'serviceWorker' in navigator;
  private isAzureEnvironment = this.checkAzureEnvironment();

  /**
   * Azure 환경인지 확인
   */
  private checkAzureEnvironment(): boolean {
    // Azure Static Web Apps 환경 확인
    const hostname = window.location.hostname;
    const isAzure = hostname.includes('azurewebsites.net') || 
                   hostname.includes('staticwebapps.net') ||
                   import.meta.env.VITE_DISABLE_SERVICE_WORKER === 'true';
    
    if (isAzure) {
      console.log('🌐 Azure 환경 감지됨 - Service Worker 비활성화');
    }
    
    return isAzure;
  }

  /**
   * Service Worker 등록
   */
  async register(): Promise<boolean> {
    // Azure 환경에서는 Service Worker 비활성화
    if (this.isAzureEnvironment) {
      console.log('🚫 Azure 환경에서 Service Worker 등록 건너뜀');
      return false;
    }

    if (!this.isSupported) {
      console.warn('⚠️ Service Worker를 지원하지 않는 브라우저입니다.');
      return false;
    }

    try {
      console.log('🔧 Service Worker 등록 중...');

      this.registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });

      console.log('✅ Service Worker 등록 완료:', this.registration.scope);

      // 업데이트 확인
      this.registration.addEventListener('updatefound', () => {
        const newWorker = this.registration!.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('🔄 Service Worker 업데이트 사용 가능');
              this.showUpdateNotification();
            }
          });
        }
      });

      return true;
    } catch (error) {
      console.error('❌ Service Worker 등록 실패:', error);
      return false;
    }
  }

  /**
   * Service Worker 활성화 확인
   */
  async waitForActivation(): Promise<boolean> {
    // Azure 환경에서는 항상 false 반환
    if (this.isAzureEnvironment) {
      return false;
    }

    if (!this.registration) {
      return false;
    }

    return new Promise((resolve) => {
      if (this.registration!.active) {
        resolve(true);
        return;
      }

      const checkActivation = () => {
        if (this.registration!.active) {
          resolve(true);
        } else {
          setTimeout(checkActivation, 100);
        }
      };

      checkActivation();
    });
  }

  /**
   * 슬라이드 프리로딩
   */
  async preloadSlides(slides: SlideMetadata[]): Promise<void> {
    // Azure 환경에서는 프리로딩 건너뜀
    if (this.isAzureEnvironment) {
      console.log('🚫 Azure 환경에서 슬라이드 프리로딩 건너뜀');
      return;
    }

    if (!this.registration?.active) {
      console.warn('⚠️ Service Worker가 활성화되지 않았습니다.');
      return;
    }

    try {
      console.log(`🚀 ${slides.length}개 슬라이드 프리로딩 시작...`);

      this.registration.active.postMessage({
        type: 'PRELOAD_SLIDES',
        data: { slides },
      });

      console.log('✅ 슬라이드 프리로딩 요청 완료');
    } catch (error) {
      console.error('❌ 슬라이드 프리로딩 실패:', error);
    }
  }

  /**
   * 캐시 상태 조회
   */
  async getCacheStatus(): Promise<CacheStatus> {
    // Azure 환경에서는 빈 객체 반환
    if (this.isAzureEnvironment) {
      return {};
    }

    if (!this.registration?.active) {
      return {};
    }

    return new Promise((resolve) => {
      const channel = new MessageChannel();
      channel.port1.onmessage = (event) => {
        if (event.data.type === 'CACHE_STATUS') {
          resolve(event.data.data);
        }
      };

      this.registration!.active!.postMessage(
        { type: 'GET_CACHE_STATUS' },
        [channel.port2],
      );
    });
  }

  /**
   * 슬라이드 캐시 삭제
   */
  async clearSlideCache(): Promise<void> {
    // Azure 환경에서는 캐시 삭제 건너뜀
    if (this.isAzureEnvironment) {
      console.log('🚫 Azure 환경에서 슬라이드 캐시 삭제 건너뜀');
      return;
    }

    if (!this.registration?.active) {
      console.warn('⚠️ Service Worker가 활성화되지 않았습니다.');
      return;
    }

    try {
      this.registration.active.postMessage({ type: 'CLEAR_SLIDE_CACHE' });
      console.log('✅ 슬라이드 캐시 삭제 요청 완료');
    } catch (error) {
      console.error('❌ 슬라이드 캐시 삭제 실패:', error);
    }
  }

  /**
   * 모든 캐시 삭제
   */
  async clearAllCaches(): Promise<void> {
    // Azure 환경에서는 캐시 삭제 건너뜀
    if (this.isAzureEnvironment) {
      console.log('🚫 Azure 환경에서 모든 캐시 삭제 건너뜀');
      return;
    }

    if (!this.registration?.active) {
      console.warn('⚠️ Service Worker가 활성화되지 않았습니다.');
      return;
    }

    try {
      this.registration.active.postMessage({ type: 'CLEAR_CACHE' });
      console.log('✅ 모든 캐시 삭제 요청 완료');
    } catch (error) {
      console.error('❌ 모든 캐시 삭제 실패:', error);
    }
  }

  /**
   * Service Worker 지원 여부 확인
   */
  isServiceWorkerSupported(): boolean {
    return this.isSupported && !this.isAzureEnvironment;
  }

  /**
   * 업데이트 알림 표시
   */
  private showUpdateNotification(): void {
    // 간단한 업데이트 알림 (필요시 구현)
    console.log('🔄 새로운 버전이 사용 가능합니다. 페이지를 새로고침하세요.');
  }
}

// 싱글톤 인스턴스
export const serviceWorkerManager = new ServiceWorkerManager();

/**
 * Service Worker 초기화
 */
export async function initializeServiceWorker(): Promise<boolean> {
  const registered = await serviceWorkerManager.register();
  if (registered) {
    const activated = await serviceWorkerManager.waitForActivation();
    return activated;
  }
  return false;
}

/**
 * 중요 슬라이드 프리로딩
 */
export async function preloadImportantSlides(): Promise<void> {
  try {
    // course-outline.json에서 중요 슬라이드 정보 가져오기
    const response = await fetch('/data/course-outline.json');
    if (!response.ok) {
      console.warn('⚠️ course-outline.json을 로드할 수 없습니다.');
      return;
    }

    const courseData = await response.json();
    const importantSlides: SlideMetadata[] = [];

    // 첫 번째 슬라이드와 각 챕터의 첫 번째 슬라이드만 프리로딩
    courseData.chapters?.forEach((chapter: any, chapterIndex: number) => {
      if (chapter.slides && chapter.slides.length > 0) {
        const firstSlide = chapter.slides[0];
        importantSlides.push({
          id: `${chapterIndex}-0`,
          title: firstSlide.title || `Chapter ${chapterIndex + 1}`,
          htmlPath: `/html/slide-${chapterIndex}-0.html`,
          chapter: chapterIndex,
          section: 0,
          priority: 'high',
        });
      }
    });

    if (importantSlides.length > 0) {
      await serviceWorkerManager.preloadSlides(importantSlides);
    }
  } catch (error) {
    console.error('❌ 중요 슬라이드 프리로딩 실패:', error);
  }
}

/**
 * 캐시 상태 조회
 */
export async function getCacheStatus(): Promise<CacheStatus> {
  const status = await serviceWorkerManager.getCacheStatus();
  return status;
}

/**
 * 슬라이드 캐시 삭제
 */
export async function clearSlideCache(): Promise<void> {
  await serviceWorkerManager.clearSlideCache();
}

/**
 * 모든 캐시 삭제
 */
export async function clearAllCaches(): Promise<void> {
  await serviceWorkerManager.clearAllCaches();
}

export default serviceWorkerManager;


