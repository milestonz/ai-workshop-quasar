#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const unlink = promisify(fs.unlink);
const rmdir = promisify(fs.rmdir);

/**
 * Azure Static Web Apps 최적화 스크립트
 * - 파일 수 제한(20,000개)을 위한 최적화
 * - 불필요한 파일 제거
 * - 파일 통합 및 압축
 */

class AzureOptimizer {
  constructor(distPath) {
    this.distPath = distPath;
    this.fileCount = 0;
    this.deletedFiles = 0;
    this.totalSize = 0;
  }

  async optimize() {
    console.log('🚀 Azure Static Web Apps 최적화 시작...');

    await this.removeUnnecessaryFiles();
    await this.countFiles();
    await this.reportResults();
  }

  async removeUnnecessaryFiles() {
    const filesToRemove = [
      // Source maps (프로덕션에서 불필요)
      '**/*.map',
      // 개발용 파일들
      '**/README.md',
      '**/LICENSE',
      '**/CHANGELOG.md',
      // 테스트 파일들
      '**/*.test.*',
      '**/*.spec.*',
      '**/test/**',
      '**/tests/**',
      // 타입스크립트 선언 파일 (런타임에 불필요)
      '**/*.d.ts',
      // ESLint/Prettier 설정
      '**/.eslintrc*',
      '**/.prettierrc*',
      // Git 관련
      '**/.git*',
      // IDE 설정
      '**/.vscode/**',
      '**/.idea/**',
      // 임시 파일
      '**/*.tmp',
      '**/*.temp',
      // 중복 폰트 파일 (Quasar extras에서 중복될 수 있음)
      '**/fonts/**/*.woff', // woff2만 남기고 woff 제거
    ];

    console.log('🗑️  불필요한 파일 제거 중...');

    for (const pattern of filesToRemove) {
      await this.removeByPattern(this.distPath, pattern);
    }
  }

  async removeByPattern(dir, pattern) {
    try {
      const files = await readdir(dir, { withFileTypes: true });

      for (const file of files) {
        const fullPath = path.join(dir, file.name);

        if (file.isDirectory()) {
          await this.removeByPattern(fullPath, pattern);
        } else {
          // 간단한 패턴 매칭 (glob 대신)
          if (this.matchesPattern(file.name, pattern) || this.matchesPattern(fullPath, pattern)) {
            await unlink(fullPath);
            this.deletedFiles++;
            console.log(`  ❌ 제거: ${fullPath}`);
          }
        }
      }
    } catch (error) {
      // 디렉토리가 없는 경우 무시
      if (error.code !== 'ENOENT') {
        console.warn(`⚠️  패턴 제거 중 오류 (무시): ${error.message}`);
      }
    }
  }

  matchesPattern(filename, pattern) {
    // 간단한 패턴 매칭
    if (pattern.includes('**')) {
      const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'));
      return regex.test(filename);
    }
    return filename.includes(pattern.replace(/\*/g, ''));
  }

  async countFiles() {
    console.log('📊 파일 수 계산 중...');
    this.fileCount = await this.countFilesRecursive(this.distPath);
  }

  async countFilesRecursive(dir) {
    let count = 0;
    try {
      const files = await readdir(dir, { withFileTypes: true });

      for (const file of files) {
        const fullPath = path.join(dir, file.name);

        if (file.isDirectory()) {
          count += await this.countFilesRecursive(fullPath);
        } else {
          count++;
          const stats = await stat(fullPath);
          this.totalSize += stats.size;
        }
      }
    } catch (error) {
      // 디렉토리가 없는 경우 무시
    }
    return count;
  }

  async reportResults() {
    console.log('\n📊 Azure Static Web Apps 최적화 결과:');
    console.log(`총 파일 수: ${this.fileCount}개`);
    console.log(`제거된 파일: ${this.deletedFiles}개`);
    console.log(`총 크기: ${(this.totalSize / 1024 / 1024).toFixed(2)} MB`);

    if (this.fileCount > 20000) {
      console.log('⚠️  경고: 파일 수가 20,000개를 초과합니다!');
      console.log('추가 최적화가 필요합니다.');
    } else {
      console.log('✅ 파일 수가 Azure Static Web Apps 제한 내에 있습니다.');
    }
  }
}

// 메인 실행
async function main() {
  const distPath = path.join(__dirname, '../dist');

  if (!fs.existsSync(distPath)) {
    console.error('❌ dist 폴더가 없습니다. 먼저 quasar build를 실행하세요.');
    process.exit(1);
  }

  const optimizer = new AzureOptimizer(distPath);
  await optimizer.optimize();
}

// 스크립트 실행
if (require.main === module) {
  main().catch(console.error);
}

module.exports = AzureOptimizer;
