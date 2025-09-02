<template>
  <q-dialog v-model="isVisible" persistent>
    <q-card style="min-width: 400px">
      <q-card-section class="row items-center">
        <q-avatar icon="edit" color="primary" text-color="white" />
        <span class="q-ml-sm text-h6">슬라이드 제목 편집</span>
      </q-card-section>

      <q-card-section>
        <div class="text-body1 q-mb-md">
          <strong>{{ lessonTitle }}</strong
          >의 <strong>{{ slideNumber }}번째 슬라이드</strong>
        </div>

        <q-input
          v-model="editedTitle"
          label="슬라이드 제목"
          outlined
          dense
          :rules="[(val) => !!val || '제목을 입력해주세요']"
          ref="titleInput"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="취소" color="grey" @click="handleCancel" />
        <q-btn
          unelevated
          label="수정"
          color="primary"
          @click="handleSave"
          :disable="!editedTitle.trim()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch } from 'vue';

interface Props {
  modelValue: boolean;
  lessonTitle: string;
  slideNumber: number;
  currentTitle: string;
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void;
  (e: 'save', newTitle: string): void;
  (e: 'cancel'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const isVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const editedTitle = ref(props.currentTitle);
const titleInput = ref<HTMLElement>();

// 다이얼로그가 열릴 때 입력 필드에 포커스
const focusInput = async () => {
  await nextTick();
  if (titleInput.value) {
    titleInput.value.focus();
  }
};

// 다이얼로그가 열릴 때마다 현재 제목으로 초기화
watch(
  () => props.modelValue,
  (newValue: boolean) => {
    if (newValue) {
      editedTitle.value = props.currentTitle;
      focusInput();
    }
  },
);

const handleSave = () => {
  if (editedTitle.value.trim()) {
    emit('save', editedTitle.value.trim());
    isVisible.value = false;
  }
};

const handleCancel = () => {
  emit('cancel');
  isVisible.value = false;
};
</script>

<style scoped>
.q-card {
  border-radius: 12px;
}
</style>
