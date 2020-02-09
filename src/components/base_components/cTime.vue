<template>
    <div class="c-time">
        <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="menuValue"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
        >
            <template v-slot:activator="{ on }">
                <v-text-field
                        v-model="menuValue"
                        prepend-icon="access_time"
                        readonly
                        v-on="on"
                ></v-text-field>
            </template>
            <v-time-picker
                    color="#6DE18D"
                    format="24hr"
                    v-if="menu"
                    v-model="menuValue"
                    full-width
                    @click:minute="$refs.menu.save(value)"
            ></v-time-picker>
        </v-menu>
    </div>
</template>

<script>
    export default {
        name: "cTime",
        props: {
            value: {
                type: String,
                default: ""
            },
        },
        data () {
            return {
                menuValue: "",
                menu: false,
            }
        },
        watch: {
            value(val) {
                this.menuValue = val;
            },
            menuValue(val) {
                this.$emit('timeChange', val);
            }
        }
    }
</script>

<style lang="scss" scoped>

    /deep/.v-text-field{
        border: 1px solid #8F8FA0;
        border-radius: 4px;
        padding: 5px 10px;
        margin: 0;
    }
    /deep/.v-icon{
        color: #6DE18D;
    }
    /deep/.v-input__prepend-outer{
        order: 2;
        margin-right: 0;
    }
    /deep/.v-text-field > .v-input__control > .v-input__slot:before{
        display: none;
    }
    /deep/.v-text-field > .v-input__control > .v-input__slot:after{
        display: none;
    }
    /deep/.v-input__slot{
        margin: 0;
    }
    /deep/.v-text-field__details{
        height: 0;
    }
    /deep/.v-text-field input{
        font-family:"Montserrat";
        font-size: 12px;
        line-height: 24px;
        color: rgba(31, 32, 65, 0.75);
    }
</style>