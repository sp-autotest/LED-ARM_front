<template>
    <div class="autocomplete">
        <v-autocomplete
                :no-filter="noFilter"
                :append-icon="icon"
                v-model="select"
                :items="inputItems"
                :item-text="itemText"
                :item-value="itemValue"
                :search-input.sync="search"
                :label="inputLabel"
                dense
        ></v-autocomplete>
    </div>
</template>

<script>
    export default {
        name: "cAutocomplate",
        props: {
            value: {
                type: [String, Number, Boolean, Array],
                default: ""
            },
            inputItems: {
                type: Array,
            },
            inputLabel: {
                type: String,
                default: ''
            },
            itemText: {
                type: String,
                default: ''
            },
            itemValue: {
                type: [String, Array],
                default: ''
            },
            icon: {
                type: String,
                default: 'keyboard_arrow_down'
            },
            noFilter: {
                type: Boolean,
                default: false
            },
        },
        data () {
            return {
                loading: false,
                items: [],
                search: null,
                select: "",
                states: this.inputItems
            }
        },
        watch: {
            focus(val){
                // console.log(val);
            },
            value(val) {
                this.select = val;
            },
            select(val) {
                console.log(val);
                this.$emit('input', val);
            },
            search (val) {
                // this.$emit('input', val);
                val && val !== this.select && this.querySelections(val)
            }
        },
        methods: {
            querySelections (v) {
                this.loading = true;
                    this.items = this.states.filter(e => {
                        return (e.textName || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
                    })
                    this.loading = false
            }
        }
    }
</script>

<style lang="scss" scoped>
    /deep/.v-autocomplete.v-input > .v-input__control > .v-input__slot{
        display: grid;
    }
    /deep/.v-text-field > .v-input__control > .v-input__slot:before{
        display: none;
    }
    /deep/.v-text-field > .v-input__control > .v-input__slot:after{
        display: none;
    }
    /deep/.v-text-field{
        margin: 0;
        padding: 0;
    }
    /deep/.v-autocomplete.v-input > .v-input__control > .v-input__slot{
        margin: 0;
        border: 1px solid rgba(31, 32, 65, 0.5);
        border-radius: 4px;
        font-family:"Montserrat";
        font-size: 12px;
        line-height: 24px;
        color: rgba(31, 32, 65, 0.75);
        outline: none;
        & input{
            font-family:"Montserrat";
            font-size: 12px;
            line-height: 24px;
            color: rgba(31, 32, 65, 0.75);
        }
    }
    /deep/.v-text-field__details{
        height: 0;
    }
    /deep/.v-select__slot{
        padding: 5px 10px;
    }
    /deep/.v-input .v-label{
        left: 5px!important;
        top: 7px;
        margin: 0;
        font-family:"Montserrat";
        font-size: 12px;
        line-height: 24px;
        color: rgba(31, 32, 65, 0.75);
        &.v-label--active{
            display: none;
        }
    }

</style>