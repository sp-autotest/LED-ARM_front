import { required } from 'vuelidate/lib/validators'

export const validations = {
    sendParam: {
        name: {
            required
        },
        surname: {
            required
        },
        date_birth_at: {
            required
        },
        country_id: {
            required
        },
        type_documents: {
            required
        },
        passport_number: {
            required
        },
        expired: {
            required
        },
    }
};

