<template>
    <div class="reports-content">
        <div class="headline">
            <h3 class="headline-style">ОТЧЕТЫ</h3>
        </div>
        <div class="reports-header">
            <div class="first-row mb-3">
                <cSelectInput
                        v-model.trim="sandData.company_id"
                        itemText="company_name"
                        :itemValue="'id'"
                        :selectItems="companyList"
                        selectPlaceholder="Компания"
                        class="mr-3"
                ></cSelectInput>
                <cSelect
                        inputLabel="По всем подчиненным компаниям"
                        class="mr-3"
                ></cSelect>
                <cButton
                        @click="toForm()"
                        buttonValue="сформировать"
                        class="mr-3"
                ></cButton>
                <cButton
                        buttonColor="#1F2041"
                        @click="unload()"
                        buttonValue="выгрузить"
                        class="mr-3"
                ></cButton>
                <cButton
                        @click="sand()"
                        buttonColor="#FFA927"
                        buttonValue="выслать"
                        class="mr-3"
                ></cButton>
            </div>
            <div class="second-row">
                <div class="date">
                    <h3 class="headline-style">Период С</h3>
                    <cDate
                            v-model.trim="sandData.start_date"
                            @dateChangeTwo="sandData.start_date = $event"
                            class="mr-3"
                    ></cDate>
                </div>
                <div class="date">
                    <h3 class="headline-style">Период По</h3>
                    <cDate
                            v-model.trim="sandData.end_date"
                            @dateChangeTwo="sandData.end_date = $event"
                    ></cDate>
                </div>
            </div>
        </div>
        <div class="table-wrap">
            <v-data-table
                    :headers="headers"
                    :items="reportsData"
                    :hide-actions="true"
                    :pagination.sync="pagination"
                    :search="search"
                    item-key="services[0].id"
                    class="elevation-1"
            >
                <template slot="headerCell" scope="props">
                    <span class="history-datatable-th standard-text pr-1">
                      {{ props.header.text }}
                    </span>
                </template>
                <template slot="items" scope="props">
                    <td>{{props.item.created_at|stringFirstWord}}</td>
                    <td>{{props.item.order_n}}</td>
                    <td>{{props.item.services[0].service_id}}</td>
                    <td>{{props.item.services[0].final_status}}</td>
                    <td>{{props.item.company.company_name}}</td>
                    <td>{{props.item.services[0].ticket.ticket_number}}</td>
                    <td>{{props.item.services[0].direction}}</td>
                    <td>{{props.item.services[0].departure_date|stringFirstWord}}</td>
                    <td>{{props.item.services[0].passenger.name}} {{props.item.services[0].passenger.surname}}</td>
                    <td>
                        {{getDifference(props.item.services[0].ticket.rate_fare, props.item.services[0].ticket.tax_fare)}}
                        {{props.item.company.currency.code_literal_iso_4217}}
                    </td>
                    <td>
                        {{props.item.services[0].ticket.tax_fare ? props.item.services[0].ticket.tax_fare : '0.00'}}
                        {{props.item.company.currency.code_literal_iso_4217}}
                    </td>
                    <td>
                        {{props.item.services[0].ticket.fine_exchange}}
                        {{props.item.company.currency.code_literal_iso_4217}}
                    </td>
                    <td>
                        {{props.item.services[0].ticket.types_fees_fare}}
                        {{props.item.company.currency.code_literal_iso_4217}}
                    </td>
                    <td>
                        {{props.item.services[0].ticket.rate_fare}}
                        {{props.item.company.currency.code_literal_iso_4217}}
                    </td>
                    <td>
                        {{props.item.services[0].ticket.summ_ticket}}
                        {{props.item.company.currency.code_literal_iso_4217}}
                    </td>
                    <td>
                        {{props.item.services[0].ticket.commission_fare}}
                        {{props.item.company.currency.code_literal_iso_4217}}
                    </td>
                </template>
            </v-data-table>
            <div class="text-xs-right pt-2 pagination-wrap">
                <div class="rowPerPage">
                    <cSelectInput
                            v-model.trim="pagination.rowsPerPage"
                            :selectItems="pagination.rowsPerPageItems"
                            selectPlaceholder="Кол-во строк"
                    >
                    </cSelectInput>
                </div>
                <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import * as types from "@/stores/modules/reports/types";

    import cSelect from "@/components/base_components/cSelect";
    import cSelectInput from "@/components/base_components/cSelectInput";
    import cDate from "@/components/base_components/cDate";
    import cButton from "@/components/base_components/cButton";

    export default {
        name: "Reports",
        data() {
            return {
                search: '',
                pagination: {
                    rowsPerPage: 5,
                    rowsPerPageItems: [5, 10, 15, 20],
                },
                headers: [
                    {text: 'Дата', align: 'left', sortable: true, value: ''},
                    {text: 'Заказ', align: 'left', value: ''},
                    {text: 'Услуга', align: 'left', value: ''},
                    {text: 'Тип', align: 'left', value: ''},
                    {text: 'Компания', align: 'left', value: ''},
                    {text: 'Билет', align: 'left', value: ''},
                    {text: 'Направление', align: 'left', value: ''},
                    {text: 'Дата с', align: 'left', value: ''},
                    {text: 'Пассажир', align: 'left', value: ''},
                    {text: 'Тариф', align: 'left', value: ''},
                    {text: 'Таксы', align: 'left', value: ''},
                    {text: 'Штраф', align: 'left', value: ''},
                    {text: 'Сбор', align: 'left', value: ''},
                    {text: 'Бруто А/К', align: 'left', value: ''},
                    {text: 'Цена билета', align: 'left', value: ''},
                    {text: 'Комиссия', align: 'left', value: ''}
                ],
                reportsData: [],
                companyList: [],
                sandData: {
                    company_id: '',
                    start_date: '',
                    end_date: '',
                }
            }
        },
        components: {
            cSelect,
            cSelectInput,
            cDate,
            cButton,
        },
        mounted() {
            this.$store.dispatch('reports/' + types.A_GET_REPORTS)
                .then( res => {
                    res.data.companies.filter( val => {
                        this.companyList.push({
                            company_name: val.company_name,
                            id: val.id
                        })
                    })
                })
        },
        methods: {
            getDifference(a, b) {
                if (b != null && b != undefined){
                    return parseFloat(a) - parseFloat(b)
                } else {
                    return parseFloat(a)
                }
            },
            toForm() {
                this.$store.dispatch('reports/' + types.A_FORM_REPORTS, this.sandData)
                    .then( res => {
                        let result = [];
                        function jsonCopy(src) {
                            return JSON.parse(JSON.stringify(src));
                        }
                        for (let i = 0; i < res.data.report.length; i++) {
                                result.push(res.data.report[i])
                                if (res.data.report[i].services[0].type_flight == 2){ //rt
                                    let copy = jsonCopy(res.data.report[i]);
                                    copy.services[0] = copy.services[1]
                                    result.push(copy)
                                }
                        }
                        this.reportsData = result
                    })
            },
            sand() {
                this.$store.dispatch('reports/' + types.A_SAND_REPORTS, this.sandData)
                    .then( res => {
                        console.log(res);
                    })
            },
            unload() {
                this.$store.dispatch('reports/' + types.A_UNLOAD_REPORTS, this.sandData)
                    .then( res => {
                        window.open(`http://test-redchain.ru/${res.data.file}`, '_blank');
                    })
            }
        },
        computed: {
            pages () {
                if (this.pagination.rowsPerPage == null ||
                    this.pagination.totalItems == null
                ) return 0
                let countLength = 0;
                if(this.reportsData != undefined) {
                    countLength = this.reportsData.length;
                }
                return Math.ceil(countLength / this.pagination.rowsPerPage)
            },
        }
    }
