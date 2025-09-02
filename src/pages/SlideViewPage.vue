<template>
  <q-page class="slide-view-page">
    <div class="page-container">
      <!-- 헤더 -->
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">AI 워크샵 슬라이드</h1>
          <div class="header-actions">
            <q-btn
              @click="toggleFullscreen"
              :icon="isFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              flat
              round
              color="primary"
            />
            <q-btn @click="goHome" icon="home" flat round color="primary" />
          </div>
        </div>
      </div>

      <!-- 슬라이드 뷰어 -->
      <div class="slide-viewer-container">
        <SlideViewer
          :initial-slide-id="initialSlideId"
          :auto-play="false"
          :show-navigation="true"
          @slide-change="onSlideChange"
          @slide-load="onSlideLoad"
          @slide-error="onSlideError"
          ref="slideViewerRef"
        />
      </div>

      <!-- 사이드바 (선택적) -->
      <div v-if="showSidebar" class="sidebar">
        <div class="sidebar-header">
          <h3>목차</h3>
          <q-btn @click="toggleSidebar" icon="close" flat round size="sm" />
        </div>
        <div class="sidebar-content">
          <div
            v-for="(slide, index) in slideList"
            :key="slide.id"
            class="slide-item"
            :class="{ active: currentSlideIndex === index }"
            @click="goToSlide(index)"
          >
            <div class="slide-number">{{ index + 1 }}</div>
            <div class="slide-info">
              <div class="slide-title">{{ slide.title }}</div>
              <div class="slide-meta">Chapter {{ slide.chapter }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 사이드바 토글 버튼 -->
      <q-btn
        v-if="!showSidebar"
        @click="toggleSidebar"
        icon="menu"
        class="sidebar-toggle"
        fab
        color="primary"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SlideViewer from '../components/slide/SlideViewer.vue';

// Router
const route = useRoute();
const router = useRouter();

// Reactive state
const slideViewerRef = ref();
const showSidebar = ref(false);
const isFullscreen = ref(false);
const slideList = ref<any[]>([]);
const currentSlideIndex = ref(0);

// Computed
const initialSlideId = computed(() => {
  if (route.params.id) {
    return `slide-${route.params.id}`;
  }
  return '';
});

// Methods
const loadSlideList = async () => {
  try {
    const response = await fetch('/data/slideIndex.json');
    if (response.ok) {
      const data = await response.json();
      slideList.value = data.slides || [];
    }
  } catch (error) {
    console.error('슬라이드 목록 로드 실패:', error);
  }
};

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
};

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    isFullscreen.value = true;
  } else {
    document.exitFullscreen();
    isFullscreen.value = false;
  }
};

const goHome = () => {
  router.push('/');
};

const goToSlide = (index: number) => {
  if (slideViewerRef.value) {
    slideViewerRef.value.goToSlide(index);
  }
  showSidebar.value = false;
};

// Event handlers
const onSlideChange = (slideId: string, index: number) => {
  currentSlideIndex.value = index;
  console.log('슬라이드 변경:', slideId, index);
};

const onSlideLoad = (slideId: string) => {
  console.log('슬라이드 로드 완료:', slideId);
};

const onSlideError = (error: Error) => {
  console.error('슬라이드 오류:', error);
};

// Fullscreen change handler
const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement;
};

// Lifecycle
onMounted(() => {
  loadSlideList();
  document.addEventListener('fullscreenchange', handleFullscreenChange);
});

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange);
});
</script>

<style scoped>
.slide-view-page {
  height: 100vh;
  overflow: hidden;
}

.page-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
}

.page-header {
  background: white;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
}

.page-title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1976d2;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.slide-viewer-container {
  flex: 1;
  position: relative;
}

.sidebar {
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background: white;
  border-left: 1px solid #e0e0e0;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e0e0e0;
  background: #f5f5f5;
}

.sidebar-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}

.slide-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  transition: background-color 0.2s;
  border-left: 3px solid transparent;
}

.slide-item:hover {
  background: #f0f0f0;
}

.slide-item.active {
  background: #e3f2fd;
  border-left-color: #1976d2;
}

.slide-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  margin-right: 12px;
  flex-shrink: 0;
}

.slide-item.active .slide-number {
  background: #1976d2;
  color: white;
}

.slide-info {
  flex: 1;
  min-width: 0;
}

.slide-title {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.3;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.slide-meta {
  font-size: 12px;
  color: #666;
}

.sidebar-toggle {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .sidebar {
    width: 100%;
  }

  .header-content {
    padding: 12px 16px;
  }

  .page-title {
    font-size: 18px;
  }

  .slide-item {
    padding: 10px 16px;
  }

  .slide-title {
    font-size: 13px;
  }
}

/* 다크 모드 지원 */
@media (prefers-color-scheme: dark) {
  .page-header {
    background: #1e1e1e;
    border-bottom-color: #333;
  }

  .page-title {
    color: #90caf9;
  }

  .sidebar {
    background: #1e1e1e;
    border-left-color: #333;
  }

  .sidebar-header {
    background: #2d2d2d;
    border-bottom-color: #333;
  }

  .slide-item:hover {
    background: #2d2d2d;
  }

  .slide-item.active {
    background: #1a237e;
  }
}
</style>
