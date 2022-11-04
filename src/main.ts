import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import rules from './validationRules'
import { Quasar,Notify } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'

import 'quasar/src/css/index.sass'
import './assets/main.scss'
import faIr from 'quasar/lang/fa-IR'
const app = createApp(App)
app.config.globalProperties.rules = rules

app.use(router)
app.use(store as any)
app.use(Quasar,{lang:faIr,plugins:{Notify}})

app.mount('#app')
