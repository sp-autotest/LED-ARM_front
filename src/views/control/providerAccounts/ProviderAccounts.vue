<template>
    <div class="provider-accounts">
        <div class="headline">
            <h3 class="headline-text">Акаунты Поставщиков</h3>
        </div>
        <div class="search-add-provider-accounts">
            <div class="add-provider-accounts">
                <router-link tag="span" class="router-link" to="/control/provider-accounts/add">
                    <cButton buttonValue="Добавить аккаунт поставщика"></cButton>
                </router-link>
            </div>
            <div class="search-provider-accounts">
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
                    :items="providerAccountData"
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
                    <td @click="editProviderAccount(props.item.id)">{{props.item.provider.name_ru}}</td>
                    <td @click="editProviderAccount(props.item.id)">{{props.item.login_a}}</td>
                    <td @click="editProviderAccount(props.item.id)">{{props.item.ordering_a}}</td>
                    <td @click="editProviderAccount(props.item.id)">{{props.item.login_b}}</td>
                    <td @click="editProviderAccount(props.item.id)">{{props.item.ordering_p}}</td>
                    <td @click="editProviderAccount(props.item.id)">{{props.item.adding}}</td>
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
        name: "ProviderAccounts",
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
                    {text: 'Поставщик', align: 'left', sortable: true, value: ''},
                    {text: 'Логин', align: 'left', value: 'login_a'},
                    {text: 'Пароль', align: 'left', value: 'ordering_a'},
                    {text: 'Логин для выписки', align: 'left', value: 'login_b'},
                    {text: 'Пароль для выписки', align: 'left', value: 'ordering_p'},
                    {text: 'Дополнительно', align: 'left', value: 'adding'},
                ],
                providerAccountData: [],
                providers: '',
            }
        },
        mounted() {
            this.$store.dispatch('controls/' + types.A_PROVIDER_ACCOUNT)
                .then( (res) => {
                    this.providerAccountData = res.data.provider_accounts
                })
            this.$store.dispatch('controls/' + types.A_PROVIDER)
                .then( (res) => {
                    this.providers = res.data.providers.data
                })

        },
        methods: {
            editProviderAccount(id){
                this.$router.push('/control/provider-accounts/add/' + id)
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
                if(this.providerAccountData != undefined) {
                    countLength = this.providerAccountData.length;
                }
                return Math.ceil(countLength / this.pagination.rowsPerPage)
            },
        }
    }
</script>

<style lang="scss" scoped>
    .provider-accounts{
        padding: 0 33px 50px;
        min-width: 1000px;
    }

    .headline{
        padding: 26px 0;
        h5{
            margin: 0;
        }
    }

    .search-add-provider-accounts{
        display: grid;
        grid-template-columns: auto auto;

        .add-provider-accounts{
            display: inline-grid;
            grid-template-columns: 165px 143px;
            grid-gap: 20px;
            /deep/.c-button button{
                display: inline-block;
                width: max-content;
            }
        }
        .search-provider-accounts{
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