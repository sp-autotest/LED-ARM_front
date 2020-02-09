<template>
    <div :class="['side-bar-wrap',{'menu-show':!menuShow}]">
        <div class="side-bar">
            <v-list :class="{'bg-green':menuList == 'listOne'}">
                <v-list-tile @click="selectedMenu('listOne')">
                    <router-link tag="div" class="router-link" to="/dashboard" exact>
                        <v-list-tile-action>
                            <svg width="30" height="30" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.9844 7V4.98438H9.01562V7H10.9844ZM10.9844 15.0156V9.01562H9.01562V15.0156H10.9844ZM2.92188 2.96875C4.89062 1 7.25 0.015625 10 0.015625C12.75 0.015625 15.0938 1 17.0312 2.96875C19 4.90625 19.9844 7.25 19.9844 10C19.9844 12.75 19 15.1094 17.0312 17.0781C15.0938 19.0156 12.75 19.9844 10 19.9844C7.25 19.9844 4.89062 19.0156 2.92188 17.0781C0.984375 15.1094 0.015625 12.75 0.015625 10C0.015625 7.25 0.984375 4.90625 2.92188 2.96875Z" fill="#1F2041" fill-opacity="0.5"/>
                            </svg>
                        </v-list-tile-action>
                        <v-list-tile-title class="first-title">{{sideBar.descktop}}</v-list-tile-title>
                    </router-link>
                </v-list-tile>
            </v-list>

            <v-list :class="{'bg-green':menuList == 'listTwo'}">
                <v-list-tile @click="selectedMenu('listTwo')">
                    <router-link tag="div" class="router-link" to="/search" exact>
                        <v-list-tile-action>
                            <svg width="30" height="30" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.32812 15.6719C5.92188 17.2344 7.8125 18.0156 10 18.0156C12.1875 18.0156 14.0625 17.2344 15.625 15.6719C17.2188 14.0781 18.0156 12.1875 18.0156 10C18.0156 7.8125 17.2188 5.9375 15.625 4.375C14.0625 2.78125 12.1875 1.98438 10 1.98438C7.8125 1.98438 5.92188 2.78125 4.32812 4.375C2.76562 5.9375 1.98438 7.8125 1.98438 10C1.98438 12.1875 2.76562 14.0781 4.32812 15.6719ZM2.92188 2.96875C4.89062 1 7.25 0.015625 10 0.015625C12.75 0.015625 15.0938 1 17.0312 2.96875C19 4.90625 19.9844 7.25 19.9844 10C19.9844 12.75 19 15.1094 17.0312 17.0781C15.0938 19.0156 12.75 19.9844 10 19.9844C7.25 19.9844 4.89062 19.0156 2.92188 17.0781C0.984375 15.1094 0.015625 12.75 0.015625 10C0.015625 7.25 0.984375 4.90625 2.92188 2.96875ZM10.9844 4.98438V9.01562H15.0156V10.9844H10.9844V15.0156H9.01562V10.9844H4.98438V9.01562H9.01562V4.98438H10.9844Z" fill="white"/>
                            </svg>
                        </v-list-tile-action>
                        <v-list-tile-title class="first-title">{{sideBar.search}}</v-list-tile-title>
                    </router-link>
                </v-list-tile>
            </v-list>

            <v-list :class="{'bg-green':menuList == 'listThree'}">
                <v-list-tile @click="selectedMenu('listThree')">
                    <router-link tag="div" class="router-link" to="/orders" exact>
                        <v-list-tile-action>
                            <svg width="30" height="30" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.6094 17.4442C16.0156 17.0379 16.4844 16.8348 17.0156 16.8348C17.5469 16.8348 18 17.0379 18.375 17.4442C18.7812 17.8504 18.9844 18.3192 18.9844 18.8504C18.9844 19.3817 18.7812 19.8504 18.375 20.2567C18 20.6317 17.5469 20.8192 17.0156 20.8192C16.4844 20.8192 16.0156 20.6317 15.6094 20.2567C15.2031 19.8504 15 19.3817 15 18.8504C15 18.3192 15.2031 17.8504 15.6094 17.4442ZM0.984375 0.850403H4.26562L5.20312 2.81915H20.0156C20.2969 2.81915 20.5312 2.92853 20.7188 3.14728C20.9062 3.33478 21 3.56915 21 3.8504C21 3.88165 20.9531 4.0379 20.8594 4.31915L17.2969 10.7879C16.9219 11.4754 16.3438 11.8192 15.5625 11.8192H8.10938L7.21875 13.4598L7.17188 13.6004C7.17188 13.7567 7.25 13.8348 7.40625 13.8348H18.9844V15.8504H6.98438C6.45312 15.8504 5.98438 15.6473 5.57812 15.241C5.20312 14.8348 5.01562 14.366 5.01562 13.8348C5.01562 13.5223 5.09375 13.2098 5.25 12.8973L6.60938 10.4129L3 2.81915H0.984375V0.850403ZM5.57812 17.4442C5.98438 17.0379 6.45312 16.8348 6.98438 16.8348C7.51562 16.8348 7.98438 17.0379 8.39062 17.4442C8.79688 17.8504 9 18.3192 9 18.8504C9 19.3817 8.79688 19.8504 8.39062 20.2567C7.98438 20.6317 7.51562 20.8192 6.98438 20.8192C6.45312 20.8192 5.98438 20.6317 5.57812 20.2567C5.20312 19.8504 5.01562 19.3817 5.01562 18.8504C5.01562 18.3192 5.20312 17.8504 5.57812 17.4442Z" fill="#1F2041" fill-opacity="0.5"/>
                            </svg>
                        </v-list-tile-action>
                        <v-list-tile-title class="first-title">{{sideBar.orders}}</v-list-tile-title>
                    </router-link>
                </v-list-tile>
            </v-list>

            <v-list :class="{'bg-green':menuList == 'listFour'}">
                <v-list-group :class="{'router-active-parent': $route.name == 'aaaaa'}">
                    <template v-slot:activator>
                        <v-list-tile @click="selectedMenu('listFour')">
                            <router-link tag="div" class="router-link" to="/blocks" exact>
                                <svg width="30" height="30" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.1875 5.17188C7.96875 4.39062 8.90625 4 10 4C11.0938 4 12.0312 4.39062 12.8125 5.17188C13.5938 5.95313 13.9844 6.89062 13.9844 7.98438C13.9844 8.82812 13.4844 9.70312 12.4844 10.6094C11.4844 11.4844 10.9844 12.2812 10.9844 13H9.01562C9.01562 12.2812 9.17188 11.6719 9.48438 11.1719C9.79688 10.6406 10.1406 10.2656 10.5156 10.0469C10.8906 9.79688 11.2344 9.5 11.5469 9.15625C11.8594 8.8125 12.0156 8.42188 12.0156 7.98438C12.0156 7.45312 11.8125 7 11.4062 6.625C11 6.21875 10.5312 6.01562 10 6.01562C9.46875 6.01562 9 6.21875 8.59375 6.625C8.1875 7 7.98438 7.45312 7.98438 7.98438H6.01562C6.01562 6.89062 6.40625 5.95313 7.1875 5.17188ZM4.32812 15.6719C5.92188 17.2344 7.8125 18.0156 10 18.0156C12.1875 18.0156 14.0625 17.2344 15.625 15.6719C17.2188 14.0781 18.0156 12.1875 18.0156 10C18.0156 7.8125 17.2188 5.9375 15.625 4.375C14.0625 2.78125 12.1875 1.98438 10 1.98438C7.8125 1.98438 5.92188 2.78125 4.32812 4.375C2.76562 5.9375 1.98438 7.8125 1.98438 10C1.98438 12.1875 2.76562 14.0781 4.32812 15.6719ZM2.92188 2.96875C4.89062 1 7.25 0.015625 10 0.015625C12.75 0.015625 15.0938 1 17.0312 2.96875C19 4.90625 19.9844 7.25 19.9844 10C19.9844 12.75 19 15.1094 17.0312 17.0781C15.0938 19.0156 12.75 19.9844 10 19.9844C7.25 19.9844 4.89062 19.0156 2.92188 17.0781C0.984375 15.1094 0.015625 12.75 0.015625 10C0.015625 7.25 0.984375 4.90625 2.92188 2.96875ZM9.01562 16V13.9844H10.9844V16H9.01562Z" fill="#1F2041" fill-opacity="0.5"/>
                                </svg>
                                <v-list-tile-title class="first-title">{{sideBar.place_block.name}}</v-list-tile-title>
                            </router-link>
                        </v-list-tile>
                    </template>
                        <v-list>
                            <v-list-group>
                                <template v-slot:activator>
                                    <v-list-tile>
                                        <v-list-tile-title class="fees-child pl-6">Начальная страница</v-list-tile-title>
                                    </v-list-tile>
                                </template>
                                <v-list-tile>
                                    <router-link tag="a"  to="/blocks/seat-availability" class="blocks-child pl-10" href="#">
                                        Наличие мест
                                    </router-link>
                                </v-list-tile>
                                <v-list-tile>
                                    <router-link tag="a" class="blocks-child pl-10" to="/blocks/orders" exact>
                                        Заказы
                                    </router-link>
                                </v-list-tile>
                            </v-list-group>
                        </v-list>
                    <v-list-tile>
                        <router-link tag="a" class="blocks-child" to="/schedule" exact>
                            {{sideBar.place_block.child.schedule}}
                        </router-link>
                    </v-list-tile>
                    <v-list-tile>
                        <router-link tag="a" class="blocks-child" to="/blocks" exact>
                            {{sideBar.place_block.child.blocks}}
                        </router-link>
                    </v-list-tile>
                </v-list-group>
            </v-list>

            <v-list :class="{'bg-green':menuList == 'listFive'}">
                <v-list-tile @click="selectedMenu('listFive')">
                    <router-link tag="div" class="router-link" to="/reports">
                        <v-list-tile-action>
                            <svg width="30" height="30" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.5 0.252182C18.0312 0.252182 18.5 0.455307 18.9062 0.861557C19.3125 1.26781 19.5156 1.73656 19.5156 2.26781V16.2366C19.5156 16.7678 19.3125 17.2366 18.9062 17.6428C18.5 18.0491 18.0312 18.2522 17.5 18.2522H2.5C1.96875 18.2522 1.5 18.0491 1.09375 17.6428C0.6875 17.2366 0.484375 16.7678 0.484375 16.2366V2.26781C0.484375 1.73656 0.6875 1.26781 1.09375 0.861557C1.5 0.455307 1.96875 0.252182 2.5 0.252182H17.5ZM17.5 16.3303V2.26781H2.5V16.3303H17.5ZM15.0156 14.2678H13V10.2366H15.0156V14.2678ZM10.9844 14.2678H9.01562V4.23656H10.9844V14.2678ZM7 14.2678H4.98438V7.23656H7V14.2678Z" fill="#1F2041" fill-opacity="0.5"/>
                            </svg>
                        </v-list-tile-action>
                        <v-list-tile-title class="first-title">Отчеты</v-list-tile-title>
                    </router-link>
                </v-list-tile>
            </v-list>

            <v-list :class="{'bg-green':menuList == 'listSix'}">
                <v-list-tile @click="selectedMenu('listSix')">
                    <router-link tag="div" class="router-link" to="/finance">
                        <v-list-tile-action>
                            <svg width="30" height="30" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 6.6852V4.66957H4V6.6852H16ZM16 9.6852V7.66957H4V9.6852H16ZM16 12.6852V10.6696H4V12.6852H16ZM18.0156 0.685196C18.5469 0.685196 19 0.888321 19.375 1.29457C19.7812 1.66957 19.9844 2.1227 19.9844 2.65395V14.6539C19.9844 15.1852 19.7812 15.6539 19.375 16.0602C19 16.4664 18.5469 16.6696 18.0156 16.6696H4L0.015625 20.6539V2.65395C0.015625 2.1227 0.203125 1.66957 0.578125 1.29457C0.984375 0.888321 1.45312 0.685196 1.98438 0.685196H18.0156Z" fill="#1F2041" fill-opacity="0.5"/>
                            </svg>
                        </v-list-tile-action>
                        <v-list-tile-title class="first-title">Финансы</v-list-tile-title>
                    </router-link>
                </v-list-tile>
            </v-list>

            <v-list :class="{'bg-green':menuList == 'listSeven'}">
                <v-list-tile @click="selectedMenu('listSeven')">
                    <router-link tag="div" class="router-link" to="/messages" exact>
                        <v-list-tile-action>
                            <svg width="30" height="30" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 6.6852V4.66957H4V6.6852H16ZM16 9.6852V7.66957H4V9.6852H16ZM16 12.6852V10.6696H4V12.6852H16ZM18.0156 0.685196C18.5469 0.685196 19 0.888321 19.375 1.29457C19.7812 1.66957 19.9844 2.1227 19.9844 2.65395V14.6539C19.9844 15.1852 19.7812 15.6539 19.375 16.0602C19 16.4664 18.5469 16.6696 18.0156 16.6696H4L0.015625 20.6539V2.65395C0.015625 2.1227 0.203125 1.66957 0.578125 1.29457C0.984375 0.888321 1.45312 0.685196 1.98438 0.685196H18.0156Z" fill="#1F2041" fill-opacity="0.5"/>
                            </svg>
                        </v-list-tile-action>
                        <v-list-tile-title class="first-title">{{sideBar.messages}}</v-list-tile-title>
                    </router-link>
                </v-list-tile>
            </v-list>

            <v-list :class="{'bg-green':menuList == 'listEight'}">
                <v-list-group>
                    <template v-slot:activator>
                        <v-list-tile @click="selectedMenu('listEight')">
                            <router-link tag="div" class="router-link" to="/control">
                                <svg width="30" height="30" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.51562 12.4844C8.20312 13.1719 9.03125 13.5156 10 13.5156C10.9688 13.5156 11.7969 13.1719 12.4844 12.4844C13.1719 11.7969 13.5156 10.9688 13.5156 10C13.5156 9.03125 13.1719 8.20312 12.4844 7.51562C11.7969 6.82812 10.9688 6.48438 10 6.48438C9.03125 6.48438 8.20312 6.82812 7.51562 7.51562C6.82812 8.20312 6.48438 9.03125 6.48438 10C6.48438 10.9688 6.82812 11.7969 7.51562 12.4844ZM17.4531 10.9844L19.5625 12.625C19.7812 12.7812 19.8125 13 19.6562 13.2812L17.6406 16.75C17.5156 16.9688 17.3125 17.0312 17.0312 16.9375L14.5469 15.9531C13.8906 16.4219 13.3281 16.75 12.8594 16.9375L12.4844 19.5625C12.4219 19.8438 12.2656 19.9844 12.0156 19.9844H7.98438C7.73438 19.9844 7.57812 19.8438 7.51562 19.5625L7.14062 16.9375C6.54688 16.6875 5.98438 16.3594 5.45312 15.9531L2.96875 16.9375C2.6875 17.0312 2.48438 16.9688 2.35938 16.75L0.34375 13.2812C0.1875 13 0.21875 12.7812 0.4375 12.625L2.54688 10.9844C2.51562 10.7656 2.5 10.4375 2.5 10C2.5 9.5625 2.51562 9.23438 2.54688 9.01562L0.4375 7.375C0.21875 7.21875 0.1875 7 0.34375 6.71875L2.35938 3.25C2.48438 3.03125 2.6875 2.96875 2.96875 3.0625L5.45312 4.04688C6.10938 3.57812 6.67188 3.25 7.14062 3.0625L7.51562 0.4375C7.57812 0.15625 7.73438 0.015625 7.98438 0.015625H12.0156C12.2656 0.015625 12.4219 0.15625 12.4844 0.4375L12.8594 3.0625C13.4531 3.3125 14.0156 3.64062 14.5469 4.04688L17.0312 3.0625C17.3125 2.96875 17.5156 3.03125 17.6406 3.25L19.6562 6.71875C19.8125 7 19.7812 7.21875 19.5625 7.375L17.4531 9.01562C17.4844 9.23438 17.5 9.5625 17.5 10C17.5 10.4375 17.4844 10.7656 17.4531 10.9844Z" fill="#1F2041" fill-opacity="0.5"/>
                                </svg>
                                <v-list-tile-title class="first-title">{{sideBar.control.name}}</v-list-tile-title>
                            </router-link>
                        </v-list-tile>
                    </template>
                    <v-list-tile>
                        <router-link tag="a" class="fees-child" to="/control/company">
                            {{sideBar.control.child.company}}
                        </router-link>
                    </v-list-tile>
                    <v-list-tile>
                        <router-link tag="a" class="fees-child" to="/control/group" exact>
                            Группы
                        </router-link>
                    </v-list-tile>
                    <v-list-tile>
                        <router-link tag="a" class="fees-child" to="/control/provider" exact>
                            Поставщики
                        </router-link>
                    </v-list-tile>
                    <v-list-tile>
                        <router-link tag="a" class="fees-child" to="/control/passengers" exact>
                            Пассажиры
                        </router-link>
                    </v-list-tile>
                    <v-list-tile>
                        <router-link tag="a" class="fees-child" to="/control/airlines" exact>
                            Авиакомпании
                        </router-link>
                    </v-list-tile>
                    <v-list-tile>
                        <router-link tag="a" class="fees-child" to="/control/provider-accounts" exact>
                            Аккаунты поставщиков
                        </router-link>
                    </v-list-tile>
                    <v-list-tile>
                        <router-link tag="a" class="fees-child" to="/control/countries-cities-airports" exact>
                            Страны, города, аэропорты
                        </router-link>
                    </v-list-tile>
