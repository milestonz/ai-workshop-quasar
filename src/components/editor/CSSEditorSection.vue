<template>
  <q-card class="sidebar-card q-mt-md">
    <q-card-section>
      <h6 class="q-my-none">전역 CSS 편집기</h6>
      <div class="text-caption text-grey-6 q-mt-xs">
        {{
          currentSlideType === 'chapter'
            ? 'Chapter 디자인을 커스터마이즈하세요'
            : 'Obsidian처럼 전역 CSS 파일로 슬라이드 스타일을 관리하세요'
        }}
      </div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <CSSEditor
        :key="`css-${currentLesson}-${currentSlide}`"
        :initial-css="currentSlideCss"
        :slide-id="`${currentLesson}-${currentSlide}`"
        @css-change="handleCSSChange"
        @css-save="handleCSSSave"
        @css-reset="handleCSSReset"
        ref="cssEditor"
      />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CSSEditor from './CSSEditor.vue';

interface Props {
  currentSlideType: string;
  currentLesson: number;
  currentSlide: number;
  currentSlideCss: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  cssChange: [css: string];
  cssSave: [css: string];
  cssReset: [];
}>();

const cssEditor = ref();

// CSS 변경
const handleCSSChange = (css: string) => {
  emit('cssChange', css);
};

// CSS 저장
const handleCSSSave = (css: string) => {
  emit('cssSave', css);
};

// CSS 리셋
const handleCSSReset = () => {
  emit('cssReset');
};

// CSS 에디터 ref 노출
defineExpose({
  cssEditor,
});
</script>
