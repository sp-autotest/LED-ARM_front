<template>
    <div class="search-content">
        <div class="search-services">
            <div class="headline">
                <h3 class="headline-style">ПОИСК УСЛУГ</h3>
            </div>
            <div class="services-settings">
                <v-radio-group
                        v-model="service_search.settingsSelected.radio"
                        @change="changeWay()"
                        :mandatory="false">
                    <v-radio
                            label="В одну сторону"
                            color="#5CDF81"
                            :value=1
                    ></v-radio>
                    <v-radio
                            label="Туда-обратно"
                            color="#5CDF81"
                            :value=2
                    ></v-radio>
                    <v-radio
                            label="Многосегментный"
                            color="#5CDF81"
                            :value=3
                    ></v-radio>
                </v-radio-group>
                <cSelect inputLabel="Только прямые" v-model="service_search.settingsSelected.select"></cSelect>
            </div>
        </div>
        <div
                class="sigment-wrap"
                v-for="(val, index) in $v.service_search.sigment.$each.$iter"
                :key="index"
        >
            <div class="country-settings">
                <div class="from-wrap">
                    <h3 class="headline-style">Откуда</h3>
                    <cSelectInput
                            :class="{ 'select--error': val.from_id.$error }"
                            v-model.trim="val.from_id.$model"
                            :itemText="'name_ru'"
                            :itemValue="'id'"
                            :selectItems="fromCities[index]"
                            @input="selectFromCity(val.from_id.$model, index)"
                            selectPlaceholder="Пункт отправления"
                    >
                        <svg slot="icon" width="22" height="18" viewBox="0 0 22 18" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.375 5.71875C20.75 5.9375 20.9844 6.25 21.0781 6.65625C21.1719 7.0625 21.1094 7.4375 20.8906 7.78125C20.7031 8.125 20.4062 8.35938 20 8.48438C16.125 9.51562 12.9062 10.375 10.3438 11.0625L5.04688 12.4688L3.45312 12.9375C3.23438 12.5625 2.35938 11.0625 0.828125 8.4375L2.28125 8.0625L4.25 9.5625L9.21875 8.25L5.09375 1.07812L7.01562 0.5625L13.9062 6.98438L19.25 5.57812C19.6562 5.45312 20.0312 5.5 20.375 5.71875ZM1.48438 15.9844H20.5156V18H1.48438V15.9844Z"
                                  fill="#1F2041" fill-opacity="0.5"/>
                        </svg>
                    </cSelectInput>
                    <div class="select-error-text" v-if="val.from_id.$error">Заполните поле</div>
                </div>
                <div class="country-icon" @click="reverseCities(index)">
                    <svg :class="[rotateIcon[index] ? 'rotate-icon' : 'rotate-icon-none']" width="20" height="16"
                         viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 0.984375L19.9844 5.01562H16.9844V12C16.9844 13.0938 16.5938 14.0312 15.8125 14.8125C15.0312 15.5938 14.0938 15.9844 13 15.9844C11.9062 15.9844 10.9688 15.5938 10.1875 14.8125C9.40625 14.0312 9.01562 13.0938 9.01562 12V5.01562C9.01562 4.48438 8.8125 4.01563 8.40625 3.60938C8 3.20312 7.53125 3 7 3C6.46875 3 6 3.20312 5.59375 3.60938C5.1875 4.01563 4.98438 4.48438 4.98438 5.01562V12H7.98438L4 15.9844L0.015625 12H3.01562V5.01562C3.01562 3.92188 3.40625 2.98438 4.1875 2.20312C4.96875 1.39063 5.90625 0.984375 7 0.984375C8.09375 0.984375 9.03125 1.39063 9.8125 2.20312C10.5938 2.98438 10.9844 3.92188 10.9844 5.01562V12C10.9844 12.5312 11.1875 13 11.5938 13.4062C12 13.8125 12.4688 14.0156 13 14.0156C13.5312 14.0156 14 13.8125 14.4062 13.4062C14.8125 13 15.0156 12.5312 15.0156 12V5.01562H12.0156L16 0.984375Z"
                              fill="#1F2041" fill-opacity="0.5"/>
                    </svg>
                </div>
                <div class="to-wrap">
                    <h3 class="headline-style">куда</h3>
                    <cSelectInput
                            :class="{ 'select--error': val.to_id.$error }"
                            v-model.trim="val.to_id.$model"
                            :itemText="'name_ru'"
                            :itemValue="'id'"
                            :selectItems="toCities[index]"
                            @input="selectToCity(val.to_id.$model, index)"
                            selectPlaceholder="Пункт прибытия"
                    >
                        <svg slot="icon" width="20" height="19" viewBox="0 0 20 19" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.0156 12.4375C9.45312 11.7188 6.23438 10.8594 2.35938 9.85938L0.765625 9.39062V4.23438L2.21875 4.60938L3.15625 6.95312L8.125 8.26562V0.015625L10.0469 0.53125L12.8125 9.53125L18.1094 10.9375C18.5156 11.0625 18.8125 11.3125 19 11.6875C19.2188 12.0312 19.2812 12.4062 19.1875 12.8125C19.0625 13.2188 18.8281 13.5156 18.4844 13.7031C18.1406 13.8906 17.7656 13.9375 17.3594 13.8438L12.0156 12.4375ZM0.484375 16.9844H19.5156V19H0.484375V16.9844Z"
                                  fill="#1F2041" fill-opacity="0.5"/>
                        </svg>
                    </cSelectInput>
                    <div class="select-error-text" v-if="val.to_id.$error">Заполните поле</div>
                </div>
            </div>
            <div class="date-settings">
                <div class="date">
                    <h3 class="headline-style">Дата вылета</h3>
                    <cDate
                            :class="{ 'date--error': val.date.$error }"
                            :minDate="currentDate"
                            v-model="val.date.$model"
                            @blur="val.date.$touch()"
                            @dateChangeTwo="val.date.$model = $event"
                    ></cDate>
                    <div class="error-text" v-if="val.date.$error">Не правильная дата</div>
                    <cSlider class="custom-slider"
                             @sliderChange="service_search.sigment[index].dateTime = $event"></cSlider>
                </div>
                <div v-show="service_search.settingsSelected.radio == 2" class="date">
                    <h3 class="headline-style">Дата обратного вылета</h3>
                    <cDate
                            :class="{ 'date--error': $v.service_search.date_departure.$error }"
                            v-model="$v.service_search.date_departure.$model"
                            @blur="$v.service_search.date_departure.$touch()"
                            :minDate="currentDate"
                            @dateChangeTwo="service_search.date_departure = $event"
                    ></cDate>
                    <div class="error-text" v-if="$v.service_search.date_departure.$error">Не правильная дата</div>
                    <cSlider class="custom-slider" @sliderChange="service_search.dateTimeDeparture = $event"></cSlider>
                </div>
                <template v-if="service_search.settingsSelected.radio != 3">
                    <div class="older">
                        <h3 class="headline-style">Взрослые</h3>
                        <cCount
                                v-model="service_search.passangers_count"
                                :countValue="1"
                                :minValue="1"
                                :maxValue="countMaxValue('older')"
                        ></cCount>
                    </div>
                    <div class="children">
                        <h3 class="headline-style">Дети</h3>
                        <cCount
                                v-model="service_search.childrenCount"
                                :maxValue="countMaxValue('children')"
                        ></cCount>
                    </div>
                    <div class="babies">
                        <h3 class="headline-style">Младенцы</h3>
                        <cCount
                                v-model="service_search.babiesCount"
                                :maxValue="countMaxValue('baby')"
                        ></cCount>
                    </div>
                </template>
            </div>
        </div>
        <div class="add-remove-sigment" v-if="service_search.settingsSelected.radio == 3">
            <div class="add-sigment" @click="addSigment()">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                    <path style="line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000;text-transform:none;block-progression:tb;isolation:auto;mix-blend-mode:normal"
                          d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 7 L 11 11 L 7 11 L 7 13 L 11 13 L 11 17 L 13 17 L 13 13 L 17 13 L 17 11 L 13 11 L 13 7 L 11 7 z"
                          font-weight="400" font-family="sans-serif" white-space="normal" overflow="visible"/>
                </svg>
                <span>Добавить сeгмент</span>
            </div>
            <div class="remove-sigment" @click="removeSigment()">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.74609 12.2539C4.94141 13.4258 6.35938 14.0117 8 14.0117C9.64062 14.0117 11.0469 13.4258 12.2188 12.2539C13.4141 11.0586 14.0117 9.64062 14.0117 8C14.0117 6.35937 13.4141 4.95312 12.2188 3.78125C11.0469 2.58594 9.64062 1.98828 8 1.98828C6.35938 1.98828 4.94141 2.58594 3.74609 3.78125C2.57422 4.95312 1.98828 6.35937 1.98828 8C1.98828 9.64062 2.57422 11.0586 3.74609 12.2539ZM2.69141 2.72656C4.16797 1.25 5.9375 0.511719 8 0.511719C10.0625 0.511719 11.8203 1.25 13.2734 2.72656C14.75 4.17969 15.4883 5.9375 15.4883 8C15.4883 10.0625 14.75 11.832 13.2734 13.3086C11.8203 14.7617 10.0625 15.4883 8 15.4883C5.9375 15.4883 4.16797 14.7617 2.69141 13.3086C1.23828 11.832 0.511719 10.0625 0.511719 8C0.511719 5.9375 1.23828 4.17969 2.69141 2.72656ZM4.23828 7.26172H11.7617V8.73828H4.23828V7.26172Z"
                          fill="#FF5B27"/>
                </svg>
                <span>Удалить сeгмент</span>
            </div>
        </div>
        <div class="services-class">
            <h3 class="headline-style">Класс обслуживания</h3>
            <div class="services-settings">
                <v-radio-group v-model="service_search.fare_id" :mandatory="false">
                    <v-radio
                            label="Эконом"
                            color="#5CDF81"
                            :value=2
                    ></v-radio>
                    <v-radio
                            label="Бизнес"
                            color="#5CDF81"
                            :value=1
                    ></v-radio>
                </v-radio-group>
                <div class="passenger-count-wrap" v-if="service_search.settingsSelected.radio == 3">
                    <div class="older">
                        <h3 class="headline-style">Взрослые</h3>
                        <cCount
                                v-model="service_search.passangers_count"
                                :countValue="1"
                                :minValue="1"
                                :maxValue="countMaxValue('older')"
                        ></cCount>
                    </div>
                    <div class="children">
                        <h3 class="headline-style">Дети</h3>
                        <cCount
                                v-model="service_search.childrenCount"
                                :maxValue="countMaxValue('children')"
                        ></cCount>
                    </div>
                    <div class="babies">
                        <h3 class="headline-style">Младенцы</h3>
                        <cCount
                                v-model="service_search.babiesCount"
                                :maxValue="countMaxValue('baby')"
                        ></cCount>
                    </div>
                </div>
            </div>
        </div>
        <div class="search-btn">
            <div class="btn-size" @click="search()">
                <cButton buttonValue="Поиск"></cButton>
            </div>
        </div>
        <div class="result-content-wrap" v-if="showResult">
            <div class="headline">
                <h3 class="headline-style">Результаты поиска</h3>
                <span class="result-count">{{"Найдено вариантов: "}}{{(service_search.settingsSelected.radio == 1) ? getSearchResultOneWay.length : searchPaginData.length}}</span>
            </div>
            <div v-if="showLoader" class="loader">
                <cLoader></cLoader>
            </div>
            <div v-if="service_search.settingsSelected.radio == 1">
                <div
                        class="result-content"
                        v-for="(item, key) of getSearchResultOneWay"
                        :key="key"
                >

                    <div class="result-wrap" @click="getShowMoreMet(key)" v-bind="(test) ? test[key]: false">
                        <div class="map-info">
                            <span class="map-from bold-text">{{departureCity(item.tuda.flightplaces.schedule[0].departure_at)}}</span>
                            <svg width="16" height="15" viewBox="0 0 16 15" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.11609 14.8544L6.97937 8.84265L2.86609 8.84265L1.74109 10.3544L0.616088 10.3544L1.35437 7.71765L0.616088 5.11609L1.74109 5.11609L2.86609 6.59265L6.97937 6.59265L5.11609 0.616088L6.59265 0.616088L10.3544 6.59265L14.4677 6.59265C14.7723 6.59265 15.0302 6.69812 15.2411 6.90906C15.4755 7.14343 15.5927 7.41296 15.5927 7.71765C15.5927 8.02234 15.4755 8.28015 15.2411 8.49109C15.0302 8.72546 14.7723 8.84265 14.4677 8.84265L10.3544 8.84265L6.59265 14.8544L5.11609 14.8544Z"
                                      fill="#5CDF81"/>
                            </svg>
                            <span class="map-to bold-text">{{arrivalCity(item.tuda.flightplaces.schedule[0].arrival_at)}}</span>
                            <span class="start-date">{{"вылет "}}{{momentDateSearch(item.tuda.date_departure_at)}}</span>

                            <div class="company-logo">
                                <img src="../../assets/images/imageAPI.png" alt="">
                            </div>
                        </div>
                        <div v-if="getShowMore[key]" class="time-info">
                            <div class="departure">
                                <h5 class="normal-text">Вылет</h5>
                                <span class="bold-text">{{item.tuda.flightplaces.schedule[0].time_departure_at|substr5}}</span>
                            </div>
                            <div class="arrival">
                                <h5 class="normal-text">Прилет</h5>
                                <span class="bold-text">{{item.tuda.flightplaces.schedule[0].time_arrival_at|substr5}}</span>
                            </div>
                            <div class="transplants">
                                <h5 class="normal-text">Пересадки</h5>
                                <span class="bold-text">{{(item.tuda.flightplaces.schedule.is_transplantation) ? 'С пересадками' : 'нет'}}</span>
                            </div>
                            <div class="on-way">
                                <h5 class="normal-text">В пути</h5>
                                <span class="bold-text">{{getTravelTime(item.tuda.flightplaces.schedule[0].time_departure_at, item.tuda.flightplaces.schedule[0].time_arrival_at)}}</span>
                            </div>
                            <div class="flight">
                                <h5 class="normal-text">Рейс</h5>
                                <span class="bold-text">{{item.tuda.flightplaces.schedule[0].flights}}</span>
                            </div>
                        </div>
                    </div>
                    <div v-if="getShowMore[key]" class="dashed-border"></div>
                    <div v-if="getShowMore[key]" class="result-buy grid-column-3">
                        <div class="result-info">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.57422 4.25V3.07422H5.42578V4.25H6.57422ZM6.57422 8.92578V5.42578H5.42578V8.92578H6.57422ZM1.87109 1.89844C3.01953 0.75 4.39583 0.175781 6 0.175781C7.60417 0.175781 8.97135 0.75 10.1016 1.89844C11.25 3.02865 11.8242 4.39583 11.8242 6C11.8242 7.60417 11.25 8.98047 10.1016 10.1289C8.97135 11.2591 7.60417 11.8242 6 11.8242C4.39583 11.8242 3.01953 11.2591 1.87109 10.1289C0.740885 8.98047 0.175781 7.60417 0.175781 6C0.175781 4.39583 0.740885 3.02865 1.87109 1.89844Z"
                                      fill="#0094FF"/>
                            </svg>
                            <a
                                    @click="showPopup(item.tuda, departureCity(item.tuda.flightplaces.schedule[0].departure_at), arrivalCity(item.tuda.flightplaces.schedule[0].arrival_at), getTravelTime(item.tuda.flightplaces.schedule[0].time_departure_at, item.tuda.flightplaces.schedule[0].time_arrival_at))"
                            >Подробнее</a>
                        </div>
                        <div class="announcement">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.57422 7.75V6.57422H5.42578V7.75H6.57422ZM6.57422 5.42578V1.92578H5.42578V5.42578H6.57422ZM10.6758 0.175781C10.9857 0.175781 11.25 0.294271 11.4688 0.53125C11.7057 0.75 11.8242 1.01432 11.8242 1.32422V8.32422C11.8242 8.63411 11.7057 8.90755 11.4688 9.14453C11.25 9.38151 10.9857 9.5 10.6758 9.5H2.5L0.175781 11.8242V1.32422C0.175781 1.01432 0.285156 0.75 0.503906 0.53125C0.740885 0.294271 1.01432 0.175781 1.32422 0.175781H10.6758Z"
                                      fill="#575870"/>
                            </svg>
                            <span @click="showPopupInfo(item.tuda.flightplaces.farefamily.note_fare)">Правила тарифов</span>
                        </div>
                        <div class="ticker-price"
                             @click="openModal(getSum(item.tuda.size_fees_inscribed, item.tuda.ow, item.tuda.infant_ow), item.tuda, departureCity(item.tuda.flightplaces.schedule[0].departure_at), arrivalCity(item.tuda.flightplaces.schedule[0].arrival_at), getTravelTime(item.tuda.flightplaces.schedule[0].time_departure_at, item.tuda.flightplaces.schedule[0].time_arrival_at))">
                            <span class="price">{{getSum(item.tuda.ow, item.tuda.infant_ow)}} {{getCurrenciValue(item.tuda, "block")}}</span>
                            <cButton buttonValue="Забронировать"></cButton>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="service_search.settingsSelected.radio == 2">
                <div
                        class="result-content"
                        v-for="(item) of searchPaginData"
                        :key="item.id"
                >
                    <div class="result-wrap">
                        <div class="map-info">
                            <span class="map-from bold-text">{{departureCity(item.tuda.flightplaces.schedule[0].departure_at)}}</span>
                            <svg width="16" height="15" viewBox="0 0 16 15" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.11609 14.8544L6.97937 8.84265L2.86609 8.84265L1.74109 10.3544L0.616088 10.3544L1.35437 7.71765L0.616088 5.11609L1.74109 5.11609L2.86609 6.59265L6.97937 6.59265L5.11609 0.616088L6.59265 0.616088L10.3544 6.59265L14.4677 6.59265C14.7723 6.59265 15.0302 6.69812 15.2411 6.90906C15.4755 7.14343 15.5927 7.41296 15.5927 7.71765C15.5927 8.02234 15.4755 8.28015 15.2411 8.49109C15.0302 8.72546 14.7723 8.84265 14.4677 8.84265L10.3544 8.84265L6.59265 14.8544L5.11609 14.8544Z"
                                      fill="#5CDF81"/>
                            </svg>
                            <span class="map-to bold-text">{{arrivalCity(item.tuda.flightplaces.schedule[0].arrival_at)}}</span>
                            <span class="start-date">{{"вылет "}}{{momentDateSearch(item.tuda.date_departure_at)}}</span>

                            <div class="company-logo">
                                <img src="../../assets/images/imageAPI.png" alt="">
                            </div>
                        </div>
                        <div class="result-row">
                            <div class="time-info">
                                <div class="departure">
                                    <h5 class="normal-text">Вылет</h5>
                                    <span class="bold-text">{{item.tuda.flightplaces.schedule[0].time_departure_at|substr5}}</span>
                                </div>
                                <div class="arrival">
                                    <h5 class="normal-text">Прилет</h5>
                                    <span class="bold-text">{{item.tuda.flightplaces.schedule[0].time_arrival_at|substr5}}</span>
                                </div>
                                <div class="transplants">
                                    <h5 class="normal-text">Пересадки</h5>
                                    <span class="bold-text">{{(item.tuda.flightplaces.schedule.is_transplantation) ? 'С пересадками' : 'нет'}}</span>
                                </div>
                                <div class="on-way">
                                    <h5 class="normal-text">В пути</h5>
                                    <span class="bold-text">{{getTravelTime(item.tuda.flightplaces.schedule[0].time_departure_at, item.tuda.flightplaces.schedule[0].time_arrival_at)}}</span>
                                </div>
                                <div class="flight">
                                    <h5 class="normal-text">Рейс</h5>
                                    <span class="bold-text">{{item.tuda.flightplaces.schedule[0].flights}}</span>
                                </div>
                            </div>
                            <div class="result-info">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.57422 4.25V3.07422H5.42578V4.25H6.57422ZM6.57422 8.92578V5.42578H5.42578V8.92578H6.57422ZM1.87109 1.89844C3.01953 0.75 4.39583 0.175781 6 0.175781C7.60417 0.175781 8.97135 0.75 10.1016 1.89844C11.25 3.02865 11.8242 4.39583 11.8242 6C11.8242 7.60417 11.25 8.98047 10.1016 10.1289C8.97135 11.2591 7.60417 11.8242 6 11.8242C4.39583 11.8242 3.01953 11.2591 1.87109 10.1289C0.740885 8.98047 0.175781 7.60417 0.175781 6C0.175781 4.39583 0.740885 3.02865 1.87109 1.89844Z"
                                          fill="#0094FF"/>
                                </svg>
                                <a
                                        @click="showPopup(item.tuda, departureCity(item.tuda.flightplaces.schedule[0].departure_at), arrivalCity(item.tuda.flightplaces.schedule[0].arrival_at), getTravelTime(item.tuda.flightplaces.schedule[0].time_departure_at, item.tuda.flightplaces.schedule[0].time_arrival_at), false)"
                                >Подробнее</a>
                            </div>
                        </div>
                        <div class="border-dashed-2" v-if="item.obratno"></div>
                        <div class="result-row" v-if="item.obratno">
                            <div class="time-info">
                                <div class="departure">
                                    <h5 class="normal-text">Вылет</h5>
                                    <span class="bold-text">{{item.obratno.flightplaces.schedule[0].time_departure_at|substr5}}</span>
                                </div>
                                <div class="arrival">
                                    <h5 class="normal-text">Прилет</h5>
                                    <span class="bold-text">{{item.obratno.flightplaces.schedule[0].time_arrival_at|substr5}}</span>
                                </div>
                                <div class="transplants">
                                    <h5 class="normal-text">Пересадки</h5>
                                    <span class="bold-text">{{(item.obratno.flightplaces.schedule.is_transplantation) ? 'С пересадками' : 'нет'}}</span>
                                </div>
                                <div class="on-way">
                                    <h5 class="normal-text">В пути</h5>
                                    <span class="bold-text">{{getTravelTime(item.obratno.flightplaces.schedule[0].time_departure_at, item.obratno.flightplaces.schedule[0].time_arrival_at)}}</span>
                                </div>
                                <div class="flight">
                                    <h5 class="normal-text">Рейс</h5>
                                    <span class="bold-text">{{item.obratno.flightplaces.schedule[0].flights}}</span>
                                </div>
                            </div>
                            <div class="result-info">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.57422 4.25V3.07422H5.42578V4.25H6.57422ZM6.57422 8.92578V5.42578H5.42578V8.92578H6.57422ZM1.87109 1.89844C3.01953 0.75 4.39583 0.175781 6 0.175781C7.60417 0.175781 8.97135 0.75 10.1016 1.89844C11.25 3.02865 11.8242 4.39583 11.8242 6C11.8242 7.60417 11.25 8.98047 10.1016 10.1289C8.97135 11.2591 7.60417 11.8242 6 11.8242C4.39583 11.8242 3.01953 11.2591 1.87109 10.1289C0.740885 8.98047 0.175781 7.60417 0.175781 6C0.175781 4.39583 0.740885 3.02865 1.87109 1.89844Z"
                                          fill="#0094FF"/>
                                </svg>
                                <a
                                        @click="showPopup(item.obratno, departureCity(item.obratno.flightplaces.schedule[0].departure_at), arrivalCity(item.obratno.flightplaces.schedule[0].arrival_at), getTravelTime(item.obratno.flightplaces.schedule[0].time_departure_at, item.obratno.flightplaces.schedule[0].time_arrival_at), false)"
                                >Подробнее</a>
                            </div>
                        </div>
                    </div>
                    <div class="dashed-border"></div>
                    <div class="result-buy">
                        <div class="announcement">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.57422 7.75V6.57422H5.42578V7.75H6.57422ZM6.57422 5.42578V1.92578H5.42578V5.42578H6.57422ZM10.6758 0.175781C10.9857 0.175781 11.25 0.294271 11.4688 0.53125C11.7057 0.75 11.8242 1.01432 11.8242 1.32422V8.32422C11.8242 8.63411 11.7057 8.90755 11.4688 9.14453C11.25 9.38151 10.9857 9.5 10.6758 9.5H2.5L0.175781 11.8242V1.32422C0.175781 1.01432 0.285156 0.75 0.503906 0.53125C0.740885 0.294271 1.01432 0.175781 1.32422 0.175781H10.6758Z"
                                      fill="#575870"/>
                            </svg>
                            <span @click="showPopupInfo(item.tuda.flightplaces.farefamily.note_fare)">Правила тарифов</span>
                        </div>
                        <div class="ticker-price"
                             @click="openModal(getSum(item.tuda.size_fees_inscribed, item.tuda.rt, item.obratno.rt, item.tuda.infant_rt, item.obratno.infant_rt),item.tuda, departureCity(item.tuda.flightplaces.schedule[0].departure_at), arrivalCity(item.tuda.flightplaces.schedule[0].arrival_at),getTravelTime(item.tuda.flightplaces.schedule[0].time_departure_at, item.tuda.flightplaces.schedule[0].time_arrival_at), item.obratno, getTravelTime(item.obratno.flightplaces.schedule[0].time_departure_at, item.obratno.flightplaces.schedule[0].time_arrival_at))">
                            <span class="price">{{getSum(item.tuda.rt, item.obratno.rt, item.tuda.infant_rt, item.obratno.infant_rt)}} {{getCurrenciValue(item)}}</span>
                            <cButton buttonValue="Забронировать"></cButton>
                        </div>
                    </div>
                </div>
            </div>
            <v-pagination
                    v-if="searchPaginData.length > 0 || getSearchResultOneWay.length > 0"
                    v-model="page"
                    :length="pagLength"
                    :total-visible="7"
                    @input="pageChange(page)"
            ></v-pagination>
        </div>

        <!--        CRANE         -->


