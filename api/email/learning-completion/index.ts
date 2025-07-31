import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as nodemailer from 'nodemailer';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('Learning completion email request received.');

    try {
        const { recipientEmail, studentName, courseName } = req.body;

        if (!recipientEmail || !studentName || !courseName) {
            context.res = {
                status: 400,
                body: {
                    success: false,
                    message: '필수 정보가 누락되었습니다.',
                    required: ['recipientEmail', 'studentName', 'courseName']
                }
            };
            return;
        }

        // 이메일 서비스 설정
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.EMAIL_PORT || '587'),
            secure: process.env.EMAIL_SECURE === 'true',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // 이메일 내용
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: recipientEmail,
            subject: `🎉 ${courseName} 학습 완료를 축하합니다!`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2c3e50;">🎉 학습 완료를 축하합니다!</h2>
                    <p>안녕하세요, <strong>${studentName}</strong>님!</p>
                    <p><strong>${courseName}</strong>을 성공적으로 완료하셨습니다.</p>
                    <div style="background-color: #ecf0f1; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #27ae60;">📚 학습 내용 요약</h3>
                        <ul>
                            <li>AI Workshop 강의 완료</li>
                            <li>설문조사 참여 완료</li>
                            <li>학습 진도 100% 달성</li>
                        </ul>
                    </div>
                    <p>앞으로도 지속적인 학습을 통해 더 큰 성장을 이루시기 바랍니다.</p>
                    <p style="color: #7f8c8d; font-size: 14px;">감사합니다.</p>
                </div>
            `
        };

        // 이메일 전송
        await transporter.sendMail(mailOptions);

        context.res = {
            status: 200,
            body: {
                success: true,
                message: '학습 완료 이메일이 성공적으로 전송되었습니다.',
                recipientEmail,
                studentName,
                courseName
            }
        };

    } catch (error) {
        context.log.error('이메일 전송 실패:', error);
        context.res = {
            status: 500,
            body: {
                success: false,
                message: '이메일 전송에 실패했습니다.',
                error: error instanceof Error ? error.message : '알 수 없는 오류'
            }
        };
    }
};

export default httpTrigger; 