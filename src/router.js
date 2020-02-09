import Vue from 'vue'
import Router from 'vue-router'
import store from '@/stores/store';
import NProgress from 'nprogress'


import Default from "./layouts/default"

Vue.use(Router)

let router =  new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/dashboard/Admin.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: {layout: "base_component", closeForAuth: true},
      component: () => import('./views/SignIn.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      linkActiveClass: "active",
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/dashboard/Admin.vue'),
      children: [
        {
          path: '/',
          component: () => import('./views/dashboard/OrderNumber.vue'),
        },
        {
          path: '/dashboard/services',
          component: () => import('./views/dashboard/Services.vue'),
        },
        {
          path: '/dashboard/messages',
          component: () => import('./views/dashboard/Messages.vue'),
        },
        {
          path: '/dashboard/edit',
          component: () => import('./views/dashboard/EditOrders.vue'),
        },
        {
          path: '/dashboard/exchange',
          component: () => import('./views/dashboard/ExchangeOrders.vue'),
        },
      ]
    },
    {
      path: '/search',
      name: 'search',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/search/search.vue')
    },
    {
      path: '/orders',
      name: 'orders',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/orders/Orders.vue')
    },
    {
      path: '/booking',
      name: 'booking',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/search/BookFlight.vue')
    },
    {
      path: '/reports',
      name: 'reports',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/reports/Reports.vue')
    },
    {
      path: '/finance',
      name: 'finance',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/finance/Finance.vue'),
      children: [
        {
          path: '/finance',
          component: () => import('./views/finance/Balances.vue'),
        },
        {
          path: '/finance/invoices',
          component: () => import('./views/finance/Invoices.vue'),
        },
        {
          path: '/finance/payments',
          component: () => import('./views/finance/Payments.vue'),
        },
      ]
    },
    {
      path: '/messages',
      name: 'messages',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/messages/Messages.vue')
    },
    {
      path: '/messages/:id',
      name: 'message-open',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/messages/OpenMessage.vue')
    },
    {
      path: '/control',
      name: 'control',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/control/fees/Fees.vue'),
    },
    {
      path: '/control/company',
      name: 'control-company',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/control/company/Profile.vue'),
    },
    {
      path: '/control/company/add',
      name: 'control-company-add',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/control/company/AddCompany.vue'),
    },
    {
      path: '/control/company/:id/edit',
      name: 'control-company-edit',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/control/company/Company.vue'),
      children: [
        {
          path: '/control/company/:id/edit',
          component: () => import('./views/control/company/AddCompany.vue'),
        },
        {
          path: '/control/company/:id/settings',
          component: () => import('./views/control/company/Settings.vue'),
        },
        {
          path: '/control/company/:id/fees',
          component: () => import('./views/control/company/Fees.vue'),
        },
        {
          path: '/control/company/:id/fees/add',
          component: () => import('./views/control/company/AddFees.vue'),
        },
        {
          path: '/control/company/:id/fees/edit/:fees_id',
          component: () => import('./views/control/company/AddFees.vue'),
        },
        {
          path: '/control/company/:id/employees',
          component: () => import('./views/control/company/Employees.vue'),
        },
        {
          path: '/control/company/:id/employees/add',
          component: () => import('./views/control/company/AddEmployees.vue'),
        },
        {
          path: '/control/company/:id/employees/edit/:employees_id',
          component: () => import('./views/control/company/AddEmployees.vue'),
        },
        {
          path: '/control/company/:id/newsletters',
          component: () => import('./views/control/company/Newsletters.vue'),
        },
        {
          path: '/control/company/:id/route-receipt',
          component: () => import('./views/control/company/RouteReceipt.vue'),
        },
        {
          path: '/control/company/:id/history',
          component: () => import('./views/control/company/History.vue'),
        },
      ]
    },
    {
      path: '/control/group',
      name: 'control-group',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/control/group/Group.vue'),
    },
    {
      path: '/control/provider',
      name: 'control-provider',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/control/provider/Provider.vue'),
    },
    {
      path: '/control/provider/add',
      name: 'control-provider-add',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/control/provider/AddProvider.vue'),
    },
    {
      path: '/control/provider/add/:id',
      name: 'control-provider-edit',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/control/provider/AddProvider.vue'),
    },
    {
      path: '/control/passengers',
      name: 'control-passengers',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/control/passenger/Passengers.vue'),
    },
    {
      path: '/control/passenger/edit',
      name: 'control-passengers-edit',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/control/passenger/EditPassengers.vue'),
    },
    {
      path: '/control/airlines',
      name: 'control-airlines',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/control/airlines/Airlines.vue'),
    },
    {
      path: '/control/airlines/add',
      name: 'control-airlines-add',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/control/airlines/AddAirlines.vue'),
    },
    {
      path: '/control/airlines/add/:id',
      name: 'control-airlines-add',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/control/airlines/AddAirlines.vue'),
    },
    {
      path: '/control/provider-accounts',
      name: 'control-provider-accounts',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/control/providerAccounts/ProviderAccounts.vue'),
    },
    {
      path: '/control/provider-accounts/add',
      name: 'control-provider-accounts-add',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/control/providerAccounts/AddProviderAccounts.vue'),
    },
    {
      path: '/control/provider-accounts/add/:id',
      name: 'control-provider-accounts-edit',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/control/providerAccounts/AddProviderAccounts.vue'),
    },
    {
      path: '/control/countries-cities-airports',
      name: 'control-countries-cities-airports',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/control/countriesCitiesAirports/CountriesCitiesAirports.vue'),
    },
    {
      path: '/control/countries-cities-airports/add-country',
      name: 'control-countries-add',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/control/countriesCitiesAirports/AddCountries.vue'),
    },
    {
      path: '/control/countries-cities-airports/add-country/:id',
      name: 'control-countries-edit',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/control/countriesCitiesAirports/AddCountries.vue'),
    },
    {
      path: '/control/countries-cities-airports/add-city',
      name: 'control-cities-add',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/control/countriesCitiesAirports/AddCities.vue'),
    },
    {
      path: '/control/countries-cities-airports/add-city/:id',
      name: 'control-cities-edit',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/control/countriesCitiesAirports/AddCities.vue'),
    },
    {
      path: '/control/countries-cities-airports/add-airport',
      name: 'control-airports-add',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/control/countriesCitiesAirports/AddAirports.vue'),
    },
    {
      path: '/control/countries-cities-airports/add-airport/:id',
      name: 'control-airports-edit',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/control/countriesCitiesAirports/AddAirports.vue'),
    },
    {
      path: '/control/fees/add',
      name: 'fees-add',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/control/fees/AddFees.vue'),
    },
    {
      path: '/control/fees/add/:id',
      name: 'fees-add',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/control/fees/AddFees.vue'),
    },
    {
      path: '/control/classes-service',
      name: 'classes-service',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/control/serviceClass/ServiceClass.vue'),
    },
    {
      path: '/control/classes-service/add',
      name: 'classes-service-add',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/control/serviceClass/AddServiceClass.vue'),
    },
    {
      path: '/control/classes-service/add/:id',
      name: 'classes-service-edit',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/control/serviceClass/AddServiceClass.vue'),
    },
    {
      path: '/control/currency-reference',
      name: 'currency-reference',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/control/currencyReference/CurrencyReference.vue'),
    },
    {
      path: '/control/currency-reference/add',
      name: 'currency-reference-add',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/control/currencyReference/AddCurrencyReference.vue'),
    },
    {
      path: '/control/currency-reference/add/:id',
      name: 'currency-reference-add',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/control/currencyReference/AddCurrencyReference.vue'),
    },
    {
      path: '/control/bc-type',
      name: 'bc-type',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/control/bcTypes/BCTypes.vue'),
    },
    {
      path: '/control/bc-type/add',
      name: 'bc-type-add',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/control/bcTypes/AddBCTypes.vue'),
    },
    {
      path: '/control/bc-type/add/:id',
      name: 'bc-type-edit',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/control/bcTypes/AddBCTypes.vue'),
    },
    {
      path: '/blocks',
      name: 'blocks',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/placeBlocks/blocks/Blocks.vue'),
    },
    {
      path: '/blocks/add',
      name: 'blocks-add',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/placeBlocks/blocks/BlocksAdd.vue'),
    },
    {
      path: '/blocks/seat-availability',
      name: 'blocks-seat-availability',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/placeBlocks/seatAvailability/SeatAvailability.vue'),
    },
    {
      path: '/blocks/orders',
      name: 'blocks-orders',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/placeBlocks/orders/Orders.vue'),
    },
    {
      path: '/blocks/orders/edit/:id',
      name: 'blocks-orders-edit',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/placeBlocks/orders/EditOrders.vue'),
    },
    {
      path: '/blocks/add/:id',
      name: 'blocks-add',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/placeBlocks/blocks/BlocksAdd.vue'),
    },
    {
      path: '/flights/:id',
      name: 'flights',
      meta: {layout: "default_component", requiresAuth: true},
      props: true,
      component: () => import('./views/placeBlocks/blocks/FlightsList.vue'),
    },
    {
      path: '/schedule',
      name: 'schedule',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/placeBlocks/schedule/Schedule.vue'),
    },
    {
      path: '/schedule/add',
      name: 'schedule-add',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/placeBlocks/schedule/ScheduleAdd.vue'),
    },
    {
      path: '/schedule/add/:id',
      name: 'schedule-add',
      meta: {layout: "default_component", requiresAuth: true},
      component: () => import('./views/placeBlocks/schedule/ScheduleAdd.vue'),
    },
    {
      path: '*',
      name: '404',
      component: () => import('./views/404.vue')
    },
  ]
});
router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {

    if (store.state.auth.isAuthenticated == false) {
      next({
        path: '/login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.closeForAuth)) {
    if (store.state.auth.isAuthenticated != false && store.state.auth.isAuthenticated != undefined) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    next();
  }
});

export default router;