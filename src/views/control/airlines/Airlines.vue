<template>
    <div class="airlines">
        <div class="headline">
            <h3 class="headline-text">авиакомпании</h3>
        </div>
        <div class="search-add-airlines">
            <div class="add-airlines">
                <router-link tag="span" class="router-link" to="/control/airlines/add">
                    <cButton buttonValue="Добавить авиакомпанию"></cButton>
                </router-link>
            </div>
            <div class="search-airlines">
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
                    :items="airlinesData"
                    :hide-actions="true"
                    :pagination.sync="pagination"
                    :search="search"
                    class="elevation-1"
            >
                <template slot="headerCell" scope="props">
                    <span class="history-datatable-th standard-text pl-1 pr-1">
                      {{ props.header.text }}
                    </span>
                </template>
                <template slot="items" scope="props">
                    <td @click="editAirline(props.item.id)">{{props.item.code_tkp}}</td>
                    <td @click="editAirline(props.item.id)">{{props.item.aviacompany_name_ru}}</td>
                    <td @click="editAirline(props.item.id)">{{props.item.short_aviacompany_name_ru}}</td>
                    <td @click="editAirline(props.item.id)">{{props.item.aviacompany_name_eng}}</td>
                    <td @click="editAirline(props.item.id)">{{props.item.short_aviacompany_name_eng}}</td>
                    <td @click="editAirline(props.item.id)">{{props.item.code_iata}}</td>
                    <td @click="editAirline(props.item.id)">{{props.item.account_code_iata}}</td>
                    <td @click="editAirline(props.item.id)">{{props.item.account_code_tkp}}</td>
                    <td @click="editAirline(props.item.id)">{{getCity(props.item.city_id)}}</td>
                    <td @click="editAirline(props.item.id)">{{getCountry(props.item.city_id)}}</td>
                    <td @click="editAirline(props.item.id)">{{props.item.date_begin_at}}</td>
                    <td @click="editAirline(props.item.id)">{{props.item.date_end_at}}</td>
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
    import * as types from "@/stores/modules/controls/types";

    import cButton from "@/components/base_components/cButton";
    import cSelectInput from "@/components/base_components/cSelectInput";

    export default {
        name: "Airlines",
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
                    {text: 'Код ТКП', align: 'left', sortable: true, value: 'code_tkp'},
                    {text: 'Название АК', align: 'left', value: 'aviacompany_name_ru'},
                    {text: 'Краткое название АК', align: 'left', value: 'short_aviacompany_name_ru'},
                    {text: 'Название АК (англ.)', align: 'left', value: 'aviacompany_name_eng'},
                    {text: 'Краткое название АК (англ.)', align: 'left', value: 'short_aviacompany_name_eng'},
                    {text: 'Код IATA', align: 'left', value: 'code_iata'},
                    {text: 'Расчетный код IATA', align: 'left', value: 'account_code_iata'},
                    {text: 'Расчетный код ТКП', align: 'left', value: 'account_code_tkp'},
                    {text: 'Город расположения', align: 'left', value: ''},
                    {text: 'Страна расположения', align: 'left', value: ''},
                    {text: 'Дата начала действия', align: 'left', value: 'date_begin_at'},
                    {text: 'Дата окончания действия', align: 'left', value: 'date_end_at'},
                ],
                airlinesData: [],
                cities: [],
                countries: [],
            }
        },
        mounted() {
            this.$store.dispatch('controls/' + types.A_AIRLINES)
                .then( (res) => {
                    this.airlinesData = res.data.airlines
                })
            this.$store.dispatch("controls/" + types.A_FEES)
                .then(res => {
                    this.cities = res.cities;
                    this.countries = res.countries;
                });
        },
        methods: {
            editAirline(id) {
                this.$router.push('/control/airlines/add/' + id)
            },
            getCity(id) {
                let res = ''
                this.cities.filter( (val) => {
                    if (val.id == id){
                        res = val.name_ru
                    }
                })
                return res
            },
            getCountry(id) {
                let countriId = '';
                let res = '';
                this.cities.filter( val => {
                    if (val.id == id) {
                        countriId = val.country_id
                    }
                })
                this.countries.filter( val => {
                    if (val.id == countriId) {
                        res = val.name_ru
                    }
                })
                return res;
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
                ) return 0
                let countLength = 0;
                if(this.airlinesData != undefined) {
                    countLength = this.airlinesData.length;
                }
                return Math.ceil(countLength / this.pagination.rowsPerPage)
            },
        }
    }
</script>

<style lang="scss" scoped>
    .airlines{
        padding: 0 33px 50px;
        min-width: 1000px;
    }

    .headline{
        padding: 26px 0;
        h5{
            margin: 0;
        }
    }

    .search-add-airlines{
        display: grid;
        grid-template-columns: auto auto;

        .add-airlines{
            display: inline-grid;
            grid-template-columns: 165px 143px;
            grid-gap: 20px;
            /deep/.c-button button{
                display: inline-block;
                width: max-content;
            }
        }
        .search-airlines{
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