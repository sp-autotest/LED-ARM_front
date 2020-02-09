<template>
    <div class="group-content">
        <div class="headline">
            <h3 class="headline-text">Группы</h3>
        </div>
        <div class="group-content-position">
            <div class="group-add-wrap">
                <div class="group-headline">
                    <h5>Добавить группу</h5>
                </div>
                <div class="group-wrap">
                    <div class="group-add">
                        <h5>Название группы</h5>
                        <div class="paragraph">
                            <cInput
                                    :class="{ 'form-group--error': $v.sendParam.name.$error }"
                                    v-model="$v.sendParam.name.$model"
                                    inputPadding="9px 10px"
                            ></cInput>
                            <div class="error-text" v-if="$v.sendParam.name.$error">Заполните поле</div>
                        </div>
                        <cButton
                                @click="addGroup()"
                                buttonValue="Добавить"
                        ></cButton>
                    </div>
                    <div class="group-list">
                        <div
                                v-for="item in groups"
                                :key="item.id"
                                :class="['group',{'selected': groupSelected == item.id}]"
                                @click="selectGroup(item.id)"
                        >
                            <span class="standard-text">{{item.name}}</span>
                            <span v-if="item.id != 12" class="delete-icon" @click="deleteGroup(item.id)">
                                <svg  width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                        d="M3.74609 12.2539C4.94141 13.4258 6.35938 14.0117 8 14.0117C9.64062 14.0117 11.0469 13.4258 12.2188 12.2539C13.4141 11.0586 14.0117 9.64062 14.0117 8C14.0117 6.35937 13.4141 4.95312 12.2188 3.78125C11.0469 2.58594 9.64062 1.98828 8 1.98828C6.35938 1.98828 4.94141 2.58594 3.74609 3.78125C2.57422 4.95312 1.98828 6.35937 1.98828 8C1.98828 9.64062 2.57422 11.0586 3.74609 12.2539ZM2.69141 2.72656C4.16797 1.25 5.9375 0.511719 8 0.511719C10.0625 0.511719 11.8203 1.25 13.2734 2.72656C14.75 4.17969 15.4883 5.9375 15.4883 8C15.4883 10.0625 14.75 11.832 13.2734 13.3086C11.8203 14.7617 10.0625 15.4883 8 15.4883C5.9375 15.4883 4.16797 14.7617 2.69141 13.3086C1.23828 11.832 0.511719 10.0625 0.511719 8C0.511719 5.9375 1.23828 4.17969 2.69141 2.72656ZM4.23828 7.26172H11.7617V8.73828H4.23828V7.26172Z"
                                        fill="#FF5B27"/>
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="group-right-list-wrap">
                <div class="group-rights-headline">
                    <h5>Список прав</h5>
                </div>
                <div class="group-right-list">
                    <div class="group-right-list-header">
                        <span>Права</span>
                        <span>Активность</span>
                    </div>
                    <div class="group-right-list-header">
                        <span>Права</span>
                        <span>Активность</span>
                    </div>
                    <div
                            v-for="(item, index) in permissionList"
                            :key="index"
                            class="group-right-list-content"
                    >
                        <cSelect
                                v-model="permission[index]"
                                @selected="permission[index] = $event"
                                :inputLabel="item.name_ru"
                                @click.native="permissionUpdate(item.name, permission[index])"
                        ></cSelect>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as types from "@/stores/modules/controls/group/types";
    import * as globalTypes from "@/stores/types";
    import { required } from 'vuelidate/lib/validators'

    import cInput from "@/components/base_components/cInput";
    import cSelect from "@/components/base_components/cSelect";
    import cButton from "@/components/base_components/cButton";

    export default {
        name: "Group",
        components: {
            cInput,
            cSelect,
            cButton,
        },
        data() {
            return{
                groupSelected: "",
                groups: [],
                permissionList: [],
                permission: [],
                sendParam: {
                    name: "",
                },
                permissionSelectedList:[]
            }
        },
        validations: {
            sendParam: {
                name: {
                    required
                }
            }
        },
        mounted() {
            this.$store.dispatch("group/" + types.A_GET_GROUP)
                .then( res => {
                    this.groups = res.data.groups
                    console.log(this.groups);
                })
        },
        methods: {
            addGroup() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    this.$store.dispatch("group/" + types.A_ADD_GROUP, this.sendParam)
                        .then( res => {
                            this.$store.dispatch( globalTypes.A_SET_KEY)
                        })
                }
            },
            deleteGroup(id) {
                this.$store.dispatch("group/" + types.A_DELETE_GROUP, {id: id})
                    .then( res => {
                        console.log(res);
                        this.$store.dispatch( globalTypes.A_SET_KEY)
                    })
            },
            selectGroup(id) {
                this.$store.dispatch("group/" + types.A_GET_PERMISSION)
                    .then( res => {
                        let permissionRusName = [                // permissions name by Russian
                            'рабочего стола. см. отмененые запросы',
                            'рабочего стола. писать сообщение',
                            'поисковый индекс',
                            'поиск-авиа индекс',
                            'поиск-авиа бронирование',
                            'индекс заказов',
                            'заказы видеть все заказы',
                            'заказы видеть ваши заказы',
                            'заказы ввод-заказ',
                            'заказы открытый заказ',
                            'заказы закрыть заказ',
                            'заказы обработка заказов',
                            'отмена услуг',
                            'услуги блок-сервис',
                            'услуги по выдаче билетов',
                            'услуги разгрузки-мк',
                            'услуги возврат-запрос',
                            'индекс сообщений',
                            'отправка сообщений',
                            'индекс отчетов',
                            'отчеты создать отчет',
                            'отчеты чтобы превзойти',
                            'отчеты по электронной почте',
                            'административный указатель',
                            'управляющая компания-создать',
                            'список компаний-администраторов',
                            'административный доступ к цитатам',
                            'настройки администрирования',
                            'административные сборы-настройки',
                            'административная комиссия-настройки',
                            'Администрация создания пользователя',
                            'администрирование пользователей-разрешений',
                            'сброс пароля администратора',
                            'административная рассылка-настройка',
                            'административные группы',
                            'история администрации',
                            'финансовый индекс',
                            'финансовое выставление счетов',
                            'финансовый список-счет',
                            'пополнение счета-фактуры',
                            'административные словари',
                        ];

                        this.permissionList = res.data.permissions
                        for (let i = 0; i < this.permissionList.length; i++){
                            this.$set(this.permission, i , false)
                            this.permissionList[i].name_ru = permissionRusName[i] // permissions name translate Russian
                        }
                        this.groupSelected = id;
                        this.$store.dispatch("group/" + types.A_GETPERMISSION_BY_GROUP, {id: id})
                            .then( res => {
                                this.permission = [];
                                console.log(res);
                                this.permissionSelectedList = res.data.permissions
                                this.permissionList.filter( (val, key) => {
                                    res.data.permissions.filter( val2 => {
                                        if (val.name == val2){
                                            this.$set(this.permission, key, true)

                                        }
                                    })

                                })
                            })
                    })
            },
            permissionUpdate(permission, status){
                if (status){
                    this.permissionSelectedList.push(permission)
                }else {
                    this.permissionSelectedList = this.permissionSelectedList.filter(val =>{
                        if(permission != val){
                            return val
                        }
                    })
                }
                this.$store.dispatch("group/" + types.A_UPDATE_PERMISSION, {
                    id: this.groupSelected,
                    permissions: this.permissionSelectedList
                })
                    .then( res => {
                        console.log(res);
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .group-content{
        padding: 0 33px 50px;
        min-width: 1000px;
    }
    .headline{
        padding: 26px 0 19px;
        margin-bottom: 20px;
        border-bottom: 1px solid rgba(31, 32, 65, 0.05);
        h3{
            margin: 0;
        }
    }

    .group-content-position{
        display: grid;
        grid-template-columns: 300px 1fr;
        align-items: start;
        grid-gap: 20px;
    }
    .group-add-wrap{
        border: 1px solid #dedede;
        border-radius: 3px;
        h5{
            font-family: "Montserrat";
            font-weight: bold;
            font-size: 12px;
            line-height: normal;
            color: #1F2041;
            margin: 0;
        }
        .group-headline{
            padding: 12px 17px;
            background-color: #dedede;
        }
        .group-wrap{
            padding: 12px 17px;
            .group-add{
                display: grid;
                margin-bottom: 15px;
                /deep/.c-input {
                    margin: 5px 0 15px;
                    & input{
                        min-width: unset;
                        width: 100%;
                    }
                }
                /deep/.c-button{
                    justify-self: end;
                }
                .paragraph{
                    position: relative;
                }
            }
            .group-list{
                display: grid;
                grid-gap: 10px;
                .group{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 7px 12px;
                    border: 1px solid #dedede;
                    border-radius: 3px;
                    transition: all .2s;
                    cursor: pointer;
                    &:hover{
                        background-color: #eeeeee;
                    }
                    &.selected{
                        background-color: #eeeeee;
                    }
                }
            }
        }
    }
    .group-right-list-wrap{
        border: 1px solid #dedede;
        border-radius: 3px;
        h5{
            font-family: "Montserrat";
            font-weight: bold;
            font-size: 12px;
            line-height: normal;
            color: #1F2041;
            margin: 0;
        }
        .group-rights-headline{
            padding: 12px 17px;
            background-color: #dedede;
        }
        .group-right-list{
            padding: 12px 17px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            .group-right-list-header{
                display: flex;
                justify-content: space-between;
                padding: 12px 20px;
                border-bottom: 1px dashed #dedede;
                span{
                    font-family: "Montserrat";
                    font-weight: bold;
                    font-size: 12px;
                    line-height: normal;
                    color: #1F2041;
                }
            }
            .group-right-list-content{

                /deep/.c-select{
                    padding: 12px 5px;
                    border-bottom: 1px dashed #dedede;
                    &:last-child{
                        border-bottom: none;
                    }
                    & .select-label{
                        grid-template-columns: 1fr 50px;
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
        }
    }

    .headline-text{
        font-family: "Montserrat";
        font-weight: bold;
        font-size: 12px;
        line-height: normal;
        text-transform: uppercase;
        color: #1F2041;
    }
    .standard-text{
        font-family: "Montserrat";
        font-weight: normal;
        font-size: 12px;
        line-height: normal;
        color: #6B6B81;
    }
    .error-text{
        position: absolute;
        bottom: -4px;
        color: red;
        font-family: "Montserrat";
        font-weight: normal;
        font-size: 12px;
        line-height: normal;
    }
    .form-group--error {
        /deep/input {
            border-color: red;
            box-shadow: 0 0 2px 0px rgba(255, 0, 0, 0.6);
        }
    }
</style>