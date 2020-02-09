<template>
    <div class="history-content">
        <div class="search-fees">
            <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
            ></v-text-field>
        </div>
        <div class="table-wrap">
            <v-data-table
                    :headers="headers"
                    :items="historyList"
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
                    <td>{{props.item.created_at|stringFirstWord}}</td>
                    <td>{{props.item.author.profile.first_name}} {{props.item.author.profile.second_name}}</td>
                    <td>{{props.item.model}}</td>
                    <td @click="showModal(props.item.id, 'past')">
                        <span class="show-btn">Посмотреть</span>
                    </td>
                    <td @click="showModal(props.item.id, 'now')">
                        <span class="show-btn">Посмотреть</span>
                    </td>
                </template>
            </v-data-table>
            <div class="text-xs-right pt-2 pagination-wrap">
                <div class="rowPerPage">
                    <cSelectInput
                            @input="getHistory()"
                            v-model.trim="pagination.rowsPerPage"
                            :selectItems="pagination.rowsPerPageItems"
                            selectPlaceholder="Кол-во строк"
                    >
                    </cSelectInput>
                </div>
                <v-pagination
                        @input="getHistory()"
                        v-model="pagination.current"
                        :length="pages"
                ></v-pagination>
            </div>
        </div>
        <popup
                :popupData="modalData"
                :showModal="modalStatus"
                @hidePopup="modalStatus = $event"
        ></popup>
    </div>
</template>

<script>
    import * as types from "@/stores/modules/controls/company/types";

    import cSelectInput from "@/components/base_components/cSelectInput";
    import popup from "@/views/control/company/historyPopup";

    export default {
        name: "History",
        data(){
            return{
                modalStatus: false,
                modalData: null,
                search:'',
                pages: 0,
                pagination: {
                    current: 1,
                    rowsPerPage: 5,
                    rowsPerPageItems: [5, 10, 15, 20],
                },
                headers: [
                    {text: 'Дата', align: 'left', sortable: true, value: ''},
                    {text: 'Автор', align: 'left', value: ''},
                    {text: 'Тип', align: 'left', value: ''},
                    {text: 'Было', align: 'left', value: ''},
                    {text: 'Стало', align: 'left', value: ''},
                ],
                historyList: [],
                changeList: [],
            }
        },
        components:{
            cSelectInput,
            popup
        },
        mounted() {
            this.getHistory()
        },
        methods: {
            showModal(id, status) {
                let arr = Object.values(this.changeList)
                arr.filter( val => {
                    if (val.full[Object.keys(val.full)[0]].id == id) {
                        if (status == 'past'){
                            this.modalData = val.past;
                        }else{
                            this.modalData = val.now;
                        }
                        this.modalStatus = true
                    }
                })
            },
            getHistory() {
                let pagination = {
                    page: this.pagination.current,
                    per_page: this.pagination.rowsPerPage,
                    company_id: this.$route.params.id,
                }
                this.$store.dispatch("company/" + types.A_GET_HISTORY, pagination)
                    .then( res => {
                        console.log(res);
                        this.historyList = res.data.data.data
                        this.pages = res.data.data.last_page
                        this.changeList = res.data.data.merged_data.data
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>



    .history-content{
        padding: 30px 0 50px;
        min-width: 1000px;
    }
    .search-fees{

        display:grid;
        justify-content: end;
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
                    & .show-btn{
                        cursor: pointer;
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



</style>