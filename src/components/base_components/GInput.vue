<template>
    <div class="gInput">
        <input :type="inputType" :placeholder="inputPlaceholder" v-model="text">
    </div>
</template>

<script>
    export default {
        name: 'GInput',
        props: {
            inputType: {
                default: 'text'
            },
            inputPlaceholder: {
                default: ''
            },
            inputData: {
                type:String,
                default: ''
            }
        },
        data() {
            return {
                text: typeof this.inputData === "undefined" ? "" : this.inputData
            }
        },
        watch: {
            text(val) {
                this.$emit('input', val);
            }
        }
    }
</script>
<style scoped>
    .gInput input{
        background: #F6F6F6;
        border: 1px solid rgba(31, 32, 65, 0.25);
        box-sizing: border-box;
        border-radius: 4px;
    }
</style>