<template>
    <div class="currency-add">
        <div class="currency-add-header">
            <div class="headline">
                <h5>Добавление валют</h5>
            </div>
        </div>
        <div class="currency-param-wrap">
            <div class="paragraph-wrap">
                <div class="paragraph">
                    <span class="standard-text">Валюта</span>
                    <cInput
                            :class="{ 'form-group--error': $v.currencyParam.name_ru.$error }"
                            v-model.trim="$v.currencyParam.name_ru.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.currencyParam.name_ru.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Валюта (англ)</span>
                    <cInput
                            :class="{ 'form-group--error': $v.currencyParam.name_eng.$error }"
                            v-model.trim="$v.currencyParam.name_eng.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.currencyParam.name_eng.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Код ISO числовой</span>
                    <cInput
                            :class="{ 'form-group--error': $v.currencyParam.code_numeric_iso_4217.$error }"
                            v-model.trim="$v.currencyParam.code_numeric_iso_4217.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.currencyParam.code_numeric_iso_4217.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Код ISO буквенный</span>
                    <cInput
                            :class="{ 'form-group--error': $v.currencyParam.code_literal_iso_4217.$error }"
                            v-model.trim="$v.currencyParam.code_literal_iso_4217.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.currencyParam.code_literal_iso_4217.$error">Заполните поле</div>
                </div>
            </div>
            <div class="paragraph">
                <div class="add-currency-btn">
                    <cButton
                            @click.native="submit()"
                            :buttonValue="($route.params.id) ? 'сохранить' : 'добавить'"
                    ></cButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as types from "@/stores/modules/controls/types";

    import cInput from "@/components/base_components/cInput";
    import cButton from "@/components/base_components/cButton";

    import {validations} from "@/validations/addCurrency.js"

    export default {
        name: "AddCurrency",
        components: {
            cInput,
            cButton,
        },
        data() {
            return {
                currencyParam: {
                    name_ru: '',
                    name_eng: '',
                    code_numeric_iso_4217: '',
                    code_literal_iso_4217: '',
                }
            }
        },
        validations: validations,
        mounted() {
            if(this.$route.params.id) {
                let data = this.$store.getters['blocks/getCurrencyById'](this.$route.params.id);
                this.currencyParam.name_ru = data.name_ru;
                this.currencyParam.name_eng = data.name_eng;
                this.currencyParam.code_numeric_iso_4217 = data.code_numeric_iso_4217;
                this.currencyParam.code_literal_iso_4217 = data.code_literal_iso_4217;
            }
        },
        methods: {
            submit() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    if(this.$route.params.id) {
                        this.currencyParam.id = this.$route.params.id;
                        this.$store.dispatch("controls/" + types.A_EDIT_CURRENCY, this.currencyParam)
                            .then(result => {
                                if(result) {
                                    this.$router.push("/control/currency-reference");
                                }
                            });
                    } else {
                        this.$store.dispatch("controls/" + types.A_ADD_CURRENCY, this.currencyParam)
                            .then( () => {
                                this.$router.push("/control/currency-reference");
                            })
                    }
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .currency-add{
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
        grid-template-rows: repeat(4, 1fr);
        grid-gap: 12px;

        .paragraph{
            position: relative;
            max-width: 390px
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

    .add-currency-btn{
        margin-top: 24px;
        display: flex;
        justify-content: space-between;
    }

    .error-text{
        position: absolute;
        bottom: -16px;
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
</style>