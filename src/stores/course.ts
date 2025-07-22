import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export interface Lesson {
  title: string;
  slides: number;
  completed: boolean;
  videoUrl: string | null;
  content?: string;
  slideTitles?: string[];
}

export interface Comment {
  id: number;
  user: string;
  time: string;
  text: string;
  likes: number;
  liked?: boolean;
}

export const useCourseStore = defineStore('course', () => {
  // 상태
  const currentLesson = ref(0);
  const currentSlide = ref(0);
  const isPlaying = ref(false);
  const sidebarOpen = ref(true);
  const showComments = ref(false);
  const liked = ref(false);
  const progress = ref(15);
  const newComment = ref('');
  const notes = ref('');

  // 강의 데이터
  const lessons = ref<Lesson[]>([
    {
      title: '1. 오늘의 여정',
      slides: 3,
      completed: false,
      videoUrl: null,
      slideTitles: ['세미나 소개', '오늘의 여정', '세미나 구성'],
    },
    {
      title: '2. 1사분면: 느끼기 (Feel)',
      slides: 8,
      completed: false,
      videoUrl: null,
      slideTitles: [
        '흥미진진한 경험으로 시작',
        'AI 목회자 역할놀이',
        '충격적 데모',
        'Challenge #1: AI 목회 슬로건 만들기',
        'Challenge #1 결과 전송',
        'Challenge #1 결과 공유',
        '온라인 POLL #1',
        '현황 파악',
      ],
    },
    {
      title: '3. 2사분면: 성찰하기 (Reflect)',
      slides: 9,
      completed: false,
      videoUrl: null,
      slideTitles: [
        '생동감 있고 상호작용적인 강의',
        'AI가 뭔가요?',
        '목회 현장 AI 활용 사례',
        'ChatGPT 무료버전 시작하기',
        'NotebookLM으로 설교 관리',
        'Challenge #2: 첫 AI 질문하기',
        'Challenge #2 결과 전송',
        'Challenge #2 실시간 분석',
        '온라인 POLL #2',
      ],
    },
    {
      title: '4. 3사분면: 사고하기 (Think)',
      slides: 6,
      completed: false,
      videoUrl: null,
      slideTitles: [
        '실험실 환경에서 직접 체험',
        'RGIOC 프롬프팅 기법',
        'RGIOC 적용 예시',
        'Challenge #3: RGIOC 설교 개요 만들기',
        'Challenge #3 우수 사례',
        '전반부 평가',
      ],
    },
    {
      title: '5. 점심 시간',
      slides: 2,
      completed: false,
      videoUrl: null,
      slideTitles: ['점심 시간', '후반부 세션'],
    },
    {
      title: '6. 후반부: 1사분면 (Feel)',
      slides: 4,
      completed: false,
      videoUrl: null,
      slideTitles: [
        '오후 활력 충전 체험',
        'AI 도구 월드컵',
        '충격적 성능 시연',
        'Suno, Canva, AI 영상 제작',
      ],
    },
    {
      title: '7. 후반부: 2사분면 (Reflect)',
      slides: 5,
      completed: false,
      videoUrl: null,
      slideTitles: [
        '심화 학습 및 전략적 사고',
        'AI 도구별 특징',
        '유료 vs 무료 비교',
        'Challenge #4: AI 도구 조합 완성품',
        'Challenge #4 결과 시연',
      ],
    },
    {
      title: '8. 후반부: 3사분면 (Think)',
      slides: 3,
      completed: false,
      videoUrl: null,
      slideTitles: ['고급 기능 마스터', 'ChatGPT Projects', 'GPTs 활용'],
    },
    {
      title: '9. 후반부: 4사분면 (Act)',
      slides: 4,
      completed: false,
      videoUrl: null,
      slideTitles: [
        '창의적 적용 및 통합',
        '존별 맞춤 시나리오',
        'Challenge #5: AI 툴 배틀 로드맵',
        'Challenge #5 최종 결과',
      ],
    },
    {
      title: '10. 마무리',
      slides: 6,
      completed: false,
      videoUrl: null,
      slideTitles: [
        '온라인 POLL #3',
        '오늘의 핵심 메시지',
        '지속적 네트워크',
        '감사합니다!',
        '연락처 및 자료',
        '하나님의 은혜가',
      ],
    },
  ]);

  const comments = ref<Comment[]>([
    {
      id: 1,
      user: '김목사',
      time: '5분 전',
      text: 'AI 목회 슬로건 만들기가 정말 창의적이었어요! "기술로 하나님의 마음을 전하다"로 만들었습니다.',
      likes: 8,
    },
    {
      id: 2,
      user: '박전도사',
      time: '10분 전',
      text: 'RGIOC 기법으로 설교 개요 만드는 게 완전히 다른 결과가 나오네요. 실무에 바로 적용할 수 있을 것 같습니다.',
      likes: 12,
    },
    {
      id: 3,
      user: '이사모',
      time: '15분 전',
      text: 'ChatGPT + Canva + Suno 조합으로 청년부 수련회 홍보물 완성했는데, 정말 놀라워요!',
      likes: 15,
    },
    {
      id: 4,
      user: '정목사',
      time: '20분 전',
      text: '4MAT 사이클로 구성된 세미나가 체계적이고 실용적이네요. 각 단계별로 명확한 목표가 있어서 좋습니다.',
      likes: 6,
    },
    {
      id: 5,
      user: '최전도사',
      time: '25분 전',
      text: 'AI 도구별 특징 비교표가 정말 유용했어요. 목회 상황에 맞는 도구 선택이 쉬워졌습니다.',
      likes: 9,
    },
  ]);

  // 계산된 속성
  const currentLessonData = computed(() => {
    const lesson = lessons.value[currentLesson.value];
    return lesson || lessons.value[0]; // 기본값으로 첫 번째 강의 반환
  });

  const slideProgress = computed(() => {
    const lessonData = currentLessonData.value;
    if (!lessonData) return 0;
    return ((currentSlide.value + 1) / lessonData.slides) * 100;
  });

  // 액션
  const setCurrentLesson = (index: number) => {
    currentLesson.value = index;
    currentSlide.value = 0;
  };

  const setCurrentSlide = (slideIndex: number) => {
    const lessonData = currentLessonData.value;
    if (lessonData && slideIndex >= 0 && slideIndex < lessonData.slides) {
      currentSlide.value = slideIndex;
    }
  };

  const nextSlide = () => {
    const lessonData = currentLessonData.value;
    if (lessonData && currentSlide.value < lessonData.slides - 1) {
      currentSlide.value++;
    }
  };

  const prevSlide = () => {
    if (currentSlide.value > 0) {
      currentSlide.value--;
    }
  };

  const togglePlaying = () => {
    isPlaying.value = !isPlaying.value;
  };

  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value;
  };

  const toggleComments = () => {
    showComments.value = !showComments.value;
  };

  const toggleLiked = () => {
    liked.value = !liked.value;
  };

  const handleCaptureSlide = () => {
    alert('슬라이드가 다운로드 폴더에 저장되었습니다!');
  };

  const handleSendNotesByEmail = () => {
    alert('메모가 이메일로 전송되었습니다!');
  };

  const addComment = () => {
    if (newComment.value.trim()) {
      comments.value.unshift({
        id: Date.now(),
        user: '사용자',
        time: '방금 전',
        text: newComment.value,
        likes: 0,
      });
      newComment.value = '';
    }
  };

  const updateNotes = (newNotes: string) => {
    notes.value = newNotes;
  };

  const saveNotes = () => {
    console.log('메모 저장:', notes.value);
  };

  const clearNotes = () => {
    notes.value = '';
  };

  const toggleCommentLike = (commentId: number) => {
    const comment = comments.value.find((c) => c.id === commentId);
    if (comment) {
      comment.likes += comment.liked ? -1 : 1;
      comment.liked = !comment.liked;
    }
  };

  return {
    // 상태
    currentLesson,
    currentSlide,
    isPlaying,
    sidebarOpen,
    showComments,
    liked,
    progress,
    newComment,
    notes,
    lessons,
    comments,

    // 계산된 속성
    currentLessonData,
    slideProgress,

    // 액션
    setCurrentLesson,
    setCurrentSlide,
    nextSlide,
    prevSlide,
    togglePlaying,
    toggleSidebar,
    toggleComments,
    toggleLiked,
    handleCaptureSlide,
    handleSendNotesByEmail,
    addComment,
    updateNotes,
    saveNotes,
    clearNotes,
    toggleCommentLike,
  };
});
