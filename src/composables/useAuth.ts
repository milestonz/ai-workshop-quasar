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

  // Firestore 초기화 확인
  if (!db) {
    console.error('❌ Firestore가 초기화되지 않았습니다.');
  } else {
    console.log('✅ Firestore 초기화 완료');
  }

  // Firebase 설정 상태 확인
  if (!firebaseApp) {
    console.warn('⚠️ Firebase가 설정되지 않았습니다. 일부 기능이 제한될 수 있습니다.');
  } else {
    console.log('✅ Firebase 설정 완료');
  }

  const fetchUserRole = async (firebaseUser: User): Promise<AppUser> => {
    if (!db) {
      console.log('⚠️ Firestore가 초기화되지 않았습니다.');
      throw new Error('Firestore is not initialized.');
    }

    const maxRetries = 3;
    let retryCount = 0;

    while (retryCount < maxRetries) {
      try {
        console.log(
          '🔍 사용자 정보 확인 중:',
          firebaseUser.email,
          `(시도 ${retryCount + 1}/${maxRetries})`,
        );
        const userRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log('✅ 기존 사용자 발견:', userData);

          // 마지막 로그인 시간 업데이트
          await setDoc(
            userRef,
            {
              lastLoginAt: serverTimestamp(),
            },
            { merge: true },
          );

          return { ...firebaseUser, role: userData.role || 'student' };
        } else {
          console.log('🆕 새 사용자 등록 시작:', firebaseUser.email);

          // 첫 번째 사용자 여부 체크는 컬렉션 전체 조회가 필요하여
          // 보안 규칙에 의해 차단될 수 있음. 운영 보안을 위해 제거하고
          // 관리자 이메일 화이트리스트만으로 admin 여부를 판단한다.
          const isFirstUser = false;

          // 특정 이메일을 admin으로 설정하는 로직 (선택사항)
          const adminEmails = ['place.coach@gmail.com', 'jplee@milestonz.com']; // 여기에 관리자 이메일 추가
          const isAdminEmail = adminEmails.includes(firebaseUser.email || '');
          console.log('🔍 관리자 이메일 확인:', {
            userEmail: firebaseUser.email,
            adminEmails,
            isAdminEmail,
          });

          const newUser = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            role: isAdminEmail ? 'admin' : 'student', // 지정된 이메일만 admin
            createdAt: serverTimestamp(),
            lastLoginAt: serverTimestamp(),
          };

          console.log('💾 새 사용자 정보 저장 중:', newUser);
          await setDoc(userRef, newUser);
          console.log('✅ 새 사용자 등록 완료:', firebaseUser.email);

          // 등록 확인을 위해 다시 읽어오기
          const verifyDoc = await getDoc(userRef);
          if (verifyDoc.exists()) {
            console.log('✅ 사용자 등록 확인 완료:', verifyDoc.data());
          } else {
            console.error('❌ 사용자 등록 확인 실패: 문서가 존재하지 않음');
            throw new Error('사용자 등록이 완료되지 않았습니다.');
          }

          return { ...firebaseUser, role: isAdminEmail ? 'admin' : 'student' };
        }
      } catch (error: any) {
        retryCount++;
        console.error(`❌ Firestore 접근 오류 (시도 ${retryCount}/${maxRetries}):`, error);
        console.error('❌ 오류 코드:', error.code);
        console.error('❌ 오류 메시지:', error.message);

        // Firestore 권한 오류가 발생한 경우
        if (error.code === 'permission-denied') {
          console.error('❌ Firestore 권한 오류. 사용자 등록이 불가능합니다.');
          console.error('❌ 오류 상세 정보:', {
            code: error.code,
            message: error.message,
            firebaseApp: !!firebaseApp,
            db: !!db,
            auth: !!auth,
            userUid: firebaseUser.uid,
            userEmail: firebaseUser.email,
          });

          // Firebase 프로젝트 설정 확인 안내
          throw new Error(
            'Firebase 프로젝트 설정을 확인해주세요. Firestore가 활성화되어 있고 Security Rules가 올바르게 설정되어 있는지 확인하세요.',
          );
        }

        // 마지막 시도가 아니면 잠시 대기 후 재시도
        if (retryCount < maxRetries) {
          console.log(`⏳ ${retryCount * 1000}ms 후 재시도...`);
          await new Promise((resolve) => setTimeout(resolve, retryCount * 1000));
        } else {
          // 모든 시도 실패 시 에러 발생
          console.error('❌ 모든 재시도 실패. 사용자 등록이 불가능합니다.');
          throw new Error('사용자 정보를 저장할 수 없습니다. 잠시 후 다시 시도해주세요.');
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

      // 로그인 성공 후 즉시 사용자 상태 설정
      try {
        if (firebaseApp && db) {
          user.value = await fetchUserRole(result.user);
          console.log('✅ 로그인 후 사용자 역할 설정 완료:', user.value.role);
        } else {
          console.log('⚠️ Firebase가 초기화되지 않아 인증을 완료할 수 없습니다.');
          // 엄격 모드: Firebase 설정 미완 시 인증 취소
          user.value = null;
          if (auth) {
            await signOut(auth);
          }
          $q.notify({
            type: 'warning',
            message: 'Firebase 설정을 확인해주세요. 로그인할 수 없습니다.',
            timeout: 5000,
          });
          loading.value = false;
          return;
        }
        console.log('✅ 로그인 후 인증 상태 업데이트 완료:', {
          isAuthenticated: !!user.value,
          userRole: user.value?.role,
          userEmail: user.value?.email,
        });
      } catch (err: any) {
        console.error('❌ 로그인 후 사용자 역할 가져오기 실패:', err);
        // 엄격 모드: 역할 조회 실패 시 인증 취소
        user.value = null;
        if (auth) {
          await signOut(auth);
        }
        $q.notify({
          type: 'warning',
          message: 'Firebase 설정 또는 권한 오류로 로그인할 수 없습니다.',
          timeout: 5000,
        });
        loading.value = false;
        return;
      }

      // 로그인 성공 후 로딩 상태 해제
      loading.value = false;

      // 성공 알림
      $q.notify({
        type: 'positive',
        message: '로그인에 성공했습니다!',
        timeout: 2000,
      });
    } catch (err: any) {
      console.error('❌ Google 로그인 팝업 실패:', err);
      error.value = err.message;
      $q.notify({ type: 'negative', message: '로그인을 시작할 수 없습니다.' });
      loading.value = false;
    }
  };

  const logout = async () => {
    console.log('🔍 useAuth: logout 함수 호출됨');
    console.log('🔍 useAuth: auth 객체 확인:', !!auth);

    if (!auth) {
      console.log('❌ useAuth: auth 객체가 없음');
      return;
    }

    try {
      // Firestore 리스너 정리
      if (unsubscribe) {
        console.log('🔍 useAuth: Firestore 리스너 정리');
        unsubscribe();
        unsubscribe = null;
      }

      console.log('🔍 useAuth: Firebase signOut 실행');
      await signOut(auth);
      console.log('✅ useAuth: Firebase signOut 성공');

      user.value = null;
      console.log('✅ useAuth: 사용자 상태 초기화 완료');

      console.log('✅ 로그아웃 성공');
    } catch (error) {
      console.error('❌ useAuth: 로그아웃 실패:', error);
      $q.notify({ type: 'negative', message: '로그아웃 중 오류가 발생했습니다.' });
    }
  };

  // 앱 시작 시 호출될 단일 초기화 함수
  const initAuth = () => {
    if (isInitCalled) return;
    isInitCalled = true;

    console.log('🔐 Firebase 초기화 상태 확인:', {
      firebaseApp: !!firebaseApp,
      auth: !!auth,
      db: !!db,
    });

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

        // Firebase가 완전히 초기화된 경우에만 Firestore 접근 시도
        if (firebaseApp && db) {
          try {
            user.value = await fetchUserRole(firebaseUser);
            console.log('✅ 사용자 역할 설정 완료:', user.value.role);
            console.log('✅ 인증 상태 업데이트 완료:', {
              isAuthenticated: !!user.value,
              userRole: user.value?.role,
              userEmail: user.value?.email,
            });
          } catch (err: any) {
            console.error('❌ 사용자 역할 가져오기 실패:', err);
            console.error('❌ 오류 코드:', err.code);
            console.error('❌ 오류 메시지:', err.message);

            // 엄격 모드: Firestore 접근 실패 또는 users 미등록 시 로그인 중단
            user.value = null;
            if (auth) {
              await signOut(auth);
            }
            error.value = err.message;
            $q.notify({
              type: 'warning',
              message: '사용자 등록/권한 확인 실패로 로그인할 수 없습니다. 관리자에게 문의하세요.',
              timeout: 5000,
            });
            loading.value = false;
            return;
          }
        } else {
          console.log('⚠️ Firebase가 초기화되지 않아 사용자 역할을 가져올 수 없습니다.');
          // 엄격 모드: Firebase 미초기화 시 인증 취소
          user.value = null;
          if (auth) {
            await signOut(auth);
          }
          $q.notify({
            type: 'warning',
            message: 'Firebase 설정이 필요합니다. 로그인할 수 없습니다.',
            timeout: 5000,
          });
        }
      } else {
        console.log('ℹ️ 인증되지 않은 사용자');
        user.value = null;
        console.log('✅ 인증 해제 상태 업데이트 완료');
      }
      loading.value = false;
    });
  };

  onUnmounted(() => {
    if (unsubscribe) unsubscribe();
  });

  // 디버깅용 함수: 현재 사용자 정보 출력
  const debugUserInfo = () => {
    console.log('🔍 현재 사용자 정보:', {
      user: user.value,
      isAuthenticated: !!user.value,
      userRole: user.value?.role,
      firebaseApp: !!firebaseApp,
      firestore: !!db,
    });
  };

  // Firebase 프로젝트 설정 확인 함수
  const checkFirebaseConfig = () => {
    console.log('🔧 Firebase 설정 상태 확인:');
    console.log('  - Firebase App:', !!firebaseApp);
    console.log('  - Firebase Auth:', !!auth);
    console.log('  - Firestore DB:', !!db);
    console.log('  - Google Provider:', !!googleProvider);

    if (firebaseApp) {
      console.log('  - Firebase Config:', {
        apiKey: firebaseApp.options.apiKey ? '설정됨' : '설정 안됨',
        authDomain: firebaseApp.options.authDomain ? '설정됨' : '설정 안됨',
        projectId: firebaseApp.options.projectId ? '설정됨' : '설정 안됨',
        storageBucket: firebaseApp.options.storageBucket ? '설정됨' : '설정 안됨',
      });
    }

    return {
      firebaseApp: !!firebaseApp,
      auth: !!auth,
      db: !!db,
      googleProvider: !!googleProvider,
    };
  };

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
    debugUserInfo, // 디버깅 함수 추가
    checkFirebaseConfig, // Firebase 설정 확인 함수 추가
  };
}
