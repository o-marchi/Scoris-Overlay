<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui';
import { SunnyOutline, MoonOutline } from '@vicons/ionicons5';
import { useThemeStore } from '@/stores/themes.ts';

const themeStore = useThemeStore();
</script>

<template>
  <n-button @click="themeStore.toggleTheme">
    <template #icon>
      <n-icon>
        <SunnyOutline v-if="themeStore.isDark" />
        <MoonOutline v-else />
      </n-icon>
    </template>
  </n-button>
</template>
