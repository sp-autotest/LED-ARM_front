import { required } from 'vuelidate/lib/validators'

export const validations = {
    sendParam: {
        code: {
            required
        },
        name_ru: {
            required
        },
        name_eng: {
            required
        },
        fare_families_group: {
            required
        },
        luggage_adults: {
            required
        },
        luggage_children: {
            required
        },
        luggage_infants: {
            required
        },
        max_stay: {
            required
        },
        note_fare: {
            required
        },
    }
};

