import express from 'express';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .env 파일 로드
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8090;

// 이메일 전송기 설정
const createTransporter = () => {
  const emailService = process.env.EMAIL_SERVICE;
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  const emailFrom = process.env.EMAIL_FROM;

  // 이메일 설정이 완료되지 않은 경우 null 반환
  if (
    !emailService ||
    !emailUser ||
    !emailPass ||
    !emailFrom ||
    emailUser === 'your-email@gmail.com' ||
    emailPass === 'your-app-password'
  ) {
    console.log('⚠️ 이메일 설정이 완료되지 않았습니다. 이메일 전송이 비활성화됩니다.');
    return null;
  }

  return nodemailer.createTransport({
    service: emailService,
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });
};

// 이메일 전송 함수
const sendEmail = async (to, subject, htmlContent) => {
  const transporter = createTransporter();

  if (!transporter) {
    console.log('⚠️ 이메일 전송기 없음 - 이메일 전송 건너뜀');
    return { success: false, message: '이메일 설정이 완료되지 않았습니다.' };
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: to,
      subject: subject,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ 이메일 전송 성공:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ 이메일 전송 실패:', error);
    return { success: false, error: error.message };
  }
};

// CORS 설정
app.use(cors());
app.use(express.json());

// 정적 파일 서빙 (Quasar SPA 빌드 경로에 맞게 수정)
const spaPath = path.join(__dirname, 'dist'); // 'spa' 제거
app.use(express.static(spaPath));
app.use(express.static('public')); // public 폴더도 계속 서빙

