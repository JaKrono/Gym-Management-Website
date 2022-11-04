import { createStore } from 'vuex'
import userModule from './modules/user'
import notificationModule from './modules/notification'
const store = createStore({
    modules:{
        user:userModule,
        notification:notificationModule
    }
})

export default store