import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import { doc, setDoc, getDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebase/config';
import { emailApiService } from '../services/api/emailApiService';

// 게스트 사용자 인터페이스
interface GuestUser {
  id: string;
  name: string;
  email: string;
  role: 'guest' | 'student' | 'admin';
  isGuest: true;
  isInfoRegistered: boolean; // 정보 등록 여부
  createdAt: Date;
  // 추가 메타데이터
  userType?: 'guest';
  registrationMethod?: 'guest';
  registrationCompleted?: boolean;
  updatedAt?: Date;
}

// 게스트 사용자 상태 관리
const guestUser = ref<GuestUser | null>(null);
const isGuestMode = ref(false);

export function useGuestAuth() {
  const $q = useQuasar();

  // 게스트 모드 활성화
  const enableGuestMode = () => {
    isGuestMode.value = true;
    console.log('🎭 게스트 모드 활성화');
  };

  // 게스트 모드 비활성화
  const disableGuestMode = () => {
    isGuestMode.value = false;
    guestUser.value = null;
    console.log('🎭 게스트 모드 비활성화');
  };

  // 게스트 로그인 (기본 정보만)
  const signInAsGuest = async (name: string, email: string) => {
    const guestId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const guestUserData: GuestUser = {
      id: guestId,
      name: name || '게스트 사용자',
      email: email,
      role: 'guest',
      isGuest: true,
      isInfoRegistered: true, // 정보 등록 완료 상태로 설정
      createdAt: new Date(),
      // 추가 메타데이터
      userType: 'guest',
      registrationMethod: 'guest',
      registrationCompleted: true, // 등록 완료 상태로 설정
    };

    try {
      console.log('🎭 게스트 로그인 시작 - Firestore 저장 시도');
      console.log('🎭 DB 상태 확인:', { db: !!db, guestId, name, email });

      // Firestore에 게스트 사용자 정보 저장 시도
      if (db) {
        let guestUsersSaved = false;
        let usersSaved = false;

        try {
          console.log('🎭 guestUsers 컬렉션에 저장 시작...');
          // guestUsers 컬렉션에 저장 (게스트 전용)
          const guestDocRef = doc(db, 'guestUsers', guestId);
          const guestData = {
            ...guestUserData,
            createdAt: guestUserData.createdAt.toISOString(), // Date 객체를 문자열로 변환
            // 추가 메타데이터
            userType: 'guest',
            registrationMethod: 'guest',
            isInfoRegistered: true,
            registrationCompleted: true,
            lastLoginAt: new Date().toISOString(),
          };
          await setDoc(guestDocRef, guestData);
          console.log('✅ Firestore guestUsers에 게스트 사용자 정보 저장 성공:', guestId);
          guestUsersSaved = true;
        } catch (guestError) {
          console.error('❌ guestUsers 컬렉션 저장 실패:', guestError);
        }

        // users 컬렉션 저장은 권한 문제로 임시 비활성화
        // TODO: Firebase Auth를 통한 게스트 인증 구현 후 활성화
        console.log('ℹ️ users 컬렉션 저장은 권한 문제로 임시 비활성화됨');
        usersSaved = false;

        if (guestUsersSaved) {
          console.log('✅ Firestore 저장 성공: guestUsers 컬렉션');
        } else {
          console.warn('⚠️ Firestore 저장 실패, LocalStorage만 사용');
        }
      } else {
        console.warn('⚠️ Firestore가 초기화되지 않음, LocalStorage만 사용');
      }

      guestUser.value = guestUserData;

      // LocalStorage에 게스트 정보 저장 (백업용)
      localStorage.setItem('guestUser', JSON.stringify(guestUserData));
      localStorage.setItem('guestUserId', guestId);
      localStorage.setItem('isGuestMode', 'true');

      console.log('🎭 게스트 로그인 성공:', guestUser.value);

      // Firestore 저장 확인 (비동기로 실행, 결과는 로그로만 확인)
      setTimeout(async () => {
        try {
          const result = await checkGuestUserInFirestore(guestId);
          if (result.guestUsers) {
            console.log('✅ Firestore 저장 확인 완료:', result);
          } else {
            console.warn('⚠️ Firestore에 저장되지 않음:', result);
          }
        } catch (error) {
          console.error('❌ Firestore 저장 확인 실패:', error);
        }
      }, 1000);

      $q.notify({
        type: 'positive',
        message: '게스트 모드로 로그인되었습니다!',
        timeout: 3000,
      });

      return guestUser.value;
    } catch (error) {
      console.error('❌ 게스트 로그인 실패:', error);
      throw new Error('게스트 로그인에 실패했습니다.');
    }
  };

  // 게스트 정보 등록 (이미 등록된 경우 바로 반환)
  const registerGuestInfo = async (name: string, email: string) => {
    if (!guestUser.value) {
      throw new Error('게스트 사용자가 로그인되지 않았습니다.');
    }

    // 이미 정보가 등록된 경우 바로 반환
    if (guestUser.value.isInfoRegistered) {
      console.log('🎭 게스트 정보가 이미 등록되어 있습니다.');
      return guestUser.value;
    }

    const updatedGuestUser: GuestUser = {
      ...guestUser.value,
      name: name,
      email: email,
      isInfoRegistered: true,
      registrationCompleted: true,
      updatedAt: new Date(),
    };

    try {
      // Firestore에 업데이트된 게스트 정보 저장 시도
      if (db) {
        try {
          // guestUsers 컬렉션만 업데이트 (users 컬렉션은 권한 문제로 제외)
          const guestDocRef = doc(db, 'guestUsers', guestUser.value.id);
          await setDoc(
            guestDocRef,
            {
              ...updatedGuestUser,
              createdAt: updatedGuestUser.createdAt.toISOString(),
              lastLoginAt: new Date().toISOString(),
            },
            { merge: true },
          ); // 기존 데이터와 병합
          console.log('✅ guestUsers 컬렉션 업데이트 완료:', updatedGuestUser);
        } catch (firestoreError) {
          console.warn('⚠️ Firestore 업데이트 실패, LocalStorage만 사용:', firestoreError);
          // Firestore 업데이트 실패 시 LocalStorage만 사용
        }
      } else {
        console.warn('⚠️ Firestore가 초기화되지 않음, LocalStorage만 사용');
      }

      // 로컬 상태 업데이트 (Firestore 성공/실패와 관계없이)
      guestUser.value = updatedGuestUser;

      // LocalStorage에 업데이트된 게스트 정보 저장
      localStorage.setItem('guestUser', JSON.stringify(updatedGuestUser));

      // 관리자에게 게스트 등록 이메일 전송
      try {
        const emailResult = await emailApiService.sendGuestRegistrationEmail({
          name: updatedGuestUser.name,
          email: updatedGuestUser.email,
          guestId: updatedGuestUser.id,
          createdAt: updatedGuestUser.createdAt.toISOString(),
        });

        if (emailResult.success) {
          console.log('✅ 게스트 등록 이메일 전송 성공');
          $q.notify({
            type: 'positive',
            message: '게스트 정보가 등록되었습니다! 관리자에게 이메일이 전송되었습니다.',
            timeout: 3000,
          });
        } else {
          console.warn('⚠️ 게스트 등록 이메일 전송 실패:', emailResult.message);
          $q.notify({
            type: 'warning',
            message: '게스트 정보가 등록되었습니다! (이메일 전송 실패)',
            timeout: 3000,
          });
        }
      } catch (emailError) {
        console.error('❌ 게스트 등록 이메일 전송 중 오류:', emailError);
        $q.notify({
          type: 'warning',
          message: '게스트 정보가 등록되었습니다! (이메일 전송 실패)',
          timeout: 3000,
        });
      }

      return guestUser.value;
    } catch (error) {
      console.error('❌ 게스트 정보 등록 실패:', error);
      throw new Error('게스트 정보 등록에 실패했습니다.');
    }
  };

  // 게스트 로그아웃
  const signOutGuest = async () => {
    console.log('🔍 useGuestAuth: signOutGuest 함수 호출됨');
    console.log('🔍 useGuestAuth: 현재 게스트 사용자:', guestUser.value);

    try {
      // Firestore에서 게스트 사용자 정보 삭제
      if (guestUser.value?.id && db) {
        console.log('🔍 useGuestAuth: Firestore에서 게스트 사용자 정보 삭제 시작');

        // guestUsers 컬렉션에서만 삭제 (users 컬렉션은 권한 문제로 제외)
        const guestDocRef = doc(db, 'guestUsers', guestUser.value.id);
        await deleteDoc(guestDocRef);
        console.log('✅ useGuestAuth: guestUsers 컬렉션에서 게스트 사용자 정보 삭제 완료');
      } else {
        console.log('🔍 useGuestAuth: Firestore 삭제 건너뜀 (게스트 사용자 ID 또는 DB 없음)');
      }
    } catch (error) {
      console.error('❌ useGuestAuth: Firestore에서 게스트 사용자 정보 삭제 실패:', error);
      // 삭제 실패해도 로그아웃은 진행
    }

    console.log('🔍 useGuestAuth: 로컬 상태 초기화 시작');
    guestUser.value = null;
    localStorage.removeItem('guestUserId');
    localStorage.removeItem('isGuestMode');
    console.log('✅ useGuestAuth: 로컬 상태 초기화 완료');

    console.log('🎭 게스트 로그아웃 완료');
  };

  // 저장된 게스트 정보 복원
  const restoreGuestSession = async () => {
    const savedGuestUserId = localStorage.getItem('guestUserId');
    const savedGuestMode = localStorage.getItem('isGuestMode');

    if (savedGuestUserId && savedGuestMode === 'true' && db) {
      try {
        // Firestore에서 게스트 사용자 정보 조회
        const guestDocRef = doc(db, 'guestUsers', savedGuestUserId);
        const guestDoc = await getDoc(guestDocRef);

        if (guestDoc.exists()) {
          const guestData = guestDoc.data();
          guestUser.value = {
            ...guestData,
            createdAt: new Date(guestData.createdAt),
          } as GuestUser;
          isGuestMode.value = true;
          console.log('🎭 게스트 세션 복원 (Firestore):', guestUser.value);
          return true;
        } else {
          console.log('❌ Firestore에서 게스트 사용자 정보를 찾을 수 없음');
          // LocalStorage 정리
          localStorage.removeItem('guestUserId');
          localStorage.removeItem('isGuestMode');
          return false;
        }
      } catch (error) {
        console.error('❌ 게스트 세션 복원 실패 (Firestore):', error);
        // LocalStorage 정리
        localStorage.removeItem('guestUserId');
        localStorage.removeItem('isGuestMode');
        return false;
      }
    }
    return false;
  };

  // 게스트 사용자 권한 확인
  const canAccessFeature = (feature: string): boolean => {
    if (!guestUser.value) return false;

    const featurePermissions = {
      'view-slides': true, // 슬라이드 보기
      'edit-slides': false, // 슬라이드 편집 (게스트는 불가)
      'download-slides': true, // 슬라이드 다운로드
      'share-slides': false, // 슬라이드 공유 (게스트는 불가)
      'admin-panel': false, // 관리자 패널 (게스트는 불가)
    };

    return featurePermissions[feature as keyof typeof featurePermissions] || false;
  };

  // Firestore에 저장된 게스트 사용자 정보 확인
  const checkGuestUserInFirestore = async (guestId: string) => {
    if (!db) {
      console.warn('⚠️ Firestore가 초기화되지 않음');
      return { guestUsers: false };
    }

    try {
      // guestUsers 컬렉션만 확인 (users 컬렉션은 권한 문제로 제외)
      const guestDocRef = doc(db, 'guestUsers', guestId);
      const guestDoc = await getDoc(guestDocRef);
      const guestUsersExists = guestDoc.exists();

      console.log('🔍 Firestore 저장 확인:', {
        guestId,
        guestUsers: guestUsersExists,
        guestData: guestUsersExists ? guestDoc.data() : null,
      });

      return { guestUsers: guestUsersExists };
    } catch (error) {
      console.error('❌ Firestore 확인 실패:', error);
      return { guestUsers: false };
    }
  };

  return {
    // 상태
    guestUser: computed(() => guestUser.value),
    isGuestMode: computed(() => isGuestMode.value),
    isGuestAuthenticated: computed(() => !!guestUser.value),
    isGuestInfoRegistered: computed(() => guestUser.value?.isInfoRegistered || false),

    // 메서드
    enableGuestMode,
    disableGuestMode,
    signInAsGuest,
    registerGuestInfo,
    signOutGuest,
    restoreGuestSession,
    canAccessFeature,
    checkGuestUserInFirestore,
  };
}
