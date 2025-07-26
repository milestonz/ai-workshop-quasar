#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// files.json을 업데이트하는 함수
function updateFilesJson() {
  const slidesDir = path.join(__dirname, '../public/slides');
  const filesJsonPath = path.join(slidesDir, 'files.json');

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

    // files.json 업데이트
    const filesJson = {
      files: files,
    };

    fs.writeFileSync(filesJsonPath, JSON.stringify(filesJson, null, 2), 'utf8');
    console.log(`✅ files.json 업데이트 완료: ${files.length}개 파일`);
    console.log('📋 파일 목록:');
    files.forEach((file) => console.log(`  - ${file}`));

    return true;
  } catch (error) {
    console.error(`❌ files.json 업데이트 실패: ${error.message}`);
    return false;
  }
}

// 명령행에서 실행될 때
if (require.main === module) {
  updateFilesJson();
}

module.exports = { updateFilesJson };
