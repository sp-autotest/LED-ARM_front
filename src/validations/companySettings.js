import { required } from 'vuelidate/lib/validators'

export const validations = {
    settings: {
        manager_id: {
            required
        },
        agreement: {
            required
        },
        residue_limit: {
            required
        },
        commission_business: {
            required
        },
        commission_first: {
            required
        },
        commission_economy: {
            required
        },
        support_contacts: {
            required
        },
    },
};
