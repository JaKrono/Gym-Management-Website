export interface LoginModel {
    username: string,
    password: string
}

export interface SignupModel {
    role: number,
    username: string,
    email: string,
    personal_id: string,
    password: string
}

export interface CoachSignupModel extends SignupModel {
    phoneNumber: string
}

export interface OwnerSignupModel extends SignupModel {
    phoneNumber: string,
    personal_id: string
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
    adress: string,
    phone: string,
    gym_reg_code: string,
    user: number,
    picture:string
}
export interface CustomerProfileModel {
    phone: string,
    description: string,
    user: {
        username: string,
        email: string,
        presonal_id: string,
        gender: string,
        picUrl: string,
        first_name: string,
        last_name: string
    }
}
export interface UpdateCustomerProfileModel {
    user_id: string,
    customerProfileModel: CustomerProfileModel
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
    createDate: string,
    isValid: boolean
}

export interface ChangeArticleDetailModel {
    title: string,
    description: string,
    articleContent: string,
    readDuration: string,
    picUrl: string,
    writerId: string,
    writerName: string,
    articleCategory: string,
    isValid: boolean
}

export interface CategoryModel {
    id: number,
    title: string,
    color: string
}

export interface GymCustomer{
    customer_id:number,
    username:string,
    email:string
}