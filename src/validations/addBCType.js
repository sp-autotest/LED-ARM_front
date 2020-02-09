import { required } from 'vuelidate/lib/validators'

export const validations = {
    sendParam: {
        aircraft_class_code: {
            required
        },
        name_ru: {
            required
        },
        name_eng: {
            required
        },
        ccp: {
            required
        },
    }
};

