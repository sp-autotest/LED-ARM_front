import { required } from 'vuelidate/lib/validators'

export const validations = {
    sendParam: {
        city_id: {
            required
        },
        code_crt: {
            required
        },
        code_iata: {
            required
        },
        name_ru: {
            required
        },
        name_eng: {
            required
        },
    }
};

