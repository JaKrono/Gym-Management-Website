import { Coach, Gym, Owner } from "@/repositories";
import store from "..";
export default{
    namespaced:true,
    state:()=>({
        coaches:[],
        ownerId: -1,
    }),
    mutations:{
        setCoaches(state:any, coaches:Array<any>){
            state.coaches = coaches
        },
        setOwnerId(state: any, ownerId: number) {
           state.ownerId = ownerId
           console.log(store.state.user.userId, state.ownerId)
        }
    },
    actions:{
        async getOwnerId({ commit, dispatch }:any) {
            const response = await Owner.getOwnerId(store.state.user.userId)
            if (response.status === 200) {
               commit('setOwnerId', response.data.role_id)
               return true
            } else {
               dispatch('notification/showNotification', { message: response?.data.detail || "خطا در گرفتن اطلاعات مالک", type: 'negative', timeout: 2000 }, { root: true })
               return false
            }
         },
        async getCoachesData({commit},gymId:number){
            const response = await Gym.getCoaches(gymId)
            if(response.status === 200){
                const list = []
                response.data.forEach(item => {
                    let model = {id:item.user_id,user:{id:item.user_id,picUrl:item.picUrl, first_name:item.name, last_name:''}};
                    list.push(model)
                });
                commit('setCoaches', list)
                return true
            }
            else{
                return false
            }
        }
    }
}