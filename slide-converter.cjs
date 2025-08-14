#!/usr/bin/env node

/**
 * AI Workshop Quasar 슬라이드 변환기
 * /public/slides/slide-*-*.md 파일들을 읽어서
 * /public/generated/slides/slide-*-*.html로 변환
 */

const fs = require('fs');
const path = require('path');

class AIWorkshopSlideConverter {
  constructor() {
    this.inputDir = '/Users/milestonz/GitHub-Desktop/ai-workshop-quasar/public/slides';
    this.outputDir = '/Users/milestonz/GitHub-Desktop/ai-workshop-quasar/public/generated/slides';
    this.cssDir = '/Users/milestonz/GitHub-Desktop/ai-workshop-quasar/public/css';
  }

  /**
   * 슬라이드 타입 감지 (마크다운 내용 기반)
   */
  detectSlideType(content) {
    const lines = content.split('\n');
    const firstLine = lines[0]?.trim();

    if (firstLine && firstLine.startsWith('@')) {
      const type = firstLine.substring(1).toLowerCase();
      const validTypes = [
        'cover',
        'index',
        'example',
        'challenge',
        'lecture',
        'poll',
        'profile',
        'chapter',
        'timeline',
        'general',
      ];
      if (validTypes.includes(type)) {
        return type;
      }
    }

    return 'lecture'; // 기본값
  }

