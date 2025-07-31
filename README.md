# AI Workshop Quasar (ai-workshop-quasar)

AI Workshop Facil WebApp

## 🚀 빠른 시작

### 의존성 설치

```bash
yarn
# or
npm install
```

### 🎨 슬라이드 변환기 사용법

마크다운 파일들을 세련된 HTML 슬라이드로 변환합니다.

```bash
# 단일 변환
npm run convert-slides

# 빌드와 함께
npm run build-slides

# 자동 감시 및 변환
npm run watch-slides

# 배치 변환
npm run batch-convert
```

특징:

- 타입 자동 감지 (제목, 장 구분, 투표, 통계 등)
- 반응형 디자인
- 키보드 네비게이션
- 실시간 파일 감시

자세한 사용법은 `scripts/slide-converter/README.md`를 참조하세요.

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```
quasar dev
```

### Lint the files

```
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

# Azure Static Web Apps 배포 설정 완료

---

## 🔒 학생 모드 보안 설정

학생들에게 강의를 공유할 때 보안을 위해 학생 모드를 설정할 수 있습니다.

### 환경변수 설정

```bash
# .env 파일에 추가
VITE_ENABLE_STUDENT_MODE=false  # 기본값: 비활성화
```

### 관리자 설정에서 토글

1. 헤더의 **설정** 버튼 클릭
2. **학생 모드 활성화** 토글 ON/OFF
3. **적용** 버튼 클릭

### 학생 공유 링크

학생 모드가 활성화되면 다음 링크로 학생들이 접근할 수 있습니다:

```
http://localhost:9000/study/default
```

---

## 🔐 Firebase 인증 설정

Google 로그인 기능을 사용하려면 Firebase 설정이 필요합니다.

### 1. Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com/)에서 새 프로젝트 생성
2. Authentication > Sign-in method에서 Google 로그인 활성화
3. 프로젝트 설정에서 웹 앱 추가
4. 웹 앱 설정에서 Firebase SDK 설정 복사

### 2. 환경 변수 설정

`env.example` 파일을 `.env`로 복사하고 Firebase 설정을 추가하세요:

```bash
# .env 파일 생성
cp env.example .env
```

그리고 `.env` 파일에서 Firebase 설정을 실제 값으로 교체하세요:

```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=실제_API_키
VITE_FIREBASE_AUTH_DOMAIN=실제_프로젝트_ID.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=실제_프로젝트_ID
VITE_FIREBASE_STORAGE_BUCKET=실제_프로젝트_ID.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=실제_발신자_ID
VITE_FIREBASE_APP_ID=실제_앱_ID
```

### 3. 이메일 설정

이메일 전송 기능을 사용하려면 SMTP 설정이 필요합니다.

#### Gmail 사용 시:

1. Gmail 계정에서 2단계 인증 활성화
2. 앱 비밀번호 생성 (Google 계정 설정 > 보안 > 앱 비밀번호)
3. `.env` 파일에 설정 추가:

```bash
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

#### 다른 이메일 서비스 사용 시:

- **Outlook/Hotmail**: `smtp-mail.outlook.com:587`
- **Yahoo**: `smtp.mail.yahoo.com:587`
- **Naver**: `smtp.naver.com:587`
- **Daum**: `smtp.daum.net:465` (secure: true)

### 4. 사용 방법

#### 관리자 모드

- 관리자는 강의를 편집하려면 반드시 로그인이 필요합니다
- 로그인하지 않으면 "관리자 로그인 필요" 화면이 표시됩니다
- 툴바의 로그인 버튼 클릭 후 Google 계정으로 로그인

#### 학생 모드

- 관리자 설정에서 "학생 모드에서 로그인 요구" 옵션을 활성화할 수 있습니다
- 활성화 시 학생들도 강의 수강을 위해 로그인이 필요합니다
- 비활성화 시 로그인 없이도 강의를 수강할 수 있습니다

#### 공통 기능

- 로그인 후 사용자 프로필 사진과 이름이 표시됩니다
- 로그아웃 버튼으로 언제든지 로그아웃할 수 있습니다

### 보안 특징

- ✅ **환경변수 제어**: `VITE_ENABLE_STUDENT_MODE=false`로 기본 비활성화
- ✅ **런타임 토글**: 관리자가 UI에서 실시간으로 활성화/비활성화 가능
- ✅ **라우터 가드**: 학생 모드가 비활성화되면 `/study` 경로 접근 차단
- ✅ **관리자 기능 숨김**: 학생 페이지에서는 툴바 메뉴들이 표시되지 않음

