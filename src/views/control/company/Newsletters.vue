<template>
    <div :key="componentKey" class="newsletters-content">
        <div class="newsletters-wrap">
            <div class="headline">
                <span class="headline-text">РАССЫЛКИ</span>
                <span class="headline-text">СТАТУС</span>
                <span class="headline-text">E:MAIL</span>
            </div>
            <div class="newsletters-params">
                <div class="select-group">
                    <cSelect
                            inputLabel="Ошибка выписки"
                            @click="mailingStatusChange(53)"
                            v-model="statementError"
                    ></cSelect>
                    <cSelect
                            inputLabel="Бронирование услуги"
                            @click="mailingStatusChange(1)"
                            v-model="serviceReservation"
                    ></cSelect>
                    <cSelect
                            inputLabel="Запрос отмены услуги (информирование сотрудников)"
                            @click="mailingStatusChange(2)"
                            v-model="serviceRequestEmployees"
                    ></cSelect>
                    <cSelect
                            inputLabel="Запрос на отмену услуги (информирование субагентов)"
                            @click="mailingStatusChange(3)"
                            v-model="serviceRequestSubagents"
                    ></cSelect>
                    <cSelect
                            inputLabel="Тайм лимит услуги"
                            @click="mailingStatusChange(4)"
                            v-model="timeServices"
                    ></cSelect>
                    <cSelect
                            inputLabel="Сообщение по заказу (в чате заказа)"
                            @click="mailingStatusChange(54)"
                            v-model="orderMessage"
                    ></cSelect>
                </div>
                <v-radio-group
                        class="radio-btn"
                        @change="selected()"
                        v-model="select"
                        :mandatory="false">
                    <v-radio
                            color="#5CDF81"
                            :value=1
                    ></v-radio>
                    <v-radio
                            color="#5CDF81"
                            :value=2
                    ></v-radio>
                    <v-radio
                            color="#5CDF81"
                            :value=3
                    ></v-radio>
                    <v-radio
                            color="#5CDF81"
                            :value=4
                    ></v-radio>
                    <v-radio
                            color="#5CDF81"
                            :value=5
                    ></v-radio>
                    <v-radio
                            color="#5CDF81"
                            :value=6
                    ></v-radio>
                </v-radio-group>
            </div>
        </div>
        <div class="newsletters-wrap">
            <div class="mail-headline">
                <span class="headline-text">e:mail</span>
                <div
                        v-for="(item, key) in emailList"
                        :key="key"
                        class="email-list"
                >
                    <span class="mail-text">
                        {{item.mail}}
                        <svg @click="removeEmail(item.id)" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.74609 12.2539C4.94141 13.4258 6.35938 14.0117 8 14.0117C9.64062 14.0117 11.0469 13.4258 12.2188 12.2539C13.4141 11.0586 14.0117 9.64062 14.0117 8C14.0117 6.35937 13.4141 4.95312 12.2188 3.78125C11.0469 2.58594 9.64062 1.98828 8 1.98828C6.35938 1.98828 4.94141 2.58594 3.74609 3.78125C2.57422 4.95312 1.98828 6.35937 1.98828 8C1.98828 9.64062 2.57422 11.0586 3.74609 12.2539ZM2.69141 2.72656C4.16797 1.25 5.9375 0.511719 8 0.511719C10.0625 0.511719 11.8203 1.25 13.2734 2.72656C14.75 4.17969 15.4883 5.9375 15.4883 8C15.4883 10.0625 14.75 11.832 13.2734 13.3086C11.8203 14.7617 10.0625 15.4883 8 15.4883C5.9375 15.4883 4.16797 14.7617 2.69141 13.3086C1.23828 11.832 0.511719 10.0625 0.511719 8C0.511719 5.9375 1.23828 4.17969 2.69141 2.72656ZM4.23828 7.26172H11.7617V8.73828H4.23828V7.26172Z" fill="#FF5B27"/>
                        </svg>
                    </span>
                </div>
            </div>
            <div class="add-mail">
                <div class="paragraph">
                    <cInput
                            :class="{ 'form-group--error': ($v.sendParam.email.$error && valid) }"
                            v-model="$v.sendParam.email.$model"
                            inputPadding="9px 10px"
                    ></cInput>
                    <div class="error-text" v-if="!$v.sendParam.email.required && $v.sendParam.email.$error && valid">Заполните поле</div>
                    <div class="error-text" v-else-if="!$v.sendParam.email.email">Е:маил не корректный</div>
                </div>
                <cButton
                        @click="addEmail()"
                        buttonValue="Добавить"
                ></cButton>
            </div>
        </div>
    </div>
</template>

