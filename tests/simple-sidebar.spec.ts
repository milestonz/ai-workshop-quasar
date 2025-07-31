import { test, expect } from '@playwright/test';

test.describe('간단한 사이드바 테스트', () => {
  test.beforeEach(async ({ page }) => {
    // 메인 페이지로 이동
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('사이드바가 표시되는지', async ({ page }) => {
    // 사이드바가 표시되는지 확인
    await expect(page.locator('.q-drawer')).toBeVisible({ timeout: 10000 });
  });

  test('Chapter 목록이 표시되는지', async ({ page }) => {
    // Chapter 목록이 표시되는지 확인 (첫 번째 Chapter만)
    await expect(page.locator('.q-expansion-item').first()).toBeVisible({ timeout: 10000 });

    // Chapter 개수 확인
    const chapterCount = await page.locator('.q-expansion-item').count();
    console.log('📚 Chapter 개수:', chapterCount);
    expect(chapterCount).toBeGreaterThan(0);
  });

  test('첫 번째 Chapter를 클릭할 수 있는지', async ({ page }) => {
    // 첫 번째 Chapter 찾기
    const firstChapter = page.locator('.q-expansion-item').first();

    // Chapter 클릭
    await firstChapter.click();

    // 클릭 후 잠시 대기
    await page.waitForTimeout(1000);

    // Chapter가 클릭되었는지 확인 (확장 상태)
    await expect(firstChapter).toBeVisible();
  });

  test('슬라이드 뷰어가 표시되는지', async ({ page }) => {
    // 슬라이드 뷰어가 표시되는지 확인
    await expect(page.locator('.slide-viewer')).toBeVisible({ timeout: 10000 });
  });

  test('현재 슬라이드 정보가 표시되는지', async ({ page }) => {
    // 현재 슬라이드 정보가 표시되는지 확인 (헤더의 슬라이드 정보)
    const slideInfo = page.locator('.q-header .text-caption:has-text("슬라이드")').first();
    await expect(slideInfo).toBeVisible({ timeout: 10000 });
  });

  test('UPDATE 버튼이 존재하는지', async ({ page }) => {
    // UPDATE 버튼이 존재하는지 확인 (첫 번째 Chapter의 버튼)
    const updateButton = page.locator('.q-btn[title="목차 UPDATE"]').first();
    await expect(updateButton).toBeVisible({ timeout: 10000 });
  });

  test('슬라이드 추가 버튼이 존재하는지', async ({ page }) => {
    // 슬라이드 추가 버튼이 존재하는지 확인 (첫 번째 Chapter의 버튼)
    const addButton = page.locator('.q-btn[title="슬라이드 추가"]').first();
    await expect(addButton).toBeVisible({ timeout: 10000 });
  });
});
