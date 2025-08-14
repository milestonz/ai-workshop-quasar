#!/usr/bin/env node

/**
 * 슬라이드 변환기 실행 스크립트
 * 설정 파일을 읽어서 마크다운을 HTML로 변환
 */

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import MarkdownToHTMLConverter from './markdown-to-html-fixed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  console.log('🎬 AI 워크숍 슬라이드 변환기 v1.0');
  console.log('='.repeat(50));

  try {
    // 설정 파일 읽기
    const configPath = path.join(__dirname, 'config.json');
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

    // 경로 설정
    const slidesDir = path.resolve(__dirname, config.slidesDirectory);
    const outputDir = path.resolve(__dirname, config.outputDirectory);
    const outputPath = path.join(outputDir, config.outputFilename);

    // 출력 디렉토리 생성
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
      console.log(`📁 출력 디렉토리 생성: ${outputDir}`);
    }

    // 변환 실행
    const converter = new MarkdownToHTMLConverter();
    const success = await converter.convert(slidesDir, outputPath);

    if (success) {
      console.log('');
      console.log('✨ 변환 완료!');
      console.log(`📍 출력 파일: ${outputPath}`);
      console.log(`🌐 브라우저에서 열어보세요: file://${outputPath}`);
    } else {
      console.error('❌ 변환 실패');
      process.exit(1);
    }
  } catch (error) {
    console.error(`💥 실행 오류: ${error.message}`);
    process.exit(1);
  }
}

// 스크립트 직접 실행 시
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default main;
