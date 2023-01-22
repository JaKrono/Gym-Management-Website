import type { NewAnswerModel, NewQuestionModel } from "@/common/interfaces"
import { Q_A } from "@/repositories/index"
export default {
   namespaced: true,
   actions: {
      async submitQuestion({ dispatch }: any, question: NewQuestionModel) {
         const response = await Q_A.postQuestion(question)
         if (response && response.status === 201) {
            dispatch('notification/showNotification', { message: response?.data.detail || "پرسش با موفقیت ایجاد شد", type: 'positive', timeout: 2000 }, { root: true })
            return response.data
         } else {
            dispatch('notification/showNotification', { message: response?.data.detail || "خطا در ایجاد پرسش", type: 'negative', timeout: 2000 }, { root: true })
            return false
         }
      },

      async submitAnswer({ dispatch }: any, answer: NewAnswerModel) {
         const response = await Q_A.postAnswer(answer)
         if (response && response.status === 201) {
            dispatch('notification/showNotification', { message: response?.data.detail || 'پاسخ با موفقیت ایجاد شد', type: 'positive', timeout: 2000 }, { root: true })
            return true
         } else {
            dispatch('notification/showNotification', { message: response?.data.detail || 'خطا در ایجاد پاسخ', type: 'negative', timeout: 2000 }, { root: true })
            return false
         }
      },

      async getSingleQuestionDetail({ dispatch }: any, ids: { userId: String, questionId: String }) {
         const response = await Q_A.getSingleQuestionDetail(ids)
         if (response && response.status === 200) {
            return response.data
         } else {
            dispatch('notification/showNotification', { message: response?.data.detail || 'خطا در گرفتن اطلاعات سوال', type: 'negative' ,timeout: 2000}, { root: true })
            return false
         }
      },

      async getWriterDetail({ dispatch }: any, userId: string) {
         const response = await Q_A.getWriterDetail(userId)
         if (response && response.status === 200) {
            return response.data
         } else {
            dispatch('notification/showNotification', { message: response?.data.detail || 'خطا در گرفتن اطلاعات نویسنده', type: 'negative' ,timeout: 2000}, { root: true })
            return false
         }
      },

      async updateQuestionScore({ dispatch }: any, obj: { score: number, userId: number, questionId: number }) {
         const response = await Q_A.postQuestionScore(obj)
         if (response && (response.status === 200 || response.status === 201)) {
            return response.data
         } else {
            dispatch('notification/showNotification', { message: response?.data.detail || 'خطا در ایجاد نظر برای پرسش', type: 'negative' ,timeout: 2000}, { root: true })
            return false
         }
      },

      async updateAnswerScore({ dispatch }: any, obj: { score: number, userId: number, answerId: number }) {
         const response = await Q_A.postAnswerScore(obj)
         if (response && (response.status === 200 || response.status === 201)) {
            return response.data
         } else {
            dispatch('notification/showNotification', { message: response?.data.detail || 'خطا در ایجاد نظر برای جواب', type: 'negative' ,timeout: 2000}, { root: true })
            return false
         }
      }

      // async getCustomerId({ commit, dispatch }:any) {
      //    const response = await Customer.getCustomerId(store.state.user.userId) // TODO_asghar: How do I access user.state.userId from here? So I don't have to manually pass the userId?
      //    if (response.status === 200) {
      //       commit('setCustomerId', response.data.role_id)
      //       return true
      //    } else {
      //       dispatch('notification/showNotification', { message: response?.data.detail || "خطا در گرفتن اطلاعات مشتری", type: 'negative', timeout: 2000 }, { root: true })
      //       return false
      //    }
      // },

      // async updateCustomerProfile({ dispatch }: any, customerProfileUpdate: UpdateCustomerProfileModel) {
      //    const response = await Customer.editCustomerProfileDetail(customerProfileUpdate.user_id, customerProfileUpdate.customerProfileModel)
      //    if (response.status === 200 || response.status === 201) {
      //       dispatch('notification/showNotification', { message: response?.data.detail || "تغییرات با موفقیت ذخیره شد.", type: 'positive', timeout: 2000 }, { root: true })
      //       return true
      //    } else {
      //       dispatch('notification/showNotification', { message: response?.data.detail || "خطا در ذخیره سازی", type: 'negative', timeout: 2000 }, { root: true })
      //       return false
      //    }
      // },

      // async getCustomerProfile({ dispatch }: any, userId: string) {
      //    const response = await Customer.getCustomerProfileDetail(userId)
      //    if (response.status === 200) {
      //       return response.data
      //    } else {
      //       dispatch('notification/showNotification', { message: response?.data.detail || "خطا در برقراری ازتباط", type: 'negative', timeout: 2000 }, { root: true })
      //       console.log(response.data.detail)
      //       return false;
      //    }
      // },

      // async getGymByName({ commit, dispatch }: any, gymName: string) {
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