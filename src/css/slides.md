/* Reveal.js 표준 CSS 기반 슬라이드 스타일 */

/* 슬라이드 뷰어 컨테이너 */
.slide-viewer {
  position: relative;
  overflow: hidden;
  background: #000000;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin: 1rem;
  min-height: 400px;
  max-height: calc(100vh - 100px);
}

/* 슬라이드 내비게이션 버튼 */
.slide-nav-btn {
  position: fixed !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  z-index: 10000 !important;
  background: transparent !important;
  backdrop-filter: none !important;
  box-shadow: none !important;
  border-radius: 50% !important;
  width: 50px !important;
  height: 50px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  transition: all 0.3s ease !important;
  cursor: pointer !important;
  border: none !important;
}

.slide-nav-btn:hover {
  background: rgba(0, 0, 0, 0.3) !important;
  transform: translateY(-50%) scale(1.05) !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
}

.slide-nav-btn .q-icon {
  font-size: 2rem !important;
  font-weight: bold !important;
  color: #e91e63 !important;
  text-shadow: 0 0 15px rgba(233, 30, 99, 0.7) !important;
  transition: all 0.3s ease !important;
}

.slide-nav-btn:hover .q-icon {
  color: #f06292 !important;
  text-shadow: 0 0 20px rgba(240, 98, 146, 0.9) !important;
}

.slide-nav-btn:disabled {
  opacity: 0.3 !important;
  cursor: not-allowed !important;
}

.slide-nav-btn:disabled .q-icon {
  color: #666 !important;
  text-shadow: none !important;
}

.slide-nav-left {
  left: 5px !important;
}
.slide-nav-right {
  right: 10px !important;
}

/* 전체화면 모드에서 화살표 버튼 고정 위치 */
.slide-viewer-container:fullscreen .slide-nav-left {
  left: 10px !important;
}

.slide-viewer-container:fullscreen .slide-nav-right {
  right: 20px !important;
}

/* 프레젠테이션 모드에서 화살표 버튼 고정 위치 */
.presentation-mode .slide-nav-left {
  left: -60px !important;
}

.presentation-mode .slide-nav-right {
  right: 15px !important;
}

/* 일반 모드에서 사이드바가 있을 때 화살표 버튼 위치 조정 */
.slide-viewer-container:not(.presentation-mode):not(:fullscreen) .slide-nav-left {
  left: 310px !important;
}

.slide-viewer-container:not(.presentation-mode):not(:fullscreen) .slide-nav-right {
  right: 20px !important;
}

/* 슬라이드 컨텐츠 - Reveal.js 표준 */
.slide-content {
  width: 100%;
  height: 100%;
  background: #000000;
  color: #ffffff;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 1.1rem;
  line-height: 2;
  padding: 2rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  overflow-y: auto;
}

/* Reveal.js 표준 마크다운 스타일 */
.markdown-slide {
  width: 100%;
  height: 100%;
  color: #ffffff;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 1.1rem;
  line-height: 2;
  padding: 0;
  margin: 0;
  text-align: left;
}

/* Reveal.js 표준 헤딩 스타일 */
.markdown-slide h1 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #e91e63;
  text-align: center;
  margin: 0 0 2rem 0;
  padding-bottom: 1rem;
  border-bottom: 3px solid #e91e63;
}

.markdown-slide h2 {
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff;
  margin: 1.5rem 0 1rem 0;
}

.markdown-slide h3 {
  font-size: 1.8rem;
  font-weight: bold;
  color: #ffffff;
  margin: 1.5rem 0 1rem 0;
}

.markdown-slide h4 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
  margin: 1.2rem 0 0.8rem 0;
}

.markdown-slide h5 {
  font-size: 1.3rem;
  font-weight: bold;
  color: #ffffff;
  margin: 1rem 0 0.6rem 0;
}

.markdown-slide h6 {
  font-size: 1.1rem;
  font-weight: bold;
  color: #ffffff;
  margin: 0.8rem 0 0.5rem 0;
}

/* Reveal.js 표준 텍스트 스타일 */
.markdown-slide p {
  font-size: 1.1rem;
  line-height: 2;
  margin: 0 0 1rem 0;
  color: #ffffff;
}

.markdown-slide div {
  font-size: 1.1rem;
  line-height: 2;
  margin: 0 0 1rem 0;
  color: #ffffff;
}

/* Reveal.js 표준 리스트 스타일 */
.markdown-slide ul,
.markdown-slide ol {
  font-size: 1.1rem;
  line-height: 2;
  margin: 0 0 1rem 0;
  padding-left: 2rem;
  color: #ffffff;
}

.markdown-slide li {
  margin: 0.5rem 0;
  line-height: 2;
  color: #ffffff;
}

/* Reveal.js 표준 강조 텍스트 */
.markdown-slide strong {
  font-weight: bold;
  color: #e91e63;
}

.markdown-slide em {
  font-style: italic;
  color: #ffffff;
}

/* Reveal.js 표준 테이블 스타일 */
.markdown-slide table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.markdown-slide th {
  background: rgba(233, 30, 99, 0.8);
  color: #ffffff;
  font-weight: bold;
  font-size: 1.1rem;
  padding: 1rem;
  text-align: left;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
}

.markdown-slide td {
  padding: 0.8rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 1rem;
}

.markdown-slide tr:last-child td {
  border-bottom: none;
}

/* Reveal.js 표준 코드 스타일 */
.markdown-slide code {
  background: rgba(255, 255, 255, 0.1);
  color: #e91e63;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
}

.markdown-slide pre {
  background: rgba(0, 0, 0, 0.8);
  color: #ffffff;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1rem 0;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.markdown-slide pre code {
  background: none;
  color: #ffffff;
  padding: 0;
}

/* Reveal.js 표준 인용구 스타일 */
.markdown-slide blockquote {
  border-left: 4px solid #e91e63;
  padding-left: 1rem;
  margin: 1rem 0;
  font-style: italic;
  color: #cccccc;
}

/* Reveal.js 표준 링크 스타일 */
.markdown-slide a {
  color: #e91e63;
  text-decoration: none;
}

.markdown-slide a:hover {
  text-decoration: underline;
}

/* 슬라이드 플레이스홀더 */
.slide-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666666;
  text-align: center;
}

/* 프레젠테이션 모드에서 부드러운 전환 */
.slide-viewer.presentation-mode .slide-content {
  transition: opacity 0.3s ease-in-out;
}

.slide-viewer.presentation-mode .slide-content.presentation-loading {
  opacity: 0.8;
}

/* 프레젠테이션 모드에서 로딩 중 배경 숨김 */
.slide-viewer.presentation-mode .slide-placeholder {
  display: none;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .slide-content {
    padding: 1rem;
    font-size: 1rem;
  }

  .markdown-slide h1 {
    font-size: 2rem;
  }

  .markdown-slide h2 {
    font-size: 1.6rem;
  }

  .markdown-slide h3 {
    font-size: 1.4rem;
  }
}
