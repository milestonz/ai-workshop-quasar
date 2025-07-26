import { ref, computed, watch } from 'vue';
import { defineStore } from 'pinia';
import { azureBlobService } from 'src/services/azureBlobService';

export interface SlideData {
  title: string;
  videoUrl?: string | null;
  hasVideo?: boolean;
}

export interface Lesson {
  title: string;
  slides: number;
  completed: boolean;
  videoUrl: string | null;
  content?: string;
  slideTitles?: string[];
  slideData?: SlideData[];
  slideContents?: { [key: number]: string };
  locked?: boolean; // Chapter 잠금 상태
  lockedSlides?: { [key: number]: boolean }; // 개별 슬라이드 잠금 상태
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
  const isPresentationMode = ref(false);

  // 강의 데이터 - MD 파일 기반으로 동적 생성
  const lessons = ref<Lesson[]>([]);

  // MD 파일에서 목차를 동적으로 생성하는 함수
  const generateCourseOutlineFromMD = async (): Promise<Lesson[]> => {
    try {
      // JSON 파일에서 MD 파일 목록 읽기
      let mdFiles: string[] = [];
      try {
        const response = await fetch('/slides/files.json');
        if (response.ok) {
          const data = await response.json();
          mdFiles = data.files || [];
          console.log('✅ 파일 목록 로드 완료:', mdFiles.length, '개 파일');
        } else {
          throw new Error('files.json을 읽을 수 없습니다');
        }
      } catch (error) {
        console.warn('❌ JSON 파일 로드 실패, 하드코딩된 목록 사용:', error);
        // fallback: 하드코딩된 목록
        mdFiles = [
          'slide-0-0.md',
          'slide-0-1.md',
          'slide-0-2.md',
          'slide-1-0.md',
          'slide-1-1.md',
          'slide-1-2.md',
          'slide-1-3.md',
          'slide-1-4.md',
          'slide-2-0.md',
          'slide-2-1.md',
          'slide-2-2.md',
          'slide-2-3.md',
          'slide-2-4.md',
          'slide-3-0.md',
          'slide-3-1.md',
          'slide-3-2.md',
          'slide-3-3.md',
          'slide-3-4.md',
          'slide-3-5.md',
          'slide-3-6.md',
          'slide-3-7.md',
          'slide-3-8.md',
          'slide-4-0.md',
          'slide-4-1.md',
          'slide-4-2.md',
          'slide-5-0.md',
          'slide-5-1.md',
        ];
      }

      // Chapter별로 그룹화
      const chapterGroups: { [key: number]: string[] } = {};

      mdFiles.forEach((file) => {
        const match = file.match(/slide-(\d+)-(\d+)\.md/);
        if (match && match[1] && match[2]) {
          const chapterNum = parseInt(match[1]);
          const slideNum = parseInt(match[2]);

          if (!chapterGroups[chapterNum]) {
            chapterGroups[chapterNum] = [];
          }
          chapterGroups[chapterNum].push(file);
        }
      });

      // Chapter별로 정렬하고 Lesson 객체 생성
      const sortedChapters = Object.keys(chapterGroups)
        .map(Number)
        .sort((a, b) => a - b);

      const generatedLessons: Lesson[] = [];

      for (const chapterNum of sortedChapters) {
        const files =
          chapterGroups[chapterNum]?.sort((a, b) => {
            const slideA = parseInt(a.match(/slide-\d+-(\d+)\.md/)?.[1] || '0');
            const slideB = parseInt(b.match(/slide-\d+-(\d+)\.md/)?.[1] || '0');
            return slideA - slideB;
          }) || [];

        // Chapter 제목 가져오기 (첫 번째 슬라이드에서)
        let chapterTitle = `${chapterNum}. Chapter ${chapterNum}`;
        try {
          const firstSlideContent = await getSlideContentFromMD(`${chapterNum}-0`);
          // ### 로 시작하는 제목을 우선적으로 찾기
          const titleMatch = firstSlideContent.match(/^###\s*(.+)$/m);
          if (titleMatch && titleMatch[1]) {
            const extractedTitle = titleMatch[1].trim();
            if (extractedTitle.length > 0) {
              chapterTitle = `${chapterNum}. ${extractedTitle}`;
            }
          }
        } catch (error) {
          console.warn(`Chapter ${chapterNum} 제목을 가져올 수 없습니다:`, error);
        }

        // 슬라이드 제목들 가져오기
        const slideTitles: string[] = [];
        const slideData: SlideData[] = [];

        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          if (!file) continue;
          try {
            // 파일명에서 componentKey 추출 (slide-3-3.md -> 3-3)
            const componentKeyMatch = file.match(/slide-(\d+)-(\d+)\.md/);
            const componentKey = componentKeyMatch
              ? `${componentKeyMatch[1]}-${componentKeyMatch[2]}`
              : file.replace('.md', '');

            const content = await getSlideContentFromMD(componentKey);
            // ### 로 시작하는 제목을 우선적으로 찾기
            const titleMatch = content.match(/^###\s*(.+)$/m);
            let title = titleMatch && titleMatch[1] ? titleMatch[1].trim() : '';

            // ### 제목이 없으면 파일명에서 슬라이드 번호 추출 (예: slide-3-3.md -> 3-3)
            if (!title) {
              const slideMatch = file.match(/slide-(\d+)-(\d+)\.md/);
              if (slideMatch && slideMatch[1] && slideMatch[2]) {
                title = `${slideMatch[1]}-${slideMatch[2]}`;
              } else {
                title = `슬라이드 ${i + 1}`;
              }
            }

            slideTitles.push(title);

            // 비디오 URL 확인
            const videoMatch = content.match(
              /\[.*?\]\((https:\/\/www\.youtube\.com\/embed\/[^)]+)\)/,
            );
            slideData.push({
              title,
              videoUrl: videoMatch && videoMatch[1] ? videoMatch[1] : null,
              hasVideo: !!videoMatch,
            });
          } catch (error) {
            console.warn(`슬라이드 ${file} 내용을 가져올 수 없습니다:`, error);
            // 파일명에서 슬라이드 번호 추출
            const slideMatch = file.match(/slide-(\d+)-(\d+)\.md/);
            let fallbackTitle = `슬라이드 ${i + 1}`;
            if (slideMatch && slideMatch[1] && slideMatch[2]) {
              fallbackTitle = `${slideMatch[1]}-${slideMatch[2]}`;
            }
            slideTitles.push(fallbackTitle);
            slideData.push({
              title: fallbackTitle,
              videoUrl: null,
              hasVideo: false,
            });
          }
        }

        generatedLessons.push({
          title: chapterTitle,
          slides: files.length,
          completed: false,
          videoUrl: null,
          slideTitles,
          slideData,
        });
      }

      return generatedLessons;
    } catch (error) {
      console.error('MD 파일에서 목차 생성 중 오류:', error);
      return generateDefaultLessons();
    }
  };

