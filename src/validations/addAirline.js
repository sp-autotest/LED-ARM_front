import { required } from 'vuelidate/lib/validators'

export const validations = {
    airlineParam: {
        aviacompany_name_ru: {
            required
        },
        short_aviacompany_name_ru: {
            required
        },
        aviacompany_name_eng: {
            required
        },
        short_aviacompany_name_eng: {
            required
        },
        code_tkp: {
            required
        },
        account_code_tkp: {
            required
        },
        code_iata: {
            required
        },
        account_code_iata: {
            required
        },
        city_id: {
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

