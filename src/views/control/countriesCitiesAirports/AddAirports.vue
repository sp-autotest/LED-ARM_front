<template>
    <div class="airports-add">
        <div class="airports-add-header">
            <div class="headline">
                <h5>{{($route.params.id) ? 'Редактирование' : 'Добавление'}} аэропорта</h5>
            </div>
        </div>
        <div class="airports-param-wrap">
            <div class="paragraph-wrap">
                <div class="paragraph">
                    <span class="standard-text">Город</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.sendParam.city_id.$error }"
                            v-model.trim="$v.sendParam.city_id.$model"
                            :itemText="'name_ru'"
                            :itemValue="'id'"
                            :selectItems="cities"
                            selectPlaceholder="Выбрать..."
                    >
                    </cSelectInput>
                    <div class="error-text" v-if="$v.sendParam.city_id.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Код ЦРТ</span>
                    <cInput
                            :class="{ 'form-group--error': $v.sendParam.code_crt.$error }"
                            v-model.trim="$v.sendParam.code_crt.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.sendParam.code_crt.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Код IATA</span>
                    <cInput
                            :class="{ 'form-group--error': $v.sendParam.code_iata.$error }"
                            v-model.trim="$v.sendParam.code_iata.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.sendParam.code_iata.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Название</span>
                    <cInput
                            :class="{ 'form-group--error': $v.sendParam.name_ru.$error }"
                            v-model.trim="$v.sendParam.name_ru.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.sendParam.name_ru.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Название (лат)</span>
                    <cInput
                            :class="{ 'form-group--error': $v.sendParam.name_eng.$error }"
                            v-model.trim="$v.sendParam.name_eng.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.sendParam.name_eng.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <div class="add-airports-btn">
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
    import {validations} from '@/validations/addAirports.js'

    import cSelectInput from "@/components/base_components/cSelectInput";
    import cInput from "@/components/base_components/cInput";
    import cButton from "@/components/base_components/cButton";

    export default {
        name: "AddProvider",
        components: {
            cSelectInput,
            cInput,
            cButton,
        },
        data() {
            return{
                cities: [],
                sendParam: {
                    city_id: '',
                    code_crt: '',
                    code_iata: '',
                    name_ru: '',
                    name_eng: '',
                }
            }
        },
        validations: validations,
        mounted() {
            this.cities = this.$store.state.controls.controls_cities
            if(this.$route.params.id) {
                let data = this.$store.getters['controls/getAirportById'](this.$route.params.id);
                this.sendParam.city_id = data.city_id;
                this.sendParam.code_crt = data.code_crt;
                this.sendParam.code_iata = data.code_iata;
                this.sendParam.name_ru = data.name_ru;
                this.sendParam.name_eng = data.name_eng;
            }
        },
        methods: {
            submit() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    if(this.$route.params.id) {
                        this.sendParam.id = this.$route.params.id;
                        this.$store.dispatch("controls/" + types.A_EDIT_AIRPORT, this.sendParam)
                            .then(result => {
                                if(result) {
                                    this.$router.push("/control/countries-cities-airports");
                                }
                            });
                    } else {
                        this.$store.dispatch("controls/" + types.A_ADD_AIRPORT, this.sendParam)
                            .then( () => {
                                this.$router.push("/control/countries-cities-airports");
                            })
                    }
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .airports-add{
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
        grid-template-rows: repeat(6, 1fr);

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

    .add-airports-btn{
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
    .select--error{
        /deep/.v-select > .v-input__control > .v-input__slot{
            border-color: red;
            box-shadow: 0 0 2px 0px rgba(255, 0, 0, 0.6);
        }
    }
</style>