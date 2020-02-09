import { required } from 'vuelidate/lib/validators'

export const validations = {
    currencyParam: {
        name_ru: {
            required
        },
        name_eng: {
            required
        },
        code_numeric_iso_4217: {
            required
        },
        code_literal_iso_4217: {
            required
        },
    }
};

