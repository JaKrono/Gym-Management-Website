import type { ChangeArticleDetailModel } from "@/common/interfaces";
import client from "./client/axios";
export default {

    getArticleList() {
        const endpoint = `/article/article/`;
        const response = client.get(endpoint);
        return response;
    },

    editArticle(writerId: string, articleObject: ChangeArticleDetailModel) {
        const endpoint = `/article/article/${writerId}/`;
        const response = client.put(endpoint, articleObject);
        return response;
    },

    addArticle(newArticle: ChangeArticleDetailModel) {
        const endpoint = `/article/article/`;
        const response = client.post(endpoint, newArticle);
        return response;
    }
}