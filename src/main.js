import './assets/main.css'
import 'highlight.js/styles/github.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
