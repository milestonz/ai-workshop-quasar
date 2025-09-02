import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';
import { getDatabase, type Database } from 'firebase/database';

// 개발 모드 확인
const isDevelopment = import.meta.env.DEV;

// Firebase 설정 - Vite 환경변수만 사용 (일관성)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// 개발 모드에서만 상세 로그 출력
if (isDevelopment) {
  console.log('🔐 Firebase 설정 초기화 (개발 모드)');
  console.log('🔐 필수 설정 확인:', {
    apiKey: firebaseConfig.apiKey ? '설정됨' : '설정 안됨',
    authDomain: firebaseConfig.authDomain ? '설정됨' : '설정 안됨',
    projectId: firebaseConfig.projectId ? '설정됨' : '설정 안됨',
  });

  // 환경 변수 값 확인 (보안을 위해 일부만)
  if (firebaseConfig.apiKey) {
    console.log('🔐 API 키 확인:', `${firebaseConfig.apiKey.substring(0, 10)}...`);
  }
  if (firebaseConfig.authDomain) {
    console.log('🔐 Auth Domain 확인:', firebaseConfig.authDomain);
  }
  if (firebaseConfig.projectId) {
    console.log('🔐 Project ID 확인:', firebaseConfig.projectId);
  }
}

// 필수 설정 검증 (유연한 검증)
const requiredConfigs = ['apiKey', 'authDomain', 'projectId'];
const missingConfigs = requiredConfigs.filter(
  (key) => !firebaseConfig[key as keyof typeof firebaseConfig],
);

if (missingConfigs.length > 0) {
  const errorMessage = `Firebase 필수 설정이 누락되었습니다: ${missingConfigs.join(', ')}`;
  console.error('❌', errorMessage);

  if (isDevelopment) {
    console.error('❌ 환경 변수 확인:', {
      VITE_FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY ? '설정됨' : '설정 안됨',
      VITE_FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? '설정됨' : '설정 안됨',
      VITE_FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID ? '설정됨' : '설정 안됨',
    });

    console.error('❌ 해결 방법:');
    console.error('1. 프로젝트 루트에 .env 파일을 생성하세요');
    console.error('2. Firebase Console에서 설정값을 복사하여 .env 파일에 추가하세요');
    console.error('3. .env 파일 예시:');
    console.error('   VITE_FIREBASE_API_KEY=your_api_key_here');
    console.error('   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com');
    console.error('   VITE_FIREBASE_PROJECT_ID=your_project_id');
  }

  throw new Error(errorMessage);
}

// Firebase 앱 초기화
let app: FirebaseApp | undefined;
let auth: Auth | null;
let googleProvider: GoogleAuthProvider | null;
let db: Firestore | null;
let storage: FirebaseStorage | null;
let rtdb: Database | null;

if (firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId) {
  console.log('🔐 Firebase 초기화 시작...');
  app = initializeApp(firebaseConfig);
  console.log('✅ Firebase 앱 초기화 완료');

  auth = getAuth(app);
  console.log('✅ Firebase Auth 초기화 완료:', !!auth);

  googleProvider = new GoogleAuthProvider();
  console.log('✅ Google Auth Provider 초기화 완료:', !!googleProvider);

  db = getFirestore(app);
  console.log('✅ Firestore 초기화 완료:', !!db);

  storage = getStorage(app);
  console.log('✅ Firebase Storage 초기화 완료:', !!storage);

  // RTDB 초기화
  rtdb = getDatabase(app);
  console.log('✅ Realtime Database 초기화 완료:', !!rtdb);

  console.log('✅ Firebase 모든 서비스 초기화 완료');
} else {
  console.error('❌ Firebase 설정이 불완전합니다:', {
    apiKey: !!firebaseConfig.apiKey,
    authDomain: !!firebaseConfig.authDomain,
    projectId: !!firebaseConfig.projectId,
  });
  console.warn(
    '⚠️ Firebase가 초기화되지 않았습니다. 일부 기능(인증, 투표 등)이 작동하지 않을 수 있습니다.',
  );
  // Firebase가 초기화되지 않았을 때 auth와 googleProvider를 mock 객체나 null로 설정할 수 있습니다.
  auth = null;
  googleProvider = null;
  db = null;
  storage = null;
  rtdb = null;
}

// Auth 인스턴스, Google Auth Provider, Firestore, Storage, RTDB, app 인스턴스 내보내기
export { auth, googleProvider, db, storage, rtdb, app as firebaseApp };
