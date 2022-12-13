export interface LoginModel {
    username: string,
    password: string
}

export interface SignupModel {
    role: number,
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
    coach: string,
    gym: string,
    describtion: string
}

export interface SidebarItemModel {
    name: string,
    icon: string,
    path: string
}
export interface ClassModel {
    id: string,
    gym: string,
    name: string,
    coachname: string,
    time: string,
    memebercount: string,
    categoryTypes: string
}
export interface NewClassModel {
    gym: string,
    name: string,
    time: string,
    categoryTypes: string
}
export interface GymModel {
    id: number,
    name: string,
    address: string,
    phone: string,
    gym_reg_code: string,
    user: number
}
export interface CustomerProfileModel {
    username: string,
    email: string,
    name: string,
    lastname: string,
    phoneNumber: string,
    sex: string
}

export interface GymModel {
    name: string,
    adress: string,
    phone: string,
    gym_reg_code: string
}

export interface SearchCoachModel {
    user_id: string,
    achievement_set: CoachAchievementModel[],
    description: string,
    detail_set: CoachDetailModel[],
    user: {
        username: string,
        first_name: string,
        last_name: string,
        gender: string,
        personal_id: string,
        picUrl: string
    }
}

export interface ArticleDetailModel {
    id: string,
    title: string,
    description: string,
    articleContent: string,
    readDuration: string,
    picUrl: string,
    writerId: string,
    writerName: string,
    articleCategory: string,
    createDate: Date
}

export interface ChangeArticleDetailModel {
    title: string,
    description: string,
    articleContent: string,
    readDuration: string,
    picUrl: string,
    writerId: string,
    writerName: string,
    articleCategory: string
}

export interface CategoryModel {
    id: number,
    title: string,
    color: string
}