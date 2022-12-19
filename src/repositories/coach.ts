import client from "./client/axios"
export default {
    getCoachId(userId: number) {
        const endpoint = `api/get-user/${userId}/`
        const response = client.get(endpoint)
        return response
    },
    getCoaches(gymId: number) {
        const endpoint = `gym/coaches/${gymId}`
        const response = client.get(endpoint)
        return response
    },
    getAcceptedGyms(coachId: number) {
        const endpoint = `/gym/accepted-gyms-of-coach/${coachId}`
        const response = client.get(endpoint)
        return response
    },
    getPendingGyms(coachId: number) {
        const endpoint = `/gym/pending-gyms-of-coach/${coachId}`
        const response = client.get(endpoint)
        return response
    },
    getGymInformation(gymId: number) {
        const endpoint = `/gym/gym/${gymId}/`
        const response = client.get(endpoint)
        return response
    },
    getGymCardInformation(coachId: number, gymId: number) {
        const endpoint = `/gym/get-card/coach=${coachId}&gym=${gymId}`
        const response = client.get(endpoint)
        return response
    },
    updateGymCardInformation(cardId: number, obj: {}) {
        const endpoint = `/gym/coach-card/${cardId}/`
        const response = client.put(endpoint, obj)
        return response
    }


   getCoachDetail(coachId:number){
      const endpoint = `api/coach/get-coach/${coachId}/`
      const response = client.get(endpoint)
      return response
   },

   saveCoach(coachId:number,coachModel){
      const endpoint = `api/coach/update-coach/${coachId}/`
      const response = client.put(endpoint, coachModel)
      return response
   }
}