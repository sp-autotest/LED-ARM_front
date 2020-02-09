import Vue from 'vue';

export default () => {
    return Vue.Api.Post(process.env.VUE_APP_ROOT_API + 'api/company/managers');
};
