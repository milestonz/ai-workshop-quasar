export interface SlideConversionResult {
  success: boolean;
  message: string;
  convertedCount: number;
  failedCount: number;
  outputDirectory: string;
}

export class SlideConverterService {
  /**
   * 마크다운 슬라이드를 HTML로 변환
   */
  static async convertSlides(
    sourceDir: string = './md-slides',
    outputDir: string = './public/html',
  ): Promise<SlideConversionResult> {
    try {
      const response = await fetch('/api/convert-slides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sourceDir,
          outputDir,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('슬라이드 변환 실패:', error);
      throw new Error('슬라이드 변환 중 오류가 발생했습니다.');
    }
  }

  /**
   * 슬라이드 변환 상태 확인
   */
  static async getConversionStatus(): Promise<{
    lastConversion: string | null;
    totalSlides: number;
    convertedSlides: number;
  }> {
    try {
      const response = await fetch('/api/slide-conversion-status');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('변환 상태 확인 실패:', error);
      return {
        lastConversion: null,
        totalSlides: 0,
        convertedSlides: 0,
      };
    }
  }
}
