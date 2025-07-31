import nodemailer from 'nodemailer';

// 이메일 설정 타입
interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

// 이메일 옵션 타입
interface EmailOptions {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

// 이메일 서비스 클래스
class EmailService {
  private transporter: nodemailer.Transporter | null = null;
  private config: EmailConfig | null = null;
  private initialized: boolean = false;

  // 이메일 설정 초기화
  initialize(config: EmailConfig): void {
    this.config = config;
    this.transporter = nodemailer.createTransport(config);
    this.initialized = true;
    console.log('📧 이메일 서비스 초기화 완료');
  }

  // 초기화 상태 확인
  isInitialized(): boolean {
    return this.initialized && this.transporter !== null;
  }

  // 이메일 전송
  async sendEmail(options: EmailOptions): Promise<boolean> {
    if (!this.transporter) {
      throw new Error('이메일 서비스가 초기화되지 않았습니다.');
    }

    try {
      const info = await this.transporter.sendMail(options);
      console.log('✅ 이메일 전송 성공:', info.messageId);
      return true;
    } catch (error) {
      console.error('❌ 이메일 전송 실패:', error);
      throw error;
    }
  }

  // 학습 완료 알림 이메일
  async sendLearningCompletionEmail(
    studentEmail: string,
    studentName: string,
    courseName: string,
    completionDate: string,
  ): Promise<boolean> {
    const subject = `🎓 ${courseName} 학습 완료 축하드립니다!`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">🎓 학습 완료 축하드립니다!</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">AI Workshop 강의를 성공적으로 완료하셨습니다.</p>
        </div>

        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-top: 0;">안녕하세요, ${studentName}님!</h2>

          <p style="color: #666; line-height: 1.6;">
            <strong>${courseName}</strong> 강의를 성공적으로 완료하셨습니다.
            열심히 학습하신 노력에 진심으로 축하드립니다! 🎉
          </p>

          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
            <h3 style="color: #333; margin-top: 0;">📋 학습 완료 정보</h3>
            <ul style="color: #666; line-height: 1.8;">
              <li><strong>강의명:</strong> ${courseName}</li>
              <li><strong>완료일:</strong> ${completionDate}</li>
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

    return this.sendEmail({
      from: this.config?.auth.user || 'noreply@aiworkshop.com',
      to: studentEmail,
      subject,
      html,
    });
  }

  // 강의 공유 이메일
  async sendCourseShareEmail(
    recipientEmail: string,
    recipientName: string,
    senderName: string,
    courseName: string,
    shareUrl: string,
  ): Promise<boolean> {
    const subject = `📚 ${senderName}님이 ${courseName} 강의를 공유했습니다`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">📚 강의 공유</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">${senderName}님이 강의를 공유했습니다.</p>
        </div>

        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-top: 0;">안녕하세요, ${recipientName}님!</h2>

          <p style="color: #666; line-height: 1.6;">
            <strong>${senderName}</strong>님이 <strong>${courseName}</strong> 강의를 공유했습니다.
            아래 링크를 클릭하여 강의를 수강하실 수 있습니다.
          </p>

          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
            <h3 style="color: #333; margin-top: 0;">📋 강의 정보</h3>
            <ul style="color: #666; line-height: 1.8;">
              <li><strong>강의명:</strong> ${courseName}</li>
              <li><strong>공유자:</strong> ${senderName}</li>
              <li><strong>공유일:</strong> ${new Date().toLocaleDateString('ko-KR')}</li>
            </ul>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${shareUrl}" style="background: #667eea; color: white; padding: 15px 40px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold; font-size: 16px;">
              🎓 강의 수강하기
            </a>
          </div>

          <p style="color: #666; line-height: 1.6; font-size: 14px;">
            <strong>참고사항:</strong><br>
            • 위 링크는 학생 모드로 접속됩니다.<br>
            • 강의는 언제든지 중단하고 나중에 이어서 수강할 수 있습니다.<br>
            • 질문이나 도움이 필요하시면 언제든지 연락해 주세요.
          </p>
        </div>

        <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
          <p>이 이메일은 AI Workshop 학습 관리 시스템에서 발송되었습니다.</p>
        </div>
      </div>
    `;

    return this.sendEmail({
      from: this.config?.auth.user || 'noreply@aiworkshop.com',
      to: recipientEmail,
      subject,
      html,
    });
  }

  // 시스템 알림 이메일
  async sendSystemNotificationEmail(
    recipientEmail: string,
    subject: string,
    message: string,
    notificationType: 'info' | 'warning' | 'error' = 'info',
  ): Promise<boolean> {
    const iconMap = {
      info: 'ℹ️',
      warning: '⚠️',
      error: '❌',
    };

    const colorMap = {
      info: '#667eea',
      warning: '#ff9800',
      error: '#f44336',
    };

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, ${colorMap[notificationType]} 0%, ${colorMap[notificationType]}dd 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">${iconMap[notificationType]} 시스템 알림</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">${subject}</p>
        </div>

        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid ${colorMap[notificationType]};">
            <p style="color: #666; line-height: 1.6; margin: 0;">${message}</p>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <a href="http://localhost:9001" style="background: ${colorMap[notificationType]}; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold;">
              🏠 홈으로 돌아가기
            </a>
          </div>
        </div>

        <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
          <p>이 이메일은 AI Workshop 학습 관리 시스템에서 자동으로 발송되었습니다.</p>
        </div>
      </div>
    `;

    return this.sendEmail({
      from: this.config?.auth.user || 'noreply@aiworkshop.com',
      to: recipientEmail,
      subject: `${iconMap[notificationType]} ${subject}`,
      html,
    });
  }
}

// 싱글톤 인스턴스 생성
export const emailService = new EmailService();
