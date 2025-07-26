import { test, expect } from '@playwright/test';

test.describe('슬라이드 제목 표시 테스트', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:9010/');
    await page.waitForLoadState('networkidle');
    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForTimeout(2000);
  });

  test('3-3, 3-4, 3-5 슬라이드가 올바른 번호로 표시되는지', async ({ page }) => {
    console.log('🔍 슬라이드 제목 테스트 시작...');

    // 목차 UPDATE 버튼이 나타날 때까지 대기
    const updateButton = page.locator('button').filter({ hasText: '목차 UPDATE' });
    await updateButton.waitFor({ state: 'visible', timeout: 10000 });

    // 버튼이 활성화될 때까지 대기
    await updateButton.waitFor({ state: 'attached', timeout: 10000 });

    // 목차 UPDATE 버튼 클릭
    await updateButton.click();

    // 업데이트 완료 대기
    await page.waitForTimeout(3000);

    // Chapter 3 확장
    const chapter3 = page.locator('.q-expansion-item').filter({ hasText: '3.' });
    await chapter3.click();
    await page.waitForTimeout(1000);

    // 3-3, 3-4, 3-5 슬라이드 확인
    const slide33 = page.locator('.slide-item').filter({ hasText: '3-3' });
    const slide34 = page.locator('.slide-item').filter({ hasText: '3-4' });
    const slide35 = page.locator('.slide-item').filter({ hasText: '3-5' });

    // 각 슬라이드가 존재하는지 확인
    await expect(slide33).toBeVisible();
    await expect(slide34).toBeVisible();
    await expect(slide35).toBeVisible();

    // 슬라이드 제목이 올바른지 확인
    await expect(slide33).toContainText('3-3');
    await expect(slide34).toContainText('3-4');
    await expect(slide35).toContainText('3-5');

    console.log('✅ 3-3, 3-4, 3-5 슬라이드가 올바른 번호로 표시됩니다.');
  });

  test('슬라이드 4, 5 등의 잘못된 표시가 없는지', async ({ page }) => {
    console.log('🔍 잘못된 슬라이드 제목 테스트 시작...');

    // 목차 UPDATE 버튼이 나타날 때까지 대기
    const updateButton = page.locator('button').filter({ hasText: '목차 UPDATE' });
    await updateButton.waitFor({ state: 'visible', timeout: 10000 });

    // 버튼이 활성화될 때까지 대기
    await updateButton.waitFor({ state: 'attached', timeout: 10000 });

    // 목차 UPDATE 버튼 클릭
    await updateButton.click();

    // 업데이트 완료 대기
    await page.waitForTimeout(3000);

    // Chapter 3 확장
    const chapter3 = page.locator('.q-expansion-item').filter({ hasText: '3.' });
    await chapter3.click();
    await page.waitForTimeout(1000);

    // "슬라이드 4", "슬라이드 5" 등의 잘못된 표시가 없는지 확인
    const wrongSlide4 = page.locator('.slide-item').filter({ hasText: '슬라이드 4' });
    const wrongSlide5 = page.locator('.slide-item').filter({ hasText: '슬라이드 5' });

    // 잘못된 표시가 없어야 함
    await expect(wrongSlide4).not.toBeVisible();
    await expect(wrongSlide5).not.toBeVisible();

    console.log('✅ 잘못된 "슬라이드 4, 5" 표시가 없습니다.');
  });
});
