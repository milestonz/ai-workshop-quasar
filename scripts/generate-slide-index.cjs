#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * HTML 파일에서 메타데이터를 추출하는 함수
 */
function extractSlideMetadata(htmlContent, filename) {
  // 파일명에서 chapter와 section 추출 (예: slide-1-2.html -> chapter: 1, section: 2)
  const match = filename.match(/slide-(\d+)-(\d+)\.html/);
  if (!match) return null;
  
  const chapter = parseInt(match[1]);
  const section = parseInt(match[2]);
  
  // HTML에서 title 태그 추출
  const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/);
  const title = titleMatch ? titleMatch[1].trim() : `슬라이드 ${chapter}-${section}`;
  
  // HTML에서 h1 태그 추출 (더 정확한 제목)
  const h1Match = htmlContent.match(/<h1[^>]*>(.*?)<\/h1>/);
  const h1Title = h1Match ? h1Match[1].replace(/<[^>]*>/g, '').trim() : title;
  
  // 실제 제목은 h1이 있으면 h1을, 없으면 title을 사용
  const actualTitle = h1Title || title;
  
  // HTML에서 description 추출 (meta description 또는 첫 번째 p 태그)
  const metaDescMatch = htmlContent.match(/<meta name="description" content="(.*?)"/);
  const pMatch = htmlContent.match(/<p[^>]*>(.*?)<\/p>/);
  const description = metaDescMatch ? metaDescMatch[1] : 
                     (pMatch ? pMatch[1].replace(/<[^>]*>/g, '').trim().substring(0, 100) : '');
  
  return {
    id: `slide-${chapter}-${section}`,
    title: actualTitle,
    htmlPath: `/html/${filename}`,
    chapter: chapter,
    section: section,
    description: description || `Chapter ${chapter}, Section ${section} 슬라이드`
  };
}

/**
 * 모든 HTML 파일을 스캔하여 메타데이터 추출
 */
function generateSlideIndex() {
  const htmlDir = path.join(__dirname, '../public/html');
  const outputPath = path.join(__dirname, '../src/data/slideIndex.json');
  
  console.log('🔍 HTML 파일들을 스캔하는 중...');
  
  const slides = [];
  const files = fs.readdirSync(htmlDir);
  
  // slide-*.html 파일들만 필터링
  const slideFiles = files.filter(file => file.match(/^slide-\d+-\d+\.html$/));
  
  console.log(`📄 ${slideFiles.length}개의 슬라이드 파일을 발견했습니다.`);
  
  slideFiles.forEach(filename => {
    try {
      const filePath = path.join(htmlDir, filename);
      const htmlContent = fs.readFileSync(filePath, 'utf8');
      const metadata = extractSlideMetadata(htmlContent, filename);
      
      if (metadata) {
        slides.push(metadata);
        console.log(`✅ ${filename}: ${metadata.title}`);
      }
    } catch (error) {
      console.error(`❌ ${filename} 처리 중 오류:`, error.message);
    }
  });
  
  // chapter와 section 순으로 정렬
  slides.sort((a, b) => {
    if (a.chapter !== b.chapter) {
      return a.chapter - b.chapter;
    }
    return a.section - b.section;
  });
  
  const slideIndex = {
    title: "AI Workshop 슬라이드 인덱스",
    description: "HTML 슬라이드 파일들의 메타데이터",
    totalSlides: slides.length,
    lastUpdated: new Date().toISOString(),
    slides: slides
  };
  
  // JSON 파일로 저장
  fs.writeFileSync(outputPath, JSON.stringify(slideIndex, null, 2), 'utf8');
  
  console.log(`\n🎉 slideIndex.json이 생성되었습니다!`);
  console.log(`📊 총 ${slides.length}개의 슬라이드 메타데이터가 포함되었습니다.`);
  console.log(`📁 저장 위치: ${outputPath}`);
  
  // 통계 출력
  const chapterStats = {};
  slides.forEach(slide => {
    chapterStats[slide.chapter] = (chapterStats[slide.chapter] || 0) + 1;
  });
  
  console.log('\n📈 챕터별 슬라이드 수:');
  Object.keys(chapterStats).sort((a, b) => parseInt(a) - parseInt(b)).forEach(chapter => {
    console.log(`   Chapter ${chapter}: ${chapterStats[chapter]}개 슬라이드`);
  });
}

// 스크립트 실행
if (require.main === module) {
  generateSlideIndex();
}

module.exports = { generateSlideIndex, extractSlideMetadata };
