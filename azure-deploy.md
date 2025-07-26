# Azure 배포 가이드

## ✅ 완료된 설정

### **Azure 리소스 정보:**

- **Storage Account**: `aiseminarstorage`
- **Container**: `ai-seminar-container`
- **Static Web App**: `ai-seminar-app`
- **URL**: `https://icy-smoke-030744f0f.1.azurestaticapps.net`

### **환경 변수 설정:**

```bash
VITE_AZURE_STORAGE_ACCOUNT_NAME=aiseminarstorage
VITE_AZURE_STORAGE_ACCOUNT_KEY=MXLu872St0nkQ0FAnBDITpQa34JZ/q1mDKo9CMIR44nDdTtyEDsQC+Scrtcjab/whqTBQrG3oeev+AStHUMCKQ==
VITE_AZURE_STORAGE_CONTAINER_NAME=ai-seminar-container
```

### **CORS 설정:**

- **허용된 도메인**: `https://icy-smoke-030744f0f.1.azurestaticapps.net`
- **허용된 메서드**: GET, POST, PUT, DELETE
- **허용된 헤더**: \*

## 🚀 배포 방법

### **1. GitHub Actions 사용 (권장)**

1. GitHub 저장소에 코드 푸시
2. `.github/workflows/azure-static-web-apps.yml` 파일이 자동으로 배포 실행
3. GitHub Secrets에 `AZURE_STATIC_WEB_APPS_API_TOKEN` 설정:
   ```
   d81ad71520c1bf911b738f1bda2664599bf43a7667b99cc084650ea1a30b60f501-d6213ac8-279b-44ac-97b3-ce915cf3020700f0520030744f0f
   ```

### **2. 로컬 테스트**

```bash
# 빌드
npm run build

# 로컬 서버 실행
swa start dist --api-location "" --env AZURE_STATIC_WEB_APPS_API_TOKEN="your_token"
```

### **3. 수동 배포**

```bash
# 빌드
npm run build

# Azure CLI로 배포
az staticwebapp create --name ai-seminar-app --resource-group ai-seminar-rg --location eastus2
```

## 🔧 기능

- **자동 폴백**: Azure Blob Storage 실패 시 LocalStorage로 자동 전환
- **데이터 동기화**: 모든 강의 데이터와 잠금 상태가 Azure에 저장
- **멀티 디바이스**: 여러 기기에서 동일한 데이터 접근 가능
- **백업**: Azure의 자동 백업 기능 활용

## 🔒 보안

- Storage Account Key는 환경 변수로 관리
- CORS 설정으로 허용된 도메인만 접근 가능
- Container 레벨에서 접근 제어 가능

## 📊 모니터링

- Azure Portal에서 Static Web Apps 모니터링
- Storage Account 메트릭 확인
- 로그 분석 및 오류 추적

## 🔄 업데이트

코드 변경 시:

1. GitHub에 푸시
2. GitHub Actions가 자동으로 빌드 및 배포
3. 환경 변수 변경 시 Azure Portal에서 수동 업데이트
