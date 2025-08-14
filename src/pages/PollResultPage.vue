<template>
  <q-page class="q-pa-md flex flex-center">
    <div class="result-card">
      <div class="row items-center q-mb-sm">
        <div class="col">
          <div class="text-h6">📊 투표 결과</div>
          <div class="text-caption text-grey-7">{{ pollId }}</div>
        </div>
        <div class="col-auto">
          <q-btn flat dense round icon="open_in_new" @click="openInNewTab" />
        </div>
      </div>
      <q-separator class="q-mb-md" />
      <PollResultBar v-if="pollId" :poll-id="pollId" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import PollResultBar from 'src/components/PollResultBar.vue';

const route = useRoute();
const pollId = computed(() => String(route.query.pollId || ''));
const openInNewTab = () => {
  if (pollId.value) {
    window.open(`/#/poll-result?pollId=${encodeURIComponent(pollId.value)}`, '_blank');
  }
};
</script>

<style scoped>
.result-card {
  width: 560px;
  max-width: 90vw;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
  padding: 12px;
}
</style>
