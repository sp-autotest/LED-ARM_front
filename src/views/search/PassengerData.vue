<template>
    <div class="passenger-data">
        <div class="passenger-wrap">
            <input v-if="passengerCount.older" id="older" type="radio" v-model="currentTable" value="older">
            <label v-if="passengerCount.older" for="older" class="older-label">Взрослый</label>

            <input v-if="passengerCount.children" id="children" type="radio" v-model="currentTable" value="children">
            <label v-if="passengerCount.children" for="children" class="children-label">Ребенок</label>

            <input v-if="passengerCount.baby" id="baby" type="radio" v-model="currentTable" value="baby">
            <label v-if="passengerCount.baby" for="baby" class="baby-label">Младенец</label>

            <div
                    :class="[(passengerCount.children == 0 && passengerCount.older == 0) ? 'input-line-baby input-line' :
                    ((passengerCount.older == 0 && passengerCount.baby == 0) ? 'input-line-children input-line' :
                    ((passengerCount.children == 0) ? 'input-line-older-baby input-line' :
                    ((passengerCount.older == 0) ? 'input-line-children-baby input-line' : 'input-line')))]"
            ></div>
        </div>
        <div
                v-show="currentTable == 'older'"
                class="older-content"
                v-for="(v, index) in $v.oldersData.$each.$iter"
                :key="`${index}-older`"
        >
            <div class="first-column">
                <v-radio-group class="floor-wrap" v-model="oldersData[index].floor" :mandatory="false">
                    <v-radio
                            label="М"
                            color="#5CDF81"
                            :value="0"
                    ></v-radio>
                    <v-radio
                            label="Ж"
                            color="#5CDF81"
                            :value="1"
                    ></v-radio>
                </v-radio-group>
                <div class="paragraph">
                    <cInput
                            :class="{ 'form-group--error': v.older_name.$error }"
                            v-model.trim="v.older_name.$model"
                            inputPadding="7px 10px"
                            inputPlaceholder="Имя(на латинице)"
                    ></cInput>
                    <div class="error-text" v-if="v.older_name.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <cInput
                            :class="{ 'form-group--error': v.older_surname.$error }"
                            v-model.trim="v.older_surname.$model"
                            inputPadding="7px 10px"
                            inputPlaceholder="Фамилия(на латинице)"
                    ></cInput>
                    <div class="error-text" v-if="v.older_surname.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <cDate
                            :maxDate="olderLimit"
                            :currentDayShow="false"
                            :class="{ 'date--error': v.older_birth_date.$error }"
                            v-model.trim="v.older_birth_date.$model"
                            @dateChangeTwo="oldersData[index].older_birth_date = $event"
                            :dateLabel="'Дата рождения'"
                    ></cDate>
                    <div class="error-text" v-if="v.older_birth_date.$error">Заполните поле</div>
                </div>
            </div>
            <div class="second-column">
                <div class="spacer"></div>
                <div class="paragraph">
                    <cSelectInput
                            :class="{ 'select--error': v.older_Citizenship.$error }"
                            v-model.trim="v.older_Citizenship.$model"
                            :selectItems="countries"
                            :itemText="'name_ru'"
                            :itemValue="'id'"
                            selectPadding="7px 10px"
                            selectPlaceholder="Гражданство"
                    ></cSelectInput>
                    <div class="error-text" v-if="v.older_Citizenship.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <cSelectInput
                            :class="{ 'select--error': v.older_document.$error }"
                            v-model.trim="v.older_document.$model"
                            :selectItems="documentData"
                            :itemText="'name'"
                            :itemValue="'id'"
                            class="document-select"
                            selectPadding="7px 10px"
                            selectPlaceholder="Документ (Другой документ)"
                    ></cSelectInput>
                    <div class="error-text" v-if="v.older_document.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <cInput
                            :class="{ 'form-group--error': v.older_document_number.$error }"
                            v-model.trim="v.older_document_number.$model"
                            inputPadding="7px 10px"
                            :inputMask="(v.older_Citizenship.$model == 1 && v.older_document.$model == 1) ? '## #######' : ''"
                            inputPlaceholder="Номер документа"
                    ></cInput>
                    <div class="error-text" v-if="v.older_document_number.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <cDate
                            :class="{ 'date--error': v.older_Validity.$error }"
                            v-model.trim="v.older_Validity.$model"
                            :minDate="currentDate"
                            @dateChangeTwo="oldersData[index].older_Validity = $event"
                            :dateLabel="'Срок действия'"
                    ></cDate>
                    <div class="error-text" v-if="v.older_Validity.$error">Заполните поле</div>
                </div>
            </div>
        </div>

        <div
                v-show="currentTable == 'children'"
                class="children-content"
                v-for="(v, index) in $v.childrensData.$each.$iter"
                :key="`${index}-children`"
        >
            <div class="first-column">
                <v-radio-group class="floor-wrap" v-model="childrensData[index].floor" :mandatory="false">
                    <v-radio
                            label="М"
                            color="#5CDF81"
                            :value="0"
                    ></v-radio>
                    <v-radio
                            label="Ж"
                            color="#5CDF81"
                            :value="1"
                    ></v-radio>
                </v-radio-group>
                <div class="paragraph">
                    <cInput
                            :class="{ 'form-group--error': v.children_name.$error }"
                            v-model.trim="v.children_name.$model"
                            inputPadding="7px 10px"
                            inputPlaceholder="Имя(на латинице)"
                    ></cInput>
                    <div class="error-text" v-if="v.children_name.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <cInput
                            :class="{ 'form-group--error': v.children_surname.$error }"
                            v-model.trim="v.children_surname.$model"
                            inputPadding="7px 10px"
                            inputPlaceholder="Фамилия(на латинице)"
                    ></cInput>
                    <div class="error-text" v-if="v.children_surname.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <cDate
                            :currentDayShow="false"
                            :minDate="childrenMinLimit"
                            :maxDate="childrenMaxLimit"
                            :class="{ 'date--error': v.children_birth_date.$error }"
                            v-model.trim="v.children_birth_date.$model"
                            @dateChangeTwo="childrensData[index].children_birth_date = $event"
                            :dateLabel="'Дата рождения'"
                    ></cDate>
                    <div class="error-text" v-if="v.children_birth_date.$error">Заполните поле</div>
                </div>
            </div>
            <div class="second-column">
                <div class="spacer"></div>
                <div class="paragraph">
                    <cSelectInput
                            :class="{ 'select--error': v.children_Citizenship.$error }"
                            v-model.trim="v.children_Citizenship.$model"
                            :selectItems="countries"
                            :itemText="'name_ru'"
                            :itemValue="'id'"
                            selectPadding="7px 10px"
                            selectPlaceholder="Гражданство"
                    ></cSelectInput>
                    <div class="error-text" v-if="v.children_Citizenship.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <cSelectInput
                            :class="{ 'select--error': v.children_document.$error }"
                            v-model.trim="v.children_document.$model"
                            :selectItems="documentData"
                            :itemText="'name'"
                            :itemValue="'id'"
                            class="document-select"
                            selectPadding="7px 10px"
                            selectPlaceholder="Документ (Другой документ)"
                    ></cSelectInput>
                    <div class="error-text" v-if="v.children_document.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <cInput
                            :class="{ 'form-group--error': v.children_document_number.$error }"
                            v-model.trim="v.children_document_number.$model"
                            inputPadding="7px 10px"
                            :inputMask="(v.children_Citizenship.$model == 1 && v.children_document.$model == 1) ? '## #######' : ''"
                            inputPlaceholder="Номер документа"
                    ></cInput>
                    <div class="error-text" v-if="v.children_document_number.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <cDate
                            :class="{ 'date--error': v.children_Validity.$error }"
                            v-model.trim="v.children_Validity.$model"
                            :minDate="currentDate"
                            @dateChangeTwo="childrensData[index].children_Validity = $event"
                            :dateLabel="'Срок действия'"
                    ></cDate>
                    <div class="error-text" v-if="v.children_Validity.$error">Заполните поле</div>
                </div>
            </div>
        </div>

        <div
                v-show="currentTable == 'baby'"
                class="baby-content"
                v-for="(v, index) in $v.babysData.$each.$iter"
                :key="`${index}-baby`"
        >
            <div class="first-column">
                <v-radio-group class="floor-wrap" v-model="babysData[index].floor" :mandatory="false">
                    <v-radio
                            label="М"
                            color="#5CDF81"
                            :value="0"
                    ></v-radio>
                    <v-radio
                            label="Ж"
                            color="#5CDF81"
                            :value="1"
                    ></v-radio>
                </v-radio-group>
                <div class="paragraph">
                    <cInput
                            :class="{ 'form-group--error': v.baby_name.$error }"
                            v-model.trim="v.baby_name.$model"
                            inputPadding="7px 10px"
                            inputPlaceholder="Имя(на латинице)"
                    ></cInput>
                    <div class="error-text" v-if="v.baby_name.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <cInput
                            :class="{ 'form-group--error': v.baby_surname.$error }"
                            v-model.trim="v.baby_surname.$model"
                            inputPadding="7px 10px"
                            inputPlaceholder="Фамилия(на латинице)"
                    ></cInput>
                    <div class="error-text" v-if="v.baby_surname.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <cDate
                            :currentDayShow="false"
                            :minDate="babyMinLimit"
                            :maxDate="babyMaxLimit"
                            :class="{ 'date--error': v.baby_birth_date.$error }"
                            v-model.trim="v.baby_birth_date.$model"
                            @dateChangeTwo="babysData[index].baby_birth_date = $event"
                            :dateLabel="'Дата рождения'"
                    ></cDate>
                    <div class="error-text" v-if="v.baby_birth_date.$error">Заполните поле</div>
                </div>
            </div>
            <div class="second-column">
                <div class="spacer"></div>
                <div class="paragraph">
                    <cSelectInput
                            :class="{ 'select--error': v.baby_Citizenship.$error }"
                            v-model.trim="v.baby_Citizenship.$model"
                            :selectItems="countries"
                            :itemText="'name_ru'"
                            :itemValue="'id'"
                            selectPadding="7px 10px"
                            selectPlaceholder="Гражданство"
                    ></cSelectInput>
                    <div class="error-text" v-if="v.baby_Citizenship.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <cSelectInput
                            :class="{ 'select--error': v.baby_document.$error }"
                            v-model.trim="v.baby_document.$model"
                            :selectItems="documentData"
                            :itemText="'name'"
                            :itemValue="'id'"
                            class="document-select"
                            selectPadding="7px 10px"
                            selectPlaceholder="Документ (Другой документ)"
                    ></cSelectInput>
                    <div class="error-text" v-if="v.baby_document.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <cInput
                            :class="{ 'form-group--error': v.baby_document_number.$error }"
                            v-model.trim="v.baby_document_number.$model"
                            inputPadding="7px 10px"
                            inputPlaceholder="Номер документа"
                            :inputMask="(v.baby_Citizenship.$model == 1 && v.baby_document.$model == 1) ? '## #######' : ''"
                    ></cInput>
                    <div class="error-text" v-if="v.baby_document_number.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <cDate
                            :class="{ 'date--error': v.baby_Validity.$error }"
                            v-model.trim="v.baby_Validity.$model"
                            :minDate="currentDate"
                            @dateChangeTwo="babysData[index].baby_Validity = $event"
                            :dateLabel="'Срок действия'"
                    ></cDate>
                    <div class="error-text" v-if="v.baby_Validity.$error">Заполните поле</div>
                </div>
            </div>
        </div>
        <cCheckbox
                :checkboxValue="iAgree"
                @checked="iAgree = $event"
                label="Я ознакомился и согласен со всеми правилами и условиями"
        ></cCheckbox>
    </div>
