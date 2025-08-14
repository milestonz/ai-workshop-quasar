const fs = require('fs');
const path = require('path');

const slidesDir = path.join(__dirname, 'public', 'generated', 'slides');

// 더 정확한 이모지 패턴 (텍스트는 보존)
const emojiPattern = /[💬🤖🌀🎯💡📋🛠🧭🚫🧠🧬🧘‍♂️🏆🎊🔧🔹🔸📊👥🏥🌟🙏⚠️📝]/g;

function fixEmojiRemoval() {
  console.log('🔧 slide-5-*.html 파일들의 이모지 제거 수정 시작...');
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

      // title 태그에서 이모지만 제거 (텍스트 보존)
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

      // h1, h2, h3, h4, h5, h6 태그에서 이모지만 제거 (텍스트 보존)
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

      // p 태그에서 이모지만 제거 (텍스트 보존)
      const paragraphPattern = /<p[^>]*>([^<]*?)<\/p>/g;
      newContent = newContent.replace(paragraphPattern, (match, paragraphText) => {
        if (emojiPattern.test(paragraphText)) {
          const cleanParagraph = paragraphText.replace(emojiPattern, '').trim();
          console.log(`🔧 ${file}: p 태그 이모지 제거`);
          console.log(`   이전: ${paragraphText}`);
          console.log(`   이후: ${cleanParagraph}`);
          fileModified = true;
          return match.replace(paragraphText, cleanParagraph);
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

      // 텍스트 노드에서 이모지 제거 (HTML 태그 외부)
      const textNodePattern = />([^<]*?)</g;
      newContent = newContent.replace(textNodePattern, (match, textContent) => {
        if (emojiPattern.test(textContent)) {
          const cleanText = textContent.replace(emojiPattern, '').trim();
          if (cleanText !== textContent) {
            console.log(`🔧 ${file}: 텍스트 노드 이모지 제거`);
            console.log(`   이전: ${textContent}`);
            console.log(`   이후: ${cleanText}`);
            fileModified = true;
            return `>${cleanText}<`;
          }
        }
        return match;
      });

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

fixEmojiRemoval();
