<template>
  <div class="poll-word">
    <div class="title">{{ meta?.question || '투표 결과' }}</div>
    <div v-if="!ready" class="loading">로딩 중...</div>
    <div v-else class="cloud">
      <span
        v-for="(label, optionId) in meta?.options || {}"
        :key="optionId"
        class="word"
        :style="getStyle(tally[optionId] || 0)"
      >
        {{ label }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref as vRef, onMounted, onUnmounted, computed } from 'vue';
import { getDatabase, ref, onValue } from 'firebase/database';
import { firebaseApp } from '../../services/firebase/config';

interface PollMeta {
  question: string;
  options: Record<string, string>;
}

const props = defineProps<{ pollId: string }>();
const db = firebaseApp ? getDatabase(firebaseApp) : null;
const meta = vRef<PollMeta | null>(null);
const tally = vRef<Record<string, number>>({});
const ready = vRef(false);
let unsubMeta: (() => void) | null = null;
let unsubTally: (() => void) | null = null;

onMounted(() => {
  if (!db) return;
  unsubMeta = onValue(ref(db, `polls/${props.pollId}/meta`), (s) => {
    meta.value = (s.val() as PollMeta) || null;
    ready.value = true;
  });
  unsubTally = onValue(ref(db, `polls/${props.pollId}/tally`), (s) => {
    tally.value = (s.val() as any) || {};
  });
});

onUnmounted(() => {
  if (unsubMeta) unsubMeta();
  if (unsubTally) unsubTally();
});

const maxCount = computed(() => {
  const vals = Object.values(tally.value || {});
  return vals.length ? Math.max(...vals) : 0;
});

const getStyle = (count: number) => {
  const min = 12,
    max = 36;
  const m = maxCount.value || 1;
  const size = Math.round(min + (max - min) * (count / m));
  const opacity = 0.5 + 0.5 * (count / m);
  const hue = 210; // 파란 톤
  return {
    fontSize: size + 'px',
    opacity: opacity.toFixed(2),
    color: `hsl(${hue}, 70%, ${Math.round(30 + 30 * (count / m))}%)`,
  } as any;
};
</script>

<style scoped>
.poll-word {
  min-width: 320px;
}
.title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 8px;
}
.loading {
  color: #666;
}
.cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  align-items: center;
}
.word {
  font-weight: 700;
}
</style>
