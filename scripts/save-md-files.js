#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// MD 파일을 저장하는 함수
function saveMarkdownFile(componentKey, markdownContent) {
  const filename = `slide-${componentKey}.md`;
  const targetDir = path.join(__dirname, '../src/components/slides');
  const filePath = path.join(targetDir, filename);

  // 파일 내용 생성
  const fileContent = `# ${componentKey} 슬라이드

${markdownContent}

---
*생성일: ${new Date().toLocaleString('ko-KR')}*
*파일명: ${filename}*
`;

  try {
    // 디렉토리가 없으면 생성
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // 파일 저장
    fs.writeFileSync(filePath, fileContent, 'utf8');
    console.log(`✅ MD 파일 저장 완료: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ MD 파일 저장 실패: ${error.message}`);
    return false;
  }
}

// 명령행 인수 처리
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log('사용법: node save-md-files.js <componentKey> <markdownContent>');
    console.log('예시: node save-md-files.js "2-1" "# 제목\n\n내용"');
    process.exit(1);
  }

  const [componentKey, markdownContent] = args;
  saveMarkdownFile(componentKey, markdownContent);
}

module.exports = { saveMarkdownFile };
