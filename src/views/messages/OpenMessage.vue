<template>
    <div class="open-message-content">
        <div class="headline">
            <h5>Обращение в службу поддержки</h5>
        </div>
        <div
                class="message-area"
        >
            <div
                    class="messages-content"
                    v-for="(item, key) in messages"
                    :key="key"
            >
                <div v-if="item.sender == sender" class="user-message">
                    <div class="message">
                        <div class="message-info">
                            <span class="standard-text">{{item.sender}}</span>
                            <span class="standard-text">{{item.time}}</span>
                        </div>
                        <p class="message-content">
                            {{item.text}}
                        </p>
                    </div>
                </div>
                <div v-else class="support-message">
                    <div class="message">
                        <div class="message-info">
                            <span class="standard-text">{item.sender}}</span>
                            <span class="standard-text">{{item.time}}</span>
                        </div>
                        <p class="message-content">
                            {{item.text}}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="paragraph">
            <cTextArea
                    :class="{ 'area--error': $v.message.$error }"
                    class="message-input"
                    textPlaceholder="Введите текст сообщения"
                    v-model="$v.message.$model"
            ></cTextArea>
            <div class="error-text" v-if="$v.message.$error">Заполните поле</div>
        </div>

        <div class="send-hide-message">
            <cButton
                    @click="sendMessages()"
                    buttonValue="Отправить"
                    buttonPadding="15px 27px 15px 24px"
            ></cButton>
            <cButton
                    buttonValue="Закрыть диалог"
                    buttonColor="#FFA927"
                    buttonPadding="15px 39px 15px 37px"
            ></cButton>
        </div>
    </div>
</template>

<script>
    import cTextArea from "@/components/base_components/cTextArea";
    import cButton from "@/components/base_components/cButton";
    import * as types from "@/stores/modules/messages/types"
    import {validations} from '@/validations/sendMassage.js'

    export default {
        name: "OpenMessage",
        components: {
            cTextArea,
            cButton
        },
        data() {
            return {
                messages: [],
                sender: '',
                message: ''
            }
        },
        validations:validations,
        mounted() {
            this.getMessages()
        },
        methods: {
            sendMessages() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    let message = {
                        conversation_id: this.$route.params.id,
                        text: this.message
                    }
                    this.$store.dispatch("messages/" + types.A_SEND_MESSAGES, message)
                        .then( () => {
                            this.getMessages();
                            this.message = '';
                            this.$nextTick(() => {this.$v.$reset()})
                        })
                }
            },
            getMessages(){
                this.$store.dispatch("messages/" + types.A_GET_MESSAGES, this.$route.params.id)
                    .then( res => {
                        this.messages = res.data;
                        this.sender = res.data[0].sender
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .open-message-content{
        padding: 0 33px 50px;
        min-width: 1000px;
    }
    .headline{
        padding: 28px 0 30px;
        h5{
            margin: 0;
            font-family: "Montserrat";
            font-weight: bold;
            font-size: 12px;
            line-height: normal;
            text-transform: uppercase;
            color: #1F2041;
        }
    }
    .message-area{
        max-width: 600px;
        overflow: auto;
        height: 300px;
        background: #F6F6F6;
        border: 1px solid #E0E4EE;
        box-sizing: border-box;
        border-radius: 4px 4px 0 0;
        padding: 14px 18px;

        .message-info{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
            padding: 0 5px;
        }
        .support-message, .user-message{
            display: flex;
            .message{
                width: 50%;
            }
            .message-content{
                padding: 13px 21px;
                border-radius: 10px;
                font-family: 'Montserrat';
                font-size: 12px;
                line-height: 18px;
            }
        }
        .support-message{
            justify-content: flex-end;

            .message-content{
                background: #575870;
                color: #FFFFFF;
            }
        }
        .user-message{
            .message-content{
                background: #FFFFFF;
                border: 1px solid #E0E4EE;
            }
        }
    }
    .send-hide-message{
        display: flex;
        /deep/.c-button{
            margin-right: 15px;
        }
    }
    .message-input{
        max-width: 600px;
        margin: 20px 0;
    }
    .standard-text{
        font-family: "Montserrat";
        font-weight: normal;
        font-size: 12px;
        line-height: normal;
        color: #6B6B81;
    }
    .paragraph{
        position: relative;
    }
    .error-text{
        position: absolute;
        bottom: -8px;
        color: red;
        font-family: "Montserrat";
        font-weight: normal;
        font-size: 12px;
        line-height: normal;
    }
    /deep/.c-textarea.area--error textarea{
        border-color: red;
        box-shadow: 0 0 2px 0px rgba(255, 0, 0, 0.6);
    }
</style>