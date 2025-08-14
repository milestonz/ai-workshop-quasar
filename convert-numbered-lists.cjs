#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * 번호 목록을 숫자 bullet으로 변환하는 스크립트
 * - "1. 텍스트" → "- 1. 텍스트"
 */

class NumberedListConverter {
  constructor() {
    this.slidesDir = '/Users/milestonz/GitHub-Desktop/ai-workshop-quasar/public/slides';
  }

  /**
   * 번호 목록을 bullet으로 변환
   */
  convertNumberedLists() {
    console.log('🔄 번호 목록을 bullet으로 변환 시작');
    console.log(`📂 슬라이드 디렉토리: ${this.slidesDir}`);

    try {
      // 변환된 poll 슬라이드 파일들
      const targetFiles = ['slide-0-3.md', 'slide-0-4.md', 'slide-0-5.md', 'slide-5-1.md'];

      console.log(`📄 대상 파일: ${targetFiles.length}개`);

      let convertedCount = 0;

      targetFiles.forEach((fileName) => {
        const filePath = path.join(this.slidesDir, fileName);

        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf8');
          const lines = content.split('\n');
          let modified = false;

          const newLines = lines.map((line) => {
            // "숫자. 텍스트" 패턴을 찾아서 "- 숫자. 텍스트"로 변환
            const numberedPattern = /^(\d+)\.\s+(.+)$/;
            const match = line.match(numberedPattern);

            if (match) {
              modified = true;
              return `- ${match[1]}. ${match[2]}`;
            }

            return line;
          });

          if (modified) {
            const newContent = newLines.join('\n');
            fs.writeFileSync(filePath, newContent, 'utf8');
            convertedCount++;
            console.log(`✅ ${fileName}: 번호 목록을 bullet으로 변환`);
          } else {
            console.log(`ℹ️ ${fileName}: 변환할 번호 목록이 없음`);
          }
        } else {
          console.log(`⚠️ ${fileName}: 파일을 찾을 수 없음`);
        }
      });

      console.log('\n🎉 번호 목록 변환 완료!');
      console.log(`📊 변환된 파일: ${convertedCount}개`);
    } catch (error) {
      console.error('❌ 변환 중 오류 발생:', error.message);
    }
  }
}

// CLI 실행
if (require.main === module) {
  const converter = new NumberedListConverter();
  converter.convertNumberedLists();
}

module.exports = NumberedListConverter;
