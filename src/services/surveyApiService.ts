import type { SurveyData } from '../types/survey';

const API_BASE_URL = 'http://localhost:3001/api';

export const surveyApiService = {
  // 설문조사 제출
  async submitSurvey(
    surveyData: SurveyData,
  ): Promise<{ success: boolean; message: string; data?: any }> {
    try {
      const response = await fetch(`${API_BASE_URL}/survey/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(surveyData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || '설문조사 제출에 실패했습니다.');
      }

      return result;
    } catch (error) {
      console.error('설문조사 API 오류:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : '설문조사 제출에 실패했습니다.',
      };
    }
  },

  // 설문 결과 조회
  async getSurveyResults(): Promise<{
    success: boolean;
    message: string;
    data?: any[];
    total?: number;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/survey/results`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || '설문 결과 조회에 실패했습니다.');
      }

      return result;
    } catch (error) {
      console.error('설문 결과 조회 API 오류:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : '설문 결과 조회에 실패했습니다.',
      };
    }
  },

  // 설문 통계 조회
  async getSurveyStatistics(): Promise<{ success: boolean; message: string; statistics?: any }> {
    try {
      const response = await fetch(`${API_BASE_URL}/survey/statistics`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || '설문 통계 조회에 실패했습니다.');
      }

      return result;
    } catch (error) {
      console.error('설문 통계 조회 API 오류:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : '설문 통계 조회에 실패했습니다.',
      };
    }
  },
};
