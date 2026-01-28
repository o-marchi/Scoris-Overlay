import '@/assets/styles/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import authPlugin from './plugins/auth';
import i18n from './plugins/i18n';

const app = createApp(App);

app.use(createPinia());
app.use(i18n);
app.use(authPlugin);
app.use(router);

app.mount('#app');
