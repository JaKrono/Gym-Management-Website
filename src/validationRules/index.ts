const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
export default {
    required : (content:string)=>{
        if(!content){
            return 'این فیلد نمی تواند خالی باشد.';
        }
        else{
            return true;
        }
    },
    email: (email:string) => {
       return emailRegex.test(email) || 'ایمیل وارد شده صحیح نیست.'
    }
} 