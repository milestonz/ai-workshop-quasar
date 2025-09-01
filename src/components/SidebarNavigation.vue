<template>
  <q-drawer
    v-model="leftDrawerOpen"
    show-if-above
    bordered
    class="bg-grey-1 sidebar-drawer"
    :width="320"
  >
    <q-scroll-area class="fit">
      <div class="q-pa-md">
        <!-- 사용자 정보 섹션 -->
        <div v-if="isAuthenticated" class="user-info-section q-mb-md">
          <div class="text-h6 text-primary q-mb-sm">
            <q-icon name="person" class="q-mr-xs" />
            {{ user?.name || '사용자' }}
          </div>
          <div class="text-caption text-grey-7">
            {{ user?.email }}
          </div>
          <div class="text-caption text-grey-7">
            역할: {{ userRole === 'admin' ? '관리자' : '일반 사용자' }}
          </div>
        </div>

        <!-- 게스트 사용자 정보 섹션 -->
        <div v-else-if="isGuestAuthenticated && isGuestInfoRegistered" class="user-info-section q-mb-md">
          <div class="text-h6 text-primary q-mb-sm">
            <q-icon name="person" class="q-mr-xs" />
            {{ guestUser?.name || '게스트' }}
          </div>
          <div class="text-caption text-grey-7">
            게스트 모드
          </div>
        </div>

        <!-- 목차 섹션 -->
        <div class="toc-section">
          <div class="text-h6 text-primary q-mb-sm">
            <q-icon name="list" class="q-mr-xs" />
            목차
          </div>
          
          <q-list dense>
            <q-expansion-item
              v-for="chapter in courseOutline"
              :key="chapter.id"
              :label="chapter.title"
              :default-opened="chapter.id === 1"
              class="chapter-item"
            >
              <template v-slot:header>
                <q-item-section>
                  <q-item-label class="chapter-title">{{ chapter.title }}</q-item-label>
                  <q-item-label caption class="chapter-description">
                    {{ chapter.description }}
                  </q-item-label>
                </q-item-section>
              </template>

              <q-list dense>
                <q-item
                  v-for="slide in chapter.slides"
                  :key="slide.id"
                  clickable
                  v-ripple
                  @click="navigateToSlide(slide.id)"
                  :class="{ 'active-slide': currentSlideId === slide.id }"
                  class="slide-item"
                >
                  <q-item-section avatar>
                    <q-icon 
                      :name="getSlideIcon(slide.type)" 
                      :color="getSlideColor(slide.type)"
                      size="sm"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="slide-title">{{ slide.title }}</q-item-label>
                    <q-item-label caption class="slide-type">
                      {{ getSlideTypeLabel(slide.type) }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-expansion-item>
          </q-list>
        </div>
      </div>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCourseStore } from 'src/stores/course';
import { useAuth } from '../composables/useAuth';
import { useGuestAuth } from '../composables/useGuestAuth';

interface Props {
  leftDrawerOpen: boolean;
  currentSlideId: string;
}

interface Emits {
  (e: 'update:leftDrawerOpen', value: boolean): void;
  (e: 'navigate-to-slide', slideId: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const router = useRouter();
const courseStore = useCourseStore();
const { user, isAuthenticated, userRole } = useAuth();
const { guestUser, isGuestAuthenticated, isGuestInfoRegistered } = useGuestAuth();

const courseOutline = computed(() => courseStore.courseOutline);

const navigateToSlide = (slideId: string) => {
  emit('navigate-to-slide', slideId);
  router.push(`/slide/${slideId}`);
};

const getSlideIcon = (type: string) => {
  const iconMap: Record<string, string> = {
    cover: 'title',
    general: 'description',
    lecture: 'school',
    poll: 'poll',
    quiz: 'quiz',
    html: 'code',
    challenge: 'emoji_events',
    example: 'lightbulb',
    profile: 'person',
    timeline: 'schedule'
  };
  return iconMap[type] || 'description';
};

const getSlideColor = (type: string) => {
  const colorMap: Record<string, string> = {
    cover: 'primary',
    general: 'grey-7',
    lecture: 'blue',
    poll: 'orange',
    quiz: 'green',
    html: 'purple',
    challenge: 'amber',
    example: 'teal',
    profile: 'pink',
    timeline: 'indigo'
  };
  return colorMap[type] || 'grey-7';
};

const getSlideTypeLabel = (type: string) => {
  const labelMap: Record<string, string> = {
    cover: '표지',
    general: '일반',
    lecture: '강의',
    poll: '투표',
    quiz: '퀴즈',
    html: 'HTML',
    challenge: '도전',
    example: '예시',
    profile: '프로필',
    timeline: '타임라인'
  };
  return labelMap[type] || '일반';
};
</script>

<style scoped>
.sidebar-drawer {
  border-right: 1px solid #e0e0e0;
}

.user-info-section {
  padding: 12px;
  background: #f5f5f5;
  border-radius: 8px;
  border-left: 4px solid #1976d2;
}

.toc-section {
  margin-top: 16px;
}

.chapter-item {
  margin-bottom: 8px;
}

.chapter-title {
  font-weight: 600;
  color: #1976d2;
}

.chapter-description {
  color: #666;
  font-size: 0.85em;
}

.slide-item {
  margin-left: 16px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.slide-item:hover {
  background-color: #f0f0f0;
}

.slide-item.active-slide {
  background-color: #e3f2fd;
  border-left: 3px solid #1976d2;
}

.slide-title {
  font-size: 0.9em;
  font-weight: 500;
}

.slide-type {
  font-size: 0.75em;
  color: #888;
}
</style>
