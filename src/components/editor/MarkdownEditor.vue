<template>
  <div class="markdown-editor">
    <div class="editor-header">
      <div class="editor-actions">
        <q-btn
          flat
          dense
          size="sm"
          icon="image"
          label="이미지 첨부"
          @click="openImageUpload"
          class="q-mr-sm"
        />
        <q-btn
          flat
          dense
          size="sm"
          icon="play_circle"
          label="YouTube"
          @click="openYouTubeDialog"
          class="q-mr-sm"
        />
        <q-btn
          flat
          dense
          size="sm"
          icon="save"
          label="저장"
          @click="saveContent"
          :loading="saving"
        />
      </div>
    </div>

    <!-- 이미지 업로드 다이얼로그 -->
    <q-dialog v-model="showImageDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">이미지 첨부</div>
        </q-card-section>

        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-file
                v-model="selectedImage"
                label="이미지 파일 선택"
                accept=".jpg,.jpeg,.png,.gif,.webp"
                outlined
                dense
                @update:model-value="onImageSelected"
              >
                <template v-slot:prepend>
                  <q-icon name="image" />
                </template>
              </q-file>
            </div>

            <div v-if="imagePreview" class="col-12">
              <div class="text-caption q-mb-xs">미리보기:</div>
              <img
                :src="imagePreview"
                alt="미리보기"
                style="max-width: 100%; max-height: 200px; object-fit: contain"
              />
            </div>

            <div class="col-12">
              <q-input
                v-model="imageAltText"
                label="이미지 설명 (alt 텍스트)"
                outlined
                dense
                placeholder="이미지에 대한 설명을 입력하세요"
              />
            </div>

            <div class="col-6">
              <q-input
                v-model.number="imageWidth"
                label="너비 (px)"
                type="number"
                outlined
                dense
                placeholder="자동"
              />
            </div>

            <div class="col-6">
              <q-input
                v-model.number="imageHeight"
                label="높이 (px)"
                type="number"
                outlined
                dense
                placeholder="자동"
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="취소" @click="cancelImageUpload" />
          <q-btn color="primary" label="삽입" @click="insertImage" :disable="!selectedImage" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- YouTube 링크 입력 다이얼로그 -->
    <q-dialog v-model="showYouTubeDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">YouTube 영상 추가</div>
        </q-card-section>

        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-input
                v-model="youtubeUrl"
                label="YouTube 링크"
                outlined
                dense
                placeholder="https://www.youtube.com/watch?v=..."
                @update:model-value="onYouTubeUrlChange"
              >
                <template v-slot:prepend>
                  <q-icon name="play_circle" />
                </template>
              </q-input>
            </div>

            <div v-if="youtubeVideoId" class="col-12">
              <div class="text-caption q-mb-xs">미리보기:</div>
              <div class="youtube-preview">
                <iframe
                  :src="`https://www.youtube.com/embed/${youtubeVideoId}`"
                  width="100%"
                  height="200"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </div>

            <div class="col-12">
              <q-input
                v-model="youtubeTitle"
                label="영상 제목 (선택사항)"
                outlined
                dense
                placeholder="영상에 대한 설명을 입력하세요"
              />
            </div>

            <div class="col-6">
              <q-input
                v-model.number="youtubeWidth"
                label="너비 (px)"
                type="number"
                outlined
                dense
                placeholder="자동"
              />
            </div>

            <div class="col-6">
              <q-input
                v-model.number="youtubeHeight"
                label="높이 (px)"
                type="number"
                outlined
                dense
                placeholder="자동"
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="취소" @click="cancelYouTubeDialog" />
          <q-btn color="primary" label="삽입" @click="insertYouTube" :disable="!youtubeVideoId" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div class="editor-content">
      <q-input
        v-model="content"
        type="textarea"
        placeholder="Markdown 내용을 입력하세요..."
        rows="15"
        outlined
        dense
        class="markdown-textarea"
        @update:model-value="onContentChange"
      />
      <div class="text-caption text-grey-6 q-mt-xs">{{ content.length }}자 / 10000자</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { convertMarkdownToHTML } from '../../utils/markdown';
import { useQuasar } from 'quasar';

interface Props {
  initialContent?: string;
  slideId?: string;
}

const props = withDefaults(defineProps<Props>(), {
  initialContent: '',
  slideId: '',
});

const emit = defineEmits<{
  save: [content: string, slideId: string];
  contentChange: [content: string];
  autoUpdate: [content: string, slideId: string];
}>();

// Quasar 인스턴스
const $q = useQuasar();

// 상태
const content = ref(props.initialContent);
const saving = ref(false);
const autoUpdateEnabled = ref(true); // 자동 업데이트 활성화
const updateTimeout = ref<NodeJS.Timeout | null>(null);

// 자동저장 관련 상태
const autoSaveTimer = ref<NodeJS.Timeout | null>(null);
const lastSavedContent = ref(props.initialContent);
const autoSaveInterval = 3000; // 3초마다 자동저장

