<template>
  <q-page class="survey-results-page">
    <div class="container">
      <!-- 헤더 -->
      <div class="page-header">
        <h1 class="text-h3 text-weight-bold text-primary">설문조사 결과</h1>
        <p class="text-h6 text-grey-7">AI Workshop 참여자들의 설문조사 응답 결과입니다.</p>
      </div>

      <!-- 로딩 상태 -->
      <div v-if="loading" class="loading-section">
        <q-spinner-dots size="50px" color="primary" />
        <p class="text-h6 q-mt-md">결과를 불러오는 중...</p>
      </div>

      <!-- 에러 상태 -->
      <div v-else-if="error" class="error-section">
        <q-banner class="bg-red-1 text-red-9">
          <template v-slot:avatar>
            <q-icon name="error" color="red" />
          </template>
          <div class="text-h6">오류가 발생했습니다</div>
          <div class="text-body1">{{ error }}</div>
        </q-banner>
      </div>

      <!-- 결과 표시 -->
      <div v-else-if="surveyResults.length > 0" class="results-section">
        <!-- 통계 요약 -->
        <div class="summary-section q-mb-xl">
          <q-card class="summary-card">
            <q-card-section>
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-4">
                  <div class="stat-item">
                    <div class="stat-number">{{ totalResponses }}</div>
                    <div class="stat-label">총 응답 수</div>
                  </div>
                </div>
                <div class="col-12 col-md-4">
                  <div class="stat-item">
                    <div class="stat-number">{{ averageSatisfaction }}</div>
                    <div class="stat-label">평균 만족도</div>
                  </div>
                </div>
                <div class="col-12 col-md-4">
                  <div class="stat-item">
                    <div class="stat-number">{{ completionRate }}%</div>
                    <div class="stat-label">완료율</div>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- 개별 응답 목록 -->
        <div class="responses-section">
          <h2 class="text-h4 text-weight-bold q-mb-lg">개별 응답</h2>
          <div class="row q-col-gutter-md">
            <div
              v-for="(result, index) in surveyResults"
              :key="index"
              class="col-12 col-md-6 col-lg-4"
            >
              <q-card class="response-card">
                <q-card-section>
                  <div class="response-header">
                    <div class="response-number">#{{ index + 1 }}</div>
                    <div class="response-date">{{ formatDate(new Date()) }}</div>
                  </div>

                  <div class="response-content">
                    <div class="response-item">
                      <strong>만족도:</strong>
                      <q-chip
                        :color="getSatisfactionColor(result.satisfaction)"
                        text-color="white"
                        :label="getSatisfactionLabel(result.satisfaction)"
                      />
                    </div>

                    <div class="response-item">
                      <strong>추천 의향:</strong>
                      <q-chip
                        :color="getRecommendationColor(result.recommendation)"
                        text-color="white"
                        :label="getRecommendationLabel(result.recommendation)"
                      />
                    </div>

                    <div class="response-item">
                      <strong>추가 교육 관심:</strong>
                      <q-chip
                        :color="getEducationColor(result.additionalEducation)"
                        text-color="white"
                        :label="getEducationLabel(result.additionalEducation)"
                      />
                    </div>

                    <div v-if="result.feedback" class="response-item">
                      <strong>피드백:</strong>
                      <p class="response-comments">{{ result.feedback }}</p>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </div>

      <!-- 빈 결과 상태 -->
      <div v-else class="empty-section">
        <q-banner class="bg-blue-1 text-blue-9">
          <template v-slot:avatar>
            <q-icon name="info" color="blue" />
          </template>
          <div class="text-h6">아직 설문조사 결과가 없습니다</div>
          <div class="text-body1">첫 번째 응답을 기다리고 있습니다.</div>
        </q-banner>
      </div>

      <!-- 새로고침 버튼 -->
      <div class="action-section q-mt-xl">
        <q-btn
          color="primary"
          icon="refresh"
          label="새로고침"
          @click="loadSurveyResults"
          :loading="loading"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { surveyApiService } from '../services/api/surveyApiService';
import type { SurveyData } from '../types/survey';

// 상태 관리
const loading = ref(false);
const error = ref<string | null>(null);
const surveyResults = ref<SurveyData[]>([]);

// 계산된 속성
const totalResponses = computed(() => surveyResults.value.length);

const averageSatisfaction = computed(() => {
  if (surveyResults.value.length === 0) return '0';
  const satisfactionMap = {
    very_satisfied: 5,
    satisfied: 4,
    neutral: 3,
    dissatisfied: 2,
    very_dissatisfied: 1,
  };
  const total = surveyResults.value.reduce((sum, result) => {
    return sum + (satisfactionMap[result.satisfaction as keyof typeof satisfactionMap] || 0);
  }, 0);
  return (total / surveyResults.value.length).toFixed(1);
});

