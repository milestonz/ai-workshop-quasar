<template>
  <div class="slide-container">
    <!-- 슬라이드 헤더 -->
    <div class="slide-header">
      <div class="slide-number">{{ slideIndex + 1 }} / {{ lesson.slides }}</div>
      <div class="slide-title">{{ lesson.slideTitles?.[slideIndex] || '세미나 소개' }}</div>
    </div>

    <!-- 슬라이드 콘텐츠 -->
    <div class="slide-content">
      <!-- 메인 제목 -->
      <div class="main-title">
        <h1 class="text-h2 text-primary text-weight-bold">
          목회 현장에서 만나는 12가지 AI 활용 시나리오
        </h1>
        <div class="subtitle text-h5 text-grey-7 q-mt-md">
          "혼자가 아닌 함께하는 스마트 사역 혁신"
        </div>
      </div>

      <!-- 목회자에게 생성형 AI란? -->
      <div class="ai-definition q-mt-xl">
        <q-card class="definition-card">
          <q-card-section>
            <div class="text-h6 text-primary q-mb-md">
              <q-icon name="psychology" class="q-mr-sm" />
              🙋‍♂️ 목회자에게 생성형 AI란?
            </div>
            <div class="definition-text">
              <p class="text-body1 q-mb-md">
                <strong
                  >"생성형 AI는 목회자의 사역을 확장하고, 은혜의 통로를 넓히며, 하나님 나라를
                  실현하는 디지털 동역자이다."</strong
                >
              </p>
              <p class="text-body2 text-grey-7">
                "생성형 AI는 목회자가 말씀을 연구하고, 성도를 돌보고, 공동체를 섬기며, 하나님의
                사명을 실현하는 여정에서 사용하는 실천적 도구로서, 하나님의 은혜에 이르는 새로운
                통로이자 동역자이다."
              </p>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- 웨슬리적 관점 -->
      <div class="wesleyan-perspective q-mt-xl">
        <div class="text-h6 text-primary q-mb-md">
          <q-icon name="church" class="q-mr-sm" />
          🕊 웨슬리적 관점에서 생성형 AI의 의미
        </div>
        <div class="row q-gutter-md">
          <div class="col-12 col-md-6">
            <q-card class="perspective-card">
              <q-card-section>
                <div class="text-subtitle1 text-weight-bold text-primary">은혜의 수단</div>
                <div class="text-caption">
                  AI는 말씀 묵상, 기도, 교육, 설교, 공동체 소통에서 하나님의 은혜를 경험하게 돕는
                  매개체
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-12 col-md-6">
            <q-card class="perspective-card">
              <q-card-section>
                <div class="text-subtitle1 text-weight-bold text-primary">성화의 여정</div>
                <div class="text-caption">
                  반복적이고 일관된 AI 활용은 목회자의 삶과 사역을 정돈하고, 성령의 인도하심에
                  민감하도록 훈련시킴
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-12 col-md-6">
            <q-card class="perspective-card">
              <q-card-section>
                <div class="text-subtitle1 text-weight-bold text-primary">실천신학</div>
                <div class="text-caption">
                  AI는 신학을 이론에 머물게 하지 않고, 콘텐츠화·전달·나눔을 통해 삶 속에서
                  살아내도록 돕는 실천 도구
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-12 col-md-6">
            <q-card class="perspective-card">
              <q-card-section>
                <div class="text-subtitle1 text-weight-bold text-primary">사회적 성결</div>
                <div class="text-caption">
                  AI는 목회자의 시간을 절약해 이웃 돌봄, 공적 책임, 사회 참여에 더 집중하도록 해주는
                  해방의 기술
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>

      <!-- 웨슬리안 신학 4대 토대 -->
      <div class="wesleyan-foundations q-mt-xl">
        <div class="text-h6 text-primary q-mb-md">
          <q-icon name="foundation" class="q-mr-sm" />
          🔧 웨슬리안 신학 4대 토대와 AI의 연결
        </div>
        <div class="foundations-table">
          <q-table
            :rows="foundationsData"
            :columns="foundationsColumns"
            row-key="tradition"
            flat
            bordered
            class="foundations-table"
          />
        </div>
      </div>

      <!-- 세미나 개요 -->
      <div class="seminar-overview q-mt-xl">
        <div class="text-h6 text-primary q-mb-md">
          <q-icon name="schedule" class="q-mr-sm" />
          세미나 개요
        </div>
        <div class="row q-gutter-md">
          <div class="col-12 col-md-6">
            <q-card class="overview-card">
              <q-card-section>
                <div class="text-subtitle1 text-weight-bold text-primary">⏰ 일정</div>
                <ul class="text-body2">
                  <li>전반부: 09:30-11:50 (Feel → Reflect → Think)</li>
                  <li>후반부: 13:30-15:50 (Feel → Reflect → Think → Act)</li>
                </ul>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-12 col-md-6">
            <q-card class="overview-card">
              <q-card-section>
                <div class="text-subtitle1 text-weight-bold text-primary">🎯 오늘의 여정</div>
                <div class="text-body2">
                  <div class="q-mb-sm">4시간 30분 × 5단계 Challenge</div>
                  <ul>
                    <li>슬로건 만들기</li>
                    <li>첫 질문 만들기</li>
                    <li>설교 프롬프트 설계</li>
                    <li>AI 조합 콘텐츠 제작</li>
                    <li>로드맵 설계 대결</li>
                  </ul>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Lesson } from '../../stores/course';

