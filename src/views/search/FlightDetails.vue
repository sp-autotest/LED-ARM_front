<template>
    <div class="flight-content">
        <div class="flight_details">
            <div class="flight_details_travel">
                <div class="flight_details_travel_title">
                    <p class="bold-text">Полный маршрут</p>
                </div>
                <div class="flight_details_travel_detail">
                    <span class="standard-text">{{cityF ? cityF : ''}}</span>
                    <span>
                                     <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                         <path d="M5.11609 14.8544L6.97937 8.84265L2.86609 8.84265L1.74109 10.3544L0.616088 10.3544L1.35437 7.71765L0.616088 5.11609L1.74109 5.11609L2.86609 6.59265L6.97937 6.59265L5.11609 0.616088L6.59265 0.616088L10.3544 6.59265L14.4677 6.59265C14.7723 6.59265 15.0302 6.69812 15.2411 6.90906C15.4755 7.14343 15.5927 7.41296 15.5927 7.71765C15.5927 8.02234 15.4755 8.28015 15.2411 8.49109C15.0302 8.72546 14.7723 8.84265 14.4677 8.84265L10.3544 8.84265L6.59265 14.8544L5.11609 14.8544Z"
                                               fill="#5CDF81"/>
                                     </svg>
                                 </span>
                    <span class="standard-text">{{cityT ? cityT : ''}}</span>
                </div>
            </div>
            <div class="flight_details_airlines" v-if="!isCrane">
                <div class="flight_details_travel_title">
                    <p class="bold-text">Наименование авиакомпании</p>
                </div>
                <div class="flight_details_travel_detail">
                    <span class="standard-text">
                        {{(flightData.flightplaces) ? flightData.flightplaces.schedule[0].airline.short_aviacompany_name_ru : ""}}
                    </span>
                    <span class="standard-text">
                        {{flightData.flightNumber}}
                    </span>
                </div>
            </div>
            <div class="flight_details_airlines">
                <div class="flight_details_travel_title">
                    <p class="bold-text">Дата отправления</p>
                </div>
                <div class="flight_details_travel_detail">
                    <span class="standard-text" v-if="!isCrane">
                        {{(flightData.date_departure_at) ? flightData.date_departure_at : ""}}
                    </span>
                    <span class="standard-text" v-if="isCrane">
                        {{(flightData.arrivalDateTime) ? momentDateSearch(flightData.arrivalDateTime.value) : ""}}
                    </span>
                </div>
            </div>
            <div class="flight_details_airlines">
                <div class="flight_details_travel_title">
                    <p class="bold-text">Время отправления</p>
                </div>
                <div class="flight_details_travel_detail">
                    <span class="standard-text" v-if="!isCrane">
                        {{(flightData.flightplaces) ? flightData.flightplaces.schedule[0].time_departure_at : ""}}
                    </span>
                    <span class="standard-text" v-if="isCrane">
                        {{(flightData.departureDateTime) ? momentTime(new Date(flightData.departureDateTime.value).getTime()) : ""}}
                    </span>
                </div>
            </div>
            <div class="flight_details_airlines">
                <div class="flight_details_travel_title">
                    <p class="bold-text">Время прибытия</p>
                </div>
                <div class="flight_details_travel_detail">
                    <span class="standard-text" v-if="!isCrane">
                        {{(flightData.flightplaces) ? flightData.flightplaces.schedule[0].time_arrival_at : ""}}
                    </span>
                    <span class="standard-text" v-if="isCrane">
                        {{(flightData.arrivalDateTime) ? momentTime(new Date(flightData.arrivalDateTime.value).getTime()) : ""}}
                    </span>
                </div>
            </div>
            <div class="flight_details_airlines">
                <div class="flight_details_travel_title">
                    <p class="bold-text">Время в пути</p>
                </div>
                <div class="flight_details_travel_detail">
                    <span class="standard-text">
                        {{(travelTime) ? travelTime : '00:00'}}
                    </span>
                </div>
            </div>
            <div class="flight_details_airlines">
                <div class="flight_details_travel_title">
                    <p class="bold-text">Класс</p>
                </div>
                <div class="flight_details_travel_detail">
                    <span class="standard-text" v-if="!isCrane">
                        {{(flightData.flightplaces) ? flightData.flightplaces.farefamily.name_ru : ""}}
                    </span>
                    <span class="standard-text" v-if="isCrane">

                    </span>
                </div>
            </div>
            <div class="flight_details_airlines" v-if="!isCrane">
                <div class="flight_details_travel_title">
                    <p class="bold-text">Багаж взрослого</p>
                </div>
                <div class="flight_details_travel_detail">
                                <span class="standard-text">
                                    {{(flightData.flightplaces) ? flightData.flightplaces.farefamily.luggage_adults : ""}}
                                </span>
                </div>
            </div>
            <div class="flight_details_airlines" v-if="!isCrane">
                <div class="flight_details_travel_title">
                    <p class="bold-text">Багаж ребенка</p>
                </div>
                <div class="flight_details_travel_detail">
                                <span class="standard-text">
                                    {{(flightData.flightplaces) ? flightData.flightplaces.farefamily.luggage_children : ""}}
                                </span>
                </div>
            </div>
            <div class="flight_details_airlines" v-if="!isCrane">
                <div class="flight_details_travel_title">
                    <p class="bold-text">Самолёт(модель)</p>
                </div>
                <div class="flight_details_travel_detail">
                                <span class="standard-text" v-if="!isCrane">
                                    {{(airNumber) ? airNumber.name_ru : ""}}
                                </span>
                    <span class="standard-text" v-if="isCrane">
                                     {{flightData.flightNumber}}
                                </span>
                </div>
            </div>
        </div>

        <div v-if="fData2 != null" class="dashed-line"></div>

        <div v-if="fData2 != null" class="flight_details">
            <div class="flight_details_travel">
                <div class="flight_details_travel_title">
                    <p class="bold-text">Полный маршрут</p>
                </div>
                <div class="flight_details_travel_detail">
                    <span class="standard-text">{{cityT}}</span>
                    <span>
                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.11609 14.8544L6.97937 8.84265L2.86609 8.84265L1.74109 10.3544L0.616088 10.3544L1.35437 7.71765L0.616088 5.11609L1.74109 5.11609L2.86609 6.59265L6.97937 6.59265L5.11609 0.616088L6.59265 0.616088L10.3544 6.59265L14.4677 6.59265C14.7723 6.59265 15.0302 6.69812 15.2411 6.90906C15.4755 7.14343 15.5927 7.41296 15.5927 7.71765C15.5927 8.02234 15.4755 8.28015 15.2411 8.49109C15.0302 8.72546 14.7723 8.84265 14.4677 8.84265L10.3544 8.84265L6.59265 14.8544L5.11609 14.8544Z" fill="#5CDF81"/>
                    </svg>
                </span>
                    <span class="standard-text">{{cityF}}</span>
                </div>
            </div>
            <div class="flight_details_airlines" v-if="!isCrane">
                <div class="flight_details_travel_title">
                    <p class="bold-text">Наименование авиакомпании</p>
                </div>
                <div class="flight_details_travel_detail">
                <span class="standard-text">
                    {{(flightData2.flightplaces) ? flightData2.flightplaces.schedule[0].airline.short_aviacompany_name_ru : ""}}
                </span>
                </div>
            </div>
            <div class="flight_details_airlines">
                <div class="flight_details_travel_title">
                    <p class="bold-text">Дата отправления</p>
                </div>
                <div class="flight_details_travel_detail">
                    <span class="standard-text" v-if="!isCrane">
                        {{(flightData2.date_departure_at) ? flightData2.date_departure_at : ""}}
                    </span>
                    <span class="standard-text" v-if="isCrane">
                        {{(flightData2.arrivalDateTime) ? momentDateSearch(flightData2.arrivalDateTime.value) : ""}}
                    </span>
                </div>
            </div>
            <div class="flight_details_airlines">
                <div class="flight_details_travel_title">
                    <p class="bold-text">Время отправления</p>
                </div>
                <div class="flight_details_travel_detail">
                    <span class="standard-text" v-if="!isCrane">
                        {{(flightData2.flightplaces) ? flightData2.flightplaces.schedule[0].time_departure_at : ""}}
                    </span>
                    <span class="standard-text" v-if="isCrane">
                        {{(flightData2.departureDateTime) ? momentTime(new Date(flightData2.departureDateTime.value).getTime()) : ""}}
                    </span>
                </div>
            </div>
            <div class="flight_details_airlines">
                <div class="flight_details_travel_title">
                    <p class="bold-text">Время прибытия</p>
                </div>
                <div class="flight_details_travel_detail">
                    <span class="standard-text" v-if="!isCrane">
                        {{(flightData2.flightplaces) ? flightData2.flightplaces.schedule[0].time_arrival_at : ""}}
                    </span>
                    <span class="standard-text" v-if="isCrane">
                        {{(flightData2.arrivalDateTime) ? momentTime(new Date(flightData2.arrivalDateTime.value).getTime()) : ""}}
                    </span>
                </div>
            </div>
            <div class="flight_details_airlines">
                <div class="flight_details_travel_title">
                    <p class="bold-text">Время в пути</p>
                </div>
                <div class="flight_details_travel_detail">
                    <span class="standard-text">
                        {{(travelTime2) ? travelTime2 : '00:00'}}
                    </span>
                </div>
            </div>
            <div class="flight_details_airlines">
                <div class="flight_details_travel_title">
                    <p class="bold-text">Класс</p>
                </div>
                <div class="flight_details_travel_detail">
                <span class="standard-text">
                    {{(flightData2.flightplaces) ? flightData2.flightplaces.farefamily.name_ru : ""}}
                </span>
                </div>
            </div>
            <div class="flight_details_airlines" v-if="!isCrane">
                <div class="flight_details_travel_title">
                    <p class="bold-text">Багаж взрослого</p>
                </div>
                <div class="flight_details_travel_detail">
                <span class="standard-text">
                    {{(flightData2.flightplaces) ? flightData2.flightplaces.farefamily.luggage_adults : ""}}
                </span>
                </div>
            </div>
            <div class="flight_details_airlines" v-if="!isCrane">
                <div class="flight_details_travel_title">
                    <p class="bold-text">Багаж ребенка</p>
                </div>
                <div class="flight_details_travel_detail">
                <span class="standard-text">
                    {{(flightData2.flightplaces) ? flightData2.flightplaces.farefamily.luggage_children : ""}}
                </span>
                </div>
            </div>
            <div class="flight_details_airlines" v-if="!isCrane">
                <div class="flight_details_travel_title">
                    <p class="bold-text">Самолёт(модель)</p>
                </div>
                <div class="flight_details_travel_detail">
                <span class="standard-text">
                    {{(airNumber) ? airNumber.name_ru : ""}}
                </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import moment from 'moment'
    export default {
        name: "flightDetails",
        props: {
            isCrane: {
                type: Boolean,
                default: false
            },
            fData: {
                type: Object,
            },
            fData2: {
                type: Object,
                default: null
            },
            cityF: {
                type: String
            },
            cityT: {
                type: String
            },
            airNumber: {
                type: Object
            },
            travelTime: {
                type: String,
                default: ''
            },
            travelTime2: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                flightData: this.fData,
                flightData2: this.fData2
            }
        },
        methods: {
            momentTime: function (date) {
                return moment(date).format('HH:mm');
            },
            momentDateSearch: function (date) {
                return moment(date).locale('ru').format('DD MMMM , dddd');
            },
            departureCity(id) {
                let city = '';
                this.cities[0].filter((value) => {
                    if (value.id == id) {
                        city = value.name_ru;
                    }
                });
                return city;
            },
        },
        watch: {
            fData(val) {
                this.flightData = val;
            },
            fData2(val) {
                this.flightData2 = val;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .flight_details {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        p {
            margin: 0;
        }
        .flight_details_airlines, .flight_details_travel {
            margin-top: 25px;
        }
        .flight_details_travel_title {
            font-size: 13px;
            color: #b1b1b1;
            margin-bottom: 4px;
        }
        .flight_details_travel_detail {
            font-size: 15px;
            font-weight: 500;
            color: #000000;
            span {
                margin-right:10px;
            }
        }
    }

    .dashed-line{
        width: 96%;
        height: 4px;
        background-image: linear-gradient(to right, rgba(31, 32, 65, 0.25) 60%, rgba(255,255,255,0) 40%);
        background-position: bottom;
        background-size: 10px 2px;
        background-repeat: repeat-x;
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