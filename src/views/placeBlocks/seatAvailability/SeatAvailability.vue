<template>
    <div class="seat-availability-content">
        <div class="headline">
            <h3 class="headline-text">Наличие мест</h3>
        </div>
        <div class="search-seat-availability">
            <div class="search-seat-availability">
                <v-text-field
                        @input="searchDate()"
                        v-model="search"
                        append-icon="search"
                        label="YYYY-MM-DD"
                        single-line
                        hide-details
                ></v-text-field>
            </div>
        </div>
        <div class="table-wrap">
            <v-data-table
                    :headers="headers"
                    :items="seatAvailability"
                    :hide-actions="true"
                    :pagination.sync="pagination"
                    class="elevation-1"
            >
                <template slot="headerCell" scope="props">
                    <span class="datatable-th standard-text mr-3">
                      {{ props.header.text }}
                    </span>
                </template>
                <template slot="items" scope="props">
                    <td class="weekDaysBlock">{{props.item.date_departure_at}}
                        <span class="ml-2">{{getWeekDay(props.item.date_departure_at)}}</span>
                    </td>
                    <td>{{props.item.flightplaces.schedule[0].departure.name_ru}} / {{props.item.flightplaces.schedule[0].arrival.name_ru}}</td>
                    <td>{{props.item.flightplaces.farefamily.name_ru}}</td>
                    <td>
                        <input
                                type="text"
                                class="outline-none"
                                v-model="props.item.count_places"
                                @blur="saveCountPlaces(props.item.id, props.item.count_places)"
                        >
                    </td>
                    <td>{{props.item.count_places_reservation}}</td>
                    <td>{{props.item.count_places - props.item.count_places_reservation}}</td>
                </template>
            </v-data-table>
            <div class="text-xs-right pt-2 pagination-wrap">
                <div class="rowPerPage">
                    <cSelectInput
                            @input="pageChange()"
                            v-model.trim="pagination.rowsPerPage"
                            :selectItems="pagination.rowsPerPageItems"
                            selectPlaceholder="Кол-во строк"
                    >
                    </cSelectInput>
                </div>
                <v-pagination
                        v-model="pagination.current"
                        @input="pageChange()"
                        :length="pages"
                ></v-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import * as types from "@/stores/modules/blocks/types";
    import cSelectInput from "@/components/base_components/cSelectInput";

    export default {
        name: "SeatAvailability",
        components: {
            cSelectInput,
        },
        data() {
            return {
                pages: 0,
                search: '',
                pagination: {
                    current: 1,
                    rowsPerPage: 5,
                    rowsPerPageItems: [5, 10, 15, 20],
                },
                headers: [
                    {text: 'Дата вылета', align: 'left', sortable: true, value: ''},
                    {text: 'Расписание', align: 'left', value: ''},
                    {text: 'Класс', align: 'left', value: ''},
                    {text: 'Нач.', align: 'left', value: ''},
                    {text: 'Прод.', align: 'left', value: ''},
                    {text: 'Ост․', align: 'left', value: ''},
                ],
                seatAvailability: [],
            }
        },
        mounted() {
            let sendData = {
                page: this.pagination.page,
                per_page: this.pagination.rowsPerPage
            }
            this.$store.dispatch("blocks/" + types.A_GET_SEAT_AVAILABILITY, sendData)
                .then( res => {
                    this.seatAvailability = res.data.flights.data;
                    this.pages = res.data.flights.last_page
                })
        },
        methods: {
            searchDate() {
                this.$store.dispatch("blocks/" + types.A_SEARCH_SEAT_AVAILABILITY,this.search)
                    .then( res => {
                        console.log(res);
                        this.seatAvailability = res.data.flights.data;
                        this.pages = res.data.flights.last_page;
                        console.log(this.seatAvailability);
                    })
            },
            getWeekDay(date) {
                let newDate = new Date(date).getDay();
                let result = '';
                if (newDate == 0)
                    result = "Вс";
                else if (newDate == 1)
                    result = "Пн";
                else if (newDate == 2)
                    result = "Вт";
                else if (newDate == 3)
                    result = "Ср";
                else if (newDate == 4)
                    result = "Чт";
                else if (newDate == 5)
                    result = "Пт";
                else if (newDate == 6)
                    result = "Сб";
                return result
            },
            saveCountPlaces(id, count) {
                let data = {
                    id: id,
                    count: {
                        count_places: parseInt(count)
                    }
                }
                this.$store.dispatch("company/" + types.A_EDIT_COUNT_PLACES, data)
                    .then( res => {
                        console.log(res);
                    })
            },
            pageChange() {
                let sendData = {
                    page: this.pagination.current,
                    per_page: this.pagination.rowsPerPage
                }
                this.$store.dispatch("blocks/" + types.A_GET_SEAT_AVAILABILITY, sendData)
                    .then( res => {
                        this.seatAvailability = res.data.flights.data;
                        this.pages = res.data.flights.last_page
                    })
            },
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
        },
        watch: {

        }
    }
</script>

<style lang="scss" scoped>
    .seat-availability-content{
        padding: 0 33px 50px;
        min-width: 1000px;
    }

    .headline{
        padding: 26px 0;
        h5{
            margin: 0;
        }
    }

    .search-seat-availability{
        display: grid;
        justify-items: end;
        .search-seat-availability{
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
    .outline-none{
        outline: none;
        width: 30px;
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