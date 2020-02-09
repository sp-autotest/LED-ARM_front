<template>
    <div class="provider-add">
        <div class="passenger-add-header">
            <div class="headline">
                <h5>{{(this.$route.params.id) ? 'Редактирование' : 'Добавление'}} поставщика</h5>
            </div>
        </div>
        <div class="provider-param-wrap">
            <div class="paragraph-wrap">
                <div class="paragraph">
                    <span class="standard-text">Название</span>
                    <cInput
                            :class="{ 'form-group--error': $v.providerParam.name_ru.$error }"
                            v-model.trim="$v.providerParam.name_ru.$model"
                            inputPadding="9px 10px"
                    >
                    </cInput>
                    <div class="error-text" v-if="$v.providerParam.name_ru.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Полное название</span>
                    <cInput
                            :class="{ 'form-group--error': $v.providerParam.name_full_ru.$error }"
                            v-model.trim="$v.providerParam.name_full_ru.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.providerParam.name_full_ru.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Название (англ.)</span>
                    <cInput
                            :class="{ 'form-group--error': $v.providerParam.name_eng.$error }"
                            v-model.trim="$v.providerParam.name_eng.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.providerParam.name_full_ru.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Полное название (англ.)</span>
                    <cInput
                            :class="{ 'form-group--error': $v.providerParam.name_full_eng.$error }"
                            v-model.trim="$v.providerParam.name_full_eng.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.providerParam.name_full_eng.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Дата начала действия</span>
                    <cDate
                            :currentDayShow="false"
                            :class="{ 'date--error': $v.providerParam.date_begin_at.$error }"
                            v-model.trim="$v.providerParam.date_begin_at.$model"
                            @dateChangeTwo="providerParam.date_begin_at = $event"
                    ></cDate>
                    <div class="error-text" v-if="$v.providerParam.date_begin_at.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Дата окончания действия</span>
                    <cDate
                            :currentDayShow="false"
                            :class="{ 'date--error': $v.providerParam.date_end_at.$error }"
                            v-model.trim="$v.providerParam.date_end_at.$model"
                            @dateChangeTwo="providerParam.date_end_at = $event"
                    ></cDate>
                    <div class="error-text" v-if="$v.providerParam.date_end_at.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <div class="add-provider-btn">
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

    import cDate from "@/components/base_components/cDate";
    import cInput from "@/components/base_components/cInput";
    import cButton from "@/components/base_components/cButton";

    import {validations} from "@/validations/addProvider.js"

    export default {
        name: "AddProvider",
        components: {
            cDate,
            cInput,
            cButton,
        },
        data() {
            return {
                providerParam: {
                    name_ru: '',
                    name_eng: '',
                    name_full_ru: '',
                    name_full_eng: '',
                    date_begin_at: '',
                    date_end_at: '',
                }
            }
        },
        validations: validations,
        mounted() {
            if(this.$route.params.id) {
                let provider = this.$store.getters['controls/getProviderById'](this.$route.params.id);
                this.providerParam.name_ru = provider.name_ru;
                this.providerParam.name_eng = provider.name_eng;
                this.providerParam.name_full_ru = provider.name_full_ru;
                this.providerParam.name_full_eng = provider.name_full_eng;
                this.providerParam.date_begin_at = provider.date_begin_at;
                this.providerParam.date_end_at = provider.date_end_at;
            }
        },
        methods: {
            submit() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    if(this.$route.params.id) {
                        this.providerParam.id = this.$route.params.id;
                        this.$store.dispatch("controls/" + types.A_EDIT_PROVIDER, this.providerParam)
                            .then(result => {
                                if(result) {
                                    this.$router.push("/control/provider");
                                }
                            });
                    } else {
                        this.$store.dispatch("controls/" + types.A_ADD_PROVIDER, this.providerParam)
                            .then( () => {
                                this.$router.push("/control/provider");
                            })
                    }
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .provider-add{
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

    .add-provider-btn{
        display: flex;
        justify-content: space-between;
        margin-top: 15px;
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
</style>