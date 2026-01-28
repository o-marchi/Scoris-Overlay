<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useI18n } from 'vue-i18n';
import ThemeToggle from './ThemeToggle.vue';
import LanguageSwitcher from './LanguageSwitcher.vue';
import Login from './Login.vue';

const route = useRoute();
const auth = useAuthStore();
const { t } = useI18n();
</script>

<template>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <!-- Brand/Logo -->
        <RouterLink to="/" class="nav-brand">
          SCORIS
        </RouterLink>

        <!-- Navigation Links -->
        <div class="nav-links">
          <RouterLink
            to="/"
            class="nav-link"
            :class="{ active: route.path === '/' }"
          >
            {{ t('nav.home') }}
          </RouterLink>

          <RouterLink
            v-if="auth.isAuthenticated"
            to="/tournament"
            class="nav-link"
            :class="{ active: route.path.startsWith('/tournament') }"
          >
            {{ t('nav.tournaments') }}
          </RouterLink>

          <RouterLink
            to="/style-guide"
            class="nav-link"
            :class="{ active: route.path === '/style-guide' }"
          >
            {{ t('nav.styleGuide') }}
          </RouterLink>

          <div class="flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
            <Login />
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
/* Additional header-specific styles if needed */
.nav-brand:hover {
  filter: brightness(1.1);
}
</style>
