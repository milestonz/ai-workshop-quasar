import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as fs from 'fs';
import * as path from 'path';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('Survey submission request received.');

    try {
        const surveyData = req.body;
        context.log('📊 설문조사 제출:', surveyData);
        
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
                context.log.warn('기존 설문 데이터 읽기 실패, 새로 시작:', error);
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
        
        context.res = {
            status: 200,
            body: {
                success: true,
                message: '설문조사가 성공적으로 제출되었습니다.',
                data: surveyWithMetadata,
            }
        };

    } catch (error) {
        context.log.error('❌ 설문조사 제출 실패:', error);
        context.res = {
            status: 500,
            body: {
                success: false,
                message: '설문조사 제출에 실패했습니다.',
                error: error instanceof Error ? error.message : '알 수 없는 오류',
            }
        };
    }
};

export default httpTrigger; 