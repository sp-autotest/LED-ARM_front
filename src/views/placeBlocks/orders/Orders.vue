<template>
    <div class="orders-content">
        <div class="headline">
            <h3 class="headline-text">Заказы</h3>
        </div>
        <div class="search-orders">
            <div class="search-orders">
                <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                ></v-text-field>
            </div>
        </div>
        <div class="table-wrap">
            <v-data-table
                    :headers="headers"
                    :items="orderData"
                    :hide-actions="true"
                    :pagination.sync="pagination"
                    :search="search"
                    class="elevation-1"
            >
                <template slot="headerCell" scope="props">
                    <span class="datatable-th standard-text mr-3">
                      {{ props.header.text }}
                    </span>
                </template>
                <template slot="items" scope="props">
                    <td @click="editOrder(props.item)">{{props.item.order_n}}</td>
                    <td @click="editOrder(props.item)">{{props.item.created_at|stringFirstWord}}</td>
                    <td @click="editOrder(props.item)">{{convertDate(props.item.created_at, props.item.time_limit)}}</td>
                    <td @click="editOrder(props.item)">
                        <span :class="['status-text', {'green-text' : props.item.status == 2}]">
                            {{props.item.status == 2 ? 'Выполнен' : 'В работе'}}
                        </span>
                    </td>
                    <td @click="editOrder(props.item)">{{props.item.services.length}}</td>
                    <td @click="editOrder(props.item)">
                        {{props.item.services[0].flight.flightplaces.schedule[0].arrival.name_ru}} /
                        {{props.item.services[0].flight.flightplaces.schedule[0].departure.name_ru}}
                    </td>
                    <td @click="editOrder(props.item)" v-if="props.item.services[0].type_flight == 2">
                        {{props.item.services[0].flight.flightplaces.schedule[0].departure.name_ru}} /
                        {{props.item.services[0].flight.flightplaces.schedule[0].arrival.name_ru}}
                    </td>
                    <td @click="editOrder(props.item)" v-else>-</td>
                    <td @click="editOrder(props.item)">{{props.item.services[0].departure_date|stringFirstWord}}</td>
                    <td @click="editOrder(props.item)" v-if="props.item.services[0].type_flight == 2">
                        {{props.item.services[props.item.services.length - 1].departure_date|stringFirstWord}}
                    </td>
                    <td @click="editOrder(props.item)" v-else>-</td>
                    <td @click="editOrder(props.item)">{{props.item.services[0].pnr ? props.item.services[0].pnr : '-'}}</td>
                    <td @click="editOrder(props.item)">{{props.item.services[0].service_status == 7 ? 'да' : 'нет'}}</td>
                    <td @click="editOrder(props.item)">{{props.item.company.company_name}}</td>
                    <td @click="editOrder(props.item)">Туркменаирланд</td>
                    <td @click="editOrder(props.item)">{{props.item.user.profile.first_name}} {{props.item.user.profile.second_name}}</td>
                </template>
            </v-data-table>
            <div class="text-xs-right pt-2 pagination-wrap">
                <div class="rowPerPage">
                    <cSelectInput
                            v-model.trim="pagination.rowsPerPage"
                            :selectItems="pagination.rowsPerPageItems"
                            @input="changePage()"
                            selectPlaceholder="Кол-во строк"
                    >
                    </cSelectInput>
                </div>
                <v-pagination
                        v-model="pagination.current"
                        :length="pages"
                        @input="changePage()"
                ></v-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import * as types from "@/stores/modules/blocks/types";

    import cSelectInput from "@/components/base_components/cSelectInput";

    export default {
        name: "Orders",
        components: {
            cSelectInput,
        },
        data() {
            return {
                search: '',
                pages: 0,
                pagination: {
                    current: 1,
                    rowsPerPage: 5,
                    rowsPerPageItems: [5, 10, 15, 20],
                },
                headers: [
                    {text: 'Номер заказа', align: 'left', sortable: true, value: ''},
                    {text: 'Дата', align: 'left', value: ''},
                    {text: 'Выписать до', align: 'left', value: ''},
                    {text: 'Статус', align: 'left', value: ''},
                    {text: 'Количество билетов', align: 'left', value: ''},
                    {text: 'Блок туда', align: 'left', value: ''},
                    {text: 'Блок обратно', align: 'left', value: ''},
                    {text: 'Дата вылета туда', align: 'left', value: ''},
                    {text: 'Дата вылета обратно', align: 'left', value: ''},
                    {text: 'PNR', align: 'left', value: ''},
                    {text: 'Выписан в GDS', align: 'left', value: ''},
                    {text: 'Контрагент', align: 'left', value: ''},
                    {text: 'Авиакомпания', align: 'left', value: ''},
                    {text: 'Автор', align: 'left', value: ''},
                ],
                orderData: [],
            }
        },
        mounted() {
            let pagination = {
                page: this.pagination.current,
                per_page: this.pagination.rowsPerPage
            }
            this.$store.dispatch("blocks/" + types.A_GET_ORDERS, pagination)
                .then( res => {
                    this.orderData = res.data.orders.data;
                    this.pages = res.data.orders.last_page;
                })
        },
        methods: {
            editOrder(data) {
                this.$store.dispatch("blocks/" + types.A_SET_CURRENT_ORDER, data)
                    .then( () => {
                        this.$router.push(`orders/edit/${data.id}`)
                    })
            },
            convertDate(date, seconds) {
                let newDate = new Date(date).getTime() + (seconds * 1000);
                let result = new Date(newDate);
                let year = result.getFullYear();
                let mouth = (result.getMonth() + 1) < 10 ? "0"+ (result.getMonth() + 1) : (result.getMonth() + 1);
                let day = result.getDate() < 10 ? "0"+ result.getDate(): result.getDate();
                return year +"-"+ mouth +"-"+ day
            },
            changePage() {
                let pagination = {
                    page: this.pagination.current,
                    per_page: this.pagination.rowsPerPage
                }
                this.$store.dispatch("blocks/" + types.A_GET_ORDERS, pagination)
                    .then( res => {
                        this.orderData = res.data.orders.data;
                    })
            }
        },
        computed: {
            // rowPerPageSet: {
            //     get() {
            //         return this.rowsPerPageItems
            //     },
            //     set(value) {
            //         this.pagination.rowsPerPage = value
            //     }
            // },
            // pages () {
            //     if (this.pagination.rowsPerPage == null ||
            //         this.pagination.totalItems == null
            //     ) return 0
            //     let countLength = 0;
            //     if(this.feesData[0] != undefined) {
            //         countLength = this.feesData[0].feesplaces.length;
            //     }
            //     return Math.ceil(countLength / this.pagination.rowsPerPage)
            // },
        }
    }
