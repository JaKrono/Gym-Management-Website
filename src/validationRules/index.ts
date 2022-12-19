const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-].{2,63})+$/)
const passwordRegex = new RegExp(/^(?=.*?[a-z]).{8,}$/)
const phoneNumberRegex = new RegExp(/^09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}$/)
const ssnRegex = new RegExp(/^[0-9]{10}$/) // https://academy.rayanita.com/national-code-validation-algorithm/
const nameRegex = new RegExp(/^[\u0622\u0627\u0628\u067E\u062A-\u062C\u0686\u062D-\u0632\u0698\u0633-\u063A\u0641\u0642\u06A9\u06AF\u0644-\u0648\u06CC\s]{0,100}$/)
const readDurationRegex = new RegExp(/^([1-9]|\d\d|[12]\d\d|300)$/);

export default {
    required: (content: string) => {
        if (!content) {
            return 'این فیلد نمی تواند خالی باشد.';
        }
        else {
            return true;
        }
    },
    email: (email: string) => {
        return emailRegex.test(email) || 'ایمیل وارد شده صحیح نیست.'
    },
    password: (password: string) => {
        return passwordRegex.test(password) || 'پسورد باید شامل یک حرف انگلیسی و هشت کاراکتر باشد.'
    },
    phoneNumber: (phoneNumber: string) => {
        return phoneNumberRegex.test(phoneNumber) || 'شماره تلفن وارد شده صحیح نیست.'
    },
    emptyPhoneNumber: (content: string) => {
        if (content?.length === 0) {
            return true
        } else {
            return phoneNumberRegex.test(content) || 'شماره تلفن وارد شده صحیح نیست.'
        }
    },
    ssn: (ssn: string) => {
        return ssnRegex.test(ssn) || 'کد ملی وارد شده صحیح نیست.'
    },
    // Profile
    name: (content: string) => {
        // if (content.length > 100) {
        // return 'نام وارد شده بیشتر از ۱۰۰ حرف است.'
        // } else {
        if (nameRegex.test(content)) {
            return true
        } else {
            return 'نام وارد شده معتبر نیست.'
        }
        // }
    }
} 