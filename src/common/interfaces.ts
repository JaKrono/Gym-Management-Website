export interface LoginModel{
    username:string,
    password:string
}

export interface SignupModel{
    role:string,
    username:string,
    email:string,
    password:string
}

export interface CoachSignupModel extends SignupModel {
    phoneNumber:string
}

export interface OwnerSignupModel extends SignupModel {
    phoneNumber:string,
    ssn:string
}

export interface Notification{
    message:string,
    type:string,
    timout:number
}