import type { LoginModel, SignupModel } from "@/common/interfaces";
import client from "./client/axios";
export default{

    login(loginModel:LoginModel){
        const endpoint = '/auth/jwt/create/'
        const response = client.post(endpoint,loginModel)
        return response;
    },

    signup(signupModel:SignupModel){
        const endpoint = '/user/signup/'
        const response = client.post(endpoint,signupModel)
        return response;
    }
}