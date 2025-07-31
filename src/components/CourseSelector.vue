<template>
  <div class="course-selector">
    <q-card class="selector-card">
      <q-card-section>
        <div class="text-h6">📚 강의 선택</div>
        <div class="text-subtitle2">시청할 강의를 선택하세요</div>
      </q-card-section>

      <q-card-section>
        <!-- 강의 목록 -->
        <div v-if="courses.length > 0" class="course-list">
          <q-list bordered separator>
            <q-item
              v-for="course in courses"
              :key="course.id"
              clickable
              v-ripple
              :class="{ 'selected-course': course.id === selectedCourseId }"
              @click="selectCourse(course)"
            >
              <q-item-section avatar>
                <q-icon name="school" color="primary" size="2rem" />
              </q-item-section>

              <q-item-section>
                <q-item-label class="course-title">{{ course.title }}</q-item-label>
                <q-item-label caption class="course-description">
                  {{ course.description }}
                </q-item-label>
                <q-item-label caption class="course-meta">
                  <q-icon name="person" size="xs" />
                  {{ course.author }} •
                  <q-icon name="schedule" size="xs" />
                  {{ formatDate(course.updatedAt) }} •
                  <q-icon name="description" size="xs" />
                  {{ course.files.length }}개 슬라이드
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-btn
                  flat
                  round
                  dense
                  color="primary"
                  icon="play_arrow"
                  @click.stop="startCourse(course)"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </div>

        <!-- 강의가 없을 때 -->
        <div v-else class="no-courses">
          <q-icon name="school" size="4rem" color="grey-4" />
          <div class="text-h6 text-grey-6 q-mt-md">등록된 강의가 없습니다</div>
          <div class="text-subtitle2 text-grey-5 q-mb-lg">새로운 강의를 추가해보세요</div>
          <q-btn color="primary" label="강의 추가" icon="add" @click="$emit('add-course')" />
        </div>
      </q-card-section>

      <!-- 선택된 강의 정보 -->
      <q-card-section v-if="selectedCourse" class="selected-course-info">
        <q-separator class="q-mb-md" />
        <div class="text-subtitle1 q-mb-sm">선택된 강의</div>
        <q-card flat bordered>
          <q-card-section>
            <div class="text-h6">{{ selectedCourse.title }}</div>
            <div class="text-body2 q-mt-sm">{{ selectedCourse.description }}</div>
            <div class="course-actions q-mt-md">
              <q-btn
                color="primary"
                label="강의 시작"
                icon="play_arrow"
                @click="startCourse(selectedCourse)"
                class="q-mr-sm"
              />
              <q-btn
                outline
                color="secondary"
                label="공유 링크"
                icon="share"
                @click="copyShareLink(selectedCourse)"
              />
            </div>
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useQuasar } from 'quasar';
import { useCoursesStore, type Course } from '../stores/courses';

const $q = useQuasar();
const coursesStore = useCoursesStore();

// Props & Emits
const props = defineProps<{
  selectedCourseId?: string;
}>();

const emit = defineEmits<{
  'course-select': [course: Course];
  'course-start': [course: Course];
  'add-course': [];
}>();

// Computed
const courses = computed(() => coursesStore.sortedCourses);
const selectedCourse = computed(() => {
  if (!props.selectedCourseId) return null;
  return coursesStore.getCourseById(props.selectedCourseId);
});

// Methods
const selectCourse = (course: Course) => {
  emit('course-select', course);
};

const startCourse = (course: Course) => {
  emit('course-start', course);
};

const copyShareLink = async (course: Course) => {
  try {
    const shareUrl = coursesStore.generateShareUrl(course.id);
    await navigator.clipboard.writeText(shareUrl);

    $q.notify({
      type: 'positive',
      message: '공유 링크가 클립보드에 복사되었습니다!',
      position: 'top',
    });
  } catch (error) {
    console.error('링크 복사 실패:', error);
    $q.notify({
      type: 'negative',
      message: '링크 복사에 실패했습니다.',
      position: 'top',
    });
  }
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
</script>

<style scoped>
.course-selector {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.selector-card {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.course-list {
  max-height: 500px;
  overflow-y: auto;
}

.course-title {
  font-weight: 600;
  font-size: 1.1rem;
}

.course-description {
  margin-top: 4px;
  line-height: 1.4;
}

.course-meta {
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.selected-course {
  background-color: rgba(25, 118, 210, 0.1);
  border-left: 4px solid #1976d2;
}

.no-courses {
  text-align: center;
  padding: 40px 20px;
}

.selected-course-info {
  background-color: #f8f9fa;
}

.course-actions {
  display: flex;
  gap: 8px;
}

/* 스크롤바 스타일 */
.course-list::-webkit-scrollbar {
  width: 6px;
}

.course-list::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.course-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.course-list::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
