import type { LoginModel, SignupModel } from "@/common/interfaces";
import client from "./client/axios";
export default {

    login(loginModel: LoginModel) {
        const endpoint = '/api/auth/jwt/create/'
        const response = client.post(endpoint, loginModel)
        return response;
    },

    signup(signupModel: SignupModel) {
        const endpoint = '/api/user/signup/'
        const response = client.post(endpoint, signupModel)
        return response;
    }
}