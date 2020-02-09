<template>
    <div class="exchange-order-content">
        <div class="headline">
            <h5 class="headline-text">Обмен услуги</h5>
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
                    v-for="(item, index) in 1"
                    :key="index"
            >
                <div class="item-content-row">
                    <div class="item-standard align-center">
                        <cCheckbox></cCheckbox>
                    </div>
                    <div class="item-standard">
                        <span class="bold-text">555</span>
                    </div>
                    <div class="item-standard">
                        <span class="bold-text">45</span>
                    </div>
                    <div class="item-standard">
                        <span class="bold-text">787</span>
                    </div>
                    <div class="item-standard">
                        <span class="bold-text">8778</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="headline">
            <h5 class="headline-text">Данные</h5>
        </div>
        <div class="data-wrap">
            <div class="paragraph">
                <p class="bold-text">ПОСТАВЩИК</p>
                <cInput
                    inputPadding="9px 10px"
                ></cInput>
            </div>
            <div class="paragraph">
                <p class="bold-text">НОМЕР ЗАКАЗА ОСНОВАНИЯ</p>
                <cInput
                    inputPadding="9px 10px"
                ></cInput>
            </div>
            <div class="paragraph">
                <p class="bold-text">GDS</p>
                <cInput
                    inputPadding="9px 10px"
                ></cInput>
            </div>
            <div class="paragraph">
                <p class="bold-text">ПЕРЕВОЗЧИК</p>
                <cInput
                    inputPadding="9px 10px"
                ></cInput>
            </div>
            <div class="paragraph">
                <p class="bold-text">PNR-КОД БИЛЕТА</p>
                <cInput
                    inputPadding="9px 10px"
                ></cInput>
            </div>
        </div>

        <div class="flight-wrap">
            <div class="headline">
                <h5 class="headline-text">Перелет 1</h5>
            </div>
            <div class="segment-wrap">
                <div class="headline">
                    <h5 class="headline-text">Сегмент 1</h5>
                </div>
                <div class="segment-content">
                    <div class="row-wrap">
                        <div class="paragraph">
                            <p class="bold-text">НОМЕР РЕЙСА</p>
                            <cInput
                                inputPadding="9px 10px"
                            ></cInput>
                        </div>
                        <div class="paragraph">
                            <p class="bold-text">КЛАСС</p>
                            <cSelectInput
                                inputPadding="9px 10px"
                            ></cSelectInput>
                        </div>
                        <div class="paragraph">
                            <p class="bold-text">АВИАКОМПАНИЯ</p>
                            <cInput
                                inputPadding="9px 10px"
                            ></cInput>
                        </div>
                        <div class="paragraph">
                            <p class="bold-text">ТИП ВС</p>
                            <cSelectInput
                                inputPadding="9px 10px"
                            ></cSelectInput>
                        </div>
                    </div>
                    <div class="row-wrap-date">
                        <div class="paragraph">
                            <p class="bold-text">ДАТА ВЫЛЕТА</p>
                            <cDate
                                    inputPadding="9px 10px"
                            ></cDate>
                        </div>
                        <div class="paragraph">
                            <p class="bold-text">ВРЕМЯ ВЫЛЕТА</p>
                            <cInput
                                    class="time-input"
                                    v-model.trim="sendParam.time_departure_at"
                                    :inputMask="'##:##'"
                                    @input="timeFormatDeparture()"
                                    inputPadding="9px 10px"
                                    inputPlaceholder="Время..."
                            ></cInput>
                        </div>
                        <div class="paragraph">
                            <p class="bold-text">ИЗ</p>
                            <cSelectInput
                                    inputPadding="9px 10px"
                            ></cSelectInput>
                        </div>
                    </div>
                    <div class="row-wrap-date">
                        <div class="paragraph">
                            <p class="bold-text">ДАТА ПРИЛЕТА</p>
                            <cDate
                                    inputPadding="9px 10px"
                            ></cDate>
                        </div>
                        <div class="paragraph">
                            <p class="bold-text">ВРЕМЯ ПРИЛЕТА</p>
                            <cInput
                                    class="time-input"
                                    v-model.trim="sendParam.time_arrival_at"
                                    :inputMask="'##:##'"
                                    @input="timeFormatArrival()"
                                    inputPadding="9px 10px"
                                    inputPlaceholder="Время..."
                            ></cInput>
                        </div>
                        <div class="paragraph">
                            <p class="bold-text">В</p>
                            <cSelectInput
                                    inputPadding="9px 10px"
                            ></cSelectInput>
                        </div>
                    </div>
                    <div class="add-segment">
                        <svg height="18px" viewBox="0 0 512 512" width="18px" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#575870" d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531s26.628906 132.667969 74.980469 181.019531c48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.640625 74.980469-181.019531s-26.628906-132.667969-74.980469-181.019531zm-181.019531 397.019531c-119.101562 0-216-96.898438-216-216s96.898438-216 216-216 216 96.898438 216 216-96.898438 216-216 216zm20-236.019531h90v40h-90v90h-40v-90h-90v-40h90v-90h40zm0 0"/>
                        </svg>
                        <p class="bold-text">ДОБАВИТЬ СЕГМЕНТ</p>
                    </div>
                </div>
            </div>
            <div @click="addSigment()" class="add-segment">
                <svg height="18px" viewBox="0 0 512 512" width="18px" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#575870" d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531s26.628906 132.667969 74.980469 181.019531c48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.640625 74.980469-181.019531s-26.628906-132.667969-74.980469-181.019531zm-181.019531 397.019531c-119.101562 0-216-96.898438-216-216s96.898438-216 216-216 216 96.898438 216 216-96.898438 216-216 216zm20-236.019531h90v40h-90v90h-40v-90h-90v-40h90v-90h40zm0 0"/>
                </svg>
                <p class="bold-text">ДОБАВИТЬ ПЕРЕЛЕТ</p>
            </div>
        </div>
        <div class="headline">
            <h5 class="headline-text">Изменение цены</h5>
        </div>
        <div class="change-price-wrap">
            <div class="paragraph">
                <p class="bold-text">БИЛЕТ</p>
                <cInput
                        inputPadding="9px 10px"
                ></cInput>
            </div>
            <div class="paragraph">
                <p class="bold-text">ДОПЛАТА ТАРИФ</p>
                <cInput
                        inputPadding="9px 10px"
                ></cInput>
            </div>
            <div class="paragraph">
                <p class="bold-text">ДОПЛАТА СБОР</p>
                <cInput
                        inputPadding="9px 10px"
                ></cInput>
            </div>
            <div class="paragraph">
                <p class="bold-text">СБОР ЗА ОБМЕН</p>
                <cInput
                        inputPadding="9px 10px"
                ></cInput>
            </div>
            <div class="paragraph">
                <p class="bold-text">ШТРАФ</p>
                <cInput
                        inputPadding="9px 10px"
                ></cInput>
            </div>
            <div class="paragraph">
                <p class="bold-text">ИТОГО</p>
                <cInput
                        inputPadding="9px 10px"
                ></cInput>
            </div>
        </div>
        <div class="add-fees-wrap">
            <div class="headline">
                <h5 class="headline-text">Добавить сборы из настроек компании</h5>
            </div>
            <cButton
                    buttonValue="добавить"
            ></cButton>
        </div>
    </div>