const averageRecommendation = computed(() => {
  if (surveyResults.value.length === 0) return '0';
  const recommendationMap = {
    highly_recommend: 5,
    recommend: 4,
    neutral: 3,
    not_recommend: 2,
    highly_not_recommend: 1,
  };
  const total = surveyResults.value.reduce((sum, result) => {
    return sum + (recommendationMap[result.recommendation as keyof typeof recommendationMap] || 0);
  }, 0);
  return (total / surveyResults.value.length).toFixed(1);
});

const completionRate = computed(() => {
  if (surveyResults.value.length === 0) return 0;
  const completed = surveyResults.value.filter(
    (result) => result.satisfaction && result.recommendation,
  ).length;
  return Math.round((completed / surveyResults.value.length) * 100);
});

// 메서드
const loadSurveyResults = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await surveyApiService.getSurveyResults();
    if (response.success && response.data) {
      surveyResults.value = response.data as SurveyData[];
    } else {
      error.value = response.message || '설문조사 결과를 불러오는 중 오류가 발생했습니다.';
    }
  } catch (err) {
    error.value =
      err instanceof Error ? err.message : '설문조사 결과를 불러오는 중 오류가 발생했습니다.';
    console.error('Survey results loading error:', err);
  } finally {
    loading.value = false;
  }
};

const formatDate = (timestamp: string | Date) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const getSatisfactionColor = (satisfaction: string) => {
  const colorMap: Record<string, string> = {
    very_satisfied: 'positive',
    satisfied: 'green',
    neutral: 'orange',
    dissatisfied: 'red',
    very_dissatisfied: 'negative',
  };
  return colorMap[satisfaction] || 'grey';
};

const getSatisfactionLabel = (satisfaction: string) => {
  const labelMap: Record<string, string> = {
    very_satisfied: '매우 만족',
    satisfied: '만족',
    neutral: '보통',
    dissatisfied: '불만족',
    very_dissatisfied: '매우 불만족',
  };
  return labelMap[satisfaction] || '알 수 없음';
};

const getRecommendationColor = (recommendation: string) => {
  const colorMap: Record<string, string> = {
    highly_recommend: 'positive',
    recommend: 'green',
    neutral: 'orange',
    not_recommend: 'red',
    highly_not_recommend: 'negative',
  };
  return colorMap[recommendation] || 'grey';
};

const getRecommendationLabel = (recommendation: string) => {
  const labelMap: Record<string, string> = {
    highly_recommend: '매우 추천',
    recommend: '추천',
    neutral: '보통',
    not_recommend: '추천하지 않음',
    highly_not_recommend: '매우 추천하지 않음',
  };
  return labelMap[recommendation] || '알 수 없음';
};

const getEducationColor = (education: string) => {
  const colorMap: Record<string, string> = {
    very_interested: 'positive',
    interested: 'green',
    neutral: 'orange',
    not_interested: 'red',
    not_at_all_interested: 'negative',
  };
  return colorMap[education] || 'grey';
};

const getEducationLabel = (education: string) => {
  const labelMap: Record<string, string> = {
    very_interested: '매우 관심 있음',
    interested: '관심 있음',
    neutral: '보통',
    not_interested: '관심 없음',
    not_at_all_interested: '전혀 관심 없음',
  };
  return labelMap[education] || '알 수 없음';
};

// 컴포넌트 마운트 시 데이터 로드
onMounted(() => {
  loadSurveyResults();
});
</script>

<style scoped>
.survey-results-page {
  padding: 20px;
  background: #f5f5f5;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.loading-section,
.error-section,
.empty-section {
  text-align: center;
  padding: 60px 20px;
}

.summary-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.stat-item {
  text-align: center;
  padding: 20px;
}

.stat-number {
  font-size: 2.5em;
  font-weight: bold;
  margin-bottom: 10px;
}

.stat-label {
  font-size: 1.1em;
  opacity: 0.9;
}

.response-card {
  height: 100%;
  transition: transform 0.2s ease;
}

.response-card:hover {
  transform: translateY(-2px);
}

.response-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.response-number {
  font-weight: bold;
  color: #667eea;
  font-size: 1.2em;
}

.response-date {
  color: #666;
  font-size: 0.9em;
}

.response-content {
  space-y: 10px;
}

.response-item {
  margin-bottom: 15px;
}

.response-item strong {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

.response-comments {
  margin-top: 5px;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 5px;
  font-style: italic;
  color: #666;
}

.action-section {
  text-align: center;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .survey-results-page {
    padding: 10px;
  }

  .stat-number {
    font-size: 2em;
  }

  .response-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
