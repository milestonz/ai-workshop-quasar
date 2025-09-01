<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          :disable="!isAuthenticated && !(isGuestAuthenticated && isGuestInfoRegistered)"
        />

        <q-toolbar-title> 📖 목회 현장에서 만나는 12가지 AI 활용 시나리오 </q-toolbar-title>

        <!-- 공유 버튼 -->
        <q-btn
          v-if="isAuthenticated"
          flat
          round
          dense
          icon="share"
          color="white"
          @click="shareWithStudents"
          class="q-mr-xs"
        >
          <q-tooltip>수강생과 공유</q-tooltip>
        </q-btn>

        <!-- 편집기 모드 버튼 (관리자 전용) -->
        <q-btn
          v-if="isAuthenticated && userRole === 'admin'"
          flat
          round
          dense
          icon="edit"
          :color="isPresentationMode ? 'white' : 'orange'"
          @click="togglePresentationMode"
          class="q-mr-xs"
        >
          <q-tooltip>{{ isPresentationMode ? '편집기 모드' : '프리젠테이션 모드' }}</q-tooltip>
        </q-btn>

        <!-- 게스트 모드 안내 -->
        <q-btn
          v-if="isGuestAuthenticated && isGuestInfoRegistered"
          flat
          round
          dense
          icon="info"
          color="orange"
          @click="showGuestModeInfo"
          class="q-mr-xs"
        >
          <q-tooltip>게스트 모드 안내</q-tooltip>
        </q-btn>

        <!-- 전체화면 버튼 -->
        <q-btn
          v-if="isAuthenticated || (isGuestAuthenticated && isGuestInfoRegistered)"
          flat
          round
          dense
          icon="fullscreen"
          color="white"
          @click="toggleFullscreen"
          class="q-mr-xs"
        >
          <q-tooltip>전체화면</q-tooltip>
        </q-btn>

        <!-- 다운로드 버튼 -->
        <q-btn
          v-if="isAuthenticated || (isGuestAuthenticated && isGuestInfoRegistered)"
          flat
          round
          dense
          icon="download"
          color="white"
          @click="handleDownloadSlide"
          class="q-mr-xs"
        >
          <q-tooltip>슬라이드 다운로드</q-tooltip>
        </q-btn>

        <!-- 캡처 버튼 -->
        <q-btn
          v-if="isAuthenticated || (isGuestAuthenticated && isGuestInfoRegistered)"
          flat
          round
          dense
          icon="camera_alt"
          color="white"
          @click="handleCaptureSlide"
          class="q-mr-xs"
        >
          <q-tooltip>화면 캡처</q-tooltip>
        </q-btn>

        <!-- 이메일 버튼 -->
        <q-btn
          v-if="isAuthenticated"
          flat
          round
          dense
          icon="email"
          color="white"
          @click="handleSendNotesByEmail"
          class="q-mr-xs"
        >
          <q-tooltip>이메일 전송</q-tooltip>
        </q-btn>

        <!-- 저장 버튼 (관리자 전용) -->
        <q-btn
          v-if="isAuthenticated && userRole === 'admin'"
          flat
          round
          dense
          icon="save"
          :color="isSaving ? 'orange' : 'white'"
          @click="handleSaveAll"
          :loading="isSaving"
          class="q-mr-xs"
        >
          <q-tooltip>전체 저장</q-tooltip>
        </q-btn>

        <!-- Import 버튼 (관리자 전용) -->
        <q-btn
          v-if="isAuthenticated && userRole === 'admin'"
          flat
          round
          dense
          icon="upload"
          color="white"
          @click="showCourseImport = true"
          class="q-mr-xs"
        >
          <q-tooltip>강의 가져오기</q-tooltip>
        </q-btn>

        <!-- 슬라이드 빌드 버튼 (관리자 전용) -->
        <q-btn
          v-if="isAuthenticated && userRole === 'admin'"
          flat
          round
          dense
          icon="build"
          :color="isBuilding ? 'orange' : 'white'"
          :loading="isBuilding"
          @click="buildAllSlides"
          class="q-mr-xs"
        >
          <q-tooltip>슬라이드 빌드</q-tooltip>
        </q-btn>

        <!-- 설문 결과 버튼 (관리자 전용) -->
        <q-btn
          v-if="isAuthenticated && userRole === 'admin'"
          flat
          round
          dense
          icon="analytics"
          color="white"
          @click="goToSurveyResults"
          class="q-mr-xs"
        >
          <q-tooltip>설문 결과</q-tooltip>
        </q-btn>

        <!-- 설정 버튼 (관리자 전용) -->
        <q-btn
          v-if="isAuthenticated && userRole === 'admin'"
          flat
          round
          dense
          icon="settings"
          color="white"
          @click="showSettings = true"
          class="q-mr-xs"
        >
          <q-tooltip>설정</q-tooltip>
        </q-btn>

        <!-- 로그인/로그아웃 버튼 -->
        <div v-if="!isAuthenticated && !isGuestAuthenticated" class="row items-center q-gutter-xs">
          <!-- Google 로그인 버튼 -->
          <q-btn
            v-if="isFirebaseConfigured"
            flat
            round
            dense
            icon="login"
            color="white"
            @click="handleDirectLogin"
            class="q-mr-xs"
          >
            <q-tooltip>Google 로그인</q-tooltip>
          </q-btn>

          <!-- 게스트 로그인 버튼 -->
          <q-btn
            flat
            round
            dense
            icon="person"
            color="orange"
            @click="showGuestLoginDialog = true"
            class="q-mr-xs"
          >
            <q-tooltip>게스트 모드</q-tooltip>
          </q-btn>
        </div>

        <!-- 로그아웃 버튼 -->
        <q-btn
          v-else-if="isAuthenticated"
          flat
          dense
          color="white"
          @click="showUserInfoSettings"
          class="q-mr-xs user-info-btn"
        >
          <span class="user-name">{{ displayName }}</span>
          <q-tooltip
            >{{ displayName }} ({{ userRole === 'admin' ? '관리자' : '수강생' }}) - 사용자 정보
            설정</q-tooltip
          >
        </q-btn>

        <!-- 게스트 로그아웃 버튼 -->
        <q-btn
          v-else-if="isGuestAuthenticated && isGuestInfoRegistered"
          flat
          dense
          color="orange"
          @click="showUserInfoSettings"
          class="q-mr-xs user-info-btn"
        >
          <span class="user-name">{{ guestUser?.name }}</span>
          <q-tooltip>{{ guestUser?.name }} (게스트) - 사용자 정보 설정</q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-1 sidebar-drawer"
      :width="320"
      :breakpoint="700"
      style="max-height: 95vh"
      v-if="isAuthenticated || (isGuestAuthenticated && isGuestInfoRegistered)"
    >
      <q-scroll-area class="fit" style="max-height: 95vh">
        <div class="q-pa-sm">
          <!-- 사용자 정보 -->
          <div class="q-mb-sm">
            <div class="text-subtitle2 q-mb-sm">사용자 정보</div>
            <div class="text-caption text-grey-7">
              <span v-if="isAuthenticated">
                {{ displayName }} ({{ userRole === 'admin' ? '관리자' : '수강생' }})
              </span>
              <span v-else-if="isGuestAuthenticated && isGuestInfoRegistered" class="text-orange">
                {{ guestUser?.name }} (게스트)
              </span>
            </div>
          </div>

          <!-- 진도율 -->
          <div class="q-mb-sm">
            <div class="text-subtitle2 q-mb-sm">
              <span v-if="isAuthenticated">
                {{ userRole === 'admin' ? '학습 진도' : '수강 진도' }}
              </span>
              <span v-else-if="isGuestAuthenticated && isGuestInfoRegistered" class="text-orange">
                게스트 진도
              </span>
            </div>
            <q-linear-progress :value="progress / 100" color="primary" class="q-mb-xs" />
            <div class="text-caption text-grey-7">{{ progress }}%</div>
          </div>

          <!-- 강의 목록 -->
          <div class="q-mb-sm">
            <div class="row items-center justify-between q-mb-xs">
              <div class="text-subtitle2">
                <span v-if="isAuthenticated">
                  {{ userRole === 'admin' ? '강의 목차' : '학습 목차' }}
                </span>
                <span v-else-if="isGuestAuthenticated && isGuestInfoRegistered" class="text-orange">
                  게스트 목차
                </span>
              </div>
              <div class="row items-center" v-if="isAuthenticated && userRole === 'admin'">
                <q-btn
                  flat
                  round
                  dense
                  size="sm"
                  icon="add"
                  color="primary"
                  class="q-mr-xs"
                  @click="createChapterFile"
                  title="Chapter 컴포넌트 파일 생성"
                />
              </div>
            </div>
            <q-list padding class="sidebar-list">
              <div v-if="lessons.length === 0" class="text-center q-pa-md">
                <q-spinner color="primary" size="2em" />
                <div class="text-caption text-grey-6 q-mt-sm">강의 목차를 로드하는 중...</div>
              </div>
              <q-expansion-item
                v-for="(lesson, index) in lessons"
                :key="index"
                :model-value="getChapterExpanded(index)"
                @update:model-value="(val: boolean) => setChapterExpanded(index, val)"
                :class="{
                  'selected-chapter': index === currentLesson,
                  'locked-chapter': isChapterLocked(index),
                  'chapter-item-active': index === currentLesson,
                }"
                @before-show="onChapterExpand(index)"
                @click="setCurrentLesson(index)"
              >
                <template v-slot:header>
                  <div class="row items-center justify-between full-width">
                    <div class="row items-center">
                      <div>
                        <div
                          class="text-weight-medium"
                          :class="{
                            'text-purple': index === currentLesson,
                            'text-primary': index !== currentLesson,
                          }"
                        >
                          {{ getChapterTitle(index) }}
                          <span
                            v-if="isGuestAuthenticated && isGuestInfoRegistered"
                            class="text-caption text-orange"
                          >
                            (게스트)
                          </span>
                        </div>
                        <div class="text-caption text-grey-6">{{ lesson.slides }}개 슬라이드</div>
                      </div>
                    </div>
                    <div class="row items-center" v-if="isAuthenticated && userRole === 'admin'">
                      <!-- Chapter 잠금 버튼 -->
                      <q-btn
                        flat
                        round
                        dense
                        size="xs"
                        :icon="isChapterLocked(index) ? 'lock' : 'lock_open'"
                        :color="isChapterLocked(index) ? 'red' : 'grey'"
                        style="cursor: pointer"
                        class="q-mr-xs"
                        @click.stop="toggleChapterLock(index)"
                        :title="isChapterLocked(index) ? 'Chapter 잠금 해제' : 'Chapter 잠금'"
                      />
                      <q-btn
                        flat
                        round
                        dense
                        size="xs"
                        icon="add"
                        color="green"
                        class="q-mr-xs"
                        @click.stop="addSlideToChapter(index)"
                        title="슬라이드 추가"
                      />
                    </div>
                  </div>
                </template>
                <q-list padding>
                  <q-item
                    v-for="slideIndex in [...Array(lesson.slides).keys()]"
                    :key="'lesson-' + index + '-slide-' + slideIndex"
                    clickable
                    v-ripple
                    :active="index === currentLesson && slideIndex === currentSlide"
                    :class="{
                      'q-pl-lg slide-item': true,
                      'locked-slide': isSlideLocked(index, slideIndex),
                      'slide-item-active': index === currentLesson && slideIndex === currentSlide,
                    }"
                    @click="selectSlide(index, slideIndex)"
                  >
                    <q-item-section>
                      <q-item-label class="text-caption text-grey-8">
                        {{ getChapterNumber(index) }}-{{ slideIndex }}
                        {{ getSlideTitle(index, slideIndex) }}
                        <span
                          v-if="isGuestAuthenticated && isGuestInfoRegistered"
                          class="text-caption text-orange"
                        >
                          (게스트)
                        </span>
                      </q-item-label>
                    </q-item-section>
                    <q-item-section side v-if="isAuthenticated && userRole === 'admin'">
                      <div class="row items-center">
                        <!-- 슬라이드 잠금 버튼 -->
                        <q-btn
                          flat
                          round
                          dense
                          size="xs"
                          :icon="isSlideLocked(index, slideIndex) ? 'lock' : 'lock_open'"
                          :color="isSlideLocked(index, slideIndex) ? 'red' : 'grey'"
                          style="cursor: pointer"
                          @click.stop="toggleSlideLock(index, slideIndex)"
                          :title="
                            isSlideLocked(index, slideIndex)
                              ? '슬라이드 잠금 해제'
                              : '슬라이드 잠금'
                          "
                        />
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-expansion-item>
            </q-list>
          </div>
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <!-- Firebase 설정이 없는 경우 -->
      <div v-if="!isFirebaseConfigured" class="login-required">
        <div class="text-center q-pa-xl">
          <q-icon name="settings" size="100px" color="orange" class="q-mb-lg" />
          <div class="text-h4 text-weight-bold q-mb-md">Firebase 설정 필요</div>
          <div class="text-body1 text-grey-7 q-mb-lg">
            로그인 기능을 사용하려면 Firebase 설정이 필요합니다.<br />
            .env 파일에 Firebase 프로젝트 설정을 추가해주세요.
          </div>
          <q-btn
            color="orange"
            icon="settings"
            label="설정 방법 보기"
            size="lg"
            @click="showSettings = true"
          />
        </div>
      </div>

      <!-- Firebase 설정이 있지만 로그인하지 않은 경우 -->
      <div v-else-if="!isAuthenticated && !isGuestAuthenticated" class="login-required">
        <div class="text-center q-pa-xl">
          <q-icon name="lock" size="100px" color="primary" class="q-mb-lg" />
          <div class="text-h4 text-weight-bold q-mb-md">로그인</div>
          <div class="text-body1 text-white q-mb-lg">
            강의를 수강하려면 로그인이 필요합니다.<br />
            구글 계정이 없으시면 게스트 모드를 이용하세요.
          </div>
          <div class="row justify-center q-gutter-md">
            <q-btn
              color="primary"
              icon="login"
              label="Google로 로그인"
              size="lg"
              @click="handleDirectLogin"
            />
            <q-btn
              color="orange"
              icon="person"
              label="게스트 모드"
              size="lg"
              @click="showGuestLoginDialog = true"
            />
          </div>
        </div>
      </div>

      <!-- 로그인한 경우 또는 게스트 정보가 등록된 경우 메인 콘텐츠 표시 -->
      <router-view v-else-if="isAuthenticated || (isGuestAuthenticated && isGuestInfoRegistered)" />

      <!-- 게스트 로그인했지만 정보 등록이 필요한 경우 -->
      <div v-else-if="isGuestAuthenticated && !isGuestInfoRegistered" class="guest-info-required">
        <div class="text-center q-pa-xl">
          <q-icon name="person_add" size="100px" color="orange" class="q-mb-lg" />
          <div class="text-h4 text-weight-bold q-mb-md text-white">게스트 정보 등록 필요</div>
          <div class="text-body1 text-white q-mb-lg">
            강의를 수강하기 위해 이름과 이메일을 등록해주세요.
          </div>
          <q-btn
            color="orange"
            icon="person_add"
            label="정보 등록하기"
            size="lg"
            @click="showGuestInfoDialog = true"
          />
        </div>
      </div>
    </q-page-container>

    <!-- 공유 팝업 다이얼로그 -->
    <q-dialog v-model="showShareDialog" persistent>
      <q-card style="min-width: 500px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">🎓 수강생과 공유</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-body2 q-mb-md">아래 링크를 수강생들에게 공유하세요.</div>

          <!-- 공유 URL 표시 -->
          <div class="q-mb-md">
            <div class="text-caption text-grey-7 q-mb-xs">공유 링크:</div>
            <q-input
              v-model="shareUrl"
              readonly
              outlined
              dense
              class="share-url-input"
              @click="$event.target.select()"
            >
              <template v-slot:append>
                <q-btn
                  flat
                  round
                  dense
                  :icon="copySuccess ? 'check' : 'content_copy'"
                  :color="copySuccess ? 'positive' : 'primary'"
                  :class="{ 'copy-success': copySuccess }"
                  @click="copyShareLink"
                  :title="copySuccess ? '복사 완료!' : '링크 복사'"
                />
              </template>
            </q-input>
          </div>

          <!-- 이메일 공유 섹션 -->
          <div class="q-mb-md">
            <div class="text-caption text-grey-7 q-mb-xs">📧 이메일로 공유:</div>
            <div class="row q-col-gutter-sm">
              <div class="col-8">
                <q-input
                  v-model="shareEmail"
                  outlined
                  dense
                  placeholder="수강생 이메일 주소"
                  type="email"
                />
              </div>
              <div class="col-4">
                <q-btn
                  :loading="sendingEmail"
                  :disable="!shareEmail || !isValidEmail(shareEmail)"
                  color="primary"
                  label="이메일 전송"
                  @click="sendShareEmail"
                  dense
                />
              </div>
            </div>
            <div v-if="emailSent" class="text-positive text-caption q-mt-xs">
              ✅ 공유 이메일이 전송되었습니다!
            </div>
          </div>

          <!-- 잠긴 항목 정보 -->
          <div
            v-if="shareLockInfo.lockedChapters.length > 0 || shareLockInfo.lockedSlides.length > 0"
            class="q-mb-md"
          >
            <div class="text-caption text-grey-7 q-mb-xs">🔒 잠긴 항목:</div>
            <div class="text-body2">
              <div v-if="shareLockInfo.lockedChapters.length > 0" class="q-mb-xs">
                • Chapter: {{ shareLockInfo.lockedChapters.length }}개
              </div>
              <div v-if="shareLockInfo.lockedSlides.length > 0">
                • 슬라이드: {{ shareLockInfo.lockedSlides.length }}개
              </div>
            </div>
          </div>

          <!-- 복사 성공 메시지 -->
          <div v-if="copySuccess" class="text-positive text-caption q-mt-sm">
            ✅ 링크가 클립보드에 복사되었습니다!
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="닫기" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- 강의 가져오기 다이얼로그 -->
    <q-dialog v-model="showCourseImport" persistent>
      <CourseImport @cancel="showCourseImport = false" @success="handleCourseImportSuccess" />
    </q-dialog>

    <!-- 설정 다이얼로그 -->
    <q-dialog v-model="showSettings">
      <q-card style="min-width: 350px" class="settings-dialog">
        <q-card-section>
          <div class="text-h6 text-dark">설정</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-toggle v-model="autoPlay" label="자동 재생" color="primary" class="text-dark" />
          <q-toggle
            v-model="showSlideNumbers"
            label="슬라이드 번호 표시"
            color="primary"
            class="text-dark"
          />
          <q-toggle
            v-model="enableKeyboardNavigation"
            label="키보드 네비게이션"
            color="primary"
            class="text-dark"
          />

          <!-- 학생 모드 토글 -->
          <q-toggle
            v-model="enableStudentMode"
            label="학생 모드 활성화"
            color="orange"
            class="text-dark q-mt-md"
          />
          <div class="text-caption text-grey-7 q-mt-xs">
            활성화 시 학생들이 /study 경로로 접근할 수 있습니다.
          </div>

          <!-- 학생 로그인 요구 토글 -->
          <q-toggle
            v-model="requireStudentLogin"
            label="학생 모드에서 로그인 요구"
            color="red"
            class="text-dark q-mt-md"
            :disable="!enableStudentMode"
          />
          <div class="text-caption text-grey-7 q-mt-xs">
            활성화 시 학생들이 강의를 수강하려면 로그인이 필요합니다.
          </div>

          <!-- 학생 공유 링크 -->
          <div v-if="enableStudentMode" class="q-mt-md">
            <div class="text-subtitle2 q-mb-sm">학생 공유 링크</div>
            <div class="share-link-section">
              <div class="code-block">
                <code>{{ studentShareUrl }}</code>
                <q-btn
                  flat
                  round
                  size="sm"
                  icon="content_copy"
                  color="primary"
                  @click="copyStudentShareUrl"
                  class="copy-btn"
                />
              </div>
              <div class="text-caption text-grey-7 q-mt-xs">이 링크를 학생들에게 공유하세요.</div>
            </div>
          </div>
        </q-card-section>

        <!-- 슬라이드 빌드 명령어 섹션 -->
        <q-card-section class="q-pt-none">
          <div class="text-subtitle2 q-mb-sm">슬라이드 빌드</div>
          <div class="build-command-section">
            <p class="text-caption q-mb-sm">
              터미널에서 다음 명령어를 실행하여 모든 슬라이드를 빌드하세요:
            </p>
            <div class="code-block">
              <code>node scripts/build-slides.cjs public/slides src/html</code>
              <q-btn
                flat
                round
                size="sm"
                icon="content_copy"
                color="primary"
                @click="copyBuildCommand"
                class="copy-btn"
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="취소" color="primary" v-close-popup />
          <q-btn flat label="적용" color="primary" v-close-popup @click="applySettings" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- HTML 변환 다이얼로그 -->
    <q-dialog v-model="showHtmlConvertDialog">
      <q-card style="min-width: 500px" class="html-convert-dialog">
        <q-card-section>
          <div class="text-h6 text-dark">HTML 변환</div>
          <div class="text-subtitle2 text-grey-7 q-mt-sm">
            슬라이드를 HTML로 변환하는 방법을 선택하세요.
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <!-- 자동 변환 옵션 -->
          <div class="convert-option">
            <div class="option-header">
              <q-icon name="auto_awesome" color="primary" class="q-mr-sm" />
              <span class="text-subtitle2">자동 변환 (권장)</span>
            </div>
            <p class="text-caption q-mt-sm q-mb-md">
              서버를 통해 자동으로 모든 슬라이드를 HTML로 변환합니다.
            </p>
            <q-btn
              :loading="isConverting"
              :disable="isConverting"
              @click="convertSlidesToHTML"
              color="primary"
              icon="code"
              label="자동 변환 실행"
              class="q-mb-md"
            />
          </div>

          <!-- 수동 변환 옵션 -->
          <q-separator class="q-my-md" />

          <div class="convert-option">
            <div class="option-header">
              <q-icon name="terminal" color="orange" class="q-mr-sm" />
              <span class="text-subtitle2">수동 변환</span>
            </div>
            <p class="text-caption q-mt-sm q-mb-sm">
              터미널에서 다음 명령어를 실행하여 수동으로 변환할 수 있습니다:
            </p>
            <div class="code-block">
              <code>node scripts/build-slides.cjs public/slides src/html</code>
              <q-btn
                flat
                round
                size="sm"
                icon="content_copy"
                color="primary"
                @click="copyBuildCommand"
                class="copy-btn"
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="닫기" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- 로그인 다이얼로그 -->
    <LoginDialog v-model="showLoginDialog" v-if="isFirebaseConfigured" />

    <!-- 게스트 로그인 다이얼로그 -->
    <GuestLoginDialog
      v-model="showGuestLoginDialog"
      @guest-login-success="handleGuestLoginSuccess"
      @google-login-request="handleGoogleLoginRequest"
    />

    <!-- 게스트 정보 등록 다이얼로그 -->
    <GuestInfoDialog
      v-model="showGuestInfoDialog"
      :current-guest-user="guestUser"
      @guest-info-submitted="handleGuestInfoSubmitted"
      @guest-info-cancelled="handleGuestInfoCancelled"
    />

    <!-- 사용자 정보 설정 다이얼로그 -->
    <UserInfoDialog
      v-if="getUserInfoData()"
      v-model="showUserInfoDialog"
      :user-info="getUserInfoData()!"
      @update-user-info="handleUserInfoUpdate"
      @logout="handleUserInfoLogout"
    />
  </q-layout>
