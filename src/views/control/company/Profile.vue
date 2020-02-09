<template>
    <div class="profile-content">
        <div class="search-add-profile">
            <div class="add-profile">
                <router-link tag="span" class="router-link" to="/control/company/add">
                    <cButton buttonValue="Добавить компанию"></cButton>
                </router-link>
            </div>
            <div class="search-profile">
                <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                ></v-text-field>
            </div>
        </div>
        <div class="list-group">
            <div class="list-group-tittle">
                <span class="header-column bold-text">Название компании</span>
                <span class="header-column bold-text">Телефон</span>
                <span class="header-column bold-text">Электронная почта</span>
                <span class="header-column bold-text">Менеджер</span>
                <span class="header-column bold-text">Валюта компании</span>
            </div>
            <div
                    v-for="(item, key) in companies"
                    class="list-group-items"
                    :key="item.id"
            >
                <div class="list-group-column">
                    <span v-if="showPlus[key+1]" @click="showHidePlus(key+1, false, item.childs)">
                        <svg class="mr-2" height="16px" width="16px" viewBox="0 0 512 512"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fill="#5CDF81"
                                  d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531s26.628906 132.667969 74.980469 181.019531c48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.640625 74.980469-181.019531s-26.628906-132.667969-74.980469-181.019531zm-181.019531 397.019531c-119.101562 0-216-96.898438-216-216s96.898438-216 216-216 216 96.898438 216 216-96.898438 216-216 216zm20-236.019531h90v40h-90v90h-40v-90h-90v-40h90v-90h40zm0 0"/>
                        </svg>
                    </span>
                    <span v-else @click="showHidePlus(key+1, true)">
                        <svg class="mr-2" width="16" height="16" viewBox="0 0 16 16" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.74609 12.2539C4.94141 13.4258 6.35938 14.0117 8 14.0117C9.64062 14.0117 11.0469 13.4258 12.2188 12.2539C13.4141 11.0586 14.0117 9.64062 14.0117 8C14.0117 6.35937 13.4141 4.95312 12.2188 3.78125C11.0469 2.58594 9.64062 1.98828 8 1.98828C6.35938 1.98828 4.94141 2.58594 3.74609 3.78125C2.57422 4.95312 1.98828 6.35937 1.98828 8C1.98828 9.64062 2.57422 11.0586 3.74609 12.2539ZM2.69141 2.72656C4.16797 1.25 5.9375 0.511719 8 0.511719C10.0625 0.511719 11.8203 1.25 13.2734 2.72656C14.75 4.17969 15.4883 5.9375 15.4883 8C15.4883 10.0625 14.75 11.832 13.2734 13.3086C11.8203 14.7617 10.0625 15.4883 8 15.4883C5.9375 15.4883 4.16797 14.7617 2.69141 13.3086C1.23828 11.832 0.511719 10.0625 0.511719 8C0.511719 5.9375 1.23828 4.17969 2.69141 2.72656ZM4.23828 7.26172H11.7617V8.73828H4.23828V7.26172Z"
                                  fill="#FF5B27"/>
                        </svg>
                    </span>
                    <span @click="routerPush(item)" class="standard-text">{{item.company_name}}</span>
                </div>
                <div @click="routerPush(item)" class="list-group-column">
                    <span class="standard-text">{{item.phone}}</span>
                </div>
                <div @click="routerPush(item)" class="list-group-column">
                    <span class="standard-text">{{item.report_mail}}</span>
                </div>
                <div @click="routerPush(item)" class="list-group-column">
                    <span class="standard-text">{{item.manager ? item.manager.profile.first_name : '-'}} {{item.manager ? item.manager.profile.second_name : ''}}</span>
                </div>
                <div @click="routerPush(item)" class="list-group-column">
                    <span class="standard-text">{{item.currency.code_literal_iso_4217}}</span>
                </div>
                <div v-if="!showPlus[key+1]" class="children">
                    <div
                            v-for="(child1, index1) in item.childs"
                            :key="child1.id"
                            class="children-one"
                    >
                        <div class="list-group-column">
                            <span v-if="showPlusChildOne[`${key+1}${index1}`]" @click="showHidePlusChildOne(key+1, false, index1, child1.childs)">
                                <svg class="mr-2" height="16px" width="16px" viewBox="0 0 512 512"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#5CDF81"
                                          d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531s26.628906 132.667969 74.980469 181.019531c48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.640625 74.980469-181.019531s-26.628906-132.667969-74.980469-181.019531zm-181.019531 397.019531c-119.101562 0-216-96.898438-216-216s96.898438-216 216-216 216 96.898438 216 216-96.898438 216-216 216zm20-236.019531h90v40h-90v90h-40v-90h-90v-40h90v-90h40zm0 0"/>
                                </svg>
                            </span>
                            <span v-else @click="showHidePlusChildOne(key+1, true, index1)">
                                <svg class="mr-2" width="16" height="16" viewBox="0 0 16 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.74609 12.2539C4.94141 13.4258 6.35938 14.0117 8 14.0117C9.64062 14.0117 11.0469 13.4258 12.2188 12.2539C13.4141 11.0586 14.0117 9.64062 14.0117 8C14.0117 6.35937 13.4141 4.95312 12.2188 3.78125C11.0469 2.58594 9.64062 1.98828 8 1.98828C6.35938 1.98828 4.94141 2.58594 3.74609 3.78125C2.57422 4.95312 1.98828 6.35937 1.98828 8C1.98828 9.64062 2.57422 11.0586 3.74609 12.2539ZM2.69141 2.72656C4.16797 1.25 5.9375 0.511719 8 0.511719C10.0625 0.511719 11.8203 1.25 13.2734 2.72656C14.75 4.17969 15.4883 5.9375 15.4883 8C15.4883 10.0625 14.75 11.832 13.2734 13.3086C11.8203 14.7617 10.0625 15.4883 8 15.4883C5.9375 15.4883 4.16797 14.7617 2.69141 13.3086C1.23828 11.832 0.511719 10.0625 0.511719 8C0.511719 5.9375 1.23828 4.17969 2.69141 2.72656ZM4.23828 7.26172H11.7617V8.73828H4.23828V7.26172Z"
                                          fill="#FF5B27"/>
                                </svg>
                            </span>
                            <span @click="routerPush(child1)" class="standard-text">{{child1.company_name}}</span>
                        </div>
                        <div @click="routerPush(child1)" class="list-group-column">
                            <span class="standard-text">{{child1.phone}}</span>
                        </div>
                        <div @click="routerPush(child1)" class="list-group-column">
                            <span class="standard-text">{{child1.report_mail}}</span>
                        </div>
                        <div @click="routerPush(child1)" class="list-group-column">
                            <span class="standard-text">{{child1.manager ? child1.manager.profile.first_name : '-'}} {{child1.manager ? child1.manager.profile.second_name : ''}}</span>
                        </div>
                        <div @click="routerPush(child1)" class="list-group-column">
                            <span class="standard-text">{{child1.currency.code_literal_iso_4217}}</span>
                        </div>
                        <div v-if="!showPlusChildOne[`${key+1}${index1}`]" class="children">
                            <div
                                    v-for="(child2, index2) in child1.childs"
                                    :key="index2"
                                    class="children-two"
                            >
                                <div class="list-group-column">
                                    <span v-if="showPlusChildTwo[`${key+1}${index2}${key+1}`]" @click="showHidePlusChildTwo(key+1, index2, false, child2.childs)">
                                        <svg class="mr-2" height="16px" width="16px" viewBox="0 0 512 512"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path fill="#5CDF81"
                                                  d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531s26.628906 132.667969 74.980469 181.019531c48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.640625 74.980469-181.019531s-26.628906-132.667969-74.980469-181.019531zm-181.019531 397.019531c-119.101562 0-216-96.898438-216-216s96.898438-216 216-216 216 96.898438 216 216-96.898438 216-216 216zm20-236.019531h90v40h-90v90h-40v-90h-90v-40h90v-90h40zm0 0"/>
                                        </svg>
                                    </span>
                                    <span v-else @click="showHidePlusChildTwo(key+1, index2, true, child2.childs)">
                                    <svg class="mr-2" width="16" height="16" viewBox="0 0 16 16" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.74609 12.2539C4.94141 13.4258 6.35938 14.0117 8 14.0117C9.64062 14.0117 11.0469 13.4258 12.2188 12.2539C13.4141 11.0586 14.0117 9.64062 14.0117 8C14.0117 6.35937 13.4141 4.95312 12.2188 3.78125C11.0469 2.58594 9.64062 1.98828 8 1.98828C6.35938 1.98828 4.94141 2.58594 3.74609 3.78125C2.57422 4.95312 1.98828 6.35937 1.98828 8C1.98828 9.64062 2.57422 11.0586 3.74609 12.2539ZM2.69141 2.72656C4.16797 1.25 5.9375 0.511719 8 0.511719C10.0625 0.511719 11.8203 1.25 13.2734 2.72656C14.75 4.17969 15.4883 5.9375 15.4883 8C15.4883 10.0625 14.75 11.832 13.2734 13.3086C11.8203 14.7617 10.0625 15.4883 8 15.4883C5.9375 15.4883 4.16797 14.7617 2.69141 13.3086C1.23828 11.832 0.511719 10.0625 0.511719 8C0.511719 5.9375 1.23828 4.17969 2.69141 2.72656ZM4.23828 7.26172H11.7617V8.73828H4.23828V7.26172Z"
                                                  fill="#FF5B27"/>
                                        </svg>
                                    </span>
                                    <span @click="routerPush(child2)" class="standard-text">{{child2.company_name}}</span>
                                </div>
                                <div @click="routerPush(child2)" class="list-group-column">
                                    <span class="standard-text">{{child2.phone}}</span>
                                </div>
                                <div @click="routerPush(child2)" class="list-group-column">
                                    <span class="standard-text">{{child2.report_mail}}</span>
                                </div>
                                <div @click="routerPush(child2)" class="list-group-column">
                                    <span class="standard-text">{{child2.manager ? child2.manager.profile.first_name: '-'}} {{child2.manager ? child2.manager.profile.second_name : ''}}</span>
                                </div>
                                <div @click="routerPush(child2)" class="list-group-column">
                                    <span class="standard-text">{{child2.currency.code_literal_iso_4217}}</span>
                                </div>
                                <div v-if="!showPlusChildTwo[`${key+1}${index2}${key+1}`]" class="children">
                                    <div
                                            v-for="(child3, index3) in child2.childs"
                                            :key="index3"
                                            class="children-three"
                                    >
                                        <div class="list-group-column">
                                            <span v-if="showPlusChildThree[`${key+1}${index3}${key+1}${key+1}`]" @click="showHidePlusChildThree(key+1, index3, false, child1.childs)">
                                                <svg class="mr-2" height="16px" width="16px" viewBox="0 0 512 512"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path fill="#5CDF81"
                                                          d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531s26.628906 132.667969 74.980469 181.019531c48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.640625 74.980469-181.019531s-26.628906-132.667969-74.980469-181.019531zm-181.019531 397.019531c-119.101562 0-216-96.898438-216-216s96.898438-216 216-216 216 96.898438 216 216-96.898438 216-216 216zm20-236.019531h90v40h-90v90h-40v-90h-90v-40h90v-90h40zm0 0"/>
                                                </svg>
                                            </span>
                                            <span v-else @click="showHidePlusChildThree(key+1, index3, true, child1.childs)">
                                                <svg class="mr-2" width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M3.74609 12.2539C4.94141 13.4258 6.35938 14.0117 8 14.0117C9.64062 14.0117 11.0469 13.4258 12.2188 12.2539C13.4141 11.0586 14.0117 9.64062 14.0117 8C14.0117 6.35937 13.4141 4.95312 12.2188 3.78125C11.0469 2.58594 9.64062 1.98828 8 1.98828C6.35938 1.98828 4.94141 2.58594 3.74609 3.78125C2.57422 4.95312 1.98828 6.35937 1.98828 8C1.98828 9.64062 2.57422 11.0586 3.74609 12.2539ZM2.69141 2.72656C4.16797 1.25 5.9375 0.511719 8 0.511719C10.0625 0.511719 11.8203 1.25 13.2734 2.72656C14.75 4.17969 15.4883 5.9375 15.4883 8C15.4883 10.0625 14.75 11.832 13.2734 13.3086C11.8203 14.7617 10.0625 15.4883 8 15.4883C5.9375 15.4883 4.16797 14.7617 2.69141 13.3086C1.23828 11.832 0.511719 10.0625 0.511719 8C0.511719 5.9375 1.23828 4.17969 2.69141 2.72656ZM4.23828 7.26172H11.7617V8.73828H4.23828V7.26172Z"
                                                          fill="#FF5B27"/>
                                                </svg>
                                            </span>
                                            <span @click="routerPush(child3)" class="standard-text">{{child3.company_name}}</span>
                                        </div>
                                        <div @click="routerPush(child3)" class="list-group-column">
                                            <span class="standard-text">{{child3.phone}}</span>
                                        </div>
                                        <div @click="routerPush(child3)" class="list-group-column">
                                            <span class="standard-text">{{child3.report_mail}}</span>
                                        </div>
                                        <div @click="routerPush(child3)" class="list-group-column">
                                            <span class="standard-text">{{child3.manager ? child3.manager.profile.first_name : '-'}} {{child3.manager ? child3.manager.profile.second_name : ''}}</span>
                                        </div>
                                        <div @click="routerPush(child3)" class="list-group-column">
                                            <span class="standard-text">{{child3.currency.code_literal_iso_4217}}</span>
                                        </div>
                                        <div v-if="!showPlusChildThree[`${key+1}${index3}${key+1}${key+1}`]" class="children">
                                            <div
                                                    v-for="(child4, index4) in child3.childs"
                                                    :key="index4"
                                                    class="children-four"
                                            >
                                                <div class="list-group-column">
                                            <span v-if="showPlusChildFour[`${key+1}${index4}${key+1}${key+1}${key+1}`]" @click="showHidePlusChildFour(key+1, index4, false)">
                                                <svg class="mr-2" height="16px" width="16px" viewBox="0 0 512 512"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path fill="#5CDF81"
                                                          d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531s26.628906 132.667969 74.980469 181.019531c48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.640625 74.980469-181.019531s-26.628906-132.667969-74.980469-181.019531zm-181.019531 397.019531c-119.101562 0-216-96.898438-216-216s96.898438-216 216-216 216 96.898438 216 216-96.898438 216-216 216zm20-236.019531h90v40h-90v90h-40v-90h-90v-40h90v-90h40zm0 0"/>
                                                </svg>
                                            </span>
                                                    <span v-else @click="showHidePlusChildFour(key+1, index4, true)">
                                                <svg class="mr-2" width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M3.74609 12.2539C4.94141 13.4258 6.35938 14.0117 8 14.0117C9.64062 14.0117 11.0469 13.4258 12.2188 12.2539C13.4141 11.0586 14.0117 9.64062 14.0117 8C14.0117 6.35937 13.4141 4.95312 12.2188 3.78125C11.0469 2.58594 9.64062 1.98828 8 1.98828C6.35938 1.98828 4.94141 2.58594 3.74609 3.78125C2.57422 4.95312 1.98828 6.35937 1.98828 8C1.98828 9.64062 2.57422 11.0586 3.74609 12.2539ZM2.69141 2.72656C4.16797 1.25 5.9375 0.511719 8 0.511719C10.0625 0.511719 11.8203 1.25 13.2734 2.72656C14.75 4.17969 15.4883 5.9375 15.4883 8C15.4883 10.0625 14.75 11.832 13.2734 13.3086C11.8203 14.7617 10.0625 15.4883 8 15.4883C5.9375 15.4883 4.16797 14.7617 2.69141 13.3086C1.23828 11.832 0.511719 10.0625 0.511719 8C0.511719 5.9375 1.23828 4.17969 2.69141 2.72656ZM4.23828 7.26172H11.7617V8.73828H4.23828V7.26172Z"
                                                          fill="#FF5B27"/>
                                                </svg>
                                            </span>
                                                    <span @click="routerPush(child4)" class="standard-text">{{child4.company_name}}</span>
                                                </div>
                                                <div @click="routerPush(child4)" class="list-group-column">
                                                    <span class="standard-text">{{child4.phone}}</span>
                                                </div>
                                                <div @click="routerPush(child4)" class="list-group-column">
                                                    <span class="standard-text">{{child4.report_mail}}</span>
                                                </div>
                                                <div @click="routerPush(child4)" class="list-group-column">
                                                    <span class="standard-text">{{child4.manager ? child4.manager.profile.first_name : '-'}} {{child4.manager ? child4.manager.profile.second_name : ''}}</span>
                                                </div>
                                                <div @click="routerPush(child4)" class="list-group-column">
                                                    <span class="standard-text">{{child4.currency.code_literal_iso_4217}}</span>
                                                </div>
                                                <div v-if="!showPlusChildFour[`${key+1}${index4}${key+1}${key+1}${key+1}`]" class="children">
                                                    <div
                                                            v-for="(child5, index5) in child4.childs"
                                                            :key="index5"
                                                            class="children-five"
                                                    >
                                                        <div class="list-group-column">
                                                            <span @click="routerPush(child5)" class="standard-text">{{child5.company_name}}</span>
                                                        </div>
                                                        <div @click="routerPush(child5)" class="list-group-column">
                                                            <span class="standard-text">{{child5.phone}}</span>
                                                        </div>
                                                        <div @click="routerPush(child5)" class="list-group-column">
                                                            <span class="standard-text">{{child5.report_mail}}</span>
                                                        </div>
                                                        <div @click="routerPush(child5)" class="list-group-column">
                                                            <span class="standard-text">{{child5.manager ? child5.manager.profile.first_name : '-'}} {{child5.manager ? child5.manager.profile.second_name : '-'}}</span>
                                                        </div>
                                                        <div @click="routerPush(child5)" class="list-group-column">
                                                            <span class="standard-text">{{child5.currency.code_literal_iso_4217}}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-xs-right pt-2 pagination-wrap">
                <div class="rowPerPage">
                    <cSelectInput
                            v-model.trim="pagination.rowsPerPage"
                            :selectItems="pagination.rowsPerPageItems"
                            @input="pageChange()"
                            selectPlaceholder="Кол-во строк"
                    >
                    </cSelectInput>
                </div>
                <v-pagination
                        v-model="page"
                        :length="pagLength"
                        :total-visible="5"
                        @input="pageChange()"
                ></v-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import * as types from "@/stores/modules/controls/company/types";

    import cButton from "@/components/base_components/cButton";
    import cSelectInput from "@/components/base_components/cSelectInput";

    export default {
        name: "Profile",
        components: {
            cButton,
            cSelectInput,
        },
        data() {
            return {
                page: 1,
                showPlus: [],
                showPlusChildOne: [],
                showPlusChildTwo: [],
                showPlusChildThree: [],
                showPlusChildFour: [],
                showPlusChildFive: [],
                search: '',
                companies: [],
                pagination: {
                    rowsPerPage: 5,
                    rowsPerPageItems: [5, 10, 15, 20],
                },
            }
        },
        mounted() {
            this.$store.dispatch('company/' + types.A_GET_COMPANY)
                .then(res => {
                    let data = []
                    for (let i = 0; i < this.pagination.rowsPerPage; i++) {
                        if (res.data.companies[i]) {
                            data.push(res.data.companies[i])
                        }
                        this.$set(this.showPlus, i+1, true);
                    }
                    this.companies = data
                })
        },
        methods: {
            showHidePlus(key, boolean, child = null) {
                this.$set(this.showPlus, key, boolean);
                if (child) {
                    for (let i = 0; i < child.length; i++) {
                        this.$set(this.showPlusChildOne, key +""+ i, true);
                    }
                }
            },
            showHidePlusChildOne(key, boolean, index, child = null) {
                this.$set(this.showPlusChildOne, key +""+ index, boolean);
                if (child) {
                    for (let i = 0; i < child.length; i++) {
                        console.log(key + "" + i + "" + key);
                        this.$set(this.showPlusChildTwo, key +""+ i +""+ key , true);
                    }
                }
            },
            showHidePlusChildTwo(key1, key2, boolean, child = null) {
                this.$set(this.showPlusChildTwo, key1 +""+ key2 +""+ key1, boolean);
                if (child) {
                    for (let i = 0; i < child.length; i++) {
                        this.$set(this.showPlusChildThree, key1 +""+ i +""+ key1 +""+ key1, true);
                    }
                }
            },
            showHidePlusChildThree(key1, key2, boolean, child = null) {
                this.$set(this.showPlusChildThree, key1 +""+ key2 +""+ key1 +""+ key1, boolean);
                if (child) {
                    for (let i = 0; i < child.length; i++) {
                        this.$set(this.showPlusChildFour, key1 +""+ i +""+ key1 +""+ key1 +""+ key1, true);
                    }
                }
            },
            showHidePlusChildFour(key1, key2, boolean) {
                this.$set(this.showPlusChildFour, key1 +""+ key2 +""+ key1 +""+ key1 +""+ key1, boolean);
            },
            routerPush(data) {
                this.$store.dispatch("company/" + types.A_SET_CURRENT_COMPANY, data)
                    .then( () => {
                        this.$router.push(`/control/company/${data.id}/edit`)
                    })
            },
            pageChange() {
                let item = {
                    page: this.page,
                    rowsPerPage: this.pagination.rowsPerPage
                };
                this.companies = this.$store.getters["company/getCompanies"](item)
                for (let i = 0; i < this.companies.length; i ++) {
                    this.$set(this.showPlus, i+1, true);
                }
            }
        },
        computed: {
            pagLength() {
                let pages = this.$store.getters["company/getCompaniesLength"];
                return Math.ceil(pages / this.pagination.rowsPerPage)
            },
            rowPerPageSet: {
                get() {
                    return this.rowsPerPageItems
                },
                set(value) {
                    this.pagination.rowsPerPage = value
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .profile-content {
        padding: 28px 33px;
        min-width: 1000px;
    }

    .search-add-profile {
        display: grid;
        grid-template-columns: auto auto;

        .search-profile {
            justify-self: end;
            display: flex;
            align-items: center;
            /* _SEARCH_INPUT STYLE_ */
            /deep/ .v-text-field {
                padding: 0;
                margin: 0;
            }

            /deep/ .v-text-field > .v-input__control > .v-input__slot:before {
                display: none;
            }

            /deep/ .v-text-field > .v-input__control > .v-input__slot:after {
                display: none;
            }

            /deep/ .v-input {
                .v-label, input {
                    font-family: "Montserrat";
                    font-size: 12px;
                    line-height: 20px;
                    color: rgba(31, 32, 65, 0.75);
                    outline: none;
                }
            }

            /deep/ .v-text-field > .v-input__control > .v-input__slot {
                display: flex;
                border: 1px solid rgba(31, 32, 65, 0.5);
                border-radius: 4px;
                padding: 3px 10px;

                & .v-input__append-inner {
                    align-self: center;
                }
            }
        }
    }

    .list-group {
        margin-top: 20px;
        min-width: 900px;

        .list-group-tittle {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
        }

        .list-group-items {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            .list-group-column {
                cursor: pointer;
                &:first-child {
                    display: grid;
                    grid-template-columns: auto 1fr;
                    align-items: center;
                }
                svg {
                    cursor: pointer;
                }
            }
        }
        .children{
            grid-column: 1/6;
            .children-one, .children-two, .children-three, .children-four, .children-five{
                display: grid;
                grid-template-columns: repeat(5, 1fr);
            }
            .children-two, .children-three, .children-four{
                padding-left: 13px;
            }
            .children-five{
                padding-left: 29px;
            }
            .list-group-column {
                cursor: pointer;
                &:first-child {
                    display: grid;
                    grid-template-columns: auto 1fr;
                    align-items: center;
                    padding-left: 10px;
                }
                svg {
                    cursor: pointer;
                }
            }
        }
    }

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

    .standard-text {
        font-family: "Montserrat";
        font-weight: normal;
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
</style>