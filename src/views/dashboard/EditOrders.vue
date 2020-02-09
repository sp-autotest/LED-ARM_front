<template>
    <div class="edit-order-content">
        <div class="headline">
            <h5 class="headline-text">Информация об услуге</h5>
        </div>
        <div class="passenger-info">
            <div class="item-row">
                <div class="item-standard">
                    <span></span>
                </div>
                <div class="item-standard">
                    <span class="standard-text">ФИО пассажира</span>
                </div>
                <div class="item-standard">
                    <span class="standard-text">Пол</span>
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
                    v-for="(item, index) in passengers"
                    :key="index"
            >
                <div class="item-content-row">
                    <div class="item-standard align-center">
                        <v-radio-group
                                v-model="passenger"
                                :mandatory="false">
                            <v-radio
                                    color="#5CDF81"
                                    :value="item.id"
                            ></v-radio>
                        </v-radio-group>
                    </div>
                    <div class="item-standard">
                        <span class="bold-text">{{item.name}} {{item.surname}}</span>
                    </div>
                    <div class="item-standard">
                        <span class="bold-text">{{item.sex_u ? "Мужской" : "Женский"}}</span>
                    </div>
                    <div class="item-standard">
                        <span class="bold-text">{{item.date_birth_at}}</span>
                    </div>
                    <div class="item-standard">
                        <span class="bold-text">{{item.type_documents == 2 ? "Паспорт" : (item.type_documents == 1 ? "Другой документ" : '-')}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="edit-order-info">
            <div class="paragraph">
                <span class="standard-text">Номер услуги</span>
                <span class="bold-text">{{passengerData.service_id == null ? '-' : passengerData.service_id}}</span>
            </div>
            <div class="paragraph">
                <span class="standard-text">Код бронирования</span>
                <span class="bold-text">{{passengerData.pnr == null ? '-' : passengerData.pnr}}</span>
            </div>
            <div class="paragraph">
                <span class="standard-text">Система бронирования</span>
                <span class="bold-text">{{passengerData.provider_id == null ? '-' : (passengerData.provider_id == 1 ? 'Crane' : (passengerData.provider_id == 2 ? 'Блоки' : '-'))}}</span>
            </div>
            <div class="paragraph">
                <span class="standard-text">Дата бронирования</span>
                <span class="bold-text">{{passengerData.booking_date == null ? '-' : passengerData.booking_date}}</span>
            </div>
            <div class="paragraph">
                <span class="standard-text">Статус</span>
                <div :class="['border-orange', statusStyle == 'green' ? 'border-green' : (statusStyle == 'red' ? 'border-red' : '')]">
                    <span :class="['orange-text',statusStyle == 'green' ? 'green-text' : (statusStyle == 'red' ? 'red-text' : '')]">{{getStatus}}</span>
                </div>
            </div>
            <div class="paragraph">
                <span class="standard-text">Выкупить до</span>
                <div>
                    <span class="bold-text">{{newTimeLimitDate == null ? getDate : newTimeLimitDate}}</span>
                    <v-icon
                            @click="showModal = !showModal"
                            small
                            color="#6DE18D"
                            class="pencil-icon ml-2"
                    >create</v-icon>
                </div>
            </div>
            <div class="paragraph">
                <span class="standard-text">Ответственный менеджер</span>
                <span class="bold-text">{{getManager}}</span>
            </div>
            <div class="paragraph">
                <span class="standard-text">Сумма услуги</span>
                <span class="green-text">{{passengerData.summary_summ}} {{currency}}</span>
            </div>
        </div>
        <div class="edit-order-btn">
            <cButton
                    v-show="passengerData.service_status == 6"
                    buttonValue="Аннулировать"
                    buttonColor="#cc4b4b"
                    buttonPadding="10px 20px 10px 20px"
                    @click="editServiceStatus(2)"
            ></cButton>
            <cButton
                    v-show="passengerData.service_status == 6"
                    buttonValue="Заблокировать"
                    buttonColor="#cc4b4b"
                    buttonPadding="10px 20px 10px 20px"
                    @click="editServiceStatus(3)"
            ></cButton>
            <cButton
                    v-show="passengerData.service_status == 5 || passengerData.service_status == 7"
                    buttonValue="Скачать билеты"
                    buttonColor="#1F2041"
                    buttonPadding="10px 20px 10px 20px"
                    @click="downloadTicket()"
            ></cButton>
            <cButton
                    v-show="passengerData.service_status == 5 || passengerData.service_status == 7"
                    buttonValue="Запрос на отмену"
                    buttonColor="#1F2041"
                    buttonPadding="10px 20px 10px 20px"
                    @click="editServiceStatus(0)"
            ></cButton>
            <cButton
                    v-show="passengerData.service_status == 5 || passengerData.service_status == 7"
                    buttonValue="Обмен"
                    buttonColor="#1F2041"
                    buttonPadding="10px 20px 10px 20px"
                    @click="editServiceStatus(4)"
            ></cButton>
            <cButton
                    v-show="passengerData.service_status == 2"
                    buttonValue="Взять на обработку"
                    buttonColor="#1F2041"
                    buttonPadding="10px 20px 10px 20px"
                    @click="editServiceStatus(6)"
            ></cButton>
            <cButton
                    v-show="passengerData.service_status == 6"
                    buttonValue="Выписать"
                    buttonColor="#1F2041"
                    buttonPadding="10px 20px 10px 20px"
                    @click="downloadTicket()"
            ></cButton>
        </div>
        <div class="edit-order-ticket-info">
            <div class="ticket-content">
                <div class="ticket-wrap">
                    <div class="map-info">
                        <span class="map-from bold-text">{{getDepartureCity}}</span>
                        <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.11609 14.8544L6.97937 8.84265L2.86609 8.84265L1.74109 10.3544L0.616088 10.3544L1.35437 7.71765L0.616088 5.11609L1.74109 5.11609L2.86609 6.59265L6.97937 6.59265L5.11609 0.616088L6.59265 0.616088L10.3544 6.59265L14.4677 6.59265C14.7723 6.59265 15.0302 6.69812 15.2411 6.90906C15.4755 7.14343 15.5927 7.41296 15.5927 7.71765C15.5927 8.02234 15.4755 8.28015 15.2411 8.49109C15.0302 8.72546 14.7723 8.84265 14.4677 8.84265L10.3544 8.84265L6.59265 14.8544L5.11609 14.8544Z" fill="#5CDF81"/>
                        </svg>
                        <span class="map-to bold-text">{{getArrivalCity}}</span>
                        <span class="start-date">вылет {{momentDateSearch(passengerData.departure_date)}}</span>

                        <div class="company-logo">
                            <img src="../../assets/images/imageAPI.png" alt="">
                        </div>
                    </div>
                    <div class="time-info">
                        <div class="departure">
                            <h5 class="normal-text">Вылет</h5>
                            <span class="bold-text">{{getTimeDeparture}}</span>
                        </div>
                        <div class="arrival">
                            <h5 class="normal-text">Прилет</h5>
                            <span class="bold-text">{{getTimeArrival}}</span>
                        </div>
                        <div class="transplants">
                            <h5 class="normal-text">Пересадки</h5>
                            <span class="bold-text">{{getTransparent}}</span>
                        </div>
                        <div class="on-way">
                            <h5 class="normal-text">В пути</h5>
                            <span class="bold-text">{{getTimeDuration}}</span>
                        </div>
                        <div class="flight">
                            <h5 class="normal-text">Рейс</h5>
                            <span class="bold-text">{{getFlight}}</span>
                        </div>
                    </div>
                    <div v-if="passengerData.type_flight == 2" class="rt-ticket-wrap">
                        <div class="dashed-border"></div>
                        <div class="map-info">
                            <span class="map-from bold-text">{{getArrivalCity}}</span>
                            <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.11609 14.8544L6.97937 8.84265L2.86609 8.84265L1.74109 10.3544L0.616088 10.3544L1.35437 7.71765L0.616088 5.11609L1.74109 5.11609L2.86609 6.59265L6.97937 6.59265L5.11609 0.616088L6.59265 0.616088L10.3544 6.59265L14.4677 6.59265C14.7723 6.59265 15.0302 6.69812 15.2411 6.90906C15.4755 7.14343 15.5927 7.41296 15.5927 7.71765C15.5927 8.02234 15.4755 8.28015 15.2411 8.49109C15.0302 8.72546 14.7723 8.84265 14.4677 8.84265L10.3544 8.84265L6.59265 14.8544L5.11609 14.8544Z" fill="#5CDF81"/>
                            </svg>
                            <span class="map-to bold-text">{{getDepartureCity}}</span>
                            <span class="start-date">вылет {{momentDateSearch(passengerDataRT.departure_date)}}</span>
                        </div>
                        <div class="time-info">
                            <div class="departure">
                                <h5 class="normal-text">Вылет</h5>
                                <span class="bold-text">{{getTimeDepartureRT}}</span>
                            </div>
                            <div class="arrival">
                                <h5 class="normal-text">Прилет</h5>
                                <span class="bold-text">{{getTimeArrivalRT}}</span>
                            </div>
                            <div class="transplants">
                                <h5 class="normal-text">Пересадки</h5>
                                <span class="bold-text">{{getTransparentRT}}</span>
                            </div>
                            <div class="on-way">
                                <h5 class="normal-text">В пути</h5>
                                <span class="bold-text">{{getTimeDurationRT}}</span>
                            </div>
                            <div class="flight">
                                <h5 class="normal-text">Рейс</h5>
                                <span class="bold-text">{{getFlightRT}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <popup
                :popupDate="popupDate"
                :bookingDate="passengerData.booking_date"
                :showModal="showModal"
                @hidePopup="showModal = $event"
                @newDate="newTimeLimitDate = $event"
        ></popup>
    </div>
</template>

<script>
    import * as feesTypes from "@/stores/modules/controls/types";
    import * as blocksTypes from "@/stores/modules/blocks/types";

    import moment from 'moment'

    import cButton from "@/components/base_components/cButton";
    import popup from "@/views/dashboard/editOrderPopup";

    export default {
        name: "EditOrders",
        components: {
            cButton,
            popup
        },
        data() {
            return {
                passenger: 0,
                passengers: [],
                showModal: false,
                serviceData: [],
                passengerData: [],
                passengerDataRT: [],
                library: [],
                statusStyle: 'orange',
                cities: [],
                popupDate: '',
                newTimeLimitDate: null,
                currency: '-'
            }
        },
        mounted() {
            this.serviceData = this.$store.getters['orders/getOrder'] != null ? this.$store.getters['orders/getOrder'] : [];
            this.passenger = this.serviceData.services[0].passenger_id;
            this.passengerData = this.serviceData.services[0];
            if (this.passengerData.type_flight == 2){
                this.passengerDataRT = this.serviceData.services[this.serviceData.services.length - 1]
            }
            this.library = this.$store.getters['orders/getOrder'] != null ? this.$store.getters['orders/getOrder'] : [];
            this.$store.dispatch("controls/" + feesTypes.A_FEES)
                .then(res => {
                    this.cities.push(res.airports);
                });
            this.$store.dispatch("blocks/" + blocksTypes.A_CURRENCIES)
                .then(res => {
                    this.currencies = res.data;
                    this.currencies.filter( val => {
                        if (val.id == this.library.order_currency) {
                            this.currency = val.code_literal_iso_4217
                        }
                    })
                })
            this.passengers = this.$store.getters['orders/getPassengers']
        },
        methods: {
            downloadTicket() {
                this.$store.dispatch('blocks/' + blocksTypes.A_DOWNLOAD_TICKET, this.passengerData.service_id)
                    .then( res => {
                        window.open(`http://test-redchain.ru/${res.data}`, '_blank');
                    })
            },
            editServiceStatus(status) {
                let api = null;
                if (status == 0)
                    api = 'canceled_status_api'
                else if (status == 2)
                    api = 'elemenated_status_api'
                else if (status == 3)
                    api = 'blocked_status_api'
                else if (status == 4)
                    api = 'exchanged_status_api'
                // else if (status == 5)
                //     api = 'issued_status_api'
                else if (status == 6)
                    api = 'inwork_status_api'
                else if (status == 7)
                    api = 'issued_block_status_api'

                let sendParam = {
                    data: {
                        service_id: this.passengerData.id,
                        status: status
                    },
                    api: api
                }
                this.$store.dispatch('blocks/' + blocksTypes.A_EDIT_SERVICE_STATUS, sendParam)
                    .then( res => {
                        this.passengerData.service_status = status
                        if (status == 4) {
                            this.$router.push('/dashboard/exchange')
                        }
                    })
            },
            momentDateSearch: function (date) {
                return moment(date).locale('ru').format('DD MMMM , dddd');
            },
            getTime(date) {
                if (date == null || date == 'undefined'){
                    return '-'
                }
                return date.substr(0,5)
            }
        },
        computed: {
            getDepartureCity() {
                let city = '-';
                if (this.cities[0] && this.passengerData.flight) {
                    this.cities[0].filter((value) => {
                        if (value.id == this.passengerData.flight.flightplaces.schedule[0].departure_at) {
                            city = value.name_ru;
                        }
                    });
                }
                return city;
            },
            getArrivalCity() {
                let city = '-';
                if (this.cities[0] && this.passengerData.flight) {
                    this.cities[0].filter((value) => {
                        if (value.id == this.passengerData.flight.flightplaces.schedule[0].arrival_at) {
                            city = value.name_ru;
                        }
                    });
                }
                return city;
            },
            getTimeDeparture() {
                let res = '00:00'
                if (this.passengerData.flight) {
                    res = this.passengerData.flight.flightplaces.schedule[0].time_departure_at.substr(0,5)
                }
                return res
            },
            getTimeDepartureRT() {
                let res = '00:00'
                if (this.passengerDataRT.flight) {
                    res = this.passengerDataRT.flight.flightplaces.schedule[0].time_departure_at.substr(0,5)
                }
                return res
            },
            getTimeArrival() {
                let res = '00:00'
                if (this.passengerData.flight) {
                    res = this.passengerData.flight.flightplaces.schedule[0].time_arrival_at.substr(0,5)
                }
                return res
            },
            getTimeArrivalRT() {
                let res = '00:00'
                if (this.passengerData.flight) {
                    res = this.passengerDataRT.flight.flightplaces.schedule[0].time_arrival_at.substr(0,5)
                }
                return res
            },
            getTransparent() {
                let res = 'нет'
                if (this.passengerData.flight) {
                    res = (this.passengerData.flight.flightplaces.schedule[0].is_transplantation) ? 'С пересадками' : 'нет'
                }
                return res
            },
            getTransparentRT() {
                let res = 'нет'
                if (this.passengerData.flight) {
                    res = (this.passengerDataRT.flight.flightplaces.schedule[0].is_transplantation) ? 'С пересадками' : 'нет'
                }
                return res
            },
            getTimeDuration() {
                let res = '00:00'
                if (this.passengerData.flight) {
                    res = this.passengerData.flight.flightplaces.schedule[0].flight_duration.substr(0,5)
                }
                return res
            },
            getTimeDurationRT() {
                let res = '00:00'
                if (this.passengerData.flight) {
                    res = this.passengerDataRT.flight.flightplaces.schedule[0].flight_duration.substr(0,5)
                }
                return res
            },
            getFlight() {
                let res = '-'
                if (this.passengerData.flight) {
                    res = this.passengerData.flight.flightplaces.schedule[0].flights
                }
                return res
            },
            getFlightRT() {
                let res = '-'
                if (this.passengerData.flight) {
                    res = this.passengerDataRT.flight.flightplaces.schedule[0].flights
                }
                return res
            },
            getStatus() {
                if (this.passengerData.service_status == 6) {
                    return 'В работе'
                } else if (this.passengerData.service_status == 7) {
                    return 'Выписана в GDS'
                } else if (this.passengerData.service_status == 5) {
                    return 'Выписана'
                } else if (this.passengerData.service_status == 4) {
                    return 'Обмен'
                } else if (this.passengerData.service_status == 3) {
                    return 'Заблокирована'
                } else if (this.passengerData.service_status == 2) {
                    return 'Аннулирована'
                } else if (this.passengerData.service_status == 0) {
                    return 'Отменена (void)'
                }
            },
            getDate() {
                let res = '00:00'
                if (this.passengerData.booking_date) {
                    let time = new Date(this.passengerData.booking_date);
                    let seconds = time.getTime() + (this.library.time_limit * 1000);
                    time = new Date(seconds);
                    console.log(seconds);
                    console.log(time);
                    let year = time.getFullYear();
                    let mounth = time.getMonth()+1 < 9 ? '0'+(time.getMonth()+1) : time.getMonth()+1;
                    let day = time.getDate() < 9 ? '0'+(time.getDate()) : time.getDate();
                    let hours = time.getHours() < 9 ? '0'+(time.getHours()) : time.getHours()
                    let minutes = time.getMinutes() < 9 ? '0'+(time.getMinutes()) : time.getMinutes()
                    res = year+'-'+mounth+'-'+day+' '+hours+':'+minutes
                }
                return res
            },
            getManager() {
                if (this.library.user){
                    if (this.library.user.id == this.passengerData.user_id) {
                        return this.library.user.profile.first_name + " " + this.library.user.profile.second_name
                    }
                }
                return '-'
            }
        },
        watch: {
            passenger(val) {
                this.serviceData.services.filter( item => {
                    if (item.passenger_id == val) {
                        this.passengerData = item
                    }
                })
            },
            getDate(val) {
                this.popupDate = val
            },
            'passengerData.service_status'(val) {
                console.log(val);
                if (val == 5 || val == 7) {
                    this.statusStyle = 'green'
                }else if (val == 2 || val == 3) {
                    this.statusStyle = 'red'
                }else{
                    this.statusStyle = 'orange'
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .edit-order-content{
        padding-bottom: 70px;

        .headline{
            padding: 26px 0;
            h5{
                margin: 0;
            }
        }
        .passenger-info{
            max-width: 690px;
            margin-bottom: 50px;
            .item-row{
                display: grid;
                grid-template-columns: 50px repeat(4, 1fr);
                padding-bottom: 6px;
            }
            .item-content-row{
                display: grid;
                align-items: center;
                grid-template-columns: 50px repeat(4, 1fr);
                border-bottom: 1px dashed rgba(31, 32, 65, 0.25);
                padding: 3px 0;
                .align-center{
                    justify-self: center;
                }
            }
            /deep/.v-input--selection-controls{
                margin: 0;
                padding: 0;
            }
            /deep/.v-input__slot{
                margin: 0;
            }
            /deep/.v-messages{
                display: none;
            }
        }
        .edit-order-info{
            width: 690px;

            .paragraph{
                display: grid;
                grid-template-columns: 1fr 2fr;
                align-items: center;
                border-bottom: 1px dashed #cecece;
                padding: 6px 0;
                &:last-child{
                    border: none;
                }
                .pencil-icon{
                    cursor: pointer;
                }
            }
        }
        .edit-order-btn{
            padding-top: 30px;
            display: flex;
            /deep/.c-button{
                margin-right: 20px;
                & button{
                    text-transform: unset;
                    font-size: 12px;
                }
            }
        }
        .edit-order-ticket-info{
            padding-top: 30px;

            .ticket-content{
                background: #FBFBFB;
                border: 2px solid #EEEEEE;
                border-radius: 4px;
                width: min-content;
                margin-top: 5px;

                .ticket-row{
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    .ticket-info{
                        padding-right: 30px;
                        a{
                            text-decoration: none;
                            font-family: "Montserrat";
                            font-size: 12px;
                            line-height: normal;
                            color: #0094FF;
                            padding-left: 7px;
                            transition: .2s all;
                            &:hover{
                                color: #69bfff;
                            }
                        }
                    }
                }
                .ticket-wrap{
                    padding: 18px 4px 18px 24px;
                    width: min-content;

                    .map-info{
                        width: 654px;
                        display: inline-grid;
                        grid-template-columns: repeat(4, auto) 1fr;
                        align-items: center;

                        .start-date{
                            font-family: "Montserrat";
                            font-size: 12px;
                            line-height: normal;
                            color: #6B6B81;
                        }
                        svg{
                            margin: 0 10px;
                        }
                        .map-to{
                            padding-right: 18px;
                        }
                        .company-logo{
                            justify-self: end;
                        }
                    }
                    .time-info{
                        display: inline-grid;
                        grid-template-columns: repeat(5, auto);
                        grid-column-gap: 33px;
                        padding-top: 11px;
                        justify-content: left;

                        h5{
                            margin: 0;
                        }
                        div:not(:nth-last-child(2)){
                            padding-right: 20px;
                        }
                        .normal-text{
                            font-family: "Montserrat";
                            font-size: 12px;
                            line-height: normal;
                            color: #6B6B81;
                        }
                    }
                }
            }
        }
    }

    .dashed-border{
        height: 1px;
        width: 80%;
        border-bottom: 1px dashed #d4d4d4;
    }
    .border-orange{
        width: min-content;
        border: 2px solid #FFA927;
        border-radius: 3px;
        padding: 0 20px;
        &.border-green{
            border: 2px solid #6DE18D;
        }
        &.border-red{
            border: 2px solid red;
        }
    }

    .standard-text{
        font-family: "Montserrat";
        font-weight: normal;
        font-size: 12px;
        line-height: normal;
        color: #6B6B81;
    }
    .orange-text, .green-text, .bold-text{
        font-family: "Montserrat";
        font-weight: bold;
        font-size: 12px;
        line-height: normal;
    }
    .bold-text{
        color: #575870;
    }
    .orange-text{
        color: #FFA927;
        white-space: nowrap;
        &.green-text{
            color: #6DE18D;
        }
        &.red-text{
            color: red;
        }
    }
    .green-text{
        color: #6DE18D;
        white-space: nowrap;
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