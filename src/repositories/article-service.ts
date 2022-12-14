import type { InviteCoachModel, SearchCoachModel } from "@/common/interfaces";
import client from "./client/axios";
export default {

    getArticleList() {
        const endpoint = `/article/article`;
        const response = client.get(endpoint);
        return response;
    },

    editArticle(coachId: string, coachObject: SearchCoachModel) {
        const endpoint = ``; //API Url
        const response = client.put(endpoint, coachObject);
        return response;
    },

    addArticle(coachInvite: InviteCoachModel) {
        const endpoint = ''; //API Url
        const response = client.post(endpoint, coachInvite);
        return response;
    }
}