import type { ClassModel, LoginModel, SignupModel, NewClassModel, InviteCoachModel, CoachProfileModel } from "@/common/interfaces";
import { Authentication, classListService, coachProfileService, searchCoachService } from "@/repositories/index";

export default {
    namespaced: true,
    state: () => ({
        token: '',
        isSignedIn: false,
        role: -1
    }),
    mutations: {
        setToken(state: any, token: string) {
            state.token = token;
        },
        setIsSignedIn(state: any, status: boolean) {
            state.isSignedIn = status;
        }
    },
    actions: {
        async login({ commit, dispatch }: any, loginModel: LoginModel) {
            const response = await Authentication.login(loginModel)

            if (response.status === 200) {
                commit('setToken', response.data.token)
                commit('setIsSignedIn', true)
                dispatch('notification/showNotification', { message: 'ورود موفق', type: 'positive', timeout: 2000 }, { root: true })
                return true;
            } else {
                dispatch('notification/showNotification', { message: response?.data.detail || "خطا در برقراری ازتباط", type: 'negative', timeout: 2000 }, { root: true })
                console.log(response.data.detail)
                return false;
            }
        },
        async signup({ commit, dispatch }: any, signup: SignupModel) {
            const response = await Authentication.signup(signup)

            if (response.status === 201) {
                commit('setToken', response.data.token)
                commit('setIsSignedIn', true)
                dispatch('notification/showNotification', { message: 'ورود موفق', type: 'positive', timeout: 2000 }, { root: true })
                return true;
            } else {
                dispatch('notification/showNotification', { message: response?.data.username[0] || "خطا در برقراری ازتباط", type: 'negative', timeout: 2000 }, { root: true })
                console.log(response.data.username[0])
                return false;
            }
        },
        async getClassList() {
            const response = await classListService.getClassList();
            return response.data;
        },
        async editClass(classId: string, classObject: ClassModel) {
            const response = await classListService.editClassDetail(classId, classObject);
            return response.data;
        },
        async addClass(classObject: NewClassModel) {
            const response = await classListService.addClassItem(classObject);
            return response.data;
        },
        async sendInvite(inviteObject: InviteCoachModel) {
            const response = await coachProfileService.sendInviteMessage(inviteObject);
            return response.data;
        },
        async getCoachDetail(coachId: string) {
            const response = await coachProfileService.getCoachProfileDetail(coachId);
            return response.data;
        },
        async editCoachDetail(coachId: string, coachObject: CoachProfileModel) {
            const response = await coachProfileService.editCoachProfileDetail(coachId, coachObject);
            return response.data;
        },
        async searchCoach(coachName: string) {
            const response = await searchCoachService.searchCoachList(coachName);
            return response.data;
        }
    }
}