const fs = require('fs');
const path = require('path');

// public/slides 디렉토리 경로
const slidesDir = path.join(__dirname, 'public', 'slides');

// slide-0-*.md 파일들을 찾아서 둘째줄의 ##, ###를 #로 변경
function fixSlide0Headers() {
  console.log('🔧 slide-0-*.md 파일들의 둘째줄 헤더 수정 시작...');

  try {
    // public/slides 디렉토리의 모든 파일 읽기
    const files = fs.readdirSync(slidesDir);

    // slide-0-*.md 파일들 필터링
    const slide0Files = files.filter((file) => file.startsWith('slide-0-') && file.endsWith('.md'));

    console.log(`📁 발견된 slide-0-*.md 파일 수: ${slide0Files.length}`);

    let modifiedCount = 0;

    slide0Files.forEach((file) => {
      const filePath = path.join(slidesDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');

      // 둘째줄이 존재하고 ## 또는 ###로 시작하는지 확인
      if (lines.length >= 2) {
        const secondLine = lines[1].trim();

        if (secondLine.startsWith('##') || secondLine.startsWith('###')) {
          console.log(`🔧 ${file}: 둘째줄 수정`);
          console.log(`   이전: ${secondLine}`);

          // ## 또는 ###를 #로 변경
          const newSecondLine = secondLine.replace(/^#{2,3}\s*/, '# ');
          lines[1] = newSecondLine;

          console.log(`   이후: ${newSecondLine}`);

          // 파일에 다시 쓰기
          const newContent = lines.join('\n');
          fs.writeFileSync(filePath, newContent, 'utf8');

          modifiedCount++;
        } else {
          console.log(`✅ ${file}: 둘째줄이 이미 # 또는 다른 형식임`);
        }
      } else {
        console.log(`⚠️  ${file}: 파일이 너무 짧음 (${lines.length}줄)`);
      }
    });

    console.log(`\n✅ 수정 완료! 총 ${modifiedCount}개 파일이 수정되었습니다.`);
  } catch (error) {
    console.error('❌ 오류 발생:', error);
  }
}

// 스크립트 실행
fixSlide0Headers();
