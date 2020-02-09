<template>
    <div class="book-flight">
                <div class="step-slider pb-3">
                    <StepSlider
                        :headlineOne="'Данные рейса'"
                        :headlineTwo="'Данные плательщика'"
                        :headlineThree="'Данные пассажира'"
                        :stepTwo="stepTwo"
                        :stepThree="stepThree"
                        v-model="stepPos"
                        @stepChange="currentStep = $event"
                    ></StepSlider>
                </div>
                <div class="step-one" v-show="currentStep == 2">
                    <div class="paragraph">
                        <cInput
                                :class="{ 'select--error': $v.sendData.company.$error }"
                                v-model.trim="$v.sendData.company.$model"
                                :inputPlaceholder="'Компания-плательщик'"
                                inputPadding="7px 10px"
                                @newValue="sendData.company = $event"
                                :disabled="true"
                        ></cInput>
                        <div class="error-text" v-if="$v.sendData.company.$error">Заполните поле</div>
                    </div>
                    <div class="paragraph">
                        <cSelectInput
                                :class="{ 'select--error': $v.sendData.companyManager.$error }"
                                v-model.trim="$v.sendData.companyManager.$model"
                                :itemText="'profile.first_name'"
                                :itemValue="'id'"
                                :selectItems="managers"
                                selectPlaceholder="Менеджеры компании">
                        </cSelectInput>
                        <div class="error-text" v-if="$v.sendData.companyManager.$error">Заполните поле</div>
                    </div>
                    <div class="paragraph">
                        <cInput
                                :class="{ 'form-group--error': $v.sendData.phoneNumber.$error }"
                                v-model.trim="$v.sendData.phoneNumber.$model"
                                inputPadding="7px 10px"
                                inputPlaceholder="Телефон"
                                @newValue="sendData.phoneNumber = $event"
                        ></cInput>
                        <div class="error-text" v-if="$v.sendData.phoneNumber.$error">Заполните поле</div>
                    </div>
                    <div class="paragraph">
                        <cSelectInput
                                :class="{ 'select--error': $v.sendData.payment.$error }"
                                v-model.trim="$v.sendData.payment.$model"
                                :itemText="'name'"
                                :itemValue="'id'"
                                :selectItems="paymentData"
                                selectPlaceholder="Тип оплаты">
                        </cSelectInput>
                        <div class="error-text" v-if="$v.sendData.payment.$error">Заполните поле</div>
                    </div>
                    <div v-show="sendData.payment == 'bill'" class="spacer"></div>
                    <div v-show="sendData.payment == 'bill'" class="score">
                        <cButton
                                buttonValue="распечатать"
                                buttonColor="#8F8FA0"
                                buttonPadding="11px 27px 11px 24px"
                                @click="printPayment()"
                        ></cButton>
                    </div>
                </div>
                <div class="step-two" v-show="currentStep == 1">
                    <flightDetails
                            :fData="flightData"
                            :fData2="flightData2"
                            :airNumber="airNumber"
                            :cityF="cityF"
                            :cityT="cityT"
                            :travelTime="travelTime"
                            :travelTime2="travelTime2"
                            :isCrane="isCrane"
                    ></flightDetails>
                </div>
                <div class="step-three" v-show="currentStep == 3">
                    <passengerData
                            :flightData="flightData"
                            :passengerCount="passengerCount"
                            :valid="valid"
                            :checkSend="thirdStepVal"
                            @valid="validResult = $event"
                    ></passengerData>
                </div>
                <div class="btn-group">
                    <cButton
                            @click.native="backStep()"
                            :buttonValue="'Назад'"
                            buttonColor="#8F8FA0"
                            buttonPadding="11px 27px 11px 24px"
                    ></cButton>
                    <cButton
                            @click.native="nextStep()"
                            :buttonValue="nextBtnValue"
                            buttonPadding="11px 27px 11px 24px"
                            :disabled="nextActiv"
                    ></cButton>
                </div>
                <div @click="triggerModal()" class="close">
                    <i class="material-icons">
                        close
                    </i>
                </div>
    </div>
</template>

