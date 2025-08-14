import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { emailApiService } from '../services/emailApiService';

// 게스트 사용자 인터페이스
interface GuestUser {
  id: string;
  name: string;
  email: string;
  role: 'guest' | 'student' | 'admin';
  isGuest: true;
  isInfoRegistered: boolean; // 정보 등록 여부
  createdAt: Date;
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
      isInfoRegistered: false, // 정보 등록 필요
      createdAt: new Date(),
    };

    try {
      // Firestore에 게스트 사용자 정보 저장 시도
      if (db) {
        try {
          const guestDocRef = doc(db, 'guestUsers', guestId);
          await setDoc(guestDocRef, {
            ...guestUserData,
            createdAt: guestUserData.createdAt.toISOString(), // Date 객체를 문자열로 변환
          });
          console.log('🎭 Firestore에 게스트 사용자 정보 저장 성공');
        } catch (firestoreError) {
          console.warn('⚠️ Firestore 저장 실패, LocalStorage만 사용:', firestoreError);
          // Firestore 저장 실패 시 LocalStorage만 사용
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

      $q.notify({
        type: 'warning',
        message: '게스트 모드로 로그인되었습니다. 추가 정보 등록이 필요합니다.',
        timeout: 3000,
      });

      return guestUser.value;
    } catch (error) {
      console.error('❌ 게스트 로그인 실패:', error);
      throw new Error('게스트 로그인에 실패했습니다.');
    }
  };

  // 게스트 정보 등록
  const registerGuestInfo = async (name: string, email: string) => {
    if (!guestUser.value) {
      throw new Error('게스트 사용자가 로그인되지 않았습니다.');
    }

    const updatedGuestUser: GuestUser = {
      ...guestUser.value,
      name: name,
      email: email,
      isInfoRegistered: true,
    };

    try {
      // Firestore에 업데이트된 게스트 정보 저장 시도
      if (db) {
        try {
          const guestDocRef = doc(db, 'guestUsers', guestUser.value.id);
          await setDoc(
            guestDocRef,
            {
              ...updatedGuestUser,
              createdAt: updatedGuestUser.createdAt.toISOString(),
            },
            { merge: true },
          ); // 기존 데이터와 병합
          console.log('🎭 게스트 정보 등록 완료 (Firestore 업데이트):', updatedGuestUser);
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
        const guestDocRef = doc(db, 'guestUsers', guestUser.value.id);
        await deleteDoc(guestDocRef);
        console.log('✅ useGuestAuth: Firestore에서 게스트 사용자 정보 삭제 완료');
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
  };
}