// 이미지 업로드 관련 상태
const showImageDialog = ref(false);
const selectedImage = ref<File | null>(null);
const imagePreview = ref<string | null>(null);
const imageAltText = ref('');
const imageWidth = ref<number | null>(null);
const imageHeight = ref<number | null>(null);

// YouTube 관련 상태
const showYouTubeDialog = ref(false);
const youtubeUrl = ref('');
const youtubeVideoId = ref('');
const youtubeTitle = ref('');
const youtubeWidth = ref<number | null>(null);
const youtubeHeight = ref<number | null>(null);

// 계산된 속성
const renderedContent = computed(() => {
  try {
    return convertMarkdownToHTML(content.value);
  } catch (error) {
    console.error('Markdown 렌더링 오류:', error);
    return content.value;
  }
});

// 메서드
const onContentChange = () => {
  emit('contentChange', content.value);
  scheduleAutoUpdate();
};

// 이미지 업로드 관련 메서드
const openImageUpload = () => {
  showImageDialog.value = true;
  resetImageForm();
};

const resetImageForm = () => {
  selectedImage.value = null;
  imagePreview.value = null;
  imageAltText.value = '';
  imageWidth.value = null;
  imageHeight.value = null;
};

const onImageSelected = (file: File | null) => {
  if (file) {
    selectedImage.value = file;
    // 이미지 미리보기 생성
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const cancelImageUpload = () => {
  showImageDialog.value = false;
  resetImageForm();
};

const insertImage = () => {
  if (!selectedImage.value) return;

  try {
    // 이미지를 base64로 변환
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Data = e.target?.result as string;

      // Markdown 이미지 문법 생성
      let imageMarkdown = `![${imageAltText.value || '이미지'}](${base64Data})`;

      // 크기 지정이 있는 경우 HTML img 태그 사용
      if (imageWidth.value || imageHeight.value) {
        const widthAttr = imageWidth.value ? ` width="${imageWidth.value}"` : '';
        const heightAttr = imageHeight.value ? ` height="${imageHeight.value}"` : '';
        imageMarkdown = `<img src="${base64Data}" alt="${imageAltText.value || '이미지'}"${widthAttr}${heightAttr} style="display: block; margin: 0 auto; max-width: 100%;" />`;
      }

      // 현재 커서 위치에 이미지 삽입
      const textarea = document.querySelector('.markdown-textarea textarea') as HTMLTextAreaElement;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const before = content.value.substring(0, start);
        const after = content.value.substring(end);

        content.value = before + '\n' + imageMarkdown + '\n' + after;

        // 커서 위치 조정
        setTimeout(() => {
          const newPosition = start + imageMarkdown.length + 2; // +2 for newlines
          textarea.setSelectionRange(newPosition, newPosition);
          textarea.focus();
        }, 0);
      } else {
        // textarea를 찾을 수 없는 경우 내용 끝에 추가
        content.value += '\n' + imageMarkdown + '\n';
      }

      // 내용 변경 이벤트 발생
      onContentChange();

      // 다이얼로그 닫기
      showImageDialog.value = false;
      resetImageForm();

      $q.notify({
        type: 'positive',
        message: '이미지가 성공적으로 삽입되었습니다.',
        position: 'top',
      });
    };
    reader.readAsDataURL(selectedImage.value);
  } catch (error) {
    console.error('이미지 삽입 오류:', error);
    $q.notify({
      type: 'negative',
      message: '이미지 삽입 중 오류가 발생했습니다.',
      position: 'top',
    });
  }
};

// YouTube 관련 메서드
const openYouTubeDialog = () => {
  showYouTubeDialog.value = true;
  resetYouTubeForm();
};

const resetYouTubeForm = () => {
  youtubeUrl.value = '';
  youtubeVideoId.value = '';
  youtubeTitle.value = '';
  youtubeWidth.value = null;
  youtubeHeight.value = null;
};

const onYouTubeUrlChange = (url: string | number | null) => {
  if (typeof url === 'string') {
    youtubeUrl.value = url;
    // YouTube URL에서 비디오 ID 추출
    const videoId = extractYouTubeVideoId(url);
    youtubeVideoId.value = videoId;
  } else {
    // null이나 number인 경우 빈 문자열로 설정
    youtubeUrl.value = '';
    youtubeVideoId.value = '';
  }
};

const extractYouTubeVideoId = (url: string): string => {
  // 다양한 YouTube URL 형식 지원
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return '';
};

const cancelYouTubeDialog = () => {
  showYouTubeDialog.value = false;
  resetYouTubeForm();
};

