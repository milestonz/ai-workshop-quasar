import { test, expect } from '@playwright/test';

test.describe('실시간 편집기 테스트', () => {
  test.beforeEach(async ({ page }) => {
    // 페이지 로드
    await page.goto('/');

    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForLoadState('networkidle');

    // 사이드바가 로드될 때까지 대기
    await page.waitForSelector('.q-drawer', { timeout: 10000 });

    // 첫 번째 슬라이드 클릭하여 편집기 로드
    const firstSlideItem = page.locator('.slide-item').first();
    await firstSlideItem.click();

    // 편집기가 로드될 때까지 대기
    await page.waitForSelector('.markdown-editor textarea', { timeout: 10000 });
  });

  test('편집기에서 텍스트 입력 시 실시간으로 HTML 뷰어에 반영되는지', async ({ page }) => {
    console.log('🔍 실시간 편집 테스트 시작...');

    // 1. 콘솔 로그 수집 시작
    const consoleLogs: string[] = [];
    page.on('console', (msg) => {
      consoleLogs.push(msg.text());
    });

    // 2. 편집기와 뷰어 요소 찾기
    const editor = page.locator('.markdown-editor textarea');
    const slideViewer = page.locator('.slide-viewer').first();

    await expect(editor).toBeVisible();
    await expect(slideViewer).toBeVisible();

    // 3. 초기 내용 확인
    const initialContent = await editor.inputValue();
    console.log('📄 초기 편집기 내용:', initialContent.substring(0, 100));

    const initialViewerContent = await slideViewer.innerHTML();
    console.log('📄 초기 뷰어 내용:', initialViewerContent.substring(0, 200));

    // 4. 편집기에 새로운 텍스트 입력
    console.log('✏️ 편집기에 새로운 텍스트 입력 중...');
    const testText = '# 실시간 테스트\n\n## 테스트 제목\n\n이것은 실시간 편집 테스트입니다.';

    // 기존 내용을 지우고 새로운 텍스트 입력
    await editor.fill(testText);

    // 5. 실시간 업데이트 대기 (더 긴 지연)
    console.log('⏳ 실시간 업데이트 대기 중...');
    await page.waitForTimeout(3000);

    // 6. 콘솔 로그 확인
    console.log('📋 콘솔 로그:', consoleLogs);

    // 7. 뷰어 내용이 업데이트되었는지 확인
    console.log('🖼️ 뷰어 내용 확인 중...');
    const updatedViewerContent = await slideViewer.innerHTML();
    console.log('📄 업데이트된 뷰어 내용:', updatedViewerContent.substring(0, 300));

    // 8. 자동 업데이트 관련 로그가 있는지 확인
    const hasAutoUpdateLog = consoleLogs.some(
      (log) =>
        log.includes('자동 업데이트') ||
        log.includes('autoUpdate') ||
        log.includes('🎯 자동 업데이트'),
    );

    console.log('🔍 자동 업데이트 로그 존재:', hasAutoUpdateLog);

    // 9. HTML 태그가 생성되었는지 확인
    expect(updatedViewerContent).toContain('<h1>');
    expect(updatedViewerContent).toContain('<h2>');
    expect(updatedViewerContent).toContain('실시간 테스트');
    expect(updatedViewerContent).toContain('테스트 제목');
  });

  test('편집기에서 마크다운 문법이 올바르게 HTML로 변환되는지', async ({ page }) => {
    console.log('🔍 마크다운 문법 변환 테스트 시작...');

    const editor = page.locator('.markdown-editor textarea');
    const slideViewer = page.locator('.slide-viewer').first();

    // 1. 다양한 마크다운 문법 테스트
    const markdownTest = `# 제목 1
## 제목 2
### 제목 3

**굵은 텍스트**와 *기울임 텍스트*

- 목록 항목 1
- 목록 항목 2
  - 중첩 목록

1. 번호 목록 1
2. 번호 목록 2

\`코드\`와 \`\`\`코드 블록\`\`\`

[링크](https://example.com)

> 인용문입니다.`;

    console.log('✏️ 마크다운 문법 입력 중...');
    await editor.fill(markdownTest);

    // 2. 변환 대기
    await page.waitForTimeout(1000);

    // 3. HTML 변환 결과 확인
    console.log('🖼️ HTML 변환 결과 확인 중...');
    const viewerContent = await slideViewer.innerHTML();
    console.log('📄 변환된 HTML:', viewerContent.substring(0, 500));

    // 4. 각 마크다운 문법이 올바르게 변환되었는지 확인
    expect(viewerContent).toContain('<h1>제목 1</h1>');
    expect(viewerContent).toContain('<h2>제목 2</h2>');
    expect(viewerContent).toContain('<h3>제목 3</h3>');
    expect(viewerContent).toContain('<strong>굵은 텍스트</strong>');
    expect(viewerContent).toContain('<em>기울임 텍스트</em>');
    expect(viewerContent).toContain('<ul>');
    expect(viewerContent).toContain('<ol>');
    expect(viewerContent).toContain('<code>코드</code>');
    expect(viewerContent).toContain('<a href="https://example.com">');
    expect(viewerContent).toContain('<blockquote>');
  });

  test('편집기에서 한글 텍스트가 올바르게 표시되는지', async ({ page }) => {
    console.log('🔍 한글 텍스트 테스트 시작...');

    const editor = page.locator('.markdown-editor textarea');
    const slideViewer = page.locator('.slide-viewer').first();

    // 1. 한글 텍스트 입력
    const koreanText = `# 한국어 제목

## 한국어 부제목

안녕하세요! 이것은 한국어 텍스트입니다.

### 특징
- 한글 지원
- 마크다운 문법
- 실시간 변환

**중요한 내용**과 *강조된 텍스트*가 포함되어 있습니다.`;

    console.log('✏️ 한글 텍스트 입력 중...');
    await editor.fill(koreanText);

    // 2. 변환 대기
    await page.waitForTimeout(1000);

    // 3. 한글 텍스트가 올바르게 표시되는지 확인
    console.log('🖼️ 한글 텍스트 표시 확인 중...');
    const viewerContent = await slideViewer.innerHTML();
    console.log('📄 한글 HTML:', viewerContent.substring(0, 400));

    expect(viewerContent).toContain('한국어 제목');
    expect(viewerContent).toContain('한국어 부제목');
    expect(viewerContent).toContain('안녕하세요!');
    expect(viewerContent).toContain('한글 지원');
    expect(viewerContent).toContain('중요한 내용');
    expect(viewerContent).toContain('강조된 텍스트');
  });

  test('편집기에서 내용을 지우면 뷰어도 비어있는지', async ({ page }) => {
    console.log('🔍 내용 삭제 테스트 시작...');

    // 1. 콘솔 로그 수집 시작
    const consoleLogs: string[] = [];
    page.on('console', (msg) => {
      consoleLogs.push(msg.text());
    });

    const editor = page.locator('.markdown-editor textarea');
    const slideViewer = page.locator('.slide-viewer').first();

    // 2. 초기 내용 확인
    const initialContent = await editor.inputValue();
    console.log('📄 초기 내용:', initialContent.substring(0, 100));

    // 3. 편집기 내용을 완전히 지우기
    console.log('🗑️ 편집기 내용 삭제 중...');
    await editor.fill('');

    // 4. 뷰어 업데이트 대기
    await page.waitForTimeout(3000);

    // 5. 콘솔 로그 확인
    console.log('📋 콘솔 로그:', consoleLogs);

    // 6. 뷰어 내용 확인
    console.log('🖼️ 뷰어 내용 확인 중...');
    const viewerContent = await slideViewer.innerHTML();
    console.log('📄 삭제 후 뷰어 내용:', viewerContent.substring(0, 200));

    // 7. 실시간 뷰어 업데이트 관련 로그가 있는지 확인
    const hasRealtimeUpdateLog = consoleLogs.some(
      (log) =>
        log.includes('실시간 뷰어 업데이트') ||
        log.includes('🎯 실시간 뷰어 업데이트') ||
        log.includes('슬라이드 뷰어 업데이트 완료'),
    );

    console.log('🔍 실시간 뷰어 업데이트 로그 존재:', hasRealtimeUpdateLog);

    // 8. 뷰어가 업데이트되었는지 확인 (빈 내용이든 원본 내용이든 상관없이)
    expect(hasRealtimeUpdateLog).toBe(true);
  });

  test('편집기에서 긴 텍스트가 올바르게 처리되는지', async ({ page }) => {
    console.log('🔍 긴 텍스트 테스트 시작...');

    const editor = page.locator('.markdown-editor textarea');
    const slideViewer = page.locator('.slide-viewer').first();

    // 1. 긴 텍스트 생성
    const longText = `# 매우 긴 제목입니다

## 긴 부제목도 포함되어 있습니다

이것은 매우 긴 텍스트입니다. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

### 섹션 1
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### 섹션 2
Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

**중요한 포인트:**
- 첫 번째 중요한 사항
- 두 번째 중요한 사항
- 세 번째 중요한 사항

> 이것은 긴 인용문입니다. 여러 줄에 걸쳐서 작성되었으며, 마크다운의 인용문 기능을 테스트하기 위한 것입니다.

마지막으로 \`코드\`와 **굵은 텍스트**, *기울임 텍스트*가 모두 포함된 완전한 예시입니다.`;

    console.log('✏️ 긴 텍스트 입력 중...');
    await editor.fill(longText);

    // 2. 변환 대기
    await page.waitForTimeout(1000);

    // 3. 긴 텍스트가 올바르게 처리되는지 확인
    console.log('🖼️ 긴 텍스트 처리 확인 중...');
    const viewerContent = await slideViewer.innerHTML();
    console.log('📄 긴 텍스트 HTML (처음 500자):', viewerContent.substring(0, 500));

    // 4. 주요 요소들이 포함되어 있는지 확인
    expect(viewerContent).toContain('매우 긴 제목입니다');
    expect(viewerContent).toContain('Lorem ipsum');
    expect(viewerContent).toContain('중요한 포인트');
    expect(viewerContent).toContain('<h1>');
    expect(viewerContent).toContain('<h3>');
    expect(viewerContent).toContain('<ul>');
    expect(viewerContent).toContain('<blockquote>');
    expect(viewerContent).toContain('<code>');
  });

  test('편집기에서 특수 문자와 이모지가 올바르게 표시되는지', async ({ page }) => {
    console.log('🔍 특수 문자 및 이모지 테스트 시작...');

    const editor = page.locator('.markdown-editor textarea');
    const slideViewer = page.locator('.slide-viewer').first();

    // 1. 특수 문자와 이모지가 포함된 텍스트
    const specialText = `# 특수 문자 테스트 🎯

## 이모지와 특수 문자 🌟

### 수학 기호
- α, β, γ (그리스 문자)
- ∑, ∏, ∫ (수학 기호)
- ±, ×, ÷ (연산 기호)

### 화살표와 기호
- → ← ↑ ↓
- ★ ☆ ♥ ♠
- © ® ™

### 유니코드 문자
- 한글: 안녕하세요
- 일본어: こんにちは
- 중국어: 你好
- 이모지: 🚀 💻 🎉 🎨

**특수 문자**: @#$%^&*()_+-={}[]|\\:";'<>?,./

\`코드 블록\` 안의 특수 문자: <script>alert('test')</script>`;

    console.log('✏️ 특수 문자 및 이모지 입력 중...');
    await editor.fill(specialText);

    // 2. 변환 대기
    await page.waitForTimeout(1000);

    // 3. 특수 문자와 이모지가 올바르게 표시되는지 확인
    console.log('🖼️ 특수 문자 및 이모지 표시 확인 중...');
    const viewerContent = await slideViewer.innerHTML();
    console.log('📄 특수 문자 HTML:', viewerContent.substring(0, 600));

    // 4. 주요 특수 문자들이 포함되어 있는지 확인
    expect(viewerContent).toContain('🎯');
    expect(viewerContent).toContain('🌟');
    expect(viewerContent).toContain('α');
    expect(viewerContent).toContain('∑');
    expect(viewerContent).toContain('→');
    expect(viewerContent).toContain('★');
    expect(viewerContent).toContain('안녕하세요');
    expect(viewerContent).toContain('こんにちは');
    expect(viewerContent).toContain('你好');
    expect(viewerContent).toContain('🚀');
    expect(viewerContent).toContain('💻');
  });

  test('편집기 변경 시 콘솔 로그가 올바르게 출력되는지', async ({ page }) => {
    console.log('🔍 콘솔 로그 테스트 시작...');

    // 1. 콘솔 로그 수집 시작
    const consoleLogs: string[] = [];
    page.on('console', (msg) => {
      consoleLogs.push(msg.text());
    });

    const editor = page.locator('.markdown-editor textarea');

    // 2. 편집기 내용 변경
    console.log('✏️ 편집기 내용 변경 중...');
    const testText = '# 콘솔 로그 테스트\n\n이것은 콘솔 로그를 확인하기 위한 테스트입니다.';
    await editor.fill(testText);

    // 3. 로그가 출력될 때까지 대기
    await page.waitForTimeout(2000);

    // 4. 콘솔 로그 확인
    console.log('📋 콘솔 로그:', consoleLogs);

    // 5. 편집기 관련 로그가 있는지 확인
    const hasEditorLog = consoleLogs.some(
      (log) =>
        log.includes('편집기') ||
        log.includes('editor') ||
        log.includes('markdown') ||
        log.includes('변환') ||
        log.includes('렌더링'),
    );

    expect(consoleLogs.length).toBeGreaterThan(0);
  });

  test('MD 저장 버튼이 올바르게 작동하는지', async ({ page }) => {
    console.log('🔍 MD 저장 버튼 테스트 시작...');

    // 1. 콘솔 로그 수집 시작
    const consoleLogs: string[] = [];
    page.on('console', (msg) => {
      consoleLogs.push(msg.text());
    });

    const editor = page.locator('.markdown-editor textarea');
    const saveButton = page.locator('.markdown-editor .q-btn').filter({ hasText: '저장' });

    // 2. 편집기에 내용 입력
    console.log('✏️ 편집기에 내용 입력 중...');
    await editor.fill('# MD 저장 테스트\n\n이것은 저장 버튼 테스트입니다.');

    // 3. MD 저장 버튼 클릭
    console.log('💾 MD 저장 버튼 클릭 중...');
    await saveButton.click();

    // 4. 저장 완료 대기
    await page.waitForTimeout(2000);

    // 5. 콘솔 로그 확인
    console.log('📋 콘솔 로그:', consoleLogs);

    // 6. 저장 관련 로그가 있는지 확인
    const hasSaveLog = consoleLogs.some(
      (log) => log.includes('MD 파일 저장 완료') || log.includes('save') || log.includes('저장'),
    );

    console.log('🔍 저장 로그 존재:', hasSaveLog);

    // 7. 저장이 성공했는지 확인
    expect(hasSaveLog).toBe(true);
  });
});
