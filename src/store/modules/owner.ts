import { Coach, Gym } from "@/repositories";
export default{
    namespaced:true,
    state:()=>({
        coaches:[]
    }),
    mutations:{
        setCoaches(state:any, coaches:Array<any>){
            state.coaches = coaches
        }
    },
    actions:{
        async getCoachesData({commit},gymId:number){
            const response = await Gym.getCoaches(gymId)
            if(response.status === 200){
                commit('setCoaches', response.data)
                return true
            }
            else{
                return false
            }
        }
    }
}