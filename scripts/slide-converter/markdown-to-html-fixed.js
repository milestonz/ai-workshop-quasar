#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * 마크다운 슬라이드를 HTML로 변환하는 클래스 (이미지 처리 추가)
 */
class MarkdownToHTMLConverter {
  constructor() {
    this.slides = [];
    this.templatePath = path.join(__dirname, 'slide-template.html');
  }

  /**
   * 슬라이드 디렉토리에서 모든 마크다운 파일을 읽어옴
   */
  async loadSlideFiles(slidesDir) {
    try {
      const files = fs
        .readdirSync(slidesDir)
        .filter(
          (file) =>
            file.endsWith('.md') &&
            file.startsWith('slide-') &&
            file !== 'slide-all.md' &&
            file !== 'slide-timeline-template.md',
        )
        .sort((a, b) => this.sortSlideFiles(a, b));

      console.log(`📂 발견된 슬라이드 파일: ${files.length}개`);

      for (const file of files) {
        const filePath = path.join(slidesDir, file);
        const content = fs.readFileSync(filePath, 'utf8');

        this.slides.push({
          fileName: file,
          content: content.trim(),
          slideNumber: this.extractSlideNumber(file),
        });
      }

      console.log(`✅ 총 ${this.slides.length}개 슬라이드 로드 완료`);
      return this.slides;
    } catch (error) {
      console.error(`❌ 슬라이드 파일 로드 실패: ${error.message}`);
      throw error;
    }
  }

  /**
   * 슬라이드 파일명을 올바른 순서로 정렬
   */
  sortSlideFiles(a, b) {
    const extractNumbers = (filename) => {
      const match = filename.match(/slide-(\d+)-(\d+)\.md/);
      return match ? [parseInt(match[1]), parseInt(match[2])] : [0, 0];
    };

    const [aChapter, aSlide] = extractNumbers(a);
    const [bChapter, bSlide] = extractNumbers(b);

    if (aChapter !== bChapter) {
      return aChapter - bChapter;
    }
    return aSlide - bSlide;
  }

  /**
   * 파일명에서 슬라이드 번호 추출
   */
  extractSlideNumber(filename) {
    const match = filename.match(/slide-(\d+)-(\d+)\.md/);
    return match ? `${match[1]}-${match[2]}` : '0-0';
  }

  /**
   * 마크다운 내용을 HTML 슬라이드로 변환
   */
  convertSlideToHTML(slide) {
    const { content, slideNumber } = slide;

    // 슬라이드 타입 감지
    const slideType = this.detectSlideType(content);

    // 모든 슬라이드 유형은 일반 마크다운 처리 (wrapInSlideStructure 제외)
    const htmlContent = this.parseMarkdownWithoutStructure(content);

    // 슬라이드 클래스 결정
    const slideClasses = this.getSlideClasses(slideType, content);

    return {
      type: slideType,
      classes: slideClasses,
      content: htmlContent,
      slideNumber: slideNumber,
    };
  }

  /**
   * 슬라이드 타입 감지
   */
  detectSlideType(content) {
    const lowerContent = content.toLowerCase();

    if (lowerContent.includes('@cover') || lowerContent.includes('커버')) {
      return 'cover';
    }
    if (lowerContent.includes('@toc') || lowerContent.includes('목차')) {
      return 'toc';
    }
    if (lowerContent.includes('@poll') || lowerContent.includes('투표')) {
      return 'poll';
    }
    if (lowerContent.includes('@stats') || lowerContent.includes('통계')) {
      return 'stats';
    }
    if (lowerContent.includes('@interactive') || lowerContent.includes('인터랙티브')) {
      return 'interactive';
    }
    if (lowerContent.includes('@example') || lowerContent.includes('예시')) {
      return 'example';
    }
    if (lowerContent.includes('@challenge') || lowerContent.includes('도전')) {
      return 'challenge';
    }
    if (lowerContent.includes('@timeline') || lowerContent.includes('타임라인')) {
      return 'timeline';
    }
    if (lowerContent.includes('@profile') || lowerContent.includes('프로필')) {
      return 'profile';
    }
    if (lowerContent.includes('@lecture') || lowerContent.includes('강의')) {
      return 'lecture';
    }
    if (lowerContent.includes('@chapter') || lowerContent.includes('챕터')) {
      return 'chapter';
    }

    return 'general';
  }

