<script setup lang="ts">
import { RouterView } from 'vue-router';
import { computed } from 'vue';
import Header from './components/Header.vue';
import { useThemeStore } from '@/stores/themes';
import {
  type GlobalThemeOverrides,
  type GlobalTheme,
  darkTheme,
  datePtBR,
  ptBR,
  NConfigProvider,
  NMessageProvider,
} from 'naive-ui';

const themeStore = useThemeStore();

// Use theme from store
const naiveTheme = computed<GlobalTheme | null>(() => {
  return themeStore.isDark ? darkTheme : null;
});

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#EEBF3D',
    primaryColorHover: '#F5D056',
    primaryColorPressed: '#D9AD34',
    primaryColorSuppl: '#6B4FBB',
    borderRadius: '8px',
  },
  Button: {
    textColor: 'var(--color-text)',
    textColorHover: 'var(--color-text)',
    textColorPressed: 'var(--color-text)',
    textColorFocus: 'var(--color-text)',
    color: 'var(--color-surface-bright)',
    colorHover: 'var(--color-surface-bright)',
    colorPressed: 'var(--color-surface-bright)',
    colorFocus: 'var(--color-surface-bright)',
    border: '1px solid transparent',
    borderHover: '1px solid var(--color-text-muted)',
    borderPressed: '1px solid var(--color-text)',
    borderFocus: '1px solid var(--color-text-muted)',
  },
  Input: {
    color: 'var(--color-surface-bright)',
    colorFocus: 'var(--color-surface-bright)',
    border: '2px solid transparent',
    borderHover: '2px solid var(--color-text-muted)',
    borderFocus: '2px solid var(--color-primary)',
  },
  Popover: {
    color: 'var(--color-surface)',
  },
};
</script>

<template>
  <n-config-provider :theme="naiveTheme" :locale="ptBR" :date-locale="datePtBR" :theme-overrides="themeOverrides">
    <Header />

    <main>
      <n-message-provider>
        <RouterView />
      </n-message-provider>
    </main>
  </n-config-provider>
</template>
