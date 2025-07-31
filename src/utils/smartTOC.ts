// 스마트 목차 생성 시스템 (타입 안전성 개선)
// src/utils/smartTOC.ts

export interface SmartSlide {
  id: string;
  title: string;
  type: SlideType;
  section: number;
  slide: number;
  duration: number;
  keywords: string[];
  completed: boolean;
  fileName: string;
}

export interface SmartSection {
  id: string;
  title: string;
  icon: string;
  description: string;
  slides: SmartSlide[];
  totalDuration: number;
  completedSlides: number;
}

export interface SmartTOC {
  sections: SmartSection[];
  totalSlides: number;
  totalDuration: number;
  lastUpdate: number;
}

export type SlideType = 'title' | 'section' | 'toc' | 'content' | 'interactive' | 'stats' | 'quote';

// 섹션 메타데이터
const SECTION_METADATA: Record<string, { title: string; icon: string; description: string }> = {
  '0': { title: '🏠 시작하기', icon: 'home', description: '워크숍 소개 및 오리엔테이션' },
  '1': { title: '🤔 Why?', icon: 'help', description: 'AI 도입이 필요한 이유' },
  '2': { title: '💡 What?', icon: 'lightbulb', description: '프롬프팅의 핵심 기법' },
  '3': { title: '🤖 GPT 챗봇', icon: 'smart_toy', description: 'GPT 챗봇 만들기 실습' },
  '4': { title: '⚙️ How?', icon: 'build', description: '실제 활용 방법' },
  '5': { title: '🔮 If?', icon: 'psychology', description: '미래 전망과 가능성' },
  '6': { title: '📱 UX 시나리오', icon: 'phone_android', description: 'Bad vs Good vs Best' },
  '7': { title: '🛠️ 12가지 시나리오', icon: 'construction', description: 'AI 툴 복합 적용 실습' },
  '8': { title: '🎯 실전 워크숍', icon: 'target', description: '청년 수련회 기획 실습' },
};

/**
 * 슬라이드 제목 추출 (HTML 파일 지원)
 */
