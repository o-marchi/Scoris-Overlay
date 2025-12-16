import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from '@/types/User.ts';
import { jwtDecode } from 'jwt-decode';

export const useAuthStore = defineStore('auth', () => {
  // State
  const jwt = ref<string | null>(null);
  const accessToken = ref<string | null>(null);
  const user = ref<User | null>(null);
  const isAuthenticated = ref(false);
  const loading = ref(true);
  const error = ref<unknown>(null);

  // Actions
  async function handleAuthCallback() {
    const params = new URLSearchParams(window.location.search);
    const accessTokenParam = params.get('access_token');
    const jwt = params.get('jwt');

    if (!accessTokenParam || !jwt) {
      throw new Error('Failed to fetch user');
    }

    const user = jwtDecode(jwt);

    if (!user) {
      throw new Error('Failed to fetch user');
    }

    localStorage.setItem('jwt', jwt);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('access_token', accessTokenParam);

    await init();
  }

  async function init() {
    try {
      jwt.value = localStorage.getItem('jwt');
      accessToken.value = localStorage.getItem('access_token');
      user.value = JSON.parse(localStorage.getItem('user') || 'null') as User | null;

      if (jwt.value) {
        isAuthenticated.value = true;
      }
    } catch (err) {
      error.value = err;
      await logout();
    } finally {
      loading.value = false;
    }
  }

  /* function login() {
    window.location.href = import.meta.env.VITE_API_URL + '/auth/discord';
  } */

  function login(provider: 'google' | 'discord') {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/${provider}`;
  }

  async function logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    jwt.value = null;
    accessToken.value = null;
    user.value = null;
    isAuthenticated.value = false;
  }

  return {
    jwt,
    accessToken,
    user,
    isAuthenticated,
    loading,
    error,

    // Actions
    handleAuthCallback,
    init,
    login,
    logout,
  };
});
