<template>
  <q-card class="smart-toc-card">
    <q-card-section class="toc-header">
      <div class="row items-center justify-between">
        <div class="col">
          <h6 class="q-my-none text-weight-bold">📚 스마트 목차</h6>
          <div class="text-caption text-grey-6">
            총 {{ smartTOC?.totalSlides || 0 }}개 슬라이드 · {{ smartTOC?.totalDuration || 0 }}분
          </div>
        </div>
        <div class="col-auto">
          <q-btn
            icon="refresh"
            size="sm"
            flat
            round
            @click="() => refreshTOC(true)"
            :loading="loading"
            color="primary"
          >
            <q-tooltip>목차 새로고침</q-tooltip>
          </q-btn>
        </div>
      </div>
      
      <!-- 검색 바 -->
      <q-input
        v-model="searchQuery"
        placeholder="슬라이드 검색..."
        outlined
        dense
        class="q-mt-md"
        clearable
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
      
      <!-- 진행률 표시 -->
      <div v-if="overallProgress > 0" class="q-mt-md">
        <div class="text-caption text-grey-6 q-mb-xs">
          전체 진행률: {{ Math.round(overallProgress) }}%
        </div>
        <q-linear-progress
          :value="overallProgress / 100"
          color="positive"
          size="8px"
          rounded
        />
      </div>
    </q-card-section>

    <q-separator />

    <!-- 검색 결과 -->
    <div v-if="searchQuery && searchResults.length > 0" class="search-results">
      <q-card-section>
        <div class="text-subtitle2 text-weight-medium q-mb-sm">
          🔍 검색 결과 ({{ searchResults.length }}개)
        </div>
        <div
          v-for="slide in searchResults"
          :key="slide.id"
          class="search-result-item"
          @click="navigateToSlide(slide.section, slide.slide)"
        >
          <div class="row items-center">
            <div class="col">
              <div class="text-body2 text-weight-medium">{{ slide.title }}</div>
              <div class="text-caption text-grey-6">
                {{ getSectionTitle(slide.section) }} · {{ slide.duration }}분
              </div>
              <div class="keywords q-mt-xs">
                <q-chip
                  v-for="keyword in slide.keywords.slice(0, 3)"
                  :key="keyword"
                  size="xs"
                  color="blue-1"
                  text-color="primary"
                  :label="keyword"
                />
              </div>
            </div>
            <div class="col-auto">
              <q-icon
                :name="getSlideTypeIcon(slide.type)"
                :color="getSlideTypeColor(slide.type)"
                size="sm"
              />
            </div>
          </div>
        </div>
      </q-card-section>
      <q-separator />
    </div>

    <!-- 목차 섹션들 -->
    <q-list v-if="!searchQuery" separator>
      <template v-for="section in smartTOC?.sections" :key="section.id">
        <!-- 섹션 헤더 -->
        <q-expansion-item
          :model-value="expandedSections.includes(section.id)"
          @update:model-value="(val) => toggleSection(section.id, val)"
          :label="section.title"
          :caption="section.description"
          header-class="section-header"
        >
          <template v-slot:header>
            <div class="full-width row items-center">
              <div class="col">
                <div class="row items-center q-gutter-sm">
                  <q-icon :name="section.icon" color="primary" />
                  <div>
                    <div class="text-subtitle2 text-weight-medium">{{ section.title }}</div>
                    <div class="text-caption text-grey-6">{{ section.description }}</div>
                  </div>
                </div>
              </div>
              <div class="col-auto">
                <div class="text-caption text-grey-6">
                  {{ section.completedSlides }}/{{ section.slides.length }}
                </div>
                <q-linear-progress
                  :value="section.completedSlides / section.slides.length"
                  color="positive"
                  size="4px"
                  rounded
                  class="q-mt-xs"
                  style="width: 60px;"
                />
              </div>
            </div>
          </template>

          <!-- 섹션 내 슬라이드들 -->
          <q-list>
            <q-item
              v-for="slide in section.slides"
              :key="slide.id"
              clickable
              @click="navigateToSlide(slide.section, slide.slide)"
              :class="{
                'current-slide': isCurrentSlide(slide.section, slide.slide),
                'completed-slide': slide.completed
              }"
              class="slide-item"
            >
              <q-item-section avatar>
                <q-avatar
                  :color="getSlideTypeColor(slide.type)"
                  :text-color="slide.completed ? 'white' : 'grey-8'"
                  size="sm"
                >
                  <q-icon
                    :name="slide.completed ? 'check' : getSlideTypeIcon(slide.type)"
                    size="xs"
                  />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label
                  :class="{
                    'text-weight-bold': isCurrentSlide(slide.section, slide.slide),
                    'text-grey-6': slide.completed
                  }"
                >
                  {{ slide.title }}
                </q-item-label>
                <q-item-label caption>
                  <span class="slide-meta">
                    {{ slide.duration }}분
                    <span v-if="slide.keywords.length > 0" class="q-ml-sm">
                      · {{ slide.keywords.slice(0, 2).join(', ') }}
                    </span>
                  </span>
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <div class="slide-actions">
                  <q-btn
                    icon="play_arrow"
                    flat
                    dense
                    size="sm"
                    @click.stop="navigateToSlide(slide.section, slide.slide)"
                  >
                    <q-tooltip>슬라이드로 이동</q-tooltip>
                  </q-btn>
                  <q-btn
                    :icon="slide.completed ? 'check_circle' : 'radio_button_unchecked'"
                    flat
                    dense
                    size="sm"
                    :color="slide.completed ? 'positive' : 'grey'"
                    @click.stop="toggleSlideCompletion(slide)"
                  >
                    <q-tooltip>
                      {{ slide.completed ? '완료 해제' : '완료 표시' }}
                    </q-tooltip>
                  </q-btn>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
      </template>
    </q-list>

    <!-- 로딩 상태 -->
    <q-card-section v-if="loading" class="text-center">
      <q-spinner color="primary" size="2em" />
      <div class="text-caption text-grey-6 q-mt-sm">목차를 생성하는 중...</div>
    </q-card-section>

    <!-- 에러 상태 -->
    <q-card-section v-if="error" class="text-center">
      <q-icon name="error" color="negative" size="2em" />
      <div class="text-caption text-negative q-mt-sm">{{ error }}</div>
      <q-btn
        label="다시 시도"
        color="primary"
        flat
        class="q-mt-sm"
        @click="() => refreshTOC(true)"
      />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useQuasar } from 'quasar';
