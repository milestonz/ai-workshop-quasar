import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Firebase 설정
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Firebase 설정 검증
console.log('🔐 Firebase 설정 확인:', {
  apiKey: firebaseConfig.apiKey ? '설정됨' : '설정 안됨',
  authDomain: firebaseConfig.authDomain ? '설정됨' : '설정 안됨',
  projectId: firebaseConfig.projectId ? '설정됨' : '설정 안됨',
  storageBucket: firebaseConfig.storageBucket ? '설정됨' : '설정 안됨',
  messagingSenderId: firebaseConfig.messagingSenderId ? '설정됨' : '설정 안됨',
  appId: firebaseConfig.appId ? '설정됨' : '설정 안됨',
});

// 실제 값들도 확인 (보안을 위해 일부만)
console.log('🔐 Firebase 설정 값 확인:', {
  apiKey: firebaseConfig.apiKey ? `${firebaseConfig.apiKey.substring(0, 10)}...` : '없음',
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
});

// 필수 설정이 없는 경우 경고
if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId) {
  console.warn('⚠️ Firebase 설정이 완전하지 않습니다. 환경 변수를 확인해주세요.');
}

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Auth 인스턴스 생성
export const auth = getAuth(app);

// Google Auth Provider 생성
export const googleProvider = new GoogleAuthProvider();

// 기본 내보내기
export default app;
