<template>
    <div class="c-slider">
        <v-card-text>
            <vue-slider v-model="value"
                        :min="0"
                        :max="1440"
                        :enable-cross="false"
                        :dotStyle="{'color':'#eee'}"
            ></vue-slider>
        </v-card-text>
        <span class="value-one">{{value[0]|timeNumber}}</span>
        <span class="value-two">{{value[1]|timeNumber}}</span>
    </div>
</template>

<script>
    import VueSlider from 'vue-slider-component'
    import 'vue-slider-component/theme/antd.css'
    export default {
        name: 'c-slider',
        components: {
            VueSlider
        },
        props: {
            sliderValue: {
                type: Array,
                default: () => {
                    return [0,1440];
                }
            }
        },
        data() {
            return {
                value: typeof this.sliderValue === "undefined" ? "" : this.sliderValue,
            }
        },
        watch: {
            value(val) {
                this.$emit('sliderChange', val);
            }
        }
    }
</script>
<style lang="scss" scoped>
    .c-slider{
        position: relative;
    }

    /deep/.vue-slider-process{
        background-color: #5CDF81;
    }
    /deep/.vue-slider-dot-handle{
        border-color: #5CDF81;
        background-color: #5CDF81;
    }
    /deep/.vue-slider-dot-tooltip{
        display: none;
    }
    /deep/.vue-slider:hover .vue-slider-dot-handle{
        border-color: #5CDF81;
    }
    /deep/.vue-slider:hover .vue-slider-dot-handle:hover{
        border-color: #5CDF81;
    }
    /deep/.vue-slider:hover .vue-slider-process{
        background-color: #5CDF81;
    }

    /deep/.v-slider__track__container{
        height: 6px;
        border: 1px solid rgba(31, 32, 65, 0.25);
        border-radius: 3px;
        & .v-slider__track {
            background: none;
        }
        & .v-slider__track-fill{
            height: inherit;
        }
    }

    .value-one, .value-two{
        position: absolute;
        bottom: 0;
        font-family: "Montserrat";
        font-size: 12px;
        line-height: 24px;
        color: rgba(31, 32, 65, 0.75);
    }
    .value-one{
        left: 0;
    }
    .value-two{
        right: 0;
    }

    .slide{
        display: flex;
    }


</style>