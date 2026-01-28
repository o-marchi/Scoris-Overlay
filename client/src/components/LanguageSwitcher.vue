<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { NPopover } from 'naive-ui';

const { locale } = useI18n();

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'pt-BR', name: 'Português (BR)', flag: '🇧🇷' },
];

const currentLanguage = computed(() => {
  return languages.find((lang) => lang.code === locale.value) || languages[0];
});

const switchLanguage = (code: string) => {
  locale.value = code;
  localStorage.setItem('locale', code);
};
</script>

<template>
  <div class="language-switcher">
    <n-popover trigger="click" placement="bottom-end">
      <template #trigger>
        <button class="language-button">
          <span class="flag">{{ currentLanguage.flag }}</span>
          <span class="language-code">{{ currentLanguage.code.split('-')[0].toUpperCase() }}</span>
        </button>
      </template>
      <div class="language-menu">
        <button
          v-for="lang in languages"
          :key="lang.code"
          class="language-option"
          :class="{ active: locale === lang.code }"
          @click="switchLanguage(lang.code)"
        >
          <span class="flag">{{ lang.flag }}</span>
          <span class="language-name">{{ lang.name }}</span>
        </button>
      </div>
    </n-popover>
  </div>
</template>

<style scoped>
.language-switcher {
  display: flex;
  align-items: center;
}

.language-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  background: var(--color-surface-bright);
  border: 1px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--color-text);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  font-weight: 500;
}

.language-button:hover {
  border-color: var(--color-text-muted);
  box-shadow: var(--shadow-s);
}

.flag {
  font-size: 1.125rem;
}

.language-code {
  font-weight: 600;
}

.language-menu {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 180px;
}

.language-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.75rem;
  background: transparent;
  border: none;
  color: var(--color-text);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.15s;
  text-align: left;
  border-radius: 4px;
}

.language-option:hover {
  background: var(--color-surface-dim);
}

.language-option.active {
  background: var(--color-surface-bright);
  font-weight: 600;
}

.language-name {
  flex: 1;
}
</style>
