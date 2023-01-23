import type { GymModel } from "@/common/interfaces";
import client from "./client/axios";
export default{
    getGym(ownerId:number){
        const endpoint = `gym/owner/${ownerId}`
        const response = client.get(endpoint)
        return response
    },

    addGym(gym:GymModel){
        const endpoint = `gym/gym/`
        const response = client.post(endpoint,gym)
        return response
    },

    updateGym(gym:GymModel, id:number){
        const endpoint = `gym/get-update-delete-gym/${id}`
        const response = client.put(endpoint,gym)
        return response
    },

    getCoaches(gymId:number){
        const endpoint = `gym/coaches-of-gym/${gymId}`
        const response = client.get(endpoint)
        return response
    },

    getCustomers(gymId:number){
        const endpoint = `gym/customers/${gymId}`
        const response = client.get(endpoint)
        return response
    },

    removeCustomer(gymId:number, customerId:number){
        const endpoint = `gym/${gymId}/customer/${customerId}`
        const response = client.delete(endpoint)
        return response
    }
}