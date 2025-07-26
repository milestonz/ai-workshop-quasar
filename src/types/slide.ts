export interface SlideData {
  title: string;
  videoUrl?: string | null;
  hasVideo?: boolean;
}

export interface Comment {
  id: number;
  user: string;
  time: string;
  text: string;
  likes: number;
  liked?: boolean;
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
