import { test, expect } from '@playwright/test';

test.describe('MD 파일 ### 기반 제목 추출 테스트', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:9003/');
    await page.waitForLoadState('networkidle');
  });

  test('### 기반 Chapter 제목이 올바르게 표시되는지', async ({ page }) => {
    console.log('🔍 ### 기반 Chapter 제목 테스트 시작...');

    // 목차 UPDATE 버튼 클릭
    const updateButton = page.locator('button').filter({ hasText: '목차 UPDATE' });
    await updateButton.click();

    // 업데이트 완료 대기
    await page.waitForTimeout(3000);

    // Chapter 3 확장
    const chapter3 = page.locator('.q-expansion-item').filter({ hasText: '3.' });
    await chapter3.click();
    await page.waitForTimeout(1000);

    // Chapter 3의 제목이 ### 기반으로 표시되는지 확인
    // 3-3.md: "### Challenge-3 : 가스펠 작곡" -> "Challenge-3 : 가스펠 작곡"
    const slide33 = page.locator('.slide-item').filter({ hasText: 'Challenge-3' });
    await expect(slide33).toBeVisible();
    await expect(slide33).toContainText('Challenge-3 : 가스펠 작곡');

    // 3-4.md: "### Challenge-4 : 소그룹 리더 교육교재 제작" -> "Challenge-4 : 소그룹 리더 교육교재 제작"
    const slide34 = page.locator('.slide-item').filter({ hasText: 'Challenge-4' });
    await expect(slide34).toBeVisible();
    await expect(slide34).toContainText('Challenge-4 : 소그룹 리더 교육교재 제작');

    console.log('✅ ### 기반 Chapter 제목이 올바르게 표시됩니다.');
  });

  test('### 제목이 없는 슬라이드는 파일명 번호로 표시되는지', async ({ page }) => {
    console.log('🔍 파일명 번호 기반 제목 테스트 시작...');

    // 목차 UPDATE 버튼 클릭
    const updateButton = page.locator('button').filter({ hasText: '목차 UPDATE' });
    await updateButton.click();

    // 업데이트 완료 대기
    await page.waitForTimeout(3000);

    // Chapter 3 확장
    const chapter3 = page.locator('.q-expansion-item').filter({ hasText: '3.' });
    await chapter3.click();
    await page.waitForTimeout(1000);

    // 3-5.md: "# 3-5" -> "3-5" (### 제목이 없으므로 파일명 번호 사용)
    const slide35 = page.locator('.slide-item').filter({ hasText: '3-5' });
    await expect(slide35).toBeVisible();
    await expect(slide35).toContainText('3-5');

    console.log('✅ ### 제목이 없는 슬라이드는 파일명 번호로 표시됩니다.');
  });

  test('### 기반 제목과 파일명 번호가 혼합되어 표시되는지', async ({ page }) => {
    console.log('🔍 혼합 제목 표시 테스트 시작...');

    // 목차 UPDATE 버튼 클릭
    const updateButton = page.locator('button').filter({ hasText: '목차 UPDATE' });
    await updateButton.click();

    // 업데이트 완료 대기
    await page.waitForTimeout(3000);

    // Chapter 3 확장
    const chapter3 = page.locator('.q-expansion-item').filter({ hasText: '3.' });
    await chapter3.click();
    await page.waitForTimeout(1000);

    // ### 제목이 있는 슬라이드들
    const slide33 = page.locator('.slide-item').filter({ hasText: 'Challenge-3' });
    const slide34 = page.locator('.slide-item').filter({ hasText: 'Challenge-4' });

    // ### 제목이 없는 슬라이드들
    const slide35 = page.locator('.slide-item').filter({ hasText: '3-5' });
    const slide36 = page.locator('.slide-item').filter({ hasText: '3-6' });

    // 모든 슬라이드가 올바르게 표시되는지 확인
    await expect(slide33).toBeVisible();
    await expect(slide34).toBeVisible();
    await expect(slide35).toBeVisible();
    await expect(slide36).toBeVisible();

    console.log('✅ ### 기반 제목과 파일명 번호가 혼합되어 올바르게 표시됩니다.');
  });
});
