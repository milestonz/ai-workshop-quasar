#!/usr/bin/env node
// npm run build-slides 을 실행하면 현재 디렉토리에 있는 slides 디렉토리에 있는 모든 마크다운 파일을 HTML로 변환하여 public/generated/slides 디렉토리에 저장한다.
// npm run server를 실행한 후, http://localhost:3000/generated/slides/index.html 에서 확인할 수 있다.
//

const fs = require('fs');
const path = require('path');

/**
 * 마크다운을 HTML로 변환하는 함수
 */
function convertMarkdownToHTML(content) {
  let lines = content.split('\n');
  let html = [];
  let inList = false;
  let listType = '';
  let inCodeBlock = false;
  let codeBlockContent = [];
  let codeBlockLanguage = '';

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let trimmedLine = line.trim();

    // 코드 블록 시작/종료 확인
    if (trimmedLine === '```' || trimmedLine.startsWith('```')) {
      if (inCodeBlock) {
        // 코드 블록 종료
        const codeContent = codeBlockContent.join('\n').trim();
        console.log('Code block content:', codeContent);
        if (codeContent) {
          if (codeBlockLanguage) {
            html.push(`
                <div class="code-block-wrapper">
                  <pre><code class="language-${codeBlockLanguage}">${codeContent}</code></pre>
                  <button class="copy-button" onclick="copyCode(this)">복사</button>
                </div>
              `);
          } else {
            html.push(`
                <div class="code-block-wrapper">
                  <pre><code>${codeContent}</code></pre>
                  <button class="copy-button" onclick="copyCode(this)">복사</button>
                </div>
              `);
          }
        } else {
          // 빈 코드 블록도 처리
          html.push('<pre><code></code></pre>');
        }
        codeBlockContent = [];
        codeBlockLanguage = '';
        inCodeBlock = false;
      } else {
        // 코드 블록 시작
        console.log('Code block started');
        if (inList) {
          html.push(`</${listType}>`);
          inList = false;
        }
        // 언어 지정이 있는 경우 추출
        codeBlockLanguage = trimmedLine.slice(3).trim();
        inCodeBlock = true;
      }
      continue;
    }

    // 코드 블록 내부 처리
    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    // 빈 줄 처리
    if (!trimmedLine) {
      if (inList) {
        html.push(`</${listType}>`);
        inList = false;
      }
      html.push('');
      continue;
    }

    // 제목 처리
    if (trimmedLine.startsWith('#### ')) {
      if (inList) {
        html.push(`</${listType}>`);
        inList = false;
      }
      html.push(`<h4>${trimmedLine.substring(5)}</h4>`);
    } else if (trimmedLine.startsWith('### ')) {
      if (inList) {
        html.push(`</${listType}>`);
        inList = false;
      }
      html.push(`<h3>${trimmedLine.substring(4)}</h3>`);
    } else if (trimmedLine.startsWith('## ')) {
      if (inList) {
        html.push(`</${listType}>`);
        inList = false;
      }
      html.push(`<h2>${trimmedLine.substring(3)}</h2>`);
    } else if (trimmedLine.startsWith('# ')) {
      if (inList) {
        html.push(`</${listType}>`);
        inList = false;
      }
      html.push(`<h1>${trimmedLine.substring(2)}</h1>`);
    }
    // 순서없는 리스트
    else if (trimmedLine.startsWith('- ')) {
      if (!inList || listType !== 'ul') {
        if (inList) html.push(`</${listType}>`);
        html.push('<ul>');
        inList = true;
        listType = 'ul';
      }
      html.push(`<li>${trimmedLine.substring(2)}</li>`);
    }
    // 순서있는 리스트 (숫자. 형태)
    else if (trimmedLine.match(/^\d+\. /)) {
      if (!inList || listType !== 'ol') {
        if (inList) html.push(`</${listType}>`);
        html.push('<ol>');
        inList = true;
        listType = 'ol';
      }
      html.push(`<li>${trimmedLine.replace(/^\d+\. /, '')}</li>`);
    }
    // 인용문
    else if (trimmedLine.startsWith('> ')) {
      if (inList) {
        html.push(`</${listType}>`);
        inList = false;
      }
      html.push(`<blockquote>${trimmedLine.substring(2)}</blockquote>`);
    }
    // 일반 텍스트
    else {
      if (inList) {
        html.push(`</${listType}>`);
        inList = false;
      }
      html.push(`<p>${trimmedLine}</p>`);
    }
  }

  if (inList) {
    html.push(`</${listType}>`);
  }

  // 텍스트 포매팅 적용
  let result = html.join('\n');

  // 강조 텍스트
  result = result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  result = result.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // 인라인 코드
  result = result.replace(/`(.*?)`/g, '<code>$1</code>');

  // 링크
  result = result.replace(/\[([^\]]*)\]\(([^)]*)\)/g, '<a href="$2" target="_blank">$1</a>');

  // 빈 paragraph 제거
  result = result.replace(/<p><\/p>/g, '');
  result = result.replace(/<p>\s*<\/p>/g, '');

  return result;
}

