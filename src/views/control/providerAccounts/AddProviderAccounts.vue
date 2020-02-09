<template>
    <div class="provider-accounts-add">
        <div class="passenger-accounts-add-header">
            <div class="headline">
                <h5>{{($route.params.id) ? 'Редактирование' : 'Добавление'}} аккаунта поставщика</h5>
            </div>
        </div>
        <div class="provider-accounts-param-wrap">
            <div class="paragraph-wrap">
                <div class="paragraph">
                    <span class="standard-text">Поставщик</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.providerAccountData.providers_id.$error }"
                            v-model.trim="$v.providerAccountData.providers_id.$model"
                            :itemText="'name_full_ru'"
                            :itemValue="'id'"
                            :selectItems="providers"
                            selectPlaceholder="Выбрать..."
                    >
                    </cSelectInput>
                    <div class="error-text" v-if="$v.providerAccountData.providers_id.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Логин</span>
                    <cInput
                            :class="{ 'form-group--error': $v.providerAccountData.login_a.$error }"
                            v-model.trim="$v.providerAccountData.login_a.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.providerAccountData.login_a.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Пароль</span>
                    <cInput
                            :class="{ 'form-group--error': $v.providerAccountData.ordering_a.$error }"
                            v-model.trim="$v.providerAccountData.ordering_a.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.providerAccountData.ordering_a.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Логин для выписки</span>
                    <cInput
                            :class="{ 'form-group--error': $v.providerAccountData.login_b.$error }"
                            v-model.trim="$v.providerAccountData.login_b.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.providerAccountData.login_b.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Пароль для выписки</span>
                    <cInput
                            :class="{ 'form-group--error': $v.providerAccountData.ordering_p.$error }"
                            v-model.trim="$v.providerAccountData.ordering_p.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.providerAccountData.ordering_p.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <div class="text-area-headline">
                        <span class="standard-text">Дополнительно</span>
                        <span class="min-text">145 Символов</span>
                    </div>
                    <cTextArea
                            :class="{ 'area--error': $v.providerAccountData.adding.$error }"
                            v-model.trim="$v.providerAccountData.adding.$model"
                    ></cTextArea>
                    <div class="error-text b-8" v-if="$v.providerAccountData.adding.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <div class="add-provider-accounts-btn">
                        <cButton
                                @click.native="submit()"
                                :buttonValue="(this.$route.params.id) ? 'сохранить' : 'добавить'"
                        ></cButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as types from "@/stores/modules/controls/types";
    import {validations} from '@/validations/addProviderAccount.js'

    import cSelectInput from "@/components/base_components/cSelectInput";
    import cInput from "@/components/base_components/cInput";
    import cButton from "@/components/base_components/cButton";
    import cTextArea from "@/components/base_components/cTextArea";

    export default {
        name: "AddProviderAccounts",
        components: {
            cSelectInput,
            cInput,
            cButton,
            cTextArea
        },
        data() {
            return {
                providers: [],
                providerAccountData: {
                    providers_id: '',
                    login_a: '',
                    ordering_a: '',
                    login_b: '',
                    ordering_p: '',
                    adding: '',
                }
            }
        },
        validations: validations,
        mounted() {
            this.$store.dispatch('controls/' + types.A_PROVIDER)
                .then( (res) => {
                    this.providers = res.data.providers
                })

            if(this.$route.params.id) {
                let data = this.$store.getters['controls/getProviderAccountById'](this.$route.params.id);
                this.providerAccountData.providers_id = data.providers_id;
                this.providerAccountData.login_a = data.login_a;
                this.providerAccountData.ordering_a = data.ordering_a;
                this.providerAccountData.login_b = data.login_b;
                this.providerAccountData.ordering_p = data.ordering_p;
                this.providerAccountData.adding = data.adding;
            }
        },
        methods: {
            submit() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    if(this.$route.params.id) {
                        this.providerAccountData.id = this.$route.params.id;
                        this.$store.dispatch("controls/" + types.A_EDIT_PROVIDER_ACCOUNT, this.providerAccountData)
                            .then(result => {
                                if(result) {
                                    this.$router.push("/control/provider-accounts");
                                }
                            });
                    } else {
                        this.$store.dispatch("controls/" + types.A_ADD_PROVIDER_ACCOUNT, this.providerAccountData)
                            .then( res => {
                                this.$router.push("/control/provider-accounts");
                            })
                    }
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .provider-accounts-add{
        padding: 0 33px 50px;
    }

    .headline{
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        justify-content: space-between;
        padding: 26px 0;
        h5, .flight-list{
            text-decoration: none;
            font-size: 16px;
            font-weight: 600;
            color: #1F2041;
            margin: 0;
        }
    }

    .paragraph-wrap{
        display: grid;
        grid-template-rows: repeat(5, 1fr);

        .paragraph{
            position: relative;
            max-width: 390px;
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

    .add-provider-accounts-btn{
        display: flex;
        justify-content: space-between;
        margin-top: 15px;
    }

    .text-area-headline{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 0;
    }

    .min-text{
        font-family: "Montserrat";
        font-weight: 400;
        font-size: 11px;
        line-height: normal;
        color: #6b6b81;
    }

    .standard-text{
        font-family: "Montserrat";
        font-weight: normal;
        font-size: 12px;
        line-height: normal;
        color: #6B6B81;
    }
    .bold-text{
        font-family: "Montserrat";
        font-weight: bold;
        font-size: 12px;
        line-height: normal;
        color: #575870;
    }
    .headline-text{
        font-family: "Montserrat";
        font-weight: bold;
        font-size: 12px;
        line-height: normal;
        text-transform: uppercase;
        color: #1F2041;
    }


    .error-text{
        position: absolute;
        bottom: -4px;
        color: red;
        font-family: "Montserrat";
        font-weight: normal;
        font-size: 12px;
        line-height: normal;
        &.b-8{
            bottom: -8px;
        }
    }
    .form-group--error {
        /deep/input {
            border-color: red;
            box-shadow: 0 0 2px 0px rgba(255, 0, 0, 0.6);
        }
    }
    /deep/.c-textarea.area--error textarea{
        border-color: red;
        box-shadow: 0 0 2px 0px rgba(255, 0, 0, 0.6);
    }
    .select--error{
        /deep/.v-select > .v-input__control > .v-input__slot{
            border-color: red;
            box-shadow: 0 0 2px 0px rgba(255, 0, 0, 0.6);
        }
    }
</style>