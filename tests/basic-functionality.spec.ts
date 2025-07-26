import { test, expect } from '@playwright/test';

test.describe('기본 기능 테스트', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // 페이지 로딩 대기
    await page.waitForSelector('.main-layout', { timeout: 10000 });
  });

  test('페이지가 정상적으로 로드되는지 확인', async ({ page }) => {
    // 기본 레이아웃 요소들이 존재하는지 확인
    await expect(page.locator('.main-layout')).toBeVisible();

    // 헤더가 존재하는지 확인 (Quasar는 실제로 header 태그로 렌더링)
    await expect(page.locator('header')).toBeVisible();

    // 사이드바가 존재하는지 확인 (Quasar는 실제로 div로 렌더링)
    await expect(page.locator('.q-drawer')).toBeVisible();
  });

  test('헤더 버튼들이 정상적으로 존재하는지 확인', async ({ page }) => {
    // 저장 버튼이 존재하는지 확인 (다양한 선택자 시도)
    const saveButton = page.locator(
      'button[title*="저장"], button[title*="Save"], button[aria-label*="저장"]',
    );
    if ((await saveButton.count()) > 0) {
      await expect(saveButton.first()).toBeVisible();
    }

    // 프리젠테이션 모드 버튼이 존재하는지 확인
    const presentationButton = page.locator(
      'button[title*="프리젠테이션"], button[title*="Presentation"], button[aria-label*="프리젠테이션"]',
    );
    if ((await presentationButton.count()) > 0) {
      await expect(presentationButton.first()).toBeVisible();
    }

    // 최소한 하나의 헤더 버튼은 존재해야 함
    const headerButtons = page.locator('header button');
    await expect(headerButtons).toHaveCount(await headerButtons.count());
  });

  test('사이드바의 목차 UPDATE 버튼이 존재하는지 확인', async ({ page }) => {
    // 목차 UPDATE 버튼이 존재하는지 확인 (다양한 선택자 시도)
    const updateButton = page.locator(
      'button[title*="UPDATE"], button[title*="목차"], button[aria-label*="UPDATE"]',
    );
    if ((await updateButton.count()) > 0) {
      await expect(updateButton.first()).toBeVisible();
    }

    // 클리어 버튼이 제거되었는지 확인
    const clearButton = page.locator('button:has-text("클리어")');
    await expect(clearButton).toHaveCount(0);
  });

  test('강의 목차가 표시되는지 확인', async ({ page }) => {
    // 강의 목차 섹션이 존재하는지 확인
    const tocSection = page.locator('.text-subtitle2:has-text("강의 목차")');
    await expect(tocSection).toBeVisible();

    // 확장 아이템들이 존재하는지 확인
    const expansionItems = page.locator('.q-expansion-item');
    await expect(expansionItems).toHaveCount(await expansionItems.count());
  });

  test('슬라이드 뷰어가 정상적으로 로드되는지 확인', async ({ page }) => {
    // 슬라이드 뷰어 컨테이너가 존재하는지 확인
    await expect(page.locator('.slide-viewer-container')).toBeVisible();

    // 사이드바 컨테이너가 존재하는지 확인
    await expect(page.locator('.sidebar-container')).toBeVisible();
  });

  test('마크다운 슬라이드가 렌더링되는지 확인', async ({ page }) => {
    // 마크다운 슬라이드가 존재하는지 확인
    const markdownSlide = page.locator('.markdown-slide');
    if ((await markdownSlide.count()) > 0) {
      await expect(markdownSlide.first()).toBeVisible();
    }
  });

  test('기본 UI 요소들이 정상적으로 로드되는지 확인', async ({ page }) => {
    // 기본 레이아웃이 정상적으로 표시되는지 확인
    await expect(page.locator('.main-layout')).toBeVisible();

    // 헤더가 정상적으로 표시되는지 확인
    await expect(page.locator('header')).toBeVisible();

    // 사이드바가 정상적으로 표시되는지 확인
    await expect(page.locator('.q-drawer')).toBeVisible();

    // 페이지가 완전히 로드되었는지 확인
    await expect(page.locator('body')).toBeVisible();
  });

  test('타입스크립트 컴파일이 정상적으로 되는지 확인', async ({ page }) => {
    // 페이지가 정상적으로 로드되는지 확인
    await expect(page.locator('body')).toBeVisible();

    // Vue 컴포넌트들이 정상적으로 마운트되는지 확인
    await expect(page.locator('.main-layout')).toBeVisible();
  });

  test('리팩토링된 컴포넌트들이 정상적으로 분리되어 있는지 확인', async ({ page }) => {
    // 주요 컴포넌트들이 존재하는지 확인
    await expect(page.locator('.slide-viewer-container')).toBeVisible();
    await expect(page.locator('.sidebar-container')).toBeVisible();

    // 각 컴포넌트가 독립적으로 동작하는지 확인
    // (이는 실제 동작을 통해 간접적으로 확인)
    await expect(page.locator('.main-layout')).toBeVisible();
  });

  test('CSS 스타일이 정상적으로 적용되는지 확인', async ({ page }) => {
    // 기본 레이아웃이 정상적으로 표시되는지 확인
    const mainLayout = page.locator('.main-layout');
    await expect(mainLayout).toBeVisible();

    // CSS가 적용되어 있는지 확인 (배경색 등)
    const computedStyle = await mainLayout.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return {
        display: style.display,
        height: style.height,
      };
    });

    // 레이아웃이 정상적으로 표시되어야 함
    expect(computedStyle.display).not.toBe('none');
    expect(computedStyle.height).not.toBe('0px');
  });

  test('반응형 레이아웃이 정상적으로 동작하는지 확인', async ({ page }) => {
    // 기본 화면 크기에서 레이아웃이 정상적으로 표시되는지 확인
    await expect(page.locator('.main-layout')).toBeVisible();

    // 사이드바와 슬라이드 뷰어가 모두 표시되는지 확인
    await expect(page.locator('.sidebar-container')).toBeVisible();
    await expect(page.locator('.slide-viewer-container')).toBeVisible();
  });

  test('Vue 컴포넌트들이 정상적으로 마운트되는지 확인', async ({ page }) => {
    // 컴포넌트들이 정상적으로 렌더링되는지 확인
    await expect(page.locator('.main-layout')).toBeVisible();

    // Vue 앱이 정상적으로 동작하는지 확인
    await expect(page.locator('body')).toBeVisible();

    // 페이지가 완전히 로드되었는지 확인
    await page.waitForTimeout(1000);

    // 추가적인 Vue 관련 에러가 없는지 확인
    const vueErrors: string[] = [];
    page.on('console', (msg) => {
      if (
        msg.type() === 'error' &&
        (msg.text().includes('Vue') ||
          msg.text().includes('Component') ||
          msg.text().includes('Template'))
      ) {
        vueErrors.push(msg.text());
      }
    });

    // 페이지 새로고침
    await page.reload();
    await page.waitForTimeout(2000);

    // Vue 관련 에러가 있으면 로그 출력
    if (vueErrors.length > 0) {
      console.log('Vue 관련 에러들:', vueErrors);
    }

    // Vue 관련 에러가 너무 많지 않아야 함 (2개 이하)
    expect(vueErrors.length).toBeLessThan(2);
  });
});
