import type { InviteCoachModel, CoachProfileModel } from "@/common/interfaces";
import client from "./client/axios";
export default {

    getCoachProfileDetail(coachId: string) {
        const endpoint = `/api/coach/get-coach/${coachId}/`;
        const response = client.get(endpoint);
        return response;
    },

    editCoachProfileDetail(coachId: string, coachObject: CoachProfileModel) {
        const endpoint = `/api/coach/update-coach/${coachId}/`;
        const response = client.post(endpoint, coachObject);
        return response;
    },

    sendInviteMessage(coachInvite: InviteCoachModel) {
        const endpoint = '/gym/post-card';
        const response = client.post(endpoint, coachInvite);
        return response;
    }
}