#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// sidebar-data.json을 업데이트하는 함수
async function updateSidebarData() {
  const slidesDir = path.join(__dirname, '../public/slides');
  const sidebarDataPath = path.join(slidesDir, 'sidebar-data.json');

  try {
    // slides 디렉토리의 모든 .md 파일 읽기
    const files = fs
      .readdirSync(slidesDir)
      .filter((file) => file.endsWith('.md'))
      .sort((a, b) => {
        // slide-X-Y.md 형식에 따라 정렬
        const matchA = a.match(/slide-(\d+)-(\d+)\.md/);
        const matchB = b.match(/slide-(\d+)-(\d+)\.md/);

        if (matchA && matchB) {
          const chapterA = parseInt(matchA[1]);
          const slideA = parseInt(matchA[2]);
          const chapterB = parseInt(matchB[1]);
          const slideB = parseInt(matchB[2]);

          if (chapterA !== chapterB) {
            return chapterA - chapterB;
          }
          return slideA - slideB;
        }
        return a.localeCompare(b);
      });

    console.log(`📄 발견된 슬라이드 파일: ${files.length}개`);

    // 슬라이드 데이터 생성
    const slides = [];
    const chapters = {};

    for (const file of files) {
      const match = file.match(/slide-(\d+)-(\d+)\.md/);
      if (match) {
        const chapter = parseInt(match[1]);
        const slide = parseInt(match[2]);
        const id = `${chapter}-${slide}`;

        // 파일 내용에서 제목 추출
        const filePath = path.join(slidesDir, file);
        const content = fs.readFileSync(filePath, 'utf8');

        let title = '';
        let type = 'general';

        // @ 타입 표시 확인
        const typeMatch = content.match(/^@(\w+)/m);
        if (typeMatch) {
          type = typeMatch[1];
        }

        // 제목 추출 (HTML 제목 태그 우선)
        const htmlTitleMatch = content.match(/<h[1-3][^>]*>([^<]+)<\/h[1-3]>/);
        if (htmlTitleMatch && htmlTitleMatch[1]) {
          title = htmlTitleMatch[1].trim().replace(/^#+\s*/, '');
        } else {
          // 마크다운 제목 찾기
          const titleMatch = content.match(/^#\s*(.+)$/m);
          if (titleMatch && titleMatch[1]) {
            title = titleMatch[1].trim().replace(/^#+\s*/, '');
          } else {
            const h2Match = content.match(/^##\s*(.+)$/m);
            if (h2Match && h2Match[1]) {
              title = h2Match[1].trim().replace(/^#+\s*/, '');
            } else {
              const h3Match = content.match(/^###\s*(.+)$/m);
              if (h3Match && h3Match[1]) {
                title = h3Match[1].trim().replace(/^#+\s*/, '');
              } else {
                title = `슬라이드 ${chapter}-${slide}`;
              }
            }
          }
        }

        const slideData = {
          fileName: file,
          chapter: chapter,
          slide: slide,
          id: id,
          title: title,
          path: `/slides/${file}`,
          htmlPath: `/generated/slides/${file.replace('.md', '.html')}`,
          type: type,
        };

        slides.push(slideData);

        // 챕터 정보 추가
        if (!chapters[chapter]) {
          chapters[chapter] = {
            id: chapter,
            title: `Chapter ${chapter}`,
            slides: [],
          };
        }
        chapters[chapter].slides.push(slideData);
      }
    }

    // 챕터 제목 업데이트 (첫 번째 슬라이드에서)
    for (const chapterNum in chapters) {
      const chapterSlides = chapters[chapterNum].slides;
      if (chapterSlides.length > 0) {
        const firstSlide = chapterSlides[0];
        if (firstSlide.title && firstSlide.title !== `슬라이드 ${chapterNum}-0`) {
          chapters[chapterNum].title = firstSlide.title.replace(/^#+\s*/, '');
        }
      }
    }

    // sidebar-data.json 업데이트
    const sidebarData = {
      slides: slides,
      chapters: chapters,
    };

    fs.writeFileSync(sidebarDataPath, JSON.stringify(sidebarData, null, 2), 'utf8');
    console.log(
      `✅ sidebar-data.json 업데이트 완료: ${slides.length}개 슬라이드, ${Object.keys(chapters).length}개 챕터`,
    );

    return true;
  } catch (error) {
    console.error(`❌ sidebar-data.json 업데이트 실패: ${error.message}`);
    return false;
  }
}

// 명령행에서 실행될 때
if (require.main === module) {
  updateSidebarData();
}

module.exports = { updateSidebarData };