/**
 * 슬라이드 타입을 감지하는 함수
 */
function detectSlideType(content) {
  const lines = content.split('\n');
  const firstLine = lines[0]?.trim();

  if (firstLine && firstLine.startsWith('@')) {
    const type = firstLine.substring(1).toLowerCase();
    const validTypes = [
      'cover',
      'index',
      'chapter',
      'example',
      'poll',
      'lecture',
      'profile',
      'challenge',
      'general',
      'timeline',
    ];
    if (validTypes.includes(type)) {
      return type;
    }
  }

  // HTML div로 감싸진 것들은 특별 슬라이드
  if (content.includes('<div style="display: flex')) {
    if (content.includes('height: 80vh')) {
      if (content.includes('목회자를 위한 AI')) {
        return 'intro';
      } else if (content.includes('Why?') || content.includes('WHAT?')) {
        return 'chapter';
      } else if (content.includes('강사 소개')) {
        return 'instructor';
      } else if (content.includes('실시간 투표')) {
        return 'poll';
      }
      return 'centered';
    }
  }

  // 목차 슬라이드
  if (content.includes('📋 목차') || content.includes('목차')) {
    return 'toc';
  }

  // 투표 슬라이드
  if (content.includes('실시간 투표') || content.includes('Quick Poll')) {
    return 'poll';
  }

  // 통계 슬라이드
  if (content.includes('%') && (content.includes('목회자') || content.includes('사용'))) {
    return 'stats';
  }

  // 일반 콘텐츠 슬라이드
  return 'content';
}

/**
 * HTML 템플릿을 생성하는 함수
 */
