import { Coach } from "@/repositories";
import gym from "@/repositories/gym";
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
        setClubs(state: any, clubs: any) {
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
                return true
            } else {
                dispatch('notification/showNotification', { message: response?.data.detail || "خطا در گرفتن اطلاعات مربی", type: 'negative', timeout: 2000 }, { root: true })
                return false
            }
        },
        async getGymInformation({ dispatch }: any, gymId: number) {
            const response = await Coach.getGymInformation(gymId)
            if (response.status === 200) {
                return response.data
            } else {
                dispatch('notification/showNotification', { message: response?.data.detail || "خطا در گرفتن اطلاعات باشگاه", type: 'negative', timeout: 2000 }, { root: true })
                return false
            }
        },
        async getGymCardInformation({ dispatch }: any, obj: { coachId: number, gymId: number }) {
            const response = await Coach.getGymCardInformation(obj.coachId, obj.gymId)
            if (response.status === 200) {
                return response.data
            } else {
                dispatch('notification/showNotification', { message: response?.data.detail || "خطا در گرفتن اطلاعات کارت مربی و باشگاه", type: 'negative', timeout: 2000 }, { root: true })
                return false;
            }
        },
        async updateGymCardInformation({ dispatch }: any, obj: {}) {
            const response = await Coach.updateGymCardInformation(obj.id, obj)
            if (response.status === 200) {
                dispatch('notification/showNotification', { message: response?.data.detail || "تغییرات با موفقت ذخیره شد.", type: 'positive', timeout: 2000 }, { root: true })
                return true
            } else {
                dispatch('notification/showNotification', { message: response?.data.detail || "خطا در گرفتن اطلاعات کارت مربی و باشگاه", type: 'negative', timeout: 2000 }, { root: true })
                return false;
            }
        },
        async getAcceptedGyms({ state, dispatch }: any) {
            const response = await Coach.getAcceptedGyms(state.coachId)
            if (response.status === 200) {
                return response.data
            } else {
                dispatch('notification/showNotification', { message: response?.data.detail || "خطا در برقراری ازتباط", type: 'negative', timeout: 2000 }, { root: true })
                return false;
            }
        },
        async getPendingGyms({ state, dispatch }: any) {
            const response = await Coach.getPendingGyms(state.coachId)
            if (response.status === 200) {
                return response.data
            } else {
                dispatch('notification/showNotification', { message: response?.data.detail || "خطا در برقراری ازتباط", type: 'negative', timeout: 2000 }, { root: true })
                return false;
            }
        }
    },

}
