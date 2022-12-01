import client from "./client/axios";
export default {

    getSearchCoachList(coachName: string) {
        const endpoint = ''; //API url
        const response = client.get(endpoint);
        return response;
    }
}