</template>

<script setup lang="ts">
import { computed, ref, reactive, onMounted, onBeforeUnmount, watch } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useCourseStore } from 'src/stores/course';
import { useAuth } from '../composables/useAuth';
import { useGuestAuth } from '../composables/useGuestAuth';
import CourseImport from '../components/CourseImport.vue';
import LoginDialog from '../components/LoginDialog.vue';
import GuestLoginDialog from '../components/GuestLoginDialog.vue';
import GuestInfoDialog from '../components/GuestInfoDialog.vue';
import UserInfoDialog from '../components/UserInfoDialog.vue';
import { emailApiService } from '../services/emailApiService';
import { convertMarkdownToHTML } from '../utils/markdown';
import { generateHTMLTemplate } from '../utils/htmlTemplate';
import html2canvas from 'html2canvas';

const courseStore = useCourseStore();
const $q = useQuasar();
const router = useRouter();
const {
  user,
  isAuthenticated,
  displayName,
  photoURL,
  signInWithGoogle,
  logout,
  initAuth,
  isFirebaseConfigured,
  userRole,
  debugUserInfo,
  checkFirebaseConfig,
} = useAuth();

// 게스트 인증 시스템
const {
  guestUser,
  isGuestMode,
  isGuestAuthenticated,
  isGuestInfoRegistered,
  signInAsGuest,
  registerGuestInfo,
  signOutGuest,
  restoreGuestSession,
  canAccessFeature,
} = useGuestAuth();

