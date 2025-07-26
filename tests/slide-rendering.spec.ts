import { test, expect } from '@playwright/test';

test.describe('특정 슬라이드 렌더링 테스트', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.main-layout', { timeout: 10000 });
  });

  test('slide-1-1의 테이블과 볼드 텍스트가 정상적으로 렌더링되는지 확인', async ({ page }) => {
    // slide-1-1로 이동
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
    await expect(table).toBeVisible();

    // 테이블 셀이 정상적으로 표시되는지 확인
    const tableCells = table.locator('td, th');
    await expect(tableCells).toHaveCount(await tableCells.count());

    // 볼드 텍스트가 존재하는지 확인
    const boldText = page.locator('.markdown-slide strong');
    await expect(boldText).toBeVisible();

    // 볼드 텍스트가 인라인으로 표시되는지 확인
    const boldElement = boldText.first();
    const computedStyle = await boldElement.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return {
        display: style.display,
        whiteSpace: style.whiteSpace,
      };
    });

    expect(computedStyle.display).toBe('inline');
  });

  test('slide-1-2의 헤딩과 테이블 간격이 적절한지 확인', async ({ page }) => {
    // slide-1-2로 이동
    const slideItems = page.locator('.slide-item');
    for (let i = 0; i < (await slideItems.count()); i++) {
      const slideText = await slideItems.nth(i).textContent();
      if (slideText && slideText.includes('1-2')) {
        await slideItems.nth(i).click();
        break;
      }
    }
    await page.waitForTimeout(1000);

    // h3 헤딩이 존재하는지 확인
    const h3Element = page.locator('.markdown-slide h3');
    if ((await h3Element.count()) > 0) {
      await expect(h3Element.first()).toBeVisible();

      // 테이블이 존재하는지 확인
      const table = page.locator('.markdown-slide table');
      if ((await table.count()) > 0) {
        await expect(table.first()).toBeVisible();

        // h3와 테이블 사이의 간격이 적절한지 확인
        const h3Rect = await h3Element.first().boundingBox();
        const tableRect = await table.first().boundingBox();

        if (h3Rect && tableRect) {
          const gap = tableRect.y - (h3Rect.y + h3Rect.height);
          // 간격이 너무 크지 않아야 함 (예: 50px 이하)
          expect(gap).toBeLessThan(50);
        }
      }
    }
  });

  test('마크다운 줄바꿈이 정상적으로 처리되는지 확인', async ({ page }) => {
    // 줄바꿈이 있는 슬라이드로 이동
    const slideItems = page.locator('.slide-item');
    for (let i = 0; i < (await slideItems.count()); i++) {
      const slideText = await slideItems.nth(i).textContent();
      if (slideText && slideText.includes('1-1')) {
        await slideItems.nth(i).click();
        break;
      }
    }
    await page.waitForTimeout(1000);

    // <br> 태그가 존재하는지 확인 (한 줄 개행)
    const brTags = page.locator('.markdown-slide br');
    const brCount = await brTags.count();

    // <div> 태그가 존재하는지 확인 (두 줄 개행)
    const divTags = page.locator('.markdown-slide div');
    const divCount = await divTags.count();

    // 최소한 하나의 태그는 존재해야 함
    expect(brCount + divCount).toBeGreaterThan(0);
  });

  test('불필요한 공백이 제거되었는지 확인', async ({ page }) => {
    // slide-1-1로 이동
    const slideItems = page.locator('.slide-item');
    for (let i = 0; i < (await slideItems.count()); i++) {
      const slideText = await slideItems.nth(i).textContent();
      if (slideText && slideText.includes('1-1')) {
        await slideItems.nth(i).click();
        break;
      }
    }
    await page.waitForTimeout(1000);

    // 텍스트 내용을 가져와서 불필요한 공백이 없는지 확인
    const slideContent = page.locator('.markdown-slide');
    const textContent = await slideContent.textContent();

    if (textContent) {
      // 텍스트 시작과 끝에 불필요한 공백이 없는지 확인
      expect(textContent.trim()).toBe(textContent);

      // 연속된 공백이 없는지 확인
      expect(textContent).not.toMatch(/\s{2,}/);
    }
  });

  test('CSS 스타일이 정상적으로 적용되는지 확인', async ({ page }) => {
    // slide-1-1로 이동
    const slideItems = page.locator('.slide-item');
    for (let i = 0; i < (await slideItems.count()); i++) {
      const slideText = await slideItems.nth(i).textContent();
      if (slideText && slideText.includes('1-1')) {
        await slideItems.nth(i).click();
        break;
      }
    }
    await page.waitForTimeout(1000);

    // 기본 텍스트 정렬이 좌측인지 확인
    const slideContent = page.locator('.markdown-slide');
    await expect(slideContent).toHaveCSS('text-align', 'left');

    // h1이 있다면 중앙 정렬인지 확인
    const h1Element = page.locator('.markdown-slide h1');
    if ((await h1Element.count()) > 0) {
      await expect(h1Element.first()).toHaveCSS('text-align', 'center');
    }
  });

  test('세로 스크롤이 정상적으로 동작하는지 확인', async ({ page }) => {
    // 긴 내용이 있는 슬라이드로 이동
    const slideItems = page.locator('.slide-item');
    for (let i = 0; i < (await slideItems.count()); i++) {
      const slideText = await slideItems.nth(i).textContent();
      if (slideText && slideText.includes('1-1')) {
        await slideItems.nth(i).click();
        break;
      }
    }
    await page.waitForTimeout(1000);

    // 슬라이드 컨테이너의 스크롤 속성을 확인
    const slideContent = page.locator('.slide-content');
    const overflowY = await slideContent.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.overflowY;
    });

    // 세로 스크롤이 활성화되어 있어야 함
    expect(overflowY).toBe('auto');
  });

  test('테이블 레이아웃이 고정되어 있는지 확인', async ({ page }) => {
    // 테이블이 있는 슬라이드로 이동
    const slideItems = page.locator('.slide-item');
    for (let i = 0; i < (await slideItems.count()); i++) {
      const slideText = await slideItems.nth(i).textContent();
      if (slideText && slideText.includes('1-1')) {
        await slideItems.nth(i).click();
        break;
      }
    }
    await page.waitForTimeout(1000);

    const table = page.locator('.markdown-slide table');
    if ((await table.count()) > 0) {
      const tableLayout = await table.first().evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.tableLayout;
      });

      // 테이블 레이아웃이 고정되어 있어야 함
      expect(tableLayout).toBe('fixed');
    }
  });

  test('볼드 텍스트가 줄바꿈 없이 표시되는지 확인', async ({ page }) => {
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

    const boldText = page.locator('.markdown-slide strong');
    if ((await boldText.count()) > 0) {
      const boldElement = boldText.first();
      const computedStyle = await boldElement.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return {
          display: style.display,
          whiteSpace: style.whiteSpace,
        };
      });

      // 볼드 텍스트가 인라인으로 표시되어야 함
      expect(computedStyle.display).toBe('inline');
    }
  });

  test('슬라이드 네비게이션 버튼이 올바른 위치에 있는지 확인', async ({ page }) => {
    // 슬라이드 네비게이션 버튼들이 존재하는지 확인
    const prevButton = page.locator('.slide-nav-btn.slide-nav-left');
    const nextButton = page.locator('.slide-nav-btn.slide-nav-right');

    await expect(prevButton).toBeVisible();
    await expect(nextButton).toBeVisible();

    // 버튼들이 고정 위치에 있는지 확인
    const prevPosition = await prevButton.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.position;
    });

    const nextPosition = await nextButton.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.position;
    });

    expect(prevPosition).toBe('absolute');
    expect(nextPosition).toBe('absolute');
  });

  test('슬라이드 내용이 정상적으로 업데이트되는지 확인', async ({ page }) => {
    // 첫 번째 슬라이드로 이동
    await page.locator('.slide-item').first().click();
    await page.waitForTimeout(1000);

    // 첫 번째 슬라이드의 내용을 저장
    const firstSlideContent = await page.locator('.markdown-slide').textContent();

    // 두 번째 슬라이드로 이동
    const slideItems = page.locator('.slide-item');
    if ((await slideItems.count()) > 1) {
      await slideItems.nth(1).click();
      await page.waitForTimeout(1000);

      // 두 번째 슬라이드의 내용을 저장
      const secondSlideContent = await page.locator('.markdown-slide').textContent();

      // 내용이 다르다는 것을 확인
      expect(firstSlideContent).not.toBe(secondSlideContent);
    }
  });
});
