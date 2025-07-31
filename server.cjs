const express = require('express');
const { exec } = require('child_process');
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

// 동적 슬라이드 변환 API
app.get('/api/slide/:slideNumber', (req, res) => {
  const { slideNumber } = req.params;
  console.log(`🔄 슬라이드 변환 요청: ${slideNumber}`);

  const mdPath = path.join(process.cwd(), 'public', 'slides', `slide-${slideNumber}.md`);
  const htmlPath = path.join(process.cwd(), 'public', 'generated', 'slides', `slide-${slideNumber}.html`);

  // HTML 파일이 이미 존재하는지 확인
  if (fs.existsSync(htmlPath)) {
    console.log(`✅ 기존 HTML 파일 사용: slide-${slideNumber}.html`);
    return res.sendFile(htmlPath);
  }

  // 마크다운 파일이 존재하는지 확인
  if (!fs.existsSync(mdPath)) {
    return res.status(404).json({
      success: false,
      message: `슬라이드 파일을 찾을 수 없습니다: slide-${slideNumber}.md`
    });
  }

  // 필요한 디렉토리 생성
  const generatedDir = path.dirname(htmlPath);
  if (!fs.existsSync(generatedDir)) {
    fs.mkdirSync(generatedDir, { recursive: true });
  }

  // 개별 슬라이드 변환
  const buildCommand = `node scripts/build-slides.cjs public/slides public/generated/slides ${slideNumber}`;

  exec(buildCommand, { cwd: process.cwd() }, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ 슬라이드 변환 실패: ${slideNumber}`, error);
      return res.status(500).json({
        success: false,
        message: `슬라이드 변환 중 오류가 발생했습니다: ${slideNumber}`,
        error: error.message
      });
    }

    console.log(`✅ 슬라이드 변환 완료: ${slideNumber}`);

    // 변환된 HTML 파일 확인
    if (fs.existsSync(htmlPath)) {
      res.sendFile(htmlPath);
    } else {
      res.status(500).json({
        success: false,
        message: `변환된 HTML 파일을 찾을 수 없습니다: slide-${slideNumber}.html`
      });
    }
  });
});

// HTML 변환 API 엔드포인트
app.post('/api/convert-slides', (req, res) => {
  console.log('🔄 HTML 변환 요청 받음');

  // build-slides-new 스크립트 실행
  const buildCommand = 'npm run build-slides-new';

  exec(buildCommand, { cwd: process.cwd() }, (error, stdout, stderr) => {
    if (error) {
      console.error('❌ HTML 변환 실패:', error);
      return res.status(500).json({
        success: false,
        message: 'HTML 변환 중 오류가 발생했습니다.',
        error: error.message,
        stderr: stderr,
      });
    }

    console.log('✅ HTML 변환 완료:', stdout);

    // 변환된 HTML 파일들 확인
    const generatedDir = path.join(process.cwd(), 'public', 'generated', 'slides');
    let convertedFiles = [];

    try {
      if (fs.existsSync(generatedDir)) {
        convertedFiles = fs
          .readdirSync(generatedDir)
          .filter((file) => file.endsWith('.html'))
          .map((file) => file.replace('.html', ''));
      }
    } catch (err) {
      console.error('파일 목록 읽기 실패:', err);
    }

    res.json({
      success: true,
      message: '모든 슬라이드가 HTML로 변환되었습니다.',
      convertedFiles: convertedFiles,
      totalFiles: convertedFiles.length,
      output: stdout,
    });
  });
});

// 슬라이드 빌드 API 엔드포인트
app.post('/api/build-slides', (req, res) => {
  console.log('🚀 슬라이드 빌드 요청 받음');

  const { inputDir = 'public/slides', outputDir = 'public/generated/slides' } = req.body;

  // build-slides.cjs 스크립트 실행
  const buildCommand = `node scripts/build-slides.cjs ${inputDir} ${outputDir}`;

  exec(buildCommand, { cwd: process.cwd() }, (error, stdout, stderr) => {
    if (error) {
      console.error('❌ 슬라이드 빌드 실패:', error);
      return res.status(500).json({
        success: false,
        message: '슬라이드 빌드 중 오류가 발생했습니다.',
        error: error.message,
        stderr: stderr,
      });
    }

    console.log('✅ 슬라이드 빌드 완료:', stdout);

    // 빌드된 HTML 파일들 확인
    const generatedDir = path.join(process.cwd(), outputDir);
    let builtFiles = [];

    try {
      if (fs.existsSync(generatedDir)) {
        builtFiles = fs
          .readdirSync(generatedDir)
          .filter((file) => file.endsWith('.html'))
          .map((file) => file.replace('.html', ''));
      }
    } catch (err) {
      console.error('파일 목록 읽기 실패:', err);
    }

    res.json({
      success: true,
      message: '슬라이드 빌드가 완료되었습니다.',
      builtFiles: builtFiles,
      totalFiles: builtFiles.length,
      output: stdout,
    });
  });
});

// 이메일 전송 API 엔드포인트
app.post('/api/email/learning-completion', async (req, res) => {
  try {
    const { recipientEmail, studentName, courseName } = req.body;

    if (!recipientEmail || !studentName || !courseName) {
      return res.status(400).json({
        success: false,
        message: '필수 정보가 누락되었습니다.',
      });
    }

    console.log('📧 학습 완료 이메일 전송 요청:', { recipientEmail, studentName, courseName });

    // 이메일 서비스 초기화 및 전송
    const emailService = require('./src/services/emailService.cjs');
    await emailService.sendLearningCompletionEmail(recipientEmail, studentName, courseName);

    res.json({
      success: true,
      message: '학습 완료 이메일이 성공적으로 전송되었습니다.',
    });
  } catch (error) {
    console.error('❌ 이메일 전송 실패:', error);
    res.status(500).json({
      success: false,
      message: '이메일 전송에 실패했습니다: ' + error.message,
    });
  }
});

// 설문 제출 API 엔드포인트
app.post('/api/survey/submit', async (req, res) => {
  try {
    const surveyData = req.body;

    if (!surveyData) {
      return res.status(400).json({
        success: false,
        message: '설문 데이터가 누락되었습니다.',
      });
    }

    console.log('📊 설문 제출 요청:', surveyData);

    // 설문 데이터를 JSON 파일에 저장
    const surveysFile = path.join(process.cwd(), 'data', 'surveys.json');
    let surveys = [];

    try {
      if (fs.existsSync(surveysFile)) {
        const fileContent = fs.readFileSync(surveysFile, 'utf8');
        surveys = JSON.parse(fileContent);
      }
    } catch (err) {
      console.log('기존 설문 파일이 없거나 읽을 수 없습니다. 새로 생성합니다.');
    }

    // 새 설문 데이터 추가
    const newSurvey = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...surveyData,
    };

    surveys.push(newSurvey);

    // 파일에 저장
    fs.writeFileSync(surveysFile, JSON.stringify(surveys, null, 2));

    res.json({
      success: true,
      message: '설문이 성공적으로 제출되었습니다.',
      surveyId: newSurvey.id,
    });
  } catch (error) {
    console.error('❌ 설문 제출 실패:', error);
    res.status(500).json({
      success: false,
      message: '설문 제출에 실패했습니다: ' + error.message,
    });
  }
});

// 설문 결과 조회 API 엔드포인트
app.get('/api/survey/results', (req, res) => {
  try {
    const surveysFile = path.join(process.cwd(), 'data', 'surveys.json');
    
    if (!fs.existsSync(surveysFile)) {
      return res.json({
        success: true,
        surveys: [],
        totalCount: 0,
      });
    }

    const fileContent = fs.readFileSync(surveysFile, 'utf8');
    const surveys = JSON.parse(fileContent);

    res.json({
      success: true,
      surveys: surveys,
      totalCount: surveys.length,
    });
  } catch (error) {
    console.error('❌ 설문 결과 조회 실패:', error);
    res.status(500).json({
      success: false,
      message: '설문 결과 조회에 실패했습니다: ' + error.message,
    });
  }
});

// 설문 통계 API 엔드포인트
app.get('/api/survey/statistics', (req, res) => {
  try {
    const surveysFile = path.join(process.cwd(), 'data', 'surveys.json');
    
    if (!fs.existsSync(surveysFile)) {
      return res.json({
        success: true,
        statistics: {
          totalSurveys: 0,
          averageSatisfaction: 0,
          satisfactionDistribution: {},
          recommendationDistribution: {},
          additionalEducationDistribution: {},
        },
      });
    }

    const fileContent = fs.readFileSync(surveysFile, 'utf8');
    const surveys = JSON.parse(fileContent);

    if (surveys.length === 0) {
      return res.json({
        success: true,
        statistics: {
          totalSurveys: 0,
          averageSatisfaction: 0,
          satisfactionDistribution: {},
          recommendationDistribution: {},
          additionalEducationDistribution: {},
        },
      });
    }

    // 통계 계산
    const totalSurveys = surveys.length;
    const satisfactionScores = surveys
      .map(s => parseInt(s.satisfaction))
      .filter(score => !isNaN(score));
    
    const averageSatisfaction = satisfactionScores.length > 0 
      ? (satisfactionScores.reduce((sum, score) => sum + score, 0) / satisfactionScores.length).toFixed(1)
      : 0;

    // 만족도 분포
    const satisfactionDistribution = {};
    satisfactionScores.forEach(score => {
      satisfactionDistribution[score] = (satisfactionDistribution[score] || 0) + 1;
    });

    // 추천 의향 분포
    const recommendationDistribution = {};
    surveys.forEach(survey => {
      const recommendation = survey.recommendation;
      if (recommendation) {
        recommendationDistribution[recommendation] = (recommendationDistribution[recommendation] || 0) + 1;
      }
    });

    // 추가 교육 의향 분포
    const additionalEducationDistribution = {};
    surveys.forEach(survey => {
      const additionalEducation = survey.additionalEducation;
      if (additionalEducation) {
        additionalEducationDistribution[additionalEducation] = (additionalEducationDistribution[additionalEducation] || 0) + 1;
      }
    });

    res.json({
      success: true,
      statistics: {
        totalSurveys,
        averageSatisfaction: parseFloat(averageSatisfaction),
        satisfactionDistribution,
        recommendationDistribution,
        additionalEducationDistribution,
      },
    });
  } catch (error) {
    console.error('❌ 설문 통계 조회 실패:', error);
    res.status(500).json({
      success: false,
      message: '설문 통계 조회에 실패했습니다: ' + error.message,
    });
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 서버가 포트 ${PORT}에서 실행 중입니다.`);
  console.log(`📱 애플리케이션: http://localhost:${PORT}`);
});
