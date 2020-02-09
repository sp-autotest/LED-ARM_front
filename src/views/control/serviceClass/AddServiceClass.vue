<template>
    <div class="class-add">
        <div class="class-add-header">
            <div class="headline">
                <h5>{{($route.params.id) ? 'Редактирование' : 'Добавление'}} класса обслуживания</h5>
            </div>
        </div>
        <div class="class-param-wrap">
            <div class="paragraph-wrap">
                <div class="paragraph">
                    <span class="standard-text">Код класса</span>
                    <cInput
                            :class="{ 'form-group--error': $v.sendParam.code.$error }"
                            v-model.trim="$v.sendParam.code.$model"
                            inputPadding="9px 10px"
                    >
                    </cInput>
                    <div class="error-text" v-if="$v.sendParam.code.$error">Выберите расписание</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Название класса</span>
                    <cInput
                            :class="{ 'form-group--error': $v.sendParam.name_ru.$error }"
                            v-model.trim="$v.sendParam.name_ru.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.sendParam.name_ru.$error">Выберите класс</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Название класса (англ.)</span>
                    <cInput
                            :class="{ 'form-group--error': $v.sendParam.name_eng.$error }"
                            v-model.trim="$v.sendParam.name_eng.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.sendParam.name_eng.$error">Выберите дату</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Класс группы</span>{{sendParam.fare_families_group}}
                    <cSelectInput
                            :class="{ 'select--error': $v.sendParam.fare_families_group.$error }"
                            v-model.trim="$v.sendParam.fare_families_group.$model"
                            :selectItems="getFareFamilies"
                            :itemText="'text'"
                            :itemValue="'value'"
                            selectPlaceholder="Выбрать..."
                    ></cSelectInput>
                    <div class="error-text" v-if="$v.sendParam.fare_families_group.$error">Выберите дату</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Багаж взрослый</span>
                    <cInput
                            :class="{ 'form-group--error': $v.sendParam.luggage_adults.$error }"
                            v-model.trim="$v.sendParam.luggage_adults.$model"
                            :inputMask="'#####'"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.sendParam.luggage_adults.$error">Выберите дату</div>
                </div>
            </div>
            <div class="paragraph-wrap no-row">
                <div class="paragraph">
                    <span class="standard-text">Багаж ребенок</span>
                    <cInput
                            :class="{ 'form-group--error': $v.sendParam.luggage_children.$error }"
                            v-model.trim="$v.sendParam.luggage_children.$model"
                            :inputMask="'#####'"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.sendParam.luggage_children.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Багаж младенец</span>
                    <cInput
                            :class="{ 'form-group--error': $v.sendParam.luggage_infants.$error }"
                            v-model.trim="$v.sendParam.luggage_infants.$model"
                            :inputMask="'#####'"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.sendParam.luggage_infants.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">MAX Stay</span>
                    <cInput
                            :class="{ 'form-group--error': $v.sendParam.max_stay.$error }"
                            v-model.trim="$v.sendParam.max_stay.$model"
                            :inputMask="'#####'"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.sendParam.max_stay.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Описание тарифа</span>
                    <cTextArea
                            :class="{ 'area--error': $v.sendParam.note_fare.$error }"
                            v-model.trim="$v.sendParam.note_fare.$model"
                    ></cTextArea>
                    <div class="error-text" v-if="$v.sendParam.note_fare.$error">Заполните поле</div>
                </div>
            </div>
            <div class="paragraph">
                <div class="add-class-btn">
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
    import {validations} from '@/validations/addServiceClass.js'

    import cSelectInput from "@/components/base_components/cSelectInput";
    import cInput from "@/components/base_components/cInput";
    import cButton from "@/components/base_components/cButton";
    import cTextArea from "@/components/base_components/cTextArea";

    export default {
        name: "AddClass",
        components: {
            cSelectInput,
            cInput,
            cButton,
            cTextArea,
        },
        mounted() {
            this.$store.dispatch("controls/" + types.A_FEES)
                .then(res => {
                    this.farefamilies = res.farefamilies;
                });
            if(this.$route.params.id) {
                let data = this.$store.getters['controls/getServiceClassById'](this.$route.params.id);
                this.sendParam.code = data.code;
                this.sendParam.name_ru = data.name_ru;
                this.sendParam.name_eng = data.name_eng;
                this.sendParam.fare_families_group = data.fare_families_group;
                this.sendParam.luggage_adults = data.luggage_adults;
                this.sendParam.luggage_children = data.luggage_children;
                this.sendParam.luggage_infants = data.luggage_infants;
                this.sendParam.max_stay = data.max_stay;
                this.sendParam.note_fare = data.note_fare;
            }
        },
        data() {
            return{
                sendParam: {
                    code: '',
                    name_ru: '',
                    name_eng: '',
                    fare_families_group: '',
                    luggage_adults: '',
                    luggage_children: '',
                    luggage_infants: '',
                    max_stay: '',
                    note_fare: '',
                },
                farefamilies: '',
            }
        },
        validations: validations,
        computed: {
            getFareFamilies() {
                let res = [];
                if (this.farefamilies){
                    this.farefamilies.filter( (val) => {
                        if (val.id == 1 || val.id == 2) {
                            let obj = {
                                text: val.name_ru,
                                value: val.id
                            }
                            res.push(obj)
                        }
                    })
                }
                return res
            },
        },
        methods: {
            submit(){
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    if(this.$route.params.id) {
                        this.sendParam.id = this.$route.params.id;
                        this.$store.dispatch("controls/" + types.A_EDIT_SERVICE_CLASS, this.sendParam)
                            .then(res => {
                                return res;
                            });
                        this.$router.push("/control/classes-service");
                    } else {
                        this.$store.dispatch("controls/" + types.A_ADD_SERVICE_CLASS, this.sendParam)
                            .then(res => {
                                this.$router.push("/control/classes-service");
                            });
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .class-add{
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

    .class-param-wrap{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 33px;
    }

    .paragraph-wrap{
        display: grid;
        grid-template-rows: repeat(5, 1fr);

        &.no-row{
            .paragraph:last-child{
                grid-row: 2 span;
                /deep/.c-textarea textarea{
                    height: 125px;
                }
            }
        }
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

    .add-class-btn{
        margin-top: 25px;
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
    /deep/.c-textarea.area--error textarea{
        border-color: red;
        box-shadow: 0 0 2px 0px rgba(255, 0, 0, 0.6);
    }
</style>