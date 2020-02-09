<template>
    <div class="c-checkbox">
        <input type="checkbox" id="checkbox" v-model="text">
        <label for="checkbox" class="checkbox-label">{{label}}</label>
    </div>
</template>

<script>
    export default {
        name: "cCheckbox",
        props: {
            label: {
                type: String,
                default: ''
            },
            checkboxValue: {
                type:Boolean,
                default: false
            }
        },
        data() {
            return {
                text: this.checkboxValue
            }
        },
        watch: {
            text(val) {
                this.$emit('checked', val);
            }
        }
    }
</script>

<style lang="scss" scoped>
    #checkbox{
        display: none;
    }

    .checkbox-label{
        display: grid;
        grid-template-columns: 30px 1fr;
        align-items: center;
        cursor: pointer;
        font-family: "Montserrat";
        font-size: 12px;
        position: relative;
    }

    .checkbox-label::before{
        content: '';
        display: inline-block;
        vertical-align: middle;
        width: 20px;
        height: 20px;
        background: #C4C4C4;
        border-radius: 3px;
        transition: 0.2s all;
    }

    .checkbox-label::after{
        content: '';
        position: absolute;
        left: 5px;
        top: 5px;
        width: 10px;
        height: 7px;
        border-left: 2px solid #FFFFFF;
        border-bottom: 2px solid #FFFFFF;
        opacity: 0;
        transform: rotate(-45deg);
        transition: 0.2s all;
    }

    #checkbox:checked + label{
        &::before{
            background-color: #5CDF81;
        }
        &::after{
            opacity: 1;
        }
    }
</style>