const insertYouTube = () => {
  if (!youtubeVideoId.value) return;

  try {
    // YouTube iframe 생성
    let youtubeMarkdown = '';

    if (youtubeWidth.value || youtubeHeight.value) {
      // 크기 지정이 있는 경우
      const widthAttr = youtubeWidth.value ? ` width="${youtubeWidth.value}"` : '';
      const heightAttr = youtubeHeight.value ? ` height="${youtubeHeight.value}"` : '';
      youtubeMarkdown = `<iframe src="https://www.youtube.com/embed/${youtubeVideoId.value}"${widthAttr}${heightAttr} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="display: block; margin: 0 auto; max-width: 100%;"></iframe>`;
    } else {
      // 전체화면으로 표시
      youtubeMarkdown = `<div class="youtube-fullscreen">
  <iframe
    src="https://www.youtube.com/embed/${youtubeVideoId.value}"
    width="100%"
    height="100%"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
  ></iframe>
</div>`;
    }

    // 제목이 있는 경우 추가
    if (youtubeTitle.value) {
      youtubeMarkdown = `## ${youtubeTitle.value}\n\n${youtubeMarkdown}`;
    }

    // 현재 커서 위치에 YouTube 삽입
    const textarea = document.querySelector('.markdown-textarea textarea') as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const before = content.value.substring(0, start);
      const after = content.value.substring(end);

      content.value = before + '\n' + youtubeMarkdown + '\n' + after;

      // 커서 위치 조정
      setTimeout(() => {
        const newPosition = start + youtubeMarkdown.length + 2; // +2 for newlines
        textarea.setSelectionRange(newPosition, newPosition);
        textarea.focus();
      }, 0);
    } else {
      // textarea를 찾을 수 없는 경우 내용 끝에 추가
      content.value += '\n' + youtubeMarkdown + '\n';
    }

    // 내용 변경 이벤트 발생
    onContentChange();

    // 다이얼로그 닫기
    showYouTubeDialog.value = false;
    resetYouTubeForm();

    $q.notify({
      type: 'positive',
      message: 'YouTube 영상이 성공적으로 삽입되었습니다.',
      position: 'top',
    });
  } catch (error) {
    console.error('YouTube 삽입 오류:', error);
    $q.notify({
      type: 'negative',
      message: 'YouTube 영상 삽입 중 오류가 발생했습니다.',
      position: 'top',
    });
  }
};

// 자동 업데이트 스케줄링 (비활성화)
const scheduleAutoUpdate = () => {
  // 자동 업데이트 비활성화 - 수동 저장만 사용
  if (updateTimeout.value) {
    clearTimeout(updateTimeout.value);
  }

  // 실시간 뷰어 업데이트만 수행 (파일 저장은 하지 않음)
  updateTimeout.value = setTimeout(() => {
    if (autoUpdateEnabled.value) {
      console.log('🔍 [MarkdownEditor] 자동 업데이트');
      console.log('🔍 [MarkdownEditor] 업데이트 내용 길이:', content.value.length);
      console.log(
        '🔍 [MarkdownEditor] 업데이트 내용 끝부분:',
        JSON.stringify(content.value.substring(content.value.length - 20)),
      );

      console.log('🎯 실시간 뷰어 업데이트:', props.slideId, '내용길이:', content.value.length);
      emit('autoUpdate', content.value, props.slideId);
    }
  }, 1000); // 1초 후 뷰어 업데이트
};

const saveContent = async () => {
  saving.value = true;
  try {
    console.log('🔍 [MarkdownEditor] 저장 시작');
    console.log('🔍 [MarkdownEditor] 저장할 내용 길이:', content.value.length);
    console.log(
      '🔍 [MarkdownEditor] 저장할 내용 끝부분:',
      JSON.stringify(content.value.substring(content.value.length - 20)),
    );

    // 부모 컴포넌트에 저장 요청 (덮어쓰기 포함)
    emit('save', content.value, props.slideId);

    // 저장 성공 피드백
    setTimeout(() => {
      saving.value = false;
    }, 1000);
  } catch (error) {
    console.error('저장 오류:', error);
    saving.value = false;
  }
};

// props 변경 감지
watch(
  () => props.initialContent,
  (newContent) => {
    console.log('📝 MarkdownEditor: initialContent 변경됨:', {
      oldContent: content.value.substring(0, 50),
      newContent: newContent.substring(0, 50),
    });
    content.value = newContent;
    lastSavedContent.value = newContent;
  },
  { immediate: true },
);

// slideId 변경 시 내용 강제 업데이트
watch(
  () => props.slideId,
  (newSlideId) => {
    console.log('slideId 변경됨:', newSlideId);
    // 새로운 슬라이드로 변경되었으므로 내용을 초기화
    content.value = props.initialContent;
    lastSavedContent.value = props.initialContent;
  },
);

// 컴포넌트 마운트 시 자동저장 시작
onMounted(() => {
  lastSavedContent.value = content.value;
});

// 컴포넌트 언마운트 시 타이머 정리
onUnmounted(() => {
  if (autoSaveTimer.value) {
    clearTimeout(autoSaveTimer.value);
  }
});

// 외부에서 내용 설정 가능
const setContent = (newContent: string) => {
  content.value = newContent;
};

// 외부에서 접근 가능하도록 expose
defineExpose({
  setContent,
  content,
});
</script>

<style scoped>
.markdown-editor {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.editor-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 1rem;
}

.editor-actions {
  display: flex;
  align-items: center;
}

.editor-content {
  flex: 1;
  overflow: hidden;
}

.markdown-textarea {
  flex: 1;
}

.markdown-textarea :deep(.q-field__control) {
  height: 100%;
}

.markdown-textarea :deep(.q-field__native) {
  height: 100%;
  resize: none;
}
</style>
