import CreateTournament from '@/views/CreateTournament.vue';
import TournamentItem from '../views/TournamentItem.vue';
import type { RouteRecordRaw } from 'vue-router';

const tournamentRoutes: RouteRecordRaw[] = [
  {
    path: 'new',
    name: 'new-tournament',
    component: CreateTournament,
  },
  {
    path: ':tournamentId',
    name: 'tournament-item',
    component: () => TournamentItem,
  },
];

export default tournamentRoutes;
