#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Poll 타입 슬라이드를 General 타입으로 변환하는 스크립트
 * - '@poll'을 '@general'로 변경
 */

class PollToGeneralConverter {
  constructor() {
    this.slidesDir = '/Users/milestonz/GitHub-Desktop/ai-workshop-quasar/public/slides';
  }

  /**
   * Poll 슬라이드를 General로 변환
   */
  convertPollToGeneral() {
    console.log('🔄 Poll 타입 슬라이드를 General 타입으로 변환 시작');
    console.log(`📂 슬라이드 디렉토리: ${this.slidesDir}`);

    try {
      // @poll 태그가 있는 파일들 찾기
      const allFiles = fs.readdirSync(this.slidesDir);
      const pollFiles = allFiles.filter((file) => {
        if (file.match(/^slide-\d+-\d+\.md$/)) {
          const filePath = path.join(this.slidesDir, file);
          const content = fs.readFileSync(filePath, 'utf8');
          const firstLine = content.split('\n')[0].trim();
          return firstLine === '@poll';
        }
        return false;
      });

      console.log(`📄 발견된 poll 슬라이드 파일: ${pollFiles.length}개`);

      let convertedCount = 0;

      pollFiles.forEach((fileName) => {
        const filePath = path.join(this.slidesDir, fileName);
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');

        if (lines.length > 0 && lines[0].trim() === '@poll') {
          // @poll을 @general로 변경
          lines[0] = '@general';
          const newContent = lines.join('\n');

          fs.writeFileSync(filePath, newContent, 'utf8');
          convertedCount++;
          console.log(`✅ ${fileName}: @poll → @general`);
        }
      });

      console.log('\n🎉 Poll → General 변환 완료!');
      console.log(`📊 변환된 파일: ${convertedCount}개`);
    } catch (error) {
      console.error('❌ 변환 중 오류 발생:', error.message);
    }
  }
}

// CLI 실행
if (require.main === module) {
  const converter = new PollToGeneralConverter();
  converter.convertPollToGeneral();
}

module.exports = PollToGeneralConverter;
