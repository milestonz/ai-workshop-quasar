import { boot } from 'quasar/wrappers';
import { initializeServiceWorker } from 'src/utils/serviceWorker';

export default boot(async () => {
  // Service Worker 초기화
  try {
    const swInitialized = await initializeServiceWorker();
    if (swInitialized) {
      console.log('🎯 Service Worker 초기화 완료');
    } else {
      console.log('⚠️ Service Worker 초기화 실패 또는 미지원');
    }
  } catch (error) {
    console.warn('⚠️ Service Worker 초기화 중 오류:', error);
  }
});
