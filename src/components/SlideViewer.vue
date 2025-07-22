<template>
  <div class="slide-viewer">
    <component
      :is="currentSlideComponent"
      v-if="currentSlideComponent"
      :lesson="lesson"
      :slide-index="slideIndex"
    />
    <div v-else class="slide-placeholder">
      <q-icon name="slideshow" size="100px" color="grey-4" />
      <div class="text-h6 text-grey-6 q-mt-md">슬라이드를 준비 중입니다...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Lesson } from '../stores/course';

// 슬라이드 컴포넌트들을 동적으로 import (현재 구현된 것만)
const slideComponents = {
  // 1. 오늘의 여정
  '1-0': () => import('./slides/Slide1_0.vue'), // 세미나 소개
  '1-1': () => import('./slides/Slide1_1.vue'), // 오늘의 여정
};

interface Props {
  lesson: Lesson;
  slideIndex: number;
}

const props = defineProps<Props>();

// 현재 슬라이드 컴포넌트를 동적으로 계산
const currentSlideComponent = computed(() => {
  if (!props.lesson?.title) return null;

  const key = `${props.lesson.title?.split('.')[0]?.trim() || '1'}-${props.slideIndex}`;
  const componentLoader = slideComponents[key as keyof typeof slideComponents];

  if (componentLoader) {
    return componentLoader;
  }

  return null;
});
</script>

<style scoped>
.slide-viewer {
  width: 100%;
  height: 100%;
}

.slide-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 400px;
}
</style>
