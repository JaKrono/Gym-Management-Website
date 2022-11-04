import type { LoginModel, SignupModel } from "@/common/interfaces";
import {Authentication} from "@/repositories/index"
export default{
    namespaced: true,
    state : ()=>({
        token:'',
        isSignedIn:false
    }),
    mutations : {
        setToken(state:any,token:string){
            state.token = token;
        },
        setIsSignedIn(state:any,status:boolean){
            state.isSignedIn = status;
        }
    },
    actions : {
        async login({commit,dispatch}:any,loginModel:LoginModel){
            const response = await Authentication.login(loginModel)

            if(response.status === 400){
                dispatch('notification/showNotification',{message:response.data.non_field_errors, type:'negative', timeout:2000}, {root:true})
            }
            else{
                commit('setToken',response.data.token)
                commit('setIsSignedIn',true)
                dispatch('notification/showNotification',{message:'ورود موفق', type:'positive', timeout:2000}, {root:true})

            }
        },
        async signup({commit, dispatch}:any,signup:SignupModel){
            const response = await Authentication.signup(signup)
            if(response.status === 400){
                dispatch('notification/showNotification',{message:response.data.non_field_errors, type:'negative', timeout:2000}, {root:true})
            }
            else{
                commit('setToken',response.data.token)
                commit('setIsSignedIn',true)
                dispatch('notification/showNotification',{message:'ورود موفق', type:'positive', timeout:2000}, {root:true})

            }
        }
    }
}