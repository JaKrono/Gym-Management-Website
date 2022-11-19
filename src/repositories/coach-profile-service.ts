import type { InviteCoachModel } from "@/common/interfaces";
import client from "./client/axios";
export default {

    getProfileDetail(id: string) {
        const endpoint = ''; //API url
        const response = client.post(endpoint, id)
        return response;
    },

    sendInviteMessage(coachInvite: InviteCoachModel) {
        const endpoint = ''; //API url
        const response = client.post(endpoint, coachInvite)
        return response;
    }
}