<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <!-- 헤더 -->
      <div class="col-12">
        <div class="text-h4 q-mb-md">📊 설문 결과 관리</div>
        <q-separator class="q-mb-lg" />
      </div>

      <!-- 실시간 투표 결과(Realtime DB) -->
      <div class="col-12">
        <q-card>
          <q-card-section class="row items-center justify-between">
            <div class="text-h6">🗳️ 실시간 투표 목록 (Realtime Database)</div>
            <div class="row q-gutter-sm">
              <q-btn flat round dense icon="refresh" :loading="pollLoading" @click="refreshPolls" />
              <q-btn
                unelevated
                color="red"
                icon="close"
                label="닫기"
                size="sm"
                @click="closeAndReturn"
                class="close-button-polls"
              />
            </div>
          </q-card-section>
          <q-card-section>
            <q-table
              :rows="pollRows"
              :columns="pollColumns"
              row-key="pollId"
              flat
              bordered
              :loading="pollLoading"
              :pagination="{ rowsPerPage: 10 }"
            >
              <template #body-cell-pollId="props">
                <q-td :props="props">
                  <q-btn flat color="primary" @click="openPollDialog(props.row.pollId)">
                    {{ props.row.pollId }}
                  </q-btn>
                </q-td>
              </template>
              <template #body-cell-actions="props">
                <q-td :props="props">
                  <q-btn
                    flat
                    round
                    size="sm"
                    icon="insights"
                    color="secondary"
                    @click="openPollDialog(props.row.pollId)"
                  >
                    <q-tooltip>결과 그래프</q-tooltip>
                  </q-btn>
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>

      <!-- 통계 카드 -->
      <div class="col-12">
        <div class="row q-col-gutter-md">
          <div class="col-md-3 col-sm-6">
            <q-card class="bg-primary text-white">
              <q-card-section>
                <div class="text-h6">{{ statistics.total || 0 }}</div>
                <div class="text-subtitle2">총 설문 수</div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-md-3 col-sm-6">
            <q-card class="bg-positive text-white">
              <q-card-section>
                <div class="text-h6">{{ averageSatisfaction }}%</div>
                <div class="text-subtitle2">평균 만족도</div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-md-3 col-sm-6">
            <q-card class="bg-info text-white">
              <q-card-section>
                <div class="text-h6">{{ averageRecommendation }}%</div>
                <div class="text-subtitle2">평균 추천도</div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-md-3 col-sm-6">
            <q-card class="bg-warning text-white">
              <q-card-section>
                <div class="text-h6">{{ statistics.averageFeedbackLength || 0 }}</div>
                <div class="text-subtitle2">평균 피드백 길이</div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>

      <!-- 차트 섹션 -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">📈 설문 통계</div>
          </q-card-section>
          <q-card-section>
            <div class="row q-col-gutter-md">
              <!-- 만족도 차트 -->
              <div class="col-md-4">
                <h6 class="q-mb-md">강의 만족도</h6>
                <div v-for="(count, key) in statistics.satisfaction" :key="key" class="q-mb-sm">
                  <div class="row items-center">
                    <div class="col-6">
                      <span class="text-caption">{{ getSatisfactionLabel(key) }}</span>
                    </div>
                    <div class="col-4">
                      <q-linear-progress
                        :value="count / totalSurveys"
                        color="primary"
                        class="q-mr-sm"
                      />
                    </div>
                    <div class="col-2 text-right">
                      <span class="text-caption">{{ count }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 추천 의향 차트 -->
              <div class="col-md-4">
                <h6 class="q-mb-md">추천 의향</h6>
                <div v-for="(count, key) in statistics.recommendation" :key="key" class="q-mb-sm">
                  <div class="row items-center">
                    <div class="col-6">
                      <span class="text-caption">{{ getRecommendationLabel(key) }}</span>
                    </div>
                    <div class="col-4">
                      <q-linear-progress
                        :value="count / totalSurveys"
                        color="positive"
                        class="q-mr-sm"
                      />
                    </div>
                    <div class="col-2 text-right">
                      <span class="text-caption">{{ count }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 추가 교육 의향 차트 -->
              <div class="col-md-4">
                <h6 class="q-mb-md">추가 교육 의향</h6>
                <div
                  v-for="(count, key) in statistics.additionalEducation"
                  :key="key"
                  class="q-mb-sm"
                >
                  <div class="row items-center">
                    <div class="col-6">
                      <span class="text-caption">{{ getEducationLabel(key) }}</span>
                    </div>
                    <div class="col-4">
                      <q-linear-progress
                        :value="count / totalSurveys"
                        color="info"
                        class="q-mr-sm"
                      />
                    </div>
                    <div class="col-2 text-right">
                      <span class="text-caption">{{ count }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- 설문 결과 목록 -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="row items-center justify-between">
              <div class="text-h6">📋 설문 결과 목록</div>
              <q-btn
                icon="refresh"
                label="새로고침"
                color="primary"
                @click="loadSurveyResults"
                :loading="loading"
              />
            </div>
          </q-card-section>
          <q-card-section>
            <q-table
              :rows="surveyResults"
              :columns="columns"
              row-key="id"
              :loading="loading"
              :pagination="{ rowsPerPage: 10 }"
              flat
              bordered
            >
              <!-- 만족도 컬럼 -->
              <template #body-cell-satisfaction="props">
                <q-td :props="props">
                  <q-chip :color="getSatisfactionColor(props.value)" text-color="white" size="sm">
                    {{ getSatisfactionLabel(props.value) }}
                  </q-chip>
                </q-td>
              </template>

              <!-- 추천 의향 컬럼 -->
              <template #body-cell-recommendation="props">
                <q-td :props="props">
                  <q-chip :color="getRecommendationColor(props.value)" text-color="white" size="sm">
                    {{ getRecommendationLabel(props.value) }}
                  </q-chip>
                </q-td>
              </template>

              <!-- 추가 교육 의향 컬럼 -->
              <template #body-cell-additionalEducation="props">
                <q-td :props="props">
                  <q-chip :color="getEducationColor(props.value)" text-color="white" size="sm">
                    {{ getEducationLabel(props.value) }}
                  </q-chip>
                </q-td>
              </template>

              <!-- 피드백 컬럼 -->
              <template #body-cell-feedback="props">
                <q-td :props="props">
                  <div v-if="props.value" class="text-caption">
                    {{
                      props.value.length > 50 ? props.value.substring(0, 50) + '...' : props.value
                    }}
                  </div>
                  <div v-else class="text-grey-5 text-caption">-</div>
                </q-td>
              </template>

              <!-- 제출일 컬럼 -->
              <template #body-cell-submittedAt="props">
                <q-td :props="props">
                  {{ formatDate(props.value) }}
                </q-td>
              </template>

              <!-- 상세보기 컬럼 -->
              <template #body-cell-actions="props">
                <q-td :props="props">
                  <q-btn
                    flat
                    round
                    size="sm"
                    icon="visibility"
                    color="primary"
                    @click="showSurveyDetail(props.row)"
                  >
                    <q-tooltip>상세보기</q-tooltip>
                  </q-btn>
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- 설문 상세보기 다이얼로그 -->
    <q-dialog v-model="showDetailDialog" maximized>
      <q-card>
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">📋 설문 상세보기</div>
        </q-card-section>
        <q-card-section v-if="selectedSurvey">
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <h6>1. 강의 만족도</h6>
              <q-chip
                :color="getSatisfactionColor(selectedSurvey.satisfaction)"
                text-color="white"
                size="md"
              >
                {{ getSatisfactionLabel(selectedSurvey.satisfaction) }}
              </q-chip>
            </div>
            <div class="col-12">
              <h6>2. 지인 추천 의향</h6>
              <q-chip
                :color="getRecommendationColor(selectedSurvey.recommendation)"
                text-color="white"
                size="md"
              >
                {{ getRecommendationLabel(selectedSurvey.recommendation) }}
              </q-chip>
            </div>
            <div class="col-12">
              <h6>3. 추가 교육 의향</h6>
              <q-chip
                :color="getEducationColor(selectedSurvey.additionalEducation)"
                text-color="white"
                size="md"
              >
                {{ getEducationLabel(selectedSurvey.additionalEducation) }}
              </q-chip>
            </div>
            <div class="col-12">
              <h6>4. 자유 의견</h6>
              <q-card flat bordered class="q-pa-md">
                <div v-if="selectedSurvey.feedback" class="text-body1">
                  {{ selectedSurvey.feedback }}
                </div>
                <div v-else class="text-grey-5">의견이 없습니다.</div>
              </q-card>
            </div>
            <div class="col-12">
              <h6>제출 정보</h6>
              <div class="text-caption text-grey-7">
                제출일: {{ formatDate(selectedSurvey.submittedAt) }}
              </div>
              <div class="text-caption text-grey-7">설문 ID: {{ selectedSurvey.id }}</div>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="닫기" @click="showDetailDialog = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Poll 결과 다이얼로그 -->
    <q-dialog v-model="showPollDialog" maximized>
      <q-card>
        <q-card-section class="row items-center justify-between">
          <div class="text-h6">🗳️ 투표 결과: {{ selectedPollId }}</div>
          <q-btn flat round dense icon="close" @click="showPollDialog = false" />
        </q-card-section>
        <q-separator />
        <q-card-section>
          <PollResultBar v-if="selectedPollId" :poll-id="selectedPollId" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { surveyApiService } from '../services/api/surveyApiService';
import { SATISFACTION_OPTIONS, RECOMMENDATION_OPTIONS, EDUCATION_OPTIONS } from '../types/survey';
import { getDatabase, ref as dbRef, onValue, get as rtdbGet } from 'firebase/database';
import { firebaseApp } from 'src/services/firebase/config';
import PollResultBar from 'src/components/survey/PollResultBar.vue';

const $q = useQuasar();
const router = useRouter();

// 상태
const loading = ref(false);
const surveyResults = ref<any[]>([]);
const statistics = ref<any>({
  total: 0,
  satisfaction: {},
  recommendation: {},
  additionalEducation: {},
  averageFeedbackLength: 0,
});
const showDetailDialog = ref(false);
const selectedSurvey = ref<any>(null);

// Poll 목록 상태
const pollLoading = ref(false);
const pollRows = ref<Array<{ pollId: string; question: string; totalVotes: number }>>([]);
const pollColumns = [
  { name: 'pollId', label: 'Poll ID', field: 'pollId', align: 'left' as const },
  { name: 'question', label: '질문', field: 'question', align: 'left' as const },
  { name: 'totalVotes', label: '응답 수', field: 'totalVotes', align: 'right' as const },
  { name: 'actions', label: '그래프', field: 'actions', align: 'center' as const },
];
const showPollDialog = ref(false);
const selectedPollId = ref('');

const openPollDialog = (pollId: string) => {
  selectedPollId.value = pollId;
  showPollDialog.value = true;
};

const refreshPolls = async () => {
  try {
    pollLoading.value = true;
    const db = firebaseApp ? getDatabase(firebaseApp) : null;
    if (!db) {
      pollRows.value = [];
      return;
    }
    const snap = await rtdbGet(dbRef(db, 'polls'));
    const val = (snap.val() as any) || {};
    const rows: Array<{ pollId: string; question: string; totalVotes: number }> = [];
    Object.keys(val).forEach((pid) => {
      const meta = (val[pid]?.meta || {}) as { question?: string };
      const votesObj = (val[pid]?.votes || {}) as Record<string, unknown>;
      const total: number = Object.keys(votesObj).length;
      rows.push({
        pollId: pid,
        question: (meta.question && String(meta.question)) || pid,
        totalVotes: total,
      });
    });
    // 최신 poll이 위로 오도록 정렬(응답 수 기준)
    rows.sort((a, b) => b.totalVotes - a.totalVotes);
    pollRows.value = rows;
  } catch (e) {
    console.error('poll 목록 로드 실패:', e);
  } finally {
    pollLoading.value = false;
  }
};

// 테이블 컬럼 정의
const columns = [
  {
    name: 'satisfaction',
    label: '만족도',
    field: 'satisfaction',
    align: 'left' as const,
  },
  {
    name: 'recommendation',
    label: '추천 의향',
    field: 'recommendation',
    align: 'left' as const,
  },
  {
    name: 'additionalEducation',
    label: '추가 교육 의향',
    field: 'additionalEducation',
    align: 'left' as const,
  },
  {
    name: 'feedback',
    label: '피드백',
    field: 'feedback',
    align: 'left' as const,
  },
  {
    name: 'submittedAt',
    label: '제출일',
    field: 'submittedAt',
    align: 'left' as const,
  },
  {
    name: 'actions',
    label: '상세보기',
    field: 'actions',
    align: 'center' as const,
  },
];

// 계산된 속성
const totalSurveys = computed(() => statistics.value.total || 1);

const averageSatisfaction = computed(() => {
  const satisfaction = statistics.value.satisfaction;
  if (!satisfaction || Object.keys(satisfaction).length === 0) return 0;

  let total = 0;
  let count = 0;

  Object.entries(satisfaction).forEach(([key, value]) => {
    const score = getSatisfactionScore(key);
    total += score * (value as number);
    count += value as number;
  });

  return count > 0 ? Math.round((total / count) * 20) : 0; // 5점 만점을 100점으로 변환
});

const averageRecommendation = computed(() => {
  const recommendation = statistics.value.recommendation;
  if (!recommendation || Object.keys(recommendation).length === 0) return 0;

  let total = 0;
  let count = 0;

  Object.entries(recommendation).forEach(([key, value]) => {
    const score = getRecommendationScore(key);
    total += score * (value as number);
    count += value as number;
  });

  return count > 0 ? Math.round((total / count) * 20) : 0; // 5점 만점을 100점으로 변환
});

// 메서드
const loadSurveyResults = async () => {
  loading.value = true;

  try {
    // 설문 결과 조회
    const resultsResponse = await surveyApiService.getSurveyResults();
    if (resultsResponse.success && resultsResponse.data) {
      surveyResults.value = resultsResponse.data;
    } else {
      // API 실패 시 더미 데이터 표시
      surveyResults.value = [
        {
          id: 'demo-1',
          satisfaction: 'satisfied',
          recommendation: 'recommend',
          additionalEducation: 'interested',
          feedback: 'AI 활용에 대한 교육이 매우 유용했습니다.',
          submittedAt: new Date().toISOString(),
        },
        {
          id: 'demo-2',
          satisfaction: 'very_satisfied',
          recommendation: 'highly_recommend',
          additionalEducation: 'very_interested',
          feedback: '목회 현장에서 바로 적용할 수 있는 내용이었습니다.',
          submittedAt: new Date(Date.now() - 86400000).toISOString(),
        },
      ];
    }

    // 설문 통계 조회
    const statsResponse = await surveyApiService.getSurveyStatistics();
    if (statsResponse.success && statsResponse.statistics) {
      statistics.value = statsResponse.statistics;
    } else {
      // API 실패 시 더미 통계 표시
      statistics.value = {
        total: 2,
        satisfaction: {
          very_satisfied: 1,
          satisfied: 1,
        },
        recommendation: {
          highly_recommend: 1,
          recommend: 1,
        },
        additionalEducation: {
          very_interested: 1,
          interested: 1,
        },
        averageFeedbackLength: 45,
      };
    }
  } catch (error) {
    console.error('설문 결과 로드 실패:', error);
    // 에러 발생 시에도 더미 데이터 표시
    surveyResults.value = [
      {
        id: 'demo-1',
        satisfaction: 'satisfied',
        recommendation: 'recommend',
        additionalEducation: 'interested',
        feedback: 'AI 활용에 대한 교육이 매우 유용했습니다.',
        submittedAt: new Date().toISOString(),
      },
    ];
    statistics.value = {
      total: 1,
      satisfaction: { satisfied: 1 },
      recommendation: { recommend: 1 },
      additionalEducation: { interested: 1 },
      averageFeedbackLength: 45,
    };

    $q.notify({
      type: 'warning',
      message: 'API 연결에 실패하여 데모 데이터를 표시합니다.',
      position: 'top',
    });
  } finally {
    loading.value = false;
  }
};

const showSurveyDetail = (survey: any) => {
  selectedSurvey.value = survey;
  showDetailDialog.value = true;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// 라벨 변환 함수들
const getSatisfactionLabel = (value: string | number): string => {
  const option = SATISFACTION_OPTIONS.find((opt) => opt.value === String(value));
  return option ? option.label : String(value);
};

const getRecommendationLabel = (value: string | number): string => {
  const option = RECOMMENDATION_OPTIONS.find((opt) => opt.value === String(value));
  return option ? option.label : String(value);
};

const getEducationLabel = (value: string | number): string => {
  const option = EDUCATION_OPTIONS.find((opt) => opt.value === String(value));
  return option ? option.label : String(value);
};

// 색상 변환 함수들
const getSatisfactionColor = (value: string | number): string => {
  const colorMap: { [key: string]: string } = {
    very_satisfied: 'positive',
    satisfied: 'positive',
    neutral: 'warning',
    dissatisfied: 'negative',
    very_dissatisfied: 'negative',
  };
  return colorMap[String(value)] || 'grey';
};

const getRecommendationColor = (value: string | number): string => {
  const colorMap: { [key: string]: string } = {
    highly_recommend: 'positive',
    recommend: 'positive',
    neutral: 'warning',
    not_recommend: 'negative',
    highly_not_recommend: 'negative',
  };
  return colorMap[String(value)] || 'grey';
};

const getEducationColor = (value: string | number): string => {
  const colorMap: { [key: string]: string } = {
    very_interested: 'positive',
    interested: 'positive',
    neutral: 'warning',
    not_interested: 'negative',
    not_at_all_interested: 'negative',
  };
  return colorMap[String(value)] || 'grey';
};

// 점수 변환 함수들
const getSatisfactionScore = (value: string | number): number => {
  const scoreMap: { [key: string]: number } = {
    very_satisfied: 5,
    satisfied: 4,
    neutral: 3,
    dissatisfied: 2,
    very_dissatisfied: 1,
  };
  return scoreMap[String(value)] || 0;
};

const getRecommendationScore = (value: string | number): number => {
  const scoreMap: { [key: string]: number } = {
    highly_recommend: 5,
    recommend: 4,
    neutral: 3,
    not_recommend: 2,
    highly_not_recommend: 1,
  };
  return scoreMap[String(value)] || 0;
};

// 컴포넌트 마운트 시 데이터 로드
onMounted(() => {
  loadSurveyResults();
  refreshPolls();
});

// 닫기 → 이전 페이지로, 없으면 기본 슬라이드로
const closeAndReturn = () => {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push('/');
  }
};
</script>
