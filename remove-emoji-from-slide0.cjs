const fs = require('fs');
const path = require('path');

// public/slides 디렉토리 경로
const slidesDir = path.join(__dirname, 'public', 'slides');

// 이모지 패턴 (slide-0-*.md에서 사용되는 이모지들)
const emojiPattern = /[💬📋🌀💡🎯🛠🧭🚫🧠🧬🧘‍♂️🏆🤖]/g;

// slide-0-*.md 파일들에서 제목의 이모지 제거
function removeEmojiFromSlide0() {
  console.log('🔧 slide-0-*.md 파일들의 제목에서 이모지 제거 시작...');

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

      let fileModified = false;

      // 각 줄을 확인하여 #로 시작하는 제목에서 이모지 제거
      const newLines = lines.map((line, index) => {
        const trimmedLine = line.trim();

        // #로 시작하는 제목 줄에서 이모지 제거
        if (trimmedLine.startsWith('#') && emojiPattern.test(trimmedLine)) {
          const newLine = trimmedLine.replace(emojiPattern, '').trim();
          console.log(`🔧 ${file}: ${index + 1}번째 줄 이모지 제거`);
          console.log(`   이전: ${trimmedLine}`);
          console.log(`   이후: ${newLine}`);
          fileModified = true;
          return line.replace(trimmedLine, newLine);
        }

        return line;
      });

      if (fileModified) {
        // 파일에 다시 쓰기
        const newContent = newLines.join('\n');
        fs.writeFileSync(filePath, newContent, 'utf8');
        modifiedCount++;
      } else {
        console.log(`✅ ${file}: 이모지가 없거나 이미 제거됨`);
      }
    });

    console.log(`\n✅ 수정 완료! 총 ${modifiedCount}개 파일이 수정되었습니다.`);
  } catch (error) {
    console.error('❌ 오류 발생:', error);
  }
}

// 스크립트 실행
removeEmojiFromSlide0();