<!--        <div class="result-content-wrap" v-if="showResult">-->
<!--            <div class="headline">-->
<!--                <h3 class="headline-style">Результаты поиска Crane</h3>-->
<!--                <span class="result-count">{{"Найдено вариантов: "}}{{craneResult.length}}</span>-->
<!--            </div>-->
<!--            <div v-if="showLoaderCrane" class="loader">-->
<!--                <cLoader></cLoader>-->
<!--            </div>-->
<!--            <div v-if="service_search.settingsSelected.radio == 1">-->
<!--                <div-->
<!--                        class="result-content"-->
<!--                        v-for="(item, key) of craneResult"-->
<!--                        :key="key"-->
<!--                >-->
<!--                    <div class="result-wrap" @click="getShowMoreMetCrane(key)"-->
<!--                         v-bind="(testCrane) ? testCrane[key]: false">-->
<!--                        <div class="map-info">-->
<!--                            <span class="map-from bold-text">{{item.tuda.departureAirport.name_ru}}</span>-->
<!--                            <svg width="16" height="15" viewBox="0 0 16 15" fill="none"-->
<!--                                 xmlns="http://www.w3.org/2000/svg">-->
<!--                                <path d="M5.11609 14.8544L6.97937 8.84265L2.86609 8.84265L1.74109 10.3544L0.616088 10.3544L1.35437 7.71765L0.616088 5.11609L1.74109 5.11609L2.86609 6.59265L6.97937 6.59265L5.11609 0.616088L6.59265 0.616088L10.3544 6.59265L14.4677 6.59265C14.7723 6.59265 15.0302 6.69812 15.2411 6.90906C15.4755 7.14343 15.5927 7.41296 15.5927 7.71765C15.5927 8.02234 15.4755 8.28015 15.2411 8.49109C15.0302 8.72546 14.7723 8.84265 14.4677 8.84265L10.3544 8.84265L6.59265 14.8544L5.11609 14.8544Z"-->
<!--                                      fill="#5CDF81"/>-->
<!--                            </svg>-->
<!--                            <span class="map-to bold-text">{{item.tuda.arrivalAirport.name_ru}}</span>-->
<!--                            <span class="start-date">{{"вылет "}}{{momentDateSearch(item.tuda.departureDateTime.value)}}</span>-->

