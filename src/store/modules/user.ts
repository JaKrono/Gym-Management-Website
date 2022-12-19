import type { ClassModel, LoginModel, SignupModel, NewClassModel, InviteCoachModel, CoachProfileModel, GymModel } from "@/common/interfaces";
import { Authentication, ClassListService, CoachProfileService, Gym, SearchCoachService } from "@/repositories/index"

export default {
    namespaced: true,
    state: () => ({
        token: '',
        isSignedIn: false,
        role: -1,
        userId:null,
        gym:{id:null,name:"",adress:"",phone:"",gym_reg_code:"",user:null, picture:null}
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
                dispatch('notification/showNotification', { message: 'ورود موفق', type: 'positive', timeout: 2000 }, { root: true })
                return true;
            } else {
                dispatch('notification/showNotification', { message: response?.data.detail || "خطا در برقراری ازتباط", type: 'negative', timeout: 2000 }, { root: true })
                return false;
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
        },

        reset({ commit }) {
            commit('setToken', null)
            commit('setIsSignedIn', false)
            commit('setUserId', -1)
            commit('setGym', {})
            commit('setRole', -1)
        },

        async searchCoach(coachName: string) {
            const response = await SearchCoachService.searchCoachList(coachName);
            return response.data;
        }
    }
}
function parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}