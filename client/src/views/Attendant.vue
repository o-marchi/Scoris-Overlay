<script setup lang="ts">
import { NButton, NIcon, NSpace } from 'naive-ui';
import { MapOutline } from '@vicons/ionicons5';
import { ref } from 'vue';
import type { Attendant } from '@/types/Attendant.ts';
import { getAttendants } from '@/services/attendant.ts';

const attendants = ref<Attendant[]>([]);
const loading = ref<boolean>(true);

const fetchAttendants = async () => {
  attendants.value = await getAttendants();

  loading.value = false;
};

fetchAttendants();
</script>

<template>
  <div>
    <h1>Tournaments</h1>

    <div>
      <n-button tag="a" href="/attendant/new"> New Attendant </n-button>
    </div>
    <div v-if="loading">
      <h5>loading</h5>
    </div>
    <div v-else>
      <div v-for="attendant in attendants">
        <pre>{{ attendant }}</pre>
      </div>
    </div>
  </div>
</template>
