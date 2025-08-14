import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';
import { getDatabase, type Database } from 'firebase/database';

// Firebase 설정 - 런타임 환경변수 사용
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID || import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:
    process.env.FIREBASE_STORAGE_BUCKET || import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    process.env.FIREBASE_MESSAGING_SENDER_ID || import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID || import.meta.env.VITE_FIREBASE_APP_ID,
  // Realtime Database URL 추가
  databaseURL: process.env.FIREBASE_DATABASE_URL || import.meta.env.VITE_FIREBASE_DATABASE_URL,
};

// Firebase 설정 검증
console.log('🔐 Firebase 설정 확인:', {
  apiKey: firebaseConfig.apiKey ? '설정됨' : '설정 안됨',
  authDomain: firebaseConfig.authDomain ? '설정됨' : '설정 안됨',
  projectId: firebaseConfig.projectId ? '설정됨' : '설정 안됨',
  storageBucket: firebaseConfig.storageBucket ? '설정됨' : '설정 안됨',
  messagingSenderId: firebaseConfig.messagingSenderId ? '설정됨' : '설정 안됨',
  appId: firebaseConfig.appId ? '설정됨' : '설정 안됨',
  databaseURL: firebaseConfig.databaseURL ? '설정됨' : '없음',
});

// 실제 값들도 확인 (보안을 위해 일부만)
console.log('🔐 Firebase 설정 값 확인:', {
  apiKey: firebaseConfig.apiKey ? `${firebaseConfig.apiKey.substring(0, 10)}...` : '없음',
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  databaseURL: firebaseConfig.databaseURL ? '설정됨' : '없음',
});

// 필수 설정이 없는 경우 경고
if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId) {
  console.warn('⚠️ Firebase 설정이 완전하지 않습니다. 환경 변수를 확인해주세요.');
}

// Firebase 앱 초기화
let app: FirebaseApp | undefined;
let auth: Auth | null;
let googleProvider: GoogleAuthProvider | null;
let db: Firestore | null;
let storage: FirebaseStorage | null;
let rtdb: Database | null;

if (firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  db = getFirestore(app);
  storage = getStorage(app);
  // RTDB 초기화
  rtdb = getDatabase(app);
} else {
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
