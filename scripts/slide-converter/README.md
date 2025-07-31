# 슬라이드 변환기 (Markdown to HTML Converter)

이 도구는 마크다운 형식의 슬라이드 파일들을 세련된 HTML 프레젠테이션으로 자동 변환합니다.

## 🚀 빠른 시작

### 1. 슬라이드 변환 실행
```bash
# 단일 명령으로 변환
npm run convert-slides

# 또는 빌드와 함께
npm run build-slides
```

### 2. 수동 변환
```bash
# 직접 스크립트 실행
node scripts/slide-converter/convert-slides.js

# 또는 특정 경로 지정
node scripts/slide-converter/markdown-to-html.js public/slides public/generated/slides.html
```

## 📁 파일 구조

```
scripts/slide-converter/
├── markdown-to-html.js    # 메인 변환기 클래스
├── convert-slides.js      # 실행 스크립트
├── config.json           # 변환 설정
└── README.md            # 이 파일
```

## ⚙️ 설정 옵션

`config.json`에서 다음 항목들을 설정할 수 있습니다:

```json
{
  "slidesDirectory": "../public/slides",      // 마크다운 파일 위치
  "outputDirectory": "../public/generated",   // HTML 출력 위치
  "outputFilename": "ai-workshop-slides.html", // 출력 파일명
  "template": {
    "title": "목회자를 위한 AI 활용 시나리오",
    "theme": {
      "primaryColor": "#1e3c72",
      "secondaryColor": "#2a5298"
    }
  }
}
```

## 📝 마크다운 파일 명명 규칙

슬라이드 파일은 다음 형식으로 명명해야 합니다:

```
slide-{장번호}-{슬라이드번호}.md

예시:
slide-0-0.md    # 인트로 슬라이드
slide-1-0.md    # 1장 시작
slide-1-1.md    # 1장 첫 번째 슬라이드
slide-2-0.md    # 2장 시작
...
```

## 🎨 슬라이드 타입 자동 감지

변환기는 내용을 분석해 자동으로 슬라이드 타입을 결정합니다:

### 📋 제목 슬라이드 (intro-slide)
- "목회자를 위한 AI" 포함
- "강사 소개" 포함
- 파란색 그라데이션 배경

### 📖 장 구분 슬라이드 (chapter-slide)
- "Why?", "WHAT?", "How?" 등 포함
- 보라색 그라데이션 배경
- 대형 제목

### 📊 투표 슬라이드 (poll-slide)
- "실시간 투표", "Quick Poll" 포함
- 밝은 파란색 배경
- 질문 박스 스타일

### 📈 통계 슬라이드 (stats-slide)
- "%" 기호 포함
- "통계", "현황" 포함
- 그리드 형태의 통계 박스

### 📄 일반 콘텐츠 슬라이드 (content)
- 기본 슬라이드 타입
- 흰색 배경에 파란색 헤더

## 🎯 지원되는 마크다운 문법

### 제목
```markdown
# 대제목 (H1)
## 중제목 (H2)
### 소제목 (H3)
```

### 강조
```markdown
**굵은 텍스트**
*기울임 텍스트*
```

### 리스트
```markdown
- 순서 없는 리스트
- 두 번째 항목

1. 순서 있는 리스트
2. 두 번째 항목
```

### HTML 직접 삽입
```markdown
<div style="text-align: center;">
  <h1>특별한 레이아웃</h1>
</div>
```

## 🔧 커스터마이징

### 새로운 슬라이드 타입 추가

1. `config.json`에 새 타입 정의:
```json
{
  "slideTypes": {
    "custom": {
      "detectPatterns": ["특별한", "키워드"],
      "className": "custom-slide",
      "background": "linear-gradient(135deg, #ff6b6b, #ee5a52)"
    }
  }
}
```

2. CSS 스타일 추가 (템플릿 수정):
```css
.custom-slide {
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
  color: white;
}
```

### 템플릿 수정

`markdown-to-html.js`의 `getHTMLTemplate()` 메서드에서 HTML 템플릿을 수정할 수 있습니다.

## 🎮 사용자 인터페이스

생성된 HTML 슬라이드는 다음 기능을 제공합니다:

### 네비게이션
- **이전/다음 버튼**: 화면 하단
- **키보드 조작**: 
  - `→` 또는 `Space`: 다음 슬라이드
  - `←`: 이전 슬라이드

### 기타 기능
- **슬라이드 카운터**: 우측 상단에 현재/전체 표시
- **반응형 디자인**: 모바일/태블릿 지원
- **애니메이션**: 부드러운 페이드 효과

## 🐛 문제 해결

### 슬라이드가 제대로 변환되지 않을 때

1. **파일명 확인**: `slide-X-Y.md` 형식인지 확인
2. **마크다운 문법**: 지원되는 문법인지 확인
3. **경로 확인**: `config.json`의 경로가 올바른지 확인

### 스타일이 제대로 적용되지 않을 때

1. **슬라이드 타입**: 자동 감지된 타입이 올바른지 확인
2. **CSS 문법**: 커스텀 스타일에 오류가 없는지 확인

### 에러 메시지 해석

```bash
❌ 슬라이드 파일 로드 실패: ENOENT
→ 슬라이드 디렉토리 경로를 확인하세요

❌ HTML 저장 실패: EACCES  
→ 출력 디렉토리 권한을 확인하세요
```

## 📚 예시

### 기본 슬라이드
```markdown
### 프롬프팅의 기본 원칙

AI와 효과적으로 소통하기 위한 핵심 요소들:

- **명확성**: 구체적이고 명확한 질문
- **맥락**: 충분한 배경 정보 제공
- **단계별**: 복잡한 작업을 단계로 나누기

**핵심 포인트**: AI는 도구일 뿐, 사용자의 의도가 가장 중요합니다.
```

### 통계 슬라이드
```markdown
### 목회자의 AI 사용 현황

#### - AI 사용 경험 목회자 비율 : **47%**
#### - 자료 확보 목적 사용 비율 : **87%**
#### - 설교문 작성 목적 사용 비율 : **29%**
#### - 실제 설교에 AI 활용한 비율 : **20%**
```

## 🚀 고급 기능

### 배치 변환
여러 슬라이드 세트를 한 번에 변환하려면:

```bash
# 스크립트 수정하여 여러 디렉토리 처리
node scripts/slide-converter/batch-convert.js
```

### 자동 빌드
파일 변경 시 자동으로 변환하려면:

```bash
# 파일 감시 및 자동 변환 (추후 구현 예정)
npm run watch-slides
```

---

## 📞 지원

문제가 발생하거나 기능 요청이 있으시면:

1. **이슈 등록**: GitHub Issues 활용
2. **문서 확인**: 이 README와 코드 주석 참조
3. **로그 확인**: 콘솔 출력 메시지 분석

**Happy Sliding! 🎉**