// Computed properties
const leftDrawerOpen = ref(false);
const currentLesson = computed(() => courseStore.currentLesson);
const currentSlide = computed(() => courseStore.currentSlide);
const currentLessonData = computed(() => courseStore.currentLessonData);
const lessons = computed(() => {
  const lessonsData = courseStore.lessons;
  console.log('📋 lessons computed 호출, 개수:', lessonsData.length);
  return lessonsData;
});
const progress = computed(() => courseStore.progress);
const isPresentationMode = computed(() => courseStore.isPresentationMode);

// 슬라이드 제목을 저장할 반응형 데이터
const slideTitles = reactive<{ [key: string]: string }>({});

// Chapter 제목을 저장할 반응형 데이터
const chapterTitles = reactive<{ [key: number]: string }>({});

// 목차 업데이트 상태

// 공유 팝업 상태
const showShareDialog = ref(false);
const shareUrl = ref('');
const shareLockInfo = ref({
  lockedChapters: [] as number[],
  lockedSlides: [] as string[],
});
const copySuccess = ref(false);
const shareEmail = ref('');
const sendingEmail = ref(false);
const emailSent = ref(false);

// 강의 가져오기 다이얼로그 상태
const showCourseImport = ref(false);

// HTML 변환 상태
const isConverting = ref(false);
const showHtmlConvertDialog = ref(false);

// 슬라이드 빌드 상태
const isBuilding = ref(false);

// 설정 관련 상태
const showSettings = ref(false);
const autoPlay = ref(false);
const showSlideNumbers = ref(true);
const enableKeyboardNavigation = ref(true);
const enableStudentMode = ref(
  localStorage.getItem('enableStudentMode') === 'true' ||
    import.meta.env.VITE_ENABLE_STUDENT_MODE === 'true',
);
const requireStudentLogin = ref(localStorage.getItem('requireStudentLogin') === 'true');

// 로그인 관련 상태
const showLoginDialog = ref(false);
const showGuestLoginDialog = ref(false);
const showGuestInfoDialog = ref(false);
const showUserInfoDialog = ref(false);

// 학생 공유 URL
const studentShareUrl = computed(() => {
  const baseUrl = window.location.origin;
  // 현재 강의 ID를 가져오는 방법 (임시로 'default' 사용)
  const courseId = 'default';
  return `${baseUrl}/study/${courseId}`;
});

// Methods
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

// 로그아웃 처리
const handleLogout = async () => {
  try {
    // 사용자 정보 저장 (로그아웃 페이지로 전달하기 위해)
    const userName = user.value?.displayName || '사용자';
    const userEmail = user.value?.email || '';

    // 로그아웃 실행
    await logout();

    // 로그아웃 페이지로 이동 (사용자 정보와 함께)
    router.push({
      path: '/logout',
      query: {
        name: userName,
        email: userEmail,
        isGuest: 'false',
      },
    });
  } catch (error) {
    console.error('로그아웃 오류:', error);
    $q.notify({
      type: 'negative',
      message: '로그아웃 중 오류가 발생했습니다.',
      position: 'top',
    });
  }
};

// 게스트 로그아웃 처리
const handleGuestLogout = async () => {
  try {
    // 게스트 사용자 정보 저장 (로그아웃 페이지로 전달하기 위해)
    const userName = guestUser.value?.name || '게스트';
    const userEmail = guestUser.value?.email || '';

    // 게스트 로그아웃 실행
    await signOutGuest();

    // 로그아웃 페이지로 이동 (사용자 정보와 함께)
    router.push({
      path: '/logout',
      query: {
        name: userName,
        email: userEmail,
        isGuest: 'true',
      },
    });
  } catch (error) {
    console.error('게스트 로그아웃 오류:', error);
    $q.notify({
      type: 'negative',
      message: '로그아웃 중 오류가 발생했습니다.',
      position: 'top',
    });
  }
};