// API 라우트들
app.post('/api/convert-slides', (req, res) => {
  console.log('🔄 HTML 변환 요청 받음');
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

app.post('/api/build-slides', (req, res) => {
  console.log('🚀 슬라이드 빌드 요청 받음');
  const { inputDir = 'public/slides', outputDir = 'public/generated/slides' } = req.body;
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
      message: '모든 슬라이드가 성공적으로 빌드되었습니다.',
      builtFiles: builtFiles,
      totalFiles: builtFiles.length,
      output: stdout,
    });
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/email/learning-completion', async (req, res) => {
  try {
    const { studentEmail, studentName, courseName } = req.body;

    console.log('📧 학습 완료 이메일 요청:', { studentEmail, studentName, courseName });

    const emailSubject = `🎓 ${courseName} 학습 완료 축하드립니다!`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">🎓 학습 완료 축하드립니다!</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">${courseName}을 성공적으로 완료하셨습니다.</p>
        </div>

        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-top: 0;">안녕하세요, ${studentName}님!</h2>

          <p style="color: #666; line-height: 1.6;">
            <strong>${courseName}</strong>을 성공적으로 완료하셨습니다.
            열심히 학습하신 노력에 진심으로 축하드립니다! 🎉
          </p>

          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
            <h3 style="color: #333; margin-top: 0;">📋 학습 완료 정보</h3>
            <ul style="color: #666; line-height: 1.8;">
              <li><strong>강의명:</strong> ${courseName}</li>
              <li><strong>완료일:</strong> ${new Date().toLocaleDateString('ko-KR')}</li>
              <li><strong>학습자:</strong> ${studentName}</li>
            </ul>
          </div>

          <p style="color: #666; line-height: 1.6;">
            앞으로도 계속해서 새로운 지식을 습득하고 성장하시기를 바랍니다.
            언제든지 추가 질문이나 도움이 필요하시면 연락해 주세요!
          </p>

          <div style="text-align: center; margin-top: 30px;">
            <a href="http://localhost:9001" style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold;">
              🏠 홈으로 돌아가기
            </a>
          </div>
        </div>

        <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
          <p>이 이메일은 AI Workshop 학습 관리 시스템에서 자동으로 발송되었습니다.</p>
        </div>
      </div>
    `;

    const emailResult = await sendEmail(studentEmail, emailSubject, emailHtml);

    console.log('📧 학습 완료 이메일 전송 결과:', emailResult);

    res.json(emailResult);
  } catch (error) {
    console.error('❌ 학습 완료 이메일 전송 실패:', error);
    res.status(500).json({
      success: false,
      message: '이메일 전송 중 오류가 발생했습니다.',
      error: error.message,
    });
  }
});

app.post('/api/email/course-share', async (req, res) => {
  res.json({
    success: false,
    message: '이메일 서비스가 설정되지 않았습니다. 관리자에게 문의하세요.',
  });
});

app.post('/api/email/system-notification', async (req, res) => {
  res.json({
    success: false,
    message: '이메일 서비스가 설정되지 않았습니다. 관리자에게 문의하세요.',
  });
});

app.post('/api/email/guest-registration', async (req, res) => {
  try {
    const { guestInfo, adminEmail } = req.body;

    console.log('📧 게스트 등록 이메일 요청:', { guestInfo, adminEmail });

    // 게스트 등록 정보를 파일로 저장
    const guestRegistrationsFile = path.join(process.cwd(), 'data', 'guest-registrations.json');
    const guestRegistrationsDir = path.dirname(guestRegistrationsFile);

    if (!fs.existsSync(guestRegistrationsDir)) {
      fs.mkdirSync(guestRegistrationsDir, { recursive: true });
    }

    let guestRegistrations = [];
    if (fs.existsSync(guestRegistrationsFile)) {
      try {
        const existingData = fs.readFileSync(guestRegistrationsFile, 'utf8');
        guestRegistrations = JSON.parse(existingData);
      } catch (error) {
        guestRegistrations = [];
      }
    }

    const registrationData = {
      id: Date.now().toString(),
      adminEmail: adminEmail || 'jplee@milestonz.com',
      guestInfo: {
        name: guestInfo.name,
        email: guestInfo.email,
        guestId: guestInfo.guestId,
        createdAt: guestInfo.createdAt,
        registrationTime: new Date().toISOString(),
      },
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    guestRegistrations.push(registrationData);
    fs.writeFileSync(guestRegistrationsFile, JSON.stringify(guestRegistrations, null, 2));

    // 실제 이메일 전송
    const targetEmail = adminEmail || 'jplee@milestonz.com';
    const emailSubject = '새로운 게스트 사용자 등록 요청';
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1976d2;">🎭 새로운 게스트 사용자 등록</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">게스트 정보</h3>
          <p><strong>이름:</strong> ${guestInfo.name}</p>
          <p><strong>이메일:</strong> ${guestInfo.email}</p>
          <p><strong>게스트 ID:</strong> ${guestInfo.guestId}</p>
          <p><strong>등록 시간:</strong> ${new Date().toLocaleString('ko-KR')}</p>
        </div>
        <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0;"><strong>등록 ID:</strong> ${registrationData.id}</p>
          <p style="margin: 0;"><strong>상태:</strong> 대기 중</p>
        </div>
        <p style="color: #666; font-size: 14px;">
          이 이메일은 AI Workshop 시스템에서 자동으로 발송되었습니다.
        </p>
      </div>
    `;

    const emailResult = await sendEmail(targetEmail, emailSubject, emailHtml);

    // 콘솔에 상세 로그 출력
    console.log('📧 게스트 등록 정보 처리 완료:', {
      to: targetEmail,
      subject: emailSubject,
      guestInfo: registrationData.guestInfo,
      file: guestRegistrationsFile,
      totalRegistrations: guestRegistrations.length,
      emailResult: emailResult,
    });

    res.json({
      success: true,
      message: emailResult.success
        ? '게스트 등록 정보가 관리자에게 이메일로 전송되었습니다.'
        : '게스트 등록 정보가 저장되었습니다. (이메일 전송 실패)',
      guestInfo: guestInfo,
      registrationId: registrationData.id,
      emailSent: emailResult.success,
    });
  } catch (error) {
    console.error('❌ 게스트 등록 이메일 처리 실패:', error);
    res.status(500).json({
      success: false,
      message: '게스트 등록 이메일 처리 중 오류가 발생했습니다.',
    });
  }
});

