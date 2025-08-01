<template>
  <q-dialog v-model="show" persistent maximized>
    <q-card class="survey-dialog">
      <q-card-section class="bg-primary text-white text-center">
        <h4 class="q-my-md">🎓 학습 완료 설문조사</h4>
        <p class="q-mb-none">강의 수강을 완료하셨습니다! 소중한 의견을 들려주세요.</p>
      </q-card-section>

      <q-card-section class="q-pa-lg">
        <div class="survey-container">
          <!-- 진행률 표시 -->
          <div class="progress-section q-mb-lg">
            <q-linear-progress :value="progress" color="primary" class="q-mb-sm" />
            <div class="text-caption text-grey-6">{{ currentStep }}/{{ totalSteps }} 단계</div>
          </div>

          <!-- 설문 내용 -->
          <div class="survey-content">
            <!-- 1단계: 강의 만족도 -->
            <div v-if="currentStep === 1" class="survey-step">
              <h5 class="q-mb-md">1. 전반적인 강의 만족도</h5>
              <p class="text-grey-7 q-mb-lg">이번 강의에 대한 전반적인 만족도를 평가해주세요.</p>

              <q-option-group
                v-model="surveyData.satisfaction"
                :options="satisfactionOptions"
                color="primary"
                inline
              />
            </div>

            <!-- 2단계: 추천 의향 -->
            <div v-if="currentStep === 2" class="survey-step">
              <h5 class="q-mb-md">2. 지인 추천 의향</h5>
              <p class="text-grey-7 q-mb-lg">이 강의를 지인이나 동료에게 추천하시겠습니까?</p>

              <q-option-group
                v-model="surveyData.recommendation"
                :options="recommendationOptions"
                color="primary"
                inline
              />
            </div>

            <!-- 3단계: 추가 교육 의향 -->
            <div v-if="currentStep === 3" class="survey-step">
              <h5 class="q-mb-md">3. 추가 교육 의향</h5>
              <p class="text-grey-7 q-mb-lg">
                AI 관련 추가 교육이 있다면 참여하실 의향이 있으신가요?
              </p>

              <q-option-group
                v-model="surveyData.additionalEducation"
                :options="educationOptions"
                color="primary"
                inline
              />
            </div>

            <!-- 4단계: 주관식 의견 -->
            <div v-if="currentStep === 4" class="survey-step">
              <h5 class="q-mb-md">4. 자유 의견</h5>
              <p class="text-grey-7 q-mb-lg">
                강의에 대한 의견이나 개선사항을 자유롭게 작성해주세요.
              </p>

              <q-input
                v-model="surveyData.feedback"
                type="textarea"
                placeholder="강의에 대한 의견, 개선사항, 또는 추가로 궁금한 점을 자유롭게 작성해주세요..."
                rows="6"
                outlined
                autogrow
              />
            </div>

            <!-- 완료 단계 -->
            <div v-if="currentStep === 5" class="survey-step text-center">
              <div class="q-mb-lg">
                <q-icon name="check_circle" size="80px" color="positive" />
              </div>
              <h5 class="q-mb-md">설문조사 완료!</h5>
              <p class="text-grey-7">
                소중한 의견을 주셔서 감사합니다.<br />
                더 나은 강의를 만들기 위해 노력하겠습니다.
              </p>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right" class="q-pa-lg">
        <!-- 이전 버튼 -->
        <q-btn
          v-if="currentStep > 1 && currentStep < 5"
          flat
          label="이전"
          @click="previousStep"
          class="q-mr-sm"
        />

        <!-- 다음/완료 버튼 -->
        <q-btn
          v-if="currentStep < 5"
          :label="currentStep === 4 ? '완료' : '다음'"
          :color="currentStep === 4 ? 'positive' : 'primary'"
          @click="nextStep"
          :disable="!canProceed"
        />

        <!-- 닫기 버튼 -->
        <q-btn v-if="currentStep === 5" flat label="닫기" @click="closeSurvey" color="primary" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useQuasar } from 'quasar';
import type { SurveyData, SurveyOptions } from '../types/survey';
import { SATISFACTION_OPTIONS, RECOMMENDATION_OPTIONS, EDUCATION_OPTIONS } from '../types/survey';

interface Props {
  modelValue: boolean;
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void;
  (e: 'submit', data: SurveyData): void;
  (e: 'completed'): void; // 설문 완료 이벤트 추가
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const $q = useQuasar();

// 상태 관리
const currentStep = ref(1);
const totalSteps = 5;
const surveyData = ref<SurveyData>({
  satisfaction: '',
  recommendation: '',
  additionalEducation: '',
  feedback: '',
});

// 옵션 데이터
const satisfactionOptions = SATISFACTION_OPTIONS;
const recommendationOptions = RECOMMENDATION_OPTIONS;
const educationOptions = EDUCATION_OPTIONS;

// 계산된 속성
const show = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const progress = computed(() => currentStep.value / totalSteps);

const canProceed = computed(() => {
  switch (currentStep.value) {
    case 1:
      return surveyData.value.satisfaction !== '';
    case 2:
      return surveyData.value.recommendation !== '';
    case 3:
      return surveyData.value.additionalEducation !== '';
    case 4:
      return surveyData.value.feedback.trim() !== '';
    default:
      return true;
  }
});

// 메서드
const nextStep = () => {
  if (currentStep.value < totalSteps) {
    currentStep.value++;
  }

  // 마지막 단계에서 설문 제출
  if (currentStep.value === 5) {
    submitSurvey();
  }
};

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const submitSurvey = () => {
  // 설문 데이터를 부모 컴포넌트로 전달
  emit('submit', { ...surveyData.value });

  // 성공 알림
  $q.notify({
    type: 'positive',
    message: '설문조사가 성공적으로 제출되었습니다!',
    position: 'top',
    timeout: 3000,
  });

  // 설문 완료 이벤트 발생
  emit('completed');
};

const closeSurvey = () => {
  show.value = false;
  resetSurvey();
};

const resetSurvey = () => {
  currentStep.value = 1;
  surveyData.value = {
    satisfaction: '',
    recommendation: '',
    additionalEducation: '',
    feedback: '',
  };
};

// 다이얼로그가 닫힐 때 초기화
watch(show, (newValue) => {
  if (!newValue) {
    resetSurvey();
  }
});
</script>

<style scoped>
.survey-dialog {
  max-width: 600px;
  margin: 0 auto;
}

.survey-container {
  max-width: 500px;
  margin: 0 auto;
}

.survey-step {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.progress-section {
  text-align: center;
}

.q-option-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.q-option-group .q-radio {
  margin-bottom: 8px;
}
</style>
