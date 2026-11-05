import { createApp } from "vue";
import App from "./App.vue";
import router from './router/index.js'
import { createPinia } from 'pinia'
import 'onyks-web-ui'
import { setup_bloodstone } from '@bloodstone/setup'

const pinia = createPinia()
const app = createApp(App)

setup_bloodstone(app)

app.use(router)
app.use(pinia)
app.mount('#app')