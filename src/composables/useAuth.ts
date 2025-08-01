import { ref, computed } from 'vue';
import { 
  signInWithRedirect, 
  signOut, 
  onAuthStateChanged, 
  getRedirectResult,
  type User 
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
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

let isAuthInitialized = false;

export function useAuth() {
  const $q = useQuasar();
  const db = firebaseApp ? getFirestore(firebaseApp) : null;

  const fetchUserRole = async (firebaseUser: User): Promise<AppUser> => {
    if (!db) throw new Error("Firestore is not initialized.");
    
    const userRef = doc(db, 'users', firebaseUser.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      return { ...firebaseUser, role: userData.role || 'student' };
    } else {
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

  const handleRedirectResult = async (): Promise<AppUser | null> => {
    if (!isAuthInitialized) {
      // onAuthStateChanged가 먼저 실행되도록 약간의 지연을 줌
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    if (user.value) { // 이미 로그인 정보가 있으면 처리하지 않음
        loading.value = false;
        return user.value;
    }
    
    loading.value = true;
    try {
      if (!auth || !db) throw new Error("Firebase not configured");
      const result = await getRedirectResult(auth);
      if (result) {
        const firebaseUser = result.user;
        const appUser = await fetchUserRole(firebaseUser);
        user.value = appUser;
        console.log('✅ Google 리디렉션 로그인 성공, 역할:', appUser.role);
        return appUser;
      }
      return null;
    } catch (err: any) {
      console.error('❌ Google 로그인 결과 처리 실패:', err);
      error.value = err.message;
      return null;
    } finally {
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
  
  const initAuth = () => {
      if(isAuthInitialized) return;
      isAuthInitialized = true;

      if (!auth) {
        loading.value = false;
        return;
      }
      
      onAuthStateChanged(auth, async (firebaseUser) => {
          if (firebaseUser) {
              if (!user.value || user.value.uid !== firebaseUser.uid) {
                  user.value = await fetchUserRole(firebaseUser);
              }
          } else {
              user.value = null;
          }
          loading.value = false;
      });
  }


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
    handleRedirectResult,
    initAuth,
  };
}
