<template>
  <div class="slide-container">
    <!-- 슬라이드 헤더 -->
    <div class="slide-header">
      <div class="slide-number">{{ slideIndex + 1 }} / {{ lesson.slides }}</div>
      <div class="slide-title">{{ lesson.slideTitles?.[slideIndex] || '오늘의 여정' }}</div>
    </div>

    <!-- 슬라이드 콘텐츠 -->
    <div class="slide-content">
      <!-- 메인 제목 -->
      <div class="main-title">
        <h1 class="text-h2 text-primary text-weight-bold">오늘의 여정</h1>
        <div class="subtitle text-h5 text-grey-7 q-mt-md">
          4MAT 학습 사이클을 통한 체계적인 AI 학습
        </div>
      </div>

      <!-- 타임라인 섹션 -->
      <div class="timeline-section q-mt-xl">
        <div class="timeline">
          <!-- 오전 세션 -->
          <div class="timeline-item">
            <div class="timeline-marker morning">
              <q-icon name="wb_sunny" size="24px" />
            </div>
            <div class="timeline-content">
              <div class="timeline-title">오전 세션 (09:00 - 12:00)</div>
              <div class="timeline-subtitle">1사분면: 느끼기 (Feel)</div>
              <div class="timeline-description">
                <ul>
                  <li>AI 목회자 역할놀이</li>
                  <li>충격적 데모 시연</li>
                  <li>Challenge #1: AI 목회 슬로건 만들기</li>
                  <li>온라인 POLL #1</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 점심 시간 -->
          <div class="timeline-item">
            <div class="timeline-marker lunch">
              <q-icon name="restaurant" size="24px" />
            </div>
            <div class="timeline-content">
              <div class="timeline-title">점심 시간 (12:00 - 13:30)</div>
              <div class="timeline-subtitle">네트워킹 및 휴식</div>
              <div class="timeline-description">
                <ul>
                  <li>참가자 간 교류</li>
                  <li>AI 활용 경험 공유</li>
                  <li>질의응답 시간</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 오후 세션 -->
          <div class="timeline-item">
            <div class="timeline-marker afternoon">
              <q-icon name="schedule" size="24px" />
            </div>
            <div class="timeline-content">
              <div class="timeline-title">오후 세션 (13:30 - 17:00)</div>
              <div class="timeline-subtitle">
                2사분면: 성찰하기 (Reflect) + 3사분면: 사고하기 (Think)
              </div>
              <div class="timeline-description">
                <ul>
                  <li>AI 기초 개념 학습</li>
                  <li>목회 현장 활용 사례</li>
                  <li>ChatGPT 실습</li>
                  <li>RGIOC 프롬프팅 기법</li>
                  <li>Challenge #2, #3</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 마무리 -->
          <div class="timeline-item">
            <div class="timeline-marker closing">
              <q-icon name="celebration" size="24px" />
            </div>
            <div class="timeline-content">
              <div class="timeline-title">마무리 (17:00 - 18:00)</div>
              <div class="timeline-subtitle">4사분면: 행동하기 (Act)</div>
              <div class="timeline-description">
                <ul>
                  <li>학습 내용 정리</li>
                  <li>실제 적용 계획 수립</li>
                  <li>온라인 POLL #3</li>
                  <li>감사 인사</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 학습 목표 -->
      <div class="goals-section q-mt-xl">
        <q-card class="goals-card">
          <q-card-section>
            <div class="text-h6 text-primary q-mb-md">
              <q-icon name="target" class="q-mr-sm" />
              학습 목표
            </div>
            <div class="row q-gutter-md">
              <div class="col-12 col-md-6">
                <div class="goal-item">
                  <q-icon name="psychology" color="blue-6" size="32px" />
                  <div class="goal-text">
                    <div class="text-subtitle1 text-weight-bold">AI 이해</div>
                    <div class="text-caption">생성형 AI의 기본 개념과 원리 이해</div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="goal-item">
                  <q-icon name="build" color="green-6" size="32px" />
                  <div class="goal-text">
                    <div class="text-subtitle1 text-weight-bold">실습 경험</div>
                    <div class="text-caption">다양한 AI 도구를 직접 체험하고 활용</div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="goal-item">
                  <q-icon name="rocket_launch" color="orange-6" size="32px" />
                  <div class="goal-text">
                    <div class="text-subtitle1 text-weight-bold">목회 적용</div>
                    <div class="text-caption">목회 현장에서 AI를 활용할 수 있는 방법 습득</div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="goal-item">
                  <q-icon name="network_check" color="purple-6" size="32px" />
                  <div class="goal-text">
                    <div class="text-subtitle1 text-weight-bold">네트워킹</div>
                    <div class="text-caption">동료 목회자들과의 경험 공유 및 네트워크 형성</div>
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
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
</script>

<style scoped>
.slide-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.slide-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e0e0e0;
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
}

.timeline-section {
  flex: 1;
  overflow-y: auto;
}

.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 1rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, #ff9800, #4caf50, #2196f3, #9c27b0);
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
  padding-left: 2rem;
}

.timeline-marker {
  position: absolute;
  left: -1.5rem;
  top: 0;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.timeline-marker.morning {
  background: linear-gradient(135deg, #ff9800, #ffb74d);
}

.timeline-marker.lunch {
  background: linear-gradient(135deg, #4caf50, #81c784);
}

.timeline-marker.afternoon {
  background: linear-gradient(135deg, #2196f3, #64b5f6);
}

.timeline-marker.closing {
  background: linear-gradient(135deg, #9c27b0, #ba68c8);
}

.timeline-content {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-left: 1rem;
}

.timeline-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
}

.timeline-subtitle {
  font-size: 1rem;
  color: #666;
  margin-bottom: 1rem;
  font-style: italic;
}

.timeline-description ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.timeline-description li {
  padding: 0.3rem 0;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
  padding-left: 1rem;
}

.timeline-description li:last-child {
  border-bottom: none;
}

.timeline-description li:before {
  content: '▶';
  color: #1976d2;
  position: absolute;
  left: 0;
}

.goals-section {
  margin-top: 2rem;
}

.goals-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.goal-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.goal-text {
  margin-left: 1rem;
}

.goal-text .text-caption {
  color: #666;
  margin-top: 0.25rem;
}
</style>
