<template>
    <div class="company-content">
        <div class="nav-bar">
            <router-link tag="span" class="router-link" active-class="active-link-in-admin" :to="`/control/company/${companyId}/edit`">
                Профиль
            </router-link>
            <router-link tag="span" class="router-link" active-class="active-link-in-admin" :to="`/control/company/${companyId}/settings`">
                Настройки
            </router-link>
            <router-link tag="span" class="router-link" active-class="active-link-in-admin" :to="`/control/company/${companyId}/fees`">
                Сборы
            </router-link>
            <router-link tag="span" class="router-link" active-class="active-link-in-admin" :to="`/control/company/${companyId}/employees`">
                Сотрудники
            </router-link>
            <router-link tag="span" class="router-link" active-class="active-link-in-admin" :to="`/control/company/${companyId}/newsletters`">
                Рассылки
            </router-link>
            <router-link tag="span" class="router-link" active-class="active-link-in-admin" :to="`/control/company/${companyId}/route-receipt`">
                Маршрут-квитанция
            </router-link>
            <router-link tag="span" class="router-link" active-class="active-link-in-admin" :to="`/control/company/${companyId}/history`">
                История
            </router-link>
        </div>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: "Company",
        data() {
            return {

            }
        },
        computed: {
            companyId() {
                return this.$store.getters["company/getCurrentCompanyId"] ? this.$store.getters["company/getCurrentCompanyId"] : 0
            }
        }
    }
</script>

<style lang="scss" scoped>
    .company-content{
        padding: 28px 33px;
        background-color: #fff;

        .nav-bar{
            border-bottom: 1px solid #E9E9EC;
            min-width: 750px;
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