<template>
    <div class="add-message">
        <v-dialog
                v-model="show_hide"
        >
            <v-card>
                <v-card-text>
                    <h5 class="headline-text">Создать чат</h5>
                    <div class="add-messages-form">
                        <cSelectInput
                                v-model="secondUser"
                                itemText="name"
                                itemValue="id"
                                :selectItems="usersList"
                        ></cSelectInput>
                    </div>
                </v-card-text>
                <div class="d-flex">
                    <div class="save-cancel-wrap">
                        <cButton
                                @click="addConversation()"
                                buttonValue="Создать"
                                buttonPadding="10px 63px 10px 63px"
                        ></cButton>
                        <cButton
                                buttonValue="Отмена"
                                buttonColor="#cc4b4b"
                                buttonPadding="10px 44px 10px 44px"
                                @click="show_hide = false"
                        ></cButton>
                    </div>
                    <v-card-actions>
                        <v-btn
                                color="green darken-1"
                                flat="flat"
                                @click="show_hide = false"
                        >
                            Закрыть
                        </v-btn>
                    </v-card-actions>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import cButton from "@/components/base_components/cButton";
    import cSelectInput from "@/components/base_components/cSelectInput";
    import * as types from "@/stores/modules/messages/types"
    import * as globalTypes from "@/stores/types";

    export default {
        name: "addMessagesPopup",
        components: {
            cButton,
            cSelectInput
        },
        props: {
            showPopup: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {
                show_hide: this.showModal ? this.showModal : false,
                usersList: [],
                secondUser: null
            }
        },
        mounted() {
            this.$store.dispatch("messages/" + types.A_GET_USERS)
                .then( res => {
                    let result = []
                    res.data.users.filter( val => {
                        console.log(val);
                        result.push({
                            name: `Е:маил ${val.email}`,
                            id: val.id
                        })
                    })
                    this.usersList = result
                })
        },
        methods: {
            addConversation() {
                this.$store.dispatch("messages/" + types.A_CREATE_CONVERSATION, {
                    users: [
                        {id: this.secondUser}
                    ]
                })
                    .then( res => {
                        this.show_hide = false
                        this.$store.dispatch( globalTypes.A_SET_KEY)
                    })
            }
        },
        watch: {
            show_hide(val) {
                this.$emit('hidePopup', val)
            },
            showPopup() {
                this.show_hide = this.showPopup;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .save-cancel-wrap{
        display: grid;
        grid-template-columns: auto auto 1fr;
        grid-gap: 15px;
        .c-button button{
            width: 100%;
            max-width: unset;
        }
    }

    /deep/.v-dialog{
        max-width: 600px;
    }

    /deep/.c-input input{
        min-width: unset;
        width: 65px;
    }
    /deep/.v-menu{
        display: none;
    }

    /deep/.v-card__text{
        padding-bottom: 0;
    }

    /deep/.v-card__actions{
        display: flex;
        justify-content: flex-end;
    }

    .d-flex{
        display: flex;
        justify-content: space-between;
        padding-left: 16px;
    }
    .add-messages-form{
        padding: 15px 0;
    }
    .headline-text{
        font-family: "Montserrat";
        font-weight: bold;
        font-size: 16px;
        line-height: normal;
        color: #575870;
    }
</style>