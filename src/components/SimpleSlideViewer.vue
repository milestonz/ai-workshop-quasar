<template>
  <div class="simple-slide-viewer">
    <div v-if="error" class="error">
      <q-icon name="error" size="50px" color="negative" />
      <p>{{ error }}</p>
    </div>
    <div v-else-if="slideUrl" class="slide-iframe-container">
      <iframe :src="slideUrl" class="slide-iframe" @load="onIframeLoad"></iframe>
    </div>
    <div v-else class="no-content">
      <q-icon name="slideshow" size="50px" color="grey" />
      <p>표시할 슬라이드가 없습니다.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';

interface Props {
  slideNumber: string; // e.g., '0-0', '1-2'
}

const props = defineProps<Props>();

const error = ref('');
const isLoading = ref(false);

const slideUrl = computed(() => {
  if (!props.slideNumber) return '';
  // e.g., /generated/slides/slide-0-0.html
  return `/generated/slides/slide-${props.slideNumber}.html`;
});

const onIframeLoad = () => {
  isLoading.value = false;
  console.log(`✅ iframe 로드 완료: ${slideUrl.value}`);
};

watch(() => props.slideNumber, (newSlideNumber) => {
  if (newSlideNumber) {
    isLoading.value = true;
    error.value = '';
    console.log(`🔄 iframe URL 변경: ${slideUrl.value}`);
  }
}, { immediate: true });

</script>

<style scoped>
.simple-slide-viewer {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: #fff;
}
.slide-iframe-container {
  width: 100%;
  height: 100%;
}
.slide-iframe {
  width: 100%;
  height: 100%;
  border: none;
}
.error,
.no-content {
  text-align: center;
  padding: 20px;
}
</style>
