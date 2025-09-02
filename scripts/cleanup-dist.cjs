#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🧹 dist 폴더 정리 시작...');

const distPath = path.join(__dirname, '../dist');

if (!fs.existsSync(distPath)) {
  console.log('❌ dist 폴더가 존재하지 않습니다.');
  process.exit(1);
}

// Azure Static Web Apps에 불필요한 파일/폴더 제거
const itemsToRemove = [
  '.DS_Store',
  'html',
  'slides', 
  'templates',
  'generated'
];

let removedCount = 0;

itemsToRemove.forEach(item => {
  const itemPath = path.join(distPath, item);
  
  if (fs.existsSync(itemPath)) {
    try {
      if (fs.statSync(itemPath).isDirectory()) {
        fs.rmSync(itemPath, { recursive: true, force: true });
        console.log(`📁 폴더 제거: ${item}`);
      } else {
        fs.unlinkSync(itemPath);
        console.log(`📄 파일 제거: ${item}`);
      }
      removedCount++;
    } catch (error) {
      console.log(`❌ ${item} 제거 실패:`, error.message);
    }
  }
});

// .DS_Store 파일들을 재귀적으로 제거
function removeDSStore(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      removeDSStore(filePath);
    } else if (file === '.DS_Store') {
      try {
        fs.unlinkSync(filePath);
        console.log(`🗑️ .DS_Store 제거: ${filePath}`);
        removedCount++;
      } catch (error) {
        console.log(`❌ .DS_Store 제거 실패: ${filePath}`, error.message);
      }
    }
  });
}

removeDSStore(distPath);

console.log(`🎉 dist 폴더 정리 완료! ${removedCount}개 항목 제거됨`);
