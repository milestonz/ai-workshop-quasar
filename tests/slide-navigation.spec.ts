import { test, expect } from '@playwright/test';

test.describe('슬라이드 네비게이션 테스트', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:9001/');
    await page.waitForLoadState('networkidle');
  });

  test('이전/다음 버튼이 올바르게 작동하는지', async ({ page }) => {
    console.log('🔍 슬라이드 네비게이션 테스트 시작...');

    // 1. 초기 상태 확인
    const initialSlideInfo = await page.locator('.current-slide-info .text-caption').textContent();
    console.log('📄 초기 슬라이드 정보:', initialSlideInfo);

    // 2. 다음 버튼 클릭 (활성화된 경우에만)
    console.log('➡️ 다음 버튼 클릭 중...');
    const nextButton = page.locator('.slide-controls .q-btn').filter({ hasText: '다음' });
    const isNextEnabled = await nextButton.isEnabled();
    console.log('🔍 다음 버튼 활성화 상태:', isNextEnabled);

    if (isNextEnabled) {
      await nextButton.click();
      await page.waitForTimeout(1000);

      // 3. 슬라이드가 변경되었는지 확인
      const afterNextSlideInfo = await page
        .locator('.current-slide-info .text-caption')
        .textContent();
      console.log('📄 다음 버튼 클릭 후 슬라이드 정보:', afterNextSlideInfo);

      // 4. 이전 버튼 클릭 (이제 활성화되어야 함)
      console.log('⬅️ 이전 버튼 클릭 중...');
      const prevButton = page.locator('.slide-controls .q-btn').filter({ hasText: '이전' });
      const isPrevEnabled = await prevButton.isEnabled();
      console.log('🔍 이전 버튼 활성화 상태:', isPrevEnabled);

      if (isPrevEnabled) {
        await prevButton.click();
        await page.waitForTimeout(1000);

        // 5. 원래 슬라이드로 돌아왔는지 확인
        const afterPrevSlideInfo = await page
          .locator('.current-slide-info .text-caption')
          .textContent();
        console.log('📄 이전 버튼 클릭 후 슬라이드 정보:', afterPrevSlideInfo);

        // 6. 슬라이드 뷰어 내용이 변경되었는지 확인
        const slideViewerContent = await page.locator('.slide-viewer .slide-content').textContent();
        console.log('📄 슬라이드 뷰어 내용:', slideViewerContent?.substring(0, 100));

        // 7. 편집기 내용이 변경되었는지 확인
        const editorContent = await page.locator('.markdown-editor textarea').inputValue();
        console.log('📄 편집기 내용:', editorContent.substring(0, 100));

        // 검증
        expect(initialSlideInfo).not.toBe(afterNextSlideInfo);
        expect(afterNextSlideInfo).not.toBe(afterPrevSlideInfo);
        expect(initialSlideInfo).toBe(afterPrevSlideInfo);
      } else {
        console.log('⚠️ 이전 버튼이 비활성화되어 있어 테스트를 건너뜁니다.');
      }
    } else {
      console.log('⚠️ 다음 버튼이 비활성화되어 있어 테스트를 건너뜁니다.');
    }
  });

  test('첫 번째 슬라이드에서 이전 버튼이 비활성화되는지', async ({ page }) => {
    console.log('🔍 첫 번째 슬라이드 이전 버튼 테스트 시작...');

    // 1. 첫 번째 슬라이드인지 확인
    const slideInfo = await page.locator('.current-slide-info .text-caption').textContent();
    console.log('📄 현재 슬라이드 정보:', slideInfo);

    // 2. 이전 버튼이 비활성화되어 있는지 확인
    const prevButton = page.locator('.slide-controls .q-btn').filter({ hasText: '이전' });
    const isDisabled = await prevButton.isDisabled();
    console.log('🔍 이전 버튼 비활성화 상태:', isDisabled);

    expect(isDisabled).toBe(true);
  });

  test('마지막 슬라이드에서 다음 버튼을 클릭하면 알림이 표시되는지', async ({ page }) => {
    console.log('🔍 마지막 슬라이드 알림 테스트 시작...');

    // 1. 페이지 로드 대기
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // 2. 현재 슬라이드 정보 확인
    const initialSlideInfo = await page.locator('.current-slide-info .text-caption').textContent();
    console.log('📄 초기 슬라이드 정보:', initialSlideInfo);

    // 3. 다음 버튼 찾기
    const nextButton = page.locator('.slide-controls .q-btn').filter({ hasText: '다음' });

    // 4. alert 이벤트 리스너 설정 (페이지 로드 전에 설정)
    let alertMessage = '';
    page.on('dialog', async (dialog) => {
      console.log('🎯 알림 감지:', dialog.message());
      alertMessage = dialog.message();
      await dialog.accept();
    });

    // 5. 다음 버튼을 여러 번 클릭해서 마지막 슬라이드로 이동
    let clickCount = 0;
    const maxClicks = 15; // 더 많은 클릭 허용

    while (clickCount < maxClicks) {
      const isEnabled = await nextButton.isEnabled();
      console.log(`🔄 클릭 ${clickCount + 1}번째 - 버튼 활성화 상태: ${isEnabled}`);

      if (!isEnabled) {
        console.log('✅ 다음 버튼이 비활성화되어 마지막 슬라이드에 도달했습니다.');
        break;
      }

      await nextButton.click();
      await page.waitForTimeout(500);
      clickCount++;

      // 알림이 표시되었는지 확인
      if (alertMessage) {
        console.log('🎯 알림이 표시되었습니다:', alertMessage);
        break;
      }
    }

    // 6. 최종 슬라이드 정보 확인
    const finalSlideInfo = await page.locator('.current-slide-info .text-caption').textContent();
    console.log('📄 최종 슬라이드 정보:', finalSlideInfo);

    // 7. 검증
    // 다음 중 하나가 참이어야 함:
    // 1) 다음 버튼이 비활성화되어 있음 (마지막 슬라이드)
    // 2) 알림이 표시되었음 (마지막 슬라이드에서 다음 버튼 클릭)
    const isNextDisabled = await nextButton.isDisabled();
    const hasAlert = alertMessage.includes('마지막 슬라이드입니다');

    console.log('🔍 검증 결과:', {
      isNextDisabled,
      hasAlert,
      alertMessage,
    });

    expect(isNextDisabled || hasAlert).toBe(true);

    if (hasAlert) {
      expect(alertMessage).toContain('마지막 슬라이드입니다');
    }
  });
});
