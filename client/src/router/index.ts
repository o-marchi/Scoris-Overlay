import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import AuthCallbackPage from '@/views/AuthCallbackPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/auth/callback',
      name: 'auth-callback',
      component: AuthCallbackPage,
    },
  ],
});

export default router;
