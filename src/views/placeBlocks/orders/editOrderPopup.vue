<template>
    <div class="popup">
        <v-dialog
                v-model="show_hide"
        >
            <v-card>
                <v-card-text>
                    <h5 class="bold-text">Редактирование лимита</h5>
                    <p class="standard-text">Введите новый time limit</p>
                    <div class="date-wrap">
                        <cDate
                                v-model.trim="date"
                                @dateChangeTwo="date = $event"
                        ></cDate>
                        <cInput
                                v-model="time"
                                :inputMask="'##:##'"
                                inputPadding="9px 10px"
                                @input="timeFormat()"
                        ></cInput>
                    </div>
                </v-card-text>
                <div class="d-flex">
                    <div class="save-cancel-wrap">
                        <cButton
                                buttonValue="Ок"
                                buttonPadding="10px 63px 10px 63px"
                                @click.native="submit()"
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
    import cInput from "@/components/base_components/cInput";
    import cDate from "@/components/base_components/cDate";
    import cButton from "@/components/base_components/cButton";

    export default {
        name: "popup",
        components: {
            cInput,
            cDate,
            cButton
        },
        props: {
            showModal: {
                type: Boolean,
                default: false
            },
            popupDate: {
                type: String,
                default: ''
            },
            bookingDate: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                show_hide: this.showModal ? this.showModal : false,
                date: '',
                time: '',
                oldDate: '',
                sendParam: {
                    id: null,
                    time_limit: null
                }
            }
        },
        mounted() {

        },
        methods: {
            timeFormat() {
                if(this.time) {
                    let time = this.time.split('')
                    if (time.length >= 2 && (parseInt(time[0] + time[1])) > 23){
                        time[0] = 2;
                        time[1] = 3;
                    }
                    if (time.length == 5 && (parseInt(time[3] + time[4])) > 59){
                        time[3] = 5;
                        time[4] = 9;
                    }
                    this.time = time.join('');
                } else {
                    this.time = "";
                }
            },
            submit() {
                let newDate = this.date + " " + this.time
                let oldDateSeconds = new Date(this.oldDate).getTime();
                let newDateSeconds = new Date(newDate).getTime();
                let time_limit = (newDateSeconds - oldDateSeconds) / 1000;
                this.$emit('newDate', {
                    new_date: newDate,
                    time_limit: time_limit
                });
                this.show_hide = false
            }
        },
        computed: {

        },
        watch: {
            popupDate(val) {
                console.log(val);
                let res = val.split(' ')
                this.date = res[0]
                this.time = res[1]
            },
            bookingDate(val) {
                this.oldDate = val
            },
            show_hide(val) {
                this.$emit('hidePopup', val)
            },
            showModal(val) {
                this.show_hide = this.showModal;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .date-wrap{
        display: grid;
        grid-template-columns: 1fr 65px;
        grid-gap: 15px;
        padding-right: 60%;
    }

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