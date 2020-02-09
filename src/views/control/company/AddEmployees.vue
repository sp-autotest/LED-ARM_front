<template>
    <div class="add-employees-content">
        <div class="employees-param-wrap">
            <div class="paragraph-wrap">
                <div class="paragraph">
                    <span class="standard-text">Компания</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.employees.company_id.$error }"
                            v-model.trim="$v.employees.company_id.$model"
                            :itemText="'name'"
                            :itemValue="'id'"
                            :selectItems="companies"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.employees.company_id.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Группа</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.employees.role.$error }"
                            v-model.trim="$v.employees.role.$model"
                            :itemText="'name'"
                            :itemValue="'name'"
                            :selectItems="groups"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.employees.role.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Должность</span>
                    <cInput
                            :class="{ 'form-group--error': $v.employees.position.$error }"
                            v-model.trim="$v.employees.position.$model"
                            inputPadding="9px 10px"
                    >
                    </cInput>
                    <div class="error-text" v-if="$v.employees.position.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Электронная почта</span>
                    <cInput
                            :class="{ 'form-group--error': $v.employees.email.$error }"
                            v-model.trim="$v.employees.email.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="!$v.employees.email.required && $v.employees.email.$error">Заполните поле</div>
                    <div class="error-text" v-else-if="!$v.employees.email.email">Е:маил не корректный</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Телефон</span>
                    <cInput
                            :class="{ 'form-group--error': $v.employees.phone.$error }"
                            v-model.trim="$v.employees.phone.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.employees.phone.$error">Заполните поле</div>
                </div>

            </div>
            <div class="paragraph-wrap">
                <div class="paragraph">
                    <span class="standard-text">Фамилия</span>
                    <cInput
                            :class="{ 'form-group--error': $v.employees.second_name.$error }"
                            v-model.trim="$v.employees.second_name.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.employees.second_name.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Имя</span>
                    <cInput
                            :class="{ 'form-group--error': $v.employees.first_name.$error }"
                            v-model.trim="$v.employees.first_name.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.employees.first_name.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Пол</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.employees.sex.$error }"
                            v-model.trim="$v.employees.sex.$model"
                            :itemText="'name'"
                            :itemValue="'value'"
                            :selectItems="sexList"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.employees.sex.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Логин</span>
                    <cInput
                            :class="{ 'form-group--error': $v.employees.additional_email.$error }"
                            v-model.trim="$v.employees.additional_email.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.employees.additional_email.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Пароль</span>
                    <cInput
                            :class="{ 'form-group--error': $v.employees.password.$error }"
                            v-model.trim="$v.employees.password.$model"
                            :inputPlaceholder="this.$route.params.employees_id ? 'Новый пароль' : ''"
                            inputType="password"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.employees.password.$error">Заполните поле</div>
                </div>
            </div>
            <div class="paragraph">
                <div class="add-employees-btn">
                    <cButton
                            @click="submit()"
                            buttonValue="сохранить"
                    ></cButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as types from "@/stores/modules/controls/company/types";
    // import {validations} from '@/validations/addEmployees.js'
    import { required, email, requiredIf } from 'vuelidate/lib/validators'

    import cSelectInput from "@/components/base_components/cSelectInput";
    import cInput from "@/components/base_components/cInput";
    import cButton from "@/components/base_components/cButton";
    export default {
        name: "AddEmployees",
        data(){
            return{
                companyId: 0,
                sexList: [
                    {
                        name: "Мужской",
                        value: false
                    },
                    {
                        name: "Женский",
                        value: true
                    }
                ],
                employees: {
                    company_id: '',
                    role: [],
                    position: '',
                    email: '',
                    phone: '',
                    second_name: '',
                    first_name: '',
                    sex: null,
                    additional_email: '',
                    password: '',
                    active: true,
                },
                companies: [],
                groups: [],
                valid: true
            }
        },
        validations: {
            employees: {
                company_id: {
                    required: requiredIf(function () {
                        if (this.valid) {
                            return true
                        } else {
                            return false
                        }
                    })
                },
                role: {
                    required: requiredIf(function () {
                        if (this.valid) {
                            return true
                        } else {
                            return false
                        }
                    })
                },
                position: {
                    required: requiredIf(function () {
                        if (this.valid) {
                            return true
                        } else {
                            return false
                        }
                    })
                },
                email: {
                    required: requiredIf(function () {
                        if (this.valid) {
                            return true
                        } else {
                            return false
                        }
                    }),
                    email
                },
                phone: {
                    required: requiredIf(function () {
                        if (this.valid) {
                            return true
                        } else {
                            return false
                        }
                    })
                },
                second_name: {
                    required: requiredIf(function () {
                        if (this.valid) {
                            return true
                        } else {
                            return false
                        }
                    })
                },
                first_name: {
                    required: requiredIf(function () {
                        if (this.valid) {
                            return true
                        } else {
                            return false
                        }
                    })
                },
                sex: {
                    required: requiredIf(function () {
                        if (this.valid) {
                            return true
                        } else {
                            return false
                        }
                    })
                },
                additional_email: {
                    required: requiredIf(function () {
                        if (this.valid) {
                            return true
                        } else {
                            return false
                        }
                    })
                },
                password: {
                    required: requiredIf(function () {
                        if (this.valid) {
                            return true
                        } else {
                            return false
                        }
                    })
                },
            }
        },
        components:{
            cSelectInput,
            cInput,
            cButton
        },
        mounted(){
            this.companyId = this.$route.params.id
            this.employees.sex = true;
            this.$store.dispatch("company/" + types.A_GET_GROUPS)
                .then( res => {
                    this.groups = res.data.groups;
                });
            this.companies =  this.$store.getters["company/getCompaniesList"] ? this.$store.getters["company/getCompaniesList"] : [];
            if (this.$route.params.employees_id) {
                this.valid = false
                let data = this.$store.getters["company/getCurrentEmployees"];
                this.employees.company_id = data.admincompany.id;
                this.employees.position = data.profile.position;
                this.employees.email = data.email;
                this.employees.phone = data.profile.phone;
                this.employees.second_name = data.profile.second_name;
                this.employees.first_name = data.profile.first_name;
                this.employees.sex = data.profile.sex;
                this.employees.additional_email = data.profile.additional_email;
                this.employees.role = data.roles[0].name;
                this.employees.id = this.$route.params.employees_id;
                console.log(data);
            }
        },
        methods: {
            submit() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    if (this.$route.params.employees_id) {
                        this.$store.dispatch("company/" + types.A_EDIT_EMPLOYEES, this.employees)
                            .then( res => {
                                this.$router.push(`/control/company/${this.companyId}/employees`)
                            })
                    } else {
                        this.$store.dispatch("company/" + types.A_ADD_EMPLOYEES, this.employees)
                            .then( res => {
                                this.$router.push(`/control/company/${this.companyId}/employees`)
                            })
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

    .add-employees-content{
        padding-top: 16px;
    }

    .employees-param-wrap{
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-column-gap: 33px;
      }

    .paragraph-wrap{
        display: grid;
        grid-template-rows: repeat(5, 1fr);

        .paragraph{
            position: relative;
        }
    }

    /deep/.v-menu {
        display: none;
    }
    /deep/.c-input input{
        width: 100%;
    }
    /deep/.v-select .v-select__selections{
        width: max-content;
    }

    .add-employees-btn{
        padding-top: 15px;
        display: flex;
        justify-content: space-between;
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
    .select--error{
        /deep/.v-select > .v-input__control > .v-input__slot{
            border-color: red;
            box-shadow: 0 0 2px 0px rgba(255, 0, 0, 0.6);
        }
    }
</style>