import Vue from "vue";
import Vuex from "vuex";

import state from "./state";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

import Auth from "./modules/auth/store";
import Layouts from "./modules/layouts/store";
import Controls from "./modules/controls/store";
import Blocks from "./modules/blocks/store";
import ServiceSearch from "./modules/service_search/store";
import Orders from "./modules/orders/store";
import Reports from "./modules/reports/store";
import Finance from "./modules/finance/store";
import Messages from "./modules/messages/store";
import Company from "./modules/controls/company/store";
import Group from "./modules/controls/group/store";


Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    auth: Auth,
    layouts: Layouts,
    controls: Controls,
    blocks: Blocks,
    service_search: ServiceSearch,
    orders: Orders,
    reports: Reports,
    finance: Finance,
    messages: Messages,
    company: Company,
    group: Group,
  },
});
