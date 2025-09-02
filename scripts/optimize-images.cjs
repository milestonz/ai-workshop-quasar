#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🖼️ 이미지 최적화 시작...');

const distImagesPath = path.join(__dirname, '../dist/images');

if (!fs.existsSync(distImagesPath)) {
  console.log('❌ dist/images 폴더가 존재하지 않습니다.');
  process.exit(1);
}

// 이미지 파일 목록 가져오기
const imageFiles = fs.readdirSync(distImagesPath)
  .filter(file => /\.(png|jpg|jpeg)$/i.test(file))
  .map(file => path.join(distImagesPath, file));

if (imageFiles.length === 0) {
  console.log('📁 최적화할 이미지 파일이 없습니다.');
  process.exit(0);
}

console.log(`📊 발견된 이미지 파일: ${imageFiles.length}개`);

// 각 이미지 파일 최적화
imageFiles.forEach((imagePath, index) => {
  try {
    const fileName = path.basename(imagePath);
    console.log(`[${index + 1}/${imageFiles.length}] 최적화 중: ${fileName}`);
    
    // sharp-cli를 사용하여 이미지 최적화
    // 800x600으로 리사이즈하고 품질 80%로 압축
    execSync(`npx sharp-cli resize 800 600 --input "${imagePath}" --output "${imagePath}" --format png --quality 80`, {
      stdio: 'pipe'
    });
    
    console.log(`✅ ${fileName} 최적화 완료`);
  } catch (error) {
    console.log(`❌ ${path.basename(imagePath)} 최적화 실패:`, error.message);
  }
});

console.log('🎉 이미지 최적화 완료!');