import { test, expect } from '@playwright/test';

test.describe('기본 네비게이션 테스트', () => {
  test('페이지가 정상적으로 로드되는지', async ({ page }) => {
    // 페이지 로드
    await page.goto('/');

    // 페이지 제목 확인
    await expect(page).toHaveTitle(/AI Workshop Quasar/);

    // 기본 요소들이 표시되는지 확인
    await expect(page.locator('body')).toBeVisible();
  });

  test('사이드바가 표시되는지', async ({ page }) => {
    // 페이지 로드
    await page.goto('/');

    // 사이드바가 표시되는지 확인
    await expect(page.locator('.q-drawer')).toBeVisible({ timeout: 10000 });
  });

  test('슬라이드 뷰어가 표시되는지', async ({ page }) => {
    // 페이지 로드
    await page.goto('/');

    // 슬라이드 뷰어가 표시되는지 확인
    await expect(page.locator('.slide-viewer')).toBeVisible({ timeout: 10000 });
  });
});
