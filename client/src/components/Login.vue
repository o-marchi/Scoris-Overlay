<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { NIcon, NPopover, NDropdown } from 'naive-ui';
import { ChevronDown, LogOut, LogoDiscord, LogoGoogle } from '@vicons/ionicons5';

const auth = useAuthStore();
const { user, isAuthenticated } = storeToRefs(auth);
const { t } = useI18n();

const logout = () => {
  auth.logout();
  window.location.href = '/';
};

const dropdownOptions = [
  {
    label: 'Logout',
    key: 'logout',
    icon: () => {
      return {
        template: '<svg><use href="#logout-icon" /></svg>',
      };
    },
  },
];

const handleSelect = (key: string) => {
  if (key === 'logout') {
    logout();
  }
};
</script>

<template>
  <div class="login-container">
    <!-- Not authenticated: Show login buttons -->
    <div v-if="!isAuthenticated" class="login-buttons">
      <button class="btn btn-primary btn-sm" @click="auth.login('discord')">
        <n-icon size="16">
          <LogoDiscord />
        </n-icon>
        {{ t('auth.discord') }}
      </button>
      <button class="btn btn-secondary btn-sm" @click="auth.login('google')">
        <n-icon size="16">
          <LogoGoogle />
        </n-icon>
        {{ t('auth.google') }}
      </button>
    </div>

    <!-- Authenticated: Show user menu -->
    <div v-else class="user-menu">
      <n-popover trigger="click" placement="bottom-end">
        <template #trigger>
          <button class="user-button">
            <div v-if="user?.avatar" class="user-avatar">
              <img :src="user.avatar" alt="User avatar" />
            </div>
            <div v-else class="user-avatar user-avatar-fallback">
              {{ user?.name?.[0] || '?' }}
            </div>
            <span class="user-name">{{ user?.name }}</span>
            <n-icon size="16" class="chevron">
              <ChevronDown />
            </n-icon>
          </button>
        </template>
        <div class="user-dropdown">
          <div class="user-info">
            <div class="user-info-name">{{ user?.name }}</div>
            <div class="user-info-email">{{ user?.email }}</div>
            <div v-if="user?.provider" class="user-info-provider">
              {{ t('auth.via') }} {{ user.provider }}
            </div>
          </div>
          <div class="divider"></div>
          <button class="dropdown-item" @click="logout">
            <n-icon size="18">
              <LogOut />
            </n-icon>
            {{ t('auth.logout') }}
          </button>
        </div>
      </n-popover>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
}

.login-buttons {
  display: flex;
  gap: 0.5rem;
}

.user-menu {
  position: relative;
}

.user-button {
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
}

.user-button:hover {
  border-color: var(--color-text-muted);
  box-shadow: var(--shadow-s);
}

.user-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-avatar-fallback {
  background: var(--color-primary);
  color: oklch(0.15 0 264);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.75rem;
}

.user-name {
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chevron {
  opacity: 0.6;
}

.user-dropdown {
  min-width: 200px;
}

.user-info {
  padding: 0.75rem;
}

.user-info-name {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--color-text);
  margin-bottom: 0.25rem;
}

.user-info-email {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin-bottom: 0.25rem;
}

.user-info-provider {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  font-style: italic;
}

.dropdown-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 0.75rem;
  background: transparent;
  border: none;
  color: var(--color-text);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.15s;
  text-align: left;
}

.dropdown-item:hover {
  background: var(--color-surface-dim);
}
</style>
