<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { Chart, registerables } from 'chart.js';

// Chart.js 등록
Chart.register(...registerables);

const chartCanvas = ref<HTMLCanvasElement>();
let chart: Chart | null = null;

const chartData = {
  labels: [
    'AI 사용 경험 목회자',
    '자료 확보 목적 사용',
    '설교문 작성 목적 사용',
    '실제 설교에 AI 활용',
    '향후 AI 활용 전망',
    '본인 의향',
    '교인 반응 부정적',
  ],
  datasets: [
    {
      label: '비율 (%)',
      data: [47, 87, 29, 20, 79, 46, 60],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)',
        'rgba(199, 199, 199, 0.8)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(199, 199, 199, 1)',
      ],
      borderWidth: 2,
      borderRadius: 8,
      borderSkipped: false,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: '목회자의 AI 사용 현황',
      color: '#ffffff',
      font: {
        size: 18,
        weight: 'bold' as const,
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      borderColor: '#ffffff',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: false,
      callbacks: {
        label: function (context: any) {
          return `${context.parsed.y}%`;
        },
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#ffffff',
        font: {
          size: 12,
        },
        maxRotation: 45,
        minRotation: 45,
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
    },
    y: {
      beginAtZero: true,
      max: 100,
      ticks: {
        color: '#ffffff',
        font: {
          size: 12,
        },
        callback: function (value: any) {
          return value + '%';
        },
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
    },
  },
};

// 차트 초기화 함수
const initChart = async () => {
  await nextTick();

  if (chartCanvas.value) {
    const ctx = chartCanvas.value.getContext('2d');
    if (ctx) {
      // 기존 차트가 있다면 제거
      if (chart) {
        chart.destroy();
        chart = null;
      }

      // 캔버스 크기 설정
      chartCanvas.value.width = chartCanvas.value.offsetWidth;
      chartCanvas.value.height = chartCanvas.value.offsetHeight;

      chart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: chartOptions,
      });

      console.log('📊 차트 렌더링 완료', {
        canvasWidth: chartCanvas.value.width,
        canvasHeight: chartCanvas.value.height,
        containerWidth: chartCanvas.value.offsetWidth,
        containerHeight: chartCanvas.value.offsetHeight,
      });
    } else {
      console.error('❌ 차트 컨텍스트를 가져올 수 없습니다');
    }
  } else {
    console.error('❌ 차트 캔버스를 찾을 수 없습니다');
  }
};

onMounted(async () => {
  // DOM이 완전히 렌더링될 때까지 잠시 대기
  setTimeout(async () => {
    await initChart();
  }, 100);
});

// 컴포넌트가 다시 마운트될 때 차트 재초기화
watch(
  () => chartCanvas.value,
  async (newCanvas) => {
    if (newCanvas) {
      await initChart();
    }
  },
  { immediate: true },
);

onUnmounted(() => {
  if (chart) {
    chart.destroy();
  }
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 400px;
  margin: 1rem 0;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

canvas {
  width: 100% !important;
  height: 100% !important;
  display: block !important;
  max-width: 100%;
  max-height: 100%;
}
</style>
