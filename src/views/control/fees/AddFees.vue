<template>
    <div class="fees-add-content">
        <div class="fees-add-header">
            <div class="headline">
                <h5>{{($route.params.id) ? 'Редактирование' : 'Добавление'}} типов сборов</h5>
            </div>
        </div>
        <div class="fees-param-content">
            <div class="paragraph-wrap">
                <div class="paragraph">
                    <span class="standard-text">Названия сбора</span>
                    <cInput
                            :class="{ 'form-group--error': $v.fees.name_ru.$error }"
                            v-model.trim="$v.fees.name_ru.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.fees.name_ru.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Названия сбора (анг.)</span>
                    <cInput
                            :class="{ 'form-group--error': $v.fees.name_eng.$error }"
                            v-model.trim="$v.fees.name_eng.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.fees.name_eng.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Дата начала действия</span>
                    <cDate
                            :class="{ 'date--error': $v.fees.date_of_start.$error }"
                            v-model.trim="$v.fees.date_of_start.$model"
                            @dateChangeTwo="fees.date_of_start = $event"
                    ></cDate>
                    <div class="error-text" v-if="$v.fees.date_of_start.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Дата окончания действия</span>
                    <cDate
                            :class="{ 'date--error': $v.fees.date_of_stop.$error }"
                            v-model.trim="$v.fees.date_of_stop.$model"
                            @dateChangeTwo="fees.date_of_stop = $event"
                    ></cDate>
                    <div class="error-text" v-if="$v.fees.date_of_stop.$error">Заполните поле</div>
                </div>
            </div>
        </div>
        <div class="add-fees-btn pt-3">
            <cButton
                    @click.native="submit()"
                    :buttonValue="(this.$route.params.id) ? 'сохранить' : 'добавить'"
            ></cButton>
        </div>
    </div>
</template>

<script>
    import {validations} from '@/validations/addFees.js'
    import * as types from "@/stores/modules/controls/types";

    import cDate from "@/components/base_components/cDate";
    import cInput from "@/components/base_components/cInput";
    import cButton from "@/components/base_components/cButton";

    export default {
        name: "addFees",
        components: {
            cDate,
            cInput,
            cButton
        },
        data() {
            return {
                fees: {
                    name_ru: '',
                    name_eng: '',
                    date_of_start: '',
                    date_of_stop: '',
                }
            }
        },
        validations: validations,
        mounted() {
            if (this.$route.params.id){
                let data = this.$store.getters["controls/getCurrentFees"]
                this.fees.name_ru = data.name_ru;
                this.fees.name_eng = data.name_eng;
                this.fees.date_of_start = data.date_of_start;
                this.fees.date_of_stop = data.date_of_stop;
                this.fees.id = data.id;
            }
        },
        computed: {

        },
        methods: {
            submit() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    if (this.$route.params.id) {
                        this.$store.dispatch("controls/" + types.A_EDIT_FEES_CONTROLS, this.fees)
                            .then( () => {
                                this.$router.push("/control")
                            })
                    }else {
                        this.$store.dispatch("controls/" + types.A_ADD_FEES_CONTROLS, this.fees)
                            .then( () => {
                                this.$router.push("/control")
                            })
                    }
                }
            }
        },
        watch: {

        }
    }
</script>

<style lang="scss" scoped>
    .fees-add-content{
        padding: 0 33px 50px;
    }

    .headline{
        padding: 26px 0;
        h5{
            font-size: 16px;
            font-weight: 600;
            color: #1F2041;
            margin: 0;
        }
    }

    /deep/.v-menu {
        /*width: 30%;*/
        display: none;
        /*min-width: 320px;*/
        /*& .v-text-field .v-input__slot{*/
        /*    min-width: 320px;*/
        /*}*/
    }
    /deep/.v-input{
        /*max-width: 320px;*/
    }

    .fees-param-content, .fees-value-content{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 30px;
    }

    .grouping{
        /*width: 70%;*/
        background-color: #eee;
        border-radius: 4px;
    }

    .fees-param-content .paragraph, .fees-value-content .paragraph{
        position: relative;
    }

    /deep/.c-input input{
        width: 100%;
        .grouping &{
            background-color: #FAFAFA;
        }
    }
    /deep/.v-select > .v-input__control > .v-input__slot{
        /*width: 70%;*/
    }

    .paragraph{
        min-height: 80px;
        min-width: 360px;
    }

    .add-fees-btn{
        display: inline-block;
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