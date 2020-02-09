<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        // mounted () {
        //     this.$axios.setHeader('X-locale', this.$store.state.locale);
        // }
    }
</script>

<style lang="scss">
    html {
        font-size: 16px;
        word-spacing: 1px;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        box-sizing: border-box;
    }

    body {
        min-height: 100vh;
        height: auto;
        margin: 0;
        padding: 0;
        overflow-x: hidden;
        overflow-y: hidden;
        background: #fff;
        font-size: 1rem;
        line-height: 1.4285em;
        letter-spacing: -0.28px;
        color: var(--color-main-text--lightTheme);
        font-family: 'Open Sans', Arial, Helvetica, sans-serif;

        * {
            -webkit-font-smoothing: antialiased;
            box-sizing: border-box;
            font-family: 'Open Sans', Arial, Helvetica, sans-serif;
        }

        .top-menu {
            float: right;
        }
    }

    .theme--light {

        &.v-card {
            color: var(--color-main-text--lightTheme);
        }
    }

    .application--wrap {
        overflow: hidden;
    }
</style>
