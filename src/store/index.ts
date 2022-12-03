import { createStore } from 'vuex'
import userModule from './modules/user'
import notificationModule from './modules/notification'
import globalModule from './modules/global'
import VuexPersistence from 'vuex-persist'
const store = createStore({
    modules:{
        user:userModule,
        notification:notificationModule,
        global:globalModule
    },
    plugins:[new VuexPersistence({modules:['user']}).plugin]
})

export default store