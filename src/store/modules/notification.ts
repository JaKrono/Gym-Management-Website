import type { LoginModel, SignupModel } from "@/common/interfaces";
import {Authentication} from "@/repositories/index"
export default{
    namespaced: true,
    state : ()=>({
        hasNotification:false,
        notification:{
            message:'',
            type:'',
            timeout:0
        }
    }),
    mutations : {
        setNotification(state:any){
            state.hasNotification = true;
            setTimeout(()=>{
                state.hasNotification = false;
            },0)
        },
        setNotificationInfo(state:any, notification:Notification){
            state.notification = notification
        }
    },
    actions : {
        showNotification({commit}:any, notification:Notification){
            commit('setNotification')
            commit('setNotificationInfo',notification)
        }
    }
}