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
  // @html 타입인 경우 HTML 내용을 그대로 반환
  if (content.trim().startsWith('@html')) {
    // @html 태그만 제거하고 HTML 내용은 그대로 유지
    return content.replace(/^@html\s*\n?/gm, '').trim();
  }

  let lines = content.split('\n');
  let html = [];
  let inList = false;
  let listType = '';
  let inCodeBlock = false;
  let codeBlockContent = [];
  let codeBlockLanguage = '';
  // 트리플 쿼트 박스 처리용
  let inQuoteBox = false;
  let quoteBoxLines = [];

  // 테이블 유틸
  const isTableHeader = (line, next) => {
    if (!line || !next) return false;
    const header = line.trim();
    const sep = next.trim();
    const headerPattern = /^\|?(?:[^|\n]+\|)+[^|\n]*\|?$/; // 파이프로 구분된 셀
    const sepPattern = /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/; // ---, :---, ---:, :---:
    return headerPattern.test(header) && sepPattern.test(sep);
  };
  const splitCells = (line) => {
    let s = line.trim();
    if (s.startsWith('|')) s = s.slice(1);
    if (s.endsWith('|')) s = s.slice(0, -1);
    return s.split('|').map((c) => c.trim());
  };
  const parseAligns = (sepLine) => {
    return splitCells(sepLine).map((tok) => {
      const t = tok.replace(/\s+/g, '');
      if (t.startsWith(':') && t.endsWith(':')) return 'center';
      if (t.endsWith(':')) return 'right';
      if (t.startsWith(':')) return 'left';
      return 'left';
    });
  };

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let trimmedLine = line.trim();

    // 트리플 쿼트 박스 시작/종료 확인 (""" ... """)
    if (trimmedLine === '"""') {
      if (inQuoteBox) {
        // 박스 종료 → HTML로 출력
        if (inList) {
          html.push(`</${listType}>`);
          inList = false;
        }
        const dialogHtml = quoteBoxLines
          .map((l) => {
            if (!l.trim()) return '';
            const withSpeaker = l.replace(/^(\S{1,12}):\s*/, '<strong>$1:</strong> ');
            return `<p>${withSpeaker}</p>`;
          })
          .join('\n');
        html.push(`<div class="dialog-box">${dialogHtml}</div>`);
        quoteBoxLines = [];
        inQuoteBox = false;
      } else {
        // 박스 시작
        if (inList) {
          html.push(`</${listType}>`);
          inList = false;
        }
        inQuoteBox = true;
        quoteBoxLines = [];
      }
      continue;
    }

    // 박스 내부 수집
    if (inQuoteBox) {
      quoteBoxLines.push(line);
      continue;
    }

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

    // 테이블 감지 및 변환
    if (i + 1 < lines.length && isTableHeader(lines[i], lines[i + 1])) {
      if (inList) {
        html.push(`</${listType}>`);
        inList = false;
      }
      const headers = splitCells(lines[i]);
      const aligns = parseAligns(lines[i + 1]);
      html.push('<table class="md-table">');
      html.push('<thead><tr>');
      headers.forEach((h, idx) => {
        html.push(`<th style="text-align:${aligns[idx] || 'left'}">${h}</th>`);
      });
      html.push('</tr></thead>');
      html.push('<tbody>');
      i += 2; // 데이터 행 시작
      while (i < lines.length) {
        const row = lines[i].trim();
        const rowPattern = /^\|?(?:[^|\n]*\|)+[^|\n]*\|?$/;
        if (!rowPattern.test(row)) break;
        const cells = splitCells(row);
        html.push('<tr>');
        cells.forEach((c, idx) => {
          html.push(`<td style="text-align:${aligns[idx] || 'left'}">${c}</td>`);
        });
        html.push('</tr>');
        i++;
      }
      html.push('</tbody></table>');
      i--; // for-loop 증가 보정
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
      // # 문자 제거
      const titleText = trimmedLine.substring(5).replace(/#/g, '');
      html.push(`<h4>${titleText}</h4>`);
    } else if (trimmedLine.startsWith('### ')) {
      if (inList) {
        html.push(`</${listType}>`);
        inList = false;
      }
      // # 문자 제거
      const titleText = trimmedLine.substring(4).replace(/#/g, '');
      html.push(`<h3>${titleText}</h3>`);
    } else if (trimmedLine.startsWith('## ')) {
      if (inList) {
        html.push(`</${listType}>`);
        inList = false;
      }
      // # 문자 제거
      const titleText = trimmedLine.substring(3).replace(/#/g, '');
      html.push(`<h2>${titleText}</h2>`);
    } else if (trimmedLine.startsWith('# ')) {
      if (inList) {
        html.push(`</${listType}>`);
        inList = false;
      }
      // # 문자 제거
      const titleText = trimmedLine.substring(2).replace(/#/g, '');
      html.push(`<h1>${titleText}</h1>`);
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

      // URL 전용 라인 처리 (http:// 또는 https://로 시작하는 라인)
      if (trimmedLine.match(/^https?:\/\//)) {
        html.push(
          `<p><a href="${trimmedLine}" target="_blank" rel="noopener noreferrer" class="url-link">${trimmedLine}</a></p>`,
        );
      } else {
        // 문단 내 URL 자동 링크 처리
        const linkedLine = trimmedLine.replace(
          /(https?:\/\/[^\s<]+)/g,
          '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>',
        );
        html.push(`<p>${linkedLine}</p>`);
      }
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

  // 이미지 처리
  result = result.replace(
    /!\[([^\]]*)\]\(([^)]*)\)/g,
    '<img src="$2" alt="$1" class="slide-image" />',
  );

  // 링크
  result = result.replace(
    /\[([^\]]*)\]\(([^)]*)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
  );

  // 일반 URL 자동 링크 (간단한 오토링크)
  result = result.replace(
    /(^|\s)((https?:\/\/)[^\s<]+)(?=$|\s)/g,
    '$1<a href="$2" target="_blank" rel="noopener noreferrer">$2</a>',
  );

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

  // 이미지가 포함된 슬라이드인지 확인
  const hasImage = content.includes('![') && content.includes('](');

  if (firstLine && firstLine.startsWith('@')) {
    const type = firstLine.substring(1).toLowerCase();
    const validTypes = [
      'html',
      'cover',
      'index',
      'chapter',
      'example',
      'poll',
      'lecture',
      'challenge',
      'general',
      'timeline',
      'quiz',
    ];
    if (validTypes.includes(type)) {
      return type;
    }
  }

  // 사용자 요청: quiz 인식은 첫 줄 '@quiz'만 사용. 자동 감지는 비활성화

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
          border-radius: 8px;
          overflow: hidden;
          background: #1e293b;
          border: 1px solid #334155;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      pre {
          background: #1e293b;
          color: #e2e8f0;
          padding: 16px;
          padding-right: 48px; /* 복사 버튼을 위한 여백 */
          border-radius: 8px;
          overflow-x: auto;
          margin: 0;
          border: none;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 14px;
          line-height: 1.5;
          white-space: pre-wrap;
          word-wrap: break-word;
      }

      .copy-button {
          position: absolute;
          top: 8px;
          right: 8px;
          background: #3b82f6;
          border: none;
          color: white;
          padding: 6px 12px;
          cursor: pointer;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
          transition: all 0.2s ease;
          z-index: 10;
      }

      .copy-button:hover { background: #2563eb; transform: translateY(-1px); box-shadow: 0 2px 4px rgba(0,0,0,.2); }
      .copy-button:active { background: #1e40af; transform: translateY(0); }
      .copy-button.copied { background: #10b981; }

      code { font-family: 'Monaco','Menlo','Ubuntu Mono',monospace; font-size: 14px; line-height: 1.5; }
      p code { background: #f1f5f9; color: #1e293b; padding: 2px 6px; border-radius: 4px; font-size: .9em; }

      /* 마크다운 테이블 기본 스타일 */
      .md-table { width: 100%; border-collapse: collapse; margin: 16px 0; background: #fff; }
      .md-table th, .md-table td { border: 1px solid #e5e7eb; padding: 10px 12px; font-size: 16px; }
      .md-table thead th { background: #f8fafc; font-weight: 700; }
      .md-table tbody tr:nth-child(even) { background: #f9fafb; }

      /* 대화 박스(""" ... """) */
      .dialog-box {
        background: #ffffff;
        border: 2px solid #e5e7eb;
        border-left: 6px solid #3b82f6;
        border-radius: 12px;
        padding: 16px 18px;
        margin: 16px 0;
        box-shadow: 0 6px 18px rgba(0,0,0,.06);
      }
      .dialog-box p { margin: 6px 0; line-height: 1.6; }

      /* 이미지 스타일링 */
      .slide-image { max-width:100%; height:auto; border-radius:12px; box-shadow: 0 8px 25px rgba(0,0,0,.15); margin:20px auto; display:block; transition: transform .3s ease, box-shadow .3s ease; }
      .slide-image:hover { transform: scale(1.02); box-shadow: 0 12px 35px rgba(0,0,0,.2); }

      .image-slide { text-align:center; }
      .image-slide h1 { margin-bottom:30px; }
      .image-slide h2 { margin-bottom:25px; color:#666; }

      /* 투표 옵션 기본(비-poll 템플릿 보완) */
      .poll-option { font-size:20px; padding:15px 20px; margin:10px 0; border-radius:10px; cursor:pointer; transition:all .3s ease; background:rgba(255,255,255,.1); border:2px solid transparent; }
      .poll-option:hover { background:rgba(255,255,255,.2); transform: translateY(-2px); }
      .poll-option.selected { background: rgba(59,130,246,.3); border-color:#3b82f6; }

      /* URL 링크 스타일 */
      .url-link {
        display: inline-block;
        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
        color: white !important;
        padding: 12px 20px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 600;
        font-size: 16px;
        margin: 8px 0;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        word-break: break-all;
      }
      .url-link:hover {
        background: linear-gradient(135deg, #2563eb, #1e40af);
        transform: translateY(-2px);
        box-shadow: 0 6px 18px rgba(59, 130, 246, 0.4);
        text-decoration: none;
        color: white !important;
      }
      .url-link:active {
        transform: translateY(0);
      }

  `;

  // poll 전용 CSS(요청안 반영)
  const providedPollCSS = `
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI','Malgun Gothic','Apple SD Gothic Neo',sans-serif; background: linear-gradient(135deg,#fbbf24 0%,#f59e0b 50%,#d97706 100%); color:#92400e; min-height:100vh; display:flex; align-items:center; justify-content:center; padding:20px; position:relative; }
        body::before { content:''; position:absolute; inset:0; background: radial-gradient(circle at 25% 25%, rgba(255,255,255,.2) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(251,191,36,.3) 0%, transparent 50%); z-index:1; }
        .slide-container { background: rgba(255,255,255,.95); backdrop-filter: blur(15px); border-radius:25px; box-shadow: 0 25px 50px rgba(0,0,0,.15); padding:50px; max-width:900px; width:100%; position:relative; z-index:10; border:1px solid rgba(255,255,255,.3); text-align:center; }
        .slide-container::before { content:''; position:absolute; top:0; left:0; right:0; height:6px; background: linear-gradient(90deg,#fbbf24,#f59e0b,#d97706); border-radius:25px 25px 0 0; }
        .poll-icon { font-size:4rem; margin-bottom:20px; color:#f59e0b; animation: bounce 2s infinite; }
        @keyframes bounce { 0%,20%,50%,80%,100%{transform:translateY(0);} 40%{transform:translateY(-10px);} 60%{transform:translateY(-5px);} }
        h2 { font-size:2.5rem; color:#b45309; margin-bottom:20px; font-weight:700; }
        h3 { font-size:1.8rem; color:#d97706; margin-bottom:40px; font-weight:600; line-height:1.4; }
        .poll-options { display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:20px; margin:40px 0; }
        .poll-option { background: linear-gradient(135deg,#ffffff 0%,#fef3c7 100%); padding:25px 20px; border-radius:20px; border:3px solid transparent; cursor:pointer; transition: all .4s ease; font-weight:600; font-size:1.1rem; box-shadow: 0 8px 25px rgba(0,0,0,.1); position:relative; overflow:hidden; color:#92400e; }
        .poll-option::before { content:''; position:absolute; top:0; left:-100%; width:100%; height:100%; background: linear-gradient(90deg, transparent, rgba(251,191,36,.3), transparent); transition:left .6s ease; }
        .poll-option:hover { border-color:#f59e0b; transform: translateY(-8px) scale(1.03); box-shadow: 0 15px 35px rgba(245,158,11,.3); }
        .poll-option:hover::before { left:100%; }
        .poll-option.selected { background: linear-gradient(135deg,#fbbf24 0%,#f59e0b 100%); color:white; border-color:#d97706; transform: scale(1.05); box-shadow: 0 15px 35px rgba(245,158,11,.4); }
        .poll-number { display:inline-block; width:35px; height:35px; background:#f59e0b; color:white; border-radius:50%; line-height:35px; font-weight:bold; margin-right:15px; box-shadow: 0 4px 10px rgba(0,0,0,.2); }
        .poll-option.selected .poll-number { background:white; color:#f59e0b; }
        .poll-footer { margin-top:40px; font-size:1.1rem; color:#b45309; font-style: italic; }
        .voting-status { margin-top:30px; padding:20px; background: rgba(251,191,36,.1); border-radius:15px; border:2px dashed #f59e0b; font-size:1.2rem; font-weight:600; color:#d97706; }
        .nav-hint { position: fixed; bottom:30px; right:30px; background: rgba(245,158,11,.9); color:white; padding:12px 20px; border-radius:25px; font-size:.9rem; z-index:1000; backdrop-filter: blur(10px); box-shadow: 0 5px 15px rgba(0,0,0,.2); }
        @media (max-width: 768px) { .slide-container{ padding:40px 25px; } h2{ font-size:2rem; } h3{ font-size:1.4rem; } .poll-options{ grid-template-columns:1fr; gap:15px; } .poll-option{ padding:20px 15px; font-size:1rem; } .poll-number{ width:30px; height:30px; line-height:30px; margin-right:10px; } }
        @media (max-width: 480px) { .slide-container{ padding:30px 20px; } h2{ font-size:1.6rem; } h3{ font-size:1.2rem; } .poll-option{ padding:18px 12px; font-size:.95rem; } }
        .poll-option:focus { outline:3px solid #f59e0b; outline-offset:3px; }
        @keyframes voteSubmit { 0%{transform:scale(1);} 50%{transform:scale(1.1);} 100%{transform:scale(1);} }
        .poll-option.voted { animation: voteSubmit .6s ease; }
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

          .slide-container { background: rgba(255, 255, 255, 0.05); text-align: center; }

          h1 { font-size: 3rem; font-weight: 800; margin-bottom: 10px; text-shadow: 2px 2px 8px rgba(0,0,0,.3); animation: fadeInUp 1.2s ease; line-height: 1.2; }
          h2 { font-size: 2.5rem; font-weight: 600; margin-bottom: 10px; color: #dbeafe; animation: fadeInUp 1.2s ease .3s both; }
          h3 { font-size: 2rem; font-weight: 400; margin-bottom: 10px; color: #bfdbfe; animation: fadeInUp 1.2s ease .6s both; }

          @keyframes fadeInUp { from { opacity:0; transform: translateY(40px);} to { opacity:1; transform: translateY(0);} }
      `;
  } else if (type === 'poll') {
    bodyClass = 'poll-slide';
    // slide-0-3 ~ slide-0-6에 대해 제공된 CSS 우선 적용
    const isChapter0 = /slide-0-([3-6])\.md$/.test(fileName);
    typeSpecificCSS = isChapter0
      ? providedPollCSS
      : `
          body { background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%); color:#92400e; }
          .slide-container { background: rgba(255,255,255,.95); text-align:center; }
          h2 { font-size:2.5rem; color:#b45309; margin-bottom:10px; font-weight:700; }
          h3 { font-size:1.8rem; color:#d97706; margin-bottom:10px; font-weight:600; line-height:1.4; }
      `;
  } else if (type === 'challenge') {
    bodyClass = 'challenge-slide';
    typeSpecificCSS = `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: white;
            color: #333;
            height: 100vh;
            padding: 60px 40px;
            overflow-y: auto;
        }

        .slide-container {
            background: transparent;
            backdrop-filter: none;
            border-radius: 0;
            box-shadow: none;
            padding: 0;
            max-width: none;
            width: 100%;
            position: relative;
            z-index: 10;
            border: none;
        }

        .slide-header {
            background: linear-gradient(135deg, #003366, #005A9C);
            color: white;
            padding: 30px 20px;
            margin: -60px -40px 40px -40px;
            position: relative;
            text-align: center;
        }

        .slide-header::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 0;
            right: 0;
            height: 10px;
            background: linear-gradient(90deg, #ffd700, #ffed4e);
        }

        .challenge-badge {
            background: #ff6b6b;
            color: white;
            padding: 8px 20px;
            border-radius: 25px;
            font-size: 1em;
            font-weight: bold;
            display: inline-block;
            margin-bottom: 15px;
            box-shadow: 0 4px 15px rgba(255,107,107,0.3);
        }

        h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            font-weight: bold;
        }

        .time-badge {
            background: rgba(255,255,255,0.2);
            padding: 5px 15px;
            border-radius: 15px;
            font-size: 1em;
            margin-top: 10px;
            display: inline-block;
        }

        .content {
            max-width: 1000px;
            margin: 0 auto;
            text-align: left;
        }

        .workflow-container {
            display: grid;
            grid-template-columns: 1fr auto 1fr auto 1fr;
            gap: 20px;
            align-items: center;
            margin: 40px 0;
            padding: 30px;
            background: linear-gradient(135deg, #f8f9fa, #e9ecef);
            border-radius: 15px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }

        .workflow-step {
            text-align: center;
            padding: 25px 15px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            position: relative;
        }

        .workflow-step:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        .workflow-step.input {
            border-top: 4px solid #4ECDC4;
        }

        .workflow-step.ai-tool {
            border-top: 4px solid #FF6B6B;
        }

        .workflow-step.output {
            border-top: 4px solid #45B7D1;
        }

        .step-icon {
            font-size: 2.5em;
            margin-bottom: 15px;
            display: block;
        }

        .step-title {
            font-size: 1.1em;
            font-weight: bold;
            color: #003366;
            margin-bottom: 10px;
        }

        .step-content {
            font-size: 0.95em;
            color: #666;
            line-height: 1.5;
        }

        .ai-highlight {
            background: linear-gradient(135deg, #FF6B6B, #FF8E8E);
            color: white;
            padding: 8px 15px;
            border-radius: 20px;
            font-weight: bold;
            display: inline-block;
            margin-top: 5px;
        }

        .workflow-arrow {
            font-size: 2em;
            color: #005A9C;
            text-align: center;
            animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
        }

        .practice-section {
            background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
            padding: 25px;
            border-radius: 15px;
            border-left: 6px solid #2e7d32;
            margin-top: 30px;
            position: relative;
        }

        .practice-section::before {
            content: '💡';
            font-size: 1.8em;
            position: absolute;
            top: -15px;
            left: 25px;
            background: white;
            padding: 0 10px;
        }

        .practice-title {
            font-size: 1.3em;
            font-weight: bold;
            color: #2e7d32;
            margin-bottom: 15px;
            margin-left: 25px;
        }

        .practice-content {
            font-size: 1.1em;
            color: #1b5e20;
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .qr-visual {
            background: #fff;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            font-size: 2em;
            min-width: 60px;
            text-align: center;
        }



        @media (max-width: 768px) {
            body {
                padding: 40px 20px;
            }

            .slide-header {
                margin: -40px -20px 30px -20px;
                padding: 25px 15px;
            }

            h1 {
                font-size: 1.8em;
            }

            .workflow-container {
                grid-template-columns: 1fr;
                gap: 15px;
                padding: 20px;
            }

            .workflow-arrow {
                transform: rotate(90deg);
                margin: 0;
            }

            .application-content {
                flex-direction: column;
                text-align: center;
            }

            .benefits-list {
                grid-template-columns: 1fr;
            }
        }
    `;
  } else {
    // quiz 전용
    if (type === 'quiz') {
      bodyClass = 'quiz-slide';
      typeSpecificCSS = `
          body { background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%); }
          .slide-container { background: #fff; }
          .quiz-question { font-size: 1.6rem; font-weight: 700; color: #1f2937; margin-bottom: 20px; }
          .quiz-options { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px; margin: 20px 0; }
          .quiz-option { border: 2px solid #e5e7eb; border-radius: 12px; padding: 14px 16px; cursor: pointer; background: #fafafa; transition: all .25s ease; font-weight: 600; color:#111827; }
          .quiz-option:hover { border-color:#6366f1; background:#eef2ff; transform: translateY(-2px); }
          .quiz-option.correct { border-color:#10b981; background: #ecfdf5; }
          .quiz-option.incorrect { border-color:#ef4444; background:#fef2f2; }
          .quiz-answer { display:none; margin-top: 14px; padding: 12px; border-radius: 10px; background: #f9fafb; border:1px solid #e5e7eb; }
          .quiz-toast { position: fixed; bottom: 24px; right: 24px; background:#111827; color:#fff; padding:10px 14px; border-radius:8px; box-shadow: 0 8px 20px rgba(0,0,0,.2); z-index: 2000; }
      `;
    } else {
      // general 기본
      bodyClass = 'general-slide';
      typeSpecificCSS = `
          body { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
          .slide-container { background: rgba(255, 255, 255, 0.95); }
          h1 { font-size: 3rem; color: #1e40af; margin-bottom: 10px; font-weight: 700; text-align: center; }
          h2 { font-size: 2.5rem; color: #2563eb; margin-bottom: 25px; font-weight: 600; }
          h3 { font-size: 1.8rem; color: #3730a3; margin-bottom: 8px; font-weight: 500; }
      `;
    }
  }

  return { baseCSS, typeSpecificCSS, bodyClass };
}

/**
 * 완전한 HTML 파일을 생성하는 함수
 */
function generateCompleteHTML(slideData) {
  const { fileName, type, content, title } = slideData;

  // html 타입은 원본 HTML을 그대로 반환 (템플릿/파싱 적용 금지)
  if (type === 'html') {
    return content.trim();
  }
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

  // 특별한 처리 (투표/퀴즈/챌린지 슬라이드용)
  let processedContent = htmlContent;
  let hasFreeInput = false;

  // Challenge 슬라이드용 특별 처리
  if (type === 'challenge') {
    const challengeContent = convertChallengeContent(htmlContent, content);
    processedContent = challengeContent;
  } else if (type === 'poll') {
    const result = convertPollContent(htmlContent, content);
    processedContent = result.html;
    hasFreeInput = result.free;
    // 제목 중복 방지: 기존 콘텐츠에 이미 '실시간 투표' 제목이 있으면 자동 제목 추가 생략
    const hasPollTitle = /<h[12][^>]*>[^<]*(실시간\s*투표|Quick\s*Poll)[^<]*<\/h[12]>/i.test(
      htmlContent,
    );
    const headerHtml = `
      <div class="poll-icon">🗳️</div>
    `;
    processedContent = `${headerHtml}
      ${hasPollTitle ? '' : '<h2>실시간 투표(Quick Poll)</h2>'}
      ${processedContent}`;
  }

  // 퀴즈: '---' 위는 질문/선택지, 아래는 정답/해설
  if (type === 'quiz') {
    const lines = content.split(/\r?\n/);
    const delimIndex = lines.findIndex((ln) => ln.trim().match(/^---\s*$/));
    const before = delimIndex >= 0 ? lines.slice(0, delimIndex) : lines.slice();
    const after = delimIndex >= 0 ? lines.slice(delimIndex + 1) : [];

    const questionLines = [];
    const optionLines = [];
    for (const raw of before) {
      const t = (raw || '').trim();
      if (!t) continue;
      if (
        /^[-*+]\s+/.test(t) ||
        /^\d+[\.)]\s+/.test(t) ||
        /^[A-Da-d][\.)]\s+/.test(t) ||
        /^(O|X)\s*[-–:]?\s+/i.test(t)
      ) {
        const cleaned = t
          .replace(/^[-*+]\s+/, '')
          .replace(/^\d+[\.)]\s+/, '')
          .replace(/^[A-Da-d][\.)]\s+/, '')
          .replace(/^(O|X)\s*[-–:]?\s+/i, '')
          .trim();
        if (cleaned) optionLines.push(cleaned);
      } else {
        questionLines.push(t.replace(/^#{1,6}\s*/, ''));
      }
    }

    const answerRaw = after
      .map((s) => s.trim())
      .filter(Boolean)
      .join('\n');

    const questionHtml = questionLines.map((p) => `<p>${p}</p>`).join('');
    const optionsHtml = optionLines
      .map((op, idx) => `<div class="quiz-option" data-idx="${idx + 1}">${idx + 1}. ${op}</div>`)
      .join('');

    processedContent = `
      <div class="quiz-question">${questionHtml}</div>
      <div class="quiz-options">${optionsHtml}</div>
      <div id="quiz-answer" class="quiz-answer"></div>
      <div id="quiz-answer-data" style="display:none">${answerRaw}</div>
    `;
  }

  const extraScript = '';

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

      /* 슬라이드 번호 스타일 */
      .slide-number { position: fixed; bottom: 20px; right: 20px; background: rgba(0,0,0,.7); color:#fff; padding:8px 12px; border-radius:20px; font-size:14px; z-index:1000; }

      /* 자유 입력 필드 (poll) */
      .poll-free { margin: 30px 0; display:flex; gap:10px; justify-content:center; }
      .poll-free input[type="text"], .poll-free textarea { width: 100%; max-width: 520px; padding: 14px 16px; border-radius: 12px; border: 2px solid #f59e0b; font-size: 1rem; }
      .poll-free button { padding: 12px 18px; border-radius: 12px; border: 0; background:#f59e0b; color:white; font-weight:700; cursor:pointer; }
  </style>
</head>
<body class="${bodyClass}">
  <div class="slide-container" tabindex="0">
      ${processedContent}
  </div>

  <div class="slide-number" id="slideNumber"></div>

    <script>
      // 키보드 네비게이션 → 부모로 전달하여 앱 라우팅과 동기화
      document.addEventListener('keydown', function(e) {
          switch(e.key) {
              case 'ArrowRight':
              case 'ArrowDown':
              case 'PageDown':
              case ' ': // Space
                  try { window.parent && window.parent.postMessage({ type: 'slide-next' }, '*'); } catch(_) {}
                  break;
              case 'ArrowLeft':
              case 'ArrowUp':
              case 'PageUp':
                  try { window.parent && window.parent.postMessage({ type: 'slide-prev' }, '*'); } catch(_) {}
                  break;
              case 'Home':
                  try { window.parent && window.parent.postMessage({ type: 'slide-first' }, '*'); } catch(_) {}
                  break;
              case 'End':
                  try { window.parent && window.parent.postMessage({ type: 'slide-last' }, '*'); } catch(_) {}
                  break;
          }
      });

      // 클릭으로 다음 슬라이드(링크/코드/복사 버튼 제외) → 부모에 위임
      ${
        type !== 'poll' && type !== 'quiz'
          ? `
      document.querySelector('.slide-container').addEventListener('click', function(e) {
          if (e.target.closest('.code-block-wrapper') || e.target.closest('.copy-button')) return;
          if (e.target.closest('a')) return; // 링크는 기본 동작 유지
          try { window.parent && window.parent.postMessage({ type: 'slide-next' }, '*'); } catch(_) {}
      });
      `
          : ''
      }

      // 슬라이드 번호 계산 및 표시 (기존 유지)
      function updateSlideNumber() {
          const el = document.getElementById('slideNumber');
          if (!el) return;
          const currentPath = window.location.pathname;
          const fileName = currentPath.split('/').pop();
          const match = fileName && fileName.match(new RegExp('slide-(\\\d+)-(\\\d+)\\.html'));
          if (match) {
              el.textContent = match[1] + '-' + match[2];
          }
      }
      window.addEventListener('load', function() {
          document.body.style.opacity = '0';
          document.body.style.transition = 'opacity 0.5s ease';
          setTimeout(() => {
              document.body.style.opacity = '1';
          }, 100);

          // 슬라이드 번호 업데이트
          updateSlideNumber();

          // 모든 링크를 새 탭으로 열도록 보장
          try {
            document.querySelectorAll('a').forEach(function(a){
              a.setAttribute('target','_blank');
              a.setAttribute('rel','noopener noreferrer');
            });
          } catch (_) {}
      });

            // 코드 복사 기능
            function copyCode(button) {
                const codeBlock = button.previousElementSibling;
                const code = codeBlock.textContent;
                navigator.clipboard.writeText(code).then(function() {
                    const originalText = button.textContent;
                    button.textContent = '복사됨!';
                    button.style.backgroundColor = '#10b981';
                    setTimeout(function(){ button.textContent = originalText; button.style.backgroundColor = ''; }, 2000);
                }).catch(function(err) {
                    const textArea = document.createElement('textarea');
                    textArea.value = code; document.body.appendChild(textArea); textArea.select(); document.execCommand('copy'); document.body.removeChild(textArea);
                    const originalText = button.textContent; button.textContent = '복사됨!'; button.style.backgroundColor = '#10b981'; setTimeout(function(){ button.textContent = originalText; button.style.backgroundColor=''; }, 2000);
                });
            }

      ${
        type === 'poll'
          ? `
      // 투표 기능 - 객관식
      let hasVoted = false;
      const POLL_ID = 'poll-${chapter}-${slide}';
      document.querySelectorAll('.poll-option').forEach(option => {
          option.addEventListener('click', function() {
              if (hasVoted) return;
              document.querySelectorAll('.poll-option').forEach(opt => opt.classList.remove('selected'));
              this.classList.add('selected','voted');
              hasVoted = true;
              const statusElement = document.getElementById('votingStatus');
              if (statusElement) {
                statusElement.innerHTML = '✅ 투표 완료!';
                statusElement.style.background = 'rgba(34, 197, 94, 0.1)';
                statusElement.style.borderColor = '#22c55e';
                statusElement.style.color = '#15803d';
              }
              try { window.parent && window.parent.postMessage({ type: 'poll-vote', pollId: POLL_ID, optionId: this.getAttribute('data-vote') }, '*'); } catch (e) {}
          });
      });

      // 부모로부터 기존 투표 상태 동기화
      window.addEventListener('message', function(event){
        try {
          const data = event.data || {};
          if (data.type === 'poll-state' && data.pollId === POLL_ID) {
            const optionId = String(data.optionId || '').trim();
            if (!optionId) return;
            document.querySelectorAll('.poll-option').forEach(opt => opt.classList.remove('selected'));
            const el = document.querySelector('.poll-option[data-vote="' + optionId + '"]');
            if (el) {
              el.classList.add('selected');
              hasVoted = true;
              const statusElement = document.getElementById('votingStatus');
              if (statusElement) {
                statusElement.innerHTML = '✅ 투표 완료!';
                statusElement.style.background = 'rgba(34, 197, 94, 0.1)';
                statusElement.style.borderColor = '#22c55e';
                statusElement.style.color = '#15803d';
              }
            }
          }
        } catch (e) { /* noop */ }
      });

      // 리스너 준비 신호(레이스 방지)
      try { window.parent && window.parent.postMessage({ type: 'poll-ready', pollId: POLL_ID }, '*'); } catch (e) {}

      // 주관식 입력 제출 처리
      ${
        hasFreeInput
          ? `
      const freeInput = document.getElementById('freeInput');
      const freeBtn = document.getElementById('freeSubmit');
      if (freeBtn) {
        freeBtn.addEventListener('click', function(){
          if (hasVoted) return;
          const val = (freeInput && (freeInput.value||'').trim()) || '';
          if (!val) { alert('단어를 입력해주세요'); return; }
          hasVoted = true;
          const statusElement = document.getElementById('votingStatus');
          if (statusElement) {
            statusElement.innerHTML = '✅ 투표 완료!';
            statusElement.style.background = 'rgba(34, 197, 94, 0.1)';
            statusElement.style.borderColor = '#22c55e';
            statusElement.style.color = '#15803d';
          }
          try { window.parent && window.parent.postMessage({ type: 'poll-vote', pollId: POLL_ID, text: val }, '*'); } catch (e) {}
        });
      }
      `
          : ''
      }

      // 퀴즈 동작은 부모(StudentView) 오버레이에서 처리
      (function(){ /* noop for quiz slides */ })();
      `
          : ''
      }
    </script>
    ${extraScript}
</body>
</html>`;

  return html;
}

/**
 * 투표 콘텐츠 특별 처리
 */
function convertPollContent(htmlContent, rawMarkdown) {
  // 마크다운 원문에서 옵션/자유입력을 파싱하여 HTML을 구성
  const lines = rawMarkdown.split(/\r?\n/);
  const options = [];
  let free = false;
  lines.forEach((ln) => {
    const t = ln.trim();
    if (!t) return;
    const mNum = t.match(/^\d+\.\s+(.*)$/);
    if (t.startsWith('- ')) {
      options.push(t.substring(2).trim());
    } else if (mNum) {
      options.push(mNum[1].trim());
    } else if (t === '[]' || t === '[ ]') {
      free = true;
    }
  });

  // 기존 html에서 목록을 제거하고, poll 옵션/자유입력 UI를 삽입
  let content = htmlContent.replace(/<ul>[\s\S]*?<\/ul>/g, '').replace(/<ol>[\s\S]*?<\/ol>/g, '');

  let pollHtml = '';
  if (options.length > 0) {
    const items = options
      .map(
        (text, idx) => `
        <div class="poll-option" data-vote="${idx + 1}" tabindex="0">
          <span class="poll-number">${idx + 1}</span>
          ${text}
        </div>`,
      )
      .join('');
    pollHtml += `<div class="poll-options">${items}</div>`;
  }
  if (free) {
    pollHtml += `
      <div class="poll-free">
        <input id="freeInput" type="text" placeholder="단어를 입력하세요" />
        <button id="freeSubmit">제출</button>
      </div>`;
  }

  return { html: content + pollHtml, free };
}

/**
 * Challenge 콘텐츠 특별 처리
 */
function convertChallengeContent(htmlContent, rawMarkdown) {
  const lines = rawMarkdown.split(/\r?\n/);

  // 제목 추출
  let title = '';
  let challengeNumber = '시나리오 실습';
  let timeEstimate = '⏱️ 10분';

  const titleMatch = rawMarkdown.match(/^# (.+)$/m);
  if (titleMatch) {
    title = titleMatch[1].trim();
  }

  // 섹션별 내용 파싱
  let inputContent = [];
  let aiToolContent = [];
  let outputContent = [];
  let practiceContent = '';

  let currentSection = '';

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('## 입력') || trimmed.startsWith('## Input')) {
      currentSection = 'input';
    } else if (trimmed.startsWith('## AI 도구') || trimmed.startsWith('## AI Tool')) {
      currentSection = 'ai-tool';
      // "## AI 도구 : ChatGPT" 또는 "## AI Tool : ChatGPT" 형식에서 도구명 추출
      const toolMatch = trimmed.match(/## AI (?:도구|Tool)\s*:\s*(.+)$/);
      if (toolMatch) {
        aiToolContent.push(toolMatch[1].trim());
      }
    } else if (trimmed.startsWith('## 출력') || trimmed.startsWith('## Output')) {
      currentSection = 'output';
    } else if (trimmed.startsWith('## 실습') || trimmed.startsWith('## 적용 아이디어')) {
      currentSection = 'practice';
    } else if (trimmed.startsWith('- ') && currentSection) {
      const content = trimmed.substring(2);
      if (currentSection === 'input') {
        inputContent.push(content);
      } else if (currentSection === 'output') {
        outputContent.push(content);
      }
    } else if (trimmed.startsWith('#1 ') && currentSection === 'ai-tool') {
      aiToolContent.push(trimmed.substring(3));
    } else if (trimmed && currentSection === 'ai-tool' && !trimmed.startsWith('#')) {
      aiToolContent.push(trimmed);
    } else if (trimmed && currentSection === 'practice' && !trimmed.startsWith('**')) {
      // URL 라인인지 확인
      if (trimmed.match(/^https?:\/\//)) {
        practiceContent += `<a href="${trimmed}" target="_blank" rel="noopener noreferrer" class="url-link">${trimmed}</a><br>`;
      } else {
        practiceContent += trimmed + ' ';
      }
    }
  });

  const inputHtml = inputContent.map((item) => `• ${item}`).join('<br>');
  const outputHtml = outputContent.map((item) => `• ${item}`).join('<br>');
  const aiToolHighlight = aiToolContent.length > 0 ? aiToolContent[0] : 'ChatGPT';
  const aiToolDesc =
    aiToolContent.length > 1
      ? aiToolContent.slice(1).join('<br>')
      : '프롬프트 엔지니어링으로<br>맞춤형 안내 생성';

  return `
    <div class="slide-header">
        <div class="challenge-badge">${challengeNumber}</div>
        <h1>${title}</h1>
        <div class="time-badge">${timeEstimate}</div>
    </div>

    <div class="content">
        <div class="workflow-container">
            <div class="workflow-step input">
                <div class="step-icon">📝</div>
                <div class="step-title">입력 (Input)</div>
                <div class="step-content">
                    ${inputHtml}
                </div>
            </div>

            <div class="workflow-arrow">→</div>

            <div class="workflow-step ai-tool">
                <div class="step-icon">🤖</div>
                <div class="step-title">AI 도구</div>
                <div class="step-content">
                    <div class="ai-highlight">${aiToolHighlight}</div>
                    <div style="margin-top: 10px; font-size: 0.9em;">
                        ${aiToolDesc}
                    </div>
                </div>
            </div>

            <div class="workflow-arrow">→</div>

            <div class="workflow-step output">
                <div class="step-icon">📋</div>
                <div class="step-title">출력 (Output)</div>
                <div class="step-content">
                    ${outputHtml}
                </div>
            </div>
        </div>

        <div class="practice-section">
            <div class="practice-title">실습</div>
            <div class="practice-content">
                <div class="qr-visual">📱</div>
                <div>
                    ${practiceContent.trim()}
                </div>
            </div>
        </div>
    </div>
  `;
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

  // 추가: 고아(존재하지 않는 MD에 대응되는) 슬라이드 HTML 정리
  try {
    const expectedHtml = new Set(files.map((f) => f.replace('.md', '.html')));
    const outEntries = fs
      .readdirSync(outputDir)
      .filter((name) => name.endsWith('.html') && name.startsWith('slide-'));
    let removed = 0;
    outEntries.forEach((name) => {
      if (!expectedHtml.has(name)) {
        const target = path.join(outputDir, name);
        try {
          fs.unlinkSync(target);
          removed++;
          console.log(`🧹 삭제: ${name} (입력 MD 없음)`);
        } catch (e) {
          console.warn(`⚠️ 삭제 실패: ${name} - ${e?.message || e}`);
        }
      }
    });
    if (removed > 0) {
      console.log(`🧾 정리 완료: ${removed}개 HTML 삭제`);
    }
  } catch (e) {
    console.warn('⚠️ 출력 디렉토리 정리 중 경고:', e?.message || e);
  }

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
      const title = titleMatch ? titleMatch[1].replace(/#/g, '') : '목회자를 위한 AI 활용 시나리오';

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

if (args.length < 2) {
  console.log('사용법: node build-slides.js <입력디렉토리> <출력디렉토리> [특정슬라이드번호]');
  console.log('예시: node build-slides.js ../public/slides ../public/generated/slides');
  console.log('예시: node build-slides.js ../public/slides ../public/generated/slides 0-0');
  process.exit(1);
}

const [inputDir, outputDir, specificSlide] = args;

// 특정 슬라이드만 변환하는 경우
if (specificSlide) {
  console.log(`🎯 특정 슬라이드 변환: ${specificSlide}`);
  const inputPath = path.join(inputDir, `slide-${specificSlide}.md`);
  const outputPath = path.join(outputDir, `slide-${specificSlide}.html`);

  if (!fs.existsSync(inputPath)) {
    console.error(`❌ 파일을 찾을 수 없습니다: ${inputPath}`);
    process.exit(1);
  }

  try {
    // 출력 디렉토리가 없으면 생성
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 마크다운 파일 읽기
    const content = fs.readFileSync(inputPath, 'utf8');

    // 슬라이드 타입 감지
    const type = detectSlideType(content);

    // 제목 추출 (첫 번째 # 제목)
    const titleMatch = content.match(/^# (.+)$/m);
    const title = titleMatch ? titleMatch[1].replace(/#/g, '') : '목회자를 위한 AI 활용 시나리오';

    // @ 타입 표시 제거
    const cleanContent = content.replace(/^@\w+\s*\n?/gm, '');

    // HTML 생성
    const slideData = {
      fileName: `slide-${specificSlide}.md`,
      type: type,
      content: cleanContent,
      title: title,
    };

    const html = generateCompleteHTML(slideData);

    // HTML 파일 저장
    fs.writeFileSync(outputPath, html, 'utf8');

    console.log(`✅ slide-${specificSlide}.md → slide-${specificSlide}.html (${type})`);
  } catch (error) {
    console.error(`❌ slide-${specificSlide}.md 변환 실패:`, error.message);
    process.exit(1);
  }
} else {
  // 모든 슬라이드 변환
  buildSlides(inputDir, outputDir);
}
