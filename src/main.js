import { createApp } from "vue";
import App from "./App.vue";
import 'onyks-web-ui-system'
import router from './router/index.js'

const app = createApp(App)

app.use(router)

app.mount('#app')