import {
  type SmartTOC,
  type SmartSlide,
  type SlideType,
  TOCCacheManager,
  searchTOC,
  updateSlideProgress
} from '../utils/smartTOC';

interface Props {
  currentSection: number;
  currentSlide: number;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  navigateToSlide: [section: number, slide: number];
}>();

const $q = useQuasar();

// 상태
const smartTOC = ref<SmartTOC | null>(null);
const loading = ref(false);
const error = ref('');
const searchQuery = ref('');
const expandedSections = ref<string[]>(['0']); // 기본적으로 첫 번째 섹션 열기

// 캐시 매니저
const tocCache = TOCCacheManager.getInstance();

// 검색 결과
const searchResults = computed(() => {
  if (!searchQuery.value || !smartTOC.value) return [];
  return searchTOC(smartTOC.value, searchQuery.value);
});

// 전체 진행률
const overallProgress = computed(() => {
  if (!smartTOC.value) return 0;
  const totalSlides = smartTOC.value.totalSlides;
  const completedSlides = smartTOC.value.sections.reduce(
    (sum, section) => sum + section.completedSlides,
    0
  );
  return totalSlides > 0 ? (completedSlides / totalSlides) * 100 : 0;
});

// 메서드
const refreshTOC = async (forceRefresh: boolean = false) => {
  loading.value = true;
  error.value = '';
  
  try {
    console.log('🔄 목차 새로고침 시작...', { forceRefresh });
    
    // 캐시 무효화 (강제 새로고침인 경우)
    if (forceRefresh) {
      tocCache.invalidateCache();
      console.log('🗑️ 캐시 무효화 완료');
    }
    
    smartTOC.value = await tocCache.getTOC(forceRefresh);
    console.log('✅ 목차 업데이트 완료:', {
      sections: smartTOC.value.sections.length,
      totalSlides: smartTOC.value.totalSlides
    });
    
    // 새로 추가된 슬라이드 확인 (slide-8-7 등)
    const allSlides = smartTOC.value.sections.flatMap(s => s.slides);
    const slide87 = allSlides.find(s => s.id === '8-7');
    if (slide87) {
      console.log('✅ slide-8-7 발견됨:', slide87.title);
    }
    
    $q.notify({
      type: 'positive',
      message: `목차가 업데이트되었습니다 (총 ${smartTOC.value.totalSlides}개 슬라이드)`,
      position: 'top',
      timeout: 2000,
      icon: 'check_circle'
    });
  } catch (err) {
    error.value = '목차를 불러오는데 실패했습니다';
    console.error('❌ 목차 로드 실패:', err);
    
    $q.notify({
      type: 'negative',
      message: '목차 로드에 실패했습니다. 네트워크를 확인해주세요.',
      position: 'top',
      timeout: 3000,
      icon: 'error',
      actions: [{
        label: '다시 시도',
        color: 'white',
        handler: () => refreshTOC(true)
      }]
    });
  } finally {
    loading.value = false;
  }
};

const navigateToSlide = (section: number, slide: number) => {
  emit('navigateToSlide', section, slide);
};