// 게스트 로그인 성공 처리
const handleGuestLoginSuccess = (guestUser: any) => {
  console.log('🎭 게스트 로그인 성공:', guestUser);

  // 게스트 정보가 이미 등록된 경우 팝업을 표시하지 않음
  if (guestUser.isInfoRegistered) {
    console.log('🎭 게스트 정보가 이미 등록됨, StudentView로 바로 라우팅');
    router.push('/study/ai-workshop');
  } else {
    // 게스트 정보 등록 다이얼로그 표시
    showGuestInfoDialog.value = true;
  }
};

// Google 로그인 요청 처리
const handleGoogleLoginRequest = () => {
  showLoginDialog.value = true;
};

// 게스트 정보 등록 완료 처리
const handleGuestInfoSubmitted = async (userInfo: { name: string; email: string }) => {
  console.log('🎭 게스트 정보 등록:', userInfo);

  try {
    await registerGuestInfo(userInfo.name, userInfo.email);

    // 게스트 모드에서는 StudentView로 라우팅
    console.log('🎭 게스트 정보 등록 완료: StudentView로 라우팅');
    router.push('/study/ai-workshop');
  } catch (error) {
    console.error('게스트 정보 등록 실패:', error);
    $q.notify({
      type: 'negative',
      message: '게스트 정보 등록에 실패했습니다.',
      position: 'top',
    });
  }
};

// 게스트 정보 등록 취소 처리
const handleGuestInfoCancelled = async () => {
  console.log('🎭 게스트 정보 등록 취소');
  // 게스트 로그아웃 처리
  await signOutGuest();
  $q.notify({
    type: 'info',
    message: '게스트 모드가 취소되었습니다.',
    position: 'top',
    timeout: 2000,
  });
};

// 사용자 정보 데이터 생성
const getUserInfoData = () => {
  if (isAuthenticated.value && user.value) {
    return {
      name: user.value.displayName || '사용자',
      email: user.value.email || '',
      role: userRole.value as 'admin' | 'student' | 'guest',
      isGuest: false,
      loginType: 'Google 계정',
    };
  } else if (isGuestAuthenticated.value && guestUser.value) {
    return {
      name: guestUser.value.name || '게스트',
      email: guestUser.value.email || '',
      role: 'guest' as const,
      isGuest: true,
      loginType: '게스트 모드',
    };
  }
  return null;
};

// 사용자 정보 설정 다이얼로그 표시
const showUserInfoSettings = () => {
  const userInfo = getUserInfoData();
  if (userInfo) {
    showUserInfoDialog.value = true;
  }
};

// 사용자 정보 업데이트 처리
const handleUserInfoUpdate = async (updatedInfo: { name: string; email: string }) => {
  console.log('👤 사용자 정보 업데이트:', updatedInfo);

  try {
    if (isGuestAuthenticated.value) {
      // 게스트 사용자 정보 업데이트
      await registerGuestInfo(updatedInfo.name, updatedInfo.email);
    }

    $q.notify({
      type: 'positive',
      message: '사용자 정보가 업데이트되었습니다!',
      position: 'top',
      timeout: 2000,
    });
  } catch (error) {
    console.error('사용자 정보 업데이트 실패:', error);
    $q.notify({
      type: 'negative',
      message: '사용자 정보 업데이트에 실패했습니다.',
      position: 'top',
    });
  }
};

// 사용자 정보 설정에서 로그아웃 처리
const handleUserInfoLogout = async () => {
  console.log('🔍 MainLayout: handleUserInfoLogout 호출됨');
  console.log('🔍 MainLayout: 인증 상태 확인:', {
    isAuthenticated: isAuthenticated.value,
    isGuestAuthenticated: isGuestAuthenticated.value,
    userRole: userRole.value,
  });

  if (isAuthenticated.value) {
    console.log('🔍 MainLayout: 일반 사용자 로그아웃 실행');
    await handleLogout();
  } else if (isGuestAuthenticated.value) {
    console.log('🔍 MainLayout: 게스트 사용자 로그아웃 실행');
    await handleGuestLogout();
  } else {
    console.log('🔍 MainLayout: 인증되지 않은 사용자');
  }
  showUserInfoDialog.value = false;
};

// 게스트 모드 안내 표시
const showGuestModeInfo = () => {
  $q.notify({
    type: 'info',
    message:
      '게스트 모드에서는 슬라이드 보기와 다운로드만 가능합니다. 편집 기능을 사용하려면 Google 로그인이 필요합니다.',
    position: 'top',
    timeout: 5000,
    icon: 'info',
    actions: [
      {
        label: 'Google 로그인',
        color: 'primary',
        handler: () => {
          showLoginDialog.value = true;
        },
      },
      { label: '확인', color: 'white' },
    ],
  });
};

const setCurrentLesson = (index: number) => {
  console.log('🎯 Chapter 선택:', {
    강의인덱스: index,
    강의제목: lessons.value[index]?.title,
  });

  // 잠긴 Chapter인지 확인
  if (courseStore.isChapterLocked(index)) {
    console.log('🔒 잠긴 Chapter로 이동 시도:', index);
    $q.notify({
      type: 'warning',
      message: '🔒 이 Chapter는 잠겨있어서 학생들에게 공유되지 않습니다.',
      position: 'top',
      timeout: 4000,
      icon: 'lock',
      actions: [{ label: '확인', color: 'white' }],
    });
    return;
  }

  courseStore.setCurrentLesson(index);
  // Chapter를 클릭하면 첫 번째 슬라이드(슬라이드 0)를 자동으로 선택
  courseStore.setCurrentSlide(0);

  // 선택된 Chapter만 펼치기
  onChapterExpand(index);
};

// Chapter 확장 함수
const onChapterExpand = (index: number) => {
  // 다른 Chapter들은 접기
  Object.keys(isChapterExpanded.value).forEach((key) => {
    const numKey = parseInt(key);
    if (numKey !== index) {
      isChapterExpanded.value[numKey] = false;
    }
  });

  // 선택된 Chapter만 펼치기
  isChapterExpanded.value[index] = true;
};

// 슬라이드 번호를 ➀, ➁, ➂ 형태로 변환
const getSlideNumber = (index: number) => {
  const numbers = ['➀', '➁', '➂', '➃', '➄', '➅', '➆', '➇', '➈', '➉'];
  return numbers[index] || (index + 1).toString();
};

// 슬라이드 번호를 1-1, 1-2 형태로 생성
const getSlideNumberWithLesson = (lessonIndex: number, slideIndex: number) => {
  return `${lessonIndex}-${slideIndex + 1}`;
};

// 챕터 번호 추출
const getChapterNumber = (lessonIndex: number): string => {
  const lesson = lessons.value[lessonIndex];
  if (lesson?.title) {
    const match = lesson.title.match(/^(\d+)\./);
    if (match?.[1]) {
      return match[1];
    }
  }
  return String(lessonIndex);
};

