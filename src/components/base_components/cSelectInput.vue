<template>
    <div class="c-select">
        <v-select
                @change="change()"
                v-model.trim="text"
                :items="items"
                :item-text="itemText"
                :item-value="itemValue"
                :placeholder="selectPlaceholder"
                dense
                persistent-hint
                return-object
                single-line
                append-icon="keyboard_arrow_down"
                :disabled="inputDisabled"
        ></v-select>
        <div class="icon">
            <slot name="icon"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'c-select',
        props: {
            value: {
              type: [String, Number, Boolean, Array, Object],
                default: ""
            },
            selectPlaceholder: {
                type:String,
                default: ''
            },
            inputDisabled: {
                type: Boolean,
                default: false
            },
            selectData: {
                type:String,
                default: ''
            },
            selectItems: {
                type: Array,
            },
            itemText: {
                type: String,
                default: ''
            },
            itemValue: {
                type: [String, Array],
                default: ''
            }
        },
        data() {
            return {
                text: this.itemValue == "undefined" ? '' : this.itemValue,
                items: typeof this.selectItems === "undefined" ? [] : this.selectItems,
            }
        },
        methods: {
            change(event) {
                this.$emit('change', event)
            }
        },
        watch: {
            value(val) {
                this.text = val;
            },
            selectItems(val) {
                this.items = val;
            },
            text(val) {
                if(typeof val != "object") {
                    this.$emit('input', val);
                } else {
                    if(typeof this.itemValue == "object") {
                        this.$emit('input', val[this.itemValue[0]][this.itemValue[1]]);
                    } else {
                        this.$emit('input', val[this.itemValue]);
                    }
                }
            },
        }
    }
</script>
<style lang="scss" scoped>
    .c-select{
        position: relative;

        .icon{
            position: absolute;
            top: 0;
            left: 0;
            padding: 10px 12px;
        }
    }

    /deep/.v-text-field > .v-input__control > .v-input__slot {
        &:before {
            display: none;
        }
        &:after {
            display: none;
        }
    }
    /deep/.v-select__slot{
        position: static;
    }
    /deep/.v-text-field .v-input__append-inner{
        position: absolute;
        right: 10px;
    }
    /deep/.v-select > .v-input__control > .v-input__slot{
        /*width: 70%;*/
        border: 1px solid #8F8FA0;
        border-radius: 4px;
        padding: 5px 10px;
        min-width: 320px;
    }
    /deep/.v-text-field {
        padding-top: 0;
        margin-top: 0;
    }
    /deep/.v-input__slot{
        margin-bottom: 0;
    }
    /deep/.v-select__selections{
        font-size: 14px;
        width: 160px;
    }
    /deep/.v-select__selection.v-select__selection--comma{
        font-family:"Montserrat";
        font-size: 12px;
        color: rgba(31, 32, 65, 0.75);
    }
</style>