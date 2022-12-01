import type { InviteCoachModel, CoachProfileModel } from "@/common/interfaces";
import client from "./client/axios";
export default {

    getCoachProfileDetail(id: string) {
        const endpoint = ''; //API url
        const response = client.get(endpoint);
        return response;
    },

    sendInviteMessage(coachInvite: InviteCoachModel) {
        const endpoint = ''; //API url
        const response = client.post(endpoint, coachInvite);
        return response;
    },

    editCoachProfileDetail(coachObject: CoachProfileModel) {
        const endpoint = ''; //API url
        const response = client.post(endpoint, coachObject);
        return response;
    }
}