<script>
    import StepSlider from "./StepSlider";
    import passengerData from "./PassengerData";
    import flightDetails from "./FlightDetails";
    import cSelectInput from "@/components/base_components/cSelectInput";
    import cInput from "@/components/base_components/cInput";
    import cButton from "@/components/base_components/cButton";
    import * as types from "@/stores/modules/service_search/types";
    import {validations} from '@/validations/bookFlight.js'

    export default {
        name: "BookFlight",
        components: {
            StepSlider,
            flightDetails,
            passengerData,
            cSelectInput,
            cInput,
            cButton
        },
        props: {

        },
        data() {
            return {
                summ: 0,
                thirdStepVal: false,
                valid_click: 0,
                valid_click_two: 0,
                passengerCount: {},
                cityT: "",
                cityF: "",
                travelTime: "",
                travelTime2: "",
                isCrane: false,
                flightData: {},
                flightData2: {},
                nextActiv: false,
                validResult: false,
                valid: false,
                stepPos: 1,
                stepTwo: false,
                stepThree: false,
                currentStep: 1,
                dialogCom: this.dialog,
                nextBtnValue: 'Далее',
                sendData: {
                    companyManager: "",
                    company: "",
                    phoneNumber: "",
                    payment: ""
                },
                airNumber: {},
                managers: [],
                countries: [],
                paymentData: [
                    {
                        name: "По счёту",
                        id: 'bill'
                    },
                    {
                        name: "Инвойс",
                        id: 'invoice'
                    }
                ],
                documentData: [
                    {
                        name: "Паспорт РФ",
                        id: 1
                    },
                    {
                        name: "Иностранный паспорт ",
                        id: 2
                    },
                    {
                        name: "Свидетельство о рождении РФ",
                        id: 3
                    },
                    {
                        name: "Другой документ",
                        id: 4
                    }
                ]
            }
        },
        validations: validations,
        mounted() {
            this.sendData.company = this.$store.state.auth.user.admincompany.company_name;
            let a = this.$store.getters["service_search/getBookingData"];
            console.log(a);
            this.passengerCount = a.passengerCount;
            this.cityT = a.cityTo;
            this.cityF = a.cityFrom;
            this.flightData = a.flightData;
            this.flightData2 = (a.flightData2 != 0) ? a.flightData2 : {};
            this.travelTime = a.travelTime;
            this.travelTime2 = a.travelTime2;
            this.isCrane = a.isCrane;
            this.summ = a.summ;
            this.$store.dispatch('service_search/' + types.A_GET_MANAGERS)
                .then(res => {
                    this.managers = res.success;
                })

        },
        watch: {
            validResult(val) {
                if (val) {
                    this.nextBtnValue = 'Забронировать'
                    this.nextActiv = false
                }else {
                    this.nextActiv = true
                }
            },
            flightData(val) {
                this.$store.dispatch("service_search/" + types.A_GET_BCTYPES)
                    .then(res => {
                        this.airNumber = !this.isCrane ? this.$store.getters["service_search/getBcTypes"](this.flightData.flightplaces.schedule[0].bc_types_id) : '';
                    })
            },
            dialog(val) {
                this.dialogCom = val;
                this.$emit('triggerModal', val);
            }
        },
        methods: {
            printPayment() {
                let value = Object.values(this.passengerCount);
                let count = 0
                value.filter( val => {
                    count += val
                })
                let data = {
                    count: count,
                    summ: this.summ
                }
                this.$store.dispatch("service_search/" + types.A_PRINT_PAYMENT, data)
                  .then(res => {
                      window.open('http://test-redchain.ru:80/'+res.data, "_blank")
                })
            },
            nextStep() {
                let valid = true;
                if (this.currentStep == 2) {
                    this.valid_click ++;
                    if (this.valid_click == 1) {
                        this.$v.$touch();
                    }
                    if (this.$v.$invalid) {
                        valid = false
                    }
                }
                if (valid) {
                    if (this.currentStep == 1) {
                        console.log(this.flightData2);
                        console.log(this.flightData);
                        if(this.isCrane) {
                            this.$store.dispatch("service_search/" + types.A_SAVE_SEND_DATA_CRANE, {flightData: this.flightData, passCount:this.passengerCount});
                        } else {
                            if(this.flightData2 == undefined) {
                                this.$store.dispatch("service_search/" + types.A_SAVE_SEND_DATA, {flightData: this.flightData, passCount:this.passengerCount});
                            } else {
                                this.$store.dispatch("service_search/" + types.A_SAVE_SEND_DATA, {flightData2: this.flightData2.id ,flightData: this.flightData, passCount:this.passengerCount});
                            }
                        }
                        this.stepPos = 2
                    } else if (this.currentStep == 2) {
                        this.$store.dispatch("service_search/" + types.A_SAVE_SEND_DATA_COMPANY, this.sendData);
                        this.valid_click_two ++;
                        this.stepPos = 3;
                        this.nextActiv = true;
                        this.nextBtnValue = 'Забронировать';
                        if (this.valid_click_two == 2){
                            this.valid = true;
                        }
                        if (this.validResult) {
                            this.nextActiv = false
                        }
                    } else if(this.currentStep == 3) {
                        this.thirdStepVal = !this.thirdStepVal;
                    }
                }
            },
            backStep() {
                if (this.currentStep == 3) {
                    this.stepPos = 2
                    this.nextBtnValue = 'Далее'
                    this.nextActiv = false
                } else if (this.currentStep == 2) {
                    this.stepPos = 1
                }else if (this.currentStep == 1) {
                    this.$router.push('/search');
                }
            },
            triggerModal() {
                this.$v.$touch();
                this.$emit('triggerModal', false);
            },
        }
    }
</script>

<style lang="scss" scoped>
    .book-flight{
        padding: 60px;
        min-width: 700px;
    }
    .dialog{
        padding: 3% 10% 0;
        position: relative;
    }

    .step-one{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 25px;
        /deep/.c-input input{
            width: 100%;
        }
    }

    .close{
        position: absolute;
        top: 0;
        right: 0;
        .material-icons{
            font-size: 40px;
            cursor: pointer;
        }
    }

    .paragraph{
        position: relative;
    }

    /deep/.c-select .v-select > .v-input__control > .v-input__slot{
        padding: 3px 10px;
    }

    /deep/.v-text-field__details{
        height: 0;
    }

    .score{
        display: flex;
        justify-content: flex-end;
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
    .select--error{
        /deep/.v-select > .v-input__control > .v-input__slot{
            border-color: red;
            box-shadow: 0 0 2px 0px rgba(255, 0, 0, 0.6);
        }
    }
    .date--error{
        /deep/.v-menu .v-text-field .v-input__slot{
            border-color: red;
            box-shadow: 0 0 2px 0px rgba(255, 0, 0, 0.6);
        }
    }

    .btn--error{
        border-color: red;
        box-shadow: 0 0 2px 0px rgba(255, 0, 0, 0.6);
    }
    .btn-group{
        display: flex;
        justify-content: space-between;
        padding: 20px 0;
    }
</style>