# Firebase 환경 변수 설정 가이드

## 개요

이 프로젝트는 Firebase를 사용하여 인증 및 데이터베이스 기능을 제공합니다. 올바른 환경 변수 설정이 필요합니다.

## 1. .env 파일 생성

프로젝트 루트 디렉토리에 `.env` 파일을 생성하세요:

```bash
touch .env
```

## 2. Firebase Console에서 설정값 가져오기

1. [Firebase Console](https://console.firebase.google.com/)에 접속
2. 프로젝트 선택 (slide-view-91a09)
3. 프로젝트 설정 (⚙️) 클릭
4. "일반" 탭에서 "웹 앱" 섹션 확인
5. 설정값 복사

## 3. .env 파일 내용

다음 내용을 `.env` 파일에 추가하세요:

```env
# Firebase Configuration (Vite 환경변수)
VITE_FIREBASE_API_KEY=AIzaSyC2RcDl7MRYRKMkX2szBsF67a9jHub0VV4
VITE_FIREBASE_AUTH_DOMAIN=slide-view-91a09.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=slide-view-91a09
VITE_FIREBASE_STORAGE_BUCKET=slide-view-91a09.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=951171862827
VITE_FIREBASE_APP_ID=1:951171862827:web:14701b2a5f1cba5b96756e
VITE_FIREBASE_DATABASE_URL=https://slide-view-91a09-default-rtdb.asia-southeast1.firebasedatabase.app
VITE_FIREBASE_MEASUREMENT_ID=G-01HYV15YZ3

# 관리자 이메일 설정
VITE_ADMIN_EMAIL=place.coach@gmail.com

# 학생 모드 활성화 (true/false)
VITE_ENABLE_STUDENT_MODE=true

# 개발 모드 설정
NODE_ENV=development
```

## 4. 설정 확인

개발 서버를 시작하면 콘솔에서 다음과 같은 로그를 확인할 수 있습니다:

```
🔐 Firebase 설정 초기화 (개발 모드)
🔐 필수 설정 확인: { apiKey: '설정됨', authDomain: '설정됨', projectId: '설정됨' }
🔐 API 키 확인: AIzaSyC2Rc...
🔐 Auth Domain 확인: slide-view-91a09.firebaseapp.com
🔐 Project ID 확인: slide-view-91a09
✅ Firebase 모든 서비스 초기화 완료
```

## 5. 문제 해결

### 설정이 누락된 경우

콘솔에서 다음과 같은 오류가 나타날 수 있습니다:

```
❌ Firebase 필수 설정이 누락되었습니다: apiKey, authDomain, projectId
❌ 해결 방법:
1. 프로젝트 루트에 .env 파일을 생성하세요
2. Firebase Console에서 설정값을 복사하여 .env 파일에 추가하세요
3. .env 파일 예시:
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
```

### 해결 방법

1. `.env` 파일이 프로젝트 루트에 있는지 확인
2. 파일 내용이 올바른지 확인
3. 개발 서버 재시작
4. 브라우저 캐시 삭제

## 6. 보안 주의사항

- `.env` 파일은 `.gitignore`에 포함되어 있어 Git에 커밋되지 않습니다
- 프로덕션 환경에서는 환경 변수를 서버 설정에서 관리하세요
- API 키는 공개되어도 안전하지만, 보안 규칙을 올바르게 설정하세요

## 7. 추가 설정

### Firebase Authentication 설정

1. Firebase Console > Authentication > Sign-in method
2. Google 로그인 활성화
3. 승인된 도메인에 로컬 개발 도메인 추가 (localhost:9000)

### Firestore 보안 규칙

Firestore > Rules에서 다음 규칙 설정:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 8. 배포 시 주의사항

Azure Static Web Apps 배포 시:

1. Azure Portal에서 환경 변수 설정
2. `VITE_` 접두사가 붙은 변수들을 설정
3. 빌드 후 배포 확인

---

이 설정이 완료되면 Firebase 인증 및 데이터베이스 기능이 정상적으로 작동합니다.
