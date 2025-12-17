<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.ts';
import { storeToRefs } from 'pinia';
import Scoris from '@/views/Scoris.vue';
import Tournaments from '@/views/Tournaments.vue';

const auth = useAuthStore();
const { user, isAuthenticated } = storeToRefs(auth);
</script>

<template>
  <div class="home">
    <template v-if="isAuthenticated">
      <Tournaments></Tournaments>
    </template>

    <template v-else>
      <Scoris></Scoris>
    </template>
  </div>
</template>
