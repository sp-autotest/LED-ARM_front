<template>
    <div class="fees-content">
        <div class="search-add-fees">
            <div class="add-fees">
                <router-link tag="span" class="router-link" :to="`/control/company/${companyId}/fees/add`">
                    <cButton buttonValue="Добавить сбор"></cButton>
                </router-link>
                <cButton buttonValue="Копировать" buttonColor="#FFA927"></cButton>
            </div>
            <div class="search-fees">
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
                    :items="(feesData[0]) ? feesData[0].feesplaces : []"
                    :hide-actions="true"
                    :pagination.sync="pagination"
                    :search="search"
                    class="elevation-1"
            >
                <template slot="headerCell" scope="props">
                    <span class="history-datatable-th standard-text">
                      {{ props.header.text }}
                    </span>
                </template>
                <template slot="items" scope="props">
                    <td @click="editFees(props.item.id)">{{getPeriod(props.item.date_start, props.item.date_stop)}}</td>
                    <td @click="editFees(props.item.id)">{{getPeriod(props.item.period_begin_at, props.item.period_end_at)}}</td>
                    <td @click="editFees(props.item.id)">{{getAirlines(props.item.airlines_id)}}</td>
                    <td @click="editFees(props.item.id)">{{getClass(props.item.fare_families_id)}}</td>
                    <td @click="editFees(props.item.id)">{{getType(props.item.type_flight)}}</td>
                    <td @click="editFees(props.item.id)">{{getCity(props.item.departure_city)|correctString}}</td>
                    <td @click="editFees(props.item.id)">{{getCity(props.item.arrival_city)|correctString}}</td>
                    <td @click="editFees(props.item.id)">{{props.item.size_fees_inscribed}}{{getCompanyCurrence}}</td>
                    <td @click="editFees(props.item.id)">{{props.item.size_fees_charge}}{{getCompanyCurrence}}</td>
                    <td @click="editFees(props.item.id)">{{props.item.size_deviation}}{{getCompanyCurrence}}</td>
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

    import * as types from "@/stores/modules/controls/types";

    export default {
        name: "Fees",
        components: {
            cButton,
            cSelectInput,
        },
        data() {
            return {
                companyId: 1,
                search: '',
                pagination: {
                    rowsPerPage: 5,
                    rowsPerPageItems: [5, 10, 15, 20],
                },
                headers: [
                    {text: 'Период', align: 'left', sortable: true, value: ''},
                    {text: 'Период вылета', align: 'left', value: ''},
                    {text: 'А/К', align: 'left', value: ''},
                    {text: 'Класс', align: 'left', value: 'fare_families_name'},
                    {text: 'Тип', align: 'left', value: ''},
                    {text: 'Вылет', align: 'left', value: 'departure_city_name'},
                    {text: 'Прилет', align: 'left', value: 'arrival_city_name'},
                    {text: 'Выписка', align: 'left', value: ''},
                    {text: 'Возврат', align: 'left', value: ''},
                    {text: 'Отклонение', align: 'left', value: ''}
                ],
                feesData: [],
            }
        },
        mounted() {
            this.companyId = this.$route.params.id
            this.$store.dispatch("controls/" + types.A_FEES, this.companyId)
                .then(res => {
                    this.feesData.push(res);
                    this.feesData.forEach( (val) => {
                        val.feesplaces.forEach((val, key) => {
                            this.feesData[0].feesplaces[key] = {
                                ...this.feesData[0].feesplaces[key],
                                ...{fare_families_name: this.getClass(val.fare_families_id)},
                                ...{departure_city_name: this.getCity(val.departure_city)},
                                ...{arrival_city_name: this.getCity(val.arrival_city)}
                            }
                        })
                    })
                });
        },
        methods: {
            editFees(id) {
                this.$router.push(`/control/company/${this.companyId}/fees/edit/${id}`)
            },
            getClass(classId) {
                let fees = this.feesData[0].farefamilies;
                let className = null;
                if (classId != undefined && classId != null && classId != "") {
                    fees.filter((value) => {
                        if (value.id == classId) {
                            className = value.name_ru
                        }
                    })
                }else {
                    return "-"
                }
                return className;
            },
            getType(typeId){
                if (typeId == 0){
                    return "Любой"
                } else if (typeId == 1){
                    return "OW"
                }else{
                    return "RT"
                }
            },
            getPeriod(periodOne, periodTwo) {
                let dateOne = periodOne.split(" ");
                dateOne = dateOne[0];
                let dateTwo = periodTwo.split(" ");
                dateTwo = dateTwo[0];
                let date = dateOne +" / "+dateTwo;
                return date;
            },
            getAirlines(airlinesId) {
                let airlines = this.feesData[0].airlines;
                let airlinesName = null;

                airlines.filter((value) => {
                    if (value.id == airlinesId) {
                        airlinesName = value.short_aviacompany_name_ru
                    }
                });
                return airlinesName
            },
            getCity(cityId) {
                // let airports = this.feesData[0].airports;
                let cities = this.feesData[0].cities;
                // let airportsId = null;
                let airportsName = null;

                // airports.filter((value) => {
                //     if (value.id == cityId) {
                //         airportsId = value.city_id;
                //     }
                // });
                cities.filter((value) => {
                    if (value.id == cityId) {
                        airportsName = value.name_ru;
                    }
                });

                return airportsName;
            }
        },
        computed: {
            getCompanyCurrence() {
                let company_id = this.$store.state.auth.user.company_id;
                let currencies = this.$store.state.blocks.currencies;
                let currency_id = null;
                this.$store.getters["orders/getCompanies"].filter(val => {
                    if (company_id == val.id) {
                        currency_id = val.currency_id
                    }
                });
                let curr = currencies.filter(val => {
                    if(currency_id == val.id) {
                        return val;
                    }
                });
                let res = (curr[0] != undefined) ? curr[0].code_literal_iso_4217 : ''
                return res;
            },
            feesItems () {
                let items = [];
                items.push()
                let data = this.feesData[0].feesplaces.data;
                return data;
            },
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
                if(this.feesData[0] != undefined) {
                    countLength = this.feesData[0].feesplaces.length;
                }
                return Math.ceil(countLength / this.pagination.rowsPerPage)
            },
        }
    }
</script>

<style lang="scss" scoped>
    .fees-content{
        padding: 28px 0;
        min-width: 1000px;
    }

    .search-add-fees{
        display: grid;
        grid-template-columns: auto auto;

        .add-fees{
            display: inline-grid;
            grid-template-columns: 165px 143px;
            grid-gap: 20px;
            /deep/.c-button button{
                display: inline-block;
            }
        }
        .search-fees{
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