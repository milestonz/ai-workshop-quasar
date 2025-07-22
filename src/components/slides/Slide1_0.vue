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
        <h1 class="text-h2 text-primary text-weight-bold">목회자를 위한 생성형 AI 활용 세미나</h1>
        <div class="subtitle text-h5 text-grey-7 q-mt-md">
          AI로 목회를 혁신하는 방법을 배워보세요
        </div>
      </div>

      <!-- 동영상 섹션 -->
      <div class="video-section q-mt-xl">
        <div class="video-container">
          <div class="video-placeholder">
            <q-icon name="play_circle" size="80px" color="primary" />
            <div class="text-h6 text-grey-7 q-mt-md">세미나 소개 동영상</div>
            <div class="text-caption text-grey-6">클릭하여 재생</div>
          </div>
        </div>
      </div>

      <!-- 주요 내용 -->
      <div class="content-section q-mt-xl">
        <div class="row q-gutter-md">
          <div class="col-12 col-md-6">
            <q-card class="content-card">
              <q-card-section>
                <div class="text-h6 text-primary q-mb-sm">
                  <q-icon name="schedule" class="q-mr-sm" />
                  세미나 일정
                </div>
                <ul class="text-body1">
                  <li>오전: AI 기초 및 실습</li>
                  <li>점심: 네트워킹 시간</li>
                  <li>오후: 심화 학습 및 적용</li>
                </ul>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-12 col-md-6">
            <q-card class="content-card">
              <q-card-section>
                <div class="text-h6 text-primary q-mb-sm">
                  <q-icon name="groups" class="q-mr-sm" />
                  참가 대상
                </div>
                <ul class="text-body1">
                  <li>목회자 및 전도사</li>
                  <li>교회 사역자</li>
                  <li>신학생</li>
                </ul>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>

      <!-- 이미지 섹션 -->
      <div class="image-section q-mt-xl">
        <div class="row q-gutter-md">
          <div class="col-12 col-md-4">
            <div class="image-placeholder">
              <q-icon name="psychology" size="60px" color="blue-6" />
              <div class="text-subtitle1 text-grey-8 q-mt-sm">AI 이해</div>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="image-placeholder">
              <q-icon name="build" size="60px" color="green-6" />
              <div class="text-subtitle1 text-grey-8 q-mt-sm">실습 중심</div>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="image-placeholder">
              <q-icon name="rocket_launch" size="60px" color="orange-6" />
              <div class="text-subtitle1 text-grey-8 q-mt-sm">목회 적용</div>
            </div>
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

.video-section {
  text-align: center;
}

.video-container {
  max-width: 600px;
  margin: 0 auto;
}

.video-placeholder {
  background: #f8f9fa;
  border: 2px dashed #dee2e6;
  border-radius: 12px;
  padding: 3rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.video-placeholder:hover {
  background: #e9ecef;
  border-color: #adb5bd;
}

.content-section {
  margin-top: 2rem;
}

.content-card {
  height: 100%;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.image-section {
  margin-top: 2rem;
}

.image-placeholder {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.image-placeholder:hover {
  transform: translateY(-4px);
}

ul {
  list-style: none;
  padding: 0;
}

ul li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
}

ul li:last-child {
  border-bottom: none;
}

ul li:before {
  content: '•';
  color: #1976d2;
  font-weight: bold;
  margin-right: 0.5rem;
}
</style>