function generateHTMLTemplate(slideData) {
  const { fileName, type, content, title } = slideData;

  // 기본 CSS 스타일
  const baseCSS = `
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


  `;

  // 타입별 특화 스타일
  let typeSpecificCSS = '';
  let bodyClass = '';

  if (type === 'cover') {
    bodyClass = 'cover-slide';
    typeSpecificCSS = `
          body {
              background: linear-gradient(135deg, #1e40af 0%, #3730a3 50%, #1d4ed8 100%);
              color: white;
              overflow: hidden;
              height: 100vh;
          }

          .slide-container {
              background: rgba(255, 255, 255, 0.05);
              text-align: center;
          }

          h1 {
              font-size: 4rem;
              font-weight: 800;
              margin-bottom: 10px;
              text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
              animation: fadeInUp 1.2s ease;
              line-height: 1.2;
          }

          h2 {
              font-size: 2.5rem;
              font-weight: 600;
              margin-bottom: 30px;
              color: #dbeafe;
              animation: fadeInUp 1.2s ease 0.3s both;
          }

          h3 {
              font-size: 2rem;
              font-weight: 400;
              margin-bottom: 20px;
              color: #bfdbfe;
              animation: fadeInUp 1.2s ease 0.6s both;
          }

          @keyframes fadeInUp {
              from {
                  opacity: 0;
                  transform: translateY(40px);
              }
              to {
                  opacity: 1;
                  transform: translateY(0);
              }
          }
      `;
  } else if (type === 'poll') {
    bodyClass = 'poll-slide';
    typeSpecificCSS = `
          body {
              background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%);
              color: #92400e;
          }

          .slide-container {
              background: rgba(255, 255, 255, 0.95);
              text-align: center;
          }

          h2 {
              font-size: 2.5rem;
              color: #b45309;
              margin-bottom: 20px;
              font-weight: 700;
          }

          h3 {
              font-size: 1.8rem;
              color: #d97706;
              margin-bottom: 40px;
              font-weight: 600;
              line-height: 1.4;
          }
      `;
  } else {
    // general 기본
    bodyClass = 'general-slide';
    typeSpecificCSS = `
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
              margin-bottom: 20px;
              font-weight: 500;
          }
      `;
  }

  return { baseCSS, typeSpecificCSS, bodyClass };
}

/**
 * 완전한 HTML 파일을 생성하는 함수
 */
