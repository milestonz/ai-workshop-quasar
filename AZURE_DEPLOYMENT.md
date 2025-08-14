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

```
NODE_ENV = production
PORT = 8080
EMAIL_SERVICE = gmail
EMAIL_USER = [your-email@gmail.com]
EMAIL_PASS = [your-app-password]
EMAIL_FROM = [your-email@gmail.com]
CORS_ORIGIN = https://slide-view-app-new.azurewebsites.net
```

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

## 📁 **배포된 파일 구조**

```
/
├── server.js              # Node.js 서버 (메인)
├── dist/                  # Vue.js 빌드 결과
├── public/                # 정적 파일들
├── slides/                # 마크다운 슬라이드
├── generated/             # 변환된 HTML 슬라이드
├── web.config             # IIS 설정
└── package.json           # Node.js 의존성
```

## 🌐 **접속 URL**

- **메인 앱**: https://slide-view-app-new.azurewebsites.net
- **API 엔드포인트**: https://slide-view-app-new.azurewebsites.net/api/*
- **Azure Portal**: https://portal.azure.com/#@coachingware.onmicrosoft.com/resource/subscriptions/25c2d56d-15a4-4be5-9164-5486a6e42d5b/resourceGroups/ai-seminar-rg/providers/Microsoft.Web/sites/slide-view-app-new/overview

## 🔍 **문제 해결**

### **배포 실패 시**
1. GitHub Actions 로그 확인
2. Azure App Service 로그 확인 (Log stream)
3. 환경변수 설정 확인

### **서버 시작 실패 시**
1. `web.config` 파일 확인
2. `package.json`의 start 스크립트 확인
3. Node.js 버전 호환성 확인 (20.x LTS)

## 📊 **모니터링**

- **Azure Portal**: App Service > Monitoring
- **Application Insights**: 성능 및 오류 추적
- **Log Analytics**: 상세 로그 분석