  /**
   * 슬라이드 클래스 결정
   */
  getSlideClasses(type, content) {
    const classes = [`${type}-slide`];

    // 특별한 클래스 추가
    if (content.includes('@center')) {
      classes.push('center-content');
    }
    if (content.includes('@full')) {
      classes.push('full-slide');
    }
    if (content.includes('@dark')) {
      classes.push('dark-theme');
    }

    return classes.join(' ');
  }

  /**
   * 마크다운을 HTML로 변환
   */
  parseMarkdown(markdown) {
    let html = markdown;

    // Marp 헤더 제거 (---로 둘러싸인 YAML)
    html = html.replace(/^---\s*\n[\s\S]*?\n---\s*\n?/gm, '');

    // 슬라이드 타입 표시 제거 (@general, @cover 등)
    html = html.replace(/^@\w+\s*\n?/gm, '');

    // 코드 블록 처리 (```로 시작하는 경우)
    html = this.processCodeBlocks(html);

    // 프롬프트 예시 처리 (나쁜 예, 좋은 예, 예시 등)
    // 일반 텍스트의 "예시:"는 처리하지 않음
    if (
      !html.includes('####') &&
      !html.includes('실제 학습 과정') &&
      !html.includes('복잡한 문맥 학습') &&
      !html.includes('실제 적용 예시') &&
      !html.includes('중요한 깨달음') &&
      !html.includes('"사랑"이라는 단어 학습') &&
      !html.includes('LLM이 성경에서 "사랑"과 함께 나오는 단어들을 학습')
    ) {
      html = this.processPromptExamples(html);
    }

    // 이미 HTML 태그가 많이 포함된 경우 (div, ul, li 등이 있는 경우)
    // 마크다운 제목만 변환하고 나머지는 그대로 유지
    if (html.includes('<div') || html.includes('<ul>') || html.includes('<li>')) {
      // 제목들만 변환
      html = html.replace(/^### ([^<]+)$/gm, '<h3 style="margin-bottom: 0;">$1</h3>');
      html = html.replace(/^## ([^<]+)$/gm, '<h2>$1</h2>');
      html = html.replace(/^# ([^<]+)$/gm, '<h1>$1</h1>');
      html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');

      return this.wrapInSlideStructure(html);
    }

    // 순수 마크다운인 경우 전체 변환
    // 제목들 변환
    html = html.replace(/^### (.+)$/gm, '<h3 style="margin-bottom: 0;">$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
    html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');

    // "예시"로 시작하는 제목들도 h4로 변환
    html = html.replace(/^예시 (\d+): (.+)$/gm, '<h4>예시 $1: $2</h4>');

    // 이미지 처리 (추가됨)
    html = html.replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      '<img src="$2" alt="$1" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">',
    );

    // 강조 텍스트
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // 리스트 처리 개선
    const lines = html.split('\n');
    let inList = false;
    let processedLines = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.trim().startsWith('- ')) {
        if (!inList) {
          processedLines.push('<ul>');
          inList = true;
        }
        processedLines.push(`<li>${line.trim().substring(2)}</li>`);
      } else {
        if (inList) {
          processedLines.push('</ul>');
          inList = false;
        }
        if (line.trim() && !line.trim().startsWith('<')) {
          processedLines.push(`<p>${line.trim()}</p>`);
        } else if (line.trim()) {
          processedLines.push(line);
        }
      }
    }

    if (inList) {
      processedLines.push('</ul>');
    }

    html = processedLines.join('\n');

    // 빈 태그 제거
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<br>/g, '<br/>');

    return this.wrapInSlideStructure(html);
  }

