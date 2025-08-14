#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * 슬라이드 태그 수정 스크립트
 * - '@'가 없다면 '@general'을 추가
 * - '@lecture'를 '@general'로 변경
 */

class SlideTagFixer {
  constructor() {
    this.slidesDir = '/Users/milestonz/GitHub-Desktop/ai-workshop-quasar/public/slides';
  }

  /**
   * 슬라이드 파일들의 태그를 수정
   */
  fixSlideTags() {
    console.log('🔧 슬라이드 태그 수정 시작');
    console.log(`📂 슬라이드 디렉토리: ${this.slidesDir}`);

    try {
      // slide-*-*.md 패턴의 파일들 찾기
      const allFiles = fs.readdirSync(this.slidesDir);
      const slideFiles = allFiles.filter((file) => file.match(/^slide-\d+-\d+\.md$/));

      console.log(`📄 발견된 슬라이드 파일: ${slideFiles.length}개`);

      let modifiedCount = 0;
      let lectureToGeneralCount = 0;
      let addedGeneralCount = 0;

      slideFiles.forEach((fileName) => {
        const filePath = path.join(this.slidesDir, fileName);
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');

        let modified = false;
        let newContent = content;

        // 첫 번째 줄 확인
        if (lines.length > 0) {
          const firstLine = lines[0].trim();

          if (firstLine === '@lecture') {
            // @lecture를 @general로 변경
            lines[0] = '@general';
            newContent = lines.join('\n');
            modified = true;
            lectureToGeneralCount++;
            console.log(`✅ ${fileName}: @lecture → @general`);
          } else if (!firstLine.startsWith('@')) {
            // @ 태그가 없으면 @general 추가
            lines.unshift('@general');
            newContent = lines.join('\n');
            modified = true;
            addedGeneralCount++;
            console.log(`✅ ${fileName}: @general 추가`);
          }
        }

        if (modified) {
          fs.writeFileSync(filePath, newContent, 'utf8');
          modifiedCount++;
        }
      });

      console.log('\n🎉 태그 수정 완료!');
      console.log(`📊 수정된 파일: ${modifiedCount}개`);
      console.log(`🔄 @lecture → @general: ${lectureToGeneralCount}개`);
      console.log(`➕ @general 추가: ${addedGeneralCount}개`);
    } catch (error) {
      console.error('❌ 태그 수정 중 오류 발생:', error.message);
    }
  }
}

// CLI 실행
if (require.main === module) {
  const fixer = new SlideTagFixer();
  fixer.fixSlideTags();
}

module.exports = SlideTagFixer;
