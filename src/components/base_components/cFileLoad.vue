<template>
    <div class="c-file-load">
        <input accept=".png, .jpg, .jpeg" id="file" type="file" @change="onFileChange($event)">
        <label for="file" :style="{ 'background-color': fileColor, 'padding': filePadding, 'color': color}">{{ fileValue }}</label>
    </div>
</template>

<script>
    export default {
        name: "cFileLoad",
        props: {
            fileValue: {
                type: String,
                default: 'Загрузить'
            },
            fileColor: {
                default: '#5CDF81'
            },
            color: {
                type: String,
                default: '#fff'
            },
            filePadding: {
                default: '14px 27px 14px 24px'
            }
        },
        data() {
            return {
                file: ''
            }
        },
        methods: {
            onFileChange(e) {
                this.$emit("selected", e.target.files[0])
            },
        }
    }
</script>

<style lang="scss" scoped>
    .c-file-load {
        position: relative;
        label {
            margin: 0;
            width: max-content;
            display: flex;
            align-items: center;
            border-radius: 4px;
            padding: 14px 27px 14px 24px;
            font-family: "Montserrat";
            font-weight: bold;
            font-size: 12px;
            text-transform: uppercase;
            outline: none;
            cursor: pointer;
        }
        input{
            display: none;
        }
    }
</style>