function generateCompleteHTML(slideData) {
  const { fileName, type, content, title } = slideData;
  const { baseCSS, typeSpecificCSS, bodyClass } = generateHTMLTemplate(slideData);

  // 네비게이션 로직
  const slideMatch = fileName.match(/slide-(\d+)-(\d+)\.md/);
  const chapter = slideMatch ? parseInt(slideMatch[1]) : 0;
  const slide = slideMatch ? parseInt(slideMatch[2]) : 0;

  function getNextSlide() {
    // 다음 슬라이드 로직 (임시)
    if (slide < 20) {
      // 최대 슬라이드 수 가정
      return `slide-${chapter}-${slide + 1}.html`;
    } else if (chapter < 9) {
      return `slide-${chapter + 1}-0.html`;
    }
    return null;
  }

  function getPrevSlide() {
    if (slide > 0) {
      return `slide-${chapter}-${slide - 1}.html`;
    } else if (chapter > 0) {
      return `slide-${chapter - 1}-0.html`; // 이전 챕터의 마지막 슬라이드로 (간단화)
    }
    return null;
  }

  const nextSlide = getNextSlide();
  const prevSlide = getPrevSlide();

  // HTML 내용 변환
  const htmlContent = convertMarkdownToHTML(content);

  // 특별한 처리 (투표 슬라이드용)
  let processedContent = htmlContent;
  if (type === 'poll') {
    // 투표 옵션을 특별한 형태로 변환
    processedContent = convertPollContent(htmlContent);
  }

  const html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title || '목회자를 위한 AI 활용 시나리오'}</title>
  <style>
      ${baseCSS}
      ${typeSpecificCSS}

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
<body class="${bodyClass}">
  <div class="slide-container" tabindex="0">
      ${processedContent}
      </div>

    <script>
      // 키보드 네비게이션
      document.addEventListener('keydown', function(e) {
          switch(e.key) {
              case 'ArrowRight':
              case ' ':
                  ${nextSlide ? `window.location.href = '${nextSlide}';` : '// 마지막 슬라이드'}
                  break;
              case 'ArrowLeft':
                  ${prevSlide ? `window.location.href = '${prevSlide}';` : '// 첫 번째 슬라이드'}
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
      ${
        type !== 'poll'
          ? `
      document.querySelector('.slide-container').addEventListener('click', function(e) {
          // 코드 블록 복사 버튼이나 코드 블록 자체를 클릭한 경우 슬라이드 이동 방지
          if (e.target.closest('.code-block-wrapper') || e.target.closest('.copy-button')) {
              return;
          }
          ${nextSlide ? `window.location.href = '${nextSlide}';` : ''}
      });
      `
          : ''
      }

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

      ${
        type === 'poll'
          ? `
      // 투표 기능
      let hasVoted = false;
      document.querySelectorAll('.poll-option').forEach(option => {
          option.addEventListener('click', function() {
              if (hasVoted) return;
              document.querySelectorAll('.poll-option').forEach(opt => opt.classList.remove('selected'));
              this.classList.add('selected');
              hasVoted = true;
              console.log('투표 완료:', this.textContent);
          });
      });
      `
          : ''
      }
    </script>
</body>
</html>`;

  return html;
}

/**
 * 투표 콘텐츠 특별 처리
 */
function convertPollContent(htmlContent) {
  // 숫자로 시작하는 리스트를 투표 옵션으로 변환
  let content = htmlContent;

  content = content.replace(/<ol>(.*?)<\/ol>/s, (match, listContent) => {
    const items = listContent.match(/<li>(.*?)<\/li>/g);
    if (items) {
      const pollOptions = items
        .map((item, index) => {
          const text = item.replace(/<\/?li>/g, '');
          return `
              <div class="poll-option" data-vote="${index + 1}" tabindex="0">
                  <span class="poll-number">${index + 1}</span>
                  ${text}
              </div>`;
        })
        .join('');

      return `<div class="poll-options">${pollOptions}</div>`;
    }
    return match;
  });

  return content;
}

/**
 * 메인 빌드 함수
 */
function buildSlides(inputDir, outputDir) {
  console.log('🚀 슬라이드 빌드 시작');
  console.log(`📂 입력 디렉토리: ${inputDir}`);
  console.log(`📂 출력 디렉토리: ${outputDir}`);

  // 출력 디렉토리가 없으면 생성
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`📁 출력 디렉토리 생성: ${outputDir}`);
  }

  // 입력 디렉토리에서 모든 .md 파일 읽기
  const files = fs
    .readdirSync(inputDir)
    .filter((file) => file.endsWith('.md'))
    .sort();

  console.log(`📄 발견된 슬라이드 파일: ${files.length}개`);

  let successCount = 0;
  let failCount = 0;

  // 각 파일을 HTML로 변환
  files.forEach((file) => {
    try {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, file.replace('.md', '.html'));

      // 마크다운 파일 읽기
      const content = fs.readFileSync(inputPath, 'utf8');

      // 슬라이드 타입 감지
      const type = detectSlideType(content);

      // 제목 추출 (첫 번째 # 제목)
      const titleMatch = content.match(/^# (.+)$/m);
      const title = titleMatch ? titleMatch[1] : '목회자를 위한 AI 활용 시나리오';

      // @ 타입 표시 제거
      const cleanContent = content.replace(/^@\w+\s*\n?/gm, '');

      // HTML 생성
      const slideData = {
        fileName: file,
        type: type,
        content: cleanContent,
        title: title,
      };

      const html = generateCompleteHTML(slideData);

      // HTML 파일 저장
      fs.writeFileSync(outputPath, html, 'utf8');

      console.log(`✅ ${file} → ${file.replace('.md', '.html')} (${type})`);
      successCount++;
    } catch (error) {
      console.error(`❌ ${file} 변환 실패:`, error.message);
      failCount++;
    }
  });

  console.log('\n🎉 빌드 완료!');
  console.log(`✅ 성공: ${successCount}개`);
  console.log(`❌ 실패: ${failCount}개`);
  console.log(`📍 출력 디렉토리: ${outputDir}`);
}

// 명령행 인자 처리
const args = process.argv.slice(2);

if (args.length !== 2) {
  console.log('사용법: node build-slides.js <입력디렉토리> <출력디렉토리>');
  console.log('예시: node build-slides.js ../public/slides ../public/generated/slides');
  process.exit(1);
}

const [inputDir, outputDir] = args;

// 빌드 실행
buildSlides(inputDir, outputDir);
