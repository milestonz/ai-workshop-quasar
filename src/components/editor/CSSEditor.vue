<template>
  <div class="css-editor">
    <div class="editor-header">
      <h6 class="q-my-none">CSS 편집기</h6>
      <div class="editor-controls">
        <q-btn
          flat
          dense
          size="sm"
          :icon="isPreview ? 'visibility_off' : 'visibility'"
          :label="isPreview ? '편집' : '미리보기'"
          @click="togglePreview"
        />
        <q-btn flat dense size="sm" icon="save" label="저장" @click="saveCSS" />
        <q-btn flat dense size="sm" icon="refresh" label="초기화" @click="resetCSS" />
      </div>
    </div>

    <div class="editor-content">
      <div v-if="!isPreview" class="code-editor">
        <q-input
          v-model="cssContent"
          type="textarea"
          placeholder="CSS 코드를 입력하세요..."
          rows="8"
          outlined
          dense
          class="css-textarea"
          @input="handleCSSChange"
        />
      </div>

      <div v-else class="css-preview">
        <div class="preview-header">
          <span class="text-caption">CSS 미리보기</span>
        </div>
        <div class="preview-content">
          <pre class="css-code">{{ cssContent }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

interface Props {
  initialCSS?: string;
  slideId?: string;
}

interface Emits {
  (e: 'css-change', css: string): void;
  (e: 'css-save', css: string): void;
  (e: 'css-reset'): void;
}

const props = withDefaults(defineProps<Props>(), {
  initialCSS: '',
  slideId: '',
});

const emit = defineEmits<Emits>();

const cssContent = ref(props.initialCSS);
const isPreview = ref(false);

// CSS 변경 처리
const handleCSSChange = () => {
  emit('css-change', cssContent.value);
};

// 미리보기 토글
const togglePreview = () => {
  isPreview.value = !isPreview.value;
};

// CSS 저장
const saveCSS = () => {
  emit('css-save', cssContent.value);
};

// CSS 초기화
const resetCSS = () => {
  cssContent.value = props.initialCSS;
  emit('css-reset');
};

// 초기 CSS가 변경되면 업데이트
watch(
  () => props.initialCSS,
  (newCSS) => {
    if (newCSS !== cssContent.value) {
      cssContent.value = newCSS;
    }
  },
);

// slideId 변경 시 CSS 강제 업데이트
watch(
  () => props.slideId,
  (newSlideId) => {
    console.log('CSS slideId 변경됨:', newSlideId);
    // 새로운 슬라이드로 변경되었으므로 CSS를 초기화
    cssContent.value = props.initialCSS;
  },
);
</script>

<style scoped>
.css-editor {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.editor-header {
  background: #f5f5f5;
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.editor-controls {
  display: flex;
  gap: 8px;
}

.editor-content {
  background: white;
}

.code-editor {
  padding: 16px;
}

.css-textarea {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 12px;
  line-height: 1.4;
}

.css-preview {
  padding: 16px;
  background: #f8f9fa;
}

.preview-header {
  margin-bottom: 8px;
  color: #666;
}

.preview-content {
  background: #2d3748;
  border-radius: 4px;
  padding: 12px;
}

.css-code {
  color: #e2e8f0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 12px;
  line-height: 1.4;
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
