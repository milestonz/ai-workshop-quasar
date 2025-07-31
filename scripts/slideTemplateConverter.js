/**
 * 슬라이드 템플릿 변환기
 * 마크다운 슬라이드를 PDF 템플릿 기반 HTML로 변환
 */

const fs = require('fs');
const path = require('path');
const marked = require('marked');

class SlideTemplateConverter {
  constructor() {
    this.templatePatterns = this.initializeTemplatePatterns();
    this.slidesDir = path.join(__dirname, '../public/slides');
    this.outputDir = path.join(__dirname, '../public/generated/slides');
    this.ensureOutputDirectory();
  }

  /**
   * PDF 템플릿 패턴 정의
   */
  initializeTemplatePatterns() {
    return {
      // 제목 페이지 (PDF 1페이지)
      titlePage: {
        pattern: /^#\s+[^#]/,
        priority: 10,
        template: 'title-page',
        description: '메인 제목 페이지'
      },
      
      // 목차 페이지 (PDF 2페이지 유형)
      tableOfContents: {
        pattern: /목차|차례|index|contents/i,
        priority: 9,
        template: 'table-of-contents',
        description: '목차 페이지'
      },
      
      // 섹션 제목 페이지 (PDF 5페이지)
      sectionTitle: {
        pattern: /^#{1,2}\s+[^#]/,
        priority: 8,
        template: 'section-title',
        description: '섹션 제목 페이지'
      },
      
      // 인용구 페이지 (PDF 10페이지)
      quote: {
        pattern: /^>\s+|".*"|'.*'|—\s*\w+/,
        priority: 7,
        template: 'quote-page',
        description: '인용구 페이지'
      },
      
      // 이미지+텍스트 페이지 (PDF 6-7페이지)
      imageWithText: {
        pattern: /!\[.*\]\(.*\)|<img/,
        priority: 6,
        template: 'image-text',
        description: '이미지가 포함된 페이지'
      },
      
      // 리스트 페이지 (PDF 12-16페이지)
      listContent: {
        pattern: /^\s*[-*+]\s+|\d+\.\s+/m,
        priority: 5,
        template: 'list-content',
        description: '리스트 콘텐츠 페이지'
      },
      
      // 차트/그래프 페이지 (PDF 22-27페이지)
      chartOrGraph: {
        pattern: /chart|graph|데이터|통계|%|차트|그래프/i,
        priority: 4,
        template: 'chart-page',
        description: '차트/그래프 페이지'
      },
      
      // 기본 텍스트 페이지 (PDF 3-4페이지)
      basicText: {
        pattern: /./,
        priority: 1,
        template: 'basic-text',
        description: '기본 텍스트 페이지'
      }
    };
  }

  /**
   * 출력 디렉토리 생성
   */
  ensureOutputDirectory() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  /**
   * 마크다운 파일 읽기
   */
  readMarkdownFile(filePath) {
    try {
      return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
      console.error(`파일 읽기 실패: ${filePath}`, error);
      return null;
    }
  }

  /**
   * 마크다운 내용 분석 및 템플릿 매칭
   */
  analyzeContent(content) {
    const analysis = {
      hasTitle: false,
      hasSubtitle: false,
      hasImage: false,
      hasQuote: false,
      hasList: false,
      hasChart: false,
      isTableOfContents: false,
      wordCount: 0,
      lineCount: 0
    };

    // 기본 분석
    analysis.wordCount = content.split(/\s+/).length;
    analysis.lineCount = content.split('\n').length;
    analysis.hasTitle = /^#\s+/.test(content);
    analysis.hasSubtitle = /^#{2,3}\s+/m.test(content);
    analysis.hasImage = /!\[.*\]\(.*\)|<img/.test(content);
    analysis.hasQuote = /^>\s+|".*"|'.*'|—\s*\w+/.test(content);
    analysis.hasList = /^\s*[-*+]\s+|\d+\.\s+/m.test(content);
    analysis.hasChart = /chart|graph|데이터|통계|%|차트|그래프/i.test(content);
    analysis.isTableOfContents = /목차|차례|index|contents/i.test(content);

    return analysis;
  }

