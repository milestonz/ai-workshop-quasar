import { marked } from 'marked';

/**
 * Markdown을 HTML로 변환하는 함수
 * @param markdown - 변환할 Markdown 텍스트
 * @returns 변환된 HTML 문자열
 */
export const convertMarkdownToHTML = (markdown: string): string => {
  if (!markdown) return '';

  // marked 설정
  marked.setOptions({
    breaks: false, // 두 개 공백으로 줄바꿈 비활성화
    gfm: true,
  });

  let result = marked(markdown);

  if (typeof result === 'string') {
    // <p> 태그를 <div>로 변환
    result = result.replace(/<p>/g, '<div>').replace(/<\/p>/g, '</div>');
  }

  return typeof result === 'string' ? result : markdown;
};

/**
 * 커스텀 Markdown을 HTML로 변환하는 함수 (SlideViewer용)
 * @param markdown - 변환할 Markdown 텍스트
 * @returns 변환된 HTML 문자열
 */
export const convertCustomMarkdownToHTML = (markdown: string): string => {
  console.log('🔍 [markdown.ts] 입력 마크다운:', {
    length: markdown.length,
    preview: markdown.substring(0, 200),
    fullMarkdown: markdown,
  });

  if (!markdown) {
    console.log('🔍 [markdown.ts] 마크다운이 비어있음');
    return '';
  }

  let html = markdown;

  // 이미 완전한 HTML인지 확인 (테이블만 있는 경우는 마크다운 변환 진행)
  if (html.includes('<h3') && html.includes('<table') && !html.includes('###')) {
    console.log('🔍 [markdown.ts] 이미 완전한 HTML임, 변환 건너뜀');
    return html;
  }

  // 이미지 변환
  html = html.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1" style="max-width: 100%; height: auto;">',
  );

  // 제목 변환
  html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // 가로줄 변환 (---)
  html = html.replace(/^---$/gm, '<hr>');

  // 링크 변환
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');

  // 굵은 글씨 변환
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // 기울임 글씨 변환
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // 인라인 코드 변환
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // 테이블 변환 (마크다운 테이블을 HTML 테이블로 변환) - 줄바꿈 처리 전에 실행
  html = convertMarkdownTableToHTML(html);

  // 빈 줄 처리 - 연속된 빈 줄을 무시하고 <br> 태그만 처리
  // html = html.replace(/\n\s*\n/g, '<br><br>');
  // 빈줄은 무시하고 <br> 태그만 유지
  html = html.replace(/\n\s*\n/g, '\n');

  // 일반 줄바꿈 처리
  html = html.replace(/\n/g, '<br>');

  // <br> 태그 제거 (h3와 table 사이)
  html = html.replace(/(<\/h3>)(<br>)+(<table)/gi, '$1$3');

  // <br> 태그 제거 (strong 앞)
  html = html.replace(/(<br>)+(\*\*)/g, '$2');

  // 공백 제거
  html = html.replace(/>\s+</g, '><');
  html = html.replace(/\s+<br>/g, '<br>');
  html = html.replace(/<br>\s+/g, '<br>');

  // ** 주변 공백 제거
  html = html.replace(/\s+\*\*/g, '**');
  html = html.replace(/\*\*\s+/g, '**');

  // 텍스트 노드 내 공백 제거
  html = html.replace(/>\s+([^<]+)</g, '>$1<');
  html = html.replace(/>([^<]+)\s+</g, '>$1<');

  // div 태그 시작 부분의 공백 제거
  html = html.replace(/<div>\s+/g, '<div>');
  html = html.replace(/\s+<\/div>/g, '</div>');

  // div 태그로 감싸기
  if (!html.includes('<h') && !html.includes('<table') && !html.includes('<ul')) {
    html = '<div>' + html + '</div>';
  }

  console.log('🔍 [markdown.ts] 변환된 HTML:', {
    length: html.length,
    preview: html.substring(0, 200),
    fullHtml: html,
  });

  return html;
};

/**
 * 마크다운 테이블을 HTML 테이블로 변환하는 함수
 * @param html - 변환할 HTML 문자열
 * @returns 테이블이 변환된 HTML 문자열
 */
const convertMarkdownTableToHTML = (html: string): string => {
  // 마크다운 테이블 패턴 찾기
  const tablePattern = /(\|[^|\n]+\|[^|\n]*\|\n\|[\s\-:|]+\|\n(\|[^|\n]+\|[^|\n]*\|\n?)+)/g;

  return html.replace(tablePattern, (match) => {
    const lines = match.trim().split('\n');
    if (lines.length < 3) return match; // 최소 헤더 + 구분선 + 데이터 행

    let tableHTML = '<table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">';

    lines.forEach((line, index) => {
      if (index === 1) return; // 구분선 건너뛰기

      const cells = line.split('|').filter((cell) => cell.trim() !== '');
      const tag = index === 0 ? 'th' : 'td';

      tableHTML += '<tr>';
      cells.forEach((cell) => {
        const content = cell.trim();
        const style =
          index === 0
            ? 'background-color: #f0f0f0; font-weight: bold; padding: 0.5rem; border: 1px solid #ddd; text-align: left;'
            : 'padding: 0.5rem; border: 1px solid #ddd; text-align: left;';
        tableHTML += `<${tag} style="${style}">${content}</${tag}>`;
      });
      tableHTML += '</tr>';
    });

    tableHTML += '</table>';
    return tableHTML;
  });
};

/**
 * Markdown 파일명에서 슬라이드 키를 추출하는 함수
 * @param filename - Markdown 파일명 (예: slide-1-2.md)
 * @returns 슬라이드 키 (예: 1-2)
 */
export const extractSlideKeyFromFilename = (filename: string): string => {
  const match = filename.match(/slide-(\d+)-(\d+)\.md/);
  if (match) {
    return `${match[1]}-${match[2]}`;
  }
  return '';
};

/**
 * 슬라이드 키에서 Chapter 번호를 추출하는 함수
 * @param slideKey - 슬라이드 키 (예: 1-2)
 * @returns Chapter 번호 (예: 1)
 */
export const extractChapterNumber = (slideKey: string): string => {
  const parts = slideKey.split('-');
  return parts[0] || '1';
};
