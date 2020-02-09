<template>
    <div
            class="c-date"
            @click="hide = false"
    >
        <span v-show="!valueTwo" class="label">{{dateLabel}}</span>
        <span :class="['date-format',{'focus': valueOne}]">гггг-мм-дд: формат</span>
        <v-menu
                :close-on-content-click="hide"
                v-model="valueOne"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
        >
            <template v-slot:activator="{ on }">
                <v-text-field
                        v-model="valueTwo"
                        return-masked-value
                        persistent-hint
                        prepend-icon="event"
                        v-on="on"
                ></v-text-field>
            </template>
            <v-date-picker
                    locale="ru"
                    v-model="valueTwo"
                    :min="minDate"
                    first-day-of-week="1"
                    :max="maxDate"
                    no-title
            >
                <div class="btn-wrap">
                    <button v-if="currentDayShow" @click="currentDay()">Сегодня</button>
<!--                    <button @click="hide = true">Готово</button>-->
                </div>
            </v-date-picker>
        </v-menu>
        <span v-if="plusValue != null" @click="datePlus(plusValue)" class="date-plus">{{"+"+plusValue}}</span>
    </div>
</template>

<script>
    export default {
        name: 'c-select',
        props: {
            value: {
                type: String,
                default: ""
            },
            dateMenuValue: {
                type:String,
                default: ''
            },
            dateEditableValue: {
                type:String,
                default: ''
            },
            plusValue: {
                type:Number,
                default: null
            },
            dateLabel: {
                type: String,
                default: ''
            },
            minDate: {
                type: String,
                default: '1910-01-01'
            },
            maxDate: {
                type: String,
                default: '2200-12-30'
            },
            currentDayShow: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                valueOne: typeof this.dateMenuValue === "undefined" ? "" : this.dateMenuValue,
                valueTwo: typeof this.dateEditableValue === "undefined" ? "" : this.dateEditableValue,
                hide: false,
                dateFormatted: '',
                minActiv: false,
                minActivDay: false,
                maxActiv: false,
                maxActivDay: false
            }
        },
        mounted() {

        },
        methods: {
            datePlus(numb) {
                let newDate = this.valueTwo.split("-");
                if (newDate != '' && newDate != null && newDate != undefined) {
                    newDate[0] = (parseInt(newDate[0]) + parseInt(numb)) + "";
                    newDate = newDate.join('-');
                    this.valueTwo = newDate;
                }
            },
            currentDay(){
                let date = new Date();
                let currentDate= null;
                if (date.getMonth()+1 < 10 && date.getDate() < 10) {
                    currentDate = date.getFullYear() + "-0" + (date.getMonth() + 1) + "-0" + date.getDate();
                }else if (date.getMonth()+1 < 10 && date.getDate() >= 10) {
                    currentDate = date.getFullYear() + "-0" + (date.getMonth() + 1) + "-" + date.getDate();
                }else if (date.getMonth()+1 >= 10 && date.getDate() < 10) {
                    currentDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-0" + date.getDate();
                }else if (date.getMonth()+1 >= 10 && date.getDate() >= 10) {
                    currentDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                }
                this.valueTwo = currentDate
            },
        },
        watch: {
            value(val) {
                let min = this.minDate;
                let max = this.maxDate;
                let date = val.split('');
                let minItem = min.split('');
                min = min.split('-');
                let maxItem = max.split('');
                max = max.split('-');

                if (date.length >= 4 && date[0] +''+ date[1] +''+ date[2] +''+ date[3] < min[0]){
                    date[0] = minItem[0];
                    date[1] = minItem[1];
                    date[2] = minItem[2];
                    date[3] = minItem[3];
                    this.minActiv = true;
                    this.maxActiv = false;
                }else if (date.length >= 4 && date[0] +''+ date[1] +''+ date[2] +''+ date[3] > max[0]){
                    date[0] = maxItem[0];
                    date[1] = maxItem[1];
                    date[2] = maxItem[2];
                    date[3] = maxItem[3];
                    this.maxActiv = true;
                    this.minActiv = false;
                }
                if (date.length >= 4) {
                    date[4] = '-'
                }
                if (date.length >= 7) {
                    date[7] = '-'
                }
                if (date.length >= 7 && date[5] +''+ date[6] <= min[1] && this.minActiv){
                    date[5] = minItem[5];
                    date[6] = minItem[6];
                    this.minActivDay = true;
                    this.maxActivDay = false;
                } else if (date.length >= 7 && date[5] +''+ date[6] >= max[1] && this.maxActiv){
                    date[5] = maxItem[5];
                    date[6] = maxItem[6];
                    this.minActivDay = false;
                    this.maxActivDay = true;
                }else if (date.length >= 7 && date[5] +''+ date[6] > 12){
                    date[5] = '1';
                    date[6] = '2';
                }else if (date.length > 5 && date.length < 7) {
                    this.minActivDay = false;
                    this.maxActivDay = false;
                }

                if (date.length >= 10 && date[8] +''+ date[9] < min[2] && this.minActivDay){
                    date[8] = minItem[8];
                    date[9] = minItem[9];
                } else if (date.length >= 10 && date[8] +''+ date[9] > max[2] && this.maxActivDay){
                    date[8] = maxItem[8];
                    date[9] = maxItem[9];
                }

                if (date.length >= 11){
                    date.pop()
                }
                if (date.length >= 10){
                    this.hide = true
                }
                val = date.join('')
                this.valueTwo = val;
            },
            valueOne(val) {
                this.$emit('dateChangeOne', val);
            },
            valueTwo(val) {
                this.$emit('input', val);
            }
        }
    }