</script>

<style lang="scss" scoped>
    .reports-content{
        min-width: 1000px;
        padding: 29px 33px;
    }
    .headline {
        padding-bottom: 19px;
        border-bottom: 1px solid rgba(31, 32, 65, 0.05);

        h3 {
            margin: 0;
        }
    }
    .headline-style {
        font-family: "Montserrat";
        font-weight: bold;
        font-size: 12px;
        text-transform: uppercase;
        color: #1F2041;
        margin-bottom: 5px;
    }
    .reports-header{
        padding: 20px 0;

        .first-row{
            display: flex;
            align-items: center;
            /deep/.v-messages{
                display: none;
            }
            /deep/.select-label{
                margin: 0;
            }
            /deep/.c-button button{
                margin: 0;
            }
            /deep/.v-input__slot{
                width: 100%;
                min-width: unset;
            }
            /deep/.select-label{
                white-space: nowrap;
            }
        }
        .second-row{
            display: flex;

            /deep/.c-date{
                width: 220px;
            }
            /deep/.v-menu{
                display: none;
            }
        }
    }

    /* _DATA TABLE_ */

    .elevation-1{
        box-shadow: none!important;
        padding: 35px 0;

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
                    white-space: nowrap;
                    padding-left: 0;
                    padding-right: 3px;
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
            /*padding: 0;*/
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
    
    /* SERVICE_STATUS */
    
    .status-red,
    .status-green,
    .status-light-green,
    .status-orange,
    .status-yellow,
    .status-purple{
        width: max-content;
        box-sizing: border-box;
        border-radius: 2px;
        padding: 2px 13px;
        font-family: "Montserrat";
        font-weight: normal;
        font-size: 10px;
        line-height: normal;
        color: #1F2041;
    }
    .status-red{
        border: 2px solid red;
    }
    .status-green{
        border: 2px solid #5CDF81;
    }
    .status-light-green{
        border: 2px solid #65f68f;
    }
    .status-orange{
        border: 2px solid orange;
    }
    .status-yellow{
        border: 2px solid yellow;
    }
    .status-purple{
        border: 2px solid purple;
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
</style>