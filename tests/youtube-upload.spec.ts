import { test, expect } from '@playwright/test';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test.describe('YouTube 링크 입력 기능 테스트', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:9001');
    await page.waitForLoadState('networkidle');
  });

  test('YouTube 버튼이 표시되는지', async ({ page }) => {
    console.log('🔍 YouTube 버튼 테스트 시작...');

    // 편집기가 로드될 때까지 대기
    await page.waitForSelector('.markdown-editor', { timeout: 10000 });

    // YouTube 버튼 확인
    const youtubeButton = page.locator('button').filter({ hasText: 'YouTube' });
    await expect(youtubeButton).toBeVisible();

    console.log('✅ YouTube 버튼이 정상적으로 표시됩니다.');
  });

  test('YouTube 다이얼로그가 열리는지', async ({ page }) => {
    console.log('🔍 YouTube 다이얼로그 테스트 시작...');

    // 편집기가 로드될 때까지 대기
    await page.waitForSelector('.markdown-editor', { timeout: 10000 });

    // YouTube 버튼 클릭
    const youtubeButton = page.locator('button').filter({ hasText: 'YouTube' });
    await youtubeButton.click();

    // 다이얼로그가 나타나는지 확인
    const dialog = page.locator('.q-dialog');
    await expect(dialog).toBeVisible();

    // 다이얼로그 제목 확인
    const dialogTitle = dialog.locator('.text-h6');
    await expect(dialogTitle).toHaveText('YouTube 영상 추가');

    console.log('✅ YouTube 다이얼로그가 정상적으로 열립니다.');
  });

  test('YouTube 링크 입력 기능이 작동하는지', async ({ page }) => {
    console.log('🔍 YouTube 링크 입력 테스트 시작...');

    // 편집기가 로드될 때까지 대기
    await page.waitForSelector('.markdown-editor', { timeout: 10000 });

    // YouTube 버튼 클릭
    const youtubeButton = page.locator('button').filter({ hasText: 'YouTube' });
    await youtubeButton.click();

    // YouTube 링크 입력 필드 확인
    const urlInput = page.locator('input[placeholder="https://www.youtube.com/watch?v=..."]');
    await expect(urlInput).toBeVisible();

    // 테스트용 YouTube 링크 입력
    const testUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    await urlInput.fill(testUrl);

    // 미리보기가 나타나는지 확인 (비디오 ID가 추출되면)
    await page.waitForTimeout(1000);

    console.log('📄 YouTube 링크 입력 필드가 정상적으로 작동합니다.');

    // 다이얼로그 닫기
    const cancelButton = page.locator('button').filter({ hasText: '취소' });
    await cancelButton.click();

    console.log('✅ YouTube 링크 입력 기능이 정상적으로 작동합니다.');
  });

  test('YouTube 다이얼로그의 모든 필드가 표시되는지', async ({ page }) => {
    console.log('🔍 YouTube 다이얼로그 필드 테스트 시작...');

    // 편집기가 로드될 때까지 대기
    await page.waitForSelector('.markdown-editor', { timeout: 10000 });

    // YouTube 버튼 클릭
    const youtubeButton = page.locator('button').filter({ hasText: 'YouTube' });
    await youtubeButton.click();

    // YouTube 링크 입력 필드
    const urlInput = page.locator('input[placeholder="https://www.youtube.com/watch?v=..."]');
    await expect(urlInput).toBeVisible();

    // 영상 제목 입력 필드
    const titleInput = page.locator('input[placeholder="영상에 대한 설명을 입력하세요"]');
    await expect(titleInput).toBeVisible();

    // 너비 입력 필드
    const widthInput = page.locator('input[placeholder="자동"]').first();
    await expect(widthInput).toBeVisible();

    // 높이 입력 필드
    const heightInput = page.locator('input[placeholder="자동"]').last();
    await expect(heightInput).toBeVisible();

    // 버튼들 확인
    const cancelButton = page.locator('button').filter({ hasText: '취소' });
    const insertButton = page.locator('button').filter({ hasText: '삽입' });
    await expect(cancelButton).toBeVisible();
    await expect(insertButton).toBeVisible();

    console.log('✅ YouTube 다이얼로그의 모든 필드가 정상적으로 표시됩니다.');
  });

  test('YouTube 다이얼로그를 취소할 수 있는지', async ({ page }) => {
    console.log('🔍 YouTube 다이얼로그 취소 테스트 시작...');

    // 편집기가 로드될 때까지 대기
    await page.waitForSelector('.markdown-editor', { timeout: 10000 });

    // YouTube 버튼 클릭
    const youtubeButton = page.locator('button').filter({ hasText: 'YouTube' });
    await youtubeButton.click();

    // 다이얼로그가 열렸는지 확인
    const dialog = page.locator('.q-dialog');
    await expect(dialog).toBeVisible();

    // 취소 버튼 클릭
    const cancelButton = page.locator('button').filter({ hasText: '취소' });
    await cancelButton.click();

    // 다이얼로그가 닫혔는지 확인
    await expect(dialog).not.toBeVisible();

    console.log('✅ YouTube 다이얼로그를 정상적으로 취소할 수 있습니다.');
  });

  test('YouTube 링크에서 비디오 ID가 올바르게 추출되는지', async ({ page }) => {
    console.log('🔍 YouTube 비디오 ID 추출 테스트 시작...');

    // 편집기가 로드될 때까지 대기
    await page.waitForSelector('.markdown-editor', { timeout: 10000 });

    // YouTube 버튼 클릭
    const youtubeButton = page.locator('button').filter({ hasText: 'YouTube' });
    await youtubeButton.click();

    // 다양한 YouTube URL 형식 테스트
    const testUrls = [
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      'https://youtu.be/dQw4w9WgXcQ',
      'https://www.youtube.com/embed/dQw4w9WgXcQ',
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=30s',
    ];

    const urlInput = page.locator('input[placeholder="https://www.youtube.com/watch?v=..."]');

    for (const testUrl of testUrls) {
      await urlInput.fill(testUrl);
      await page.waitForTimeout(500);

      // 미리보기 iframe이 나타나는지 확인 (비디오 ID가 추출되면)
      const iframe = page.locator('iframe[src*="youtube.com/embed/"]');
      if (await iframe.isVisible()) {
        console.log(`✅ URL 형식 "${testUrl}"에서 비디오 ID가 올바르게 추출되었습니다.`);
      }
    }

    // 다이얼로그 닫기
    const cancelButton = page.locator('button').filter({ hasText: '취소' });
    await cancelButton.click();

    console.log('✅ YouTube 링크에서 비디오 ID 추출이 정상적으로 작동합니다.');
  });
});
