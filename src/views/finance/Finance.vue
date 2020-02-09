<template>
    <div class="finance-content">
        <div class="nav-bar">
            <router-link tag="span" class="router-link" active-class="active-link-in-admin" to="/finance" exact>
                Балансы
            </router-link>
            <router-link tag="span" class="router-link" active-class="active-link-in-admin" to="/finance/invoices" exact>
                Счета
            </router-link>
            <router-link tag="span" class="router-link" active-class="active-link-in-admin" to="/finance/payments" exact>
                Платежи
            </router-link>
        </div>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: "Finance"
    }
</script>

<style lang="scss" scoped>
    .finance-content{
        padding: 28px 33px;
        background-color: #fff;

        .nav-bar{
            border-bottom: 1px solid #E9E9EC;
        }
        .router-link{
            font-family: "Montserrat";
            font-weight: normal;
            font-size: 12px;
            line-height: normal;
            color: rgba(31, 32, 65, 0.5);
            cursor: pointer;
            margin-right: 35px;
            position: relative;

            &.active-link-in-admin{
                font-weight: bold;
                color: #1F2041;
                &::after{
                    content: '';
                    position: absolute;
                    bottom: -5px;
                    left: 0;
                    height: 3px;
                    width: 100%;
                    background: #5CDF81;
                    border-radius: 3px;
                }
            }
        }
    }
</style>