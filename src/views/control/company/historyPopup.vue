<template>
    <div class="popup">
        <v-dialog
                v-model="show_hide"
        >
            <v-card>
                <v-card-text>
                    <h5 class="bold-text">История</h5>
                    <p class="standard-text" v-if="modalList.company_name">Названия компании: {{modalList.company_name}}</p>
                    <p class="standard-text" v-if="modalList.legal_company_name">Юридическое название компании: {{modalList.legal_company_name}}</p>
                    <p class="standard-text" v-if="modalList.post_address">Адрес: {{modalList.post_address}}</p>
                    <p class="standard-text" v-if="modalList.legal_address">Юридический адрес: {{modalList.legal_address}}</p>
                    <p class="standard-text" v-if="modalList.city">Город: {{modalList.city}}</p>
                    <p class="standard-text" v-if="modalList.phone">Телефон: {{modalList.phone}}</p>
                    <p class="standard-text" v-if="modalList.finance_mail">E-mail для фин. уведомления: {{modalList.finance_mail}}</p>
                    <p class="standard-text" v-if="modalList.report_mail">E-mail для отчетов: {{modalList.report_mail}}</p>
                    <p class="standard-text" v-if="modalList.logo">Лого: {{modalList.logo}}</p>
                    <p class="standard-text" v-if="modalList.fax">Факс: {{modalList.fax}}</p>
                    <p class="standard-text" v-if="modalList.parent">Родительская компания: {{modalList.parent}}</p>
                    <p class="standard-text" v-if="modalList.okud">ОКУД: {{modalList.okud}}</p>
                    <p class="standard-text" v-if="modalList.inn">ИНН: {{modalList.inn}}</p>
                    <p class="standard-text" v-if="modalList.okonh">ОКОНХ: {{modalList.okonh}}</p>
                    <p class="standard-text" v-if="modalList.kpp">КПП: {{modalList.kpp}}</p>
                    <p class="standard-text" v-if="modalList.ogrn">ОГРН: {{modalList.ogrn}}</p>
                    <p class="standard-text" v-if="modalList.bank_name">Название банка: {{modalList.bank_name}}</p>
                    <p class="standard-text" v-if="modalList.checking_account">Акаунт: {{modalList.checking_account}}</p>
                    <p class="standard-text" v-if="modalList.bik">БИК: {{modalList.bik}}</p>
                    <p class="standard-text" v-if="modalList.correspondent_account">Кор. счет: {{modalList.correspondent_account}}</p>
                    <p class="standard-text" v-if="modalList.first_name">Имя: {{modalList.first_name}}</p>
                    <p class="standard-text" v-if="modalList.second_name">Фамилия: {{modalList.second_name}}</p>
                    <p class="standard-text" v-if="modalList.position">Должность: {{modalList.position}}</p>
                    <p class="standard-text" v-if="modalList.agreement">Условия оплаты: {{modalList.agreement}}</p>
                    <p class="standard-text" v-if="modalList.contract_number">Договор  №: {{modalList.contract_number}}</p>
                    <p class="standard-text" v-if="modalList.contract_date">Договор от: {{modalList.contract_date}}</p>
                    <p class="standard-text" v-if="modalList.commission_business">Комиссия бизнес: {{modalList.commission_business}}</p>
                    <p class="standard-text" v-if="modalList.commission_first">Комиссия первый: {{modalList.commission_first}}</p>
                    <p class="standard-text" v-if="modalList.commission_economy">Комиссия эконом: {{modalList.commission_economy}}</p>
                    <p class="standard-text" v-if="modalList.status">Статус: {{modalList.status}}</p>
                    <p class="standard-text" v-if="modalList.limit">Лимит: {{modalList.limit}}</p>
                    <p class="standard-text" v-if="modalList.residue_limit">Лимит остатка: {{modalList.residue_limit}}</p>
                    <p class="standard-text" v-if="modalList.invoice_payment">Возможность оплаты по счету: {{modalList.invoice_payment}}</p>
                    <p class="standard-text" v-if="modalList.fees_avia">Помешатъ сборы в таксу Авиа: {{modalList.fees_avia}}</p>
                    <p class="standard-text" v-if="modalList.support_contacts">Контакты службы поддержки: {{modalList.support_contacts}}</p>
                    <p class="standard-text" v-if="modalList.manager_id">Менеджер: {{modalList.manager_id}}</p>
                    <p class="standard-text" v-if="modalList.currency_id">Валюта компании: {{modalList.currency_id}}</p>
                    <p class="standard-text" v-if="modalList.countnumber">порядковый номер: {{modalList.countnumber}}</p>
                </v-card-text>
                <div class="d-flex">
                    <v-card-actions>
                        <v-btn
                                color="green darken-1"
                                flat="flat"
                                @click="show_hide = false"
                        >
                            Закрыть
                        </v-btn>
                    </v-card-actions>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>

    export default {
        name: "popup",
        components: {

        },
        props: {
            showModal: {
                type: Boolean,
                default: false
            },
            popupData: {
                type: Object,
                default: null
            }
        },
        data() {
            return {
                show_hide: this.showModal ? this.showModal : false,
                modalList: {
                    company_name: null,
                    legal_company_name: null,
                    post_address: null,
                    legal_address: null,
                    city: null,
                    phone: null,
                    finance_mail: null,
                    report_mail: null,
                    logo: null,
                    fax: null,
                    parent: null,
                    okud: null,
                    inn: null,
                    okonh: null,
                    kpp: null,
                    ogrn: null,
                    bank_name: null,
                    checking_account: null,
                    bik: null,
                    correspondent_account: null,
                    first_name: null,
                    second_name: null,
                    position: null,
                    agreement: null,
                    contract_number: null,
                    contract_date: null,
                    commission_business: null,
                    commission_first: null,
                    commission_economy: null,
                    status: null,
                    limit: null,
                    residue_limit: null,
                    invoice_payment: null,
                    fees_avia: null,
                    support_contacts: null,
                    manager_id: null,
                    currency_id: null,
                    countnumber: null,
                },
            }
        },
        mounted() {

        },
        methods: {

        },
        computed: {

        },
        watch: {
            popupData(val) {
                console.log(val);
                this.modalList = val
                // let key = Object.keys(val);
                // for (let i = 0; i < key.length; i ++){
                //     console.log(val[key[i]]);
                // }
            },
            show_hide(val) {
                this.$emit('hidePopup', val)
            },
            showModal(val) {
                this.show_hide = val;
            }
        }
    }
</script>

<style lang="scss" scoped>
    /deep/.v-dialog{
        max-width: 600px;
    }

    /deep/.c-input input{
        min-width: unset;
        width: 65px;
    }
    /deep/.v-menu{
        display: none;
    }

    /deep/.v-card__text{
        padding-bottom: 0;
    }

    /deep/.v-card__actions{
        display: flex;
        justify-content: flex-end;
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
</style>