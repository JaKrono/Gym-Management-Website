import { Coach } from "@/repositories";
import store from "..";
export default {
    namespaced: true,
    state: () => ({
        coachId: -1,
        clubs: [],
        coach:{
            user_id: -1,
            description: null,
            detail_set: [],
            achievement_set: [],
            user: {
              username: "",
              gender: null,
              picUrl: null,
              first_name: null,
              last_name: null
        }
    }
    }),
    mutations: {
        setCoachId(state: any, coachId: number) {
            state.coachId = coachId
            console.log(store.state.user.userId, state.coachId)
        },
        setClubs(state, clubs) {
            state.clubs = clubs
        },
        setCoachDetail(state:any, coachModel){
            state.coach = coachModel
      },
    },

    actions:{

         async getCoachId({ state, commit, dispatch }: any) {
            const response = await Coach.getCoachId(store.state.user.userId)
            if (response.status === 200) {
               commit('setCoachId', response.data.role_id)

           } else {
               dispatch('notification/showNotification', { message: response?.data.detail || "خطا در گرفتن اطلاعات مربی", type: 'negative', timeout: 2000 }, { root: true })
           }
            state.coachId = coachId
            console.log(store.state.user.userId, state.coachId)
         },
        async getAcceptedGyms({ commit, dispatch }: any, coachId: number) {
            const response = await Coach.getAcceptedGyms(coachId)
            if (response.status === 200) {
                return response.data
            } else {
                dispatch('notification/showNotification', { message: response?.data.detail || "خطا در برقراری ازتباط", type: 'negative', timeout: 2000 }, { root: true })
                return false;
            }
        },
        async getPendingGyms({ commit, dispatch }: any, coachId: number) {
            const response = await Coach.getPendingGyms(coachId)
            if (response.status === 200) {
                return response.data
            } else {
                dispatch('notification/showNotification', { message: response?.data.detail || "خطا در برقراری ازتباط", type: 'negative', timeout: 2000 }, { root: true })
                return false;
            }
        },
        async getCoachDetail({ commit, dispatch }:any) {
         const response = await Coach.getCoachDetail(store.state.user.user.role_id)
         debugger;
         if (response.status === 200) {
            commit('setCoachDetail', response.data)
            return true
         } else {
            dispatch('notification/showNotification', { message: response?.data.detail || "خطا در گرفتن اطلاعات مربی", type: 'negative', timeout: 2000 }, { root: true })
            return false
         }
      },

      async saveCoach({state, commit, dispatch}:any,coachModel){
         const response = await Coach.saveCoach(store.state.user.user.role_id, coachModel)
         dispatch("user/getUser",null,{root:true})
         if(response.status === 200){
            dispatch('notification/showNotification', { message: response?.data.detail || "اطلاعات با موفقیت ذخیره شد.", type: 'positive', timeout: 2000 }, { root: true })
            return false
         }
      }
    },

}
