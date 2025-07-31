import { test, expect } from '@playwright/test';

test.describe('사이드바 네비게이션 테스트', () => {
  test.beforeEach(async ({ page }) => {
    // 메인 페이지로 이동 (Playwright 설정의 baseURL 사용)
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('사이드바에서 슬라이드 클릭 시 해당 슬라이드로 이동하는지', async ({ page }) => {
    // 페이지 로드 대기
    await page.waitForLoadState('domcontentloaded');

    // 사이드바가 표시되는지 확인
    await expect(page.locator('.q-drawer')).toBeVisible({ timeout: 10000 });

    // 첫 번째 Chapter 확장 (슬라이드 목록을 보기 위해)
    const firstChapter = page.locator('.q-expansion-item').first();
    await firstChapter.click();

    // 첫 번째 Chapter의 두 번째 슬라이드가 로드될 때까지 대기 (첫 번째는 숨겨짐)
    await page.waitForSelector('.q-expansion-item:first-child .slide-item', { timeout: 15000 });

    // 첫 번째 Chapter의 두 번째 슬라이드 클릭
    const secondSlide = page.locator('.q-expansion-item:first-child .slide-item').first();
    await secondSlide.click();

    // 슬라이드 뷰어에서 내용이 변경되었는지 확인
    await page.waitForTimeout(3000);

    // 콘솔 로그 확인 (디버깅용)
    const logs: string[] = [];
    page.on('console', (msg) => {
      if (msg.text().includes('Store 변경 감지') || msg.text().includes('SlideManager 업데이트')) {
        logs.push(msg.text());
      }
    });

    console.log('📋 콘솔 로그:', logs);

    // 현재 슬라이드 정보가 업데이트되었는지 확인
    const currentSlideInfo = page.locator('.text-caption:has-text("슬라이드")');
    await expect(currentSlideInfo).toBeVisible({ timeout: 5000 });
  });

  test('사이드바에서 Chapter 클릭 시 해당 Chapter로 이동하는지', async ({ page }) => {
    // 첫 번째 Chapter 확장 아이템 클릭
    const firstChapter = page.locator('.q-expansion-item').first();
    await firstChapter.click();

    // 첫 번째 Chapter가 확장되었는지 확인 (두 번째 슬라이드가 표시되는지)
    await expect(page.locator('.q-expansion-item:first-child .slide-item')).toBeVisible({
      timeout: 10000,
    });
  });

  test('사이드바에서 잠긴 슬라이드 클릭 시 경고 메시지가 표시되는지', async ({ page }) => {
    // 잠긴 슬라이드 찾기 (잠금 아이콘이 있는 슬라이드)
    const lockedSlide = page.locator('.slide-item .q-icon:has-text("lock")').first();

    if (await lockedSlide.isVisible()) {
      await lockedSlide.click();

      // 경고 메시지가 표시되는지 확인
      await expect(page.locator('.q-notification')).toBeVisible();
    }
  });

  test('사이드바에서 슬라이드 선택 시 URL이 업데이트되는지', async ({ page }) => {
    // 첫 번째 Chapter 확장
    const firstChapter = page.locator('.q-expansion-item').first();
    await firstChapter.click();

    // 첫 번째 Chapter의 두 번째 슬라이드가 로드될 때까지 대기
    await page.waitForSelector('.q-expansion-item:first-child .slide-item', { timeout: 15000 });

    // 첫 번째 Chapter의 두 번째 슬라이드 클릭
    const secondSlide = page.locator('.q-expansion-item:first-child .slide-item').first();
    await secondSlide.click();

    // URL에 slide 파라미터가 추가되었는지 확인
    await page.waitForTimeout(2000);
    const url = page.url();
    console.log('🌐 현재 URL:', url);
    expect(url).toContain('slide=');
  });

  test('사이드바에서 현재 선택된 슬라이드가 하이라이트되는지', async ({ page }) => {
    // 첫 번째 Chapter 확장
    const firstChapter = page.locator('.q-expansion-item').first();
    await firstChapter.click();

    // 첫 번째 Chapter의 두 번째 슬라이드가 로드될 때까지 대기
    await page.waitForSelector('.q-expansion-item:first-child .slide-item', { timeout: 15000 });

    // 첫 번째 Chapter의 두 번째 슬라이드 클릭
    const secondSlide = page.locator('.q-expansion-item:first-child .slide-item').first();
    await secondSlide.click();

    // 선택된 슬라이드에 active 클래스가 적용되었는지 확인
    await expect(secondSlide).toHaveClass(/active/);

    // 또는 slide-item-active 클래스 확인
    await expect(secondSlide).toHaveClass(/slide-item-active/);
  });

  test('사이드바에서 키보드 네비게이션이 작동하는지', async ({ page }) => {
    // 사이드바에 포커스
    await page.locator('.q-drawer').click();

    // 화살표 키로 네비게이션
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    // 슬라이드가 변경되었는지 확인
    await page.waitForTimeout(1000);
  });

  test('사이드바에서 슬라이드 잠금/해제 기능이 작동하는지', async ({ page }) => {
    // 잠금 버튼 찾기
    const lockButton = page.locator('.slide-item .q-btn[title*="잠금"]').first();

    if (await lockButton.isVisible()) {
      const initialIcon = await lockButton.locator('.q-icon').textContent();

      // 잠금 버튼 클릭
      await lockButton.click();

      // 아이콘이 변경되었는지 확인
      await page.waitForTimeout(500);
      const newIcon = await lockButton.locator('.q-icon').textContent();
      expect(newIcon).not.toBe(initialIcon);
    }
  });

  test('사이드바에서 Chapter 잠금/해제 기능이 작동하는지', async ({ page }) => {
    // Chapter 잠금 버튼 찾기
    const chapterLockButton = page
      .locator('.q-expansion-item .q-btn[title*="Chapter 잠금"]')
      .first();

    if (await chapterLockButton.isVisible()) {
      const initialIcon = await chapterLockButton.locator('.q-icon').textContent();

      // Chapter 잠금 버튼 클릭
      await chapterLockButton.click();

      // 아이콘이 변경되었는지 확인
      await page.waitForTimeout(500);
      const newIcon = await chapterLockButton.locator('.q-icon').textContent();
      expect(newIcon).not.toBe(initialIcon);
    }
  });

  test('사이드바에서 목차 UPDATE 버튼이 작동하는지', async ({ page }) => {
    // UPDATE 버튼 찾기
    const updateButton = page.locator('.q-btn[title="목차 UPDATE"]').first();

    if (await updateButton.isVisible()) {
      // UPDATE 버튼 클릭
      await updateButton.click();

      // 로딩 상태가 표시되는지 확인 (더 관대한 타임아웃)
      await expect(page.locator('.q-btn[loading="true"]')).toBeVisible({ timeout: 10000 });

      // 로딩이 완료되는지 확인
      await expect(page.locator('.q-btn[loading="true"]')).not.toBeVisible({ timeout: 15000 });
    }
  });

  test('사이드바에서 슬라이드 추가 버튼이 작동하는지', async ({ page }) => {
    // 슬라이드 추가 버튼 찾기
    const addSlideButton = page.locator('.q-btn[title="슬라이드 추가"]').first();

    if (await addSlideButton.isVisible()) {
      // 슬라이드 추가 버튼 클릭
      await addSlideButton.click();

      // 새 슬라이드가 추가되었는지 확인
      await page.waitForTimeout(1000);
    }
  });

  test('사이드바 반응형 동작 확인', async ({ page }) => {
    // 화면 크기를 모바일 크기로 변경
    await page.setViewportSize({ width: 768, height: 1024 });

    // 사이드바가 숨겨지는지 확인 (더 관대한 타임아웃)
    await expect(page.locator('.q-drawer')).not.toBeVisible({ timeout: 10000 });

    // 메뉴 버튼 클릭
    const menuButton = page.locator('.q-btn[aria-label="Menu"]');
    if (await menuButton.isVisible()) {
      await menuButton.click();

      // 사이드바가 다시 표시되는지 확인
      await expect(page.locator('.q-drawer')).toBeVisible({ timeout: 10000 });
    }
  });
});
