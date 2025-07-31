#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * 슬라이드 유형별 HTML 템플릿 변환기
 */
class TemplateBasedConverter {
  constructor() {
    this.templates = {
      cover: this.getCoverTemplate(),
      index: this.getIndexTemplate(),
      example: this.getExampleTemplate(),
      challenge: this.getChallengeTemplate(),
      lecture: this.getLectureTemplate(),
      poll: this.getPollTemplate(),
      profile: this.getProfileTemplate(),
      chapter: this.getChapterTemplate(),
    };
  }

  /**
   * Cover 슬라이드 템플릿
   */
  getCoverTemplate() {
    return (content, title) => `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="../styles/slide-types/cover-slide.css">
</head>
<body>
    <div class="slide-container">
        <div class="slide slide-cover">
            <div class="slide-content">
                ${content}
            </div>
        </div>
    </div>
</body>
</html>`;
  }

  /**
   * Index 슬라이드 템플릿
   */
  getIndexTemplate() {
    return (content, title) => `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="../styles/slide-types/index-slide.css">
</head>
<body>
    <div class="slide-container">
        <div class="slide slide-index">
            <div class="slide-header">
                <h1>${title}</h1>
            </div>
            <div class="slide-content">
                ${content}
            </div>
        </div>
    </div>
</body>
</html>`;
  }

  /**
   * Example 슬라이드 템플릿
   */
  getExampleTemplate() {
    return (content, title) => `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="../styles/slide-types/example-slide.css">
</head>
<body>
    <div class="slide-container">
        <div class="slide slide-example">
            <div class="slide-header">
                <h2>프롬프팅 기법 가이드</h2>
            </div>
            <div class="slide-content">
                ${this.parseExampleContent(content)}
            </div>
        </div>
    </div>
</body>
</html>`;
  }

  /**
   * Challenge 슬라이드 템플릿
   */
  getChallengeTemplate() {
    return (content, title) => `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="../styles/slide-types/challenge-slide.css">
</head>
<body>
    <div class="slide-container">
        <div class="slide slide-challenge">
            ${this.parseChallengeContent(content)}
        </div>
    </div>
</body>
</html>`;
  }

  /**
   * 기본 Lecture 슬라이드 템플릿
   */
  getLectureTemplate() {
    return (content, title) => `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="../styles/slide-types/lecture-slide.css">
</head>
<body>
    <div class="slide-container">
        <div class="slide slide-lecture">
            <div class="slide-content">
                ${content}
            </div>
        </div>
    </div>
</body>
</html>`;
  }

  /**
   * Poll 슬라이드 템플릿
   */
  getPollTemplate() {
    return (content, title) => `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="../styles/slide-types/poll-slide.css">
</head>
<body>
    <div class="slide-container">
        <div class="slide slide-poll">
            <div class="slide-content">
                ${content}
            </div>
        </div>
    </div>
</body>
</html>`;
  }

  /**
   * Profile 슬라이드 템플릿
   */
  getProfileTemplate() {
    return (content, title) => `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="../styles/slide-types/profile-slide.css">
</head>
<body>
    <div class="slide-container">
        <div class="slide slide-profile">
            <div class="slide-content">
                ${content}
            </div>
        </div>
    </div>
</body>
</html>`;
  }

  /**
   * Chapter 슬라이드 템플릿
   */
  getChapterTemplate() {
    return (content, title) => `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="../styles/slide-types/chapter-slide.css">
</head>
<body>
    <div class="slide-container">
        <div class="slide slide-chapter">
            <div class="slide-content">
                ${content}
            </div>
        </div>
    </div>
</body>
</html>`;
  }

