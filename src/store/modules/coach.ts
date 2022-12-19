import type { CustomerProfileModel } from "@/common/interfaces"
import { Customer, Coach } from "@/repositories/index"
export default {
   namespaced: true,
   state: () => ({
      // clubs:[]
   }),
   mutations: {
      // setClubs(state, clubs){
      //    state.clubs=clubs
      // }
   },
   actions: {
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
      // async saveCustomerProfile(customerProfile: CustomerProfileModel) {
      //    const response = await Customer.editCustomerProfileDetail(customerProfile)
      //    return response.data
      // },

      // async getCustomerProfile(customerId: string) {
      //    const response = await Customer.getCustomerProfileDetail(customerId)
      //    if (response.status === 200) {
      //       return response.data
      //    }
      //    return response.data
      // },

      // async getGymByName({ commit,dispatch }: any, gymName: string) {
      //    const response = await Customer.getGymDetailByName(gymName)
      //    // commit('setClubs',response.data)
      //    response.data
      //    return response.data
      //    // if (response.status === 200) {
      //    //    return response.data
      //    // } else {
      //    //    dispatch('notification/showNotification', { message: response?.data.detail || "خطا در برقراری ازتباط", type: 'negative', timeout: 2000 }, { root: true })
      //    //    console.log(response.data.detail)
      //    //    return false;
      //    // }
      // }

   }
}