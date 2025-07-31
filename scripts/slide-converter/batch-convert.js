#!/usr/bin/env node

/**
 * 배치 변환기 - 여러 슬라이드 세트를 한 번에 변환
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import MarkdownToHTMLConverter from './markdown-to-html.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class BatchConverter {
  constructor() {
    this.converter = new MarkdownToHTMLConverter();
    this.results = [];
  }

  /**
   * 여러 슬라이드 세트 변환
   */
  async convertMultiple(configurations) {
    console.log(`🔄 배치 변환 시작 - ${configurations.length}개 세트`);

    for (const config of configurations) {
      try {
        console.log(`\n📁 변환 중: ${config.name}`);

        const success = await this.converter.convert(config.slidesDir, config.outputPath);

        this.results.push({
          name: config.name,
          success: success,
          outputPath: config.outputPath,
        });

        if (success) {
          console.log(`✅ ${config.name} 변환 완료`);
        } else {
          console.log(`❌ ${config.name} 변환 실패`);
        }
      } catch (error) {
        console.error(`💥 ${config.name} 변환 중 오류: ${error.message}`);
        this.results.push({
          name: config.name,
          success: false,
          error: error.message,
        });
      }
    }

    this.printSummary();
    return this.results;
  }

  /**
   * 변환 결과 요약 출력
   */
  printSummary() {
    console.log('\n' + '='.repeat(50));
    console.log('📊 배치 변환 결과 요약');
    console.log('='.repeat(50));

    const successful = this.results.filter((r) => r.success);
    const failed = this.results.filter((r) => !r.success);

    console.log(`✅ 성공: ${successful.length}개`);
    console.log(`❌ 실패: ${failed.length}개`);
    console.log(`📊 전체: ${this.results.length}개`);

    if (successful.length > 0) {
      console.log('\n🎉 성공한 변환:');
      successful.forEach((result) => {
        console.log(`  ✓ ${result.name} → ${result.outputPath}`);
      });
    }

    if (failed.length > 0) {
      console.log('\n💥 실패한 변환:');
      failed.forEach((result) => {
        console.log(`  ✗ ${result.name}${result.error ? ` (${result.error})` : ''}`);
      });
    }
  }
}

// 기본 설정 예시
const defaultConfigurations = [
  {
    name: 'AI 워크숍 메인',
    slidesDir: path.resolve(__dirname, '../../public/slides'),
    outputPath: path.resolve(__dirname, '../../public/generated/ai-workshop-slides.html'),
  },
  // 추가 설정을 여기에 추가할 수 있습니다
  // {
  //   name: '또 다른 프레젠테이션',
  //   slidesDir: path.resolve(__dirname, '../slides/other'),
  //   outputPath: path.resolve(__dirname, '../output/other-slides.html')
  // }
];

// CLI 실행
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);

  if (args.length > 0 && args[0] === '--config') {
    // 설정 파일로부터 읽기
    const configPath = args[1] || path.join(__dirname, 'batch-config.json');

    try {
      const configs = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      const batchConverter = new BatchConverter();

      batchConverter.convertMultiple(configs).then((results) => {
        const allSuccessful = results.every((r) => r.success);
        process.exit(allSuccessful ? 0 : 1);
      });
    } catch (error) {
      console.error(`설정 파일 읽기 실패: ${error.message}`);
      process.exit(1);
    }
  } else {
    // 기본 설정 사용
    const batchConverter = new BatchConverter();

    batchConverter.convertMultiple(defaultConfigurations).then((results) => {
      const allSuccessful = results.every((r) => r.success);
      process.exit(allSuccessful ? 0 : 1);
    });
  }
}

export default BatchConverter;
