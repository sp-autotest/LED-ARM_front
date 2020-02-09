<template>
    <div class="message-wrap">
        <div class="headline">
            <h5>Обращение в службу поддержки</h5>
        </div>
        <div class="message-area">
            <div class="user-message">
                <div class="message">
                    <div class="message-info">
                        <span class="standard-text">Иванов Е.А</span>
                        <span class="standard-text">29.11.2018 17:44</span>
                    </div>
                    <p class="message-content">
                        Не могу забронировать услугу! помогите!
                        Что мне делать?!
                    </p>
                </div>
            </div>
            <div class="support-message">
                <div class="message">
                    <div class="message-info">
                        <span class="standard-text">Петров Е.В</span>
                        <span class="standard-text">29.11.2018 17:52</span>
                    </div>
                    <p class="message-content">
                        Укажите верный номер паспорта
                    </p>
                </div>
            </div>
        </div>
        <cTextArea
                class="message-input"
                textPlaceholder="Введите текст сообщения"
        ></cTextArea>
        <div class="send-hide-message">
            <cButton
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

    export default {
        name: "Messages",
        components: {
            cTextArea,
            cButton
        }
    }
</script>

<style lang="scss" scoped>
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
        min-height: 300px;
        background: #F6F6F6;
        border: 1px solid #E0E4EE;
        box-sizing: border-box;
        border-radius: 4px 4px 0px 0px;
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
</style>