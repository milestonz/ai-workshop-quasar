import { ref, computed } from 'vue';
import { signInWithPopup, signOut, onAuthStateChanged, type User } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';
import { useQuasar } from 'quasar';

export function useAuth() {
  const $q = useQuasar();

  // 상태
  const user = ref<User | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Firebase 설정 확인
  const isFirebaseConfigured = computed(() => {
    return !!(
      import.meta.env.VITE_FIREBASE_API_KEY &&
      import.meta.env.VITE_FIREBASE_AUTH_DOMAIN &&
      import.meta.env.VITE_FIREBASE_PROJECT_ID
    );
  });

  // 계산된 속성
  const isAuthenticated = computed(() => !!user.value);
  const displayName = computed(() => user.value?.displayName || '사용자');
  const email = computed(() => user.value?.email || '');
  const photoURL = computed(() => user.value?.photoURL || '');

  // Google 로그인
  const signInWithGoogle = async () => {
    loading.value = true;
    error.value = null;

    try {
      console.log('🔐 Google 로그인 시도...');
      console.log('🔐 Firebase 설정 확인:', {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY ? '설정됨' : '설정 안됨',
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      });
      
      if (!auth || !googleProvider) {
        throw new Error('Firebase is not configured.');
      }
      const result = await signInWithPopup(auth, googleProvider);
      user.value = result.user;

      $q.notify({
        type: 'positive',
        message: `${result.user.displayName}님, 환영합니다!`,
        position: 'top',
        timeout: 3000,
      });

      console.log('✅ Google 로그인 성공:', result.user);
    } catch (err: any) {
      console.error('❌ Google 로그인 실패:', err);
      error.value = err.message;

      $q.notify({
        type: 'negative',
        message: '로그인에 실패했습니다.',
        position: 'top',
        timeout: 3000,
      });
    } finally {
      loading.value = false;
    }
  };

  // 로그아웃
  const logout = async () => {
    loading.value = true;
    error.value = null;

    try {
      if (!auth) {
        throw new Error('Firebase is not configured.');
      }
      await signOut(auth);
      user.value = null;

      $q.notify({
        type: 'info',
        message: '로그아웃되었습니다.',
        position: 'top',
        timeout: 2000,
      });

      console.log('✅ 로그아웃 성공');
    } catch (err: any) {
      console.error('❌ 로그아웃 실패:', err);
      error.value = err.message;

      $q.notify({
        type: 'negative',
        message: '로그아웃에 실패했습니다.',
        position: 'top',
        timeout: 3000,
      });
    } finally {
      loading.value = false;
    }
  };

  // 인증 상태 감지
  const initAuth = () => {
    console.log('🔐 Firebase 인증 초기화 시작');
    console.log('🔐 Firebase 설정 확인:', {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY ? '설정됨' : '설정 안됨',
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? '설정됨' : '설정 안됨',
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ? '설정됨' : '설정 안됨',
    });

    if (!auth) {
      console.warn('⚠️ Firebase is not initialized, skipping auth state change listener.');
      return;
    }
    onAuthStateChanged(auth, (currentUser) => {
      user.value = currentUser;
      console.log('🔄 인증 상태 변경:', {
        currentUser: currentUser ? '로그인됨' : '로그인 안됨',
        user: currentUser,
        isAuthenticated: !!currentUser,
      });
    });
  };

  return {
    // 상태
    user,
    loading,
    error,

    // 계산된 속성
    isAuthenticated,
    displayName,
    email,
    photoURL,
    isFirebaseConfigured,

    // 메서드
    signInWithGoogle,
    logout,
    initAuth,
  };
}
