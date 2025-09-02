<template>
  <div class="poll-result">
    <div class="poll-header">
      <div class="title">{{ meta?.question || '투표 결과' }}</div>
    </div>
    <div v-if="!ready" class="loading">로딩 중...</div>
    <div v-else>
      <canvas ref="canvasEl"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref as vRef, onMounted, onUnmounted, watch } from 'vue';
import { getDatabase, ref, onValue } from 'firebase/database';
import { firebaseApp } from '../../services/firebase/config';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

interface PollMeta {
  question: string;
  options: Record<string, string>;
}

const props = defineProps<{ pollId: string }>();
const db = firebaseApp ? getDatabase(firebaseApp) : null;

const meta = vRef<PollMeta | null>(null);
const tally = vRef<Record<string, number>>({});
const ready = vRef(false);
const canvasEl = vRef<HTMLCanvasElement | null>(null);
let chart: Chart | null = null;
let unsubMeta: (() => void) | null = null;
let unsubVotes: (() => void) | null = null;

const getOptionKeys = (): string[] => {
  const optionKeys = meta.value && meta.value.options ? Object.keys(meta.value.options) : [];
  const voteKeys = Object.keys(tally.value || {});
  // 메타 옵션이 있으면 그것을 기준으로, 없으면 득표 키 기준
  const base = optionKeys.length > 0 ? optionKeys : voteKeys;
  // 숫자 문자열 우선 정렬, 그 외에는 알파벳 정렬
  return [...new Set(base)].sort((a, b) => {
    const na = Number(a);
    const nb = Number(b);
    const an = !isNaN(na);
    const bn = !isNaN(nb);
    if (an && bn) return na - nb;
    if (an) return -1;
    if (bn) return 1;
    return a.localeCompare(b);
  });
};

const renderChart = () => {
  if (!canvasEl.value) return;
  const ctx = canvasEl.value.getContext('2d');
  if (!ctx) return;

  const keys = getOptionKeys();
  const labels = keys.map((k) => (meta.value?.options?.[k] ? meta.value?.options?.[k] : k));
  // 모든 옵션 키에 대해 득표가 없으면 0으로 채움 → X축 라벨은 모두 표시, 막대는 득표가 있는 것만 보임(0은 높이 0)
  const data = keys.map((k) => tally.value[k] || 0);

  if (chart) {
    chart.data.labels = labels as any;
    const ds0 =
      chart.data.datasets && chart.data.datasets.length > 0 ? chart.data.datasets[0] : null;
    if (ds0) {
      (ds0.data as any) = data as any;
    } else {
      chart.data.datasets = [
        {
          label: '응답 수',
          data,
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          borderRadius: 6,
        } as any,
      ];
    }
    chart.update();
    return;
  }

  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: '응답 수',
          data,
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          borderRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, ticks: { precision: 0 } } },
    },
  });
};

onMounted(() => {
  if (!db) return;
  unsubMeta = onValue(ref(db, `polls/${props.pollId}/meta`), (s) => {
    meta.value = (s.val() as PollMeta) || null;
    ready.value = true;
    renderChart();
  });
  // votes에서 실시간 집계
  unsubVotes = onValue(ref(db, `polls/${props.pollId}/votes`), (s) => {
    const votes = (s.val() as Record<string, string>) || {};
    const counts: Record<string, number> = {};
    Object.values(votes).forEach((optId) => {
      const key = String(optId);
      counts[key] = (counts[key] || 0) + 1;
    });
    tally.value = counts;
    ready.value = true;
    renderChart();
  });
});

onUnmounted(() => {
  if (unsubMeta) unsubMeta();
  if (unsubVotes) unsubVotes();
  if (chart) chart.destroy();
});

watch([meta, tally], () => renderChart());
</script>

<style scoped>
.poll-result {
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
canvas {
  width: 100%;
  height: 280px;
}
</style>
