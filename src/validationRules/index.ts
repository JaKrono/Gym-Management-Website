const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-].{2,63})+$/)
const passwordRegex = new RegExp(/^(?=.*?[a-z]).{8,}$/)
const phoneNumberRegex = new RegExp(/^09[0-9]{9}$/)
const ssnRegex = new RegExp(/^[0-9]{10}$/) // https://academy.rayanita.com/national-code-validation-algorithm/
const readDurationRegex = new RegExp(/^([1-9]|\d\d|[12]\d\d|300)$/)
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
    ssn: (ssn: string) => {
        return ssnRegex.test(ssn) || 'کد ملی وارد شده صحیح نیست.'
    },

    // Rules for article validation
    artileTitle: (content: string) => {
        if (!content) {
            return 'عنوان مقاله نمی تواند خالی باشد.';
        }
        else {
            return true;
        }
    },
    readDuration: (readDuration: string) => {
        if (!readDuration) {
            return 'زمان مطالعه نمی‌تواند خالی باشد.'
        } else {
            return readDurationRegex.test(readDuration) || 'لطفا یک عدد بین ۱ و ۳۰۰ وارد کنید.'
        }
    },
    artileDescription: (content: string) => {
        if (!content) {
            return 'توضیحات مقاله نمی تواند خالی باشد.';
        }
        else {
            return true;
        }
    },
    articleContent: (content: string) => {
        if (!content) {
            return 'متن مقاله نمی‌تواند خالی باشد.'
        } else {
            return true
        }
    }
} 