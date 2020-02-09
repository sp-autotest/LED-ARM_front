<template>
    <div class="fees-add-content">
        <div class="fees-add-header">
            <div class="param-values-wrap">
                <input id="param" type="radio" v-model="feesParamValue" value="fees-param">
                <label for="param" class="param-label">Параметры заказа</label>

                <input id="fees-values" type="radio" v-model="feesParamValue" value="fees-value">
                <label for="fees-values" class="fees-values-label">Величины сбора</label>
            </div>
        </div>
        <div v-show="feesParamValue == 'fees-param'" class="fees-param-content">
            <div class="paragraph-wrap">
                <div class="paragraph">
                    <span class="standard-text">Дата начала действия (периода продажи)</span>
                    <cDate
                            :minDate="currentDate"
                            :class="{ 'date--error': $v.feesParam.period_begin_at.$error }"
                            v-model.trim="$v.feesParam.period_begin_at.$model"
                            @dateChangeTwo="feesParam.period_begin_at = $event"
                    ></cDate>
                    <div class="error-text" v-if="$v.feesParam.period_begin_at.$error">Выберите дату</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Дата начала вылета</span>
                    <cDate
                            :minDate="currentDate"
                            :class="{ 'date--error': $v.feesParam.date_start.$error }"
                            v-model.trim="$v.feesParam.date_start.$model"
                            @dateChangeTwo="feesParam.date_start = $event"
                    ></cDate>
                    <div class="error-text" v-if="$v.feesParam.date_start.$error">Выберите дату</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Авиакомпания</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.feesParam.airlines_id.$error }"
                            v-model.trim="$v.feesParam.airlines_id.$model"
                            :selectItems="getAirlines"
                            :itemText="'short_aviacompany_name_ru'"
                            :itemValue="'id'"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.feesParam.airlines_id.$error">Выберите авиокомпанию</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Тип перелета</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.feesParam.type_flight.$error }"
                            v-model.trim="$v.feesParam.type_flight.$model"
                            :selectItems="typeFlight"
                            :itemText="'text'"
                            :itemValue="'value'"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.feesParam.type_flight.$error">Выберите тип перелета</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Страна отправления</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.feesParam.country_id_departure.$error }"
                            v-model.trim="$v.feesParam.country_id_departure.$model"
                            :selectItems="$store.getters['controls/getfeesData'].countries"
                            :itemText="'name_ru'"
                            :itemValue="'id'"
                            @input="getDepartureCity()"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.feesParam.country_id_departure.$error">Выберите страну отправления</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Город отправления</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.feesParam.departure_city.$error }"
                            v-model.trim="$v.feesParam.departure_city.$model"
                            :selectItems="getCitiesDeparture"
                            :itemText="'name_ru'"
                            :itemValue="'id'"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.feesParam.departure_city.$error">Выберите город отправления</div>
                </div>
            </div>
            <div class="paragraph-wrap">
                <div class="paragraph">
                    <span class="standard-text">Дата окончания действия</span>
                    <cDate
                            :currentDayShow="false"
                            :minDate="minDateLimitAction == '' ? currentDate : minDateLimitAction"
                            :class="{ 'date--error': $v.feesParam.period_end_at.$error }"
                            v-model.trim="$v.feesParam.period_end_at.$model"
                            @dateChangeTwo="feesParam.period_end_at = $event"
                            :plusValue="10"
                    ></cDate>
                    <div class="error-text" v-if="$v.feesParam.period_end_at.$error">Выберите дату</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Дата окончания вылета</span>
                    <cDate
                            :currentDayShow="false"
                            :minDate="minDateLimitDeparture == '' ? currentDate : minDateLimitDeparture"
                            :class="{ 'date--error': $v.feesParam.date_stop.$error }"
                            v-model.trim="$v.feesParam.date_stop.$model"
                            @dateChangeTwo="feesParam.date_stop = $event"
                            :plusValue="10"
                    ></cDate>
                    <div class="error-text" v-if="$v.feesParam.date_stop.$error">Выберите дату</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Класс обслуживания</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.feesParam.fare_families_id.$error }"
                            v-model.trim="$v.feesParam.fare_families_id.$model"
                            :selectItems="getFarefamilies"
                            :itemText="'name_ru'"
                            :itemValue="'id'"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.feesParam.fare_families_id.$error">Выберите класс обслуживания</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Не взимать с младенца</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.feesParam.infant.$error }"
                            v-model.trim="$v.feesParam.infant.$model"
                            :selectItems="baby_charge"
                            :itemText="'text'"
                            :itemValue="'value'"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.feesParam.infant.$error">Выберите ответ</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Страна назначения</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.feesParam.country_id_arrival.$error }"
                            v-model.trim="$v.feesParam.country_id_arrival.$model"
                            :selectItems="getCountries"
                            :itemText="'name_ru'"
                            :itemValue="'id'"
                            @input="getArrivalCity()"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.feesParam.country_id_arrival.$error">Выберите страну назначения</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Город назначения</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.feesParam.arrival_city.$error }"
                            v-model.trim="$v.feesParam.arrival_city.$model"
                            :selectItems="getCitiesArrival"
                            :itemText="'name_ru'"
                            :itemValue="'id'"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.feesParam.arrival_city.$error">Выберите город назначения</div>
                </div>
            </div>
        </div>

        <div v-show="feesParamValue == 'fees-value'" class="fees-value-content">
            <div class="paragraph-wrap">
                <div class="paragraph pl-2 pr-2">
                    <span class="standard-text">Тип сбора за выписку</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.feesParam.type_fees_inscribed.$error }"
                            v-model.trim="$v.feesParam.type_fees_inscribed.$model"
                            :itemText="'text'"
                            :itemValue="'value'"
                            :selectItems="typeStatementFee"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.feesParam.type_fees_inscribed.$error">Выберите тип сбора за выписку</div>
                </div>
                <div class="grouping">
                    <div class="paragraph pl-2 pr-2">
                        <span class="standard-text">Размер сбора за выписку</span>
                        <cInput
                                :class="{ 'form-group--error': $v.feesParam.size_fees_inscribed.$error }"
                                v-model.trim="feesParam.size_fees_inscribed"
                                :inputMask="'#############'"
                                inputPadding="9px 10px"
                        ></cInput>
                        <div class="error-text" v-if="$v.feesParam.size_fees_inscribed.$error">Заполните поле</div>
                    </div>
                    <div class="paragraph pl-2 pr-2">
                        <span class="standard-text">Минимальный сбор за выписку</span>
                        <cInput
                                :class="{ 'form-group--error': $v.feesParam.min_fees_inscribed.$error }"
                                v-model.trim="$v.feesParam.min_fees_inscribed.$model"
                                :inputMask="'#############'"
                                inputPadding="9px 10px">
                        </cInput>
                        <div class="error-text" v-if="$v.feesParam.min_fees_inscribed.$error">Заполните поле</div>
                    </div>
                    <div class="paragraph pl-2 pr-2">
                        <span class="standard-text">Максимальный сбор за выписку</span>
                        <cInput
                                :class="{ 'form-group--error': $v.feesParam.max_fees_inscribed.$error }"
                                v-model.trim="$v.feesParam.max_fees_inscribed.$model"
                                :inputMask="'#############'"
                                inputPadding="9px 10px">
                        </cInput>
                        <div class="error-text" v-if="$v.feesParam.max_fees_inscribed.$error">Заполните поле</div>
                    </div>
                </div>
                <div class="paragraph pl-2 pr-2">
                    <span class="standard-text">Тип сбора за возврат</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.feesParam.type_fees_charge.$error }"
                            v-model.trim="$v.feesParam.type_fees_charge.$model"
                            :itemText="'text'"
                            :itemValue="'value'"
                            :selectItems="typeRefundCharge"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.feesParam.type_fees_charge.$error">Выберите тип сбора за возврат</div>
                </div>
                <div class="grouping">
                    <div class="paragraph pl-2 pr-2">
                        <span class="standard-text">Размер сбора за возврат</span>
                        <cInput
                                :class="{ 'form-group--error': $v.feesParam.size_fees_charge.$error }"
                                v-model.trim="feesParam.size_fees_charge"
                                :inputMask="'#############'"
                                inputPadding="9px 10px"
                        ></cInput>
                        <div class="error-text" v-if="$v.feesParam.size_fees_charge.$error">Заполните поле</div>
                    </div>
                    <div class="paragraph pl-2 pr-2">
                        <span class="standard-text">Минимальный сбор за возврат</span>
                        <cInput
                                :class="{ 'form-group--error': $v.feesParam.min_fees_charge.$error }"
                                v-model.trim="$v.feesParam.min_fees_charge.$model"
                                :inputMask="'#############'"
                                inputPadding="9px 10px"
                        ></cInput>
                        <div class="error-text" v-if="$v.feesParam.min_fees_charge.$error">Заполните поле</div>
                    </div>
                    <div class="paragraph pl-2 pr-2">
                        <span class="standard-text">Максимальный сбор за возврат</span>
                        <cInput
                                :class="{ 'form-group--error': $v.feesParam.max_fees_charge.$error }"
                                v-model.trim="$v.feesParam.max_fees_charge.$model"
                                :inputMask="'#############'"
                                inputPadding="9px 10px"
                        ></cInput>
                        <div class="error-text" v-if="$v.feesParam.max_fees_charge.$error">Заполните поле</div>
                    </div>
                </div>
            </div>
            <div class="paragraph-wrap">
                <div class="paragraph pl-2 pr-2">
                    <span class="standard-text">Тип сбора за обмен</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.feesParam.type_fees_exchange.$error }"
                            v-model.trim="$v.feesParam.type_fees_exchange.$model"
                            :itemText="'text'"
                            :itemValue="'value'"
                            :selectItems="typeExchangeFee"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.feesParam.type_fees_exchange.$error">Выберите тип сбора за обмен</div>
                </div>
                <div class="grouping">
                    <div class="paragraph pl-2 pr-2">
                        <span class="standard-text">Размер сбора за обмен</span>
                        <cInput
                                :class="{ 'form-group--error': $v.feesParam.size_fees_exchange.$error }"
                                v-model.trim="feesParam.size_fees_exchange"
                                :inputMask="'#############'"
                                inputPadding="9px 10px"
                        ></cInput>
                        <div class="error-text" v-if="$v.feesParam.size_fees_exchange.$error">Заполните поле</div>
                    </div>
                    <div class="paragraph pl-2 pr-2">
                        <span class="standard-text">Минимальный сбор за обмен</span>
                        <cInput
                                :class="{ 'form-group--error': $v.feesParam.min_fees_exchange.$error }"
                                v-model.trim="$v.feesParam.min_fees_exchange.$model"
                                :inputMask="'#############'"
                                inputPadding="9px 10px"
                        ></cInput>
                        <div class="error-text" v-if="$v.feesParam.min_fees_exchange.$error">Заполните поле</div>
                    </div>
                    <div class="paragraph pl-2 pr-2">
                        <span class="standard-text">Максимальный сбор за обмен</span>
                        <cInput
                                :class="{ 'form-group--error': $v.feesParam.max_fees_exchange.$error }"
                                v-model.trim="$v.feesParam.max_fees_exchange.$model"
                                :inputMask="'#############'"
                                inputPadding="9px 10px"
                        ></cInput>
                        <div class="error-text" v-if="$v.feesParam.max_fees_exchange.$error">Заполните поле</div>
                    </div>
                </div>
                <div class="paragraph pl-2 pr-2">
                    <span class="standard-text">Тип допустимого отклонения</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.feesParam.type_deviation.$error }"
                            v-model.trim="$v.feesParam.type_deviation.$model"
                            :itemText="'text'"
                            :itemValue="'value'"
                            :selectItems="typeTolerance"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.feesParam.type_deviation.$error">Выберите тип допустимого отклонения</div>
                </div>
                <div class="paragraph pl-2 pr-2">
                    <span class="standard-text">Величина отклонения</span>
                    <cInput
                            :class="{ 'form-group--error': $v.feesParam.size_deviation.$error }"
                            v-model.trim="feesParam.size_deviation"
                            :inputMask="'#############'"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.feesParam.size_deviation.$error">Заполните поле</div>
                </div>
                <div class="paragraph pl-2 pr-2">
                    <span class="standard-text">Невозвратность</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.feesParam.non_return.$error }"
                            v-model.trim="$v.feesParam.non_return.$model"
                            :itemText="'text'"
                            :itemValue="'value'"
                            :selectItems="Irretrievability"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.feesParam.non_return.$error">Выберите ответ</div>
                </div>
            </div>
        </div>
        <div class="add-fees-btn pt-3">
            <cButton
                    @click.native="submit()"
                    :buttonValue="(this.$route.params.fees_id) ? 'сохранить' : 'добавить'"
            ></cButton>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'

    import * as types from "@/stores/modules/controls/types";
    import {validations} from '@/validations/addFeesCompany.js'

    import cDate from "@/components/base_components/cDate";
    import cSelectInput from "@/components/base_components/cSelectInput";
    import cInput from "@/components/base_components/cInput";
    import cButton from "@/components/base_components/cButton";

    export default {
        name: "addFees",
        components: {
            cDate,
            cSelectInput,
            cInput,
            cButton
        },
        data() {
            return {
                getCitiesDeparture: [],
                getCitiesArrival: [],
                currentDate: '',
                minDateLimitAction: '',
                minDateLimitDeparture: '',
                airlines: [],
                feesParamValue: "fees-param",
                typeFlight: [
                    {text: "Любой", value: 0},
                    {text: "OW", value: 1},
                    {text: "RT", value: 2}
                ],
                baby_charge: [
                    {text: "Да", value: 1},
                    {text: "Нет", value: 0},
                ],
                typeStatementFee: [
                    {text: "FIX", value: 1},
                    {text: "%", value: 0}
                ],
                typeRefundCharge: [
                    {text: "FIX", value: 1},
                    {text: "%", value: 0}
                ],
                typeExchangeFee: [
                    {text: "FIX", value: 1},
                    {text: "%", value: 0}
                ],
                typeTolerance: [
                    {text: "FIX", value: 1},
                    {text: "%", value: 0}
                ],
                Irretrievability: [
                    {text: "Да", value: 1},
                    {text: "Нет", value: 0},
                ],
                feesParam: {
                    airlines_id: "",
                    company_id: 1,
                    fare_families_id: "",
                    type_flight: "",
                    infant: "",
                    country_id_departure: "",
                    country_id_arrival: "",
                    departure_city: "",
                    arrival_city: "",
                    type_fees_inscribed: "",
                    type_fees_charge: "",
                    type_fees_exchange: "",
                    type_deviation: "",
                    types_fees_id: 1,
                    non_return: "",
                    period_begin_at: '',
                    period_end_at: '',
                    date_start: '',
                    date_stop: '',
                    size_fees_inscribed: '',
                    min_fees_inscribed: '',
                    max_fees_inscribed: '',
                    size_fees_charge: '',
                    min_fees_charge: '',
                    max_fees_charge: '',
                    size_fees_exchange: '',
                    min_fees_exchange: '',
                    max_fees_exchange: '',
                    size_deviation: '',
                },
                companyId: 1
            }
        },
        validations: validations,
        beforeMount() {
            this.$store.dispatch("controls/" + types.A_FEES)
        },
        mounted() {
            console.log(this.$route.params);
            this.companyId = this.$route.params.id
            let day = moment().format('L');
            let res = day.split("/").reverse();
            day = [res[0],res[2],res[1]]
            res = day.join('-');
            this.currentDate = res;

            if (this.getAirlines.length > 1 && !this.$route.params.fees_id) {
                this.feesParam.airlines_id = 3
            }
            if (this.getFarefamilies.length > 1 && !this.$route.params.fees_id) {
                this.feesParam.fare_families_id = 0
            }

            if(this.$route.params.fees_id) {
                let data = this.$store.getters['controls/getFeesById'](this.$route.params.fees_id);
                this.feesParam.airlines_id = data.airlines_id;
                this.feesParam.company_id = data.company_id;
                this.feesParam.fare_families_id = data.fare_families_id;
                this.feesParam.type_flight = data.type_flight;
                this.feesParam.infant = (data.infant) ? 1 : 0;
                this.feesParam.country_id_departure = data.country_id_departure;
                this.feesParam.country_id_arrival = data.country_id_arrival;
                this.feesParam.departure_city = data.departure_city;
                this.feesParam.arrival_city = data.arrival_city;
                this.feesParam.type_fees_inscribed = data.type_fees_inscribed;
                this.feesParam.type_fees_charge = data.type_fees_charge;
                this.feesParam.type_fees_exchange = data.type_fees_exchange;
                this.feesParam.type_deviation = data.type_deviation;
                this.feesParam.types_fees_id = data.types_fees_id;
                this.feesParam.non_return = (data.non_return) ? 1 : 0;
                this.feesParam.period_begin_at = data.period_begin_at;
                this.feesParam.period_end_at = data.period_end_at;
                this.feesParam.date_start = data.date_start;
                this.feesParam.date_stop = data.date_stop;
                this.feesParam.size_fees_inscribed = data.size_fees_inscribed;
                this.feesParam.min_fees_inscribed = data.min_fees_inscribed;
                this.feesParam.max_fees_inscribed = data.max_fees_inscribed;
                this.feesParam.size_fees_charge = data.size_fees_charge;
                this.feesParam.min_fees_charge = data.min_fees_charge;
                this.feesParam.max_fees_charge = data.max_fees_charge;
                this.feesParam.size_fees_exchange = data.size_fees_exchange;
                this.feesParam.min_fees_exchange = data.min_fees_exchange;
                this.feesParam.max_fees_exchange = data.max_fees_exchange;
                this.feesParam.size_deviation = data.size_deviation
            }
        },
        computed: {
            getAirlines(){
                if(this.$store.getters['controls/getfeesData'] != null) {
                    let any = {
                        short_aviacompany_name_ru: 'Любой',
                        id: 3
                    };
                    let airlines = this.$store.getters['controls/getfeesData'].airlines;
                    if (airlines.length == 1){
                        return airlines
                    }
                    airlines.push(any)
                    return airlines;
                }
                return [];
            },
            getFarefamilies(){
                if(this.$store.getters['controls/getfeesData'] != null) {
                    let any = {
                        name_ru: 'Любой',
                        id: 0
                    };
                    let farefamilies = [];
                    this.$store.getters['controls/getfeesData'].farefamilies.filter( val => {
                        if (val.id == 1 || val.id == 2) {
                            farefamilies.push(val)
                        }
                    })
                    if (farefamilies.length == 1){
                        return farefamilies
                    }
                    farefamilies.push(any)
                    return farefamilies;
                }
                else {
                    return [];
                }
            },
            getCountries(){
                if(this.$store.getters['controls/getfeesData'] != null) {
                    return this.$store.getters['controls/getfeesData'].countries;
                } else {
                    return [];
                }
            },
            getCities(){
                if(this.$store.getters['controls/getfeesData'] != null) {
                    return this.$store.getters['controls/getfeesData'].cities;
                }
                return [];
            }
        },
        methods: {
            getDepartureCity() {
                let id = this.feesParam.country_id_departure;
                let name = '';
                this.$store.getters['controls/getfeesData'].countries.filter( val => {
                    if (val.id == id){
                        name = val.name_ru
                    }
                })
                this.$store.dispatch('controls/' + types.A_GET_CITIES, name)
                    .then( result => {
                        this.getCitiesDeparture = []
                        let keys = Object.keys(result.data.data);
                        let names = {};
                        keys.filter( val => {
                            names = {name_ru: result.data.data[val].city.name_ru, id: result.data.data[val].city.id};
                            this.getCitiesDeparture.push(names)
                        })
                    })
            },
            getArrivalCity() {
                let id = this.feesParam.country_id_arrival;
                let name = '';
                this.$store.getters['controls/getfeesData'].countries.filter( val => {
                    if (val.id == id){
                        name = val.name_ru
                    }
                })
                this.$store.dispatch('controls/' + types.A_GET_CITIES, name)
                    .then( result => {
                        this.getCitiesArrival = []
                        let keys = Object.keys(result.data.data);
                        let names = {};
                        keys.filter( val => {
                            names = {name_ru: result.data.data[val].city.name_ru, id: result.data.data[val].city.id};
                            this.getCitiesArrival.push(names)
                        })
                    })
            },
            submit() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    if(this.$route.params.fees_id) {
                        this.feesParam.feeplace_id = this.$route.params.fees_id;
                        this.$store.dispatch("controls/" + types.A_EDIT_FEES, this.feesParam)
                            .then(result => {
                                this.$router.push(`/control/company/${this.companyId}/fees`);
                            });
                    } else {
                        this.$store.dispatch("controls/" + types.A_ADD_FEES, this.feesParam)
                            .then( () => {
                                this.$router.push(`/control/company/${this.companyId}/fees`);
                            })
                    }
                }
            },
        },
        watch: {
            getAirlines(val) {
                if (val.length == 1){
                    this.feesParam.airlines_id = 1
                }
            },
            'feesParam.period_begin_at'(val) {
                this.minDateLimitAction = val
            },
            'feesParam.date_start'(val) {
                this.minDateLimitDeparture = val
            }
        }
    }
</script>

<style lang="scss" scoped>
    .fees-add-content{
        padding-top: 28px;
    }

    .param-values-wrap {
        display: grid;
        grid-template-columns: 115px 115px;
        padding: 15px 0;
    }

    #param, #fees-values {
        display: none;
    }

    .param-label, .fees-values-label {
        height: 30px;
        align-items: center;
        cursor: pointer;
        font-size: 12px;
        font-weight: 600;
        position: relative;
        text-align: center;
        color: #575870;
        margin: 0;
        border-bottom: 1px solid #ccc;
    }

    .param-label::before, .fees-values-label::before {
        content: '';
        display: inline-block;
        position: absolute;
        bottom: -2px;
        width: 0;
        height: 3px;
        background-color: #2cbd6d;
        border-radius: 3px;
        transition: 0.2s;
    }

    .param-label::before {
        right: 0;
    }

    .fees-values-label::before {
        left: 0;
    }

    #param:checked + label::before,
    #fees-values:checked + label::before {
        width: 100%;
        transition: 0.2s;
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
    .select--error{
        /deep/.v-select > .v-input__control > .v-input__slot{
            border-color: red;
            box-shadow: 0 0 2px 0px rgba(255, 0, 0, 0.6);
        }
    }
</style>