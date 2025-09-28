import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router.js";
import vuetify from "./plugins/vuetify.js";

// createApp(App).mount('#app')
createApp(App).use(vuetify).use(router).mount("#app");