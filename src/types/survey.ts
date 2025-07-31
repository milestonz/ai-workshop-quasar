export interface SurveyData {
  satisfaction: string;
  recommendation: string;
  additionalEducation: string;
  feedback: string;
}

export interface SurveySubmission extends SurveyData {
  submittedAt: string;
  courseId: string;
  userId?: string;
  userEmail?: string;
}

export interface SurveyOptions {
  label: string;
  value: string;
}

export const SATISFACTION_OPTIONS: SurveyOptions[] = [
  { label: '매우 만족', value: 'very_satisfied' },
  { label: '만족', value: 'satisfied' },
  { label: '보통', value: 'neutral' },
  { label: '불만족', value: 'dissatisfied' },
  { label: '매우 불만족', value: 'very_dissatisfied' },
];

export const RECOMMENDATION_OPTIONS: SurveyOptions[] = [
  { label: '매우 추천', value: 'highly_recommend' },
  { label: '추천', value: 'recommend' },
  { label: '보통', value: 'neutral' },
  { label: '추천하지 않음', value: 'not_recommend' },
  { label: '매우 추천하지 않음', value: 'highly_not_recommend' },
];

export const EDUCATION_OPTIONS: SurveyOptions[] = [
  { label: '매우 관심 있음', value: 'very_interested' },
  { label: '관심 있음', value: 'interested' },
  { label: '보통', value: 'neutral' },
  { label: '관심 없음', value: 'not_interested' },
  { label: '전혀 관심 없음', value: 'not_at_all_interested' },
];
