const fs = require('fs');
const path = require('path');

const slidesDir = path.join(__dirname, 'public', 'generated', 'slides');
const emojiPattern = /[💬🤖🌀🎯💡📋🛠🧭🚫🧠🧬🧘‍♂️🏆🎊🔧]/g;

function removeEmojiFromSlide5() {
  console.log('🔧 slide-5-*.html 파일들의 제목에서 이모지 제거 시작...');
  try {
    const files = fs.readdirSync(slidesDir);
    const slide5Files = files.filter(
      (file) => file.startsWith('slide-5-') && file.endsWith('.html'),
    );
    console.log(`📁 발견된 slide-5-*.html 파일 수: ${slide5Files.length}`);
    let modifiedCount = 0;

    slide5Files.forEach((file) => {
      const filePath = path.join(slidesDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      let fileModified = false;
      let newContent = content;

      // title 태그에서 이모지 제거
      const titlePattern = /<title>([^<]*?)<\/title>/g;
      newContent = newContent.replace(titlePattern, (match, titleText) => {
        if (emojiPattern.test(titleText)) {
          const cleanTitle = titleText.replace(emojiPattern, '').trim();
          console.log(`🔧 ${file}: title 태그 이모지 제거`);
          console.log(`   이전: ${titleText}`);
          console.log(`   이후: ${cleanTitle}`);
          fileModified = true;
          return `<title>${cleanTitle}</title>`;
        }
        return match;
      });

      // h1, h2, h3, h4, h5, h6 태그에서 이모지 제거
      const headingPattern = /<(h[1-6])[^>]*>([^<]*?)<\/\1>/g;
      newContent = newContent.replace(headingPattern, (match, tag, headingText) => {
        if (emojiPattern.test(headingText)) {
          const cleanHeading = headingText.replace(emojiPattern, '').trim();
          console.log(`🔧 ${file}: ${tag} 태그 이모지 제거`);
          console.log(`   이전: ${headingText}`);
          console.log(`   이후: ${cleanHeading}`);
          fileModified = true;
          return `<${tag}>${cleanHeading}</${tag}>`;
        }
        return match;
      });

      // title-emoji span 태그 제거
      const emojiSpanPattern = /<span class="title-emoji">[^<]*<\/span>/g;
      if (emojiSpanPattern.test(newContent)) {
        newContent = newContent.replace(emojiSpanPattern, '');
        console.log(`🔧 ${file}: title-emoji span 태그 제거`);
        fileModified = true;
      }

      if (fileModified) {
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

removeEmojiFromSlide5();
