import express from 'express';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { emailService } from './src/services/emailService';
import dotenv from 'dotenv';

// .env 파일 로드
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// CORS 설정
app.use(cors());
app.use(express.json());

// 정적 파일 서빙
app.use(express.static('public'));
app.use(express.static('dist'));

// Vue.js SPA를 위한 fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
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
    let convertedFiles: string[] = [];

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
    let builtFiles: string[] = [];

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
      message: '모든 슬라이드가 성공적으로 빌드되었습니다.',
      builtFiles: builtFiles,
      totalFiles: builtFiles.length,
      output: stdout,
    });
  });
});

// 서버 상태 확인 API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 이메일 전송 API 엔드포인트들
app.post('/api/email/learning-completion', async (req, res) => {
  try {
    const { recipientEmail, studentName, courseName, completionDate } = req.body;

    console.log('📧 학습 완료 이메일 전송 요청:', { recipientEmail, studentName, courseName });

    // 이메일 서비스가 설정되지 않은 경우
    if (!emailService.isInitialized()) {
      return res.json({
        success: false,
        message: '이메일 서비스가 설정되지 않았습니다. 관리자에게 문의하세요.',
      });
    }

    await emailService.sendLearningCompletionEmail(
      recipientEmail,
      studentName,
      courseName,
      completionDate,
    );

    res.json({
      success: true,
      message: '학습 완료 이메일이 성공적으로 전송되었습니다.',
    });
  } catch (error) {
    console.error('❌ 학습 완료 이메일 전송 실패:', error);
    res.status(500).json({
      success: false,
      message: '이메일 전송에 실패했습니다.',
      error: error instanceof Error ? error.message : '알 수 없는 오류',
    });
  }
});

app.post('/api/email/course-share', async (req, res) => {
  try {
    const { recipientEmail, senderName, courseName, shareUrl } = req.body;

    console.log('📧 강의 공유 이메일 전송 요청:', { recipientEmail, senderName, courseName });

    // 이메일 서비스가 설정되지 않은 경우
    if (!emailService.isInitialized()) {
      return res.json({
        success: false,
        message: '이메일 서비스가 설정되지 않았습니다. 관리자에게 문의하세요.',
      });
    }

    await emailService.sendCourseShareEmail(
      recipientEmail,
      '수강생',
      senderName,
      courseName,
      shareUrl,
    );

    res.json({
      success: true,
      message: '강의 공유 이메일이 성공적으로 전송되었습니다.',
    });
  } catch (error) {
    console.error('❌ 강의 공유 이메일 전송 실패:', error);
    res.status(500).json({
      success: false,
      message: '이메일 전송에 실패했습니다.',
      error: error instanceof Error ? error.message : '알 수 없는 오류',
    });
  }
});

app.post('/api/email/system-notification', async (req, res) => {
  try {
    const { recipientEmail, subject, message } = req.body;

    console.log('📧 시스템 알림 이메일 전송 요청:', { recipientEmail, subject });

    // 이메일 서비스가 설정되지 않은 경우
    if (!emailService.isInitialized()) {
      return res.json({
        success: false,
        message: '이메일 서비스가 설정되지 않았습니다. 관리자에게 문의하세요.',
      });
    }

    await emailService.sendSystemNotificationEmail(recipientEmail, subject, message);

    res.json({
      success: true,
      message: '시스템 알림 이메일이 성공적으로 전송되었습니다.',
    });
  } catch (error) {
    console.error('❌ 시스템 알림 이메일 전송 실패:', error);
    res.status(500).json({
      success: false,
      message: '이메일 전송에 실패했습니다.',
      error: error instanceof Error ? error.message : '알 수 없는 오류',
    });
  }
});

app.get('/api/email/status', (req, res) => {
  res.json({
    success: true,
    configured: emailService.isInitialized(),
    message: emailService.isInitialized()
      ? '이메일 서비스가 설정되어 있습니다.'
      : '이메일 서비스가 설정되지 않았습니다. 관리자에게 문의하세요.',
  });
});

