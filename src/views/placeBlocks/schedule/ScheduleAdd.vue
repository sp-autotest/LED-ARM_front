<template>
    <div class="schedule-add-content">
        <div class="schedule-add-header">
            <div class="headline">
                <h5>{{($route.params.id) ? 'Редактирование' : 'Добавление'}} расписания</h5>
            </div>
        </div>
        <div class="schedule-param-wrap">
            <div class="paragraph-wrap">
                <div class="paragraph">
                    <span class="standard-text">Номер рейса</span>
                    <cInput
                            :class="{ 'form-group--error': $v.sendParam.flights.$error }"
                            v-model.trim="$v.sendParam.flights.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.sendParam.flights.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Откуда</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.sendParam.departure_at.$error }"
                            v-model.trim="$v.sendParam.departure_at.$model"
                            :itemText="'name_ru'"
                            :itemValue="'id'"
                            :selectItems="fromCities"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.sendParam.departure_at.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Куда</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.sendParam.arrival_at.$error }"
                            v-model.trim="$v.sendParam.arrival_at.$model"
                            :itemText="'name_ru'"
                            :itemValue="'id'"
                            :selectItems="toCities"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.sendParam.arrival_at.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Период С</span>
                    <cDate
                            :minDate="currentDate"
                            :class="{ 'date--error': $v.period_begin_at.$error }"
                            v-model.trim="$v.period_begin_at.$model"
                            @dateChangeTwo="period_begin_at = $event"
                    ></cDate>
                    <div class="error-text" v-if="$v.period_begin_at.$error">Выберите дату</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Период По</span>
                    <cDate
                            :currentDayShow="false"
                            :minDate="minDateLimit == '' ? currentDate : minDateLimit"
                            :class="{ 'date--error': $v.period_end_at.$error }"
                            v-model.trim="$v.period_end_at.$model"
                            @dateChangeTwo="period_end_at = $event"
                    ></cDate>
                    <div class="error-text" v-if="$v.period_end_at.$error">Выберите дату</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Время вылета</span>
                    <cInput
                            :class="{ 'form-group--error': $v.sendParam.time_departure_at.$error }"
                            v-model.trim="$v.sendParam.time_departure_at.$model"
                            :inputMask="'##:##'"
                            @input="getTravelTime();timeFormatDeparture()"
                            inputPadding="9px 10px"
                            inputPlaceholder="Время..."
                    ></cInput>
                    <div class="error-text" v-if="$v.sendParam.time_departure_at.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Время прибытия</span>
                    <cInput
                            :class="{ 'form-group--error': $v.sendParam.time_arrival_at.$error }"
                            v-model.trim="$v.sendParam.time_arrival_at.$model"
                            :inputMask="'##:##'"
                            @timeChange="sendParam.time_arrival_at = $event"
                            @input="getTravelTime();timeFormatArrival()"
                            inputPadding="9px 10px"
                            inputPlaceholder="Время..."
                    ></cInput>
                    <div class="error-text" v-if="$v.sendParam.time_arrival_at.$error">Заполните поле</div>
                </div>
            </div>
            <div class="paragraph-wrap">
                <div class="paragraph">
                    <span class="standard-text">Следующий день</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.sendParam.next_day.$error }"
                            v-model.trim="$v.sendParam.next_day.$model"
                            :selectItems="next_day"
                            :itemText="'name'"
                            :itemValue="'value'"
                            @input="getTravelTime()"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.sendParam.next_day.$error">Выберите валюту</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Время в пути</span>
                    <cInput
                            :class="{ 'form-group--error': $v.sendParam.flight_duration.$error }"
                            v-model.trim="$v.sendParam.flight_duration.$model"
                            :inputMask="'##:##'"
                            :disabled="travelTimeDisabled"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.sendParam.flight_duration.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Тип ВС</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.sendParam.bc_types_id.$error }"
                            v-model.trim="$v.sendParam.bc_types_id.$model"
                            :selectItems="getVsType()"
                            :itemText="'text'"
                            :itemValue="'value'"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.sendParam.bc_types_id.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Есть пересадка</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.is_transplantation.$error }"
                            v-model.trim="$v.is_transplantation.$model"
                            :selectItems="transfer"
                            itemText="name"
                            itemValue="value"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.is_transplantation.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Авиакомпания</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.sendParam.airlines_id.$error }"
                            v-model.trim="$v.sendParam.airlines_id.$model"
                            :selectItems="getAirlines()"
                            :itemText="'text'"
                            :itemValue="'value'"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.sendParam.airlines_id.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Дни недели</span>
                    <cDateBtn
                            :dateSelected="true"
                            :itemCount="7"
                            :buttonPadding="'8px 18px 8px 18px'"
                            :itemValue="week"
                            :label="weekText"
                            @change="week = $event"
                    ></cDateBtn>
                </div>
            </div>

            <div v-show="is_transplantation && !this.$route.params.id" class="paragraph row-5">
                <div class="paragraph">
                    <span class="standard-text">Номер рейса второго плеча</span>
                    <cInput
                            :class="{ 'form-group--error': $v.sendParamTransplantation.flights.$error }"
                            v-model.trim="$v.sendParamTransplantation.flights.$model"
                            inputPadding="9px 10px"
                            selectPlaceholder="Выбрать..."
                    ></cInput>
                    <div class="error-text" v-if="$v.sendParamTransplantation.flights.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Авиакомпания пересадки</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.sendParamTransplantation.airlines_id.$error }"
                            v-model.trim="$v.sendParamTransplantation.airlines_id.$model"
                            :itemText="'text'"
                            :itemValue="'value'"
                            :selectItems="getAirlines()"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.sendParamTransplantation.airlines_id.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Тип ВС второго плеча</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.sendParamTransplantation.bc_types_id.$error }"
                            v-model.trim="$v.sendParamTransplantation.bc_types_id.$model"
                            :selectItems="getVsType()"
                            :itemText="'text'"
                            :itemValue="'value'"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.sendParamTransplantation.bc_types_id.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Откуда</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.sendParamTransplantation.departure_at.$error }"
                            v-model.trim="$v.sendParamTransplantation.departure_at.$model"
                            :itemText="'name_ru'"
                            :itemValue="'id'"
                            :selectItems="fromCities"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.sendParamTransplantation.departure_at.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Куда</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.sendParamTransplantation.arrival_at.$error }"
                            v-model.trim="$v.sendParamTransplantation.arrival_at.$model"
                            :itemText="'name_ru'"
                            :itemValue="'id'"
                            :selectItems="toCities"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.sendParamTransplantation.arrival_at.$error">Заполните поле</div>
                </div>
            </div>
            <div v-show="is_transplantation && !this.$route.params.id" class="paragraph row-5">
                <div class="paragraph">
                    <span class="standard-text">Время прилета в пункт пересадки</span>
                    <cInput
                            :class="{ 'form-group--error': $v.sendParamTransplantation.time_departure_at.$error }"
                            v-model.trim="$v.sendParamTransplantation.time_departure_at.$model"
                            :inputMask="'##:##'"
                            @timeChange="sendParamTransplantation.time_departure_at = $event"
                            @input="getTravelTime(); timeFormatDepartureSecond(); getTravelTime('second')"
                            inputPadding="9px 10px"
                            inputPlaceholder="Время..."
                    ></cInput>
                    <div class="error-text" v-if="$v.sendParamTransplantation.time_departure_at.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Время вылета из пункта пересадки</span>
                    <cInput
                            :class="{ 'form-group--error': $v.sendParamTransplantation.time_arrival_at.$error }"
                            v-model.trim="$v.sendParamTransplantation.time_arrival_at.$model"
                            :inputMask="'##:##'"
                            @timeChange="sendParamTransplantation.time_arrival_at = $event"
                            @input="getTravelTime(); timeFormatArrivalSecond(); getTravelTime('second')"
                            inputPadding="9px 10px"
                            inputPlaceholder="Время..."
                    ></cInput>
                    <div class="error-text" v-if="$v.sendParamTransplantation.time_arrival_at.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Следующий день</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.sendParamTransplantation.next_day.$error }"
                            v-model.trim="$v.sendParamTransplantation.next_day.$model"
                            @input="getTravelTime('second')"
                            :selectItems="next_day"
                            :itemText="'name'"
                            :itemValue="'value'"
                            :inputDisabled="next_day_second"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.sendParamTransplantation.next_day.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Время в пути второго плеча</span>
                    <cInput
                            :class="{ 'form-group--error': $v.sendParamTransplantation.flight_duration.$error }"
                            v-model="$v.sendParamTransplantation.flight_duration.$model"
                            :disabled="travelTimeDisabledSecond"
                            :inputMask="'##:##'"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.sendParamTransplantation.flight_duration.$error">Заполните поле</div>
                </div>
            </div>
            <div class="paragraph">
                <div class="add-schedule-btn">
                    <cButton
                            @click="submit()"
                            :buttonValue="(this.$route.params.id) ? 'сохранить' : 'добавить'"
                    ></cButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'

    import { required, requiredIf } from 'vuelidate/lib/validators'

    import cDate from "@/components/base_components/cDate";
    import cSelectInput from "@/components/base_components/cSelectInput";
    import cInput from "@/components/base_components/cInput";
    import cButton from "@/components/base_components/cButton";
    import cDateBtn from "@/components/base_components/cDateBtn";
    import * as types from "@/stores/modules/blocks/types";
    import * as feesTypes from "@/stores/modules/controls/types";

    export default {
        name: "ScheduleAdd",
        components: {
            cDate,
            cSelectInput,
            cInput,
            cButton,
            cDateBtn
        },
        data() {
            return {
                currentDate: '',
                minDateLimit: '',
                valide_second: 0,
                fromCities: [],
                toCities: [],
                transplantationCities: [],
                airlines: [],
                dataSchedule: '',
                week: [],
                weekText: ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'],
                selectedTransfer: '',
                transfer: [
                    {
                        name: 'Да',
                        value: true
                    },
                    {
                        name: 'Нет',
                        value: false
                    }
                ],
                next_day: [
                    {
                        name: 'Да',
                        value: true
                    },
                    {
                        name: 'Нет',
                        value: false
                    }
                ],
                is_transplantation: {
                    name: "Нет",
                    value: false
                },
                period_begin_at: '',
                period_end_at: '',
                sendParam: {
                    flight_duration: '',
                    time_departure_at: '',
                    time_arrival_at: '',
                    next_day: '',
                    flights: '',
                    bc_types_id: '',
                    airlines_id: '',
                    departure_at: '',
                    arrival_at: '',
                    leg: 0
                },
                sendParamTransplantation: {
                    flight_duration: '',
                    flights: '',
                    airlines_id: '',
                    bc_types_id: '',
                    next_day: '',
                    time_departure_at: '',
                    time_arrival_at: '',
                    arrival_at: '',
                    departure_at: '',
                    leg: 1
                }
            }
        },
        validations() {
            return {
                period_end_at: {
                    required
                },
                period_begin_at: {
                    required
                },
                is_transplantation: {
                    required
                },
                sendParam: {
                    flight_duration: {
                        required
                    },
                    time_departure_at: {
                        required
                    },
                    time_arrival_at: {
                        required
                    },
                    next_day: {
                        required
                    },
                    flights: {
                        required
                    },
                    bc_types_id: {
                        required
                    },
                    airlines_id: {
                        required
                    },
                    departure_at: {
                        required
                    },
                    arrival_at: {
                        required
                    },
                },
                sendParamTransplantation: {
                    flights: {
                        required: requiredIf( () => {
                            if(this.valide_second != 'valid' || this.$route.params.id) {
                                return false
                            } else {
                                return true
                            }
                        })
                    },
                    airlines_id: {
                        required: requiredIf( () => {
                            if(this.valide_second != 'valid' || this.$route.params.id) {
                                return false
                            } else {
                                return true
                            }
                        })
                    },
                    arrival_at: {
                        required: requiredIf( () => {
                            if(this.valide_second != 'valid' || this.$route.params.id) {
                                return false
                            } else {
                                return true
                            }
                        })
                    },
                    departure_at: {
                        required: requiredIf( () => {
                            if(this.valide_second != 'valid' || this.$route.params.id) {
                                return false
                            } else {
                                return true
                            }
                        })
                    },
                    bc_types_id: {
                        required: requiredIf( () => {
                            if(this.valide_second != 'valid' || this.$route.params.id) {
                                return false
                            } else {
                                return true
                            }
                        })
                    },
                    next_day: {
                        required: requiredIf( () => {
                            if(this.valide_second != 'valid' || this.$route.params.id) {
                                return false
                            } else {
                                return true
                            }
                        })
                    },
                    time_departure_at: {
                        required: requiredIf( () => {
                            if(this.valide_second != 'valid' || this.$route.params.id) {
                                return false
                            } else {
                                return true
                            }
                        })
                    },
                    time_arrival_at: {
                        required: requiredIf( () => {
                            if(this.valide_second != 'valid' || this.$route.params.id) {
                                return false
                            } else {
                                return true
                            }
                        })
                    },
                    flight_duration: {
                        required: requiredIf( () => {
                            if(this.valide_second != 'valid' || this.$route.params.id) {
                                return false
                            } else {
                                return true
                            }
                        })
                    },
                }
            }
        },
        mounted() {
            this.is_transplantation = false;
            this.sendParam.next_day = false;
            let day = moment().format('L');
            let res = day.split("/").reverse();
            day = [res[0],res[2],res[1]]
            res = day.join('-');
            this.currentDate = res;

            if(this.$route.params.id) {
                let data = this.$store.getters["blocks/getScheduleById"](this.$route.params.id);
                // console.log(data)
                this.sendParam.flights = data.flights;
                this.sendParam.departure_at = data.departure_at;
                this.sendParam.arrival_at = data.arrival_at;
                this.period_begin_at = data.period_begin_at;
                this.period_end_at = data.period_end_at;
                this.sendParam.time_departure_at = data.time_departure_at;
                this.sendParam.time_arrival_at = data.time_arrival_at;
                this.sendParam.next_day = data.next_day;
                this.sendParam.bc_types_id = data.bc_types_id;
                this.is_transplantation = data.is_transplantation;
                this.sendParam.airlines_id = data.airlines_id;

                setTimeout( () =>{
                    this.sendParam.flight_duration = data.flight_duration;
                },1000)

                // if (data.is_transplantation){
                //     this.sendParamTransplantation.flights = data.flights_second;
                //     this.sendParamTransplantation.airlines_id = data.airport_transplantation;
                //     this.sendParamTransplantation.bc_types_id = data.bc_types_id_second;
                //     this.sendParamTransplantation.next_day = data.next_day_second;
                //     this.sendParamTransplantation.time_departure_at = data.time_departure_at_second;
                //     this.sendParamTransplantation.time_arrival_at = data.time_arrival_at_second;
                // }
                if (data.monday)
                    this.week.push(1);
                if (data.tuesday)
                    this.week.push(2);
                if (data.wednesday)
                    this.week.push(3);
                if (data.thursday)
                    this.week.push(4);
                if (data.friday)
                    this.week.push(5);
                if (data.saturday)
                    this.week.push(6);
                if (data.sunday)
                    this.week.push(7);
            }
            this.$store.dispatch("blocks/" + types.A_BLOCKS)
                .then(res => {
                    this.dataSchedule = res;
                });
            this.$store.dispatch("controls/" + feesTypes.A_FEES)
                .then(res => {
                    this.airlines.push(res);
                    let airports = res.airports;
                    for ( let city of airports){
                        this.fromCities.push(city);
                        this.toCities.push(city);
                        this.transplantationCities.push(city);
                    }
                });
        },
        computed: {
            travelTimeDisabled() {
                if (this.sendParam.time_departure_at.length == 5 && this.sendParam.time_arrival_at.length == 5) {
                    return false
                }else {
                    return true
                }
            },
            travelTimeDisabledSecond() {
              if(this.sendParamTransplantation.time_departure_at && this.sendParamTransplantation.time_departure_at) {
                if (this.sendParamTransplantation.time_departure_at.length == 5 && this.sendParamTransplantation.time_arrival_at.length == 5) {
                  return false
                }else {
                  return true
                }
              } else {
                return true
              }
            },
            next_day_second() {
                if (this.sendParamTransplantation.time_arrival_at && this.sendParamTransplantation.time_departure_at) {
                    return false
                } else {
                    return true
                }
            },
            getShedulItems(){
                let array = [];
                this.getSheduls.filter(function (val, key) {
                    array.push(val);
                    array[key]['textName'] = val.period_begin_at + ' / ' + val.period_end_at;
                });
                return array;
            },
            getSheduls() {
                if(this.$store.getters["blocks/getBlocks"] == null) {
                    // this.$store.dispatch("blocks/" + types.A_BLOCKS)
                    //     .then(res => {
                            return this.dataSchedule.schedules;
                        // });
                } else {
                    return this.$store.getters["blocks/getBlocks"];
                }
            }
        },
        methods: {
            timeFormatDeparture() {
                let time = this.sendParam.time_departure_at.split('')
                if (time.length >= 2 && (parseInt(time[0] + time[1])) > 23){
                    time[0] = 2;
                    time[1] = 3;
                }
                if (time.length == 5 && (parseInt(time[3] + time[4])) > 59){
                    time[3] = 5;
                    time[4] = 9;
                }
                this.sendParam.time_departure_at = time.join('');
            },
            timeFormatArrival() {
                let time = this.sendParam.time_arrival_at.split('')
                if (time.length >= 2 && (parseInt(time[0] + time[1])) > 23){
                    time[0] = 2;
                    time[1] = 3;
                }
                if (time.length == 5 && (parseInt(time[3] + time[4])) > 59){
                    time[3] = 5;
                    time[4] = 9;
                }
                this.sendParam.time_arrival_at = time.join('');
            },
            timeFormatArrivalSecond() {
                let time = this.sendParamTransplantation.time_arrival_at.split('')
                if (time.length >= 2 && (parseInt(time[0] + time[1])) > 23){
                    time[0] = 2;
                    time[1] = 3;
                }
                if (time.length == 5 && (parseInt(time[3] + time[4])) > 59){
                    time[3] = 5;
                    time[4] = 9;
                }
                this.sendParamTransplantation.time_arrival_at = time.join('');
            },
            timeFormatDepartureSecond() {
                if(this.sendParamTransplantation.time_departure_at) {
                  let time = this.sendParamTransplantation.time_departure_at.split('')
                  if (time.length >= 2 && (parseInt(time[0] + time[1])) > 23){
                    time[0] = 2;
                    time[1] = 3;
                  }
                  if (time.length == 5 && (parseInt(time[3] + time[4])) > 59){
                    time[3] = 5;
                    time[4] = 9;
                  }
                  this.sendParamTransplantation.time_departure_at = time.join('');
                } else {
                  this.sendParamTransplantation.time_departure_at = "";
                }
            },
            getAirlines() {
                let airlines = [];
                this.$store.getters['blocks/getAirlines'].airlines.filter((val) => {
                    airlines.push({
                        text: val.short_aviacompany_name_ru,
                        value: val.id
                    })
                });
                return airlines;
            },
            getVsType() {
                let vs = [];
                if (this.dataSchedule) {
                    this.dataSchedule.bc_types.filter((val) => {
                        vs.push({
                            text: val.name_ru,
                            value: val.id
                        })
                    });
                }
                return vs;
            },
            getTravelTime(text) {
                if(!this.sendParam.time_departure_at) {
                  this.sendParam.time_departure_at = '';
                }
                if(!this.sendParamTransplantation.time_arrival_at) {
                  this.sendParamTransplantation.time_arrival_at = '';
                }
                let hours = 24;
                let minute = 60;
                let timeOne = (!text) ? this.sendParam.time_departure_at.split(':') : this.sendParamTransplantation.time_arrival_at.split(':');
                let timeTwo = this.sendParam.time_arrival_at.split(':');
                let timeHours = (timeTwo[0] - timeOne[0]);
                let timeMinutes = (timeTwo[1] - timeOne[1]);
                if (timeHours < 0) {
                    if (timeMinutes < 0){
                        timeHours -= 1;
                        timeMinutes = (minute + timeMinutes);
                    }
                    let newTime = [];
                    let time = ((hours + timeHours) +""+ timeMinutes).split('');
                    if ((hours + timeHours) < 10 && timeMinutes < 10) {
                        time.unshift('0');
                        time.unshift('0');
                        newTime = [time[0],time[2],":",time[1],time[3]];
                        if (text == 'second') {
                            this.sendParamTransplantation.flight_duration = newTime.join('');
                        }else {
                            this.sendParam.flight_duration = newTime.join('');
                        }
                        return;
                    }else if ((hours + timeHours) < 10 && timeMinutes >= 10) {
                        time.unshift('0');
                        newTime = [time[0],time[1],":",time[2],time[3]]
                        if (text == 'second') {
                            this.sendParamTransplantation.flight_duration = newTime.join('');
                        }else {
                            this.sendParam.flight_duration = newTime.join('');
                        }
                        return;
                    }
                    if (time.length == 3) {
                        time.unshift('0');
                        newTime = [time[1],time[2],":",time[0],time[3]]
                    }else {
                        newTime = [time[0],time[1],":",time[2],time[3]]
                    }
                    if (text == 'second') {
                        this.sendParamTransplantation.flight_duration = newTime.join('');
                    }else {
                        this.sendParam.flight_duration = newTime.join('');
                    }
                }else if (timeHours == 0 && timeMinutes < 0) {
                    let newTime = [];
                    let time = ("23"+ (60 + timeMinutes)).split('');
                    if (time.length == 3) {
                        time.unshift('0');
                        newTime = [time[1],time[2],":",time[0],time[3]]
                    }else {
                        newTime = [time[0],time[1],":",time[2],time[3]]
                    }
                    if (text == 'second') {
                        this.sendParamTransplantation.flight_duration = newTime.join('');
                    }else {
                        this.sendParam.flight_duration = newTime.join('');
                    }
                } else {
                    if (timeMinutes < 0){
                        timeHours -= 1;
                        timeMinutes = (minute + timeMinutes);
                    }
                    let newTime = [];
                    let time = (timeHours +""+ timeMinutes).split('');
                    if (time.length == 3 && (parseInt(timeTwo[1]) == parseInt(timeOne[1]))) {
                        time.push('0');
                        newTime = [time[0],time[1],":",time[2],time[3]]
                    }else if (time.length == 3) {
                        time.unshift('0');
                        newTime = [time[0],time[1],":",time[2],time[3]]
                    }else if (time.length == 2) {
                        time.unshift('0');
                        time.unshift('0');
                        newTime = [time[0],time[2],":",time[1],time[3]]
                    }else if (time.length == 1) {
                        time.unshift('0');
                        time.unshift('0');
                        time.unshift('0');
                        newTime = [time[0],time[1],":",time[2],time[3]]
                    }else {
                        newTime = [time[0],time[1],":",time[2],time[3]]
                    }
                    if (text == 'second') {
                        if (this.sendParamTransplantation.next_day) {
                            newTime[0] = (parseInt(newTime[1]) + 4) >= 10 ? parseInt(newTime[0]) + 3 : parseInt(newTime[0]) + 2;
                            newTime[1] = (parseInt(newTime[1]) + 4) >= 10 ? parseInt(newTime[1]) - 6 : parseInt(newTime[1]) + 4;
                        }
                        this.sendParamTransplantation.flight_duration = newTime.join('');
                    }else {
                        if (this.sendParam.next_day) {
                            newTime[0] = (parseInt(newTime[1]) + 4) >= 10 ? parseInt(newTime[0]) + 3 : parseInt(newTime[0]) + 2;
                            newTime[1] = (parseInt(newTime[1]) + 4) >= 10 ? parseInt(newTime[1]) - 6 : parseInt(newTime[1]) + 4;
                        }
                        this.sendParam.flight_duration = newTime.join('');
                    }
                }
                let time = this.sendParam.flight_duration.split(':');
                time = (time[0]*time[1]);
                if (time != time){
                    this.sendParam.flight_duration = "00:00"
                }
            },
            submit() {
                this.$v.$touch();
                let send = {};
                if(this.is_transplantation && !this.$route.params.id) {
                    this.sendParam.leg = 1;
                    this.sendParamTransplantation.leg = 2;
                    send = {...send, ...{segments: [this.sendParam, this.sendParamTransplantation]}}
                }else{
                    this.sendParam.leg = 0;
                    send = {...send, ...{segments: [this.sendParam]}};
                }
                let week = this.week;
                // let time = this.travelTime;
                send = {...send, ...{monday: false}};
                send = {...send, ...{tuesday: false}};
                send = {...send, ...{wednesday: false}};
                send = {...send, ...{thursday: false}};
                send = {...send, ...{friday: false}};
                send = {...send, ...{saturday: false}};
                send = {...send, ...{sunday: false}};
                send = {...send, ...{is_transplantation: this.is_transplantation}};
                send = {...send, ...{period_begin_at: this.period_begin_at}};
                send = {...send, ...{period_end_at: this.period_end_at}};
                week.filter((val) => {
                    if (val == 1)
                        send.monday = true;
                    if (val == 2)
                        send.tuesday = true;
                    if (val == 3)
                        send.wednesday = true;
                    if (val == 4)
                        send.thursday = true;
                    if (val == 5)
                        send.friday = true;
                    if (val == 6)
                        send.saturday = true;
                    if (val == 7)
                        send.sunday = true;
                });
                if (!this.$v.$invalid) {
                    if(this.$route.params.id) {
                        send = { ...send, ...{schedule_id: this.$route.params.id}}
                        this.$store.dispatch("blocks/" + types.A_EDIT_SCHEDULE, send)
                            .then(res => {
                                this.$router.push("/schedule");
                                return res;
                            });
                    } else {
                        this.$store.dispatch("blocks/" + types.A_ADD_SCHEDULE, send)
                            .then(res => {
                                return res;
                            });
                        this.$router.push("/schedule");
                    }
                }
            }
        },
        watch: {
            period_begin_at(val) {
                this.minDateLimit = val
            },
            is_transplantation(val) {
                if (val && !this.$route.params.id) {
                    this.valide_second = 'valid'
                } else {
                    this.valide_second = 'invalid'
                }
            },
            'sendParam.time_arrival_at'(val) {
                if (val) {
                    this.getTravelTime();
                }
            },
            'sendParam.time_departure_at'(val) {
                if (val) {
                    this.getTravelTime();
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .schedule-add-content{
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

    .schedule-param-wrap{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 33px;
        grid-row-gap: 20px;
    }

    .paragraph-wrap{
        display: grid;
        grid-template-rows: repeat(7, 1fr);
    }

    .paragraph{
        position: relative;
    }

    /deep/.v-menu {
        display: none;
    }
    /deep/.c-input input{
        width: 100%;
    }

    .row-5{
        display: grid;
        grid-template-rows: repeat(5, 1fr);
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

    .date--error{
        /deep/.v-input{
            border-color: red;
            box-shadow: 0 0 2px 0px rgba(255, 0, 0, 0.6);
        }
        /deep/.date-format{
            left: unset;
            right: 0;
        }
    }

    .btn--error{
        border-color: red;
        box-shadow: 0 0 2px 0px rgba(255, 0, 0, 0.6);
    }
</style>
