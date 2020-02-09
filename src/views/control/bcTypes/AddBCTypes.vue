<template>
    <div class="bc-type-add">
        <div class="bc-type-add-header">
            <div class="headline">
                <h5>{{($route.params.id) ? 'Редактирование' : 'Добавление'}} Тип ВС</h5>
            </div>
        </div>
        <div class="bc-type-param-wrap">
            <div class="paragraph-wrap">
                <div class="paragraph">
                    <span class="standard-text">Код типа ВС</span>
                    <cInput
                            :class="{ 'form-group--error': $v.sendParam.aircraft_class_code.$error }"
                            v-model="$v.sendParam.aircraft_class_code.$model"
                            inputPadding="9px 10px"
                    >
                    </cInput>
                    <div class="error-text" v-if="$v.sendParam.aircraft_class_code.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Название полное</span>
                    <cInput
                            :class="{ 'form-group--error': $v.sendParam.name_ru.$error }"
                            v-model="$v.sendParam.name_ru.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.sendParam.name_ru.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Название полное (англ.)</span>
                    <cInput
                            :class="{ 'form-group--error': $v.sendParam.name_eng.$error }"
                            v-model="$v.sendParam.name_eng.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.sendParam.name_eng.$error">Заполните поле</div>
                </div>
                <div class="paragraph">
                    <span class="standard-text">Компоновка</span>
                    <cInput
                            :class="{ 'form-group--error': $v.sendParam.ccp.$error }"
                            v-model.trim="$v.sendParam.ccp.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="$v.sendParam.ccp.$error">Заполните поле</div>
                </div>
            </div>
            <div class="paragraph">
                <div class="add-bc-type-btn">
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
    import {validations} from '@/validations/addBCType.js'

    import cInput from "@/components/base_components/cInput";
    import cButton from "@/components/base_components/cButton";

    export default {
        name: "AddBcType",
        components: {
            cInput,
            cButton,
        },
        data() {
            return {
                sendParam: {
                    aircraft_class_code: '',
                    name_ru: '',
                    name_eng: '',
                    ccp: '',
                },
            }
        },
        validations: validations,
        mounted() {
            if(this.$route.params.id) {
                let data = this.$store.getters["controls/getBCTypeById"](this.$route.params.id);
                this.sendParam.aircraft_class_code = data.aircraft_class_code
                this.sendParam.name_ru = data.name_ru
                this.sendParam.name_eng = data.name_eng
                this.sendParam.ccp = data.ccp
            }
        },
        methods: {
            submit() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    if (!this.$v.$invalid) {
                        if(this.$route.params.id) {
                            this.sendParam.id = this.$route.params.id;
                            this.$store.dispatch("controls/" + types.A_EDIT_BC_TYPE, this.sendParam)
                                .then(result => {
                                    if(result) {
                                        this.$router.push("/control/bc-type");
                                    }
                                });
                        } else {
                            this.$store.dispatch("controls/" + types.A_ADD_BC_TYPE, this.sendParam)
                                .then( () => {
                                    this.$router.push("/control/bc-type");
                                })
                        }
                    }
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .bc-type-add{
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

    .bc-type-param-wrap{
        display: grid;
    }

    .paragraph-wrap{
        display: grid;
        grid-gap: 10px;
        grid-template-rows: repeat(4, 1fr);

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

    .add-bc-type-btn{
        margin-top: 15px;
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
        bottom: -14px;
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