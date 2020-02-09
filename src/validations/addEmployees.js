import { required, email, requiredIf } from 'vuelidate/lib/validators'

function validations(id){
    return  {
        employees: {
            company_id: {
                required: requiredIf(function () {
                    if (id) {
                        return true
                    } else {
                        return false
                    }
                })
            },
            role: {
                required
            },
            position: {
                required
            },
            email: {
                required,
                email
            },
            phone: {
                required
            },
            second_name: {
                required
            },
            first_name: {
                required
            },
            sex: {
                required
            },
            additional_email: {
                required
            },
            password: {
                required
            },
        }
    };
}

export {validations};