<!--                            <div class="company-logo">-->
<!--                                <img src="../../assets/images/imageAPI.png" alt="">-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        <div v-if="getShowMoreCrane[key]" class="time-info">-->
<!--                            <div class="departure">-->
<!--                                <h5 class="normal-text">Вылет</h5>-->
<!--                                <span class="bold-text">{{momentTime(new Date(item.tuda.departureDateTime.value).getTime())}}</span>-->
<!--                            </div>-->
<!--                            <div class="arrival">-->
<!--                                <h5 class="normal-text">Прилет</h5>-->
<!--                                <span class="bold-text">{{momentTime(new Date(item.tuda.arrivalDateTime.value).getTime())}}</span>-->
<!--                            </div>-->
<!--                            <div class="transplants">-->
<!--                                <h5 class="normal-text">Пересадки</h5>-->
<!--                                &lt;!&ndash;                            <span class="bold-text">{{(item.flightplaces.schedule.length == 1) ? timeInfo.transplants : 'С пересадками'}}</span>&ndash;&gt;-->
<!--                            </div>-->
<!--                            <div class="on-way">-->
<!--                                <h5 class="normal-text">В пути</h5>-->
<!--                                <span class="bold-text">{{getTravelTime(momentTime(new Date(item.tuda.departureDateTime.value).getTime()), momentTime(new Date(item.tuda.arrivalDateTime.value).getTime()))}}</span>-->
<!--                            </div>-->
<!--                            <div class="flight">-->
<!--                                <h5 class="normal-text">Рейс</h5>-->
<!--                                <span class="bold-text">{{item.tuda.flightNumber}}</span>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div v-if="getShowMoreCrane[key]" class="dashed-border"></div>-->
<!--                    <div v-if="getShowMoreCrane[key]" class="selected-class">-->
<!--                        <div-->
<!--                                v-for="(val, index) in item.tuda.bookingClasses"-->
<!--                                :key="index"-->
<!--                                class="ticket-class"-->
<!--                        >-->
<!--                            <input-->
<!--                                    type="radio"-->
<!--                                    :id="`ticket-${index}-${key}`"-->
<!--                                    :value="-->
<!--                                [-->
<!--                                    val.fareDisplayInfos.fareDisplayInfoList.pricingInfoList.totalFare.amount.value.value + ' ' +-->
<!--                                    val.fareDisplayInfos.fareDisplayInfoList.pricingInfoList.totalFare.amount.currency.code.value,-->
<!--                                    val.bookingClass.resBookDesigCode.value-->
<!--                                ]"-->
<!--                                    v-model="ticket[key]"-->
<!--                            >-->
<!--                            <label :for="`ticket-${index}-${key}`">-->
<!--                                <span>{{val.bookingClass.resBookDesigCode.value}} {{val.bookingClass.cabin.value}}</span>-->
<!--                                <span>-->
<!--                                {{val.fareDisplayInfos.fareDisplayInfoList.pricingInfoList.totalFare.amount.value.value}}-->
<!--                                {{val.fareDisplayInfos.fareDisplayInfoList.pricingInfoList.totalFare.amount.currency.code.value}}-->
<!--                            </span>-->
<!--                            </label>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div v-if="getShowMoreCrane[key]" class="dashed-border"></div>-->
<!--                    <div v-if="getShowMoreCrane[key]" class="result-buy grid-column-3">-->
<!--                        <div class="result-info">-->
<!--                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"-->
<!--                                 xmlns="http://www.w3.org/2000/svg">-->
<!--                                <path d="M6.57422 4.25V3.07422H5.42578V4.25H6.57422ZM6.57422 8.92578V5.42578H5.42578V8.92578H6.57422ZM1.87109 1.89844C3.01953 0.75 4.39583 0.175781 6 0.175781C7.60417 0.175781 8.97135 0.75 10.1016 1.89844C11.25 3.02865 11.8242 4.39583 11.8242 6C11.8242 7.60417 11.25 8.98047 10.1016 10.1289C8.97135 11.2591 7.60417 11.8242 6 11.8242C4.39583 11.8242 3.01953 11.2591 1.87109 10.1289C0.740885 8.98047 0.175781 7.60417 0.175781 6C0.175781 4.39583 0.740885 3.02865 1.87109 1.89844Z"-->
<!--                                      fill="#0094FF"/>-->
<!--                            </svg>-->
<!--                            <a-->
<!--                                    @click="showPopup(item.tuda, item.tuda.departureAirport.name_ru, item.tuda.arrivalAirport.name_ru, getTravelTime(momentTime(new Date(item.tuda.departureDateTime.value).getTime()), momentTime(new Date(item.tuda.arrivalDateTime.value).getTime())), true)"-->
<!--                            >Подробнее</a>-->
<!--                        </div>-->
<!--                        <div class="announcement">-->
<!--                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"-->
<!--                                 xmlns="http://www.w3.org/2000/svg">-->
<!--                                <path d="M6.57422 7.75V6.57422H5.42578V7.75H6.57422ZM6.57422 5.42578V1.92578H5.42578V5.42578H6.57422ZM10.6758 0.175781C10.9857 0.175781 11.25 0.294271 11.4688 0.53125C11.7057 0.75 11.8242 1.01432 11.8242 1.32422V8.32422C11.8242 8.63411 11.7057 8.90755 11.4688 9.14453C11.25 9.38151 10.9857 9.5 10.6758 9.5H2.5L0.175781 11.8242V1.32422C0.175781 1.01432 0.285156 0.75 0.503906 0.53125C0.740885 0.294271 1.01432 0.175781 1.32422 0.175781H10.6758Z"-->
<!--                                      fill="#575870"/>-->
<!--                            </svg>-->
<!--                            <span @click="showPopupCraneInfo()">Правила тарифов</span>-->
<!--                        </div>-->
<!--                        <div class="ticker-price"-->
<!--                             @click="openModal(ticket[key][0], item.tuda, item.tuda.departureAirport.name_ru, item.tuda.arrivalAirport.name_ru, getTravelTime(momentTime(new Date(item.tuda.departureDateTime.value).getTime()), momentTime(new Date(item.tuda.arrivalDateTime.value).getTime())),null, '', true)">-->
<!--                            <span class="price">{{ticket[key][0]}}</span>-->
<!--                            <cButton buttonValue="Забронировать"></cButton>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->

