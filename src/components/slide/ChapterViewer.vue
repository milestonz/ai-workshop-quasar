<template>
  <div class="chapter-viewer">
    <component
      :is="chapterComponent"
      :lesson="lesson"
      :slideIndex="slideIndex"
      v-if="chapterComponent"
    />
    <div v-else class="chapter-placeholder">
      <h2>Chapter 컴포넌트를 불러올 수 없습니다.</h2>
      <p>Chapter-{{ lessonNumber }}.vue 파일이 존재하는지 확인해주세요.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';

interface Props {
  lesson: any;
  slideIndex: number;
}

const props = defineProps<Props>();

// 강의 번호 추출
const lessonNumber = computed(() => {
  const lessonNumberMatch = props.lesson?.title?.match(/^(\d+)\./);
  return lessonNumberMatch ? lessonNumberMatch[1] : '1';
});

// Chapter 컴포넌트 동적 import
const chapterComponent = computed(() => {
  try {
    return defineAsyncComponent(() => import(`./slides/Chapter-${lessonNumber.value}.vue`));
  } catch (error) {
    console.error('Chapter 컴포넌트 로드 오류:', error);
    return null;
  }
});
</script>

<style scoped>
.chapter-viewer {
  height: 100%;
  width: 100%;
}

.chapter-placeholder {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
  color: #666;
  text-align: center;
  padding: 2rem;
}

.chapter-placeholder h2 {
  margin-bottom: 1rem;
  color: #333;
}

.chapter-placeholder p {
  font-size: 1.1rem;
}
</style>
