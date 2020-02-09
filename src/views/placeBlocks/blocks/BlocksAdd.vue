<template>
    <div class="block-add-content">
        <div class="block-add-header">
            <div class="headline">
                <h5>{{(this.$route.params.id) ? 'Редактирование блока' : 'Добавление блока'}}</h5>
            </div>
        </div>
        <div class="block-param-wrap">
            <div class="paragraph-wrap">
                <div class="paragraph">
                    <span class="standard-text">Расписание</span>
                    <cAutocomplete
                            :class="{ 'select--error': $v.sendParam.schedule_id.$error }"
                            v-model.trim="$v.sendParam.schedule_id.$model"
                            :inputItems="getShedulItems"
                            :itemText="'textName'"
                            :itemValue="'id'"
                            @input="getWeek(sendParam.schedule_id)"
                            selectPlaceholder="Выбрать..."
                    >
                    </cAutocomplete>
                    <div class="error-text" v-if="$v.sendParam.schedule_id.$error">Выберите расписание</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Класс обслуживания</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.sendParam.fare_families_id.$error }"
                            v-model.trim="$v.sendParam.fare_families_id.$model"
                            :selectItems="getFareFamilies"
                            :itemText="'text'"
                            :itemValue="'value'"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.sendParam.fare_families_id.$error">Выберите класс</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Период С</span>
                    <cDate
                            :minDate="currentDate"
                            :class="{ 'date--error': $v.sendParam.period_begin_at.$error }"
                            v-model.trim="$v.sendParam.period_begin_at.$model"
                            @dateChangeTwo="sendParam.period_begin_at = $event"
                    ></cDate>
                    <div class="error-text" v-if="$v.sendParam.period_begin_at.$error">Выберите дату</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Период По</span>
                    <cDate
                            :currentDayShow="false"
                            :minDate="minDateLimit == '' ? currentDate : minDateLimit"
                            :class="{ 'date--error': $v.sendParam.period_end_at.$error }"
                            v-model.trim="$v.sendParam.period_end_at.$model"
                            @dateChangeTwo="sendParam.period_end_at = $event"
                    ></cDate>
                    <div class="error-text" v-if="$v.sendParam.period_end_at.$error">Выберите дату</div>
                </div>
                <div class="paragraph">
                        <span class="standard-text">Дни недели</span>
                    <div class="week-list">
                        <cWeekBtn
                                :label="weekText[0]"
                                :itemValue="monday"
                                :borderLeftRad="'4px'"
                                :borderRight="false"
                        ></cWeekBtn>
                        <cWeekBtn
                                :label="weekText[1]"
                                :itemValue="tuesday"
                                :borderRight="false"
                        ></cWeekBtn>
                        <cWeekBtn
                                :label="weekText[2]"
                                :itemValue="wednesday"
                                :borderRight="false"
                        ></cWeekBtn>
                        <cWeekBtn
                                :label="weekText[3]"
                                :itemValue="thursday"
                                :borderRight="false"
                        ></cWeekBtn>
                        <cWeekBtn
                                :label="weekText[4]"
                                :itemValue="friday"
                                :borderRight="false"
                        ></cWeekBtn>
                        <cWeekBtn
                                :label="weekText[5]"
                                :itemValue="saturday"
                                :borderRight="false"
                        ></cWeekBtn>
                        <cWeekBtn
                                :label="weekText[6]"
                                :itemValue="sunday"
                                :borderRightRad="'4px'"
                        ></cWeekBtn>
                    </div>
                </div>
                <div class="paragraph pt-2">
                    <cSelect
                            :inputData="sendParam.babies_places"
                            @selected="sendParam.babies_places = $event"
                            inputLabel="Младенец при продаже без места"
                    ></cSelect>
                </div>
            </div>
            <div class="paragraph-wrap">
                <div class="paragraph">
                    <span class="standard-text">Количество мест</span>
                    <cInput
                            :class="{ 'form-group--error': $v.sendParam.count_places.$error }"
                            v-model.trim="$v.sendParam.count_places.$model"
                            :inputMask="'#############'"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.sendParam.count_places.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Стоимость взрослый OW</span>
                    <cInput
                            :class="{ 'form-group--error': $v.sendParam.ow.$error }"
                            v-model.trim="$v.sendParam.ow.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.sendParam.ow.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Стоимость инфант OW</span>
                    <cInput
                            :class="{ 'form-group--error': $v.sendParam.infant_ow.$error }"
                            v-model.trim="$v.sendParam.infant_ow.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.sendParam.infant_ow.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Стоимость взрослый RT</span>
                    <cInput
                            :class="{ 'form-group--error': $v.sendParam.rt.$error }"
                            v-model.trim="$v.sendParam.rt.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.sendParam.rt.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Стоимость инфант RT</span>
                    <cInput
                            :class="{ 'form-group--error': $v.sendParam.infant_rt.$error }"
                            v-model.trim="$v.sendParam.infant_rt.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.sendParam.infant_rt.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Валюта</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.sendParam.currency_id.$error }"
                            v-model.trim="$v.sendParam.currency_id.$model"
                            :itemText="'code_literal_iso_4217'"
                            :itemValue="'id'"
                            :selectItems="blockParam.currency_id"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.sendParam.currency_id.$error">Выберите валюту</div>
                </div>
            </div>
            <div class="paragraph">
                <div class="add-block-btn">
                    <cButton
                            @click.native="submit()"
                            :buttonValue="($route.params.id) ? 'сохранить' : 'добавить'"
                    ></cButton>
                    <cButton
                            v-if="$route.params.id"
                            @click.native="generateBlock()"
                            :buttonValue="'Сгенерировать'"
                            :buttonColor="'#FF8227'"
                    ></cButton>
                </div>
            </div>
        </div>
        <div v-if="$route.params.id" class="flights-list-wrap">
            <flightsList></flightsList>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'

    import { required } from 'vuelidate/lib/validators'

    import cDate from "@/components/base_components/cDate";
    import cSelectInput from "@/components/base_components/cSelectInput";
    import cSelect from "@/components/base_components/cSelect";
    import cAutocomplete from "@/components/base_components/cAutocomplete";
    import cInput from "@/components/base_components/cInput";
    import cButton from "@/components/base_components/cButton";
    import cWeekBtn from "@/components/base_components/cWeekBtn";

    import flightsList from "@/views/placeBlocks/blocks/FlightsList";

    import * as types from "@/stores/modules/blocks/types";
    import * as feesTypes from "@/stores/modules/controls/types";

    export default {
        name: "BlocksAdd",
        components: {
            cDate,
            cSelectInput,
            cSelect,
            cInput,
            cAutocomplete,
            cButton,
            cWeekBtn,
            flightsList
        },
        data() {
            return {
                farefamilies: '',
                currentDate: '',
                minDateLimit: '',
                fromCities: [],
                toCities: [],
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false,
                sunday: false,
                weekText: ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'],
                date1: [],
                sheduls: [],
                date2: [],
                blockParam: {
                    schedule: ['item1','item2'],
                    currency_id: [

                    ],
                },
                sendParam: {
                    schedule_id: "",
                    fare_families_id: "",
                    period_begin_at: "",
                    period_end_at: "",
                    count_places: '',
                    ow: '',
                    infant_ow: '',
                    rt: '',
                    infant_rt: '',
                    currency_id: '',
                    babies_places: '',
                }
            }
        },
        validations: {
            sendParam: {
                schedule_id: {
                    required
                },
                fare_families_id: {
                    required
                },
                period_begin_at: {
                    required
                },
                period_end_at: {
                    required
                },
                count_places: {
                    required
                },
                ow: {
                    required
                },
                infant_ow: {
                    required
                },
                rt: {
                    required
                },
                infant_rt: {
                    required
                },
                currency_id: {
                    required
                }
            }
        },
        mounted() {
            let day = moment().format('L');
            let res = day.split("/").reverse();
            day = [res[0],res[2],res[1]]
            res = day.join('-');
            this.currentDate = res;

            this.$store.dispatch("controls/" + feesTypes.A_FEES)
                .then(res => {
                    this.farefamilies = res.farefamilies;
                    for ( let city of res.airports){
                        this.fromCities.push(city);
                        this.toCities.push(city);
                    }
                });
            if(this.$route.params.id) {
                let data = this.$store.getters["blocks/getBlockById"](this.$route.params.id);
                console.log(data);
                this.sendParam.schedule_id = data.schedule[0].id;
                this.sendParam.fare_families_id = data.fare_families_id;
                this.sendParam.period_begin_at = data.period_begin_at;
                this.sendParam.period_end_at = data.period_end_at;
                this.sendParam.count_places = data.count_places;
                this.sendParam.ow = data.ow;
                this.sendParam.infant_ow = data.infant_ow;
                this.sendParam.rt = data.rt;
                this.sendParam.infant_rt = (data.infant_rt == null) ? 0 : data.infant_rt;
                this.sendParam.currency_id = data.currency_id;
                this.sendParam.babies_places = data.babies_places;
            }
            this.$store.dispatch("blocks/" + types.A_BLOCKS)
                .then(res => {
                    this.sheduls = res.schedules;
                });
            this.$store.dispatch("blocks/" + types.A_CURRENCIES)
                .then(res => {
                    this.blockParam.currency_id = res.data;
                });
        },
        computed: {
            getFareFamilies() {
                let res = [];
                if (this.farefamilies){
                    this.farefamilies.filter( (val) => {
                        let obj = {
                            text: val.code + " " + val.name_ru,
                            value: val.id
                        }
                        res.push(obj)
                    })
                }
                return res
            },
            getShedulItems(){
                let array = [];
                this.getSheduls.filter( (val, key) => {
                    let fromC = [];
                    let toC = [];
                    array.push(val);
                    this.fromCities.filter(val2 => {
                        if (val.departure_at == val2.id){
                            fromC.push(val2.name_ru);
                        }
                        if (val.arrival_at == val2.id){
                            toC.push(val2.name_ru);
                        }
                    });
                    array[key]['textName'] = val.period_begin_at + ' / ' + val.period_end_at + ' - ' + val.flights + ' - ' + fromC + ' / ' + toC;
                });
                console.log(array);
                return array;
            },
            getSheduls() {
                if(this.$store.getters["blocks/getBlocks"] == null) {
                    this.$store.dispatch("blocks/" + types.A_BLOCKS)
                        .then(res => {
                            console.log(res);
                            return res.schedules;
                        });
                } else {
                    return this.$store.getters["blocks/getBlocks"];
                }
            }
        },
        methods: {
            validPrice(param) {
                let value = parseFloat(this.sendParam[param]);

                this.sendParam[param] = value;
            },
            generateBlock() {
                this.$store.dispatch("blocks/" + types.A_GENERATE_BLOCK, this.$route.params.id)
                    .then(res => {
                        this.$router.push({path: '/flights/' + this.$route.params.id})
                    })
            },
            getWeek(id) {
                this.getSheduls.filter((val) => {
                    if (val.id == id)  {
                       if (val.monday)
                           this.monday = true;
                       else
                           this.monday = false;
                       if (val.tuesday)
                           this.tuesday = true;
                       else
                           this.tuesday = false;
                       if (val.wednesday)
                           this.wednesday = true;
                       else
                           this.wednesday = false;
                       if (val.thursday)
                           this.thursday = true;
                       else
                           this.thursday = false;
                       if (val.friday)
                           this.friday = true;
                       else
                           this.friday = false;
                       if (val.saturday)
                           this.saturday = true;
                       else
                           this.saturday = false;
                       if (val.sunday)
                           this.sunday = true;
                       else
                           this.sunday = false;
                   }
                });
            },
            submit() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    if(this.$route.params.id) {
                        this.sendParam.place_id = this.$route.params.id;
                        this.$store.dispatch("blocks/" + types.A_EDIT_BLOCKS, this.sendParam)
                            .then(res => {
                                return res;
                            });
                        this.$router.push("/blocks");
                    } else {
                        this.$store.dispatch("blocks/" + types.A_ADD_BLOCKS, this.sendParam)
                            .then(res => {
                                return res;
                            });
                        this.$router.push("/blocks");
                    }
                }
            }
        },
        watch: {
            'sendParam.period_begin_at'(val) {
                this.minDateLimit = val
            }
        }
    }
</script>

<style lang="scss" scoped>
    .block-add-content{
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

    .block-param-wrap{
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

    .week-list{
        display: flex;
    }

    .add-block-btn{
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