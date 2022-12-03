import client from "./client/axios";
export default {

    searchCoachList(coachName: string) {
        const endpoint = `/api/coach/search-coach/${coachName}/`;
        const response = client.get(endpoint);
        return response;
    }
}