<!--            &lt;!&ndash;     Kran tuda obratno       &ndash;&gt;-->

<!--            <div v-if="service_search.settingsSelected.radio == 2">-->
<!--                <div-->
<!--                        class="result-content"-->
<!--                        v-for="(item, key) of craneResult"-->
<!--                        :key="key"-->
<!--                >-->

<!--                    <div class="result-wrap" @click="getShowMoreMetCrane(key)"-->
<!--                         v-bind="(testCrane) ? testCrane[key]: false">-->
<!--                        <div style="padding-bottom: 15px">-->
<!--                            <div class="map-info">-->
<!--                                <span class="map-from bold-text">{{item.tuda.departureAirport.locationName.value}}</span>-->
<!--                                <svg width="16" height="15" viewBox="0 0 16 15" fill="none"-->
<!--                                     xmlns="http://www.w3.org/2000/svg">-->
<!--                                    <path d="M5.11609 14.8544L6.97937 8.84265L2.86609 8.84265L1.74109 10.3544L0.616088 10.3544L1.35437 7.71765L0.616088 5.11609L1.74109 5.11609L2.86609 6.59265L6.97937 6.59265L5.11609 0.616088L6.59265 0.616088L10.3544 6.59265L14.4677 6.59265C14.7723 6.59265 15.0302 6.69812 15.2411 6.90906C15.4755 7.14343 15.5927 7.41296 15.5927 7.71765C15.5927 8.02234 15.4755 8.28015 15.2411 8.49109C15.0302 8.72546 14.7723 8.84265 14.4677 8.84265L10.3544 8.84265L6.59265 14.8544L5.11609 14.8544Z"-->
<!--                                          fill="#5CDF81"/>-->
<!--                                </svg>-->
<!--                                <span class="map-to bold-text">{{item.tuda.arrivalAirport.locationName.value}}</span>-->
<!--                                <span class="start-date">{{"вылет "}}{{momentDateSearch(item.tuda.departureDateTime.value)}}</span>-->

<!--                                <div class="company-logo">-->
<!--                                    <img src="../../assets/images/imageAPI.png" alt="">-->
<!--                                </div>-->
<!--                            </div>-->
<!--                            <div class="result-row" v-if="getShowMoreCrane[key]">-->
<!--                                <div class="time-info">-->
<!--                                    <div class="departure">-->
<!--                                        <h5 class="normal-text">Вылет</h5>-->
<!--                                        <span class="bold-text">{{momentTime(new Date(item.tuda.departureDateTime.value).getTime())}}</span>-->
<!--                                    </div>-->
<!--                                    <div class="arrival">-->
<!--                                        <h5 class="normal-text">Прилет</h5>-->
<!--                                        <span class="bold-text">{{momentTime(new Date(item.tuda.arrivalDateTime.value).getTime())}}</span>-->
<!--                                    </div>-->
<!--                                    <div class="transplants">-->
<!--                                        <h5 class="normal-text">Пересадки</h5>-->
<!--                                        <span class="bold-text">Нет</span>-->
<!--                                        &lt;!&ndash;                            <span class="bold-text">{{(item.flightplaces.schedule.length == 1) ? timeInfo.transplants : 'С пересадками'}}</span>&ndash;&gt;-->
<!--                                    </div>-->
<!--                                    <div class="on-way">-->
<!--                                        <h5 class="normal-text">В пути</h5>-->
<!--                                        <span class="bold-text">{{getTravelTime(momentTime(new Date(item.tuda.departureDateTime.value).getTime()), momentTime(new Date(item.tuda.arrivalDateTime.value).getTime()))}}</span>-->
<!--                                    </div>-->
<!--                                    &lt;!&ndash;                <div class="flight">&ndash;&gt;-->
<!--                                    &lt;!&ndash;                  <h5 class="normal-text">Рейс</h5>&ndash;&gt;-->
<!--                                    &lt;!&ndash;                  <span class="bold-text">{{item[0].flightNumber}}</span>&ndash;&gt;-->
<!--                                    &lt;!&ndash;                </div>&ndash;&gt;-->
<!--                                </div>-->
<!--                                <div class="result-info">-->
<!--                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"-->
<!--                                         xmlns="http://www.w3.org/2000/svg">-->
<!--                                        <path d="M6.57422 4.25V3.07422H5.42578V4.25H6.57422ZM6.57422 8.92578V5.42578H5.42578V8.92578H6.57422ZM1.87109 1.89844C3.01953 0.75 4.39583 0.175781 6 0.175781C7.60417 0.175781 8.97135 0.75 10.1016 1.89844C11.25 3.02865 11.8242 4.39583 11.8242 6C11.8242 7.60417 11.25 8.98047 10.1016 10.1289C8.97135 11.2591 7.60417 11.8242 6 11.8242C4.39583 11.8242 3.01953 11.2591 1.87109 10.1289C0.740885 8.98047 0.175781 7.60417 0.175781 6C0.175781 4.39583 0.740885 3.02865 1.87109 1.89844Z"-->
<!--                                              fill="#0094FF"/>-->
<!--                                    </svg>-->
<!--                                    <a-->
<!--                                            @click="showPopup(item.tuda, item.tuda.departureAirport.locationName.value, item.tuda.arrivalAirport.locationName.value, getTravelTime(momentTime(new Date(item.tuda.departureDateTime.value).getTime()), momentTime(new Date(item.tuda.arrivalDateTime.value).getTime())), true)"-->
<!--                                    >Подробнее</a>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        <div class="dashed-border"></div>-->
<!--                        <div style="padding-top: 15px">-->
<!--                            <div class="map-info">-->
<!--                                <span class="map-from bold-text">{{item.obratno.departureAirport.locationName.value}}</span>-->
<!--                                <svg width="16" height="15" viewBox="0 0 16 15" fill="none"-->
<!--                                     xmlns="http://www.w3.org/2000/svg">-->
<!--                                    <path d="M5.11609 14.8544L6.97937 8.84265L2.86609 8.84265L1.74109 10.3544L0.616088 10.3544L1.35437 7.71765L0.616088 5.11609L1.74109 5.11609L2.86609 6.59265L6.97937 6.59265L5.11609 0.616088L6.59265 0.616088L10.3544 6.59265L14.4677 6.59265C14.7723 6.59265 15.0302 6.69812 15.2411 6.90906C15.4755 7.14343 15.5927 7.41296 15.5927 7.71765C15.5927 8.02234 15.4755 8.28015 15.2411 8.49109C15.0302 8.72546 14.7723 8.84265 14.4677 8.84265L10.3544 8.84265L6.59265 14.8544L5.11609 14.8544Z"-->
<!--                                          fill="#5CDF81"/>-->
<!--                                </svg>-->
<!--                                <span class="map-to bold-text">{{item.obratno.arrivalAirport.locationName.value}}</span>-->
<!--                                <span class="start-date">{{"вылет "}}{{momentDateSearch(item.obratno.departureDateTime.value)}}</span>-->

