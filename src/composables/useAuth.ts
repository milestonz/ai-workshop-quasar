import { ref, computed, onUnmounted, readonly } from 'vue';
import {
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  getRedirectResult,
  type User,
  type Unsubscribe,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, googleProvider, firebaseApp } from '../services/firebase/config';
import { useQuasar } from 'quasar';

// 사용자 정보에 역할을 포함하는 인터페이스
interface AppUser extends User {
  role: 'admin' | 'student' | 'unknown';
}

// 단순화된 상태 관리
const user = ref<AppUser | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

let unsubscribe: Unsubscribe | null = null;
let isInitialized = false;
let db: any = null;

export function useAuth() {
  const $q = useQuasar();

  // Firestore 초기화 (한 번만)
  if (!db && firebaseApp) {
    db = getFirestore(firebaseApp);
  }

  // 사용자 역할 조회 (유연한 처리)
  const fetchUserRole = async (firebaseUser: User): Promise<AppUser> => {
    try {
      if (!db) {
        console.warn('⚠️ Firestore가 초기화되지 않음, 기본 역할 사용');
        return { ...firebaseUser, role: 'student' };
      }

      const userRef = doc(db, 'users', firebaseUser.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        // 마지막 로그인 시간 업데이트
        await setDoc(userRef, { lastLoginAt: serverTimestamp() }, { merge: true });

        return { ...firebaseUser, role: userData.role || 'student' };
      } else {
        // 새 사용자 등록 (관리자 이메일 확인)
        const adminEmails = ['place.coach@gmail.com', 'jplee@milestonz.com'];
        const isAdminEmail = adminEmails.includes(firebaseUser.email || '');
        const defaultRole = isAdminEmail ? 'admin' : 'student';

        // 새 사용자 등록 (실패해도 기본 역할 사용)
        try {
          await setDoc(userRef, {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            role: defaultRole,
            createdAt: serverTimestamp(),
            lastLoginAt: serverTimestamp(),
          });
        } catch (registrationError) {
          console.warn('⚠️ 사용자 등록 실패, 기본 역할 사용:', registrationError);
        }

        return { ...firebaseUser, role: defaultRole };
      }
    } catch (error) {
      console.warn('⚠️ 사용자 역할 조회 실패, 기본 역할 사용:', error);
      return { ...firebaseUser, role: 'student' };
    }
  };

  // 계정 선택 팝업이 나타나는 Google 로그인
  const signInWithGoogle = async () => {
    console.log('🔐 signInWithGoogle 함수 호출됨');

    if (!auth || !googleProvider) {
      console.error('❌ Firebase Auth가 초기화되지 않았습니다.');
      throw new Error('Firebase Auth가 초기화되지 않았습니다.');
    }

    // 계정 선택 팝업이 나타나도록 설정
    googleProvider.setCustomParameters({
      prompt: 'select_account',
    });

    loading.value = true;
    error.value = null;

    try {
      console.log('🔐 팝업 방식으로 로그인 시도...');
      const result = await signInWithPopup(auth, googleProvider);
      console.log('✅ 팝업 로그인 성공:', result.user.email);

      // 사용자 역할 설정 (실패해도 로그인은 유지)
      try {
        user.value = await fetchUserRole(result.user);
        console.log('✅ 사용자 역할 설정 완료:', user.value.role);
      } catch (roleError) {
        console.warn('⚠️ 사용자 역할 설정 실패:', roleError);
        user.value = { ...result.user, role: 'student' };
      }

      $q.notify({
        type: 'positive',
        message: '로그인에 성공했습니다!',
        timeout: 2000,
      });
    } catch (popupError: any) {
      console.error('❌ 팝업 로그인 실패:', popupError);

      // 팝업 차단 관련 오류 처리
      if (popupError.code === 'auth/popup-blocked') {
        console.log('🔄 팝업이 차단됨, 사용자에게 안내 후 리다이렉트 시도');

        $q.notify({
          type: 'warning',
          message: '팝업이 차단되었습니다. 리다이렉트 방식으로 로그인을 진행합니다.',
          timeout: 3000,
        });

        await new Promise((resolve) => setTimeout(resolve, 1000));

        try {
          await signInWithRedirect(auth, googleProvider);
          return; // 리다이렉트 후 페이지가 새로고침되므로 종료
        } catch (redirectError) {
          console.error('❌ 리다이렉트 로그인 실패:', redirectError);
          throw new Error('로그인에 실패했습니다. 브라우저 설정을 확인해주세요.');
        }
      } else if (popupError.code === 'auth/popup-closed-by-user') {
        $q.notify({
          type: 'info',
          message: '로그인이 취소되었습니다.',
          timeout: 2000,
        });
        throw new Error('로그인이 취소되었습니다.');
      } else if (popupError.code === 'auth/cancelled-popup-request') {
        $q.notify({
          type: 'info',
          message: '로그인 요청이 취소되었습니다.',
          timeout: 2000,
        });
        throw new Error('로그인 요청이 취소되었습니다.');
      }

      // 기타 오류는 그대로 던짐
      throw popupError;
    } finally {
      loading.value = false;
    }
  };

  // 단순화된 로그아웃
  const logout = async () => {
    if (!auth) {
      throw new Error('Firebase Auth가 초기화되지 않았습니다.');
    }

    try {
      await signOut(auth);
      user.value = null;
      error.value = null;

      $q.notify({
        type: 'positive',
        message: '로그아웃되었습니다.',
        timeout: 2000,
      });
    } catch (error) {
      console.error('❌ 로그아웃 실패:', error);
      throw error;
    }
  };

  // 단순화된 인증 초기화
  const initAuth = async () => {
    if (isInitialized) return;

    try {
      console.log('🔐 인증 초기화 시작...');

      // 리다이렉트 결과 확인
      if (auth) {
        const redirectResult = await getRedirectResult(auth);
        if (redirectResult?.user) {
          console.log('✅ 리다이렉트 로그인 결과 확인:', redirectResult.user.email);
          try {
            user.value = await fetchUserRole(redirectResult.user);
          } catch (roleError) {
            console.warn('⚠️ 리다이렉트 후 사용자 역할 설정 실패:', roleError);
            user.value = { ...redirectResult.user, role: 'student' };
          }
        }
      }

      // 인증 상태 리스너 설정
      if (auth && !unsubscribe) {
        unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          console.log('🔄 인증 상태 변경:', firebaseUser ? firebaseUser.email : '로그아웃');

          if (firebaseUser) {
            try {
              user.value = await fetchUserRole(firebaseUser);
              console.log('✅ 인증 상태 업데이트 완료:', user.value.role);
            } catch (roleError) {
              console.warn('⚠️ 인증 상태 변경 시 사용자 역할 설정 실패:', roleError);
              user.value = { ...firebaseUser, role: 'student' };
            }
          } else {
            user.value = null;
          }
          loading.value = false;
        });
      }
    } catch (error) {
      console.error('❌ 인증 초기화 실패:', error);
      loading.value = false;
    } finally {
      isInitialized = true;
      console.log('✅ 인증 초기화 완료');
    }
  };

  // 디버깅 함수들
  const debugUserInfo = () => {
    console.log('🔍 현재 사용자 정보:', {
      user: user.value,
      isAuthenticated: !!user.value,
      userRole: user.value?.role,
      firebaseApp: !!firebaseApp,
      firestore: !!db,
    });
  };

  const checkFirebaseConfig = () => {
    return {
      firebaseApp: !!firebaseApp,
      auth: !!auth,
      db: !!db,
      googleProvider: !!googleProvider,
    };
  };

  onUnmounted(() => {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }
  });

  return {
    user: readonly(user),
    loading: readonly(loading),
    error: readonly(error),
    isAuthenticated: computed(() => !!user.value),
    isAuthInitialized: computed(() => isInitialized),
    displayName: computed(() => user.value?.displayName || '사용자'),
    email: computed(() => user.value?.email || ''),
    photoURL: computed(() => user.value?.photoURL || ''),
    isFirebaseConfigured: computed(() => !!firebaseApp),
    userRole: computed(() => user.value?.role || 'unknown'),
    signInWithGoogle,
    logout,
    initAuth,
    debugUserInfo,
    checkFirebaseConfig,
  };
}
