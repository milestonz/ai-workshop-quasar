#!/bin/bash

# Azure 배포 자동화 스크립트
echo "🚀 Azure 배포 시작..."

# 1. 의존성 설치
echo "📦 의존성 설치 중..."
npm install

# 2. 슬라이드 빌드
echo "📚 슬라이드 빌드 중..."
npm run build-slides

# 3. Quasar 앱 빌드
echo "⚡ Quasar 앱 빌드 중..."
npm run build

# 4. Azure 배포 준비
echo "🔧 Azure 배포 준비 중..."
npm run prepare-azure

# 5. 배포 파일 확인
echo "📁 배포 파일 확인 중..."
ls -la

echo "✅ Azure 배포 준비 완료!"
echo "📤 이제 dist/ 폴더의 내용을 Azure에 업로드하세요."
echo "💡 또는 GitHub Actions를 사용하여 자동 배포하세요."
