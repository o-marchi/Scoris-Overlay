<script setup lang="ts">
import { NButton, NIcon, NSpace } from 'naive-ui';
import { MapOutline } from '@vicons/ionicons5';
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
  <div>
    <h1>Tournaments</h1>

    <div>
      <n-button tag="a" href="/tournament/new">
        <n-space>
          <n-icon>
            <MapOutline></MapOutline>
          </n-icon>

          New tournament
        </n-space>
      </n-button>

      <n-button tag="a" href="/attendant/new"> New Attendant </n-button>
    </div>

    <div v-if="loading">
      <h5>loading</h5>
    </div>
    <div v-else>
      <div v-for="tournament in tournaments">
        <pre>{{ tournament }}</pre>
      </div>
    </div>
  </div>
</template>
