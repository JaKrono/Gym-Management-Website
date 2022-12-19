import type { CustomerProfileModel, UpdateCustomerProfileModel } from "@/common/interfaces"
import { Customer } from "@/repositories/index"
import store from ".."
export default {
   namespaced: true,
   state: () => ({
      customerId: -1,
      clubs: [],
   }),
   mutations: {
      setClubs(state, clubs) {
         state.clubs = clubs
      },
      setCustomerId(state: any, customerId: number) {
         state.customerId = customerId
         console.log(store.state.user.userId, state.customerId)
      }
   },
   actions: {
      async getCustomerId({ commit, dispatch }:any) {
         const response = await Customer.getCustomerId(store.state.user.userId) // TODO_asghar: How do I access user.state.userId from here? So I don't have to manually pass the userId?
         if (response.status === 200) {
            commit('setCustomerId', response.data.role_id)
            return true
         } else {
            dispatch('notification/showNotification', { message: response?.data.detail || "خطا در گرفتن اطلاعات مشتری", type: 'negative', timeout: 2000 }, { root: true })
            return false
         }
      },

      async updateCustomerProfile({ dispatch }: any, customerProfileUpdate: UpdateCustomerProfileModel) {
         const response = await Customer.editCustomerProfileDetail(customerProfileUpdate.user_id, customerProfileUpdate.customerProfileModel)
         if (response.status === 200 || response.status === 201) {
            dispatch('notification/showNotification', { message: response?.data.detail || "تغییرات با موفقیت ذخیره شد.", type: 'positive', timeout: 2000 }, { root: true })
            return true
         } else {
            dispatch('notification/showNotification', { message: response?.data.detail || "خطا در ذخیره سازی", type: 'negative', timeout: 2000 }, { root: true })
            return false
         }
      },

      async getCustomerProfile({ dispatch }: any, userId: string) {
         const response = await Customer.getCustomerProfileDetail(userId)
         if (response.status === 200) {
            return response.data
         } else {
            dispatch('notification/showNotification', { message: response?.data.detail || "خطا در برقراری ازتباط", type: 'negative', timeout: 2000 }, { root: true })
            console.log(response.data.detail)
            return false;
         }
      },

      async getGymByName({ commit, dispatch }: any, gymName: string) {
         const response = await Customer.getGymDetailByName(gymName)
         // commit('setClubs',response.data)
         response.data
         return response.data
         // if (response.status === 200) {
         //    return response.data
         // } else {
         //    dispatch('notification/showNotification', { message: response?.data.detail || "خطا در برقراری ازتباط", type: 'negative', timeout: 2000 }, { root: true })
         //    console.log(response.data.detail)
         //    return false;
         // }
      }

   }
}