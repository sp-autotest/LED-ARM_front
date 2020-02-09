<template>
    <div class="c-button">
        <button @click="click()" :disabled="disabled" :style="{ 'background-color': buttonColor, 'padding': buttonPadding, 'color': color}">
            <div class="icon">
                <slot name="slot-icon"></slot>
            </div>
            {{buttonValue}}
        </button>
    </div>
</template>

<script>
    export default {
        name: 'c-button',
        props: {
            buttonValue: {
                type: String,
                default: ''
            },
            buttonColor: {
                default: '#5CDF81'
            },
            color: {
                type: String,
                default: '#fff'
            },
            buttonPadding: {
                default: '14px 27px 14px 24px'
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {

            }
        },
        methods: {
            click(event) {
                this.$emit('click', event);
            }
        },
        watch: {

        }
    }
</script>
<style lang="scss" scoped>
    .c-button{
        position: relative;
        button{
            display: flex;
            align-items: center;
            border-radius: 4px;
            padding: 14px 27px 14px 24px;
            font-family: "Montserrat";
            font-weight: bold;
            font-size: 12px;
            text-transform: uppercase;
            outline: none;
            .icon{
                transform: translateX(-10px);
            }
            &:disabled{
                background: #ddd!important;
            }
        }
    }
</style>