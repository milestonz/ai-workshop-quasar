import { ref, computed, watch } from 'vue';
import { defineStore } from 'pinia';
import { slideLog } from 'src/utils/logger';
import type { SlideData, Lesson, Comment } from '../types/slide';
import {
  ref as storageRef,
  uploadString,
  getDownloadURL,
  deleteObject,
  listAll,
} from 'firebase/storage';
import { updateDoc, serverTimestamp, collection, getDocs, query, where } from 'firebase/firestore';
import { storage, firebaseApp, db as appDb } from '../firebase/config';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

export const useCourseStore = defineStore('course', () => {
  // 상태
  const currentLesson = ref(0);
  const currentSlide = ref(0);
  const currentCourseId = ref<string>('ai-workshop');
  const isPlaying = ref(false);
  const sidebarOpen = ref(true);
  const showComments = ref(false);
  const liked = ref(false);
  const progress = ref(15);
  const newComment = ref('');
  const notes = ref('');
  const isPresentationMode = ref(true); // 기본값을 true로 변경

  // 강의 데이터 - MD 파일 기반으로 동적 생성
  const lessons = ref<Lesson[]>([]);

  // MD 파일에서 목차를 동적으로 생성하는 함수
  const generateCourseOutlineFromMD = async (): Promise<Lesson[]> => {
    try {
      // 1. 캐시 무효화 확인
      try {
        const cacheResponse = await fetch('/slides/toc-cache-invalidation.json');
        if (cacheResponse.ok) {
          const cacheData = await cacheResponse.json();
          slideLog.log(`🔄 캐시 무효화 감지: ${cacheData.lastBuild}`);
        }
      } catch (error) {
        slideLog.warn('⚠️ 캐시 무효화 파일 확인 실패:', error);
      }

      // 2. 통합 사이드바 데이터 가져오기 (우선 시도)
      let sidebarData = null;
      try {
        const sidebarResponse = await fetch('/slides/sidebar-data.json');
        if (sidebarResponse.ok) {
          sidebarData = await sidebarResponse.json();
          slideLog.log(
            '✅ 통합 사이드바 데이터 로드 완료:',
            sidebarData.slides.length,
            '개 슬라이드,',
            Object.keys(sidebarData.chapters).length,
            '개 챕터',
          );

          // 사이드바 데이터가 있으면 그것을 사용하여 Lesson 배열 생성
          if (sidebarData.chapters && Object.keys(sidebarData.chapters).length > 0) {
            const generatedLessons: Lesson[] = [];

            // Chapter 번호로 정렬
            const chapterNumbers = Object.keys(sidebarData.chapters)
              .map(Number)
              .sort((a, b) => a - b);

            for (const chapterNum of chapterNumbers) {
              const chapter = sidebarData.chapters[chapterNum.toString()];
              if (!chapter || !chapter.slides) continue;

              // 슬라이드 제목들 추출
              const slideTitles: string[] = [];
              const slideData: SlideData[] = [];

              for (let i = 0; i < chapter.slides.length; i++) {
                const slide = chapter.slides[i];
                const title = slide.title || `슬라이드 ${slide.slide}`;
                slideTitles.push(title);

                slideData.push({
                  title: title,
                  videoUrl: slide.videoUrl || null,
                  hasVideo: slide.videoUrl ? true : false,
                });
              }

              const lesson: Lesson = {
                title: chapter.title || `Chapter ${chapterNum}`,
                slides: slideTitles.length,
                slideData: slideData,
                completed: false,
                videoUrl: null,
                slideTitles: slideTitles,
                locked: false,
              };

              generatedLessons.push(lesson);
            }

            slideLog.log(
              '✅ 사이드바 데이터로부터 Lesson 배열 생성 완료:',
              generatedLessons.length,
              '개 챕터',
            );
            return generatedLessons;
          }
        }
      } catch (error) {
        slideLog.warn('⚠️ 통합 사이드바 데이터 로드 실패:', error);
      }

      // 3. 파일 목록 가져오기
      let mdFiles: string[] = [];
      try {
        const response = await fetch('/slides/files.json');
        if (response.ok) {
          const data = await response.json();
          mdFiles = data.files || [];
          slideLog.log('✅ 파일 목록 로드 완료:', mdFiles.length, '개 파일');
        } else {
          throw new Error('files.json을 읽을 수 없습니다');
        }
      } catch (error) {
        slideLog.warn('❌ JSON 파일 로드 실패, 하드코딩된 목록 사용:', error);
        // fallback: 하드코딩된 목록
        mdFiles = [
          'slide-0-0.md',
          'slide-0-1.md',
          'slide-0-2.md',
          'slide-0-3.md',
          'slide-0-4.md',
          'slide-0-5.md',
          'slide-0-6.md',
          'slide-1-0.md',
          'slide-1-1.md',
          'slide-1-2.md',
          'slide-1-3.md',
          'slide-1-4.md',
          'slide-1-5.md',
          'slide-1-6.md',
          'slide-1-7.md',
          'slide-1-8.md',
          'slide-1-9.md',
          'slide-1-10.md',
          'slide-1-11.md',
          'slide-1-12.md',
          'slide-1-13.md',
          'slide-1-14.md',
          'slide-2-0.md',
          'slide-2-1.md',
          'slide-2-2.md',
          'slide-2-3.md',
          'slide-2-4.md',
          'slide-2-5.md',
          'slide-2-6.md',
          'slide-2-7.md',
          'slide-2-8.md',
          'slide-2-9.md',
          'slide-2-10.md',
          'slide-2-11.md',
          'slide-2-12.md',
          'slide-2-13.md',
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
          'slide-4-3.md',
          'slide-5-0.md',
          'slide-5-1.md',
          'slide-6-0.md',
          'slide-6-1.md',
          'slide-6-2.md',
          'slide-6-3.md',
          'slide-6-4.md',
          'slide-6-5.md',
          'slide-6-6.md',
          'slide-6-7.md',
          'slide-7-0.md',
          'slide-7-1.md',
          'slide-7-2.md',
          'slide-7-3.md',
          'slide-7-4.md',
          'slide-7-5.md',
          'slide-7-6.md',
          'slide-7-7.md',
          'slide-7-8.md',
          'slide-7-9.md',
          'slide-7-10.md',
          'slide-7-11.md',
          'slide-7-12.md',
          'slide-7-13.md',
          'slide-7-14.md',
          'slide-7-15.md',
          'slide-8-0.md',
          'slide-8-1.md',
          'slide-8-2.md',
          'slide-8-3.md',
          'slide-8-4.md',
          'slide-8-5.md',
          'slide-8-6.md',
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

          // Chapter 제목 추출 로직 - HTML 제목 태그 우선
          let extractedTitle = '';

          // 1. HTML 제목 태그를 우선적으로 찾기 (<h1>, <h2>, <h3>)
          const htmlTitleMatch = firstSlideContent.match(/<h[1-3][^>]*>([^<]+)<\/h[1-3]>/);
          if (htmlTitleMatch && htmlTitleMatch[1]) {
            extractedTitle = htmlTitleMatch[1].trim().replace(/^#+\s*/, '');
            console.log(`📝 Chapter 제목 추출 (HTML): ${extractedTitle}`);
          }

          // 2. HTML 제목이 없으면 마크다운 제목 찾기
          if (!extractedTitle) {
            // ### 로 시작하는 제목을 우선적으로 찾기
            const titleMatch = firstSlideContent.match(/^###\s*(.+)$/m);
            if (titleMatch && titleMatch[1]) {
              extractedTitle = titleMatch[1].trim();
              console.log(`📝 Chapter 제목 추출 (###): ${extractedTitle}`);
            }
          }

          // 3. ### 제목이 없으면 ## 제목 찾기
          if (!extractedTitle) {
            const h2Match = firstSlideContent.match(/^##\s*(.+)$/m);
            if (h2Match && h2Match[1]) {
              extractedTitle = h2Match[1].trim();
              console.log(`📝 Chapter 제목 추출 (##): ${extractedTitle}`);
            }
          }

          // 4. ## 제목도 없으면 # 제목 찾기
          if (!extractedTitle) {
            const h1Match = firstSlideContent.match(/^#\s*(.+)$/m);
            if (h1Match && h1Match[1]) {
              extractedTitle = h1Match[1].trim();
              console.log(`📝 Chapter 제목 추출 (#): ${extractedTitle}`);
            }
          }

          if (extractedTitle.length > 0) {
            chapterTitle = `${chapterNum}. ${extractedTitle}`;
            console.log(`📝 Chapter ${chapterNum} 제목 설정: ${chapterTitle}`);
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

            // 제목 추출 로직 - HTML 제목 태그 우선
            let title = '';

            // 1. HTML 제목 태그를 우선적으로 찾기 (<h1>, <h2>, <h3>)
            const htmlTitleMatch = content.match(/<h[1-3][^>]*>([^<]+)<\/h[1-3]>/);
            if (htmlTitleMatch && htmlTitleMatch[1]) {
              title = htmlTitleMatch[1].trim().replace(/^#+\s*/, '');
              console.log(`📝 제목 추출 (HTML): ${title}`);
            }

            // 2. HTML 제목이 없으면 마크다운 제목 찾기
            if (!title) {
              // ### 로 시작하는 제목을 우선적으로 찾기 (첫 번째 줄)
              const titleMatch = content.match(/^###\s*(.+)$/m);
              if (titleMatch && titleMatch[1]) {
                title = titleMatch[1].trim();
                console.log(`📝 제목 추출 (###): ${title}`);
              }
            }

            // 3. ### 제목이 없으면 ## 제목 찾기
            if (!title) {
              const h2Match = content.match(/^##\s*(.+)$/m);
              if (h2Match && h2Match[1]) {
                title = h2Match[1].trim();
                console.log(`📝 제목 추출 (##): ${title}`);
              }
            }

            // 4. ## 제목도 없으면 # 제목 찾기
            if (!title) {
              const h1Match = content.match(/^#\s*(.+)$/m);
              if (h1Match && h1Match[1]) {
                title = h1Match[1].trim();
                console.log(`📝 제목 추출 (#): ${title}`);
              }
            }

            // 5. 마크다운 제목이 없으면 파일명에서 슬라이드 번호 추출
            if (!title) {
              const slideMatch = file.match(/slide-(\d+)-(\d+)\.md/);
              if (slideMatch && slideMatch[1] && slideMatch[2]) {
                // 배열 인덱스를 사용하여 슬라이드 번호 표시
                title = `${slideMatch[1]}-${i}`;
                console.log(`📝 제목 추출 (파일명): ${title}`);
              } else {
                title = `슬라이드 ${i + 1}`;
                console.log(`📝 제목 추출 (기본): ${title}`);
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
              // 배열 인덱스를 사용하여 슬라이드 번호 표시
              fallbackTitle = `${slideMatch[1]}-${i}`;
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
        slides: 7,
        completed: false,
        videoUrl: null,
        slideTitles: [
          '워크샵 소개',
          '오늘의 여정',
          '워크샵 구성',
          'AI 시대의 도전과 기회',
          '목회자의 AI 활용 사례',
          'AI가 바꾸는 목회 패러다임',
          '생성형AI 이론',
        ],
        slideData: [
          { title: '워크샵 소개', videoUrl: null, hasVideo: false },
          { title: '오늘의 여정', videoUrl: null, hasVideo: false },
          { title: '워크샵 구성', videoUrl: null, hasVideo: false },
          { title: 'AI 시대의 도전과 기회', videoUrl: null, hasVideo: false },
          { title: '목회자의 AI 활용 사례', videoUrl: null, hasVideo: false },
          { title: 'AI가 바꾸는 목회 패러다임', videoUrl: null, hasVideo: false },
          { title: '생성형AI 이론', videoUrl: null, hasVideo: false },
        ],
      },
      {
        title: '1. WHY',
        slides: 15,
        completed: false,
        videoUrl: null,
        slideTitles: [
          '생성형AI란?',
          'AI 시대의 도전과 기회',
          '목회자의 AI 활용 사례',
          'AI가 바꾸는 목회 패러다임',
          '1단계: 성경 전체를 읽히기 (데이터 수집)',
          '2단계: 단어 연결 패턴 배우기',
          '3단계: 다음 단어 맞추기 학습',
          '4단계: 문맥 이해하기',
          '5단계: 다양한 번역본으로 학습',
          '6단계: 질문-답변 패턴 학습',
          '7단계: 실제 적용 예시',
          '중요한 깨달음',
          '결론',
          'UX 시나리오를 기반으로 AI 활용법',
          '시나리오: 주일 설교 준비',
        ],
        slideData: [
          { title: '생성형AI란?', videoUrl: null, hasVideo: false },
          { title: 'AI 시대의 도전과 기회', videoUrl: null, hasVideo: false },
          { title: '목회자의 AI 활용 사례', videoUrl: null, hasVideo: false },
          { title: 'AI가 바꾸는 목회 패러다임', videoUrl: null, hasVideo: false },
          { title: '1단계: 성경 전체를 읽히기 (데이터 수집)', videoUrl: null, hasVideo: false },
          { title: '2단계: 단어 연결 패턴 배우기', videoUrl: null, hasVideo: false },
          { title: '3단계: 다음 단어 맞추기 학습', videoUrl: null, hasVideo: false },
          { title: '4단계: 문맥 이해하기', videoUrl: null, hasVideo: false },
          { title: '5단계: 다양한 번역본으로 학습', videoUrl: null, hasVideo: false },
          { title: '6단계: 질문-답변 패턴 학습', videoUrl: null, hasVideo: false },
          { title: '7단계: 실제 적용 예시', videoUrl: null, hasVideo: false },
          { title: '중요한 깨달음', videoUrl: null, hasVideo: false },
          { title: '결론', videoUrl: null, hasVideo: false },
          { title: 'UX 시나리오를 기반으로 AI 활용법', videoUrl: null, hasVideo: false },
          { title: '시나리오: 주일 설교 준비', videoUrl: null, hasVideo: false },
        ],
      },
      {
        title: '2. WHAT',
        slides: 14,
        completed: false,
        videoUrl: null,
        slideTitles: [
          'AI 시대, 목회자를 위한 프롬프팅 10가지 비법',
          '1. 명확하고 구체적 질문 - 기본 중의 기본',
          '2. 역할 부여 - "당신은 ○○ 전문가입니다"',
          '3. 대상과 맥락 설명 - 청중과 상황 설정',
          '4. 열린 질문 - 창의적 답변 유도',
          '5. 예시 제공 - Few-shot Prompting',
          '6. 어조와 스타일 - 목적에 맞는 톤',
          '7. 원칙 또는 제약 - 경계선 설정',
          '8. 시나리오 활용 - 가상 상황 설정',
          '9. 구조화된 지시 - 단계별 명령',
          '10. 비교하기 - 옵션 분석 요청',
          '마무리',
          '추가 슬라이드',
        ],
        slideData: [
          { title: 'AI 시대, 목회자를 위한 프롬프팅 10가지 비법', videoUrl: null, hasVideo: false },
          { title: '1. 명확하고 구체적 질문 - 기본 중의 기본', videoUrl: null, hasVideo: false },
          { title: '2. 역할 부여 - "당신은 ○○ 전문가입니다"', videoUrl: null, hasVideo: false },
          { title: '3. 대상과 맥락 설명 - 청중과 상황 설정', videoUrl: null, hasVideo: false },
          { title: '4. 열린 질문 - 창의적 답변 유도', videoUrl: null, hasVideo: false },
          { title: '5. 예시 제공 - Few-shot Prompting', videoUrl: null, hasVideo: false },
          { title: '6. 어조와 스타일 - 목적에 맞는 톤', videoUrl: null, hasVideo: false },
          { title: '7. 원칙 또는 제약 - 경계선 설정', videoUrl: null, hasVideo: false },
          { title: '8. 시나리오 활용 - 가상 상황 설정', videoUrl: null, hasVideo: false },
          { title: '9. 구조화된 지시 - 단계별 명령', videoUrl: null, hasVideo: false },
          { title: '10. 비교하기 - 옵션 분석 요청', videoUrl: null, hasVideo: false },
          { title: '마무리', videoUrl: null, hasVideo: false },
          { title: '추가 슬라이드', videoUrl: null, hasVideo: false },
        ],
      },
      {
        title: '3. HOW',
        slides: 9,
        completed: false,
        videoUrl: null,
        slideTitles: Array.from({ length: 9 }, (_, i) => `슬라이드 ${i + 1}`),
        slideData: Array.from({ length: 9 }, (_, i) => ({
          title: `슬라이드 ${i + 1}`,
          videoUrl: null,
          hasVideo: false,
        })),
      },
      {
        title: '4. TOOLS',
        slides: 4,
        completed: false,
        videoUrl: null,
        slideTitles: Array.from({ length: 4 }, (_, i) => `슬라이드 ${i + 1}`),
        slideData: Array.from({ length: 4 }, (_, i) => ({
          title: `슬라이드 ${i + 1}`,
          videoUrl: null,
          hasVideo: false,
        })),
      },
      {
        title: '5. PRACTICE',
        slides: 2,
        completed: false,
        videoUrl: null,
        slideTitles: Array.from({ length: 2 }, (_, i) => `슬라이드 ${i + 1}`),
        slideData: Array.from({ length: 2 }, (_, i) => ({
          title: `슬라이드 ${i + 1}`,
          videoUrl: null,
          hasVideo: false,
        })),
      },
      {
        title: '6. UX 시나리오',
        slides: 8,
        completed: false,
        videoUrl: null,
        slideTitles: [
          'UX 시나리오를 기반으로 AI 활용법',
          '시나리오: 주일 설교 준비',
          'Bad Example: AI에게 모든 것을 떠넘기는 방식',
          "Good Example: 구체적으로 '요청'하는 방식",
          "Best Example: AI와 '대화'하며 생각을 증폭시키는 방식",
          'Best Example: 프롬프트 예시',
          'Best Example: 무엇이 최고인가?',
          '한눈에 보는 비교표',
        ],
        slideData: [
          { title: 'UX 시나리오를 기반으로 AI 활용법', videoUrl: null, hasVideo: false },
          { title: '시나리오: 주일 설교 준비', videoUrl: null, hasVideo: false },
          { title: 'Bad Example: AI에게 모든 것을 떠넘기는 방식', videoUrl: null, hasVideo: false },
          { title: "Good Example: 구체적으로 '요청'하는 방식", videoUrl: null, hasVideo: false },
          {
            title: "Best Example: AI와 '대화'하며 생각을 증폭시키는 방식",
            videoUrl: null,
            hasVideo: false,
          },
          { title: 'Best Example: 프롬프트 예시', videoUrl: null, hasVideo: false },
          { title: 'Best Example: 무엇이 최고인가?', videoUrl: null, hasVideo: false },
          { title: '한눈에 보는 비교표', videoUrl: null, hasVideo: false },
        ],
      },
      {
        title: '7. AI 툴 복합 적용 시연/실습 (12가지 시나리오)',
        slides: 16,
        completed: false,
        videoUrl: null,
        slideTitles: [
          'AI 툴 복합 적용 시연/실습 (12가지 시나리오)',
          'LEVEL 1: 기본 툴, 핵심 기능 마스터하기 (1~3단계)',
          '1. 이준호 목사: 주일설교 주제 선정',
          '2. 김은혜 목사: 설교문 구조화',
          '3. 김 목사(58세): 기존 설교 리프레시',
          'LEVEL 2: 여러 툴을 연결하는 워크플로우 만들기 (4~8단계)',
          '4. 박성민 목사: 성경공부 교재 제작',
          '5. 한소영 목사 (SNS 콘텐츠) & 강민호 목사 (예배 디자인)',
          '6. 류 목사(51세): 성도 위로 메시지 & 기도 배경음악',
          '7. 윤 목사(41세) & 정다솔 수련목회자: 행정 업무 자동화',
          '8. 신혜숙 목사: 상담 준비',
          'LEVEL 3: AI를 나만의 도구로 만들고 사역을 기획하기 (9~12단계)',
          '9. 정태영 목사: 새신자 환영 시스템 구축',
          '10. 윤석진 목사: 교회 행사 기획',
          '11. 이미영 목사: 어린이 교육 커리큘럼',
          '12. 김도현 목사: 온라인 목양 & 미래 조망',
        ],
        slideData: [
          { title: 'AI 툴 복합 적용 시연/실습 (12가지 시나리오)', videoUrl: null, hasVideo: false },
          {
            title: 'LEVEL 1: 기본 툴, 핵심 기능 마스터하기 (1~3단계)',
            videoUrl: null,
            hasVideo: false,
          },
          { title: '1. 이준호 목사: 주일설교 주제 선정', videoUrl: null, hasVideo: false },
          { title: '2. 김은혜 목사: 설교문 구조화', videoUrl: null, hasVideo: false },
          { title: '3. 김 목사(58세): 기존 설교 리프레시', videoUrl: null, hasVideo: false },
          {
            title: 'LEVEL 2: 여러 툴을 연결하는 워크플로우 만들기 (4~8단계)',
            videoUrl: null,
            hasVideo: false,
          },
          { title: '4. 박성민 목사: 성경공부 교재 제작', videoUrl: null, hasVideo: false },
          {
            title: '5. 한소영 목사 (SNS 콘텐츠) & 강민호 목사 (예배 디자인)',
            videoUrl: null,
            hasVideo: false,
          },
          {
            title: '6. 류 목사(51세): 성도 위로 메시지 & 기도 배경음악',
            videoUrl: null,
            hasVideo: false,
          },
          {
            title: '7. 윤 목사(41세) & 정다솔 수련목회자: 행정 업무 자동화',
            videoUrl: null,
            hasVideo: false,
          },
          { title: '8. 신혜숙 목사: 상담 준비', videoUrl: null, hasVideo: false },
          {
            title: 'LEVEL 3: AI를 나만의 도구로 만들고 사역을 기획하기 (9~12단계)',
            videoUrl: null,
            hasVideo: false,
          },
          { title: '9. 정태영 목사: 새신자 환영 시스템 구축', videoUrl: null, hasVideo: false },
          { title: '10. 윤석진 목사: 교회 행사 기획', videoUrl: null, hasVideo: false },
          { title: '11. 이미영 목사: 어린이 교육 커리큘럼', videoUrl: null, hasVideo: false },
          { title: '12. 김도현 목사: 온라인 목양 & 미래 조망', videoUrl: null, hasVideo: false },
        ],
      },
      {
        title: '8. 실전 AI 활용 워크숍: 청년 수련회 기획',
        slides: 7,
        completed: false,
        videoUrl: null,
        slideTitles: [
          '실전 AI 활용 워크숍: 청년 수련회 기획',
          '1️⃣ ChatGPT 창의적 기획',
          '2️⃣ Perplexity 실시간 정보 수집',
          '3️⃣ 멀티미디어 홍보 패키지',
          '3️⃣ 멀티미디어 홍보 패키지 (계속)',
          '4️⃣ 예산 최적화 계획',
          '8-6. 수련회 예산 계획 결과',
        ],
        slideData: [
          { title: '실전 AI 활용 워크숍: 청년 수련회 기획', videoUrl: null, hasVideo: false },
          { title: '1️⃣ ChatGPT 창의적 기획', videoUrl: null, hasVideo: false },
          { title: '2️⃣ Perplexity 실시간 정보 수집', videoUrl: null, hasVideo: false },
          { title: '3️⃣ 멀티미디어 홍보 패키지', videoUrl: null, hasVideo: false },
          { title: '3️⃣ 멀티미디어 홍보 패키지 (계속)', videoUrl: null, hasVideo: false },
          { title: '4️⃣ 예산 최적화 계획', videoUrl: null, hasVideo: false },
          { title: '8-6. 수련회 예산 계획 결과', videoUrl: null, hasVideo: false },
        ],
      },
    ];
  };

  // 초기화 함수 - 앱 시작 시 호출
  const initializeCourseOutline = async () => {
    try {
      slideLog.log('🚀 강의 목차 초기화 시작...');

      // 1. 기본 목차로 먼저 표시 (즉시 사용 가능)
      lessons.value = generateDefaultLessons();
      slideLog.log('✅ 기본 목차 즉시 표시 완료');

      // 2. 백그라운드에서 MD 파일 기반 목차 로드
      setTimeout(async () => {
        try {
          const generatedLessons = await generateCourseOutlineFromMD();
          if (generatedLessons && generatedLessons.length > 0) {
            lessons.value = generatedLessons;
            slideLog.log('✅ MD 파일 기반 목차 로드 완료:', generatedLessons);
          } else {
            slideLog.warn('⚠️ MD 파일에서 목차를 생성할 수 없어 기본 목차를 유지합니다.');
          }
        } catch (error) {
          slideLog.error('❌ MD 파일 목차 로드 실패 (기본 목차 유지):', error);
        }
      }, 100); // 100ms 지연으로 백그라운드 처리
    } catch (error) {
      slideLog.error('❌ 목차 초기화 실패:', error);
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

  const setCurrentSlideByLessonAndSlide = (lessonIndex: number, slideIndex: number) => {
    if (lessonIndex >= 0 && lessonIndex < lessons.value.length) {
      currentLesson.value = lessonIndex;
      const lessonData = lessons.value[lessonIndex];
      if (lessonData && slideIndex >= 0 && slideIndex < lessonData.slides) {
        currentSlide.value = slideIndex;
        console.log(`✅ 슬라이드 설정 완료: ${lessonIndex}-${slideIndex}`);
      }
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

  // MD 파일에서 슬라이드 내용을 읽어오는 함수 (로컬 우선, Firebase Storage 폴백)
  const getSlideContentFromMD = async (componentKey: string): Promise<string> => {
    console.log('📂 getSlideContentFromMD 시작:', componentKey);

    // 로컬 파일에서 먼저 시도
    try {
      const url = `/slides/slide-${componentKey}.md`;
      console.log('🌐 로컬 파일 요청 URL:', url);

      const response = await fetch(url);
      console.log('📡 응답 상태:', response.status, response.statusText);

      if (response.ok) {
        const content = await response.text();
        console.log('✅ 로컬 MD 파일 내용 읽기 완료:', {
          contentLength: content.length,
          contentPreview: content.substring(0, 100),
        });
        return content;
      } else {
        console.log('❌ 로컬 파일 응답 실패:', response.status, response.statusText);
      }
    } catch (error) {
      console.log('⚠️ 로컬 파일 로드 실패, Firebase Storage 폴백 시도:', error);
    }

    // Firebase Storage에서 폴백 (로컬 파일이 없을 때만)
    if (storage) {
      try {
        console.log('🔥 Firebase Storage에서 시도:', componentKey);
        const content = await loadSlideFromFirebaseStorage(componentKey);
        if (content) {
          console.log('✅ Firebase Storage에서 로드 성공:', componentKey);
          return content;
        }
      } catch (error) {
        console.log('⚠️ Firebase Storage 로드 실패:', error);
      }
    }

    console.log('❌ 모든 소스에서 파일을 찾을 수 없음:', componentKey);
    return '';
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
  const saveSlideContentToMD = async (componentKey: string, content: string): Promise<boolean> => {
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
*파일명: slide-${componentKey}.md*`;

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
      return true;
    } catch (error) {
      console.error('❌ MD 파일 저장 오류:', error);
      return false;
    }
  };

  // Firebase Storage를 사용하여 MD 파일을 저장하는 함수
  const saveSlideToFirebaseStorage = async (componentKey: string, content: string) => {
    try {
      console.log('📝 Firebase Storage에 MD 파일 저장 시작:', componentKey);
      console.log('📝 저장할 내용 길이:', content.length);

      if (!storage) {
        throw new Error('Firebase Storage가 초기화되지 않았습니다.');
      }

      // Firebase Storage에 파일 업로드
      const slideRef = storageRef(storage, `slides/${componentKey}.md`);
      await uploadString(slideRef, content, 'raw');

      // Firestore에 메타데이터 업데이트 (db가 초기화된 경우에만)
      if (appDb) {
        const slideDocRef = doc(appDb, 'slides', componentKey);
        await updateDoc(slideDocRef, {
          lastModified: serverTimestamp(),
          size: content.length,
          fileName: `${componentKey}.md`,
          updatedAt: new Date().toISOString(),
        });
      }

      console.log('✅ Firebase Storage에 MD 파일 저장 성공:', componentKey);
      return true;
    } catch (error) {
      console.error('❌ Firebase Storage 저장 오류:', error);
      return false;
    }
  };

  // Firebase Storage에서 MD 파일을 로드하는 함수
  const loadSlideFromFirebaseStorage = async (componentKey: string): Promise<string> => {
    try {
      console.log('📖 Firebase Storage에서 MD 파일 로드 시작:', componentKey);

      if (!storage) {
        throw new Error('Firebase Storage가 초기화되지 않았습니다.');
      }

      const slideRef = storageRef(storage, `slides/${componentKey}.md`);
      const downloadURL = await getDownloadURL(slideRef);
      const response = await fetch(downloadURL);
      const content = await response.text();

      console.log('✅ Firebase Storage에서 MD 파일 로드 성공:', componentKey);
      return content;
    } catch (error) {
      console.error('❌ Firebase Storage 로드 오류:', error);
      throw error;
    }
  };

  // Firebase Storage에서 모든 슬라이드 파일 목록을 가져오는 함수
  const listAllSlidesFromFirebase = async (): Promise<string[]> => {
    try {
      console.log('📋 Firebase Storage에서 슬라이드 목록 가져오기 시작');

      if (!storage) {
        throw new Error('Firebase Storage가 초기화되지 않았습니다.');
      }

      const slidesRef = storageRef(storage, 'slides');
      const result = await listAll(slidesRef);
      const fileNames = result.items.map((item) => item.name.replace('.md', ''));

      console.log(
        '✅ Firebase Storage에서 슬라이드 목록 가져오기 성공:',
        fileNames.length,
        '개 파일',
      );
      return fileNames;
    } catch (error) {
      console.error('❌ Firebase Storage 목록 가져오기 오류:', error);
      return [];
    }
  };

  // Firebase Storage에서 MD 파일을 삭제하는 함수
  const deleteSlideFromFirebaseStorage = async (componentKey: string) => {
    try {
      console.log('🗑️ Firebase Storage에서 MD 파일 삭제 시작:', componentKey);

      if (!storage) {
        throw new Error('Firebase Storage가 초기화되지 않았습니다.');
      }

      const slideRef = storageRef(storage, `slides/${componentKey}.md`);
      await deleteObject(slideRef);

      console.log('✅ Firebase Storage에서 MD 파일 삭제 성공:', componentKey);
      return true;
    } catch (error) {
      console.error('❌ Firebase Storage 삭제 오류:', error);
      return false;
    }
  };

  // 기존 함수를 Firebase Storage 버전으로 대체
  const overwriteSlideContentToMD = async (componentKey: string, content: string) => {
    return await saveSlideToFirebaseStorage(componentKey, content);
  };

  // Chapter 잠금 토글 함수
  const toggleChapterLock = (lessonIndex: number) => {
    if (lessons.value[lessonIndex]) {
      lessons.value[lessonIndex].locked = !lessons.value[lessonIndex].locked;
      console.log(`🔒 Chapter ${lessonIndex} 잠금 상태 변경:`, lessons.value[lessonIndex].locked);
      saveToLocalStorage(); // 로컬 스토리지에 저장
      // Firestore 동기화 (관리자 모드에서만 권한 허용됨)
      saveLockStatusToFirestore(currentCourseId.value).catch((e) =>
        console.warn('⚠️ Firestore 잠금 동기화 실패(Chapter):', e?.message || e),
      );
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
      // Firestore 동기화 (관리자 모드 권한 필요)
      saveLockStatusToFirestore(currentCourseId.value).catch((e) =>
        console.warn('⚠️ Firestore 잠금 동기화 실패(Slide):', e?.message || e),
      );
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

  // 다음 잠금 해제된 슬라이드 찾기
  const findNextUnlockedSlide = (
    currentLessonIndex: number,
    currentSlideIndex: number,
  ): { lessonIndex: number; slideIndex: number } | null => {
    let lessonIndex = currentLessonIndex;
    let slideIndex = currentSlideIndex + 1;

    // 현재 Chapter에서 다음 슬라이드부터 검색
    while (lessonIndex < lessons.value.length) {
      const lesson = lessons.value[lessonIndex];

      if (!lesson) {
        lessonIndex++;
        slideIndex = 0;
        continue;
      }

      // Chapter가 잠겨있으면 다음 Chapter로
      if (lesson.locked) {
        lessonIndex++;
        slideIndex = 0;
        continue;
      }

      // 현재 Chapter의 슬라이드들을 검색
      while (slideIndex < lesson.slides) {
        if (!isSlideLocked(lessonIndex, slideIndex)) {
          return { lessonIndex, slideIndex };
        }
        slideIndex++;
      }

      // 다음 Chapter로 이동
      lessonIndex++;
      slideIndex = 0;
    }

    return null; // 더 이상 잠금 해제된 슬라이드가 없음
  };

  // 이전 잠금 해제된 슬라이드 찾기
  const findPrevUnlockedSlide = (
    currentLessonIndex: number,
    currentSlideIndex: number,
  ): { lessonIndex: number; slideIndex: number } | null => {
    let lessonIndex = currentLessonIndex;
    let slideIndex = currentSlideIndex - 1;

    // 현재 Chapter에서 이전 슬라이드부터 검색
    while (lessonIndex >= 0) {
      const lesson = lessons.value[lessonIndex];

      if (!lesson) {
        lessonIndex--;
        if (lessonIndex >= 0) {
          const prevLesson = lessons.value[lessonIndex];
          slideIndex = prevLesson ? prevLesson.slides - 1 : -1;
        }
        continue;
      }

      // Chapter가 잠겨있으면 이전 Chapter로
      if (lesson.locked) {
        lessonIndex--;
        if (lessonIndex >= 0) {
          const prevLesson = lessons.value[lessonIndex];
          slideIndex = prevLesson ? prevLesson.slides - 1 : -1;
        }
        continue;
      }

      // 현재 Chapter의 슬라이드들을 검색
      while (slideIndex >= 0) {
        if (!isSlideLocked(lessonIndex, slideIndex)) {
          return { lessonIndex, slideIndex };
        }
        slideIndex--;
      }

      // 이전 Chapter로 이동
      lessonIndex--;
      if (lessonIndex >= 0) {
        const prevLesson = lessons.value[lessonIndex];
        slideIndex = prevLesson ? prevLesson.slides - 1 : -1;
      }
    }

    return null; // 더 이상 잠금 해제된 슬라이드가 없음
  };

  // 첫 번째 잠금 해제된 슬라이드 찾기
  const findFirstUnlockedSlide = (): { lessonIndex: number; slideIndex: number } | null => {
    for (let lessonIndex = 0; lessonIndex < lessons.value.length; lessonIndex++) {
      const lesson = lessons.value[lessonIndex];

      if (!lesson) continue;

      // Chapter가 잠겨있으면 다음 Chapter로
      if (lesson.locked) {
        continue;
      }

      // Chapter의 슬라이드들을 검색
      for (let slideIndex = 0; slideIndex < lesson.slides; slideIndex++) {
        if (!isSlideLocked(lessonIndex, slideIndex)) {
          return { lessonIndex, slideIndex };
        }
      }
    }

    return null; // 잠금 해제된 슬라이드가 없음
  };

  // 마지막 잠금 해제된 슬라이드 찾기
  const findLastUnlockedSlide = (): { lessonIndex: number; slideIndex: number } | null => {
    for (let lessonIndex = lessons.value.length - 1; lessonIndex >= 0; lessonIndex--) {
      const lesson = lessons.value[lessonIndex];

      if (!lesson) continue;

      // Chapter가 잠겨있으면 이전 Chapter로
      if (lesson.locked) {
        continue;
      }

      // Chapter의 슬라이드들을 역순으로 검색
      for (let slideIndex = lesson.slides - 1; slideIndex >= 0; slideIndex--) {
        if (!isSlideLocked(lessonIndex, slideIndex)) {
          return { lessonIndex, slideIndex };
        }
      }
    }

    return null; // 잠금 해제된 슬라이드가 없음
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

      // LocalStorage에 저장
      localStorage.setItem('courseLockStatus', JSON.stringify(lockData));
      console.log('🔒 잠금 상태 저장 완료:', lockData);
    } catch (error) {
      console.error('❌ 잠금 상태 저장 오류:', error);
    }
  };

  // 잠금 상태 로드 함수
  const loadLockStatus = async () => {
    try {
      // LocalStorage에서 잠금 상태 로드
      const lockDataStr = localStorage.getItem('courseLockStatus');
      if (lockDataStr) {
        const lockData = JSON.parse(lockDataStr);

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

        console.log('🔒 LocalStorage에서 잠금 상태 로드 완료:', lockData);
      }
    } catch (error) {
      console.error('❌ LocalStorage 잠금 상태 로드 오류:', error);
    }
  };

  // 잠금 상태 초기화 함수
  const clearLockStatus = async () => {
    try {
      localStorage.removeItem('courseLockStatus');
      console.log('🔒 LocalStorage 잠금 상태 초기화 완료');
    } catch (error) {
      console.error('❌ LocalStorage 잠금 상태 초기화 오류:', error);
    }
  };

  // ===== Firestore 연동: 잠금 상태 원격 저장/로드 =====
  const db = appDb; // 환경에 따라 null일 수 있으므로 호출부에서 검사

  const setCurrentCourseId = (courseId: string) => {
    if (courseId && typeof courseId === 'string') {
      currentCourseId.value = courseId;
      console.log('📌 currentCourseId 설정:', currentCourseId.value);
    }
  };

  const buildLockPayload = () => {
    const lockData = {
      chapterLocks: {} as { [key: number]: boolean },
      slideLocks: {} as { [key: string]: boolean },
      updatedAt: new Date().toISOString(),
    };

    lessons.value.forEach((lesson, lessonIndex) => {
      if (!lesson) return;
      if (lesson.locked === true) {
        lockData.chapterLocks[lessonIndex] = true;
      }
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

    return lockData;
  };

  const saveLockStatusToFirestore = async (courseId: string) => {
    try {
      if (!courseId || !db) return false;
      const payload = buildLockPayload();
      // 기존 merge:true 사용 시, false로 해제된 키가 slideLocks 맵에서 제거되지 않아
      // 이전 true 값이 남는 문제가 발생했다. 전체 문서를 덮어써서 일관성 보장.
      await setDoc(doc(db, 'locks', courseId), payload);
      console.log('✅ Firestore 잠금 상태 저장 완료:', { courseId, ...payload });
      return true;
    } catch (error) {
      console.error('❌ Firestore 잠금 상태 저장 실패:', error);
      return false;
    }
  };

  const loadLockStatusFromFirestore = async (courseId: string) => {
    try {
      if (!courseId || !db) return false;
      const ref = doc(db, 'locks', courseId);
      const snap = await getDoc(ref);
      if (!snap.exists()) {
        console.log('ℹ️ Firestore 잠금 문서가 없습니다:', courseId);
        return false;
      }
      const data = snap.data() as {
        chapterLocks?: { [key: string]: boolean };
        slideLocks?: { [key: string]: boolean };
      };

      // 초기화 후 반영
      lessons.value.forEach((lesson) => {
        if (!lesson) return;
        lesson.locked = false;
        lesson.lockedSlides = {};
      });

      if (data.chapterLocks) {
        Object.keys(data.chapterLocks).forEach((key) => {
          const lessonIndex = parseInt(key);
          if (!isNaN(lessonIndex) && lessons.value[lessonIndex]) {
            lessons.value[lessonIndex].locked = true;
          }
        });
      }
      if (data.slideLocks) {
        Object.keys(data.slideLocks).forEach((pair) => {
          const [li, si] = pair.split('-');
          const lessonIndex = parseInt(li || '');
          const slideIndex = parseInt(si || '');
          if (!isNaN(lessonIndex) && !isNaN(slideIndex) && lessons.value[lessonIndex]) {
            if (!lessons.value[lessonIndex].lockedSlides) {
              lessons.value[lessonIndex].lockedSlides = {};
            }
            lessons.value[lessonIndex].lockedSlides![slideIndex] = true;
          }
        });
      }

      console.log('✅ Firestore 잠금 상태 로드 완료:', data);
      return true;
    } catch (error) {
      console.error('❌ Firestore 잠금 상태 로드 실패:', error);
      return false;
    }
  };

  let unsubscribeLocks: (() => void) | null = null;

  const subscribeLockStatus = (courseId: string) => {
    try {
      if (!courseId || !db) return;
      const ref = doc(db, 'locks', courseId);
      if (unsubscribeLocks) {
        unsubscribeLocks();
        unsubscribeLocks = null;
      }
      unsubscribeLocks = onSnapshot(ref, (snap) => {
        if (!snap.exists()) {
          console.log('ℹ️ 잠금 문서 없음 (실시간):', courseId);
          return;
        }
        const data = snap.data() as {
          chapterLocks?: { [key: string]: boolean };
          slideLocks?: { [key: string]: boolean };
        };

        // 초기화 후 반영
        lessons.value.forEach((lesson) => {
          if (!lesson) return;
          lesson.locked = false;
          lesson.lockedSlides = {};
        });

        if (data.chapterLocks) {
          Object.keys(data.chapterLocks).forEach((key) => {
            const li = parseInt(key);
            if (!isNaN(li) && lessons.value[li]) {
              lessons.value[li].locked = true;
            }
          });
        }
        if (data.slideLocks) {
          Object.keys(data.slideLocks).forEach((pair) => {
            const [liStr, siStr] = pair.split('-');
            const li = parseInt(liStr || '');
            const si = parseInt(siStr || '');
            if (!isNaN(li) && !isNaN(si) && lessons.value[li]) {
              if (!lessons.value[li].lockedSlides) {
                lessons.value[li].lockedSlides = {};
              }
              lessons.value[li].lockedSlides![si] = true;
            }
          });
        }
        console.log('🔔 실시간 잠금 상태 반영 완료:', data);
      });
      console.log('📡 잠금 상태 실시간 구독 시작:', courseId);
    } catch (error) {
      console.error('❌ 잠금 상태 실시간 구독 실패:', error);
    }
  };

  // files.json 업데이트 함수
  const updateFilesJson = async () => {
    try {
      console.log('📁 files.json 업데이트 시작...');

      // 현재 슬라이드 목록 가져오기
      const currentFiles = await generateCourseOutlineFromMD();
      const fileList: string[] = [];

      currentFiles.forEach((lesson) => {
        for (let i = 0; i < lesson.slides; i++) {
          fileList.push(`slide-${lesson.title.match(/^(\d+)\./)?.[1] || '0'}-${i}.md`);
        }
      });

      // files.json 업데이트
      const filesJson = {
        files: fileList,
      };

      // LocalStorage에 저장
      localStorage.setItem('files.json', JSON.stringify(filesJson));

      console.log('✅ files.json 업데이트 완료:', fileList.length, '개 파일');
      return true;
    } catch (error) {
      console.error('❌ files.json 업데이트 실패:', error);
      return false;
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

  // 마크다운 파일 생성 함수 (Firebase Storage + 다운로드)
  const createMarkdownFile = async (componentKey: string, markdownContent: string) => {
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

      // Firebase Storage에 저장
      if (storage) {
        try {
          await saveSlideToFirebaseStorage(componentKey, mdContent);
          console.log('✅ Firebase Storage에 마크다운 파일 저장 완료:', componentKey);
        } catch (error) {
          console.error('❌ Firebase Storage 저장 실패:', error);
        }
      }

      // 로컬 다운로드도 제공
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
      console.log('📁 Firebase Storage에 저장되었으며, 로컬 파일도 다운로드되었습니다.');
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
      // Firebase가 초기화되었는지 확인
      const { firebaseApp } = await import('../firebase/config');
      if (!firebaseApp) {
        console.log('⚠️ Firebase가 초기화되지 않아 Azure Blob Storage 로드를 건너뜁니다.');
        return;
      }

      // LocalStorage에서 데이터 로드
      const savedDataStr = localStorage.getItem('courseStore');
      const savedData = savedDataStr ? JSON.parse(savedDataStr) : null;
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

        console.log('✅ LocalStorage에서 데이터 로드 완료');
      }

      // 잠금 상태 로드
      await loadLockStatus();
    } catch (error) {
      console.error('❌ LocalStorage 로드 오류:', error);
      // 에러가 발생해도 앱이 계속 작동하도록 함
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

      localStorage.setItem('courseStore', JSON.stringify(dataToSave));
      console.log('✅ LocalStorage 저장 완료');
    } catch (error) {
      console.error('❌ LocalStorage 저장 오류:', error);
      // 에러가 발생해도 앱이 계속 작동하도록 함
    }
  };

  const clearLocalStorage = async () => {
    try {
      localStorage.removeItem('courseStore');
      localStorage.removeItem('courseLockStatus');
      console.log('✅ LocalStorage 클리어 완료');
    } catch (error) {
      console.error('❌ LocalStorage 클리어 오류:', error);
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

  // MD 파일에서 제목 추출 - HTML 제목 태그 우선
  const getSlideTitleFromMD = async (componentKey: string): Promise<string> => {
    try {
      const response = await fetch(`/slides/slide-${componentKey}.md`);
      if (!response.ok) {
        return '[제목없음]';
      }

      const content = await response.text();

      // 1. HTML 제목 태그를 우선적으로 찾기 (<h1>, <h2>, <h3>)
      const htmlTitleMatch = content.match(/<h[1-3][^>]*>([^<]+)<\/h[1-3]>/);
      if (htmlTitleMatch && htmlTitleMatch[1]) {
        return htmlTitleMatch[1].trim();
      }

      // 2. HTML 제목이 없으면 마크다운 제목 찾기
      const lines = content.split('\n');
      for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('### ')) {
          return trimmedLine.replace(/^###\s*/, '').trim();
        }
        if (trimmedLine.startsWith('## ')) {
          return trimmedLine.replace(/^##\s*/, '').trim();
        }
        if (trimmedLine.startsWith('# ')) {
          return trimmedLine.replace(/^#\s*/, '').trim();
        }
      }

      // 3. 제목이 없으면 첫 번째 줄 사용
      const firstLine = lines[0]?.trim();
      return firstLine || '[제목없음]';
    } catch (error) {
      console.error('MD 파일 읽기 실패:', error);
      return '[제목없음]';
    }
  };

  // Chapter 제목을 MD 파일에서 읽어오는 함수 - HTML 제목 태그 우선
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

      // 1. HTML 제목 태그를 우선적으로 찾기 (<h1>, <h2>, <h3>)
      const htmlTitleMatch = content.match(/<h[1-3][^>]*>([^<]+)<\/h[1-3]>/);
      if (htmlTitleMatch && htmlTitleMatch[1]) {
        const title = htmlTitleMatch[1].trim();
        return `${lessonIndex}. ${title}`;
      }

      // 2. HTML 제목이 없으면 마크다운 제목 찾기
      const lines = content.split('\n');
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

      // 3. 위 조건에 맞지 않으면 첫 번째 # 제목에서 번호 부분을 제거
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

      // 4. 아무것도 없으면 기존 제목 사용
      return lesson.title || '[제목없음]';
    } catch (error) {
      console.error('Chapter 제목 읽기 실패:', error);
      const lesson = lessons.value[lessonIndex];
      return lesson?.title || '[제목없음]';
    }
  };

  // sidebar-data.json에서 강의 데이터 로드
  const loadCourseOutline = async () => {
    try {
      console.log('🔄 sidebar-data.json에서 강의 목차 로드 시작...');
      const generatedLessons = await generateCourseOutlineFromMD();
      lessons.value = generatedLessons;
      console.log('✅ 강의 목차 로드 완료:', generatedLessons.length, '개 챕터');
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

  // 스마트 목차 지원을 위한 추가 함수들
  const navigateToSlide = (lessonIndex: number, slideIndex: number) => {
    setCurrentLesson(lessonIndex);
    setCurrentSlide(slideIndex);
  };

  const getCurrentSlideId = (): string => {
    return `${currentLesson.value}-${currentSlide.value}`;
  };

  const isFirstSlide = computed(() => {
    return currentLesson.value === 0 && currentSlide.value === 0;
  });

  const isLastSlide = computed(() => {
    const lastLessonIndex = lessons.value.length - 1;
    const lastLesson = lessons.value[lastLessonIndex];
    return (
      currentLesson.value === lastLessonIndex &&
      currentSlide.value === (lastLesson?.slides || 0) - 1
    );
  });

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
    isFirstSlide,
    isLastSlide,

    // 액션
    setCurrentLesson,
    setCurrentSlide,
    setCurrentSlideByLessonAndSlide,
    addSlideToLesson,
    nextSlide,
    prevSlide,
    navigateToSlide,
    getCurrentSlideId,
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

    // Firebase Storage 관련 함수들
    saveSlideToFirebaseStorage,
    loadSlideFromFirebaseStorage,
    listAllSlidesFromFirebase,
    deleteSlideFromFirebaseStorage,

    // 잠금 관련 함수들
    toggleChapterLock,
    toggleSlideLock,
    isChapterLocked,
    isSlideLocked,
    canNavigateToSlide,
    findNextUnlockedSlide,
    findPrevUnlockedSlide,
    findFirstUnlockedSlide,
    findLastUnlockedSlide,
    saveLockStatus,
    loadLockStatus,
    clearLockStatus,

    // Firestore 연동 함수
    setCurrentCourseId,
    saveLockStatusToFirestore,
    loadLockStatusFromFirestore,
    subscribeLockStatus,

    // files.json 업데이트 함수
    updateFilesJson,
  };
});
