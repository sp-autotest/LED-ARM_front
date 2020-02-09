<template>
    <div class="c-count">
        <svg @click="updateCounter(1)" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.40625 7.97949L1.74709e-06 6.57324L6 0.57324L12 6.57324L10.5938 7.97949L6 3.38574L1.40625 7.97949Z" fill="#1F2041" fill-opacity="0.5"/>
        </svg>
        <input type="text" v-model="text" disabled>
        <svg @click="updateCounter(0)" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5938 0.135742L12 1.54199L6 7.54199L0 1.54199L1.40625 0.135742L6 4.72949L10.5938 0.135742Z" fill="#1F2041" fill-opacity="0.5"/>
        </svg>
    </div>
</template>

<script>
    export default {
        name: 'c-count',
        props: {
            countValue: {
                type: Number,
                default: 0
            },
            minValue: {
                type: Number,
                default: 0
            },
            maxValue: {
                type: Number,
                default: 9
            },
        },
        data() {
            return {
                text: typeof this.countValue === "undefined" ? "" : this.countValue
            }
        },
        methods: {
            updateCounter(val){
                if (val == 1){
                    this.text++
                    if (this.text > this.maxValue){
                        this.text = this.maxValue
                    }
                }else {
                    this.text--
                    if (this.text < this.minValue){
                        this.text = this.minValue
                    }
                }
            }
        },
        watch: {
            text(val) {
                this.$emit('input', val);
            }
        }
    }
</script>
<style lang="scss" scoped>
    .c-count{
        position: relative;
        border: 1px solid rgba(31, 32, 65, 0.5);
        border-radius: 4px;
        display: inline-block;

        & input{
            max-width: 70px;
            font-family: "Montserrat";
            font-size: 12px;
            line-height: 24px;
            color: rgba(31, 32, 65, 0.75);
            padding: 10px 12px;
        }
        & svg{
            position: absolute;
            right: 12px;
            cursor: pointer;
            &:first-child{
                top: 8px;
            }
            &:last-child{
                bottom: 8px;
            }
        }
    }

</style>