</script>

<style lang="scss" scoped>
    .orders-content{
        padding: 0 33px 50px;
        min-width: 1000px;
    }

    .headline{
        padding: 26px 0;
        h5{
            margin: 0;
        }
    }

    .search-orders{
        display: grid;
        justify-items: end;
        .search-orders{
            display: flex;
            align-items: center;
            /* _SEARCH_INPUT STYLE_ */
            /deep/.v-text-field{
                padding: 0;
                margin: 0;
            }
            /deep/.v-text-field > .v-input__control > .v-input__slot:before{
                display: none;
            }
            /deep/.v-text-field > .v-input__control > .v-input__slot:after{
                display: none;
            }
            /deep/ .v-input {
                .v-label, input{
                    font-family: "Montserrat";
                    font-size: 12px;
                    line-height: 20px;
                    color: rgba(31, 32, 65, 0.75);
                    outline: none;
                }
            }
            /deep/.v-text-field > .v-input__control > .v-input__slot{
                display: flex;
                border: 1px solid rgba(31, 32, 65, 0.5);
                border-radius: 4px;
                padding: 3px 10px;
                & .v-input__append-inner{
                    align-self: center;
                }
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
                    & .status-text{
                        width: max-content;
                        box-sizing: border-box;
                        border-radius: 2px;
                        padding: 2px 13px;
                        font-weight: normal;
                        font-size: 10px;
                        line-height: normal;
                        border: 2px solid #FF5B27;
                    }
                    & .green-text{
                        border: 2px solid #5CDF81;
                    }

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
            padding: 0 0 0 5px;

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
    .headline-text{
        font-family: "Montserrat";
        font-weight: bold;
        font-size: 12px;
        line-height: normal;
        text-transform: uppercase;
        color: #1F2041;
    }
</style>