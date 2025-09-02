/**
 * Service Worker for AI Workshop Quasar
 * 슬라이드 HTML 파일 캐싱 및 성능 최적화
 */

const CACHE_NAME = 'ai-workshop-v1.0.0';
const STATIC_CACHE = 'ai-workshop-static-v1.0.0';
const SLIDE_CACHE = 'ai-workshop-slides-v1.0.0';

// 캐싱할 정적 자산들
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/data/slideIndex.json',
  '/data/slidePreload.json',
  '/css/index-type.css',
  '/css/general-type.css',
  '/css/lecture-type.css',
  '/css/challenge-type.css',
  '/css/poll-type.css',
  '/css/survey-type.css',
  '/css/timeline-type.css',
  '/css/example-type.css',
  '/css/chapter-type.css',
  '/css/cover-type.css',
  '/css/html-type.css',
  '/css/profile-type.css',
  '/icons/favicon-16x16.png',
  '/icons/favicon-32x32.png',
  '/icons/favicon-96x96.png',
  '/icons/favicon-128x128.png',
];

// 슬라이드 HTML 파일 패턴
const SLIDE_PATTERN = /^\/html\/slide-\d+-\d+\.html$/;

/**
 * Service Worker 설치 이벤트
 */
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker 설치 중...');

  event.waitUntil(
    Promise.all([
      // 정적 자산 캐싱
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('📦 정적 자산 캐싱 중...');
        return cache.addAll(STATIC_ASSETS);
      }),

      // 슬라이드 캐시 초기화
      caches.open(SLIDE_CACHE).then((cache) => {
        console.log('📚 슬라이드 캐시 초기화 완료');
        return cache;
      }),
    ]).then(() => {
      console.log('✅ Service Worker 설치 완료');
      // 즉시 활성화
      return self.skipWaiting();
    }),
  );
});

/**
 * Service Worker 활성화 이벤트
 */
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker 활성화 중...');

  event.waitUntil(
    Promise.all([
      // 오래된 캐시 정리
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (
              cacheName !== CACHE_NAME &&
              cacheName !== STATIC_CACHE &&
              cacheName !== SLIDE_CACHE
            ) {
              console.log('🗑️ 오래된 캐시 삭제:', cacheName);
              return caches.delete(cacheName);
            }
          }),
        );
      }),

      // 모든 클라이언트 제어
      self.clients.claim(),
    ]).then(() => {
      console.log('✅ Service Worker 활성화 완료');
    }),
  );
});

/**
 * 네트워크 요청 가로채기
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 같은 출처의 요청만 처리
  if (url.origin !== location.origin) {
    return;
  }

  // 슬라이드 HTML 파일 요청
  if (SLIDE_PATTERN.test(url.pathname)) {
    event.respondWith(handleSlideRequest(request));
    return;
  }

  // 정적 자산 요청
  if (STATIC_ASSETS.includes(url.pathname)) {
    event.respondWith(handleStaticRequest(request));
    return;
  }

  // JSON 데이터 요청
  if (url.pathname.endsWith('.json')) {
    event.respondWith(handleJsonRequest(request));
    return;
  }
});

/**
 * 슬라이드 HTML 파일 요청 처리
 */
async function handleSlideRequest(request) {
  const cache = await caches.open(SLIDE_CACHE);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    console.log('📖 캐시에서 슬라이드 로드:', request.url);

    // 백그라운드에서 업데이트 확인
    updateSlideInBackground(request, cache);

    return cachedResponse;
  }

  // 캐시에 없으면 네트워크에서 가져오기
  try {
    console.log('🌐 네트워크에서 슬라이드 로드:', request.url);
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      // 캐시에 저장
      cache.put(request, networkResponse.clone());
      console.log('💾 슬라이드 캐시에 저장:', request.url);
    }

    return networkResponse;
  } catch (error) {
    console.error('❌ 슬라이드 로드 실패:', request.url, error);

    // 오프라인 상태일 때 기본 응답
    return new Response(
      `
      <!DOCTYPE html>
      <html>
      <head>
        <title>오프라인</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 50px;
            background: #f5f5f5;
          }
          .offline-message {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            max-width: 400px;
            margin: 0 auto;
          }
        </style>
      </head>
      <body>
        <div class="offline-message">
          <h2>📡 오프라인 상태</h2>
          <p>인터넷 연결을 확인해주세요.</p>
          <p>이전에 방문한 슬라이드는 캐시에서 로드됩니다.</p>
        </div>
      </body>
      </html>
      `,
      {
        status: 200,
        statusText: 'OK',
        headers: { 'Content-Type': 'text/html' },
      },
    );
  }
}

/**
 * 정적 자산 요청 처리
 */
async function handleStaticRequest(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('❌ 정적 자산 로드 실패:', request.url, error);
    throw error;
  }
}

/**
 * JSON 데이터 요청 처리
 */
async function handleJsonRequest(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cachedResponse = await cache.match(request);

  // JSON 데이터는 항상 최신 버전을 우선으로 하되, 오프라인일 때는 캐시 사용
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      // 네트워크 응답이 있으면 캐시 업데이트
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    console.warn('⚠️ JSON 네트워크 요청 실패, 캐시 사용:', request.url);
  }

  // 네트워크 실패 시 캐시된 응답 반환
  if (cachedResponse) {
    return cachedResponse;
  }

  throw new Error('JSON 데이터를 로드할 수 없습니다.');
}

/**
 * 백그라운드에서 슬라이드 업데이트
 */
async function updateSlideInBackground(request, cache) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      // 캐시 업데이트
      cache.put(request, networkResponse.clone());
      console.log('🔄 슬라이드 백그라운드 업데이트:', request.url);
    }
  } catch (error) {
    // 백그라운드 업데이트 실패는 무시
    console.warn('⚠️ 백그라운드 업데이트 실패:', request.url);
  }
}

/**
 * 캐시 관리 함수들
 */
self.addEventListener('message', (event) => {
  const { type, data } = event.data;

  switch (type) {
    case 'CLEAR_CACHE':
      clearAllCaches();
      break;

    case 'CLEAR_SLIDE_CACHE':
      clearSlideCache();
      break;

    case 'PRELOAD_SLIDES':
      preloadSlides(data.slides);
      break;

    case 'GET_CACHE_STATUS':
      getCacheStatus().then((status) => {
        event.ports[0].postMessage({ type: 'CACHE_STATUS', data: status });
      });
      break;
  }
});

/**
 * 모든 캐시 삭제
 */
async function clearAllCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
  console.log('🗑️ 모든 캐시 삭제 완료');
}

/**
 * 슬라이드 캐시만 삭제
 */
async function clearSlideCache() {
  await caches.delete(SLIDE_CACHE);
  console.log('🗑️ 슬라이드 캐시 삭제 완료');
}

/**
 * 슬라이드 프리로딩
 */
async function preloadSlides(slides) {
  const cache = await caches.open(SLIDE_CACHE);

  for (const slide of slides) {
    try {
      const response = await fetch(slide.htmlPath);
      if (response.ok) {
        cache.put(slide.htmlPath, response.clone());
        console.log('🚀 슬라이드 프리로딩 완료:', slide.htmlPath);
      }
    } catch (error) {
      console.warn('⚠️ 슬라이드 프리로딩 실패:', slide.htmlPath);
    }
  }
}

/**
 * 캐시 상태 조회
 */
async function getCacheStatus() {
  const cacheNames = await caches.keys();
  const status = {};

  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    status[cacheName] = keys.length;
  }

  return status;
}

console.log('🎯 Service Worker 로드 완료');
