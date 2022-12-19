import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import rules from './validationRules'
import { Quasar,Notify, type QuasarPluginOptions } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'

import 'quasar/src/css/index.sass'
import 'quasar/src/css/flex-addon.sass'
import './assets/main.scss'
import faIr from 'quasar/lang/fa-IR'
const app = createApp(App)
app.config.globalProperties.rules = rules

app.use(router)
app.use(store as any)
app.use(Quasar,{lang:faIr,plugins:{Notify}} as QuasarPluginOptions)

app.mount('#app')
