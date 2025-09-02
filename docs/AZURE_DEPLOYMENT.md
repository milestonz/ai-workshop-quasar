# 🚀 Azure App Service 배포 가이드

## 📋 **필요한 Azure 설정**

### 1. **GitHub Secrets 설정**

GitHub 저장소의 Settings > Secrets and variables > Actions에서 다음을 추가:

```
AZURE_WEBAPP_PUBLISH_PROFILE: [Azure에서 다운로드한 publish profile]
AZURE_SUBSCRIPTION_ID: 25c2d56d-15a4-4be5-9164-5486a6e42d5b
```

### 2. **Azure App Service 환경변수 설정**

Azure Portal > App Service > Configuration > Application settings에서 추가:

#### **필수 환경변수**:

```
NODE_ENV = production
PORT = 8080
```

#### **이메일 설정** (Gmail 사용 시):

```
EMAIL_SERVICE = gmail
EMAIL_USER = your-email@gmail.com
EMAIL_PASS = your-app-password
EMAIL_FROM = your-email@gmail.com
```

#### **CORS 및 보안 설정**:

```
CORS_ORIGIN = https://slide-view-app-new.azurewebsites.net
```

#### **Firebase 설정** (필수):

```
FIREBASE_API_KEY = AlzaSyC2RcDI7MRYRKMkX2szBsF67
FIREBASE_APP_ID = 1:951171862827:web:14701b2a5f1c
FIREBASE_AUTH_DOMAIN = slide-view-91a09.firebaseapp.com
FIREBASE_MESSAGING_SENDER_ID = 951171862827
FIREBASE_PROJECT_ID = slide-view-91a09
FIREBASE_STORAGE_BUCKET = slide-view-91a09.appspot.com
FIREBASE_DATABASE_URL = https://slide-view-91a09-default-rtdb.asia-southeast1.firebasedatabase.app
```

#### **데이터베이스 설정** (필요시):

```
DB_HOST = localhost
DB_PORT = 3306
DB_NAME = coachingware_db
DB_USER = root
DB_PASSWORD = root
```

#### **환경변수 설정 방법**:

1. Azure Portal > App Service > Configuration
2. "New application setting" 클릭
3. Name과 Value 입력 후 Save
4. "Restart" 클릭하여 앱 재시작

### 3. **Publish Profile 다운로드**

1. Azure Portal > App Service > Overview
2. "Get publish profile" 클릭
3. 다운로드된 파일 내용을 `AZURE_WEBAPP_PUBLISH_PROFILE` secret에 복사

## 🔧 **배포 프로세스**

### **자동 배포 (권장)**

- `master` 브랜치에 push하면 자동으로 배포됨
- GitHub Actions에서 빌드 및 배포 진행

### **수동 배포**

1. GitHub Actions 탭에서 "Deploy to Azure App Service" 워크플로우 선택
2. "Run workflow" 클릭
3. 브랜치 선택 후 실행

## 🚨 **문제 해결**

### **Quasar 빌드 실패 문제**

Azure에서 `quasar build` 명령어 실행 시 발생하는 문제를 해결했습니다:

#### **해결 방법 1: 로컬 빌드 후 배포 (권장)**

```bash
# 로컬에서 실행
npm run build:azure

# 이 명령어는 다음을 수행합니다:
# 1. 슬라이드 빌드
# 2. Quasar 앱 빌드
# 3. Azure 배포 준비 (dist/ 폴더 내용을 루트로 복사)
```

#### **해결 방법 2: GitHub Actions 자동 배포**

새로운 워크플로우가 자동으로 로컬 빌드와 동일한 과정을 수행합니다.

### **서버 설정 최적화**

- `server.js`가 Azure 환경을 자동으로 감지
- 정적 파일 서빙 경로가 Azure 배포 구조에 맞게 최적화됨

## 📁 **배포된 파일 구조**

```
/
├── server.js              # Node.js 서버 (메인)
├── index.html             # Vue.js 메인 페이지
├── assets/                # Vue.js 빌드 결과물
├── css/                   # 스타일시트
├── public/                # 정적 파일들
├── slides/                # 마크다운 슬라이드
├── generated/             # 변환된 HTML 슬라이드
├── web.config             # IIS 설정
└── package.json           # Node.js 의존성
```

## 🛠️ **배포 스크립트**

### **로컬 배포 준비**

```bash
# Azure 배포용 빌드
npm run build:azure

# 또는 단계별 실행
npm run build-slides      # 슬라이드 빌드
npm run build            # Quasar 앱 빌드
npm run prepare-azure    # Azure 배포 준비
```

### **GitHub Actions 자동 배포**

- `master` 브랜치에 push하면 자동 배포
- 빌드 실패 시 자동으로 롤백
- 배포 상태를 GitHub에서 실시간 확인 가능

## 🔍 **배포 상태 확인**

1. **GitHub Actions**: `.github/workflows/deploy-azure.yml` 실행 상태
2. **Azure Portal**: App Service > Deployment Center
3. **로그 확인**: App Service > Log stream

## 📞 **문제 발생 시**

1. GitHub Actions 로그 확인
2. Azure App Service 로그 스트림 확인
3. 환경변수 설정 재확인
4. 필요시 Azure App Service 재시작
