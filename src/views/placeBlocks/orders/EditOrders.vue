<template>
    <div class="edit-orders-content">
        <div class="headline">
            <h5 class="headline-text">Заказ</h5>
        </div>
        <div class="edit-order-info">
            <div class="paragraph">
                <span class="standard-text">Номер заказа основания</span>
                <span class="bold-text">{{order.order_n}}</span>
            </div>
            <div class="paragraph">
                <span class="standard-text">Статус</span>
                <div @click="changeStatus()" :class="['border-orange', order.status == 2 ? 'border-green' :  '']">
                    <span :class="['orange-text',order.status == 2 ? 'green-text' :  '']">{{order.status == 2 ? 'Выписана' : 'в работе'}}</span>
                </div>
            </div>
            <div class="paragraph">
                <span class="standard-text">Дата бронирования</span>
                <span class="bold-text">{{order.booking_date|substrLastThreeItem}}</span>
            </div>
            <div class="paragraph">
                <span class="standard-text">Выкупить до</span>
                <div>
                    <span class="bold-text">{{newTimeLimitDate == null ? getDate : newTimeLimitDate.new_date}}</span>
                    <v-icon
                            @click="showModal = !showModal"
                            small
                            color="#6DE18D"
                            class="pencil-icon ml-2"
                    >create</v-icon>
                </div>
            </div>
            <div class="paragraph">
                <span class="standard-text">Билетов</span>
                <span class="bold-text">{{order.ticket_count}}</span>
            </div>
            <div class="paragraph">
                <span class="standard-text">Код бронирования</span>
                <span class="bold-text">
                    <input class="outline-none" type="text" v-model="order.code">
                </span>
            </div>
            <div class="paragraph">
                <span class="standard-text">Автор</span>
                <span class="bold-text">{{order.first_name}} {{order.second_name}}</span>
            </div>
            <div>
                <cSelect
                        v-model="order.gds_ticket"
                        inputLabel="Выписан в GDS"
                ></cSelect>
            </div>
        </div>
        <div class="edit-order-ticket-info">
            <div class="ticket-content">
                <div class="ticket-wrap">
                    <div class="map-info">
                        <span class="map-from bold-text">{{order.departure_city}}</span>
                        <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.11609 14.8544L6.97937 8.84265L2.86609 8.84265L1.74109 10.3544L0.616088 10.3544L1.35437 7.71765L0.616088 5.11609L1.74109 5.11609L2.86609 6.59265L6.97937 6.59265L5.11609 0.616088L6.59265 0.616088L10.3544 6.59265L14.4677 6.59265C14.7723 6.59265 15.0302 6.69812 15.2411 6.90906C15.4755 7.14343 15.5927 7.41296 15.5927 7.71765C15.5927 8.02234 15.4755 8.28015 15.2411 8.49109C15.0302 8.72546 14.7723 8.84265 14.4677 8.84265L10.3544 8.84265L6.59265 14.8544L5.11609 14.8544Z" fill="#5CDF81"/>
                        </svg>
                        <span class="map-to bold-text">{{order.arrival_city}}</span>
                        <span class="start-date">вылет {{momentDateSearch()}}</span>

                        <div class="company-logo">
                            <img src="../../../assets/images/imageAPI.png" alt="">
                        </div>
                    </div>
                    <div class="time-info">
                        <div class="departure">
                            <h5 class="normal-text">Вылет</h5>
                            <span class="bold-text">{{order.departure_time}}</span>
                        </div>
                        <div class="arrival">
                            <h5 class="normal-text">Прилет</h5>
                            <span class="bold-text">{{order.arrival_time}}</span>
                        </div>
                        <div class="transplants">
                            <h5 class="normal-text">Пересадки</h5>
                            <span class="bold-text">{{order.is_transplantation}}</span>
                        </div>
                        <div class="on-way">
                            <h5 class="normal-text">В пути</h5>
                            <span class="bold-text">{{order.flight_duration}}</span>
                        </div>
                        <div class="flight">
                            <h5 class="normal-text">Рейс</h5>
                            <span class="bold-text">{{order.flights}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tickets">
            <div class="headline">
                <h5 class="headline-text">Реестр билетов</h5>
            </div>
            <div class="ticket-list">
                <div class="ticket-list-header">
                    <span class="standard-text">Билет</span>
                    <span class="standard-text">Тариф</span>
                    <span class="standard-text">Таксы</span>
                    <span class="standard-text">Сбор</span>
                    <span class="standard-text">Итого</span>
                    <span class="standard-text">Пассажир</span>
                </div>
                <div
                        class="ticket-list-content"
                        v-for="(item, index) in tickets"
                        :key="index"
                >
                    <span class="bold-text">
                        <input 
                                class="outline-none" 
                                type="text" 
                                v-model="item.ticket.ticket_number"
                                @blur="saveTicket(item.ticket.id, item.ticket.ticket_number, item.ticket.rate_fare, item.ticket.tax_fare, item.ticket.types_fees_fare)"
                        >
                    </span>
                    <span class="bold-text">
                        <input 
                                class="outline-none" 
                                type="text" 
                                v-model="item.ticket.rate_fare"
                                @blur="saveTicket(item.ticket.id, item.ticket.ticket_number, item.ticket.rate_fare, item.ticket.tax_fare, item.ticket.types_fees_fare)"
                        >
                    </span>
                    <span class="bold-text">
                        <input 
                                class="outline-none" 
                                type="text" 
                                v-model="item.ticket.tax_fare"
                                @blur="saveTicket(item.ticket.id, item.ticket.ticket_number, item.ticket.rate_fare, item.ticket.tax_fare, item.ticket.types_fees_fare)"
                        >
                    </span>
                    <span class="bold-text">
                        <input 
                                class="outline-none" 
                                type="text" 
                                v-model="item.ticket.types_fees_fare"
                                @blur="saveTicket(item.ticket.id, item.ticket.ticket_number, item.ticket.rate_fare, item.ticket.tax_fare, item.ticket.types_fees_fare)"
                        >
                    </span>
                    <span class="bold-text">{{getSumm(item.ticket.rate_fare, item.ticket.tax_fare)}}</span>
                    <span class="bold-text">{{item.passenger.name}} {{item.passenger.name}}</span>
                </div>
            </div>
        </div>
        <cButton
                @click.native="save()"
                buttonValue="Сохранить"
        ></cButton>
        <popup
                :popupDate="popupDate"
                :bookingDate="order.booking_date"
                :showModal="showModal"
                @hidePopup="showModal = $event"
                @newDate="newTimeLimitDate = $event"
        ></popup>
    </div>
</template>

<script>
    import moment from 'moment'
    import * as types from "@/stores/modules/blocks/types";

    import popup from "@/views/placeBlocks/orders/editOrderPopup";
    import cSelect from "@/components/base_components/cSelect";
    import cButton from "@/components/base_components/cButton";

    export default {
        name: "EditOrders",
        components: {
            cSelect,
            cButton,
            popup
        },
        data() {
            return {
                showModal: false,
                newTimeLimitDate: null,
                popupDate: '',
                order: {
                    gds_ticket: '',
                    order_n: '',
                    status: '',
                    booking_date: '',
                    ticket_count: '',
                    code: '',
                    first_name: '',
                    second_name: '',
                    time_limit: '',
                    departure_city: '',
                    arrival_city: '',
                    departure_date: '',
                    departure_time: '',
                    arrival_time: '',
                    is_transplantation: '',
                    flight_duration: '',
                    flights: '',
                },
                tickets: [],
                sandTickets: [],
            }
        },
        mounted() {
            let data = this.$store.getters["blocks/getCurrentOrder"];
            this.order.gds_ticket = data.gds_ticket;
            this.order.order_n = data.order_n;
            this.order.status = data.status;
            this.order.booking_date = data.services[0].booking_date;
            this.order.ticket_count = data.services.length;
            this.order.code = data.services[0].pnr;
            this.order.first_name = data.user.profile.first_name;
            this.order.second_name = data.user.profile.second_name;
            this.order.time_limit = data.time_limit;
            this.order.departure_city = data.services[0].flight.flightplaces.schedule[0].departure.name_ru;
            this.order.arrival_city = data.services[0].flight.flightplaces.schedule[0].arrival.name_ru;
            this.order.departure_date = data.services[0].flight.date_departure_at;
            this.order.departure_time = data.services[0].flight.flightplaces.schedule[0].time_departure_at.substr(0,5);
            this.order.arrival_time = data.services[0].flight.flightplaces.schedule[0].time_arrival_at.substr(0,5);
            this.order.is_transplantation = (data.services[0].flight.flightplaces.schedule[0].is_transplantation) ? 'С пересадками' : 'нет';
            this.order.flight_duration = data.services[0].flight.flightplaces.schedule[0].flight_duration.substr(0,5);
            this.order.flights = data.services[0].flight.flightplaces.schedule[0].flights;
            let ticket = [];
            let helper = [] //check tickets duplicat
            data.services.filter( val => {
                function getId(element) {
                    return element == val.ticket.id;
                }
                if (!helper.some(getId)){
                    helper.push(val.ticket.id)
                    ticket.push(val)
                }
            })
            this.tickets = ticket;
        },
        computed: {
            getDate() {
                let res = '00:00'
                if (this.order.time_limit) {
                    let time = new Date(this.order.booking_date);
                    let seconds = time.getTime() + (this.order.time_limit * 1000);
                    time = new Date(seconds);
                    let year = time.getFullYear();
                    let mounth = time.getMonth()+1 < 9 ? '0'+(time.getMonth()+1) : time.getMonth()+1;
                    let day = time.getDate() < 9 ? '0'+(time.getDate()) : time.getDate();
                    let hours = time.getHours() < 9 ? '0'+(time.getHours()) : time.getHours()
                    let minutes = time.getMinutes() < 9 ? '0'+(time.getMinutes()) : time.getMinutes()
                    res = year+'-'+mounth+'-'+day+' '+hours+':'+minutes
                }
                return res
            },
        },
        methods: {
            getSumm(a, b) {
                if (a == null || a == ''){
                    return b
                } else if (b == null || b == '') {
                    return a
                }
                return parseFloat(a) + parseFloat(b);
            },
            saveTicket(id, t_number, t_rate, t_tax, t_fees) {
                let count = 0; // check if count < this.sandTickets.length => push new ticket
                if (this.sandTickets.length == 0) {
                    this.$set(this.sandTickets, 0, {
                        id: id,
                        ticket_number: t_number,
                        rate_fare: t_rate,
                        tax_fare: t_tax,
                        types_fees_fare: t_fees,
                        summ_ticket: this.getSumm(t_rate, t_tax)
                    });
                }else {
                    this.sandTickets.filter( (val, key) => {
                        if (val.id == id) {
                            this.sandTickets[key].ticket_number = t_number;
                            this.sandTickets[key].rate_fare = t_rate;
                            this.sandTickets[key].tax_fare = t_tax;
                            this.sandTickets[key].types_fees_fare = t_fees;
                            this.sandTickets[key].summ_ticket = this.getSumm(t_rate, t_tax);
                        }else {
                            count++
                        }
                    })
                    if (count == this.sandTickets.length) {
                        this.$set(this.sandTickets, this.sandTickets.length, {
                            id: id,
                            ticket_number: t_number,
                            rate_fare: t_rate,
                            tax_fare: t_tax,
                            types_fees_fare: t_fees,
                            summ_ticket: this.getSumm(t_rate, t_tax)
                        });
                    }
                }
            },
            save() {
                let data = {
                    id: this.$route.params.id,
                    status: this.order.status,
                    time_limit: this.order.time_limit,
                    pnr: this.order.code,
                    gds_ticket: this.order.gds_ticket,
                    tickets: this.sandTickets
                }
                console.log(data);
                this.$store.dispatch("blocks/" + types.A_EDIT_ORDER, data)
                    .then( res => {
                        this.$router.push("/blocks/orders")
                    })
            },
            changeStatus() {
                if (this.order.status == 2)
                    this.order.status = 1
                else
                    this.order.status = 2
            },
            momentDateSearch () {
                return moment(this.order.departure_date).locale('ru').format('DD MMMM , dddd');
            },
        },
        watch: {
            getDate(val){
                this.popupDate = val
            },
            newTimeLimitDate(val) {
                this.order.time_limit = val.time_limit
            }
        }
    }
</script>

<style lang="scss" scoped>
    .edit-orders-content{
        padding: 0 33px 50px;
        min-width: 1000px;

        .headline{
            padding: 26px 0;
            h5{
                margin: 0;
            }
        }
        .edit-order-info{
            width: 460px;

            .paragraph{
                display: grid;
                grid-template-columns: 1fr 1fr;
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
            /deep/.c-select{
                padding: 4px 0;

                & .select-label{
                    color: #6B6B81;
                    grid-template-columns: 1fr 1fr;
                    grid-auto-flow: dense;
                    &:before{
                        grid-column: 2/3;
                    }
                    &:after{
                        grid-column: 2/3;
                    }
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
        .ticket-list{
            width: 682px;
            margin-bottom: 30px;
            .ticket-list-header{
                display: grid;
                grid-template-columns: repeat(6, 1fr);
                margin-bottom: 10px;
            }
            .ticket-list-content{
                display: grid;
                grid-template-columns: repeat(6, 1fr);
                background-color: #EEEEEE;
                padding: 3px 5px;
                border-bottom: 1px dashed #cecece;
                &:last-child{
                    border: none;
                }
            }
        }
    }

    .outline-none{
        cursor: pointer;
        outline: none;
        width: 50px;
    }

    .border-orange{
        width: min-content;
        border: 2px solid #FFA927;
        border-radius: 3px;
        padding: 0 20px;
        cursor: pointer;
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