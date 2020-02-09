<template>
    <div class="services-content">
        <div class="headline">
            <h5 class="headline-text">Список услуг</h5>
        </div>
        <v-data-table
                :headers="headers"
                :items="dataTableItems"
                :hide-actions="true"
                class="elevation-1"
        >
            <template slot="headerCell" scope="props">
                <span class="history-datatable-th standard-text">
                  {{ props.header.text }}
                </span>
            </template>
            <template slot="items" scope="props">
                <td class="text-xs-start bold-text">{{ getDepartureAirport(props.item.departure_at) }}</td>
                <td class="text-xs-start bold-text">{{ getArrivalAirport(props.item.arrival_at) }}</td>
                <td class="text-xs-start bold-text">{{ getFlightType(props.item.type_flight) }}</td>
                <td class="text-xs-start bold-text">{{ getFlight(props.item.departure_date, props.item.flight.flightplaces.schedule[0].time_departure_at) }}</td>
                <td class="text-xs-start bold-text">{{ getFlightBack(props.item.service_id) }}</td>
                <td class="text-xs-start bold-text">{{ props.item.fare.name_ru }}</td>
                <td class="text-xs-start amount-text">{{ serviceSumm }} {{currency}}</td>
                <td class="text-xs-start">
                    <span :class="['status-text',{'orange-text' : serviceStatus != 2}]">{{serviceStatus == 2 ? 'Выполнен' : 'В работе'}}</span>
                </td>
            </template>
        </v-data-table>
        <div class="users-name">
            <div
                    v-for=" (item, index) in passengerData"
                    :key="index"
                    class="user"
            >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.03125 9.66406C4.72396 10.0286 5.38021 10.2109 6 10.2109C6.61979 10.2109 7.26693 10.0286 7.94141 9.66406C8.63411 9.29948 9.15365 8.85286 9.5 8.32422C9.48177 7.8138 9.07161 7.38542 8.26953 7.03906C7.46745 6.69271 6.71094 6.51953 6 6.51953C5.28906 6.51953 4.53255 6.69271 3.73047 7.03906C2.92839 7.36719 2.51823 7.79557 2.5 8.32422C2.84635 8.85286 3.35677 9.29948 4.03125 9.66406ZM7.23047 2.44531C6.88411 2.09896 6.47396 1.92578 6 1.92578C5.52604 1.92578 5.11589 2.09896 4.76953 2.44531C4.42318 2.79167 4.25 3.20182 4.25 3.67578C4.25 4.14974 4.42318 4.5599 4.76953 4.90625C5.11589 5.2526 5.52604 5.42578 6 5.42578C6.47396 5.42578 6.88411 5.2526 7.23047 4.90625C7.57682 4.5599 7.75 4.14974 7.75 3.67578C7.75 3.20182 7.57682 2.79167 7.23047 2.44531ZM1.87109 1.89844C3.01953 0.75 4.39583 0.175781 6 0.175781C7.60417 0.175781 8.97135 0.75 10.1016 1.89844C11.25 3.02865 11.8242 4.39583 11.8242 6C11.8242 7.60417 11.25 8.98047 10.1016 10.1289C8.97135 11.2591 7.60417 11.8242 6 11.8242C4.39583 11.8242 3.01953 11.2591 1.87109 10.1289C0.740885 8.98047 0.175781 7.60417 0.175781 6C0.175781 4.39583 0.740885 3.02865 1.87109 1.89844Z" fill="#878797"/>
                </svg>
                <span class="standard-text">{{item.name}} {{item.surname}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import * as feesTypes from "@/stores/modules/controls/types";

    export default {
        name: "Services",
        data(){
            return {
                serviceStatus: 0,
                serviceData: [],
                passengerData: [],
                currency: '',
                serviceSumm: 0.00,
                fareFamiliesData: null,
                airports: [],
                headers: [
                    {text: 'Откуда', align: 'left', sortable: true, value: ''},
                    {text: 'Куда', align: 'left', value: ''},
                    {text: 'Перелет', align: 'left', value: ''},
                    {text: 'Время', align: 'left', value: ''},
                    {text: 'Обратно', align: 'left', value: ''},
                    {text: 'Класс', align: 'left', value: ''},
                    {text: 'Цена', align: 'left', value: ''},
                    {text: 'Статус', align: 'left', value: ''}
                ],
                dataTableItems: [],
            }
        },
        mounted() {
            let data = this.$store.getters['orders/getOrder'] != null ? this.$store.getters['orders/getOrder'] : [];
            this.serviceData = data.services;
            this.serviceSumm = data.order_summary;
            this.serviceStatus = data.status;
            let currency_id = data.order_currency;
            this.$store.dispatch("controls/" + feesTypes.A_FEES)
                .then(res => {
                    this.airports.push(res.airports);
                });
            this.currency = this.$store.getters['blocks/getCurrencyById'](currency_id).code_literal_iso_4217;
            this.passengerData = this.$store.getters['orders/getPassengers']
        },
        methods: {
            getDepartureAirport(val) {
                let airports = '-';
                if (this.airports[0]) {
                    this.airports[0].filter((value) => {
                        if (value.id == val) {
                            airports = value.name_ru;
                        }
                    });
                }
                return airports;
            },
            getArrivalAirport(val) {
                let airports = '-';
                if (this.airports[0] && this.serviceData) {
                    this.airports[0].filter((value) => {
                        if (value.id == val) {
                            airports = value.name_ru;
                        }
                    });
                }
                return airports;
            },
            getFlight(date, time) {
                let newDate = date.split(' ')[0];
                let newTime = time.substring(0, time.length - 3);
                return newDate + " " + newTime
            },
            getFlightBack(servicId) {
                let result = '';
                let count = 0;
                this.serviceData.filter( val => {
                    if (val.service_id == servicId){
                        if (count == 1) {
                            let date = val.departure_date.split(' ')[0];
                            let time = val.flight.flightplaces.schedule[0].time_departure_at;
                            result = date + " " + time.substring(0, time.length - 3);
                        }
                        count++
                    }
                })
                return result;
            },
            getFlightType(val) {
                console.log(val);
                let res = val == 1 ? 'В одну сторону' : (val == 2 ? 'Туда и обратно' : '-')
                return res
            },
        },
        watch: {
            serviceData(val) {
                let result = [];
                let helper = [] //check passenger duplicat
                val.filter( val => {
                    function getId(element) {
                        return element == val.service_id;
                    }
                    if (!helper.some(getId)){
                        helper.push(val.service_id)
                        result.push(val)
                    }
                })
                this.dataTableItems = result
                console.log(result);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .services-content{

        .headline{
            padding: 28px 0 30px;
            h5{
                margin: 0;
            }
        }
    }

    /* _DATA TABLE_ */

    .elevation-1{
        box-shadow: none!important;

        /deep/.theme--light.v-table thead tr:first-child{
            border: none;
        }
        /deep/table.v-table{
            & thead tr{
                height: auto;
            }
            & tbody{
                & tr:last-child{
                    border-bottom: 1px dashed rgba(31, 32, 65, 0.25);
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

    .users-name{
        display: flex;
        padding: 8px 0;

        .user{
            padding-right: 11px;
            svg{
                margin-right: 5px;
            }
        }
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