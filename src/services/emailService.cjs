const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = null;
    this.isInitializedFlag = false;
  }

  initialize(config) {
    this.transporter = nodemailer.createTransport(config);
    this.isInitializedFlag = true;
    console.log('📧 이메일 서비스가 초기화되었습니다.');
  }

  isInitialized() {
    return this.isInitializedFlag && this.transporter;
  }

  async sendLearningCompletionEmail(recipientEmail, studentName, courseName) {
    if (!this.isInitialized()) {
      throw new Error('이메일 서비스가 초기화되지 않았습니다.');
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject: `🎉 ${courseName} 학습 완료 축하드립니다!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">🎉 학습 완료를 축하드립니다!</h2>
          <p>안녕하세요, <strong>${studentName}</strong>님!</p>
          <p><strong>${courseName}</strong> 과정을 성공적으로 완료하셨습니다.</p>
          <div style="background-color: #ecf0f1; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #27ae60; margin-top: 0;">📚 학습 내용 요약</h3>
            <ul>
              <li>AI 워크샵 기본 개념</li>
              <li>실습 및 프로젝트</li>
              <li>최신 AI 기술 동향</li>
            </ul>
          </div>
          <p>앞으로도 지속적인 학습과 성장을 응원합니다!</p>
          <p style="color: #7f8c8d; font-size: 14px;">
            이 이메일은 자동으로 발송되었습니다.
          </p>
        </div>
      `,
    };

    const result = await this.transporter.sendMail(mailOptions);
    console.log('📧 학습 완료 이메일 전송 성공:', result.messageId);
    return result;
  }

  async sendCourseShareEmail(recipientEmail, recipientName, senderName, courseName, shareUrl) {
    if (!this.isInitialized()) {
      throw new Error('이메일 서비스가 초기화되지 않았습니다.');
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject: `📚 ${courseName} 강의 공유`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">📚 강의 공유</h2>
          <p>안녕하세요, <strong>${recipientName}</strong>님!</p>
          <p><strong>${senderName}</strong>님이 <strong>${courseName}</strong> 강의를 공유해주셨습니다.</p>
          <div style="background-color: #ecf0f1; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #3498db; margin-top: 0;">🔗 강의 링크</h3>
            <p><a href="${shareUrl}" style="color: #3498db; text-decoration: none;">${shareUrl}</a></p>
          </div>
          <p>링크를 클릭하여 강의에 참여하실 수 있습니다.</p>
          <p style="color: #7f8c8d; font-size: 14px;">
            이 이메일은 자동으로 발송되었습니다.
          </p>
        </div>
      `,
    };

    const result = await this.transporter.sendMail(mailOptions);
    console.log('📧 강의 공유 이메일 전송 성공:', result.messageId);
    return result;
  }

  async sendSystemNotificationEmail(recipientEmail, subject, message) {
    if (!this.isInitialized()) {
      throw new Error('이메일 서비스가 초기화되지 않았습니다.');
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject: `🔔 ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">🔔 시스템 알림</h2>
          <div style="background-color: #ecf0f1; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;">${message}</p>
          </div>
          <p style="color: #7f8c8d; font-size: 14px;">
            이 이메일은 자동으로 발송되었습니다.
          </p>
        </div>
      `,
    };

    const result = await this.transporter.sendMail(mailOptions);
    console.log('📧 시스템 알림 이메일 전송 성공:', result.messageId);
    return result;
  }
}

const emailService = new EmailService();

// 환경 변수에서 이메일 설정 로드
const emailConfig = {
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || '',
  },
};

// 이메일 설정이 있으면 초기화
if (emailConfig.auth.user && emailConfig.auth.pass) {
  emailService.initialize(emailConfig);
  console.log('📧 이메일 서비스 초기화 완료');
} else {
  console.log('⚠️ 이메일 설정이 없어 이메일 기능이 비활성화됩니다.');
  console.log('📧 이메일 설정 방법: .env 파일에 EMAIL_USER와 EMAIL_PASS를 추가하세요.');
}

module.exports = emailService;
