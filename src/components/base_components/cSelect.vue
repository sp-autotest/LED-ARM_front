<template>
    <div class="c-select">
        <span @click="click()" :class="['select-label', {'selected' : text}]">{{inputLabel}}</span>
    </div>
</template>

<script>
    export default {
        name: 'c-select',
        props: {
            inputLabel: {
                type: String,
                default: ''
            },
            value: {
                type:Boolean,
                default: false
            }
        },
        data() {
            return {
                text: this.value
            }
        },
        methods: {
            click(e) {
                this.text = !this.text
                this.$emit("click", e)
            }
        },
        watch: {
            text(val) {
                this.$emit('input', val);
            },
            value(val) {
                this.text = val;
            }
        }
    }
</script>
<style lang="scss" scoped>
    .select-label{
        display: grid;
        grid-template-columns: 50px 1fr;
        align-items: center;
        cursor: pointer;
        font-family: "Montserrat";
        font-size: 12px;
        position: relative;
        white-space: nowrap;
        &.selected{
            &::before{
                background-color: #5CDF81;
            }
            &::after{
                left: 21px;
            }
        }
    }

    .select-label::before{
        content: '';
        display: inline-block;
        vertical-align: middle;
        width: 40px;
        height: 20px;
        background: #C4C4C4;
        border-radius: 10px;
        transition: 0.2s all;
    }

    .select-label::after{
        content: '';
        position: absolute;
        left: 4px;
        top: 3px;
        width: 15px;
        height: 14px;
        border-radius: 50%;
        background-color: #fff;
        transition: 0.2s all;
    }
</style>