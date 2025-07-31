import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface CourseFile {
  originalName: string;
  fileName: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  author: string;
  files: CourseFile[];
  createdAt: string;
  updatedAt: string;
  htmlDir?: string;
  shareUrl?: string;
}

export const useCoursesStore = defineStore('courses', () => {
  // State
  const courses = ref<Course[]>([]);
  const currentCourse = ref<Course | null>(null);
  const isLoading = ref(false);

  // Getters
  const getCourseById = computed(() => {
    return (id: string) => courses.value.find((course) => course.id === id);
  });

  const getCoursesByAuthor = computed(() => {
    return (author: string) => courses.value.filter((course) => course.author === author);
  });

  const sortedCourses = computed(() => {
    return [...courses.value].sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
  });

  // Actions
  const addCourse = async (courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>) => {
    isLoading.value = true;

    try {
      const newCourse: Course = {
        ...courseData,
        id: generateCourseId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        shareUrl: `/study/${generateCourseId()}`,
      };

      // 실제로는 서버에 저장
      courses.value.push(newCourse);

      // LocalStorage에 저장 (임시)
      saveToLocalStorage();

      return newCourse;
    } catch (error) {
      console.error('강의 추가 실패:', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const updateCourse = async (id: string, updates: Partial<Course>) => {
    isLoading.value = true;

    try {
      const courseIndex = courses.value.findIndex((course) => course.id === id);
      if (courseIndex === -1) {
        throw new Error('강의를 찾을 수 없습니다.');
      }

      const updatedCourse = {
        ...courses.value[courseIndex],
        ...updates,
        updatedAt: new Date().toISOString(),
      } as Course;

      courses.value[courseIndex] = updatedCourse;

      // LocalStorage에 저장 (임시)
      saveToLocalStorage();

      return courses.value[courseIndex];
    } catch (error) {
      console.error('강의 업데이트 실패:', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteCourse = async (id: string) => {
    isLoading.value = true;

    try {
      const courseIndex = courses.value.findIndex((course) => course.id === id);
      if (courseIndex === -1) {
        throw new Error('강의를 찾을 수 없습니다.');
      }

      courses.value.splice(courseIndex, 1);

      // LocalStorage에 저장 (임시)
      saveToLocalStorage();

      return true;
    } catch (error) {
      console.error('강의 삭제 실패:', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const setCurrentCourse = (course: Course | null) => {
    currentCourse.value = course;
  };

  const loadCourse = async (id: string) => {
    isLoading.value = true;

    try {
      const course = getCourseById.value(id);
      if (!course) {
        throw new Error('강의를 찾을 수 없습니다.');
      }

      setCurrentCourse(course);
      return course;
    } catch (error) {
      console.error('강의 로드 실패:', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const loadCourses = async () => {
    isLoading.value = true;

    try {
      // 실제로는 서버에서 로드
      // 임시로 LocalStorage에서 로드
      loadFromLocalStorage();
    } catch (error) {
      console.error('강의 목록 로드 실패:', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const generateShareUrl = (courseId: string): string => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/study/${courseId}`;
  };

  // Utility functions
  const generateCourseId = (): string => {
    return 'course-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  };

  const saveToLocalStorage = () => {
    try {
      localStorage.setItem('courses', JSON.stringify(courses.value));
    } catch (error) {
      console.error('LocalStorage 저장 실패:', error);
    }
  };

  const loadFromLocalStorage = () => {
    try {
      const stored = localStorage.getItem('courses');
      if (stored) {
        courses.value = JSON.parse(stored);
      }
    } catch (error) {
      console.error('LocalStorage 로드 실패:', error);
      courses.value = [];
    }
  };

  // Initialize
  const initialize = async () => {
    await loadCourses();
  };

  return {
    // State
    courses,
    currentCourse,
    isLoading,

    // Getters
    getCourseById,
    getCoursesByAuthor,
    sortedCourses,

    // Actions
    addCourse,
    updateCourse,
    deleteCourse,
    setCurrentCourse,
    loadCourse,
    loadCourses,
    generateShareUrl,
    initialize,
  };
});