<!--                                &lt;!&ndash;                  <div class="company-logo">&ndash;&gt;-->
<!--                                &lt;!&ndash;                    <img src="../../assets/images/imageAPI.png" alt="">&ndash;&gt;-->
<!--                                &lt;!&ndash;                  </div>&ndash;&gt;-->
<!--                            </div>-->
<!--                            <div class="result-row" v-if="getShowMoreCrane[key]">-->
<!--                                <div class="time-info">-->
<!--                                    <div class="departure">-->
<!--                                        <h5 class="normal-text">Вылет</h5>-->
<!--                                        <span class="bold-text">{{momentTime(new Date(item.obratno.departureDateTime.value).getTime())}}</span>-->
<!--                                    </div>-->
<!--                                    <div class="arrival">-->
<!--                                        <h5 class="normal-text">Прилет</h5>-->
<!--                                        <span class="bold-text">{{momentTime(new Date(item.obratno.arrivalDateTime.value).getTime())}}</span>-->
<!--                                    </div>-->
<!--                                    <div class="transplants">-->
<!--                                        <h5 class="normal-text">Пересадки</h5>-->
<!--                                        <span class="bold-text">Нет</span>-->
<!--                                        &lt;!&ndash;                            <span class="bold-text">{{(item.flightplaces.schedule.length == 1) ? timeInfo.transplants : 'С пересадками'}}</span>&ndash;&gt;-->
<!--                                    </div>-->
<!--                                    <div class="on-way">-->
<!--                                        <h5 class="normal-text">В пути</h5>-->
<!--                                        <span class="bold-text">{{getTravelTime(momentTime(new Date(item.obratno.departureDateTime.value).getTime()), momentTime(new Date(item.obratno.arrivalDateTime.value).getTime()))}}</span>-->
<!--                                    </div>-->
<!--                                    &lt;!&ndash;                <div class="flight">&ndash;&gt;-->
<!--                                    &lt;!&ndash;                  <h5 class="normal-text">Рейс</h5>&ndash;&gt;-->
<!--                                    &lt;!&ndash;                  <span class="bold-text">{{item[0].flightNumber}}</span>&ndash;&gt;-->
<!--                                    &lt;!&ndash;                </div>&ndash;&gt;-->
<!--                                </div>-->
<!--                                <div class="result-info">-->
<!--                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"-->
<!--                                         xmlns="http://www.w3.org/2000/svg">-->
<!--                                        <path d="M6.57422 4.25V3.07422H5.42578V4.25H6.57422ZM6.57422 8.92578V5.42578H5.42578V8.92578H6.57422ZM1.87109 1.89844C3.01953 0.75 4.39583 0.175781 6 0.175781C7.60417 0.175781 8.97135 0.75 10.1016 1.89844C11.25 3.02865 11.8242 4.39583 11.8242 6C11.8242 7.60417 11.25 8.98047 10.1016 10.1289C8.97135 11.2591 7.60417 11.8242 6 11.8242C4.39583 11.8242 3.01953 11.2591 1.87109 10.1289C0.740885 8.98047 0.175781 7.60417 0.175781 6C0.175781 4.39583 0.740885 3.02865 1.87109 1.89844Z"-->
<!--                                              fill="#0094FF"/>-->
<!--                                    </svg>-->
<!--                                    <a-->
<!--                                            @click="showPopup(item.obratno, item.obratno.departureAirport.locationName.value, item.obratno.arrivalAirport.locationName.value, getTravelTime(momentTime(new Date(item.obratno.departureDateTime.value).getTime()), momentTime(new Date(item.obratno.arrivalDateTime.value).getTime())), true)"-->
<!--                                    >Подробнее</a>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div v-if="getShowMoreCrane[key]" class="selected-class">-->
<!--                        <div-->
<!--                                v-for="(val, index) in item.obratno.availabilityFlightSegmentList.bookingClassAvailabilityList"-->
<!--                                :key="key + '-' + index"-->
<!--                                class="ticket-class"-->
<!--                        >-->
<!--                            <input-->
<!--                                    type="radio"-->
<!--                                    :id="`ticket-${index}-${key}`"-->
<!--                                    :value="-->
<!--                                [-->
<!--                                    val.fareDisplayInfos.fareDisplayInfoList.pricingInfoList.totalFare.amount.value.value + ' ' +-->
<!--                                    val.fareDisplayInfos.fareDisplayInfoList.pricingInfoList.totalFare.amount.currency.code.value,-->
<!--                                    val.bookingClass.resBookDesigCode.value-->
<!--                                ]"-->
<!--                                    v-model="ticket[key]"-->
<!--                            >-->
<!--                            <label :for="`ticket-${index}-${key}`">-->
<!--                                <span>{{val.bookingClass.resBookDesigCode.value}} {{val.bookingClass.cabin.value}}</span>-->
<!--                                <span>-->
<!--                                {{val.fareDisplayInfos.fareDisplayInfoList.pricingInfoList.totalFare.amount.value.value}}-->
<!--                                {{val.fareDisplayInfos.fareDisplayInfoList.pricingInfoList.totalFare.amount.currency.code.value}}-->
<!--                            </span>-->
<!--                            </label>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div v-if="getShowMoreCrane[key]" class="dashed-border"></div>-->
<!--                    <div v-if="getShowMoreCrane[key]" class="result-buy">-->
<!--                        <div class="announcement">-->
<!--                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"-->
<!--                                 xmlns="http://www.w3.org/2000/svg">-->
<!--                                <path d="M6.57422 7.75V6.57422H5.42578V7.75H6.57422ZM6.57422 5.42578V1.92578H5.42578V5.42578H6.57422ZM10.6758 0.175781C10.9857 0.175781 11.25 0.294271 11.4688 0.53125C11.7057 0.75 11.8242 1.01432 11.8242 1.32422V8.32422C11.8242 8.63411 11.7057 8.90755 11.4688 9.14453C11.25 9.38151 10.9857 9.5 10.6758 9.5H2.5L0.175781 11.8242V1.32422C0.175781 1.01432 0.285156 0.75 0.503906 0.53125C0.740885 0.294271 1.01432 0.175781 1.32422 0.175781H10.6758Z"-->
<!--                                      fill="#575870"/>-->
<!--                            </svg>-->
<!--                            <span @click="showPopupCraneInfo()">Правила тарифов</span>-->
<!--                        </div>-->
<!--                        <div class="ticker-price"-->
<!--                             @click="openModal(ticket[key][0], item.tuda, item.tuda.departureAirport.locationName.value, item.tuda.arrivalAirport.locationName.value, getTravelTime(momentTime(new Date(item.tuda.departureDateTime.value).getTime()), momentTime(new Date(item.tuda.arrivalDateTime.value).getTime())),item.obratno, getTravelTime(momentTime(new Date(item.obratno.departureDateTime.value).getTime()), momentTime(new Date(item.obratno.arrivalDateTime.value).getTime())), 'crane')">-->
<!--                            <span class="price">{{ticket[key][0]}}</span>-->
<!--                            <cButton buttonValue="Забронировать"></cButton>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->

<!--            <v-pagination-->
<!--                    v-if="craneResult.length > 0"-->
<!--                    v-model="pageCrane"-->
<!--                    :length="pagLengthCrane"-->
<!--                    :total-visible="7"-->
<!--                    @input="pageChangeCrane(pageCrane)"-->
<!--            ></v-pagination>-->
<!--        </div>-->
        <popup
                :showModal="showModal"
                :flightData="popupData"
                :cityF="popupCityF"
                :cityT="popupCityT"
                :isCrane="posapIsCrane"
                :travelTime="popupTravelTime"
                @hidePopup="showModal = $event"
        ></popup>
        <popupFareRules
                :text="craneInfoText"
                :showModal="showCraneInfoModal"
                @hidePopup="showCraneInfoModal = $event"
        ></popupFareRules>
        <popupFareRules
                :text="infoText"
                :showModal="showInfoModal"
                @hidePopup="showInfoModal = $event"
        ></popupFareRules>
    </div>
</template>

