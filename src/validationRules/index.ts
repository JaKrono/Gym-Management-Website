const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-].{2,63})+$/)
const passwordRegex = new RegExp(/^(?=.*?[a-z]).{8,}$/)
const phoneNumberRegex = new RegExp(/^09[0-9]{9}$/)
const ssnRegex = new RegExp(/^[0-9]{10}$/) // https://academy.rayanita.com/national-code-validation-algorithm/
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
    password: (password:string) => {
        return passwordRegex.test(password) || 'پسورد باید شامل یک حرف انگلیسی و هشت کاراکتر باشد.'
    },
    phoneNumber: (phoneNumber:string) => {
        return phoneNumberRegex.test(phoneNumber) || 'شماره تلفن وارد شده صحیح نیست.'
    },
    ssn: (ssn:string) => {
        return ssnRegex.test(ssn) || 'کد ملی وارد شده صحیح نیست.'
    },
} 