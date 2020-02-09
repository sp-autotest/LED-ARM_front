<template>
    <div class="countries-cities-airports">
        <div class="headline">
            <h3 class="headline-text">Страны</h3>
        </div>
        <div class="search-add-countries-cities-airports">
            <div class="add-countries-cities-airports">
                <router-link tag="span" class="router-link" to="/control/countries-cities-airports/add-country">
                    <cButton buttonValue="Добавить страну"></cButton>
                </router-link>
            </div>
            <div class="search-countries-cities-airports">
                <v-text-field
                        v-model="searchCountry"
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                ></v-text-field>
            </div>
        </div>
        <div class="table-wrap">
            <v-data-table
                    :headers="countryHeaders"
                    :items="countriesData"
                    :hide-actions="true"
                    :pagination.sync="countryPagin.pagination"
                    :search="searchCountry"
                    class="elevation-1"
            >
                <template slot="headerCell" scope="props">
                    <span class="history-datatable-th standard-text">
                      {{ props.header.text }}
                    </span>
                </template>
                <template slot="items" scope="props">
                    <td @click="editCountry(props.item.id)">{{props.item.code_iso}}</td>
                    <td @click="editCountry(props.item.id)">{{props.item.name_ru}}</td>
                    <td @click="editCountry(props.item.id)">{{props.item.name_eng}}</td>
                    <td @click="editCountry(props.item.id)">{{props.item.metropolis}}</td>
                </template>
            </v-data-table>
            <div class="text-xs-right pt-2 pagination-wrap">
                <div class="rowPerPage">
                    <cSelectInput
                            v-model.trim="countryPagin.pagination.rowsPerPage"
                            :selectItems="countryPagin.pagination.rowsPerPageItems"
                            selectPlaceholder="Кол-во строк"
                    >
                    </cSelectInput>
                </div>
                <v-pagination v-model="countryPagin.pagination.page" :length="countryPages"></v-pagination>
            </div>
        </div>

        <div class="headline">
            <h3 class="headline-text">Города</h3>
        </div>
        <div class="search-add-countries-cities-airports">
            <div class="add-countries-cities-airports">
                <router-link tag="span" class="router-link" to="/control/countries-cities-airports/add-city">
                    <cButton buttonValue="Добавить город"></cButton>
                </router-link>
            </div>
            <div class="search-countries-cities-airports">
                <v-text-field
                        v-model="searchCity"
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                ></v-text-field>
            </div>
        </div>
        <div class="table-wrap">
            <v-data-table
                    :headers="cityHeaders"
                    :items="citiesData"
                    :hide-actions="true"
                    :pagination.sync="cityPagin.pagination"
                    :search="searchCity"
                    class="elevation-1"
            >
                <template slot="headerCell" scope="props">
                    <span class="history-datatable-th standard-text">
                      {{ props.header.text }}
                    </span>
                </template>
                <template slot="items" scope="props">
                    <td @click="editCity(props.item.id)">{{props.item.code_crt}}</td>
                    <td @click="editCity(props.item.id)">{{props.item.code_iata}}</td>
                    <td @click="editCity(props.item.id)">{{props.item.name_ru}}</td>
                    <td @click="editCity(props.item.id)">{{props.item.name_eng}}</td>
                </template>
            </v-data-table>
            <div class="text-xs-right pt-2 pagination-wrap">
                <div class="rowPerPage">
                    <cSelectInput
                            v-model.trim="cityPagin.pagination.rowsPerPage"
                            :selectItems="cityPagin.pagination.rowsPerPageItems"
                            selectPlaceholder="Кол-во строк"
                    >
                    </cSelectInput>
                </div>
                <v-pagination v-model="cityPagin.pagination.page" :length="cityPages"></v-pagination>
            </div>
        </div>

        <div class="headline">
            <h3 class="headline-text">Аэропорты</h3>
        </div>
        <div class="search-add-countries-cities-airports">
            <div class="add-countries-cities-airports">
                <router-link tag="span" class="router-link" to="/control/countries-cities-airports/add-airport">
                    <cButton buttonValue="Добавить аэропорт"></cButton>
                </router-link>
            </div>
            <div class="search-countries-cities-airports">
                <v-text-field
                        v-model="searchAirport"
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                ></v-text-field>
            </div>
        </div>
        <div class="table-wrap">
            <v-data-table
                    :headers="airportHeaders"
                    :items="airportsData"
                    :hide-actions="true"
                    :pagination.sync="airportPagin.pagination"
                    :search="searchAirport"
                    class="elevation-1"
            >
                <template slot="headerCell" scope="props">
                    <span class="history-datatable-th standard-text">
                      {{ props.header.text }}
                    </span>
                </template>
                <template slot="items" scope="props">
                    <td @click="editAirport(props.item.id)">{{props.item.code_crt}}</td>
                    <td @click="editAirport(props.item.id)">{{props.item.code_iata}}</td>
                    <td @click="editAirport(props.item.id)">{{props.item.name_ru}}</td>
                    <td @click="editAirport(props.item.id)">{{props.item.name_eng}}</td>
                </template>
            </v-data-table>
            <div class="text-xs-right pt-2 pagination-wrap">
                <div class="rowPerPage">
                    <cSelectInput
                            v-model.trim="airportPagin.pagination.rowsPerPage"
                            :selectItems="airportPagin.pagination.rowsPerPageItems"
                            selectPlaceholder="Кол-во строк"
                    >
                    </cSelectInput>
                </div>
                <v-pagination v-model="airportPagin.pagination.page" :length="airportPages"></v-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import * as types from "@/stores/modules/controls/types";

    import cButton from "@/components/base_components/cButton";
    import cSelectInput from "@/components/base_components/cSelectInput";

    export default {
        name: "CountriesCitiesAirports",
        components: {
            cButton,
            cSelectInput,
        },
        data() {
            return {
                searchCountry: '',
                searchCity: '',
                searchAirport: '',
                countryPagin: {
                    pagination: {
                        rowsPerPage: 5,
                        rowsPerPageItems: [5, 10, 15, 20],
                    },
                },
                cityPagin: {
                    pagination: {
                        rowsPerPage: 5,
                        rowsPerPageItems: [5, 10, 15, 20],
                    },
                },
                airportPagin: {
                    pagination: {
                        rowsPerPage: 5,
                        rowsPerPageItems: [5, 10, 15, 20],
                    },
                },
                countryHeaders: [
                    {text: 'Код ISO', align: 'left', sortable: true, value: 'code_iso'},
                    {text: 'Название', align: 'left', value: 'name_ru'},
                    {text: 'Название (лат)', align: 'left', value: 'name_eng'},
                    {text: 'Столица', align: 'left', value: 'metropolis'},
                ],
                cityHeaders: [
                    {text: 'Код ЦРТ', align: 'left', sortable: true, value: 'code_crt'},
                    {text: 'Код IATA', align: 'left', value: 'code_iata'},
                    {text: 'Название', align: 'left', value: 'name_ru'},
                    {text: 'Название (лат)', align: 'left', value: 'name_eng'},
                ],
                airportHeaders: [
                    {text: 'Код ЦРТ', align: 'left', sortable: true, value: 'code_crt'},
                    {text: 'Код IATA', align: 'left', value: 'code_iata'},
                    {text: 'Название', align: 'left', value: 'name_ru'},
                    {text: 'Название (лат)', align: 'left', value: 'name_eng'},
                ],
                countriesData: [],
                citiesData: [],
                airportsData: [],
            }
        },
        mounted() {
            this.$store.dispatch('controls/' + types.A_COUNTRY_CITY_AIRPORT)
                .then( (res) => {
                    this.countriesData = res.countries;
                    this.citiesData = res.cities;
                    this.airportsData = res.airports;
                })
        },
        methods: {
            editCountry(id){
                this.$router.push('/control/countries-cities-airports/add-country/' + id)
            },
            editCity(id){
                this.$router.push('/control/countries-cities-airports/add-city/' + id)
            },
            editAirport(id){
                this.$router.push('/control/countries-cities-airports/add-airport/' + id)
            },
        },
        computed: {
            countryPages () {
                if (this.countryPagin.pagination.rowsPerPage == null ||
                    this.countryPagin.pagination.totalItems == null
                ) return 0
                let countLength = 0;
                if(this.countriesData != undefined) {
                    countLength = this.countriesData.length;
                }
                return Math.ceil(countLength / this.countryPagin.pagination.rowsPerPage)
            },
            cityPages () {
                if (this.cityPagin.pagination.rowsPerPage == null ||
                    this.cityPagin.pagination.totalItems == null
                ) return 0
                let countLength = 0;
                if(this.citiesData != undefined) {
                    countLength = this.citiesData.length;
                }
                return Math.ceil(countLength / this.cityPagin.pagination.rowsPerPage)
            },
            airportPages () {
                if (this.cityPagin.pagination.rowsPerPage == null ||
                    this.cityPagin.pagination.totalItems == null
                ) return 0
                let countLength = 0;
                if(this.airportsData != undefined) {
                    countLength = this.airportsData.length;
                }
                return Math.ceil(countLength / this.cityPagin.pagination.rowsPerPage)
            },
        }
    }
</script>

<style lang="scss" scoped>
    .countries-cities-airports{
        padding: 0 33px 50px;
        min-width: 1000px;
    }

    .headline{
        padding: 26px 0;
        h5{
            margin: 0;
        }
    }

    .search-add-countries-cities-airports{
        display: grid;
        grid-template-columns: auto auto;

        .add-countries-cities-airports{
            display: inline-grid;
            grid-template-columns: 165px 143px;
            grid-gap: 20px;
            /deep/.c-button button{
                display: inline-block;
                width: max-content;
            }
        }
        .search-countries-cities-airports{
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