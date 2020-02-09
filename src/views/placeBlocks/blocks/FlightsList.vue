<template>
    <div class="flights-content">
        <div class="flights-header">
            <div class="headline">
                <h5>Список полётов</h5>
                <div class="search">
                    <cInput
                        v-model="search"
                        inputPadding="9px 10px"
                        inputPlaceholder="Поиск..."
                    ></cInput>
                </div>
            </div>
        </div>
        <div class="table-wrap">
            <v-data-table
                    :headers="headers"
                    :items="flightsData"
                    :search="search"
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
                    <td>{{props.item.date_departure_at}}</td>
                    <td>
                        <input
                                type="text"
                                class="outline-none"
                                v-model="props.item.count_places"
                                v-mask="'#####################'"
                                @blur="saveCountPlaces(props.item.id, props.item.count_places)"
                        >
                    </td>
                    <td>
                        <input
                                type="text"
                                class="outline-none"
                                v-model="props.item.ow"
                                @blur="saveOlderOw(props.item.id, props.item.ow)"
                        >
                    </td>
                    <td>
                        <input
                                type="text"
                                class="outline-none"
                                v-model="props.item.infant_ow"
                                @blur="saveInfantOw(props.item.id, props.item.infant_ow)"
                        >
                    </td>
                    <td>
                        <input
                                type="text"
                                class="outline-none"
                                v-model="props.item.rt"
                                @blur="saveOlderRt(props.item.id, props.item.rt)"
                        >
                    </td>
                    <td>
                        <input
                                type="text"
                                class="outline-none"
                                v-model="props.item.infant_rt"
                                @blur="saveInfantRt(props.item.id, props.item.infant_rt)"
                        >
                    </td>
                </template>
                <template slot="no-data">
                    <span class="history-no-data">Нет данных</span>
                </template>
            </v-data-table>
            <div class="text-xs-right pt-2">
                <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import * as types from "@/stores/modules/blocks/types";
    import cInput from "@/components/base_components/cInput";

    export default {
        name: "flightsList",
        components: {
            cInput
        },
        data() {
            return {
                search: '',
                pagination: {
                    rowsPerPage: 15
                },
                rowsPerPageItems: [5, 10, 15, 20],
                headers: [
                    {text: 'Дата вылета', align: 'left', sortable: true, value: 'date_departure_at'},
                    {text: 'Количество мест', align: 'left', value: 'count_places'},
                    {text: 'Стоимость взрослый OW', align: 'left', value: 'ow'},
                    {text: 'Стоимость инфант OW', align: 'left', value: 'infant_ow'},
                    {text: 'Стоимость взрослый RT', align: 'left', value: 'rt'},
                    {text: 'Стоимость инфант RT', align: 'left', value: 'infant_rt'}
                ],
                flightsData: [],
            }
        },
        mounted() {
            function f(){
                return 1
            }
            this.$store.dispatch("blocks/" + types.A_BLOCKS)
                .then(res => {
                    this.flightsData = res.flights.filter(val => {
                        if(val.flights_places_id == this.$route.params.id) {
                            return val
                        }
                    });
                })
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
                let countLength = 0;
                if(this.flightsData.length != 0) {
                    countLength = this.flightsData.length;
                }
                return Math.ceil(countLength / this.pagination.rowsPerPage)
            },
        },
        methods: {
            saveCountPlaces(id, count) {
                let data = {
                    id: id,
                    value: {
                        count_places: parseInt(count)
                    }
                }

                this.$store.dispatch("blocks/" + types.A_EDIT_COUNT_PLACES, data)
            },
            saveOlderOw(id, val) {
                let data = {
                    id: id,
                    value: {
                        ow: parseFloat(val)
                    }
                };
                this.$store.dispatch("blocks/" + types.A_EDIT_COUNT_PLACES, data)
            },
            saveOlderRt(id, val) {
                let data = {
                    id: id,
                    value: {
                        rt: parseFloat(val)
                    }
                };
                this.$store.dispatch("blocks/" + types.A_EDIT_COUNT_PLACES, data)
            },
            saveInfantOw(id, val) {
                let data = {
                    id: id,
                    value: {
                        infant_ow: parseFloat(val)
                    }
                };
                this.$store.dispatch("blocks/" + types.A_EDIT_COUNT_PLACES, data)
            },
            saveInfantRt(id, val) {
                let data = {
                    id: id,
                    value: {
                        infant_rt: parseFloat(val)
                    }
                };
                this.$store.dispatch("blocks/" + types.A_EDIT_COUNT_PLACES, data)
            },
        }
    }
</script>

<style lang="scss" scoped>
    .flights-content{
        /*padding: 0 33px 50px;*/
    }

    .headline{
        display: flex;
        flex-flow: row wrap;
        align-items: flex-start;
        justify-content: space-between;
        padding: 26px 0;
        margin-top: 26px;
        border-top: 1px dashed #ccc;
        h5{
            font-size: 16px;
            font-weight: 600;
            color: #1F2041;
            margin: 0;
        }
        /deep/.c-input input{
            min-width: 100px;
            width: 150px;
        }
    }

    .elevation-1 {
        box-shadow: none !important;
        padding: 35px 0;

        /deep/ .theme--light.v-table thead tr:first-child {
            border: none;
        }

        /deep/ table.v-table {
            background-color: transparent;

            & thead tr {
                height: auto;
            }

            & tbody {
                & tr:not(:last-child) {
                    border: none;
                }

                & td {
                    height: 36px;
                }
            }
        }

        /deep/ .v-datatable__progress {
            display: none;
        }

        /deep/ .v-datatable thead th {
            padding: 0;

            &.column.sortable.active .v-icon {
                display: none;
            }
        }

        /deep/ table.v-table tbody td {
            padding: 0;
        }
    }

    /deep/ .v-pagination {
        li button {
            outline: none;

            i {
                display: none;
            }
        }

        li:first-child button {
            position: relative;
            width: 60px;

            &:after {
                content: 'Назад';
                position: absolute;
                top: 3px;
                left: 14px;
                font-size: 11px;
            }
        }

        li:last-child button {
            position: relative;
            width: 60px;

            &:after {
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

        & .v-pagination__item--active {
            background-color: #5CDF81 !important;
        }

        & .v-pagination__navigation {
            height: 22px;
            border-radius: 10px;
        }
    }

    /deep/ table.v-table tbody td {
        font-family: "Montserrat";
        font-weight: bold;
        font-size: 12px;
        line-height: normal;
        color: #575870;
    }
    .history-no-data{
        display: block;
        text-align: center;
    }

    .outline-none{
        outline: none;
    }

    .standard-text{
        font-family: "Montserrat";
        font-weight: normal;
        font-size: 12px;
        line-height: normal;
        color: #6B6B81;
    }
</style>