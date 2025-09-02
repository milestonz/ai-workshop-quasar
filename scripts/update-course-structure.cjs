#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * slideIndex.json을 기반으로 새로운 course-outline.json 생성
 */
function updateCourseStructure() {
  const slideIndexPath = path.join(__dirname, '../src/data/slideIndex.json');
  const courseOutlinePath = path.join(__dirname, '../src/data/course-outline.json');
  const outputPath = path.join(__dirname, '../src/data/course-outline-new.json');

  console.log('🔄 새로운 코스 구조를 생성하는 중...');

  // slideIndex.json 읽기
  const slideIndex = JSON.parse(fs.readFileSync(slideIndexPath, 'utf8'));

  // 챕터별로 슬라이드 그룹화
  const chapters = {};
  slideIndex.slides.forEach((slide) => {
    const chapterKey = slide.chapter;
    if (!chapters[chapterKey]) {
      chapters[chapterKey] = {
        slides: [],
        title: getChapterTitle(slide.chapter),
        description: getChapterDescription(slide.chapter),
      };
    }
    chapters[chapterKey].slides.push(slide);
  });

  // 새로운 course-outline 구조 생성
  const newCourseOutline = {
    title: '생성형AI 워크샵',
    description: '목회자를 위한 AI 활용 워크샵',
    totalSlides: slideIndex.totalSlides,
    lastUpdated: new Date().toISOString(),
    chapters: Object.keys(chapters)
      .sort((a, b) => parseInt(a) - parseInt(b))
      .map((chapterKey) => {
        const chapter = chapters[chapterKey];
        return {
          id: `chapter-${chapterKey}`,
          title: chapter.title,
          description: chapter.description,
          chapterNumber: parseInt(chapterKey),
          totalSlides: chapter.slides.length,
          completed: false,
          videoUrl: null,
          slides: chapter.slides.map((slide) => ({
            id: slide.id,
            title: slide.title,
            htmlPath: slide.htmlPath,
            section: slide.section,
            description: slide.description,
            hasVideo: false,
            completed: false,
          })),
        };
      }),
  };

  // 기존 파일 백업
  if (fs.existsSync(courseOutlinePath)) {
    const backupPath = courseOutlinePath.replace('.json', '-backup.json');
    fs.copyFileSync(courseOutlinePath, backupPath);
    console.log(`📁 기존 파일 백업: ${backupPath}`);
  }

  // 새로운 파일 저장
  fs.writeFileSync(outputPath, JSON.stringify(newCourseOutline, null, 2), 'utf8');

  console.log(`\n🎉 새로운 코스 구조가 생성되었습니다!`);
  console.log(
    `📊 총 ${newCourseOutline.chapters.length}개 챕터, ${newCourseOutline.totalSlides}개 슬라이드`,
  );
  console.log(`📁 저장 위치: ${outputPath}`);

  // 챕터별 통계 출력
  console.log('\n📈 챕터별 정보:');
  newCourseOutline.chapters.forEach((chapter) => {
    console.log(`   ${chapter.title}: ${chapter.totalSlides}개 슬라이드`);
  });

  return newCourseOutline;
}

/**
 * 챕터 번호에 따른 제목 반환
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

/**
 * 챕터 번호에 따른 설명 반환
 */
function getChapterDescription(chapterNumber) {
  const descriptions = {
    0: '워크샵 소개 및 오늘의 여정',
    1: 'AI 시대의 도전과 기회, 목회자의 AI 활용 사례',
    2: '생성형AI의 기본 개념과 발전사',
    3: 'AI와의 효과적인 대화를 위한 프롬프팅 기법',
    4: 'GPTs를 활용한 챗봇 제작 실습',
    5: 'AI를 활용한 설교 준비 방법',
    6: 'AI를 활용한 목회 계획 수립',
    7: '실제 목회자들의 AI 활용 사례 12가지',
    8: 'Google NotebookLM 활용법',
    9: 'AI 목회의 미래와 한계',
    10: '실전 AI 도구들의 복합 활용 시연',
    11: '다양한 실습 시나리오',
  };
  return descriptions[chapterNumber] || `Chapter ${chapterNumber} 내용`;
}

// 스크립트 실행
if (require.main === module) {
  updateCourseStructure();
}

module.exports = { updateCourseStructure };
