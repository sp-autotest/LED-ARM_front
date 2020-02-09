<template>
    <div :class="['addCompany-content',{'company-edit':$route.params.id}]">
        <div class="company-header" v-if="!$route.params.id">
            <p class="headline-text">Добавление компании</p>
        </div>
        <div v-else class="company-header">
            <p class="headline-text">Профиль компании {{companyData.company_name}}</p>
        </div>
        <div class="add-company-form">
            <div  class="paragraph-wrap">
                <div class="paragraph">
                    <span class="standard-text">Компания-родитель</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.companyData.parent.$error }"
                            v-model.trim="$v.companyData.parent.$model"
                            itemText="name"
                            itemValue="id"
                            :selectItems="parentCompany"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.companyData.parent.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text mb-1">Название компании</span>
                    <cInput
                            :class="{ 'form-group--error': $v.companyData.company_name.$error }"
                            v-model.trim="$v.companyData.company_name.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.companyData.company_name.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text mb-1">Адрес</span>
                    <cInput
                            :class="{ 'form-group--error': $v.companyData.post_address.$error }"
                            v-model.trim="$v.companyData.post_address.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.companyData.post_address.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text mb-1">Город нахождения</span>
                    <cInput
                            :class="{ 'form-group--error': $v.companyData.city.$error }"
                            v-model.trim="$v.companyData.city.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.companyData.city.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text mb-1">Телефон</span>
                    <cInput
                            :class="{ 'form-group--error': $v.companyData.phone.$error }"
                            v-model.trim="$v.companyData.phone.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.companyData.phone.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text mb-1">Факс</span>
                    <cInput
                            :class="{ 'form-group--error': $v.companyData.fax.$error }"
                            v-model.trim="$v.companyData.fax.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.companyData.fax.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text mb-1">ИНН</span>
                    <cInput
                            :class="{ 'form-group--error': $v.companyData.inn.$error }"
                            v-model.trim="$v.companyData.inn.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.companyData.inn.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text mb-1">КПП</span>
                    <cInput
                            :class="{ 'form-group--error': $v.companyData.kpp.$error }"
                            v-model.trim="$v.companyData.kpp.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.companyData.kpp.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text mb-1">Название банка</span>
                    <cInput
                            :class="{ 'form-group--error': $v.companyData.bank_name.$error }"
                            v-model.trim="$v.companyData.bank_name.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.companyData.bank_name.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text mb-1">БИК</span>
                    <cInput
                            :class="{ 'form-group--error': $v.companyData.bik.$error }"
                            v-model.trim="$v.companyData.bik.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.companyData.bik.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text mb-1">ФИО руководителя</span>
                    <cInput
                            :class="{ 'form-group--error': $v.companyData.second_name.$error }"
                            v-model.trim="headFullName"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.companyData.first_name.$error">Заполните поле</div>
                    <div class="error-text" v-else-if="$v.companyData.second_name.$error">Укажите Фамилию</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text mb-1">Валюта компании</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.companyData.currency_id.$error }"
                            v-model.trim="$v.companyData.currency_id.$model"
                            :itemText="'code_literal_iso_4217'"
                            :itemValue="'id'"
                            :selectItems="currency"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.companyData.currency_id.$error">Заполните поле</div>
                </div>
            </div>
            <div  class="paragraph-wrap">
                <div class="paragraph">
                    <span class="standard-text">Нерезидент РФ</span>
                    <cSelect
                            v-model="companyData.resident"
                            @selected="companyData.resident = $event"
                            class="mt-2"
                    ></cSelect>
                </div>
                <div class="paragraph">
                    <span class="standard-text mb-1">Юридическое название компании</span>
                    <cInput
                            :class="{ 'form-group--error': $v.companyData.legal_company_name.$error }"
                            v-model.trim="$v.companyData.legal_company_name.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.companyData.legal_company_name.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text mb-1">Юридический адрес</span>
                    <cInput
                            :class="{ 'form-group--error': $v.companyData.legal_address.$error }"
                            v-model.trim="$v.companyData.legal_address.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.companyData.legal_address.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text mb-1">E-mail для фин. уведомления</span>
                    <cInput
                            :class="{ 'form-group--error': $v.companyData.finance_mail.$error }"
                            v-model.trim="$v.companyData.finance_mail.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="!$v.companyData.finance_mail.required && $v.companyData.finance_mail.$error">Заполните поле</div>
                    <div class="error-text" v-else-if="!$v.companyData.finance_mail.email">Е:маил не корректный</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text mb-1">E-mail для отчетов</span>
                    <cInput
                            :class="{ 'form-group--error': $v.companyData.report_mail.$error }"
                            v-model.trim="$v.companyData.report_mail.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="!$v.companyData.report_mail.required && $v.companyData.report_mail.$error">Заполните поле</div>
                    <div class="error-text" v-else-if="!$v.companyData.report_mail.email">Е:маил не корректный</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text mb-1">ОКУД</span>
                    <cInput
                            :class="{ 'form-group--error': $v.companyData.okud.$error }"
                            v-model.trim="$v.companyData.okud.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.companyData.okud.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text mb-1">ОКОНХ</span>
                    <cInput
                            :class="{ 'form-group--error': $v.companyData.okonh.$error }"
                            v-model.trim="$v.companyData.okonh.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.companyData.okonh.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text mb-1">ОГРН</span>
                    <cInput
                            :class="{ 'form-group--error': $v.companyData.ogrn.$error }"
                            v-model.trim="$v.companyData.ogrn.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.companyData.ogrn.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text mb-1">Номер счета</span>
                    <cInput
                            :class="{ 'form-group--error': $v.companyData.сhecking_account.$error }"
                            v-model.trim="$v.companyData.сhecking_account.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.companyData.сhecking_account.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text mb-1">Кор. счет</span>
                    <cInput
                            :class="{ 'form-group--error': $v.companyData.correspondent_account.$error }"
                            v-model.trim="$v.companyData.correspondent_account.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.companyData.correspondent_account.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text mb-1">Должностъ руководителя</span>
                    <cInput
                            :class="{ 'form-group--error': $v.companyData.position.$error }"
                            v-model.trim="$v.companyData.position.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.companyData.position.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text mb-1">Договор  №</span>
                    <cInput
                            :class="{ 'form-group--error': $v.companyData.contract_number.$error }"
                            v-model.trim="$v.companyData.contract_number.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.companyData.contract_number.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text mb-1">от</span>
                    <cDate
                            :class="{ 'date--error': $v.companyData.contract_date.$error }"
                            v-model.trim="$v.companyData.contract_date.$model"
                            @dateChangeTwo="companyData.contract_date = $event"
                    ></cDate>
                    <div class="error-text" v-if="$v.companyData.contract_date.$error">Заполните поле</div>
                </div>
            </div>
        </div>
        <div class="save-btn">
            <cButton
                    @click.native="submit()"
                    :buttonValue="($route.params.id) ? 'сохранить' : 'добавить'"
            ></cButton>
        </div>
    </div>
