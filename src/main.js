import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './stores/store'

import NProgress from 'nprogress'
Vue.use(NProgress);

// const moment = require('moment')
// require('moment/locale/ru')


import moment from "moment";
// moment.locale('ru');
Vue.use(moment);

require('@/plugins/vue-filters');

Vue.config.productionTip = false;

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate);

import Api from './plugins/api.adapter';
Vue.use(Api);

import VueMask from 'v-mask'
Vue.use(VueMask);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
