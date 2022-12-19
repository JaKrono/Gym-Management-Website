import { Coach } from "@/repositories";
import store from "..";
export default {
    namespaced: true,
    state: () => ({
        coachId: -1,
        clubs: []
    }),
    mutations: {
        setCoachId(state: any, coachId: number) {
            state.coachId = coachId
            console.log(store.state.user.userId, state.coachId)
        },
        setClubs(state, clubs) {
            state.clubs = clubs
        }
    },
    actions: {
        async getCoachId({ commit, dispatch }: any) {
            const response = await Coach.getCoachId(store.state.user.userId)
            if (response.status === 200) {
                commit('setCoachId', response.data.role_id)
                return true
            } else {
                dispatch('notification/showNotification', { message: response?.data.detail || "خطا در گرفتن اطلاعات مربی", type: 'negative', timeout: 2000 }, { root: true })
                return false
            }
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
        }
    },

}
