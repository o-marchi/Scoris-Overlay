<script setup lang="ts">
import { RouterView } from 'vue-router';
import Title from './components/Title.vue';
import Login from '@/components/Login.vue';
import {
  type GlobalThemeOverrides,
  darkTheme,
  datePtBR,
  ptBR,
  NConfigProvider,
  NMenu,
  NMessageProvider,
} from 'naive-ui';

const themeOverrides: GlobalThemeOverrides = {
  Tooltip: {
    color: '#141215',
  },
  common: {
    primaryColor: '#8192FF',
    borderRadius: '4px',
    modalColor: '#18131C',
    closeColorHover: 'black',
  },
  Input: {
    border: '#5d4041',
    borderFocus: '#5e2e30',
    borderHover: '#5d4041',
  },
  Switch: {},
};
</script>

<template>
  <n-config-provider :theme="darkTheme" :locale="ptBR" :date-locale="datePtBR" :theme-overrides="themeOverrides">
    <header>
      <div class="wrapper">
        <Login />
        <Title />
      </div>
    </header>

    <main>
      <n-message-provider>
        <RouterView />
      </n-message-provider>
    </main>
  </n-config-provider>
</template>
