import { createApp } from 'vue';

// pinia
import { createPinia } from 'pinia'

//router
import router from './router'

// i18n
import { createI18n } from 'vue-i18n'
import messages from './locales';

// element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


import './style.css'
import App from './App.vue';


const app = createApp(App)

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages
})

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(ElementPlus)
app.mount('#app')