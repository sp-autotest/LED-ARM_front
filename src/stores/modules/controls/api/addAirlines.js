import Vue from 'vue';

export default (data) => {
    return Vue.Api.Post(process.env.VUE_APP_ROOT_API + 'api/airline_add_api',data);
};
