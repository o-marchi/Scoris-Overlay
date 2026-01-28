<script setup lang="ts">
import { NButton, NIcon, NSpace } from 'naive-ui';
import { MapOutline } from '@vicons/ionicons5';
import TournamentCard from '@/components/TournamentCard.vue';
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
    </div>

    <TournamentCard></TournamentCard>
  </div>
</template>