  /**
   * 슬라이드 타입 감지
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

    // 헤딩 변환
    html = html.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');
    html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^####\s+(.+)$/gm, '<h4>$1</h4>');

    // 강조 처리
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // 리스트 처리
    html = html.replace(/^-\s+(.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');

    // 코드 블록 처리
    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // 줄바꿈 처리
    html = html.replace(/\n\n/g, '</p><p>');
    html = html.replace(/^(?!<[hul])/gm, '<p>');
    html = html.replace(/(?<!>)$/gm, '</p>');

    // 빈 태그 제거
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<br>/g, '<br/>');

    return html;
  }

  /**
   * Example 슬라이드 콘텐츠 파싱
   */
  parseExampleContent(content) {
    // 기법 번호와 제목 추출
    const titleMatch = content.match(/^###\s*[①-⑩]\s*(.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : '프롬프팅 기법';

    // 기법 번호 추출
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

    // 설명 추출
    const descriptionMatch = content.match(/^###\s*[①-⑩].+?\n\n(.+?)(?=\n\n#### ❌|$)/s);
    let description = descriptionMatch ? descriptionMatch[1].trim() : '';
    description = description.replace(/^- (.+)$/gm, '• $1');

    // 나쁜 예와 좋은 예 추출
    const badExampleMatch = content.match(/#### ❌ 나쁜 예\s*\n(.+?)(?=\n\n#### ✅|$)/s);
    const goodExampleMatch = content.match(/#### ✅ 좋은 예\s*\n(.+?)(?=\n\n#### 💡|$)/s);
    const keyPointMatch = content.match(/#### 💡 핵심 고려사항\s*\n(.+?)(?=\n\n|$)/s);

    const badExample = badExampleMatch ? badExampleMatch[1].trim() : '';
    const goodExample = goodExampleMatch ? goodExampleMatch[1].trim() : '';
    const keyPoint = keyPointMatch ? keyPointMatch[1].trim() : '';

    return `
        <div class="technique-number">${techniqueNumber}</div>
        <h2 class="technique-title">${title}</h2>
        <p class="description">${description}</p>

        <div class="example-container">
            <div class="example-box bad-example">
                <div class="example-title">❌ 나쁜 예</div>
                <p>${badExample}</p>
            </div>
            <div class="example-box good-example">
                <div class="example-title">✅ 좋은 예</div>
                <p>${goodExample}</p>
            </div>
        </div>

        <div class="key-point">
            <div class="key-title">핵심 고려사항</div>
            <p>${keyPoint}</p>
        </div>`;
  }

  /**
   * Challenge 슬라이드 콘텐츠 파싱
   */
  parseChallengeContent(content) {
    // 제목 추출
    const titleMatch = content.match(/^#\s*(.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : 'Challenge';

    // 입력, AI 도구, 출력 섹션 추출
    const inputMatch = content.match(/## 입력 \(Input\)\s*\n((?:- .+\n?)*)/);
    const aiToolMatch = content.match(/## AI 도구\s*\n(.+?)(?=\n##|$)/s);
    const outputMatch = content.match(/## 출력 \(Output\)\s*\n((?:- .+\n?)*)/);
    const applicationMatch = content.match(/## 적용 아이디어\s*\n(.+?)(?=\n##|$)/s);
    const benefitsMatch = content.match(/## 기대 효과\s*\n((?:- .+\n?)*)/);

    const input = inputMatch ? inputMatch[1].trim() : '';
    const aiTool = aiToolMatch ? aiToolMatch[1].trim() : '';
    const output = outputMatch ? outputMatch[1].trim() : '';
    const application = applicationMatch ? applicationMatch[1].trim() : '';
    const benefits = benefitsMatch ? benefitsMatch[1].trim() : '';

    return `
        <div class="slide-header">
            <div class="challenge-badge">Challenge</div>
            <h1>${title}</h1>
            <div class="time-badge">⏱️ 10분</div>
        </div>

        <div class="content">
            <div class="workflow-container">
                <div class="workflow-step input">
                    <div class="step-icon">📝</div>
                    <div class="step-title">입력 (Input)</div>
                    <div class="step-content">
                        ${input
                          .split('\n')
                          .map((item) => item.replace('- ', '• '))
                          .join('<br>')}
                    </div>
                </div>

                <div class="workflow-arrow">→</div>

                <div class="workflow-step ai-tool">
                    <div class="step-icon">🤖</div>
                    <div class="step-title">AI 도구</div>
                    <div class="step-content">
                        <div class="ai-highlight">${aiTool}</div>
                        <div style="margin-top: 10px; font-size: 0.9em;">
                            프롬프트 엔지니어링으로<br>
                            맞춤형 안내 생성
                        </div>
                    </div>
                </div>

                <div class="workflow-arrow">→</div>

                <div class="workflow-step output">
                    <div class="step-icon">📋</div>
                    <div class="step-title">출력 (Output)</div>
                    <div class="step-content">
                        ${output
                          .split('\n')
                          .map((item) => item.replace('- ', '• '))
                          .join('<br>')}
                    </div>
                </div>
            </div>

            <div class="application-section">
                <div class="application-title">적용 아이디어</div>
                <div class="application-content">
                    <div class="qr-visual">📱</div>
                    <div>${application}</div>
                </div>
            </div>

            <div class="benefits">
                <div class="benefits-title">
                    <span>🎯</span>
                    <span>기대 효과</span>
                </div>
                <ul class="benefits-list">
                    ${benefits
                      .split('\n')
                      .map((item) => `<li>${item.replace('- ', '')}</li>`)
                      .join('')}
                </ul>
            </div>
        </div>`;
  }

  /**
   * 단일 슬라이드 변환
   */
  convertSlide(inputPath, outputPath) {
    try {
      // 마크다운 파일 읽기
      const mdContent = fs.readFileSync(inputPath, 'utf8');

      // 슬라이드 타입 감지
      const slideType = this.detectSlideType(mdContent);

      // 제목 추출
      const titleMatch = mdContent.match(/^#\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1].trim() : path.basename(inputPath, '.md');

      // 마크다운을 HTML로 변환
      const htmlContent = this.convertMarkdownToHTML(mdContent);

      // 템플릿 적용
      const template = this.templates[slideType] || this.templates.lecture;
      const finalHTML = template(htmlContent, title);

      // 출력 디렉토리 생성
      const outputDir = path.dirname(outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // HTML 파일 저장
      fs.writeFileSync(outputPath, finalHTML, 'utf8');

      console.log(`✅ ${path.basename(inputPath)} → ${path.basename(outputPath)} (${slideType})`);

      return { success: true, type: slideType, title };
    } catch (error) {
      console.error(`❌ ${path.basename(inputPath)} 변환 실패:`, error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * 전체 슬라이드 변환
   */
  convertAllSlides(inputDir, outputDir) {
    console.log('🚀 템플릿 기반 슬라이드 변환 시작');
    console.log(`📂 입력 디렉토리: ${inputDir}`);
    console.log(`📂 출력 디렉토리: ${outputDir}`);

    try {
      // 입력 디렉토리 확인
      if (!fs.existsSync(inputDir)) {
        throw new Error(`입력 디렉토리가 존재하지 않습니다: ${inputDir}`);
      }

      // 출력 디렉토리 생성
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // 마크다운 파일 목록
      const files = fs
        .readdirSync(inputDir)
        .filter((file) => file.endsWith('.md'))
        .sort();

      console.log(`📄 발견된 슬라이드 파일: ${files.length}개`);

      let successCount = 0;
      let errorCount = 0;

      // 각 파일 변환
      files.forEach((file) => {
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, file.replace('.md', '.html'));

        const result = this.convertSlide(inputPath, outputPath);

        if (result.success) {
          successCount++;
        } else {
          errorCount++;
        }
      });

      console.log('\n🎉 변환 완료!');
      console.log(`✅ 성공: ${successCount}개`);
      console.log(`❌ 실패: ${errorCount}개`);
      console.log(`📍 출력 디렉토리: ${outputDir}`);
    } catch (error) {
      console.error('❌ 변환 중 오류 발생:', error.message);
    }
  }
}

// CLI 실행
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log('사용법: node template-based-converter.js <입력디렉토리> <출력디렉토리>');
    process.exit(1);
  }

  const [inputDir, outputDir] = args;
  const converter = new TemplateBasedConverter();
  converter.convertAllSlides(inputDir, outputDir);
}

module.exports = TemplateBasedConverter;
