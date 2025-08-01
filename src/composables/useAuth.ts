import { ref, computed } from 'vue';
import { signInWithPopup, signOut, onAuthStateChanged, type User } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, googleProvider, firebaseApp } from '../firebase/config';
import { useQuasar } from 'quasar';

// 사용자 정보에 역할을 포함하는 인터페이스
interface AppUser extends User {
  role: 'admin' | 'student' | 'unknown';
}

export function useAuth() {
  const $q = useQuasar();
  const db = firebaseApp ? getFirestore(firebaseApp) : null;

  // 상태
  const user = ref<AppUser | null>(null);
  const loading = ref(true); // 초기 로딩 상태 true
  const error = ref<string | null>(null);

  // Firebase 설정 확인
  const isFirebaseConfigured = computed(() => !!firebaseApp);

  // 계산된 속성
  const isAuthenticated = computed(() => !!user.value);
  const displayName = computed(() => user.value?.displayName || '사용자');
  const email = computed(() => user.value?.email || '');
  const photoURL = computed(() => user.value?.photoURL || '');
  const userRole = computed(() => user.value?.role || 'unknown');

  const fetchUserRole = async (firebaseUser: User): Promise<AppUser> => {
    if (!db) throw new Error("Firestore is not initialized.");
    
    const userRef = doc(db, 'users', firebaseUser.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      return { ...firebaseUser, role: userData.role || 'student' };
    } else {
      // 새로운 사용자일 경우 'student' 역할로 DB에 추가
      const newUser = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
        role: 'student',
        createdAt: serverTimestamp(),
      };
      await setDoc(userRef, newUser);
      return { ...firebaseUser, role: 'student' };
    }
  };
  
  // Google 로그인
  const signInWithGoogle = async (): Promise<'admin' | 'student' | 'unknown'> => {
    loading.value = true;
    error.value = null;

    try {
      if (!auth || !googleProvider || !db) {
        throw new Error('Firebase or Firestore is not configured.');
      }
      
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      
      const appUser = await fetchUserRole(firebaseUser);
      user.value = appUser;

      $q.notify({
        type: 'positive',
        message: `${appUser.displayName}님, 환영합니다!`,
        position: 'top',
      });
      console.log('✅ Google 로그인 성공, 역할:', appUser.role);
      return appUser.role;

    } catch (err: any) {
      console.error('❌ Google 로그인 실패:', err);
      error.value = err.message;
      $q.notify({ type: 'negative', message: '로그인에 실패했습니다.' });
      return 'unknown';
    } finally {
      loading.value = false;
    }
  };

  // 로그아웃
  const logout = async () => {
    loading.value = true;
    error.value = null;

    try {
      if (!auth) throw new Error('Firebase is not configured.');
      await signOut(auth);
      user.value = null;
      $q.notify({ type: 'info', message: '로그아웃되었습니다.' });
      console.log('✅ 로그아웃 성공');
    } catch (err: any) {
      console.error('❌ 로그아웃 실패:', err);
      error.value = err.message;
      $q.notify({ type: 'negative', message: '로그아웃에 실패했습니다.' });
    } finally {
      loading.value = false;
    }
  };

  // 인증 상태 감지 (초기화)
  const initAuth = () => {
    if (!auth) {
      console.warn('⚠️ Firebase is not initialized, skipping auth state change listener.');
      loading.value = false;
      return;
    }
    
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          loading.value = true;
          user.value = await fetchUserRole(firebaseUser);
          console.log(`🔄 인증 상태 변경: ${user.value.email} (${user.value.role}) 로그인`);
        } catch(e) {
            console.error("사용자 역할 정보 가져오기 실패", e)
            user.value = null; // 역할 정보 못가져오면 로그아웃 처리
        } finally {
            loading.value = false;
        }
      } else {
        user.value = null;
        console.log('🔄 인증 상태 변경: 로그아웃 상태');
        loading.value = false;
      }
    });
  };

  return {
    user,
    loading,
    error,
    isAuthenticated,
    displayName,
    email,
    photoURL,
    isFirebaseConfigured,
    userRole,
    signInWithGoogle,
    logout,
    initAuth,
  };
}
