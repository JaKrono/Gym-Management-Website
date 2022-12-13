import type { GymModel } from "@/common/interfaces";
import client from "./client/axios";
export default{
    getCoaches(gymId:number){
        const endpoint = `gym/coaches/${gymId}`
        const response = client.get(endpoint)
        return response
    }
}