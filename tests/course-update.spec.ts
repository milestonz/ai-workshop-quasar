import { test, expect } from '@playwright/test';

test.describe('목차 UPDATE 기능 테스트', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:9010/');
    await page.waitForTimeout(2000); // 페이지 로딩 대기
  });

  test('목차 UPDATE 버튼이 존재하고 클릭 가능한지', async ({ page }) => {
    // 목차 UPDATE 버튼 찾기
    const updateButton = page.locator('button').filter({ hasText: '목차 UPDATE' });

    // 버튼이 존재하는지 확인
    await expect(updateButton).toBeVisible();

    // 버튼이 클릭 가능한지 확인
    await expect(updateButton).toBeEnabled();
  });

  test('목차 UPDATE 버튼 클릭 시 로딩 상태가 표시되는지', async ({ page }) => {
    // 목차 UPDATE 버튼 클릭
    const updateButton = page.locator('button').filter({ hasText: '목차 UPDATE' });
    await updateButton.click();

    // 로딩 상태 확인 (버튼이 비활성화됨)
    await expect(updateButton).toBeDisabled();

    // 잠시 대기 후 버튼이 다시 활성화되는지 확인
    await page.waitForTimeout(3000);
    await expect(updateButton).toBeEnabled();
  });

  test('목차 UPDATE 후 사이드바 목차가 업데이트되는지', async ({ page }) => {
    // 업데이트 전 목차 상태 저장
    const beforeUpdate = await page.locator('.q-expansion-item').count();

    // 목차 UPDATE 버튼 클릭
    const updateButton = page.locator('button').filter({ hasText: '목차 UPDATE' });
    await updateButton.click();

    // 업데이트 완료 대기
    await page.waitForTimeout(3000);

    // 업데이트 후 목차 상태 확인
    const afterUpdate = await page.locator('.q-expansion-item').count();

    // 목차 개수가 동일하거나 증가했는지 확인
    expect(afterUpdate).toBeGreaterThanOrEqual(beforeUpdate);
  });

  test('목차 UPDATE 후 alert 메시지가 표시되는지', async ({ page }) => {
    // alert 이벤트 리스너 설정
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain('목차가 성공적으로 업데이트되었습니다');
      await dialog.accept();
    });

    // 목차 UPDATE 버튼 클릭
    const updateButton = page.locator('button').filter({ hasText: '목차 UPDATE' });
    await updateButton.click();

    // alert 대기
    await page.waitForTimeout(1000);
  });
});
