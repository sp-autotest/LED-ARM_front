<template>
    <div class="c-textarea">
        <textarea
               v-model.trim="text"
               :placeholder="textPlaceholder"
               :style="{ 'padding': textPadding}"
               @blur="blur()"
        >
        </textarea>
    </div>
</template>

<script>

    export default {
        name: 'c-textarea',
        props: {
            value: {
                type: [String, Number],
            },
            textPlaceholder: {
                type:String,
                default: ''
            },
            textPadding: {
                type:String,
                default: '9px 10px'
            },
        },
        data() {
            return {
                text: ''
            }
        },
        methods: {
            blur(event) {
                this.$emit('blur', event);
            }
        },
        watch: {
            value(val) {
                this.text = val;
            },
            text(val) {
                this.$emit('input', val);
            },
        }
    }
</script>
<style lang="scss" scoped>
    .c-textarea{
        position: relative;

        textarea{
            min-width: 320px;
            height: 100px;
            width: 100%;
            border: 1px solid rgba(31, 32, 65, 0.5);
            border-radius: 4px;
            font-family:"Montserrat";
            font-size: 12px;
            line-height: 24px;
            color: rgba(31, 32, 65, 0.75);
            outline: none;
            resize: none;
            &::placeholder{
                font-family: inherit;
                font-size: inherit;
                line-height: inherit;
                color: inherit;
            }
        }
    }

</style>