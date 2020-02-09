import { required } from 'vuelidate/lib/validators'

export const validations = {
    providerAccountData: {
        providers_id: {
            required
        },
        login_a: {
            required
        },
        ordering_a: {
            required
        },
        login_b: {
            required
        },
        ordering_p: {
            required
        },
        adding: {
            required
        },
    }
};

