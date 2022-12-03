import type { CustomerProfileModel } from "@/common/interfaces"
import { Customer } from "@/repositories/index"
export default {
   namespaced: true,
   actions: {
      async saveCustomerProfile(customerProfile: CustomerProfileModel) {
         const response = await Customer.editCustomerProfileDetail(customerProfile)
         return response.data
      },

      async getCustomerProfile(customerId: string) {
         const response = await Customer.getCustomerProfileDetail(customerId)
         if (response.status === 200) {
            return response.data
         }
         return response.data
      },

      async getGymByName({ dispatch }: any, gymName: string) {
         const response = await Customer.getGymDetailByName(gymName)
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