  /**
   * 마크다운을 HTML로 변환 (구조 래핑 없이)
   */
  parseMarkdownWithoutStructure(markdown) {
    let html = markdown;

    // Marp 헤더 제거 (---로 둘러싸인 YAML)
    html = html.replace(/^---\s*\n[\s\S]*?\n---\s*\n?/gm, '');

    // 슬라이드 타입 표시 제거 (@general, @cover 등)
    html = html.replace(/^@\w+\s*\n?/gm, '');

    // 코드 블록 처리 (```로 시작하는 경우)
    html = this.processCodeBlocks(html);

    // 프롬프트 예시 처리 (나쁜 예, 좋은 예, 예시 등)
    // 일반 텍스트의 "예시:"는 처리하지 않음
    if (
      !html.includes('####') &&
      !html.includes('실제 학습 과정') &&
      !html.includes('복잡한 문맥 학습') &&
      !html.includes('실제 적용 예시') &&
      !html.includes('중요한 깨달음') &&
      !html.includes('"사랑"이라는 단어 학습') &&
      !html.includes('LLM이 성경에서 "사랑"과 함께 나오는 단어들을 학습')
    ) {
      html = this.processPromptExamples(html);
    }

    // 이미 HTML 태그가 많이 포함된 경우 (div, ul, li 등이 있는 경우)
    // 마크다운 제목만 변환하고 나머지는 그대로 유지
    if (html.includes('<div') || html.includes('<ul>') || html.includes('<li>')) {
      // 제목들만 변환
      html = html.replace(/^### ([^<]+)$/gm, '<h3 style="margin-bottom: 0;">$1</h3>');
      html = html.replace(/^## ([^<]+)$/gm, '<h2>$1</h2>');
      html = html.replace(/^# ([^<]+)$/gm, '<h1>$1</h1>');
      html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');

      return html;
    }

    // 순수 마크다운인 경우 전체 변환
    // 제목들 변환
    html = html.replace(/^### (.+)$/gm, '<h3 style="margin-bottom: 0;">$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
    html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');

    // "예시"로 시작하는 제목들도 h4로 변환
    html = html.replace(/^예시 (\d+): (.+)$/gm, '<h4>예시 $1: $2</h4>');

    // 이미지 처리 (추가됨)
    html = html.replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      '<img src="$2" alt="$1" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">',
    );

    // 강조 텍스트
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // 리스트 처리 개선
    const lines = html.split('\n');
    let inList = false;
    let processedLines = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.trim().startsWith('- ')) {
        if (!inList) {
          processedLines.push('<ul>');
          inList = true;
        }
        processedLines.push(`<li>${line.trim().substring(2)}</li>`);
      } else {
        if (inList) {
          processedLines.push('</ul>');
          inList = false;
        }
        if (line.trim() && !line.trim().startsWith('<')) {
          processedLines.push(`<p>${line.trim()}</p>`);
        } else if (line.trim()) {
          processedLines.push(line);
        }
      }
    }

    if (inList) {
      processedLines.push('</ul>');
    }

    html = processedLines.join('\n');

    // 빈 태그 제거
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<br>/g, '<br/>');

    return html;
  }

  /**
   * 코드 블록 처리 (```로 시작하는 경우)
   */
  processCodeBlocks(html) {
    return html.replace(/```([\s\S]*?)```/g, (match, code) => {
      const codeId = 'code-' + Math.random().toString(36).substr(2, 9);
      return `
        <div class="code-block">
          <div class="code-block-header">
            <span class="code-block-title">코드</span>
            <button class="copy-button" onclick="copyCode('${codeId}')">
              Copy
            </button>
          </div>
          <pre id="${codeId}">${code.trim()}</pre>
        </div>
      `;
    });
  }

  /**
   * 프롬프트 예시 처리 (나쁜 예, 좋은 예, 예시 등)
   */
  processPromptExamples(html) {
    // 나쁜 예, 좋은 예, 예시 등을 찾아서 코드 블록으로 변환
    const patterns = [
      { regex: /❌\s*나쁜\s*예[:\s]*([\s\S]*?)(?=✅|💡|$)/g, title: '❌ 나쁜 예' },
      { regex: /✅\s*좋은\s*예[:\s]*([\s\S]*?)(?=❌|💡|$)/g, title: '✅ 좋은 예' },
      { regex: /예시[:\s]*([\s\S]*?)(?=❌|✅|💡|$)/g, title: '📝 예시' },
      { regex: /💡\s*핵심\s*고려사항[:\s]*([\s\S]*?)(?=❌|✅|$)/g, title: '💡 핵심 고려사항' },
    ];

    patterns.forEach((pattern) => {
      html = html.replace(pattern.regex, (match, content) => {
        const codeId = 'code-' + Math.random().toString(36).substr(2, 9);
        return `
          <div class="code-block">
            <div class="code-block-header">
              <span class="code-block-title">${pattern.title}</span>
              <button class="copy-button" onclick="copyCode('${codeId}')">
                Copy
              </button>
            </div>
            <pre id="${codeId}">${content.trim()}</pre>
          </div>
        `;
      });
    });

    return html;
  }

