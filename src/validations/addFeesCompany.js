import { required } from 'vuelidate/lib/validators'

export const validations = {
    feesParam: {
        period_begin_at: {
            required
        },
        period_end_at: {
            required
        },
        date_start: {
            required
        },
        date_stop: {
            required
        },
        min_fees_inscribed: {
            // required
        },
        max_fees_inscribed: {
            // required
        },
        size_fees_inscribed: {
            required
        },
        size_fees_charge: {
            required
        },
        min_fees_charge: {
            // required
        },
        max_fees_charge: {
            // required
        },
        size_fees_exchange: {
            required
        },
        min_fees_exchange: {
            // required
        },
        max_fees_exchange: {
            // required
        },
        size_deviation: {
            required
        },
        airlines_id: {
            required
        },
        fare_families_id: {
            required
        },
        type_flight: {
            required
        },
        infant: {
            required
        },
        country_id_departure: {
            required
        },
        country_id_arrival: {
            required
        },
        departure_city: {
            required
        },
        arrival_city: {
            required
        },
        type_fees_inscribed: {
            required
        },
        type_fees_charge: {
            required
        },
        type_fees_exchange: {
            required
        },
        type_deviation: {
            required
        },
        non_return: {
            required
        }
    }
};

