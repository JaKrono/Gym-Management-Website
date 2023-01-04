import client from "./client/axios";
export default {

    getPosts() {
        const endpoint = `/gym-posts/`;
        const response = client.get(endpoint);
        return response;
    },
    sendPost(postObject: any) {
        const endpoint = `coach-posts`;
        const response = client.post(endpoint, postObject);
        return response;
    }
}