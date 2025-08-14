// 이메일 API 서비스
class EmailApiService {
  private baseUrl = 'http://localhost:8090/api/email';

  // 학습 완료 알림 이메일 전송
  async sendLearningCompletionEmail(
    studentEmail: string,
    studentName: string,
    courseName: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/learning-completion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentEmail,
          studentName,
          courseName,
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('❌ 학습 완료 이메일 전송 실패:', error);
      return {
        success: false,
        message: '이메일 전송에 실패했습니다.',
      };
    }
  }

  // 강의 공유 이메일 전송
  async sendCourseShareEmail(
    recipientEmail: string,
    recipientName: string,
    senderName: string,
    courseName: string,
    shareUrl: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/course-share`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipientEmail,
          recipientName,
          senderName,
          courseName,
          shareUrl,
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('❌ 강의 공유 이메일 전송 실패:', error);
      return {
        success: false,
        message: '이메일 전송에 실패했습니다.',
      };
    }
  }

  // 시스템 알림 이메일 전송
  async sendSystemNotificationEmail(
    recipientEmail: string,
    subject: string,
    message: string,
    notificationType: 'info' | 'warning' | 'error' = 'info',
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/system-notification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipientEmail,
          subject,
          message,
          notificationType,
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('❌ 시스템 알림 이메일 전송 실패:', error);
      return {
        success: false,
        message: '이메일 전송에 실패했습니다.',
      };
    }
  }

  // 게스트 사용자 정보 등록 요청 이메일 전송
  async sendGuestRegistrationEmail(
    guestInfo: {
      name: string;
      email: string;
      guestId: string;
      createdAt: string;
    },
    adminEmail?: string, // 선택적 관리자 이메일
  ): Promise<{ success: boolean; message: string }> {
    // 환경 변수에서 관리자 이메일 가져오기, 없으면 기본값 사용
    const defaultAdminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'jplee@milestonz.com';
    const targetAdminEmail = adminEmail || defaultAdminEmail;
    try {
      const response = await fetch(`${this.baseUrl}/guest-registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guestInfo,
          adminEmail: targetAdminEmail,
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('❌ 게스트 등록 이메일 전송 실패:', error);
      return {
        success: false,
        message: '게스트 등록 이메일 전송에 실패했습니다.',
      };
    }
  }

  // 이메일 설정 상태 확인
  async getEmailStatus(): Promise<{
    success: boolean;
    configured: boolean;
    config: {
      host: string;
      port: number;
      secure: boolean;
      user: string;
      pass: string;
    };
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/status`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('❌ 이메일 상태 확인 실패:', error);
      return {
        success: false,
        configured: false,
        config: {
          host: '',
          port: 587,
          secure: false,
          user: '',
          pass: '',
        },
      };
    }
  }
}

// 싱글톤 인스턴스 생성
export const emailApiService = new EmailApiService();
