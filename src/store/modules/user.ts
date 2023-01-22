import type { ClassModel, LoginModel, SignupModel, NewClassModel, InviteCoachModel, CoachProfileModel, GymModel } from "@/common/interfaces";
import authentication from "@/repositories/authentication";
import { Authentication, ClassListService, CoachProfileService, Gym, SearchCoachService } from "@/repositories/index"
import { mapActions } from "vuex";
import customer from "./customer";
import coach from "./coach";
import owner from "./owner";

export default {
    namespaced: true,
    state: () => ({
        token: '',
        isSignedIn: false,
        role: -1,
        userId:null,
        gym:{id:null,name:"",adress:"",phone:"",gym_reg_code:"",user:null, picture:null},
        customers:[],
        // user:{
        picUrl:'',
        email:'',
        username:'',
        role_id:-1
        // }
    }),
    mutations: {
        setToken(state: any, token: string) {
            state.token = token;
        },
        setIsSignedIn(state: any, status: boolean) {
            state.isSignedIn = status;
        },
        setUserId(state: any, userId: number) {
            state.userId = userId
        },
        setGym(state: any, gym: any) {
            state.gym = gym
        },
        setRole(state, role: number) {
            state.role = role
        },
        setCustomers(state, customers:Array<any>){
            state.customers = customers
        },
        setUser(state, userModel){
            state.picUrl = userModel.picUrl;
            state.email = userModel.email;
            state.username = userModel.username;
            state.role_id = userModel.role_id;
        }
    },
    actions: {
        async login({ state, commit, dispatch }: any, loginModel: LoginModel) {
            const response = await Authentication.login(loginModel)
            if (response.status === 200) {
                commit('setToken', response.data.access)
                const tokenInfo = parseJwt(response.data.access)
                
                commit('setUserId', tokenInfo.user_id)
                commit('setRole', tokenInfo.role)
                commit('setIsSignedIn', true)

                if (state.role == 2) { // customer
                    dispatch('getUser')
                } else if (state.role == 1) { // coach
                    dispatch('getUser')
                } else if (state.role == 0) { // owner
                    dispatch('owner/getOwnerId', null, {root: true})
                }

                dispatch('notification/showNotification', { message: 'ورود موفق', type: 'positive', timeout: 2000 }, { root: true })
                return Promise.resolve(true);
            } else {
                dispatch('notification/showNotification', { message: response?.data.detail || "خطا در برقراری ازتباط", type: 'negative', timeout: 2000 }, { root: true })
                return Promise.resolve(false);
            }
        },
        async signup({ commit, dispatch }: any, signup: SignupModel) {
            const response = await Authentication.signup(signup)

            if (response.status === 201) {
                commit('setToken', response.data.token)
                return dispatch('login', signup)
                // commit('setIsSignedIn', true)
                // dispatch('notification/showNotification', { message: 'ورود موفق', type: 'positive', timeout: 2000 }, { root: true })
                // return true;
            } else {
                dispatch('notification/showNotification', { message: response?.data.username[0] || "خطا در برقراری ازتباط", type: 'negative', timeout: 2000 }, { root: true })
                return false;
            }
        },

        async getClassList() {
            const response = await ClassListService.getClassList();
            return response.data;
        },

        async editClass(classId: string, classObject: ClassModel) {
            const response = await ClassListService.editClassDetail(classId, classObject);
            return response.data;
        },

        async addClass(classObject: NewClassModel) {
            const response = await ClassListService.addClassItem(classObject);
            return response.data;
        },

        async sendInvite(inviteObject: InviteCoachModel) {
            const response = await CoachProfileService.sendInviteMessage(inviteObject);
            return response.data;
        },

        async getCoachDetail(coachId: string) {
            const response = await CoachProfileService.getCoachProfileDetail(coachId);
            return response.data;
        },

        async editCoachDetail(coachId: string, coachObject: CoachProfileModel) {
            const response = await CoachProfileService.editCoachProfileDetail(coachId, coachObject);
            return response.data;
        },

        async getGymForOwner({ commit }, ownerId: number) {
            const response = await Gym.getGym(ownerId);
            if(response.status == 404){
                return;
            }
            commit('setGym', response.data)
        },

        async updateGym({ commit, dispatch }, gym: GymModel) {
            let response;
            if (gym.id) {
                response = await Gym.updateGym(gym, gym.id);
            }
            else {
                response = await Gym.addGym(gym)
            }
            if(response.status === 200 || response.status === 201){
                commit('setGym',response.data)
                dispatch('notification/showNotification', { message: response?.data.detail || "تغییرات با موفقیت ذخیره شد.", type: 'positive', timeout: 2000 }, { root: true })
                return true
            }
            else {
                dispatch('notification/showNotification', { message: response?.data.detail || "خطا در ذخیره سازی", type: 'negative', timeout: 2000 }, { root: true })
                return false
            }
        },

        async logout({ dispatch }) {
            dispatch('reset')
            // localStorage.setItem('vuex',"")
            // setTimeout(()=>{

            //     window.location.reload();
            // },1000)
        },

        reset({ commit }) {
            commit('setToken', null)
            commit('setIsSignedIn', false)
            commit('setUserId', -1)
            commit('setGym', {})
            commit('setRole', -1)
            commit('setCustomers',[])
            commit('setUser',{})
        },

        async searchCoach({},coachName: string) {
            const response = await SearchCoachService.searchCoachList(coachName);
            return response.data;
        },

        async getCustomers({state, commit, dispatch}){
            const response = await Gym.getCustomers(state.gym.id);
            commit('setCustomers', response.data)
        },

        async removeCustomer({state, commit, dispatch}, customerId:number){
            const response = await Gym.removeCustomer(state.gym.id, customerId);
            if(response.status == 200)
            commit('setCustomers',response.data)
        },

        async getUser({state, commit}, userId:number){
            const response = await authentication.getUser(state.userId);
            if(response.status === 200){
                commit('setUser', response.data)
            }
        }
    },
}
function parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