const selectSlide = async (lessonIndex: number, slideIndex: number) => {
  const lesson = lessons.value[lessonIndex];
  const lessonTitle = lesson?.title;

  console.log('🎯 슬라이드 선택 시작:', {
    강의인덱스: lessonIndex,
    슬라이드인덱스: slideIndex,
    강의제목: lessonTitle,
    슬라이드제목: lesson?.slideTitles?.[slideIndex],
    현재강의: courseStore.currentLesson,
    현재슬라이드: courseStore.currentSlide,
    현재라우트: router.currentRoute.value.path,
  });

  // 현재 라우트가 설문결과 페이지인 경우 메인 페이지로 이동
  if (router.currentRoute.value.path === '/survey-results') {
    console.log('📊 설문결과 페이지에서 슬라이드 선택 → 메인 페이지로 이동');
    await router.push('/');
    // 잠시 기다린 후 슬라이드 선택 로직 실행
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  // 잠긴 슬라이드인지 확인
  if (courseStore.isSlideLocked(lessonIndex, slideIndex)) {
    console.log('🔒 잠긴 슬라이드로 이동 시도:', `${lessonIndex}-${slideIndex}`);
    $q.notify({
      type: 'warning',
      message: '🔒 이 슬라이드는 잠겨있어서 학생들에게 공유되지 않습니다.',
      position: 'top',
      timeout: 4000,
      icon: 'lock',
      actions: [{ label: '확인', color: 'white' }],
    });
    return;
  }

  // 현재 슬라이드 설정
  console.log('🔄 Store 업데이트 시작...');
  const oldLesson = courseStore.currentLesson;
  const oldSlide = courseStore.currentSlide;

  courseStore.setCurrentLesson(lessonIndex);
  courseStore.setCurrentSlide(slideIndex);

  console.log('✅ Store 업데이트 완료:', {
    이전강의: oldLesson,
    이전슬라이드: oldSlide,
    현재강의: courseStore.currentLesson,
    현재슬라이드: courseStore.currentSlide,
    강의변경: oldLesson !== lessonIndex,
    슬라이드변경: oldSlide !== slideIndex,
  });

  // MD 파일 내용 로드 (store에만 저장, 편집기는 watch에서 처리)
  try {
    const content = await courseStore.loadSlideContentForEditing(lessonIndex, slideIndex);
    console.log('✅ Store에 MD 파일 내용 저장 완료:', {
      contentLength: content.length,
      contentPreview: content.substring(0, 100),
    });
  } catch (error) {
    console.error('❌ MD 파일 로드 실패:', error);
  }
};

// 잠금 관련 함수들
const toggleChapterLock = (lessonIndex: number) => {
  courseStore.toggleChapterLock(lessonIndex);
};

const toggleSlideLock = (lessonIndex: number, slideIndex: number) => {
  courseStore.toggleSlideLock(lessonIndex, slideIndex);
};

const isChapterLocked = (lessonIndex: number): boolean => {
  return courseStore.isChapterLocked(lessonIndex);
};

const isSlideLocked = (lessonIndex: number, slideIndex: number): boolean => {
  return courseStore.isSlideLocked(lessonIndex, slideIndex);
};

const saveHTMLFile = async (fileName: string, content: string): Promise<void> => {
  try {
    console.log(`📄 HTML 파일 저장 시작: ${fileName}`);

    // 브라우저에서 다운로드로 파일 저장
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    console.log('✅ HTML 파일 다운로드 완료:', fileName);

    // 사용자에게 안내 메시지 표시
    $q.notify({
      type: 'info',
      message: `📄 HTML 파일이 다운로드되었습니다.\n\n파일명: ${fileName}\n\n이 파일을 src/html/ 폴더에 저장하세요.\n\n또는 터미널에서 'npm run convert-slides-individual'을 실행하세요.`,
      position: 'top',
      timeout: 8000,
      icon: 'download',
      actions: [{ label: '확인', color: 'white' }],
    });
  } catch (error) {
    console.error('❌ HTML 파일 저장 실패:', error);
    throw error;
  }
};

// 화면캡처 기능
const handleCaptureSlide = async () => {
  try {
    console.log('📸 화면캡처 시작...');

    // 슬라이드 뷰어 요소 찾기
    const slideViewer = document.querySelector('.simple-slide-viewer');
    if (!slideViewer) {
      $q.notify({
        type: 'negative',
        message: '❌ 슬라이드 뷰어를 찾을 수 없습니다.',
        position: 'top',
        timeout: 3000,
        icon: 'error',
        actions: [{ label: '확인', color: 'white' }],
      });
      return;
    }

    // 캡처 옵션 설정
    const options = {
      backgroundColor: '#000000', // 블랙 배경
      scale: 2, // 고해상도
      useCORS: true, // 외부 이미지 허용
      allowTaint: true, // 외부 리소스 허용
      logging: false, // 로그 비활성화
      width: slideViewer.scrollWidth,
      height: slideViewer.scrollHeight,
    };

    console.log('📸 캡처 옵션:', options);

    // 화면 캡처 실행
    const canvas = await html2canvas(slideViewer as HTMLElement, options);

    // 캔버스를 이미지로 변환
    const imageData = canvas.toDataURL('image/png', 1.0);

    // 파일명 생성
    const lessonTitle = currentLessonData.value?.title || 'slide';
    const slideNumber = currentSlide.value + 1;
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const filename = `${lessonTitle}_slide-${slideNumber}_${timestamp}.png`;

    console.log('📸 파일명:', filename);

    // 다운로드 링크 생성
    const link = document.createElement('a');
    link.download = filename;
    link.href = imageData;

    // 다운로드 실행
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log('✅ 화면캡처 완료:', filename);
    $q.notify({
      type: 'positive',
      message: `📸 화면캡처가 완료되었습니다!\n\n파일명: ${filename}`,
      position: 'top',
      timeout: 4000,
      icon: 'camera_alt',
      actions: [{ label: '확인', color: 'white' }],
    });
  } catch (error) {
    console.error('❌ 화면캡처 실패:', error);
    $q.notify({
      type: 'negative',
      message: `❌ 화면캡처에 실패했습니다.\n\n오류: ${error}`,
      position: 'top',
      timeout: 5000,
      icon: 'error',
      actions: [{ label: '확인', color: 'white' }],
    });
  }
};

const handleSendNotesByEmail = () => {
  courseStore.handleSendNotesByEmail();
};

// 공유 기능
const shareWithStudents = () => {
  const studentUrl = `${window.location.origin}/study/default`;

  // 잠긴 슬라이드 정보 수집
  const lockedInfo = {
    lockedChapters: [] as number[],
    lockedSlides: [] as string[],
  };

  lessons.value.forEach((lesson, lessonIndex) => {
    if (courseStore.isChapterLocked(lessonIndex)) {
      lockedInfo.lockedChapters.push(lessonIndex);
    } else {
      // Chapter가 잠기지 않은 경우에만 개별 슬라이드 잠금 확인
      for (let slideIndex = 0; slideIndex < lesson.slides; slideIndex++) {
        if (courseStore.isSlideLocked(lessonIndex, slideIndex)) {
          lockedInfo.lockedSlides.push(`${lessonIndex}-${slideIndex}`);
        }
      }
    }
  });

  // 잠금 정보를 URL 파라미터로 추가
  const params = new URLSearchParams();
  if (lockedInfo.lockedChapters.length > 0) {
    params.set('lockedChapters', lockedInfo.lockedChapters.join(','));
  }
  if (lockedInfo.lockedSlides.length > 0) {
    params.set('lockedSlides', lockedInfo.lockedSlides.join(','));
  }

  const finalUrl = params.toString() ? `${studentUrl}?${params.toString()}` : studentUrl;

  // 팝업 다이얼로그에 정보 설정
  shareUrl.value = finalUrl;
  shareLockInfo.value = lockedInfo;
  copySuccess.value = false;
  showShareDialog.value = true;
};

// 링크 복사 함수
const copyShareLink = async () => {
  try {
    await navigator.clipboard.writeText(shareUrl.value);
    copySuccess.value = true;

    // 3초 후 성공 상태 초기화
    setTimeout(() => {
      copySuccess.value = false;
    }, 3000);

    console.log('✅ 링크 복사 성공:', shareUrl.value);
  } catch (error) {
    console.error('❌ 링크 복사 실패:', error);
    $q.notify({
      type: 'negative',
      message: '❌ 링크 복사에 실패했습니다. 수동으로 복사해주세요.',
      position: 'top',
      timeout: 4000,
      icon: 'error',
      actions: [{ label: '확인', color: 'white' }],
    });
  }
};

// 이메일 유효성 검사
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 이메일 공유 전송
const sendShareEmail = async () => {
  if (!shareEmail.value || !isValidEmail(shareEmail.value)) {
    $q.notify({
      type: 'warning',
      message: '유효한 이메일 주소를 입력해주세요.',
      position: 'top',
    });
    return;
  }

  sendingEmail.value = true;
  emailSent.value = false;

  try {
    const result = await emailApiService.sendCourseShareEmail(
      shareEmail.value,
      '수강생',
      displayName.value,
      'AI Workshop 강의',
      shareUrl.value,
    );

    if (result.success) {
      emailSent.value = true;
      shareEmail.value = '';
      $q.notify({
        type: 'positive',
        message: '공유 이메일이 성공적으로 전송되었습니다.',
        position: 'top',
      });
    } else {
      // 이메일 서비스가 설정되지 않은 경우 더 자세한 안내
      if (result.message?.includes('설정되지 않았습니다')) {
        $q.notify({
          type: 'warning',
          message: '이메일 서비스가 설정되지 않았습니다. 링크를 직접 복사하여 공유하세요.',
          position: 'top',
          timeout: 8000,
          actions: [
            {
              label: '링크 복사',
              color: 'white',
              handler: () => copyShareLink(),
            },
          ],
        });
      } else {
        $q.notify({
          type: 'negative',
          message: '이메일 전송에 실패했습니다: ' + result.message,
          position: 'top',
        });
      }
    }
  } catch (error) {
    console.error('이메일 전송 오류:', error);
    $q.notify({
      type: 'warning',
      message: '이메일 전송에 실패했습니다. 링크를 직접 복사하여 공유하세요.',
      position: 'top',
      timeout: 8000,
      actions: [
        {
          label: '링크 복사',
          color: 'white',
          handler: () => copyShareLink(),
        },
      ],
    });
  } finally {
    sendingEmail.value = false;
  }
};

// 프리젠테이션 모드 토글
const togglePresentationMode = () => {
  courseStore.togglePresentationMode();
};

// 전체화면 토글
const toggleFullscreen = () => {
  const slideViewer = document.querySelector('.simple-slide-viewer');
  if (slideViewer) {
    if (!document.fullscreenElement) {
      slideViewer.requestFullscreen().catch((err) => {
        console.log('전체화면 전환 실패:', err);
      });
    } else {
      document.exitFullscreen();
    }
  }
};

// 슬라이드 다운로드
const handleDownloadSlide = () => {
  courseStore.handleCaptureSlide();
};

const createChapterFile = () => {
  courseStore.createChapterFile(currentLesson.value);
};

// MD 파일에서 슬라이드 제목을 읽어오는 함수
const getSlideTitleFromMD = async (lessonIndex: number, slideIndex: number): Promise<string> => {
  try {
    const lesson = lessons.value[lessonIndex];
    if (!lesson) return '[제목없음]';

    // 실제 lessonIndex와 slideIndex를 사용하여 componentKey 생성
    const componentKey = `${lessonIndex}-${slideIndex}`;

    // 이미 캐시된 제목이 있으면 반환
    const cacheKey = `${lessonIndex}-${slideIndex}`;
    if (slideTitles[cacheKey]) {
      return slideTitles[cacheKey];
    }

    const title = await courseStore.getSlideTitleFromMD(componentKey);
    slideTitles[cacheKey] = title;
    return title;
  } catch (error) {
    console.error('슬라이드 제목 읽기 실패:', error);
    return '[제목없음]';
  }
};

// 슬라이드 제목을 가져오는 함수 (동기 버전)
const getSlideTitle = (lessonIndex: number, slideIndex: number): string => {
  const cacheKey = `${lessonIndex}-${slideIndex}`;
  const lesson = lessons.value[lessonIndex];

  // 캐시된 제목이 있으면 사용
  if (slideTitles[cacheKey]) {
    return slideTitles[cacheKey];
  }

  // lesson의 slideTitles에서 가져오기 (사이드바 데이터 우선)
  if (lesson?.slideTitles?.[slideIndex]) {
    return lesson.slideTitles[slideIndex];
  }

  // lesson의 slideData에서 가져오기
  if (lesson?.slideData?.[slideIndex]?.title) {
    return lesson.slideData[slideIndex].title;
  }

  // fallback: 슬라이드 번호 (1-based)
  return `슬라이드 ${slideIndex + 1}`;
};

// Chapter 제목을 MD 파일에서 읽어오는 함수
const getChapterTitleFromMD = async (lessonIndex: number): Promise<string> => {
  try {
    // 이미 캐시된 제목이 있으면 반환
    if (chapterTitles[lessonIndex]) {
      return chapterTitles[lessonIndex];
    }

    const title = await courseStore.getChapterTitleFromMD(lessonIndex);
    chapterTitles[lessonIndex] = title;
    return title;
  } catch (error) {
    console.error('Chapter 제목 읽기 실패:', error);
    return '[제목없음]';
  }
};

// Chapter에 슬라이드 추가하는 함수
const addSlideToChapter = async (lessonIndex: number) => {
  try {
    console.log(`📝 Chapter ${lessonIndex}에 슬라이드 추가 중...`);

    // courseStore의 addSlideToLesson 함수 호출
    await courseStore.addSlideToLesson(lessonIndex);

    console.log(`✅ Chapter ${lessonIndex}에 슬라이드 추가 완료`);

    // 새로운 슬라이드의 제목 로드
    const lesson = lessons.value[lessonIndex];
    if (lesson) {
      await getSlideTitleFromMD(lessonIndex, lesson.slides - 1);
    }
  } catch (error) {
    console.error(`❌ Chapter ${lessonIndex}에 슬라이드 추가 실패:`, error);
  }
};

// Chapter 제목을 가져오는 함수 (동기 버전)
const getChapterTitle = (lessonIndex: number): string => {
  const lesson = lessons.value[lessonIndex];
  return chapterTitles[lessonIndex] || lesson?.title || '[제목없음]';
};

// 모든 슬라이드의 제목을 미리 로드
const loadAllSlideTitles = async () => {
  for (let lessonIndex = 0; lessonIndex < lessons.value.length; lessonIndex++) {
    const lesson = lessons.value[lessonIndex];
    if (lesson) {
      // Chapter 제목도 함께 로드
      await getChapterTitleFromMD(lessonIndex);

      for (let slideIndex = 0; slideIndex < lesson.slides; slideIndex++) {
        await getSlideTitleFromMD(lessonIndex, slideIndex);
      }
    }
  }
};

// 저장 관련 상태
const isSaving = ref(false);

// Chapter 펼침/접힘 상태 관리
const isChapterExpanded = ref<{ [key: number]: boolean }>({});

// Chapter 확장 상태를 안전하게 가져오는 함수
const getChapterExpanded = (index: number): boolean => {
  return isChapterExpanded.value[index] ?? false;
};

// Chapter 확장 상태를 설정하는 함수
const setChapterExpanded = (index: number, value: boolean) => {
  isChapterExpanded.value[index] = value;
};

// 설정 적용 메서드
const applySettings = () => {
  // 학생 모드 설정을 localStorage에 저장
  localStorage.setItem('enableStudentMode', enableStudentMode.value.toString());

  // 학생 로그인 요구 설정을 localStorage에 저장
  localStorage.setItem('requireStudentLogin', requireStudentLogin.value.toString());

  // 환경변수 업데이트 (런타임에서는 제한적이지만, 다음 빌드 시 반영)
  console.log('🎓 학생 모드 설정:', enableStudentMode.value ? '활성화' : '비활성화');
  console.log('🔐 학생 로그인 요구:', requireStudentLogin.value ? '활성화' : '비활성화');

  $q.notify({
    message: `설정이 적용되었습니다. (학생 모드: ${enableStudentMode.value ? '활성화' : '비활성화'}, 로그인 요구: ${requireStudentLogin.value ? '활성화' : '비활성화'})`,
    color: 'positive',
    icon: 'check_circle',
    timeout: 3000,
  });
};

// 슬라이드 빌드 명령어 복사 함수
const copyBuildCommand = async () => {
  try {
    const command = 'node scripts/build-slides.cjs public/slides src/html';
    await navigator.clipboard.writeText(command);

    $q.notify({
      type: 'positive',
      message: '명령어가 클립보드에 복사되었습니다!',
      position: 'top',
      timeout: 2000,
      icon: 'content_copy',
    });
  } catch (error) {
    console.error('클립보드 복사 실패:', error);

    $q.notify({
      type: 'negative',
      message: '클립보드 복사에 실패했습니다.',
      position: 'top',
      timeout: 3000,
      icon: 'error',
    });
  }
};

// 학생 공유 URL 복사 함수
const copyStudentShareUrl = async () => {
  try {
    await navigator.clipboard.writeText(studentShareUrl.value);

    $q.notify({
      type: 'positive',
      message: '학생 공유 링크가 클립보드에 복사되었습니다!',
      position: 'top',
      timeout: 2000,
      icon: 'content_copy',
    });
  } catch (error) {
    console.error('클립보드 복사 실패:', error);

    $q.notify({
      type: 'negative',
      message: '클립보드 복사에 실패했습니다.',
      position: 'top',
      timeout: 3000,
      icon: 'error',
    });
  }
};

// 강의 가져오기 성공 처리
const handleCourseImportSuccess = (courseId: string) => {
  showCourseImport.value = false;

  $q.notify({
    type: 'positive',
    message: '새 강의가 성공적으로 추가되었습니다!',
    position: 'top',
  });
};

// HTML 변환 함수
const convertSlidesToHTML = async () => {
  try {
    isConverting.value = true;
    console.log('🔄 HTML 변환 시작...');

    // 서버 API 호출
    const response = await fetch('http://localhost:3001/api/convert-slides', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (result.success) {
      console.log('✅ HTML 변환 완료:', result);

      // 다이얼로그 닫기
      showHtmlConvertDialog.value = false;

      // 성공 메시지 표시
      $q.notify({
        type: 'positive',
        message: `HTML 변환이 완료되었습니다! (${result.totalFiles}개 파일)`,
        position: 'top',
        timeout: 5000,
        icon: 'check_circle',
        actions: [
          {
            label: '상세보기',
            color: 'white',
            handler: () => {
              console.log('변환된 파일들:', result.convertedFiles);
              console.log('출력 로그:', result.output);
            },
          },
          { label: '확인', color: 'white' },
        ],
      });
    } else {
      throw new Error(result.message || 'HTML 변환 실패');
    }
  } catch (error) {
    console.error('❌ HTML 변환 실패:', error);

    // 에러 메시지 안전하게 처리
    const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다';

    $q.notify({
      type: 'negative',
      message: `HTML 변환 중 오류가 발생했습니다: ${errorMessage}`,
      position: 'top',
      timeout: 5000,
      icon: 'error',
      actions: [
        {
          label: '서버 시작',
          color: 'white',
          handler: () => {
            console.log('💡 터미널에서 다음 명령어를 실행하세요:');
            console.log('npm run server');
          },
        },
        { label: '확인', color: 'white' },
      ],
    });
  } finally {
    isConverting.value = false;
  }
};

// 슬라이드 빌드 함수
const buildAllSlides = async () => {
  isBuilding.value = true;
  try {
    console.log('🚀 슬라이드 빌드 시작...');

    // 방법 1: API 엔드포인트 호출 (권장)
    try {
      const response = await fetch('/api/build-slides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputDir: 'public/slides',
          outputDir: 'src/html',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log('✅ 슬라이드 빌드 완료:', result);

      // 성공 메시지 표시
      $q.notify({
        type: 'positive',
        message: '모든 슬라이드가 성공적으로 빌드되었습니다!',
        position: 'top',
        timeout: 3000,
        icon: 'check_circle',
        actions: [{ label: '확인', color: 'white' }],
      });
    } catch (apiError) {
      console.log('API 서버 연결 실패, 직접 실행 방법 사용:', apiError);

      // 방법 2: 터미널 명령어 안내 (API 서버가 없을 때)
      $q.notify({
        type: 'info',
        message: `터미널에서 다음 명령어를 실행하세요:
         node scripts/build-slides.cjs public/slides src/html`,
        position: 'top',
        timeout: 8000,
        icon: 'terminal',
        actions: [
          {
            label: '명령어 복사',
            color: 'white',
            handler: () => {
              navigator.clipboard.writeText(
                'node scripts/build-slides.cjs public/slides src/html',
              );
              $q.notify({
                type: 'positive',
                message: '명령어가 클립보드에 복사되었습니다!',
                position: 'top',
                timeout: 2000,
              });
            },
          },
        ],
      });
    }
  } catch (error) {
    console.error('❌ 슬라이드 빌드 실패:', error);

    $q.notify({
      type: 'negative',
      message: '슬라이드 빌드 중 오류가 발생했습니다.',
      position: 'top',
      timeout: 5000,
      icon: 'error',
      actions: [{ label: '확인', color: 'white' }],
    });
  } finally {
    isBuilding.value = false;
  }
};

// 전체 저장 함수 (알림 표시)
const handleSaveAll = async () => {
  await saveAllData(true);
};

// 전체 저장 함수 (알림 표시 여부 제어)
const saveAllData = async (showNotification: boolean = true) => {
  try {
    isSaving.value = true;
    console.log('💾 전체 저장 시작...');

    // 1. 목차 데이터 저장
    console.log('📋 목차 데이터 저장 중...');
    await courseStore.saveToLocalStorage();

    // 2. 잠금 상태 저장
    console.log('🔒 잠금 상태 저장 중...');
    await courseStore.saveLockStatus();

    // 3. files.json 업데이트 (새로 추가된 슬라이드가 있는 경우)
    console.log('📁 files.json 업데이트 중...');
    try {
      await courseStore.updateFilesJson();
      console.log('✅ files.json 업데이트 완료');
    } catch (error) {
      console.warn('⚠️ files.json 업데이트 중 오류 (무시됨):', error);
    }

    // 4. 성공 메시지 표시 (showNotification이 true인 경우에만)
    console.log('✅ 전체 저장 완료');

    if (showNotification) {
      // 성공 알림 표시
      $q.notify({
        type: 'positive',
        message: '💾 전체 저장이 완료되었습니다!',
        position: 'top',
        timeout: 3000,
        icon: 'save',
        actions: [{ label: '확인', color: 'white' }],
      });
    }
  } catch (error) {
    console.error('❌ 전체 저장 실패:', error);

    if (showNotification) {
      // 오류 알림 표시
      $q.notify({
        type: 'negative',
        message: '❌ 저장 중 오류가 발생했습니다.',
        position: 'top',
        timeout: 5000,
        icon: 'error',
        actions: [{ label: '확인', color: 'white' }],
      });
    }
  } finally {
    isSaving.value = false;
  }
};

// 설문 결과 페이지로 이동
const goToSurveyResults = () => {
  router.push('/survey-results');
};

// 직접 로그인 처리 (팝업 없이 바로 로그인)
const handleDirectLogin = async () => {
  try {
    console.log('🔐 직접 로그인 시작...');
    await signInWithGoogle();
    console.log('✅ 직접 로그인 완료');
  } catch (error) {
    console.error('❌ 직접 로그인 실패:', error);
    $q.notify({
      type: 'negative',
      message: '로그인에 실패했습니다. 다시 시도해주세요.',
      position: 'top',
      timeout: 3000,
    });
  }
};

// 자동 저장 인터벌 (5분마다)
let autoSaveInterval: NodeJS.Timeout | null = null;
const AUTO_SAVE_INTERVAL = 5 * 60 * 1000; // 5분

// 인증 상태 변화 감지 (Google 로그인)
watch(
  isAuthenticated,
  (newAuthState) => {
    console.log('🔐 Google 인증 상태 변화 감지:', newAuthState);
    if (newAuthState) {
      // 로그인 성공 시 다이얼로그 닫기
      showLoginDialog.value = false;
      console.log('✅ Google 로그인 성공 - 다이얼로그 닫힘');

      // 사용자 역할에 따른 화면 모드 설정
      const role = userRole.value;
      console.log('👤 사용자 역할:', role);

      if (role === 'student') {
        // 학생 모드: StudentView.vue로 라우팅
        console.log('🎓 학생 모드: StudentView로 라우팅');
        router.push('/study/ai-workshop');
      } else if (role === 'admin') {
        // 관리자 모드: 편집기 모드 유지 (기본값)
        console.log('👨‍💼 관리자 모드: 편집 기능 활성화');
      }

      // 디버깅 정보 출력
      debugUserInfo();
    }
  },
  { immediate: true },
); // immediate: true 추가하여 초기 상태도 감지

// 게스트 인증 상태 변화 감지
watch(isGuestAuthenticated, (newGuestAuthState) => {
  console.log('🎭 게스트 인증 상태 변화 감지:', newGuestAuthState);
  if (newGuestAuthState && isGuestInfoRegistered.value) {
    // 게스트 정보 등록 완료 시 StudentView로 라우팅
    console.log('🎭 게스트 모드: StudentView로 라우팅');
    router.push('/study/ai-workshop');
  }
});

// Firestore 잠금 동기화 초기화 여부
const locksInitialized = ref(false);

// 컴포넌트 마운트 시 제목 로드 및 자동 저장 시작
onMounted(async () => {
  console.log('🚀 MainLayout 마운트 시작...');

  // Firebase 설정 상태 확인
  checkFirebaseConfig();

  // Firebase 인증 초기화
  initAuth();

  // 게스트 세션 복원
  await restoreGuestSession();

  // 강의 목차 초기화
  console.log('📚 강의 목차 초기화 시작...');
  await courseStore.initializeCourseOutline();
  console.log('✅ 강의 목차 초기화 완료, lessons 개수:', lessons.value.length);

  // 잠금 상태: 현재 코스 ID 설정 후 Firestore에서 로드 및 실시간 구독
  try {
    courseStore.setCurrentCourseId('ai-workshop');
    await courseStore.loadLockStatusFromFirestore('ai-workshop');
    courseStore.subscribeLockStatus('ai-workshop');
    locksInitialized.value = true;
    console.log('🔒 Firestore 잠금 초기 로드 및 구독 시작 완료');
  } catch (e) {
    console.warn('⚠️ Firestore 잠금 초기화 실패(무시 가능):', e);
  }

  // MD 기반 제목/데이터 사전 로드
  loadAllSlideTitles();

  // 목차(lessons)가 백그라운드 로드로 교체될 때 한 번 더 Firestore 잠금 재적용
  watch(
    () => lessons.value.map((l) => l?.slides).join(','),
    async () => {
      if (!isAuthenticated.value && !(isGuestAuthenticated.value && isGuestInfoRegistered.value))
        return;
      try {
        await courseStore.loadLockStatusFromFirestore('ai-workshop');
        console.log('🔒 lessons 갱신 감지 → Firestore 잠금 재적용 완료');
      } catch (e) {
        console.warn('⚠️ Firestore 잠금 재적용 실패(무시 가능):', e);
      }
    },
    { immediate: false },
  );

  // 현재 선택된 Chapter만 펼치기
  const initialLesson = currentLesson.value;
  if (initialLesson !== undefined && initialLesson >= 0) {
    isChapterExpanded.value[initialLesson] = true;
  }

  // Firebase가 초기화된 후에만 자동 저장 시작
  const startAutoSave = () => {
    // 5분마다 자동 저장
    autoSaveInterval = setInterval(
      async () => {
        if (!isSaving.value) {
          console.log('⏰ 자동 저장 실행...');
          try {
            await courseStore.saveToLocalStorage();
            await courseStore.saveLockStatus();
            console.log('✅ 자동 저장 완료');
          } catch (error) {
            console.warn('⚠️ 자동 저장 실패:', error);
          }
        }
      },
      5 * 60 * 1000,
    ); // 5분
  };

  // Firebase 초기화 완료 후 자동 저장 시작
  if (isFirebaseConfigured.value) {
    startAutoSave();
  } else {
    // Firebase가 설정되지 않은 경우 자동 저장 비활성화
    console.log('⚠️ Firebase가 설정되지 않아 자동 저장을 비활성화합니다.');
  }
});

// 브라우저를 닫기 전에 자동 저장
onBeforeUnmount(() => {
  console.log('🔄 브라우저 종료 전 자동 저장...');

  // 자동 저장 인터벌 정리
  if (autoSaveInterval) {
    clearInterval(autoSaveInterval);
  }

  // 마지막 저장 실행 (알림 없이, 비동기로)
  if (!isSaving.value) {
    saveAllData(false);
  }
});

// 페이지를 떠나기 전에 저장 확인 (최적화)
let isPageUnloading = false;

window.addEventListener('beforeunload', (event) => {
  if (isPageUnloading) return; // 중복 실행 방지

  isPageUnloading = true;
  console.log('🔄 페이지 이탈 전 자동 저장...');

  // 동기적으로 저장 상태 확인
  if (isSaving.value) {
    event.preventDefault();
    event.returnValue = '저장 중입니다. 잠시만 기다려주세요.';
    return;
  }

  // 페이지 이탈 시 조용히 저장 (알림 없이, 비동기로)
  if (!isSaving.value) {
    saveAllData(false);
  }
});
</script>

<style scoped>
/* 선택된 Chapter 스타일 */
.selected-chapter {
  background-color: #f5f5f5 !important;
  border-left: 4px solid #666;
  border-radius: 8px;
  margin-bottom: 4px;
  box-shadow: 0 2px 4px rgba(102, 102, 102, 0.2);
  transform: scale(1.02);
  transition: all 0.3s ease;
}

.selected-chapter .q-expansion-item__header {
  font-weight: 600 !important;
  color: #333 !important;
}

/* 일반 Chapter 스타일 */
.q-expansion-item:not(.selected-chapter):not(.locked-chapter) {
  background-color: #fafafa;
  border-radius: 4px;
  margin-bottom: 2px;
  transition: all 0.2s ease;
}

.q-expansion-item:not(.selected-chapter):not(.locked-chapter):hover {
  background-color: #f0f0f0;
  transform: translateX(4px);
}

/* 그레이 텍스트 스타일 */
.text-purple {
  color: #333 !important;
}

/* 잠긴 Chapter 스타일 */
.locked-chapter {
  opacity: 0.6;
}

/* 잠금 상태여도 잠금 토글 버튼은 항상 클릭 가능 + 손모양 커서 */
.locked-chapter .q-btn[icon='lock'],
.locked-chapter .q-btn[icon='lock_open'],
.locked-slide .q-btn[icon='lock'],
.locked-slide .q-btn[icon='lock_open'] {
  pointer-events: auto !important;
  cursor: pointer !important;
}

/* 강의 제목 스타일 */
.q-expansion-item__header .q-expansion-item__header-content .q-item__section--main .q-item__label {
  font-size: 1.1rem !important;
  font-weight: 600 !important;
  line-height: 1.4 !important;
}

/* 슬라이드 항목 스타일 */
.slide-item {
  /* border-left: 2px solid #4caf50; */ /* 녹색 세로 괄호 제거 */
  margin-left: 8px;
}

.slide-item:hover {
  background-color: #f5f5f5;
}

/* 잠긴 슬라이드 스타일 - 녹색 줄을 회색으로 변경 */
.slide-item.locked-slide {
  /* border-left: 2px solid #9e9e9e; */ /* 회색 세로 괄호 제거 */
  opacity: 0.7;
}

/* 강의 제목과 슬라이드 제목 구분 */
.text-primary {
  color: #1976d2 !important;
}

.text-grey-8 {
  color: #666 !important;
}

/* 줄간격 줄이기 */
.q-expansion-item {
  margin-bottom: 2px !important;
}

.q-expansion-item__header {
  min-height: 40px !important;
  padding: 4px 8px !important;
}

.q-item {
  min-height: 32px !important;
  padding: 4px 8px !important;
}

.slide-item {
  min-height: 28px !important;
  padding: 2px 8px !important;
}

/* 강의 제목과 슬라이드 개수 텍스트 줄간격 */
.q-expansion-item__header .q-item__section--main .q-item__label {
  line-height: 1.2 !important;
}

.q-expansion-item__header .q-item__section--main .q-item__label + .text-caption {
  line-height: 1.1 !important;
  margin-top: 2px !important;
}

/* 슬라이드 제목 줄간격 */
.slide-item .q-item__label {
  line-height: 1.2 !important;
  padding: 2px 0 !important;
}

/* 현재 슬라이드 정보 섹션 스타일 */
.current-slide-info-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-bottom: 1px solid #dee2e6;
  margin-bottom: 0.5rem;
}

.current-slide-info-section .text-subtitle2 {
  color: #1976d2;
  font-weight: 600;
}

.current-slide-info-section .text-caption {
  color: #6c757d;
}

.current-slide-info-section .q-chip {
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(25, 118, 210, 0.2);
}

/* q-toolbar 버튼 스타일 */
.q-toolbar .q-btn {
  opacity: 1 !important;
  color: white !important;
}

.q-toolbar .q-btn:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  transform: scale(1.1);
  transition: all 0.2s ease;
}

.q-toolbar .q-btn:disabled {
  opacity: 0.5 !important;
}

/* 슬라이드 좌우 화살표 버튼 스타일 */
.slide-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border: 2px solid #f44336;
}

