<template>
    <div class="passenger-add">
        <div class="passenger-add-header">
            <div class="headline">
                <h5>Пассажир</h5>
            </div>
        </div>
        <div class="passenger-param-wrap">
            <div class="paragraph-wrap">
                <div class="paragraph">
                    <span class="standard-text">Фамилия</span>
                    <cInput
                            :class="{ 'form-group--error': $v.editParam.surname.$error }"
                            v-model.trim="$v.editParam.surname.$model"
                            inputPadding="9px 10px"
                    >
                    </cInput>
                    <div class="error-text" v-if="$v.editParam.surname.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Имя</span>
                    <cInput
                            :class="{ 'form-group--error': $v.editParam.name.$error }"
                            v-model.trim="$v.editParam.name.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.editParam.name.$error">Заполните поле</div>
                </div>
<!--                <div class="paragraph">-->
<!--                    <span class="standard-text">Отчество</span>-->
<!--                    <cInput-->
<!---->
<!--                    ></cInput>-->
<!--                    <div class="error-text" v-if="$v.sendParam.period_begin_at.$error">Выберите дату</div>-->
<!--                </div>-->
                <div class="paragraph">
                    <span class="standard-text">Дата рождения</span>
                    <cDate
                            :class="{ 'date--error': $v.editParam.date_birth_at.$error }"
                            v-model.trim="$v.editParam.date_birth_at.$model"
                            @dateChangeTwo="editParam.date_birth_at = $event"
                    ></cDate>
                    <div class="error-text" v-if="$v.editParam.date_birth_at.$error">Выберите дату</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Пол</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.editParam.sex_u.$error }"
                            v-model.trim="$v.editParam.sex_u.$model"
                            :itemText="'name_ru'"
                            :itemValue="'value'"
                            :selectItems="sex"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.editParam.sex_u.$error">Заполните поле</div>
                </div>
            </div>
            <div class="paragraph-wrap">
                <div class="paragraph">
                    <span class="standard-text">Гражданство</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.editParam.country_id.$error }"
                            v-model.trim="$v.editParam.country_id.$model"
                            :itemText="'name_ru'"
                            :itemValue="'id'"
                            :selectItems="editParam.countries"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.editParam.country_id.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Тип документа</span>
                    <cSelectInput
                            :class="{ 'select--error': $v.editParam.type_documents.$error }"
                            v-model.trim="$v.editParam.type_documents.$model"
                            :itemText="'name'"
                            :itemValue="'id'"
                            :selectItems="documentType"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.editParam.type_documents.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Номер документа</span>
                    <cInput
                            :class="{ 'form-group--error': $v.editParam.passport_number.$error }"
                            v-model.trim="$v.editParam.passport_number.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.editParam.passport_number.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Дата окончания действия</span>
                    <cDate
                            :class="{ 'date--error': $v.editParam.expired.$error }"
                            v-model.trim="$v.editParam.expired.$model"
                            @dateChangeTwo="editParam.expired = $event"
                    ></cDate>
                    <div class="error-text" v-if="$v.editParam.expired.$error">Выберите дату</div>
                </div>
<!--                <div class="paragraph">-->
<!--                    <span class="standard-text">Агент</span>-->
<!--                    <cSelectInput-->
<!---->
<!--                    ></cSelectInput>-->
<!--                    <div class="error-text" v-if="$v.sendParam.infant_rt.$error">Заполните поле</div>-->
<!--                </div>-->
            </div>
            <div class="paragraph">
                <div class="add-passenger-btn">
                    <cButton
                            @click.native="submit()"
                            buttonValue="сохранить"
                    ></cButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {validations} from '@/validations/passengersEdit.js'
    import * as types from "@/stores/modules/controls/types";

    import cDate from "@/components/base_components/cDate";
    import cSelectInput from "@/components/base_components/cSelectInput";
    import cInput from "@/components/base_components/cInput";
    import cButton from "@/components/base_components/cButton";

    export default {
        name: "EditPassengers",
        components: {
            cDate,
            cSelectInput,
            cInput,
            cButton,
        },
        data() {
            return{
                editParam: {
                    id: '',
                    passenger: '',
                    surname: '',
                    name: '',
                    date_birth_at: '',
                    passport_number: '',
                    sex_u: '',
                    type_documents: '',
                    expired: '',
                    countries: [],
                    country_id: '',
                },
                sex: [
                    {
                        name_ru: "Мурской",
                        value: true
                    },
                    {
                        name_ru: "Женский",
                        value: false
                    }
                ],
                documentType: [
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
            this.editParam.countries = this.$store.state.service_search.countries;

            this.editParam.passenger = this.$store.getters['controls/getPassengerEdite'];
            this.editParam.id = this.editParam.passenger.id;
            this.editParam.surname = this.editParam.passenger.surname;
            this.editParam.name = this.editParam.passenger.name;
            this.editParam.date_birth_at = this.editParam.passenger.date_birth_at;
            this.editParam.passport_number = this.editParam.passenger.passport_number;
            this.editParam.sex_u = this.editParam.passenger.sex_u;
            this.editParam.type_documents = this.editParam.passenger.type_documents;
            this.editParam.expired = this.editParam.passenger.expired;
            this.editParam.country_id = this.editParam.passenger.country_id;
        },
        methods: {
            submit() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    this.$store.dispatch("controls/" + types.A_PASSENGERS_ADD_EDIT, this.editParam)
                        .then( () => {
                            this.$router.push("/control/passengers");
                        })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .passenger-add{
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

    .passenger-param-wrap{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 33px;
    }

    .paragraph-wrap{
        display: grid;
        grid-template-rows: repeat(4, 1fr);

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

    .add-passenger-btn{
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
            right: 0;
        }
    }
    .select--error{
        /deep/.v-select > .v-input__control > .v-input__slot{
            border-color: red;
            box-shadow: 0 0 2px 0px rgba(255, 0, 0, 0.6);
        }
    }
</style>