</template>

<script>
    import * as types from "@/stores/modules/orders/types";

    import cInput from "@/components/base_components/cInput";
    import cSelectInput from "@/components/base_components/cSelectInput";
    import cCheckbox from "@/components/base_components/cCheckbox";
    import cDate from "@/components/base_components/cDate";
    import cButton from "@/components/base_components/cButton";

    export default {
        name: "ExchangeOrders",
        components: {
            cInput,
            cCheckbox,
            cSelectInput,
            cDate,
            cButton,
        },
        data() {
            return {
                orderData: [],
                orderId: null,
                sendParam: {
                    time_arrival_at: '',
                    time_departure_at: '',
                }
            }
        },
        mounted() {
            this.orderId = this.$store.getters["orders/getOrderId"]
        },
        methods: {
            timeFormatArrival() {
                let time = this.sendParam.time_arrival_at.split('')
                if (time.length >= 2 && (parseInt(time[0] + time[1])) > 23){
                    time[0] = 2;
                    time[1] = 3;
                }
                if (time.length == 5 && (parseInt(time[3] + time[4])) > 59){
                    time[3] = 5;
                    time[4] = 9;
                }
                this.sendParam.time_arrival_at = time.join('');
            },
            timeFormatDeparture() {
                let time = this.sendParam.time_departure_at.split('')
                if (time.length >= 2 && (parseInt(time[0] + time[1])) > 23){
                    time[0] = 2;
                    time[1] = 3;
                }
                if (time.length == 5 && (parseInt(time[3] + time[4])) > 59){
                    time[3] = 5;
                    time[4] = 9;
                }
                this.sendParam.time_departure_at = time.join('');
            },
        },
        computed: {

        },
        watch: {
            orderId(val) {
                console.log(111);
                if (val) {
                    this.$store.dispatch("orders/" + types.A_EXCHANGE_ORDER, val)
                        .then( res => {
                            console.log(res);
                            this.orderData = res
                        })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .exchange-order-content{
        padding: 0 130px 70px 0;
        min-width: 720px;
        max-width: 900px;

        .headline{
            padding: 26px 0;
            h5{
                margin: 0;
            }
        }

        .passenger-info{
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
                /deep/.c-checkbox{
                    & #checkbox:checked + label{
                        &::before{
                            background-color: transparent;
                            border: 1px solid #5CDF81;
                        }
                        &::after{
                            opacity: 1;
                        }
                    }
                }
                /deep/.checkbox-label{
                    grid-template-columns: unset;
                    margin: 0;
                    &::before{
                        background: transparent;
                        border: 1px solid #e7e7e7;
                    }
                    &::after{
                        border-left: 2px solid #5CDF81;
                        border-bottom: 2px solid #5CDF81;
                    }
                }
            }
        }

        .data-wrap{
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 15px;
        }
        .flight-wrap{

            .headline{
                padding: 40px 0 16px 0;
            }
            .segment-wrap{
                padding-left: 20px;
                margin-bottom: 20px;
                border-left: 2px solid #5CDF81;
                width: 600px;
                .headline{
                    padding: unset;
                    margin: 16px 0;
                }
                .row-wrap{
                    display: grid;
                    grid-template-columns: 1fr 1fr 2fr 1fr;
                    grid-column-gap: 15px;
                }
                .row-wrap-date{
                    display: grid;
                    grid-template-columns: 2fr 1fr 2fr;
                    grid-column-gap: 15px;
                    span{
                        margin: 0 7px;
                    }
                    /deep/.c-date .v-menu{
                        display: none;
                    }
                }
            }
        }
        .change-price-wrap{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, auto));
            grid-gap: 15px;
        }
        .add-fees-wrap{
            .headline{
                padding-bottom: 10px;
            }
            .headline-text{
                font-size: 11px;
            }
        }
    }

    .paragraph{
        p{
            margin-bottom: 3px;
            font-size: 11px;
        }
        /deep/.c-input input{
            min-width: unset;
            width: 100%;
        }
        /deep/.c-select .v-select > .v-input__control > .v-input__slot{
            min-width: unset;
            width: 100%;
        }
        /deep/.c-select .v-select > .v-input__control > .v-input__slot .v-select__selections{
            width: unset;
        }
    }
    .add-segment{
        display: inline-flex;
        align-items: center;
        cursor: pointer;
        p{
            margin-left: 4px;
            margin-bottom: 0;
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
    .headline-text{
        font-family: "Montserrat";
        font-weight: bold;
        font-size: 12px;
        line-height: normal;
        text-transform: uppercase;
        color: #1F2041;
    }
</style>