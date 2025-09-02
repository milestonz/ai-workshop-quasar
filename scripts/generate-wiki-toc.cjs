const fs = require('fs');
const path = require('path');

// HTML 파일들의 제목을 추출하는 함수
function extractTitleFromHTML(htmlContent) {
  // h1 태그에서 제목 추출
  const h1Match = htmlContent.match(/<h1[^>]*>(.*?)<\/h1>/i);
  if (h1Match) {
    return h1Match[1].replace(/<[^>]*>/g, '').trim();
  }
  
  // h2 태그에서 제목 추출
  const h2Match = htmlContent.match(/<h2[^>]*>(.*?)<\/h2>/i);
  if (h2Match) {
    return h2Match[1].replace(/<[^>]*>/g, '').trim();
  }
  
  // title 태그에서 제목 추출
  const titleMatch = htmlContent.match(/<title[^>]*>(.*?)<\/title>/i);
  if (titleMatch) {
    return titleMatch[1].replace(/<[^>]*>/g, '').trim();
  }
  
  return null;
}

// HTML 파일들을 읽어서 목차 데이터 생성
function generateTableOfContents() {
  const htmlDir = path.join(__dirname, '../public/html');
  const files = fs.readdirSync(htmlDir).filter(file => file.endsWith('.html'));
  
  const toc = [];
  
  files.forEach(file => {
    const filePath = path.join(htmlDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const title = extractTitleFromHTML(content);
    
    if (title) {
      toc.push({
        file: file,
        title: title,
        url: `../html/${file}`
      });
    }
  });
  
  // 파일명으로 정렬 (slide-0-0.html, slide-0-1.html 순서)
  toc.sort((a, b) => {
    const aMatch = a.file.match(/slide-(\d+)-(\d+)\.html/);
    const bMatch = b.file.match(/slide-(\d+)-(\d+)\.html/);
    
    if (aMatch && bMatch) {
      const aChapter = parseInt(aMatch[1]);
      const aSlide = parseInt(aMatch[2]);
      const bChapter = parseInt(bMatch[1]);
      const bSlide = parseInt(bMatch[2]);
      
      if (aChapter !== bChapter) {
        return aChapter - bChapter;
      }
      return aSlide - bSlide;
    }
    
    return a.file.localeCompare(b.file);
  });
  
  return toc;
}

// 목차 데이터를 JSON 파일로 저장
const toc = generateTableOfContents();
const tocPath = path.join(__dirname, '../public/wikistyle/toc.json');
fs.writeFileSync(tocPath, JSON.stringify(toc, null, 2), 'utf8');

console.log(`✅ 목차 생성 완료: ${toc.length}개 파일`);
console.log(`📁 저장 위치: ${tocPath}`);

// 목차 미리보기 출력
console.log('\n📋 목차 미리보기:');
toc.slice(0, 10).forEach((item, index) => {
  console.log(`${index + 1}. ${item.title} (${item.file})`);
});
if (toc.length > 10) {
  console.log(`... 그리고 ${toc.length - 10}개 더`);
}
