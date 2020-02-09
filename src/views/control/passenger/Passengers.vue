<template>
    <div class="passengers">
        <div class="search-add-passenger">
            <div class="headline">
                <h3 class="headline-text">Пассажиры</h3>
            </div>
            <div class="search-passenger">
                <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                        @input="passengerSearch()"
                ></v-text-field>
            </div>
        </div>
        <div class="table-wrap">
            <v-data-table
                    :headers="headers"
                    :items="passengerData"
                    :total-items="passengerLength"
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
                    <td @click="editPassenger(props.item)">{{props.item.name}}</td>
                    <td @click="editPassenger(props.item)">{{props.item.surname}}</td>
                    <td @click="editPassenger(props.item)">{{props.item.date_birth_at}}</td>
                    <td @click="editPassenger(props.item)">{{getCountry(props.item.country_id)}}</td>
                    <td @click="editPassenger(props.item)">{{getDocumentType(props.item.type_documents)}}</td>
                    <td @click="editPassenger(props.item)">{{props.item.passport_number}}</td>
                    <td @click="editPassenger(props.item)">{{props.item.expired}}</td>
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
                <v-pagination @input="pageChange()" v-model="pagination.current" :length="pages"></v-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import * as types from "@/stores/modules/controls/types";
    import * as types_search from "@/stores/modules/service_search/types";

    import cSelectInput from "@/components/base_components/cSelectInput";

    export default {
        name: "Passengers",
        components: {
            cSelectInput,
        },
        data() {
            return {
                countries: [],
                passengerLength: 0,
                passengerData: [],
                search: '',
                searchPagin: false,
                pagination: {
                    current: 1,
                    rowsPerPage: 5,
                    rowsPerPageItems: [5, 10, 15, 20]
                },
                headers: [
                    {text: 'Имя', align: 'left',  value: 'name'},
                    {text: 'Фамилия', align: 'left', value: 'surname'},
                    {text: 'Дата рождения', align: 'left', value: ''},
                    {text: 'Гражданство', align: 'left', value: ''},
                    {text: 'Тип документа', align: 'left', value: ''},
                    {text: 'Номер документа', align: 'left', value: ''},
                    {text: 'Дата окончания документа', align: 'left', value: ''},
                ],
                feesData: [],
            }
        },
        mounted() {
            this.$store.dispatch('service_search/' + types_search.A_GET_COUNTRIES)
                .then(res => {
                    this.countries = this.$store.state.service_search.countries;
                })
            let paginParam = {
                page: 1,
                bypage: this.pagination.rowsPerPage
            }
            this.$store.dispatch('controls/' + types.A_PASSENGER, paginParam)
                .then(res => {
                    this.passengerLength = res.data.passengers.total
                    this.passengerData = res.data.passengers.data
                })
        },
        methods: {
            getDocumentType(id) {
                if (id == 1){
                    return "Паспорт"
                } else {
                    return "Другой документ"
                }
            },
            getCountry(id) {
                let country = '';
                this.countries.filter( (val) => {
                    if (id == val.id){
                        country = val.name_ru
                    }
                })
                return country;
            },
            editPassenger(item) {
                this.$store.dispatch('controls/' + types.A_PASSENGER_EDIT, item)
                    .then( () => {
                        this.$router.push('/control/passenger/edit')
                    })
            },
            pageChange() {
                if (this.search.length > 0){
                    let paginParam = {
                        text: this.search,
                        page: this.pagination.current,
                        bypage: this.pagination.rowsPerPage
                    }
                    this.$store.dispatch('controls/' + types.A_PASSENGER_SEARCH, paginParam)
                        .then(res => {
                            this.passengerData = res.data.search_passenger.data
                            this.passengerLength = res.data.search_passenger.total
                        })
                }else {
                    let paginParam = {
                        page: this.pagination.current,
                        bypage: this.pagination.rowsPerPage
                    }
                    this.$store.dispatch('controls/' + types.A_PASSENGER, paginParam)
                        .then(res => {
                            this.passengerLength = res.data.passengers.total
                            this.passengerData = res.data.passengers.data
                        })
                }
            },
            passengerSearch() {
                if (this.search.length > 0){
                    let paginParam = {
                        text: this.search,
                        page: this.pagination.current,
                        bypage: this.pagination.rowsPerPage
                    }
                    this.$store.dispatch('controls/' + types.A_PASSENGER_SEARCH, paginParam)
                        .then(res => {
                            this.passengerData = res.data.search_passenger.data
                            this.passengerLength = res.data.search_passenger.total
                        })
                }
            }
        },
        computed: {
            pages () {
                if (this.pagination.rowsPerPage == null ||
                    this.pagination.totalItems == null
                ) return 0
                let countLength = 0;
                if(this.passengerLength != undefined && this.searchPagin) {
                    countLength = this.passengerData.length
                }else {
                    countLength = this.passengerLength;
                }
                return Math.ceil(countLength / this.pagination.rowsPerPage)
            },
        },
        watch: {
            search(val){
                if (val == '' || val == null || val == undefined){
                    let paginParam = {
                        page: 1,
                        bypage: this.pagination.rowsPerPage
                    }
                    this.$store.dispatch('controls/' + types.A_PASSENGER, paginParam)
                        .then(res => {
                            this.passengerLength = res.data.passengers.total
                            this.passengerData = res.data.passengers.data
                            this.searchPagin = false
                        })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .passengers{
        padding: 0 33px 50px;
        min-width: 1000px;
    }

    .headline{
        padding: 26px 0;
        h5{
            margin: 0;
        }
    }

    .search-add-passenger{
        display: flex;
        justify-content: space-between;

        .add-passenger{
            display: inline-grid;
            grid-template-columns: 165px 143px;
            grid-gap: 20px;
            /deep/.c-button button{
                display: inline-block;
                width: max-content;
            }
        }
        .search-passenger{
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
    .headline-text{
        font-family: "Montserrat";
        font-weight: bold;
        font-size: 12px;
        line-height: normal;
        text-transform: uppercase;
        color: #1F2041;
    }
</style>