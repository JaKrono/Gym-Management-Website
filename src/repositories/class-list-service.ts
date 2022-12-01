import type { ClassModel } from "@/common/interfaces";
import client from "./client/axios";
export default {

    getClassList() {
        const endpoint = ''; //API url
        const response = client.get(endpoint);
        return response;
    },

    editClassDetail(classObject: ClassModel) {
        const endpoint = ''; //API url
        const response = client.post(endpoint, classObject);
        return response;
    },

    addClassItem(classObject: ClassModel) {
        const endpoint = ''; //API url
        const response = client.post(endpoint, classObject);
        return response;
    }
}