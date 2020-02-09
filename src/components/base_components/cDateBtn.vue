<template>
    <div class="c-date-btn">
        <div v-if="dateSelected" class="input-group">
            <div
                    v-for="item in itemCount"
                    class="input-wrap"
                    :key="`${item}`"
            >
                <input
                        type="checkbox"
                        :id="`item-${item}`"
                        :value="`${item}`"
                        v-model="text"
                >
                <label
                        :for="`item-${item}`"
                        class="test"
                        :style="{ 'padding': buttonPadding }"
                >
                    {{label[item-1]}}
                </label>
            </div>
        </div>
        <div v-else class="week-wrap">
            <span
                    v-for="(list, key) in itemValueTwo"
                    :class="['defaultDayClass', {'activeDayClass' : list}]"
                    :style="{ 'padding': buttonPadding }"
            >
                {{label[key]}}
            </span>
        </div>

    </div>
</template>

<script>
    export default {
        name: "cDateBtn",
        props: {
            dateSelected: {
                type: Boolean,
                default: false
            },
            itemCount: {
                type: Number,
                default: 3
            },
            itemValue: {
                type: Array,
            },
            buttonPadding: {
                default: '14px 27px 14px 24px'
            },
            label: {
                type: Array,
                required: true
            },
            itemValueTwo: {
                type: Array
            }
        },
        data() {
            return {
                valueItem: this.itemValue,
                text: this.itemValue
            }
        },
        watch: {
            text(val) {
                this.$emit('change', val);
            }
        }
    }
</script>

<style lang="scss" scoped>

    .input-group{
        border-radius: 4px;
        width: max-content;
        display: flex;
        overflow: hidden;

        .input-wrap{
            border-right: 1px solid #8F8FA0;
            &:last-child{
                border: none;
            }
        }
        input{
            display: none;
            &:checked + label{
                background-color: #5CDF81;
                color: #fff;
            }
        }
        label{
            margin: 0;
            cursor: pointer;
            font-family: "Montserrat";
            font-weight: bold;
            font-size: 12px;
            line-height: normal;
            color: #575870;
        }
    }

    .c-date-btn{
        border-radius: 4px;
        border: 1px solid #8F8FA0;
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
        color: rgba(31, 32, 65, 0.75);
        border-right: 1px solid rgba(31, 32, 65, 0.25);
        margin: 0;
        transition: 0.2s all;
    }
    .defaultDayClass:last-child{
        border: none;
    }
</style>