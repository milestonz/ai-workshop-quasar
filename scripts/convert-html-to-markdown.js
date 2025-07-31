#!/usr/bin/env node

/**
 * HTML 태그를 제거하고 순수 마크다운 형식으로 변환하는 스크립트
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class HTMLToMarkdownConverter {
  constructor() {
    this.slidesDir = path.resolve(__dirname, '../public/slides');
  }

  /**
   * HTML 태그를 마크다운으로 변환
   */
  convertHTMLToMarkdown(content) {
    let markdown = content;

    // 1. HTML 제목 태그를 마크다운으로 변환 (먼저 처리)
    markdown = markdown.replace(/<h1[^>]*>(.*?)<\/h1>/g, '\n# $1\n');
    markdown = markdown.replace(/<h2[^>]*>(.*?)<\/h2>/g, '\n## $1\n');
    markdown = markdown.replace(/<h3[^>]*>(.*?)<\/h3>/g, '\n### $1\n');
    markdown = markdown.replace(/<h4[^>]*>(.*?)<\/h4>/g, '\n#### $1\n');
    markdown = markdown.replace(/<h5[^>]*>(.*?)<\/h5>/g, '\n##### $1\n');
    markdown = markdown.replace(/<h6[^>]*>(.*?)<\/h6>/g, '\n###### $1\n');

    // 2. 강조 태그 처리
    markdown = markdown.replace(/<b[^>]*>(.*?)<\/b>/g, '**$1**');
    markdown = markdown.replace(/<strong[^>]*>(.*?)<\/strong>/g, '**$1**');
    markdown = markdown.replace(/<i[^>]*>(.*?)<\/i>/g, '*$1*');
    markdown = markdown.replace(/<em[^>]*>(.*?)<\/em>/g, '*$1*');

    // 3. 리스트 태그 처리
    markdown = markdown.replace(/<ul[^>]*>/g, '\n');
    markdown = markdown.replace(/<\/ul>/g, '\n');
    markdown = markdown.replace(/<ol[^>]*>/g, '\n');
    markdown = markdown.replace(/<\/ol>/g, '\n');
    markdown = markdown.replace(/<li[^>]*>(.*?)<\/li>/g, '- $1');

    // 4. 링크 태그 처리
    markdown = markdown.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/g, '[$2]($1)');

    // 5. 이미지 태그 처리
    markdown = markdown.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/g, '![$2]($1)');
    markdown = markdown.replace(/<img[^>]*src="([^"]*)"[^>]*>/g, '![]($1)');

    // 6. 줄바꿈 태그 처리
    markdown = markdown.replace(/<br\s*\/?>/g, '\n');

    // 7. 단락 태그 처리
    markdown = markdown.replace(/<p[^>]*>(.*?)<\/p>/g, '$1\n\n');

    // 8. 스팬 태그 처리
    markdown = markdown.replace(/<span[^>]*>(.*?)<\/span>/g, '$1');

    // 9. div 태그 처리 (마지막에 처리)
    markdown = markdown.replace(/<div[^>]*>/g, '\n');
    markdown = markdown.replace(/<\/div>/g, '\n');

    // 10. 기타 HTML 태그 제거
    markdown = markdown.replace(/<[^>]+>/g, '');

    // 11. 빈 줄 정리
    markdown = markdown.replace(/\n\s*\n\s*\n/g, '\n\n');
    markdown = markdown.replace(/^\s+|\s+$/gm, ''); // 각 줄의 앞뒤 공백 제거

    // 12. 연속된 빈 줄을 2개로 제한
    markdown = markdown.replace(/\n{3,}/g, '\n\n');

    // 13. 제목 앞뒤 줄바꿈 정리
    markdown = markdown.replace(/\n{2,}(#{1,6}\s)/g, '\n\n$1');
    markdown = markdown.replace(/(#{1,6}.*?)\n{2,}/g, '$1\n\n');

    return markdown.trim();
  }

  /**
   * 파일을 변환
   */
  convertFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const convertedContent = this.convertHTMLToMarkdown(content);

      // 원본 파일 백업
      const backupPath = filePath + '.backup';
      fs.writeFileSync(backupPath, content, 'utf8');

      // 변환된 내용으로 파일 덮어쓰기
      fs.writeFileSync(filePath, convertedContent, 'utf8');

      console.log(`✅ ${path.basename(filePath)} 변환 완료`);
      return true;
    } catch (error) {
      console.error(`❌ ${path.basename(filePath)} 변환 실패:`, error.message);
      return false;
    }
  }

  /**
   * 모든 MD 파일 변환
   */
  async convertAllFiles() {
    console.log('🚀 HTML 태그를 마크다운으로 변환 시작');
    console.log(`📂 슬라이드 디렉토리: ${this.slidesDir}`);

    try {
      const files = fs
        .readdirSync(this.slidesDir)
        .filter((file) => file.endsWith('.md'))
        .sort();

      console.log(`📂 발견된 MD 파일: ${files.length}개`);

      let successCount = 0;
      let failCount = 0;

      for (const file of files) {
        const filePath = path.join(this.slidesDir, file);
        const success = this.convertFile(filePath);

        if (success) {
          successCount++;
        } else {
          failCount++;
        }
      }

      console.log('');
      console.log('🎉 변환 완료!');
      console.log(`✅ 성공: ${successCount}개`);
      console.log(`❌ 실패: ${failCount}개`);
      console.log(`📁 백업 파일: ${this.slidesDir}/*.md.backup`);

      return successCount;
    } catch (error) {
      console.error(`💥 변환 실패: ${error.message}`);
      return 0;
    }
  }
}

// 스크립트 실행
const converter = new HTMLToMarkdownConverter();
converter.convertAllFiles().then((successCount) => {
  if (successCount > 0) {
    console.log('\n💡 다음 단계:');
    console.log('1. 변환된 파일들을 확인하세요');
    console.log('2. 문제가 있으면 .backup 파일에서 복원하세요');
    console.log('3. HTML 변환을 다시 실행하세요: npm run convert-slides-individual');
  }
  process.exit(successCount > 0 ? 0 : 1);
});
