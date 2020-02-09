import { required } from 'vuelidate/lib/validators'

export const validations = {
    oldersData: {
        $each: {
            older_name: {
                required
            },
            older_surname: {
                required
            },
            // older_patronymic: {
            //     required
            // },
            older_birth_date: {
                required
            },
            older_document: {
                required
            },
            older_document_number: {
                required
            },
            older_Validity: {
                required
            },
            older_Citizenship: {
                required
            }
        }
    },
    childrensData: {
        $each: {
            children_name: {
                required
            },
            children_surname: {
                required
            },
            // children_patronymic: {
            //     required
            // },
            children_birth_date: {
                required
            },
            children_document: {
                required
            },
            children_document_number: {
                required
            },
            children_Validity: {
                required
            },
            children_Citizenship: {
                required
            }
        }
    },
    babysData: {
        $each: {
            baby_name: {
                required
            },
            baby_surname: {
                required
            },
            // baby_patronymic: {
            //     required
            // },
            baby_birth_date: {
                required
            },
            baby_document: {
                required
            },
            baby_document_number: {
                required
            },
            baby_Validity: {
                required
            },
            baby_Citizenship: {
                required
            }
        }
    }
};

