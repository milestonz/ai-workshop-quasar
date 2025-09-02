#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * 슬라이드 로딩 최적화를 위한 프리로딩 스크립트
 */
function optimizeSlideLoading() {
  const slideIndexPath = path.join(__dirname, '../src/data/slideIndex.json');
  const outputPath = path.join(__dirname, '../src/data/slidePreload.json');

  console.log('🚀 슬라이드 로딩 최적화 중...');

  // slideIndex.json 읽기
  const slideIndex = JSON.parse(fs.readFileSync(slideIndexPath, 'utf8'));

  // 챕터별로 그룹화하여 프리로딩 전략 생성
  const chapters = {};
  slideIndex.slides.forEach((slide) => {
    if (!chapters[slide.chapter]) {
      chapters[slide.chapter] = [];
    }
    chapters[slide.chapter].push(slide);
  });

  // 프리로딩 전략 생성
  const preloadStrategy = {
    title: '슬라이드 프리로딩 전략',
    description: '성능 최적화를 위한 슬라이드 로딩 전략',
    lastUpdated: new Date().toISOString(),
    chapters: Object.keys(chapters)
      .sort((a, b) => parseInt(a) - parseInt(b))
      .map((chapterKey) => {
        const chapterSlides = chapters[chapterKey];
        return {
          chapter: parseInt(chapterKey),
          title: getChapterTitle(parseInt(chapterKey)),
          slides: chapterSlides.map((slide) => ({
            id: slide.id,
            title: slide.title,
            htmlPath: slide.htmlPath,
            priority: getSlidePriority(slide),
            preload: shouldPreload(slide, chapterSlides),
          })),
        };
      }),
  };

  // JSON 파일로 저장
  fs.writeFileSync(outputPath, JSON.stringify(preloadStrategy, null, 2), 'utf8');

  console.log(`\n🎉 슬라이드 프리로딩 전략이 생성되었습니다!`);
  console.log(`📁 저장 위치: ${outputPath}`);

  // 통계 출력
  const totalSlides = slideIndex.slides.length;
  const preloadSlides = preloadStrategy.chapters.reduce(
    (sum, chapter) => sum + chapter.slides.filter((slide) => slide.preload).length,
    0,
  );

  console.log(`📊 총 ${totalSlides}개 슬라이드 중 ${preloadSlides}개 프리로딩 대상`);
}

/**
 * 슬라이드 우선순위 결정
 */
function getSlidePriority(slide) {
  // 첫 번째 슬라이드는 높은 우선순위
  if (slide.chapter === 0 && slide.section === 0) return 'high';

  // 챕터 시작 슬라이드는 중간 우선순위
  if (slide.section === 0) return 'medium';

  // 나머지는 낮은 우선순위
  return 'low';
}

/**
 * 프리로딩 여부 결정
 */
function shouldPreload(slide, chapterSlides) {
  // 첫 번째 슬라이드는 항상 프리로딩
  if (slide.chapter === 0 && slide.section === 0) return true;

  // 챕터의 첫 3개 슬라이드는 프리로딩
  if (slide.section < 3) return true;

  // 중요한 슬라이드들 (제목에 특정 키워드가 있는 경우)
  const importantKeywords = ['소개', '개요', '요약', '결론', '마무리'];
  const hasImportantKeyword = importantKeywords.some((keyword) => slide.title.includes(keyword));

  return hasImportantKeyword;
}

/**
 * 챕터 제목 반환
 */
function getChapterTitle(chapterNumber) {
  const titles = {
    0: '0. INTRO',
    1: '1. WHY',
    2: '2. WHAT-1 : 생성형AI란?',
    3: '3. WHAT-2 : 프롬프팅 기법',
    4: '4. WHAT-3 : GPTs 챗봇 만들기 실습',
    5: '5. HOW - 설교 준비',
    6: '6. IF - 목회 계획',
    7: '7. AI 12가지 활용 시나리오',
    8: '8. Google NotebookLM',
    9: '9. Wrap-up',
    10: '10. 실전 AI 복합 활용 시나리오 (시연)',
    11: '11. 추가 실습 시나리오',
  };
  return titles[chapterNumber] || `Chapter ${chapterNumber}`;
}

// 스크립트 실행
if (require.main === module) {
  optimizeSlideLoading();
}

module.exports = { optimizeSlideLoading };
