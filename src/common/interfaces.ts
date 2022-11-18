export interface LoginModel {
    username: string,
    password: string
}

export interface SignupModel {
    username: string,
    email: string,
    password: string
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