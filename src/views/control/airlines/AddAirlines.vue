<template>
    <div class="airlines-add">
        <div class="airlines-add-header">
            <div class="headline">
                <h5>{{($route.params.id) ? 'Редактирование' : 'Добавление'}} авиакомпании</h5>
            </div>
        </div>
        <div class="airlines-param-wrap">
            <div class="paragraph-wrap">
                <div class="paragraph">
                    <span class="standard-text">Название АК</span>
                    <cInput
                            :class="{ 'form-group--error': $v.airlineParam.aviacompany_name_ru.$error }"
                            v-model.trim="airlineParam.aviacompany_name_ru"
                            inputPadding="9px 10px"
                    >
                    </cInput>
                    <div class="error-text" v-if="$v.airlineParam.aviacompany_name_ru.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Краткое название АК</span>
                    <cInput
                            :class="{ 'form-group--error': $v.airlineParam.short_aviacompany_name_ru.$error }"
                            v-model.trim="airlineParam.short_aviacompany_name_ru"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.airlineParam.short_aviacompany_name_ru.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Название АК (англ.)</span>
                    <cInput
                            :class="{ 'form-group--error': $v.airlineParam.aviacompany_name_eng.$error }"
                            v-model.trim="airlineParam.aviacompany_name_eng"
                            inputPadding="9px 10px"
                    >
                    </cInput>
                    <div class="error-text" v-if="$v.airlineParam.aviacompany_name_eng.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Краткое название АК (англ.)</span>
                    <cInput
                            :class="{ 'form-group--error': $v.airlineParam.short_aviacompany_name_eng.$error }"
                            v-model.trim="airlineParam.short_aviacompany_name_eng"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.airlineParam.short_aviacompany_name_eng.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Код ТПК</span>
                    <cInput
                            :class="{ 'form-group--error': $v.airlineParam.code_tkp.$error }"
                            v-model.trim="airlineParam.code_tkp"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.airlineParam.code_tkp.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Код IATA</span>
                    <cInput
                            :class="{ 'form-group--error': $v.airlineParam.code_iata.$error }"
                            v-model.trim="airlineParam.code_iata"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.airlineParam.code_iata.$error">Заполните поле</div>
                </div>
            </div>
            <div class="paragraph-wrap">
                <div class="paragraph">
                    <span class="standard-text">Расчетный код ТПК</span>
                    <cInput
                            :class="{ 'form-group--error': $v.airlineParam.account_code_tkp.$error }"
                            v-model.trim="airlineParam.account_code_tkp"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.airlineParam.account_code_tkp.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Расчетный код IATA</span>
                    <cInput
                            :class="{ 'form-group--error': $v.airlineParam.account_code_iata.$error }"
                            v-model.trim="airlineParam.account_code_iata"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.airlineParam.account_code_iata.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Страна</span>
                    <cSelectInput
                            v-model.trim="country"
                            :itemText="'name_ru'"
                            :itemValue="'id'"
                            :selectItems="countries"
                            @input="getCity(country)"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Город</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.airlineParam.city_id.$error }"
                            v-model.trim="airlineParam.city_id"
                            :itemText="'name_ru'"
                            :itemValue="'id'"
                            :selectItems="cities"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.airlineParam.city_id.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Дата начала действия</span>
                    <cDate
                            :currentDayShow="false"
                            :class="{ 'date--error': $v.airlineParam.date_begin_at.$error }"
                            v-model.trim="airlineParam.date_begin_at"
                            @dateChangeTwo="airlineParam.date_begin_at = $event"
                    ></cDate>
                    <div class="error-text" v-if="$v.airlineParam.date_begin_at.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Дата окончания действия</span>
                    <cDate
                            :currentDayShow="false"
                            :class="{ 'date--error': $v.airlineParam.date_end_at.$error }"
                            v-model.trim="airlineParam.date_end_at"
                            @dateChangeTwo="airlineParam.date_end_at = $event"
                    ></cDate>
                    <div class="error-text" v-if="$v.airlineParam.date_end_at.$error">Заполните поле</div>
                </div>
            </div>
            <div class="paragraph">
                <div class="add-airlines-btn">
                    <cButton
                            @click.native="submit()"
                            :buttonValue="(this.$route.params.id) ? 'сохранить' : 'добавить'"
                    ></cButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as types from "@/stores/modules/controls/types";
    import {validations} from '@/validations/addAirline.js'

    import cDate from "@/components/base_components/cDate";
    import cSelectInput from "@/components/base_components/cSelectInput";
    import cInput from "@/components/base_components/cInput";
    import cButton from "@/components/base_components/cButton";

    export default {
        name: "AddAirlines",
        components: {
            cDate,
            cSelectInput,
            cInput,
            cButton,
        },
        data() {
            return {
                cities: [],
                countries: [],
                country: '',
                airlineParam: {
                    aviacompany_name_ru: '',
                    short_aviacompany_name_ru: '',
                    aviacompany_name_eng: '',
                    short_aviacompany_name_eng: '',
                    code_tkp: '',
                    account_code_tkp: '',
                    code_iata: '',
                    account_code_iata: '',
                    city_id: '',
                    date_begin_at: '',
                    date_end_at: '',
                }
            }
        },
        validations: validations,
        mounted() {
            let data = this.$store.getters['controls/getAirlineById'](this.$route.params.id);
            this.airlineParam = data;
            this.$store.dispatch("controls/" + types.A_FEES)
                .then(res => {
                    this.countries = res.countries;
                    if(this.$route.params.id && data) {
                        this.cities = res.cities;
                        let countriId = '';
                        let currentCountry = '';
                        this.cities.filter( val => {
                            if (val.id == data.city_id) {
                                countriId = val.country_id
                            }
                        })
                        this.countries.filter( val => {
                            if (val.id == countriId) {
                                currentCountry = val.id
                            }
                        })
                        this.country = currentCountry;
                        this.getCity(this.country)
                    }
                });
        },
        methods: {
            getCity(id) {
                let name = '';
                this.countries.filter( (val) => {
                    if (val.id == id) {
                        name = val.name_ru;
                    }
                })
                this.$store.dispatch('controls/' + types.A_GET_CITIES, name)
                    .then( result => {
                        this.cities = [];
                        let keys = Object.keys(result.data.data);
                        let names = {};
                        keys.filter( val => {
                            names = {name_ru: result.data.data[val].city.name_ru, id: result.data.data[val].city.id};
                            this.cities.push(names)
                        })
                    })
            },
            submit() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    if(this.$route.params.id) {
                        this.$store.dispatch("controls/" + types.A_EDIT_AIRLINES, this.airlineParam)
                            .then(result => {
                                if(result) {
                                    this.$router.push("/control/airlines");
                                }
                            });
                    } else {
                        this.$store.dispatch("controls/" + types.A_ADD_AIRLINES, this.airlineParam)
                            .then( res => {
                                this.$router.push("/control/airlines");
                            })
                    }
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
    .airlines-add{
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

    .airlines-param-wrap{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 33px;
    }

    .paragraph-wrap{
        display: grid;
        grid-template-rows: repeat(6, 1fr);

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

    .add-airlines-btn{
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
    .select--error{
        /deep/.v-select > .v-input__control > .v-input__slot{
            border-color: red;
            box-shadow: 0 0 2px 0px rgba(255, 0, 0, 0.6);
        }
    }
</style>