  /**
   * 슬라이드 구조로 감싸기
   */
  wrapInSlideStructure(content) {
    // 이미 슬라이드 구조가 있는 경우
    if (content.includes('slide-header') || content.includes('<div style="display: flex')) {
      return content;
    }

    // 첫 번째 제목을 헤더로 추출
    const titleMatch = content.match(/<h[1-3]>([^<]+)<\/h[1-3]>/);
    const title = titleMatch ? titleMatch[1] : '';
    const bodyContent = titleMatch ? content.replace(titleMatch[0], '') : content;

    if (title) {
      return `
        <div class="slide-header">
          <h2>${title}</h2>
        </div>
        <div class="content">
          ${bodyContent}
        </div>
      `;
    }

    return `<div class="content">${content}</div>`;
  }

  /**
   * 통계 데이터를 특별한 형태로 변환
   */
  convertStatsContent(content) {
    if (!content.includes('%')) return content;

    const stats = [];
    const lines = content.split('\n');

    lines.forEach((line) => {
      const match = line.match(/#### - (.+?) : \*\*(\d+%)\*\*/);
      if (match) {
        stats.push({
          label: match[1],
          percentage: match[2],
        });
      }
    });

    if (stats.length === 0) return content;

    const statsHTML = stats
      .map(
        (stat) => `
        <div class="stat-item">
          <div class="stat-label">${stat.label}</div>
          <div class="stat-bar">
            <div class="stat-fill" style="width: ${stat.percentage}"></div>
          </div>
          <div class="stat-value">${stat.percentage}</div>
        </div>
      `,
      )
      .join('');

    return `
      <div class="stats-container">
        ${statsHTML}
      </div>
    `;
  }

  /**
   * HTML 템플릿 생성
   */
  generateHTML() {
    const slidesHTML = this.slides
      .map((slide) => {
        const htmlSlide = this.convertSlideToHTML(slide);
        return `
          <section class="slide ${htmlSlide.classes}" data-slide="${htmlSlide.slideNumber}">
            ${htmlSlide.content}
          </section>
        `;
      })
      .join('\n');

    return this.getHTMLTemplate().replace('{{SLIDES}}', slidesHTML);
  }

  /**
   * HTML 템플릿 가져오기
   */
  getHTMLTemplate() {
    return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Workshop Slides</title>
  <style>

      * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
      }

      body {
          font-family: 'Segoe UI', 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif;
          color: #333;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          position: relative;
      }

      .slide-container {
          backdrop-filter: blur(15px);
          border-radius: 25px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
          padding: 60px;
          max-width: 1000px;
          width: 100%;
          position: relative;
          z-index: 10;
          border: 1px solid rgba(255, 255, 255, 0.3);
      }

      /* 기본 텍스트 스타일 */
      p {
          font-size: 20px;
          line-height: 1.6;
          margin-bottom: 10px;
      }

      li {
          font-size: 20px;
          line-height: 1.6;
          margin-bottom: 8px;
      }

      h1, h2, h3, h4 {
          margin-bottom: 5px;
      }

      h4 {
          font-size: 24px;
          font-weight: 600;
          line-height: 1.4;
      }

      /* 코드 블록 스타일 */
.code-block-wrapper {
    position: relative;
    margin: 16px 0;
}

pre {
    background: #1e293b;
    color: #e2e8f0;
    padding: 16px;
    padding-right: 48px; /* 복사 버튼을 위한 여백 */
    border-radius: 8px;
    overflow-x: auto;
    margin: 0;
    border: 1px solid #334155;
}

.copy-button {
    position: absolute;
    top: 8px;
    right: 8px;
    background: #2563eb;
    border: none;
    color: white;
    padding: 6px 12px;
    cursor: pointer;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease;
    z-index: 10;
}

.copy-button:hover {
    background: #1d4ed8;
}

.copy-button:active {
    background: #1e40af;
}

.copy-button.copied {
    background: #059669;
}

      code {
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 14px;
          line-height: 1.5;
      }

      p code {
          background: #f1f5f9;
          color: #1e293b;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.9em;
      }

      /* 투표 옵션 스타일 */
      .poll-option {
          font-size: 20px;
          padding: 15px 20px;
          margin: 10px 0;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid transparent;
      }

      .poll-option:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
      }

