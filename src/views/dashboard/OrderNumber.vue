<template>
    <div class="order-number-content">
        <div class="order-info">
            <div class="headline">
                <h5 class="headline-text">Информация по заказу</h5>
            </div>
            <div class="order-info-content">
                <div class="item-row">
                    <div class="item-standard">
                        <span class="standard-text">Дата создания</span>
                        <span class="bold-text">{{getTimeCreated}}</span>
                    </div>
                    <div class="item-standard">
                        <span class="standard-text">Дата изменения</span>
                        <span class="bold-text">{{getTimeUpdated}}</span>
                    </div>
                    <div class="item-standard">
                        <span class="standard-text">Автор</span>
                        <span class="bold-text">{{getAuthor}}</span>
                    </div>
                </div>
                <div class="item-row">
                    <div class="item-standard">
                        <span class="standard-text">Компания</span>
<!--                        <span class="bold-text">{{getCompany}}</span>-->
                        <cSelectInput
                                v-model.trim="company"
                                itemText="company_name"
                                :itemValue="'id'"
                                :selectItems="ordersData.companies"
                        ></cSelectInput>
                    </div>
                    <div class="item-standard">
                        <span class="standard-text">Способ оплаты</span>
<!--                        <span class="bold-text">{{getCash}}</span>-->
                        <cSelectInput
                                v-model.trim="cash"
                                itemText="name"
                                :itemValue="'id'"
                                :selectItems="paymentData"
                        ></cSelectInput>
                    </div>
                    <div class="item-standard">
                        <span class="standard-text">Контактное лицо</span>
<!--                        <span class="bold-text">{{getContactPerson}}</span>-->
                        <cSelectInput
                                v-model.trim="contactPerson"
                                itemText="name"
                                itemValue="id"
                                :selectItems="userList"
                        ></cSelectInput>
                    </div>
                </div>
                <div class="item-row">
                    <div class="item-standard">
                        <span class="standard-text">Комментарий</span>
<!--                        <span class="bold-text">{{orderData.comment ? orderData.comment : '-'}}</span>-->
                        <cTextArea
                                textPadding="0"
                                v-model.trim="comment"
                                @blur="saveInfoChange('comment')"
                        ></cTextArea>
                    </div>
                    <div class="item-standard">
                        <span class="standard-text">Сумма</span>
                        <span class="amount-text">{{orderData.order_summary ? orderData.order_summary : 0.00}} {{currency}}</span>
                    </div>
                    <div class="item-standard">
                        <span class="standard-text">Статус</span>
                        <span :class="['status-text',{'orange-text' : orderData.status != 2}]">{{orderData.status == 2 ? 'Выполнен' : 'В работе'}}</span>
                    </div>
                </div>
            </div>
            <div class="helper-button">
                <cButton
                        :buttonValue="orderData.status == 2 ? 'Открыть' : 'Закрыть'"
                        buttonColor="#1F2041"
                        buttonPadding="15px 19px 15px 16px"
                        @click.native="openClose()"
                        :disabled="disabled"
                ></cButton>
                <cButton
                        buttonValue="изменить"
                        buttonPadding="15px 27px 15px 24px"
                        @click.native="RouterPush('edit')"
                        :disabled="disabled"
                ></cButton>
                <cButton
                        buttonValue="обмен"
                        buttonColor="#FFA927"
                        buttonPadding="15px 39px 15px 37px"
                        @click.native="RouterPush('exchange')"
                        :disabled="disabled"
                ></cButton>
            </div>
        </div>
        <div class="passengers">
            <div class="headline">
                <h5 class="headline-text">Пассажиры</h5>
            </div>
          <div v-if="newPassengerData.length > 0">
            <div class="item-row">
              <div class="item-standard">
                <span class="standard-text">ФИО пассажира</span>
              </div>
              <div class="item-standard">
                <span class="standard-text">Дата Рождения</span>
              </div>
              <div class="item-standard">
                <span class="standard-text">Документ</span>
              </div>
            </div>
            <div
              class="passengers-wrap"
              v-for="(item, index) in newPassengerData"
              :key="index"
            >
              <div class="item-content-row">
                <div class="item-standard">
                  <span @click="showPassengerEditModal(item)" class="bold-text">{{item.name}} {{item.surname}}</span>
                </div>
                <div class="item-standard">
                  <span @click="showPassengerEditModal(item)" class="bold-text">{{item.date_birth_at}}</span>
                </div>
                <div class="item-standard">
                  <span @click="showPassengerEditModal(item)" class="bold-text">{{item.passport_number}}</span>
                </div>
                <div class="remove-passenger">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M3.74609 12.2539C4.94141 13.4258 6.35938 14.0117 8 14.0117C9.64062 14.0117 11.0469 13.4258 12.2188 12.2539C13.4141 11.0586 14.0117 9.64062 14.0117 8C14.0117 6.35937 13.4141 4.95312 12.2188 3.78125C11.0469 2.58594 9.64062 1.98828 8 1.98828C6.35938 1.98828 4.94141 2.58594 3.74609 3.78125C2.57422 4.95312 1.98828 6.35937 1.98828 8C1.98828 9.64062 2.57422 11.0586 3.74609 12.2539ZM2.69141 2.72656C4.16797 1.25 5.9375 0.511719 8 0.511719C10.0625 0.511719 11.8203 1.25 13.2734 2.72656C14.75 4.17969 15.4883 5.9375 15.4883 8C15.4883 10.0625 14.75 11.832 13.2734 13.3086C11.8203 14.7617 10.0625 15.4883 8 15.4883C5.9375 15.4883 4.16797 14.7617 2.69141 13.3086C1.23828 11.832 0.511719 10.0625 0.511719 8C0.511719 5.9375 1.23828 4.17969 2.69141 2.72656ZM4.23828 7.26172H11.7617V8.73828H4.23828V7.26172Z"
                      fill="#FF5B27"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="without-passengers">
            <p class="standard-text">Нет пассажиров</p>
          </div>
        </div>
        <editPassengerPopup
            :showModal="showEditPassenger"
            :passengerData="editPassengerData"
            @modalHide="showEditPassenger = $event"
            @passengerNewData="passengerNewData = $event"
        ></editPassengerPopup>
    </div>
