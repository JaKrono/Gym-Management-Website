export interface LoginModel{
    username:string,
    password:string
}

export interface SignupModel{
    username:string,
    email:string,
    password:string
}

export interface Notification{
    message:string,
    type:string,
    timout:number
}