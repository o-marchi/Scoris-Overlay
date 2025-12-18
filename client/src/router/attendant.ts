import CreateAttendant from '@/views/CreateAttendant.vue';
import type { RouteRecordRaw } from 'vue-router';

const attendantRoutes: RouteRecordRaw[] = [
  {
    path: 'new',
    name: 'new-attendant',
    component: CreateAttendant,
  },
];

export default attendantRoutes;
