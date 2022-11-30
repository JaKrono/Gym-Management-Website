import { createStore } from 'vuex'
import userModule from './modules/user'
import notificationModule from './modules/notification'
import globalModule from './modules/global'
const store = createStore({
    modules:{
        user:userModule,
        notification:notificationModule,
        global:globalModule
    }
})

export default store