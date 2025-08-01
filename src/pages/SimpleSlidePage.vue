<template>
  <q-page class="simple-slide-page">
    <!-- 메인 콘텐츠 -->
    <div class="main-content">
      <!-- 슬라이드 뷰어 영역 -->
      <div class="slide-viewer-container">
        <SimpleSlideViewer :slide-number="currentSlideNumber" :slide-type="currentSlideType" />
      </div>

      <!-- 네비게이션 컨트롤 -->
      <div class="navigation-controls">
        <q-btn
          :disable="currentSlideIndex === 0"
          @click="goToPreviousSlide"
          color="primary"
          icon="chevron_left"
          round
          size="lg"
          class="nav-btn"
        />

        <div class="slide-info">
          <span class="slide-counter">{{ currentSlideIndex + 1 }} / {{ totalSlides }}</span>
        </div>

        <q-btn
          :disable="currentSlideIndex === totalSlides - 1"
          @click="goToNextSlide"
          color="primary"
          icon="chevron_right"
          round
          size="lg"
          class="nav-btn"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SimpleSlideViewer from '../components/SimpleSlideViewer.vue';

// Router 인스턴스
const route = useRoute();
const router = useRouter();

// 반응형 데이터
const currentSlideIndex = ref(0);

// 슬라이드 타입에 따른 CSS 파일 이름 매핑
const slideTypeCssMap: { [key: string]: string } = {
  cover: 'cover-type.css',
  index: 'index-type.css',
  profile: 'profile-type.css',
  chapter: 'chapter-type.css',
  example: 'example-type.css',
  challenge: 'challenge-type.css',
  lecture: 'lecture-type.css',
  poll: 'poll-type.css',
  timeline: 'timeline-type.css',
  general: 'general-type.css',
};

const updateDynamicStyle = (slideType: string) => {
  const cssFileName = slideTypeCssMap[slideType] || 'general-type.css';
  const cssPath = `/css/${cssFileName}`; // 절대 경로 사용
  const styleId = 'dynamic-slide-style';

  let styleElement = document.getElementById(styleId) as HTMLLinkElement;

  if (!styleElement) {
    styleElement = document.createElement('link');
    styleElement.id = styleId;
    styleElement.rel = 'stylesheet';
    document.head.appendChild(styleElement);
  }

  if (styleElement.href !== window.location.origin + cssPath) {
    styleElement.href = cssPath;
    console.log(`🎨 동적 CSS 적용: ${cssPath}`);
  }
};

// 사전 변환된 HTML 파일 목록 (동적 로드)
const slideFiles = ref<string[]>([]);

// 계산된 속성들
const totalSlides = computed(() => slideFiles.value.length);

const currentSlideNumber = computed(() => {
  const fileName = slideFiles.value[currentSlideIndex.value];
  // slide-0-0.md -> 0-0
  return fileName ? fileName.replace('slide-', '').replace('.md', '') : '0-0';
});

const currentSlideType = computed(() => {
  // 슬라이드 번호를 기반으로 타입 추정
  const slideNum = currentSlideNumber.value;
  if (slideNum === '0-0') return 'cover';
  if (slideNum === '0-1') return 'index';
  if (slideNum === '0-2') return 'profile';
  if (slideNum.endsWith('-0')) return 'chapter';
  if (slideNum.startsWith('2-') && slideNum !== '2-0') return 'example';
  if (slideNum.startsWith('3-') && slideNum !== '3-0') return 'challenge';
  return 'lecture';
});

// 메서드들
const goToSlide = (index: number) => {
  if (index >= 0 && index < totalSlides.value) {
    currentSlideIndex.value = index;
    updateRoute();
  }
};

const goToPreviousSlide = () => {
  if (currentSlideIndex.value > 0) {
    goToSlide(currentSlideIndex.value - 1);
  }
};

const goToNextSlide = () => {
  if (currentSlideIndex.value < totalSlides.value - 1) {
    goToSlide(currentSlideIndex.value + 1);
  }
};

const updateRoute = () => {
  router.push({
    query: {
      ...route.query,
      slide: currentSlideIndex.value.toString(),
    },
  });
};

// 키보드 이벤트 처리
const handleKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault();
      goToPreviousSlide();
      break;
    case 'ArrowRight':
    case ' ':
      event.preventDefault();
      goToNextSlide();
      break;
    case 'Home':
      event.preventDefault();
      goToSlide(0);
      break;
    case 'End':
      event.preventDefault();
      goToSlide(totalSlides.value - 1);
      break;
  }
};

// 라이프사이클 훅
onMounted(async () => {
  try {
    const response = await fetch('/slides/files.json');
    if (!response.ok) {
      throw new Error('Failed to load slide list.');
    }
    const data = await response.json();
    slideFiles.value = data.files
      .filter((file: string) => file.startsWith('slide-') && file.endsWith('.md'))
      .sort((a: string, b: string) => {
        // 'slide-1-10.md' 같은 파일명을 올바르게 정렬하기 위한 로직
        const [aChapter, aSlide] = a.replace('slide-', '').replace('.md', '').split('-').map(Number);
        const [bChapter, bSlide] = b.replace('slide-', '').replace('.md', '').split('-').map(Number);
        if (aChapter !== bChapter) {
          return aChapter - bChapter;
        }
        return aSlide - bSlide;
      });

    // URL 파라미터에서 초기 슬라이드 인덱스 설정
    const slideParam = route.query.slide;
    if (slideParam) {
      const slideIndex = parseInt(slideParam as string);
      if (slideIndex >= 0 && slideIndex < totalSlides.value) {
        currentSlideIndex.value = slideIndex;
      }
    }

    // 초기 CSS 적용
    updateDynamicStyle(currentSlideType.value);

    document.addEventListener('keydown', handleKeydown);
    console.log('🚀 SimpleSlidePage 마운트됨, 슬라이드 목록 로드 완료:', slideFiles.value.length);
  } catch (error) {
    console.error('슬라이드 목록 로드 실패:', error);
  }
});

watch(currentSlideType, (newType) => {
  updateDynamicStyle(newType);
});



onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
.simple-slide-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f7fa;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
}

.slide-viewer-container {
  flex: 1;
  position: relative;
}

.navigation-controls {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 1000;
}

.nav-btn {
  width: 40px;
  height: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.slide-info {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
}

.slide-counter {
  font-size: 1.1em;
  font-weight: bold;
  color: #333;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .navigation-controls {
    bottom: 15px;
    gap: 8px;
  }

  .nav-btn {
    width: 35px;
    height: 35px;
  }

  .slide-counter {
    font-size: 0.9em;
  }
}
</style>
