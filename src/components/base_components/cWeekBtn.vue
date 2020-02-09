<template>
    <div class="c-week-btn">
        <div class="week-wrap">
            <span
                    :class="['defaultDayClass', {'activeDayClass' : itemValue, 'border-none' : !borderRight}]"
                    :style="{ 'padding': buttonPadding, 'border-top-left-radius': borderLeftRad, 'border-bottom-left-radius': borderLeftRad,
                              'border-top-right-radius': borderRightRad, 'border-bottom-right-radius': borderRightRad}"
            >
                {{label}}
            </span>
        </div>

    </div>
</template>

<script>
    export default {
        name: "cDateBtn",
        props: {
            borderLeftRad: {
                type: String,
                default: '0px'
            },
            borderRightRad: {
                type: String,
                default: '0px'
            },
            borderRight: {
                type: Boolean,
                default: true
            },
            buttonPadding: {
                default: '10px 20px 10px 18px'
            },
            label: {
                type: String,
                required: 'text'
            },
            itemValue: {
                type:  Boolean,
                default: false
            }
        },
        data() {
            return {

            }
        },
        watch: {
            value: {

            }
        }
    }
</script>

<style lang="scss" scoped>

    .c-date-btn{
        width: max-content;
        display: flex;
        overflow: hidden;
    }

    .week-wrap{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .defaultDayClass.activeDayClass {
        background-color: #5CDF81;
        color: #fff;
    }

    .defaultDayClass{
        font-family: "Montserrat";
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: normal;
        border: 1px solid #8F8FA0;
        color: rgba(31, 32, 65, 0.75);
        margin: 0;
        transition: 0.2s all;
    }

    .border-none{
        border-right: none;
    }
</style>