<script setup lang="ts">
import { ref } from 'vue';
import { NButton, NIcon, NModal } from 'naive-ui';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { LogoDiscord } from '@vicons/ionicons5';
import { LogoGoogle } from '@vicons/ionicons5';
import ThemeToggle from '@/components/ThemeToggle.vue';

const auth = useAuthStore();
const { isAuthenticated } = storeToRefs(auth);

const showModal = ref(false);
</script>

<template>
  <div class="title-wrapper">
    <n-modal
      class="luz-modal"
      v-model:show="showModal"
      :mask-closable="false"
      :close-on-esc="false"
      preset="card"
      style="width: 400px"
    >
      <div v-if="isAuthenticated" class="flex">
        <p><b>Você já está autenticado</b></p>
      </div>
      <div v-else class="flex">
        <p><b>Login</b></p>

        <n-button style="margin: 20px 0 10px; width: 100%" size="large" @click="auth.login('discord')">
          Logar

          <n-icon size="16" style="margin-left: 10px">
            <LogoDiscord />
          </n-icon>
        </n-button>

        <n-button style="margin: 20px 0 10px; width: 100%" size="large" @click="auth.login('google')">
          Logar

          <n-icon size="16" style="margin-left: 10px">
            <LogoGoogle />
          </n-icon>
        </n-button>
      </div>
    </n-modal>

    <header>
      <h1 class="title">SCORIS</h1>
      <p class="subtitle">OVERLAY</p>
    </header>

    <div>
      <ThemeToggle></ThemeToggle>
      <n-button @click="showModal = true">Login</n-button>
    </div>
  </div>
</template>