  /**
   * 최적 템플릿 선택
   */
  selectTemplate(content, analysis) {
    let bestMatch = null;
    let highestScore = 0;

    for (const [key, pattern] of Object.entries(this.templatePatterns)) {
      let score = 0;

      // 패턴 매칭 검사
      if (pattern.pattern.test(content)) {
        score += pattern.priority;
      }

      // 추가 점수 계산
      if (key === 'titlePage' && analysis.hasTitle && !analysis.hasSubtitle) {
        score += 5;
      }
      if (key === 'tableOfContents' && analysis.isTableOfContents) {
        score += 8;
      }
      if (key === 'quote' && analysis.hasQuote) {
        score += 6;
      }
      if (key === 'imageWithText' && analysis.hasImage) {
        score += 4;
      }
      if (key === 'listContent' && analysis.hasList) {
        score += 3;
      }
      if (key === 'chartOrGraph' && analysis.hasChart) {
        score += 4;
      }

      if (score > highestScore) {
        highestScore = score;
        bestMatch = { key, pattern, score };
      }
    }

    return bestMatch || { key: 'basicText', pattern: this.templatePatterns.basicText, score: 1 };
  }

  /**
   * HTML 템플릿 생성
   */
  generateHTML(content, templateKey, slideInfo) {
    const htmlContent = marked.parse(content);
    const { lesson, slide, filename } = slideInfo;

    // 기본 Reveal.js 구조
    let html = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Slide ${lesson}-${slide}</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5.0.4/dist/reveal.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5.0.4/dist/theme/black.css">
    <style>
        ${this.getTemplateCSS(templateKey)}
    </style>
</head>
<body>
    <div class="reveal">
        <div class="slides">
            <section class="slide-${templateKey}" data-template="${templateKey}">
                ${this.applyTemplate(htmlContent, templateKey)}
            </section>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@5.0.4/dist/reveal.js"></script>
    <script>
        Reveal.initialize({
            hash: true,
            controls: true,
            progress: true,
            center: true,
            transition: 'slide',
            backgroundTransition: 'fade'
        });
    </script>
</body>
</html>`;

    return html;
  }

  /**
   * 템플릿별 CSS 스타일
   */
  getTemplateCSS(templateKey) {
    const commonCSS = `
        .reveal .slides section {
            text-align: left;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        
        .reveal h1, .reveal h2, .reveal h3 {
            color: #fff;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        
        .reveal p, .reveal li {
            font-size: 1.1rem;
            line-height: 1.6;
        }
        
        .reveal img {
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }
    `;

    const templateSpecificCSS = {
      'title-page': `
        .slide-title-page {
            text-align: center !important;
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
        }
        .slide-title-page h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        .slide-title-page h2 {
            font-size: 1.5rem;
            opacity: 0.8;
        }
      `,
      
      'section-title': `
        .slide-section-title {
            text-align: center !important;
            background: linear-gradient(135deg, #ff7b7b 0%, #667eea 100%);
        }
        .slide-section-title h1, .slide-section-title h2 {
          font-size: 2.5rem;
          text-align: center;
        }
      `,
      
      'quote-page': `
        .slide-quote-page {
          text-align: center !important;
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }
        .slide-quote-page blockquote {
          font-size: 2rem;
          font-style: italic;
          margin: 2rem 0;
          padding: 1rem 2rem;
          border-left: 5px solid #fff;
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
        }
      `,
      
      'image-text': `
        .slide-image-text {
          background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
          color: #333;
        }
        .slide-image-text img {
          max-width: 50%;
          float: right;
          margin-left: 2rem;
        }
      `,
      
      'list-content': `
        .slide-list-content ul, .slide-list-content ol {
          font-size: 1.2rem;
        }
        .slide-list-content li {
          margin-bottom: 0.5rem;
          padding-left: 0.5rem;
        }
      `,
      
      'chart-page': `
        .slide-chart-page {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          text-align: center !important;
        }
      `,
      
      'table-of-contents': `
        .slide-table-of-contents {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }
        .slide-table-of-contents ul {
          font-size: 1.3rem;
          list-style-type: none;
        }
        .slide-table-of-contents li {
          margin-bottom: 1rem;
          padding: 0.5rem 1rem;
          background: rgba(255,255,255,0.1);
          border-radius: 8px;
        }
      `,
      
      'basic-text': `
        .slide-basic-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
      `
    };

    return commonCSS + (templateSpecificCSS[templateKey] || '');
  }

  /**
   * 템플릿별 내용 적용
   */
  applyTemplate(htmlContent, templateKey) {
    switch (templateKey) {
      case 'title-page':
        return htmlContent.replace(/<h1>(.*?)<\/h1>/, '<h1>$1</h1>')
                         .replace(/<h2>(.*?)<\/h2>/, '<h2>$1</h2>');
      
      case 'quote-page':
        return htmlContent.replace(/<blockquote>(.*?)<\/blockquote>/gs, '<blockquote>$1</blockquote>');
      
      case 'image-text':
        // 이미지와 텍스트를 적절히 배치
        return htmlContent;
      
      default:
        return htmlContent;
    }
  }

  /**
   * 파일명에서 슬라이드 정보 추출
   */
  extractSlideInfo(filename) {
    const match = filename.match(/slide-(\d+)-(\d+)\.md$/);
    if (match) {
      return {
        lesson: parseInt(match[1]),
        slide: parseInt(match[2]),
        filename: filename
      };
    }
    return null;
  }

  /**
   * 단일 파일 변환
   */
  convertFile(filename) {
    const inputPath = path.join(this.slidesDir, filename);
    const slideInfo = this.extractSlideInfo(filename);
    
    if (!slideInfo) {
      console.log(`슬라이드 파일이 아님: ${filename}`);
      return false;
    }

    const content = this.readMarkdownFile(inputPath);
    if (!content) {
      return false;
    }

    // 내용 분석
    const analysis = this.analyzeContent(content);
    
    // 템플릿 선택
    const selectedTemplate = this.selectTemplate(content, analysis);
    
    console.log(`${filename} -> ${selectedTemplate.key} (점수: ${selectedTemplate.score})`);
    
    // HTML 생성
    const html = this.generateHTML(content, selectedTemplate.key, slideInfo);
    
    // 파일 저장
    const outputFilename = filename.replace('.md', '.html');
    const outputPath = path.join(this.outputDir, outputFilename);
    
    try {
      fs.writeFileSync(outputPath, html, 'utf8');
      console.log(`✓ 변환 완료: ${outputFilename}`);
      return true;
    } catch (error) {
      console.error(`파일 저장 실패: ${outputPath}`, error);
      return false;
    }
  }

  /**
   * 전체 폴더 변환
   */
  convertAll() {
    if (!fs.existsSync(this.slidesDir)) {
      console.error(`슬라이드 폴더가 없습니다: ${this.slidesDir}`);
      return;
    }

    const files = fs.readdirSync(this.slidesDir)
      .filter(file => file.match(/^slide-\d+-\d+\.md$/))
      .sort();

    console.log(`총 ${files.length}개의 슬라이드 파일을 찾았습니다.`);
    console.log('변환을 시작합니다...\n');

    let successCount = 0;
    let failCount = 0;

    files.forEach(file => {
      if (this.convertFile(file)) {
        successCount++;
      } else {
        failCount++;
      }
    });

    console.log(`\n변환 완료: 성공 ${successCount}개, 실패 ${failCount}개`);
    
    // 요약 보고서 생성
    this.generateSummaryReport(files);
  }

  /**
   * 변환 요약 보고서 생성
   */
  generateSummaryReport(files) {
    const report = {
      timestamp: new Date().toISOString(),
      totalFiles: files.length,
      templateUsage: {},
      summary: []
    };

    files.forEach(filename => {
      const inputPath = path.join(this.slidesDir, filename);
      const content = this.readMarkdownFile(inputPath);
      if (content) {
        const analysis = this.analyzeContent(content);
        const selectedTemplate = this.selectTemplate(content, analysis);
        
        if (!report.templateUsage[selectedTemplate.key]) {
          report.templateUsage[selectedTemplate.key] = 0;
        }
        report.templateUsage[selectedTemplate.key]++;
        
        report.summary.push({
          filename,
          template: selectedTemplate.key,
          score: selectedTemplate.score,
          analysis
        });
      }
    });

    const reportPath = path.join(this.outputDir, 'conversion-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
    console.log(`변환 보고서 생성: ${reportPath}`);
  }
}

// 실행 부분
if (require.main === module) {
  const converter = new SlideTemplateConverter();
  
  // 명령행 인자 처리
  const args = process.argv.slice(2);
  
  if (args.length > 0) {
    // 특정 파일만 변환
    args.forEach(filename => {
      converter.convertFile(filename);
    });
  } else {
    // 전체 변환
    converter.convertAll();
  }
}

module.exports = SlideTemplateConverter;
