import { required } from 'vuelidate/lib/validators'

export const validations = {
    fees: {
       name_ru: {
           required
       },
       name_eng: {
           required
       },
       date_of_start: {
           required
       },
       date_of_stop: {
           required
       }
    }
};

