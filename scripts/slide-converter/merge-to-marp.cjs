const fs = require('fs');
const path = require('path');

/**
 * 슬라이드 파일들을 Marp 형식으로 통합
 */
class MarpMerger {
  constructor() {
    this.slidesDir = path.join(__dirname, '../../public/slides');
    this.outputFile = path.join(__dirname, '../../public/slides/slide-all.md');
  }

  /**
   * 슬라이드 파일들을 정렬 가능한 숫자로 변환
   */
  extractSlideNumbers(filename) {
    const match = filename.match(/slide-(\d+)-(\d+)\.md/);
    if (match) {
      const chapter = parseInt(match[1], 10);
      const slide = parseInt(match[2], 10);
      return chapter * 1000 + slide; // 정렬을 위한 숫자 생성
    }
    return 0;
  }

  /**
   * 슬라이드 파일들을 로드하고 정렬
   */
  loadSlideFiles() {
    try {
      const files = fs.readdirSync(this.slidesDir);
      
      // slide-*-*.md 파일들만 필터링
      const slideFiles = files.filter(file => 
        file.match(/^slide-\d+-\d+\.md$/)
      );

      // 파일들을 정렬
      slideFiles.sort((a, b) => {
        const aNum = this.extractSlideNumbers(a);
        const bNum = this.extractSlideNumbers(b);
        return aNum - bNum;
      });

      console.log(`📂 발견된 슬라이드 파일: ${slideFiles.length}개`);
      return slideFiles;
    } catch (error) {
      console.error('❌ 슬라이드 디렉토리를 읽을 수 없습니다:', error.message);
      return [];
    }
  }

  /**
   * 개별 슬라이드 파일 내용을 읽기
   */
  readSlideContent(filename) {
    try {
      const filePath = path.join(this.slidesDir, filename);
      const content = fs.readFileSync(filePath, 'utf8');
      
      // 파일 내용 정리
      let cleanContent = content.trim();
      
      // 슬라이드 타입 표시가 있으면 제거 (@general, @cover 등)
      cleanContent = cleanContent.replace(/^@\w+\s*\n?/gm, '');
      
      return cleanContent;
    } catch (error) {
      console.error(`❌ 파일 읽기 실패 (${filename}):`, error.message);
      return `# Error: ${filename}\n\n파일을 읽을 수 없습니다.`;
    }
  }

  /**
   * Marp 헤더 생성
   */
  generateMarpHeader() {
    return `---
marp: true
theme: default
paginate: true
backgroundColor: #fff
color: #333
style: |
  section {
    font-family: 'Noto Sans KR', 'Malgun Gothic', sans-serif;
    padding: 40px;
  }
  h1 {
    color: #2d7d6e;
    font-size: 2.5em;
  }
  h2 {
    color: #4a9d8e;
    font-size: 2em;
  }
  h3 {
    color: #2d4a3a;
    font-size: 1.5em;
  }
  ul {
    font-size: 1.2em;
    line-height: 1.6;
  }
  li {
    margin-bottom: 0.5em;
  }
  strong {
    color: #1a472a;
  }
---

`;
  }

  /**
   * 모든 슬라이드를 통합하여 Marp 파일 생성
   */
  mergeSlides() {
    console.log('🚀 Marp 슬라이드 통합 시작');
    console.log(`📂 슬라이드 디렉토리: ${this.slidesDir}`);
    console.log(`📄 출력 파일: ${this.outputFile}`);

    const slideFiles = this.loadSlideFiles();
    
    if (slideFiles.length === 0) {
      console.log('❌ 통합할 슬라이드 파일이 없습니다.');
      return;
    }

    // Marp 헤더로 시작
    let mergedContent = this.generateMarpHeader();

    // 각 슬라이드 파일을 순서대로 추가
    slideFiles.forEach((filename, index) => {
      console.log(`📝 처리 중: ${filename}`);
      
      const slideContent = this.readSlideContent(filename);
      
      // 첫 번째 슬라이드가 아니면 구분자 추가
      if (index > 0) {
        mergedContent += '\n---\n\n';
      }
      
      mergedContent += slideContent;
    });

    // 파일 저장
    try {
      fs.writeFileSync(this.outputFile, mergedContent, 'utf8');
      console.log(`✅ Marp 슬라이드 통합 완료!`);
      console.log(`📍 출력 파일: ${this.outputFile}`);
      console.log(`📊 총 ${slideFiles.length}개 슬라이드 통합됨`);
    } catch (error) {
      console.error('❌ 파일 저장 실패:', error.message);
    }
  }

  /**
   * 통합 실행
   */
  async run() {
    try {
      this.mergeSlides();
    } catch (error) {
      console.error('❌ 통합 과정에서 오류 발생:', error.message);
    }
  }
}

// 스크립트 실행
if (require.main === module) {
  const merger = new MarpMerger();
  merger.run();
}

module.exports = MarpMerger; 