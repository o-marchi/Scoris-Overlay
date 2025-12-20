<script lang="ts" setup>
import { ref } from 'vue';
import type { Tournament } from '@/types/Tournament.ts';
import { getTournaments } from '@/services/tournament.ts';
const tournaments = ref<Tournament[]>([]);
const loading = ref<boolean>(true);

const fetchTournaments = async () => {
  tournaments.value = await getTournaments();

  loading.value = false;
};

fetchTournaments();
</script>

<template>
  <div v-if="loading">
    <h5 class="p-5">loading</h5>
  </div>
  <div v-else class="tournament-wrapper">
    <div v-for="tournament in tournaments">
      <a class="tournament-item" :href="`/tournament/${tournament.id}`">
        <h3>{{ tournament.name }}</h3>
        <hr />
        <span>Type: {{ tournament.type }}</span>
      </a>
    </div>
  </div>
</template>
