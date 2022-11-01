import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'

import 'quasar/src/css/index.sass'
import './assets/main.css'
import faIr from 'quasar/lang/fa-IR'
const app = createApp(App)

app.use(router)
app.use(store as any)
app.use(Quasar,{lang:faIr,plugins:{}})

app.mount('#app')
