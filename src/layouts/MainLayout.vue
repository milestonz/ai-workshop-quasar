<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> 목회자를 위한 생성형 AI 활용 세미나 </q-toolbar-title>

        <div class="text-caption q-mr-md">
          슬라이드 {{ currentSlide + 1 }} / {{ currentLessonData?.slides || 0 }}
        </div>

        <q-btn flat round dense icon="capture" @click="handleCaptureSlide" />
        <q-btn flat round dense icon="email" @click="handleSendNotesByEmail" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-1">
      <q-scroll-area class="fit">
        <div class="q-pa-md">
          <!-- 진도율 -->
          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">학습 진도</div>
            <q-linear-progress :value="progress / 100" color="primary" class="q-mb-xs" />
            <div class="text-caption text-grey-7">{{ progress }}%</div>
          </div>

          <!-- 강의 목록 -->
          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">강의 목차</div>
            <q-list padding>
              <q-expansion-item
                v-for="(lesson, index) in lessons"
                :key="index"
                :label="lesson.title"
                :caption="`${lesson.slides}개 슬라이드`"
                :icon="lesson.completed ? 'check_circle' : 'radio_button_unchecked'"
                :default-opened="index === currentLesson"
                :class="{ 'bg-blue-1': index === currentLesson }"
                @click="setCurrentLesson(index)"
              >
                <q-list padding>
                  <q-item
                    v-for="(slideTitle, slideIndex) in lesson.slideTitles"
                    :key="slideIndex"
                    clickable
                    v-ripple
                    :active="index === currentLesson && slideIndex === currentSlide"
                    @click="selectSlide(index, slideIndex)"
                  >
                    <q-item-section avatar>
                      <q-avatar color="primary" text-color="white" size="sm">
                        {{ slideIndex + 1 }}
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-caption">{{ slideTitle }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-expansion-item>
            </q-list>
          </div>

          <!-- 현재 강의 정보 -->
          <q-separator class="q-my-md" />
          <div class="text-caption text-grey-7 q-mb-xs">현재 강의</div>
          <div class="text-body2 q-mb-xs">
            {{ currentLessonData?.title || '강의를 선택해주세요' }}
          </div>
          <div class="text-caption text-grey-7">
            슬라이드 {{ currentSlide + 1 }} / {{ currentLessonData?.slides || 0 }}
          </div>
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCourseStore } from 'src/stores/course';

const courseStore = useCourseStore();

// Computed properties
const leftDrawerOpen = computed({
  get: () => courseStore.sidebarOpen,
  set: () => courseStore.toggleSidebar(),
});

const currentLesson = computed(() => courseStore.currentLesson);
const currentSlide = computed(() => courseStore.currentSlide);
const currentLessonData = computed(() => courseStore.currentLessonData);
const lessons = computed(() => courseStore.lessons);
const progress = computed(() => courseStore.progress);

// Methods
const toggleLeftDrawer = () => {
  courseStore.toggleSidebar();
};

const setCurrentLesson = (index: number) => {
  courseStore.setCurrentLesson(index);
};

const selectSlide = (lessonIndex: number, slideIndex: number) => {
  courseStore.setCurrentLesson(lessonIndex);
  courseStore.setCurrentSlide(slideIndex);
};

const handleCaptureSlide = () => {
  courseStore.handleCaptureSlide();
};

const handleSendNotesByEmail = () => {
  courseStore.handleSendNotesByEmail();
};
</script>
