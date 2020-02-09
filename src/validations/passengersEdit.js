import { required } from 'vuelidate/lib/validators'

export const validations = {
    editParam: {
        passenger: {
            required
        },
        surname: {
            required
        },
        name: {
            required
        },
        date_birth_at: {
            required
        },
        passport_number: {
            required
        },
        sex_u: {
            required
        },
        type_documents: {
            required
        },
        expired: {
            required
        },
        countries: {
            required
        },
        country_id: {
            required
        },
    },
};

