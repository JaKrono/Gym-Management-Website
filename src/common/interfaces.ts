export interface LoginModel {
    username: string,
    password: string
}

export interface SignupModel {
    role: string,
    username: string,
    email: string,
    password: string
}

export interface CoachSignupModel extends SignupModel {
    phoneNumber: string
}

export interface OwnerSignupModel extends SignupModel {
    phoneNumber: string,
    ssn: string
}

export interface Notification {
    message: string,
    type: string,
    timout: number
}

export interface CoachProfileModel {
    id: string,
    fullName: string,
    description: string,
    picUrl: string,
    details: CoachDetailModel[],
    achievements: CoachAchievementModel[]
}

export interface CoachDetailModel {
    title: string,
    value: string
}

export interface CoachAchievementModel {
    title: string,
    dateRange: string
}

export interface InviteCoachModel {
    coachId: string,
    message: string
}

export interface ClassModel {
    Id: string,
    gymId: string,
    name: string,
    coachName: string,
    time: string,
    memberCount: string
}