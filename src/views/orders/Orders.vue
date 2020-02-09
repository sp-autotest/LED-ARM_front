<template>
    <div class="order-content">
        <div class="order-content__header">
            <div class="order-content__header-tittle">
                <h5 class="headline-text"> Список заказов</h5>
            </div>
            <div class="order-content__header-tittle">
                <div class="search-content">
                    <cInput
                            inputPadding="9px 10px"
                            class="search-employee"
                            inputPlaceholder="По сотруднику"
                    >
                        <template slot="icon">
                            <svg width="24" height="24" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.9062 2.125C17.5 1.71875 17.0312 1.51562 16.5 1.51562C15.9688 1.51562 15.5 1.71875 15.0938 2.125C14.6875 2.5 14.4844 2.95313 14.4844 3.48438C14.4844 4.01562 14.6875 4.48438 15.0938 4.89062C15.5 5.29688 15.9688 5.5 16.5 5.5C17.0312 5.5 17.5 5.29688 17.9062 4.89062C18.3125 4.48438 18.5156 4.01562 18.5156 3.48438C18.5156 2.95313 18.3125 2.5 17.9062 2.125ZM18.9844 5.96875C18.2969 6.65625 17.4688 7 16.5 7C15.5312 7 14.7031 6.65625 14.0156 5.96875C13.3281 5.28125 12.9844 4.45312 12.9844 3.48438C12.9844 2.51562 13.3281 1.70312 14.0156 1.04688C14.7031 0.359375 15.5312 0.015625 16.5 0.015625C17.4688 0.015625 18.2969 0.359375 18.9844 1.04688C19.6719 1.70312 20.0156 2.51562 20.0156 3.48438C20.0156 4.45312 19.6719 5.28125 18.9844 5.96875ZM8.90625 2.125C8.5 1.71875 8.03125 1.51562 7.5 1.51562C6.96875 1.51562 6.5 1.71875 6.09375 2.125C5.6875 2.5 5.48438 2.95313 5.48438 3.48438C5.48438 4.01562 5.6875 4.48438 6.09375 4.89062C6.5 5.29688 6.96875 5.5 7.5 5.5C8.03125 5.5 8.5 5.29688 8.90625 4.89062C9.3125 4.48438 9.51562 4.01562 9.51562 3.48438C9.51562 2.95313 9.3125 2.5 8.90625 2.125ZM9.98438 5.96875C9.29688 6.65625 8.46875 7 7.5 7C6.53125 7 5.70312 6.65625 5.01562 5.96875C4.32812 5.28125 3.98438 4.45312 3.98438 3.48438C3.98438 2.51562 4.32812 1.70312 5.01562 1.04688C5.70312 0.359375 6.53125 0.015625 7.5 0.015625C8.46875 0.015625 9.29688 0.359375 9.98438 1.04688C10.6719 1.70312 11.0156 2.51562 11.0156 3.48438C11.0156 4.45312 10.6719 5.28125 9.98438 5.96875ZM21.5156 12.4844V11.2656C21.5156 10.9531 20.9531 10.5781 19.8281 10.1406C18.7344 9.70312 17.625 9.48438 16.5 9.48438C15.6875 9.48438 14.6875 9.67188 13.5 10.0469C13.8438 10.4531 14.0156 10.8594 14.0156 11.2656V12.4844H21.5156ZM12.5156 12.4844V11.2656C12.5156 10.9531 11.9531 10.5781 10.8281 10.1406C9.73438 9.70312 8.625 9.48438 7.5 9.48438C6.375 9.48438 5.25 9.70312 4.125 10.1406C3.03125 10.5781 2.48438 10.9531 2.48438 11.2656V12.4844H12.5156ZM16.5 7.98438C17.8438 7.98438 19.2656 8.29688 20.7656 8.92188C22.2656 9.51562 23.0156 10.2969 23.0156 11.2656V13.9844H0.984375V11.2656C0.984375 10.2969 1.73438 9.51562 3.23438 8.92188C4.73438 8.29688 6.15625 7.98438 7.5 7.98438C8.96875 7.98438 10.4688 8.32812 12 9.01562C13.5312 8.32812 15.0312 7.98438 16.5 7.98438Z"
                                      fill="#1F2041" fill-opacity="0.5"/>
                            </svg>
                        </template>
                    </cInput>
                </div>
                <div class="search-content">
                    <cDate
                            v-model="search_date"
                            @dateChangeTwo="search_date = $event"
                            dateLabel="По дате"
                    ></cDate>
                </div>
            </div>
        </div>
        <div class="list-group">
            <div v-if="showLoader" class="loader">
                <cLoader></cLoader>
            </div>
            <div
                    v-for="item in ordersData.orders"
                    class="list-group__tittle"
                    :key="item.id"
                    :pagination.sync="pagination"
            >
                <div class="list-group__text">
                    <div>
                        <h5 class="standard-text">Заказ</h5>
                        <h5 class="bold-text">{{item.order_n}}<span class="standard-text"> АВИА</span></h5>
                    </div>
                    <div>
                        <h5 class="standard-text">Статус</h5>
                        <div :class="[item.status == 2 ? 'green-text' : 'orange-text']">
                            <svg width="18" height="16" viewBox="0 0 18 16" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.73828 8.73828V4.23828H8.26172V8.73828H9.73828ZM9.73828 11.7617V10.25H8.26172V11.7617H9.73828ZM17.2617 8L15.4336 10.0742L15.6797 12.8516L12.9727 13.4492L11.5664 15.8398L9 14.75L6.43359 15.8398L5.02734 13.4844L2.32031 12.8516L2.56641 10.0742L0.738281 8L2.56641 5.89062L2.32031 3.14844L5.02734 2.55078L6.43359 0.160156L9 1.25L11.5664 0.160156L12.9727 2.55078L15.6797 3.14844L15.4336 5.92578L17.2617 8Z"
                                      fill="#FF5B27"/>
                            </svg>
                            <span>{{item.status == 2 ? 'Выполнен' : 'В работе'}}</span>
                        </div>
                    </div>
                </div>
                <div class="list-group__text">
                    <div>
                        <h5 class="standard-text">Дата создания</h5>
                        <h5 class="bold-text">{{item.created_at}}</h5>
                    </div>
                    <div>
                        <h5 class="standard-text">Услуги</h5>
                        <span v-if="getStatus(item.services, 'green') != 0" class="color-green">{{getStatus(item.services, 'green')}}</span>
                        <span v-if="getStatus(item.services, 'purple') != 0" class="color-purple">{{getStatus(item.services, 'purple')}}</span>
                        <span v-if="getStatus(item.services, 'red') != 0" class="color-red">{{getStatus(item.services, 'red')}}</span>
                        <span v-if="getStatus(item.services, 'orange') != 0" class="color-orange">{{getStatus(item.services, 'orange')}}</span>
                        <span v-if="getStatus(item.services, 'yellow') != 0" class="color-yellow">{{getStatus(item.services, 'yellow')}}</span>
                        <span v-if="getStatus(item.services, 'light-green') != 0" class="color-light-green">{{getStatus(item.services, 'light-green')}}</span>
                    </div>
                </div>
                <div class="list-group__text">
                    <div>
                        <h5 class="standard-text">Клиент</h5>
                        <h5 class="bold-text">{{getCompany(item.company_registry_id)}}</h5>
                    </div>
                    <div>
                        <h5 class="standard-text">Сумма заказа</h5>
                        <h5 class="green-number">{{item.order_summary}} {{getCurrencies(item.order_currency)}}</h5>
                    </div>
                </div>
                <div class="list-group__text">
                    <div>
                        <h5 class="standard-text">Автор</h5>
                        <h5 class="bold-text">{{getAuthor(item.user_id)}}</h5>
                    </div>
                    <div class="list-group__text-icon">
                        <div>
                            <span>{{item.passengers}}</span>
                            <svg width="20" height="20" viewBox="0 0 16 16" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.74609 12.2539C4.94141 13.4258 6.35938 14.0117 8 14.0117C9.64062 14.0117 11.0469 13.4258 12.2188 12.2539C13.4141 11.0586 14.0117 9.64062 14.0117 8C14.0117 7.48438 13.9297 6.92188 13.7656 6.3125C13.25 6.42969 12.6758 6.48828 12.043 6.48828C10.9648 6.48828 9.82812 6.18359 8.63281 5.57422C7.46094 4.94141 6.57031 4.19141 5.96094 3.32422C5.1875 5.19922 3.875 6.54688 2.02344 7.36719C2 7.50781 1.98828 7.71875 1.98828 8C1.98828 9.64062 2.57422 11.0586 3.74609 12.2539ZM2.69141 2.72656C4.16797 1.25 5.9375 0.511719 8 0.511719C10.0625 0.511719 11.8203 1.25 13.2734 2.72656C14.75 4.17969 15.4883 5.9375 15.4883 8C15.4883 10.0625 14.75 11.832 13.2734 13.3086C11.8203 14.7617 10.0625 15.4883 8 15.4883C5.9375 15.4883 4.16797 14.7617 2.69141 13.3086C1.23828 11.832 0.511719 10.0625 0.511719 8C0.511719 5.9375 1.23828 4.17969 2.69141 2.72656ZM9.58203 8.10547C9.76953 7.91797 9.99219 7.82422 10.25 7.82422C10.5078 7.82422 10.7305 7.91797 10.918 8.10547C11.1055 8.26953 11.1992 8.48047 11.1992 8.73828C11.1992 8.99609 11.1055 9.21875 10.918 9.40625C10.7305 9.59375 10.5078 9.6875 10.25 9.6875C9.99219 9.6875 9.76953 9.59375 9.58203 9.40625C9.39453 9.21875 9.30078 8.99609 9.30078 8.73828C9.30078 8.48047 9.39453 8.26953 9.58203 8.10547ZM5.08203 8.10547C5.26953 7.91797 5.49219 7.82422 5.75 7.82422C6.00781 7.82422 6.23047 7.91797 6.41797 8.10547C6.60547 8.26953 6.69922 8.48047 6.69922 8.73828C6.69922 8.99609 6.60547 9.21875 6.41797 9.40625C6.23047 9.59375 6.00781 9.6875 5.75 9.6875C5.49219 9.6875 5.26953 9.59375 5.08203 9.40625C4.89453 9.21875 4.80078 8.99609 4.80078 8.73828C4.80078 8.48047 4.89453 8.26953 5.08203 8.10547Z"
                                      fill="#1F2041" fill-opacity="0.5"/>
                            </svg>
                        </div>
                        <div>
                            <span>{{getEmailCount(item.email)}}</span>
                            <svg width="20" height="20" viewBox="0 0 16 14" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 6.26172L14.0117 2.5H1.98828L8 6.26172ZM14.0117 11.5V4.01172L8 7.73828L1.98828 4.01172V11.5H14.0117ZM14.0117 0.988281C14.4102 0.988281 14.75 1.14062 15.0312 1.44531C15.3359 1.75 15.4883 2.10156 15.4883 2.5V11.5C15.4883 11.8984 15.3359 12.25 15.0312 12.5547C14.75 12.8594 14.4102 13.0117 14.0117 13.0117H1.98828C1.58984 13.0117 1.23828 12.8594 0.933594 12.5547C0.652344 12.25 0.511719 11.8984 0.511719 11.5V2.5C0.511719 2.10156 0.652344 1.75 0.933594 1.44531C1.23828 1.14062 1.58984 0.988281 1.98828 0.988281H14.0117Z"
                                      fill="#1F2041" fill-opacity="0.5"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="list-group__tittle-btn">
                    <cButton
                            buttonValue="К ЗАКАЗУ"
                            buttonPadding="9px 30px"
                            @click.native="toOrder(item)"
                    ></cButton>
                </div>
            </div>
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
    import cDate from "@/components/base_components/cDate";
    import cInput from "@/components/base_components/cInput";
    import cSelectInput from "@/components/base_components/cSelectInput";
    import cLoader from "@/components/base_components/cLoader";

    import * as types from "@/stores/modules/orders/types";
    import * as layoutTypes from "@/stores/modules/layouts/types";
    import * as blocksTypes from "@/stores/modules/blocks/types";

    export default {
        name: "order",
        components: {
            cButton,
            cDate,
            cInput,
            cSelectInput,
            cLoader
        },
        data() {
            return {
                pages: 0,
                showLoader: false,
                pagination: {
                    page: 1,
                    rowsPerPage: 5,
                    rowsPerPageItems: [5, 10, 15, 20],
                },
                headers: [
                    {text: 'Дата создания', align: 'left', sortable: true, value: ''},
                    {text: 'Номер заказа', align: 'left', value: ''},
                    {text: 'Статус заказа', align: 'left', value: ''},
                    {text: 'Тип заказа', align: 'left', value: ''},
                    {text: 'Клиент', align: 'left', value: ''},
                    {text: 'Автор заказа', align: 'left', value: ''},
                    {text: 'Сумма заказа', align: 'left', value: ''}
                ],
                ordersData: {
                    companies: '',
                    orders: '',
                    users: '',
                },
                ordersPagin: [],
                search_date: '',
                currencies: ''
            }
        },
        mounted() {
            this.showLoader = true;
            let paginData = {
                page: this.pagination.page,
                perPage: this.pagination.rowsPerPage
            }
            this.$store.dispatch("orders/" + types.A_ORDERS, paginData)
                .then(res => {
                    console.log(res)
                    this.ordersData.companies = res.companies;
                    this.ordersData.orders = res.orders.data;
                    this.ordersData.users = res.companyusers;
                    this.pages = res.orders.last_page;
                    if (this.globalSearch.data && !this.ordersReload) {
                        this.ordersData.orders = this.globalSearch.data.data;
                        this.pages = this.globalSearch.data.last_page
                    }
                    this.showLoader = false;
                });
            this.$store.dispatch("blocks/" + blocksTypes.A_CURRENCIES)
                .then(res => {
                    this.currencies = res.data;
                })
        },
        beforeDestroy() {
            let reload = true;
            this.$store.dispatch("orders/" + types.A_ORDERS_RELOAD, reload)
        },
        methods: {
            getCurrencies(id) {
                let res = ''
                this.currencies.filter( val => {
                    if (val.id == id){
                        res = val.code_literal_iso_4217
                    }
                })
                return res
            },
            getStatus(val, color) {
                let res = [];
                if (color == 'yellow') {
                    val.filter( item => {
                        if (item.service_status == 6){
                            res.push(item)
                        }
                    })
                } else if (color == 'purple'){
                    val.filter( item => {
                        if (item.service_status == 3){
                            res.push(item)
                        }
                    })
                } else if (color == 'green'){
                    val.filter( item => {
                        if (item.service_status == 5 || item.service_status == 7){
                            res.push(item)
                        }
                    })
                } else if (color == 'red'){
                    val.filter( item => {
                        if (item.service_status == 0){
                            res.push(item)
                        }
                    })
                } else if (color == 'orange'){
                    val.filter( item => {
                        if (item.service_status == 2){
                            res.push(item)
                        }
                    })
                } else if (color == 'light-green'){
                    val.filter( item => {
                        if (item.service_status == 4){
                            res.push(item)
                        }
                    })
                }
                console.log(val);
                if (val[0].type_flight == 2){
                    return res.length / 2
                } else {
                    return res.length
                }
            },
            getCompany(id) {
                let company = '';
                this.ordersData.companies.filter(val => {
                    if (val.id == id) {
                        company = val.company_name;
                    }
                })
                return company
            },
            getEmailCount(email) {
                if (email == null)
                    return 0
                let emails_count = [];
                emails_count.push(email);
                return emails_count.length
            },
            getAuthor(id) {
                let result = '-'
                if (this.ordersData.users && id != undefined) {
                    this.ordersData.users.filter( val => {
                        if (val.id == id){
                            console.log(val);
                            result = val.profile.first_name + ' ' + val.profile.second_name
                        }
                    })
                    return result
                }
                return result
            },
            toOrder(item) {
                this.$store.dispatch("orders/" + types.A_TO_ORDER, item)
                    .then(res => {
                        this.$router.push('/dashboard')
                    });
            }
        },
        computed: {
            globalSearch() {
                return this.$store.getters['orders/getGlobalSearch'];
            },
            ordersReload() {
                return this.$store.getters['orders/getReload'];
            },
            rowPerPageSet: {
                get() {
                    return this.rowsPerPageItems
                },
                set(value) {
                    this.pagination.rowsPerPage = value
                }
            },
            // pages () {
            //     if (this.pagination.rowsPerPage == null) return 0;
            //
            //     let countLength = (this.ordersData.orders != undefined) ? this.ordersData.orders.length : 0;
            //     return Math.ceil(countLength / this.pagination.rowsPerPage)
            // },
        },
        watch: {
            'globalSearch.data'(val) {
                this.ordersData.orders = val.data
                this.pages = val.last_page
            },
            'pagination.rowsPerPage'(val) {
                if (this.globalSearch.data && !this.ordersReload) {
                    let data = {
                        field: this.globalSearch.field,
                        page: this.pagination.page,
                        perPage: val,
                        value: this.globalSearch.value
                    }
                    this.$store.dispatch('layouts/' + layoutTypes.GLOBAL_SEARCH, data)
                        .then((res) => {
                            let data2 = {
                                data: res,
                                field: this.globalSearch.field,
                                value: this.globalSearch.value
                            }
                            this.$store.dispatch('orders/' + types.A_GLOBAL_SEARCH_SAVE, data2)
                        })
                } else {
                    let paginData = {
                        page: this.pagination.page,
                        perPage: val
                    }
                    this.$store.dispatch("orders/" + types.A_ORDERS, paginData)
                        .then(res => {
                            this.ordersData.companies = res.companies;
                            this.ordersData.orders = res.orders.data;
                            this.pages = res.orders.last_page;
                            this.pagination.page = 1;
                        });
                }
            },
            'pagination.page'(val) {
                if (this.globalSearch.data && !this.ordersReload) {
                    let data = {
                        field: this.globalSearch.field,
                        page: val,
                        perPage: this.pagination.rowsPerPage,
                        value: this.globalSearch.value
                    }
                    this.$store.dispatch('layouts/' + layoutTypes.GLOBAL_SEARCH, data)
                        .then((res) => {
                            let data2 = {
                                data: res,
                                field: this.globalSearch.field,
                                value: this.globalSearch.value
                            }
                            this.$store.dispatch('orders/' + types.A_GLOBAL_SEARCH_SAVE, data2)
                        })
                }else {
                    let paginData = {
                        page: val,
                        perPage: this.pagination.rowsPerPage
                    }
                    this.$store.dispatch("orders/" + types.A_ORDERS, paginData)
                        .then(res => {
                            this.ordersData.companies = res.companies;
                            this.ordersData.orders = res.orders.data;
                            this.pages = res.orders.last_page;
                        });
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

    * {
        margin: 0;
        padding: 0;
    }

    .list-group .list-group__tittle{
        display: grid;
        grid-template-columns: auto auto auto 190px auto;
    }
    .loader {
        margin: 20px 0;
    }

    .order-content {
        padding: 28px 33px;

        &__header {
            display: flex;
            justify-content: space-between;
            padding-bottom: 16px;
            border-bottom: 1px solid rgba(31, 32, 65, 0.05);

            &-tittle {
                display: flex;
            }
        }
    }

    .search-content {
        display: flex;
        align-items: center;
        margin-right: 36px;
        transition: .2s all;
        cursor: pointer;

        /deep/.search-employee.c-input{
            & input {
                min-width: unset;
                border: none;
            }
            & .icon{
                right: 0;
                left: unset;
                padding: 8px 12px;
            }
        }
        /deep/ .c-date {
            width: 125px;
            display: grid;
            padding: 0;

            & .date-format {
                bottom: -13px;
            }
            & .label{
                left: 0;
                top: 3px;
            }
            & .v-input {
                width: 125px;
                border: none;
                display: flex;
                align-items: center;
                padding: 0;

                & .v-input__prepend-outer {
                    order: 2;
                    margin: 0;
                }
            }
        }

        &:last-child {
            margin-right: 0;
        }
    }

    .headline-text {
        font-family: "Montserrat";
        font-weight: bold;
        font-size: 12px;
        line-height: normal;
        text-transform: uppercase;
        color: #1F2041;
    }

    .header-text {
        font-family: "Montserrat";
        font-weight: 400;
        font-style: normal;
        font-size: 12px;
        line-height: 15px;
        color: #000000;
        padding-right: 10px;
    }

    .list-group {
        width: 682px;

        &__tittle {
            display: flex;
            justify-content: space-between;
            padding: 19px 0;
            border-bottom: 1px dashed rgba(31, 32, 65, 0.25);

            &-btn {
                display: flex;
                align-items: flex-end;
            }
        }

        &__text div {
            padding-bottom: 13px;

            &:last-child {
                padding-bottom: 0;
                line-height: 20px;
            }
        }

        &__text-icon {
            display: flex;

            & div {
                padding-right: 8px;

                & span {
                    font-style: normal;
                    font-weight: bold;
                    font-size: 15px;
                    line-height: 15px;
                    color: #575870;
                    padding-right: 5px;
                }
            }
        }
    }

    /* _PAGINATION_ */

    .text-xs-right, .paragraph-wrap {
        display: flex;
        justify-content: space-between;
    }

    /deep/ .v-select > .v-input__control > .v-input__slot {
        min-width: unset;
    }

    .rowPerPage {
        width: 130px;
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

    .orange-text {
        line-height: 20px;
        display: flex;
        align-items: center;

        path {
            fill: #FF5B27;
        }

        & span {
            font-weight: bold;
            font-size: 12px;
            color: #FF5B27;
            padding-left: 2px;
        }
    }

    .green-text {
        display: flex;
        align-items: center;

        path {
            fill: #5CDF81;
        }

        & span {
            font-weight: bold;
            font-size: 12px;
            color: #5CDF81;
            padding-left: 2px;
        }
    }

    .color-purple,
    .color-green,
    .color-light-green,
    .color-orange,
    .color-yellow,
    .color-red {
        display: inline-block;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        font-size: 9px;
        padding: 1px 4px;
        font-weight: 700;
        color: #FFFFFF;
        line-height: 12px;
        margin-right: 4px;
    }
    .color-purple{
        background: #997AD9;
    }
    .color-green {
        background: #5CDF81;
    }
    .color-light-green {
        background: #61ff9c;
    }
    .color-orange {
        background: #FFA927;
    }
    .color-yellow {
        background: yellow;
    }
    .color-red {
        background: red;
    }

    .green-number {
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 12px;
        line-height: 15px;
        text-transform: uppercase;
        color: #4DC56F;
    }

    .standard-text {
        font-family: "Montserrat";
        font-weight: normal;
        font-size: 12px;
        line-height: 17px;
        color: #6B6B81;
    }

    .bold-text {
        font-family: "Montserrat";
        font-weight: bold;
        font-size: 12px;
        line-height: 17px;
        color: #575870;
    }

</style>


