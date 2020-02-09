import Vue from 'vue';

export default (data) => {
    return Vue.Api.Get(process.env.VUE_APP_ROOT_API + `api/get_services_exchange_api/${data}`);
};
