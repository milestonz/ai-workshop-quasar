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
        'cover', 'index', 'example', 'challenge', 'lecture', 
        'poll', 'profile', 'chapter', 'timeline', 'general'
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

    // 줄바꿈을 단락으로 변환
    const paragraphs = html.split('\n\n');
    html = paragraphs
      .filter(p => p.trim())
      .map(p => {
        p = p.trim();
        // 이미 HTML 태그로 감싸진 경우 그대로 유지
        if (p.startsWith('<h') || p.startsWith('<ul') || p.startsWith('<pre') || p.startsWith('<div')) {
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
      <div class="slide slide-top">
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
      .map(item => `
        <div class="toc-item">
          <div class="toc-header">
            <div class="toc-number">${item.number}</div>
            <h2 class="toc-title">${item.title}</h2>
          </div>
          <div class="toc-description">${item.description}</div>
        </div>
      `)
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
    const numberMap = { '①': '1', '②': '2', '③': '3', '④': '4', '⑤': '5', '⑥': '6', '⑦': '7', '⑧': '8', '⑨': '9', '⑩': '10' };
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
      <div class="slide slide-top">
        <div class="slide-header">
          <h2>프롬프팅 기법 가이드</h2>
        </div>
        <div class="content">
          <div class="technique-number">${techniqueNumber}</div>
          <h2 class="technique-title">${techniqueTitle}</h2>
          <p class="description">${description}</p>

          <div class="example-container">
            <div class="example-box bad-example">
              <div class="copy-icon" onclick="copyExampleContent(this, '${badExample.replace(/'/g, "\\'").replace(/"/g, '\\"')}')" title="내용 복사">
                📋
              </div>
              <div class="example-title">❌ 나쁜 예</div>
              <p>${badExample}</p>
            </div>
            <div class="example-box good-example">
              <div class="copy-icon" onclick="copyExampleContent(this, '${goodExample.replace(/'/g, "\\'").replace(/"/g, '\\"')}')" title="내용 복사">
                📋
              </div>
              <div class="example-title">✅ 좋은 예</div>
              <p>${goodExample}</p>
            </div>
          </div>

          <div class="key-point">
            <div class="key-title">핵심 고려사항</div>
            <p>${keyPoint}</p>
          </div>
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
        .replace(/\*([^*]+)\*/g, '<em>$1</em>');
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
      .map(group => {
        const isQuestionList = group.title.includes('성찰') || group.title.includes('질문');
        const listClass = isQuestionList ? 'question-list' : '';

        const itemsHTML = group.items
          .map(item => {
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
      <div class="slide slide-top">
        <div class="header-section">
          <div class="category-badge">@general</div>
          <div class="main-title">
            <h1 class="title-text">
              <span class="title-emoji">${emoji}</span>${titleText}
            </h1>
            ${subtitle ? `<h2 class="subtitle">${subtitle}</h2>` : ''}
          </div>
        </div>

        <div class="content-section">
          ${contentGroupsHTML}
        </div>
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
   * HTML 템플릿 생성
   */
  generateHTMLTemplate(type, content, title, slideNumber) {
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
      const slideNumber = slideNumberMatch ? `${slideNumberMatch[1]}-${slideNumberMatch[2]}` : '0-0';

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
        .filter(file => file.match(/^slide-\d+-\d+\.md$/))
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
      slideFiles.forEach(fileName => {
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
          .filter(r => !r.success)
          .forEach(r => console.log(`   - ${r.fileName}: ${r.error}`));
      }

      // 성공 요약
      if (successCount > 0) {
        console.log('\n📊 변환된 슬라이드 타입별 통계:');
        const typeStats = {};
        results
          .filter(r => r.success)
          .forEach(r => {
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