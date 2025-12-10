import { useAuthStore } from '@/stores/auth';
import type { App } from 'vue';

export default {
  install: (app: App) => {
    const auth = useAuthStore();

    // Initialize auth state
    auth.init();

    // Make auth store available globally
    app.provide('auth', auth);
  },
};
