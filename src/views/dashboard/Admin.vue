<template>
    <div class="admin-wrap">
        <div class="nav-bar">
            <router-link tag="span" class="router-link" active-class="active-link-in-admin" to="/dashboard" exact>
                Заказ № {{number}}
            </router-link>
            <router-link tag="span" class="router-link" active-class="active-link-in-admin" to="/dashboard/services" exact>
                Услуги
            </router-link>
            <router-link tag="span" class="router-link" active-class="active-link-in-admin" to="/dashboard/messages" exact>
                Сообщения
            </router-link>
        </div>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: "Admin",
        components: {

        },
        data() {
            return {
                age: 0,
                number: ''
            }
        },
        mounted() {
            this.number = this.$store.getters['orders/getOrder'] != null ? this.$store.getters['orders/getOrder'].order_n : ''
        }
    }
</script>

<style lang="scss" scoped>
    .admin-wrap{
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