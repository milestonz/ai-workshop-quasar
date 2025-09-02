/**
 * 전역 앱 상태 관리자 - 싱글톤 패턴
 * 앱 전체의 초기화 상태를 중앙에서 관리하여 중복 초기화를 방지
 */

interface GlobalAppState {
  isInitialized: boolean;
  initTime: number;
  sessionId: string;
  lastHMRTime: number;
  componentStates: Map<string, any>;
}

class GlobalAppManager {
  private static instance: GlobalAppManager;
  private state: GlobalAppState;
  private readonly SESSION_KEY = 'global-app-state';
  private readonly INIT_TIMEOUT = 30000; // 30초

  private constructor() {
    this.state = {
      isInitialized: false,
      initTime: 0,
      sessionId: this.generateSessionId(),
      lastHMRTime: 0,
      componentStates: new Map(),
    };

    this.loadFromSession();
  }

  public static getInstance(): GlobalAppManager {
    if (!GlobalAppManager.instance) {
      GlobalAppManager.instance = new GlobalAppManager();
    }
    return GlobalAppManager.instance;
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private loadFromSession(): void {
    try {
      const stored = sessionStorage.getItem(this.SESSION_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const currentTime = Date.now();

        // 세션이 유효한지 확인 (30초 이내)
        if (
          parsed.sessionId === this.state.sessionId &&
          currentTime - parsed.initTime < this.INIT_TIMEOUT
        ) {
          this.state = { ...this.state, ...parsed };
          console.log('🔄 전역 앱 상태 복원:', this.state);
        }
      }
    } catch (error) {
      console.warn('세션 상태 로드 실패:', error);
    }
  }

  private saveToSession(): void {
    try {
      const stateToSave = {
        isInitialized: this.state.isInitialized,
        initTime: this.state.initTime,
        sessionId: this.state.sessionId,
        lastHMRTime: this.state.lastHMRTime,
      };
      sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(stateToSave));
    } catch (error) {
      console.warn('세션 상태 저장 실패:', error);
    }
  }

  public isAppInitialized(): boolean {
    const currentTime = Date.now();

    // 이미 초기화되었고 유효한 시간 내라면 true
    if (this.state.isInitialized && currentTime - this.state.initTime < this.INIT_TIMEOUT) {
      return true;
    }

    return false;
  }

  public initializeApp(): boolean {
    const currentTime = Date.now();

    // 이미 초기화되었다면 false 반환
    if (this.isAppInitialized()) {
      console.log('🔄 앱이 이미 초기화되었습니다. 중복 초기화 방지');
      return false;
    }

    this.state.isInitialized = true;
    this.state.initTime = currentTime;
    this.state.lastHMRTime = currentTime;

    this.saveToSession();
    console.log('✅ 전역 앱 초기화 완료:', this.state);
    return true;
  }

  public resetApp(): void {
    this.state.isInitialized = false;
    this.state.initTime = 0;
    this.state.componentStates.clear();

    try {
      sessionStorage.removeItem(this.SESSION_KEY);
    } catch (error) {
      console.warn('세션 상태 제거 실패:', error);
    }

    console.log('🔄 전역 앱 상태 리셋');
  }

  public getComponentState(componentId: string): any {
    return this.state.componentStates.get(componentId);
  }

  public setComponentState(componentId: string, state: any): void {
    this.state.componentStates.set(componentId, {
      ...state,
      timestamp: Date.now(),
    });
  }

  public isComponentInitialized(componentId: string): boolean {
    const componentState = this.getComponentState(componentId);
    if (!componentState) return false;

    const currentTime = Date.now();
    return (
      componentState.isInitialized && currentTime - componentState.timestamp < this.INIT_TIMEOUT
    );
  }

  public getState(): Readonly<GlobalAppState> {
    return { ...this.state };
  }
}

export default GlobalAppManager;