<script>
    import moment from 'moment'

    import cSelect from "@/components/base_components/cSelect";
    import cLoader from "@/components/base_components/cLoader";
    import cSelectInput from "@/components/base_components/cSelectInput";
    import cDate from "@/components/base_components/cDate";
    import cSlider from "@/components/base_components/cSlider";
    import cCount from "@/components/base_components/cCount";
    import cButton from "@/components/base_components/cButton";
    import popup from "@/views/search/popup";
    import popupFareRules from "@/views/search/popupFareRules";

    import * as feesTypes from "@/stores/modules/controls/types";
    import * as searchTypes from "@/stores/modules/service_search/types";
    import * as blocks_types from "@/stores/modules/blocks/types";
    import * as orders_types from "@/stores/modules/orders/types";

    import {required, requiredIf} from 'vuelidate/lib/validators'

    export default {
        name: "search",
        components: {
            cSelect,
            cLoader,
            cSelectInput,
            cDate,
            cSlider,
            cCount,
            cButton,
            popup,
            popupFareRules
        },
        data() {
            return {
                ticket: "",
                currencies: [],
                rotateIcon: [],
                posapIsCrane: false,
                popupData: {},
                popupCityF: '',
                popupCityT: '',
                popupTravelTime: '',
                showModal: false,
                showInfoModal: false,
                showCraneInfoModal: false,
                craneInfoText: 'За правилами тарифа просим Вас обратиться к менеджеру',
                infoText: '',
                searchPaginData: [],
                craneResult: [],
                searchPaginationLength: 1,
                page: 1,
                pageCrane: 1,
                showLoader: false,
                showLoaderCrane: false,
                currentDate: '',
                cityValid: '',
                travelTime: "",
                travelTime2: "",
                test: null,
                testCrane: null,
                showId: 0,
                dialog: false,
                showResult: false,
                showMore: [],
                airlines: [],
                cities: [],
                city: [],
                flightData: {},
                flightData2: {},
                cityFrom: "",
                cityTo: "",
                fromCities: [],
                toCities: [],
                sigmentCount: 1,
                service_search: {
                    sigment: [
                        {
                            from_id: [],
                            to_id: [],
                            date: '',
                        },
                    ],
                    settingsSelected: {
                        radio: 1,
                        select: false
                    },
                    date_departure: '',
                    fare_id: 2,
                    dateTime: [],
                    dateTimeDeparture: [],
                    passangers_count: 1,
                    childrenCount: 0,
                    babiesCount: 0,
                    servicesClass: 0,
                },
                timeInfo: {
                    departure: '09:55',
                    arrival: '15:10',
                    transplants: 'Прямой',
                    onWay: '3ч 15 мин',
                    flight: 'T5 728'
                },
            }
        },
        validations: {
            service_search: {
                date_departure: {
                    required: requiredIf(function () {
                        if (this.service_search.settingsSelected.radio == 2) {
                            return true
                        } else {
                            return false
                        }
                    })
                },
                sigment: {
                    $each: {
                        date: {
                            required
                        },
                        from_id: {
                            required
                        },
                        to_id: {
                            required
                        }
                    }
                }
            }
        },
        mounted() {
            this.$store.dispatch("orders/" + orders_types.A_ORDERS)
            this.$store.dispatch("blocks/" + blocks_types.A_COMPANIES)
            this.$store.dispatch("blocks/" + blocks_types.A_CURRENCIES)
                .then(res => {
                    this.currencies = res.data;
                })
            this.$store.dispatch("service_search/" + searchTypes.A_CLEAR_SEARCH_RESULT);
            moment().locale('ru')
            let day = moment().format('L');
            let res = day.split("/").reverse();
            day = [res[0], res[2], res[1]]
            res = day.join('-');
            this.currentDate = res;
            this.$store.dispatch("controls/" + feesTypes.A_FEES)
                .then(res => {
                    this.airlines.push(res);
                    let airports = this.airlines[0].airports;
                    this.cities.push(airports);
                    let cities = []
                    for (let city of airports) {
                        cities.push(city)
                    }
                    this.fromCities.push(cities);
                    this.toCities.push(cities);
                });
        },
        computed: {
            pagLength() {
                if (this.service_search.settingsSelected.radio == 3) {
                    let pages = this.$store.getters["service_search/getSearchResultLength"]('multisegment');
                    return Math.ceil(pages / 10)
                }else {
                    let pages = this.$store.getters["service_search/getSearchResultLength"]('ow');
                    return Math.ceil(pages / 10)
                }
            },
            pagLengthCrane() {
                let pages = this.$store.getters["service_search/getServiceSearchCraneLength"];
                return Math.ceil(pages / 10)
            },
            getShowMore() {
                return this.$store.getters["service_search/getShowMoreData"]
            },
            getShowMoreCrane() {
                return this.$store.getters["service_search/getShowMoreDataCrane"]
            },
            getShowMoreDataByIdd: {
                get() {
                    return this.$store.getters["service_search/getShowMoreDataById"](this.showId)
                },
                set(value) {
                    this.showId = value
                }
            },
            getSearchData() {
                let data = (this.$store.getters["service_search/getSearchData"])(10) ? this.$store.getters["service_search/getSearchData"](10) : [];
                return data;
            },
            getSearchDataCrane() {
                let data = (this.$store.getters["service_search/getSearchDataCrane"])(10) ? this.$store.getters["service_search/getSearchDataCrane"](10) : [];
                return data;
            },
            getSearchResultOneWay() {
                if (this.service_search.settingsSelected.radio == 3) {
                    console.log(this.$store.getters["service_search/getSearchResultMultiSegment"]);
                    return (this.$store.getters["service_search/getSearchResultMultiSegment"]) ? this.$store.getters["service_search/getSearchResultMultiSegment"] : [];
                }else {
                    console.log(this.$store.getters["service_search/getSearchResultOneWay"]);
                    return (this.$store.getters["service_search/getSearchResultOneWay"]) ? this.$store.getters["service_search/getSearchResultOneWay"] : [];
                }
            },
            getPassengerCount() {
                let passengerCount = {
                    older: this.service_search.passangers_count,
                    children: this.service_search.childrenCount,
                    baby: this.service_search.babiesCount
                };

                return passengerCount;
            }
        },
        methods: {
            addSigment() {
                if (this.service_search.sigment.length < 6) {
                    this.service_search.sigment.push(
                        {
                            from_id: [],
                            to_id: [],
                            date: ''
                        }
                    )
                    this.rotateIcon.push(false)
                    this.$store.dispatch("controls/" + feesTypes.A_FEES)
                        .then( () => {
                            let airports = this.airlines[0].airports;
                            let cities = []
                            for (let city of airports) {
                                cities.push(city)
                            }
                            this.fromCities.push(cities);
                            this.toCities.push(cities);
                        });
                }
            },
            removeSigment() {
                if (this.service_search.sigment.length > 1) {
                    this.service_search.sigment.pop()
                    this.rotateIcon.pop()
                    this.fromCities.pop();
                    this.toCities.pop();
                }
            },
            getSum() {
                let arr = arguments
                let res = 0
                for (let i = 0; i < arr.length; i++) {
                    res += parseFloat(arr[i])
                }
                return res
            },
            getCurrenciValue(data, block = false) {
                if (block == 'block') {
                    let company_id = this.$store.getters['blocks/getAirlines'].airlines[0].id;
                    let currency_id = null;
                    this.$store.getters["orders/getCompanies"].filter(val => {
                        if (company_id == val.id) {
                            currency_id = val.currency_id
                        }
                    });
                    let curr = this.currencies.filter(val => {
                        if (currency_id == val.id) {
                            return val;
                        }
                    });
                    return (curr || curr[0]) ? curr[0].code_literal_iso_4217 : '';
                }
                console.log(data);
                let curr = this.currencies.filter(val => {
                    if (data['obratno'].flightplaces.currency_id == val.id) {
                        return val;
                    }
                });
                return curr[0].code_literal_iso_4217 ? curr[0].code_literal_iso_4217 : '';
            },
            reverseCities(index) {
                this.rotateIcon[index] = !this.rotateIcon[index];
                let to = this.service_search.sigment[index].to_id;
                this.service_search.sigment[index].to_id = this.service_search.sigment[index].from_id;
                this.service_search.sigment[index].from_id = to;
            },
            showPopup(data, cityF, cityT, time, isCrane) {
                this.showModal = true;
                this.posapIsCrane = isCrane;
                this.popupData = data;
                this.popupCityF = cityF;
                this.popupCityT = cityT;
                this.popupTravelTime = time;
            },
            showPopupCraneInfo() {
                this.showCraneInfoModal = true
            },
            showPopupInfo(text) {
                this.showInfoModal = true;
                this.infoText = text
            },
            pageChange(page) {
                if (page) {
                    let item = (page * 10);
                    this.searchPaginData = this.$store.getters["service_search/getSearchData"](item)
                } else {
                    this.searchPaginData = this.getSearchData;
                }
            },
            pageChangeCrane(page) {
                if (page) {
                    let item = (page * 10);
                    this.craneResult = this.$store.getters["service_search/getSearchDataCrane"](item)
                } else {
                    this.craneResult = this.getSearchData;
                }
            },

            momentDateSearch: function (date) {
                return moment(date).locale('ru').format('DD MMMM , dddd');
            },
            momentTime: function (date) {
                return moment(date).format('HH:mm');
            },
            countMaxValue(name) {
                let older = this.service_search.passangers_count;
                let children = this.service_search.childrenCount;
                let baby = this.service_search.babiesCount;

                if (name == 'older' && ((older + children + baby) > 8)) {
                    return (older)
                } else if (name == 'children' && ((older + children + baby) > 8)) {
                    return (children)
                } else if (name == 'baby' && ((older + children + baby) > 8)) {
                    return (baby)
                }
            },
            selectFromCity(id, index) {
                if (this.cityValid != 2) {
                    this.cityValid = 1;
                    let toCity = [];
                    for (let i = 0; i < this.service_search.sigment.length; i++) {
                        this.fromCities[index].filter((val) => {
                            if (val.id != id) {
                                toCity.push(val)
                            }
                            this.$set(this.toCities, index, toCity);
                        })
                    }
                }
            },
            selectToCity(id, index) {
                if (this.cityValid != 1) {
                    this.cityValid = 2;
                    let fromCity = [];
                    for (let i = 0; i < this.service_search.sigment.length; i++) {
                        this.toCities[index].filter((val) => {
                            if (val.id != id) {
                                fromCity.push(val)
                            }
                            this.$set(this.fromCities, index, fromCity);
                        })
                    }
                }
            },
            getTravelTime(timeFrom, timeTo) {
                let hours = 24;
                let minute = 60;
                let timeOne = timeFrom.split(':');
                let timeTwo = timeTo.split(':');
                let timeHours = (timeTwo[0] - timeOne[0]);
                let timeMinutes = (timeTwo[1] - timeOne[1]);
                if (timeHours < 0) {
                    if (timeMinutes < 0) {
                        timeHours -= 1;
                        timeMinutes = (minute + timeMinutes);
                    }
                    let newTime = [];
                    let time = ((hours + timeHours) + "" + timeMinutes).split('');
                    if ((hours + timeHours) < 10 && timeMinutes < 10) {
                        time.unshift('0');
                        time.unshift('0');
                        newTime = [time[0], time[2], ":", time[1], time[3]]
                        return newTime.join('');
                    } else if ((hours + timeHours) < 10 && timeMinutes >= 10) {
                        time.unshift('0');
                        newTime = [time[0], time[1], ":", time[2], time[3]]
                        return newTime.join('');
                    }
                    if (time.length == 3) {
                        time.unshift('0');
                        newTime = [time[1], time[2], ":", time[0], time[3]]
                    } else {
                        newTime = [time[0], time[1], ":", time[2], time[3]]
                    }
                    return newTime.join('');
                } else if (timeHours == 0 && timeMinutes < 0) {
                    let newTime = [];
                    let time = ("23" + (60 + timeMinutes)).split('');
                    if (time.length == 3) {
                        time.unshift('0');
                        newTime = [time[1], time[2], ":", time[0], time[3]]
                    } else {
                        newTime = [time[0], time[1], ":", time[2], time[3]]
                    }
                    return newTime.join('');
                } else {
                    if (timeMinutes < 0) {
                        timeHours -= 1;
                        timeMinutes = (minute + timeMinutes);
                    }
                    let newTime = [];
                    let time = (timeHours + "" + timeMinutes).split('');
                    if (time.length == 3) {
                        time.unshift('0');
                        newTime = [time[0], time[1], ":", time[2], time[3]]
                    } else if (time.length == 2) {
                        time.unshift('0');
                        time.unshift('0');
                        newTime = [time[0], time[2], ":", time[1], time[3]]
                    } else if (time.length == 1) {
                        time.unshift('0');
                        time.unshift('0');
                        time.unshift('0');
                        newTime = [time[0], time[1], ":", time[2], time[3]]
                    } else {
                        newTime = [time[0], time[1], ":", time[2], time[3]]
                    }
                    return newTime.join('');
                }
            },
            getShowMoreMet(id) {
                this.$store.dispatch("service_search/" + searchTypes.A_CHANGE_SHOW_MORE, id);
                this.test = [];
                this.test.push(this.$store.getters["service_search/getShowMoreData"])
            },
            getShowMoreMetCrane(id) {
                this.$store.dispatch("service_search/" + searchTypes.A_CHANGE_SHOW_MORE_CRANE, id);
                this.testCrane = [];
                this.testCrane.push(this.$store.getters["service_search/getShowMoreData"])
            },
            openModal(summ, val, cityFrom, cityTo, travelTime, val2, travelTime2, crane) {
                console.log(this.service_search.settingsSelected.radio);
                let newVal = {...val, ...{type_flight: this.service_search.settingsSelected.radio}};
                this.dialog = true;
                this.flightData = val;
                this.cityFrom = cityFrom;
                this.cityTo = cityTo;
                this.$store.dispatch("service_search/" + searchTypes.A_SAVE_BOOKING_DATA,
                    {
                        summ: summ,
                        flightData: newVal,
                        cityFrom: cityFrom,
                        cityTo: cityTo,
                        passengerCount: this.getPassengerCount,
                        travelTime: travelTime,
                        flightData2: val2,
                        travelTime2: travelTime2,
                        isCrane: crane == 'crane' ? true : false
                    }
                )
                    .then(res => {
                        this.$router.push('booking');
                    });
            },
            departureCity(id) {
                let city = '';
                if (this.cities[0]) {
                    this.cities[0].filter((value) => {
                        if (value.id == id) {
                            city = value.name_ru;
                        }
                    });
                }

                return city;
            },
            arrivalCity(id) {
                let city = '';
                if (this.cities[0]) {
                    this.cities[0].filter((value) => {
                        if (value.id == id) {
                            city = value.name_ru;
                        }
                    });
                }
                return city;
            },
            changeWay() {
                this.showResult = false;
                for (let i = 0; i < this.service_search.sigment.length; i++) {
                    if (this.service_search.sigment.length > 1) {
                        this.service_search.sigment.pop()
                    }
                }
                this.searchPaginData = [];
                this.$store.dispatch("service_search/" + searchTypes.A_CLEAR_SEARCH_RESULT);
            },
            search() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    this.craneResult = [];
                    this.searchPaginData = [];
                    this.$store.dispatch("service_search/" + searchTypes.A_CLEAR_SEARCH_RESULT);
                    this.showLoader = true;
                    this.showLoaderCrane = true;
                    this.showResult = true;
                    let data = null;
                    let multisegment = false
                    if (this.service_search.settingsSelected.radio == 3) {
                        multisegment = true
                        data = [];
                        for (let i = 0; i < this.service_search.sigment.length; i++) {
                            let sigmentData = {
                                type_flight: 1,
                                date: this.service_search.sigment[i].date,
                                from_id: this.service_search.sigment[i].from_id,
                                to_id: this.service_search.sigment[i].to_id,
                                fare_id: this.service_search.fare_id,
                                adult: this.service_search.passangers_count,
                                child: this.service_search.childrenCount,
                                infant: this.service_search.babiesCount,
                            }
                            data.push(sigmentData)
                        }
                    }else if (this.service_search.settingsSelected.radio == 2) {
                        data = [
                            {
                                type_flight: 2,
                                date: this.service_search.sigment[0].date,
                                from_id: this.service_search.sigment[0].from_id,
                                to_id: this.service_search.sigment[0].to_id,
                                fare_id: this.service_search.fare_id,
                                adult: this.service_search.passangers_count,
                                child: this.service_search.childrenCount,
                                infant: this.service_search.babiesCount,
                            },
                            {
                                type_flight: 2,
                                date: this.service_search.date_departure,
                                from_id: this.service_search.sigment[0].to_id,
                                to_id: this.service_search.sigment[0].from_id,
                                fare_id: this.service_search.fare_id,
                                adult: this.service_search.passangers_count,
                                child: this.service_search.childrenCount,
                                infant: this.service_search.babiesCount,
                            }
                        ];
                    } else {
                        data = [
                            {
                                type_flight: 1,
                                date: this.service_search.sigment[0].date,
                                from_id: this.service_search.sigment[0].from_id,
                                to_id: this.service_search.sigment[0].to_id,
                                fare_id: this.service_search.fare_id,
                                adult: this.service_search.passangers_count,
                                child: this.service_search.childrenCount,
                                infant: this.service_search.babiesCount,
                            }
                        ]
                    }
                    let cityfrom = [];
                    let cityto = [];
                    // if (this.service_search.sigment.length > 1) {
                        for (let i = 0; i < this.service_search.sigment.length; i++) {
                            cityfrom.push({
                                airport: {},
                                airport_name_eng: "",
                                airport_name_ru: "",
                                city: {},
                                country: {},
                            })
                            cityto.push({
                                airport: {},
                                airport_name_eng: "",
                                airport_name_ru: "",
                                city: {},
                                country: {},
                            })
                            this.airlines[0].airports.filter((val) => {
                                if (val.id == this.service_search.sigment[i].from_id) {
                                    cityfrom[i].airport = val;
                                }
                            });
                            this.airlines[0].cities.filter((val) => {
                                if (val.id == cityfrom[i].airport.city_id) {
                                    cityfrom[i].city = val;
                                    cityfrom[i].airport = {...cityfrom[i].airport, ...{city: val}}
                                }
                            });
                            this.airlines[0].countries.filter((val) => {
                                if (val.id == cityfrom[i].city.country_id) {
                                    cityfrom[i].country = val;
                                    cityfrom[i].airport.city = {...cityfrom[i].airport.city, ...{country: val}}
                                }
                            });
                            cityfrom[i].airport_name_eng = cityfrom[i].airport.name_eng;
                            cityfrom[i].airport_name_ru = cityfrom[i].airport.name_ru;

                            this.airlines[0].airports.filter((val) => {
                                if (val.id == this.service_search.sigment[i].to_id) {
                                    cityto[i].airport = val;
                                }
                            });
                            this.airlines[0].cities.filter((val) => {
                                if (val.id == cityto[i].airport.city_id) {
                                    cityto[i].city = val;
                                    cityto[i].airport = {...cityto[i].airport, ...{city: val}}
                                }
                            });
                            this.airlines[0].countries.filter((val) => {
                                if (val.id == cityto[i].city.country_id) {
                                    cityto[i].country = val;
                                    cityto[i].airport.city = {...cityto[i].airport.city, ...{country: val}}
                                }
                            });
                            cityto[i].airport_name_eng = cityto[i].airport.name_eng;
                            cityto[i].airport_name_ru = cityto[i].airport.name_ru;
                        }
                    // }

                    let dataCrane = {};
                    if (this.service_search.sigment.length > 1 && this.service_search.settingsSelected.radio == 3){
                        dataCrane = {
                            tiketway: 'MULTI_DIRECTIONAL',
                            directflights: 'false',
                            classflight: "ECONOMY",
                            segments: [
                                // {
                                //     adultpeople: parseInt(this.service_search.passangers_count),
                                //     baby: parseInt(this.service_search.babiesCount),
                                //     childrens: parseInt(this.service_search.childrenCount),
                                //     cityfrom: cityfrom,
                                //     cityto: cityto,
                                //     datehere: this.service_search.date_departure,
                                //     dateto: this.service_search.sigment[0].date,
                                //     skey: 0,
                                // }
                            ],
                            countsegments: this.service_search.sigment.length,
                            baby: parseInt(this.service_search.babiesCount),
                            childrens: parseInt(this.service_search.childrenCount),
                            adultpeople: parseInt(this.service_search.passangers_count),
                        };
                        for (let i = 0; i < this.service_search.sigment.length; i++){
                            dataCrane.segments.push({
                                adultpeople: parseInt(this.service_search.passangers_count),
                                baby: parseInt(this.service_search.babiesCount),
                                childrens: parseInt(this.service_search.childrenCount),
                                cityfrom: cityfrom[i],
                                cityto: cityto[i],
                                datehere: this.service_search.sigment[i].date,
                                dateto: this.service_search.sigment[i].date,
                                skey: i,
                            })
                        }
                    } else {
                        dataCrane = {
                            tiketway: this.service_search.settingsSelected.radio == 1 ? 'ONE_WAY' : (this.service_search.settingsSelected.radio == 2 ? "ROUND_TRIP" : ''),
                            directflights: 'false',
                            classflight: "ECONOMY",
                            segments: [
                                {
                                    adultpeople: parseInt(this.service_search.passangers_count),
                                    baby: parseInt(this.service_search.babiesCount),
                                    childrens: parseInt(this.service_search.childrenCount),
                                    cityfrom: cityfrom[0],
                                    cityto: cityto[0],
                                    datehere: this.service_search.sigment[0].date,
                                    dateto: this.service_search.sigment[0].date,
                                    skey: 0,
                                }
                            ],
                            countsegments: 1,
                            baby: parseInt(this.service_search.babiesCount),
                            childrens: parseInt(this.service_search.childrenCount),
                            adultpeople: parseInt(this.service_search.passangers_count),
                        };
                    }
                    this.$store.dispatch("service_search/" + searchTypes.A_SEARCH, {data: data, crane: dataCrane, multisegment: multisegment})
                        .then((res) => {
                            this.pageChange()
                            console.log(res);
                            this.flightData = res.segments[0];
                            this.showLoader = false;
                        })
                        .catch(err => {
                            this.showLoader = false;
                        })
                    this.$store.dispatch("service_search/" + searchTypes.A_SEARCH_CRANE, {data: data, crane: dataCrane})
                        .then((res) => {
                            // res[0].tuda.isEmpty = function () {
                            //     for (let key in res[0].tuda) {
                            //         if (res[0].tuda.hasOwnProperty(key))
                            //             return false;
                            //     }
                            //     return true;
                            // }
                            // if (!res[0].tuda.isEmpty()) {
                                this.craneResult = res
                            // }
                            this.showLoaderCrane = false;
                        })
                        .catch(err => {
                            this.showLoaderCrane = false;
                        })
                }
            }
        },
        watch: {
            craneResult(val) {
                console.log(val);
                this.ticket = []
                for (let i = 0; i < this.craneResult.length; i++) {
                    this.$set(this.ticket, i, "");
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .search-content {
        padding: 29px 33px;
    }

    .search-services, .services-class {
        .headline {
            padding-bottom: 19px;
            border-bottom: 1px solid rgba(31, 32, 65, 0.05);

            h3 {
                margin: 0;
            }
        }

        .services-settings {
            display: grid;
            grid-template-columns: 444px auto;
            align-items: center;
            grid-column-gap: 44px;
        }

        /deep/ .v-input--radio-group__input {
            display: grid;
            grid-template-columns: repeat(3, auto);
            grid-column-gap: 30px;

            & div {
                margin: 0 !important;

                & label {
                    padding-left: 8px;
                    margin: 0;
                    font-family: "Montserrat";
                    font-size: 12px;
                    color: #000000;
                }
            }
        }
    }

    .add-remove-sigment {
        margin: 20px 0 3px;
        display: flex;

        span {
            margin-left: 2px;
        }

        div:first-child {
            margin-right: 15px;
            color: #4DC56F;
            font-size: 15px;
            font-family: "Montserrat";
            cursor: pointer;

            svg {
                fill: #4DC56F;
            }
        }

        div:last-child {
            color: red;
            font-size: 15px;
            font-family: "Montserrat";
            cursor: pointer;
        }
    }

    .services-class {
        padding-top: 30px;

        .passenger-count-wrap {
            display: flex;

            div {
                margin-right: 15px;
            }
        }

        .services-settings {
            grid-template-columns: 185px 1fr;

            /deep/ .v-input--radio-group__input {
                display: grid;
                grid-template-columns: repeat(3, auto);
                grid-column-gap: 20px;
            }

            /deep/ .v-input--selection-controls {
                margin: 0;
                padding-top: 8px;

                & .v-input__slot {
                    margin-bottom: 25px;
                }
            }
        }
    }

    /deep/ .v-menu {
        display: none;
    }

    .country-settings {
        display: flex;

        .from-wrap, .to-wrap {
            position: relative;
        }

        .country-icon {
            padding: 30px 10px 10px;
            cursor: pointer;
        }

        /deep/ .v-select.v-text-field input {
            padding-left: 30px;
        }

        /deep/ .v-select__selection.v-select__selection--comma {
            padding-left: 30px;
        }
    }

    .date-settings {
        padding-top: 39px;
        display: inline-grid;
        grid-template-columns: auto auto auto auto auto;
        grid-column-gap: 45px;

        .date {
            position: relative
        }
    }

    .custom-slider {
        width: 160px;
        height: 45px;

        /deep/ .v-card__text {
            padding: 0;

            & .v-input--slider {
                margin: 0;

                & .v-input__slot {
                    margin: 0;
                }
            }
        }
    }


    .search-btn {
        padding-bottom: 24px;
        border-bottom: 1px solid rgba(31, 32, 65, 0.05);

        .btn-size {
            width: max-content;
        }
    }

    .headline-style {
        font-family: "Montserrat";
        font-weight: bold;
        font-size: 12px;
        text-transform: uppercase;
        color: #1F2041;
        margin-bottom: 5px;
    }

    .loader {
        display: flex;
        justify-content: center;
    }

    /* _RESULT CONTENT_ */

    .result-content-wrap {

        .headline {
            display: flex;
            padding: 18px 0;
            align-items: center;

            h3 {
                margin: 0 5px 0 0
            }

            .result-count {
                font-family: "Montserrat";
                line-height: normal;
                font-size: 12px;
                color: #575870;
            }
        }

        .result-content {
            background: #FBFBFB;
            border: 2px solid #EEEEEE;
            border-radius: 4px;
            width: min-content;
            margin-top: 5px;

            .result-row {
                display: flex;
                justify-content: space-between;
                align-items: flex-end;

                .result-info {
                    padding-right: 30px;

                    a {
                        text-decoration: none;
                        font-family: "Montserrat";
                        font-size: 12px;
                        line-height: normal;
                        color: #0094FF;
                        padding-left: 7px;
                        transition: .2s all;

                        &:hover {
                            color: #69bfff;
                        }
                    }
                }
            }

            .result-wrap {
                padding: 18px 4px 18px 24px;
                width: min-content;
                cursor: pointer;

                .map-info {
                    width: 654px;
                    display: inline-grid;
                    grid-template-columns: repeat(4, auto) 1fr;
                    align-items: center;

                    .bold-text {
                        font-family: "Montserrat";
                        font-weight: bold;
                        font-size: 12px;
                        line-height: normal;
                        color: rgba(31, 32, 65, 0.75);
                    }

                    .start-date {
                        font-family: "Montserrat";
                        font-size: 12px;
                        line-height: normal;
                        color: #6B6B81;
                    }

                    svg {
                        margin: 0 10px;
                    }

                    .map-to {
                        padding-right: 18px;
                    }

                    .company-logo {
                        justify-self: end;
                    }
                }

                .time-info {
                    display: inline-grid;
                    grid-template-columns: repeat(5, auto);
                    grid-column-gap: 33px;
                    padding-top: 11px;
                    justify-content: left;

                    h5 {
                        margin: 0;
                    }

                    div:not(:nth-last-child(2)) {
                        padding-right: 20px;
                    }

                    .normal-text {
                        font-family: "Montserrat";
                        font-size: 12px;
                        line-height: normal;
                        color: #6B6B81;
                    }

                    .bold-text {
                        font-family: "Montserrat";
                        font-weight: bold;
                        font-size: 12px;
                        line-height: normal;
                        color: #575870;
                    }
                }
            }

            .dashed-border {
                border-bottom: 1px dashed rgba(31, 32, 65, 0.25);
            }

            .result-buy {
                display: grid;
                grid-template-columns: auto 1fr;
                align-items: center;
                padding: 9px 10px 10px 21px;

                &.grid-column-3 {
                    grid-template-columns: auto auto 1fr;

                    a {
                        font-family: "Montserrat";
                        font-size: 12px;
                        line-height: normal;
                        color: #0094FF;
                        padding-left: 7px;
                        margin-right: 10px;
                    }
                }

                a {
                    text-decoration: none;
                }

                .announcement {
                    span {
                        font-family: "Montserrat";
                        font-size: 12px;
                        line-height: normal;
                        color: #575870;
                        padding-left: 7px;
                        cursor: pointer;
                    }
                }

                .ticker-price {
                    justify-self: end;
                    display: flex;
                    align-items: center;

                    span {
                        font-family: "Montserrat";
                        font-weight: bold;
                        font-size: 18px;
                        line-height: normal;
                        text-transform: uppercase;
                        color: #4DC56F;
                        padding-right: 21px;
                    }

                    /deep/ .c-button button {
                        padding: 9px 13px;
                        text-transform: none;
                        font-weight: 600;
                    }
                }
            }
        }

        .border-dashed-2 {
            width: 96%;
            height: 4px;
            background-image: linear-gradient(to right, rgba(31, 32, 65, 0.25) 60%, rgba(255, 255, 255, 0) 40%);
            background-position: bottom;
            background-size: 10px 2px;
            background-repeat: repeat-x;
        }

        /* _CRANE_CLASS_ */

        .selected-class {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-gap: 15px;
            padding: 10px 15px;

            .ticket-class {
                /*padding: 7px 10px;*/
                /*background-color: #fff;*/
                /*border: 1px solid #ccc;*/
                /*border-radius: 4px;*/

                input {
                    display: none;

                    &:checked + label {
                        background-color: rgb(236, 235, 255);
                    }
                }

                label {
                    display: grid;
                    align-items: center;
                    padding: 7px 10px;
                    background-color: #fff;
                    border: 1px solid #cccccc;
                    border-radius: 4px;
                    margin: 0;
                    cursor: pointer;
                }

                span {
                    /*display: block;*/
                    font-size: 14px;
                    font-family: "Montserrat";
                    line-height: normal;
                    color: #575870;
                }
            }
        }

        /* _PAGINATION_ */

        /deep/ .v-pagination {
            margin: 20px 0;

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
    }

    .rotate-icon {
        transform: rotate(-540deg);
        transition: all .7s ease-in-out;
    }

    .rotate-icon-none {
        transform: rotate(0deg);
        transition: all .7s ease-in-out;
    }

    .date--error {
        /deep/ .v-input {
            border-color: red;
            box-shadow: 0 0 2px 0px rgba(255, 0, 0, 0.6);
        }

        /deep/ .date-format {
            display: none;
        }
    }

    .select--error {
        /deep/ .v-select > .v-input__control > .v-input__slot {
            border-color: red;
            box-shadow: 0 0 2px 0px rgba(255, 0, 0, 0.6);
        }
    }

    .error-text {
        position: absolute;
        bottom: 45px;
        color: red;
        font-family: "Montserrat";
        font-weight: normal;
        font-size: 12px;
        line-height: normal;
    }

    .select-error-text {
        position: absolute;
        bottom: -4px;
        color: red;
        font-family: "Montserrat";
        font-weight: normal;
        font-size: 12px;
        line-height: normal;
    }

</style>
