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
  });

  if (!markdown) {
    console.log('🔍 [markdown.ts] 마크다운이 비어있음');
    return '';
  }

  // marked 설정
  marked.setOptions({
    breaks: true, // 줄바꿈 활성화
    gfm: true, // GitHub Flavored Markdown 활성화
  });

  // marked로 기본 변환
  let html = marked(markdown);

  // marked가 Promise를 반환할 수 있으므로 처리
  if (typeof html !== 'string') {
    console.log('🔍 [markdown.ts] marked가 Promise를 반환함, 원본 반환');
    return markdown;
  }

  console.log('🔍 [markdown.ts] marked 변환 후:', {
    length: html.length,
    preview: html.substring(0, 200),
  });

  // h4 태그 변환 확인
  if (html.includes('<h4')) {
    console.log('🔍 [markdown.ts] h4 태그 발견:', html.match(/<h4[^>]*>.*?<\/h4>/g));
  }

  // 이미 완전한 HTML인지 확인 (테이블이 있는 경우는 스타일링 진행)
  if (html.includes('<h3') && html.includes('<table') && !html.includes('###')) {
    console.log('🔍 [markdown.ts] 테이블이 포함된 HTML 발견, 스타일링 진행');
  }

  // <p> 태그를 <div>로 변환
  html = html.replace(/<p>/g, '<div>').replace(/<\/p>/g, '</div>');

  // 이미지 스타일 추가
  html = html.replace(/<img([^>]*)>/g, '<img$1 style="max-width: 100%; height: auto;">');

  // 테이블 스타일 개선
  html = html.replace(
    /<table>/g,
    '<table style="width: 100%; border-collapse: separate; margin: 1rem 0; background: rgba(255, 255, 255, 0.1); border-radius: 8px; overflow: hidden; color: #fff; font-size: 0.9em; border: 2px solid #ffffff !important;">',
  );

  // 테이블 디버깅 로그
  if (html.includes('<table')) {
    console.log('🔍 [markdown.ts] 테이블 발견:', html.match(/<table[^>]*>/g));
    console.log('🔍 [markdown.ts] th 태그 개수:', (html.match(/<th/g) || []).length);
    console.log('🔍 [markdown.ts] td 태그 개수:', (html.match(/<td/g) || []).length);
  }

  // 테이블 헤더 스타일
  html = html.replace(
    /<th>/g,
    '<th style="background-color: rgba(255, 255, 255, 0.15); font-weight: bold; padding: 0.75rem; border: 1px solid #ffffff !important; border-right: 1px solid #ffffff !important; border-bottom: 1px solid #ffffff !important; border-left: 1px solid #ffffff !important; text-align: left; color: #fff; white-space: normal; word-wrap: break-word; overflow-wrap: break-word;">',
  );

  // 테이블 셀 스타일
  html = html.replace(
    /<td>/g,
    '<td style="padding: 0.75rem; border: 1px solid #ffffff !important; border-right: 1px solid #ffffff !important; border-bottom: 1px solid #ffffff !important; border-left: 1px solid #ffffff !important; text-align: left; color: #e0e0e0; white-space: normal; word-wrap: break-word; overflow-wrap: break-word;">',
  );

  // 링크 스타일 추가
  html = html.replace(
    /<a([^>]*)>/g,
    '<a$1 target="_blank" style="color: #4CAF50; text-decoration: none;">',
  );

  // 코드 블록에 copy 버튼 추가
  html = html.replace(
    /<pre>/g,
    '<pre style="background-color: #e8e8e8; border: 1px solid #d0d0d0; border-radius: 8px; padding: 1rem; margin: 1rem 0; overflow-x: auto; font-family: \'Courier New\', monospace; font-size: 0.9em; line-height: 1.4; color: #333; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); position: relative;">',
  );

  // 코드 블록에 copy 버튼 추가
  html = html.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/g, (match, codeContent) => {
    const cleanCode = codeContent.replace(/<[^>]*>/g, ''); // HTML 태그 제거
    return `<pre style="background-color: #e8e8e8; border: 1px solid #d0d0d0; border-radius: 8px; padding: 1rem; margin: 1rem 0; overflow-x: auto; font-family: 'Courier New', monospace; font-size: 0.9em; line-height: 1.4; color: #333; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); position: relative;">
        <button onclick="copyToClipboard(this, \`${cleanCode.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`)" style="position: absolute; top: 8px; right: 8px; background: #4CAF50; color: white; border: none; border-radius: 4px; padding: 4px 8px; font-size: 12px; cursor: pointer; opacity: 0.8; transition: opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.8'">Copy</button>
        ${codeContent}
      </pre>`;
  });

  // 코드 블록 내부 코드 스타일
  html = html.replace(/<pre[^>]*>[\s\S]*?<code>/g, (match) =>
    match.replace(
      /<code>/g,
      '<code style="background-color: #e8e8e8; color: #333; border: none; padding: 0; font-family: inherit; font-size: inherit;">',
    ),
  );

  // 인라인 코드 스타일 (코드 블록 내부가 아닌 경우만)
  html = html.replace(
    /<code>(?!<\/pre>)/g,
    '<code style="background-color: #e8e8e8; color: #333; padding: 0.2rem 0.4rem; border-radius: 4px; font-family: \'Courier New\', monospace; font-size: 0.9em; border: 1px solid #d0d0d0;">',
  );

  // h4 태그 스타일 추가
  html = html.replace(
    /<h4>/g,
    '<h4 style="color: #fff; font-size: 1.1rem; font-weight: bold; margin: 1rem 0 0.5rem 0; padding: 0.5rem 0; border-bottom: 2px solid #4CAF50;">',
  );

  // 인용구 스타일
  html = html.replace(
    /<blockquote>/g,
    '<blockquote style="border-left: 4px solid #4CAF50; margin: 1rem 0; padding-left: 1rem; background-color: rgba(255, 255, 255, 0.05);">',
  );

  // 공백 정리
  html = html.replace(/>\s+</g, '><');
  html = html.replace(/\s+<br>/g, '<br>');
  html = html.replace(/<br>\s+/g, '<br>');

  // BarChart 컴포넌트 태그 제거 (별도로 렌더링됨)
  html = html.replace(/<BarChart\s*\/?>/g, '');

  // div 태그로 감싸기 (필요한 경우)
  if (
    !html.includes('<h') &&
    !html.includes('<table') &&
    !html.includes('<ul') &&
    !html.includes('<BarChart')
  ) {
    html = '<div>' + html + '</div>';
  }

  console.log('🔍 [markdown.ts] 최종 변환된 HTML:', {
    length: html.length,
    preview: html.substring(0, 200),
  });

  return html;
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