      .poll-option.selected {
          background: rgba(59, 130, 246, 0.3);
          border-color: #3b82f6;
      }




          body {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }

          .slide-container {
              background: rgba(255, 255, 255, 0.95);
          }

          h1 {
              font-size: 3rem;
              color: #1e40af;
              margin-bottom: 10px;
              font-weight: 700;
              text-align: center;
          }

          h2 {
              font-size: 2.5rem;
              color: #2563eb;
              margin-bottom: 25px;
              font-weight: 600;
          }

          h3 {
              font-size: 1.8rem;
              color: #3730a3;
              margin-bottom: 8px;
              font-weight: 500;
          }


      /* 반응형 추가 스타일 */
      @media (max-width: 768px) {
          h1 { font-size: 2.2rem; }
          h2 { font-size: 1.8rem; }
          h3 { font-size: 1.4rem; }
          .slide-container { padding: 40px 25px; }
      }

      @media (max-width: 480px) {
          h1 { font-size: 1.8rem; }
          h2 { font-size: 1.4rem; }
          h3 { font-size: 1.2rem; }
          .slide-container { padding: 30px 20px; }
      }

      /* 접근성 */
      .slide-container:focus {
          outline: 3px solid #3b82f6;
          outline-offset: 5px;
      }

      /* 애니메이션 */
      @keyframes slideIn {
          from {
              opacity: 0;
              transform: translateY(20px);
          }
          to {
              opacity: 1;
              transform: translateY(0);
          }
      }

      .slide-container > * {
          animation: slideIn 0.6s ease forwards;
      }
  </style>
</head>
<body class="general-slide">
  <div class="slide-container" tabindex="0">
      {{SLIDES}}
      </div>

    <script>
      // 키보드 네비게이션
      document.addEventListener('keydown', function(e) {
          switch(e.key) {
              case 'ArrowRight':
              case ' ':
                  window.location.href = 'slide-0-17.html';
                  break;
              case 'ArrowLeft':
                  window.location.href = 'slide-0-15.html';
                  break;
              case 'Home':
                  window.location.href = 'slide-0-0.html';
                  break;
              case 'End':
                  window.location.href = 'slide-9-7.html';
                  break;
          }
      });

      // 클릭으로 다음 슬라이드 (투표 슬라이드가 아닌 경우)

      document.querySelector('.slide-container').addEventListener('click', function(e) {
          // 코드 블록 복사 버튼이나 코드 블록 자체를 클릭한 경우 슬라이드 이동 방지
          if (e.target.closest('.code-block-wrapper') || e.target.closest('.copy-button')) {
              return;
          }
          window.location.href = 'slide-0-17.html';
      });


      // 로드 애니메이션
      window.addEventListener('load', function() {
          document.body.style.opacity = '0';
          document.body.style.transition = 'opacity 0.5s ease';
          setTimeout(() => {
              document.body.style.opacity = '1';
          }, 100);
      });

            // 코드 복사 기능
                  function copyCode(button) {

      }


    </script>
</body>
</html>`;
  }

  /**
   * HTML 파일 저장
   */
  async saveHTML(outputPath) {
    try {
      const html = this.generateHTML();
      fs.writeFileSync(outputPath, html, 'utf8');
      console.log(`✅ HTML 파일 저장 완료: ${outputPath}`);
      return true;
    } catch (error) {
      console.error(`❌ HTML 파일 저장 실패: ${error.message}`);
      return false;
    }
  }

  /**
   * 변환 실행
   */
  async convert(slidesDir, outputPath) {
    try {
      console.log('🔄 슬라이드 변환 시작...');

      // 슬라이드 파일 로드
      await this.loadSlideFiles(slidesDir);

      // HTML 생성 및 저장
      const success = await this.saveHTML(outputPath);

      if (success) {
        console.log('✅ 변환 완료!');
        return true;
      } else {
        console.error('❌ 변환 실패');
        return false;
      }
    } catch (error) {
      console.error(`💥 변환 오류: ${error.message}`);
      return false;
    }
  }
}

export default MarkdownToHTMLConverter;