.slide-nav-btn:hover {
  background: rgba(255, 255, 255, 1);
  transform: translateY(-50%) scale(1.1);
  transition: all 0.2s ease;
}

.slide-nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.slide-nav-left {
  left: 20px;
}

.slide-nav-right {
  right: 20px;
}

/* 중앙 슬라이드 정보 스타일 */
.current-slide-info-center {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  z-index: 1000;
}

/* YouTube 스타일 사이드바 - Azure 배포 환경 대응 */
.sidebar-drawer {
  background: #f8f9fa !important; /* YouTube 스타일 밝은 회색 배경 */
  border-right: 1px solid #e9ecef !important;
  transition: all 0.3s ease !important;
  max-height: 95vh !important;
  overflow: hidden !important;
}

.sidebar-drawer .q-scroll-area {
  background: #f8f9fa !important;
  max-height: 95vh !important;
}

/* YouTube 스타일 Chapter 항목 */
.sidebar-drawer .q-expansion-item {
  margin-bottom: 1px !important;
  border-radius: 8px !important;
  transition: all 0.2s ease !important;
  background: transparent !important;
  overflow: visible !important;
}

.sidebar-drawer .q-expansion-item:hover {
  background-color: #e9ecef !important; /* YouTube 스타일 호버 */
  transform: translateX(2px) !important;
  border-radius: 8px !important;
  margin: 2px 4px !important;
}