</script>
<style lang="scss" scoped>
    .c-date{
        position: relative;
        padding-bottom: 16px;
    }
    .label{
        position: absolute;
        left: 10px;
        top: 10px;
        font-family:"Montserrat";
        font-size: 12px;
        line-height: 24px;
        color: rgba(31, 32, 65, 0.75);
    }
    .date-format{
        opacity: 0;
        position: absolute;
        bottom: -5px;
        left: 0;
        font-family:"Montserrat";
        font-size: 12px;
        line-height: 24px;
        color: rgba(31, 32, 65, 0.75);
        &.focus{
            opacity: 1;
        }
    }

    /deep/.v-menu{
        display: none;
    }

    /deep/.v-text-field > .v-input__control > .v-input__slot:before{
        display: none;
    }
    /deep/.v-text-field > .v-input__control > .v-input__slot:after{
        display: none;
    }
    /deep/.v-input__slot{
        margin-bottom: 0;
    }
    /deep/.v-text-field__details{
        height: 0;
    }
    /deep/.v-input{
        width: 160px;
        display: flex;
        border: 1px solid #8F8FA0;
        border-radius: 4px;
        padding: 5px 10px;
        margin: 0;
    }
    /deep/.v-input input{
        font-family: "Montserrat";
        font-weight: normal;
        font-size: 12px;
        line-height: normal;
        color: #6B6B81;
    }

    /deep/.v-menu {
        width: 160px;
        display: inline-block;
        & .v-text-field{
            padding: 0;
            margin: 0;
            & .v-input__slot{
                border: 1px solid #8F8FA0;
                border-radius: 4px;
                padding: 5px 10px;
                margin: 0;
                &::before,&::after{
                    display: none;
                }
                & .v-icon{
                    color: #6DE18D;
                }
                & input{
                    font-family: "Montserrat";
                    font-size: 12px;
                    line-height: 24px;
                    color: rgba(31, 32, 65, 0.75);
                }
            }
        }
    }
    /deep/.v-date-picker-table .v-btn{
        outline: none;
        &.accent{
            background-color: #6DE18D!important;
        }
        &.accent--text {
            color: #6DE18D!important;
            caret-color: #6DE18D!important;
        }
    }
    /deep/.v-btn .v-btn__content .v-icon{
        color: #6DE18D;
    }
    /deep/.theme--light.v-date-picker-header .v-date-picker-header__value:not(.v-date-picker-header__value--disabled) button {
        font-family: "Montserrat";
        font-weight: normal;
        font-size: 19px;
        line-height: normal;
        color: #1F2041;

        &:hover{
            color: #6DE18D!important;
            font-weight: normal;
            font-size: 19px;
            line-height: normal;
        }
    }

    .btn-wrap{
        position: absolute;
        left: 0;
        bottom: 15px;
        width: 100%;
        display: flex;
        justify-content: space-evenly;

        button{
            font-family: "Montserrat";
            outline: none;
            font-weight: 500;
            font-size: 16px;
            line-height: normal;
            color: #1F2041;
            transition: .2s all;
            &:hover{
                color: #6DE18D;
            }
        }
    }

    .c-date{
        display: flex;
    }

    .date-plus{
        position: absolute;
        right: 12px;
        padding: 14px 0 0 5px;
        font-family: "Montserrat";
        font-weight: bold;
        font-size: 16px;
        line-height: normal;
        color: #2cbd6d;
        cursor: pointer;
    }

</style>