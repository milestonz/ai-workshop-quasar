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

  /**
   * Service Worker 등록
   */
  async register(): Promise<boolean> {
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
  async getCacheStatus(): Promise<CacheStatus | null> {
    if (!this.registration?.active) {
      return null;
    }

    return new Promise((resolve) => {
      const messageChannel = new MessageChannel();

      messageChannel.port1.onmessage = (event) => {
        if (event.data.type === 'CACHE_STATUS') {
          resolve(event.data.data);
        }
      };

      this.registration!.active!.postMessage({ type: 'GET_CACHE_STATUS' }, [messageChannel.port2]);

      // 타임아웃 설정
      setTimeout(() => resolve(null), 5000);
    });
  }

  /**
   * 슬라이드 캐시 삭제
   */
  async clearSlideCache(): Promise<void> {
    if (!this.registration?.active) {
      console.warn('⚠️ Service Worker가 활성화되지 않았습니다.');
      return;
    }

    try {
      this.registration.active.postMessage({
        type: 'CLEAR_SLIDE_CACHE',
      });
      console.log('🗑️ 슬라이드 캐시 삭제 요청 완료');
    } catch (error) {
      console.error('❌ 슬라이드 캐시 삭제 실패:', error);
    }
  }

  /**
   * 모든 캐시 삭제
   */
  async clearAllCaches(): Promise<void> {
    if (!this.registration?.active) {
      console.warn('⚠️ Service Worker가 활성화되지 않았습니다.');
      return;
    }

    try {
      this.registration.active.postMessage({
        type: 'CLEAR_CACHE',
      });
      console.log('🗑️ 모든 캐시 삭제 요청 완료');
    } catch (error) {
      console.error('❌ 캐시 삭제 실패:', error);
    }
  }

  /**
   * 업데이트 알림 표시
   */
  private showUpdateNotification(): void {
    // Quasar의 Notify를 사용하여 업데이트 알림 표시
    if (typeof window !== 'undefined' && (window as any).$q) {
      (window as any).$q.notify({
        type: 'info',
        message: '새로운 버전이 사용 가능합니다.',
        caption: '페이지를 새로고침하여 업데이트를 적용하세요.',
        actions: [
          {
            label: '새로고침',
            color: 'white',
            handler: () => {
              window.location.reload();
            },
          },
        ],
        timeout: 10000,
      });
    }
  }

  /**
   * Service Worker 지원 여부 확인
   */
  isServiceWorkerSupported(): boolean {
    return this.isSupported;
  }

  /**
   * Service Worker 등록 상태 확인
   */
  isRegistered(): boolean {
    return this.registration !== null;
  }

  /**
   * Service Worker 활성화 상태 확인
   */
  isActive(): boolean {
    return this.registration?.active !== null;
  }
}

// 싱글톤 인스턴스
export const serviceWorkerManager = new ServiceWorkerManager();

/**
 * Service Worker 초기화 함수
 */
export async function initializeServiceWorker(): Promise<boolean> {
  try {
    const registered = await serviceWorkerManager.register();

    if (registered) {
      const activated = await serviceWorkerManager.waitForActivation();
      if (activated) {
        console.log('🎯 Service Worker 초기화 완료');
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error('❌ Service Worker 초기화 실패:', error);
    return false;
  }
}

/**
 * 슬라이드 프리로딩 헬퍼 함수
 */
export async function preloadImportantSlides(): Promise<void> {
  try {
    // slidePreload.json에서 프리로딩 대상 슬라이드 가져오기
    const response = await fetch('/data/slidePreload.json');
    if (!response.ok) {
      throw new Error('프리로딩 데이터 로드 실패');
    }

    const preloadData = await response.json();
    const importantSlides: SlideMetadata[] = [];

    // 높은 우선순위 슬라이드들만 추출
    preloadData.chapters.forEach((chapter: any) => {
      chapter.slides.forEach((slide: any) => {
        if (slide.preload && slide.priority === 'high') {
          importantSlides.push({
            id: slide.id,
            title: slide.title,
            htmlPath: slide.htmlPath,
            chapter: slide.chapter,
            section: slide.section,
            priority: slide.priority,
            preload: slide.preload,
          });
        }
      });
    });

    if (importantSlides.length > 0) {
      await serviceWorkerManager.preloadSlides(importantSlides);
    }
  } catch (error) {
    console.warn('⚠️ 중요 슬라이드 프리로딩 실패:', error);
  }
}

/**
 * 캐시 상태 모니터링
 */
export async function monitorCacheStatus(): Promise<void> {
  try {
    const status = await serviceWorkerManager.getCacheStatus();
    if (status) {
      console.log('📊 캐시 상태:', status);

      // 캐시 사용량이 너무 크면 정리
      const totalCached = Object.values(status).reduce((sum, count) => sum + count, 0);
      if (totalCached > 1000) {
        // 1000개 이상 캐시된 경우
        console.log('🧹 캐시 정리 필요:', totalCached, '개 항목');
        await serviceWorkerManager.clearSlideCache();
      }
    }
  } catch (error) {
    console.warn('⚠️ 캐시 상태 모니터링 실패:', error);
  }
}

export default serviceWorkerManager;
