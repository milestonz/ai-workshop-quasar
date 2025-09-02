<template>
  <div v-if="meta" class="poll-vote">
    <div class="poll-header">
      <div class="title">{{ meta?.question || '투표' }}</div>
      <div class="subtitle" v-if="meta?.description">{{ meta?.description }}</div>
    </div>

    <div v-if="isReady" class="options">
      <div v-for="(label, optionId) in meta?.options || {}" :key="optionId" class="option-item">
        <q-btn
          unelevated
          color="primary"
          class="full-width q-mb-sm"
          :label="label"
          :disable="!!myVote"
          @click="handleVote(optionId as string)"
        />
      </div>
    </div>

    <div v-if="myVote" class="voted">투표 완료: {{ meta?.options?.[myVote] }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref as vRef, onMounted, onUnmounted, computed } from 'vue';
import { useQuasar } from 'quasar';
import { getDatabase, ref, onValue, get, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { firebaseApp } from '../../services/firebase/config';

interface PollMeta {
  question: string;
  description?: string;
  options: Record<string, string>;
  type?: 'bar' | 'word';
  open?: boolean;
}

const props = defineProps<{ pollId: string }>();

const $q = useQuasar();
const db = firebaseApp ? getDatabase(firebaseApp) : null;
const auth = firebaseApp ? getAuth(firebaseApp) : getAuth();

const meta = vRef<PollMeta | null>(null);
const myVote = vRef<string | null>(null);
const isReady = vRef(false);

let unsubMeta: (() => void) | null = null;
let unsubMyVote: (() => void) | null = null;
let readyTimeout: number | null = null;

onMounted(async () => {
  if (!db) {
    console.warn('⚠️ RTDB 미초기화: 투표 비활성');
    isReady.value = false;
    return;
  }

  console.log('🗳️ PollVote mount:', {
    pollId: props.pollId,
    rtdbUrl: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    appDbUrl: (firebaseApp?.options as any)?.databaseURL || null,
  });
  try {
    // 메타 구독
    unsubMeta = onValue(ref(db, `polls/${props.pollId}/meta`), (snap) => {
      meta.value = (snap.val() as PollMeta) || null;
      console.log('🗳️ meta:', meta.value);
    });

    // 내 투표 상태 구독(있으면 버튼 비활성화)
    const uid = auth.currentUser?.uid;
    console.log('🗳️ auth uid:', uid);
    if (uid) {
      unsubMyVote = onValue(ref(db, `polls/${props.pollId}/votes/${uid}`), (snap) => {
        myVote.value = snap.exists() ? (snap.val() as string) : null;
        console.log('🗳️ myVote:', myVote.value);
        isReady.value = true;
      });
    } else {
      isReady.value = true;
    }
  } catch (e) {
    console.error('🗳️ RTDB 구독 실패:', e);
    isReady.value = true;
  }

  // 네트워크/권한 문제 대비 타임아웃(2.5s)
  readyTimeout = window.setTimeout(() => {
    if (!isReady.value) isReady.value = true;
  }, 2500);
});

onUnmounted(() => {
  if (unsubMeta) unsubMeta();
  if (unsubMyVote) unsubMyVote();
  if (readyTimeout) window.clearTimeout(readyTimeout);
});

const isOpen = computed(() => meta.value?.open !== false);

const handleVote = async (optionId: string) => {
  try {
    console.log('🗳️ vote click:', { pollId: props.pollId, optionId });
    if (!db) throw new Error('DB not ready');
    if (!isOpen.value) {
      $q.notify({ type: 'warning', message: '현재 투표는 종료되었습니다.' });
      return;
    }
    const uid = auth.currentUser?.uid;
    if (!uid) {
      $q.notify({ type: 'warning', message: '로그인이 필요합니다.' });
      return;
    }
    const path = `polls/${props.pollId}/votes/${uid}`;
    console.log('🗳️ set path:', path);
    await set(ref(db, path), optionId);

    // 즉시 읽기 검증
    const snap = await get(ref(db, path));
    console.log('🗳️ verify read:', { path, value: snap.val() });

    $q.notify({ type: 'positive', message: '투표가 완료되었습니다.' });
  } catch (e: any) {
    console.error('투표 실패:', e);
    $q.notify({ type: 'negative', message: e?.message || '투표 실패' });
  }
};
</script>

<style scoped>
.poll-vote {
  min-width: 280px;
}
.title {
  font-weight: 700;
  font-size: 1.1rem;
}
.subtitle {
  color: #666;
  font-size: 0.9rem;
}
.options {
  margin-top: 8px;
}
.option-item + .option-item {
  margin-top: 6px;
}
.voted {
  margin-top: 8px;
  color: #2e7d32;
  font-weight: 600;
}
</style>