const isCurrentSlide = (section: number, slide: number) => {
  const isCurrent = props.currentSection === section && props.currentSlide === slide;
  console.log('🔍 isCurrentSlide 검사:', {
    section,
    slide,
    propsCurrentSection: props.currentSection,
    propsCurrentSlide: props.currentSlide,
    isCurrent
  });
  return isCurrent;
};

const toggleSection = (sectionId: string, expanded: boolean) => {
  if (expanded) {
    if (!expandedSections.value.includes(sectionId)) {
      expandedSections.value.push(sectionId);
    }
  } else {
    expandedSections.value = expandedSections.value.filter(id => id !== sectionId);
  }
};

const toggleSlideCompletion = (slide: SmartSlide) => {
  slide.completed = !slide.completed;
  updateSlideProgress(slide.id, slide.completed);
  
  // 섹션 완료 슬라이드 수 업데이트
  if (smartTOC.value) {
    const section = smartTOC.value.sections.find(s => s.id === slide.section.toString());
    if (section) {
      section.completedSlides = section.slides.filter(s => s.completed).length;
    }
  }
  
  $q.notify({
    type: slide.completed ? 'positive' : 'info',
    message: slide.completed ? '완료 표시했습니다' : '완료를 해제했습니다',
    position: 'top',
    timeout: 1500,
    icon: slide.completed ? 'check_circle' : 'radio_button_unchecked'
  });
};

const getSectionTitle = (sectionNum: number): string => {
  if (!smartTOC.value) return `섹션 ${sectionNum}`;
  const section = smartTOC.value.sections.find(s => s.id === sectionNum.toString());
  return section?.title || `섹션 ${sectionNum}`;
};

const getSlideTypeIcon = (type: SlideType): string => {
  const icons = {
    title: 'title',
    section: 'folder',
    toc: 'list',
    content: 'article',
    interactive: 'quiz',
    stats: 'bar_chart',
    quote: 'format_quote'
  };
  return icons[type] || 'article';
};

const getSlideTypeColor = (type: SlideType): string => {
  const colors = {
    title: 'purple',
    section: 'primary',
    toc: 'blue',
    content: 'grey',
    interactive: 'orange',
    stats: 'green',
    quote: 'pink'
  };
  return colors[type] || 'grey';
};

// 현재 슬라이드가 변경될 때 해당 섹션 자동 확장
watch(
  () => props.currentSection,
  (newSection) => {
    const sectionId = newSection.toString();
    if (!expandedSections.value.includes(sectionId)) {
      expandedSections.value.push(sectionId);
    }
  }
);

// 컴포넌트 마운트시 목차 로드
onMounted(() => {
  console.log('🚀 SmartTOC 컴포넌트 마운트됨');
  console.log('🔍 Props 값 확인:', {
    currentSection: props.currentSection,
    currentSlide: props.currentSlide
  });
  refreshTOC(false);
});

// 개발 모드에서 전역 함수로 노출 (디버깅용)
if (process.env.NODE_ENV === 'development') {
  (window as any).debugTOC = {
    refreshTOC: () => refreshTOC(true),
    getTOCData: () => smartTOC.value,
    clearCache: () => tocCache.invalidateCache()
  };
}
</script>

<style>
/* 전역 스타일 - current-slide 밑줄 강제 적용 */
.current-slide * {
  border-bottom: 3px solid #1976d2 !important;
  padding-bottom: 2px !important;
}

.current-slide {
  border: 2px solid #ff0000 !important; /* 디버깅용 빨간 테두리 */
}
</style>

<style scoped>
.smart-toc-card {
  height: 100%;
  overflow-y: auto;
  background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* 스크롤바 스타일링 */
.smart-toc-card::-webkit-scrollbar {
  width: 6px;
}

.smart-toc-card::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.smart-toc-card::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #1976d2, #42a5f5);
  border-radius: 3px;
}

.smart-toc-card::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #0d47a1, #1976d2);
}