</template>

<script>
    import {validations} from '@/validations/editCompany.js'
    import * as types from "@/stores/modules/controls/company/types";
    import * as blockTypes from "@/stores/modules/blocks/types";

    import cInput from "@/components/base_components/cInput";
    import cSelectInput from "@/components/base_components/cSelectInput";
    import cDate from "@/components/base_components/cDate";
    import cButton from "@/components/base_components/cButton"
    import cSelect from "@/components/base_components/cSelect"

    export default {
        name: "AddProfile",
        data(){
            return{
                currency: [],
                companyData: {
                    company_name: '',
                    post_address: '',
                    city: '',
                    phone: '',
                    fax: '',
                    inn: '',
                    kpp: '',
                    bank_name: '',
                    bik: '',
                    first_name: '',
                    second_name: '',
                    legal_company_name: '',
                    legal_address: '',
                    finance_mail: '',
                    report_mail: '',
                    okud: '',
                    okonh: '',
                    ogrn: '',
                    contract_number: '',
                    сhecking_account: '',
                    position: '',
                    correspondent_account: '',
                    resident: false,
                    contract_date: '',
                    currency_id: '',
                    parent: null,
                    status: true,
                },
            }
        },
        validations: validations,
        components:{
            cInput,
            cSelectInput,
            cDate,
            cButton,
            cSelect
        },
        mounted() {
            this.$store.dispatch("blocks/" + blockTypes.A_CURRENCIES)
                .then(res => {
                    this.currency = res.data;
                })
            if (this.$route.params.id) {
                this.companyData = this.$store.getters["company/getCurrentCompany"];
                this.companyData.parent = this.companyData.parent ? this.companyData.parent.id : ''
            }
            let user = this.$store.getters['auth/getUser'];
            this.companyData.parent = user.admincompany.id
        },
        computed: {
            headFullName: {
                get() {
                    return this.companyData.first_name + " " + this.companyData.second_name
                },
                set(val) {
                    let name = val.split(" ")[0]
                    let surname = val.split(" ")[1] ? val.split(" ")[1] : ''
                    this.companyData.first_name = name
                    this.companyData.second_name = surname
                }
            },
            parentCompany() {
                if (this.$route.params.id){
                    return this.$store.getters["company/getCompaniesList"] ? this.$store.getters["company/getCompaniesList"] : []
                } else {
                    let user = this.$store.getters['auth/getUser'];
                    console.log(user);
                    let company = [
                        {
                            name: user.admincompany.company_name,
                            id: user.admincompany.id,
                        }
                    ]
                    return company;
                }
            }
        },
        methods: {
            submit() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    if (this.$route.params.id){
                        this.$store.dispatch("company/" + types.A_EDIT_COMPANY, this.companyData)
                            .then( res => {
                                // this.$router.push("/control/company")
                                this.$store.dispatch("company/" + types.A_SET_CURRENT_COMPANY, res.data.company)
                            })
                    } else{
                        this.$store.dispatch("company/" + types.A_ADD_COMPANY, this.companyData)
                            .then( res => {
                                this.$router.push("/control/company")
                            })
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .addCompany-content{
        padding: 28px 33px;
        &.company-edit{
            padding: 28px 0 0 0 ;
        }
        .add-company-form{
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 20px;
            .paragraph-wrap{
                display: grid;
                grid-template-rows: repeat(13, 1fr);

                .paragraph{
                    position: relative;
                    /deep/.c-input input {
                        width: 100%;
                    }
                    /deep/.v-menu{
                        display: none;
                    }
                }
            }
        }
        .save-btn{
            padding-top: 25px;
        }
    }
    .headline-text{
        font-family: "Montserrat";
        font-weight: bold;
        font-size: 12px;
        line-height: normal;
        text-transform: uppercase;
        color: #1F2041;
    }
    .standard-text{
        font-family: "Montserrat";
        font-weight: normal;
        font-size: 12px;
        line-height: normal;
        color: #6B6B81;
    }
    .error-text{
        position: absolute;
        bottom: -4px;
        color: red;
        font-family: "Montserrat";
        font-weight: normal;
        font-size: 12px;
        line-height: normal;
    }
    .form-group--error {
        /deep/input {
            border-color: red;
            box-shadow: 0 0 2px 0px rgba(255, 0, 0, 0.6);
        }
    }
    .date--error{
        /deep/.v-input{
            border-color: red;
            box-shadow: 0 0 2px 0px rgba(255, 0, 0, 0.6);
        }
        /deep/.date-format{
            left: unset;
            right: 38%;
        }
    }
    .select--error{
        /deep/.v-select > .v-input__control > .v-input__slot{
            border-color: red;
            box-shadow: 0 0 2px 0px rgba(255, 0, 0, 0.6);
        }
    }
</style>