app.get('/api/email/status', (req, res) => {
  const transporter = createTransporter();
  const isConfigured = transporter !== null;

  res.json({
    success: true,
    configured: isConfigured,
    message: isConfigured
      ? '이메일 서비스가 정상적으로 설정되었습니다.'
      : '이메일 서비스가 설정되지 않았습니다. 관리자에게 문의하세요.',
    config: {
      host: process.env.EMAIL_SERVICE || 'smtp.gmail.com',
      port: 587,
      secure: false,
      user: process.env.EMAIL_USER || '',
      pass: process.env.EMAIL_PASS ? '***' : '',
    },
  });
});

// 게스트 등록 정보 조회 API
app.get('/api/guest-registrations', (req, res) => {
  try {
    const guestRegistrationsFile = path.join(process.cwd(), 'data', 'guest-registrations.json');

    if (!fs.existsSync(guestRegistrationsFile)) {
      return res.json({
        success: true,
        data: [],
        total: 0,
        message: '아직 게스트 등록 정보가 없습니다.',
      });
    }

    const guestRegistrationsData = fs.readFileSync(guestRegistrationsFile, 'utf8');
    const guestRegistrations = JSON.parse(guestRegistrationsData);

    res.json({
      success: true,
      data: guestRegistrations,
      total: guestRegistrations.length,
      message: `${guestRegistrations.length}개의 게스트 등록 정보를 조회했습니다.`,
    });
  } catch (error) {
    console.error('❌ 게스트 등록 정보 조회 실패:', error);
    res.status(500).json({
      success: false,
      message: '게스트 등록 정보 조회 중 오류가 발생했습니다.',
    });
  }
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
  const surveyWithMetadata = {
    ...surveyData,
    id: Date.now().toString(),
    submittedAt: new Date().toISOString(),
  };
  surveys.push(surveyWithMetadata);
  fs.writeFileSync(surveyFile, JSON.stringify(surveys, null, 2));
  res.json({
    success: true,
    message: '설문조사가 성공적으로 제출되었습니다.',
    data: surveyWithMetadata,
  });
});

app.get('/api/survey/results', (req, res) => {
  const surveyFile = path.join(process.cwd(), 'data', 'surveys.json');
  if (!fs.existsSync(surveyFile)) {
    return res.json({ success: true, data: [], total: 0, message: '아직 제출된 설문이 없습니다.' });
  }
  const surveyData = fs.readFileSync(surveyFile, 'utf8');
  const surveys = JSON.parse(surveyData);
  surveys.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
  res.json({
    success: true,
    data: surveys,
    total: surveys.length,
    message: `${surveys.length}개의 설문 결과를 조회했습니다.`,
  });
});

app.get('/api/survey/statistics', (req, res) => {
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
    statistics.satisfaction[survey.satisfaction] =
      (statistics.satisfaction[survey.satisfaction] || 0) + 1;
    statistics.recommendation[survey.recommendation] =
      (statistics.recommendation[survey.recommendation] || 0) + 1;
    statistics.additionalEducation[survey.additionalEducation] =
      (statistics.additionalEducation[survey.additionalEducation] || 0) + 1;
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
});

// Vue.js SPA를 위한 fallback (가장 마지막에 위치해야 함)
app.get('*', (req, res) => {
  const indexPath = path.join(spaPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Not Found: index.html not found in ' + spaPath);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 서버가 포트 ${PORT}에서 실행 중입니다.`);
  console.log(`📁 작업 디렉토리: ${process.cwd()}`);
  const distPath = path.join(__dirname, 'dist'); // 'spa' 제거
  if (fs.existsSync(distPath)) {
    console.log(`✅ Vue.js 빌드 파일 발견: ${distPath}`);
  } else {
    console.log(`⚠️ Vue.js 빌드 파일이 없습니다: ${distPath}`);
  }
});
