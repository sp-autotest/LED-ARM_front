<template>
    <div class="passenger-edit">
        <v-dialog v-model="dialog" persistent>
            <v-card>
                <v-card-actions>
                    <div
                            class="passenger"
                    >
                        <div class="first-column">
                            <v-radio-group class="floor-wrap" v-model="sendParam.sex_u" :mandatory="false">
                                <v-radio
                                        label="М"
                                        color="#5CDF81"
                                        :value="true"
                                ></v-radio>
                                <v-radio
                                        label="Ж"
                                        color="#5CDF81"
                                        :value="false"
                                ></v-radio>
                            </v-radio-group>
                            <div class="paragraph">
                                <cInput
                                        :class="{ 'form-group--error': $v.sendParam.name.$error }"
                                        v-model.trim="$v.sendParam.name.$model"
                                        inputPadding="7px 10px"
                                        inputPlaceholder="Имя(на латинице)"
                                ></cInput>
                                <div class="error-text" v-if="$v.sendParam.name.$error">Заполните поле</div>
                            </div>
                            <div class="paragraph">
                                <cInput
                                        :class="{ 'form-group--error': $v.sendParam.surname.$error }"
                                        v-model.trim="$v.sendParam.surname.$model"
                                        inputPadding="7px 10px"
                                        inputPlaceholder="Фамилия(на латинице)"
                                ></cInput>
                                <div class="error-text" v-if="$v.sendParam.surname.$error">Заполните поле</div>
                            </div>
                            <div class="paragraph">
                                <cDate
                                        :class="{ 'date--error': $v.sendParam.date_birth_at.$error }"
                                        v-model.trim="$v.sendParam.date_birth_at.$model"
                                        @dateChangeTwo="sendParam.date_birth_at = $event"
                                        dateLabel="Дата рождения"
                                ></cDate>
                                <div class="error-text" v-if="$v.sendParam.date_birth_at.$error">Заполните поле</div>
                            </div>
                        </div>
                        <div class="second-column">
                            <div class="spacer"></div>
                            <div class="paragraph">
                                <cSelectInput
                                        :class="{ 'select--error': $v.sendParam.country_id.$error }"
                                        v-model.trim="$v.sendParam.country_id.$model"
                                        :selectItems="countries"
                                        :itemText="'name_ru'"
                                        :itemValue="'id'"
                                        selectPadding="7px 10px"
                                        selectPlaceholder="Гражданство"
                                ></cSelectInput>
                                <div class="error-text" v-if="$v.sendParam.country_id.$error">Заполните поле</div>
                            </div>
                            <div class="paragraph">
                                <cSelectInput
                                        :class="{ 'select--error': $v.sendParam.type_documents.$error }"
                                        v-model.trim="$v.sendParam.type_documents.$model"
                                        :selectItems="documentData"
                                        :itemText="'name'"
                                        :itemValue="'id'"
                                        class="document-select"
                                        selectPadding="7px 10px"
                                        selectPlaceholder="Документ (Другой документ)"
                                ></cSelectInput>
                                <div class="error-text" v-if="$v.sendParam.type_documents.$error">Заполните поле</div>
                            </div>
                            <div class="paragraph">
                                <cInput
                                        :class="{ 'form-group--error': $v.sendParam.passport_number.$error }"
                                        v-model.trim="$v.sendParam.passport_number.$model"
                                        inputPadding="7px 10px"
                                        inputPlaceholder="Номер документа"
                                        :inputMask="masked ? '## #######' : ''"
                                ></cInput>
                                <div class="error-text" v-if="$v.sendParam.passport_number.$error">Заполните поле</div>
                            </div>
                            <div class="paragraph">
                                <cDate
                                        :class="{ 'date--error': $v.sendParam.expired.$error }"
                                        v-model.trim="$v.sendParam.expired.$model"
                                        @dateChangeTwo="sendParam.expired = $event"
                                        dateLabel="Срок действия"
                                ></cDate>
                                <div class="error-text" v-if="$v.sendParam.expired.$error">Заполните поле</div>
                            </div>
                        </div>
                    </div>
                    <div class="btn-wrap">
                        <cButton
                                @click="dialog = false"
                                :buttonColor="'#1f2041'"
                                buttonValue="отмена"
                        ></cButton>
                        <cButton
                                @click.native="submit()"
                                buttonValue="сохранить"
                        ></cButton>
                    </div>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import cInput from "@/components/base_components/cInput";
    import cSelectInput from "@/components/base_components/cSelectInput";
    import cDate from "@/components/base_components/cDate";
    import cButton from "@/components/base_components/cButton";

    import { validations } from '@/validations/editPassengerInDashboard.js';

    import * as types from "@/stores/modules/service_search/types";

    export default {
        name: "editPassengerPopup",
        props: {
            showModal: {
                type: Boolean,
                default: false
            },
            passengerData: {
                type: [Array, Object]
            }
        },
        components: {
            cInput,
            cSelectInput,
            cDate,
            cButton,
        },
        data () {
            return {
                dialog: this.showModal,
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
                ],
                sendParam: {
                    sex_u: false,
                    name: '',
                    surname: '',
                    date_birth_at: '',
                    country_id: '',
                    type_documents: '',
                    passport_number: '',
                    expired: '',
                }
            }
        },
        validations: validations,
        mounted() {
            this.$store.dispatch('service_search/' + types.A_GET_COUNTRIES)
                .then( (res) => {
                    this.countries = res.countries
                })
        },
        computed: {
            masked() {
                if (this.sendParam.country_id == 1 && this.sendParam.type_documents == 1) {
                    return true
                }else {
                    return false
                }
            }
        },
        methods: {
            submit() {
                this.sendParam = {...this.sendParam, ...{id: this.passengerData.id}}
                    this.$v.$touch();
                if (!this.$v.$invalid) {
                    this.$store.dispatch("service_search/" + types.SAVE_PASSENGER, this.sendParam)
                        .then( (res) => {
                            console.log(res);
                            this.$emit('passengerNewData', res.data.passenger)
                            this.dialog = false;
                        })
                }
            }
        },
        watch: {
            dialog(val) {
                this.$emit('modalHide', val)
            },
            showModal(val) {
                this.dialog = val;
            },
            passengerData(val) {
                console.log(val);
                this.sendParam.name = val.name;
                this.sendParam.surname = val.surname;
                this.sendParam.date_birth_at = val.date_birth_at;
                this.sendParam.country_id = val.country_id;
                this.sendParam.type_documents = val.type_documents;
                this.sendParam.expired = val.expired;
                this.sendParam.passport_number = val.passport_number;
            }
        }
    }
</script>

<style lang="scss" scoped>
    /deep/.v-card__actions{
        display: grid;
        padding: 20px 50px;
    }

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

    .passenger{
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

    .btn-wrap{
        display: flex;
        justify-content: space-between;
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

</style>