</template>

<script>
    import moment from 'moment'

    import { validations } from '@/validations/passengers.js';

    import cInput from "@/components/base_components/cInput";
    import cSelectInput from "@/components/base_components/cSelectInput";
    import cDate from "@/components/base_components/cDate";
    import cCheckbox from "@/components/base_components/cCheckbox";
    import * as types from "@/stores/modules/service_search/types";

    export default {
        name: "PassengerData",
        components: {
            cInput,
            cSelectInput,
            cDate,
            cCheckbox,
        },
        props: {
            flightData: {
                type: Object,
                default: null
            },
            passengerCount: {
                type: Object,
                default: null
            },
            valid: {
                type: Boolean,
                default: false
            },
            checkSend: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return{
                iAgree: false,
                olderLimit: '',
                childrenMinLimit: '',
                childrenMaxLimit: '',
                babyMinLimit: '',
                babyMaxLimit: '',
                passenger_count: this.passengerCount,
                currentTable: "older",
                currentDate: '2019-07-10',
                oldersData: [],
                childrensData: [],
                babysData: [],
                countries: [],
                documentData: [
                    {
                        name: "Паспорт",
                        id: 1
                    },
                    {
                        name: "Другой документ",
                        id: 2
                    }
                ]
            }
        },
        validations: validations,
        mounted() {
            let day = moment().format('L');
            let res = day.split("/").reverse();
            day = [res[0],res[2],res[1]];
            let currentDay = day.join('-');
            this.currentDate = currentDay;
            console.log(this.currentDate);

            let older_limit = [parseInt(res[0]) - 12,res[2],res[1]];
            let children_max_limit = [parseInt(res[0]) - 2,res[2],res[1]];
            let children_min_limit = [parseInt(res[0]) - 12,res[2],res[1]];
            let baby_min_limit = [parseInt(res[0]) - 2,res[2],res[1]];

            this.childrenMinLimit = children_min_limit.join('-');
            this.childrenMaxLimit = children_max_limit.join('-');
            this.babyMinLimit = baby_min_limit.join('-');
            this.babyMaxLimit = day.join('-');
            this.olderLimit = older_limit.join('-');

            this.$store.dispatch('service_search/' + types.A_GET_COUNTRIES)
                .then( () => {
                    this.countries = this.$store.state.service_search.countries;
                })
        },
        methods: {

        },
        watch: {
            checkSend() {
                let data = [];
                if(this.oldersData.length > 0) {
                    this.oldersData.forEach(val => {
                        val = {
                            ...{type_passengers: 1},
                            ...{name: val.older_name},
                            ...{surname: val.older_surname},
                            ...{country_id: val.older_Citizenship},
                            ...{sex_u: val.floor},
                            ...{type_documents: val.older_document},
                            ...{passport_number: val.older_document_number},
                            // ...{patronymic: val.older_patronymic},
                            ...{date_birth_at: val.older_birth_date},
                            ...{expired: val.older_Validity},
                        };
                        data.push(val);
                    })
                }
                if(this.babysData.length > 0) {
                    this.babysData.forEach(val => {
                        val = {
                            ...{type_passengers: 3},
                            ...{name: val.baby_name},
                            ...{surname: val.baby_surname},
                            ...{country_id: val.baby_Citizenship},
                            ...{sex_u: val.floor},
                            ...{type_documents: val.baby_document},
                            ...{passport_number: val.baby_document_number},
                            // ...{patronymic: val.baby_patronymic},
                            ...{date_birth_at: val.baby_birth_date},
                            ...{expired: val.baby_Validity},
                        };
                        data.push(val);
                    })
                }
                if(this.childrensData.length > 0) {
                    this.childrensData.forEach(val => {
                        val = {
                            ...{type_passengers: 2},
                            ...{name: val.children_name},
                            ...{surname: val.children_surname},
                            ...{country_id: val.children_Citizenship},
                            ...{sex_u: val.floor},
                            ...{type_documents: val.children_document},
                            ...{passport_number: val.children_document_number},
                            // ...{patronymic: val.children_patronymic},
                            ...{date_birth_at: val.children_birth_date},
                            ...{expired: val.children_Validity},
                        };
                        data.push(val);
                    })
                }
                console.log(this.$store.getters['service_search/getSendData']);
                this.$store.dispatch("service_search/" + types.A_SAVE_SEND_DATA_PASSENGERS, data)
                    .then(res => {
                        this.$store.dispatch("service_search/" + types.A_BOOKING, this.$store.getters['service_search/getSendData'])
                            .then(result => {
                                this.$router.push('orders')
                            })
                    });
            },

            valid(val) {
                if (val) {
                    this.$v.$touch();
                }
            },
            '$v.$invalid'(val) {
                if (!val && this.iAgree) {
                    this.$emit('valid', true)
                }else {
                    this.$emit('valid', false)
                }
            },
            iAgree(val) {
                if (!this.$v.$invalid && val) {
                    this.$emit('valid', true)
                }else {
                    this.$emit('valid', false)
                }
            },
            passengerCount: {
                handler: function(newValue) {
                    this.oldersData = [];
                    this.childrensData = [];
                    this.babysData = [];
                    for(let i=0; i < this.passengerCount.older; i++) {
                        this.oldersData.push(
                            {
                                floor: 0,
                                older_name: '',
                                older_surname: '',
                                // older_patronymic: '',
                                older_birth_date: '',
                                older_document: '',
                                older_document_number: '',
                                older_Validity: '',
                                older_Citizenship: ''
                            }
                        )
                    }
                    for(let i=0; i < this.passengerCount.children; i++) {
                        this.childrensData.push(
                            {
                                floor: 0,
                                children_name: '',
                                children_surname: '',
                                // children_patronymic: '',
                                children_birth_date: '',
                                children_document: '',
                                children_document_number: '',
                                children_Validity: '',
                                children_Citizenship: ''
                            }
                        )
                    }
                    for(let i=0; i < this.passengerCount.baby; i++) {
                        this.babysData.push(
                            {
                                floor: 0,
                                baby_name: '',
                                baby_surname: '',
                                // baby_patronymic: '',
                                baby_birth_date: '',
                                baby_document: '',
                                baby_document_number: '',
                                baby_Validity: '',
                                baby_Citizenship: ''
                            }
                        )
                    }

                    this.passenger_count = newValue;
                    if (newValue.older == 0 && newValue.children == 0) {
                        this.currentTable = 'baby'
                    }else if (newValue.older == 0) {
                        this.currentTable = 'children'
                    }else {
                        this.currentTable = 'older'
                    }
                },
                deep: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .passenger-wrap {
        display: grid;
        grid-template-columns: 140px 140px 140px;
        position: relative;
    }

    .first-column, .second-column{
        display: grid;
        grid-template-rows: repeat(5, 1fr);
        grid-template-columns: 1fr;
    }

    #older, #children,#baby {
        display: none;
    }

    .older-label,.children-label,.baby-label {
        height: 30px;
        align-items: center;
        cursor: pointer;
        position: relative;
        text-align: center;
        font-family: "Montserrat";
        font-weight: bold;
        font-size: 15px;
        line-height: normal;
        color: #575870;
    }

    .input-line {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 140px;
        height: 3px;
        background-color: #2cbd6d;
        transition: 0.2s;
    }

    #older:checked ~ .input-line{
        left: 0;
    }

    #children:checked ~ .input-line{
        left: 141px;
        &.input-line-children{
            left: 0;
        }
        &.input-line-children-baby{
            left: 0;
        }
    }

    #baby:checked ~ .input-line{
        left: 281px;
        &.input-line-older-baby{
            left: 141px;
        }
        &.input-line-baby{
            left: 0;
        }
        &.input-line-children-baby{
            left: 141px;
        }
    }

    /deep/.v-input--selection-controls.v-input .v-label{
        margin: 0;
    }

    /deep/.v-input--radio-group--column .v-input--radio-group__input{
        flex-direction: row;
    }

    /deep/.v-input--selection-controls:not(.v-input--hide-details) .v-input__slot{
        margin: 0;
    }
    /deep/.v-input--radio-group--column .v-radio:not(:last-child):not(:only-child){
        margin-bottom: 0;
    }

    .older-content, .children-content, .baby-content{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 15px;
        /deep/.c-input input{
            width: 100%;
        }
    }

    /deep/.v-menu{
        display: none;
    }
    /deep/.c-date .label{
        left: 50px;
    }
    /deep/.v-text-field__details{
        height: 0;
    }
    /deep/.v-select > .v-input__control > .v-input__slot{
        padding: 3px 10px;
    }
    /deep/.v-menu .v-text-field .v-input__slot{
        padding: 3px 10px;
    }
    /deep/.c-date .v-input{
        padding: 3px 10px;
    }

    .paragraph{
        position: relative;
    }


    .error-text{
        position: absolute;
        bottom: 0;
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
        /deep/ .v-input{
            border-color: red;
            box-shadow: 0 0 2px 0px rgba(255, 0, 0, 0.6);
        }
    }

    .btn--error{
        border-color: red;
        box-shadow: 0 0 2px 0px rgba(255, 0, 0, 0.6);
    }
</style>