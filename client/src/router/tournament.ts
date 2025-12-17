import CreateTournament from '@/views/CreateTournament.vue';
import type { RouteRecordRaw } from 'vue-router';

const tournamentRoutes: RouteRecordRaw[] = [
  {
    path: 'new',
    name: 'new-tournament',
    component: CreateTournament,
  },
];

export default tournamentRoutes;
