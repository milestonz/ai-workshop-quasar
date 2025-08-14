const fs = require('fs');
const path = require('path');

// public/generated/slides 디렉토리 경로
const slidesDir = path.join(__dirname, 'public', 'generated', 'slides');

// 이모지 패턴 (HTML에서 사용되는 이모지들)
const emojiPattern = /[💬🤖🌀🎯💡📋🛠🧭🚫🧠🧬🧘‍♂️🏆🎊🔧]/g;

// HTML 파일들에서 제목의 이모지 제거
function removeEmojiFromHTML() {
  console.log('🔧 HTML 파일들의 제목에서 이모지 제거 시작...');

  try {
    // public/generated/slides 디렉토리의 모든 파일 읽기
    const files = fs.readdirSync(slidesDir);

    // HTML 파일들 필터링
    const htmlFiles = files.filter((file) => file.endsWith('.html'));

    console.log(`📁 발견된 HTML 파일 수: ${htmlFiles.length}`);

    let modifiedCount = 0;

    htmlFiles.forEach((file) => {
      const filePath = path.join(slidesDir, file);
      const content = fs.readFileSync(filePath, 'utf8');

      let fileModified = false;
      let newContent = content;

      // 제목 태그에서 이모지 제거
      // h1, h2, h3, h4, h5, h6 태그 내의 이모지 제거
      const titlePattern = /<(h[1-6])[^>]*>([^<]*?)<\/\1>/g;

      newContent = newContent.replace(titlePattern, (match, tag, titleText) => {
        if (emojiPattern.test(titleText)) {
          const cleanTitle = titleText.replace(emojiPattern, '').trim();
          console.log(`🔧 ${file}: ${tag} 태그 이모지 제거`);
          console.log(`   이전: ${titleText}`);
          console.log(`   이후: ${cleanTitle}`);
          fileModified = true;
          return `<${tag}>${cleanTitle}</${tag}>`;
        }
        return match;
      });

      // span.title-emoji 태그 제거
      const emojiSpanPattern = /<span class="title-emoji">[^<]*<\/span>/g;
      if (emojiSpanPattern.test(newContent)) {
        newContent = newContent.replace(emojiSpanPattern, '');
        console.log(`🔧 ${file}: title-emoji span 태그 제거`);
        fileModified = true;
      }

      // 제목 텍스트에서 이모지 제거 (span 태그 외부)
      const titleTextPattern = /#\s*[💬🤖🌀🎯💡📋🛠🧭🚫🧠🧬🧘‍♂️🏆🎊🔧][^#]*/g;
      newContent = newContent.replace(titleTextPattern, (match) => {
        const cleanMatch = match.replace(emojiPattern, '').trim();
        console.log(`🔧 ${file}: 제목 텍스트 이모지 제거`);
        console.log(`   이전: ${match}`);
        console.log(`   이후: ${cleanMatch}`);
        fileModified = true;
        return cleanMatch;
      });

      if (fileModified) {
        // 파일에 다시 쓰기
        fs.writeFileSync(filePath, newContent, 'utf8');
        modifiedCount++;
      } else {
        console.log(`✅ ${file}: 이모지가 없거나 이미 제거됨`);
      }
    });

    console.log(`\n✅ 수정 완료! 총 ${modifiedCount}개 HTML 파일이 수정되었습니다.`);
  } catch (error) {
    console.error('❌ 오류 발생:', error);
  }
}

// 스크립트 실행
removeEmojiFromHTML();
