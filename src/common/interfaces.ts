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
    CourseCategory:string,
    coachname:string
}
export interface GymModel {
    id: number,
    name: string,
    adress: string,
    phone: string,
    gym_reg_code: string,
    user: number,
    picture: string
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
    rank_number: number,
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
    isValid: boolean,
    articleDescription: string
}

export interface CategoryModel {
    id: number,
    title: string,
    color: string
}

export interface GymCustomer {
    customer_id: number,
    username: string,
    email: string
}

export interface PostModel {
    id: string,
    title: string,
    content: string,
    picUrl: string,
    likedUserIds: string[],
    comments: PostCommentModel[],
    date: string,
    coachName: string,
    coachId: string,
    postCategoriesId: string
}

export interface NewPostModel {
    title: string,
    content: string,
    picUrl: string,
    coachId: string,
    postCategoriesId: string
}

export interface PostCommentModel {
    postId: string,
    comment: string,
    writerName: string
}

export interface PostLikeModel {
    postId: string,
    userId: string,
    isLiked: boolean
}

export interface QuestionModel {
    questionId: string,
    title: string,
    content: string,
    date: string,
    category: string,
    writerId: string,
    acceptedAnswerId: string,
    score: number,
    userScore: number,
}

export interface NewQuestionModel {
    title: string,
    content: string,
    category: string,
    writerId: string,
}

export interface AnswerModel {
    answerId: string,
    questionId: string,
    content: string,
    date: string,
    writerId: string,
    score: number,
    userScore: number,
}

export interface NewAnswerModel {
    content: string,
    writerId: string,
    questionId: string,
}

export interface AcceptAnswerModel {
    answerId: number,
    questionId: number,
    // status: string, 'ACCEPT', 'REMOVE'
}

export interface QuestionScoreModel {
    questionId: string,
    userId: string,
    score: number
}

export interface AnswerScoreModel {
    answerId: string,
    userId: string,
    score: number,
}