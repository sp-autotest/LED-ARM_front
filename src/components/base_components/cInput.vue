<template>
    <div class="c-input">
        <input
                autocomplete="off"
                id="input"
                :type="inputType"
                v-model.trim="text"
                :placeholder="inputPlaceholder"
                :style="{ 'padding': inputPadding}"
                :disabled="disabled"
                v-mask="inputMask"
        >
        <div class="icon">
            <slot name="icon"></slot>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'c-select',
        props: {
            inputMask: {
                type: String,
                default: ""
            },
            disabled: {
                type: Boolean,
                default: false
            },
            value: {
                type: [String, Number],
            },
            inputType: {
                type: String,
                default: 'text'
            },
            inputPlaceholder: {
                type: String,
                default: ''
            },
            inputPadding: {
                type: String,
                default: '9px 44px'
            },
            inputData: {
                type: String,
                default: ''
            },
            inputValid: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                text: typeof this.inputData === "undefined" ? "" : this.inputData
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
    .c-input {
        position: relative;

        input {
            min-width: 320px;
            border: 1px solid rgba(31, 32, 65, 0.5);
            border-radius: 4px;
            font-family: "Montserrat";
            font-size: 12px;
            line-height: 24px;
            color: rgba(31, 32, 65, 0.75);
            outline: none;

            &::placeholder {
                font-family: inherit;
                font-size: inherit;
                line-height: inherit;
                color: inherit;
            }
        }

        .icon {
            position: absolute;
            top: 0;
            left: 0;
            padding: 10px 12px;
        }
    }

</style>