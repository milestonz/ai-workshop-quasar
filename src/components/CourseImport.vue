<template>
  <div class="course-import">
    <q-card class="import-card">
      <q-card-section>
        <div class="text-h6">📚 새 강의 가져오기</div>
        <div class="text-subtitle2">MD 파일을 업로드하여 새로운 강의를 생성하세요</div>
      </q-card-section>

      <q-card-section>
        <!-- 강의 정보 입력 -->
        <div class="course-info">
          <q-input
            v-model="courseTitle"
            label="강의 제목 *"
            placeholder="예: AI 시대의 목회자"
            :rules="[(val) => !!val || '강의 제목을 입력하세요']"
            class="q-mb-md"
          />

          <q-input
            v-model="courseDescription"
            label="강의 설명"
            placeholder="강의에 대한 간단한 설명을 입력하세요"
            type="textarea"
            rows="3"
            class="q-mb-md"
          />

          <q-input
            v-model="courseAuthor"
            label="강사명"
            placeholder="강사 이름을 입력하세요"
            class="q-mb-md"
          />
        </div>

        <!-- MD 파일 업로드 -->
        <div class="file-upload">
          <div class="text-subtitle2 q-mb-sm">MD 파일 선택</div>

          <q-file
            v-model="mdFiles"
            multiple
            accept=".md"
            label="MD 파일들을 선택하세요"
            filled
            use-chips
            counter
            @update:model-value="handleFileSelect"
          >
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
            <template v-slot:append>
              <q-icon name="close" @click.stop="mdFiles = null" class="cursor-pointer" />
            </template>
          </q-file>

          <!-- 파일 목록 -->
          <div v-if="fileList.length > 0" class="file-list q-mt-md">
            <div class="text-subtitle2 q-mb-sm">선택된 파일 ({{ fileList.length }}개)</div>
            <q-list bordered separator>
              <q-item v-for="(file, index) in fileList" :key="index">
                <q-item-section avatar>
                  <q-icon name="description" color="primary" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ file.name }}</q-item-label>
                  <q-item-label caption>{{ formatFileSize(file.size) }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn
                    flat
                    round
                    dense
                    color="negative"
                    icon="delete"
                    @click="removeFile(index)"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>

        <!-- 미리보기 -->
        <div v-if="previewContent" class="preview-section q-mt-lg">
          <div class="text-subtitle2 q-mb-sm">📖 첫 번째 슬라이드 미리보기</div>
          <q-card flat bordered>
            <q-card-section>
              <div v-html="previewContent" class="preview-content"></div>
            </q-card-section>
          </q-card>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="취소" @click="$emit('cancel')" />
        <q-btn
          :loading="isImporting"
          :disable="!canImport"
          color="primary"
          label="강의 생성"
          @click="importCourse"
        />
      </q-card-actions>
    </q-card>

    <!-- 진행 상황 다이얼로그 -->
    <q-dialog v-model="showProgress" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">강의 생성 중...</div>
        </q-card-section>

        <q-card-section>
          <q-linear-progress :value="progressValue" color="primary" class="q-mb-sm" />
          <div class="text-caption">{{ progressMessage }}</div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useQuasar } from 'quasar';
import { marked } from 'marked';

const $q = useQuasar();

// Props & Emits
const emit = defineEmits<{
  cancel: [];
  success: [courseId: string];
}>();

// Reactive data
const courseTitle = ref('');
const courseDescription = ref('');
const courseAuthor = ref('');
const mdFiles = ref<File[] | null>(null);
const fileList = ref<File[]>([]);
const previewContent = ref('');
const isImporting = ref(false);
const showProgress = ref(false);
const progressValue = ref(0);
const progressMessage = ref('');

// Computed
const canImport = computed(() => {
  return courseTitle.value.trim() && fileList.value.length > 0;
});

// Methods
const handleFileSelect = (files: File[]) => {
  if (files) {
    fileList.value = Array.from(files);
    generatePreview();
  }
};

const removeFile = (index: number) => {
  fileList.value.splice(index, 1);
  generatePreview();
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const generatePreview = async () => {
  if (fileList.value.length > 0) {
    try {
      const firstFile = fileList.value[0];
      if (firstFile) {
        const content = await firstFile.text();
        const html = await marked(content);
        previewContent.value = html;
      }
    } catch (error) {
      console.error('미리보기 생성 실패:', error);
      previewContent.value = '미리보기를 생성할 수 없습니다.';
    }
  } else {
    previewContent.value = '';
  }
};

const importCourse = async () => {
  if (!canImport.value) return;

  isImporting.value = true;
  showProgress.value = true;
  progressValue.value = 0;
  progressMessage.value = '강의 정보를 준비하는 중...';

  try {
    // 1. 강의 ID 생성
    const courseId = generateCourseId();
    progressValue.value = 0.2;
    progressMessage.value = '파일을 업로드하는 중...';

    // 2. 파일 업로드 (실제로는 서버에 업로드)
    const uploadPromises = fileList.value.map(async (file, index) => {
      const fileName = `slide-${Math.floor(index / 10)}-${index % 10}.md`;
      // 여기서 실제 파일 업로드 로직 구현
      return { originalName: file.name, fileName };
    });

    const uploadedFiles = await Promise.all(uploadPromises);
    progressValue.value = 0.5;
    progressMessage.value = 'HTML 변환 중...';

    // 3. HTML 변환 (실제로는 서버에서 처리)
    await simulateHtmlConversion(courseId);
    progressValue.value = 0.8;
    progressMessage.value = '강의 정보를 저장하는 중...';

    // 4. 강의 정보 저장
    const courseInfo = {
      id: courseId,
      title: courseTitle.value,
      description: courseDescription.value,
      author: courseAuthor.value,
      files: uploadedFiles,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // 실제로는 서버에 저장
    console.log('강의 정보:', courseInfo);

    progressValue.value = 1;
    progressMessage.value = '완료!';

    // 성공 메시지
    $q.notify({
      type: 'positive',
      message: '강의가 성공적으로 생성되었습니다!',
      position: 'top',
    });

    // 완료 후 이벤트 발생
    setTimeout(() => {
      showProgress.value = false;
      isImporting.value = false;
      emit('success', courseId);
    }, 1000);
  } catch (error) {
    console.error('강의 생성 실패:', error);
    $q.notify({
      type: 'negative',
      message: '강의 생성에 실패했습니다.',
      position: 'top',
    });
    showProgress.value = false;
    isImporting.value = false;
  }
};

const generateCourseId = (): string => {
  return 'course-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
};

const simulateHtmlConversion = async (courseId: string): Promise<void> => {
  // 실제로는 서버에서 HTML 변환 처리
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`HTML 변환 완료: ${courseId}`);
      resolve();
    }, 2000);
  });
};

// Watch for file changes
watch(
  fileList,
  () => {
    generatePreview();
  },
  { deep: true },
);
</script>

<style scoped>
.course-import {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.import-card {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.course-info {
  margin-bottom: 30px;
}

.file-upload {
  margin-bottom: 30px;
}

.file-list {
  max-height: 300px;
  overflow-y: auto;
}

.preview-section {
  border-top: 1px solid #e0e0e0;
  padding-top: 20px;
}

.preview-content {
  max-height: 200px;
  overflow-y: auto;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 4px;
}

.preview-content :deep(h1),
.preview-content :deep(h2),
.preview-content :deep(h3) {
  margin-top: 0;
  color: #1976d2;
}

.preview-content :deep(p) {
  margin: 8px 0;
}
</style>