.sidebar-drawer .selected-chapter {
  background-color: #e3f2fd !important; /* YouTube 스타일 선택 배경 */
  border-left: 3px solid #1976d2 !important;
  border-radius: 8px !important;
  margin: 2px 4px !important;
}

.sidebar-drawer .locked-chapter {
  opacity: 0.6 !important;
  background-color: rgba(244, 67, 54, 0.05) !important;
  border-radius: 8px !important;
}

/* YouTube 스타일 슬라이드 항목 */
.sidebar-drawer .slide-item {
  border-radius: 8px !important;
  margin: 2px 8px !important;
  transition: all 0.2s ease !important;
  background: transparent !important;
  /* border-left: 2px solid #4caf50; */ /* 녹색 세로 괄호 제거 */
}

.sidebar-drawer .slide-item:hover {
  background-color: #e9ecef !important; /* YouTube 스타일 호버 */
  transform: translateX(4px) !important;
  border-radius: 8px !important;
  margin: 2px 12px !important;
  padding-left: 12px !important;
}

.sidebar-drawer .slide-item.q-item--active,
.sidebar-drawer .slide-item-active {
  background-color: #e3f2fd !important; /* YouTube 스타일 선택 배경 */
  color: #1976d2 !important;
  font-weight: 600 !important;
  border-left: 3px solid #1976d2 !important;
  border-radius: 8px !important;
  margin: 2px 12px !important;
  padding-left: 12px !important;
}

