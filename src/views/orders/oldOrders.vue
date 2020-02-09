<template>
    <div class="orders-content">
        <div class="headline">
            <h3 class="headline-text">Заказы</h3>
        </div>
        <div class="table-wrap">
            <v-data-table
                    :headers="headers"
                    :items="ordersData.orders"
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
                    <td>{{props.item.created_at}}</td>
                    <td>{{props.item.order_n}}</td>
                    <td>
                        <span v-if="props.item.status == 1" class="success" >выполнен</span>
                        <span v-else class="in-work" >в работе</span>
                    </td>
                    <td>Авиа</td>
                    <td>1111</td>
                    <td>{{getAuthor(props.item.created_id)}}</td>
                    <td>&#8381; {{props.item.order_summary}}</td>
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
    import cSelectInput from "@/components/base_components/cSelectInput";

    import * as types from "@/stores/modules/orders/types";

    export default {
        name: "OldOrders",
        components: {
            cSelectInput,
        },
        data() {
            return {
                pagination: {
                    rowsPerPage: 5,
                    rowsPerPageItems: [5, 10, 15, 20],
                },
                headers: [
                    {text: 'Дата создания', align: 'left', sortable: true, value: ''},
                    {text: 'Номер заказа', align: 'left', value: ''},
                    {text: 'Статус заказа', align: 'left', value: ''},
                    {text: 'Тип заказа', align: 'left', value: ''},
                    {text: 'Клиент', align: 'left', value: ''},
                    {text: 'Автор заказа', align: 'left', value: ''},
                    {text: 'Сумма заказа', align: 'left', value: ''}
                ],
                ordersData: [],
            }
        },
        mounted() {
            this.$store.dispatch("orders/" + types.A_ORDERS)
                .then(res => {
                    this.ordersData = res;
                });
        },
        methods: {
            getAuthor(id) {
                let name = this.ordersData.profile.first_name;
                return name;
            }
        },
        computed: {
            rowPerPageSet: {
                get() {
                    return this.rowsPerPageItems
                },
                set(value) {
                    this.pagination.rowsPerPage = value
                }
            },
            pages () {
                if (this.pagination.rowsPerPage == null ||
                    this.pagination.totalItems == null
                ) return 0;

                let countLength = (this.ordersData.orders != undefined) ? this.ordersData.orders.length : 0;
                return Math.ceil(countLength / this.pagination.rowsPerPage)
            },
        }
    }
</script>

<style lang="scss" scoped>
    .orders-content{
        padding: 0 33px 50px;
    }

    .headline{
        padding: 26px 0 19px;
        border-bottom: 1px solid rgba(31, 32, 65, 0.05);
        h3{
            margin: 0;
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
                content: 'Previous';
                position: absolute;
                top: 3px;
                left: 9px;
                font-size: 11px;
            }
        }
        li:last-child button{
            position: relative;
            width: 42px;
            &:after{
                content: 'Next';
                position: absolute;
                top: 3px;
                left: 9px;
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


    .success{
        background-color: #61E185;
        color: #fff;
        border-radius: 4px;
        padding: 2px 5px;
        width: min-content;
    }

    .in-work{
        background-color: #ffbb2f;
        color: #fff;
        border-radius: 4px;
        padding: 2px 5px;
        width: min-content;
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
    .weekDaysBlock span {
        padding: 2px 10px;
        border: 1px solid #5CDF81;
        margin: 0 1px;
        border-radius: 2px;
    }
</style>