import { required, email } from 'vuelidate/lib/validators'

export const validations = {
    companyData: {
        company_name: {
            required
        },
        post_address: {
            required
        },
        city: {
            required
        },
        phone: {
            required
        },
        fax: {
            required
        },
        inn: {
            required
        },
        kpp: {
            required
        },
        bank_name: {
            required
        },
        bik: {
            required
        },
        first_name: {
            required
        },
        second_name: {
            required
        },
        legal_company_name: {
            required
        },
        legal_address: {
            required
        },
        finance_mail: {
            required,
            email
        },
        report_mail: {
            required,
            email
        },
        okud: {
            required
        },
        okonh: {
            required
        },
        ogrn: {
            required
        },
        contract_number: {
            required
        },
        сhecking_account: {
            required
        },
        position: {
            required
        },
        correspondent_account: {
            required
        },
        contract_date: {
            required
        },
        currency_id: {
            required
        },
        parent: {
            // required
        }
    },
};
