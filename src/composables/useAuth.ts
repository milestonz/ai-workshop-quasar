import { ref, computed, onUnmounted } from 'vue';
import {
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  getRedirectResult,
  type User,
  type Unsubscribe,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  collection,
  getDocs,
} from 'firebase/firestore';
import { auth, googleProvider, firebaseApp } from '../firebase/config';
import { useQuasar } from 'quasar';

// 사용자 정보에 역할을 포함하는 인터페이스
interface AppUser extends User {
  role: 'admin' | 'student' | 'unknown';
}

// 이 모듈의 상태를 전역적으로 관리 (싱글턴처럼 사용)
const user = ref<AppUser | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

let unsubscribe: Unsubscribe | null = null;
let isInitCalled = false; // initAuth가 중복 호출되는 것을 방지

export function useAuth() {
  const $q = useQuasar();
  const db = firebaseApp ? getFirestore(firebaseApp) : null;

  const fetchUserRole = async (firebaseUser: User): Promise<AppUser> => {
    if (!db) throw new Error('Firestore is not initialized.');

    const userRef = doc(db, 'users', firebaseUser.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      return { ...firebaseUser, role: userData.role || 'student' };
    } else {
      // 첫 번째 사용자인지 확인 (users 컬렉션의 문서 수 확인)
      const usersCollectionRef = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollectionRef);
      const isFirstUser = usersSnapshot.empty;

      const newUser = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
        role: isFirstUser ? 'admin' : 'student', // 첫 번째 사용자는 admin, 나머지는 student
        createdAt: serverTimestamp(),
      };
      await setDoc(userRef, newUser);
      return { ...firebaseUser, role: isFirstUser ? 'admin' : 'student' };
    }
  };

  const signInWithGoogle = async () => {
    if (loading.value) return;
    loading.value = true;
    error.value = null;
    try {
      if (!auth || !googleProvider) throw new Error('Firebase is not configured.');
      await signInWithRedirect(auth, googleProvider);
    } catch (err: any) {
      console.error('❌ Google 로그인 리디렉션 실패:', err);
      error.value = err.message;
      $q.notify({ type: 'negative', message: '로그인을 시작할 수 없습니다.' });
      loading.value = false;
    }
  };

  const logout = async () => {
    if (!auth) return;
    await signOut(auth);
    user.value = null;
    $q.notify({ type: 'info', message: '로그아웃되었습니다.' });
    console.log('✅ 로그아웃 성공');
  };

  // 앱 시작 시 호출될 단일 초기화 함수
  const initAuth = () => {
    if (isInitCalled) return;
    isInitCalled = true;

    if (!auth) {
      console.log('⚠️ Firebase Auth가 초기화되지 않음');
      loading.value = false;
      return;
    }

    console.log('🔐 Firebase Auth 초기화 시작');

    // 1. 인증 상태 변화를 감지하는 리스너 설정 (먼저 설정)
    unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('🔄 onAuthStateChanged 실행. 사용자:', firebaseUser ? firebaseUser.email : '없음');
      
      if (firebaseUser) {
        console.log('✅ 인증된 사용자 감지:', {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          emailVerified: firebaseUser.emailVerified
        });
        
        try {
          user.value = await fetchUserRole(firebaseUser);
          console.log('✅ 사용자 역할 설정 완료:', user.value.role);
        } catch (err: any) {
          console.error('❌ 사용자 역할 가져오기 실패:', err);
          error.value = err.message;
        }
      } else {
        console.log('ℹ️ 인증되지 않은 사용자');
        user.value = null;
      }
      loading.value = false;
    });

    // 2. 리디렉션 결과 처리 (약간의 지연 후 처리)
    setTimeout(() => {
      if (!auth) return;
      
      getRedirectResult(auth)
        .then((result) => {
          if (result) {
            console.log('✅ 리디렉션 로그인 성공:', result.user.email);
            console.log('✅ 인증 결과:', {
              user: result.user.email,
              operationType: result.operationType
            });
          } else {
            console.log('ℹ️ 리디렉션 결과 없음 (새로고침 또는 직접 접근)');
          }
        })
        .catch((err: any) => {
          console.error('❌ 리디렉션 결과 처리 중 오류 발생:', err);
          console.error('❌ 오류 코드:', err.code);
          console.error('❌ 오류 메시지:', err.message);
          error.value = err.message;
        });
    }, 100);
  };

  onUnmounted(() => {
    if (unsubscribe) unsubscribe();
  });

  return {
    user: computed(() => user.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    isAuthenticated: computed(() => !!user.value),
    displayName: computed(() => user.value?.displayName || '사용자'),
    email: computed(() => user.value?.email || ''),
    photoURL: computed(() => user.value?.photoURL || ''),
    isFirebaseConfigured: computed(() => !!firebaseApp),
    userRole: computed(() => user.value?.role || 'unknown'),
    signInWithGoogle,
    logout,
    initAuth,
  };
}
