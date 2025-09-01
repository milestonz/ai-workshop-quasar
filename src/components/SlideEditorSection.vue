<template>
  <q-card class="sidebar-card q-mt-md">
    <q-card-section>
      <h6 class="q-my-none editor-title">
        {{ currentSlideType === 'chapter' ? 'Chapter 편집기' : '슬라이드 편집기' }}
      </h6>
      <div class="text-caption text-grey-6 q-mt-xs">
        {{
          currentSlideType === 'chapter'
            ? 'Chapter 내용을 편집하세요'
            : '슬라이드 내용을 편집하세요'
        }}
      </div>
    </q-card-section>

    <!-- 현재 슬라이드 정보 -->
    <q-card-section class="q-pt-none current-slide-info-section">
      <div class="row items-center justify-between q-mb-sm">
        <div class="col">
          <div class="text-subtitle2 text-weight-medium">
            {{ currentSlideInfo?.lessonTitle }}
          </div>
          <div class="text-caption text-grey-6">
            {{ currentSlideInfo?.slideTitle }}
          </div>
        </div>
        <div class="col-auto">
          <q-chip
            size="sm"
            color="primary"
            text-color="white"
            :label="`${currentSlideInfo?.slideIndex}/${currentSlideInfo?.totalSlides}`"
          />
        </div>
      </div>
      <div class="text-caption text-grey-6">
        강의 {{ currentSlideInfo?.lessonNumber }}/{{ currentSlideInfo?.totalLessons }}
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <!-- 목차 업데이트 및 슬라이드 변환 버튼 -->
      <div class="row q-gutter-sm q-mb-md">
        <q-btn
          icon="refresh"
          label="목차 업데이트"
          @click="handleUpdateTOC"
          :loading="updatingTOC"
          color="primary"
        />
        <q-btn
          icon="transform"
          label="슬라이드 변환"
          @click="handleConvertSlides"
          :loading="convertingSlides"
          color="secondary"
        />
        <q-btn icon="add" label="새 슬라이드" @click="handleAddNewSlide" color="positive" />
      </div>

      <MarkdownEditor
        :key="`${currentLesson}-${currentSlide}`"
        :initial-content="currentSlideContent"
        :slide-id="`${currentLesson}-${currentSlide}`"
        @save="handleSlideContentSave"
        @content-change="handleSlideContentChange"
        @preview="handleSlidePreview"
        @create-markdown="handleCreateMarkdownFile"
        @auto-update="handleAutoUpdate"
        ref="markdownEditor"
      />

      <!-- 슬라이드 반영 버튼 -->
      <div class="q-mt-md text-right">
        <q-btn
          color="accent"
          icon="check_circle"
          label="슬라이드 반영"
          @click="applySlide"
          :loading="isApplying"
          :disable="isApplying"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import MarkdownEditor from './MarkdownEditor.vue';

interface CurrentSlideInfo {
  lessonTitle: string;
  slideTitle: string;
  slideIndex: number;
  totalSlides: number;
  lessonNumber: number;
  totalLessons: number;
}

interface Props {
  currentSlideType: string;
  currentSlideInfo: CurrentSlideInfo;
  currentLesson: number;
  currentSlide: number;
  currentSlideContent: string;
  isApplying?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  slideContentSave: [content: string, slideId: string];
  slideContentChange: [content: string];
  slidePreview: [content: string];
  createMarkdownFile: [content: string, slideId: string];
  autoUpdate: [content: string, slideId: string];
  updateTOC: [];
  addNewSlide: [];
  applySlide: [slideId: string];
}>();

const $q = useQuasar();
const markdownEditor = ref();
const updatingTOC = ref(false);
const convertingSlides = ref(false);

// 슬라이드 내용 저장
const handleSlideContentSave = (content: string, slideId: string) => {
  emit('slideContentSave', content, slideId);
};

// 슬라이드 내용 변경
const handleSlideContentChange = (content: string) => {
  emit('slideContentChange', content);
};

// 슬라이드 미리보기
const handleSlidePreview = (content: string) => {
  emit('slidePreview', content);
};

// 마크다운 파일 생성
const handleCreateMarkdownFile = (content: string, slideId: string) => {
  emit('createMarkdownFile', content, slideId);
};

// 자동 업데이트
const handleAutoUpdate = (content: string, slideId: string) => {
  emit('autoUpdate', content, slideId);
};

// 목차 업데이트
const handleUpdateTOC = async () => {
  updatingTOC.value = true;
  try {
    emit('updateTOC');

    // 성공 메시지 표시
    $q.notify({
      type: 'positive',
      message: '목차 업데이트가 시작되었습니다',
      position: 'top',
      timeout: 2000,
      icon: 'refresh',
      actions: [{ label: '확인', color: 'white' }],
    });
  } catch (error) {
    // 오류 메시지 표시
    $q.notify({
      type: 'negative',
      message: '목차 업데이트 중 오류가 발생했습니다',
      position: 'top',
      timeout: 3000,
      icon: 'error',
      actions: [{ label: '확인', color: 'white' }],
    });
  } finally {
    updatingTOC.value = false;
  }
};

// 슬라이드 변환
const handleConvertSlides = async () => {
  convertingSlides.value = true;

  try {
    // 슬라이드 변환 API 호출
    const response = await fetch('/api/convert-slides', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sourceDir: './md-slides',
        outputDir: './public/html',
      }),
    });

    const result = await response.json();

    if (result.success) {
      $q.notify({
        type: 'positive',
        message: `슬라이드 변환 완료! ${result.convertedCount}개 성공, ${result.failedCount}개 실패`,
        position: 'top',
        timeout: 5000,
        icon: 'transform',
        actions: [{ label: '확인', color: 'white' }],
      });
    } else {
      throw new Error(result.message || '슬라이드 변환에 실패했습니다.');
    }
  } catch (error) {
    console.error('슬라이드 변환 오류:', error);
    $q.notify({
      type: 'negative',
      message: `슬라이드 변환 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
      position: 'top',
      timeout: 5000,
      icon: 'error',
      actions: [{ label: '확인', color: 'white' }],
    });
  } finally {
    convertingSlides.value = false;
  }
};

// 새 슬라이드 추가
const handleAddNewSlide = () => {
  emit('addNewSlide');
};

// 슬라이드 반영
const applySlide = () => {
  emit('applySlide', `${props.currentLesson}-${props.currentSlide}`);
};

// 마크다운 에디터 ref 노출
defineExpose({
  markdownEditor,
});
</script>

<style scoped>
.editor-title {
  color: #000000;
  font-weight: bold;
}
</style>
