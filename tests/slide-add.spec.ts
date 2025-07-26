import { test, expect } from '@playwright/test';

test.describe('슬라이드 추가 기능 테스트', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:9001');
    await page.waitForLoadState('networkidle');
  });

  test('Chapter에 슬라이드 추가 버튼이 표시되는지', async ({ page }) => {
    console.log('🔍 슬라이드 추가 버튼 테스트 시작...');

    // 사이드바 열기
    const menuButton = page.locator('button[aria-label="Menu"]');
    await menuButton.click();

    // Chapter 목록이 로드될 때까지 대기
    await page.waitForSelector('.q-expansion-item', { timeout: 10000 });

    // 첫 번째 Chapter의 슬라이드 추가 버튼 확인
    const addButton = page
      .locator('.q-expansion-item')
      .first()
      .locator('button[title="슬라이드 추가"]');
    await expect(addButton).toBeVisible();

    console.log('✅ 슬라이드 추가 버튼이 정상적으로 표시됩니다.');
  });

  test('Chapter에 슬라이드 추가 기능이 작동하는지', async ({ page }) => {
    console.log('🔍 슬라이드 추가 기능 테스트 시작...');

    // 사이드바 열기
    const menuButton = page.locator('button[aria-label="Menu"]');
    await menuButton.click();

    // Chapter 목록이 로드될 때까지 대기
    await page.waitForSelector('.q-expansion-item', { timeout: 10000 });

    // 첫 번째 Chapter의 헤더를 클릭해서 확장
    const firstChapter = page.locator('.q-expansion-item').first();
    const chapterHeader = firstChapter.locator('.q-expansion-item__header');
    await chapterHeader.click();
    await page.waitForTimeout(1000);

    // 첫 번째 Chapter의 초기 슬라이드 개수 확인
    const initialSlideCount = await firstChapter.locator('.text-caption.text-grey-6').textContent();
    console.log('📄 초기 슬라이드 개수:', initialSlideCount);

    // 슬라이드 추가 버튼이 안정될 때까지 대기
    await page.waitForTimeout(2000);

    // 슬라이드 추가 버튼 클릭 (force 옵션 사용)
    const addButton = firstChapter.locator('button[title="슬라이드 추가"]');
    await addButton.waitFor({ state: 'visible', timeout: 5000 });
    await addButton.click({ force: true });

    // 슬라이드가 추가될 때까지 대기
    await page.waitForTimeout(3000);

    // 추가된 슬라이드 개수 확인
    const newSlideCount = await firstChapter.locator('.text-caption.text-grey-6').textContent();
    console.log('📄 추가 후 슬라이드 개수:', newSlideCount);

    // 슬라이드 개수가 증가했는지 확인
    expect(newSlideCount).not.toBe(initialSlideCount);

    console.log('✅ 슬라이드 추가 기능이 정상적으로 작동합니다.');
  });

  test('새로 추가된 슬라이드의 MD 파일이 생성되는지', async ({ page }) => {
    console.log('🔍 새 슬라이드 MD 파일 생성 테스트 시작...');

    // 사이드바 열기
    const menuButton = page.locator('button[aria-label="Menu"]');
    await menuButton.click();

    // Chapter 목록이 로드될 때까지 대기
    await page.waitForSelector('.q-expansion-item', { timeout: 10000 });

    // 첫 번째 Chapter의 헤더를 클릭해서 확장
    const firstChapter = page.locator('.q-expansion-item').first();
    const chapterHeader = firstChapter.locator('.q-expansion-item__header');
    await chapterHeader.click();
    await page.waitForTimeout(1000);

    // 슬라이드 추가 버튼이 안정될 때까지 대기
    await page.waitForTimeout(2000);

    // 슬라이드 추가 버튼 클릭
    const addButton = firstChapter.locator('button[title="슬라이드 추가"]');
    await addButton.waitFor({ state: 'visible', timeout: 5000 });
    await addButton.click({ force: true });

    // 슬라이드가 추가될 때까지 대기
    await page.waitForTimeout(3000);

    // 새로 추가된 슬라이드 클릭
    const slideItems = firstChapter.locator('.slide-item');
    const lastSlideItem = slideItems.last();
    await lastSlideItem.click();

    // 편집기에서 내용 확인
    await page.waitForTimeout(1000);
    const editorContent = page.locator('.markdown-editor textarea');
    const content = await editorContent.inputValue();

    console.log('📄 새 슬라이드 내용:', content.substring(0, 100) + '...');

    // 새 슬라이드의 기본 내용이 포함되어 있는지 확인
    expect(content).toContain('새 슬라이드');
    expect(content).toContain('새로운 슬라이드 내용을 여기에 작성하세요');

    console.log('✅ 새 슬라이드의 MD 파일이 정상적으로 생성됩니다.');
  });
});