.sidebar-drawer .chapter-item-active {
  background-color: #e3f2fd !important; /* YouTube 스타일 선택 배경 */
  border-left: 3px solid #1976d2 !important;
  border-radius: 8px !important;
  margin: 2px 4px !important;
}

.sidebar-drawer .locked-slide {
  opacity: 0.5 !important;
  background-color: rgba(244, 67, 54, 0.05) !important;
  border-radius: 8px !important;
}

/* YouTube 스타일 텍스트 */
.sidebar-drawer .text-weight-medium {
  font-weight: 500 !important;
  color: #212529 !important; /* YouTube 스타일 텍스트 색상 */
}

.sidebar-drawer .text-caption {
  color: #6c757d !important; /* YouTube 스타일 보조 텍스트 */
  font-size: 0.75rem !important;
}

/* YouTube 스타일 버튼 */
.sidebar-drawer .q-btn {
  border-radius: 6px !important;
  transition: all 0.2s ease !important;
}

.sidebar-drawer .q-btn:hover {
  transform: scale(1.1) !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
}

/* YouTube 스타일 확장 아이템 헤더 */
.sidebar-drawer .q-expansion-item__header {
  min-height: 48px !important; /* YouTube 스타일 높이 */
  padding: 8px 12px !important; /* YouTube 스타일 패딩 */
  border-radius: 8px !important;
}

/* YouTube 스타일 슬라이드 아이템 */
.sidebar-drawer .q-item {
  min-height: 36px !important; /* YouTube 스타일 높이 */
  padding: 6px 12px !important; /* YouTube 스타일 패딩 */
  border-radius: 8px !important;
}

.sidebar-drawer .slide-item {
  min-height: 32px !important; /* YouTube 스타일 높이 */
  padding: 4px 12px !important; /* YouTube 스타일 패딩 */
  border-radius: 8px !important;
}

/* YouTube 스타일 리스트 */
.sidebar-list {
  background: transparent !important;
  padding: 4px !important;
}

.sidebar-list .q-expansion-item {
  margin-bottom: 2px !important;
  border-radius: 8px !important;
}

.sidebar-list .slide-item {
  margin: 1px 0 !important;
  border-radius: 8px !important;
}

/* 반응형 YouTube 스타일 */
@media (max-width: 768px) {
  .sidebar-drawer {
    width: 280px !important;
    max-height: 95vh !important;
  }

  .sidebar-drawer .q-expansion-item {
    margin-bottom: 1px !important;
  }

  .sidebar-drawer .slide-item {
    margin: 1px 4px !important;
  }
}

/* 전체화면 모드 YouTube 스타일 */
:fullscreen .sidebar-drawer {
  background: #f8f9fa !important;
}

:fullscreen .sidebar-drawer .q-scroll-area {
  background: #f8f9fa !important;
}

/* 설정 다이얼로그 스타일 */
.settings-dialog {
  background: white;
}

.settings-dialog .text-h6 {
  color: #1976d2 !important;
  font-weight: 600;
}

.settings-dialog .q-toggle {
  color: #333 !important;
}

.settings-dialog .q-toggle__label {
  color: #333 !important;
  font-weight: 500;
}

.settings-dialog .q-card-section {
  color: #333;
}

.settings-dialog .q-btn {
  color: #1976d2 !important;
}

/* 슬라이드 빌드 명령어 섹션 스타일 */
.build-command-section {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 16px;
  margin-top: 8px;
}

.code-block {
  position: relative;
  background: #2d3748;
  border-radius: 6px;
  padding: 12px 40px 12px 12px;
  margin-top: 8px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.code-block code {
  color: #e2e8f0;
  font-size: 0.9em;
  line-height: 1.4;
  word-break: break-all;
}

.copy-btn {
  position: absolute !important;
  top: 8px;
  right: 8px;
  background: rgba(255, 255, 255, 0.1) !important;
}

.copy-btn:hover {
  background: rgba(255, 255, 255, 0.2) !important;
}

/* HTML 변환 다이얼로그 스타일 */
.html-convert-dialog {
  background: white;
}

.html-convert-dialog .text-h6 {
  color: #1976d2 !important;
  font-weight: 600;
}

.convert-option {
  margin-bottom: 16px;
}

.option-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.option-header .text-subtitle2 {
  font-weight: 600;
  color: #333;
}

/* 전체화면 모드에서 사이드바 높이 조정 */
:fullscreen .sidebar-drawer {
  max-height: 90vh !important;
}

:fullscreen .sidebar-drawer .q-scroll-area {
  max-height: 90vh !important;
}

/* 사이드바 리스트 최적화 */
.sidebar-list {
  padding: 8px !important;
}

.sidebar-list .q-expansion-item {
  margin-bottom: 2px;
}

.sidebar-list .slide-item {
  margin: 1px 0;
  padding: 4px 8px !important;
}

/* 사용자명 버튼 스타일 */
.user-info-btn {
  background: rgba(255, 255, 255, 0.1) !important;
  border-radius: 6px !important;
  padding: 6px 12px !important;
  min-width: auto !important;
  height: auto !important;
}

.user-info-btn:hover {
  background: rgba(255, 255, 255, 0.2) !important;
}

.user-name {
  color: white !important;
  font-weight: 500 !important;
  font-size: 0.9em !important;
  white-space: nowrap !important;
}
</style>
