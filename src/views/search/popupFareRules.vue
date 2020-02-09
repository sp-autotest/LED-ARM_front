<template>
    <div class="popup">
        <v-dialog
                v-model="show_hide"
        >
            <v-card>

                <v-card-text>
                    <div class="flight_details">
                        <div class="flight_details_travel">
                            <div class="flight_details_travel_title">
                                <p class="bold-text">{{text}}</p>
                            </div>
                        </div>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                            color="green darken-1"
                            flat="flat"
                            @click="show_hide = false"
                    >
                        Закрыть
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        name: "popup-fare-rules",
        props: {
            showModal: {
                type: Boolean,
                default: false
            },
            text: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                show_hide: this.showModal ? this.showModal : false,
            }
        },
        watch: {
            show_hide(val) {
                this.$emit('hidePopup', val)
            },
            showModal() {
                this.show_hide = this.showModal;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .flight_details {
        padding: 0 50px;
        p {
            margin: 0;
            text-align: center;
        }
        .flight_details_airlines, .flight_details_travel {
            margin-top: 25px;
        }
    }

    /deep/.v-card__actions{
        display: flex;
        justify-content: flex-end;
    }
    /deep/.v-dialog{
        max-width: 800px;
    }

    .bold-text{
        font-family: "Montserrat";
        font-weight: bold;
        font-size: 15px;
        line-height: normal;
        color: #575870;
    }
</style>