interface Props {
  lesson: Lesson;
  slideIndex: number;
}

defineProps<Props>();

// 웨슬리안 신학 4대 토대 데이터
const foundationsColumns = [
  {
    name: 'tradition',
    label: '웨슬리안 전통',
    field: 'tradition',
    align: 'left' as const,
    classes: 'text-weight-bold text-primary',
  },
  {
    name: 'definition',
    label: '정의',
    field: 'definition',
    align: 'left' as const,
  },
  {
    name: 'aiConnection',
    label: '생성형 AI와의 연결',
    field: 'aiConnection',
    align: 'left' as const,
  },
];

const foundationsData = [
  {
    tradition: '성경(Scripture)',
    definition: '신앙과 삶의 최종 기준',
    aiConnection: '본문 연구, 묵상, 설교 준비 지원',
  },
  {
    tradition: '전통(Tradition)',
    definition: '교회의 역사와 유산',
    aiConnection: '신학 해석, 설교 전통, 주석 탐색 및 정리',
  },
  {
    tradition: '이성(Reason)',
    definition: '믿음의 합리적 탐구',
    aiConnection: '논리적, 구조적 설교/교육 설계에 활용',
  },
  {
    tradition: '경험(Experience)',
    definition: '성령 안에서의 삶의 체험',
    aiConnection: '성도의 경험 해석 및 적용을 돕는 창의 도구',
  },
];
</script>

<style scoped>
.slide-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  overflow-y: auto;
}

.slide-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e0e0e0;
  flex-shrink: 0;
}

.slide-number {
  font-size: 1.2rem;
  font-weight: bold;
  color: #666;
}

.slide-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.slide-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.main-title {
  text-align: center;
  margin-bottom: 2rem;
  flex-shrink: 0;
}

.definition-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.definition-text {
  line-height: 1.6;
}

.perspective-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 100%;
  transition: transform 0.3s ease;
}

.perspective-card:hover {
  transform: translateY(-2px);
}

.foundations-table {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.overview-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 100%;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

ul li {
  padding: 0.3rem 0;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
  padding-left: 1rem;
}

ul li:last-child {
  border-bottom: none;
}

ul li:before {
  content: '▶';
  color: #1976d2;
  position: absolute;
  left: 0;
}

.text-caption {
  line-height: 1.4;
}
</style>