.toc-header {
  position: sticky;
  top: 0;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  z-index: 1;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.section-header {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-left: 5px solid var(--q-primary);
  border-radius: 8px 0 0 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.section-header:hover {
  background: linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
  transform: translateX(2px);
}

.section-header .q-item__section--main {
  font-weight: 600;
  color: #1976d2;
}

.section-header .q-expansion-item__toggle-icon {
  color: var(--q-primary);
  font-weight: bold;
}

.slide-item {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 6px;
  margin: 2px 0;
  position: relative;
}

.slide-item:hover:not(.current-slide) {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  transform: translateX(1px);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  border-left: 2px solid #dee2e6;
}

.slide-item:hover:not(.current-slide) .q-item__label {
  color: #1976d2;
  font-weight: 500;
}

.slide-item:active {
  transform: translateX(1px);
  transition: all 0.1s ease;
}

.current-slide {
  background: rgba(25, 118, 210, 0.08) !important;
  border-left: 4px solid #1976d2 !important;
  border-radius: 6px !important;
  color: inherit !important;
  box-shadow: none !important;
  transform: none !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  margin: 2px 0 !important;
  position: relative !important;
}

.current-slide::before {
  content: '' !important;
  position: absolute !important;
  left: 0 !important;
  top: 0 !important;
  bottom: 0 !important;
  width: 4px !important;
  background: linear-gradient(180deg, #1976d2 0%, #42a5f5 100%) !important;
  border-radius: 0 2px 2px 0 !important;
}

.current-slide .q-item__section .q-item__label,
.current-slide .q-item__label,
.current-slide [class*="q-item__label"] {
  color: #1976d2 !important;
  font-weight: 800 !important;
  text-shadow: none !important;
  font-size: 1.05em !important;
  position: relative !important;
  display: inline-block !important;
  border-bottom: 3px solid #1976d2 !important;
  padding-bottom: 2px !important;
}

.current-slide .q-item__section .q-item__label::after,
.current-slide .q-item__label::after,
.current-slide [class*="q-item__label"]::after {
  content: '' !important;
  position: absolute !important;
  left: 0 !important;
  bottom: -2px !important;
  width: 100% !important;
  height: 3px !important;
  background: #1976d2 !important;
  border-radius: 1.5px !important;
  display: block !important;
}

/* 추가적인 선택자들 */
.current-slide .text-body2,
.current-slide .text-subtitle2 {
  position: relative !important;
  display: inline-block !important;
  border-bottom: 3px solid #1976d2 !important;
  padding-bottom: 2px !important;
}

.current-slide .text-body2::after,
.current-slide .text-subtitle2::after {
  content: '' !important;
  position: absolute !important;
  left: 0 !important;
  bottom: -2px !important;
  width: 100% !important;
  height: 3px !important;
  background: #1976d2 !important;
  border-radius: 1.5px !important;
  display: block !important;
}

.current-slide .q-item__label--caption {
  color: #555 !important;
  font-weight: 600 !important;
  font-size: 0.9em !important;
}

.current-slide .q-avatar {
  background: #1976d2 !important;
  color: white !important;
  border: 3px solid #1976d2 !important;
  box-shadow: 0 3px 8px rgba(25, 118, 210, 0.4) !important;
  transform: scale(1.1) !important;
}

.current-slide .q-btn {
  color: #1976d2 !important;
  font-weight: 600 !important;
}

.current-slide .q-btn:hover {
  background: rgba(25, 118, 210, 0.15) !important;
  color: #1976d2 !important;
}

.completed-slide:not(.current-slide) {
  background: linear-gradient(135deg, #f1f8e9 0%, #e8f5e8 100%);
  border-left: 3px solid #4caf50;
}

.completed-slide:not(.current-slide):hover {
  background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
  transform: translateX(2px);
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.2);
}

.completed-slide:not(.current-slide) .q-item__label {
  color: #2e7d32;
  text-decoration: line-through;
  opacity: 0.8;
}

.completed-slide:not(.current-slide) .q-avatar {
  background: #4caf50 !important;
  color: white !important;
}

.slide-actions {
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: all 0.3s ease;
  transform: translateX(10px);
}

.slide-item:hover .slide-actions {
  opacity: 1;
  transform: translateX(0px);
}

.current-slide .slide-actions {
  opacity: 1;
  transform: translateX(0px);
}

/* 프로그레스 바 개선 */
.q-linear-progress {
  border-radius: 4px;
  overflow: hidden;
}

.q-linear-progress__track {
  background: rgba(0, 0, 0, 0.1);
}

/* 키워드 칩 스타일 개선 */
.keywords .q-chip {
  font-size: 0.7rem;
  height: 20px;
  border-radius: 10px;
  transition: all 0.2s ease;
}

.keywords .q-chip:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-result-item {
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
}

.search-result-item:hover {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  border-color: var(--q-primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.2);
}

.search-result-item:active {
  transform: translateY(0px);
  transition: all 0.1s ease;
}

.keywords {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.slide-meta {
  font-size: 0.75em;
  color: #666;
}

.search-results {
  max-height: 300px;
  overflow-y: auto;
  border-radius: 8px;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border: 1px solid #e0e0e0;
  margin-top: 8px;
}

/* 검색 결과 스크롤바 */
.search-results::-webkit-scrollbar {
  width: 4px;
}

.search-results::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.search-results::-webkit-scrollbar-thumb {
  background: #c0c0c0;
  border-radius: 2px;
}

.search-results::-webkit-scrollbar-thumb:hover {
  background: #a0a0a0;
}
</style>
