# Firebase 프로젝트 설정 가이드

## 🔧 Firebase 프로젝트 설정

### 1. Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com/)에 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름 입력 (예: `ai-workshop-quasar`)
4. Google Analytics 설정 (선택사항)
5. "프로젝트 만들기" 클릭

### 2. 웹 앱 추가

1. 프로젝트 대시보드에서 "웹" 아이콘 클릭
2. 앱 닉네임 입력 (예: `ai-workshop-web`)
3. "Firebase Hosting 설정" 체크 해제
4. "앱 등록" 클릭

### 3. 환경 변수 설정

Firebase 설정에서 제공되는 정보를 `.env` 파일에 설정:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### 4. Authentication 설정

1. Firebase Console → Authentication → Sign-in method
2. "Google" 제공업체 활성화
3. 프로젝트 지원 이메일 설정
4. "저장" 클릭

### 5. Firestore Database 설정

1. Firebase Console → Firestore Database
2. "데이터베이스 만들기" 클릭
3. 보안 규칙 선택: "테스트 모드에서 시작"
4. 위치 선택 (가까운 지역)
5. "완료" 클릭

### 6. Storage 설정

1. Firebase Console → Storage
2. "시작하기" 클릭
3. 보안 규칙 선택: "테스트 모드에서 시작"
4. 위치 선택 (Firestore와 동일한 지역)
5. "완료" 클릭

## 🔒 Security Rules 배포

### Firestore Rules 배포

```bash
firebase deploy --only firestore:rules
```

### Storage Rules 배포

```bash
firebase deploy --only storage
```

## 🚨 문제 해결

### 신규 사용자 접근 권한 오류

1. **Firestore 활성화 확인**: Firebase Console에서 Firestore Database가 활성화되어 있는지 확인
2. **Security Rules 확인**: `firestore.rules` 파일이 올바르게 배포되었는지 확인
3. **Authentication 설정 확인**: Google 로그인이 활성화되어 있는지 확인
4. **환경 변수 확인**: 모든 Firebase 설정이 `.env` 파일에 올바르게 설정되어 있는지 확인

### 디버깅 방법

1. 브라우저 개발자 도구 콘솔에서 Firebase 설정 상태 확인
2. `checkFirebaseConfig()` 함수 실행하여 설정 상태 확인
3. Firebase Console에서 Authentication, Firestore, Storage 상태 확인

## 📝 참고사항

- 개발 환경에서는 모든 인증된 사용자에게 모든 권한을 부여하는 보안 규칙을 사용
- 프로덕션 환경에서는 더 엄격한 보안 규칙 적용 필요
- Firebase 프로젝트 설정 변경 후 앱 재시작 필요
