import { required } from 'vuelidate/lib/validators'

export const validations = {
    sendParam: {
        code_iso: {
            required
        },
        name_ru: {
            required
        },
        name_eng: {
            required
        },
        metropolis: {
            required
        }
    }
};

