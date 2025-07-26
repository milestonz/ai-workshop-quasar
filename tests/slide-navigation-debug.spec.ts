import { test, expect } from '@playwright/test';

test.describe('슬라이드 네비게이션 디버깅', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:9001/');
    await page.waitForLoadState('networkidle');
  });

  test('슬라이드 데이터 구조 확인', async ({ page }) => {
    console.log('🔍 슬라이드 데이터 구조 확인 시작...');

    // 1. 사이드바에서 "1. WHY" 강의 클릭
    console.log('📂 "1. WHY" 강의 클릭 중...');
    const whyLesson = page.locator('.q-expansion-item').filter({ hasText: '1. WHY' });
    await whyLesson.click();
    await page.waitForTimeout(1000);

    // 2. 첫 번째 슬라이드 클릭
    console.log('📄 첫 번째 슬라이드 클릭 중...');
    const firstSlide = page.locator('.q-item').filter({ hasText: '1-0' }).first();
    await firstSlide.click();
    await page.waitForTimeout(1000);

    // 3. 현재 슬라이드 정보 확인
    const slideInfo = await page.locator('.current-slide-info .text-caption').textContent();
    console.log('📄 현재 슬라이드 정보:', slideInfo);

    // 4. 다음 버튼 클릭
    console.log('➡️ 다음 버튼 클릭 중...');
    const nextButton = page.locator('.slide-controls .q-btn').filter({ hasText: '다음' });
    const isNextEnabled = await nextButton.isEnabled();
    console.log('🔍 다음 버튼 활성화 상태:', isNextEnabled);

    if (isNextEnabled) {
      await nextButton.click();
      await page.waitForTimeout(1000);

      // 5. 두 번째 슬라이드 정보 확인
      const afterNextSlideInfo = await page
        .locator('.current-slide-info .text-caption')
        .textContent();
      console.log('📄 다음 버튼 클릭 후 슬라이드 정보:', afterNextSlideInfo);

      // 6. 이제 이전 버튼이 활성화되었는지 확인
      const prevButton = page.locator('.slide-controls .q-btn').filter({ hasText: '이전' });
      const isPrevEnabled = await prevButton.isEnabled();
      console.log('🔍 이전 버튼 활성화 상태:', isPrevEnabled);

      // 7. 콘솔 로그 확인
      const consoleLogs = await page.evaluate(() => {
        return (window as any).consoleLogs || [];
      });
      console.log('📋 콘솔 로그:', consoleLogs);

      // 검증
      expect(isPrevEnabled).toBe(true);
      expect(slideInfo).not.toBe(afterNextSlideInfo);
    } else {
      console.log('⚠️ 다음 버튼이 비활성화되어 있어 테스트를 건너뜁니다.');
    }
  });
});
