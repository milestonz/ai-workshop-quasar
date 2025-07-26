import { test, expect } from '@playwright/test';

test.describe('목차 UPDATE 후 리프레시 테스트', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:9003/');
    await page.waitForLoadState('networkidle');
  });

  test('목차 UPDATE 후 새로운 제목이 즉시 반영되는지', async ({ page }) => {
    console.log('🔍 목차 UPDATE 후 리프레시 테스트 시작...');

    // 초기 상태 확인 - Chapter 3 확장
    const chapter3 = page.locator('.q-expansion-item').filter({ hasText: '3.' });
    await chapter3.click();
    await page.waitForTimeout(1000);

    // 초기 슬라이드 제목 확인
    const initialSlide33 = page.locator('.slide-item').filter({ hasText: '3-3' });
    await expect(initialSlide33).toBeVisible();

    // 목차 UPDATE 버튼 클릭
    const updateButton = page.locator('button').filter({ hasText: '목차 UPDATE' });
    await updateButton.click();

    // 업데이트 완료 대기
    await page.waitForTimeout(3000);

    // 업데이트 후 새로운 제목 확인
    // 3-3.md의 ### 제목이 "Challenge-3 : 가스펠 작곡"으로 표시되어야 함
    const updatedSlide33 = page.locator('.slide-item').filter({ hasText: 'Challenge-3' });
    await expect(updatedSlide33).toBeVisible();
    await expect(updatedSlide33).toContainText('Challenge-3 : 가스펠 작곡');

    console.log('✅ 목차 UPDATE 후 새로운 제목이 즉시 반영됩니다.');
  });

  test('목차 UPDATE 후 캐시가 초기화되고 새로운 데이터가 로드되는지', async ({ page }) => {
    console.log('🔍 캐시 초기화 및 새 데이터 로드 테스트 시작...');

    // 목차 UPDATE 버튼 클릭
    const updateButton = page.locator('button').filter({ hasText: '목차 UPDATE' });
    await updateButton.click();

    // 업데이트 완료 대기
    await page.waitForTimeout(3000);

    // Chapter 3 확장
    const chapter3 = page.locator('.q-expansion-item').filter({ hasText: '3.' });
    await chapter3.click();
    await page.waitForTimeout(1000);

    // 여러 슬라이드의 제목이 올바르게 표시되는지 확인
    const slide33 = page.locator('.slide-item').filter({ hasText: 'Challenge-3' });
    const slide34 = page.locator('.slide-item').filter({ hasText: 'Challenge-4' });
    const slide35 = page.locator('.slide-item').filter({ hasText: '3-5' });

    await expect(slide33).toBeVisible();
    await expect(slide34).toBeVisible();
    await expect(slide35).toBeVisible();

    // 제목 내용 확인
    await expect(slide33).toContainText('Challenge-3 : 가스펠 작곡');
    await expect(slide34).toContainText('Challenge-4 : 소그룹 리더 교육교재 제작');
    await expect(slide35).toContainText('3-5');

    console.log('✅ 캐시가 초기화되고 새로운 데이터가 올바르게 로드됩니다.');
  });

  test('목차 UPDATE 중 로딩 상태가 표시되고 완료 후 해제되는지', async ({ page }) => {
    console.log('🔍 로딩 상태 테스트 시작...');

    // 목차 UPDATE 버튼 클릭
    const updateButton = page.locator('button').filter({ hasText: '목차 UPDATE' });
    await updateButton.click();

    // 로딩 상태 확인 (버튼이 비활성화됨)
    await expect(updateButton).toBeDisabled();

    // 업데이트 완료 대기
    await page.waitForTimeout(3000);

    // 로딩 완료 후 버튼이 다시 활성화되는지 확인
    await expect(updateButton).toBeEnabled();

    console.log('✅ 로딩 상태가 올바르게 표시되고 해제됩니다.');
  });

  test('목차 UPDATE 후 성공 메시지가 표시되는지', async ({ page }) => {
    console.log('🔍 성공 메시지 테스트 시작...');

    // 목차 UPDATE 버튼 클릭
    const updateButton = page.locator('button').filter({ hasText: '목차 UPDATE' });
    await updateButton.click();

    // 성공 메시지 대기 (alert가 표시됨)
    page.on('dialog', (dialog) => {
      expect(dialog.message()).toContain('✅ 목차가 성공적으로 업데이트되었습니다!');
      dialog.accept();
    });

    // 업데이트 완료 대기
    await page.waitForTimeout(3000);

    console.log('✅ 성공 메시지가 올바르게 표시됩니다.');
  });

  test('목차 UPDATE 후 현재 강의 정보가 올바르게 업데이트되는지', async ({ page }) => {
    console.log('🔍 현재 강의 정보 업데이트 테스트 시작...');

    // 초기 상태 확인 - Chapter 3 선택
    const chapter3 = page.locator('.q-expansion-item').filter({ hasText: '3.' });
    await chapter3.click();
    await page.waitForTimeout(1000);

    // 3-3 슬라이드 선택
    const slide33 = page.locator('.slide-item').filter({ hasText: '3-3' });
    await slide33.click();
    await page.waitForTimeout(1000);

    // 초기 현재 강의 정보 확인
    const currentLessonInfo = page.locator('.text-body2').filter({ hasText: '3.' });
    await expect(currentLessonInfo).toBeVisible();

    // 목차 UPDATE 버튼 클릭
    const updateButton = page.locator('button').filter({ hasText: '목차 UPDATE' });
    await updateButton.click();

    // 업데이트 완료 대기
    await page.waitForTimeout(3000);

    // 업데이트 후 현재 강의 정보가 여전히 표시되는지 확인
    const updatedCurrentLessonInfo = page.locator('.text-body2').filter({ hasText: '3.' });
    await expect(updatedCurrentLessonInfo).toBeVisible();

    // 현재 슬라이드 정보도 확인 (사이드바 하단의 현재 강의 영역에서만 찾기)
    const slideInfo = page
      .locator('.q-drawer .text-caption')
      .filter({ hasText: '슬라이드' })
      .last();
    await expect(slideInfo).toBeVisible();

    console.log('✅ 현재 강의 정보가 올바르게 업데이트됩니다.');
  });
});
