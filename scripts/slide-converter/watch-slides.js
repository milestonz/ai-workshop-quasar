#!/usr/bin/env node

/**
 * 파일 감시 및 자동 변환기
 * 마크다운 파일이 변경되면 자동으로 HTML로 변환
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import MarkdownToHTMLConverter from './markdown-to-html.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class SlideWatcher {
  constructor(slidesDir, outputPath, options = {}) {
    this.slidesDir = slidesDir;
    this.outputPath = outputPath;
    this.converter = new MarkdownToHTMLConverter();
    this.isConverting = false;
    this.lastChangeTime = 0;
    this.debounceMs = options.debounceMs || 1000; // 1초 디바운스

    console.log(`👀 슬라이드 감시 시작`);
    console.log(`📁 감시 디렉토리: ${slidesDir}`);
    console.log(`📄 출력 파일: ${outputPath}`);
  }

  /**
   * 파일 감시 시작
   */
  startWatching() {
    if (!fs.existsSync(this.slidesDir)) {
      console.error(`❌ 슬라이드 디렉토리가 존재하지 않습니다: ${this.slidesDir}`);
      return false;
    }

    // 초기 변환 실행
    console.log('🔄 초기 변환 실행...');
    this.convertSlides();

    // 파일 감시 시작
    const watcher = fs.watch(this.slidesDir, { recursive: false }, (eventType, filename) => {
      if (filename && filename.endsWith('.md') && filename.startsWith('slide-')) {
        console.log(`📝 파일 변경 감지: ${filename} (${eventType})`);
        this.handleFileChange();
      }
    });

    console.log('✅ 파일 감시가 시작되었습니다.');
    console.log('💡 Ctrl+C로 중지할 수 있습니다.');

    // 프로세스 종료 처리
    process.on('SIGINT', () => {
      console.log('\n🛑 파일 감시를 중지합니다...');
      watcher.close();
      process.exit(0);
    });

    return true;
  }

  /**
   * 파일 변경 처리 (디바운스 적용)
   */
  handleFileChange() {
    const now = Date.now();
    this.lastChangeTime = now;

    // 디바운스: 연속된 변경을 하나로 처리
    setTimeout(() => {
      if (this.lastChangeTime === now && !this.isConverting) {
        this.convertSlides();
      }
    }, this.debounceMs);
  }

  /**
   * 슬라이드 변환 실행
   */
  async convertSlides() {
    if (this.isConverting) {
      console.log('⏳ 이미 변환 중입니다...');
      return;
    }

    this.isConverting = true;

    try {
      console.log('🔄 슬라이드 변환 시작...');
      const startTime = Date.now();

      const success = await this.converter.convert(this.slidesDir, this.outputPath);

      const duration = Date.now() - startTime;

      if (success) {
        console.log(`✅ 변환 완료! (${duration}ms)`);
        console.log(`📍 ${this.outputPath}`);
        this.showBrowserTip();
      } else {
        console.log('❌ 변환 실패');
      }
    } catch (error) {
      console.error(`💥 변환 중 오류: ${error.message}`);
    } finally {
      this.isConverting = false;
    }
  }

  /**
   * 브라우저 새로고침 팁 표시
   */
  showBrowserTip() {
    console.log('💡 브라우저를 새로고침하여 변경사항을 확인하세요.');
    console.log(`🌐 file://${this.outputPath}`);
  }

  /**
   * 감시 상태 정보 출력
   */
  showStatus() {
    console.log('\n📊 감시 상태:');
    console.log(`  📁 디렉토리: ${this.slidesDir}`);
    console.log(`  📄 출력 파일: ${this.outputPath}`);
    console.log(`  ⏱️ 디바운스: ${this.debounceMs}ms`);
    console.log(`  🔄 변환 중: ${this.isConverting ? '예' : '아니오'}`);
  }
}

// CLI 실행
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);

  // 기본 경로 설정
  const defaultSlidesDir = path.resolve(__dirname, '../../public/slides');
  const defaultOutputPath = path.resolve(
    __dirname,
    '../../public/generated/ai-workshop-slides.html',
  );

  let slidesDir = defaultSlidesDir;
  let outputPath = defaultOutputPath;
  let options = {};

  // 명령행 인수 처리
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--slides':
      case '-s':
        slidesDir = path.resolve(args[++i]);
        break;
      case '--output':
      case '-o':
        outputPath = path.resolve(args[++i]);
        break;
      case '--debounce':
      case '-d':
        options.debounceMs = parseInt(args[++i]);
        break;
      case '--help':
      case '-h':
        console.log(`
슬라이드 감시기 - 자동 변환 도구

사용법:
  node watch-slides.js [옵션]

옵션:
  -s, --slides <경로>     슬라이드 디렉토리 (기본: ${defaultSlidesDir})
  -o, --output <경로>     출력 파일 경로 (기본: ${defaultOutputPath})
  -d, --debounce <밀리초> 디바운스 시간 (기본: 1000)
  -h, --help             도움말 표시

예시:
  node watch-slides.js
  node watch-slides.js --slides ./my-slides --output ./output.html
  node watch-slides.js --debounce 2000
`);
        process.exit(0);
        break;
    }
  }

  // 감시 시작
  const watcher = new SlideWatcher(slidesDir, outputPath, options);

  if (watcher.startWatching()) {
    // 상태 정보를 주기적으로 표시하는 명령어 처리
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', (key) => {
      const keyStr = key.toString();

      if (keyStr === '\u0003') {
        // Ctrl+C
        process.exit(0);
      } else if (keyStr === 's' || keyStr === 'S') {
        watcher.showStatus();
      } else if (keyStr === 'r' || keyStr === 'R') {
        console.log('🔄 수동 변환 실행...');
        watcher.convertSlides();
      } else if (keyStr === 'h' || keyStr === 'H') {
        console.log('\n💡 키보드 명령어:');
        console.log('  s: 상태 정보 표시');
        console.log('  r: 수동 변환 실행');
        console.log('  h: 도움말 표시');
        console.log('  Ctrl+C: 종료');
      }
    });

    console.log('\n💡 키보드 명령어: s(상태), r(변환), h(도움말), Ctrl+C(종료)');
  } else {
    process.exit(1);
  }
}

export default SlideWatcher;
