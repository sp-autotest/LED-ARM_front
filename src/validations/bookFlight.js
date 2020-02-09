import { required } from 'vuelidate/lib/validators'

export const validations = {
    sendData: {
        companyManager: {
            required
        },
        company: {
            required
        },
        phoneNumber: {
            required
        },
        payment: {
            required
        },
    }
};

