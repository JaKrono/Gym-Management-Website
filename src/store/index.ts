import { createStore, Store } from 'vuex'
import userModule from './modules/user'
import notificationModule from './modules/notification'
import globalModule from './modules/global'
import VuexPersistence from 'vuex-persist'
import customerModule from './modules/customer'
import ownerModule from './modules/owner'
import coachModule from './modules/coach'
import q_aModule from './modules/q_a'

const vuexPersist = new VuexPersistence<any>({
    storage: localStorage,
    modules:['user']
})

const store = createStore<any>({
    modules:{
        user:userModule,
        notification:notificationModule,
        global:globalModule,
        customer:customerModule,
        owner:ownerModule,
        coach:coachModule,
        q_a:q_aModule,
    },
    mutations: {
    },
    plugins:[vuexPersist.plugin]

})

export default store
