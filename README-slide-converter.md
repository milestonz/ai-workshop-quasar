# AI Workshop Quasar 슬라이드 변환기 사용 가이드

## 📋 개요

이 스크립트는 `/public/slides/slide-*-*.md` 패턴의 마크다운 파일들을 읽어서 `/public/generated/slides/slide-*-*.html` 파일로 변환합니다.

## 🚀 실행 방법

### 1. 전체 슬라이드 변환
```bash
node scripts/complete-slide-converter.js
```

### 2. 특정 파일만 변환 (선택사항)
```bash
# 개별 파일 변환을 원하는 경우 스크립트를 수정하여 사용
```

## 📂 파일 구조

```
ai-workshop-quasar/
├── public/
│   ├── slides/
│   │   ├── slide-0-0.md          # 입력 파일들
│   │   ├── slide-0-1.md
│   │   └── ...
│   └── generated/
│       └── slides/
│           ├── slide-0-0.html    # 출력 파일들
│           ├── slide-0-1.html
│           └── ...
└── scripts/
    └── complete-slide-converter.js
```

## 🔧 지원되는 슬라이드 타입

변환기는 마크다운 파일의 첫 줄에 있는 `@타입` 태그를 기반으로 슬라이드 타입을 감지합니다:

- `@cover` - 표지 슬라이드
- `@index` - 목차 슬라이드  
- `@chapter` - 챕터 제목 슬라이드
- `@example` - 예시 슬라이드
- `@challenge` - 챌린지 슬라이드
- `@poll` - 투표/퀴즈 슬라이드
- `@profile` - 프로필 슬라이드
- `@general` - 일반 슬라이드
- `@lecture` - 강의 슬라이드 (기본값)

## 📝 마크다운 변환 규칙

### 기본 변환
- `#` → `<h1>`
- `##` → `<h2>`
- `###` → `<h3>`
- `####` → `<h4>`
- `**텍스트**` → `<strong>텍스트</strong>`
- `*텍스트*` → `<em>텍스트</em>`
- `- 항목` → `<li>항목</li>` (자동으로 `<ul>` 태그로 감싸짐)
- 빈 줄로 구분된 텍스트 → `<p>` 태그로 감싸짐

### 코드 블록
- ` ```코드``` ` → `<pre><code>코드</code></pre>`
- `` `인라인코드` `` → `<code>인라인코드</code>`

## 🎨 생성되는 HTML 구조

각 HTML 파일은 다음과 같은 구조로 생성됩니다:

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>제목 - 슬라이드 번호</title>
    <link rel="stylesheet" href="common-styles.css">
</head>
<body>
    <div class="slide-info">슬라이드 번호</div>
    <div class="slide-container">
        <div class="slide slide-타입">
            <!-- 변환된 마크다운 내용 -->
        </div>
    </div>
    <script>
        <!-- 복사 기능, 선택 기능 등의 JavaScript -->
    </script>
</body>
</html>
```

## ⚡ 특별 기능

### 1. 복사 기능
- Example 슬라이드에서 코드나 텍스트를 클립보드로 복사할 수 있는 📋 아이콘 지원

### 2. 선택 기능  
- Poll 슬라이드에서 선택지를 클릭할 수 있는 인터랙티브 기능

### 3. 자동 제목 추출
- 마크다운 파일에서 첫 번째 헤딩을 자동으로 추출하여 HTML 제목으로 사용

## 🔍 실행 예시

```bash
$ node scripts/complete-slide-converter.js

🚀 AI Workshop Quasar 슬라이드 변환 시작
📂 입력 디렉토리: /Users/.../public/slides
📂 출력 디렉토리: /Users/.../public/generated/slides
📄 발견된 슬라이드 파일: 100개

✅ slide-0-0.md → slide-0-0.html (cover)
✅ slide-0-1.md → slide-0-1.html (index)
✅ slide-1-0.md → slide-1-0.html (chapter)
...

🎉 변환 완료!
✅ 성공: 100개
❌ 실패: 0개
📍 출력 디렉토리: /Users/.../public/generated/slides

📊 변환된 슬라이드 타입별 통계:
   - cover: 1개
   - index: 1개  
   - chapter: 10개
   - general: 70개
   - example: 15개
   - challenge: 3개
```

## 🛠️ 문제 해결

### 1. 입력 디렉토리가 존재하지 않는 경우
```
❌ 변환 중 오류 발생: 입력 디렉토리가 존재하지 않습니다: /path/to/slides
```
**해결**: `public/slides` 디렉토리가 존재하는지 확인하세요.

### 2. 파일을 찾을 수 없는 경우
```
⚠️ slide-*-*.md 패턴의 파일을 찾을 수 없습니다.
```
**해결**: `public/slides` 디렉토리에 `slide-0-0.md`, `slide-1-0.md` 등의 파일이 있는지 확인하세요.

### 3. 개별 파일 변환 실패
```
❌ slide-0-0.md 변환 실패: ENOENT: no such file or directory
```
**해결**: 해당 마크다운 파일이 존재하는지, 파일 권한이 올바른지 확인하세요.

## 🎯 IndexPage.vue 및 SimpleSlidePage.vue와의 호환성

생성된 HTML 파일들은 다음과 같이 사용됩니다:

### IndexPage.vue (편집 모드)
- SimpleSlideViewer 컴포넌트가 `/generated/slides/slide-*-*.html` 파일을 로드
- CSS는 `/css/*-type.css` 파일들을 동적으로 로드하여 스타일 적용

### SimpleSlidePage.vue (프레젠테이션 모드)
- 변환된 HTML 파일들을 순차적으로 표시
- 키보드 네비게이션 지원 (←, →, Space, Home, End)

## 📋 체크리스트

변환 작업을 수행하기 전에 다음 사항들을 확인하세요:

- [ ] `public/slides/` 디렉토리에 `slide-*-*.md` 파일들이 존재
- [ ] Node.js가 설치되어 있음
- [ ] `public/generated/slides/` 디렉토리 쓰기 권한 확인
- [ ] `public/generated/slides/common-styles.css` 파일 존재
- [ ] 각 마크다운 파일의 첫 줄에 올바른 `@타입` 태그 설정

## 🔄 자동화 방법

개발 과정에서 자동으로 변환하려면 다음과 같은 방법을 사용할 수 있습니다:

### package.json에 스크립트 추가
```json
{
  "scripts": {
    "build-slides": "node scripts/complete-slide-converter.js",
    "dev": "npm run build-slides && quasar dev"
  }
}
```

### 실행
```bash
npm run build-slides
```

이제 모든 슬라이드 파일이 성공적으로 변환되어 Vue.js 애플리케이션에서 사용할 수 있습니다! 🎉