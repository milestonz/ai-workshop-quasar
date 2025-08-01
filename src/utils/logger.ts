// Student mode에서 콘솔 로그 제어 유틸리티

/**
 * Student mode 여부를 확인하는 함수
 */
export const isStudentMode = (): boolean => {
  const envStudentMode = import.meta.env.VITE_ENABLE_STUDENT_MODE === 'true';
  const localStudentMode = localStorage.getItem('enableStudentMode') === 'true';
  return envStudentMode || localStudentMode;
};

/**
 * Student mode에서 콘솔 로그를 숨기는 함수
 */
export const studentLog = {
  log: (...args: any[]) => {
    if (!isStudentMode()) {
      console.log(...args);
    }
  },
  warn: (...args: any[]) => {
    if (!isStudentMode()) {
      console.warn(...args);
    }
  },
  error: (...args: any[]) => {
    if (!isStudentMode()) {
      console.error(...args);
    }
  },
  info: (...args: any[]) => {
    if (!isStudentMode()) {
      console.info(...args);
    }
  },
  debug: (...args: any[]) => {
    if (!isStudentMode()) {
      console.debug(...args);
    }
  }
};

/**
 * 슬라이드 관련 로그만 숨기는 함수 (student mode에서)
 */
export const slideLog = {
  log: (...args: any[]) => {
    if (!isStudentMode()) {
      console.log(...args);
    }
  },
  warn: (...args: any[]) => {
    if (!isStudentMode()) {
      console.warn(...args);
    }
  },
  error: (...args: any[]) => {
    // 오류는 student mode에서도 표시
    console.error(...args);
  }
}; 