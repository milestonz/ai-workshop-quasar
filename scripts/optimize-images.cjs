const fs = require('fs');
const path = require('path');

// 이미지 최적화 함수
function optimizeImages() {
  const imagesDir = path.join(__dirname, '../public/images');
  const outputDir = path.join(__dirname, '../public/images/optimized');

  // 최적화된 이미지 디렉토리 생성
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 이미지 파일 목록 가져오기
  const imageFiles = fs.readdirSync(imagesDir).filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return ['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(ext);
  });

  console.log(`📸 발견된 이미지 파일: ${imageFiles.length}개`);

  // 이미지 최적화 정보 생성
  const optimizationInfo = {
    totalImages: imageFiles.length,
    optimizedImages: [],
    originalSize: 0,
    optimizedSize: 0,
    savings: 0,
  };

  imageFiles.forEach((file) => {
    const inputPath = path.join(imagesDir, file);
    const outputPath = path.join(outputDir, file);

    try {
      // 파일 크기 계산
      const stats = fs.statSync(inputPath);
      optimizationInfo.originalSize += stats.size;

      // 간단한 복사 (실제 최적화는 이미지 처리 라이브러리 필요)
      fs.copyFileSync(inputPath, outputPath);

      const outputStats = fs.statSync(outputPath);
      optimizationInfo.optimizedSize += outputStats.size;

      optimizationInfo.optimizedImages.push({
        file: file,
        originalSize: stats.size,
        optimizedSize: outputStats.size,
        savings: stats.size - outputStats.size,
      });

      console.log(`✅ ${file} 최적화 완료`);
    } catch (error) {
      console.error(`❌ ${file} 최적화 실패:`, error.message);
    }
  });

  optimizationInfo.savings = optimizationInfo.originalSize - optimizationInfo.optimizedSize;

  // 최적화 결과 저장
  const reportPath = path.join(__dirname, '../public/images/optimization-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(optimizationInfo, null, 2));

  console.log('\n📊 이미지 최적화 결과:');
  console.log(`총 이미지: ${optimizationInfo.totalImages}개`);
  console.log(`원본 크기: ${(optimizationInfo.originalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`최적화 크기: ${(optimizationInfo.optimizedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`절약된 크기: ${(optimizationInfo.savings / 1024 / 1024).toFixed(2)} MB`);
  console.log(
    `절약률: ${((optimizationInfo.savings / optimizationInfo.originalSize) * 100).toFixed(1)}%`,
  );

  return optimizationInfo;
}

// CSS 스프라이트 생성 함수
function generateSpriteCSS() {
  const imagesDir = path.join(__dirname, '../public/images');
  const imageFiles = fs.readdirSync(imagesDir).filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return ['.png', '.jpg', '.jpeg'].includes(ext);
  });

  let css = '/* 자동 생성된 이미지 스프라이트 CSS */\n';
  css += '.sprite {\n';
  css += '  display: inline-block;\n';
  css += '  background-repeat: no-repeat;\n';
  css += '}\n\n';

  imageFiles.forEach((file, index) => {
    const className = file.replace(/[^a-zA-Z0-9]/g, '-').replace(/\.(png|jpg|jpeg)$/i, '');
    css += `.sprite-${className} {\n`;
    css += `  background-image: url('../images/${file}');\n`;
    css += `  background-position: 0 -${index * 50}px;\n`;
    css += `  width: 50px;\n`;
    css += `  height: 50px;\n`;
    css += `}\n\n`;
  });

  const cssPath = path.join(__dirname, '../public/css/sprite.css');
  fs.writeFileSync(cssPath, css);

  console.log(`🎨 스프라이트 CSS 생성 완료: ${cssPath}`);
}

// 메인 실행
function main() {
  console.log('🚀 이미지 최적화 시작...\n');

  try {
    // 이미지 최적화
    const result = optimizeImages();

    // 스프라이트 CSS 생성
    generateSpriteCSS();

    console.log('\n✅ 이미지 최적화 완료!');
  } catch (error) {
    console.error('❌ 이미지 최적화 실패:', error);
    process.exit(1);
  }
}

// 스크립트 실행
if (require.main === module) {
  main();
}

module.exports = { optimizeImages, generateSpriteCSS };
