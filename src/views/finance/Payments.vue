<template>
    <div class="payments-content">
        <div class="company-info-wrap">
            <div class="company-info">
                <h5 class="standard-text">Компания</h5>
                <div class="paragraph gap-non">
                    <cSelectInput
                            v-model="sendData.company_id"
                            itemText="company_name"
                            itemValue="id"
                            :selectItems="companies"
                    ></cSelectInput>
                </div>
                <h5 class="standard-text">Сумма</h5>
                <div class="paragraph">
                    <cInput
                            v-model="sendData.amount"
                            inputPadding="9px 10px"
                    ></cInput>
                    <cSelectInput
                            v-model="sendData.currency_id"
                            itemText="code_literal_iso_4217"
                            itemValue="id"
                            :selectItems="currency"
                    ></cSelectInput>
                </div>
                <h5 class="standard-text">Коментарий</h5>
                <div class="paragraph">
                    <cInput
                            v-model="sendData.comment"
                            inputPadding="9px 10px"
                    ></cInput>
                </div>
            </div>
            <div class="bill-btn-wrap">
                <cButton
                        @click.native="setPaymants()"
                        :disabled="billDisabled"
                        buttonValue="внести"
                ></cButton>
            </div>
        </div>
        <div class="table-wrap">
            <v-data-table
                    :headers="headers"
                    :items="payment"
                    :hide-actions="true"
                    :pagination.sync="pagination"
                    class="elevation-1"
            >
                <template slot="headerCell" scope="props">
                    <span class="history-datatable-th standard-text">
                      {{ props.header.text }}
                    </span>
                </template>
                <template slot="items" scope="props">
                    <td>{{props.item.payment_date|stringFirstWord}}</td>
                    <td>{{props.item.account ? props.item.account.company.company_name : '-'}}</td>
                    <td>{{props.item.payment_summ}} {{props.item.currency.code_literal_iso_4217}}</td>
                    <td>{{props.item.manager.profile.first_name}} {{props.item.manager.profile.second_name}}</td>
                    <td>{{props.item.comment}}</td>
                </template>
            </v-data-table>
            <div class="text-xs-right pt-2 pagination-wrap">
                <div class="rowPerPage">
                    <cSelectInput
                            @input="getPayment()"
                            v-model.trim="pagination.rowsPerPage"
                            :selectItems="pagination.rowsPerPageItems"
                            selectPlaceholder="Кол-во строк"
                    >
                    </cSelectInput>
                </div>
                <v-pagination
                        @input="getPayment()"
                        v-model="pagination.current"
                        :length="pages"
                ></v-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import * as types from "@/stores/modules/finance/types";
    import * as companyTypes from "@/stores/modules/controls/company/types";
    import * as blockTypes from "@/stores/modules/blocks//types";

    import cButton from "@/components/base_components/cButton";
    import cSelectInput from "@/components/base_components/cSelectInput";
    import cInput from "@/components/base_components/cInput";

    export default {
        name: "Payments",
        components: {
            cSelectInput,
            cInput,
            cButton,
        },
        data() {
            return {
                pages: 1,
                pagination: {
                    current: 1,
                    rowsPerPage: 5,
                    rowsPerPageItems: [5, 10, 15, 20],
                },
                headers: [
                    {text: 'Дата', align: 'left', value: ''},
                    {text: 'Компания', align: 'left', value: ''},
                    {text: 'Сумма', align: 'left', value: ''},
                    {text: 'Менеджер', align: 'left', value: ''},
                    {text: 'Комментарий', align: 'left', value: ''},
                ],
                payment: [],
                companies: [],
                currency: [],
                sendData: {
                    company_id: '',
                    amount: '',
                    currency_id: '',
                    comment: ''
                }
            }
        },
        mounted() {
            this.getPayment();
            this.$store.dispatch("company/" + companyTypes.A_GET_COMPANY)
                .then( res => {
                    this.companies = res.data.companies
                });
            this.$store.dispatch("blocks/" + blockTypes.A_CURRENCIES)
                .then(res => {
                    this.currency = res.data;
                })
        },
        computed: {
            billDisabled() {
                if (this.sendData.company_id && this.sendData.amount && this.sendData.currency_id && this.sendData.comment){
                    return false
                } else {
                    return true
                }
            },
            rowPerPageSet: {
                get() {
                    return this.rowsPerPageItems
                },
                set(value) {
                    this.pagination.rowsPerPage = value
                }
            }
        },
        methods: {
            setPaymants() {
                this.$store.dispatch("finance/" + types.A_SET_PAYMENTS, this.sendData)
                    .then( res => {
                        window.open(res.data.bill.path, "_blanck")
                    })
            },
            getPayment() {
                let pagination = {
                    page: this.pagination.current,
                    per_page: this.pagination.rowsPerPage
                }
                this.$store.dispatch("finance/" + types.A_GET_PAYMENT, pagination)
                    .then( res => {
                        console.log(res);
                        this.payment = res.data.payments.data;
                        this.pages = res.data.payments.last_page
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .company-info-wrap{
        display: grid;
        grid-template-columns: auto 1fr;
        padding: 30px 0 15px;
        border-bottom: 1px dashed #dedede;

        .company-info{
            display: grid;
            grid-template-rows: auto 1fr;
            grid-auto-flow: column;
            grid-column-gap: 15px;
            h5, p{
                margin: 0;
            }
        }
        .bill-btn-wrap{
            justify-self: end;
        }
    }

    .paragraph{
        display: grid;
        grid-template-columns: auto auto;
        grid-gap: 15px;
        &.gap-non{
            grid-gap: 0;
        }
        /deep/.c-input input{
            min-width: unset;
        }
    }

    /* _DATA TABLE_ */

    .elevation-1{
        box-shadow: none!important;
        padding: 15px 0 35px;

        /deep/.theme--light.v-table thead tr:first-child{
            border: none;
        }
        /deep/table.v-table{
            background-color: transparent;
            & thead tr{
                height: auto;
            }
            & tbody{
                & tr:not(:last-child){
                    border: none;
                }
                & td{
                    height: 36px;
                }
            }
        }
        /deep/.v-datatable__progress{
            display: none;
        }
        /deep/.v-datatable thead th{
            padding: 0;
            &.column.sortable.active .v-icon{
                display: none;
            }
        }
        /deep/table.v-table tbody td{
            padding: 0;
        }
    }

    .text-xs-right,.paragraph-wrap{
        display: flex;
        justify-content: space-between;
    }
    /deep/.v-select > .v-input__control > .v-input__slot{
        min-width: unset;
    }
    .rowPerPage{
        width: 130px;
    }

    /deep/.v-pagination {
        li button{
            outline: none;
            i{
                display: none;
            }
        }
        li:first-child button{
            position: relative;
            width: 60px;
            &:after{
                content: 'Назад';
                position: absolute;
                top: 3px;
                left: 14px;
                font-size: 11px;
            }
        }
        li:last-child button{
            position: relative;
            width: 60px;
            &:after{
                content: 'Далее';
                position: absolute;
                top: 3px;
                left: 14px;
                font-size: 11px;
            }
        }
        & .v-pagination__item {
            border-radius: 50%;
            font-size: 11px;
            min-width: 22px;
            height: 22px;
        }
        & .v-pagination__item--active{
            background-color: #5CDF81!important;
        }
        & .v-pagination__navigation{
            height: 22px;
            border-radius:10px;
        }
    }

    /deep/table.v-table tbody td{
        font-family: "Montserrat";
        font-weight: bold;
        font-size: 12px;
        line-height: normal;
        color: #575870;
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
    .green-text{
        font-family: "Montserrat";
        font-weight: bold;
        font-size: 12px;
        line-height: normal;
        color: #5CDF81;
    }
</style>