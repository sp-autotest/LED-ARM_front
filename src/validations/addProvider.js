import { required } from 'vuelidate/lib/validators'

export const validations = {
    providerParam: {
        name_ru: {
            required
        },
        name_eng: {
            required
        },
        name_full_ru: {
            required
        },
        name_full_eng: {
            required
        },
        date_begin_at: {
            required
        },
        date_end_at: {
            required
        },
    }
};

