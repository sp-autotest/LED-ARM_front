<template>
    <div class="c-loader-wrap">
        <div class="loader">
            <img :style="{'width': iconWidth, 'height': iconHeight}" class="loader-icon" src="../../assets/images/SVG/search-icon/Rolling-1s-200px.svg">
        </div>
    </div>
</template>

<script>
    export default {
        name: "loader",
        props: {
            iconWidth: {
                type: String,
                default: '40px'
            },
            iconHeight: {
                type: String,
                default: '40px'
            }
        }
    }
</script>

<style lang="scss" scoped>
    .loader{
        display: flex;
        justify-content: center;
    }
</style>