</template>

<script>
    import * as types from "@/stores/modules/orders/types";
    import * as blocksTypes from "@/stores/modules/blocks/types";
    import * as searchTypes from "@/stores/modules/service_search/types";

    import cButton from "@/components/base_components/cButton";
    import cSelectInput from "@/components/base_components/cSelectInput";
    import cTextArea from "@/components/base_components/cTextArea";
    import editPassengerPopup from "@/views/dashboard/editPassengerPopup";
    import moment from 'moment'

    export default {
        name: "OrderNumber",
        components: {
            cButton,
            cSelectInput,
            cTextArea,
            editPassengerPopup,
        },
        data() {
            return {
                activePrint: false,
                comment: '',
                contactPerson: '',
                cash: '',
                company: '',
                orderData: '',
                currency: '',
                disabled: true,
                showEditPassenger: false,
                editPassengerData: [],
                newPassengerData: [],
                passengerNewData: [],
                userList: [],
                paymentData: [
                    {
                        name: "По счёту",
                        id: 1
                    },
                    {
                        name: "Инвойс",
                        id: 0
                    }
                ],
            }
        },
        mounted() {
            this.orderData = this.$store.getters['orders/getOrder'] != null ? this.$store.getters['orders/getOrder'] : '';
            console.log(this.orderData);
            this.$store.dispatch("blocks/" + blocksTypes.A_CURRENCIES)
                .then(res => {
                    this.currencies = res.data;
                    this.currencies.filter( val => {
                        if (val.id == this.orderData.order_currency) {
                            this.currency = val.code_literal_iso_4217
                        }
                    })
                })
            this.company = this.orderData.company_registry_id;
            this.cash = this.orderData.type_payment;
            this.contactPerson = this.orderData.user.id;
            this.comment = this.orderData.comment ? this.orderData.comment : '-';
            this.newPassengerData = this.$store.getters['orders/getPassengers'];
        },
        methods: {
            saveInfoChange(val) {
                let send_param = null;
                if (val == 'comment') {
                    send_param = {
                        id:  this.orderData.id,
                        comment: this.comment
                    }
                }else if (val == 'company') {
                    send_param = {
                        id:  this.orderData.id,
                        company_registry_id: this.company
                    }
                }else if (val == 'cash') {
                    send_param = {
                        id:  this.orderData.id,
                        type_payment: this.cash
                    }
                }else if (val == 'contact-person') {
                    console.log(this.contactPerson);
                    send_param = {
                        id:  this.orderData.id,
                        user_id: this.contactPerson
                    }
                }
                this.$store.dispatch('orders/' + types.A_EXCHANGE_ORDER_INFO, send_param)
                    .then( res => {
                        console.log(res);
                    })
            },
            showPassengerEditModal(data) {
                this.showEditPassenger = true
                this.editPassengerData = data
            },
            RouterPush(val) {
                this.$router.push(`/dashboard/${val}`)
            },
            openClose() {
                let data = {
                    status: 1,
                    id: this.orderData.id
                }
                if (this.orderData.status == 2) {
                    this.orderData.status = 1
                }else {
                    this.orderData.status = 2
                    data.status = 2
                }
                this.$store.dispatch("orders/" + types.A_ORDER_STATUS, data)
                    .then(res => {
                        console.log(res);
                    });
            }
        },
        computed: {
            getPassengers() {
                console.log(this.$store.getters['orders/getPassengers']);
                if (this.$store.getters['orders/getPassengers']) {
                    let arr = this.$store.getters['orders/getPassengers'];
                    return arr
                }else {
                    let res = [
                        {
                            name: '-',
                            surname: '',
                            date_birth_at: '-',
                            passport_number: '-',
                        }
                    ]
                    return res
                }
            },
            getTimeCreated() {
                let time = this.orderData ? moment(this.orderData.created_at).locale('ru').format('DD MMMM YYYY | HH:mm') : '-';
                return time
            },
            getTimeUpdated() {
                let time = this.orderData ? moment(this.orderData.updated_at).locale('ru').format('DD MMMM YYYY | HH:mm') : '-';
                return time
            },
            ordersData() {
                console.log(this.$store.getters['orders/getOrders']);
                return this.$store.getters['orders/getOrders'] != null ? this.$store.getters['orders/getOrders'] : '';
            },
            getCompany() {
                let company = '-';
                if (this.ordersData){
                    this.ordersData.companies.filter( val => {
                        if (val.id == this.orderData.company_registry_id){
                            company = val.company_name;
                        }
                    })
                }
                return company
            },
            getAuthor(){
                if (this.orderData){
                    return this.orderData.createdby.profile.first_name + " " + this.orderData.createdby.profile.second_name
                } else {
                    return '-'
                }
            }
        },
        watch: {
            company(val) {
                this.userList = []
                let users = [];
                this.ordersData.companyusers.filter( value => {
                    if (value.company_id == val) {
                        console.log(value);
                        users.push({
                            id: value.id,
                            name: value.profile.first_name + ' ' + value.profile.second_name
                        })
                    }
                })
                this.userList = users;
                this.saveInfoChange('company')
            },
            contactPerson() {
                this.saveInfoChange('contact-person')
            },
            cash(val) {
                if (val == 1 && this.activePrint){
                    let data = {
                        count: this.newPassengerData.length,
                        summ: this.orderData.order_summary
                    }
                    this.$store.dispatch("service_search/" + searchTypes.A_PRINT_PAYMENT, data)
                        .then(res => {
                            window.open('http://test-redchain.ru:80/'+res.data, "_blank")
                        })
                }
                this.activePrint = true
                this.saveInfoChange('cash')
            },
            passengerNewData(val) {
                for (let i = 0; i < this.newPassengerData.length; i++) {
                    if (this.newPassengerData[i].id == val.id) {
                        this.newPassengerData[i] = val
                    }
                }
            },
            orderData(val) {
                if (val){
                    this.disabled = false
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .order-number-content{
        padding-bottom: 70px;

        .headline{
            padding: 26px 0;
            h5{
                margin: 0;
            }
        }
        .order-info-content{

            .item-row{
                max-width: 682px;
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                padding-bottom: 11px;
                &:not(:last-child){
                    border-bottom: 1px dashed rgba(31, 32, 65, 0.25);
                }
                &:not(:first-child){
                    padding-top: 10px;
                }
                .amount-text{
                    font-family: "Montserrat";
                    font-weight: bold;
                    font-size: 12px;
                    line-height: normal;
                    text-transform: uppercase;
                    color: #4DC56F;
                }
                .status-text{
                    width: max-content;
                    border: 2px solid #5CDF81;
                    box-sizing: border-box;
                    border-radius: 2px;
                    padding: 2px 13px;
                    font-family: "Montserrat";
                    font-weight: normal;
                    font-size: 10px;
                    line-height: normal;
                    color: #1F2041;
                    &.orange-text{
                        border: 2px solid #FF5B27;
                    }
                }
                span{
                    display: block;
                    &.standard-text{
                        padding-bottom: 4px;
                    }
                }
                /deep/.v-select > .v-input__control > .v-input__slot{
                    min-width: unset;
                    border: none;
                    padding: 0;
                    font-weight: 800;
                    & .v-input__append-inner{
                        display: none;
                    }
                }
                /deep/.c-input input{
                    min-width: unset;
                    border: none;
                    font-weight: 800;
                }
                /deep/.c-textarea textarea{
                    min-width: unset;
                    border: none;
                    font-weight: 800;
                    height: unset;
                    line-height: 14px;
                }
            }
        }

        .helper-button{
            display: inline-grid;
            grid-template-columns: auto auto auto;
            grid-gap: 21px;
            padding: 13px 0 48px;
        }



        .passengers{
            max-width: 682px;

            .item-row{
                display: grid;
                grid-template-columns: 220px 220px 220px;
                padding-bottom: 6px;
            }
            .item-content-row{
                display: grid;
                grid-template-columns: 220px 220px 220px auto;
                border-bottom: 1px dashed rgba(31, 32, 65, 0.25);
                padding: 3px 0;
            }
            .add-passenger{
                display: inline-grid;
                grid-template-columns: auto auto;
                grid-gap: 22px;
                padding-top: 34px;
            }
        }
        .passengers-wrap{
            .item-standard span{
                cursor: pointer;
            }
        }
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
    .without-passengers {
      text-align: left;
      color: #313131;
    }
</style>
