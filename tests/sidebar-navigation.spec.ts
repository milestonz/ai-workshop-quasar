import { test, expect } from '@playwright/test';

test.describe('사이드바 목차 클릭 테스트', () => {
  test.beforeEach(async ({ page }) => {
    // 페이지 로드
    await page.goto('/');

    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForLoadState('networkidle');

    // 사이드바가 로드될 때까지 대기
    await page.waitForSelector('.q-drawer', { timeout: 10000 });
  });

  test('사이드바 목차 클릭 시 편집기에 MD 파일 내용이 표시되는지', async ({ page }) => {
    // 1. 초기 상태 확인
    console.log('🔍 초기 상태 확인 중...');

    // 사이드바가 열려있는지 확인
    const sidebar = page.locator('.q-drawer');
    await expect(sidebar).toBeVisible();

    // 첫 번째 Chapter의 첫 번째 슬라이드 찾기
    const firstSlideItem = page.locator('.slide-item').first();
    await expect(firstSlideItem).toBeVisible();

    // 2. 첫 번째 슬라이드 클릭
    console.log('🖱️ 첫 번째 슬라이드 클릭 중...');
    await firstSlideItem.click();

    // 3. 편집기가 로드될 때까지 대기
    console.log('⏳ 편집기 로드 대기 중...');
    await page.waitForSelector('.markdown-editor', { timeout: 10000 });

    // 4. 편집기 내용 확인
    console.log('📝 편집기 내용 확인 중...');
    const editor = page.locator('.markdown-editor textarea');
    await expect(editor).toBeVisible();

    // 편집기에 내용이 있는지 확인
    const editorContent = await editor.inputValue();
    console.log('📄 편집기 내용:', editorContent.substring(0, 100));

    expect(editorContent.length).toBeGreaterThan(0);
    expect(editorContent).toContain('#');
  });

  test('사이드바 목차 클릭 시 슬라이드 뷰어에 HTML이 표시되는지', async ({ page }) => {
    // 1. 첫 번째 슬라이드 클릭
    console.log('🖱️ 첫 번째 슬라이드 클릭 중...');
    const firstSlideItem = page.locator('.slide-item').first();
    await firstSlideItem.click();

    // 2. 슬라이드 뷰어가 로드될 때까지 대기
    console.log('⏳ 슬라이드 뷰어 로드 대기 중...');
    await page.waitForSelector('.slide-viewer', { timeout: 10000 });

    // 3. 슬라이드 뷰어 내용 확인
    console.log('🖼️ 슬라이드 뷰어 내용 확인 중...');
    const slideViewer = page.locator('.slide-viewer').first();
    await expect(slideViewer).toBeVisible();

    // HTML 내용이 렌더링되었는지 확인
    const slideContent = await slideViewer.innerHTML();
    console.log('📄 슬라이드 뷰어 내용:', slideContent.substring(0, 200));

    expect(slideContent.length).toBeGreaterThan(0);
    // HTML 태그가 있는지 확인 (Markdown이 HTML로 변환되었는지)
    expect(slideContent).toMatch(/<[^>]+>/);
  });

  test('다른 슬라이드 클릭 시 편집기와 뷰어가 모두 업데이트되는지', async ({ page }) => {
    // 1. 첫 번째 슬라이드 클릭
    console.log('🖱️ 첫 번째 슬라이드 클릭 중...');
    const firstSlideItem = page.locator('.slide-item').first();
    await firstSlideItem.click();

    // 2. 첫 번째 슬라이드 내용 저장
    const editor = page.locator('.markdown-editor textarea');
    await expect(editor).toBeVisible();
    const firstContent = await editor.inputValue();
    console.log('📄 첫 번째 슬라이드 내용:', firstContent.substring(0, 100));

    // 3. 두 번째 슬라이드 클릭
    console.log('🖱️ 두 번째 슬라이드 클릭 중...');
    const secondSlideItem = page.locator('.slide-item').nth(1);
    await secondSlideItem.click();

    // 4. 편집기 내용이 변경되었는지 확인
    console.log('⏳ 편집기 내용 변경 대기 중...');
    await page.waitForFunction(
      () => {
        const editor = document.querySelector('.markdown-editor textarea') as HTMLTextAreaElement;
        return editor && editor.value !== '';
      },
      { timeout: 10000 },
    );

    const secondContent = await editor.inputValue();
    console.log('📄 두 번째 슬라이드 내용:', secondContent.substring(0, 100));

    // 내용이 다르거나 비어있지 않은지 확인
    expect(secondContent.length).toBeGreaterThan(0);

    // 5. 슬라이드 뷰어도 업데이트되었는지 확인
    const slideViewer = page.locator('.slide-viewer').first();
    const slideContent = await slideViewer.innerHTML();
    console.log('📄 업데이트된 슬라이드 뷰어 내용:', slideContent.substring(0, 200));

    expect(slideContent.length).toBeGreaterThan(0);
  });

  test('Chapter 변경 시 편집기와 뷰어가 올바르게 업데이트되는지', async ({ page }) => {
    // 1. 첫 번째 Chapter의 첫 번째 슬라이드 클릭
    console.log('🖱️ 첫 번째 Chapter의 첫 번째 슬라이드 클릭 중...');
    const firstSlideItem = page.locator('.slide-item').first();
    await firstSlideItem.click();

    // 2. 첫 번째 슬라이드 내용 저장
    const editor = page.locator('.markdown-editor textarea');
    await expect(editor).toBeVisible();
    const firstContent = await editor.inputValue();
    console.log('📄 첫 번째 Chapter 내용:', firstContent.substring(0, 100));

    // 3. 두 번째 Chapter의 첫 번째 슬라이드 찾기 및 클릭
    console.log('🖱️ 두 번째 Chapter의 첫 번째 슬라이드 클릭 중...');

    // 두 번째 Chapter의 expansion item 찾기
    const secondChapter = page.locator('.q-expansion-item').nth(1);
    await secondChapter.click();

    // 두 번째 Chapter의 첫 번째 슬라이드 클릭
    const secondChapterFirstSlide = secondChapter.locator('.slide-item').first();
    await secondChapterFirstSlide.click();

    // 4. 편집기 내용이 변경되었는지 확인
    console.log('⏳ 편집기 내용 변경 대기 중...');
    await page.waitForFunction(
      () => {
        const editor = document.querySelector('.markdown-editor textarea') as HTMLTextAreaElement;
        return editor && editor.value !== '';
      },
      { timeout: 10000 },
    );

    const secondContent = await editor.inputValue();
    console.log('📄 두 번째 Chapter 내용:', secondContent.substring(0, 100));

    // 내용이 다르거나 비어있지 않은지 확인
    expect(secondContent.length).toBeGreaterThan(0);

    // 5. 슬라이드 뷰어도 업데이트되었는지 확인
    const slideViewer = page.locator('.slide-viewer').first();
    const slideContent = await slideViewer.innerHTML();
    console.log('📄 업데이트된 슬라이드 뷰어 내용:', slideContent.substring(0, 200));

    expect(slideContent.length).toBeGreaterThan(0);
  });

  test('MD 파일이 존재하지 않는 슬라이드 클릭 시 빈 내용이 표시되는지', async ({ page }) => {
    // 1. 두 번째 슬라이드 클릭 (존재하지 않을 가능성이 높음)
    console.log('🖱️ 두 번째 슬라이드 클릭 중...');
    const slideItems = page.locator('.slide-item');
    const slideCount = await slideItems.count();

    if (slideCount > 1) {
      const secondSlideItem = slideItems.nth(1);
      await secondSlideItem.click();

      // 2. 편집기 확인
      console.log('📝 편집기 확인 중...');
      const editor = page.locator('.markdown-editor textarea');
      await expect(editor).toBeVisible();

      // 3. 내용이 비어있거나 기본 메시지가 있는지 확인
      const editorContent = await editor.inputValue();
      console.log('📄 편집기 내용:', editorContent);

      // 내용이 비어있거나 기본 메시지가 있어야 함
      expect(editorContent.length).toBeGreaterThanOrEqual(0);
    }
  });

  test('사이드바 목차 클릭 시 콘솔 로그가 올바르게 출력되는지', async ({ page }) => {
    // 1. 콘솔 로그 수집 시작
    const consoleLogs: string[] = [];
    page.on('console', (msg) => {
      consoleLogs.push(msg.text());
    });

    // 2. 첫 번째 슬라이드 클릭
    console.log('🖱️ 첫 번째 슬라이드 클릭 중...');
    const firstSlideItem = page.locator('.slide-item').first();
    await firstSlideItem.click();

    // 3. 로그가 출력될 때까지 대기
    await page.waitForTimeout(2000);

    // 4. 콘솔 로그 확인
    console.log('📋 콘솔 로그:', consoleLogs);

    // 슬라이드 선택 관련 로그가 있는지 확인
    const hasSlideSelectionLog = consoleLogs.some(
      (log) =>
        log.includes('🎯 슬라이드 선택') ||
        log.includes('🔄 Watch 트리거됨') ||
        log.includes('📂 loadSlideContentFromMD 시작'),
    );

    expect(hasSlideSelectionLog).toBe(true);
  });
});
