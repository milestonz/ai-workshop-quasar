const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const dotenv = require('dotenv');

// .env 파일 로드
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS 설정
app.use(cors());
app.use(express.json());

// 정적 파일 서빙
app.use(express.static('public'));

// 기본 라우트 - 빠른 응답
app.get('/', (req, res) => {
  res.send('AI Workshop Server is running!');
});

// 헬스 체크 엔드포인트
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 간단한 슬라이드 API - 마크다운 파일 직접 반환
app.get('/api/slide/:slideNumber', (req, res) => {
  const { slideNumber } = req.params;
  console.log(`📄 슬라이드 요청: ${slideNumber}`);

  const mdPath = path.join(process.cwd(), 'public', 'slides', `slide-${slideNumber}.md`);

  // 마크다운 파일이 존재하는지 확인
  if (!fs.existsSync(mdPath)) {
    return res.status(404).json({
      success: false,
      message: `슬라이드 파일을 찾을 수 없습니다: slide-${slideNumber}.md`
    });
  }

  try {
    const content = fs.readFileSync(mdPath, 'utf8');
    res.json({
      success: true,
      slideNumber: slideNumber,
      content: content,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error(`❌ 슬라이드 읽기 실패: ${slideNumber}`, error);
    res.status(500).json({
      success: false,
      message: `슬라이드 파일 읽기 실패: ${slideNumber}`,
      error: error.message
    });
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 AI Workshop Server started on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📍 API endpoint: http://localhost:${PORT}/api/slide/:slideNumber`);
});
