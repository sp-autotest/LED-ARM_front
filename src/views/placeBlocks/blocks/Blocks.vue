<template>
    <div class="blocks-content">
        <div class="headline">
            <h3 class="headline-text">Блоки компании</h3>
        </div>
        <div class="search-add-block">
            <div class="add-block">
                <router-link tag="span" class="router-link" to="/blocks/add">
                    <cButton buttonValue="Добавить блок"></cButton>
                </router-link>
            </div>
            <div class="search-block">
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
                    :items="blocksData"
                    :hide-actions="true"
                    :pagination.sync="pagination"
                    :search="search"
                    item-key="id"
                    class="elevation-1"
                    :rows-per-page-items="pagination.rowsPerPageItems"
            >
                <template slot="headerCell" scope="props">
                    <span class="history-datatable-th standard-text">
                      {{ props.header.text }}
                    </span>
                </template>
                <template slot="items" scope="props">
                        <td @click="editBlock(props.item.id)" :data-id="getShedulItems">{{props.item.textName}}</td>
                        <td @click="editBlock(props.item.id)">{{props.item.schedule[0].flights}}</td>
                        <td @click="editBlock(props.item.id)">{{props.item.farefamily.name_ru}}</td>
                        <td @click="editBlock(props.item.id)">{{props.item.period_begin_at}}</td>
                        <td @click="editBlock(props.item.id)">{{props.item.period_end_at}}</td>
                        <td class="weekDaysBlock" @click="editBlock(props.item.id)">
                            <span v-if="props.item.schedule[0].monday">Пн</span>
                            <span v-if="props.item.schedule[0].tuesday">Вт</span>
                            <span v-if="props.item.schedule[0].wednesday">Ср</span>
                            <span v-if="props.item.schedule[0].thursday">Чт</span>
                            <span v-if="props.item.schedule[0].friday">Пт</span>
                            <span v-if="props.item.schedule[0].saturday">Сб</span>
                            <span v-if="props.item.schedule[0].sunday">Вс</span>
                        </td>
                        <td @click="editBlock(props.item.id)">{{props.item.count_places}}</td>
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
    import * as feesTypes from "@/stores/modules/controls/types";

    export default {
        name: "Blocks",
        components: {
            cSelectInput,
            cButton,
        },
        data() {
            return {
                shedulsNames: [],
                fromCities: [],
                toCities: [],
                search: '',
                pagination: {
                    rowsPerPage: 5,
                    rowsPerPageItems: [5, 10, 15, 20],
                },
                headers: [
                    {text: 'Название', align: 'left', sortable: true, value: 'name'},
                    {text: 'Номер рейса', align: 'left', value: 'schedule[0].flights'},
                    {text: 'Класс', align: 'left', value: ''},
                    {text: 'Период с', align: 'left', value: 'arrival'},
                    {text: 'Период по', align: 'left', value: 'departure'},
                    {text: 'Дни недели', align: 'left', value: 'week-day'},
                    {text: 'Количество мест', align: 'left', value: 'seats-numb'}
                ],
                blocksData: [],
            }
        },
        mounted() {
            this.$store.dispatch("blocks/" + types.A_BLOCKS)
                .then(res => {
                    let currentDate = new Date().getTime();
                    let endDate = "";
                    this.blocksData = res.places.filter(val => {
                        endDate = new Date(val.period_end_at).getTime();
                        if(currentDate < endDate) {
                            return val;
                        }
                    });
                });
            this.$store.dispatch("controls/" + feesTypes.A_FEES)
                .then(res => {

                    for ( let city of res.airports){
                        this.fromCities.push(city);
                        this.toCities.push(city);
                    }
                });
        },
        methods: {
            editBlock(id) {
                this.$router.push('/blocks/add/' + id)
            }
        },
        computed: {
            getShedulItems(){
                this.blocksData.filter( (val, key) => {
                    let fromC = [];
                    let toC = [];
                    this.fromCities.filter(val2 => {
                        if (val.schedule[0].departure_at == val2.id){
                            fromC.push(val2.name_ru);
                        }
                        if (val.schedule[0].arrival_at == val2.id){
                            toC.push(val2.name_ru);
                        }
                    });
                    this.blocksData[key]['textName'] = val.period_begin_at + ' / ' + val.period_end_at + ' - ' + val.schedule[0].flights + ' - ' + fromC + ' / ' + toC;
                });
                return this.blocksData;
            },
            getSheduls() {
                if(this.$store.getters["blocks/getBlocks"] == null) {
                    this.$store.dispatch("blocks/" + types.A_BLOCKS)
                        .then(res => {
                            return res.schedules;
                        });
                } else {
                    return this.$store.getters["blocks/getBlocks"];
                }
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
                ) return 0;
                let countLength = 0;
                if(this.blocksData.length != 0) {
                    countLength = this.blocksData.length;
                }
                return Math.ceil(countLength / this.pagination.rowsPerPage)
            },
        }
    }
</script>

<style lang="scss" scoped>
    .blocks-content{
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

    .search-add-block{
        display: grid;
        grid-template-columns: auto auto;

        .add-block{
            display: inline-grid;
            grid-template-columns: 165px 143px;
            grid-gap: 20px;
            /deep/.c-button button{
                display: inline-block;
            }
        }
        .search-block{
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
    .weekDaysBlock span {
        padding: 2px 10px;
        border: 1px solid #5CDF81;
        margin: 0 1px;
        border-radius: 2px;
    }
</style>