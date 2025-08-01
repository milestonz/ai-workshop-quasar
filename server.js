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
app.use('/css', express.static(path.join(__dirname, 'dist/css')));
app.use('/slides', express.static(path.join(__dirname, 'dist/slides')));


// API 라우트들
app.post('/api/convert-slides', (req, res) => {
  console.log('🔄 HTML 변환 요청 받음');
  const buildCommand = 'npm run build-slides-new';
  exec(buildCommand, { cwd: process.cwd() }, (error, stdout, stderr) => {
    if (error) {
      console.error('❌ HTML 변환 실패:', error);
      return res.status(500).json({ success: false, message: 'HTML 변환 중 오류가 발생했습니다.', error: error.message, stderr: stderr });
    }
    console.log('✅ HTML 변환 완료:', stdout);
    const generatedDir = path.join(process.cwd(), 'public', 'generated', 'slides');
    let convertedFiles = [];
    try {
      if (fs.existsSync(generatedDir)) {
        convertedFiles = fs.readdirSync(generatedDir).filter((file) => file.endsWith('.html')).map((file) => file.replace('.html', ''));
      }
    } catch (err) {
      console.error('파일 목록 읽기 실패:', err);
    }
    res.json({ success: true, message: '모든 슬라이드가 HTML로 변환되었습니다.', convertedFiles: convertedFiles, totalFiles: convertedFiles.length, output: stdout });
  });
});

app.post('/api/build-slides', (req, res) => {
  console.log('🚀 슬라이드 빌드 요청 받음');
  const { inputDir = 'public/slides', outputDir = 'public/generated/slides' } = req.body;
  const buildCommand = `node scripts/build-slides.cjs ${inputDir} ${outputDir}`;
  exec(buildCommand, { cwd: process.cwd() }, (error, stdout, stderr) => {
    if (error) {
      console.error('❌ 슬라이드 빌드 실패:', error);
      return res.status(500).json({ success: false, message: '슬라이드 빌드 중 오류가 발생했습니다.', error: error.message, stderr: stderr });
    }
    console.log('✅ 슬라이드 빌드 완료:', stdout);
    const generatedDir = path.join(process.cwd(), outputDir);
    let builtFiles = [];
    try {
      if (fs.existsSync(generatedDir)) {
        builtFiles = fs.readdirSync(generatedDir).filter((file) => file.endsWith('.html')).map((file) => file.replace('.html', ''));
      }
    } catch (err) {
      console.error('파일 목록 읽기 실패:', err);
    }
    res.json({ success: true, message: '모든 슬라이드가 성공적으로 빌드되었습니다.', builtFiles: builtFiles, totalFiles: builtFiles.length, output: stdout });
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/email/learning-completion', async (req, res) => {
  res.json({ success: false, message: '이메일 서비스가 설정되지 않았습니다. 관리자에게 문의하세요.' });
});

app.post('/api/email/course-share', async (req, res) => {
  res.json({ success: false, message: '이메일 서비스가 설정되지 않았습니다. 관리자에게 문의하세요.' });
});

app.post('/api/email/system-notification', async (req, res) => {
  res.json({ success: false, message: '이메일 서비스가 설정되지 않았습니다. 관리자에게 문의하세요.' });
});

app.get('/api/email/status', (req, res) => {
  res.json({ success: true, configured: false, message: '이메일 서비스가 설정되지 않았습니다. 관리자에게 문의하세요.' });
});

app.post('/api/survey/submit', (req, res) => {
    const surveyData = req.body;
    const surveyFile = path.join(process.cwd(), 'data', 'surveys.json');
    const surveyDir = path.dirname(surveyFile);
    if (!fs.existsSync(surveyDir)) {
      fs.mkdirSync(surveyDir, { recursive: true });
    }
    let surveys = [];
    if (fs.existsSync(surveyFile)) {
      try {
        const existingData = fs.readFileSync(surveyFile, 'utf8');
        surveys = JSON.parse(existingData);
      } catch (error) {
        surveys = [];
      }
    }
    const surveyWithMetadata = { ...surveyData, id: Date.now().toString(), submittedAt: new Date().toISOString() };
    surveys.push(surveyWithMetadata);
    fs.writeFileSync(surveyFile, JSON.stringify(surveys, null, 2));
    res.json({ success: true, message: '설문조사가 성공적으로 제출되었습니다.', data: surveyWithMetadata });
});

app.get('/api/survey/results', (req, res) => {
    const surveyFile = path.join(process.cwd(), 'data', 'surveys.json');
    if (!fs.existsSync(surveyFile)) {
      return res.json({ success: true, data: [], total: 0, message: '아직 제출된 설문이 없습니다.' });
    }
    const surveyData = fs.readFileSync(surveyFile, 'utf8');
    const surveys = JSON.parse(surveyData);
    surveys.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
    res.json({ success: true, data: surveys, total: surveys.length, message: `${surveys.length}개의 설문 결과를 조회했습니다.` });
});

app.get('/api/survey/statistics', (req, res) => {
    const surveyFile = path.join(process.cwd(), 'data', 'surveys.json');
    if (!fs.existsSync(surveyFile)) {
      return res.json({ success: true, statistics: { total: 0, satisfaction: {}, recommendation: {}, additionalEducation: {}, averageFeedbackLength: 0 }, message: '아직 제출된 설문이 없습니다.' });
    }
    const surveyData = fs.readFileSync(surveyFile, 'utf8');
    const surveys = JSON.parse(surveyData);
    const statistics = { total: surveys.length, satisfaction: {}, recommendation: {}, additionalEducation: {}, averageFeedbackLength: 0 };
    let totalFeedbackLength = 0;
    let feedbackCount = 0;
    surveys.forEach((survey) => {
      statistics.satisfaction[survey.satisfaction] = (statistics.satisfaction[survey.satisfaction] || 0) + 1;
      statistics.recommendation[survey.recommendation] = (statistics.recommendation[survey.recommendation] || 0) + 1;
      statistics.additionalEducation[survey.additionalEducation] = (statistics.additionalEducation[survey.additionalEducation] || 0) + 1;
      if (survey.feedback && survey.feedback.trim()) {
        totalFeedbackLength += survey.feedback.length;
        feedbackCount++;
      }
    });
    statistics.averageFeedbackLength = feedbackCount > 0 ? Math.round(totalFeedbackLength / feedbackCount) : 0;
    res.json({ success: true, statistics, message: `${surveys.length}개 설문의 통계를 계산했습니다.` });
});

// Vue.js SPA를 위한 fallback (가장 마지막에 위치해야 함)
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Not Found');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 서버가 포트 ${PORT}에서 실행 중입니다.`);
  console.log(`📁 작업 디렉토리: ${process.cwd()}`);
  const distPath = path.join(__dirname, 'dist');
  if (fs.existsSync(distPath)) {
    console.log(`✅ Vue.js 빌드 파일 발견: ${distPath}`);
  } else {
    console.log(`⚠️ Vue.js 빌드 파일이 없습니다: ${distPath}`);
  }
});