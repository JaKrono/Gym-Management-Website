import client from "./client/axios";
export default {

    getPosts() {
        const endpoint = `/post/post-crud/`;
        const response = client.get(endpoint);
        return response;
    },
    sendPost(postObject: any) {
        const endpoint = `/post/post-crud/`;
        const response = client.post(endpoint, postObject);
        return response;
    }
}