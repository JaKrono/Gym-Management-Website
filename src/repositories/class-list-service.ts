import type { ClassModel, NewClassModel } from "@/common/interfaces";
import client from "./client/axios";
export default {

    getClassList() {
        const endpoint = '/gym/course/';
        const response = client.get(endpoint);
        return response;
    },

    editClassDetail(classId: string, classObject: ClassModel) {
        console.log(classId);
        const endpoint = `/gym/course/${classId}/`;
        console.log(endpoint);
        const response = client.put(endpoint, classObject);
        return response;
    },

    addClassItem(classObject: NewClassModel) {
        const endpoint = '/gym/get-post-course';
        const response = client.post(endpoint, classObject);
        return response;
    }
}