  /**
   * 마크다운을 HTML로 변환
   */
  convertMarkdownToHTML(markdown) {
    let html = markdown;

    // @ 태그 제거
    html = html.replace(/^@\w+.*$/gm, '');

    // 헤딩 변환 (####부터 역순으로 처리하여 중첩 방지)
    html = html.replace(/^####\s+(.+)$/gm, '<h4>$1</h4>');
    html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');

    // 강조 처리
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // 리스트 처리
    html = html.replace(/^-\s+(.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>');

    // 코드 블록 처리
    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // 이미지 처리
    html = html.replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      '<img src="$2" alt="$1" style="max-width: 100%; height: auto;">',
    );

    // 줄바꿈을 단락으로 변환
    const paragraphs = html.split('\n\n');
    html = paragraphs
      .filter((p) => p.trim())
      .map((p) => {
        p = p.trim();
        // 이미 HTML 태그로 감싸진 경우 그대로 유지
        if (
          p.startsWith('<h') ||
          p.startsWith('<ul') ||
          p.startsWith('<pre') ||
          p.startsWith('<div')
        ) {
          return p;
        }
        // 일반 텍스트를 p 태그로 감싸기
        return `<p>${p}</p>`;
      })
      .join('\n');

    // 빈 태그 제거
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<br>/g, '<br/>');

    return html;
  }

  /**
   * 슬라이드 유형별 특별 처리
   */
  processSlideContent(type, content, title, slideNumber) {
    switch (type) {
      case 'cover':
        return this.processCoverSlide(content, title);
      case 'index':
        return this.processIndexSlide(content, title);
      case 'example':
        return this.processExampleSlide(content, title);
      case 'challenge':
        return this.processChallengeSlide(content, title);
      case 'profile':
        return this.processProfileSlide(content, title);
      case 'chapter':
        return this.processChapterSlide(content, title);
      case 'poll':
        return this.processPollSlide(content, title);
      case 'general':
        return this.processGeneralSlide(content, title);
      default:
        return this.processDefaultSlide(content, title);
    }
  }

  /**
   * Cover 슬라이드 처리
   */
  processCoverSlide(content, title) {
    const htmlContent = this.convertMarkdownToHTML(content);
    return `
      <div class="slide-container" tabindex="0">
        ${htmlContent}
      </div>
    `;
  }

  /**
   * Index 슬라이드 처리
   */
  processIndexSlide(content, title) {
    const lines = content.split('\n');
    const tocItems = [];

    for (const line of lines) {
      const itemMatch = line.match(/\*\*(\d+장\s*[^**]+)\*\*\s*-\s*(.+)/);
      if (itemMatch) {
        const itemNumber = itemMatch[1].match(/(\d+)/)?.[1] || '1';
        const itemTitle = itemMatch[1].replace(/\d+장\s*/, '').trim();
        const itemDescription = itemMatch[2].trim();

        tocItems.push({
          number: itemNumber,
          title: itemTitle,
          description: itemDescription,
        });
      }
    }

    const tocItemsHTML = tocItems
      .map(
        (item) => `
        <div class="toc-item">
          <div class="toc-header">
            <div class="toc-number">${item.number}</div>
            <h2 class="toc-title">${item.title}</h2>
          </div>
          <div class="toc-description">${item.description}</div>
        </div>
      `,
      )
      .join('');

    return `
      <div class="slide slide-top">
        <div class="slide-header">
          <h1>목차</h1>
          <div class="slide-subtitle">강의 주요 내용</div>
        </div>
        <div class="content">
          <div class="toc-grid">
            ${tocItemsHTML}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Example 슬라이드 처리
   */
  processExampleSlide(content, title) {
    const titleMatch = content.match(/^###\s*[①-⑩]\s*(.+)$/m);
    const techniqueTitle = titleMatch ? titleMatch[1].trim() : '프롬프팅 기법';

    const numberMatch = content.match(/^###\s*([①-⑩])/m);
    const numberMap = {
      '①': '1',
      '②': '2',
      '③': '3',
      '④': '4',
      '⑤': '5',
      '⑥': '6',
      '⑦': '7',
      '⑧': '8',
      '⑨': '9',
      '⑩': '10',
    };
    const techniqueNumber = numberMatch ? numberMap[numberMatch[1]] || '1' : '1';

    const descriptionMatch = content.match(/^###\s*[①-⑩].+?\n\n(.+?)(?=\n\n#### ❌|$)/s);
    let description = descriptionMatch ? descriptionMatch[1].trim() : '';
    description = description.replace(/^- (.+)$/gm, '• $1');

    const badExampleMatch = content.match(/(?:#### )?❌ 나쁜 예\s*\n(.+?)(?=\n\n(?:#### )?✅|$)/s);
    const goodExampleMatch = content.match(/(?:#### )?✅ 좋은 예\s*\n(.+?)(?=\n\n(?:#### )?💡|$)/s);
    const keyPointMatch = content.match(/(?:#### )?💡 핵심 고려사항\s*\n(.+?)(?=\n\n|$)/s);

    const badExample = badExampleMatch ? badExampleMatch[1].trim() : '';
    const goodExample = goodExampleMatch ? goodExampleMatch[1].trim() : '';
    const keyPoint = keyPointMatch ? keyPointMatch[1].trim() : '';

    return `
      <div class="technique-number level-${techniqueNumber}">${techniqueNumber}</div>
      <h2 class="technique-title">${techniqueTitle}</h2>
      <p class="description">${description}</p>

      <div class="example-container">
        <div class="example-box bad-example">
          <div class="example-title">❌ 나쁜 예</div>
          <div class="example-content">${badExample}</div>
        </div>
        <div class="example-box good-example">
          <div class="example-title">✅ 좋은 예</div>
          <div class="example-content">${goodExample}</div>
        </div>
      </div>

      <div class="key-point tip">
        <div class="key-title">핵심 고려사항</div>
        <div class="key-content">${keyPoint}</div>
      </div>
    `;
  }

  /**
   * Poll 슬라이드 처리
   */
  processPollSlide(content, title) {
    const titleMatch = content.match(/^##\s*(.+)$/m);
    const questionMatch = content.match(/^###\s*(.+)$/m);

    const mainTitle = titleMatch ? titleMatch[1].trim() : title;
    const question = questionMatch ? questionMatch[1].trim() : '';

    // 선택지 추출
    const lines = content.split('\n');
    const choices = [];
    let inChoices = false;

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine.match(/^\d+\.\s/)) {
        inChoices = true;
        const choiceText = trimmedLine.replace(/^\d+\.\s/, '');
        choices.push(choiceText);
      } else if (inChoices && trimmedLine && !trimmedLine.startsWith('#')) {
        // 선택지가 끝났다고 판단
        break;
      }
    }

    const choicesHTML = choices
      .map(
        (choice, index) => `
        <div class="choice-button" onclick="selectChoice(this, ${index + 1})">
          <div class="choice-number">${index + 1}</div>
          <div class="choice-text">${choice}</div>
        </div>
      `,
      )
      .join('');

    return `
      <div class="slide slide-top">
        <div class="slide-header">
          <h1>${mainTitle}</h1>
        </div>
        <div class="content">
          <div class="poll-question">
            <h2>${question}</h2>
          </div>
          <div class="poll-choices">
            ${choicesHTML}
          </div>
          <div class="poll-instruction">
            <p>원하는 선택지를 클릭하여 투표해주세요</p>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Challenge 슬라이드 처리
   */
  processChallengeSlide(content, title) {
    // 입력 섹션 추출
    const inputMatch = content.match(/## 입력 \(Input\)\s*\n([\s\S]*?)(?=\n##|$)/);
    const inputContent = inputMatch ? inputMatch[1].trim() : '';

    // AI 도구 섹션 추출
    const aiToolMatch = content.match(/## AI 도구\s*\n([\s\S]*?)(?=\n##|$)/);
    const aiToolContent = aiToolMatch ? aiToolMatch[1].trim() : '';

    // 출력 섹션 추출
    const outputMatch = content.match(/## 출력 \(Output\)\s*\n([\s\S]*?)(?=\n##|$)/);
    const outputContent = outputMatch ? outputMatch[1].trim() : '';

    // 적용 아이디어 섹션 추출
    const applicationMatch = content.match(/## 적용 아이디어\s*\n([\s\S]*?)(?=\n##|$)/);
    const applicationContent = applicationMatch ? applicationMatch[1].trim() : '';

    // 기대 효과 섹션 추출
    const benefitsMatch = content.match(/## 기대 효과\s*\n([\s\S]*?)(?=\n##|$)/);
    const benefitsContent = benefitsMatch ? benefitsMatch[1].trim() : '';

    // AI 도구 정보 파싱
    let aiToolName = '';
    let aiToolDescription = '';
    if (aiToolContent) {
      const toolMatch = aiToolContent.match(/#\d+\s*(.+?)\s*\n(.+?)(?=\n|$)/);
      if (toolMatch) {
        aiToolName = toolMatch[1].trim();
        aiToolDescription = toolMatch[2].trim();
      }
    }

    // 입력 리스트 파싱
    const inputList = [];
    if (inputContent) {
      const inputMatches = inputContent.match(/^[-*]\s*(.+)$/gm);
      if (inputMatches) {
        inputList.push(...inputMatches.map((match) => match.replace(/^[-*]\s*/, '').trim()));
      }
    }

    // 출력 리스트 파싱
    const outputList = [];
    if (outputContent) {
      const outputMatches = outputContent.match(/^[-*]\s*(.+)$/gm);
      if (outputMatches) {
        outputList.push(...outputMatches.map((match) => match.replace(/^[-*]\s*/, '').trim()));
      }
    }

    // 혜택 리스트 파싱
    const benefitsList = [];
    if (benefitsContent) {
      const benefitMatches = benefitsContent.match(/^[-*]\s*(.+)$/gm);
      if (benefitMatches) {
        benefitsList.push(...benefitMatches.map((match) => match.replace(/^[-*]\s*/, '').trim()));
      }
    }

    return `
      <div class="workflow-container">
        <div class="workflow-step input">
          <span class="step-icon">📥</span>
          <div class="step-title">입력 (Input)</div>
          <div class="step-content">
            ${inputList.map((item) => `<div>• ${item}</div>`).join('')}
          </div>
        </div>
        <div class="workflow-arrow">→</div>
        <div class="workflow-step ai-tool">
          <span class="step-icon">🤖</span>
          <div class="step-title">${aiToolName}</div>
          <div class="step-content">${aiToolDescription}</div>
          <div class="ai-highlight ${aiToolName.toLowerCase()}">${aiToolName}</div>
        </div>
        <div class="workflow-arrow">→</div>
        <div class="workflow-step output">
          <span class="step-icon">📤</span>
          <div class="step-title">출력 (Output)</div>
          <div class="step-content">
            ${outputList.map((item) => `<div>• ${item}</div>`).join('')}
          </div>
        </div>
      </div>

      ${
        applicationContent
          ? `
        <div class="application-section">
          <div class="application-title">실전 응용</div>
          <div class="application-content">
            <div class="qr-visual">💡</div>
            <div>${applicationContent}</div>
          </div>
        </div>
      `
          : ''
      }

      ${
        benefitsList.length > 0
          ? `
        <div class="benefits">
          <div class="benefits-title">🎯 기대 효과</div>
          <ul class="benefits-list">
            ${benefitsList.map((benefit) => `<li>${benefit}</li>`).join('')}
          </ul>
        </div>
      `
          : ''
      }
    `;
  }

  /**
   * Chapter 슬라이드 처리
   */
  processChapterSlide(content, title) {
    const htmlContent = this.convertMarkdownToHTML(content);
    return `
      <div class="slide slide-top">
        <div class="slide-header">
          <h1>${title}</h1>
        </div>
        <div class="content">
          ${htmlContent}
        </div>
      </div>
    `;
  }

  /**
   * General 슬라이드 처리
   */
  processGeneralSlide(content, title) {
    const titleMatch = content.match(/^#\s*(.+)$/m);
    const subtitleMatch = content.match(/^##\s*(.+)$/m);

    let mainTitle = titleMatch ? titleMatch[1].trim() : title;
    let subtitle = subtitleMatch ? subtitleMatch[1].trim() : '';

    if (!titleMatch && !subtitleMatch) {
      const firstH3Match = content.match(/^###\s*(.+)$/m);
      const firstH4Match = content.match(/^####\s*(.+)$/m);
      if (firstH3Match) {
        mainTitle = title;
        subtitle = firstH3Match[1].trim();
      } else if (firstH4Match) {
        mainTitle = title;
        subtitle = firstH4Match[1].trim();
      }
    }

    if (!subtitle) {
      const firstGroupMatch = content.match(/^#{3,4}\s*(.+)$/m);
      if (firstGroupMatch) {
        subtitle = firstGroupMatch[1].trim();
      }
    }

    if (subtitle) {
      subtitle = subtitle.replace(/^#+\s*/, '');
    }

    const emojiMatch = mainTitle.match(/^([^\s#]+)\s*(.+)$/);
    const emoji = emojiMatch ? emojiMatch[1] : '💬';
    const titleText = emojiMatch ? emojiMatch[2] : mainTitle;

    const convertMarkdownToHTML = (text) => {
      return text
        .replace(/^####\s*(.+)$/gm, '<h4>$1</h4>')
        .replace(/^###\s*(.+)$/gm, '<h3>$1</h3>')
        .replace(/^##\s*(.+)$/gm, '<h2>$1</h2>')
        .replace(/^#\s*(.+)$/gm, '<h1>$1</h1>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em>$1</em>')
        .replace(
          /!\[([^\]]*)\]\(([^)]+)\)/g,
          '<img src="$2" alt="$1" style="max-width: 100%; height: auto;">',
        );
    };

    const contentGroups = [];
    const lines = content.split('\n');
    let currentGroup = null;
    let currentItems = [];
    let currentContent = '';

    for (const line of lines) {
      const groupMatch = line.match(/^#{2,4}\s*(.+)$/);
      if (groupMatch) {
        if (currentGroup) {
          contentGroups.push({
            title: currentGroup,
            items: currentItems,
            content: currentContent.trim(),
          });
        }
        currentGroup = line.trim();
        currentItems = [];
        currentContent = '';
        continue;
      }

      const itemMatch = line.match(/^-\s*(.+)$/);
      if (itemMatch) {
        const itemText = itemMatch[1].trim();
        const englishMatch = itemText.match(/\(([^)]+)\)$/);
        const englishText = englishMatch ? englishMatch[1] : '';
        const koreanText = englishText ? itemText.replace(/\([^)]+\)$/, '').trim() : itemText;
        const emphasizedText = koreanText.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

        currentItems.push({
          text: emphasizedText,
          english: englishText,
        });
      } else if (line.trim() && !line.startsWith('#') && !line.startsWith('@')) {
        currentContent += line + '\n';
      }
    }

    if (currentGroup) {
      contentGroups.push({
        title: currentGroup,
        items: currentItems,
        content: currentContent.trim(),
      });
    }

    if (contentGroups.length === 0 && (currentItems.length > 0 || currentContent.trim())) {
      contentGroups.push({
        title: '### 내용',
        items: currentItems,
        content: currentContent.trim(),
      });
    }

    const contentGroupsHTML = contentGroups
      .map((group) => {
        const isQuestionList = group.title.includes('성찰') || group.title.includes('질문');
        const listClass = isQuestionList ? 'question-list' : '';

        const itemsHTML = group.items
          .map((item) => {
            const englishSpan = item.english
              ? `<span class="english-text">(${item.english})</span>`
              : '';
            return `<li class="content-item slide-up">${item.text}${englishSpan}</li>`;
          })
          .join('');

        const contentHTML = group.content
          ? `<div class="group-content">${convertMarkdownToHTML(group.content)}</div>`
          : '';

        return `
        <div class="content-group slide-up">
          <div class="group-title">${convertMarkdownToHTML(group.title)}</div>
          ${contentHTML}
          ${itemsHTML ? `<ul class="content-list ${listClass}">${itemsHTML}</ul>` : ''}
        </div>
      `;
      })
      .join('');

    return `
      <div class="header-section">
        <div class="category-badge">@general</div>
        <div class="main-title">
          <h1 class="title-text">
            <span class="title-emoji">${emoji}</span>${titleText}
          </h1>
          ${subtitle ? `<p class="subtitle">${subtitle}</p>` : ''}
        </div>
      </div>

      <div class="content-section">
        ${contentGroupsHTML}
      </div>
    `;
  }

  /**
   * 기본 슬라이드 처리
   */
  processDefaultSlide(content, title) {
    const htmlContent = this.convertMarkdownToHTML(content);
    return `
      <div class="slide slide-top">
        <div class="slide-content">
          ${htmlContent}
        </div>
      </div>
    `;
  }

  /**
   * Cover 슬라이드용 HTML 템플릿 생성
   */
  generateCoverHTMLTemplate(content, title, slideNumber) {
    // 다음 슬라이드 번호 계산
    const nextSlideNumber = this.getNextSlideNumber(slideNumber);
    const prevSlideNumber = this.getPrevSlideNumber(slideNumber);

    return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif;
            background: linear-gradient(135deg, #1e40af 0%, #3730a3 50%, #1d4ed8 100%);
            color: white;
            overflow: hidden;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }

        /* 배경 애니메이션 */
        body::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
            background-size: 50px 50px;
            animation: backgroundMove 20s linear infinite;
            z-index: 1;
        }

        @keyframes backgroundMove {
            0% { transform: translate(0, 0) rotate(0deg); }
            100% { transform: translate(-50px, -50px) rotate(360deg); }
        }

        .slide-container {
            text-align: center;
            max-width: 1000px;
            padding: 60px 40px;
            position: relative;
            z-index: 10;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border-radius: 30px;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        h1 {
            font-size: 4rem;
            font-weight: 800;
            margin-bottom: 40px;
            text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
            animation: fadeInUp 1.2s ease;
            background: linear-gradient(45deg, #ffffff, #bfdbfe);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            line-height: 1.2;
        }

        h2 {
            font-size: 2.5rem;
            font-weight: 600;
            margin-bottom: 30px;
            color: #dbeafe;
            animation: fadeInUp 1.2s ease 0.3s both;
            text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
        }

        h3 {
            font-size: 2rem;
            font-weight: 400;
            margin-bottom: 20px;
            color: #bfdbfe;
            animation: fadeInUp 1.2s ease 0.6s both;
        }

        h4 {
            font-size: 1.8rem;
            font-weight: 500;
            color: #93c5fd;
            animation: fadeInUp 1.2s ease 0.9s both;
            margin-top: 40px;
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

        /* 반응형 디자인 */
        @media (max-width: 768px) {
            .slide-container {
                padding: 40px 20px;
                margin: 20px;
            }

            h1 {
                font-size: 2.8rem;
            }

            h2 {
                font-size: 1.8rem;
            }

            h3 {
                font-size: 1.4rem;
            }

            h4 {
                font-size: 1.2rem;
            }
        }

        @media (max-width: 480px) {
            .slide-container {
                padding: 30px 15px;
            }

            h1 {
                font-size: 2.2rem;
            }

            h2 {
                font-size: 1.5rem;
            }

            h3 {
                font-size: 1.2rem;
            }

            h4 {
                font-size: 1rem;
            }
        }

        /* 접근성 */
        .slide-container:focus {
            outline: 3px solid #60a5fa;
            outline-offset: 5px;
        }

        /* 인쇄 스타일 */
        @media print {
            body {
                background: white;
                color: black;
            }

            .slide-container {
                background: white;
                box-shadow: none;
                border: 2px solid #000;
            }

            h1, h2, h3, h4 {
                color: black;
                text-shadow: none;
            }
        }

        /* 네비게이션 힌트 */
        .nav-hint {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: rgba(255, 255, 255, 0.2);
            color: white;
            padding: 12px 20px;
            border-radius: 25px;
            font-size: 0.9rem;
            z-index: 1000;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
        }
    </style>
</head>
<body>
    <div class="nav-hint">
        스페이스바 또는 → 키로 다음 슬라이드
    </div>

    ${content}

    <script>
        // 키보드 네비게이션
        document.addEventListener('keydown', function(e) {
            switch(e.key) {
                case 'ArrowRight':
                case ' ':
                    window.location.href = 'slide-${nextSlideNumber}.html';
                    break;
                case 'ArrowLeft':
                    ${prevSlideNumber ? `window.location.href = 'slide-${prevSlideNumber}.html';` : '// 이전 슬라이드 (없음)'}
                    break;
                case 'Home':
                    window.location.href = 'slide-0-0.html';
                    break;
                case 'End':
                    window.location.href = 'slide-10-9.html';
                    break;
            }
        });

        // 클릭으로 다음 슬라이드
        document.querySelector('.slide-container').addEventListener('click', function() {
            window.location.href = 'slide-${nextSlideNumber}.html';
        });

        // 로드 애니메이션
        window.addEventListener('load', function() {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });
    </script>
</body>
</html>`;
  }

  /**
   * 다음 슬라이드 번호 계산
   */
  getNextSlideNumber(currentSlideNumber) {
    const [chapter, slide] = currentSlideNumber.split('-').map(Number);

    // 현재 챕터의 마지막 슬라이드 번호들
    const lastSlides = {
      0: 26,
      1: 5,
      2: 9,
      3: 13,
      4: 8,
      5: 52,
      6: 9,
      7: 27,
      8: 27,
      9: 8,
      10: 9,
    };

    if (slide < lastSlides[chapter]) {
      return `${chapter}-${slide + 1}`;
    } else if (chapter < 10) {
      return `${chapter + 1}-0`;
    } else {
      return '0-0'; // 마지막 슬라이드면 처음으로
    }
  }

  /**
   * 이전 슬라이드 번호 계산
   */
  getPrevSlideNumber(currentSlideNumber) {
    const [chapter, slide] = currentSlideNumber.split('-').map(Number);

    if (slide > 0) {
      return `${chapter}-${slide - 1}`;
    } else if (chapter > 0) {
      // 이전 챕터의 마지막 슬라이드
      const prevChapterLastSlides = {
        1: 5,
        2: 9,
        3: 13,
        4: 8,
        5: 52,
        6: 9,
        7: 27,
        8: 27,
        9: 8,
        10: 9,
      };
      return `${chapter - 1}-${prevChapterLastSlides[chapter - 1] || 0}`;
    } else {
      return null; // 첫 번째 슬라이드
    }
  }

  /**
   * Challenge 슬라이드용 HTML 템플릿 생성
   */
  generateChallengeHTMLTemplate(content, title, slideNumber) {
    return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Challenge Content</title>
    <style>
        /* ===============================================
           Challenge Slide Template CSS
           Interactive Workshop & Presentation Design
           =============================================== */

        /* Reset & Base Styles */
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
            line-height: 1.6;
        }

        /* ===============================================
           Slide Header
           =============================================== */

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

        /* Challenge Badge */
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
            animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
        }

        /* Badge Variations */
        .challenge-badge.level-1 { background: #ff6b6b; }
        .challenge-badge.level-2 { background: #4ECDC4; }
        .challenge-badge.level-3 { background: #45B7D1; }
        .challenge-badge.level-4 { background: #96CEB4; }
        .challenge-badge.level-5 { background: #FFEAA7; color: #2d3436; }

        .slide-header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            font-weight: bold;
            line-height: 1.2;
        }

        .time-badge {
            background: rgba(255,255,255,0.2);
            padding: 5px 15px;
            border-radius: 15px;
            font-size: 1em;
            margin-top: 10px;
            display: inline-block;
        }

        /* ===============================================
           Content Area
           =============================================== */

        .content {
            max-width: 1000px;
            margin: 0 auto;
            text-align: left;
        }

        /* ===============================================
           Workflow Container
           =============================================== */

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
            position: relative;
        }

        .workflow-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #4ECDC4, #45B7D1, #96CEB4);
            border-radius: 15px 15px 0 0;
        }

        /* ===============================================
           Workflow Steps
           =============================================== */

        .workflow-step {
            text-align: center;
            padding: 25px 15px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            position: relative;
            min-height: 180px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .workflow-step:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        /* Step Type Styles */
        .workflow-step.input {
            border-top: 4px solid #4ECDC4;
        }

        .workflow-step.input:hover {
            background: linear-gradient(135deg, #f0fdfc, #e6fffa);
        }

        .workflow-step.ai-tool {
            border-top: 4px solid #FF6B6B;
        }

        .workflow-step.ai-tool:hover {
            background: linear-gradient(135deg, #fff5f5, #fed7d7);
        }

        .workflow-step.output {
            border-top: 4px solid #45B7D1;
        }

        .workflow-step.output:hover {
            background: linear-gradient(135deg, #f0f9ff, #dbeafe);
        }

        .workflow-step.process {
            border-top: 4px solid #96CEB4;
        }

        .workflow-step.process:hover {
            background: linear-gradient(135deg, #f0fdf4, #dcfce7);
        }

        /* Step Content */
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

        /* AI Tool Highlight */
        .ai-highlight {
            background: linear-gradient(135deg, #FF6B6B, #FF8E8E);
            color: white;
            padding: 8px 15px;
            border-radius: 20px;
            font-weight: bold;
            display: inline-block;
            margin-top: 5px;
            box-shadow: 0 2px 10px rgba(255,107,107,0.3);
        }

        /* AI Tool Variations */
        .ai-highlight.chatgpt { background: linear-gradient(135deg, #10a37f, #1a7f64); }
        .ai-highlight.claude { background: linear-gradient(135deg, #d97706, #ea580c); }
        .ai-highlight.gemini { background: linear-gradient(135deg, #4285f4, #1a73e8); }
        .ai-highlight.copilot { background: linear-gradient(135deg, #0078d4, #106ebe); }

        /* Workflow Arrow */
        .workflow-arrow {
            font-size: 2em;
            color: #005A9C;
            text-align: center;
            animation: pulse 2s ease-in-out infinite;
            transition: all 0.3s ease;
        }

        .workflow-arrow:hover {
            transform: scale(1.2);
            color: #003366;
        }

        /* ===============================================
           Application Section
           =============================================== */

        .application-section {
            background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
            padding: 25px;
            border-radius: 15px;
            border-left: 6px solid #2e7d32;
            margin-top: 30px;
            position: relative;
            transition: all 0.3s ease;
        }

        .application-section:hover {
            transform: translateX(5px);
            box-shadow: 0 8px 25px rgba(46,125,50,0.2);
        }

        .application-section::before {
            content: '💡';
            font-size: 1.8em;
            position: absolute;
            top: -15px;
            left: 25px;
            background: white;
            padding: 0 10px;
            border-radius: 50%;
        }

        .application-title {
            font-size: 1.3em;
            font-weight: bold;
            color: #2e7d32;
            margin-bottom: 15px;
            margin-left: 25px;
        }

        .application-content {
            font-size: 1.1em;
            color: #1b5e20;
            display: flex;
            align-items: center;
            gap: 15px;
            line-height: 1.6;
        }

        /* Visual Elements */
        .qr-visual {
            background: #fff;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            font-size: 2em;
            min-width: 60px;
            text-align: center;
            transition: all 0.3s ease;
        }

        .qr-visual:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }

        /* ===============================================
           Benefits Section
           =============================================== */

        .benefits {
            background: linear-gradient(135deg, #fff3e0, #ffe0b2);
            padding: 20px;
            border-radius: 12px;
            margin-top: 25px;
            border-left: 5px solid #ff9800;
            transition: all 0.3s ease;
        }

        .benefits:hover {
            transform: translateX(5px);
            box-shadow: 0 8px 25px rgba(255,152,0,0.2);
        }

        .benefits-title {
            font-size: 1.2em;
            font-weight: bold;
            color: #e65100;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .benefits-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 10px;
            list-style: none;
        }

        .benefits-list li {
            padding: 8px 0;
            color: #bf360c;
            position: relative;
            padding-left: 20px;
            transition: all 0.3s ease;
        }

        .benefits-list li::before {
            content: '✓';
            color: #ff9800;
            font-weight: bold;
            position: absolute;
            left: 0;
            transition: all 0.3s ease;
        }

        .benefits-list li:hover {
            color: #d84315;
            transform: translateX(3px);
        }

        .benefits-list li:hover::before {
            color: #f57c00;
            transform: scale(1.2);
        }

        /* ===============================================
           Additional Sections
           =============================================== */

        /* Requirements Section */
        .requirements-section {
            background: linear-gradient(135deg, #e3f2fd, #bbdefb);
            padding: 25px;
            border-radius: 15px;
            border-left: 6px solid #1976d2;
            margin-top: 30px;
            position: relative;
        }

        .requirements-section::before {
            content: '📋';
            font-size: 1.8em;
            position: absolute;
            top: -15px;
            left: 25px;
            background: white;
            padding: 0 10px;
            border-radius: 50%;
        }

        /* Steps Section */
        .steps-section {
            background: linear-gradient(135deg, #f3e5f5, #e1bee7);
            padding: 25px;
            border-radius: 15px;
            border-left: 6px solid #7b1fa2;
            margin-top: 30px;
            position: relative;
        }

        .steps-section::before {
            content: '📝';
            font-size: 1.8em;
            position: absolute;
            top: -15px;
            left: 25px;
            background: white;
            padding: 0 10px;
            border-radius: 50%;
        }

        .step-item {
            display: flex;
            align-items: flex-start;
            gap: 15px;
            margin-bottom: 15px;
            padding: 15px;
            background: rgba(255,255,255,0.7);
            border-radius: 10px;
        }

        .step-number {
            background: #7b1fa2;
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            flex-shrink: 0;
        }

        /* ===============================================
           Difficulty Levels
           =============================================== */

        .difficulty-easy {
            --primary-color: #4CAF50;
            --secondary-color: #81C784;
            --accent-color: #A5D6A7;
        }

        .difficulty-medium {
            --primary-color: #FF9800;
            --secondary-color: #FFB74D;
            --accent-color: #FFCC80;
        }

        .difficulty-hard {
            --primary-color: #F44336;
            --secondary-color: #E57373;
            --accent-color: #FFAB91;
        }

        .difficulty-expert {
            --primary-color: #9C27B0;
            --secondary-color: #BA68C8;
            --accent-color: #CE93D8;
        }

        /* Apply difficulty colors */
        .difficulty-easy .challenge-badge,
        .difficulty-medium .challenge-badge,
        .difficulty-hard .challenge-badge,
        .difficulty-expert .challenge-badge {
            background: var(--primary-color);
        }

        .difficulty-easy .workflow-step.input,
        .difficulty-medium .workflow-step.input,
        .difficulty-hard .workflow-step.input,
        .difficulty-expert .workflow-step.input {
            border-top-color: var(--primary-color);
        }

        /* ===============================================
           Responsive Design
           =============================================== */

        @media (max-width: 768px) {
            body {
                padding: 40px 20px;
            }

            .slide-header {
                margin: -40px -20px 30px -20px;
                padding: 25px 15px;
            }

            .slide-header h1 {
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

            .step-item {
                flex-direction: column;
                text-align: center;
            }
        }

        @media (max-width: 480px) {
            body {
                padding: 20px 10px;
            }

            .slide-header {
                margin: -20px -10px 20px -10px;
                padding: 20px 10px;
            }

            .slide-header h1 {
                font-size: 1.5em;
            }

            .workflow-step {
                padding: 20px 10px;
                min-height: 140px;
            }

            .step-icon {
                font-size: 2em;
            }

            .content {
                max-width: 100%;
            }
        }

        /* ===============================================
           Animation & Interaction Utilities
           =============================================== */

        .fade-in {
            animation: fadeIn 0.6s ease-in-out;
        }

        .slide-up {
            animation: slideUp 0.6s ease-out;
        }

        .bounce-in {
            animation: bounceIn 0.8s ease-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes bounceIn {
            0% {
                opacity: 0;
                transform: scale(0.3);
            }
            50% {
                opacity: 1;
                transform: scale(1.05);
            }
            70% {
                transform: scale(0.9);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }

        /* Sequential Animation Delays */
        .workflow-step:nth-child(1) { animation-delay: 0.1s; }
        .workflow-step:nth-child(3) { animation-delay: 0.3s; }
        .workflow-step:nth-child(5) { animation-delay: 0.5s; }

        /* ===============================================
           Print Styles
           =============================================== */

        @media print {
            body {
                background: white;
                padding: 20px;
            }

            .slide-header {
                background: #003366 !important;
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
            }

            .workflow-container {
                break-inside: avoid;
            }

            .application-section,
            .benefits {
                break-inside: avoid;
            }

            .workflow-step:hover,
            .application-section:hover,
            .benefits:hover {
                transform: none;
            }
        }

        /* ===============================================
           Utility Classes
           =============================================== */

        .text-center { text-align: center; }
        .text-left { text-align: left; }
        .text-right { text-align: right; }

        .mb-1 { margin-bottom: 0.5rem; }
        .mb-2 { margin-bottom: 1rem; }
        .mb-3 { margin-bottom: 1.5rem; }
        .mb-4 { margin-bottom: 2rem; }

        .mt-1 { margin-top: 0.5rem; }
        .mt-2 { margin-top: 1rem; }
        .mt-3 { margin-top: 1.5rem; }
        .mt-4 { margin-top: 2rem; }

        .hidden { display: none; }
        .visible { display: block; }

        .highlight {
            background: linear-gradient(135deg, #fff3cd, #ffeaa7);
            padding: 2px 6px;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="slide-header">
        <div class="challenge-badge level-1">CHALLENGE</div>
        <h1>${title}</h1>
        <div class="time-badge">⏱️ 15-20분</div>
    </div>

    <div class="content">
        ${content}
    </div>

    <script>
        // 페이지 로드 시 애니메이션 초기화
        document.addEventListener('DOMContentLoaded', function() {
            // 순차적 애니메이션을 위한 observer 설정
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            // 애니메이션 대상 요소들 관찰
            document.querySelectorAll('.workflow-step, .application-section, .benefits, .step-item').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });

            // 워크플로우 스텝 클릭 이벤트
            document.querySelectorAll('.workflow-step').forEach(step => {
                step.addEventListener('click', function() {
                    // 클릭된 스텝 하이라이트 효과
                    this.style.transform = 'translateY(-8px) scale(1.02)';
                    this.style.boxShadow = '0 12px 30px rgba(0,0,0,0.2)';

                    setTimeout(() => {
                        this.style.transform = '';
                        this.style.boxShadow = '';
                    }, 1000);
                });
            });

            // 혜택 리스트 아이템 호버 효과
            document.querySelectorAll('.benefits-list li').forEach(item => {
                item.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateX(5px)';
                });

                item.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateX(0)';
                });
            });
        });

        // 스크롤 이벤트로 순차적 애니메이션 효과
        let animationTimeout;
        window.addEventListener('scroll', function() {
            clearTimeout(animationTimeout);
            animationTimeout = setTimeout(() => {
                document.querySelectorAll('.workflow-step').forEach((item, index) => {
                    if (isElementInViewport(item)) {
                        setTimeout(() => {
                            item.classList.add('slide-up');
                        }, index * 200);
                    }
                });
            }, 50);
        });

        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
    </script>
</body>
</html>`;
  }

  /**
   * Example 슬라이드용 HTML 템플릿 생성
   */
  generateExampleHTMLTemplate(content, title, slideNumber) {
    return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Example Content</title>
    <style>
        /* ===============================================
           Technique Slide Template CSS
           Educational & Training Presentation Design
           =============================================== */

        /* Reset & Base Styles */
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
            line-height: 1.6;
        }

        /* ===============================================
           Slide Header
           =============================================== */

        .slide-header {
            background: linear-gradient(135deg, #003366, #005A9C);
            color: white;
            padding: 20px;
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

        /* Header Variations */
        .slide-header.theme-blue {
            background: linear-gradient(135deg, #1e3a8a, #3b82f6);
        }

        .slide-header.theme-green {
            background: linear-gradient(135deg, #166534, #22c55e);
        }

        .slide-header.theme-purple {
            background: linear-gradient(135deg, #581c87, #a855f7);
        }

        .slide-header.theme-red {
            background: linear-gradient(135deg, #991b1b, #ef4444);
        }

        .slide-header h1,
        .slide-header h2 {
            font-size: 2em;
            margin-bottom: 10px;
            font-weight: bold;
        }

        .slide-subtitle {
            font-size: 1.2em;
            opacity: 0.9;
            font-weight: normal;
        }

        /* ===============================================
           Content Area
           =============================================== */

        .content {
            max-width: 900px;
            margin: 0 auto;
            text-align: left;
        }

        .content.wide {
            max-width: 1200px;
        }

        .content.narrow {
            max-width: 700px;
        }

        /* ===============================================
           Technique Components
           =============================================== */

        /* Technique Number Badge */
        .technique-number {
            background: #005A9C;
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5em;
            font-weight: bold;
            margin: 0 auto 20px auto;
            box-shadow: 0 4px 15px rgba(0,90,156,0.3);
            transition: all 0.3s ease;
        }

        .technique-number:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(0,90,156,0.4);
        }

        /* Number Badge Variations */
        .technique-number.level-1 { background: #22c55e; }
        .technique-number.level-2 { background: #3b82f6; }
        .technique-number.level-3 { background: #f59e0b; }
        .technique-number.level-4 { background: #ef4444; }
        .technique-number.level-5 { background: #8b5cf6; }

        /* Technique Title */
        .technique-title {
            font-size: 2em;
            color: #003366;
            margin-bottom: 30px;
            border-bottom: 3px solid #005A9C;
            padding-bottom: 15px;
            text-align: center;
            transition: all 0.3s ease;
        }

        .technique-title:hover {
            color: #001a33;
            border-bottom-color: #003366;
        }

        /* Description */
        .description {
            font-size: 1.1em;
            margin-bottom: 20px;
            line-height: 1.6;
            text-align: center;
            color: #4a5568;
            padding: 0 20px;
        }

        /* ===============================================
           Example Containers
           =============================================== */

        .example-container {
            display: flex;
            gap: 20px;
            margin: 30px 0;
            flex-wrap: wrap;
        }

        .example-container.vertical {
            flex-direction: column;
        }

        .example-container.single {
            justify-content: center;
        }

        /* Example Boxes */
        .example-box {
            flex: 1;
            min-width: 300px;
            padding: 20px;
            border-radius: 12px;
            border-left: 6px solid;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            position: relative;
        }

        .example-box:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        /* Bad Example */
        .bad-example {
            background: linear-gradient(135deg, #ffebee, #ffcdd2);
            border-left-color: #c62828;
        }

        .bad-example:hover {
            background: linear-gradient(135deg, #ffcdd2, #ef9a9a);
        }

        /* Good Example */
        .good-example {
            background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
            border-left-color: #2e7d32;
        }

        .good-example:hover {
            background: linear-gradient(135deg, #c8e6c9, #a5d6a7);
        }

        /* Neutral Example */
        .neutral-example {
            background: linear-gradient(135deg, #e3f2fd, #bbdefb);
            border-left-color: #1976d2;
        }

        .neutral-example:hover {
            background: linear-gradient(135deg, #bbdefb, #90caf9);
        }

        /* Warning Example */
        .warning-example {
            background: linear-gradient(135deg, #fff3e0, #ffe0b2);
            border-left-color: #f57c00;
        }

        .warning-example:hover {
            background: linear-gradient(135deg, #ffe0b2, #ffcc80);
        }

        /* Example Title */
        .example-title {
            font-weight: bold;
            font-size: 1.1em;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        /* Example Content */
        .example-content {
            font-size: 1em;
            line-height: 1.5;
            color: #2d3748;
        }

        .example-content code {
            background: rgba(0,0,0,0.1);
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
        }

        /* ===============================================
           Key Point Section
           =============================================== */

        .key-point {
            background: linear-gradient(135deg, #fffde7, #fff9c4);
            padding: 20px;
            border-radius: 12px;
            border: 2px solid #fbc02d;
            margin: 25px 0;
            position: relative;
            transition: all 0.3s ease;
        }

        .key-point:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(251,192,45,0.2);
        }

        .key-point::before {
            content: '💡';
            font-size: 1.5em;
            position: absolute;
            top: -10px;
            left: 20px;
            background: white;
            padding: 0 10px;
            border-radius: 50%;
        }

        /* Key Point Variations */
        .key-point.tip::before { content: '💡'; }
        .key-point.warning::before { content: '⚠️'; }
        .key-point.info::before { content: 'ℹ️'; }
        .key-point.success::before { content: '✅'; }
        .key-point.error::before { content: '❌'; }

        .key-point.warning {
            background: linear-gradient(135deg, #fff3e0, #ffe0b2);
            border-color: #f57c00;
        }

        .key-point.info {
            background: linear-gradient(135deg, #e3f2fd, #bbdefb);
            border-color: #1976d2;
        }

        .key-point.success {
            background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
            border-color: #2e7d32;
        }

        .key-point.error {
            background: linear-gradient(135deg, #ffebee, #ffcdd2);
            border-color: #c62828;
        }

        .key-title {
            font-weight: bold;
            color: #f57f17;
            margin-bottom: 10px;
            margin-left: 25px;
            font-size: 1.1em;
        }

        .key-point.warning .key-title { color: #e65100; }
        .key-point.info .key-title { color: #0d47a1; }
        .key-point.success .key-title { color: #1b5e20; }
        .key-point.error .key-title { color: #b71c1c; }

        .key-content {
            margin-left: 25px;
            line-height: 1.6;
        }

        /* ===============================================
           Additional Components
           =============================================== */

        /* Step by Step Guide */
        .steps-container {
            margin: 30px 0;
        }

        .step-item {
            display: flex;
            align-items: flex-start;
            gap: 15px;
            margin-bottom: 20px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 12px;
            border-left: 4px solid #6c757d;
            transition: all 0.3s ease;
        }

        .step-item:hover {
            background: #e9ecef;
            transform: translateX(5px);
        }

        .step-number {
            background: #6c757d;
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            flex-shrink: 0;
        }

        .step-content {
            flex: 1;
        }

        .step-title {
            font-weight: bold;
            margin-bottom: 5px;
            color: #2d3748;
        }

        .step-description {
            color: #4a5568;
            line-height: 1.5;
        }

        /* Comparison Table */
        .comparison-table {
            width: 100%;
            border-collapse: collapse;
            margin: 30px 0;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .comparison-table th,
        .comparison-table td {
            padding: 15px;
            text-align: left;
            border-bottom: 1px solid #e2e8f0;
        }

        .comparison-table th {
            background: #f8f9fa;
            font-weight: bold;
            color: #2d3748;
        }

        .comparison-table tr:hover {
            background: #f8f9fa;
        }

        /* Quote Section */
        .quote-section {
            background: linear-gradient(135deg, #f7fafc, #edf2f7);
            padding: 30px;
            border-radius: 15px;
            border-left: 6px solid #4299e1;
            margin: 30px 0;
            position: relative;
        }

        .quote-section::before {
            content: '"';
            font-size: 4em;
            color: #4299e1;
            position: absolute;
            top: 10px;
            left: 20px;
            opacity: 0.3;
        }

        .quote-text {
            font-size: 1.2em;
            font-style: italic;
            margin-left: 40px;
            color: #2d3748;
            line-height: 1.6;
        }

        .quote-author {
            text-align: right;
            margin-top: 15px;
            font-weight: bold;
            color: #4a5568;
        }

        /* ===============================================
           Layout Variations
           =============================================== */

        .two-column {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin: 30px 0;
        }

        .three-column {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin: 30px 0;
        }

        /* ===============================================
           Animation & Effects
           =============================================== */

        .fade-in {
            animation: fadeIn 0.6s ease-in-out;
        }

        .slide-up {
            animation: slideUp 0.6s ease-out;
        }

        .bounce-in {
            animation: bounceIn 0.8s ease-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes bounceIn {
            0% {
                opacity: 0;
                transform: scale(0.3);
            }
            50% {
                opacity: 1;
                transform: scale(1.05);
            }
            70% {
                transform: scale(0.9);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }

        /* Sequential Animation Delays */
        .example-box:nth-child(1) { animation-delay: 0.1s; }
        .example-box:nth-child(2) { animation-delay: 0.3s; }
        .example-box:nth-child(3) { animation-delay: 0.5s; }

        /* ===============================================
           Responsive Design
           =============================================== */

        @media (max-width: 768px) {
            body {
                padding: 40px 20px;
            }

            .slide-header {
                margin: -40px -20px 30px -20px;
                padding: 20px 15px;
            }

            .slide-header h1,
            .slide-header h2 {
                font-size: 1.5em;
            }

            .technique-title {
                font-size: 1.5em;
            }

            .example-container {
                flex-direction: column;
                gap: 15px;
            }

            .example-box {
                min-width: unset;
            }

            .two-column,
            .three-column {
                grid-template-columns: 1fr;
                gap: 20px;
            }

            .step-item {
                flex-direction: column;
                text-align: center;
                gap: 10px;
            }

            .comparison-table {
                font-size: 0.9em;
            }
        }

        @media (max-width: 480px) {
            body {
                padding: 20px 10px;
            }

            .slide-header {
                margin: -20px -10px 20px -10px;
            }

            .content {
                max-width: 100%;
            }

            .technique-number {
                width: 40px;
                height: 40px;
                font-size: 1.2em;
            }

            .description {
                font-size: 1em;
                padding: 0 10px;
            }

            .quote-section {
                padding: 20px 15px;
            }

            .quote-text {
                margin-left: 20px;
                font-size: 1.1em;
            }
        }

        /* ===============================================
           Print Styles
           =============================================== */

        @media print {
            body {
                background: white;
                padding: 20px;
            }

            .slide-header {
                background: #003366 !important;
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
            }

            .example-container {
                break-inside: avoid;
            }

            .key-point {
                break-inside: avoid;
            }

            .example-box:hover,
            .key-point:hover,
            .step-item:hover {
                transform: none;
            }
        }

        /* ===============================================
           Utility Classes
           =============================================== */

        .text-center { text-align: center; }
        .text-left { text-align: left; }
        .text-right { text-align: right; }

        .mb-1 { margin-bottom: 0.5rem; }
        .mb-2 { margin-bottom: 1rem; }
        .mb-3 { margin-bottom: 1.5rem; }
        .mb-4 { margin-bottom: 2rem; }

        .mt-1 { margin-top: 0.5rem; }
        .mt-2 { margin-top: 1rem; }
        .mt-3 { margin-top: 1.5rem; }
        .mt-4 { margin-top: 2rem; }

        .p-1 { padding: 0.5rem; }
        .p-2 { padding: 1rem; }
        .p-3 { padding: 1.5rem; }
        .p-4 { padding: 2rem; }

        .hidden { display: none; }
        .visible { display: block; }

        .highlight {
            background: linear-gradient(135deg, #fff3cd, #ffeaa7);
            padding: 2px 6px;
            border-radius: 4px;
        }

        .bold { font-weight: bold; }
        .italic { font-style: italic; }
    </style>
</head>
<body>
    <div class="slide-header">
        <h1>프롬프팅 기법 가이드</h1>
        <p class="slide-subtitle">실전 활용을 위한 예시와 팁</p>
    </div>

    <div class="content">
        ${content}
    </div>

    <script>
        // 페이지 로드 시 애니메이션 초기화
        document.addEventListener('DOMContentLoaded', function() {
            // 순차적 애니메이션을 위한 observer 설정
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            // 애니메이션 대상 요소들 관찰
            document.querySelectorAll('.example-box, .key-point, .step-item').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });

            // 스크롤 이벤트로 순차적 애니메이션 효과
            let animationTimeout;
            window.addEventListener('scroll', function() {
                clearTimeout(animationTimeout);
                animationTimeout = setTimeout(() => {
                    document.querySelectorAll('.example-box').forEach((item, index) => {
                        if (isElementInViewport(item)) {
                            setTimeout(() => {
                                item.classList.add('slide-up');
                            }, index * 100);
                        }
                    });
                }, 50);
            });

            function isElementInViewport(el) {
                const rect = el.getBoundingClientRect();
                return (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                );
            }
        });

        // 콘텐츠 아이템 클릭 이벤트 (상호작용)
        document.querySelectorAll('.example-box').forEach(item => {
            item.addEventListener('click', function() {
                // 클릭된 아이템 하이라이트 효과
                this.style.background = 'rgba(123, 196, 168, 0.2)';
                this.style.borderRadius = '8px';
                this.style.padding = '10px 10px 10px 30px';

                setTimeout(() => {
                    this.style.background = '';
                    this.style.padding = '';
                }, 2000);
            });
        });
    </script>
</body>
</html>`;
  }

  /**
   * General 슬라이드용 HTML 템플릿 생성
   */
  generateGeneralHTMLTemplate(content, title, slideNumber) {
    return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - General Content</title>
    <style>
        /* ===============================================
           Content Input Slide Template CSS
           Korean Content Presentation Layout
           =============================================== */

        /* Reset & Base Styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Noto Sans KR', 'Malgun Gothic', '굴림', Arial, sans-serif;
            background: #f8f9fa;
            color: #333;
            line-height: 1.6;
            min-height: 100vh;
            padding: 0;
        }

        /* ===============================================
           Main Container
           =============================================== */

        .slide-container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            min-height: 100vh;
            position: relative;
            overflow: hidden;
        }

        /* ===============================================
           Header Section with Geometric Design
           =============================================== */

        .header-section {
            position: relative;
            height: 220px;
            background: linear-gradient(135deg, #2d7d6e 0%, #4a9d8e 70%, #7bc4a8 100%);
            overflow: hidden;
        }

        /* Geometric Shape */
        .header-section::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0 0 220px 150px;
            border-color: transparent transparent #7bc4a8 transparent;
        }

        .header-section::after {
            content: '';
            position: absolute;
            top: 0;
            right: 150px;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0 0 220px 100px;
            border-color: transparent transparent #a8d5c8 transparent;
        }

        /* Category Badge */
        .category-badge {
            position: absolute;
            top: 30px;
            left: 60px;
            background: rgba(255, 255, 255, 0.2);
            color: white;
            padding: 8px 20px;
            border-radius: 25px;
            font-size: 0.9em;
            font-weight: 600;
            z-index: 10;
        }

        /* ===============================================
           Main Title
           =============================================== */

        .main-title {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10;
            text-align: center;
        }

        .title-text {
            font-size: 3.5em;
            font-weight: 700;
            color: #1a472a;
            letter-spacing: -0.02em;
            text-shadow: 0 2px 4px rgba(255,255,255,0.3);
            line-height: 1.2;
            margin-bottom: 15px;
        }

        .title-emoji {
            font-size: 1.2em;
            margin-right: 15px;
        }

        .subtitle {
            font-size: 1.3em;
            color: #2d5f4f;
            font-weight: 500;
            opacity: 0.9;
        }

        /* ===============================================
           Content Section
           =============================================== */

        .content-section {
            padding: 80px 60px;
            display: flex;
            flex-direction: column;
            gap: 50px;
        }

        .content-group {
            background: #e8e9ea;
            border-radius: 15px;
            padding: 45px 55px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.08);
            position: relative;
            transition: all 0.3s ease;
        }

        .content-group:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.12);
        }

        .group-title {
            font-size: 1.4em;
            font-weight: 600;
            color: #1a472a;
            margin-bottom: 25px;
            padding-bottom: 12px;
            border-bottom: 3px solid #7bc4a8;
            display: inline-block;
        }

        .group-subtitle {
            font-size: 1.1em;
            color: #2d5f4f;
            margin-bottom: 20px;
            font-weight: 500;
        }

        /* ===============================================
           Content List
           =============================================== */

        .content-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .content-item {
            margin-bottom: 20px;
            padding-left: 30px;
            position: relative;
            font-size: 1.15em;
            color: #2d4a3a;
            line-height: 1.7;
            font-weight: 500;
            transition: all 0.3s ease;
        }

        .content-item:last-child {
            margin-bottom: 0;
        }

        .content-item:hover {
            color: #1a472a;
            transform: translateX(8px);
        }

        /* Bullet Points */
        .content-item::before {
            content: '•';
            position: absolute;
            left: 0;
            top: 0;
            color: #2d7d6e;
            font-size: 1.8em;
            font-weight: bold;
            line-height: 1;
            transition: all 0.3s ease;
        }

        .content-item:hover::before {
            color: #1a472a;
            transform: scale(1.3);
        }

        /* Special styling for emphasized text */
        .content-item strong {
            color: #1a472a;
            font-weight: 700;
            background: linear-gradient(120deg, rgba(123, 196, 168, 0.3) 0%, rgba(123, 196, 168, 0.1) 100%);
            padding: 2px 6px;
            border-radius: 4px;
        }

        /* English text styling */
        .english-text {
            font-style: italic;
            color: #4a6b5a;
            font-size: 0.95em;
            margin-left: 8px;
        }

        /* Question list special styling */
        .question-list .content-item {
            background: rgba(255, 255, 255, 0.6);
            padding: 15px 15px 15px 30px;
            border-radius: 8px;
            margin-bottom: 15px;
            border-left: 4px solid #7bc4a8;
        }

        .question-list .content-item:hover {
            background: rgba(255, 255, 255, 0.8);
        }

        /* ===============================================
           Animation Effects
           =============================================== */

        .fade-in {
            animation: fadeIn 1s ease-out;
        }

        .slide-up {
            animation: slideUp 0.8s ease-out;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Sequential Animation Delays */
        .content-group:nth-child(1) { animation-delay: 0.1s; }
        .content-group:nth-child(2) { animation-delay: 0.3s; }

        .content-item:nth-child(1) { animation-delay: 0.1s; }
        .content-item:nth-child(2) { animation-delay: 0.2s; }
        .content-item:nth-child(3) { animation-delay: 0.3s; }
        .content-item:nth-child(4) { animation-delay: 0.4s; }
        .content-item:nth-child(5) { animation-delay: 0.5s; }
        .content-item:nth-child(6) { animation-delay: 0.6s; }

        /* ===============================================
           Responsive Design
           =============================================== */

        @media (max-width: 1024px) {
            .content-section {
                padding: 60px 40px;
                gap: 40px;
            }

            .content-group {
                padding: 35px 45px;
            }

            .title-text {
                font-size: 3em;
            }

            .content-item {
                font-size: 1.1em;
            }
        }

        @media (max-width: 768px) {
            .header-section {
                height: 180px;
            }

            .header-section::before {
                border-width: 0 0 180px 120px;
            }

            .header-section::after {
                right: 120px;
                border-width: 0 0 180px 80px;
            }

            .title-text {
                font-size: 2.5em;
            }

            .subtitle {
                font-size: 1.1em;
            }

            .content-section {
                padding: 40px 30px;
                gap: 30px;
            }

            .content-group {
                padding: 30px 35px;
            }

            .content-item {
                font-size: 1.05em;
                padding-left: 25px;
            }

            .category-badge {
                left: 30px;
                top: 20px;
                font-size: 0.8em;
                padding: 6px 15px;
            }
        }

        @media (max-width: 480px) {
            .header-section {
                height: 150px;
            }

            .header-section::before {
                border-width: 0 0 150px 100px;
            }

            .header-section::after {
                right: 100px;
                border-width: 0 0 150px 60px;
            }

            .title-text {
                font-size: 2em;
            }

            .content-section {
                padding: 30px 20px;
            }

            .content-group {
                padding: 25px 30px;
            }

            .content-item {
                font-size: 1em;
                line-height: 1.6;
                margin-bottom: 18px;
            }

            .question-list .content-item {
                padding: 12px 12px 12px 25px;
            }
        }

        /* ===============================================
           Print Styles
           =============================================== */

        @media print {
            body {
                background: white;
            }

            .slide-container {
                box-shadow: none;
                min-height: auto;
            }

            .header-section {
                background: #2d7d6e !important;
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
            }

            .content-section {
                padding: 40px 30px;
            }

            .content-group:hover,
            .content-item:hover {
                transform: none;
            }
        }

        /* ===============================================
           Accessibility
           =============================================== */

        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    </style>
</head>
<body>
    <div class="slide-container">
        ${content}
    </div>

    <script>
        // 페이지 로드 시 애니메이션 초기화
        document.addEventListener('DOMContentLoaded', function() {
            // 순차적 애니메이션을 위한 observer 설정
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            // 애니메이션 대상 요소들 관찰
            document.querySelectorAll('.content-group, .content-item').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });

            // 스크롤 이벤트로 순차적 애니메이션 효과
            let animationTimeout;
            window.addEventListener('scroll', function() {
                clearTimeout(animationTimeout);
                animationTimeout = setTimeout(() => {
                    document.querySelectorAll('.content-item').forEach((item, index) => {
                        if (isElementInViewport(item)) {
                            setTimeout(() => {
                                item.classList.add('slide-up');
                            }, index * 100);
                        }
                    });
                }, 50);
            });

            function isElementInViewport(el) {
                const rect = el.getBoundingClientRect();
                return (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                );
            }
        });

        // 콘텐츠 아이템 클릭 이벤트 (상호작용)
        document.querySelectorAll('.content-item').forEach(item => {
            item.addEventListener('click', function() {
                // 클릭된 아이템 하이라이트 효과
                this.style.background = 'rgba(123, 196, 168, 0.2)';
                this.style.borderRadius = '8px';
                this.style.padding = '10px 10px 10px 30px';

                setTimeout(() => {
                    this.style.background = '';
                    this.style.padding = '';
                }, 2000);
            });
        });
    </script>
</body>
</html>`;
  }

  /**
   * Poll 슬라이드용 HTML 템플릿 생성
   */
  generatePollHTMLTemplate(content, title, slideNumber) {
    return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Poll Question</title>
    <style>
        /* ===============================================
           Quiz Choice Layout Template CSS
           Modern Question & Answer Interface
           =============================================== */

        /* Reset & Base Styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #3a3a3a;
            color: white;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 1.6;
        }

        /* ===============================================
           Main Quiz Container
           =============================================== */

        .quiz-container {
            max-width: 600px;
            width: 100%;
            padding: 60px 40px;
            text-align: center;
            position: relative;
        }

        .quiz-container.wide {
            max-width: 800px;
        }

        .quiz-container.narrow {
            max-width: 500px;
        }

        /* ===============================================
           Question Section
           =============================================== */

        .question-section {
            margin-bottom: 60px;
            position: relative;
        }

        .question-title {
            font-size: 3.5em;
            font-weight: 300;
            letter-spacing: -0.02em;
            margin-bottom: 20px;
            line-height: 1.2;
        }

        .question-title .highlight {
            color: #c4d626;
            font-weight: 400;
        }

        .question-subtitle {
            font-size: 3.5em;
            font-weight: 300;
            color: #e0e0e0;
            letter-spacing: -0.02em;
            line-height: 1.2;
        }

        /* Decorative Lines */
        .question-section::before,
        .question-section::after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, #666, transparent);
        }

        .question-section::before {
            top: -30px;
        }

        .question-section::after {
            bottom: -30px;
        }

        /* ===============================================
           Choices Section
           =============================================== */

        .choices-section {
            margin-bottom: 60px;
        }

        .choices-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin-bottom: 40px;
        }

        .choices-grid.two-column {
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
        }

        .choices-grid.four-column {
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
        }

        .choices-grid.single-column {
            grid-template-columns: 1fr;
            gap: 20px;
            max-width: 400px;
            margin: 0 auto 40px auto;
        }

        /* ===============================================
           Choice Buttons
           =============================================== */

        .choice-button {
            background: #c4d626;
            color: #2a2a2a;
            border: none;
            border-radius: 12px;
            padding: 24px 20px;
            font-size: 1.1em;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(196, 214, 38, 0.3);
            position: relative;
            overflow: hidden;
        }

        .choice-button:hover {
            background: #b8c423;
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(196, 214, 38, 0.4);
        }

        .choice-button:active {
            transform: translateY(-1px);
        }

        .choice-button:focus {
            outline: none;
            box-shadow: 0 0 0 3px rgba(196, 214, 38, 0.5);
        }

        /* Choice Button Content */
        .choice-letter {
            display: block;
            font-size: 1.3em;
            font-weight: 700;
            margin-bottom: 8px;
        }

        .choice-text {
            font-size: 1em;
            font-weight: 500;
            line-height: 1.3;
        }

        /* Ripple Effect */
        .choice-button::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transition: width 0.6s, height 0.6s;
            transform: translate(-50%, -50%);
            z-index: 0;
        }

        .choice-button:active::before {
            width: 300px;
            height: 300px;
        }

        .choice-button .choice-letter,
        .choice-button .choice-text {
            position: relative;
            z-index: 1;
        }

        /* ===============================================
           Choice Button Variations
           =============================================== */

        /* Selected State */
        .choice-button.selected {
            background: #ffffff;
            color: #2a2a2a;
            box-shadow: 0 8px 25px rgba(255, 255, 255, 0.3);
        }

        .choice-button.selected:hover {
            background: #f0f0f0;
        }

        /* Correct Answer */
        .choice-button.correct {
            background: #10b981;
            color: white;
            box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
        }

        .choice-button.correct:hover {
            background: #059669;
        }

        /* Wrong Answer */
        .choice-button.wrong {
            background: #ef4444;
            color: white;
            box-shadow: 0 8px 25px rgba(239, 68, 68, 0.4);
        }

        .choice-button.wrong:hover {
            background: #dc2626;
        }

        /* Disabled State */
        .choice-button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }

        .choice-button:disabled:hover {
            background: #c4d626;
            transform: none;
            box-shadow: 0 4px 15px rgba(196, 214, 38, 0.3);
        }

        /* ===============================================
           Footer Section
           =============================================== */

        .footer-section {
            position: relative;
        }

        .footer-section::before {
            content: '';
            position: absolute;
            top: -30px;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, #666, transparent);
        }

        .footer-credit {
            font-size: 1em;
            color: #999;
            font-weight: 400;
            letter-spacing: 0.5px;
        }

        /* ===============================================
           Color Themes
           =============================================== */

        /* Blue Theme */
        .theme-blue {
            background: #1e293b;
        }

        .theme-blue .question-title .highlight {
            color: #3b82f6;
        }

        .theme-blue .choice-button {
            background: #3b82f6;
            color: white;
            box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
        }

        .theme-blue .choice-button:hover {
            background: #2563eb;
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
        }

        /* Green Theme */
        .theme-green {
            background: #1f2937;
        }

        .theme-green .question-title .highlight {
            color: #10b981;
        }

        .theme-green .choice-button {
            background: #10b981;
            color: white;
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
        }

        .theme-green .choice-button:hover {
            background: #059669;
            box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
        }

        /* Purple Theme */
        .theme-purple {
            background: #2d1b69;
        }

        .theme-purple .question-title .highlight {
            color: #8b5cf6;
        }

        .theme-purple .choice-button {
            background: #8b5cf6;
            color: white;
            box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
        }

        .theme-purple .choice-button:hover {
            background: #7c3aed;
            box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);
        }

        /* Orange Theme */
        .theme-orange {
            background: #431407;
        }

        .theme-orange .question-title .highlight {
            color: #f59e0b;
        }

        .theme-orange .choice-button {
            background: #f59e0b;
            color: white;
            box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
        }

        .theme-orange .choice-button:hover {
            background: #d97706;
            box-shadow: 0 8px 25px rgba(245, 158, 11, 0.4);
        }

        /* ===============================================
           Animation Effects
           =============================================== */

        .fade-in {
            animation: fadeIn 0.8s ease-out;
        }

        .slide-up {
            animation: slideUp 0.8s ease-out;
        }

        .scale-in {
            animation: scaleIn 0.6s ease-out;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes scaleIn {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        /* Sequential Animation Delays */
        .choice-button:nth-child(1) { animation-delay: 0.1s; }
        .choice-button:nth-child(2) { animation-delay: 0.3s; }
        .choice-button:nth-child(3) { animation-delay: 0.5s; }
        .choice-button:nth-child(4) { animation-delay: 0.7s; }

        /* ===============================================
           Interactive States
           =============================================== */

        /* Loading State */
        .choice-button.loading {
            pointer-events: none;
            position: relative;
        }

        .choice-button.loading::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-top: 2px solid white;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
        }

        /* Shake Animation for Wrong Answer */
        .choice-button.shake {
            animation: shake 0.5s ease-in-out;
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }

        /* ===============================================
           Responsive Design
           =============================================== */

        @media (max-width: 768px) {
            .quiz-container {
                padding: 40px 20px;
            }

            .question-title,
            .question-subtitle {
                font-size: 2.5em;
            }

            .choices-grid {
                grid-template-columns: 1fr;
                gap: 15px;
            }

            .choices-grid.two-column {
                grid-template-columns: 1fr;
            }

            .choices-grid.four-column {
                grid-template-columns: repeat(2, 1fr);
            }

            .choice-button {
                padding: 20px 16px;
                font-size: 1em;
            }

            .choice-letter {
                font-size: 1.2em;
            }
        }

        @media (max-width: 480px) {
            .quiz-container {
                padding: 30px 15px;
            }

            .question-title,
            .question-subtitle {
                font-size: 2em;
            }

            .question-section {
                margin-bottom: 40px;
            }

            .choices-section {
                margin-bottom: 40px;
            }

            .choices-grid.four-column {
                grid-template-columns: 1fr;
            }

            .choice-button {
                padding: 18px 14px;
                font-size: 0.95em;
            }
        }

        /* ===============================================
           Accessibility
           =============================================== */

        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }

        .choice-button:focus-visible {
            outline: 3px solid #c4d626;
            outline-offset: 2px;
        }

        /* Screen Reader Only */
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }

        /* ===============================================
           Print Styles
           =============================================== */

        @media print {
            body {
                background: white;
                color: black;
            }

            .quiz-container {
                padding: 20px;
            }

            .choice-button {
                background: #f0f0f0 !important;
                color: black !important;
                box-shadow: none !important;
                border: 2px solid #333 !important;
            }

            .question-title .highlight {
                color: #333 !important;
            }
        }

        /* ===============================================
           Utility Classes
           =============================================== */

        .text-center { text-align: center; }
        .text-left { text-align: left; }
        .text-right { text-align: right; }

        .mb-1 { margin-bottom: 0.5rem; }
        .mb-2 { margin-bottom: 1rem; }
        .mb-3 { margin-bottom: 1.5rem; }
        .mb-4 { margin-bottom: 2rem; }

        .mt-1 { margin-top: 0.5rem; }
        .mt-2 { margin-top: 1rem; }
        .mt-3 { margin-top: 1.5rem; }
        .mt-4 { margin-top: 2rem; }

        .hidden { display: none; }
        .visible { display: block; }
    </style>
</head>
<body>
    ${content}

    <script>
        // 퀴즈 상호작용 기능
        document.addEventListener('DOMContentLoaded', function() {
            const choiceButtons = document.querySelectorAll('.choice-button');
            let selectedChoice = null;

            choiceButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // 이전 선택 해제
                    choiceButtons.forEach(btn => btn.classList.remove('selected'));

                    // 현재 버튼 선택
                    this.classList.add('selected');
                    selectedChoice = this.dataset.choice;

                    // 선택된 답변 표시
                    console.log('선택된 답변:', selectedChoice);

                    // 2초 후 다음 슬라이드로 이동 (선택사항)
                    setTimeout(() => {
                        // 여기에 다음 슬라이드로 이동하는 로직 추가 가능
                        // window.location.href = 'next-slide.html';
                    }, 2000);
                });

                // 키보드 접근성
                button.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.click();
                    }
                });
            });

            // 애니메이션 효과
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1)';
                    }
                });
            }, observerOptions);

            // 애니메이션 대상 요소들 관찰
            document.querySelectorAll('.choice-button').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'scale(0.9)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });
        });
    </script>
</body>
</html>`;
  }

  /**
   * HTML 템플릿 생성
   */
  generateHTMLTemplate(type, content, title, slideNumber) {
    if (type === 'cover') {
      return this.generateCoverHTMLTemplate(content, title, slideNumber);
    }

    if (type === 'general') {
      return this.generateGeneralHTMLTemplate(content, title, slideNumber);
    }

    if (type === 'example') {
      return this.generateExampleHTMLTemplate(content, title, slideNumber);
    }

    if (type === 'challenge') {
      return this.generateChallengeHTMLTemplate(content, title, slideNumber);
    }

    if (type === 'poll') {
      return this.generatePollHTMLTemplate(content, title, slideNumber);
    }

    return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - 슬라이드 ${slideNumber}</title>
    <link rel="stylesheet" href="common-styles.css">
</head>
<body>
    <div class="slide-info">
        슬라이드 ${slideNumber}
    </div>

    <div class="slide-container">
        ${content}
    </div>

    <script>
        // 복사 기능
        function copyExampleContent(element, content) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = content;
            const plainText = tempDiv.textContent || tempDiv.innerText || '';

            function changeIconToCheckmark() {
                element.textContent = '✅';
                element.style.backgroundColor = '#4caf50';

                setTimeout(function() {
                    element.textContent = '📋';
                    element.style.backgroundColor = '';
                }, 2000);
            }

            try {
                const textArea = document.createElement('textarea');
                textArea.value = plainText;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();

                const successful = document.execCommand('copy');
                document.body.removeChild(textArea);

                if (successful) {
                    changeIconToCheckmark();
                    console.log('내용이 클립보드에 복사되었습니다!');
                } else {
                    throw new Error('execCommand failed');
                }
            } catch (err) {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(plainText).then(function() {
                        changeIconToCheckmark();
                        console.log('내용이 클립보드에 복사되었습니다!');
                    }).catch(function(err) {
                        console.error('클립보드 복사 실패:', err);
                        alert('클립보드 복사에 실패했습니다. 브라우저 설정을 확인해주세요.');
                    });
                } else {
                    console.error('클립보드 API를 지원하지 않습니다.');
                    alert('이 브라우저는 클립보드 복사를 지원하지 않습니다.');
                }
            }
        }

        // Poll 선택 기능
        function selectChoice(element, choiceNumber) {
            const choices = document.querySelectorAll('.choice-button');
            choices.forEach(choice => choice.classList.remove('selected'));
            element.classList.add('selected');
            console.log('선택된 답:', choiceNumber);
        }
    </script>
</body>
</html>`;
  }

  /**
   * 제목 추출
   */
  extractTitleFromMarkdown(content, fileName) {
    // HTML 제목 태그 우선
    const htmlTitleMatch = content.match(/<h[1-3][^>]*>([^<]+)<\/h[1-3]>/);
    if (htmlTitleMatch && htmlTitleMatch[1]) {
      return htmlTitleMatch[1].trim();
    }

    // 마크다운 제목 (###, ##, # 순서)
    const h3Match = content.match(/^###\s*(.+)$/m);
    if (h3Match && h3Match[1]) {
      return h3Match[1].trim();
    }

    const h2Match = content.match(/^##\s*(.+)$/m);
    if (h2Match && h2Match[1]) {
      return h2Match[1].trim();
    }

    const h1Match = content.match(/^#\s*(.+)$/m);
    if (h1Match && h1Match[1]) {
      return h1Match[1].trim();
    }

    // 파일명에서 추출
    const match = fileName.match(/slide-(\d+)-(\d+)\.md/);
    if (match) {
      return `슬라이드 ${match[1]}-${match[2]}`;
    }

    return fileName.replace('.md', '');
  }

  /**
   * 단일 슬라이드 변환
   */
  convertSlide(fileName) {
    try {
      const inputPath = path.join(this.inputDir, fileName);
      const outputPath = path.join(this.outputDir, fileName.replace('.md', '.html'));

      // 마크다운 파일 읽기
      const mdContent = fs.readFileSync(inputPath, 'utf8');

      // 슬라이드 타입 감지
      const slideType = this.detectSlideType(mdContent);

      // 제목 추출
      const title = this.extractTitleFromMarkdown(mdContent, fileName);

      // 슬라이드 번호 추출
      const slideNumberMatch = fileName.match(/slide-(\d+)-(\d+)\.md/);
      const slideNumber = slideNumberMatch
        ? `${slideNumberMatch[1]}-${slideNumberMatch[2]}`
        : '0-0';

      // 슬라이드 콘텐츠 처리
      const processedContent = this.processSlideContent(slideType, mdContent, title, slideNumber);

      // HTML 템플릿 생성
      const finalHTML = this.generateHTMLTemplate(slideType, processedContent, title, slideNumber);

      // 출력 디렉토리 생성
      if (!fs.existsSync(this.outputDir)) {
        fs.mkdirSync(this.outputDir, { recursive: true });
      }

      // HTML 파일 저장
      fs.writeFileSync(outputPath, finalHTML, 'utf8');

      console.log(`✅ ${fileName} → ${fileName.replace('.md', '.html')} (${slideType})`);

      return { success: true, type: slideType, title, fileName };
    } catch (error) {
      console.error(`❌ ${fileName} 변환 실패:`, error.message);
      return { success: false, error: error.message, fileName };
    }
  }

  /**
   * 전체 슬라이드 변환
   */
  convertAllSlides() {
    console.log('🚀 AI Workshop Quasar 슬라이드 변환 시작');
    console.log(`📂 입력 디렉토리: ${this.inputDir}`);
    console.log(`📂 출력 디렉토리: ${this.outputDir}`);

    try {
      // 입력 디렉토리 확인
      if (!fs.existsSync(this.inputDir)) {
        throw new Error(`입력 디렉토리가 존재하지 않습니다: ${this.inputDir}`);
      }

      // 출력 디렉토리 생성
      if (!fs.existsSync(this.outputDir)) {
        fs.mkdirSync(this.outputDir, { recursive: true });
      }

      // slide-*-*.md 패턴의 파일들만 찾기
      const allFiles = fs.readdirSync(this.inputDir);
      const slideFiles = allFiles
        .filter((file) => file.match(/^slide-\d+-\d+\.md$/))
        .sort((a, b) => {
          const aMatch = a.match(/slide-(\d+)-(\d+)\.md/);
          const bMatch = b.match(/slide-(\d+)-(\d+)\.md/);
          if (!aMatch || !bMatch) return 0;

          const aChapter = parseInt(aMatch[1]);
          const bChapter = parseInt(bMatch[1]);
          if (aChapter !== bChapter) return aChapter - bChapter;

          const aSlide = parseInt(aMatch[2]);
          const bSlide = parseInt(bMatch[2]);
          return aSlide - bSlide;
        });

      console.log(`📄 발견된 슬라이드 파일: ${slideFiles.length}개`);

      if (slideFiles.length === 0) {
        console.log('⚠️ slide-*-*.md 패턴의 파일을 찾을 수 없습니다.');
        return;
      }

      let successCount = 0;
      let errorCount = 0;
      const results = [];

      // 각 파일 변환
      slideFiles.forEach((fileName) => {
        const result = this.convertSlide(fileName);
        results.push(result);

        if (result.success) {
          successCount++;
        } else {
          errorCount++;
        }
      });

      console.log('\n🎉 변환 완료!');
      console.log(`✅ 성공: ${successCount}개`);
      console.log(`❌ 실패: ${errorCount}개`);
      console.log(`📍 출력 디렉토리: ${this.outputDir}`);

      // 실패한 파일들 출력
      if (errorCount > 0) {
        console.log('\n❌ 실패한 파일들:');
        results
          .filter((r) => !r.success)
          .forEach((r) => console.log(`   - ${r.fileName}: ${r.error}`));
      }

      // 성공 요약
      if (successCount > 0) {
        console.log('\n📊 변환된 슬라이드 타입별 통계:');
        const typeStats = {};
        results
          .filter((r) => r.success)
          .forEach((r) => {
            typeStats[r.type] = (typeStats[r.type] || 0) + 1;
          });

        Object.entries(typeStats).forEach(([type, count]) => {
          console.log(`   - ${type}: ${count}개`);
        });
      }
    } catch (error) {
      console.error('❌ 변환 중 오류 발생:', error.message);
    }
  }
}

// CLI 실행
if (require.main === module) {
  const converter = new AIWorkshopSlideConverter();
  converter.convertAllSlides();
}

module.exports = AIWorkshopSlideConverter;
