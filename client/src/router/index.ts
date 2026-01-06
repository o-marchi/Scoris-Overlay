import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import AuthCallbackPage from '@/views/AuthCallbackPage.vue';
import StyleGuide from '@/views/StyleGuide.vue';
import tournamentRoutes from '@/router/tournament.ts';

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
    {
      path: '/style-guide',
      name: 'style-guide',
      component: StyleGuide,
    },
    {
      path: '/tournament',
      children: tournamentRoutes,
    },
  ],
});

export default router;