export const extractSlideTitle = (content: string): string => {
  // HTML 주석 제거
  const cleanContent = content.replace(/<!--[\s\S]*?-->/g, '');

  // HTML 태그에서 제목 추출 (h1, h2, h3 순서로)
  const h1Match = cleanContent.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  if (h1Match && h1Match[1]) return h1Match[1].trim();

  const h2Match = cleanContent.match(/<h2[^>]*>([^<]+)<\/h2>/i);
  if (h2Match && h2Match[1]) return h2Match[1].trim();

  const h3Match = cleanContent.match(/<h3[^>]*>([^<]+)<\/h3>/i);
  if (h3Match && h3Match[1]) return h3Match[1].trim();

  // 마크다운 헤딩 찾기 (###, ##, # 순서로)
  const mdH3Match = cleanContent.match(/^###\s+(.+)$/m);
  if (mdH3Match && mdH3Match[1]) return mdH3Match[1].trim();

  const mdH2Match = cleanContent.match(/^##\s+(.+)$/m);
  if (mdH2Match && mdH2Match[1]) return mdH2Match[1].trim();

  const mdH1Match = cleanContent.match(/^#\s+(.+)$/m);
  if (mdH1Match && mdH1Match[1]) return mdH1Match[1].trim();

  return '제목 없음';
};

/**
 * 슬라이드 타입 감지
 */
export const detectSlideType = (content: string): SlideType => {
  const lowerContent = content.toLowerCase();

  // 클래스 기반 감지
  if (content.includes('slide-type-title')) return 'title';
  if (content.includes('slide-type-section')) return 'section';
  if (content.includes('slide-type-toc')) return 'toc';
  if (content.includes('slide-type-quote')) return 'quote';
  if (content.includes('slide-type-stats')) return 'stats';
  if (content.includes('slide-type-poll')) return 'interactive';

  // 내용 기반 감지
  if (
    lowerContent.includes('투표') ||
    lowerContent.includes('질문') ||
    lowerContent.includes('poll')
  ) {
    return 'interactive';
  }

  if (
    lowerContent.includes('통계') ||
    lowerContent.includes('현황') ||
    lowerContent.includes('%')
  ) {
    return 'stats';
  }

  // 헤딩 패턴으로 감지
  if (/^#\s+/m.test(content)) return 'section';
  if (/^###\s+목차/m.test(content)) return 'toc';

  return 'content';
};

/**
 * 키워드 추출
 */
export const extractKeywords = (content: string): string[] => {
  const keywords: string[] = [];

  // 강조된 텍스트에서 키워드 추출
  const boldMatches = content.match(/\*\*([^*]+)\*\*/g);
  if (boldMatches) {
    keywords.push(...boldMatches.map((match) => match.replace(/\*\*/g, '')));
  }

  // 특정 패턴의 키워드
  const commonKeywords = ['AI', '인공지능', 'ChatGPT', '목회', '설교', '프롬프팅', '실습'];
  for (const keyword of commonKeywords) {
    if (content.includes(keyword) && !keywords.includes(keyword)) {
      keywords.push(keyword);
    }
  }

  return keywords.slice(0, 5); // 최대 5개
};

/**
 * 읽기 시간 추정 (한국어 기준)
 */
export const estimateDuration = (content: string): number => {
  // HTML 태그와 마크다운 문법 제거
  const cleanText = content
    .replace(/<[^>]*>/g, '')
    .replace(/[#*`\-\[\]()]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const chars = cleanText.length;
  const wordsPerMinute = 200; // 한국어 평균 읽기 속도
  const charsPerWord = 2; // 한국어 평균 글자수

  const estimatedMinutes = Math.max(1, Math.ceil(chars / (charsPerWord * wordsPerMinute)));
  return estimatedMinutes;
};

/**
 * 파일명에서 섹션과 슬라이드 번호 추출
 */
export const parseFileName = (fileName: string): { section: number; slide: number } | null => {
  const match = fileName.match(/^slide-(\d+)-(\d+)\.md$/);
  if (match) {
    return {
      section: parseInt(match[1] || '0', 10),
      slide: parseInt(match[2] || '0', 10),
    };
  }
  return null;
};

/**
 * 스마트 목차 생성 (메인 함수)
 */
export const generateSmartTOC = async (): Promise<SmartTOC> => {
  try {
    console.log('🔄 스마트 목차 생성 시작...');

    // 1. 캐시 무효화 확인
    const cacheInvalidationResponse = await fetch('/slides/toc-cache-invalidation.json');
    if (cacheInvalidationResponse.ok) {
      const cacheData = await cacheInvalidationResponse.json();
      console.log(`🔄 캐시 무효화 감지: ${cacheData.lastBuild}`);
    }

    // 2. 통합 사이드바 데이터 가져오기 (우선 시도)
    let sidebarData = null;
    try {
      const sidebarResponse = await fetch('/slides/sidebar-data.json');
      if (sidebarResponse.ok) {
        sidebarData = await sidebarResponse.json();
        console.log(
          `📊 통합 사이드바 데이터 로드 완료: ${sidebarData.slides.length}개 슬라이드, ${Object.keys(sidebarData.chapters).length}개 챕터`,
        );
      }
    } catch (error) {
      console.warn('⚠️ 통합 사이드바 데이터 로드 실패, files.json 사용:', error);
    }

    // 3. 파일 목록 가져오기 (fallback)
    let mdFiles: string[] = [];
    if (sidebarData) {
      mdFiles = sidebarData.slides.map((item: any) => item.fileName);
    } else {
      const filesResponse = await fetch('/slides/files.json');
      if (!filesResponse.ok) {
        throw new Error(
          `files.json 로드 실패: ${filesResponse.status} ${filesResponse.statusText}`,
        );
      }
      const filesData = await filesResponse.json();
      mdFiles = filesData.files || [];
    }

    if (mdFiles.length === 0) {
      throw new Error('슬라이드 파일이 없습니다');
    }

    console.log(`📁 발견된 파일: ${mdFiles.length}개`, mdFiles.slice(-3)); // 마지막 3개 파일 표시

    // 2. 각 파일 분석 (메타데이터 우선, HTML fallback)
    const slidePromises = mdFiles.map(async (fileName): Promise<SmartSlide | null> => {
      try {
        const parsed = parseFileName(fileName);
        if (!parsed) return null;

        // 통합 사이드바 데이터에서 정보 가져오기
        let slideTitle = `슬라이드 ${parsed.section}-${parsed.slide}`;
        let slideType: SlideType = 'content';

        if (sidebarData) {
          const slideInfo = sidebarData.slides.find((item: any) => item.fileName === fileName);
          if (slideInfo) {
            slideTitle = slideInfo.title || slideTitle;
            slideType = mapTypeToSlideType(slideInfo.type);
          }
        }

        // HTML 파일에서 추가 정보 가져오기 (fallback)
        let duration = 5; // 기본값
        let keywords: string[] = [];

        try {
          const htmlFileName = fileName.replace('.md', '.html');
          const response = await fetch(`/generated/slides/${htmlFileName}`);
          if (response.ok) {
            const content = await response.text();

            // 통합 사이드바 데이터에 제목이 없으면 HTML에서 추출
            if (
              !sidebarData ||
              !sidebarData.slides.find((item: any) => item.fileName === fileName)?.title
            ) {
              slideTitle = extractSlideTitle(content);
            }

            // HTML에서만 추출 가능한 정보
            duration = estimateDuration(content);
            keywords = extractKeywords(content);

            // 통합 사이드바 데이터에 타입이 없으면 HTML에서 감지
            if (
              !sidebarData ||
              !sidebarData.slides.find((item: any) => item.fileName === fileName)?.type
            ) {
              slideType = detectSlideType(content);
            }
          }
        } catch (error) {
          console.warn(`⚠️ HTML 파일 분석 실패: ${fileName}`, error);
        }

        const slide: SmartSlide = {
          id: `${parsed.section}-${parsed.slide}`,
          title: slideTitle,
          type: slideType,
          section: parsed.section,
          slide: parsed.slide,
          duration: duration,
          keywords: keywords,
          completed: getSlideProgress(`${parsed.section}-${parsed.slide}`),
          fileName,
        };

        console.log(`📄 분석 완료: ${fileName} -> ${slide.title}`);
        return slide;
      } catch (error) {
        console.warn(`❌ 파일 분석 실패: ${fileName}`, error);
        return null;
      }
    });

    const slides = (await Promise.all(slidePromises)).filter(Boolean) as SmartSlide[];

    // 3. 섹션별로 그룹핑
    const sectionsMap = new Map<number, SmartSlide[]>();
    for (const slide of slides) {
      if (!sectionsMap.has(slide.section)) {
        sectionsMap.set(slide.section, []);
      }
      sectionsMap.get(slide.section)!.push(slide);
    }

    // 4. 섹션 정렬 및 구조화
    const sections: SmartSection[] = [];
    for (const [sectionNum, sectionSlides] of sectionsMap) {
      const metadata = SECTION_METADATA[sectionNum.toString()] || {
        title: `섹션 ${sectionNum}`,
        icon: 'folder',
        description: '',
      };

      // 슬라이드를 번호 순으로 정렬
      sectionSlides.sort((a, b) => a.slide - b.slide);

      const section: SmartSection = {
        id: sectionNum.toString(),
        title: metadata.title,
        icon: metadata.icon,
        description: metadata.description,
        slides: sectionSlides,
        totalDuration: sectionSlides.reduce((sum, slide) => sum + slide.duration, 0),
        completedSlides: sectionSlides.filter((slide) => slide.completed).length,
      };

      sections.push(section);
    }

    // 섹션을 번호 순으로 정렬
    sections.sort((a, b) => parseInt(a.id) - parseInt(b.id));

    const toc: SmartTOC = {
      sections,
      totalSlides: slides.length,
      totalDuration: sections.reduce((sum, section) => sum + section.totalDuration, 0),
      lastUpdate: Date.now(),
    };

    console.log('✅ 스마트 목차 생성 완료:', {
      sections: toc.sections.length,
      totalSlides: toc.totalSlides,
      totalDuration: toc.totalDuration,
      hasSlide87: toc.sections.some((s) => s.slides.some((slide) => slide.id === '8-7')),
    });

    return toc;
  } catch (error) {
    console.error('❌ 스마트 목차 생성 실패:', error);
    throw error;
  }
};

/**
 * 목차 캐시 관리자
 */
export class TOCCacheManager {
  private static instance: TOCCacheManager;
  private cache: SmartTOC | null = null;
  private lastUpdate = 0;
  private readonly CACHE_DURATION = 2 * 60 * 1000; // 2분 캐시
  private isGenerating = false; // 중복 요청 방지

  static getInstance(): TOCCacheManager {
    if (!TOCCacheManager.instance) {
      TOCCacheManager.instance = new TOCCacheManager();
    }
    return TOCCacheManager.instance;
  }

  async getTOC(forceRefresh = false): Promise<SmartTOC> {
    const now = Date.now();

    // 캐시 무효화 확인
    try {
      const cacheInvalidationResponse = await fetch('/slides/toc-cache-invalidation.json');
      if (cacheInvalidationResponse.ok) {
        const cacheData = await cacheInvalidationResponse.json();
        const lastBuildTime = new Date(cacheData.lastBuild).getTime();

        // 강제 새로고침 플래그 확인
        if (cacheData.forceRefresh) {
          console.log('🔄 강제 새로고침 플래그 감지로 캐시 무효화');
          this.invalidateCache();
          forceRefresh = true;
        }
        // 빌드 시간이 캐시 시간보다 최신이면 캐시 무효화
        else if (this.cache && lastBuildTime > this.lastUpdate) {
          console.log('🔄 빌드 감지로 캐시 무효화');
          this.invalidateCache();
          forceRefresh = true;
        }
      }
    } catch (error) {
      console.warn('⚠️ 캐시 무효화 확인 실패:', error);
    }

    // 이미 생성 중인 경우 대기
    if (this.isGenerating) {
      console.log('⏳ 목차 생성 중... 대기하고 있습니다');
      // 지수 백오프로 대기
      for (let i = 0; i < 10; i++) {
        await new Promise((resolve) => setTimeout(resolve, 100 * Math.pow(2, i)));
        if (!this.isGenerating) break;
      }
      if (this.cache) return this.cache;
    }

    // 캐시된 데이터 사용 가능성 검사
    if (!forceRefresh && this.cache && now - this.lastUpdate < this.CACHE_DURATION) {
      console.log('📋 캐시된 목차 사용 (나이:', Math.round((now - this.lastUpdate) / 1000), '초)');
      return this.cache;
    }

    try {
      this.isGenerating = true;
      console.log('🔄 목차 새로고침... (forceRefresh:', forceRefresh, ')');

      this.cache = await generateSmartTOC();
      this.lastUpdate = now;

      console.log('✅ 목차 생성 완료:', {
        sections: this.cache.sections.length,
        totalSlides: this.cache.totalSlides,
        timestamp: new Date(this.lastUpdate).toLocaleTimeString(),
      });

      return this.cache;
    } finally {
      this.isGenerating = false;
    }
  }

  invalidateCache(): void {
    this.cache = null;
    this.lastUpdate = 0;
    console.log('🗑️ 목차 캐시 무효화');
  }

  // 디버깅용 메서드
  getCacheInfo() {
    return {
      hasCache: !!this.cache,
      lastUpdate: new Date(this.lastUpdate).toLocaleString(),
      ageInMinutes: Math.round((Date.now() - this.lastUpdate) / (1000 * 60)),
      isGenerating: this.isGenerating,
      totalSlides: this.cache?.totalSlides || 0,
    };
  }
}

/**
 * 사용자 진도 관리
 */
export const updateSlideProgress = (slideId: string, completed: boolean): void => {
  const key = `slide_progress_${slideId}`;
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(key, completed.toString());
  }
};

export const getSlideProgress = (slideId: string): boolean => {
  const key = `slide_progress_${slideId}`;
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(key) === 'true';
  }
  return false;
};

/**
 * 메타데이터 타입을 SlideType으로 매핑
 */
export const mapTypeToSlideType = (type: string): SlideType => {
  switch (type.toLowerCase()) {
    case 'cover':
      return 'title';
    case 'index':
    case 'toc':
      return 'toc';
    case 'chapter':
      return 'section';
    case 'poll':
    case 'vote':
      return 'interactive';
    case 'example':
      return 'content';
    case 'challenge':
      return 'interactive';
    case 'lecture':
      return 'content';
    case 'timeline':
      return 'content';
    case 'stats':
      return 'stats';
    case 'quote':
      return 'quote';
    default:
      return 'content';
  }
};

/**
 * 검색 기능
 */
export const searchTOC = (toc: SmartTOC, query: string): SmartSlide[] => {
  const lowerQuery = query.toLowerCase();
  const results: SmartSlide[] = [];

  for (const section of toc.sections) {
    for (const slide of section.slides) {
      const searchText = `${slide.title} ${slide.keywords.join(' ')}`.toLowerCase();
      if (searchText.includes(lowerQuery)) {
        results.push(slide);
      }
    }
  }

  return results;
};