// 설문조사 제출
app.post('/api/survey/submit', (req, res) => {
  try {
    const surveyData = req.body;
    console.log('📊 설문조사 제출:', surveyData);

    // 설문조사 데이터를 파일로 저장
    const surveyFile = path.join(process.cwd(), 'data', 'surveys.json');
    const surveyDir = path.dirname(surveyFile);

    // 디렉토리가 없으면 생성
    if (!fs.existsSync(surveyDir)) {
      fs.mkdirSync(surveyDir, { recursive: true });
    }

    // 기존 설문 데이터 읽기
    let surveys = [];
    if (fs.existsSync(surveyFile)) {
      try {
        const existingData = fs.readFileSync(surveyFile, 'utf8');
        surveys = JSON.parse(existingData);
      } catch (error) {
        console.warn('기존 설문 데이터 읽기 실패, 새로 시작:', error);
        surveys = [];
      }
    }

    // 새 설문 데이터 추가
    const surveyWithMetadata = {
      ...surveyData,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
    };

    surveys.push(surveyWithMetadata);

    // 파일에 저장
    fs.writeFileSync(surveyFile, JSON.stringify(surveys, null, 2));

    res.json({
      success: true,
      message: '설문조사가 성공적으로 제출되었습니다.',
      data: surveyWithMetadata,
    });
  } catch (error: any) {
    console.error('❌ 설문조사 제출 실패:', error);
    res.status(500).json({
      success: false,
      message: '설문조사 제출에 실패했습니다.',
      error: error instanceof Error ? error.message : '알 수 없는 오류',
    });
  }
});

// 설문 결과 조회
app.get('/api/survey/results', (req, res) => {
  try {
    const surveyFile = path.join(process.cwd(), 'data', 'surveys.json');

    if (!fs.existsSync(surveyFile)) {
      return res.json({
        success: true,
        data: [],
        total: 0,
        message: '아직 제출된 설문이 없습니다.',
      });
    }

    const surveyData = fs.readFileSync(surveyFile, 'utf8');
    const surveys = JSON.parse(surveyData);

    // 최신 순으로 정렬
    surveys.sort(
      (a: any, b: any) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
    );

    res.json({
      success: true,
      data: surveys,
      total: surveys.length,
      message: `${surveys.length}개의 설문 결과를 조회했습니다.`,
    });
  } catch (error: any) {
    console.error('❌ 설문 결과 조회 실패:', error);
    res.status(500).json({
      success: false,
      message: '설문 결과 조회에 실패했습니다.',
      error: error instanceof Error ? error.message : '알 수 없는 오류',
    });
  }
});

// 설문 통계 조회
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
    const statistics: {
      total: number;
      satisfaction: { [key: string]: number };
      recommendation: { [key: string]: number };
      additionalEducation: { [key: string]: number };
      averageFeedbackLength: number;
    } = {
      total: surveys.length,
      satisfaction: {},
      recommendation: {},
      additionalEducation: {},
      averageFeedbackLength: 0,
    };

    let totalFeedbackLength = 0;
    let feedbackCount = 0;

    surveys.forEach((survey: any) => {
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
  } catch (error: any) {
    console.error('❌ 설문 통계 조회 실패:', error);
    res.status(500).json({
      success: false,
      message: '설문 통계 조회에 실패했습니다.',
      error: error instanceof Error ? error.message : '알 수 없는 오류',
    });
  }
});

// 이메일 서비스 초기화
const initializeEmailService = () => {
  const emailConfig = {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER || '',
      pass: process.env.EMAIL_PASS || '',
    },
  };

  if (emailConfig.auth.user && emailConfig.auth.pass) {
    emailService.initialize(emailConfig);
    console.log('📧 이메일 서비스 초기화 완료');
  } else {
    console.log('⚠️ 이메일 설정이 없어 이메일 기능이 비활성화됩니다.');
    console.log('📧 이메일 설정 방법: .env 파일에 EMAIL_USER와 EMAIL_PASS를 추가하세요.');
  }
};

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

  // 이메일 서비스 초기화
  initializeEmailService();
});
