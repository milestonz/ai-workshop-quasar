#!/usr/bin/env node

/**
 * 개별 슬라이드 HTML 생성기
 * 각 슬라이드를 개별 HTML 파일로 변환
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import MarkdownToHTMLConverter from './markdown-to-html.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class IndividualSlideConverter {
  constructor() {
    this.converter = new MarkdownToHTMLConverter();
  }

  /**
   * 개별 슬라이드 HTML 템플릿 생성
   */
  generateIndividualSlideHTML(slideContent, slideNumber, totalSlides, slideTitle, originalContent) {
    // 변환규칙-3: 내용 분량에 따라 수직 정렬 결정
    const isShortContent = this.calculateContentHeight(originalContent);

    const slideClass = isShortContent ? 'slide slide-center' : 'slide slide-top';
    const contentClass = isShortContent ? 'content content-center' : 'content content-top';

    return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${slideTitle} - 슬라이드 ${slideNumber + 1}</title>
    <link rel="stylesheet" href="common-styles.css">
</head>
<body>
    <div class="slide-info">
        슬라이드 ${slideNumber + 1} / ${totalSlides}
    </div>

    <div class="slide-container">
        <div class="${slideClass}">
            ${slideContent}
        </div>
    </div>



    <script>
        // 키보드 네비게이션
        document.addEventListener('keydown', function(e) {
            const currentSlide = ${slideNumber};
            const totalSlides = ${totalSlides};

            if (e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault();
                if (currentSlide < totalSlides - 1) {
                    window.location.href = 'slide-${this.getSlideFileName(slideNumber + 1)}.html';
                }
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                if (currentSlide > 0) {
                    window.location.href = 'slide-${this.getSlideFileName(slideNumber - 1)}.html';
                }
            } else if (e.key === 'Home') {
                e.preventDefault();
                window.location.href = 'slide-0-0.html';
            } else if (e.key === 'End') {
                e.preventDefault();
                window.location.href = 'slide-${this.getSlideFileName(totalSlides - 1)}.html';
            }
        });

                // 코드 블록 복사 기능
        function copyCode(codeId) {
            const codeElement = document.getElementById(codeId);
            const codeContent = codeElement.textContent;

            navigator.clipboard.writeText(codeContent).then(() => {
                const button = codeElement.parentElement.querySelector('.copy-button');
                const originalText = button.textContent;
                button.textContent = '복사됨!';
                button.style.background = '#28a745';

                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '#007bff';
                }, 2000);
            }).catch(err => {
                console.error('복사 실패:', err);
                alert('복사에 실패했습니다.');
            });
        }

        document.addEventListener('DOMContentLoaded', function() {
            const copyButtons = document.querySelectorAll('.copy-button');
            copyButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const codeBlock = this.closest('.code-block');
                    const codeContent = codeBlock.querySelector('pre').textContent;

                    navigator.clipboard.writeText(codeContent).then(() => {
                        const originalText = this.textContent;
                        this.textContent = '복사됨!';
                        this.style.background = '#28a745';

                        setTimeout(() => {
                            this.textContent = originalText;
                            this.style.background = '#007bff';
                        }, 2000);
                    }).catch(err => {
                        console.error('복사 실패:', err);
                        alert('복사에 실패했습니다.');
                    });
                });
            });
        });
    </script>
