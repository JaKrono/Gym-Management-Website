import client from "./client/axios"
export default {
   getOwnerId(userId: number) {
      const endpoint = `api/get-user/${userId}/`
      const response = client.get(endpoint)
      return response
   },
}