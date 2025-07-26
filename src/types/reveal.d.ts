declare module 'reveal.js' {
  export interface RevealOptions {
    embedded?: boolean;
    controls?: boolean;
    progress?: boolean;
    center?: boolean;
    transition?: string;
    backgroundTransition?: string;
    hash?: boolean;
    keyboard?: boolean | Record<number, string>;
  }

  export default class Reveal {
    constructor(element: HTMLElement, options?: RevealOptions);
    initialize(): void;
    destroy(): void;
    next(): void;
    prev(): void;
    slide(index: number): void;
    getCurrentSlide(): HTMLElement;
    getSlides(): HTMLElement[];
    getSlideCount(): number;
    getSlideIndex(): number;
    getSlideIndex(slide: HTMLElement): number;
    getSlideIndex(index: number): number;
    getSlideIndex(index: number, slide: HTMLElement): number;
    getSlideIndex(index: number, slide: HTMLElement, options?: any): number;
  }
}
