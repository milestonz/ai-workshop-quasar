#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * 마크다운 슬라이드를 HTML로 변환하는 클래스
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
   * 슬라이드 타입 감지 (제목, 목차, 장 시작, 일반 등)
   */
  detectSlideType(content) {
    // @ 표식으로 시작하는 슬라이드 타입 감지
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
   * 슬라이드 타입에 따른 CSS 클래스 반환
   */
  getSlideClasses(type, content) {
    const baseClass = 'slide';

    switch (type) {
      case 'intro':
        return `${baseClass} intro-slide`;
      case 'chapter':
        return `${baseClass} chapter-slide`;
      case 'instructor':
        return `${baseClass} intro-slide`;
      case 'poll':
        return `${baseClass} poll-slide`;
      case 'toc':
        return `${baseClass}`;
      case 'stats':
        return `${baseClass}`;
      case 'centered':
        return `${baseClass} center-slide`;
      case 'cover':
        return `${baseClass} cover-slide`;
      case 'index':
        return `${baseClass} index-slide`;
      case 'example':
        return `${baseClass} example-slide`;
      case 'lecture':
        return `${baseClass} lecture-slide`;
      case 'profile':
        return `${baseClass} profile-slide`;
      case 'challenge':
        return `${baseClass} challenge-slide`;
      case 'general':
        return `${baseClass} general-slide`;
      default:
        return baseClass;
    }
  }

  /**
   * 기본적인 마크다운을 HTML로 변환
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
      html = html.replace(/^### ([^<]+)$/gm, '<h3>$1</h3>');
      html = html.replace(/^## ([^<]+)$/gm, '<h2>$1</h2>');
      html = html.replace(/^# ([^<]+)$/gm, '<h1>$1</h1>');
      html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');

      return this.wrapInSlideStructure(html);
    }

    // 순수 마크다운인 경우 전체 변환
    // 제목들 변환
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
    html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');

    // "예시"로 시작하는 제목들도 h4로 변환
    html = html.replace(/^예시 (\d+): (.+)$/gm, '<h4>예시 $1: $2</h4>');

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
      html = html.replace(/^### ([^<]+)$/gm, '<h3>$1</h3>');
      html = html.replace(/^## ([^<]+)$/gm, '<h2>$1</h2>');
      html = html.replace(/^# ([^<]+)$/gm, '<h1>$1</h1>');
      html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');

      return html;
    }

    // 순수 마크다운인 경우 전체 변환
    // 제목들 변환
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
    html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');

    // "예시"로 시작하는 제목들도 h4로 변환
    html = html.replace(/^예시 (\d+): (.+)$/gm, '<h4>예시 $1: $2</h4>');

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
          value: match[2],
        });
      }
    });

    if (stats.length > 0) {
      const statsHTML = stats
        .map(
          (stat) => `
        <div class="stat-box">
          <div class="stat-number">${stat.value}</div>
          <div class="stat-label">${stat.label}</div>
        </div>
      `,
        )
        .join('');

      return `
        <div class="slide-header">
          <h2>목회자의 AI 사용 현황</h2>
        </div>
        <div class="content">
          <div class="stats-container">
            ${statsHTML}
          </div>
        </div>
      `;
    }

    return content;
  }

  /**
   * HTML 템플릿에 슬라이드들을 삽입하여 완성된 HTML 생성
   */
  generateHTML() {
    const convertedSlides = this.slides.map((slide) => this.convertSlideToHTML(slide));

    // 슬라이드 HTML 생성
    const slidesHTML = convertedSlides
      .map((slide, index) => {
        const activeClass = index === 0 ? ' active' : '';

        // 통계 슬라이드 특별 처리
        if (slide.type === 'stats') {
          slide.content = this.convertStatsContent(this.slides[index].content);
        }

        // 슬라이드 구조 생성
        const slideStructure = this.wrapInSlideStructure(slide.content);

        return `
        <!-- 슬라이드 ${index + 1}: ${slide.slideNumber} -->
        <div class="${slide.classes}${activeClass}">
          ${slideStructure}
        </div>
      `;
      })
      .join('\n');

    // 기본 HTML 템플릿
    const htmlTemplate = this.getHTMLTemplate();

    // 슬라이드 삽입
    const finalHTML = htmlTemplate
      .replace('{{SLIDES_CONTENT}}', slidesHTML)
      .replace('{{TOTAL_SLIDES}}', convertedSlides.length.toString());

    return finalHTML;
  }

  /**
   * HTML 템플릿 반환
   */
  getHTMLTemplate() {
    return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>목회자를 위한 AI 활용 시나리오</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            color: #333;
            overflow-x: hidden;
        }

        .slideshow-container {
            position: relative;
            max-width: 100%;
            margin: auto;
            height: 100vh;
        }

        .slide {
            display: none;
            padding: 60px 40px;
            text-align: center;
            height: 100vh;
            background: white;
            position: relative;
            animation: fadeIn 0.5s ease-in-out;
            overflow-y: auto;
        }

        .slide.active {
            display: block;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .slide-header {
            background: linear-gradient(135deg, #1e3c72, #2a5298);
            color: white;
            padding: 20px;
            margin: -60px -40px 40px -40px;
            position: relative;
        }

        .slide-header::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 0;
            right: 0;
            height: 10px;
            background: linear-gradient(90deg, #3498db, #74b9ff);
        }

        h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            font-weight: bold;
        }

        h2 {
            font-size: 2em;
            color: #1e3c72;
            margin-bottom: 30px;
            border-bottom: 3px solid #2a5298;
            padding-bottom: 15px;
            display: inline-block;
        }

        h3 {
            font-size: 1.8em;
            color: #2a5298;
            margin-bottom: 20px;
        }

        h4 {
            font-size: 1.4em;
            color: #34495e;
            margin-bottom: 15px;
        }

        .subtitle {
            font-size: 1.2em;
            opacity: 0.9;
            font-weight: normal;
        }

        .content {
            max-width: 900px;
            margin: 0 auto;
            text-align: left;
            font-size: 1.1em;
            line-height: 1.6;
        }

        .center-content {
            text-align: center;
        }

        .chapter-slide {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .chapter-slide .slide-header {
            background: transparent;
            margin: 0;
        }

        .chapter-slide .slide-header::after {
            display: none;
        }

        .chapter-slide h1 {
            font-size: 4em;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .intro-slide {
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .intro-slide .slide-header {
            background: transparent;
            margin: 0;
        }

        .intro-slide .slide-header::after {
            display: none;
        }

        .intro-slide h1 {
            font-size: 3.5em;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .poll-slide {
            background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .poll-slide .slide-header {
            background: transparent;
            margin: 0;
        }

        .poll-slide .slide-header::after {
            display: none;
        }

        .poll-question {
            font-size: 1.5em;
            background: rgba(255,255,255,0.1);
            padding: 30px;
            border-radius: 15px;
            margin: 20px 0;
            backdrop-filter: blur(10px);
        }

        ul {
            margin: 20px 0;
            padding-left: 30px;
        }

        li {
            margin: 10px 0;
            font-size: 1.1em;
        }

        .key-point {
            background: linear-gradient(135deg, #ffeaa7, #fdcb6e);
            padding: 25px;
            border-radius: 15px;
            border-left: 6px solid #e17055;
            margin: 25px 0;
            position: relative;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .key-point::before {
            content: '💡';
            font-size: 1.5em;
            position: absolute;
            top: -10px;
            left: 20px;
            background: white;
            padding: 0 10px;
        }

        .stats-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }

        .stat-box {
            background: linear-gradient(135deg, #74b9ff, #0984e3);
            color: white;
            padding: 20px;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .stat-number {
            font-size: 2.5em;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .stat-label {
            font-size: 0.9em;
            opacity: 0.9;
        }

        .navigation {
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 15px;
            z-index: 1000;
        }

        .nav-btn {
            background: #2a5298;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 1em;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(42,82,152,0.3);
        }

        .nav-btn:hover {
            background: #1e3c72;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(42,82,152,0.4);
        }

        .nav-btn:disabled {
            background: #ccc;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }

        .slide-counter {
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(30,60,114,0.8);
            color: white;
            padding: 10px 15px;
            border-radius: 20px;
            font-size: 0.9em;
            z-index: 1000;
            backdrop-filter: blur(10px);
        }

        @media (max-width: 768px) {
            .slide {
                padding: 40px 20px;
            }

            h1 {
                font-size: 2em;
            }

            h2 {
                font-size: 1.5em;
            }

            .content {
                font-size: 1em;
            }

            .chapter-slide h1 {
                font-size: 3em;
            }

            .intro-slide h1 {
                font-size: 2.5em;
            }
        }
    </style>
</head>
<body>
    <div class="slideshow-container">
        {{SLIDES_CONTENT}}
    </div>

    <div class="slide-counter">
        <span id="current-slide">1</span> / <span id="total-slides">{{TOTAL_SLIDES}}</span>
    </div>

    <div class="navigation">
        <button class="nav-btn" id="prev-btn">이전</button>
        <button class="nav-btn" id="next-btn">다음</button>
    </div>

    <script>
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const totalSlides = slides.length;

        document.getElementById('total-slides').textContent = totalSlides;

                        function showSlide(n) {
            // 유효한 슬라이드 번호인지 확인
            if (n < 0 || n >= totalSlides) {
                console.log('유효하지 않은 슬라이드 번호:', n);
                return;
            }

            const oldSlide = currentSlide;
            console.log('showSlide 호출:', n, '현재 슬라이드:', oldSlide);

            // 현재 슬라이드 비활성화
            if (slides[oldSlide]) {
                slides[oldSlide].classList.remove('active');
            }

            // 새 슬라이드 활성화
            currentSlide = n;
            if (slides[currentSlide]) {
                slides[currentSlide].classList.add('active');
            }

            // 슬라이드 카운터 업데이트
            const counter = document.getElementById('current-slide');
            if (counter) {
                counter.textContent = currentSlide + 1;
            }

            // 버튼 상태 업데이트
            const prevBtn = document.getElementById('prev-btn');
            const nextBtn = document.getElementById('next-btn');

            if (prevBtn) prevBtn.disabled = currentSlide === 0;
            if (nextBtn) nextBtn.disabled = currentSlide === totalSlides - 1;

            console.log('슬라이드 전환 완료:', {
                from: oldSlide,
                to: currentSlide,
                totalSlides: totalSlides,
                prevDisabled: prevBtn ? prevBtn.disabled : false,
                nextDisabled: nextBtn ? nextBtn.disabled : false
            });
        }

                let isNavigating = false; // 중복 호출 방지 플래그
        let lastClickTime = 0; // 마지막 클릭 시간

        function changeSlide(direction) {
            const now = Date.now();

            // 200ms 내 중복 클릭 방지
            if (now - lastClickTime < 200) {
                console.log('너무 빠른 클릭입니다. 무시합니다.');
                return;
            }

            if (isNavigating) {
                console.log('이미 네비게이션 중입니다. 무시합니다.');
                return;
            }

            console.log('changeSlide 호출:', direction, '현재 슬라이드:', currentSlide);
            lastClickTime = now;

            if (direction === 1 && currentSlide < totalSlides - 1) {
                isNavigating = true;
                const nextSlide = currentSlide + 1;
                console.log('다음 슬라이드로 이동:', nextSlide);
                showSlide(nextSlide);
                setTimeout(() => { isNavigating = false; }, 300); // 300ms 후 플래그 해제
            } else if (direction === -1 && currentSlide > 0) {
                isNavigating = true;
                const prevSlide = currentSlide - 1;
                console.log('이전 슬라이드로 이동:', prevSlide);
                showSlide(prevSlide);
                setTimeout(() => { isNavigating = false; }, 300); // 300ms 후 플래그 해제
            } else {
                console.log('슬라이드 변경 불가:', direction, currentSlide, totalSlides);
            }
        }

        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation(); // 이벤트 전파 중단
                changeSlide(1);
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                e.stopPropagation(); // 이벤트 전파 중단
                changeSlide(-1);
            }
        });

        // 버튼 이벤트 리스너 추가
        document.getElementById('prev-btn').addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            changeSlide(-1);
        });

        document.getElementById('next-btn').addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            changeSlide(1);
        });

        showSlide(0);
    </script>
</body>
</html>`;
  }

  /**
   * 변환된 HTML을 파일로 저장
   */
  async saveHTML(outputPath) {
    try {
      const html = this.generateHTML();
      fs.writeFileSync(outputPath, html, 'utf8');
      console.log(`✅ HTML 슬라이드 생성 완료: ${outputPath}`);
      return true;
    } catch (error) {
      console.error(`❌ HTML 저장 실패: ${error.message}`);
      return false;
    }
  }

  /**
   * 전체 변환 프로세스 실행
   */
  async convert(slidesDir, outputPath) {
    console.log(`🚀 마크다운 → HTML 변환 시작`);
    console.log(`📂 슬라이드 디렉토리: ${slidesDir}`);
    console.log(`📄 출력 파일: ${outputPath}`);

    try {
      // 1. 마크다운 파일들 로드
      await this.loadSlideFiles(slidesDir);

      // 2. HTML 생성 및 저장
      await this.saveHTML(outputPath);

      console.log(`🎉 변환 완료! 총 ${this.slides.length}개 슬라이드`);
      return true;
    } catch (error) {
      console.error(`💥 변환 실패: ${error.message}`);
      return false;
    }
  }
}

// CLI 실행
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log('사용법: node markdown-to-html.js <슬라이드_디렉토리> <출력_HTML_파일>');
    console.log('예시: node markdown-to-html.js ../public/slides ./output/slides.html');
    process.exit(1);
  }

  const [slidesDir, outputPath] = args;
  const converter = new MarkdownToHTMLConverter();

  converter
    .convert(slidesDir, outputPath)
    .then((success) => {
      process.exit(success ? 0 : 1);
    })
    .catch((error) => {
      console.error('실행 오류:', error);
      process.exit(1);
    });
}

export default MarkdownToHTMLConverter;