  // 기본 목차 생성 (fallback)
  const generateDefaultLessons = (): Lesson[] => {
    return [
      {
        title: '0. INTRO',
        slides: 3,
        completed: false,
        videoUrl: null,
        slideTitles: ['워크샵 소개', '오늘의 여정', '워크샵 구성'],
        slideData: [
          { title: '워크샵 소개', videoUrl: null, hasVideo: false },
          { title: '오늘의 여정', videoUrl: null, hasVideo: false },
          { title: '워크샵 구성', videoUrl: null, hasVideo: false },
        ],
      },
    ];
  };

  // 초기화 함수 - 앱 시작 시 호출
  const initializeCourseOutline = async () => {
    try {
      const generatedLessons = await generateCourseOutlineFromMD();
      lessons.value = generatedLessons;
      console.log('✅ MD 파일 기반 목차 생성 완료:', generatedLessons);
    } catch (error) {
      console.error('❌ 목차 초기화 실패:', error);
      lessons.value = generateDefaultLessons();
    }
  };

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

  const currentSlideData = computed(() => {
    const lessonData = currentLessonData.value;
    if (!lessonData?.slideData) return null;
    return lessonData.slideData[currentSlide.value];
  });

  const hasVideo = computed(() => {
    return currentSlideData.value?.hasVideo || false;
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

  // Chapter에 슬라이드 추가하는 함수
  const addSlideToLesson = async (lessonIndex: number) => {
    try {
      console.log(`📝 Chapter ${lessonIndex}에 슬라이드 추가 중...`);

      const lesson = lessons.value[lessonIndex];
      if (!lesson) {
        throw new Error(`Chapter ${lessonIndex}를 찾을 수 없습니다.`);
      }

      // 슬라이드 개수 증가
      lesson.slides++;

      // slideTitles 배열에 새 슬라이드 제목 추가
      if (!lesson.slideTitles) {
        lesson.slideTitles = [];
      }
      lesson.slideTitles.push(`새 슬라이드 ${lesson.slides}`);

      // slideData 배열에 새 슬라이드 데이터 추가
      if (!lesson.slideData) {
        lesson.slideData = [];
      }
      lesson.slideData.push({
        title: `새 슬라이드 ${lesson.slides}`,
        hasVideo: false,
      });

      // 새 슬라이드의 MD 파일 생성
      const newSlideIndex = lesson.slides - 1;
      const componentKey = `${lessonIndex}-${newSlideIndex}`;
      const defaultContent = `# 새 슬라이드 ${lesson.slides}

새로운 슬라이드 내용을 여기에 작성하세요.

## 주요 내용

- 내용 1
- 내용 2
- 내용 3

## 요약

새 슬라이드의 요약 내용입니다.
`;

      await createMarkdownFile(componentKey, defaultContent);

      console.log(`✅ Chapter ${lessonIndex}에 슬라이드 추가 완료 (총 ${lesson.slides}개)`);

      return true;
    } catch (error) {
      console.error(`❌ Chapter ${lessonIndex}에 슬라이드 추가 실패:`, error);
      return false;
    }
  };

  const nextSlide = () => {
    const lessonData = currentLessonData.value;
    console.log('🎯 nextSlide 호출됨:', {
      currentSlide: currentSlide.value,
      currentLesson: currentLesson.value,
      totalSlides: lessonData?.slides,
      totalLessons: lessons.value.length,
      canMoveNext: lessonData && currentSlide.value < lessonData.slides - 1,
    });

    if (lessonData && currentSlide.value < lessonData.slides - 1) {
      // 현재 Chapter 내에서 다음 슬라이드로 이동
      const nextSlideIndex = currentSlide.value + 1;

      // 다음 슬라이드가 잠겨있는지 확인
      if (isSlideLocked(currentLesson.value, nextSlideIndex)) {
        console.log('🔒 다음 슬라이드가 잠겨있음:', nextSlideIndex);
        alert('🔒 다음 슬라이드는 잠겨있어서 학생들에게 공유되지 않습니다.');
        return;
      }

      currentSlide.value = nextSlideIndex;
      console.log('✅ 다음 슬라이드로 이동:', currentSlide.value);
    } else if (currentLesson.value < lessons.value.length - 1) {
      // 다음 Chapter의 첫 번째 슬라이드로 이동
      const nextLessonIndex = currentLesson.value + 1;

      // 다음 Chapter가 잠겨있는지 확인
      if (isChapterLocked(nextLessonIndex)) {
        console.log('🔒 다음 Chapter가 잠겨있음:', nextLessonIndex);
        alert('🔒 다음 Chapter는 잠겨있어서 학생들에게 공유되지 않습니다.');
        return;
      }

      // 다음 Chapter의 첫 번째 슬라이드가 잠겨있는지 확인
      if (isSlideLocked(nextLessonIndex, 0)) {
        console.log('🔒 다음 Chapter의 첫 번째 슬라이드가 잠겨있음');
        alert('🔒 다음 Chapter의 첫 번째 슬라이드는 잠겨있어서 학생들에게 공유되지 않습니다.');
        return;
      }

      currentLesson.value = nextLessonIndex;
      currentSlide.value = 0;
      console.log('✅ 다음 Chapter로 이동:', currentLesson.value, '슬라이드:', currentSlide.value);
    } else {
      console.log('❌ 다음 슬라이드/Chapter로 이동할 수 없음 - 마지막 Chapter의 마지막 슬라이드');
      // 마지막 슬라이드 메시지 표시
      console.log('🎯 마지막 슬라이드 메시지 표시');
    }
  };

  const prevSlide = () => {
    console.log('🎯 prevSlide 호출됨:', {
      currentSlide: currentSlide.value,
      currentLesson: currentLesson.value,
      canMovePrev: currentSlide.value > 0,
      canMovePrevChapter: currentLesson.value > 0,
    });

    if (currentSlide.value > 0) {
      // 현재 Chapter 내에서 이전 슬라이드로 이동
      const prevSlideIndex = currentSlide.value - 1;

      // 이전 슬라이드가 잠겨있는지 확인
      if (isSlideLocked(currentLesson.value, prevSlideIndex)) {
        console.log('🔒 이전 슬라이드가 잠겨있음:', prevSlideIndex);
        alert('🔒 이전 슬라이드는 잠겨있어서 학생들에게 공유되지 않습니다.');
        return;
      }

      currentSlide.value = prevSlideIndex;
      console.log('✅ 이전 슬라이드로 이동:', currentSlide.value);
    } else if (currentLesson.value > 0) {
      // 이전 Chapter의 마지막 슬라이드로 이동
      const prevLessonIndex = currentLesson.value - 1;

      // 이전 Chapter가 잠겨있는지 확인
      if (isChapterLocked(prevLessonIndex)) {
        console.log('🔒 이전 Chapter가 잠겨있음:', prevLessonIndex);
        alert('🔒 이전 Chapter는 잠겨있어서 학생들에게 공유되지 않습니다.');
        return;
      }

      const prevLesson = lessons.value[prevLessonIndex];
      const lastSlideIndex = prevLesson ? prevLesson.slides - 1 : 0;

      // 이전 Chapter의 마지막 슬라이드가 잠겨있는지 확인
      if (isSlideLocked(prevLessonIndex, lastSlideIndex)) {
        console.log('🔒 이전 Chapter의 마지막 슬라이드가 잠겨있음');
        alert('🔒 이전 Chapter의 마지막 슬라이드는 잠겨있어서 학생들에게 공유되지 않습니다.');
        return;
      }

      currentLesson.value = prevLessonIndex;
      currentSlide.value = lastSlideIndex;
      console.log('✅ 이전 Chapter로 이동:', currentLesson.value, '슬라이드:', currentSlide.value);
    } else {
      console.log('❌ 이전 슬라이드/Chapter로 이동할 수 없음 - 첫 번째 Chapter의 첫 번째 슬라이드');
      // 첫 번째 슬라이드 메시지 표시
      console.log('🎯 첫 번째 슬라이드 메시지 표시');
    }
  };

  const togglePlaying = () => {
    // 동영상이 있는 슬라이드에서만 재생/일시정지 가능
    if (hasVideo.value) {
      isPlaying.value = !isPlaying.value;
    }
  };

  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value;
  };

  const togglePresentationMode = () => {
    isPresentationMode.value = !isPresentationMode.value;
    console.log('🎭 프레젠테이션 모드:', isPresentationMode.value ? 'ON' : 'OFF');
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

  // 슬라이드 내용 관련 함수들
  const getCurrentSlideContent = () => {
    const lesson = lessons.value[currentLesson.value];
    return lesson?.slideContents?.[currentSlide.value] || '';
  };

  // MD 파일에서 슬라이드 내용을 읽어오는 함수
  const getSlideContentFromMD = async (componentKey: string): Promise<string> => {
    console.log('📂 getSlideContentFromMD 시작:', componentKey);
    try {
      const url = `/slides/slide-${componentKey}.md`;
      console.log('🌐 요청 URL:', url);

      const response = await fetch(url);
      console.log('📡 응답 상태:', response.status, response.statusText);

      if (!response.ok) {
        console.log('❌ 응답 실패:', response.status, response.statusText);
        return '';
      }

      const content = await response.text();
      console.log('✅ MD 파일 내용 읽기 완료:', {
        contentLength: content.length,
        contentPreview: content.substring(0, 100),
      });
      return content;
    } catch (error) {
      console.error('❌ MD 파일 읽기 실패:', error);
      return '';
    }
  };

  // 슬라이드 선택 시 MD 파일 내용을 로드하는 함수
  const loadSlideContentForEditing = async (
    lessonIndex: number,
    slideIndex: number,
  ): Promise<string> => {
    try {
      const lesson = lessons.value[lessonIndex];
      if (!lesson) return '';

      // 실제 lessonIndex와 slideIndex를 사용하여 componentKey 생성
      const componentKey = `${lessonIndex}-${slideIndex}`;

      const content = await getSlideContentFromMD(componentKey);

      // store에도 저장
      if (!lesson.slideContents) {
        lesson.slideContents = {};
      }
      lesson.slideContents[slideIndex] = content;

      console.log('🎯 슬라이드 내용 로드 완료:', {
        lessonIndex,
        slideIndex,
        componentKey,
        contentLength: content.length,
      });

      return content;
    } catch (error) {
      console.error('❌ 슬라이드 내용 로드 실패:', error);
      return '';
    }
  };

  const saveSlideContent = (content: string) => {
    const lesson = lessons.value[currentLesson.value];
    if (lesson) {
      if (!lesson.slideContents) {
        lesson.slideContents = {};
      }
      lesson.slideContents[currentSlide.value] = content;
      console.log('🎯 슬라이드 내용 저장:', {
        lesson: lesson.title,
        slide: currentSlide.value,
        contentLength: content.length,
      });
    }
  };

  // MD 파일에 슬라이드 내용을 저장하는 함수 (다운로드)
  const saveSlideContentToMD = async (componentKey: string, content: string) => {
    try {
      // 현재 슬라이드 정보 가져오기
      const lesson = lessons.value[currentLesson.value];
      const slideTitle =
        lesson?.slideTitles?.[currentSlide.value] || `슬라이드 ${currentSlide.value + 1}`;

      // MD 파일 내용 생성
      const mdContent = `# ${slideTitle}

${content}

---
*생성일: ${new Date().toLocaleString('ko-KR')}*
*파일명: slide-${componentKey}.md*
`;

      const filename = `slide-${componentKey}.md`;
      const blob = new Blob([mdContent], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      console.log('✅ MD 파일 저장 완료:', filename);
    } catch (error) {
      console.error('❌ MD 파일 저장 오류:', error);
    }
  };

  // MD 파일을 지정된 디렉토리에 덮어쓰는 함수
  const overwriteSlideContentToMD = async (componentKey: string, content: string) => {
    try {
      console.log('📝 MD 파일 덮어쓰기 시작:', componentKey);

      const response = await fetch(`/slides/${componentKey}.md`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: content,
      });

      if (response.ok) {
        console.log('✅ MD 파일 덮어쓰기 성공:', componentKey);
        return true;
      } else {
        console.error('❌ MD 파일 덮어쓰기 실패:', response.status);
        return false;
      }
    } catch (error) {
      console.error('❌ MD 파일 덮어쓰기 오류:', error);
      return false;
    }
  };

  // Chapter 잠금 토글 함수
  const toggleChapterLock = (lessonIndex: number) => {
    if (lessons.value[lessonIndex]) {
      lessons.value[lessonIndex].locked = !lessons.value[lessonIndex].locked;
      console.log(`🔒 Chapter ${lessonIndex} 잠금 상태 변경:`, lessons.value[lessonIndex].locked);
      saveToLocalStorage(); // 로컬 스토리지에 저장
    }
  };

  // 개별 슬라이드 잠금 토글 함수
  const toggleSlideLock = (lessonIndex: number, slideIndex: number) => {
    if (lessons.value[lessonIndex]) {
      if (!lessons.value[lessonIndex].lockedSlides) {
        lessons.value[lessonIndex].lockedSlides = {};
      }
      lessons.value[lessonIndex].lockedSlides[slideIndex] =
        !lessons.value[lessonIndex].lockedSlides[slideIndex];
      console.log(
        `🔒 Slide ${lessonIndex}-${slideIndex} 잠금 상태 변경:`,
        lessons.value[lessonIndex].lockedSlides[slideIndex],
      );
      saveToLocalStorage(); // 로컬 스토리지에 저장
    }
  };

  // Chapter 잠금 상태 확인 함수
  const isChapterLocked = (lessonIndex: number): boolean => {
    return lessons.value[lessonIndex]?.locked || false;
  };

  // 개별 슬라이드 잠금 상태 확인 함수
  const isSlideLocked = (lessonIndex: number, slideIndex: number): boolean => {
    if (!lessons.value[lessonIndex]) return false;

    // Chapter가 잠겨있으면 모든 슬라이드가 잠김
    if (lessons.value[lessonIndex].locked) return true;

    // 개별 슬라이드 잠금 상태 확인
    return lessons.value[lessonIndex].lockedSlides?.[slideIndex] || false;
  };

  // 잠긴 슬라이드로 이동 방지 함수
  const canNavigateToSlide = (lessonIndex: number, slideIndex: number): boolean => {
    return !isSlideLocked(lessonIndex, slideIndex);
  };

  // 잠금 상태 저장 함수
  const saveLockStatus = async () => {
    try {
      const lockData = {
        chapterLocks: {} as { [key: number]: boolean },
        slideLocks: {} as { [key: string]: boolean },
        timestamp: new Date().toISOString(),
      };

      // Chapter 잠금 상태 저장
      lessons.value.forEach((lesson, lessonIndex) => {
        if (lesson.locked === true) {
          lockData.chapterLocks[lessonIndex] = true;
        }

        // 개별 슬라이드 잠금 상태 저장
        if (lesson.lockedSlides) {
          Object.keys(lesson.lockedSlides).forEach((slideIndex) => {
            const key = `${lessonIndex}-${slideIndex}`;
            const slideLocked = lesson.lockedSlides![parseInt(slideIndex)];
            if (slideLocked === true) {
              lockData.slideLocks[key] = true;
            }
          });
        }
      });

      await azureBlobService.saveData('courseLockStatus', lockData);
      console.log('🔒 Azure Blob Storage에 잠금 상태 저장 완료:', lockData);
    } catch (error) {
      console.error('❌ Azure Blob Storage 잠금 상태 저장 오류:', error);
    }
  };

  // 잠금 상태 로드 함수
  const loadLockStatus = async () => {
    try {
      const lockData = await azureBlobService.loadData('courseLockStatus');
      if (lockData) {
        // Chapter 잠금 상태 복원
        if (lockData.chapterLocks) {
          Object.keys(lockData.chapterLocks).forEach((lessonIndex) => {
            const index = parseInt(lessonIndex);
            if (lessons.value[index] && lockData.chapterLocks[index] === true) {
              lessons.value[index].locked = true;
            }
          });
        }

        // 개별 슬라이드 잠금 상태 복원
        if (lockData.slideLocks) {
          Object.keys(lockData.slideLocks).forEach((key) => {
            const parts = key.split('-');
            if (parts.length === 2) {
              const lessonIndexStr = parts[0];
              const slideIndexStr = parts[1];
              if (lessonIndexStr && slideIndexStr) {
                const lessonIndex = parseInt(lessonIndexStr);
                const slideIndex = parseInt(slideIndexStr);
                if (
                  !isNaN(lessonIndex) &&
                  !isNaN(slideIndex) &&
                  lessons.value[lessonIndex] &&
                  lockData.slideLocks[key] === true
                ) {
                  if (!lessons.value[lessonIndex].lockedSlides) {
                    lessons.value[lessonIndex].lockedSlides = {};
                  }
                  lessons.value[lessonIndex].lockedSlides[slideIndex] = true;
                }
              }
            }
          });
        }

        console.log('🔒 Azure Blob Storage에서 잠금 상태 로드 완료:', lockData);
      }
    } catch (error) {
      console.error('❌ Azure Blob Storage 잠금 상태 로드 오류:', error);
    }
  };

  // 잠금 상태 초기화 함수
  const clearLockStatus = async () => {
    try {
      await azureBlobService.deleteData('courseLockStatus');
      console.log('🔒 Azure Blob Storage 잠금 상태 초기화 완료');
    } catch (error) {
      console.error('❌ Azure Blob Storage 잠금 상태 초기화 오류:', error);
    }
  };

  const getCurrentSlideType = () => {
    return currentSlide.value === 0 ? 'chapter' : 'slide';
  };

  // Vue 파일 업데이트 함수
  const updateVueFileWithMarkdown = (componentKey: string, markdownContent: string) => {
    console.log('🎯 Vue 파일 업데이트 시작:', {
      componentKey,
      contentLength: markdownContent.length,
    });

    try {
      // 현재 슬라이드 정보 가져오기
      const lesson = lessons.value[currentLesson.value];
      const slideTitle =
        lesson?.slideTitles?.[currentSlide.value] || `슬라이드 ${currentSlide.value + 1}`;

      // Vue 컴포넌트 템플릿 생성
      const vueContent = `<template>
  <div class="slide-content">
    <div class="slide-header">
      <h1 class="slide-title">{{ slideTitle }}</h1>
      <div class="slide-subtitle">{{ lessonTitle }}</div>
    </div>

    <div class="slide-body">
      <div class="slide-description" v-html="renderedContent"></div>
    </div>

    <div class="slide-footer">
      <div class="slide-number">{{ slideIndex + 1 }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { marked } from 'marked';

interface Props {
  lesson: any;
  slideIndex: number;
}

const props = defineProps<Props>();

// 슬라이드 제목
const slideTitle = computed(() => {
  return props.lesson?.slideTitles?.[props.slideIndex] || '슬라이드';
});

// 강의 제목
const lessonTitle = computed(() => {
  return props.lesson?.title || '강의';
});

// 슬라이드 내용 (MD 파일 내용)
const slideContent = computed(() => {
  return props.lesson?.slideContents?.[props.slideIndex] || '';
});

// Markdown 내용을 HTML로 렌더링
const renderedContent = computed(() => {
  try {
    return marked(slideContent.value);
  } catch (error) {
    console.error('Markdown 렌더링 오류:', error);
    return slideContent.value;
  }
});

console.log('🎯 slide-${componentKey}.vue 컴포넌트 로드됨:', {
  lessonTitle: props.lesson?.title,
  slideIndex: props.slideIndex,
  slideTitle: slideTitle.value,
  contentLength: slideContent.value.length
});
</script>

<style scoped>
.slide-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  text-align: center;
}

.slide-header {
  margin-bottom: 2rem;
}

.slide-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1976d2;
  margin-bottom: 1rem;
}

.slide-subtitle {
  font-size: 1.2rem;
  color: #666;
  font-weight: 500;
}

.slide-body {
  flex: 1;
  max-width: 800px;
  margin: 0 auto;
}

.slide-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
}

.slide-description h1,
.slide-description h2,
.slide-description h3,
.slide-description h4,
.slide-description h5,
.slide-description h6 {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #1976d2;
}

.slide-description h1 {
  font-size: 2rem;
}

.slide-description h2 {
  font-size: 1.5rem;
}

.slide-description h3 {
  font-size: 1.3rem;
}

.slide-description p {
  margin-bottom: 1rem;
}

.slide-description ul,
.slide-description ol {
  margin-bottom: 1rem;
  padding-left: 2rem;
}

.slide-description li {
  margin-bottom: 0.5rem;
}

.slide-footer {
  margin-top: 2rem;
}

.slide-number {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1976d2;
  background: rgba(25, 118, 210, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 50px;
}
</style>`;

      // Vue 파일 생성 및 다운로드
      const vueFilename = `slide-${componentKey}.vue`;
      const vueBlob = new Blob([vueContent], { type: 'text/vue' });
      const vueUrl = URL.createObjectURL(vueBlob);
      const vueLink = document.createElement('a');
      vueLink.href = vueUrl;
      vueLink.download = vueFilename;
      document.body.appendChild(vueLink);
      vueLink.click();
      document.body.removeChild(vueLink);
      URL.revokeObjectURL(vueUrl);

      // Markdown 파일도 함께 생성 및 다운로드
      const mdFilename = `slide-${componentKey}.md`;
      const mdBlob = new Blob([markdownContent], { type: 'text/markdown' });
      const mdUrl = URL.createObjectURL(mdBlob);
      const mdLink = document.createElement('a');
      mdLink.href = mdUrl;
      mdLink.download = mdFilename;
      document.body.appendChild(mdLink);
      mdLink.click();
      document.body.removeChild(mdLink);
      URL.revokeObjectURL(mdUrl);

      console.log('✅ Vue 파일과 Markdown 파일 업데이트 완료:', {
        vueFile: vueFilename,
        mdFile: mdFilename,
        contentLength: markdownContent.length,
      });
    } catch (error) {
      console.error('❌ Vue 파일 업데이트 오류:', error);
    }
  };

  // 마크다운 파일 생성 함수
  const createMarkdownFile = (componentKey: string, markdownContent: string) => {
    console.log('🎯 마크다운 파일 생성 시작:', {
      componentKey,
      contentLength: markdownContent.length,
    });

    try {
      // 현재 슬라이드 정보 가져오기
      const lesson = lessons.value[currentLesson.value];
      const slideTitle =
        lesson?.slideTitles?.[currentSlide.value] || `슬라이드 ${currentSlide.value + 1}`;

      // 마크다운 파일 내용 생성
      const mdContent = `# ${slideTitle}

${markdownContent}

---
*생성일: ${new Date().toLocaleString('ko-KR')}*
*파일명: slide-${componentKey}.md*
`;

      const filename = `slide-${componentKey}.md`;
      const blob = new Blob([mdContent], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      console.log('✅ 마크다운 파일 생성 완료:', filename);
      console.log('📁 파일을 src/components/slides/ 폴더에 저장해주세요.');
    } catch (error) {
      console.error('❌ 마크다운 파일 생성 오류:', error);
    }
  };

  // Chapter 파일 생성 함수
  const createChapterFile = (lessonIndex: number) => {
    console.log('🎯 Chapter 파일 생성 시작:', lessonIndex);

    try {
      const lesson = lessons.value[lessonIndex];
      if (!lesson) {
        console.error('❌ 강의를 찾을 수 없습니다:', lessonIndex);
        return;
      }

      // Chapter 파일 내용 생성
      const chapterContent = `# ${lesson.title}

## 강의 개요
- 총 슬라이드 수: ${lesson.slides}개
- 완료 상태: ${lesson.completed ? '완료' : '진행 중'}

## 슬라이드 목록
${lesson.slideTitles?.map((title, index) => `${index + 1}. ${title}`).join('\n') || '슬라이드 제목이 없습니다.'}

---
*생성일: ${new Date().toLocaleString('ko-KR')}*
*강의: ${lesson.title}*
`;

      const filename = `chapter-${lessonIndex + 1}.md`;
      const blob = new Blob([chapterContent], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      console.log('✅ Chapter 파일 생성 완료:', filename);
    } catch (error) {
      console.error('❌ Chapter 파일 생성 오류:', error);
    }
  };

  // Local Storage 관련 함수들
  const loadFromLocalStorage = async () => {
    try {
      // Azure Blob Storage 초기화 시도
      await azureBlobService.initializeFromEnvironment();

      const savedData = await azureBlobService.loadData('courseStore');
      if (savedData) {
        currentLesson.value = savedData.currentLesson || 0;
        currentSlide.value = savedData.currentSlide || 0;
        isPlaying.value = savedData.isPlaying || false;
        sidebarOpen.value = savedData.sidebarOpen ?? true;
        showComments.value = savedData.showComments || false;
        liked.value = savedData.liked || false;
        progress.value = savedData.progress || 15;
        newComment.value = savedData.newComment || '';
        notes.value = savedData.notes || '';

        if (savedData.lessons) {
          lessons.value = savedData.lessons;

          // 데이터 일관성 자동 보정
          lessons.value.forEach((lesson) => {
            if (lesson.slideTitles && lesson.slides !== lesson.slideTitles.length) {
              console.log(
                `🔧 강의 "${lesson.title}" 슬라이드 개수 보정: ${lesson.slides} → ${lesson.slideTitles.length}`,
              );
              lesson.slides = lesson.slideTitles.length;
            } else if (lesson.slideData && lesson.slides !== lesson.slideData.length) {
              console.log(
                `🔧 강의 "${lesson.title}" 슬라이드 개수 보정: ${lesson.slides} → ${lesson.slideData.length}`,
              );
              lesson.slides = lesson.slideData.length;
            }
          });
        }
        if (savedData.comments) {
          comments.value = savedData.comments;
        }

        console.log('✅ Azure Blob Storage에서 데이터 로드 완료');
      }

      // 잠금 상태 로드
      await loadLockStatus();
    } catch (error) {
      console.error('❌ Azure Blob Storage 로드 오류:', error);
    }
  };

  const saveToLocalStorage = async () => {
    try {
      const dataToSave = {
        currentLesson: currentLesson.value,
        currentSlide: currentSlide.value,
        isPlaying: isPlaying.value,
        sidebarOpen: sidebarOpen.value,
        showComments: showComments.value,
        liked: liked.value,
        progress: progress.value,
        newComment: newComment.value,
        notes: notes.value,
        lessons: lessons.value,
        comments: comments.value,
        timestamp: new Date().toISOString(),
      };

      await azureBlobService.saveData('courseStore', dataToSave);
      console.log('✅ Azure Blob Storage 저장 완료');
    } catch (error) {
      console.error('❌ Azure Blob Storage 저장 오류:', error);
    }
  };

  const clearLocalStorage = async () => {
    try {
      await azureBlobService.deleteData('courseStore');
      await azureBlobService.deleteData('courseLockStatus');
      console.log('✅ Azure Blob Storage 클리어 완료');
    } catch (error) {
      console.error('❌ Azure Blob Storage 클리어 오류:', error);
    }
  };

  // 상태 변경 시 자동으로 LocalStorage에 저장
  watch(
    [currentLesson, currentSlide, isPlaying, sidebarOpen, showComments, liked, progress, notes],
    () => {
      saveToLocalStorage().catch((error) => {
        console.error('❌ 자동 저장 실패:', error);
      });
    },
    { deep: true },
  );

  // 잠금 상태 변경 시 자동으로 저장
  watch(
    lessons,
    () => {
      saveLockStatus().catch((error) => {
        console.error('❌ 잠금 상태 자동 저장 실패:', error);
      });
    },
    { deep: true },
  );

  // MD 파일에서 첫 번째 줄을 읽어와서 제목 추출
  const getSlideTitleFromMD = async (componentKey: string): Promise<string> => {
    try {
      const response = await fetch(`/slides/slide-${componentKey}.md`);
      if (!response.ok) {
        return '[제목없음]';
      }

      const content = await response.text();
      const lines = content.split('\n');

      // 첫 번째 줄에서 # 제거하고 제목 추출
      const firstLine = lines[0]?.trim();
      if (firstLine && firstLine.startsWith('#')) {
        return firstLine.replace(/^#+\s*/, '').trim();
      }

      // #이 없으면 첫 번째 줄 그대로 사용
      return firstLine || '[제목없음]';
    } catch (error) {
      console.error('MD 파일 읽기 실패:', error);
      return '[제목없음]';
    }
  };

  // Chapter 제목을 MD 파일에서 읽어오는 함수
  const getChapterTitleFromMD = async (lessonIndex: number): Promise<string> => {
    try {
      const lesson = lessons.value[lessonIndex];
      if (!lesson) return '[제목없음]';

      // Chapter의 첫 번째 슬라이드에서 제목 추출 (slide-{번호}-0.md)
      const componentKey = `${lessonIndex}-0`;
      const response = await fetch(`/slides/slide-${componentKey}.md`);

      if (!response.ok) {
        return lesson.title || '[제목없음]'; // MD 파일이 없으면 기존 제목 사용
      }

      const content = await response.text();
      const lines = content.split('\n');

      // 첫 번째 # 제목을 찾아서 Chapter 제목으로 사용 (## 제목 우선)
      for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('## ')) {
          const title = trimmedLine.replace(/^##\s*/, '').trim();
          return `${lessonIndex}. ${title}`;
        }
        if (trimmedLine.startsWith('# ') && !trimmedLine.includes('-')) {
          const title = trimmedLine.replace(/^#\s*/, '').trim();
          return `${lessonIndex}. ${title}`;
        }
      }

      // 위 조건에 맞지 않으면 첫 번째 # 제목에서 번호 부분을 제거
      const firstLine = lines[0]?.trim();
      if (firstLine && firstLine.startsWith('#')) {
        const title = firstLine.replace(/^#+\s*/, '').trim();
        // "0-0 슬라이드" 같은 형식에서 "슬라이드" 부분만 추출
        const match = title.match(/^\d+-\d+\s+(.+)$/);
        if (match) {
          return `${lessonIndex}. ${match[1]}`;
        }
        return `${lessonIndex}. ${title}`;
      }

      // 아무것도 없으면 기존 제목 사용
      return lesson.title || '[제목없음]';
    } catch (error) {
      console.error('Chapter 제목 읽기 실패:', error);
      const lesson = lessons.value[lessonIndex];
      return lesson?.title || '[제목없음]';
    }
  };

  // JSON 파일에서 강의 데이터 로드
  const loadCourseOutline = async () => {
    try {
      const response = await fetch('/data/course-outline.json');
      const data = await response.json();
      lessons.value = data.lessons;
      console.log('✅ 강의 목차 로드 완료:', data.title);
    } catch (error) {
      console.error('❌ 강의 목차 로드 실패:', error);
      // 기본 데이터로 폴백
      lessons.value = [
        {
          title: '0. INTRO',
          slides: 2,
          completed: false,
          videoUrl: null,
          slideTitles: ['워크샵 소개', '오늘의 여정'],
          slideData: [
            { title: '워크샵 소개', hasVideo: false },
            { title: '오늘의 여정', hasVideo: false },
          ],
        },
        {
          title: '1. WHY',
          slides: 4,
          completed: false,
          videoUrl: null,
          slideTitles: [
            '생성형AI란?',
            'AI 시대의 도전과 기회',
            '목회자의 AI 활용 사례',
            'AI가 바꾸는 목회 패러다임',
          ],
          slideData: [
            { title: '생성형AI란?', hasVideo: false },
            { title: 'AI 시대의 도전과 기회', hasVideo: false },
            { title: '목회자의 AI 활용 사례', hasVideo: false },
            { title: 'AI가 바꾸는 목회 패러다임', hasVideo: false },
          ],
        },
      ];
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
    isPresentationMode,
    lessons,
    comments,

    // 계산된 속성
    currentLessonData,
    currentSlideData,
    hasVideo,
    slideProgress,

    // 액션
    setCurrentLesson,
    setCurrentSlide,
    addSlideToLesson,
    nextSlide,
    prevSlide,
    togglePlaying,
    toggleSidebar,
    togglePresentationMode,
    toggleComments,
    toggleLiked,
    handleCaptureSlide,
    handleSendNotesByEmail,
    addComment,
    updateNotes,
    saveNotes,
    clearNotes,
    toggleCommentLike,

    // 슬라이드 내용 관련 함수들
    getCurrentSlideContent,
    saveSlideContent,
    getCurrentSlideType,

    // 파일 생성/업데이트 함수들
    updateVueFileWithMarkdown,
    createMarkdownFile,
    createChapterFile,

    // Local Storage 함수들
    loadFromLocalStorage,
    saveToLocalStorage,
    clearLocalStorage,

    // 강의 목차 로드 함수
    loadCourseOutline,

    // MD 파일 기반 목차 생성 함수
    generateCourseOutlineFromMD,
    initializeCourseOutline,

    // MD 파일 제목 읽기 함수
    getSlideTitleFromMD,

    // Chapter 제목 읽기 함수
    getChapterTitleFromMD,

    // MD 파일 내용 읽기 함수
    getSlideContentFromMD,

    // MD 파일 내용 저장 함수
    saveSlideContentToMD,

    // 슬라이드 선택 시 MD 파일 로드 함수
    loadSlideContentForEditing,

    // MD 파일 덮어쓰기 함수
    overwriteSlideContentToMD,

    // 잠금 관련 함수들
    toggleChapterLock,
    toggleSlideLock,
    isChapterLocked,
    isSlideLocked,
    canNavigateToSlide,
    saveLockStatus,
    loadLockStatus,
    clearLockStatus,
  };
});