</body>
</html>`;
  }

  /**
   * 슬라이드 클래스 결정
   */
  getSlideClass(content) {
    if (content.includes('intro-slide')) return 'intro-slide';
    if (content.includes('chapter-slide')) return 'chapter-slide';
    if (content.includes('poll-slide')) return 'poll-slide';
    return '';
  }

  /**
   * 슬라이드 파일명 생성 (원본 파일명과 매칭)
   */
  getSlideFileName(slideNumber, originalFileName) {
    // 원본 파일명이 있으면 slide-*-* 부분 추출
    if (originalFileName) {
      const match = originalFileName.match(/slide-(\d+)-(\d+)\.md/);
      if (match) {
        return `${match[1]}-${match[2]}`;
      }
    }

    // 매칭되지 않으면 기존 로직 사용
    const chapter = Math.floor(slideNumber / 10);
    const slide = slideNumber % 10;
    return `${chapter}-${slide}`;
  }

  /**
   * 내용 분량 판단 (변환규칙-3: 수직 정렬 결정용)
   */
  calculateContentHeight(content) {
    // 마크다운 원본 내용의 줄 수를 기준으로 판단
    const lines = content.split('\n').filter((line) => line.trim().length > 0);

    // 5줄 이하면 짧은 내용으로 판단 (중앙 정렬)
    return lines.length <= 5;
  }

  /**
   * 슬라이드 제목 추출 (변환규칙-1: 첫 번째 #, ##, ### 태그를 제목으로)
   */
  extractSlideTitle(content, slideNumber = 0) {
    // 첫 번째 #, ##, ### 태그를 찾아서 제목으로 추출
    const titleMatch = content.match(/^(#{1,3})\s+(.+)$/m);
    if (titleMatch) {
      return titleMatch[2].trim();
    }

    // HTML 태그로 변환된 경우도 확인
    const htmlTitleMatch = content.match(/<h[1-3][^>]*>([^<]+)<\/h[1-3]>/);
    if (htmlTitleMatch) {
      return htmlTitleMatch[1].trim();
    }

    return `슬라이드 ${slideNumber + 1}`;
  }

  /**
   * 개별 슬라이드 변환
   */
  async convertIndividualSlides(slidesDir, outputDir) {
    console.log('🚀 개별 슬라이드 HTML 변환 시작');
    console.log(`📂 슬라이드 디렉토리: ${slidesDir}`);
    console.log(`📄 출력 디렉토리: ${outputDir}`);

    try {
      // 출력 디렉토리 생성
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
        console.log(`📁 출력 디렉토리 생성: ${outputDir}`);
      }

      // 슬라이드 파일들 로드
      await this.converter.loadSlideFiles(slidesDir);
      const slides = this.converter.slides;
      const totalSlides = slides.length;

      console.log(`📂 발견된 슬라이드 파일: ${totalSlides}개`);

      // 각 슬라이드를 개별 HTML로 변환
      for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];
        const slideNumber = i;

        // 슬라이드 내용을 HTML로 변환
        const convertedSlide = this.converter.convertSlideToHTML(slide);
        const slideContent = convertedSlide.content;

        // 슬라이드 제목 추출
        const slideTitle = this.extractSlideTitle(slideContent, slideNumber);

        // 원본 마크다운 내용으로 수직 정렬 결정
        const originalContent = slide.content;

        // 개별 HTML 생성
        const individualHTML = this.generateIndividualSlideHTML(
          slideContent,
          slideNumber,
          totalSlides,
          slideTitle,
          originalContent,
        );

        // 파일명 생성 (원본 파일명과 매칭)
        const fileName = `slide-${this.getSlideFileName(slideNumber, slide.fileName || `slide-${Math.floor(slideNumber / 10)}-${slideNumber % 10}.md`)}.html`;
        const filePath = path.join(outputDir, fileName);

        // 파일 저장
        fs.writeFileSync(filePath, individualHTML, 'utf8');

        console.log(`✅ ${fileName} 생성 완료 (${slideTitle})`);
      }

      // 인덱스 파일 생성
      this.generateIndexFile(outputDir, slides);

      console.log(`🎉 개별 슬라이드 변환 완료! 총 ${totalSlides}개 파일`);
      console.log(`📍 출력 디렉토리: ${outputDir}`);

      return true;
    } catch (error) {
      console.error(`💥 변환 실패: ${error.message}`);
      return false;
    }
  }

  /**
   * 인덱스 파일 생성
   */
  generateIndexFile(outputDir, slides) {
    const indexHTML = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI 워크숍 슬라이드 목록</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            color: white;
            padding: 40px;
            min-height: 100vh;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        h1 {
            text-align: center;
            margin-bottom: 40px;
            font-size: 2.5em;
        }
        .slide-list {
            display: grid;
            gap: 20px;
        }
        .slide-item {
            background: rgba(255,255,255,0.1);
            padding: 20px;
            border-radius: 10px;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
        }
        .slide-item:hover {
            background: rgba(255,255,255,0.2);
            transform: translateY(-2px);
        }
        .slide-item a {
            color: white;
            text-decoration: none;
            display: block;
        }
        .slide-number {
            font-weight: bold;
            color: #74b9ff;
        }
        .slide-title {
            margin-top: 10px;
            font-size: 1.1em;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎬 AI 워크숍 슬라이드 목록</h1>
        <div class="slide-list">
            ${slides
              .map((slide, index) => {
                const fileName = `slide-${this.getSlideFileName(index)}.html`;
                const title = this.extractSlideTitle(
                  this.converter.convertSlideToHTML(slide).content,
                  index,
                );
                return `
                <div class="slide-item">
                    <a href="${fileName}">
                        <div class="slide-number">슬라이드 ${index + 1}</div>
                        <div class="slide-title">${title}</div>
                    </a>
                </div>
              `;
              })
              .join('')}
        </div>
    </div>
</body>
</html>`;

    const indexPath = path.join(outputDir, 'index.html');
    fs.writeFileSync(indexPath, indexHTML, 'utf8');
    console.log(`✅ index.html 생성 완료`);
  }
}

// CLI 실행
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log('사용법: node convert-slides-individual.js <슬라이드_디렉토리> <출력_디렉토리>');
    console.log(
      '예시: node convert-slides-individual.js ../../public/slides ../../public/generated/slides',
    );
    process.exit(1);
  }

  const [slidesDir, outputDir] = args;
  const converter = new IndividualSlideConverter();

  converter
    .convertIndividualSlides(slidesDir, outputDir)
    .then((success) => {
      process.exit(success ? 0 : 1);
    })
    .catch((error) => {
      console.error('실행 오류:', error);
      process.exit(1);
    });
}

export default IndividualSlideConverter;
