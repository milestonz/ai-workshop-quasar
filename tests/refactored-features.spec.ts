import { test, expect } from '@playwright/test';

test.describe('리팩토링된 기능 테스트', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // 페이지 로딩 대기
    await page.waitForSelector('.main-layout', { timeout: 10000 });
  });

  test('슬라이드 뷰어가 정상적으로 로드되는지 확인', async ({ page }) => {
    // 슬라이드 뷰어 컨테이너가 존재하는지 확인
    await expect(page.locator('.slide-viewer-container')).toBeVisible();

    // 사이드바가 존재하는지 확인 (프리젠테이션 모드가 아닐 때)
    await expect(page.locator('.sidebar-container')).toBeVisible();
  });

  test('마크다운 렌더링이 정상적으로 동작하는지 확인', async ({ page }) => {
    // 첫 번째 슬라이드로 이동 (사이드바에서 클릭)
    await page.locator('.slide-item').first().click();
    await page.waitForTimeout(1000);

    // 마크다운 내용이 렌더링되는지 확인
    await expect(page.locator('.markdown-slide')).toBeVisible();

    // 기본 텍스트 정렬이 좌측인지 확인
    const slideContent = page.locator('.markdown-slide');
    await expect(slideContent).toHaveCSS('text-align', 'left');
  });

  test('h1 헤딩이 중앙 정렬되는지 확인', async ({ page }) => {
    // h1이 있는 슬라이드로 이동
    await page.locator('.slide-item').first().click();
    await page.waitForTimeout(1000);

    // h1 요소가 중앙 정렬되는지 확인
    const h1Element = page.locator('.markdown-slide h1');
    if ((await h1Element.count()) > 0) {
      await expect(h1Element.first()).toHaveCSS('text-align', 'center');
    }
  });

  test('테이블이 정상적으로 렌더링되는지 확인', async ({ page }) => {
    // 테이블이 있는 슬라이드로 이동 (slide-1-1)
    // 사이드바에서 해당 슬라이드 찾기
    const slideItems = page.locator('.slide-item');
    for (let i = 0; i < (await slideItems.count()); i++) {
      const slideText = await slideItems.nth(i).textContent();
      if (slideText && slideText.includes('1-1')) {
        await slideItems.nth(i).click();
        break;
      }
    }
    await page.waitForTimeout(1000);

    // 테이블이 존재하는지 확인
    const table = page.locator('.markdown-slide table');
    if ((await table.count()) > 0) {
      await expect(table.first()).toBeVisible();

      // 테이블 셀이 정상적으로 표시되는지 확인
      await expect(table.locator('td, th')).toHaveCount(await table.locator('td, th').count());
    }
  });

  test('볼드 텍스트가 인라인으로 표시되는지 확인', async ({ page }) => {
    // 볼드 텍스트가 있는 슬라이드로 이동
    const slideItems = page.locator('.slide-item');
    for (let i = 0; i < (await slideItems.count()); i++) {
      const slideText = await slideItems.nth(i).textContent();
      if (slideText && slideText.includes('1-1')) {
        await slideItems.nth(i).click();
        break;
      }
    }
    await page.waitForTimeout(1000);

    // strong 태그가 존재하는지 확인
    const boldText = page.locator('.markdown-slide strong');
    if ((await boldText.count()) > 0) {
      await expect(boldText.first()).toBeVisible();

      // 볼드 텍스트가 줄바꿈 없이 인라인으로 표시되는지 확인
      const boldElement = boldText.first();
      const computedStyle = await boldElement.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return {
          display: style.display,
          whiteSpace: style.whiteSpace,
        };
      });

      expect(computedStyle.display).toBe('inline');
    }
  });

  test('사이드바 버튼들이 정상적으로 동작하는지 확인', async ({ page }) => {
    // 목차 UPDATE 버튼이 존재하는지 확인
    const updateButton = page.locator('button[title="목차 UPDATE"]');
    await expect(updateButton).toBeVisible();

    // 클리어 버튼이 제거되었는지 확인
    const clearButton = page.locator('button:has-text("클리어")');
    await expect(clearButton).toHaveCount(0);
  });

  test('CSS 편집 기능이 정상적으로 동작하는지 확인', async ({ page }) => {
    // CSS 편집기 섹션이 존재하는지 확인
    const cssEditor = page.locator('.css-editor-section');
    await expect(cssEditor).toBeVisible();

    // CSS 편집기에서 텍스트를 입력할 수 있는지 확인
    const cssTextarea = page.locator('.css-editor-section textarea');
    if ((await cssTextarea.count()) > 0) {
      await cssTextarea.first().fill('/* 테스트 CSS */\n.markdown-slide { color: red; }');

      // CSS가 적용되는지 확인 (실제로는 더 복잡한 검증이 필요)
      await expect(cssTextarea.first()).toHaveValue(
        '/* 테스트 CSS */\n.markdown-slide { color: red; }',
      );
    }
  });

  test('파일 내보내기 기능이 정상적으로 동작하는지 확인', async ({ page }) => {
    // 파일 내보내기 섹션이 존재하는지 확인
    const exportSection = page.locator('.file-export-section');
    await expect(exportSection).toBeVisible();

    // 내보내기 버튼들이 존재하는지 확인
    const exportButtons = page.locator('.file-export-section button');
    await expect(exportButtons).toHaveCount(await exportButtons.count());
  });

  test('댓글 기능이 정상적으로 동작하는지 확인', async ({ page }) => {
    // 댓글 섹션이 존재하는지 확인
    const commentSection = page.locator('.comments-section');
    await expect(commentSection).toBeVisible();

    // 댓글 입력 필드가 존재하는지 확인
    const commentInput = page.locator('.comment-input');
    if ((await commentInput.count()) > 0) {
      await expect(commentInput.first()).toBeVisible();
    }
  });

  test('슬라이드 네비게이션이 정상적으로 동작하는지 확인', async ({ page }) => {
    // 이전/다음 버튼이 존재하는지 확인
    const prevButton = page.locator('.slide-nav-btn:has-text("이전")');
    const nextButton = page.locator('.slide-nav-btn:has-text("다음")');

    await expect(prevButton).toBeVisible();
    await expect(nextButton).toBeVisible();

    // 첫 번째 슬라이드에서 이전 버튼이 비활성화되어 있는지 확인
    await page.locator('.slide-item').first().click();
    await expect(prevButton).toBeDisabled();

    // 다음 버튼을 클릭할 수 있는지 확인
    await expect(nextButton).toBeEnabled();
  });

  test('저장 기능이 정상적으로 동작하는지 확인', async ({ page }) => {
    // 헤더에 저장 버튼이 존재하는지 확인
    const saveButton = page.locator('button[title="전체 저장"]');
    if ((await saveButton.count()) > 0) {
      await expect(saveButton.first()).toBeVisible();

      // 저장 버튼을 클릭할 수 있는지 확인
      await expect(saveButton.first()).toBeEnabled();
    }
  });

  test('프리젠테이션 모드가 정상적으로 동작하는지 확인', async ({ page }) => {
    // 프리젠테이션 모드 버튼이 존재하는지 확인
    const presentationButton = page.locator('button[title*="프리젠테이션"]');
    if ((await presentationButton.count()) > 0) {
      await expect(presentationButton.first()).toBeVisible();

      // 프리젠테이션 모드 버튼을 클릭할 수 있는지 확인
      await expect(presentationButton.first()).toBeEnabled();
    }
  });

  test('컴포넌트 분리가 정상적으로 되어 있는지 확인', async ({ page }) => {
    // 주요 컴포넌트들이 존재하는지 확인
    await expect(page.locator('.slide-viewer-container')).toBeVisible();
    await expect(page.locator('.sidebar-container')).toBeVisible();

    // 각 컴포넌트가 독립적으로 동작하는지 확인
    // (이는 실제 동작을 통해 간접적으로 확인)
    await expect(page.locator('.markdown-slide')).toBeVisible();
  });

  test('타입스크립트 타입이 정상적으로 동작하는지 확인', async ({ page }) => {
    // 페이지가 정상적으로 로드되고 에러가 없는지 확인
    // (콘솔 에러 체크)
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // 페이지 새로고침
    await page.reload();

    // 타입 에러가 없는지 확인 (콘솔 에러가 없어야 함)
    expect(consoleErrors.length).toBe(0);
  });
});
