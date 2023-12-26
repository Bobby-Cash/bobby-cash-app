import '@/assets/css/custom.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import QrReader from 'vue3-qr-reader';

const app = createApp(App)

app.use(QrReader)
app.use(createPinia())
app.use(router)

app.mount('#app')
