import type { CustomerProfileModel, UpdateCustomerProfileModel } from "@/common/interfaces"
import { Customer } from "@/repositories/index"
import store from ".."
export default {
   namespaced: true,
   state: () => ({
      clubs: [],
   }),
   mutations: {
      setClubs(state: any, clubs: any) {
         state.clubs = clubs
      },
   },
   actions: {

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

      async searchGym({ dispatch }: any, query: { name: string, address: string, category: string }) {
         const response = await Customer.searchGym(query)
         if (response.status === 200) {
            return response.data
         } else {
            dispatch('notification/showNotification', { message: response?.data.detail || "خطا در جستجو باشگاه‌", type: 'negative', timeout: 2000 }, { root: true })
            console.log(response.data.detail)
            return false;
         }
      },

      async getGymsOfCustomer({ dispatch }: any, userId: string) {
         const response = await Customer.getGymsOfCustomer(userId)
         if (response && response.status === 200) {
            return response.data
         } else {
            dispatch('notification/showNotification', { message: response?.data.detail || "خطا در گرفتن باشگاه‌های ثبت‌نام شده", type: 'negative', timeout: 2000 }, { root: true })
            return false
         }
      }

   }
}