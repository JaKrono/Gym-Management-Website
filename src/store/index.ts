import { createStore } from 'vuex'
import userModule from './modules/user'
import notificationModule from './modules/notification'
import globalModule from './modules/global'
import customerModule from './modules/customer'
const store = createStore({
    modules:{
        user:userModule,
        notification:notificationModule,
        global:globalModule,
        customer:customerModule
    }
})

export default store