<!--                    <v-list>-->
<!--                        <v-list-group>-->
<!--                            <template v-slot:activator>-->
<!--                                <v-list-tile>-->
<!--                                    <v-list-tile-title class="pl-6">{{sideBar.control.child.rights.name}}</v-list-tile-title>-->
<!--                                </v-list-tile>-->
<!--                            </template>-->
<!--                            <v-list-tile>-->
<!--                                <a href="#">-->
<!--                                    {{sideBar.control.child.rights.child.groups}}-->
<!--                                </a>-->
<!--                            </v-list-tile>-->
<!--                            <v-list-tile>-->
<!--                                <a href="#">-->
<!--                                    {{sideBar.control.child.rights.child.employees}}-->
<!--                                </a>-->
<!--                            </v-list-tile>-->
<!--                        </v-list-group>-->
<!--                    </v-list>-->
                    <v-list-tile>
                        <router-link tag="a" class="fees-child" to="/control" exact>
                            Типы сборов
                        </router-link>
                    </v-list-tile>
                    <v-list-tile>
                        <router-link tag="a" class="fees-child" to="/control/classes-service" exact>
                            Классы обслуживания
                        </router-link>
                    </v-list-tile>
                    <v-list-tile>
                        <router-link tag="a" class="fees-child" to="/control/currency-reference" exact>
                            Справочник валют
                        </router-link>
                    </v-list-tile>
                    <v-list-tile>
                        <router-link tag="a" class="fees-child" to="/control/bc-type" exact>
                            Тип ВС
                        </router-link>
                    </v-list-tile>
                </v-list-group>
            </v-list>

        </div>
        <div class="logout">
            <ul>
                <li>
                    <a href="#">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.1875 5.17188C7.96875 4.39062 8.90625 4 10 4C11.0938 4 12.0312 4.39062 12.8125 5.17188C13.5938 5.95313 13.9844 6.89062 13.9844 7.98438C13.9844 8.82812 13.4844 9.70312 12.4844 10.6094C11.4844 11.4844 10.9844 12.2812 10.9844 13H9.01562C9.01562 12.2812 9.17188 11.6719 9.48438 11.1719C9.79688 10.6406 10.1406 10.2656 10.5156 10.0469C10.8906 9.79688 11.2344 9.5 11.5469 9.15625C11.8594 8.8125 12.0156 8.42188 12.0156 7.98438C12.0156 7.45312 11.8125 7 11.4062 6.625C11 6.21875 10.5312 6.01562 10 6.01562C9.46875 6.01562 9 6.21875 8.59375 6.625C8.1875 7 7.98438 7.45312 7.98438 7.98438H6.01562C6.01562 6.89062 6.40625 5.95313 7.1875 5.17188ZM4.32812 15.6719C5.92188 17.2344 7.8125 18.0156 10 18.0156C12.1875 18.0156 14.0625 17.2344 15.625 15.6719C17.2188 14.0781 18.0156 12.1875 18.0156 10C18.0156 7.8125 17.2188 5.9375 15.625 4.375C14.0625 2.78125 12.1875 1.98438 10 1.98438C7.8125 1.98438 5.92188 2.78125 4.32812 4.375C2.76562 5.9375 1.98438 7.8125 1.98438 10C1.98438 12.1875 2.76562 14.0781 4.32812 15.6719ZM2.92188 2.96875C4.89062 1 7.25 0.015625 10 0.015625C12.75 0.015625 15.0938 1 17.0312 2.96875C19 4.90625 19.9844 7.25 19.9844 10C19.9844 12.75 19 15.1094 17.0312 17.0781C15.0938 19.0156 12.75 19.9844 10 19.9844C7.25 19.9844 4.89062 19.0156 2.92188 17.0781C0.984375 15.1094 0.015625 12.75 0.015625 10C0.015625 7.25 0.984375 4.90625 2.92188 2.96875ZM9.01562 16V13.9844H10.9844V16H9.01562Z" fill="#1F2041" fill-opacity="0.5"/>
                        </svg>
                        {{logout.reference}}
                    </a>
                </li>
                <li @click="logOut">
                    <span>
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.9844 0C16.5156 0 16.9844 0.203125 17.3906 0.609375C17.7969 1.01563 18 1.48438 18 2.01562V15.9844C18 16.5156 17.7969 16.9844 17.3906 17.3906C16.9844 17.7969 16.5156 18 15.9844 18H2.01562C1.45312 18 0.96875 17.8125 0.5625 17.4375C0.1875 17.0312 0 16.5469 0 15.9844V12H2.01562V15.9844H15.9844V2.01562H2.01562V6H0V2.01562C0 1.45312 0.1875 0.984375 0.5625 0.609375C0.96875 0.203125 1.45312 0 2.01562 0H15.9844ZM7.07812 12.6094L9.65625 9.98438H0V8.01562H9.65625L7.07812 5.39062L8.48438 3.98438L13.5 9L8.48438 14.0156L7.07812 12.6094Z" fill="#1F2041" fill-opacity="0.5"/>
                        </svg>
                        {{logout.logout}}
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import * as types from "@/stores/modules/auth/types";

    export default {
        name: "sideBar",
        data() {
            return{
                menuList: "listOne",
                sideBar: {
                    descktop: "Рабочий стол",
                    search: "Поиск услуг",
                    orders: "Заказы",
                    place_block: {
                        name: "Блоки мест",
                        child: {
                            schedule: "Расписание",
                            blocks: "Блоки"
                        }
                    },
                    answers: "Ответы",
                    messages: "Сообщения",
                    control: {
                        name: "Управление",
                        child: {
                            company: "Компании",
                            finance: "Финансы",
                            rights: {
                                name: "Права",
                                child: {
                                    groups: "Групы",
                                    employees: "Сотрудники"
                                }
                            },
                            fees: "Сборы",
                            mailing: "Рассылки",
                            reference_books: "Справочники",
                            route: "Маршрут-квитанция",
                            history: "История",
                        }
                    },
                },
                logout: {
                    reference: "Справка",
                    logout: "Выход"
                }
            }
        },
        computed: {
            menuShow() {
                return this.$store.getters["layouts/getMenuShow"]
            }
        },
        methods: {
            selectedMenu(list) {
                this.menuList = list;
            },
            logOut() {
                this.$store.dispatch("auth/" + types.A_LOGOUT)
                this.$router.push('/login');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .side-bar-wrap {
        background-color: #eee;
        display: inline-flex;
        justify-content: space-between;
        flex-direction: column;
        height: 100%;
        min-height: 100vh;
        padding-top: 13px;
        transition: .2s all;
        &.menu-show{
            transform: translateX(-100%);
            transform-origin: 0 50%;
            position: absolute;
        }

        /deep/.v-list{
            background: #eee;
            padding: 0;
            & .v-list__tile{
                padding: 0;
                height: auto;
                & .v-list__tile__action{
                    min-width: 0;
                }
            }
        }

        .router-link {
            width: 100%;
            display: flex;
            align-items: center;
            font-family: "Montserrat";
            font-weight: 600;
            font-size: 12px;
            color: rgba(31, 32, 65, 0.75);
            padding: 10px 48px 9px 26px;
            cursor: pointer;
            transition: .2s all;

            /deep/.v-list__tile__title{
                font-family: "Montserrat";
                font-weight: 600;
                color: rgb(31, 32, 65);
                transition: .2s all;
            }
            path{
                transition: .2s all;
            }
            &:hover{
                background-color: #61E185;
                path{
                    fill: #fff;
                    fill-opacity: 1;
                }
                /deep/.v-list__tile__title{
                    color: #fff;
                }
            }
            /*&.router-link-exact-active.router-link-active {*/
            /*    background-color: #61E185;*/
            /*    path{*/
            /*        fill: #fff;*/
            /*        fill-opacity: 1;*/
            /*    }*/
            /*    /deep/.v-list__tile__title{*/
            /*        color: #fff;*/
            /*    }*/
            /*}*/
        }

        & .bg-green{
            background-color: #61E185;
            path{
                fill: #fff;
                fill-opacity: 1;
            }
            /deep/.v-list__tile__title.first-title{
                color: #fff;
            }
        }

        .fees-child{
            color: rgb(31, 32, 65);
            text-decoration: none;
            width: 100%;
            font-size: 12px;
            font-family: "Montserrat";
            font-weight: 600;
            padding: 4px 0 4px 59px;
            transition: .2s all;
            cursor: pointer;
            &:hover{
                color: #fff;
                background-color: #61E185;
            }
            &.router-link-exact-active.router-link-active {
                background-color: #61E185;
                color: white;
            }
        }

        /deep/.v-list__group__header{
            transition: .2s all;

            & .v-list__group__header__append-icon{
                padding: 0 16px;
            }
            &:hover{
                background-color: #61E185;
                path{
                    fill: #fff;
                    fill-opacity: 1;
                }
                /deep/.v-list__tile__title{
                    color: #fff;
                }
            }
        }
        .blocks-child.router-link-exact-active{
            color: #fff;
            background-color: #61E185;
        }
        /deep/.router-active-parent{
            + /deep/.v-list__tile__title{
                color: #fff;
            }
            /deep/.v-list__group__header {
                background-color: #61E185;
            }
        }
        /deep/.v-list__tile__title.pl-6{
            padding-left: 59px;
            font-size: 12px;
            font-weight: 600;
        }

        svg {
            margin-right: 10px;

            path {
                fill: rgb(31, 32, 65);
                fill-opacity: 0.5;
            }
        }
        /deep/.v-list__tile{
            a{
                color: rgb(31, 32, 65);
                background-color: #EEEEEE;
                text-decoration: none;
                width: 100%;
                font-size: 12px;
                font-family: "Montserrat";
                font-weight: 600;
                padding: 4px 0 4px 59px;
                transition: .2s all;
                cursor: pointer;
                &.pl-10{
                    padding-left: 100px;
                }
                &:hover{
                    color: #fff;
                    background-color: #61E185;
                }
            }
        }
    }

    /*/deep/.v-list__group--active .v-list__group__header.v-list__group__header--active{*/
    /*    background-color: #61E185;*/
    /*    /deep/.v-list__tile__title{*/
    /*        color: #fff;*/
    /*    }*/
    /*}*/

    .logout {

        ul{
            margin: 0;
            padding: 0;
            li {
                list-style: none;
                padding: 15px 48px 5px 26px;

                a,span {
                    color: rgb(31, 32, 65);
                    font-family: "Montserrat";
                    font-size: 12px;
                    font-weight: 600;
                    text-decoration: none;
                    transition: .2s all;
                    cursor: pointer;
                    path{
                        transition: .2s all;
                    }
                    &:hover{
                        color: #61E185;
                        & path{
                            fill: #61E185;
                        }
                    }
                }
            }
        }
    }

</style>