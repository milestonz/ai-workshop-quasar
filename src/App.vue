<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useCourseStore } from 'src/stores/course';

const courseStore = useCourseStore();

onMounted(async () => {
  console.log('🚀 앱 시작 - LocalStorage에서 데이터 로드 중...');
  courseStore.loadFromLocalStorage();

  console.log('🔄 MD 파일 기반 목차 초기화 중...');
  await courseStore.initializeCourseOutline();
  console.log('✅ 목차 초기화 완료');
});
</script>
