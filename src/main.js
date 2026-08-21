import { createApp } from "vue";
import App from "./App.vue";
import router from './router/index.js'
import 'onyks-web-ui'

const app = createApp(App)

app.use(router)
app.mount('#app')