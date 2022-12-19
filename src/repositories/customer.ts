import type { CustomerProfileModel } from "@/common/interfaces"
import client from "./client/axios"
export default {
   getCustomerId(userId: number) {
      const endpoint = `api/get-user/${userId}/`
      const response = client.get(endpoint)
      return response
   },

   editCustomerProfileDetail(userId: string, customerProfile: CustomerProfileModel) {
      const endpoint = '/api/customer/update-customer/'.concat(userId, '/')
      const response = client.put(endpoint, customerProfile)
      return response
   },

   getCustomerProfileDetail(userId: string) {
      const endpoint = '/api/customer/get-customer/'.concat(userId, '/')
      const response = client.get(endpoint)
      return response
   },

   getGymDetailByName(gymName: string) {
      const endpoint = '/api/gym/search-gym-name?name='.concat(gymName)
      const response = client.get(endpoint)
      return response
   }
}