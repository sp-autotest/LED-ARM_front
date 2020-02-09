<template>
    <div class="shedule-content">
        <div class="headline">
            <h3 class="headline-text">Расписание квотируемых рейсов</h3>
        </div>
        <div class="search-add-shedule">
            <div class="add-shedule">
                <router-link tag="span" class="router-link" to="/schedule/add">
                    <cButton buttonValue="Добавить расписание"></cButton>
                </router-link>
            </div>
            <div class="search-shedule">
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
                    :items="scheduleData"
                    :hide-actions="true"
                    :pagination.sync="pagination"
                    :search="search"
                    class="elevation-1"
            >
                <template slot="headerCell" scope="props">
                    <span class="history-datatable-th standard-text pr-2">
                      {{ props.header.text }}
                    </span>
                </template>
                <template slot="items" scope="props">
                        <td @click="editSchedule(props.item.id)" class="pr-2">{{getCity(props.item.departure_at)}}</td>
                        <td @click="editSchedule(props.item.id)" class="pr-2">{{getCity(props.item.arrival_at)}}</td>
                        <td @click="editSchedule(props.item.id)" class="pr-2">{{props.item.flights}}</td>
                        <td @click="editSchedule(props.item.id)" class="pr-2">{{props.item.period_begin_at}}</td>
                        <td @click="editSchedule(props.item.id)" class="pr-2">{{props.item.period_end_at}}</td>
                        <td @click="editSchedule(props.item.id)" class="pr-2">{{props.item.time_departure_at}}</td>
                        <td @click="editSchedule(props.item.id)" class="pr-2">{{props.item.time_arrival_at}}</td>
                        <td @click="editSchedule(props.item.id)" class="pr-2">{{props.item.is_transplantation ? 'Да' : 'Нет'}}</td>
                        <td @click="editSchedule(props.item.id)" class="pr-2 weekDaysBlock">
                            <span v-if="props.item.monday">Пн</span>
                            <span v-if="props.item.tuesday">Вт</span>
                            <span v-if="props.item.wednesday">Ср</span>
                            <span v-if="props.item.thursday">Чт</span>
                            <span v-if="props.item.friday">Пт</span>
                            <span v-if="props.item.saturday">Сб</span>
                            <span v-if="props.item.sunday">Вс</span>
                        </td>
                        <td @click="editSchedule(props.item.id)" class="pr-2">{{getAirlines(props.item.airlines_id)}}</td>
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
    import cButton from "@/components/base_components/cButton";
    import cSelectInput from "@/components/base_components/cSelectInput";

    import * as types from "@/stores/modules/blocks/types";

    export default {
        name: "Schedule",
        components: {
            cButton,
            cSelectInput,
        },
        data() {
            return {
                search: '',
                pagination: {
                    rowsPerPage: 5,
                    rowsPerPageItems: [5, 10, 15, 20],
                },
                headers: [
                    {text: 'Откуда', align: 'left', sortable: true, value: 'departure_at_name'},
                    {text: 'Куда', align: 'left', sortable: true, value: 'arrival_at_name'},
                    {text: 'Номер рейса', align: 'left', sortable: true, value: 'flights'},
                    {text: 'Период с', align: 'left', value: ''},
                    {text: 'Период по', align: 'left', value: ''},
                    {text: 'Время вылета', align: 'left', value: ''},
                    {text: 'Время прибытия', align: 'left', value: ''},
                    {text: 'Есть пересадка', align: 'left', value: ''},
                    {text: 'Дни недели', align: 'left', value: ''},
                    {text: 'Авиакомпания', align: 'left', value: ''}
                ],
                scheduleData: [],
                airData: [],
            }
        },
        mounted() {
            this.$store.dispatch("blocks/" + types.A_BLOCKS)
                .then(res => {
                    this.airData = res;
                    this.scheduleData = res.schedules;
                    this.scheduleData.forEach((val, key) => {
                        this.scheduleData[key] = {...this.scheduleData[key], ...{arrival_at_name: this.getCity(val.arrival_at)}}
                        this.scheduleData[key] = {...this.scheduleData[key], ...{departure_at_name: this.getCity(val.departure_at)}}
                    })
                });
            this.$store.dispatch("blocks/" + types.A_COMPANIES)
        },
        methods: {
            editSchedule(id) {
                this.$router.push('/schedule/add/' + id)
            },
            getCity(id) {
                let city = '';
                let data = this.airData.airports.filter((val) => {
                    if (val.id == id)  {
                        city = val.name_ru;
                    }
                });
                return city;
            },
            getAirlines(id) {
                let airlines = '';
                if (this.$store.getters['blocks/getAirlines']) {
                    this.$store.getters['blocks/getAirlines'].airlines.filter((val) => {
                        if (val.id == id) {
                            airlines = val.short_aviacompany_name_ru;
                        }
                    });
                }
                return airlines;
            },
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
                ) return 0
                let countLength = 0;
                if(this.scheduleData != undefined) {
                    countLength = this.scheduleData.length;
                }
                return Math.ceil(countLength / this.pagination.rowsPerPage)
            },
        }
    }
</script>

<style lang="scss" scoped>
    .shedule-content{
        overflow: auto;
        padding: 0 33px 50px;
    }

    .headline{
        padding: 26px 0;
        h5{
            margin: 0;
        }
    }

    /deep/.c-button button{
        width: max-content;
    }

    .search-add-shedule{
        display: grid;
        grid-template-columns: auto auto;

        .add-shedule{
            /deep/.c-button button{
                display: inline-block;
            }
        }
        .search-shedule{
            justify-self: end;
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
            min-width: max-content;
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

    .weekDaysBlock span {
        padding: 2px 10px;
        border: 1px solid #5CDF81;
        margin: 0 1px;
        border-radius: 2px;
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