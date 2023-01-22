import { createStore } from 'vuex'
import userModule from './modules/user'
import notificationModule from './modules/notification'
import globalModule from './modules/global'
import VuexPersistence from 'vuex-persist'
import customerModule from './modules/customer'
import ownerModule from './modules/owner'
import coachModule from './modules/coach'
import q_aModule from './modules/q_a'
const store = createStore({
    modules:{
        user:userModule,
        notification:notificationModule,
        global:globalModule,
        customer:customerModule,
        owner:ownerModule,
        coach:coachModule,
        q_a:q_aModule,
    },
    plugins:[new VuexPersistence({modules:['user', 'customer', 'coach', 'owner']}).plugin]

})

export default store
