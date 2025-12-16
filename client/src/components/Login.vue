<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { NButton, NTooltip, NGradientText, NIcon, NPopover } from 'naive-ui';
import { ChevronDown, LogOut } from '@vicons/ionicons5';

const auth = useAuthStore();
const { user, isAuthenticated } = storeToRefs(auth);

const pluralize = (plural: string, singular: string, count: number): string => {
  if (count === 1) {
    return singular;
  }

  return plural;
};

const logout = () => {
  auth.logout();
  window.location.href = '/';
};
</script>

<template>
  <div class="login-wrapper">
    <div>
      <div class="float-login">
        <div v-if="isAuthenticated">
          <template v-if="user">
            <template>
              <div v-if="user.name" class="user-initial">{{ user.name[0] }}</div>
            </template>

            <p v-if="user.name">{{ user.name }}</p>

            <img :src="user.avatar" />
          </template>

          <n-popover class="login-popover" trigger="click" placement="bottom-end">
            <template #trigger>
              <n-icon size="16">
                <ChevronDown />
              </n-icon>
            </template>
            <div class="login-menu">
              <n-button @click="logout">
                Logout

                <n-icon size="16" style="margin-left: 10px">
                  <LogOut />
                </n-icon>
              </n-button>
            </div>
          </n-popover>
        </div>
      </div>
    </div>
  </div>
</template>
