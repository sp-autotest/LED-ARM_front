<template>
    <div class="invoices-content">
        <div class="company-info-wrap">
            <div class="company-info">
                <h5 class="standard-text">Компания</h5>
                <div class="paragraph">
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
            </div>
            <div class="bill-btn-wrap">
                <cButton
                        @click.native="setBill()"
                        :disabled="billDisabled"
                        buttonValue="выставить"
                ></cButton>
            </div>
        </div>
        <div class="table-wrap">
            <v-data-table
                    :headers="headers"
                    :items="invoices"
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
                    <td @click="selectRow(props.item.company_id, getCompany(props.item.company_id), props.item.invoice_amount, props.item.currency.code_literal_iso_4217, props.item.currency_id)">{{props.item.invoice_date}}</td>
                    <td @click="selectRow(props.item.company_id, getCompany(props.item.company_id), props.item.invoice_amount, props.item.currency.code_literal_iso_4217, props.item.currency_id)">{{getCompany(props.item.company_id)}}</td>
                    <td @click="selectRow(props.item.company_id, getCompany(props.item.company_id), props.item.invoice_amount, props.item.currency.code_literal_iso_4217, props.item.currency_id)">{{props.item.invoice_amount}} {{props.item.currency.code_literal_iso_4217}}</td>
                    <td @click="downloadPdf(props.item.path)">
                        <svg width="16px" height="16px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                             viewBox="0 0 471.2 471.2" style="enable-background:new 0 0 471.2 471.2;" xml:space="preserve"><g>
                            <g>
                                <path d="M457.7,230.15c-7.5,0-13.5,6-13.5,13.5v122.8c0,33.4-27.2,60.5-60.5,60.5H87.5c-33.4,0-60.5-27.2-60.5-60.5v-124.8 c0-7.5-6-13.5-13.5-13.5s-13.5,6-13.5,13.5v124.8c0,48.3,39.3,87.5,87.5,87.5h296.2c48.3,0,87.5-39.3,87.5-87.5v-122.8 C471.2,236.25,465.2,230.15,457.7,230.15z"/>
                                <path d="M226.1,346.75c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4l85.8-85.8c5.3-5.3,5.3-13.8,0-19.1c-5.3-5.3-13.8-5.3-19.1,0l-62.7,62.8 V30.75c0-7.5-6-13.5-13.5-13.5s-13.5,6-13.5,13.5v273.9l-62.8-62.8c-5.3-5.3-13.8-5.3-19.1,0c-5.3,5.3-5.3,13.8,0,19.1 L226.1,346.75z"/>
                            </g>
                        </g>
                        </svg>
                    </td>
                </template>
            </v-data-table>
            <div class="text-xs-right pt-2 pagination-wrap">
                <div class="rowPerPage">
                    <cSelectInput
                            @input="getInvoices()"
                            v-model.trim="pagination.rowsPerPage"
                            :selectItems="pagination.rowsPerPageItems"
                            selectPlaceholder="Кол-во строк"
                    >
                    </cSelectInput>
                </div>
                <v-pagination
                        @input="getInvoices()"
                        v-model="pagination.current"
                        :length="pages"
                ></v-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import * as types from "@/stores/modules/finance/types";
    import * as blockTypes from "@/stores/modules/blocks/types";
    import * as companyTypes from "@/stores/modules/controls/company/types";

    import cButton from "@/components/base_components/cButton";
    import cSelectInput from "@/components/base_components/cSelectInput";
    import cInput from "@/components/base_components/cInput";

    export default {
        name: "Invoices",
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
                ],
                invoices: [],
                companies: [],
                currency: [],
                sendData: {
                    company_id: '',
                    amount: '',
                    currency_id: '',
                }
            }
        },
        mounted() {
            this.getInvoices()
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
                if (this.sendData.company_id && this.sendData.amount && this.sendData.currency_id){
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
            },
        },
        methods: {
            downloadPdf(path) {
                let newPath = "test-redchain.ru" + path.split('test-redchain.ru')[1]
                window.open(path, "_blanck")
            },
            setBill() {
                this.$store.dispatch("finance/" + types.A_SET_BILL, this.sendData)
                    .then( res => {
                        window.open(res.data.bill.path, "_blanck")
                    })
            },
            getCompany(id) {
                let result = '-'
                this.companies.filter( val => {
                    if (val.id == id) {
                        result = val.company_name
                    }
                })
                return result
            },
            getInvoices() {
                let pagination = {
                    page: this.pagination.current,
                    per_page: this.pagination.rowsPerPage
                }
                this.$store.dispatch("finance/" + types.A_GET_INVOICES, pagination)
                    .then( res => {
                        this.invoices = res.data.bills.data;
                        this.pages = res.data.bills.last_page
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
            grid-column-gap: 25px;
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
                    cursor: pointer;
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