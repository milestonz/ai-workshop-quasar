import { ref, computed, onUnmounted } from 'vue';
import {
  signInWithPopup,
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

    const maxRetries = 3;
    let retryCount = 0;

    while (retryCount < maxRetries) {
      try {
        console.log('🔍 사용자 정보 확인 중:', firebaseUser.email, `(시도 ${retryCount + 1}/${maxRetries})`);
        const userRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log('✅ 기존 사용자 발견:', userData);
          return { ...firebaseUser, role: userData.role || 'student' };
        } else {
          console.log('🆕 새 사용자 등록 시작:', firebaseUser.email);
          
          // 첫 번째 사용자인지 확인 (users 컬렉션의 문서 수 확인)
          const usersCollectionRef = collection(db, 'users');
          const usersSnapshot = await getDocs(usersCollectionRef);
          const isFirstUser = usersSnapshot.empty;
          
          console.log('📊 현재 등록된 사용자 수:', usersSnapshot.size);
          console.log('👑 첫 번째 사용자 여부:', isFirstUser);

          const newUser = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            role: isFirstUser ? 'admin' : 'student', // 첫 번째 사용자는 admin, 나머지는 student
            createdAt: serverTimestamp(),
          };
          
          console.log('💾 새 사용자 정보 저장 중:', newUser);
          await setDoc(userRef, newUser);
          console.log('✅ 새 사용자 등록 완료:', firebaseUser.email, '역할:', isFirstUser ? 'admin' : 'student');
          
          return { ...firebaseUser, role: isFirstUser ? 'admin' : 'student' };
        }
      } catch (error: any) {
        retryCount++;
        console.error(`❌ Firestore 접근 오류 (시도 ${retryCount}/${maxRetries}):`, error);
        console.error('❌ 오류 코드:', error.code);
        console.error('❌ 오류 메시지:', error.message);

        // Firestore 권한 오류가 발생해도 기본 사용자 정보는 반환
        if (error.code === 'permission-denied') {
          console.warn('⚠️ Firestore 권한 오류. 기본 역할로 설정합니다.');
          return { ...firebaseUser, role: 'student' };
        }

        // 마지막 시도가 아니면 잠시 대기 후 재시도
        if (retryCount < maxRetries) {
          console.log(`⏳ ${retryCount * 1000}ms 후 재시도...`);
          await new Promise(resolve => setTimeout(resolve, retryCount * 1000));
        } else {
          // 모든 시도 실패 시 기본 사용자 정보 반환
          console.error('❌ 모든 재시도 실패. 기본 역할로 설정합니다.');
          return { ...firebaseUser, role: 'student' };
        }
      }
    }

    // 이론적으로 도달하지 않지만 안전장치
    return { ...firebaseUser, role: 'student' };
  };

  const signInWithGoogle = async () => {
    if (loading.value) return;
    loading.value = true;
    error.value = null;
    try {
      if (!auth || !googleProvider) throw new Error('Firebase is not configured.');
      const result = await signInWithPopup(auth, googleProvider);
      console.log('✅ Google 로그인 팝업 성공:', result.user.email);

      // 팝업은 Firebase가 자동으로 처리하므로 별도 닫기 로직 제거
    } catch (err: any) {
      console.error('❌ Google 로그인 팝업 실패:', err);
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

    // 인증 상태 변화를 감지하는 리스너 설정
    unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log(
        '🔄 onAuthStateChanged 실행. 사용자:',
        firebaseUser ? firebaseUser.email : '없음',
      );

      if (firebaseUser) {
        console.log('✅ 인증된 사용자 감지:', {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          emailVerified: firebaseUser.emailVerified,
        });

        try {
          user.value = await fetchUserRole(firebaseUser);
          console.log('✅ 사용자 역할 설정 완료:', user.value.role);
        } catch (err: any) {
          console.error('❌ 사용자 역할 가져오기 실패:', err);
          console.error('❌ 오류 코드:', err.code);
          console.error('❌ 오류 메시지:', err.message);

          // Firestore 권한 오류가 발생해도 기본 사용자 정보는 설정
          if (err.code === 'permission-denied') {
            console.warn('⚠️ Firestore 권한 오류. 기본 역할로 사용자 설정합니다.');
            user.value = { ...firebaseUser, role: 'student' };
          } else {
            error.value = err.message;
          }
        }
      } else {
        console.log('ℹ️ 인증되지 않은 사용자');
        user.value = null;
      }
      loading.value = false;
    });
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