---

마크다운 → HTML 슬라이드 변환기를 성공적으로 구현했습니다!
📁 생성된 파일 구조
scripts/slide-converter/
├── markdown-to-html.js # 메인 변환기 클래스
├── convert-slides.js # 단일 실행 스크립트  
├── watch-slides.js # 자동 감시 및 변환
├── batch-convert.js # 배치 변환기
├── test-converter.js # 테스트 스크립트
├── config.json # 변환 설정
└── README.md # 상세 사용법
🚀 사용 가능한 명령어
bash# 기본 변환
npm run convert-slides

# 빌드와 함께

npm run build-slides

# 자동 감시 (파일 변경시 자동 변환)

npm run watch-slides

# 배치 변환 (여러 세트)

npm run batch-convert

# 변환기 테스트

npm run test-converter
⭐ 주요 기능

🎨 자동 타입 감지

제목 슬라이드 (intro-slide)
장 구분 (chapter-slide)
투표 (poll-slide)
통계 (stats-slide)
일반 콘텐츠 (content)

📱 반응형 디자인

모바일/태블릿/데스크톱 최적화
터치 및 키보드 네비게이션

🔄 실시간 기능

파일 변경 감시
자동 변환
디바운스 처리

🛠️ 커스터마이징

설정 파일로 테마 변경

재시도LJ계속편집
🛠️ 커스터마이징

설정 파일로 테마 변경
슬라이드 타입 추가/수정 가능
CSS 템플릿 커스터마이징

🧪 테스트 및 검증

자동 테스트 스위트
타입 감지 검증
변환 결과 확인

🎯 변환 과정

파일 스캔: public/slides/ 디렉토리에서 slide-X-Y.md 패턴 파일 검색
자동 정렬: 파일명 기준으로 올바른 순서 정렬
타입 감지: 내용 분석하여 슬라이드 타입 자동 결정
마크다운 파싱: 기본 마크다운 문법을 HTML로 변환
템플릿 적용: 반응형 CSS와 JavaScript 포함된 완성된 HTML 생성

📋 지원되는 마크다운 문법
markdown# 대제목 (H1)

## 중제목 (H2)

### 소제목 (H3)

**굵은 텍스트**
_기울임 텍스트_

- 순서 없는 리스트
- 두 번째 항목

1. 순서 있는 리스트
2. 두 번째 항목

<!-- HTML 직접 삽입도 가능 -->
<div style="text-align: center;">
  <h1>특별한 레이아웃</h1>
</div>
🎮 생성된 HTML 슬라이드 기능

네비게이션: 이전/다음 버튼, 키보드 조작 (← → Space)
슬라이드 카운터: 현재/전체 표시
애니메이션: 부드러운 페이드 효과
반응형: 모든 디바이스에서 최적 표시

🔧 실제 사용 예시
bash# 1. 프로젝트 디렉토리로 이동
cd /Users/milestonz/GitHub-Desktop/ai-workshop-quasar

# 2. 단일 변환 실행

npm run convert-slides

# 3. 자동 감시 모드 (개발 중 유용)

npm run watch-slides

# 이제 마크다운 파일을 수정하면 자동으로 HTML이 업데이트됩니다!

# 4. 브라우저에서 결과 확인

# public/generated/ai-workshop-slides.html 파일을 브라우저로 열기

🌟 핵심 장점

자동화: 수동 HTML 작성 불필요
일관성: 모든 슬라이드가 동일한 디자인 테마
효율성: 마크다운으로 빠른 콘텐츠 작성
확장성: 새로운 슬라이드 타입 쉽게 추가
유지보수: 설정 파일로 중앙 관리

<문제 해결>

변환이 안 될 때:
bash# 테스트 실행으로 문제 진단
npm run test-converter

# 수동 확인

node scripts/slide-converter/convert-slides.js
스타일이 이상할 때:

config.json에서 테마 색상 확인
슬라이드 타입 자동 감지 결과 확인

파일이 없다는 오류:

public/slides/ 디렉토리 존재 확인
파일명이 slide-X-Y.md 패턴인지 확인

🎊 완성된 시스템의 가치
이제 목회자를 위한 AI 활용 시나리오 강의뿐만 아니라, 앞으로 만들 모든 프레젠테이션에서 이 변환기를 활용할 수 있습니다:

마크다운으로 빠른 슬라이드 작성
일관된 전문적 디자인
자동 타입 감지로 적절한 레이아웃
실시간 미리보기
여러 프레젠테이션 일괄 관리
