<script lang="ts" setup>
import { NButton } from 'naive-ui';
import { ref } from 'vue';
import type { Tournament } from '@/types/Tournament.ts';
import { getTournamentById } from '@/services/tournament.ts';
import { useRoute } from 'vue-router';
const tournament = ref<Tournament[]>([]);
const route = useRoute();
const loading = ref<boolean>(true);

const fetchTournament = async () => {
  const tournamentId = route.params.tournamentId as string;
  const data = await getTournamentById(tournamentId);
  tournament.value = data ? [data] : [];
  loading.value = false;
};
fetchTournament();
</script>

<template>
  <div class="flex flex-col grow align-items-center mb-4">
    <n-button class="flex self-start" tag="a" :href="`/attendant/new/${tournament[0].id}`">New Attendant</n-button>
    <div v-if="loading">
      <h5 class="p-5">loading</h5>
    </div>
    <div v-else class="tournament-wrapper">
      <div v-for="t in tournament" :key="tournament.id">
        <h3>{{ t.name }}</h3>
        <hr />
        <h3>{{ t.type }}</h3>
      </div>
    </div>
  </div>
</template>
