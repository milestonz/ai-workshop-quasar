import express from 'express';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .env 파일 로드
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// CORS 설정
app.use(cors());
app.use(express.json());

// 정적 파일 서빙
app.use(express.static('public'));
app.use(express.static('dist'));

app.get('/api/survey/statistics', (req, res) => {
  try {
    const surveyFile = path.join(process.cwd(), 'data', 'surveys.json');

    if (!fs.existsSync(surveyFile)) {
      return res.json({
        success: true,
        statistics: {
          total: 0,
          satisfaction: {},
          recommendation: {},
          additionalEducation: {},
          averageFeedbackLength: 0,
        },
        message: '아직 제출된 설문이 없습니다.',
      });
    }

    const surveyData = fs.readFileSync(surveyFile, 'utf8');
    const surveys = JSON.parse(surveyData);

    // 통계 계산
    const statistics = {
      total: surveys.length,
      satisfaction: {},
      recommendation: {},
      additionalEducation: {},
      averageFeedbackLength: 0,
    };

    let totalFeedbackLength = 0;
    let feedbackCount = 0;

    surveys.forEach((survey) => {
      // 만족도 통계
      statistics.satisfaction[survey.satisfaction] =
        (statistics.satisfaction[survey.satisfaction] || 0) + 1;

      // 추천 의향 통계
      statistics.recommendation[survey.recommendation] =
        (statistics.recommendation[survey.recommendation] || 0) + 1;

      // 추가 교육 의향 통계
      statistics.additionalEducation[survey.additionalEducation] =
        (statistics.additionalEducation[survey.additionalEducation] || 0) + 1;

      // 피드백 길이 계산
      if (survey.feedback && survey.feedback.trim()) {
        totalFeedbackLength += survey.feedback.length;
        feedbackCount++;
      }
    });

    statistics.averageFeedbackLength =
      feedbackCount > 0 ? Math.round(totalFeedbackLength / feedbackCount) : 0;

    res.json({
      success: true,
      statistics,
      message: `${surveys.length}개 설문의 통계를 계산했습니다.`,
    });
  } catch (error) {
    console.error('❌ 설문 통계 조회 실패:', error);
    res.status(500).json({
      success: false,
      message: '설문 통계 조회에 실패했습니다.',
      error: error instanceof Error ? error.message : '알 수 없는 오류',
    });
  }
});

// Vue.js SPA를 위한 fallback
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Not Found');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 HTML 변환 서버가 포트 ${PORT}에서 실행 중입니다.`);
  console.log(`📁 작업 디렉토리: ${process.cwd()}`);
  
  // dist 폴더 확인
  const distPath = path.join(__dirname, 'dist');
  if (fs.existsSync(distPath)) {
    console.log(`✅ Vue.js 빌드 파일 발견: ${distPath}`);
  } else {
    console.log(`⚠️ Vue.js 빌드 파일이 없습니다: ${distPath}`);
    console.log(`📝 정적 파일만 서빙합니다.`);
  }

  console.log('📧 이메일 서비스가 비활성화되어 있습니다.');
});
