<template>
    <div class="settings-content">
        <div class="settings-param-wrap">
            <div class="paragraph-wrap">
                <div class="paragraph">
                    <span class="standard-text">Менеджер</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.settings.manager_id.$error }"
                            v-model.trim="$v.settings.manager_id.$model"
                            :itemText="'name'"
                            :itemValue="'id'"
                            :selectItems="managerList"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.settings.manager_id.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Условия оплаты</span>
                    <cInput
                            :class="{ 'form-group--error': $v.settings.agreement.$error }"
                            v-model.trim="$v.settings.agreement.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.settings.agreement.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Лимит остатка</span>
                    <cInput
                            :class="{ 'form-group--error': $v.settings.residue_limit.$error }"
                            v-model.trim="$v.settings.residue_limit.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.settings.residue_limit.$error">Заполните поле</div>
                </div>
            </div>
            <div class="paragraph-wrap">
                <div class="paragraph">
                    <span class="standard-text">Комиссия бизнес</span>
                    <cInput
                            :class="{ 'form-group--error': $v.settings.commission_business.$error }"
                            v-model.trim="$v.settings.commission_business.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.settings.commission_business.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Комиссия первый</span>
                    <cInput
                            :class="{ 'form-group--error': $v.settings.commission_first.$error }"
                            v-model.trim="$v.settings.commission_first.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.settings.commission_first.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Комиссия эконом</span>
                    <cInput
                            :class="{ 'form-group--error': $v.settings.commission_economy.$error }"
                            v-model.trim="$v.settings.commission_economy.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.settings.commission_economy.$error">Заполните поле</div>
                </div>
            </div>
        </div>
        <div class="settings-param-wrap">
            <div>
                <cSelect
                        v-model="settings.status"
                        @selected="settings.status = $event"
                        inputLabel="Статус компании"
                ></cSelect>
                <cSelect
                        v-model="settings.limit"
                        @selected="settings.limit = $event"
                        inputLabel="Исполъзоватъ лимит баланса"
                ></cSelect>
                <cSelect
                        v-model="settings.fees_avia"
                        @selected=" settings.fees_avia = $event"
                        inputLabel="Помешатъ сборы в таксу Авиа"
                ></cSelect>
            </div>
            <div>
                <cSelect
                        v-model="settings.invoice_payment"
                        @selected=" settings.invoice_payment = $event"
                        inputLabel="Возможность оплаты по счету"
                ></cSelect>
                <div class="textarea-item">
                    <span  class="standard-text">Контакты службы поддержки </span>
                    <cTextArea
                            :class="{ 'area--error': $v.settings.support_contacts.$error }"
                            v-model.trim="$v.settings.support_contacts.$model"
                            textPadding="9px 10px"
                    ></cTextArea>
                    <div class="error-text" v-if="$v.settings.support_contacts.$error">Заполните поле</div>
                </div>
            </div>
        </div>
        <cButton
                @click="submit()"
                buttonValue="сохранять"
        ></cButton>
    </div>
</template>

<script>
    import {validations} from '@/validations/companySettings.js'
    import * as types from "@/stores/modules/controls/company/types";

    import cSelectInput from "@/components/base_components/cSelectInput";
    import cInput from "@/components/base_components/cInput";
    import cSelect from "@/components/base_components/cSelect";
    import cTextArea from "@/components/base_components/cTextArea";
    import cButton from "@/components/base_components/cButton";

    export default {
        name: "Settings",
        data(){
            return{
                managerList: [],
                settings: {
                    manager_id: '',
                    agreement: '',
                    residue_limit: '',
                    commission_business: '',
                    commission_first: '',
                    commission_economy: '',
                    support_contacts: '',
                    status: false,
                    limit: false,
                    fees_avia: false,
                    invoice_payment: false,
                    id: null
                }
            }
        },
        validations: validations,
        components:{
            cInput,
            cSelectInput,
            cSelect,
            cTextArea,
            cButton
        },
        mounted() {
            this.$store.dispatch("company/" + types.A_GET_MANAGERS, this.$route.params.id)
                .then( res => {
                    console.log(res);
                    if (res.data.users.length > 0){
                        res.data.users.filter( val => {
                            this.managerList.push({
                                name: val.profile.first_name +" "+ val.profile.second_name,
                                id: val.profile.id
                            })
                        })
                    }
                })
            if (this.$route.params.id) {
                let data = this.$store.getters["company/getCurrentCompany"];
                console.log(data);
                this.settings.id = data.id;
                this.settings.manager_id = data.manager_id;
                this.settings.agreement = data.agreement;
                this.settings.residue_limit = data.residue_limit;
                this.settings.commission_business = data.commission_business;
                this.settings.commission_first = data.commission_first;
                this.settings.commission_economy = data.commission_economy;
                this.settings.support_contacts = data.support_contacts;
                this.settings.status = data.status;
                this.settings.limit = data.limit;
                this.settings.fees_avia = data.fees_avia;
                this.settings.invoice_payment = data.invoice_payment;
            }
        },
        methods: {
            submit() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    this.$store.dispatch("company/" + types.A_EDIT_COMPANY, this.settings)
                        .then( res => {
                            console.log(res);
                            this.$store.dispatch("company/" + types.A_SET_CURRENT_COMPANY, res.data.company)
                        })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .settings-param-wrap{
        padding-top: 20px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 33px;
        &:last-child{
            padding-top: 0;
        }
    }
    .paragraph-wrap{
        display: grid;
        grid-template-rows: repeat(3, 1fr);
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
    .textarea-item{
        padding-top: 10px;
        position: relative;
    }
    .standard-text{
        font-family: "Montserrat";
        font-weight: normal;
        font-size: 12px;
        line-height: normal;
        color: #6B6B81;
    }
    /deep/.c-select .select-label{
        font-family: "Montserrat";
        font-weight: normal;
        font-size: 12px;
        line-height: normal;
        color: #6B6B81;
        grid-template-columns:none;
        grid-template-rows:40px 1fr;
    }
    /deep/.c-select .select-label:after, /deep/.c-select .select-label:before{
        grid-row: 2/3;
    }

    .error-text{
        position: absolute;
        bottom: -8px;
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
    /deep/.c-textarea.area--error textarea{
        border-color: red;
        box-shadow: 0 0 2px 0px rgba(255, 0, 0, 0.6);
    }
</style>