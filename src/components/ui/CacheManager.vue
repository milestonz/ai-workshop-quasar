<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card style="min-width: 400px">
      <q-card-section>
        <div class="text-h6">캐시 관리</div>
        <div class="text-subtitle2">Service Worker 캐시 상태 및 관리</div>
      </q-card-section>

      <q-card-section>
        <!-- 캐시 상태 표시 -->
        <div v-if="cacheStatus" class="q-mb-md">
          <div class="text-subtitle1 q-mb-sm">📊 캐시 상태</div>
          <div v-for="(count, cacheName) in cacheStatus" :key="cacheName" class="row q-mb-xs">
            <div class="col-6">{{ getCacheDisplayName(cacheName) }}</div>
            <div class="col-6 text-right">{{ count }}개 항목</div>
          </div>
        </div>

        <!-- 로딩 상태 -->
        <div v-else-if="loading" class="text-center q-py-md">
          <q-spinner-dots size="40px" color="primary" />
          <div class="q-mt-sm">캐시 상태 확인 중...</div>
        </div>

        <!-- 오류 상태 -->
        <div v-else-if="error" class="text-negative q-py-md">
          <q-icon name="error" size="20px" class="q-mr-sm" />
          {{ error }}
        </div>
      </q-card-section>

      <q-card-section>
        <div class="text-subtitle1 q-mb-sm">🛠️ 캐시 관리</div>

        <div class="q-gutter-sm">
          <q-btn
            @click="refreshCacheStatus"
            :loading="loading"
            color="primary"
            outline
            icon="refresh"
            label="상태 새로고침"
            class="full-width"
          />

          <q-btn
            @click="clearSlideCache"
            :loading="clearingSlideCache"
            color="orange"
            outline
            icon="delete_sweep"
            label="슬라이드 캐시 삭제"
            class="full-width"
          />

          <q-btn
            @click="clearAllCaches"
            :loading="clearingAllCaches"
            color="negative"
            outline
            icon="clear_all"
            label="모든 캐시 삭제"
            class="full-width"
          />
        </div>
      </q-card-section>

      <q-card-section>
        <div class="text-subtitle1 q-mb-sm">ℹ️ 정보</div>
        <div class="text-caption">
          • <strong>슬라이드 캐시:</strong> HTML 슬라이드 파일들의 캐시<br />
          • <strong>정적 자산 캐시:</strong> CSS, JS, 이미지 등의 캐시<br />
          • 캐시 삭제 후 페이지를 새로고침하면 다시 캐싱됩니다
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="닫기" color="primary" @click="closeDialog" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { serviceWorkerManager } from 'src/utils/serviceWorker';
import { QDialog, QCard, QCardSection, QCardActions, QBtn, QSpinnerDots, QIcon } from 'quasar';

interface Props {
  modelValue: boolean;
}

interface CacheStatus {
  [cacheName: string]: number;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const showDialog = ref(props.modelValue);
const cacheStatus = ref<CacheStatus | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);
const clearingSlideCache = ref(false);
const clearingAllCaches = ref(false);

// 캐시 이름을 사용자 친화적으로 변환
const getCacheDisplayName = (cacheName: string | number): string => {
  const names: { [key: string]: string } = {
    'ai-workshop-static-v1.0.0': '정적 자산',
    'ai-workshop-slides-v1.0.0': '슬라이드 파일',
    'ai-workshop-v1.0.0': '전체 캐시',
  };
  return names[String(cacheName)] || String(cacheName);
};

// 캐시 상태 새로고침
const refreshCacheStatus = async () => {
  loading.value = true;
  error.value = null;

  try {
    const status = await serviceWorkerManager.getCacheStatus();
    cacheStatus.value = status;
  } catch (err) {
    error.value = '캐시 상태를 가져올 수 없습니다.';
    console.error('캐시 상태 조회 실패:', err);
  } finally {
    loading.value = false;
  }
};

// 슬라이드 캐시 삭제
const clearSlideCache = async () => {
  clearingSlideCache.value = true;

  try {
    await serviceWorkerManager.clearSlideCache();
    await refreshCacheStatus();

    // 성공 메시지 표시
    if (typeof window !== 'undefined' && (window as any).$q) {
      (window as any).$q.notify({
        type: 'positive',
        message: '슬라이드 캐시가 삭제되었습니다.',
        timeout: 2000,
      });
    }
  } catch (err) {
    console.error('슬라이드 캐시 삭제 실패:', err);
    if (typeof window !== 'undefined' && (window as any).$q) {
      (window as any).$q.notify({
        type: 'negative',
        message: '슬라이드 캐시 삭제에 실패했습니다.',
        timeout: 3000,
      });
    }
  } finally {
    clearingSlideCache.value = false;
  }
};

// 모든 캐시 삭제
const clearAllCaches = async () => {
  clearingAllCaches.value = true;

  try {
    await serviceWorkerManager.clearAllCaches();
    await refreshCacheStatus();

    // 성공 메시지 표시
    if (typeof window !== 'undefined' && (window as any).$q) {
      (window as any).$q.notify({
        type: 'positive',
        message: '모든 캐시가 삭제되었습니다.',
        timeout: 2000,
      });
    }
  } catch (err) {
    console.error('캐시 삭제 실패:', err);
    if (typeof window !== 'undefined' && (window as any).$q) {
      (window as any).$q.notify({
        type: 'negative',
        message: '캐시 삭제에 실패했습니다.',
        timeout: 3000,
      });
    }
  } finally {
    clearingAllCaches.value = false;
  }
};

// 다이얼로그 닫기
const closeDialog = () => {
  showDialog.value = false;
  emit('update:modelValue', false);
};

// 다이얼로그가 열릴 때 캐시 상태 조회
onMounted(() => {
  if (showDialog.value) {
    refreshCacheStatus();
  }
});

// props 변경 감지
watch(
  () => props.modelValue,
  (newValue: boolean) => {
    showDialog.value = newValue;
    if (newValue) {
      refreshCacheStatus();
    }
  },
);

// showDialog 변경 감지
watch(showDialog, (newValue: boolean) => {
  emit('update:modelValue', newValue);
});
</script>

<style scoped>
.q-card {
  max-width: 500px;
}

.text-subtitle1 {
  font-weight: 600;
}

.text-subtitle2 {
  opacity: 0.8;
}

.row {
  padding: 4px 0;
}

.text-caption {
  line-height: 1.4;
}
</style>
