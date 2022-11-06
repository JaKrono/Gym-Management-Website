const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-].{2,63})+$/)
const passwordRegex = new RegExp(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
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
    },
    password: (password:string)=>{
        return passwordRegex.test(password) || 'پسورد باید شامل یک حرف انگلیسی، یک عدد و طول هشت باشد. '
    }
} 