<script>
    import { required, email } from 'vuelidate/lib/validators'
    import * as types from "@/stores/modules/controls/company/types";

    import cInput from "@/components/base_components/cInput"
    import cSelect from "@/components/base_components/cSelect"
    import cButton from "@/components/base_components/cButton"

    export default {
        name: "Newsletters",
        data(){
            return{
                componentKey: 0,
                companyId: 0,
                valid: false,
                select: '',
                sendParam: {
                    email: '',
                },
                mailings: [],
                mailing_lists: [],
                emailList: [],
                statementError:false,
                serviceReservation:false,
                serviceRequestEmployees:false,
                serviceRequestSubagents:false,
                timeServices:false,
                orderMessage:false,
            }
        },
        validations: {
            sendParam: {
                email: {
                    required,
                    email
                }
            }
        },
        components:{
            cInput,
            cSelect,
            cButton
        },
        mounted() {
            this.companyId = this.$route.params.id;
            this.$store.dispatch("company/" + types.GET_EMAILS)
                .then( res => {
                    this.mailings = res.data.mailings;
                    this.mailing_lists = res.data.mailing_lists
                    res.data.mailings.filter(item =>{
                        if(item.id === 1){
                            this.serviceReservation = item.status
                        }  else if(item.id === 2){
                            this.serviceRequestEmployees = item.status
                        } else if(item.id === 3){
                            this.serviceRequestSubagents = item.status
                        } else if(item.id === 4){
                            this.timeServices = item.st5tus
                        } else if(item.id === 54){
                            this.orderMessage = item.status
                        } else if(item.id === 53){
                            this.statementError = item.status
                        }
                    })
                })
        },
        methods: {
            removeEmail(id) {
                this.$store.dispatch("company/" + types.REMOVE_EMAILS,{id: id})
                    .then( () => {
                        let newEmailList = [];
                        let newMailingList = [];
                        this.emailList.filter( val => {
                            if (val.id != id){
                                newEmailList.push(val)
                            }
                        });
                        this.mailing_lists.filter( val => {
                            if (val.id != id){
                                newMailingList.push(val)
                            }
                        });
                        this.emailList = newEmailList;
                        this.mailing_lists = newMailingList;
                        this.componentKey++;
                    })
            },
            addEmail() {
                this.valid = true
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    this.$store.dispatch("company/" + types.A_ADD_EMAIL, this.sendParam)
                        .then( res => {
                            res.data.mailing_lists.filter( val => {
                                this.mailing_lists.push(val)
                                this.selected();
                            })
                            this.sendParam.email = ''
                            this.$router.push(`/control/company/${this.companyId}/newsletters`)
                        })
                    this.valid = false
                }
            },
            selected() {
                this.emailList = []
                let mailList = [];
                this.mailings.filter( item => {
                    if (item.type_mailing == this.select){
                        mailList.push(item.id)
                    }
                })
                this.mailing_lists.filter( item => {
                    mailList.filter( item2 => {
                        if (item.mailing_id == item2){
                            let count = 0;
                            this.emailList.filter( item3 => {
                                if (item.id != item3.id) {
                                    count++
                                }
                            })
                            if (count == this.emailList.length) {
                                this.emailList.push(item)
                            }
                        }
                    })
                })
            },
            mailingStatusChange(id){
                this.$store.dispatch("company/" + types.A_MAILING_STATUS_CHANGE, {id} )

            }
        },
        watch: {
        }
    }
</script>

<style lang="scss" scoped>
    .newsletters-content{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 30px;
        .newsletters-params{
            padding: 20px 10px 0 0;
            display: grid;
            grid-template-columns: 1fr auto;
            grid-gap: 15px;
            .select-group {
                display: grid;
            }
            .radio-btn{
                width: 50px;
                margin: 0;
                padding: 0;
                /deep/.v-input__slot{
                    margin: 0;
                }
            }
            /deep/.v-input__control{
                width: 100%;
            }
            /deep/.v-radio{
                grid-auto-flow: dense;
                display: grid;
                grid-template-columns: auto 1fr;
                & .v-input--selection-controls__input{
                    grid-column: 2/3;
                    justify-self: end;
                }
                & .v-label{
                    font-family: "Montserrat";
                    font-size: 12px;
                }
            }
        }
        .headline{
            display: grid;
            grid-template-columns: 1fr auto auto;
            border-bottom: 1px dashed rgba(87, 87, 87, 0.35);
            padding-top: 20px;
        }
        .headline-text{
            padding:10px 11px;
            font-family: "Montserrat";
            font-weight: bold;
            font-size: 12px;
            line-height: normal;
            text-transform: uppercase;
            color: #1F2041;
            &:first-child{
                padding-left: 0;
            }
        }
        .mail-headline{
            display: flex;
            flex-direction: column;
            padding-top: 20px;
            .mail-text{
                font-family: "Montserrat";
                width: 330px;
                border-bottom: 1px dashed rgba(87, 87, 87, 0.35);
                padding: 20px 0 5px;
                font-weight: normal;
                font-size: 12px;
                line-height: normal;
                color: #6B6B81;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }

        /deep/.c-select .select-label{
            grid-template-columns: 1fr 50px;
            grid-auto-flow: dense;
        }
        /deep/.c-select .select-label:after, /deep/.c-select .select-label:before{
            grid-column: 2/3;
        }

        .add-mail{
            padding-top: 20px;
            display: flex;
            .paragraph{
                position: relative;
            }
        }
        /deep/.c-button{
            margin-left: 20px;
        }
    }

    .error-text{
        position: absolute;
        bottom: -12px;
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

</style>