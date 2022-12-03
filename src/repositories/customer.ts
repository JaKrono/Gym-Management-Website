import type { CustomerProfileModel } from "@/common/interfaces"
import client from "./client/axios"
export default {
   editCustomerProfileDetail(customerProfile: CustomerProfileModel) {
      const endpoint = ''
      const response = client.put(endpoint, customerProfile)
      return response
   },

   getCustomerProfileDetail(customerId: string) {
      const endpoint = ''
      const response = client.get(endpoint)
      return response
   },

   getGymDetailByName(gymName: string) {
      const endpoint = '/api/gym/search-gym-name?name='.concat(gymName)
      const response = client.get(endpoint)
      return response
   }
}