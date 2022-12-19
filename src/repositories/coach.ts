import type { GymModel } from "@/common/interfaces";
import client from "./client/axios";
export default{
    getCoaches(gymId:number){
        const endpoint = `gym/coaches/${gymId}`
        const response = client.get(endpoint)
        return response
    },
    getAcceptedGyms(coachId: number) {
        const endpoint = `/gym/accepted-gyms-of-coach/${coachId}/`
        const response = client.get(endpoint)
        return response
    },
    getPendingGyms(coachId: number) {
        const endpoint = `/gym/pending-gyms-of-coach/${coachId}/`
        const response = client.get(endpoint)
        return response
    },

}