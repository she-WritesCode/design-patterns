import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
//theme
import "primevue/resources/themes/tailwind-light/theme.css";     
    
//core
import "primevue/resources/primevue.min.css";

//icons
import "primeicons/primeicons.css";

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue);

app.mount('#app')
