<template>
    <div class="slider pb-3">
        <div class="line bg-green"></div>
        <div class="step-circle bg-green" >1
            <pre class="step-name color-green">{{headlineOne}}</pre>
        </div>
        <div :class="['line',{'bg-green': text >= 2}]"></div>
        <div :class="['step-circle',{'bg-green': text >= 2}]">2
            <pre :class="['step-name', {'color-green': text >= 2}]">{{headlineTwo}}</pre>
        </div>
        <div :class="['line',{'bg-green': text == 3}]"></div>
        <div :class="['step-circle margin-r',{'bg-green': text == 3}]">3
            <pre :class="['step-name', {'color-green': text == 3}]">{{headlineThree}}</pre>
        </div>
        <div class="line"></div>
    </div>
</template>

<script>
    export default {
        name: "StepSlider",
        props: {
            stepTwo: {
                type: Boolean,
                default: false
            },
            stepThree: {
                type: Boolean,
                default: false,
            },
            headlineOne: {
                type: String,
                default: ''
            },
            headlineTwo: {
                type: String,
                default: ''
            },
            headlineThree: {
                type: String,
                default: ''
            },
            value: {
                type: Number,
                default: 1
            }
        },
        data() {
            return {
                two: this.stepTwo,
                three: this.stepThree,
                text: 1
            }
        },
        methods: {

        },
        computed: {

        },
        watch: {
            value(val) {
                this.text = val
                this.$emit('stepChange', val)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .slider{
        display: flex;
        align-items: center;
        .line{
            width: 20%;
            height: 4px;
            transition: .2s all;
        }
        .step-circle{
            position: relative;
            font-family: "Montserrat";
            width: 50px;
            height: 50px;
            font-size: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #ccc;
            border: 3px solid #4DC56F;
            border-radius: 50%;
            transition: .2s all;
            .step-name{
                position: absolute;
                bottom: -35px;
                left: 50%;
                font-size: 12px;
                color: #ccc;
                transform: translateX(-50%);
                &.color-green{
                    color: #4DC56F;
                }
            }
        }
        .bg-green{
            background-color: #4DC56F;
            color: #fff;
        }
    }
</style>